'use client';

import { useState } from 'react';
import { Container } from '@/components/Container';
import { Hero } from '@/components/Hero';
import { PricingTable } from '@/components/PricingTable';
import { Accordion } from '@/components/Accordion';
import { Pill } from '@/components/Pill';

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');

  const tiers = [
    {
      name: 'Operator',
      price: { monthly: 29, annual: 290 },
      features: [
        'Access to all Briefs',
        'Operator-level Missions',
        'IDE integration',
        'CLI tooling',
        'Community access',
        'Progress tracking',
        'Certificates on completion',
      ],
      recommended: true,
      cta: {
        label: 'Start Training',
        href: '/login',
      },
    },
    {
      name: 'Unit',
      price: { monthly: 99, annual: 990 },
      features: [
        'Everything in Operator',
        'Unit-level Missions',
        'Team coordination workflows',
        '5 team members included',
        'Shared progress tracking',
        'Team analytics dashboard',
        'Priority support',
        'Custom mission requests',
      ],
      recommended: false,
      cta: {
        label: 'Coming Soon',
        href: '#',
      },
      disabled: true,
    },
    {
      name: 'Battalion',
      price: { monthly: 299, annual: 2990 },
      features: [
        'Everything in Unit',
        'Battalion-level Missions',
        'Multi-team orchestration',
        'Unlimited team members',
        'Advanced analytics & reporting',
        'Dedicated account manager',
        'Custom training programs',
        'SLA & priority support',
        'On-premise deployment option',
      ],
      recommended: false,
      cta: {
        label: 'Coming Soon',
        href: '#',
      },
      disabled: true,
    },
  ];

  const faqItems = [
    {
      id: 'q1',
      title: 'What is the difference between the tiers?',
      content:
        'Operator is for individual contributors. Unit is for teams (5-10 people). Battalion is for organizations (multiple teams). Each tier includes progressively advanced missions and coordination features.',
    },
    {
      id: 'q2',
      title: 'Can I switch tiers?',
      content: 'Yes. Upgrade or downgrade anytime. Changes take effect at your next billing cycle.',
    },
    {
      id: 'q3',
      title: 'Do you offer refunds?',
      content:
        'Yes. 30-day money-back guarantee. If the training does not produce deployable results, we refund you.',
    },
    {
      id: 'q4',
      title: 'What if I need more seats?',
      content:
        'Unit tier includes 5 seats. Need more? Upgrade to Battalion for unlimited seats, or contact us for custom pricing.',
    },
    {
      id: 'q5',
      title: 'Can I pay annually?',
      content: 'Yes. Annual billing saves approximately 17% compared to monthly. Toggle the switch above to see annual pricing.',
    },
  ];

  return (
    <Container>
      <Hero
        title="Pricing"
        subtitle="Three tiers: Operator (individual), Unit (team), Battalion (organization). All include hands-on missions with deployable outcomes."
      />

      <section style={{ paddingBlock: '6rem' }}>
        <div className="flex justify-center gap-2 mb-8">
          <Pill active={billingPeriod === 'monthly'} onClick={() => setBillingPeriod('monthly')}>
            Monthly
          </Pill>
          <Pill active={billingPeriod === 'annual'} onClick={() => setBillingPeriod('annual')}>
            Annual (save 17%)
          </Pill>
        </div>

        <PricingTable tiers={tiers} billingPeriod={billingPeriod} />
      </section>

      <section style={{ paddingBlock: '6rem' }}>
        <h2 className="text-center mb-8">Frequently asked questions</h2>
        <Container size="narrow">
          <Accordion items={faqItems} />
        </Container>
      </section>
    </Container>
  );
}

