import { prisma } from './prisma';

let userSchemaEnsured = false;

async function ensureUserTableSchema() {
  if (userSchemaEnsured) return;

  try {
    await prisma.$executeRawUnsafe(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'UserRole') THEN
          CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN', 'STAFF');
        END IF;
      END$$;
    `);
    await prisma.$executeRawUnsafe(
      'ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "onboardingCompletedAt" TIMESTAMP NULL'
    );
    await prisma.$executeRawUnsafe(
      'ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "role" "UserRole" NOT NULL DEFAULT \'USER\''
    );
  } catch (error) {
    // Failing to add the column shouldn’t block auth; log for visibility.
    console.error('Failed to ensure User table schema', error);
  } finally {
    userSchemaEnsured = true;
  }
}

export async function ensureUserRecord(authUserId: string) {
  await ensureUserTableSchema();

  let user = await prisma.user.findUnique({
    where: { clerkId: authUserId },
  });

  if (user) {
    // Bootstrap admin role if configured via env
    if (authUser?.email) {
      const bootstrapAdmins = (process.env.ADMIN_EMAILS || '')
        .split(',')
        .map((value) => value.trim().toLowerCase())
        .filter(Boolean);
      if (bootstrapAdmins.includes(authUser.email.toLowerCase()) && user.role !== 'ADMIN') {
        user = await prisma.user.update({
          where: { id: user.id },
          data: { role: 'ADMIN' },
        });
      }
    }
    return user;
  }

  const authUser = await prisma.authUser.findUnique({
    where: { id: authUserId },
  });

  if (!authUser) {
    throw new Error('Better Auth user not found');
  }

  const bootstrapAdmins = (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);

  const shouldPromoteToAdmin =
    !!authUser.email && bootstrapAdmins.includes(authUser.email.toLowerCase());

  user = await prisma.user.create({
    data: {
      clerkId: authUserId,
      email: authUser.email,
      name: authUser.name || authUser.email,
      role: shouldPromoteToAdmin ? 'ADMIN' : 'USER',
    },
  });

  await prisma.authUser.update({
    where: { id: authUserId },
    data: {
      appUserId: user.id,
    },
  });

  return user;
}
