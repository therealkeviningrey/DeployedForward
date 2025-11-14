import { betterAuth as createBetterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import type { BetterAuthOptions } from 'better-auth';
import { headers } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { sendPasswordResetEmail } from '@/lib/email';
import type { AuthServerAdapter, AuthSession } from './types';
import { AuthError } from './types';

const betterAuthOptions: BetterAuthOptions = {
  baseURL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  database: prismaAdapter(prisma, { usePlural: false }),
  user: {
    modelName: 'authUser',
    additionalFields: {
      appUserId: {
        type: 'string',
        required: false,
        fieldName: 'appUserId',
      },
    },
  },
  session: {
    modelName: 'authSession',
  },
  account: {
    modelName: 'authAccount',
  },
  verification: {
    modelName: 'authVerification',
  },
  rateLimit: {
    storage: 'database',
    modelName: 'authRateLimit',
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    sendResetPassword: async ({ user, url }) => {
      if (user?.email) {
        await sendPasswordResetEmail(user.email, url);
      }
    },
  },
};

const createBetterAuthInstance = () => createBetterAuth(betterAuthOptions);

declare global {
  // eslint-disable-next-line no-var
  var __BETTER_AUTH_INSTANCE__: ReturnType<typeof createBetterAuthInstance> | undefined;
}

const betterAuthInstance = globalThis.__BETTER_AUTH_INSTANCE__ ?? createBetterAuthInstance();

if (process.env.NODE_ENV !== 'production') {
  globalThis.__BETTER_AUTH_INSTANCE__ = betterAuthInstance;
}

export const betterAuth = betterAuthInstance;

const createAnonymousSession = (): AuthSession => ({
  userId: null,
  sessionId: null,
  isAuthenticated: false,
  hasRole: async () => false,
});

const cloneRequestHeaders = () => {
  try {
    const mutable = new Headers();
    headers().forEach((value, key) => {
      mutable.set(key, value);
    });
    return mutable;
  } catch {
    return null;
  }
};

export const betterAuthServerAdapter: AuthServerAdapter = {
  async getAuthSession() {
    const headers = cloneRequestHeaders();
    if (!headers) {
      return createAnonymousSession();
    }

    try {
      const result = await betterAuth.api.getSession({ headers });
      if (!result) {
        return createAnonymousSession();
      }

      return {
        userId: result.user.id,
        sessionId: result.session.id,
        isAuthenticated: true,
        hasRole: async () => true, // TODO: Replace with Better Auth role enforcement
      };
    } catch (error) {
      if (process.env.NODE_ENV !== 'development') {
        console.error('Better Auth getAuthSession error', error);
      }
      return createAnonymousSession();
    }
  },
  async requireUserId() {
    const session = await this.getAuthSession();
    if (!session.userId) {
      throw new AuthError('UNAUTHENTICATED');
    }
    return session.userId;
  },
  async assertRole(role: string) {
    // TODO: Enforce Better Auth roles once org/role plugin is configured
    role;
    return;
  },
};
