import { ReactNode } from 'react';
import styles from './KPI.module.css';

interface KPIProps {
  value: string | ReactNode;
  label: string;
  className?: string;
}

export function KPI({ value, label, className = '' }: KPIProps) {
  return (
    <div className={`${styles.kpi} ${className}`}>
      <div className={styles.value}>{value}</div>
      <div className={styles.label}>{label}</div>
    </div>
  );
}

