import { betterAuth as createBetterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import type { BetterAuthOptions } from 'better-auth';
import type { GenericOAuthConfig } from 'better-auth/plugins/generic-oauth';
import { genericOAuth } from 'better-auth/plugins/generic-oauth';
import { twoFactor } from 'better-auth/plugins/two-factor';
import { headers } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { sendPasswordResetEmail, sendTwoFactorCodeEmail } from '@/lib/email';
import type { AuthServerAdapter, AuthSession } from './types';
import { AuthError } from './types';
import { ensureUserRecord } from '@/lib/users';

function buildOAuthConfigs(): GenericOAuthConfig[] {
  const configs: GenericOAuthConfig[] = [];

  const googleClientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const googleClientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
  if (googleClientId && googleClientSecret) {
    configs.push({
      providerId: 'google',
      discoveryUrl: 'https://accounts.google.com/.well-known/openid-configuration',
      clientId: googleClientId,
      clientSecret: googleClientSecret,
      scopes: ['openid', 'email', 'profile'],
    });
  }

  const githubClientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  const githubClientSecret = process.env.GITHUB_OAUTH_CLIENT_SECRET;
  if (githubClientId && githubClientSecret) {
    configs.push({
      providerId: 'github',
      authorizationUrl: 'https://github.com/login/oauth/authorize',
      tokenUrl: 'https://github.com/login/oauth/access_token',
      userInfoUrl: 'https://api.github.com/user',
      clientId: githubClientId,
      clientSecret: githubClientSecret,
      scopes: ['read:user', 'user:email'],
      mapProfileToUser: (profile) => ({
        name: profile.name ?? profile.login ?? null,
        image: profile.avatar_url ?? null,
      }),
    });
  }

  return configs;
}

const oauthConfigs = buildOAuthConfigs();

const betterAuthOptions: BetterAuthOptions = {
  baseURL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  database: prismaAdapter(prisma, { provider: 'postgresql', usePlural: false }),
  user: {
    modelName: 'authUser',
    additionalFields: {
      appUserId: {
        type: 'string',
        required: false,
        fieldName: 'appUserId',
      },
      twoFactorEnabled: {
        type: 'boolean',
        required: false,
        fieldName: 'twoFactorEnabled',
        defaultValue: false,
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
        await sendPasswordResetEmail(user.email, user.name || user.email, url);
      }
    },
  },
  plugins: [
    twoFactor({
      issuer: 'Deployed Forward',
      otpOptions: {
        sendOTP: async ({ user, otp }) => {
          if (user.email) {
            await sendTwoFactorCodeEmail(user.email, user.name ?? user.email, otp);
          }
        },
      },
    }),
    ...(oauthConfigs.length > 0 ? [genericOAuth({ config: oauthConfigs })] : []),
  ],
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
  role: null,
  twoFactorEnabled: false,
  hasRole: async () => false,
});

const cloneRequestHeaders = async () => {
  try {
    const mutable = new Headers();
    const incoming = await headers();
    incoming.forEach((value, key) => {
      mutable.set(key, value);
    });
    return mutable;
  } catch {
    return null;
  }
};

export const betterAuthServerAdapter: AuthServerAdapter = {
  async getAuthSession() {
    const headers = await cloneRequestHeaders();
    if (!headers) {
      return createAnonymousSession();
    }

    try {
      const result = await betterAuth.api.getSession({ headers });
      if (!result) {
        return createAnonymousSession();
      }

      const authUserId = result.user.id;
      const appUser = await ensureUserRecord(authUserId);
      const assignedRole = appUser.role ?? 'USER';
      const twoFactorEnabled = Boolean((result.user as any).twoFactorEnabled);

      return {
        userId: authUserId,
        sessionId: result.session.id,
        isAuthenticated: true,
        role: assignedRole,
        twoFactorEnabled,
        hasRole: async (targetRole: string) => {
          const normalized = targetRole.toLowerCase();
          if (['admin', 'org:admin'].includes(normalized)) {
            return assignedRole === 'ADMIN' || assignedRole === 'STAFF';
          }
          if (normalized === 'staff') {
            return assignedRole === 'STAFF';
          }
          if (normalized === 'user') {
            return assignedRole === 'USER' || assignedRole === 'ADMIN' || assignedRole === 'STAFF';
          }
          return false;
        },
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
    const session = await this.getAuthSession();
    if (!(await session.hasRole(role))) {
      throw new AuthError('FORBIDDEN');
    }
  },
};
