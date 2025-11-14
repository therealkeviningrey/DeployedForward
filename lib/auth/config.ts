import type { AuthProvider } from './types';

const raw = (process.env.AUTH_PROVIDER ?? process.env.NEXT_PUBLIC_AUTH_PROVIDER)?.toLowerCase();

if (raw && raw !== 'better-auth') {
  console.warn(
    `AUTH_PROVIDER is set to "${raw}", but Clerk support has been removed. Falling back to better-auth.`,
  );
}

export const AUTH_PROVIDER: AuthProvider = 'better-auth';
export const IS_BETTER_AUTH = true;
