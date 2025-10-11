import styles from './Testimonial.module.css';

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  className?: string;
}

export function Testimonial({ quote, author, role, className = '' }: TestimonialProps) {
  return (
    <blockquote className={`${styles.testimonial} ${className}`}>
      <p className={styles.quote}>"{quote}"</p>
      <footer className={styles.footer}>
        <cite className={styles.author}>{author}</cite>
        <span className={styles.role}>{role}</span>
      </footer>
    </blockquote>
  );
}

