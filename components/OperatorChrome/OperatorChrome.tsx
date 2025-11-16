'use client';

import { TacticalBackground } from '@/components/OperatorOS/TacticalBackground';
import styles from './OperatorChrome.module.css';
import type { PropsWithChildren } from 'react';

export function OperatorChrome({ children }: PropsWithChildren) {
  return (
    <div className={styles.root} data-operator-chrome>
      <TacticalBackground />
      <div className={styles.horizon} aria-hidden />
      <div className={styles.glow} aria-hidden />
      <div className={styles.inner} id="operator-content" tabIndex={-1}>
        {children}
      </div>
    </div>
  );
}

