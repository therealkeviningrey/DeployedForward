'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './Logo';
import { Container } from './Container';
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
    title: 'Free Resources',
    description: 'Weekly guides and tutorials',
    href: '/programs/briefs',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
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

export function Header() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <header className={styles.header}>
      <Container>
        <nav className={styles.nav}>
          <Logo />
          
          <ul className={styles.navLinks}>
            <li className={styles.navItem}>
              <div
                className={styles.navItemWrapper}
                onMouseEnter={() => setActiveDropdown('learning')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className={styles.navButton}>
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
                <button className={styles.navButton}>
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
                <Dropdown items={learningDropdown} isOpen={activeDropdown === 'resources'} />
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
              <SignInButton mode="modal">
                <button className="btn btn-ghost btn-sm">Log in</button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard" className={styles.dashboardLink}>
                Dashboard
              </Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <Link href="/courses" className="btn btn-primary btn-sm">
              Start Mission
            </Link>
          </div>
        </nav>
      </Container>
    </header>
  );
}
