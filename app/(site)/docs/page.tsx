import { Container } from '@/components/Container';
import { Hero } from '@/components/Hero';
import { Card } from '@/components/Card';
import { OperatorShell } from '@/components/OperatorShell';

export const metadata = {
  title: 'Docs',
  description: 'Documentation, guides, and reference materials for Deployed Forward.',
};

export default function DocsPage() {
  const docSections = [
    {
      title: 'Getting Started',
      description: 'Install the CLI, authenticate, and run your first mission.',
      href: 'https://docs.deployedforward.com/getting-started',
    },
    {
      title: 'CLI Reference',
      description: 'Complete command reference for the df CLI tool.',
      href: 'https://docs.deployedforward.com/cli',
    },
    {
      title: 'IDE Integration',
      description: 'Set up extensions for VS Code, Cursor, and JetBrains.',
      href: 'https://docs.deployedforward.com/ide',
    },
    {
      title: 'API Reference',
      description: 'REST API documentation for programmatic access.',
      href: 'https://docs.deployedforward.com/api',
    },
  ];

  return (
    <OperatorShell
      activePath="/docs"
      breadcrumb={[{ label: 'Operations' }, { label: 'docs/' }]}
      title="Documentation"
      subtitle="Guides, references, and examples."
    >
      <Container>
        <Hero
          title="Documentation"
          subtitle="Guides, references, and examples. Everything you need to deploy AI workflows."
        />

        <section className="py-12">
          <div className="grid grid-2 gap-4">
            {docSections.map((section) => (
              <Card key={section.title} hover>
                <h3 className="mb-2">{section.title}</h3>
                <p className="text-secondary mb-4">{section.description}</p>
                <a
                  href={section.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost btn-sm"
                >
                  View Docs →
                </a>
              </Card>
            ))}
          </div>
        </section>
      </Container>
    </OperatorShell>
  );
}

