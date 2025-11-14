#!/usr/bin/env tsx

import 'dotenv/config';
import { prisma } from '../lib/prisma';

type ClerkEmailAddress = {
  id: string;
  email_address?: string;
  emailAddress?: string;
  verification?: { status?: string };
};

type ClerkUser = {
  id: string;
  email_addresses?: ClerkEmailAddress[];
  emailAddresses?: ClerkEmailAddress[];
  primary_email_address_id?: string;
  primaryEmailAddressId?: string;
  first_name?: string;
  firstName?: string;
  last_name?: string;
  lastName?: string;
  username?: string;
  image_url?: string;
  imageUrl?: string;
};

const CLERK_API_BASE = process.env.CLERK_API_BASE_URL ?? 'https://api.clerk.com';
const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY;
const PAGE_SIZE = 100;

async function fetchClerkUsers(): Promise<ClerkUser[]> {
  if (!CLERK_SECRET_KEY) {
    throw new Error('CLERK_SECRET_KEY is required to migrate users.');
  }

  const users: ClerkUser[] = [];
  let offset = 0;

  while (true) {
    const response = await fetch(
      `${CLERK_API_BASE}/v1/users?limit=${PAGE_SIZE}&offset=${offset}&order_by=-created_at`,
      {
        headers: {
          Authorization: `Bearer ${CLERK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Failed to fetch Clerk users: ${response.status} ${errorBody}`);
    }

    const batch = (await response.json()) as ClerkUser[];
    if (!Array.isArray(batch) || batch.length === 0) {
      break;
    }

    users.push(...batch);

    if (batch.length < PAGE_SIZE) {
      break;
    }

    offset += PAGE_SIZE;
  }

  return users;
}

function extractEmailAddresses(user: ClerkUser): ClerkEmailAddress[] {
  return user.email_addresses ?? user.emailAddresses ?? [];
}

function getPrimaryEmail(user: ClerkUser): string | null {
  const emailAddresses = extractEmailAddresses(user);
  const primaryId = user.primary_email_address_id ?? user.primaryEmailAddressId;
  const primary =
    emailAddresses.find((address) => address.id === primaryId)?.email_address ??
    emailAddresses.find((address) => address.id === primaryId)?.emailAddress ??
    emailAddresses[0]?.email_address ??
    emailAddresses[0]?.emailAddress;
  return primary ?? null;
}

function isEmailVerified(user: ClerkUser): boolean {
  const emailAddresses = extractEmailAddresses(user);
  const primaryId = user.primary_email_address_id ?? user.primaryEmailAddressId;
  return (
    emailAddresses.some(
      (address) =>
        address.id === primaryId && address.verification?.status?.toLowerCase() === 'verified',
    ) ?? false
  );
}

function getFullName(user: ClerkUser, fallbackEmail: string): string {
  const firstName = user.first_name ?? user.firstName ?? '';
  const lastName = user.last_name ?? user.lastName ?? '';
  const name = `${firstName} ${lastName}`.trim();
  return name || user.username || fallbackEmail;
}

async function main() {
  console.log('Starting Clerk → Better Auth migration');

  const users = await fetchClerkUsers();
  console.log(`Found ${users.length} Clerk users to migrate.`);

  let migrated = 0;
  for (const clerkUser of users) {
    const primaryEmail = getPrimaryEmail(clerkUser);

    if (!primaryEmail) {
      console.warn(`Skipping user ${clerkUser.id} – no email address.`);
      continue;
    }

    const fullName = getFullName(clerkUser, primaryEmail);
    const emailVerified = isEmailVerified(clerkUser);
    const imageUrl = clerkUser.image_url ?? clerkUser.imageUrl ?? null;

    const authUser = await prisma.authUser.upsert({
      where: { id: clerkUser.id },
      update: {
        name: fullName,
        email: primaryEmail,
        emailVerified,
        image: imageUrl,
      },
      create: {
        id: clerkUser.id,
        name: fullName,
        email: primaryEmail,
        emailVerified,
        image: imageUrl,
      },
    });

    let appUser = await prisma.user.findUnique({
      where: { clerkId: clerkUser.id },
    });

    if (!appUser) {
      appUser = await prisma.user.create({
        data: {
          clerkId: clerkUser.id,
          email: primaryEmail,
          name: fullName,
        },
      });
    }

    if (authUser.appUserId !== appUser.id) {
      await prisma.authUser.update({
        where: { id: authUser.id },
        data: { appUserId: appUser.id },
      });
    }

    migrated += 1;
  }

  console.log(`Migration complete. ${migrated}/${users.length} users processed.`);
}

main()
  .catch((error) => {
    console.error('User migration failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
