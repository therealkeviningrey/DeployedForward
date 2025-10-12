import Link from 'next/link';
import { Container } from '@/components/Container';
import { Hero } from '@/components/Hero';
import { Pill } from '@/components/Pill';
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
          eyebrow={<Pill>AI SKILLS TRAINING</Pill>}
          title="Master generative AI. Ship real products."
          subtitle="Learn to build with ChatGPT, Claude, and Cursor through hands-on courses. No coding background required. Start shipping in days, not months."
          actions={
            <>
              <Link href="/courses" className="btn btn-primary btn-lg">
                Start Learning
              </Link>
              <Link href="/pricing" className="btn btn-ghost btn-lg">
                View Courses
              </Link>
            </>
          }
          aside={<AIMasteryDashboard />}
        />
      </Container>

      {/* Trust Row - Animated Logo Marquee */}
      <LogoMarquee
        label="Trusted by operators at"
        logos={[
          { name: 'Stripe' },
          { name: 'Vercel' },
          { name: 'GitHub' },
          { name: 'OpenAI' },
          { name: 'Anthropic' },
          { name: 'Linear' },
          { name: 'Notion' },
          { name: 'Retool' },
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

      {/* Student Outcomes */}
      <section className={styles.section}>
        <Container>
          <h2 className={styles.sectionTitle}>Student outcomes</h2>
          <div className="grid grid-3">
            <KPI value="2×" label="Faster learning" />
            <KPI value="95%" label="Completion rate" />
            <KPI value="7 days" label="First product shipped" />
          </div>
        </Container>
      </section>

      {/* Proof */}
      <section className={styles.section}>
        <Container>
          <h2 className={styles.sectionTitle}>Student success stories</h2>
          <div className="grid grid-2">
            <Testimonial
              quote="I went from zero AI knowledge to shipping my first product in 2 weeks. The hands-on approach actually works."
              author="Sarah Chen"
              role="Product Manager, now AI Builder"
            />
            <Testimonial
              quote="No coding background required is real. I built and deployed 3 working apps while learning. Game changer."
              author="Marcus Rodriguez"
              role="Marketing Lead, Startup Founder"
            />
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className={styles.finalCTA}>
        <Container size="narrow">
          <h3 className={styles.ctaTitle}>Start learning today.</h3>
          <Link href="/courses" className="btn btn-primary btn-lg">
            Browse Courses
          </Link>
        </Container>
      </section>
    </>
  );
}

