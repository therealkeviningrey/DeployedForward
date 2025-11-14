"use client";

import { useState } from 'react';
import { analytics } from '@/lib/analytics';

export function HintDrawer({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    const next = !open;
    setOpen(next);
    if (next) analytics.track('lesson_hint_opened');
  };

  return (
    <div style={{ border: '1px solid var(--border-subtle)', borderRadius: 8, background: 'var(--bg-secondary)' }}>
      <button onClick={toggle} className="btn btn-ghost" style={{ width: '100%', justifyContent: 'space-between' }} aria-expanded={open}>
        Need a hint?
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" />
        </svg>
      </button>
      {open && (
        <div style={{ padding: '0 1rem 1rem 1rem' }}>
          {children}
        </div>
      )}
    </div>
  );
}
