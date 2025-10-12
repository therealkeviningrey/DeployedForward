'use client';

import styles from './LogoMarquee.module.css';

interface Logo {
  name: string;
  icon?: string;
}

interface LogoMarqueeProps {
  logos: Logo[];
  label?: string;
}

export function LogoMarquee({ logos, label }: LogoMarqueeProps) {
  // Duplicate logos for seamless loop
  const duplicatedLogos = [...logos, ...logos];

  return (
    <section className={styles.marqueeSection}>
      {label && <p className={styles.label}>{label}</p>}
      <div className={styles.marqueeContainer}>
        <div className={styles.marqueeTrack}>
          {duplicatedLogos.map((logo, index) => (
            <div key={`${logo.name}-${index}`} className={styles.logoItem}>
              {logo.icon ? (
                <span className={styles.logoIcon}>{logo.icon}</span>
              ) : (
                <span className={styles.logoText}>{logo.name}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

