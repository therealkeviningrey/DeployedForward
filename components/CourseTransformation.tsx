import { Card } from './Card';
import styles from './CourseTransformation.module.css';

interface TransformationItem {
  title: string;
  description: string;
  metric?: string;
}

interface CourseTransformationProps {
  before: TransformationItem[];
  after: TransformationItem[];
  className?: string;
}

export function CourseTransformation({ before, after, className = '' }: CourseTransformationProps) {
  return (
    <section className={`${styles.section} ${className}`}>
      <h2 className={styles.heading}>Before vs. After This Course</h2>
      <div className={styles.grid}>
        {/* Before Column */}
        <Card className={styles.beforeCard}>
          <div className={styles.cardHeader}>
            <div className={styles.icon}>❌</div>
            <h3 className={styles.cardTitle}>Before</h3>
          </div>
          <ul className={styles.list}>
            {before.map((item, index) => (
              <li key={index} className={styles.item}>
                <div className={styles.itemTitle}>{item.title}</div>
                <div className={styles.itemDescription}>{item.description}</div>
              </li>
            ))}
          </ul>
        </Card>

        {/* After Column */}
        <Card className={styles.afterCard}>
          <div className={styles.cardHeader}>
            <div className={styles.icon}>✓</div>
            <h3 className={styles.cardTitle}>After</h3>
          </div>
          <ul className={styles.list}>
            {after.map((item, index) => (
              <li key={index} className={styles.item}>
                <div className={styles.itemTitle}>{item.title}</div>
                <div className={styles.itemDescription}>{item.description}</div>
                {item.metric && (
                  <div className={styles.metric}>{item.metric}</div>
                )}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </section>
  );
}

