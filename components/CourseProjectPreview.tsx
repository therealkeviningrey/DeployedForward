import { Card } from './Card';
import styles from './CourseProjectPreview.module.css';

interface ProjectPreviewProps {
  title: string;
  description: string;
  technologies: string[];
  estimatedTime: string;
  deliverable: string;
  className?: string;
}

export function CourseProjectPreview({
  title,
  description,
  technologies,
  estimatedTime,
  deliverable,
  className = '',
}: ProjectPreviewProps) {
  return (
    <Card className={`${styles.card} ${className}`}>
      <div className={styles.header}>
        <h4 className={styles.title}>{title}</h4>
        <span className={styles.time}>{estimatedTime}</span>
      </div>
      <p className={styles.description}>{description}</p>
      
      <div className={styles.meta}>
        <div className={styles.deliverable}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={styles.icon}>
            <path
              d="M13.3333 4L5.99996 11.3333L2.66663 8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className={styles.deliverableText}>{deliverable}</span>
        </div>
        
        {technologies.length > 0 && (
          <div className={styles.technologies}>
            {technologies.map((tech, index) => (
              <span key={index} className={styles.tech}>
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}

