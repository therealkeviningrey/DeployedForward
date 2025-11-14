import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

export type WindowApp = {
  id: string;
  title: string;
  callsign: string;
  icon: LucideIcon;
  content: ReactNode;
  initialSize?: { width: number; height: number };
  initialPosition?: { x: number; y: number };
};

export type WindowState = {
  id: string;
  isOpen: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  isMinimized: boolean;
  isMaximized: boolean;
  storedPosition?: { x: number; y: number };
  storedSize?: { width: number; height: number };
  showTabs: boolean;
};

export type OpenWindowOptions = {
  source?: 'launcher' | 'palette' | 'auto' | 'tab';
  showTabs?: boolean;
};

export type OperatorOSContextType = {
  windows: Map<string, WindowState>;
  apps: WindowApp[];
  openWindow: (id: string, options?: OpenWindowOptions) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  updatePosition: (id: string, position: { x: number; y: number }) => void;
  updateSize: (id: string, size: { width: number; height: number }) => void;
  toggleMaximize: (id: string, forceState?: boolean) => void;
};

