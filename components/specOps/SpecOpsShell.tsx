'use client';

import { useCallback, useMemo, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Clock3, Command, Cpu, Search, TriangleAlert } from 'lucide-react';

import { SpecOpsScene } from './SpecOpsScene';
import { SpecOpsWindow } from './SpecOpsWindow';
import styles from './SpecOpsShell.module.css';

type CommandLogEntry = {
  id: string;
  input: string;
  result: 'launched' | 'not-found';
  timestamp: number;
};

export type SpecOpsModule = {
  id: string;
  label: string;
  callsign: string;
  description: string;
  icon: LucideIcon;
  keywords: string[];
  render: () => React.ReactNode;
};

export type SpecOpsShellProps = {
  modules: SpecOpsModule[];
  defaultModuleId?: string;
};

const COMMAND_PREFIXES = ['open', 'launch', 'deploy', 'run', 'brief', 'goto'];

function normalizeCommand(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-/]/g, '')
    .replace(/\s+/g, ' ');
}

function stripPrefix(value: string) {
  const segments = value.split(' ');
  if (segments.length <= 1) return value;
  const [first, ...rest] = segments;
  if (COMMAND_PREFIXES.includes(first)) {
    return rest.join(' ');
  }
  return value;
}

function moduleMatches(module: SpecOpsModule, raw: string) {
  const normalized = normalizeCommand(raw);
  if (!normalized) return false;
  const withoutPrefix = stripPrefix(normalized);
  const targets = [module.id, module.label, module.callsign, ...module.keywords]
    .filter(Boolean)
    .map((target) => normalizeCommand(target));

  return targets.some((target) => target && (target === withoutPrefix || target.includes(withoutPrefix)));
}

function formatTimestamp(timestamp: number) {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date(timestamp));
}

export function SpecOpsShell({ modules, defaultModuleId }: SpecOpsShellProps) {
  const moduleMap = useMemo(() => {
    return new Map(modules.map((module) => [module.id, module]));
  }, [modules]);

  const [activeModuleId, setActiveModuleId] = useState(() => {
    if (defaultModuleId && moduleMap.has(defaultModuleId)) {
      return defaultModuleId;
    }
    return modules[0]?.id ?? '';
  });
  const [commandValue, setCommandValue] = useState('');
  const [history, setHistory] = useState<CommandLogEntry[]>([]);

  const activeModule = activeModuleId ? moduleMap.get(activeModuleId) ?? null : null;

  const launchModule = useCallback(
    (moduleId: string, input?: string) => {
      if (!moduleMap.has(moduleId)) {
        return;
      }
      setActiveModuleId(moduleId);
      if (input) {
        setHistory((prev) => {
          const entry: CommandLogEntry = { id: moduleId, input, result: 'launched', timestamp: Date.now() };
          const next = [...prev, entry];
          return next.slice(-8);
        });
      }
    },
    [moduleMap]
  );

  const executeCommand = useCallback(
    (rawCommand: string) => {
      const trimmed = rawCommand.trim();
      if (!trimmed) return;
      const normalized = normalizeCommand(trimmed);
      const withoutPrefix = stripPrefix(normalized);

      const matchedModule = modules.find((module) => moduleMatches(module, normalized) || moduleMatches(module, withoutPrefix));

      if (matchedModule) {
        launchModule(matchedModule.id, trimmed);
      } else {
        setHistory((prev) => {
          const entry: CommandLogEntry = { id: 'not-found', input: trimmed, result: 'not-found', timestamp: Date.now() };
          const next = [...prev, entry];
          return next.slice(-8);
        });
      }
      setCommandValue('');
    },
    [launchModule, modules]
  );

  const suggestions = useMemo(() => {
    if (!commandValue.trim()) {
      return modules.slice(0, 4);
    }
    return modules.filter((module) => moduleMatches(module, commandValue)).slice(0, 5);
  }, [commandValue, modules]);

  return (
    <div className={styles.root}>
      <SpecOpsScene activeModuleId={activeModuleId} />
      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.shell}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarHeading}>
            <span className={styles.sidebarTitle}>Deployed Forward</span>
            <span className={styles.sidebarSubtitle}>Spec Ops Operator Console</span>
          </div>

          <nav className={styles.nav} aria-label="Module launcher">
            {modules.map((module) => {
              const Icon = module.icon;
              const isActive = module.id === activeModuleId;
              return (
                <button
                  key={module.id}
                  type="button"
                  className={`${styles.navButton} ${isActive ? styles.navButtonActive : ''}`}
                  onClick={() => launchModule(module.id)}
                  aria-pressed={isActive}
                >
                  <span className={styles.navIcon}>
                    <Icon size={18} strokeWidth={1.75} />
                  </span>
                  <span className={styles.navLabel}>{module.label}</span>
                  <span className={styles.navCallsign}>{module.callsign}</span>
                </button>
              );
            })}
          </nav>

          <div className={styles.sidebarFooter}>
            <div className={styles.statusRow}>
              <span className={`${styles.statusLight} ${styles.statusLightActive}`} aria-hidden />
              <span>Console link stable</span>
            </div>
            <div className={styles.statusRow}>
              <Cpu size={14} aria-hidden />
              <span>Systems synced</span>
            </div>
          </div>
        </aside>

        <div className={styles.main}>
          <header className={styles.commandBar}>
            <form
              className={styles.commandForm}
              onSubmit={(event) => {
                event.preventDefault();
                executeCommand(commandValue);
              }}
            >
              <div className={styles.commandGlyph} aria-hidden>
                <Command size={16} />
              </div>
              <input
                className={styles.commandInput}
                value={commandValue}
                onChange={(event) => setCommandValue(event.target.value)}
                placeholder="Type a command or try ‘launch pricing’"
                aria-label="Operator console command input"
              />
              <button type="submit" className={styles.commandSubmit} aria-label="Execute command">
                <Search size={16} />
              </button>
            </form>

            {suggestions.length > 0 && (
              <ul className={styles.commandSuggestions} role="list">
                {suggestions.map((module) => (
                  <li key={module.id}>
                    <button
                      type="button"
                      className={styles.suggestionButton}
                      onClick={() => launchModule(module.id, `launch ${module.id}`)}
                    >
                      <span>{module.label}</span>
                      <span className={styles.suggestionCallsign}>{module.callsign}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </header>

          <div className={styles.windowStage}>
            {activeModule ? <SpecOpsWindow module={activeModule}>{activeModule.render()}</SpecOpsWindow> : null}

            <aside className={styles.telemetry} aria-label="Command log">
              <header className={styles.telemetryHeader}>
                <Clock3 size={14} aria-hidden />
                <span>Command log</span>
              </header>
              <ul className={styles.telemetryList} role="list">
                {history.length === 0 && (
                  <li className={styles.telemetryEmpty}>Awaiting first command…</li>
                )}
                {history.map((entry) => (
                  <li key={`${entry.timestamp}-${entry.input}`} className={styles.telemetryItem}>
                    <span className={styles.telemetryTime}>{formatTimestamp(entry.timestamp)}</span>
                    <span className={styles.telemetryCommand}>{entry.input}</span>
                    <span
                      className={`${styles.telemetryStatus} ${
                        entry.result === 'launched' ? styles.telemetryStatusOk : styles.telemetryStatusWarn
                      }`}
                    >
                      {entry.result === 'launched' ? 'executed' : 'unknown'}
                    </span>
                  </li>
                ))}
              </ul>
              <footer className={styles.telemetryFooter}>
                <TriangleAlert size={12} aria-hidden />
                <span>Use launch / open / deploy to target a module</span>
              </footer>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
