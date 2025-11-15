#!/usr/bin/env tsx

import 'dotenv/config';
import { prisma } from '../lib/prisma';

const [, , emailArg, roleArg] = process.argv;

async function main() {
  if (!emailArg || !roleArg) {
    console.error('Usage: npm run auth:set-role -- <email> <role>');
    console.error('Roles: USER, STAFF, ADMIN');
    process.exit(1);
  }

  const email = emailArg.toLowerCase();
  const role = roleArg.toUpperCase();

  if (!['USER', 'STAFF', 'ADMIN'].includes(role)) {
    console.error(`Invalid role "${role}". Must be one of USER, STAFF, ADMIN.`);
    process.exit(1);
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    console.error(`No user found with email ${email}.`);
    process.exit(1);
  }

  const updated = await prisma.user.update({
    where: { id: user.id },
    data: { role: role as 'USER' | 'STAFF' | 'ADMIN' },
  });

  console.log(`Updated ${updated.email} to role ${updated.role}.`);
}

main()
  .catch((error) => {
    console.error('Failed to set user role:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

