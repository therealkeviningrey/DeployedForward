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
    title: 'IDE Integration',
    description: 'AI workflows in your editor',
    href: '/product#ide',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 9h6M9 13h6M9 17h6" />
      </svg>
    ),
  },
  {
    title: 'Web Platform',
    description: 'Track missions and progress',
    href: '/product#web',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    title: 'CLI Tools',
    description: 'Command-line automation',
    href: '/product#cli',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 17l6-6-6-6M12 19h8" />
      </svg>
    ),
  },
  {
    title: 'Team Collaboration',
    description: 'Coordinate AI workflows',
    href: '/product#team',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

const programsDropdown: DropdownItem[] = [
  {
    title: 'Briefs',
    description: 'Weekly AI intel. 10-min reads.',
    href: '/programs/briefs',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
      </svg>
    ),
  },
  {
    title: 'Missions',
    description: 'Hands-on training with deployable code',
    href: '/programs/missions',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <path d="M22 4L12 14.01l-3-3" />
      </svg>
    ),
  },
  {
    title: 'Campaigns',
    description: 'Complete workflows, not fragments',
    href: '/programs/campaigns',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
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
            <li
              className={styles.navItem}
              onMouseEnter={() => setActiveDropdown('product')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className={styles.navButton}>
                Product
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
              <Dropdown items={productDropdown} isOpen={activeDropdown === 'product'} />
            </li>

            <li
              className={styles.navItem}
              onMouseEnter={() => setActiveDropdown('programs')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className={styles.navButton}>
                Programs
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
              <Dropdown items={programsDropdown} isOpen={activeDropdown === 'programs'} />
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
