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

const betterAuthClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL ? `${process.env.NEXT_PUBLIC_APP_URL}/api/auth` : undefined,
});

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

export function SignInButton({
  children,
  ..._rest
}: { children?: ReactNode } & Record<string, unknown>) {
  return (
    <Link href="/login" className="btn btn-primary btn-sm">
      {children ?? 'Sign in'}
    </Link>
  );
}

export function UserButton() {
  const { signOut } = useBetterAuth();

  return (
    <div className="flex items-center gap-2">
      <Link href="/dashboard" className="btn btn-ghost btn-sm">
        Dashboard
      </Link>
      <button
        className="btn btn-ghost btn-sm"
        onClick={() => {
          void signOut();
        }}
      >
        Sign out
      </button>
    </div>
  );
}

export function SignIn() {
  const { isSignedIn, isLoaded, signInWithEmail } = useBetterAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

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

  return (
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
    }),
    [authState.isLoaded, authState.isSignedIn, authState.user, refresh, signOut, signInWithEmail],
  );
}
