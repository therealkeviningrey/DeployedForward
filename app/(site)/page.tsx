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
          title="Deploy AI capability. Ship real products."
          subtitle="Mission-based training for ChatGPT, Claude, and Cursor. Field-tested workflows. No coding background required. Operational in days, not months."
          actions={
            <>
              <Link href="/courses" className="btn btn-primary btn-lg">
                Begin Training
              </Link>
              <Link href="/pricing" className="btn btn-ghost btn-lg">
                View Missions
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
              <h2 className={styles.approachTitle}>Field-tested learning approach</h2>
              <p className={styles.approachDescription}>
                Our courses are designed like tactical training: clear objectives, hands-on execution, and measured outcomes. No endless tutorials. No theory without practice.
              </p>
              <ul className={styles.approachList}>
                <li>
                  <span className={styles.checkmark}>✓</span>
                  <div>
                    <strong>Mission-based curriculum</strong>
                    <p>Each lesson has a clear objective and deliverable outcome</p>
                  </div>
                </li>
                <li>
                  <span className={styles.checkmark}>✓</span>
                  <div>
                    <strong>Deploy real projects</strong>
                    <p>Build working products you can share, not toy examples</p>
                  </div>
                </li>
                <li>
                  <span className={styles.checkmark}>✓</span>
                  <div>
                    <strong>Measure progress</strong>
                    <p>Track what you ship, not just what you watch</p>
                  </div>
                </li>
                <li>
                  <span className={styles.checkmark}>✓</span>
                  <div>
                    <strong>Community support</strong>
                    <p>Learn alongside others, get feedback, stay accountable</p>
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
              <h2 className={styles.instructorTitle}>Field-tested by practitioners</h2>
              <p className={styles.instructorBio}>
                Deployed Forward is built by <strong>Kevin Ingrey</strong>, former CTO with years of experience helping companies deploy AI at scale. From Microsoft Copilot rollouts to ChatGPT integrations, these missions are distilled from real production implementations.
              </p>
              <p className={styles.instructorStatement}>
                "Most AI training is theory. I built this to teach what actually works in production - the workflows, the patterns, the pitfalls. Everything I wish I'd known before deploying AI systems at scale."
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
            <h2 className={styles.foundingTitle}>Founding Operator Cohort</h2>
            <p className={styles.foundingDescription}>
              Join the first 100 operators. Lock in founding pricing forever. Help shape the training curriculum.
            </p>
            
            <div className={styles.foundingBenefits}>
              <div className={styles.benefit}>
                <span className={styles.benefitCheck}>✓</span>
                <div>
                  <strong>$19/mo locked forever</strong>
                  <p>Regular price: $29/mo. Founding operators never pay more.</p>
                </div>
              </div>
              <div className={styles.benefit}>
                <span className={styles.benefitCheck}>✓</span>
                <div>
                  <strong>Lifetime access</strong>
                  <p>All current and future missions. No additional fees.</p>
                </div>
              </div>
              <div className={styles.benefit}>
                <span className={styles.benefitCheck}>✓</span>
                <div>
                  <strong>Direct instructor access</strong>
                  <p>Private Slack channel. Get unblocked fast.</p>
                </div>
              </div>
              <div className={styles.benefit}>
                <span className={styles.benefitCheck}>✓</span>
                <div>
                  <strong>Shape the curriculum</strong>
                  <p>Request missions. Vote on topics. Influence development.</p>
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
          <h3 className={styles.ctaTitle}>Deploy capability. Start December 2025.</h3>
          <p className="text-secondary text-center mb-6">
            Training begins December 2025. Founding operator pricing available now.
          </p>
          <Link href="/pricing" className="btn btn-primary btn-lg">
            Join Founding Cohort
          </Link>
        </Container>
      </section>
    </>
  );
}

