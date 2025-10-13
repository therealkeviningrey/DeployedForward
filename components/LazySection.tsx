'use client';

import { ReactNode } from 'react';
import { useLazyLoad } from '@/lib/hooks/useLazyLoad';
import styles from './LazySection.module.css';

interface LazySectionProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
  animation?: 'fade' | 'slide-up' | 'slide-left' | 'scale' | 'none';
}

export function LazySection({
  children,
  className = '',
  threshold = 0.1,
  animation = 'fade',
}: LazySectionProps) {
  const { ref, isVisible } = useLazyLoad({ threshold, triggerOnce: true });

  return (
    <section
      ref={ref as any}
      className={`${styles.lazySection} ${isVisible ? styles.visible : ''} ${
        animation !== 'none' ? styles[animation] : ''
      } ${className}`}
    >
      {children}
    </section>
  );
}

