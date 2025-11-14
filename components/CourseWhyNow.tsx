import { Card } from './Card';
import styles from './CourseWhyNow.module.css';

interface WhyNowPoint {
  icon: React.ReactNode;
  title: string;
  description: string;
  stat?: string;
}

interface CourseWhyNowProps {
  headline?: string;
  points: WhyNowPoint[];
  closingStatement?: string;
  className?: string;
}

export function CourseWhyNow({
  headline = 'Why Learn This Now?',
  points,
  closingStatement,
  className = '',
}: CourseWhyNowProps) {
  return (
    <section className={`${styles.section} ${className}`}>
      <h2 className={styles.heading}>{headline}</h2>
      
      <div className={styles.grid}>
        {points.map((point, index) => (
          <Card key={index} className={styles.card}>
            <div className={styles.iconWrapper}>{point.icon}</div>
            <h3 className={styles.title}>{point.title}</h3>
            {point.stat && (
              <div className={styles.stat}>{point.stat}</div>
            )}
            <p className={styles.description}>{point.description}</p>
          </Card>
        ))}
      </div>

      {closingStatement && (
        <div className={styles.closing}>
          <Card>
            <p className={styles.closingText}>{closingStatement}</p>
          </Card>
        </div>
      )}
    </section>
  );
}

