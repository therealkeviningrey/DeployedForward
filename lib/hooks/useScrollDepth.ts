'use client';

import { useEffect, useRef } from 'react';
import { analytics } from '@/lib/analytics';

export function useScrollDepth() {
  const trackedDepths = useRef(new Set<number>());

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollPercent = Math.round(
        (scrollTop / (documentHeight - windowHeight)) * 100
      );

      // Track at 25%, 50%, 75%, and 100%
      const milestones = [25, 50, 75, 100];
      
      for (const milestone of milestones) {
        if (scrollPercent >= milestone && !trackedDepths.current.has(milestone)) {
          trackedDepths.current.add(milestone);
          analytics.trackScrollDepth(milestone);
        }
      }
    };

    // Throttle scroll event
    let timeoutId: NodeJS.Timeout;
    const throttledScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 100);
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      clearTimeout(timeoutId);
    };
  }, []);
}

