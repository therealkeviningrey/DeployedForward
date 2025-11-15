'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { SignInButton, SignedIn, SignedOut, useAuthUser } from '@/components/auth/AuthClient';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './Logo';
import { Container } from './Container';
import { TrackedLink } from './TrackedLink';
import { MobileNav } from './MobileNav';
import styles from './Header.module.css';

interface DropdownItem {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}

const productDropdown: DropdownItem[] = [
  {
    title: 'ChatGPT Mastery',
    description: 'Write prompts that get results',
    href: '/courses#chatgpt',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    title: 'Claude & AI Tools',
    description: 'Master different AI platforms',
    href: '/courses#claude',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    title: 'Building with Cursor',
    description: 'Turn ideas into working apps',
    href: '/courses#cursor',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="M2 2l7.586 7.586" />
      </svg>
    ),
  },
  {
    title: 'Shipping Projects',
    description: 'Deploy your work to production',
    href: '/courses#deployment',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
];

const learningDropdown: DropdownItem[] = [
  {
    title: 'Free Tutorials',
    description: 'Start learning today - no credit card',
    href: '/tutorials',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    title: 'All Courses',
    description: 'Browse complete course catalog',
    href: '/courses',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
  },
  {
    title: 'Learning Paths',
    description: 'Structured tracks from beginner to expert',
    href: '/programs',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    title: 'Community',
    description: 'Learn with other AI builders',
    href: '/company#community',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

const resourcesDropdown: DropdownItem[] = [
  {
    title: 'Documentation',
    description: 'Complete guides and API references',
    href: '/docs',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
  },
  {
    title: 'News & Updates',
    description: 'Latest platform updates and announcements',
    href: '/news',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
      </svg>
    ),
  },
  {
    title: 'Changelog',
    description: 'See what we shipped recently',
    href: '/changelog',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    title: 'Support',
    description: 'Get help from our operator team',
    href: '/company#contact',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
];

function Dropdown({ items, isOpen }: { items: DropdownItem[]; isOpen: boolean }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.dropdown}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.dropdownInner}>
            <div className={styles.dropdownGrid}>
              {items.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className={styles.dropdownCard}
                >
                  <div className={styles.iconBox}>
                    {item.icon}
                  </div>
                  <div className={styles.cardContent}>
                    <div className={styles.cardTitle}>{item.title}</div>
                    <div className={styles.cardDescription}>{item.description}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const accountLinks = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Billing', href: '/dashboard/billing' },
];

function getInitials(source?: string | null) {
  if (!source) return 'U';
  const trimmed = source.trim();
  if (!trimmed) return 'U';
  const parts = trimmed.split(/\s+/);
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  const first = parts[0][0] ?? '';
  const last = parts[parts.length - 1][0] ?? '';
  const initials = `${first}${last}`.toUpperCase();
  return initials || trimmed.slice(0, 2).toUpperCase();
}

function AccountMenu() {
  const { user, signOut } = useAuthUser();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const displayName = user?.name || user?.email || 'Account';
  const initials = getInitials(user?.name || user?.email?.split('@')[0] || undefined);

  const handleSignOut = async () => {
    setOpen(false);
    await signOut();
    window.location.href = '/';
  };

  return (
    <div className={styles.accountMenuWrapper} ref={menuRef}>
      <button
        type="button"
        className={styles.accountButton}
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span className={styles.accountAvatar}>{initials}</span>
        <span className={styles.accountName}>{displayName}</span>
        <svg
          className={styles.accountCaret}
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
        >
          <path
            d="M3 4.5L6 7.5L9 4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {open && (
        <div className={styles.accountMenu} role="menu">
          {accountLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.accountMenuLink}
              onClick={() => setOpen(false)}
              role="menuitem"
            >
              {link.label}
            </Link>
          ))}
          <button type="button" className={styles.accountMenuButton} onClick={handleSignOut}>
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}

export function Header() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll to toggle solid header background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <Container>
        <nav className={styles.nav} aria-label="Primary">
          <Logo />
          
          <ul className={styles.navLinks}>
            <li className={styles.navItem}>
              <div
                className={styles.navItemWrapper}
                onMouseEnter={() => setActiveDropdown('learning')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className={styles.navButton}
                  onClick={() => setActiveDropdown(activeDropdown === 'learning' ? null : 'learning')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveDropdown(activeDropdown === 'learning' ? null : 'learning');
                    } else if (e.key === 'Escape') {
                      setActiveDropdown(null);
                    }
                  }}
                  aria-expanded={activeDropdown === 'learning'}
                  aria-haspopup="true"
                >
                  Learning
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    className={styles.navArrow}
                  >
                    <path
                      d="M3 4.5L6 7.5L9 4.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <Dropdown items={learningDropdown} isOpen={activeDropdown === 'learning'} />
              </div>
            </li>

            <li className={styles.navItem}>
              <div
                className={styles.navItemWrapper}
                onMouseEnter={() => setActiveDropdown('resources')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className={styles.navButton}
                  onClick={() => setActiveDropdown(activeDropdown === 'resources' ? null : 'resources')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveDropdown(activeDropdown === 'resources' ? null : 'resources');
                    } else if (e.key === 'Escape') {
                      setActiveDropdown(null);
                    }
                  }}
                  aria-expanded={activeDropdown === 'resources'}
                  aria-haspopup="true"
                >
                  Resources
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    className={styles.navArrow}
                  >
                    <path
                      d="M3 4.5L6 7.5L9 4.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <Dropdown items={resourcesDropdown} isOpen={activeDropdown === 'resources'} />
              </div>
            </li>

            <li>
              <Link href="/pricing" className={styles.navLink}>
                Pricing
              </Link>
            </li>
            <li>
              <Link href="/news" className={styles.navLink}>
                News
              </Link>
            </li>
            <li>
              <Link href="/company" className={styles.navLink}>
                Company
              </Link>
            </li>
            <li>
              <Link href="/docs" className={styles.navLink}>
                Docs
              </Link>
            </li>
          </ul>

          <div className={styles.actions}>
            <SignedOut>
              <SignInButton className="btn btn-ghost btn-sm">Log in</SignInButton>
            </SignedOut>
            <SignedIn>
              <AccountMenu />
            </SignedIn>
            <TrackedLink
              href="/courses"
              className="btn btn-primary btn-sm"
              label="Start Mission"
              location="Header"
            >
              Start Mission
            </TrackedLink>
            <MobileNav />
          </div>
        </nav>
      </Container>
    </header>
  );
}
