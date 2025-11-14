import React from 'react';
import styles from './BenefitsBar.module.css';

interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface BenefitsBarProps {
  benefits: Benefit[];
}

export function BenefitsBar({ benefits }: BenefitsBarProps) {
  return (
    <div className={styles.benefitsBar}>
      <div className={styles.benefitsContainer}>
        {benefits.map((benefit, index) => (
          <div key={index} className={styles.benefitItem}>
            <div className={styles.benefitIcon}>{benefit.icon}</div>
            <h3 className={styles.benefitTitle}>{benefit.title}</h3>
            <p className={styles.benefitDescription}>{benefit.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

