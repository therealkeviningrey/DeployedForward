'use client';

import { useEffect, useState } from 'react';
import type { WindowApp } from '@/components/OperatorOS/types';
import { useOperatorOS } from '@/components/OperatorOS/OperatorOSContext';
import styles from './LauncherOptionRail.module.css';

type LauncherOptionRailProps = {
  apps: WindowApp[];
  onOpenPalette?: () => void;
};

export function LauncherOptionRail({ apps, onOpenPalette }: LauncherOptionRailProps) {
  const { windows, openWindow, focusWindow, minimizeWindow } = useOperatorOS();
  const [showHint, setShowHint] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (!showHint) return;
    const timer = setTimeout(() => {
      setShowHint(false);
    }, 6000);
    return () => clearTimeout(timer);
  }, [showHint]);

  const handleActivate = (appId: string) => {
    if (!hasInteracted) {
      setHasInteracted(true);
      setShowHint(false);
    }
    const state = windows.get(appId);
    if (!state || !state.isOpen) {
      openWindow(appId, { source: 'launcher' });
      return;
    }
    if (state.isMinimized) {
      minimizeWindow(appId);
      return;
    }
    focusWindow(appId);
  };

  return (
    <aside className={styles.rail}>
      <div className={styles.label}>
        <span>Launcher</span>
        <span className={styles.labelCaret} />
      </div>

      {showHint && (
        <div className={styles.hint} role="status">
          <strong>Tap a module</strong>
          <span>Press ⌘K for command palette</span>
          <button type="button" aria-label="Dismiss hint" onClick={() => setShowHint(false)}>
            ✕
          </button>
        </div>
      )}

      <nav className={styles.iconColumn} aria-label="Mission apps">
        {apps.map((app) => {
          const state = windows.get(app.id);
          const Icon = app.icon;
          const isActive = state?.isOpen && !state?.isMinimized;
          const isMinimized = state?.isOpen && state?.isMinimized;

          return (
            <button
              key={app.id}
              type="button"
              className={`${styles.railButton} ${isActive ? styles.railButtonActive : ''} ${
                isMinimized ? styles.railButtonSleep : ''
              }`}
              onClick={() => handleActivate(app.id)}
              aria-label={`${app.title} ${isActive ? 'active' : isMinimized ? 'minimized' : ''}`}
            >
              <span className={styles.beacon} data-state={isMinimized ? 'sleep' : isActive ? 'active' : 'idle'} />
              <Icon size={18} strokeWidth={1.6} />
              <span className={styles.tooltip}>
                <strong>{app.title}</strong>
                <span>{app.callsign}</span>
                <small>{isMinimized ? 'Status: Dormant' : isActive ? 'Status: Active' : 'Status: Ready'}</small>
              </span>
            </button>
          );
        })}
      </nav>

      <div className={styles.railControls}>
        <button
          type="button"
          className={styles.commandButton}
          onClick={() => onOpenPalette?.()}
          aria-label="Open command palette"
        >
          ⌘K
        </button>
        <span>Command</span>
      </div>
    </aside>
  );
}


