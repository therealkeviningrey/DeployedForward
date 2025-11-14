"use client";

import { useState, useEffect } from 'react';
import { TrackedLink } from './TrackedLink';
import { CountdownPill } from './CountdownPill';
import styles from './PromoBanner.module.css';

interface PromoBannerProps {
  message: string;
  ctaText: string;
  ctaHref: string;
  countdownTarget?: string | Date;
  dismissible?: boolean;
  storageKey?: string;
}

export function PromoBanner({
  message,
  ctaText,
  ctaHref,
  countdownTarget,
  dismissible = true,
  storageKey = 'promo-banner-dismissed',
}: PromoBannerProps) {
  const [isDismissed, setIsDismissed] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if banner was previously dismissed
    const dismissed = localStorage.getItem(storageKey);
    if (dismissed === 'true') {
      setIsDismissed(true);
    }
    setIsLoaded(true);
  }, [storageKey]);

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem(storageKey, 'true');
  };

  // Don't render until client-side check is complete
  if (!isLoaded || isDismissed) {
    return null;
  }

  return (
    <div className={styles.banner}>
      <div className={styles.content}>
        <div className={styles.message}>
          <span>{message}</span>
          {countdownTarget && (
            <CountdownPill target={countdownTarget} labelPrefix="Ends in" />
          )}
        </div>
        <div className={styles.actions}>
          <TrackedLink
            href={ctaHref}
            className={styles.cta}
            label="Promo Banner CTA"
            location="Promo Banner"
          >
            {ctaText}
          </TrackedLink>
          {dismissible && (
            <button
              onClick={handleDismiss}
              className={styles.dismiss}
              aria-label="Dismiss banner"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M12 4L4 12M4 4l8 8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

