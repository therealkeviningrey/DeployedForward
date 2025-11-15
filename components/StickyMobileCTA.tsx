'use client';

import { useState, useEffect } from 'react';
import { TrackedLink } from './TrackedLink';
import { ArrowRight } from 'lucide-react';
import styles from './StickyMobileCTA.module.css';

interface StickyMobileCTAProps {
  label: string;
  href: string;
  location: string;
  showAfterScroll?: number; // Show after scrolling X pixels (default: 300)
  variant?: 'primary' | 'accent';
}

export function StickyMobileCTA({
  label,
  href,
  location,
  showAfterScroll = 300,
  variant = 'accent',
}: StickyMobileCTAProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > showAfterScroll;
      setIsVisible(scrolled);
    };

    handleScroll(); // Check initial scroll position
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [showAfterScroll]);

  return (
    <div
      className={`${styles.container} ${isVisible ? styles.visible : ''} ${styles[variant]}`}
      role="complementary"
      aria-label="Sticky call to action"
    >
      <div className={styles.inner}>
        <TrackedLink
          href={href}
          className={styles.button}
          label={label}
          location={location}
        >
          <span>{label}</span>
          <ArrowRight size={18} />
        </TrackedLink>
      </div>
    </div>
  );
}

// Pricing-specific sticky CTA
export function PricingStickyMobileCTA() {
  return (
    <StickyMobileCTA
      label="Get Access"
      href="/login"
      location="Sticky Mobile CTA - Pricing"
      showAfterScroll={400}
    />
  );
}

// Course detail sticky CTA
export function CourseDetailStickyMobileCTA({ courseSlug }: { courseSlug: string }) {
  return (
    <StickyMobileCTA
      label="Enroll Now"
      href={`/checkout?course=${courseSlug}`}
      location={`Sticky Mobile CTA - Course ${courseSlug}`}
      showAfterScroll={500}
    />
  );
}
