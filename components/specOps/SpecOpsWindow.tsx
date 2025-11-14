import type { PropsWithChildren } from 'react';
import { ArrowUpRight } from 'lucide-react';

import type { SpecOpsModule } from './SpecOpsShell';
import styles from './SpecOpsWindow.module.css';

type SpecOpsWindowProps = PropsWithChildren<{
  module: SpecOpsModule;
}>;

export function SpecOpsWindow({ module, children }: SpecOpsWindowProps) {
  return (
    <section className={styles.window} aria-labelledby={`module-${module.id}-title`}>
      <header className={styles.header}>
        <div className={styles.callsignRow}>
          <span className={styles.callsign}>{module.callsign}</span>
          <span className={styles.moduleDescriptor}>{module.description}</span>
        </div>
        <div className={styles.titleRow}>
          <h1 id={`module-${module.id}-title`} className={styles.title}>
            {module.label}
          </h1>
          <div className={styles.windowStatus}>
            <span className={styles.statusLight} aria-hidden />
            <span>Ready</span>
          </div>
        </div>
      </header>

      <div className={styles.body}>{children}</div>

      <footer className={styles.footer}>
        <div className={styles.footerLeft}>
          <span className={styles.footerLabel}>Last sync</span>
          <span className={styles.footerValue}>{new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' }).format(new Date())} UTC</span>
        </div>
        <div className={styles.footerRight}>
          <span className={styles.footerLabel}>Command</span>
          <span className={styles.footerValue}>launch {module.id}</span>
          <ArrowUpRight size={14} aria-hidden />
        </div>
      </footer>
    </section>
  );
}
