import type { AuthSession } from './types';
import { AuthError } from './types';
import { betterAuthServerAdapter } from './better-auth';

export async function getAuthSession(): Promise<AuthSession> {
  return Promise.resolve(betterAuthServerAdapter.getAuthSession());
}

export async function requireUserId(): Promise<string> {
  const userId = await Promise.resolve(betterAuthServerAdapter.requireUserId());
  if (!userId) {
    throw new AuthError('UNAUTHENTICATED');
  }
  return userId;
}

export async function assertRole(role: string): Promise<void> {
  await Promise.resolve(betterAuthServerAdapter.assertRole(role));
}

export { AuthError } from './types';
