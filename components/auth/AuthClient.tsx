'use client';

import { useCallback, useEffect, useMemo, useState, type FormEvent, type ReactNode } from 'react';
import Link from 'next/link';
import { createAuthClient } from 'better-auth/client';

type BetterAuthUser = {
  id: string;
  email: string;
  name: string | null;
  image?: string | null;
};

const resolvedBaseURL =
  typeof window !== 'undefined'
    ? `${window.location.origin}/api/auth`
    : process.env.NEXT_PUBLIC_APP_URL
      ? `${process.env.NEXT_PUBLIC_APP_URL}/api/auth`
      : undefined;

const betterAuthClient = createAuthClient({
  baseURL: resolvedBaseURL,
});

const SOCIAL_PROVIDERS: Array<{ id: string; label: string }> = [
  process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID
    ? { id: 'google', label: 'Continue with Google' }
    : null,
  process.env.NEXT_PUBLIC_GITHUB_OAUTH_CLIENT_ID
    ? { id: 'github', label: 'Continue with GitHub' }
    : null,
].filter(Boolean) as Array<{ id: string; label: string }>;

export function AuthProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function SignedIn({ children }: { children: ReactNode }) {
  const { isSignedIn } = useBetterAuth();
  if (!isSignedIn) return null;
  return <>{children}</>;
}

export function SignedOut({ children }: { children: ReactNode }) {
  const { isSignedIn, isLoaded } = useBetterAuth();
  if (!isLoaded) return null;
  if (isSignedIn) return null;
  return <>{children}</>;
}

type SignInButtonProps = {
  children?: ReactNode;
  className?: string;
  href?: string;
};

export function SignInButton({ children, className, href = '/login' }: SignInButtonProps) {
  return (
    <Link href={href} className={className ?? 'btn btn-primary btn-sm'}>
      {children ?? 'Sign in'}
    </Link>
  );
}

export function UserButton({ afterSignOutUrl }: { afterSignOutUrl?: string }) {
  const { signOut } = useBetterAuth();

  const handleSignOut = useCallback(async () => {
    await signOut();
    if (afterSignOutUrl) {
      window.location.href = afterSignOutUrl;
    }
  }, [afterSignOutUrl, signOut]);

  return (
    <div className="flex items-center gap-2">
      <Link href="/dashboard" className="btn btn-ghost btn-sm">
        Dashboard
      </Link>
      <button
        className="btn btn-ghost btn-sm"
        onClick={() => {
          void handleSignOut();
        }}
      >
        Sign out
      </button>
    </div>
  );
}

export function SignIn() {
  const { isSignedIn, isLoaded, signInWithEmail, signInWithOAuth } = useBetterAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [oauthError, setOauthError] = useState<string | null>(null);

  if (!isLoaded) {
    return (
      <div className="py-8 text-center text-secondary">
        <span>Loading authentication…</span>
      </div>
    );
  }

  if (isSignedIn) {
    return (
      <div className="space-y-4 text-center">
        <p className="text-secondary">You are already signed in.</p>
        <Link href="/dashboard" className="btn btn-primary">
          Go to dashboard
        </Link>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="space-y-4 text-center">
        <p className="text-secondary">Signed in successfully.</p>
        <Link href="/dashboard" className="btn btn-primary">
          Continue to dashboard
        </Link>
      </div>
    );
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('submitting');
    setError(null);
    try {
      await signInWithEmail(email, password);
      setStatus('success');
    } catch (err) {
      console.error('Sign-in failed', err);
      setError('Sign-in failed. Check your credentials and try again.');
      setStatus('idle');
    }
  };

  const handleOAuthSignIn = async (providerId: string) => {
    setOauthError(null);
    try {
      await signInWithOAuth(providerId);
    } catch (err) {
      console.error('OAuth sign-in failed', err);
      setOauthError('Unable to start sign-in with that provider. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <label htmlFor="email" className="text-sm font-semibold">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            className="w-full rounded border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-4 py-3"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="password" className="text-sm font-semibold">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            className="w-full rounded border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-4 py-3"
            placeholder="••••••••"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button className="btn btn-primary w-full" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Signing in…' : 'Sign in'}
        </button>
        <p className="text-xs text-secondary">
          Forgot your password? <Link href="/forgot-password">Reset it here.</Link>
        </p>
      </form>

      {SOCIAL_PROVIDERS.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-xs uppercase tracking-wide text-secondary">
            <div className="h-px flex-1 bg-[var(--border-subtle)]" />
            <span>or continue with</span>
            <div className="h-px flex-1 bg-[var(--border-subtle)]" />
          </div>
          <div className="grid gap-2">
            {SOCIAL_PROVIDERS.map((provider) => (
              <button
                key={provider.id}
                type="button"
                className="btn btn-ghost w-full justify-center"
                onClick={() => void handleOAuthSignIn(provider.id)}
              >
                {provider.label}
              </button>
            ))}
          </div>
          {oauthError && <p className="text-sm text-red-500">{oauthError}</p>}
        </div>
      )}
    </div>
  );
}

export function useAuthUser() {
  const { isLoaded, isSignedIn, user, refresh } = useBetterAuth();
  return useMemo<AuthUserState>(
    () => ({
      isLoaded,
      isSignedIn,
      user,
      refresh,
    }),
    [isLoaded, isSignedIn, user, refresh],
  );
}

type AuthUserState = {
  isLoaded: boolean;
  isSignedIn: boolean;
  user: BetterAuthUser | null;
  refresh: () => Promise<void>;
};

function useBetterAuth() {
  const [authState, setAuthState] = useState({
    isLoaded: false,
    isSignedIn: false,
    user: null as BetterAuthUser | null,
  });

  const refresh = useCallback(async () => {
    const result = await betterAuthClient.getSession({ query: { disableRefresh: false } });
    setAuthState({
      isLoaded: true,
      isSignedIn: Boolean(result),
      user: result?.user ?? null,
    });
  }, []);

  const signOut = useCallback(async () => {
    await betterAuthClient.signOut();
    setAuthState({
      isLoaded: true,
      isSignedIn: false,
      user: null,
    });
  }, []);

  const signInWithEmail = useCallback(
    async (email: string, password: string) => {
      await betterAuthClient.signInEmail({
        body: {
          email,
          password,
        },
      });
      await refresh();
    },
    [refresh],
  );

  const signInWithOAuth = useCallback(
    async (providerId: string) => {
      await betterAuthClient.signIn.oauth2({
        providerId,
        callbackURL: `${window.location.origin}/dashboard`,
        errorCallbackURL: `${window.location.origin}/login?provider=${providerId}&error=1`,
      });
    },
    [],
  );

  useEffect(() => {
    let isMounted = true;
    const bootstrap = async () => {
      try {
        const result = await betterAuthClient.getSession();
        if (!isMounted) return;
        setAuthState({
          isLoaded: true,
          isSignedIn: Boolean(result),
          user: result?.user ?? null,
        });
      } catch (error) {
        console.error('Better Auth session load failed', error);
        if (isMounted) {
          setAuthState({
            isLoaded: true,
            isSignedIn: false,
            user: null,
          });
        }
      }
    };
    void bootstrap();
    return () => {
      isMounted = false;
    };
  }, []);

  return useMemo(
    () => ({
      isLoaded: authState.isLoaded,
      isSignedIn: authState.isSignedIn,
      user: authState.user,
      refresh,
      signOut,
      signInWithEmail,
       signInWithOAuth,
    }),
    [
      authState.isLoaded,
      authState.isSignedIn,
      authState.user,
      refresh,
      signOut,
      signInWithEmail,
      signInWithOAuth,
    ],
  );
}
