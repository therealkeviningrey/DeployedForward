import { prisma } from './prisma';

export async function ensureUserRecord(authUserId: string) {
  let user = await prisma.user.findUnique({
    where: { clerkId: authUserId },
  });

  if (user) {
    return user;
  }

  const authUser = await prisma.authUser.findUnique({
    where: { id: authUserId },
  });

  if (!authUser) {
    throw new Error('Better Auth user not found');
  }

  user = await prisma.user.create({
    data: {
      clerkId: authUserId,
      email: authUser.email,
      name: authUser.name || authUser.email,
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
