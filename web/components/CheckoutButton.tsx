'use client';

import { useState } from 'react';

interface CheckoutButtonProps {
  tier: 'OPERATOR' | 'UNIT' | 'BATTALION';
  billingPeriod: 'monthly' | 'annual';
  label?: string;
  className?: string;
}

export function CheckoutButton({
  tier,
  billingPeriod,
  label = 'Subscribe',
  className = 'btn btn-primary',
}: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier, billingPeriod }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Checkout failed');
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
    }
  };

  return (
    <>
      <button onClick={handleCheckout} disabled={loading} className={className}>
        {loading ? 'Loading...' : label}
      </button>
      {error && <p className="text-accent text-sm mt-2">{error}</p>}
    </>
  );
}

