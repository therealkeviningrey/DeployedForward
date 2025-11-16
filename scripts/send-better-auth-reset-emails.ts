#!/usr/bin/env tsx

import 'dotenv/config';
import { prisma } from '../lib/prisma';
import { betterAuth } from '../lib/auth/better-auth';

const redirectTo =
  process.env.BETTER_AUTH_RESET_REDIRECT ??
  `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/login`;

const dryRun = process.argv.includes('--dry-run');

async function main() {
  const users = await prisma.authUser.findMany({
    select: {
      email: true,
    },
  });

  console.log(`Preparing to send reset emails to ${users.length} users.`);
  if (dryRun) {
    console.log('Dry run: no emails will be sent.');
  }

  let processed = 0;
  for (const authUser of users) {
    const email = authUser.email;
    if (!email) continue;

    if (!dryRun) {
      await betterAuth.api.requestPasswordReset({
        body: {
          email,
          redirectTo,
        },
        headers: new Headers(),
      });
    }

    processed += 1;
    console.log(`${dryRun ? '[dry-run] ' : ''}Queued reset for ${email}`);
  }

  console.log(`Completed ${dryRun ? 'dry run' : 'reset email sending'} for ${processed} users.`);
}

main()
  .catch((error) => {
    console.error('Password reset enqueue failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

