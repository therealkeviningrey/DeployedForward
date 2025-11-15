'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Menu, ChevronDown, ChevronUp } from 'lucide-react';
import { SignInButton, SignedIn, SignedOut, useAuthUser } from '@/components/auth/AuthClient';
import { Logo } from './Logo';
import { TrackedLink } from './TrackedLink';
import styles from './MobileNav.module.css';

interface DropdownItem {
  title: string;
  description: string;
  href: string;
}

const learningItems: DropdownItem[] = [
  { title: 'Free Tutorials', description: 'Start learning today - no credit card', href: '/tutorials' },
  { title: 'All Courses', description: 'Browse complete course catalog', href: '/courses' },
  { title: 'Learning Paths', description: 'Structured tracks from beginner to expert', href: '/programs' },
  { title: 'Community', description: 'Learn with other AI builders', href: '/company#community' },
];

const resourcesItems: DropdownItem[] = [
  { title: 'Documentation', description: 'Complete guides and API references', href: '/docs' },
  { title: 'News & Updates', description: 'Latest platform updates and announcements', href: '/news' },
  { title: 'Changelog', description: 'See what we shipped recently', href: '/changelog' },
  { title: 'Support', description: 'Get help from our operator team', href: '/company#contact' },
];

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const { user, signOut } = useAuthUser();

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
    setExpandedSection(null);
  };

  const handleSignOut = async () => {
    setIsOpen(false);
    await signOut();
    window.location.href = '/';
  };

  return (
    <>
      {/* Hamburger Button */}
      <button
        type="button"
        className={styles.hamburger}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className={styles.overlay}
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Slide-out Menu */}
      <nav
        className={`${styles.menu} ${isOpen ? styles.menuOpen : ''}`}
        aria-label="Mobile navigation"
      >
        <div className={styles.menuHeader}>
          <Logo />
          <button
            type="button"
            className={styles.closeButton}
            onClick={() => setIsOpen(false)}
            aria-label="Close navigation menu"
          >
            <X size={24} />
          </button>
        </div>

        <div className={styles.menuContent}>
          {/* Learning Section */}
          <div className={styles.section}>
            <button
              type="button"
              className={styles.sectionButton}
              onClick={() => toggleSection('learning')}
              aria-expanded={expandedSection === 'learning'}
            >
              <span>Learning</span>
              {expandedSection === 'learning' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {expandedSection === 'learning' && (
              <div className={styles.sectionContent}>
                {learningItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={styles.sectionLink}
                    onClick={handleLinkClick}
                  >
                    <div className={styles.linkTitle}>{item.title}</div>
                    <div className={styles.linkDescription}>{item.description}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Resources Section */}
          <div className={styles.section}>
            <button
              type="button"
              className={styles.sectionButton}
              onClick={() => toggleSection('resources')}
              aria-expanded={expandedSection === 'resources'}
            >
              <span>Resources</span>
              {expandedSection === 'resources' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {expandedSection === 'resources' && (
              <div className={styles.sectionContent}>
                {resourcesItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={styles.sectionLink}
                    onClick={handleLinkClick}
                  >
                    <div className={styles.linkTitle}>{item.title}</div>
                    <div className={styles.linkDescription}>{item.description}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Direct Links */}
          <Link href="/pricing" className={styles.navLink} onClick={handleLinkClick}>
            Pricing
          </Link>
          <Link href="/news" className={styles.navLink} onClick={handleLinkClick}>
            News
          </Link>
          <Link href="/company" className={styles.navLink} onClick={handleLinkClick}>
            Company
          </Link>
          <Link href="/docs" className={styles.navLink} onClick={handleLinkClick}>
            Docs
          </Link>

          {/* User Section */}
          <div className={styles.userSection}>
            <SignedIn>
              <div className={styles.userInfo}>
                <div className={styles.userAvatar}>
                  {user?.name?.slice(0, 2).toUpperCase() || user?.email?.slice(0, 2).toUpperCase() || 'U'}
                </div>
                <div className={styles.userName}>{user?.name || user?.email || 'Account'}</div>
              </div>
              <Link href="/dashboard" className={styles.accountLink} onClick={handleLinkClick}>
                Dashboard
              </Link>
              <Link href="/dashboard/billing" className={styles.accountLink} onClick={handleLinkClick}>
                Billing
              </Link>
              <button type="button" className={styles.signOutButton} onClick={handleSignOut}>
                Sign out
              </button>
            </SignedIn>
            <SignedOut>
              <SignInButton className="btn btn-ghost btn-sm w-full">Log in</SignInButton>
            </SignedOut>
          </div>

          {/* CTA */}
          <div className={styles.ctaSection}>
            <TrackedLink
              href="/courses"
              className="btn btn-primary w-full"
              label="Start Mission"
              location="Mobile Nav"
              onClick={handleLinkClick}
            >
              Start Mission
            </TrackedLink>
          </div>
        </div>
      </nav>
    </>
  );
}
