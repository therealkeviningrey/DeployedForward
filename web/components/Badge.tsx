import styles from './Badge.module.css';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'orange';
  className?: string;
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  return (
    <span className={`${styles.badge} ${variant === 'orange' ? styles.orange : ''} ${className}`}>
      {children}
    </span>
  );
}

