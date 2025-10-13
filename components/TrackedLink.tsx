'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import { analytics } from '@/lib/analytics';

interface TrackedLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  label?: string;
  location?: string;
  onClick?: () => void;
}

export function TrackedLink({
  href,
  children,
  className,
  label,
  location,
  onClick,
}: TrackedLinkProps) {
  const handleClick = () => {
    // Extract label from children if not provided
    const ctaLabel =
      label ||
      (typeof children === 'string' ? children : 'Unknown CTA');
    
    // Track the CTA click
    analytics.trackCTA(
      ctaLabel,
      location || window.location.pathname,
      href
    );

    // Call custom onClick if provided
    if (onClick) {
      onClick();
    }
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}

