import styles from './Prose.module.css';

interface ProseProps {
  children: React.ReactNode;
  className?: string;
}

export function Prose({ children, className = '' }: ProseProps) {
  return <div className={`${styles.prose} ${className}`}>{children}</div>;
}

