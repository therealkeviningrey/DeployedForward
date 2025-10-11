import styles from './Pill.module.css';

interface PillProps {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export function Pill({ children, active = false, onClick, className = '' }: PillProps) {
  const Component = onClick ? 'button' : 'span';
  
  return (
    <Component
      className={`${styles.pill} ${active ? styles.active : ''} ${className}`}
      onClick={onClick}
      type={onClick ? 'button' : undefined}
    >
      {children}
    </Component>
  );
}

