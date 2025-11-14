'use client';

import type { WindowApp } from './types';
import { useOperatorOS } from './OperatorOSContext';
import styles from './OperatorDock.module.css';

type OperatorDockProps = {
  apps: WindowApp[];
};

export function OperatorDock({ apps }: OperatorDockProps) {
  const { windows, openWindow, focusWindow, minimizeWindow } = useOperatorOS();

  const handleAppClick = (appId: string) => {
    const windowState = windows.get(appId);
    
    if (windowState?.isOpen) {
      if (windowState.isMinimized) {
        // Restore minimized window
        minimizeWindow(appId);
      } else {
        // Focus already open window
        focusWindow(appId);
      }
    } else {
      // Open closed window
      openWindow(appId, { source: 'launcher' });
    }
  };

  return (
    <div className={styles.dock}>
      <div className={styles.dockInner}>
        {apps.map((app) => {
          const Icon = app.icon;
          const windowState = windows.get(app.id);
          const isActive = windowState?.isOpen && !windowState?.isMinimized;
          const isMinimized = windowState?.isOpen && windowState?.isMinimized;

          return (
            <button
              key={app.id}
              type="button"
              className={`${styles.dockIcon} ${isActive ? styles.dockIconActive : ''} ${isMinimized ? styles.dockIconMinimized : ''}`}
              onClick={() => handleAppClick(app.id)}
              aria-label={`${isActive ? 'Focus' : isMinimized ? 'Restore' : 'Open'} ${app.title}`}
              title={app.title}
            >
              <Icon size={24} strokeWidth={1.75} />
              {isActive && <span className={styles.activeIndicator} />}
              {isMinimized && <span className={styles.minimizedIndicator} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

