"use client";

import styles from './StrikethroughPrice.module.css';

interface StrikethroughPriceProps {
  originalPrice: number;
  discountedPrice: number;
  period?: 'mo' | 'yr' | 'one-time';
  showSavings?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function StrikethroughPrice({
  originalPrice,
  discountedPrice,
  period = 'mo',
  showSavings = true,
  size = 'md',
  className = '',
}: StrikethroughPriceProps) {
  const savings = originalPrice - discountedPrice;
  const periodText = period === 'one-time' ? '' : `/${period}`;

  return (
    <div className={`${styles.container} ${styles[size]} ${className}`}>
      <div className={styles.priceRow}>
        <span className={styles.originalPrice}>${originalPrice}{periodText}</span>
        <span className={styles.discountedPrice}>${discountedPrice}{periodText}</span>
      </div>
      {showSavings && savings > 0 && (
        <div className={styles.savings}>Save ${savings}{period !== 'one-time' ? `/${period}` : ''}</div>
      )}
    </div>
  );
}

