import styles from './TrustBadges.module.css';

interface Badge {
  icon: string;
  label: string;
  sublabel?: string;
}

interface TrustBadgesProps {
  badges?: Badge[];
  className?: string;
}

const defaultBadges: Badge[] = [
  {
    icon: '🔒',
    label: 'Secure Payment',
    sublabel: 'Stripe encrypted',
  },
  {
    icon: '↩️',
    label: '30-Day Refund',
    sublabel: 'No questions asked',
  },
  {
    icon: '⚡',
    label: 'Instant Access',
    sublabel: 'Start learning now',
  },
  {
    icon: '🎓',
    label: 'Certificate',
    sublabel: 'On completion',
  },
];

export function TrustBadges({ badges = defaultBadges, className = '' }: TrustBadgesProps) {
  return (
    <div className={`${styles.trustBadges} ${className}`}>
      {badges.map((badge, index) => (
        <div key={index} className={styles.badge}>
          <span className={styles.icon}>{badge.icon}</span>
          <div className={styles.content}>
            <p className={styles.label}>{badge.label}</p>
            {badge.sublabel && <p className={styles.sublabel}>{badge.sublabel}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}

