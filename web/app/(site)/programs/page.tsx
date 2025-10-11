import { Container } from '@/components/Container';
import { Hero } from '@/components/Hero';
import { Tabs } from '@/components/Tabs';
import { Card } from '@/components/Card';
import Link from 'next/link';

export const metadata = {
  title: 'Programs',
  description: 'Briefs, Missions, and Campaigns. Operational intelligence and hands-on training.',
};

export default function ProgramsPage() {
  return (
    <Container>
      <Hero
        title="Programs"
        subtitle="Three ways to build AI capability: weekly intelligence, hands-on missions, and bundled campaigns."
      />

      <Tabs
        tabs={[
          {
            id: 'briefs',
            label: 'Briefs',
            content: (
              <div className="flex flex-col gap-4">
                <Card>
                  <h3 className="mb-3">Weekly Intelligence</h3>
                  <p className="text-secondary mb-4">
                    10-minute reads on what's working in production. No hype, no theory — just operational patterns you can deploy this week.
                  </p>
                  <Link href="/programs/briefs" className="btn btn-primary">
                    Enter Briefs
                  </Link>
                </Card>
              </div>
            ),
          },
          {
            id: 'missions',
            label: 'Missions',
            content: (
              <div className="flex flex-col gap-4">
                <Card>
                  <h3 className="mb-3">Hands-On Training</h3>
                  <p className="text-secondary mb-4">
                    Field-tested workflows with measurable outcomes. You deploy working code, not toy examples. Three levels: Operator, Unit, Battalion.
                  </p>
                  <Link href="/programs/missions" className="btn btn-primary">
                    View Missions
                  </Link>
                </Card>
              </div>
            ),
          },
          {
            id: 'campaigns',
            label: 'Campaigns',
            content: (
              <div className="flex flex-col gap-4">
                <Card>
                  <h3 className="mb-3">Bundled Capability</h3>
                  <p className="text-secondary mb-4">
                    Multiple missions packaged as a complete workflow. Deploy entire capabilities as a unit, not piecemeal fragments.
                  </p>
                  <Link href="/programs/campaigns" className="btn btn-primary">
                    Explore Bundles
                  </Link>
                </Card>
              </div>
            ),
          },
        ]}
      />
    </Container>
  );
}

