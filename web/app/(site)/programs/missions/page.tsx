import { Container } from '@/components/Container';
import { Hero } from '@/components/Hero';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { getAllMissions } from '@/lib/content';
import Link from 'next/link';

export const metadata = {
  title: 'Missions',
  description: 'Hands-on AI training with measurable outcomes. Deploy working code, not toy examples.',
};

export default async function MissionsPage() {
  const missions = await getAllMissions();

  return (
    <Container>
      <Hero
        title="Missions"
        subtitle="Field-tested workflows with measurable outcomes. Three levels: Operator (individual), Unit (team), Battalion (organization)."
      />

      <section className="py-12">
        <div className="grid grid-3 gap-4">
          {missions.map((mission) => (
            <Card key={mission.slug} hover>
              <div className="flex justify-between items-start mb-3">
                <Badge variant={mission.level === 'Operator' ? 'default' : 'orange'}>
                  {mission.level}
                </Badge>
                <span className="text-xs text-secondary">{mission.duration} min</span>
              </div>
              <h3 className="mb-2">{mission.title}</h3>
              <p className="text-secondary text-sm mb-4">
                {mission.outcomes?.[0] || 'Deploy working code'}
              </p>
              <Link
                href={`/programs/missions/${mission.slug}`}
                className="btn btn-ghost btn-sm"
              >
                Start Mission
              </Link>
            </Card>
          ))}
        </div>

        {missions.length === 0 && (
          <Card>
            <p className="text-secondary text-center">
              No missions available yet. Check back soon.
            </p>
          </Card>
        )}
      </section>
    </Container>
  );
}

