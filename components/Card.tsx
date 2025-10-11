import styles from './Card.module.css';

interface CardProps {
  children: React.ReactNode;
  hover?: boolean;
  className?: string;
}

export function Card({ children, hover = false, className = '' }: CardProps) {
  return (
    <div className={`${styles.card} ${hover ? styles.hover : ''} ${className}`}>
      {children}
    </div>
  );
}

