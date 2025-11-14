"use client";

import { useEffect } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  title?: string;
  nextHref?: string;
}

export function SuccessModal({ open, onClose, title = 'Mission complete!', nextHref }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-subtle)', borderRadius: 12, maxWidth: 480, width: '100%', padding: 24, boxShadow: 'var(--shadow-lg)' }}>
        <h3 style={{ marginBottom: 8 }}>{title}</h3>
        <p className="text-secondary" style={{ marginBottom: 16 }}>Nice work. Keep your momentum going.</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {nextHref && (
            <a className="btn btn-primary" href={nextHref}>Next Lesson →</a>
          )}
          <a className="btn btn-ghost" href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('I just completed a Deployed Forward mission! #AI #learning')}`}>Share</a>
          <button className="btn btn-ghost" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
