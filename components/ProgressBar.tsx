import React from 'react';

interface Props {
  value: number; // 0..100
}

export function ProgressBar({ value }: Props) {
  const pct = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      style={{
        width: '100%',
        height: 10,
        borderRadius: 9999,
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-subtle)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: `${pct}%`,
          height: '100%',
          background: 'linear-gradient(90deg, rgba(255,107,0,0.5), var(--accent))',
          transition: 'width var(--duration-base) var(--easing-ease)',
        }}
      />
    </div>
  );
}
