"use client";

import { useState } from 'react';
import { analytics } from '@/lib/analytics';

interface Props {
  placeholder?: string;
  buttonLabel?: string;
  compact?: boolean;
  location?: string;
  variant?: 'free-tutorial' | 'newsletter' | 'default';
  successMessage?: string;
  showPrivacy?: boolean;
}

export function EmailCapture({ 
  placeholder = 'Your email', 
  buttonLabel = 'Get the free lesson', 
  compact = false, 
  location = 'Email Capture',
  variant = 'default',
  successMessage = 'Check your inbox for the free lesson.',
  showPrivacy = true,
}: Props) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError(null);
    analytics.trackFormStart(`email_capture_${variant}`);
    analytics.track('email_capture_attempt', { location, variant });
    
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email,
          source: location,
          variant,
        }),
      });
      if (!res.ok) throw new Error('Failed');
      setDone(true);
      analytics.trackFormSubmit(`email_capture_${variant}`, true);
      analytics.track('email_capture_success', { location, variant });
    } catch (e) {
      setError('Please try again later.');
      analytics.trackFormSubmit(`email_capture_${variant}`, false);
      analytics.track('email_capture_error', { location, variant });
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div style={{ textAlign: 'center' }}>
        <p className="text-secondary">{successMessage}</p>
        {variant === 'free-tutorial' && (
          <p className="text-secondary" style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
            Next step: Check your email and start your first lesson.
          </p>
        )}
      </div>
    );
  }

  return (
    <div style={{ width: '100%', maxWidth: compact ? '500px' : '600px' }}>
      <form onSubmit={submit} style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
        <input
          type="email"
          required
          inputMode="email"
          placeholder={placeholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
            color: 'var(--text-primary)',
            borderRadius: '8px',
            padding: compact ? '0.5rem 0.75rem' : '0.75rem 1rem',
            minWidth: 220,
            flex: 1,
          }}
          aria-label="Email address"
        />
        <button className="btn btn-primary" disabled={loading} type="submit">
          {loading ? 'Sending…' : buttonLabel}
        </button>
      </form>
      {error && <span className="text-accent text-sm" style={{ display: 'block', marginTop: '0.5rem', textAlign: 'center' }}>{error}</span>}
      {showPrivacy && !error && (
        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.5rem', textAlign: 'center' }}>
          We respect your privacy. Unsubscribe at any time.
        </p>
      )}
    </div>
  );
}
