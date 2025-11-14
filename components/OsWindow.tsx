import type { ReactNode } from 'react';

import styles from './OsWindow.module.css';

export type OsWindowProps = {
  children: ReactNode;
  title: string;
  description?: string;
  tag?: string;
  toolbar?: ReactNode;
  footer?: ReactNode;
  className?: string;
  windowTitle?: string;
};

export function OsWindow({
  children,
  title,
  description,
  tag,
  toolbar,
  footer,
  className,
  windowTitle,
}: OsWindowProps) {
  const label = windowTitle ?? title;
  const containerClassName = className ? `${styles.window} ${className}` : styles.window;

  return (
    <div className={containerClassName} role="group" aria-label={label}>
      <div className={styles.chrome} aria-hidden="true">
        <div className={styles.trafficLights}>
          <span className={`${styles.light} ${styles.close}`} />
          <span className={`${styles.light} ${styles.minimize}`} />
          <span className={`${styles.light} ${styles.zoom}`} />
        </div>
        <span className={styles.chromeTitle}>{label}</span>
      </div>

      <div className={styles.header}>
        {tag && <span className={styles.tag}>{tag}</span>}
        <div>
          <h2>{title}</h2>
          {description && <p>{description}</p>}
        </div>
      </div>

      {toolbar && <div className={styles.toolbar}>{toolbar}</div>}

      <div className={styles.body}>{children}</div>

      {footer && <footer className={styles.footer}>{footer}</footer>}
    </div>
  );
}

