'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { Pill } from '@/components/Pill';
import styles from './CourseGrid.module.css';

interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  level: string;
  totalLessons: number;
  totalDuration: number;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

interface CourseGridProps {
  courses: Course[];
}

const difficultyColors: Record<string, string> = {
  beginner: 'var(--color-accent)',
  intermediate: 'var(--color-text-secondary)',
  advanced: '#FF3B3B',
};

export function CourseGrid({ courses }: CourseGridProps) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredCourses = courses.filter((course) => {
    if (activeFilter === 'all') return true;
    return course.level.toLowerCase() === activeFilter.toLowerCase();
  });

  const filters = [
    { id: 'all', label: 'All Courses', count: courses.length },
    { id: 'operator', label: 'Beginner', count: courses.filter((c) => c.level === 'Operator').length },
    { id: 'unit', label: 'Intermediate', count: courses.filter((c) => c.level === 'Unit').length },
    { id: 'battalion', label: 'Advanced', count: courses.filter((c) => c.level === 'Battalion').length },
  ];

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  return (
    <>
      {/* Filter bar */}
      <div className={styles.filterBar}>
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`${styles.filterPill} ${activeFilter === filter.id ? styles.active : ''}`}
          >
            {filter.label}
            <span className={styles.count}>{filter.count}</span>
          </button>
        ))}
      </div>

      {/* Course grid */}
      <div className={styles.courseGrid}>
        {filteredCourses.map((course) => (
          <div key={course.id} className={styles.courseCard}>
            <Card hover>
              <div className={styles.cardHeader}>
                <div className={styles.badges}>
                  <Badge variant={course.level === 'Operator' ? 'default' : 'orange'}>
                    {course.level}
                  </Badge>
                  {course.difficulty && (
                    <span
                      className={styles.difficultyPill}
                      style={{ borderColor: difficultyColors[course.difficulty] }}
                    >
                      {course.difficulty}
                    </span>
                  )}
                </div>
                <div className={styles.duration}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                    <path d="M6 0C2.7 0 0 2.7 0 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6zm0 10.8c-2.7 0-4.8-2.2-4.8-4.8S3.3 1.2 6 1.2s4.8 2.2 4.8 4.8-2.2 4.8-4.8 4.8z" />
                    <path d="M6.6 3H5.4v3.6l3 1.8.6-1-2.4-1.4V3z" />
                  </svg>
                  {formatDuration(course.totalDuration)}
                </div>
              </div>

              <h3 className={styles.title}>{course.title}</h3>
              <p className={styles.description}>{course.description}</p>

              <div className={styles.cardFooter}>
                <span className={styles.lessonCount}>
                  {course.totalLessons} lesson{course.totalLessons !== 1 ? 's' : ''}
                </span>
                <Link href={`/courses/${course.slug}`} className="btn btn-primary btn-sm">
                  Start Mission
                </Link>
              </div>
            </Card>
          </div>
        ))}

        {filteredCourses.length === 0 && (
          <Card className={styles.emptyState}>
            <p className="text-secondary text-center">
              No courses available in this category yet. Check back soon or{' '}
              <Link href="/programs/missions" className="text-accent">
                browse all missions
              </Link>
              .
            </p>
          </Card>
        )}
      </div>
    </>
  );
}

