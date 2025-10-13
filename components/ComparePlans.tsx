'use client';

import { useState } from 'react';
import { useLazyLoad } from '@/lib/hooks/useLazyLoad';
import styles from './ComparePlans.module.css';

interface Feature {
  name: string;
  individual: boolean | string;
  team: boolean | string;
  enterprise: boolean | string;
}

interface ComparePlansProps {
  features?: Feature[];
  className?: string;
}

const defaultFeatures: Feature[] = [
  {
    name: 'Course Access',
    individual: 'All current courses',
    team: 'All current + advanced',
    enterprise: 'Custom curriculum',
  },
  {
    name: 'Learning Tracks',
    individual: 'Beginner to intermediate',
    team: 'All tracks + specializations',
    enterprise: 'Unlimited custom paths',
  },
  {
    name: 'Team Members',
    individual: '1 learner',
    team: '5 members',
    enterprise: 'Unlimited',
  },
  {
    name: 'Progress Tracking',
    individual: true,
    team: true,
    enterprise: true,
  },
  {
    name: 'Certificates',
    individual: true,
    team: true,
    enterprise: 'Custom branded',
  },
  {
    name: 'Community Access',
    individual: true,
    team: true,
    enterprise: 'Private community',
  },
  {
    name: 'Project Repositories',
    individual: 'Personal',
    team: 'Shared team repos',
    enterprise: 'Enterprise GitHub',
  },
  {
    name: 'Support',
    individual: 'Community forum',
    team: 'Priority email',
    enterprise: 'Dedicated manager',
  },
  {
    name: 'Analytics',
    individual: 'Personal dashboard',
    team: 'Team analytics',
    enterprise: 'Advanced reporting',
  },
  {
    name: 'White-label',
    individual: false,
    team: false,
    enterprise: true,
  },
  {
    name: 'Custom Content',
    individual: false,
    team: false,
    enterprise: true,
  },
  {
    name: 'SLA',
    individual: false,
    team: false,
    enterprise: '99.9% uptime',
  },
];

export function ComparePlans({ features = defaultFeatures, className = '' }: ComparePlansProps) {
  const { ref, isVisible } = useLazyLoad({ threshold: 0.2, triggerOnce: true });
  const [expandedMobile, setExpandedMobile] = useState(false);

  const renderCell = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <svg className={styles.checkIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      ) : (
        <svg className={styles.crossIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      );
    }
    return <span className={styles.featureValue}>{value}</span>;
  };

  return (
    <div ref={ref as any} className={`${styles.compareContainer} ${isVisible ? styles.visible : ''} ${className}`}>
      <div className={styles.header}>
        <h3 className={styles.title}>Compare Plans</h3>
        <p className={styles.subtitle}>See what's included in each tier</p>
      </div>

      {/* Desktop Table */}
      <div className={styles.desktopTable}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.featureColumn}>Features</th>
              <th className={styles.tierColumn}>
                <div className={styles.tierHeader}>
                  <span className={styles.tierName}>Individual</span>
                  <span className={styles.tierPrice}>$29/mo</span>
                </div>
              </th>
              <th className={styles.tierColumn}>
                <div className={styles.tierHeader}>
                  <span className={styles.tierName}>Team</span>
                  <span className={styles.tierPrice}>Coming Soon</span>
                </div>
              </th>
              <th className={styles.tierColumn}>
                <div className={styles.tierHeader}>
                  <span className={styles.tierName}>Enterprise</span>
                  <span className={styles.tierPrice}>Coming Soon</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {features.map((feature, index) => (
              <tr key={index} className={styles.row}>
                <td className={styles.featureName}>{feature.name}</td>
                <td className={styles.featureCell}>{renderCell(feature.individual)}</td>
                <td className={styles.featureCell}>{renderCell(feature.team)}</td>
                <td className={styles.featureCell}>{renderCell(feature.enterprise)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Accordion */}
      <div className={styles.mobileAccordion}>
        <button
          className={styles.mobileToggle}
          onClick={() => setExpandedMobile(!expandedMobile)}
          aria-expanded={expandedMobile}
        >
          {expandedMobile ? 'Hide' : 'Show'} Plan Comparison
          <svg
            className={`${styles.toggleIcon} ${expandedMobile ? styles.toggleIconOpen : ''}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        {expandedMobile && (
          <div className={styles.mobileContent}>
            {features.map((feature, index) => (
              <div key={index} className={styles.mobileFeature}>
                <div className={styles.mobileFeatureName}>{feature.name}</div>
                <div className={styles.mobileTiers}>
                  <div className={styles.mobileTier}>
                    <span className={styles.mobileTierName}>Individual</span>
                    {renderCell(feature.individual)}
                  </div>
                  <div className={styles.mobileTier}>
                    <span className={styles.mobileTierName}>Team</span>
                    {renderCell(feature.team)}
                  </div>
                  <div className={styles.mobileTier}>
                    <span className={styles.mobileTierName}>Enterprise</span>
                    {renderCell(feature.enterprise)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

