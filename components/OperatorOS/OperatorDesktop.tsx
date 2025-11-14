'use client';

import type { WindowApp } from './types';
import { OperatorOSProvider, useOperatorOS } from './OperatorOSContext';
import { OperatorWindow } from './OperatorWindow';
import { TacticalBackground } from './TacticalBackground';
import { LauncherOptionRail } from './launchers/LauncherOptionRail';
import styles from './OperatorDesktop.module.css';
import { useEffect, useMemo, useState } from 'react';

type OperatorDesktopProps = {
  apps: WindowApp[];
  autoOpenAppId?: string;
};

function DesktopContent({ apps, autoOpenAppId }: OperatorDesktopProps) {
  const { openWindow } = useOperatorOS();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (autoOpenAppId) {
      // Auto-open the specified app on mount
      const timer = setTimeout(() => {
        openWindow(autoOpenAppId, { source: 'launcher' });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [autoOpenAppId, openWindow]);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    if (!paletteOpen) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [paletteOpen]);

  useEffect(() => {
    if (!paletteOpen) {
      setQuery('');
    }
  }, [paletteOpen]);

  const commandOptions = useMemo(
    () =>
      apps.map((app) => ({
        id: app.id,
        label: app.title,
        description: `Open ${app.callsign}`,
        action: () => {
          openWindow(app.id, { source: 'palette' });
          setPaletteOpen(false);
        },
      })),
    [apps, openWindow]
  );

  const filteredCommands = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return commandOptions;
    return commandOptions.filter(
      (cmd) =>
        cmd.label.toLowerCase().includes(normalized) ||
        cmd.description.toLowerCase().includes(normalized)
    );
  }, [commandOptions, query]);

  return (
    <div className={styles.desktop}>
      <TacticalBackground />

      <div className={styles.layout} data-operator-layout>
        <LauncherOptionRail apps={apps} onOpenPalette={() => setPaletteOpen(true)} />

        <div className={styles.windowContainer}>
          {apps.map((app) => (
            <OperatorWindow key={app.id} app={app} />
          ))}
      </div>
      </div>

      {paletteOpen && (
        <div className={styles.paletteOverlay} role="dialog" aria-modal="true">
          <div className={styles.palette}>
            <label className={styles.paletteSearch}>
              <svg viewBox="0 0 20 20" aria-hidden>
                <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.4" fill="none" />
                <path d="m14.5 14.5 3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Type a command..."
                autoFocus
              />
            </label>

            <div className={styles.paletteResults}>
              {filteredCommands.length === 0 ? (
                <p className={styles.paletteEmpty}>No commands found. Try a different search.</p>
              ) : (
                filteredCommands.map((command) => (
                  <button
                    key={command.id}
                    type="button"
                    onClick={command.action}
                    className={styles.paletteItem}
                  >
                    <div>
                      <strong>{command.label}</strong>
                      <span>{command.description}</span>
                    </div>
                    <kbd>Enter</kbd>
                  </button>
                ))
              )}
            </div>

            <footer className={styles.paletteFooter}>Press Esc to close</footer>
          </div>
        </div>
      )}
    </div>
  );
}

export function OperatorDesktop(props: OperatorDesktopProps) {
  return (
    <OperatorOSProvider apps={props.apps}>
      <DesktopContent {...props} />
    </OperatorOSProvider>
  );
}

