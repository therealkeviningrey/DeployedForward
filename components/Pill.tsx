import styles from './Pill.module.css';

interface PillProps {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export function Pill({ children, active = false, onClick, className = '', style }: PillProps) {
  const Component = onClick ? 'button' : 'span';
  
  return (
    <Component
      className={`${styles.pill} ${active ? styles.active : ''} ${className}`}
      onClick={onClick}
      type={onClick ? 'button' : undefined}
      style={style}
    >
      {children}
    </Component>
  );
}

