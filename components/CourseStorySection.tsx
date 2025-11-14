import { Card } from './Card';
import styles from './CourseStorySection.module.css';

interface CourseStorySectionProps {
  story: string;
  className?: string;
}

export function CourseStorySection({ story, className = '' }: CourseStorySectionProps) {
  return (
    <section className={`${styles.section} ${className}`}>
      <Card>
        <div className={styles.content}>
          <div className={styles.story}>
            {/* Story text with HTML support for formatting */}
            <div dangerouslySetInnerHTML={{ __html: story }} />
          </div>
        </div>
      </Card>
    </section>
  );
}

