'use client';

import { useState, useEffect } from 'react';
import { Container } from '@/components/Container';
import { Hero } from '@/components/Hero';
import { PricingTable } from '@/components/PricingTable';
import { Accordion } from '@/components/Accordion';
import { Pill } from '@/components/Pill';
import { TrustBadges } from '@/components/TrustBadges';
import { ComparePlans } from '@/components/ComparePlans';
import { SocialProof, FoundingSeatCounter } from '@/components/SocialProof';
import { PricingStickyMobileCTA } from '@/components/StickyMobileCTA';
import Link from 'next/link';
import { EmailCapture } from '@/components/EmailCapture';
import { TrackedLink } from '@/components/TrackedLink';
import { OperatorShell } from '@/components/OperatorShell';

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
      price: { monthly: 19, annual: 190 },
      originalPrice: { monthly: 29, annual: 290 },
      features: [
        'Access to all courses',
        'Beginner through intermediate tracks',
        'Hands-on project guides',
        'Community forum access',
        'Progress tracking dashboard',
        'Course completion certificates',
        'Lifetime access to materials',
      ],
      foundingPrice: true,
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
    <OperatorShell
      activePath="/pricing"
      breadcrumb={[{ label: 'Workspace' }, { label: 'pricing.mdx' }]}
      title="Pricing"
      subtitle="Simple pricing, locked forever."
      toolbarActions={
        <TrackedLink href="#plans" className="btn btn-primary btn-sm" label="Toolbar - Plans" location="Pricing Toolbar">
          View Plans
        </TrackedLink>
      }
    >
      <Container>
        <Hero
          title="Simple pricing, locked forever"
          subtitle="First 100 operators get $19/mo for life. Everyone after pays $29/mo. No upsells, no hidden fees, no course limits."
          actions={
            <TrackedLink href="#plans" className="btn btn-primary btn-lg" label="See Plans" location="Pricing Hero">
              See Plans
            </TrackedLink>
          }
        />

        {/* Social Proof Banner */}
        <section style={{ paddingBlock: '2rem' }}>
          <Container>
            <SocialProof variant="banner" />
          </Container>
        </section>

        {/* Pricing Story Section */}
        <section style={{ paddingBlock: '3rem' }}>
          <Container size="narrow">
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <FoundingSeatCounter />
            </div>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{ marginBottom: '1.5rem' }}>Why Founding Operator Pricing?</h2>
              <div style={{ textAlign: 'left', fontSize: '1.0625rem', lineHeight: '1.8', maxWidth: '700px', margin: '0 auto' }}>
                <p style={{ marginBottom: '1.5rem' }}>
                  We're building this platform <em>with</em> you, not just <em>for</em> you. The first 100
                  operators who join will shape what we build next—and get rewarded for taking that risk.
                </p>
                <p style={{ marginBottom: '1.5rem' }}>
                  <strong>Your $19/mo price locks in forever.</strong> Not just for the first year. Not "as long as you
                  don't cancel." Forever. Even when everyone else pays $29/mo, you'll still pay $19.
                </p>
                <p style={{ marginBottom: '0' }}>
                  That's $120 saved every year, every year, for as long as you're a member.
                  <strong> This is a one-time opportunity to be a founding operator.</strong>
                </p>
              </div>
            </div>
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

        {/* Compare Plans */}
        <section style={{ paddingBlock: '4rem' }}>
          <Container>
            <ComparePlans />
          </Container>
        </section>

        {/* Enhanced Guarantee Section */}
        <section style={{ paddingBlock: '5rem', background: 'var(--bg-secondary)' }}>
          <Container size="narrow">
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  margin: '0 auto 1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(255, 107, 0, 0.1)',
                  border: '2px solid var(--accent)',
                  borderRadius: '50%',
                }}
              >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" style={{ color: 'var(--accent)' }}>
                  <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z" fill="currentColor" />
                </svg>
              </div>
              <h2 style={{ marginBottom: '1rem' }}>Our Ironclad Guarantee</h2>
              <p className="text-secondary" style={{ fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
                Complete 3 lessons. If you haven't shipped a working project, we'll refund you in full.
                No questions asked.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '2rem',
                marginBottom: '3rem',
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✓</div>
                <h4 style={{ marginBottom: '0.5rem' }}>30 Days</h4>
                <p className="text-secondary" style={{ fontSize: '0.875rem' }}>
                  Full refund window
                </p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✓</div>
                <h4 style={{ marginBottom: '0.5rem' }}>No Questions</h4>
                <p className="text-secondary" style={{ fontSize: '0.875rem' }}>
                  If it's not for you, we get it
                </p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✓</div>
                <h4 style={{ marginBottom: '0.5rem' }}>Keep Access</h4>
                <p className="text-secondary" style={{ fontSize: '0.875rem' }}>
                  Try 3 full lessons risk-free
                </p>
              </div>
            </div>

            <TrustBadges />
          </Container>
        </section>

        {/* FAQ Section */}
        <section style={{ paddingBlock: '4rem' }}>
          <h2 className="text-center mb-6">Common questions</h2>
          <Container size="narrow">
            <Accordion items={faqItems} />
          </Container>
        </section>

        {/* Final CTA with Email Capture */}
        <section style={{ paddingBlock: '4rem' }}>
          <Container size="narrow">
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ marginBottom: '1rem' }}>Not Ready to Commit?</h3>
              <p className="text-secondary" style={{ marginBottom: '2rem' }}>
                Try a free lesson first. See our teaching style and hands-on approach.
              </p>
              <EmailCapture
                placeholder="Enter email to get a free lesson"
                variant="free-tutorial"
                location="Pricing Page - Final CTA"
              />
            </div>
          </Container>
        </section>
      </Container>
      <PricingStickyMobileCTA />
    </OperatorShell>
  );
}

