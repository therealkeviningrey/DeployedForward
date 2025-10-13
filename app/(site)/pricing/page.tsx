'use client';

import { useState, useEffect } from 'react';
import { Container } from '@/components/Container';
import { Hero } from '@/components/Hero';
import { PricingTable } from '@/components/PricingTable';
import { Accordion } from '@/components/Accordion';
import { Pill } from '@/components/Pill';
import { TrustBadges } from '@/components/TrustBadges';
import Link from 'next/link';

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');

  // Persist billing period preference
  useEffect(() => {
    const saved = localStorage.getItem('billingPeriod');
    if (saved === 'annual' || saved === 'monthly') {
      setBillingPeriod(saved);
    }
    // Check URL param
    const params = new URLSearchParams(window.location.search);
    const period = params.get('billing');
    if (period === 'annual' || period === 'monthly') {
      setBillingPeriod(period);
    }
  }, []);

  const handleBillingChange = (period: 'monthly' | 'annual') => {
    setBillingPeriod(period);
    localStorage.setItem('billingPeriod', period);
  };

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
        label: 'Get Access – Build Today',
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
        'Yes. 30-day money-back guarantee. If you complete 3 lessons and have not shipped a working project, we will refund you in full. No questions asked.',
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
        title="Simple pricing, locked forever"
        subtitle="First 100 operators get $19/mo for life. Everyone after pays $29/mo. No upsells, no hidden fees, no course limits."
        actions={
          <Link href="#plans" className="btn btn-primary btn-lg">
            See Plans
          </Link>
        }
      />

      {/* FAQ above fold on mobile */}
      <section style={{ paddingBlock: '3rem' }}>
        <h2 className="text-center mb-6">Common questions</h2>
        <Container size="narrow">
          <Accordion items={faqItems} />
        </Container>
      </section>

      {/* Pricing */}
      <section id="plans" style={{ paddingBlock: '6rem' }}>
        <div className="flex justify-center gap-2 mb-8">
          <Pill active={billingPeriod === 'monthly'} onClick={() => handleBillingChange('monthly')}>
            Monthly
          </Pill>
          <Pill active={billingPeriod === 'annual'} onClick={() => handleBillingChange('annual')}>
            Annual (save 17%)
          </Pill>
        </div>

        <PricingTable tiers={tiers} billingPeriod={billingPeriod} />
      </section>

      {/* Trust badges and guarantee */}
      <section style={{ paddingBlock: '4rem' }}>
        <Container size="narrow">
          <TrustBadges />
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>30-Day Money-Back Guarantee</h3>
            <p className="text-secondary">
              Complete 3 lessons. If you have not shipped a working project, we will refund you in full. No questions asked.
            </p>
          </div>
        </Container>
      </section>
    </Container>
  );
}

