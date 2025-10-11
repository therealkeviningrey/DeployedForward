import styles from './Hero.module.css';

interface HeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  aside?: React.ReactNode;
  className?: string;
}

export function Hero({ eyebrow, title, subtitle, actions, aside, className = '' }: HeroProps) {
  return (
    <section className={`${styles.hero} ${className}`}>
      <div className={styles.content}>
        {eyebrow && <div className={styles.eyebrow}>{eyebrow}</div>}
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
      {aside && <div className={styles.aside}>{aside}</div>}
    </section>
  );
}

