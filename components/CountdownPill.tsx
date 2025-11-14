"use client";

import { useEffect, useState } from 'react';
import { Pill } from './Pill';

function formatDHMS(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

interface CountdownPillProps {
  target: string | Date;
  labelPrefix?: string;
  variant?: 'default' | 'urgent';
  disabled?: boolean;
}

export function CountdownPill({ 
  target, 
  labelPrefix = 'Starts in',
  variant = 'default',
  disabled = false
}: CountdownPillProps) {
  const [remaining, setRemaining] = useState<string>('');

  useEffect(() => {
    if (disabled) return;
    
    const targetDate = typeof target === 'string' ? new Date(target) : target;
    const tick = () => {
      setRemaining(formatDHMS(targetDate.getTime() - Date.now()));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target, disabled]);

  if (disabled) {
    return <Pill>{labelPrefix}: --d --h --m --s</Pill>;
  }

  const pillStyle = variant === 'urgent' ? {
    background: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    color: 'rgb(239, 68, 68)'
  } : undefined;

  return (
    <Pill style={pillStyle}>
      {labelPrefix}: {remaining}
    </Pill>
  );
}
