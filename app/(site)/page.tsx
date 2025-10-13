'use client';

import Link from 'next/link';
import { Container } from '@/components/Container';
import { Hero } from '@/components/Hero';
import { Pill } from '@/components/Pill';
import { Badge } from '@/components/Badge';
import { CodeSnippet } from '@/components/CodeSnippet';
import { Card } from '@/components/Card';
import { KPI } from '@/components/KPI';
import { Counter } from '@/components/Counter';
import { TrustBadges } from '@/components/TrustBadges';
import { LazySection } from '@/components/LazySection';
import { FeatureCard } from '@/components/FeatureCard';
import { TrackedLink } from '@/components/TrackedLink';
import { Testimonial } from '@/components/Testimonial';
import { Tabs } from '@/components/Tabs';
import { LogoMarquee } from '@/components/LogoMarquee';
import { AIMasteryDashboard } from '@/components/AIMasteryDashboard';
import { useScrollDepth } from '@/lib/hooks/useScrollDepth';
import styles from './page.module.css';

export default function HomePage() {
  // Track scroll depth
  useScrollDepth();

  return (
    <>
      {/* Hero Section */}
      <Container>
        <Hero
          eyebrow={<Pill>OPERATOR TRAINING</Pill>}
          title="Ship your first AI-powered product by Friday"
          subtitle="Hands-on training for ChatGPT, Claude, and Cursor. Build real products in 72 hours, not 6 months. No coding background required."
          actions={
            <>
              <TrackedLink 
                href="/pricing" 
                className="btn btn-primary btn-lg"
                label="Get Access – Build Today"
                location="Homepage Hero"
              >
                Get Access – Build Today
              </TrackedLink>
              <TrackedLink 
                href="/courses" 
                className="btn btn-ghost btn-lg"
                label="See What You'll Build"
                location="Homepage Hero"
              >
                See What You'll Build
              </TrackedLink>
            </>
          }
          aside={<AIMasteryDashboard />}
        />
      </Container>

      {/* Tactical Learning Approach */}
      <section className={styles.approachSection}>
        <Container>
          <div className={styles.approachGrid}>
            <div className={styles.imageContainer}>
              <img 
                src="/images/students.png" 
                alt="Field-tested tactical training approach - students learning AI in hands-on environment"
                className={styles.approachImage}
              />
            </div>
            <div className={styles.approachContent}>
              <h2 className={styles.approachTitle}>Replace hours of videos with deployable code in 3 hours</h2>
              <p className={styles.approachDescription}>
                Stop watching. Start building. Every mission ends with a working product you deploy to production. Not another todo app. Real projects you'll actually use.
              </p>
              <div className={styles.featureGrid}>
                <FeatureCard
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                  }
                  title="Build in hours, not weeks"
                  description="Your first working product deploys in 72 hours. Portfolio-ready projects, not tutorials."
                />
                <FeatureCard
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                  }
                  title="No coding degree needed"
                  description="Product managers, marketers, and founders are shipping real products. You can too."
                />
                <FeatureCard
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <path d="M22 4L12 14.01l-3-3" />
                    </svg>
                  }
                  title="Skip the trial and error"
                  description="Learn patterns that work from someone who's deployed AI at enterprise scale."
                />
                <FeatureCard
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                  }
                  title="Stand out in your role"
                  description="While others talk about AI, you'll be the one shipping solutions."
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Tech Stack - Tools You'll Master */}
      <LazySection animation="fade">
        <LogoMarquee
          label="Master best-in-class tools"
          logos={[
            { name: 'ChatGPT', tooltip: 'Prompt engineering & API integration' },
            { name: 'Claude', tooltip: 'Advanced reasoning & long context' },
            { name: 'Cursor', tooltip: 'AI-assisted development' },
            { name: 'Vercel', tooltip: 'Deploy to production' },
            { name: 'GitHub', tooltip: 'Version control & collaboration' },
            { name: 'Stripe', tooltip: 'Payment processing' },
            { name: 'Supabase', tooltip: 'Database & authentication' },
            { name: 'Resend', tooltip: 'Transactional emails' },
          ]}
        />
      </LazySection>

      {/* What You'll Master */}
      <LazySection animation="slide-up">
        <section className={styles.section}>
          <Container>
            <h2 className={styles.sectionTitle}>What you'll master</h2>
            <div className="grid grid-3">
              <Card hover>
                <h3 className={styles.cardTitle}>Prompt Engineering</h3>
                <p className={styles.cardDescription}>
                  Write prompts that actually work. Get consistent, high-quality outputs from any AI tool.
                </p>
                <TrackedLink 
                  href="/courses#prompts" 
                  className="btn btn-ghost btn-sm"
                  label="Learn Prompting"
                  location="Homepage What You'll Master"
                >
                  Learn Prompting
                </TrackedLink>
              </Card>
              <Card hover>
                <h3 className={styles.cardTitle}>Building Products</h3>
                <p className={styles.cardDescription}>
                  Turn ideas into working apps using ChatGPT, Claude, and Cursor. Ship real projects, fast.
                </p>
                <TrackedLink 
                  href="/courses#building" 
                  className="btn btn-ghost btn-sm"
                  label="Start Building"
                  location="Homepage What You'll Master"
                >
                  Start Building
                </TrackedLink>
              </Card>
              <Card hover>
                <h3 className={styles.cardTitle}>Going to Production</h3>
                <p className={styles.cardDescription}>
                  Deploy your work. Share with users. Iterate based on feedback. Complete the full cycle.
                </p>
                <TrackedLink 
                  href="/courses#deployment" 
                  className="btn btn-ghost btn-sm"
                  label="Learn Deployment"
                  location="Homepage What You'll Master"
                >
                  Learn Deployment
                </TrackedLink>
              </Card>
            </div>
          </Container>
        </section>
      </LazySection>

      {/* Mission Outcomes */}
      <LazySection animation="slide-up">
        <section className={styles.section}>
          <Container>
            <h2 className={styles.sectionTitle}>Mission outcomes</h2>
            <div className="grid grid-3">
              <KPI value={<Counter end={2} suffix="×" />} label="Deploy faster" />
              <KPI value={<Counter end={24} />} label="Missions available" />
              <KPI value={<Counter end={7} suffix=" days" />} label="First deployment" />
            </div>
          </Container>
        </section>
      </LazySection>

      {/* Example Deployments */}
      <section className={styles.section}>
        <Container>
          <h2 className={styles.sectionTitle}>Training missions</h2>
          <p className="text-center text-secondary mb-8 max-w-2xl mx-auto">
            Every mission produces deployable code. No toy examples. These are the operations you'll execute during training.
          </p>
          <div className="grid grid-2 gap-4">
            <Card hover>
              <Badge variant="orange">Mission 01</Badge>
              <h3 className="mt-3 mb-2">Landing Page Deployment</h3>
              <p className="text-secondary text-sm mb-4">
                Execute: Build production landing page with v0. Deploy to Vercel. Configure custom domain. Operational in 3 hours.
              </p>
              <div className="text-xs text-secondary">
                Stack: ChatGPT, v0, Vercel • Duration: 3 hours
              </div>
            </Card>
            <Card hover>
              <Badge variant="orange">Mission 04</Badge>
              <h3 className="mt-3 mb-2">AI Chatbot Integration</h3>
              <p className="text-secondary text-sm mb-4">
                Execute: Claude API integration with Next.js. Authentication, rate limiting, production deployment. Working customer support bot.
              </p>
              <div className="text-xs text-secondary">
                Stack: Claude, Next.js, Supabase • Duration: 6 hours
              </div>
            </Card>
            <Card hover>
              <Badge>Mission 12</Badge>
              <h3 className="mt-3 mb-2">SaaS Application</h3>
              <p className="text-secondary text-sm mb-4">
                Execute: Full-stack app with Stripe payments, user auth, database. Deploy complete SaaS product with AI-assisted development using Cursor.
              </p>
              <div className="text-xs text-secondary">
                Stack: Cursor, Stripe, Clerk, Prisma • Duration: 2 weeks
              </div>
            </Card>
            <Card hover>
              <Badge>Mission 18</Badge>
              <h3 className="mt-3 mb-2">Custom Workflow Automation</h3>
              <p className="text-secondary text-sm mb-4">
                Execute: Design and deploy your own AI workflow. API orchestration, webhooks, scheduled jobs. Production-grade automation.
              </p>
              <div className="text-xs text-secondary">
                Stack: OpenAI, Webhooks, Vercel Functions • Duration: 1 week
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* Instructor Credibility */}
      <section className={styles.section}>
        <Container>
          <div className={styles.instructorGrid}>
            <div className={styles.instructorContent}>
              <h2 className={styles.instructorTitle}>Taught by someone who's been there</h2>
              <p className={styles.instructorBio}>
                <strong>Kevin Ingrey</strong>, former CTO. I've spent years helping companies adopt AI - from Microsoft Copilot to ChatGPT integrations. I've seen what works and what doesn't. These missions cut through the noise.
              </p>
              <p className={styles.instructorStatement}>
                "I wasted months on tutorials before figuring out what actually works. These missions are everything I wish I'd had - no fluff, just the patterns that get you shipping. Fast."
              </p>
              <div className={styles.instructorMeta}>
                <div className={styles.metaItem}>
                  <div className={styles.metaValue}>Former CTO</div>
                  <div className={styles.metaLabel}>Leadership</div>
                </div>
                <div className={styles.metaItem}>
                  <div className={styles.metaValue}>Enterprise AI</div>
                  <div className={styles.metaLabel}>Scale Deployments</div>
                </div>
                <div className={styles.metaItem}>
                  <div className={styles.metaValue}>Production</div>
                  <div className={styles.metaLabel}>Real Systems</div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Founding Operator Cohort */}
      <section className={styles.foundingSection}>
        <Container size="narrow">
          <div className={styles.foundingCard}>
            <Badge variant="orange">Limited Availability</Badge>
            <h2 className={styles.foundingTitle}>Claim your lifelong $19 seat — only 100 exist</h2>
            <p className={styles.foundingDescription}>
              Founding operator pricing locks forever. Pay $19/mo while everyone else pays $29. That's $120/year saved. Every year.
            </p>
            
            <div className={styles.foundingBenefits}>
              <div className={styles.benefit}>
                <span className={styles.benefitCheck}>✓</span>
                <div>
                  <strong>$19/mo locked forever</strong>
                  <p>Everyone after the first 100 pays $29/mo. You never pay more. Ever.</p>
                </div>
              </div>
              <div className={styles.benefit}>
                <span className={styles.benefitCheck}>✓</span>
                <div>
                  <strong>Every mission, forever</strong>
                  <p>All current courses plus everything we add. No upsells, no course limits.</p>
                </div>
              </div>
              <div className={styles.benefit}>
                <span className={styles.benefitCheck}>✓</span>
                <div>
                  <strong>Direct help when stuck</strong>
                  <p>Private Slack with instructor. Get unblocked in hours, not days.</p>
                </div>
              </div>
              <div className={styles.benefit}>
                <span className={styles.benefitCheck}>✓</span>
                <div>
                  <strong>Founding operator badge</strong>
                  <p>Show you were first. Recognition for being an early adopter.</p>
                </div>
              </div>
            </div>

            <div className={styles.foundingMeta}>
              <div className={styles.launchDate}>
                <div className={styles.launchLabel}>Mission Start:</div>
                <div className={styles.launchValue}>December 2025</div>
              </div>
              <div className={styles.spotsRemaining}>
                <div className={styles.spotsLabel}>First Cohort:</div>
                <div className={styles.spotsValue}>100 Operators</div>
              </div>
            </div>

            <div className="flex gap-3 justify-center mt-6">
              <TrackedLink 
                href="/pricing" 
                className="btn btn-primary btn-lg"
                label="Claim Your $19 Seat"
                location="Homepage Founding Cohort"
              >
                Claim Your $19 Seat
              </TrackedLink>
              <TrackedLink 
                href="/courses" 
                className="btn btn-ghost btn-lg"
                label="View All Missions"
                location="Homepage Founding Cohort"
              >
                View All Missions
              </TrackedLink>
            </div>
          </div>
        </Container>
      </section>

      {/* Trust & Final CTA */}
      <LazySection animation="fade">
        <section className={styles.finalCTA}>
          <Container size="narrow">
            <TrustBadges />
            <h3 className={styles.ctaTitle}>The AI revolution isn't waiting. Neither should you.</h3>
            <p className="text-secondary text-center mb-6">
              Cohort 1 starts December 2025. Founding pricing closes at 100 operators.
            </p>
            <TrackedLink 
              href="/pricing" 
              className="btn btn-primary btn-lg"
              label="Get Access – Build Today"
              location="Homepage Final CTA"
            >
              Get Access – Build Today
            </TrackedLink>
          </Container>
        </section>
      </LazySection>
    </>
  );
}

