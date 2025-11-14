import { Container } from '@/components/Container';
import { Hero } from '@/components/Hero';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { EmailCapture } from '@/components/EmailCapture';
import Link from 'next/link';
import { TrackedLink } from '@/components/TrackedLink';
import { OperatorShell } from '@/components/OperatorShell';

export const metadata = {
  title: 'Free Tutorials - Start Learning AI Tools Today',
  description: 'Start your AI journey with free tutorials. Learn ChatGPT, Claude, and Cursor fundamentals with hands-on lessons.',
};

export default function TutorialsPage() {
  // Free lessons from existing content
  const freeLessons = [
    {
      title: 'Welcome to Deployed Forward',
      description: 'Get started with AI-powered development. Learn what you\'ll build and how our mission-based training works.',
      duration: '15 min',
      level: 'Beginner',
      href: '/courses', // TODO: Link to actual free lesson
      topics: ['Course Overview', 'Learning Path', 'Community'],
    },
    {
      title: 'Setting Up Your AI Environment',
      description: 'Install and configure ChatGPT, Claude, and Cursor. Set up your development environment for AI-assisted building.',
      duration: '20 min',
      level: 'Beginner',
      href: '/courses', // TODO: Link to actual free lesson
      topics: ['ChatGPT Setup', 'Cursor Install', 'First Prompt'],
    },
    {
      title: 'Anatomy of a Perfect Prompt',
      description: 'Master the fundamentals of prompt engineering. Learn the structure that gets you better results every time.',
      duration: '25 min',
      level: 'Beginner',
      href: '/courses', // TODO: Link to actual free lesson
      topics: ['Prompt Structure', 'Context', 'Examples'],
    },
  ];

  return (
    <OperatorShell
      activePath="/tutorials"
      breadcrumb={[{ label: 'Workspace' }, { label: 'tutorials/' }]}
      title="Free Tutorials"
      subtitle="Start learning for free"
      toolbarActions={
        <TrackedLink href="/courses" className="btn btn-primary btn-sm" label="Toolbar - Courses" location="Tutorials Toolbar">
          Browse Courses
        </TrackedLink>
      }
    >
      <Container>
        <Hero
          title="Start Learning for Free"
          subtitle="No credit card required. Get instant access to beginner-friendly tutorials and see how our mission-based training works."
          actions={
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <EmailCapture placeholder="Enter your email" buttonLabel="Get Free Access" compact />
            </div>
          }
        />

      {/* Value Proposition */}
      <section style={{ paddingBlock: '3rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '1.5rem' }}>Why Start Here?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
            <div>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚡</div>
              <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>Learn by Doing</h3>
              <p className="text-secondary" style={{ fontSize: '0.875rem' }}>
                Every lesson includes hands-on practice. Build real projects, not toy examples.
              </p>
            </div>
            <div>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎯</div>
              <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>No Experience Needed</h3>
              <p className="text-secondary" style={{ fontSize: '0.875rem' }}>
                Start from zero. Our tutorials assume no coding background.
              </p>
            </div>
            <div>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🚀</div>
              <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>Ship Fast</h3>
              <p className="text-secondary" style={{ fontSize: '0.875rem' }}>
                Complete tutorials in under an hour and have something to show for it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Free Lessons Grid */}
      <section style={{ paddingBlock: '3rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Free Tutorials</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {freeLessons.map((lesson, index) => (
            <TrackedLink
              key={index}
              href={lesson.href}
              label={`Free Tutorial - ${lesson.title}`}
              location="Tutorials Page"
            >
              <Card hover>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                  <Badge variant="orange">Free</Badge>
                  <span className="text-secondary" style={{ fontSize: '0.875rem' }}>{lesson.duration}</span>
                </div>
                <h3 style={{ marginBottom: '0.75rem' }}>{lesson.title}</h3>
                <p className="text-secondary" style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>
                  {lesson.description}
                </p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {lesson.topics.map((topic, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: '0.75rem',
                        padding: '0.25rem 0.5rem',
                        background: 'rgba(255, 107, 0, 0.1)',
                        border: '1px solid rgba(255, 107, 0, 0.2)',
                        borderRadius: '4px',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </Card>
            </TrackedLink>
          ))}
        </div>
      </section>

      {/* Social Proof / Transition */}
      <section style={{ paddingBlock: '4rem' }}>
        <Container size="narrow">
          <Card>
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <h3 style={{ marginBottom: '1rem' }}>Ready for More?</h3>
              <p className="text-secondary" style={{ marginBottom: '2rem' }}>
                These free tutorials are just the beginning. Our full courses include 20+ missions, 
                live community support, and portfolio-ready projects.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <TrackedLink
                  href="/courses"
                  className="btn btn-primary btn-lg"
                  label="View All Courses"
                  location="Tutorials Page - Upgrade CTA"
                >
                  View All Courses
                </TrackedLink>
                <TrackedLink
                  href="/pricing"
                  className="btn btn-ghost btn-lg"
                  label="See Pricing"
                  location="Tutorials Page - Pricing CTA"
                >
                  See Pricing
                </TrackedLink>
              </div>
            </div>
          </Card>
        </Container>
      </section>

      {/* FAQ */}
      <section style={{ paddingBlock: '3rem' }}>
        <Container size="narrow">
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Frequently Asked Questions</h2>
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            <Card>
              <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>
                Do I need to sign up to access free tutorials?
              </h3>
              <p className="text-secondary" style={{ fontSize: '0.875rem' }}>
                Yes, but it's instant and requires no credit card. Just your email to get started.
              </p>
            </Card>
            <Card>
              <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>
                What's the difference between free and paid courses?
              </h3>
              <p className="text-secondary" style={{ fontSize: '0.875rem' }}>
                Free tutorials cover the basics. Paid courses include advanced topics, community access, 
                instructor support, and 20+ comprehensive missions.
              </p>
            </Card>
            <Card>
              <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>
                Can I upgrade to paid courses later?
              </h3>
              <p className="text-secondary" style={{ fontSize: '0.875rem' }}>
                Absolutely! Your progress carries over, and you can upgrade anytime to unlock full access.
              </p>
            </Card>
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section style={{ paddingBlock: '4rem', textAlign: 'center' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>Start Your First Free Lesson Today</h3>
        <p className="text-secondary" style={{ marginBottom: '2rem', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
          Join hundreds of operators learning to build with AI. No risk, no credit card, just results.
        </p>
        <EmailCapture placeholder="Enter your email to begin" buttonLabel="Get Free Access" compact />
      </section>
      </Container>
    </OperatorShell>
  );
}

