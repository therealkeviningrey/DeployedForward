import { Container } from '@/components/Container';
import { Hero } from '@/components/Hero';
import { CodeSnippet } from '@/components/CodeSnippet';
import { Card } from '@/components/Card';
import { Divider } from '@/components/Divider';
import Link from 'next/link';

export const metadata = {
  title: 'Product',
  description: 'AI workflows that deploy to production. IDE integration, CLI tooling, and team coordination.',
};

export default function ProductPage() {
  return (
    <>
      <Container>
        <Hero
          title="Deploy capability, not experiments"
          subtitle="Production-ready AI workflows integrated into your existing development environment."
          actions={
            <>
              <Link href="/courses" className="btn btn-primary">
                Start Mission
              </Link>
              <Link href="/docs" className="btn btn-ghost">
                Read Docs
              </Link>
            </>
          }
          aside={
            <CodeSnippet code='df workflow run scaffold\ndf generate endpoint --method POST\ndf deploy --target production' />
          }
        />

        <Divider />

        <section className="py-12">
          <h2 className="text-center mb-8">Core Features</h2>
          <div className="grid grid-2 gap-4">
            <Card>
              <h3 className="mb-3">IDE Integration</h3>
              <p className="text-secondary">
                Native plugins for VS Code, Cursor, and JetBrains. AI workflows where you already work.
              </p>
            </Card>
            <Card>
              <h3 className="mb-3">CLI Tooling</h3>
              <p className="text-secondary">
                Terminal-first interface. Automate workflows, generate code, deploy from the command line.
              </p>
            </Card>
            <Card>
              <h3 className="mb-3">Team Coordination</h3>
              <p className="text-secondary">
                Share templates, track progress, and standardize AI usage across your team.
              </p>
            </Card>
            <Card>
              <h3 className="mb-3">Assessment System</h3>
              <p className="text-secondary">
                Verify capability. Certifications that prove you can deploy, not just complete tutorials.
              </p>
            </Card>
          </div>
        </section>

        <Divider />

        <section className="py-12">
          <h2 className="text-center mb-8">Get Started in 3 Steps</h2>
          <div className="grid grid-3 gap-4">
            <Card>
              <div className="text-accent text-xs mb-2">STEP 1</div>
              <h4>Install</h4>
              <CodeSnippet code="curl -fsSL get.deployedforward.com | sh" />
            </Card>
            <Card>
              <div className="text-accent text-xs mb-2">STEP 2</div>
              <h4>Select Mission</h4>
              <CodeSnippet code="df missions list\ndf mission start ai-workflow-setup" />
            </Card>
            <Card>
              <div className="text-accent text-xs mb-2">STEP 3</div>
              <h4>Execute</h4>
              <CodeSnippet code="df workflow run\ndf deploy" />
            </Card>
          </div>
        </section>
      </Container>
    </>
  );
}

