'use client';

import { useState, useEffect } from 'react';
import styles from './ConsentBanner.module.css';

export function ConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('analytics-consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem('analytics-consent', 'all');
    setShowBanner(false);
    // Enable analytics
    if (typeof window !== 'undefined' && (window as any).va) {
      (window as any).va('event', 'consent_granted');
    }
  };

  const acceptEssential = () => {
    localStorage.setItem('analytics-consent', 'essential');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className={styles.banner}>
      <div className={styles.content}>
        <p className={styles.text}>
          We use cookies to improve your experience. Essential cookies are required for the site to function.
          Analytics cookies help us understand usage patterns.
        </p>
        <div className={styles.actions}>
          <button onClick={acceptEssential} className="btn btn-ghost btn-sm">
            Essential Only
          </button>
          <button onClick={acceptAll} className="btn btn-primary btn-sm">
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}

