"use client";

import { Card } from './Card';
import { Badge } from './Badge';
import { TrackedLink } from './TrackedLink';
import { StrikethroughPrice } from './StrikethroughPrice';
import styles from './PricingTable.module.css';

interface PricingTier {
  name: string;
  price: {
    monthly: number;
    annual: number;
  };
  originalPrice?: {
    monthly?: number;
    annual?: number;
  };
  features: string[];
  recommended?: boolean;
  cta?: {
    label: string;
    href: string;
  };
  disabled?: boolean;
  foundingPrice?: boolean;
  guaranteeBadge?: boolean;
}

interface PricingTableProps {
  tiers: PricingTier[];
  billingPeriod: 'monthly' | 'annual';
  className?: string;
  showGuarantee?: boolean;
}

export function PricingTable({ tiers, billingPeriod, className = '', showGuarantee = true }: PricingTableProps) {
  return (
    <div className={`${styles.grid} ${className}`}>
      {tiers.map((tier) => {
        const hasDiscount = tier.originalPrice && tier.originalPrice[billingPeriod];
        
        return (
          <Card 
            key={tier.name} 
            hover={!tier.disabled} 
            className={`${styles.card} ${tier.disabled ? styles.cardDisabled : ''}`}
          >
            <div className={styles.header}>
              <div className={styles.titleRow}>
                <h3 className={styles.name}>{tier.name}</h3>
                {tier.foundingPrice && <Badge variant="orange">Founding Price</Badge>}
                {tier.recommended && !tier.foundingPrice && <Badge variant="orange">Recommended</Badge>}
                {tier.disabled && <Badge>Coming Soon</Badge>}
              </div>
              
              {hasDiscount ? (
                <div className={styles.priceWithDiscount}>
                  <StrikethroughPrice
                    originalPrice={tier.originalPrice![billingPeriod]!}
                    discountedPrice={tier.price[billingPeriod]}
                    period={billingPeriod === 'monthly' ? 'mo' : 'yr'}
                    size="lg"
                  />
                </div>
              ) : (
                <div className={styles.price}>
                  <span className={styles.amount}>
                    ${tier.price[billingPeriod]}
                  </span>
                  <span className={styles.period}>
                    /{billingPeriod === 'monthly' ? 'mo' : 'yr'}
                  </span>
                </div>
              )}
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
            tier.disabled ? (
              <a
                href={tier.cta.href}
                className={`btn ${tier.recommended || tier.foundingPrice ? 'btn-primary' : 'btn-ghost'} ${tier.disabled ? styles.btnDisabled : ''}`}
                aria-disabled="true"
                onClick={(e) => e.preventDefault()}
              >
                {tier.cta.label}
              </a>
            ) : (
              <TrackedLink
                href={tier.cta.href}
                className={`btn ${tier.recommended || tier.foundingPrice ? 'btn-primary' : 'btn-ghost'}`}
                label={`Pricing CTA - ${tier.name}`}
                location="Pricing Table"
              >
                {tier.cta.label}
              </TrackedLink>
            )
          )}
          
          {showGuarantee && (tier.recommended || tier.foundingPrice) && (
            <div className={styles.guarantee}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={styles.guaranteeIcon}>
                <path
                  d="M8 1L10.5 5.5L15.5 6.5L12 10.5L12.5 15.5L8 13.5L3.5 15.5L4 10.5L0.5 6.5L5.5 5.5L8 1Z"
                  fill="currentColor"
                />
              </svg>
              <span>30-day money-back guarantee</span>
            </div>
          )}
        </Card>
      )})}
    </div>
  );
}

