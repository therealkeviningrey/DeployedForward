import { Container } from '@/components/Container';
import { Hero } from '@/components/Hero';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import Link from 'next/link';

export const metadata = {
  title: 'Learning Paths',
  description: 'Structured curriculum from beginner to advanced AI builder. Choose your track and start learning.',
};

export default function ProgramsPage() {
  return (
    <Container>
      <Hero
        title="Choose your learning path"
        subtitle="Structured tracks from complete beginner to advanced AI builder. All paths include hands-on projects and real-world deployments."
      />

      {/* Learning Tracks */}
      <section className="py-12">
        <div className="grid grid-3 gap-4">
          {/* Beginner Track */}
          <Card hover>
            <div className="mb-4">
              <Badge variant="orange">Beginner</Badge>
              <h3 className="mt-3 mb-2">AI Fundamentals</h3>
              <p className="text-secondary text-sm mb-4">
                Start from zero. Learn to use ChatGPT, Claude, and Cursor effectively. No coding experience required.
              </p>
            </div>

            <div className="mb-4">
              <h4 className="text-sm mb-2 uppercase text-secondary" style={{ fontSize: '0.75rem' }}>
                What You'll Build:
              </h4>
              <ul className="text-secondary text-sm" style={{ listStyle: 'none', paddingLeft: 0 }}>
                <li style={{ marginBottom: '0.5rem' }}>• Personal landing page</li>
                <li style={{ marginBottom: '0.5rem' }}>• Simple chatbot</li>
                <li style={{ marginBottom: '0.5rem' }}>• Content generator</li>
                <li style={{ marginBottom: '0.5rem' }}>• Deployed portfolio site</li>
              </ul>
            </div>

            <div className="mb-4">
              <div className="text-xs text-secondary mb-1">Duration: 2 weeks</div>
              <div className="text-xs text-secondary">4 courses, 12 lessons</div>
            </div>

            <Link href="/courses?level=beginner" className="btn btn-primary btn-sm">
              Start Here
            </Link>
          </Card>

          {/* Intermediate Track */}
          <Card hover>
            <div className="mb-4">
              <Badge>Intermediate</Badge>
              <h3 className="mt-3 mb-2">Product Building</h3>
              <p className="text-secondary text-sm mb-4">
                Build complete products. APIs, databases, authentication, payments. Ship working SaaS applications.
              </p>
            </div>

            <div className="mb-4">
              <h4 className="text-sm mb-2 uppercase text-secondary" style={{ fontSize: '0.75rem' }}>
                What You'll Build:
              </h4>
              <ul className="text-secondary text-sm" style={{ listStyle: 'none', paddingLeft: 0 }}>
                <li style={{ marginBottom: '0.5rem' }}>• Full-stack web app</li>
                <li style={{ marginBottom: '0.5rem' }}>• SaaS product with payments</li>
                <li style={{ marginBottom: '0.5rem' }}>• API integrations</li>
                <li style={{ marginBottom: '0.5rem' }}>• Production deployment</li>
              </ul>
            </div>

            <div className="mb-4">
              <div className="text-xs text-secondary mb-1">Duration: 4 weeks</div>
              <div className="text-xs text-secondary">6 courses, 24 lessons</div>
            </div>

            <Link href="/courses?level=intermediate" className="btn btn-ghost btn-sm">
              Continue Path
            </Link>
          </Card>

          {/* Advanced Track */}
          <Card hover>
            <div className="mb-4">
              <Badge>Advanced</Badge>
              <h3 className="mt-3 mb-2">AI Leadership</h3>
              <p className="text-secondary text-sm mb-4">
                Lead AI initiatives. Build complex systems. Scale AI usage across teams. Enterprise-level skills.
              </p>
            </div>

            <div className="mb-4">
              <h4 className="text-sm mb-2 uppercase text-secondary" style={{ fontSize: '0.75rem' }}>
                What You'll Build:
              </h4>
              <ul className="text-secondary text-sm" style={{ listStyle: 'none', paddingLeft: 0 }}>
                <li style={{ marginBottom: '0.5rem' }}>• Multi-agent systems</li>
                <li style={{ marginBottom: '0.5rem' }}>• Custom AI workflows</li>
                <li style={{ marginBottom: '0.5rem' }}>• Team automation tools</li>
                <li style={{ marginBottom: '0.5rem' }}>• Enterprise integrations</li>
              </ul>
            </div>

            <div className="mb-4">
              <div className="text-xs text-secondary mb-1">Duration: 6 weeks</div>
              <div className="text-xs text-secondary">8 courses, 32 lessons</div>
            </div>

            <Link href="/courses?level=advanced" className="btn btn-ghost btn-sm">
              Advanced Path
            </Link>
          </Card>
        </div>
      </section>

      {/* Free Resources */}
      <section className="py-12">
        <h2 className="text-center mb-8">Free resources</h2>
        <div className="grid grid-2 gap-4">
          <Card hover>
            <h3 className="mb-3">Weekly Guides</h3>
            <p className="text-secondary mb-4">
              Every week, get a new guide on AI tools, techniques, and real-world use cases. 10-minute reads that you can apply immediately.
            </p>
            <Link href="/programs/briefs" className="btn btn-ghost btn-sm">
              Read Latest Guide
            </Link>
          </Card>

          <Card hover>
            <h3 className="mb-3">Community Forum</h3>
            <p className="text-secondary mb-4">
              Connect with other AI learners. Share your projects, get feedback, find accountability partners, and stay motivated.
            </p>
            <Link href="/company#community" className="btn btn-ghost btn-sm">
              Join Community
            </Link>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 text-center">
        <h3 className="mb-4">Choose your starting point</h3>
        <p className="text-secondary mb-6 max-w-2xl mx-auto">
          Not sure which path to start with? Take our 2-minute assessment to get a personalized recommendation.
        </p>
        <div className="flex gap-3 justify-center">
          <Link href="/courses" className="btn btn-primary">
            Browse All Courses
          </Link>
          <Link href="/pricing" className="btn btn-ghost">
            See Pricing
          </Link>
        </div>
      </section>
    </Container>
  );
}
