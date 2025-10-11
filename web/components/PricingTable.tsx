import { Card } from './Card';
import { Badge } from './Badge';
import styles from './PricingTable.module.css';

interface PricingTier {
  name: string;
  price: {
    monthly: number;
    annual: number;
  };
  features: string[];
  recommended?: boolean;
  cta?: {
    label: string;
    href: string;
  };
}

interface PricingTableProps {
  tiers: PricingTier[];
  billingPeriod: 'monthly' | 'annual';
  className?: string;
}

export function PricingTable({ tiers, billingPeriod, className = '' }: PricingTableProps) {
  return (
    <div className={`${styles.grid} ${className}`}>
      {tiers.map((tier) => (
        <Card key={tier.name} hover className={styles.card}>
          <div className={styles.header}>
            <div className={styles.titleRow}>
              <h3 className={styles.name}>{tier.name}</h3>
              {tier.recommended && <Badge variant="orange">Recommended</Badge>}
            </div>
            <div className={styles.price}>
              <span className={styles.amount}>
                ${tier.price[billingPeriod]}
              </span>
              <span className={styles.period}>
                /{billingPeriod === 'monthly' ? 'mo' : 'yr'}
              </span>
            </div>
          </div>
          
          <ul className={styles.features}>
            {tier.features.map((feature, index) => (
              <li key={index} className={styles.feature}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className={styles.check}
                >
                  <path
                    d="M16.6667 5L7.50004 14.1667L3.33337 10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {feature}
              </li>
            ))}
          </ul>

          {tier.cta && (
            <a
              href={tier.cta.href}
              className={`btn ${tier.recommended ? 'btn-primary' : 'btn-ghost'}`}
            >
              {tier.cta.label}
            </a>
          )}
        </Card>
      ))}
    </div>
  );
}

