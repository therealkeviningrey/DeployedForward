'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { OperatorOSContextType, WindowApp, WindowState } from './types';

const OperatorOSContext = createContext<OperatorOSContextType | null>(null);

type OperatorOSProviderProps = {
  children: React.ReactNode;
  apps: WindowApp[];
};

const DEFAULT_SIZE = { width: 840, height: 560 };
const DEFAULT_POSITION = { x: 100, y: 80 };

export function OperatorOSProvider({ children, apps }: OperatorOSProviderProps) {
  const [windows, setWindows] = useState<Map<string, WindowState>>(new Map());
  const [nextZIndex, setNextZIndex] = useState(1000);

  const appMap = useMemo(
    () => new Map(apps.map((app) => [app.id, app])),
    [apps]
  );

  const openWindow = useCallback((id: string, options?: OpenWindowOptions) => {
    setWindows((prev) => {
      const next = new Map(prev);
      const existing = next.get(id);

      const appDefinition = appMap.get(id);
      const baseSize = appDefinition?.initialSize
        ? { ...appDefinition.initialSize }
        : { ...DEFAULT_SIZE };
      const basePosition = appDefinition?.initialPosition
        ? { ...appDefinition.initialPosition }
        : { ...DEFAULT_POSITION };

      const hasMaximized = Array.from(prev.values()).some((w) => w.isOpen && w.isMaximized);
      const enableTabs =
        options?.showTabs ?? (hasMaximized && options?.source !== 'auto' && options?.source !== undefined);

      if (existing) {
        // Window already exists, just focus it
        const newZIndex = Array.from(prev.values()).reduce((max, w) => Math.max(max, w.zIndex), 1000) + 1;
        next.set(id, {
          ...existing,
          isOpen: true,
          isMinimized: false,
          zIndex: newZIndex,
          showTabs: enableTabs ? true : existing.showTabs,
        });
        setNextZIndex(newZIndex + 1);
      } else {
        // Create new window with cascading position
        const windowCount = Array.from(prev.values()).filter((w) => w.isOpen).length;
        const offset = windowCount * 40;
        const newZIndex = Array.from(prev.values()).reduce((max, w) => Math.max(max, w.zIndex), 1000) + 1;
        const cascadePosition = appDefinition?.initialPosition
          ? { ...appDefinition.initialPosition }
          : { x: basePosition.x + offset, y: basePosition.y + offset };

        next.set(id, {
          id,
          isOpen: true,
          position: cascadePosition,
          size: baseSize,
          zIndex: newZIndex,
          isMinimized: false,
          isMaximized: false,
          showTabs: enableTabs,
        });
        setNextZIndex(newZIndex + 1);
      }

      if (enableTabs) {
        next.forEach((value, key) => {
          if (value.isOpen && !value.showTabs) {
            next.set(key, { ...value, showTabs: true });
          }
        });
      }

      return next;
    });
  }, [appMap]);

  const closeWindow = useCallback((id: string) => {
    setWindows((prev) => {
      const next = new Map(prev);
      const existing = next.get(id);
      
      if (existing) {
        next.set(id, { ...existing, isOpen: false });
      }
      
      return next;
    });
  }, []);

  const focusWindow = useCallback((id: string) => {
    setWindows((prev) => {
      const next = new Map(prev);
      const existing = next.get(id);
      
      if (existing && existing.isOpen) {
        const newZIndex = Array.from(prev.values()).reduce((max, w) => Math.max(max, w.zIndex), 1000) + 1;
        next.set(id, { ...existing, zIndex: newZIndex, isMinimized: false });
        setNextZIndex(newZIndex + 1);
      }
      
      return next;
    });
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows((prev) => {
      const next = new Map(prev);
      const existing = next.get(id);
      
      if (existing) {
        next.set(id, { ...existing, isMinimized: !existing.isMinimized });
      }
      
      return next;
    });
  }, []);

  const updatePosition = useCallback((id: string, position: { x: number; y: number }) => {
    setWindows((prev) => {
      const next = new Map(prev);
      const existing = next.get(id);

      if (existing && !existing.isMaximized) {
        next.set(id, { ...existing, position });
      }
      return next;
    });
  }, []);

  const updateSize = useCallback((id: string, size: { width: number; height: number }) => {
    setWindows((prev) => {
      const next = new Map(prev);
      const existing = next.get(id);

      if (existing) {
        next.set(id, { ...existing, size });
      }

      return next;
    });
  }, []);

  const toggleMaximize = useCallback((id: string, forceState?: boolean) => {
    setWindows((prev) => {
      const next = new Map(prev);
      const existing = next.get(id);

      if (!existing) {
        return next;
      }

      const shouldMaximize = forceState ?? !existing.isMaximized;

      if (shouldMaximize && !existing.isMaximized) {
        const layoutElement = typeof document !== 'undefined'
          ? document.querySelector<HTMLElement>('[data-operator-layout]')
          : null;

        const availableWidth =
          layoutElement?.clientWidth ??
          (typeof window !== 'undefined' ? window.innerWidth - 100 : DEFAULT_SIZE.width);
        const availableHeight =
          layoutElement?.clientHeight ??
          (typeof window !== 'undefined' ? window.innerHeight - 20 : DEFAULT_SIZE.height);

        const maxWidth = Math.max(720, availableWidth);
        const maxHeight = Math.max(420, availableHeight);

        next.set(id, {
          ...existing,
          isMaximized: true,
          storedPosition: { ...existing.position },
          storedSize: { ...existing.size },
          position: { x: 0, y: 0 },
          size: { width: maxWidth, height: maxHeight },
          isMinimized: false,
          showTabs:
            existing.showTabs ||
            Array.from(next.values()).some((w) => w.id !== id && w.isOpen && w.showTabs),
        });
      } else if (!shouldMaximize && existing.isMaximized) {
        const storedPosition = existing.storedPosition ?? DEFAULT_POSITION;
        const appDefinition = appMap.get(id);
        const storedSize =
          existing.storedSize ??
          (appDefinition?.initialSize ? { ...appDefinition.initialSize } : { ...DEFAULT_SIZE });

        next.set(id, {
          ...existing,
          isMaximized: false,
          position: { ...storedPosition },
          size: { ...storedSize },
          storedPosition: undefined,
          storedSize: undefined,
          showTabs: false,
        });
      }

      return next;
    });
  }, [appMap]);

  const value = useMemo(
    () => ({
      windows,
      apps,
      openWindow,
      closeWindow,
      focusWindow,
      minimizeWindow,
      updatePosition,
      updateSize,
      toggleMaximize,
    }),
    [apps, windows, openWindow, closeWindow, focusWindow, minimizeWindow, updatePosition, updateSize, toggleMaximize]
  );

  return <OperatorOSContext.Provider value={value}>{children}</OperatorOSContext.Provider>;
}

export function useOperatorOS() {
  const context = useContext(OperatorOSContext);
  if (!context) {
    throw new Error('useOperatorOS must be used within OperatorOSProvider');
  }
  return context;
}

