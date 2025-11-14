"use client";

import React from 'react';

export function StreakIndicator({ days }: { days: number }) {
  const label = days <= 0 ? 'No active streak' : `${days}-day streak`;
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '0.375rem 0.625rem', border: '1px solid var(--border-subtle)', borderRadius: 999 }}>
      <span aria-hidden style={{ color: 'var(--accent)' }}>🔥</span>
      <span className="text-sm">{label}</span>
    </div>
  );
}
