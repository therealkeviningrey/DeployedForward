import styles from './Container.module.css';

interface ContainerProps {
  children: React.ReactNode;
  size?: 'default' | 'wide' | 'narrow';
  className?: string;
}

export function Container({ children, size = 'default', className = '' }: ContainerProps) {
  const sizeClass = size === 'wide' ? styles.wide : size === 'narrow' ? styles.narrow : '';
  
  return (
    <div className={`${styles.container} ${sizeClass} ${className}`}>
      {children}
    </div>
  );
}

