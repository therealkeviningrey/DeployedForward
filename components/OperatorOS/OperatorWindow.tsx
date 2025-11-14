'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import Draggable from 'react-draggable';
import { X, Minus, Maximize2, Minimize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import type { WindowApp } from './types';
import { useOperatorOS } from './OperatorOSContext';
import styles from './OperatorWindow.module.css';

type OperatorWindowProps = {
  app: WindowApp;
};

export function OperatorWindow({ app }: OperatorWindowProps) {
  const {
    windows,
    apps: appList,
    openWindow,
    closeWindow,
    focusWindow,
    minimizeWindow,
    updatePosition,
    toggleMaximize,
  } = useOperatorOS();
  const dragNodeRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  const windowState = windows.get(app.id);

  const [dragPosition, setDragPosition] = useState(() => windowState?.position ?? { x: 100, y: 80 });

  useEffect(() => {
    if (windowState?.position && !isDraggingRef.current) {
      setDragPosition(windowState.position);
    }
  }, [windowState?.position, windowState?.isMaximized]);

  if (!windowState || !windowState.isOpen) {
    return null;
  }

  const handleDragStart = () => {
    isDraggingRef.current = false;
    if (windowState.isMaximized) {
      const storedPosition = windowState.storedPosition ?? windowState.position;
      setDragPosition({ ...storedPosition });
      toggleMaximize(app.id);
      // Prevent immediate drag jump until state updates
      setTimeout(() => {
        setDragPosition((current) => ({
          x: current.x,
          y: current.y,
        }));
      }, 0);
    }
  };

  const handleDrag = (_e: any, data: any) => {
    isDraggingRef.current = true;
    setDragPosition({ x: data.x, y: data.y });
  };

  const handleDragStop = (_e: any, data: any) => {
    updatePosition(app.id, { x: data.x, y: data.y });
    setTimeout(() => {
      isDraggingRef.current = false;
    }, 50);
  };

  const handleWindowClick = () => {
    if (!isDraggingRef.current) {
      focusWindow(app.id);
    }
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    closeWindow(app.id);
  };

  const handleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    minimizeWindow(app.id);
  };

  const handleToggleMaximize = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleMaximize(app.id);
  };

  const handleTabSelect = (targetId: string) => {
    if (targetId === app.id) {
      focusWindow(app.id);
      return;
    }
    openWindow(targetId, { source: windowState.showTabs ? 'launcher' : 'tab', showTabs: windowState.showTabs });
    setTimeout(() => {
      if (windowState.isMaximized) {
        toggleMaximize(targetId, true);
      }
      focusWindow(targetId);
    }, 0);
  };

  return (
    <AnimatePresence>
      {!windowState.isMinimized && (
        <Draggable
          nodeRef={dragNodeRef}
          handle={`.${styles.titleBar}`}
          position={windowState.isMaximized ? windowState.position : dragPosition}
          onStart={handleDragStart}
          onDrag={handleDrag}
          onStop={handleDragStop}
          bounds="parent"
          enableUserSelectHack={false}
        >
          <div
            ref={dragNodeRef}
            className={styles.window}
            style={{
              zIndex: windowState.zIndex,
              '--window-width': `${windowState.size.width}px`,
              '--window-height': `${windowState.size.height}px`,
            } as CSSProperties}
            onMouseDown={handleWindowClick}
          >
            <motion.div
              className={styles.windowInner}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{
                opacity: 0,
                transition: { duration: 0.15 },
              }}
              transition={{
                duration: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className={styles.titleBar}>
              <div className={styles.controls}>
                <button
                  type="button"
                  className={`${styles.controlButton} ${styles.closeButton}`}
                  onClick={handleClose}
                  aria-label="Close window"
                  title="Close [X]"
                >
                  <X size={14} />
                </button>
                <button
                  type="button"
                  className={`${styles.controlButton} ${styles.minimizeButton}`}
                  onClick={handleMinimize}
                  aria-label="Minimize window"
                  title="Minimize [-]"
                >
                  <Minus size={14} />
                  </button>
                  <button
                    type="button"
                    className={`${styles.controlButton} ${styles.maximizeButton}`}
                    onClick={handleToggleMaximize}
                    aria-label={windowState.isMaximized ? 'Restore window' : 'Maximize window'}
                    title={windowState.isMaximized ? 'Restore' : 'Maximize'}
                  >
                    {windowState.isMaximized ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                </button>
              </div>

              <div className={styles.titleContent}>
                <span className={styles.callsignBracket}>[{app.callsign}]</span>
                <span className={styles.title}>{app.title}</span>
                <span className={styles.statusBadge}>READY</span>
              </div>

              <div className={styles.titleSpacer} />
            </div>

              {windowState.isMaximized && windowState.showTabs && (
                <nav className={styles.tabBar} aria-label="Window modules">
                  {appList
                    .filter((entry) => {
                      const state = windows.get(entry.id);
                      return state?.isOpen && !state.isMinimized && state.showTabs;
                    })
                    .map((entry) => {
                      const isCurrent = entry.id === app.id;
                      return (
                        <button
                          key={entry.id}
                          type="button"
                          className={`${styles.tabButton} ${isCurrent ? styles.tabButtonActive : ''}`}
                          onClick={() => handleTabSelect(entry.id)}
                          aria-current={isCurrent ? 'page' : undefined}
                        >
                          <span className={styles.tabLabel}>{entry.title}</span>
                          <span className={styles.tabCallsign}>{entry.callsign}</span>
                        </button>
                      );
                    })}
                </nav>
              )}

              <div className={styles.content}>{app.content}</div>
            </motion.div>
          </div>
        </Draggable>
      )}
    </AnimatePresence>
  );
}
