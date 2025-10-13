'use client';

import { useEffect, useRef, useState } from 'react';
import { useLazyLoad } from '@/lib/hooks/useLazyLoad';
import styles from './Counter.module.css';

interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
}

export function Counter({
  end,
  duration = 2000,
  suffix = '',
  prefix = '',
  decimals = 0,
  className = '',
}: CounterProps) {
  const [count, setCount] = useState(0);
  const { ref, isVisible } = useLazyLoad({ threshold: 0.5, triggerOnce: true });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;
    hasAnimated.current = true;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      setCount(end);
      return;
    }

    const startTime = Date.now();
    const startValue = 0;
    const change = end - startValue;

    const easeOutQuad = (t: number) => t * (2 - t);

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easedProgress = easeOutQuad(progress);
      const currentCount = startValue + change * easedProgress;

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  const formattedCount = count.toFixed(decimals);

  return (
    <span ref={ref as any} className={`${styles.counter} ${className}`}>
      {prefix}
      {formattedCount}
      {suffix}
    </span>
  );
}

