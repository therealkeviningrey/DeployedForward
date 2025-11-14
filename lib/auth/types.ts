export type AuthProvider = 'better-auth';

export type AuthErrorCode = 'UNAUTHENTICATED' | 'FORBIDDEN';

export class AuthError extends Error {
  code: AuthErrorCode;

  constructor(code: AuthErrorCode, message?: string) {
    super(message ?? code);
    this.name = 'AuthError';
    this.code = code;
  }
}

export interface AuthSession {
  userId: string | null;
  sessionId: string | null;
  isAuthenticated: boolean;
  hasRole: (role: string) => Promise<boolean>;
}

export interface AuthServerAdapter {
  getAuthSession(): AuthSession | Promise<AuthSession>;
  requireUserId(): string | Promise<string>;
  assertRole(role: string): void | Promise<void>;
}

