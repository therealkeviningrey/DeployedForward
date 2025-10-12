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
      name: 'Individual',
      price: { monthly: 29, annual: 290 },
      features: [
        'Access to all courses',
        'Beginner through intermediate tracks',
        'Hands-on project guides',
        'Community forum access',
        'Progress tracking dashboard',
        'Course completion certificates',
        'Lifetime access to materials',
      ],
      recommended: true,
      cta: {
        label: 'Start Learning',
        href: '/login',
      },
    },
    {
      name: 'Team',
      price: { monthly: 99, annual: 990 },
      features: [
        'Everything in Individual',
        'Advanced courses and specializations',
        'Team learning dashboard',
        '5 team members included',
        'Shared project repositories',
        'Team progress analytics',
        'Priority email support',
        'Custom learning paths',
      ],
      recommended: false,
      cta: {
        label: 'Coming Soon',
        href: '#',
      },
      disabled: true,
    },
    {
      name: 'Enterprise',
      price: { monthly: 299, annual: 2990 },
      features: [
        'Everything in Team',
        'White-label platform option',
        'Custom course development',
        'Unlimited team members',
        'Advanced analytics & reporting',
        'Dedicated success manager',
        'Custom certification programs',
        'SLA & priority support',
        'On-site training available',
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
      title: 'What is the difference between the plans?',
      content:
        'Individual is perfect for solo learners who want access to all courses. Team is for organizations training 5-10 people together. Enterprise is for companies needing custom curriculums and white-label options.',
    },
    {
      id: 'q2',
      title: 'Do I need coding experience?',
      content: 'No! Our courses are designed for complete beginners. We teach you to build with AI tools like ChatGPT, Claude, and Cursor - no traditional programming knowledge required.',
    },
    {
      id: 'q3',
      title: 'Do you offer refunds?',
      content:
        'Yes. 30-day money-back guarantee. If you complete 3 lessons and haven't shipped a working project, we'll refund you in full. No questions asked.',
    },
    {
      id: 'q4',
      title: 'How long does it take to finish a course?',
      content:
        'Most students complete a beginner course in 2 weeks at 5 hours/week. Intermediate courses take 4 weeks. You can go faster or slower - all courses are self-paced with lifetime access.',
    },
    {
      id: 'q5',
      title: 'Can I pay annually?',
      content: 'Yes. Annual billing saves 17% compared to monthly. Toggle the switch above to see annual pricing. Annual subscribers also get early access to new courses.',
    },
  ];

  return (
    <Container>
      <Hero
        title="Pricing"
        subtitle="Choose the plan that fits your learning goals. All plans include hands-on courses, real projects, and lifetime access to course materials."
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

