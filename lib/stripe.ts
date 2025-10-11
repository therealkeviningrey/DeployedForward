import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
  typescript: true,
});

export const PRICE_IDS = {
  OPERATOR_MONTHLY: process.env.STRIPE_OPERATOR_MONTHLY_PRICE_ID!,
  OPERATOR_ANNUAL: process.env.STRIPE_OPERATOR_ANNUAL_PRICE_ID!,
  UNIT_MONTHLY: process.env.STRIPE_UNIT_MONTHLY_PRICE_ID!,
  UNIT_ANNUAL: process.env.STRIPE_UNIT_ANNUAL_PRICE_ID!,
  BATTALION_MONTHLY: process.env.STRIPE_BATTALION_MONTHLY_PRICE_ID!,
  BATTALION_ANNUAL: process.env.STRIPE_BATTALION_ANNUAL_PRICE_ID!,
};

export const TIERS = {
  OPERATOR: {
    name: 'Operator',
    monthly: 29,
    annual: 290,
    features: [
      'Access to all Briefs',
      'Operator-level Missions',
      'IDE integration',
      'Community access',
    ],
  },
  UNIT: {
    name: 'Unit',
    monthly: 99,
    annual: 990,
    features: [
      'Everything in Operator',
      'Unit-level Missions',
      'Team workflows',
      'Priority support',
      'Up to 5 seats',
    ],
  },
  BATTALION: {
    name: 'Battalion',
    monthly: 299,
    annual: 2990,
    features: [
      'Everything in Unit',
      'Battalion-level Missions',
      'Custom workflows',
      'Dedicated support',
      'Unlimited seats',
      'SSO & SAML',
    ],
  },
};

