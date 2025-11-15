'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

export function ForgotPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState(searchParams?.get('email') ?? '');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('submitting');
    setError(null);

    try {
      const response = await fetch('/api/auth/request-password-reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          redirectTo: `${window.location.origin}/login`,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.error ?? 'Password reset request failed. Please try again.');
      }

      setStatus('success');
    } catch (err) {
      console.error('Password reset request failed', err);
      setError(err instanceof Error ? err.message : 'Password reset request failed. Please try again.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="space-y-4 text-center">
        <h2 className="text-xl font-semibold">Check your inbox</h2>
        <p className="text-secondary">
          If an account exists for <span className="font-semibold">{email}</span>, we just sent a password reset link.
        </p>
        <button
          className="btn btn-primary w-full"
          onClick={() => {
            router.push('/login');
          }}
        >
          Return to login
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-2">
        <label htmlFor="email" className="text-sm font-semibold">
          Email address
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-4 py-3"
          placeholder="you@example.com"
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button className="btn btn-primary w-full" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending reset link…' : 'Send reset link'}
      </button>

      <p className="text-center text-sm text-secondary">
        Remembered your password?{' '}
        <Link href="/login" className="text-accent underline-offset-2 hover:underline">
          Back to login
        </Link>
      </p>
    </form>
  );
}

