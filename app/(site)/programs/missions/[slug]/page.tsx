import { notFound } from 'next/navigation';
import { Container } from '@/components/Container';
import { Badge } from '@/components/Badge';
import { Prose } from '@/components/Prose';
import { getMissionBySlug, generateStaticParamsForMissions } from '@/lib/content';
import Link from 'next/link';

export async function generateStaticParams() {
  return await generateStaticParamsForMissions();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const mission = await getMissionBySlug(slug);

  if (!mission) {
    return {
      title: 'Mission Not Found',
    };
  }

  return {
    title: mission.frontmatter.title,
    description: mission.frontmatter.outcomes?.[0] || 'Complete this mission to build AI capability.',
  };
}

export default async function MissionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const mission = await getMissionBySlug(slug);

  if (!mission) {
    notFound();
  }

  const { frontmatter, content } = mission;

  return (
    <Container size="narrow">
      <article className="py-12">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="orange">{frontmatter.level}</Badge>
            <span className="text-sm text-secondary">{frontmatter.duration} minutes</span>
          </div>
          <h1 className="mb-4">{frontmatter.title}</h1>
          {frontmatter.outcomes && (
            <div className="mb-6">
              <h4 className="text-sm uppercase text-secondary mb-2">You will deploy</h4>
              <ul className="flex flex-col gap-2">
                {frontmatter.outcomes.map((outcome: string, index: number) => (
                  <li key={index} className="text-sm">
                    ✓ {outcome}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <Link href="/courses" className="btn btn-primary">
            Start Mission
          </Link>
        </header>

        <Prose>{content}</Prose>
      </article>
    </Container>
  );
}
