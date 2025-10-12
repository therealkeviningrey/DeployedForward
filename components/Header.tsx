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
  icon?: string;
}

interface DropdownSection {
  title: string;
  items: DropdownItem[];
}

const productDropdown: DropdownSection[] = [
  {
    title: 'Platform',
    items: [
      {
        title: 'IDE Integration',
        description: 'Work directly in your editor',
        href: '/product#ide',
      },
      {
        title: 'CLI Tools',
        description: 'Command-line power tools',
        href: '/product#cli',
      },
      {
        title: 'Web Dashboard',
        description: 'Track progress and metrics',
        href: '/product#dashboard',
      },
    ],
  },
  {
    title: 'Features',
    items: [
      {
        title: 'AI Workflows',
        description: 'Proven patterns that work',
        href: '/product#workflows',
      },
      {
        title: 'Mission System',
        description: 'Hands-on training modules',
        href: '/product#missions',
      },
      {
        title: 'Progress Tracking',
        description: 'See your advancement',
        href: '/product#progress',
      },
    ],
  },
];

const programsDropdown: DropdownSection[] = [
  {
    title: 'Programs',
    items: [
      {
        title: 'Briefs',
        description: 'Weekly AI intelligence reports',
        href: '/programs/briefs',
      },
      {
        title: 'Missions',
        description: 'Hands-on training exercises',
        href: '/programs/missions',
      },
      {
        title: 'Campaigns',
        description: 'Multi-mission workflows',
        href: '/programs/campaigns',
      },
    ],
  },
];

function Dropdown({ sections, isOpen }: { sections: DropdownSection[]; isOpen: boolean }) {
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
            <div className={styles.dropdownContent}>
              {sections.map((section) => (
                <div key={section.title} className={styles.dropdownSection}>
                  <h4 className={styles.dropdownSectionTitle}>{section.title}</h4>
                  <div className={styles.dropdownItems}>
                    {section.items.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        className={styles.dropdownItem}
                      >
                        <div className={styles.dropdownItemTitle}>{item.title}</div>
                        <div className={styles.dropdownItemDescription}>
                          {item.description}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
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
              <Dropdown sections={productDropdown} isOpen={activeDropdown === 'product'} />
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
              <Dropdown sections={programsDropdown} isOpen={activeDropdown === 'programs'} />
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
