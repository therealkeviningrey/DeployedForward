import { Container } from '@/components/Container';
import { Hero } from '@/components/Hero';
import { Card } from '@/components/Card';
import { OperatorShell } from '@/components/OperatorShell';

export const metadata = {
  title: 'Changelog',
  description: 'Platform updates, new features, and improvements.',
};

export default function ChangelogPage() {
  const updates = [
    {
      version: '1.0.0',
      date: '2025-01-20',
      title: 'Platform Launch',
      changes: [
        'Initial public release',
        '20+ missions across Operator, Unit, and Battalion levels',
        'CLI tooling (df command)',
        'IDE integrations for VS Code and Cursor',
        'Team coordination features',
      ],
    },
  ];

  return (
    <OperatorShell
      activePath="/changelog"
      breadcrumb={[{ label: 'Operations' }, { label: 'changelog.mdx' }]}
      title="Changelog"
      subtitle="Platform updates, new features, and improvements."
    >
      <Container size="narrow">
        <Hero title="Changelog" subtitle="Platform updates, new features, and improvements. Shipped continuously." />

        <section className="py-12">
          <div className="grid gap-6">
            {updates.map((update) => (
              <Card key={update.version}>
                <div className="flex justify-between items-start mb-4">
                  <h3>Version {update.version}</h3>
                  <span className="text-xs text-secondary">{update.date}</span>
                </div>
                <h4 className="text-accent mb-3">{update.title}</h4>
                <ul className="flex flex-col gap-2">
                  {update.changes.map((change, index) => (
                    <li key={index} className="text-sm text-secondary">
                      • {change}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </section>
      </Container>
    </OperatorShell>
  );
}

