import Link from 'next/link';
import { Container } from '@/components/Container';
import { Hero } from '@/components/Hero';
import { Pill } from '@/components/Pill';
import { CodeSnippet } from '@/components/CodeSnippet';
import { Card } from '@/components/Card';
import { KPI } from '@/components/KPI';
import { Testimonial } from '@/components/Testimonial';
import { Tabs } from '@/components/Tabs';
import styles from './page.module.css';

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Container>
        <Hero
          eyebrow={<Pill>OPERATIONAL INTELLIGENCE</Pill>}
          title="Train where the future is operational."
          subtitle="Build repeatable AI advantage with field-tested workflows and missions. Master AI workflows. Deploy capability. No fluff."
          actions={
            <>
              <Link href="/courses" className="btn btn-primary btn-lg">
                Start Mission
              </Link>
              <Link href="/programs/briefs" className="btn btn-ghost btn-lg">
                Enter Briefs
              </Link>
            </>
          }
          aside={
            <div className={styles.heroAside}>
              <div className={styles.pillGroup}>
                <Pill>MACOS</Pill>
                <Pill>LINUX</Pill>
                <Pill>WINDOWS</Pill>
              </div>
              <CodeSnippet code="> df install" />
              <div className={styles.statusGrid}>
                <div className={styles.statusDot} />
                <span className={styles.statusText}>System operational</span>
              </div>
            </div>
          }
        />
      </Container>

      {/* Trust Row */}
      <section className={styles.trustSection}>
        <Container>
          <p className={styles.trustLabel}>Trusted by operators at</p>
          <div className={styles.trustLogos}>
            {/* Placeholder for trust logos */}
            <div className={styles.trustLogo}>Company 1</div>
            <div className={styles.trustLogo}>Company 2</div>
            <div className={styles.trustLogo}>Company 3</div>
            <div className={styles.trustLogo}>Company 4</div>
            <div className={styles.trustLogo}>Company 5</div>
          </div>
        </Container>
      </section>

      {/* Work Where You Operate */}
      <section className="py-16">
        <Container>
          <h2 className={styles.sectionTitle}>Work Where You Operate</h2>
          <Tabs
            tabs={[
              {
                id: 'ide',
                label: 'IDE',
                content: (
                  <div className={styles.tabContent}>
                    <p className={styles.tabDescription}>
                      Native integration with VS Code, Cursor, and JetBrains. AI workflows in your editor.
                    </p>
                    <CodeSnippet code='// Auto-generated from mission context\nexport async function validateUser(email: string): Promise<boolean> {\n  // Implementation\n}' />
                  </div>
                ),
              },
              {
                id: 'web',
                label: 'Web',
                content: (
                  <div className={styles.tabContent}>
                    <p className={styles.tabDescription}>
                      Full mission catalog, progress tracking, and team coordination in the browser.
                    </p>
                  </div>
                ),
              },
              {
                id: 'cli',
                label: 'CLI',
                content: (
                  <div className={styles.tabContent}>
                    <p className={styles.tabDescription}>
                      Terminal-first workflows. Automate everything with the `df` command.
                    </p>
                    <CodeSnippet code='df workflow run scaffold --template api\ndf deploy --target production' />
                  </div>
                ),
              },
            ]}
          />
        </Container>
      </section>

      {/* Programs */}
      <section className="py-16">
        <Container>
          <h2 className={styles.sectionTitle}>Programs</h2>
          <div className="grid grid-3">
            <Card hover>
              <h3 className={styles.cardTitle}>Briefs</h3>
              <p className={styles.cardDescription}>
                Weekly intel. 10-minute reads. What's working in production, not theory.
              </p>
              <Link href="/programs/briefs" className="btn btn-ghost btn-sm">
                Enter Briefs
              </Link>
            </Card>
            <Card hover>
              <h3 className={styles.cardTitle}>Missions</h3>
              <p className={styles.cardDescription}>
                Hands-on training. Measurable output. Deploy working code, not toy examples.
              </p>
              <Link href="/programs/missions" className="btn btn-ghost btn-sm">
                View Missions
              </Link>
            </Card>
            <Card hover>
              <h3 className={styles.cardTitle}>Campaigns</h3>
              <p className={styles.cardDescription}>
                Bundled capability. Deploy as a unit. Complete workflows, not fragments.
              </p>
              <Link href="/programs/campaigns" className="btn btn-ghost btn-sm">
                Explore Bundles
              </Link>
            </Card>
          </div>
        </Container>
      </section>

      {/* Outcomes */}
      <section className="py-16">
        <Container>
          <h2 className={styles.sectionTitle}>Outcomes</h2>
          <div className="grid grid-3">
            <KPI value="2×" label="Ship faster" />
            <KPI value="40%" label="Cut rework" />
            <KPI value="100%" label="Stabilize delivery" />
          </div>
        </Container>
      </section>

      {/* Proof */}
      <section className="py-16">
        <Container>
          <h2 className={styles.sectionTitle}>Proof</h2>
          <div className="grid grid-2">
            <Testimonial
              quote="Cut our AI experimentation phase from months to weeks. Real workflows, not theory."
              author="Sarah Chen"
              role="VP Engineering, TechCorp"
            />
            <Testimonial
              quote="Finally, AI training that produces deployable code. Our team is shipping features faster."
              author="Marcus Rodriguez"
              role="Lead Developer, StartupCo"
            />
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className={styles.finalCTA}>
        <Container size="narrow">
          <h3 className={styles.ctaTitle}>Deploy now.</h3>
          <Link href="/courses" className="btn btn-primary btn-lg">
            Start Mission
          </Link>
        </Container>
      </section>
    </>
  );
}

