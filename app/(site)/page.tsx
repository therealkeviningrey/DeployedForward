import Link from 'next/link';
import { Container } from '@/components/Container';
import { Hero } from '@/components/Hero';
import { Pill } from '@/components/Pill';
import { Badge } from '@/components/Badge';
import { CodeSnippet } from '@/components/CodeSnippet';
import { Card } from '@/components/Card';
import { KPI } from '@/components/KPI';
import { Testimonial } from '@/components/Testimonial';
import { Tabs } from '@/components/Tabs';
import { LogoMarquee } from '@/components/LogoMarquee';
import { AIMasteryDashboard } from '@/components/AIMasteryDashboard';
import styles from './page.module.css';

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Container>
        <Hero
          eyebrow={<Pill>OPERATOR TRAINING</Pill>}
          title="Stop watching tutorials. Start shipping."
          subtitle="Hands-on training for ChatGPT, Claude, and Cursor. Build real products in 72 hours, not 6 months. No coding background required."
          actions={
            <>
              <Link href="/pricing" className="btn btn-primary btn-lg">
                Claim Founding Price
              </Link>
              <Link href="/courses" className="btn btn-ghost btn-lg">
                See What You'll Build
              </Link>
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
              <h2 className={styles.approachTitle}>Escape tutorial hell</h2>
              <p className={styles.approachDescription}>
                Stop watching. Start building. Every mission ends with a working product you deploy to production. Not another todo app. Real projects you'll actually use.
              </p>
              <ul className={styles.approachList}>
                <li>
                  <span className={styles.checkmark}>✓</span>
                  <div>
                    <strong>Build in hours, not weeks</strong>
                    <p>Your first working product deploys in 72 hours. Portfolio-ready projects, not tutorials.</p>
                  </div>
                </li>
                <li>
                  <span className={styles.checkmark}>✓</span>
                  <div>
                    <strong>No coding degree needed</strong>
                    <p>Product managers, marketers, and founders are shipping real products. You can too.</p>
                  </div>
                </li>
                <li>
                  <span className={styles.checkmark}>✓</span>
                  <div>
                    <strong>Skip the trial and error</strong>
                    <p>Learn patterns that work from someone who's deployed AI at enterprise scale.</p>
                  </div>
                </li>
                <li>
                  <span className={styles.checkmark}>✓</span>
                  <div>
                    <strong>Stand out in your role</strong>
                    <p>While others talk about AI, you'll be the one shipping solutions.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Tech Stack - Tools You'll Master */}
      <LogoMarquee
        label="Master best-in-class tools"
        logos={[
          { name: 'ChatGPT' },
          { name: 'Claude' },
          { name: 'Cursor' },
          { name: 'Vercel' },
          { name: 'GitHub' },
          { name: 'Stripe' },
          { name: 'Supabase' },
          { name: 'Resend' },
        ]}
      />

      {/* How You Learn */}
      <section className={styles.section}>
        <Container>
          <h2 className={styles.sectionTitle}>Learn by doing, not watching</h2>
          <Tabs
            tabs={[
              {
                id: 'hands-on',
                label: 'Hands-On Projects',
                content: (
                  <div className={styles.tabContent}>
                    <p className={styles.tabDescription}>
                      Build real products, not toy examples. Every lesson ends with a working project you can deploy and share.
                    </p>
                    <CodeSnippet code='Lesson 1: Build a landing page with v0\nLesson 2: Create a chatbot with ChatGPT\nLesson 3: Deploy to Vercel\n\nResult: Live product in 3 hours' />
                  </div>
                ),
              },
              {
                id: 'structured',
                label: 'Structured Path',
                content: (
                  <div className={styles.tabContent}>
                    <p className={styles.tabDescription}>
                      Follow proven learning paths from complete beginner to advanced AI builder. Clear progression, no overwhelm.
                    </p>
                  </div>
                ),
              },
              {
                id: 'community',
                label: 'Community',
                content: (
                  <div className={styles.tabContent}>
                    <p className={styles.tabDescription}>
                      Learn alongside other AI builders. Get feedback on your projects, share wins, and stay motivated.
                    </p>
                  </div>
                ),
              },
            ]}
          />
        </Container>
      </section>

      {/* What You'll Master */}
      <section className={styles.section}>
        <Container>
          <h2 className={styles.sectionTitle}>What you'll master</h2>
          <div className="grid grid-3">
            <Card hover>
              <h3 className={styles.cardTitle}>Prompt Engineering</h3>
              <p className={styles.cardDescription}>
                Write prompts that actually work. Get consistent, high-quality outputs from any AI tool.
              </p>
              <Link href="/courses#prompts" className="btn btn-ghost btn-sm">
                Learn Prompting
              </Link>
            </Card>
            <Card hover>
              <h3 className={styles.cardTitle}>Building Products</h3>
              <p className={styles.cardDescription}>
                Turn ideas into working apps using ChatGPT, Claude, and Cursor. Ship real projects, fast.
              </p>
              <Link href="/courses#building" className="btn btn-ghost btn-sm">
                Start Building
              </Link>
            </Card>
            <Card hover>
              <h3 className={styles.cardTitle}>Going to Production</h3>
              <p className={styles.cardDescription}>
                Deploy your work. Share with users. Iterate based on feedback. Complete the full cycle.
              </p>
              <Link href="/courses#deployment" className="btn btn-ghost btn-sm">
                Learn Deployment
              </Link>
            </Card>
          </div>
        </Container>
      </section>

      {/* Mission Outcomes */}
      <section className={styles.section}>
        <Container>
          <h2 className={styles.sectionTitle}>Mission outcomes</h2>
          <div className="grid grid-3">
            <KPI value="2×" label="Deploy faster" />
            <KPI value="24" label="Missions available" />
            <KPI value="7 days" label="First deployment" />
          </div>
        </Container>
      </section>

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
            <h2 className={styles.foundingTitle}>First 100 Get $19/mo. Everyone After Pays $29.</h2>
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
              <Link href="/pricing" className="btn btn-primary btn-lg">
                Claim Your Position
              </Link>
              <Link href="/courses" className="btn btn-ghost btn-lg">
                View All Missions
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className={styles.finalCTA}>
        <Container size="narrow">
          <h3 className={styles.ctaTitle}>The AI revolution isn't waiting. Neither should you.</h3>
          <p className="text-secondary text-center mb-6">
            Cohort 1 starts December 2025. Founding pricing closes at 100 operators.
          </p>
          <Link href="/pricing" className="btn btn-primary btn-lg">
            Lock in $19/mo Forever
          </Link>
        </Container>
      </section>
    </>
  );
}

