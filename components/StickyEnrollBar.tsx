"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './StickyEnrollBar.module.css';
import { analytics } from '@/lib/analytics';

interface Props {
  title: string;
  courseSlug: string;
  courseId: string;
  enrolled: boolean;
  firstLessonSlug?: string;
}

export function StickyEnrollBar({ title, courseSlug, courseId, enrolled, firstLessonSlug }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setVisible(y > 400);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (label: string, href: string) => {
    analytics.trackCTA(label, window.location.pathname, href);
  };

  const href = enrolled
    ? `/courses/${courseSlug}/lessons/${firstLessonSlug || ''}`
    : '/api/enroll';

  return (
    <div className={`${styles.bar} ${visible ? styles.visible : ''}`}>
      <div className={styles.inner}>
        <div className={styles.title}>{title}</div>
        {enrolled ? (
          <Link
            href={href}
            className="btn btn-primary btn-sm"
            onClick={() => handleClick('Continue Learning (Sticky)', href)}
          >
            Continue Learning
          </Link>
        ) : (
          <form action="/api/enroll" method="POST" onSubmit={() => handleClick('Enroll Now (Sticky)', '/api/enroll')}>
            <input type="hidden" name="courseId" value={courseId} />
            <button type="submit" className="btn btn-primary btn-sm">Enroll Now – $19/mo</button>
          </form>
        )}
      </div>
    </div>
  );
}
