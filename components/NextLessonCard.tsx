import Link from 'next/link';
import { ArrowRight, BookOpen, Clock } from 'lucide-react';
import { Badge } from './Badge';
import styles from './NextLessonCard.module.css';

interface NextLessonCardProps {
  courseTitle: string;
  courseSlug: string;
  lessonTitle: string;
  lessonSlug: string;
  moduleTitle: string;
  estimatedTime?: number; // in minutes
  progress?: number; // percentage
}

export function NextLessonCard({
  courseTitle,
  courseSlug,
  lessonTitle,
  lessonSlug,
  moduleTitle,
  estimatedTime,
  progress,
}: NextLessonCardProps) {
  const lessonUrl = `/courses/${courseSlug}/lessons/${lessonSlug}`;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.icon}>
          <BookOpen size={24} />
        </div>
        <div className={styles.headerContent}>
          <div className={styles.eyebrow}>Up Next</div>
          <h3 className={styles.title}>Continue Your Mission</h3>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.courseInfo}>
          <Badge variant="orange">{courseTitle}</Badge>
          <div className={styles.moduleName}>{moduleTitle}</div>
        </div>

        <div className={styles.lessonInfo}>
          <h4 className={styles.lessonTitle}>{lessonTitle}</h4>
          <div className={styles.meta}>
            {estimatedTime && (
              <div className={styles.metaItem}>
                <Clock size={14} />
                <span>{estimatedTime} min</span>
              </div>
            )}
            {progress !== undefined && progress > 0 && (
              <div className={styles.metaItem}>
                <span>{progress}% complete</span>
              </div>
            )}
          </div>
        </div>

        <Link href={lessonUrl} className={styles.cta}>
          <span>Start Lesson</span>
          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}
