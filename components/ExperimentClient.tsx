"use client";

import { useEffect } from 'react';
import { analytics } from '@/lib/analytics';
import { getCookie } from '@/lib/cookies';

const EXPERIMENT_KEYS = [
  'exp_hero_headline',
  'exp_hero_primary_cta',
];

export function ExperimentClient({ page }: { page?: string }) {
  useEffect(() => {
    const currentPage = page || window.location.pathname;

    EXPERIMENT_KEYS.forEach((key) => {
      const variant = getCookie(key);
      if (!variant) return;

      const storageKey = `exp_viewed_${key}_${variant}`;
      if (sessionStorage.getItem(storageKey)) return;

      analytics.track('experiment_viewed', {
        experiment: key,
        variant,
        page: currentPage,
      });

      sessionStorage.setItem(storageKey, '1');
    });
  }, [page]);

  return null;
}
