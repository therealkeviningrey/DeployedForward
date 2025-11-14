import { Container } from '@/components/Container';
import { Hero } from '@/components/Hero';
import { Card } from '@/components/Card';
import { Divider } from '@/components/Divider';
import { Badge } from '@/components/Badge';
import Link from 'next/link';
import { OperatorShell } from '@/components/OperatorShell';

export const metadata = {
  title: 'How It Works',
  description: 'Learn AI skills through hands-on projects. No coding background required. Ship real products in days.',
};

export default function ProductPage() {
  return (
    <OperatorShell
      activePath="/product"
      breadcrumb={[{ label: 'Workspace' }, { label: 'product/' }]}
      title="Product OS"
      subtitle="Learn by building real products"
      toolbarActions={
        <div className="flex gap-2">
          <Link href="/courses" className="btn btn-primary btn-sm">
            Browse Courses
          </Link>
          <Link href="/pricing" className="btn btn-ghost btn-sm">
            View Pricing
          </Link>
        </div>
      }
    >
      <Container>
        <Hero
          title="Learn by building real products"
          subtitle="Structured courses that teach you ChatGPT, Claude, and Cursor through hands-on projects. No fluff, no theory-only lessons. Just practical skills you can use immediately."
          actions={
            <>
              <Link href="/courses" className="btn btn-primary">
                Browse Courses
              </Link>
              <Link href="/pricing" className="btn btn-ghost">
                View Pricing
              </Link>
            </>
          }
        />

        <Divider />

        {/* How It Works */}
        <section className="py-12">
          <h2 className="text-center mb-8">How you'll learn</h2>
          <div className="grid grid-3 gap-4">
            <Card>
              <Badge>Step 1</Badge>
              <h3 className="mb-3 mt-3">Choose Your Path</h3>
              <p className="text-secondary">
                Start with beginner fundamentals or jump to advanced topics. Self-paced courses designed for busy schedules.
              </p>
            </Card>
            <Card>
              <Badge>Step 2</Badge>
              <h3 className="mb-3 mt-3">Build Real Projects</h3>
              <p className="text-secondary">
                Every lesson includes a hands-on project. Build landing pages, chatbots, apps, and tools you can actually use.
              </p>
            </Card>
            <Card>
              <Badge>Step 3</Badge>
              <h3 className="mb-3 mt-3">Deploy & Share</h3>
              <p className="text-secondary">
                Push your work to production using Vercel, Netlify, or other platforms. Build a portfolio of real projects.
              </p>
            </Card>
          </div>
        </section>

        <Divider />

        {/* What You'll Learn */}
        <section className="py-12">
          <h2 className="text-center mb-8">Skills you'll master</h2>
          <div className="grid grid-2 gap-4">
            <Card hover>
              <h3 className="mb-3">Effective Prompting</h3>
              <p className="text-secondary mb-4">
                Learn to write prompts that get consistent, high-quality results. Work with ChatGPT, Claude, Gemini, and other AI models.
              </p>
              <ul className="text-secondary text-sm" style={{ listStyle: 'none', paddingLeft: 0 }}>
                <li style={{ marginBottom: '0.5rem' }}>✓ Prompt engineering fundamentals</li>
                <li style={{ marginBottom: '0.5rem' }}>✓ Context management strategies</li>
                <li style={{ marginBottom: '0.5rem' }}>✓ Chain-of-thought techniques</li>
                <li style={{ marginBottom: '0.5rem' }}>✓ Model selection and optimization</li>
              </ul>
            </Card>

            <Card hover>
              <h3 className="mb-3">Building with AI</h3>
              <p className="text-secondary mb-4">
                Use Cursor, v0, Bolt, and other AI coding tools to turn ideas into working applications without a CS degree.
              </p>
              <ul className="text-secondary text-sm" style={{ listStyle: 'none', paddingLeft: 0 }}>
                <li style={{ marginBottom: '0.5rem' }}>✓ AI-assisted coding with Cursor</li>
                <li style={{ marginBottom: '0.5rem' }}>✓ Component generation with v0</li>
                <li style={{ marginBottom: '0.5rem' }}>✓ Rapid prototyping workflows</li>
                <li style={{ marginBottom: '0.5rem' }}>✓ Debugging with AI assistance</li>
              </ul>
            </Card>

            <Card hover>
              <h3 className="mb-3">Deployment & Production</h3>
              <p className="text-secondary mb-4">
                Learn to deploy your projects to real production environments. Share your work with actual users and gather feedback.
              </p>
              <ul className="text-secondary text-sm" style={{ listStyle: 'none', paddingLeft: 0 }}>
                <li style={{ marginBottom: '0.5rem' }}>✓ Deploy to Vercel and Netlify</li>
                <li style={{ marginBottom: '0.5rem' }}>✓ Custom domains and DNS</li>
                <li style={{ marginBottom: '0.5rem' }}>✓ Environment configuration</li>
                <li style={{ marginBottom: '0.5rem' }}>✓ Monitoring and analytics</li>
              </ul>
            </Card>

            <Card hover>
              <h3 className="mb-3">AI Strategy & Leadership</h3>
              <p className="text-secondary mb-4">
                Understand when and how to use AI effectively. Lead AI initiatives at your company or build AI-powered businesses.
              </p>
              <ul className="text-secondary text-sm" style={{ listStyle: 'none', paddingLeft: 0 }}>
                <li style={{ marginBottom: '0.5rem' }}>✓ Use case identification</li>
                <li style={{ marginBottom: '0.5rem' }}>✓ ROI measurement</li>
                <li style={{ marginBottom: '0.5rem' }}>✓ Team enablement</li>
                <li style={{ marginBottom: '0.5rem' }}>✓ Ethical AI practices</li>
              </ul>
            </Card>
          </div>
        </section>

        <Divider />

        {/* Who It's For */}
        <section className="py-12">
          <h2 className="text-center mb-8">Who this is for</h2>
          <div className="grid grid-3 gap-4">
            <Card>
              <h4 className="mb-3">Product Managers</h4>
              <p className="text-secondary text-sm">
                Build working prototypes instead of static mockups. Test ideas with real users before involving engineering.
              </p>
            </Card>
            <Card>
              <h4 className="mb-3">Marketers & Designers</h4>
              <p className="text-secondary text-sm">
                Create landing pages, automate campaigns, and build tools without waiting on developers.
              </p>
            </Card>
            <Card>
              <h4 className="mb-3">Founders & Leaders</h4>
              <p className="text-secondary text-sm">
                Ship MVPs faster, validate ideas, and lead AI-powered teams confidently.
              </p>
            </Card>
            <Card>
              <h4 className="mb-3">Aspiring Developers</h4>
              <p className="text-secondary text-sm">
                Learn to build real applications with AI assistance. Skip years of traditional learning.
              </p>
            </Card>
            <Card>
              <h4 className="mb-3">Career Switchers</h4>
              <p className="text-secondary text-sm">
                Break into tech without a CS degree. Build a portfolio of real projects employers want to see.
              </p>
            </Card>
            <Card>
              <h4 className="mb-3">Business Professionals</h4>
              <p className="text-secondary text-sm">
                Automate repetitive work, build internal tools, and leverage AI for competitive advantage.
              </p>
            </Card>
          </div>
        </section>

        <Divider />

        {/* CTA */}
        <section className="py-12 text-center">
          <h3 className="mb-4">Ready to start building?</h3>
          <p className="text-secondary mb-6 max-w-2xl mx-auto">
            Join hundreds of students learning to ship real products with AI. No coding background required.
          </p>
          <div className="flex gap-3 justify-center">
            <Link href="/courses" className="btn btn-primary">
              Browse Courses
            </Link>
            <Link href="/pricing" className="btn btn-ghost">
              View Pricing
            </Link>
          </div>
        </section>
      </Container>
    </OperatorShell>
  );
}
