"use client";

import { useEffect, useMemo, useState } from 'react';
import { SignedIn, SignedOut, SignInButton, useAuthUser } from '@/components/auth/AuthClient';
import { Container } from '@/components/Container';
import { Card } from '@/components/Card';
import { Pill } from '@/components/Pill';
import { CheckoutButton } from '@/components/CheckoutButton';
import { analytics } from '@/lib/analytics';
import { OperatorShell } from '@/components/OperatorShell';

type Step = 1 | 2 | 3;

export default function CheckoutPage() {
  const [step, setStep] = useState<Step>(1);
  const [billing, setBilling] = useState<'monthly' | 'annual'>(() => {
    if (typeof window === 'undefined') {
      return 'monthly';
    }
    return (window.localStorage.getItem('billingPeriod') as 'monthly' | 'annual' | null) ?? 'monthly';
  });
  const [holdUntil, setHoldUntil] = useState<number | null>(() => {
    if (typeof window === 'undefined') {
      return null;
    }
    const v = window.localStorage.getItem('seatHoldUntil');
    return v ? parseInt(v, 10) : null;
  });
  const { user } = useAuthUser();

  useEffect(() => {
    analytics.trackPageView('/checkout', 'Checkout');
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem('billingPeriod', billing);
  }, [billing]);

  const holdRemaining = useMemo(() => (holdUntil ? Math.max(0, holdUntil - Date.now()) : 0), [holdUntil]);

  useEffect(() => {
    if (!holdUntil) return;
    const id = setInterval(() => {
      if (Date.now() >= holdUntil) {
        setHoldUntil(null);
        if (typeof window !== 'undefined') {
          window.localStorage.removeItem('seatHoldUntil');
        }
      }
    }, 1000);
    return () => clearInterval(id);
  }, [holdUntil]);

  const startHold = () => {
    const until = Date.now() + 15 * 60 * 1000; // 15 minutes
    setHoldUntil(until);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('seatHoldUntil', String(until));
    }
    analytics.track('seat_hold_started', { duration_min: 15 });
  };

  const formatMs = (ms: number) => {
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <OperatorShell
      activePath="/checkout"
      breadcrumb={[{ label: 'Operations' }, { label: 'checkout/' }]}
      title="Checkout"
      subtitle="Reserve your founding operator seat."
    >
      <Container>
        <div className="py-12">
        {/* Stepper */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          {[1,2,3].map((n) => (
            <div key={n} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div
                aria-current={step === n ? 'step' : undefined}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: '9999px',
                  border: '1px solid var(--border-subtle)',
                  background: step >= n ? 'rgba(255,107,0,0.15)' : 'transparent',
                  color: step >= n ? 'var(--accent)' : 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                }}
              >{n}</div>
              {n < 3 && (
                <div style={{ width: 40, height: 2, background: step > n ? 'var(--accent)' : 'var(--border-subtle)' }} />
              )}
            </div>
          ))}
        </div>

        <h1 className="mb-2">Complete your enrollment</h1>
        <p className="text-secondary mb-6">Three quick steps — account, details, and payment.</p>

        {/* Step 1: Account */}
        {step === 1 && (
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
              <div>
                <h3 className="mb-1">1. Account</h3>
                <p className="text-secondary">Sign in to continue. Your subscription ties to your account.</p>
              </div>
              <div>
                    <SignedOut>
                      <SignInButton className="btn btn-primary">Sign in to continue</SignInButton>
                    </SignedOut>
                <SignedIn>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setStep(2);
                      analytics.track('checkout_step', { step: 2 });
                    }}
                  >
                    Continue as {user?.email ?? 'user'}
                  </button>
                </SignedIn>
              </div>
            </div>
          </Card>
        )}

        {/* Step 2: Details */}
        {step === 2 && (
          <Card>
            <h3 className="mb-3">2. Details</h3>
            <div className="flex gap-2 mb-4">
              <Pill active={billing==='monthly'} onClick={() => setBilling('monthly')}>Monthly</Pill>
              <Pill active={billing==='annual'} onClick={() => setBilling('annual')}>Annual (save 17%)</Pill>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
              <button className="btn btn-ghost" onClick={startHold} disabled={!!holdUntil}>
                {holdUntil ? `Seat reserved (${formatMs(holdRemaining)})` : 'Reserve seat (15m hold)'}
              </button>
              <span className="text-xs text-secondary">Limited founding pricing for first 100 operators.</span>
            </div>

            <div className="flex gap-2 mt-4">
              <button className="btn btn-ghost" onClick={() => setStep(1)}>Back</button>
              <button className="btn btn-primary" onClick={() => { setStep(3); analytics.track('checkout_step', { step: 3 }); }}>Continue</button>
            </div>
          </Card>
        )}

        {/* Step 3: Payment */}
        {step === 3 && (
          <Card>
            <h3 className="mb-3">3. Payment</h3>
            <p className="text-secondary mb-3">Promotion codes accepted at checkout.</p>
            <div className="flex gap-2">
              <button className="btn btn-ghost" onClick={() => setStep(2)}>Back</button>
              <CheckoutButton tier="OPERATOR" billingPeriod={billing} label="Continue to payment" />
            </div>
          </Card>
        )}
        </div>
      </Container>
    </OperatorShell>
  );
}
