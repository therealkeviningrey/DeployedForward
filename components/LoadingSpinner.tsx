import styles from './LoadingSpinner.module.css';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'accent';
  className?: string;
}

export function LoadingSpinner({
  size = 'md',
  color = 'accent',
  className = '',
}: LoadingSpinnerProps) {
  return (
    <div
      className={`${styles.spinner} ${styles[size]} ${styles[color]} ${className}`}
      role="status"
      aria-label="Loading"
    >
      <svg viewBox="0 0 50 50" className={styles.svg}>
        <circle
          className={styles.circle}
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="4"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

// Centered loading state
export function LoadingState({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className={styles.loadingState}>
      <LoadingSpinner size="lg" />
      <p className={styles.message}>{message}</p>
    </div>
  );
}

// Inline loading (for buttons, etc.)
export function InlineSpinner() {
  return <LoadingSpinner size="sm" className={styles.inline} />;
}
