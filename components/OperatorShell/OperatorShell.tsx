'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  buildOperatorSidebar,
  operatorSidebarSections,
  type OperatorSidebarIcon,
  type OperatorSidebarSection,
} from '@/lib/operatorSidebar';

import styles from './OperatorShell.module.css';

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type SearchProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  shortcutHint?: string;
  ariaLabel?: string;
};

type CommandButtonProps = {
  label: string;
  onClick: () => void;
  shortcutHint?: string;
  ariaLabel?: string;
};

export type OperatorShellProps = {
  children: React.ReactNode;
  breadcrumb?: BreadcrumbItem[];
  title?: string;
  subtitle?: string;
  search?: SearchProps;
  commandButton?: CommandButtonProps;
  toolbarActions?: React.ReactNode;
  sidebarFooter?: React.ReactNode;
  sidebarSections?: OperatorSidebarSection[];
  activePath?: string;
  contentClassName?: string;
  contentProps?: React.HTMLAttributes<HTMLElement>;
};

function FileIcon({ type }: { type: OperatorSidebarIcon }) {
  const stroke = 'currentColor';

  switch (type) {
    case 'folder':
      return (
        <svg viewBox="0 0 20 20" aria-hidden>
          <path
            d="M2.5 5.5h6l1.5 2h7.5V15a1.5 1.5 0 0 1-1.5 1.5H3.5A1.5 1.5 0 0 1 2 15V6a.5.5 0 0 1 .5-.5Z"
            stroke={stroke}
            fill="none"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'chart':
      return (
        <svg viewBox="0 0 20 20" aria-hidden>
          <path d="M3 3v14h14" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 12.5 9.5 8l2.5 3 3-4" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'video':
      return (
        <svg viewBox="0 0 20 20" aria-hidden>
          <path
            d="M3.5 5.5h7a1.5 1.5 0 0 1 1.5 1.5v6a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 2 13V7a1.5 1.5 0 0 1 1.5-1.5Z"
            stroke={stroke}
            strokeWidth="1.4"
            fill="none"
          />
          <path d="m13 7 4 2.5-4 2.5Z" fill="none" stroke={stroke} strokeWidth="1.4" strokeLinejoin="round" />
        </svg>
      );
    case 'doc':
      return (
        <svg viewBox="0 0 20 20" aria-hidden>
          <path
            d="M6 3.5h5l3 3v10H6a1.5 1.5 0 0 1-1.5-1.5V5A1.5 1.5 0 0 1 6 3.5Z"
            stroke={stroke}
            strokeWidth="1.4"
            fill="none"
            strokeLinejoin="round"
          />
          <path d="M11 3.5v3h3" stroke={stroke} strokeWidth="1.2" strokeLinejoin="round" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 20 20" aria-hidden>
          <path
            d="M5 3.5h6l3 3v10.5H5A1.5 1.5 0 0 1 3.5 15.5V5A1.5 1.5 0 0 1 5 3.5Z"
            stroke={stroke}
            strokeWidth="1.4"
            fill="none"
            strokeLinejoin="round"
          />
          <path d="M11 3.5v3h3" stroke={stroke} strokeWidth="1.2" strokeLinejoin="round" />
        </svg>
      );
  }
}

export function OperatorShell({
  children,
  breadcrumb,
  title,
  subtitle,
  search,
  commandButton,
  toolbarActions,
  sidebarFooter,
  sidebarSections,
  activePath,
  contentClassName,
  contentProps,
}: OperatorShellProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const resolvedPath = activePath ?? pathname ?? '/';

  const sections = useMemo(
    () => buildOperatorSidebar(resolvedPath, sidebarSections ?? operatorSidebarSections),
    [resolvedPath, sidebarSections]
  );

  useEffect(() => {
    setSidebarOpen(false);
  }, [resolvedPath]);

  useEffect(() => {
    if (!sidebarOpen) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [sidebarOpen]);

  const hasBreadcrumb = breadcrumb && breadcrumb.length > 0;
  const hasToolbarControls = Boolean(search || commandButton || toolbarActions);

  return (
    <div className={styles.shell}>
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarVisible : ''}`}>
        <div className={styles.sidebarHeader}>
          <Link href="/" className={styles.sidebarBrand}>
            DeployedForward
          </Link>
          <p className={styles.sidebarSubtitle}>Product OS · Operator mode</p>
        </div>

        {sections.map((section) => (
          <section key={section.title} className={styles.sidebarSection}>
            <span className={styles.sidebarSectionLabel}>{section.title}</span>
            <ul className={styles.sidebarList} role="list">
              {section.nodes.map((node) => (
                <li key={`${section.title}-${node.label}`}>
                  <Link
                    href={node.href}
                    className={`${styles.navItem} ${node.active ? styles.navItemActive : ''}`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className={styles.navIcon}>
                      <FileIcon type={node.icon} />
                    </span>
                    <span className={styles.navLabel}>{node.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <div className={styles.sidebarFooter}>
          {sidebarFooter ?? (
            <>
              <span>Need help?</span>
              <Link href="/company#contact">Talk to an operator →</Link>
            </>
          )}
        </div>
      </aside>
      <button
        type="button"
        className={`${styles.sidebarOverlay} ${sidebarOpen ? styles.sidebarOverlayVisible : ''}`}
        aria-hidden={!sidebarOpen}
        tabIndex={sidebarOpen ? 0 : -1}
        onClick={() => setSidebarOpen(false)}
      />
      <button
        type="button"
        className={`${styles.sidebarFab} ${sidebarOpen ? styles.sidebarFabHidden : ''}`}
        onClick={() => setSidebarOpen(true)}
        aria-label="Open navigation"
        aria-hidden={sidebarOpen}
      >
        <span />
        <span />
        <span />
      </button>

      <div className={styles.main}>
        <header className={styles.toolbar}>
          <button
            type="button"
            className={styles.sidebarToggle}
            onClick={() => setSidebarOpen((prev) => !prev)}
            aria-label={sidebarOpen ? 'Hide navigation' : 'Show navigation'}
            aria-expanded={sidebarOpen}
          >
            <span />
            <span />
            <span />
          </button>

          <div className={styles.toolbarHeading}>
            {hasBreadcrumb && (
              <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
                {breadcrumb!.map((item, index) => (
                  <span key={`${item.label}-${index}`} className={styles.breadcrumbItem}>
                    {item.href ? (
                      <Link href={item.href}>{item.label}</Link>
                    ) : (
                      <span>{item.label}</span>
                    )}
                    {index < breadcrumb!.length - 1 && (
                      <svg viewBox="0 0 14 14" aria-hidden>
                        <path
                          d="m4 2 5 5-5 5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>
                ))}
              </nav>
            )}

            {title && <h1 className={styles.toolbarTitle}>{title}</h1>}
            {subtitle && <p className={styles.toolbarSubheading}>{subtitle}</p>}
          </div>

          {hasToolbarControls && (
            <div className={styles.toolbarControls}>
              {search && (
                <div className={styles.searchBox} role="search">
                  <svg viewBox="0 0 20 20" aria-hidden>
                    <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.4" fill="none" />
                    <path d="m14.5 14.5 3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                  <input
                    value={search.value}
                    onChange={(event) => search.onChange(event.target.value)}
                    placeholder={search.placeholder ?? 'Search'}
                    aria-label={search.ariaLabel ?? 'Search'}
                  />
                  {search.shortcutHint && <kbd>{search.shortcutHint}</kbd>}
                </div>
              )}

              {commandButton && (
                <button
                  type="button"
                  className={styles.commandButton}
                  onClick={commandButton.onClick}
                  aria-label={commandButton.ariaLabel ?? commandButton.label}
                >
                  {commandButton.label}
                  {commandButton.shortcutHint && <kbd>{commandButton.shortcutHint}</kbd>}
                </button>
              )}

              {toolbarActions && <div className={styles.toolbarActionSlot}>{toolbarActions}</div>}
            </div>
          )}
        </header>

        <main
          className={contentClassName ? `${styles.content} ${contentClassName}` : styles.content}
          {...contentProps}
        >
          {children}
        </main>
      </div>
    </div>
  );
}


