import { Container } from '@/components/Container';
import { Hero } from '@/components/Hero';
import { Card } from '@/components/Card';
import { Pill } from '@/components/Pill';
import Link from 'next/link';

export const metadata = {
  title: 'Briefs',
  description: 'Weekly operational intelligence. 10-minute reads on production AI patterns.',
};

export default function BriefsPage() {
  // In production, fetch from CMS or database
  const briefs = [
    {
      title: 'Context Engineering Patterns',
      summary: 'Five techniques for consistent AI output in production codebases.',
      date: '2025-01-18',
      tags: ['prompts', 'workflows'],
    },
    {
      title: 'Team Template Systems',
      summary: 'How three teams standardized AI usage and cut variance by 60%.',
      date: '2025-01-11',
      tags: ['team', 'templates'],
    },
    {
      title: 'Code Review Automation',
      summary: 'Automated review workflows that actually improve code quality.',
      date: '2025-01-04',
      tags: ['automation', 'quality'],
    },
  ];

  return (
    <Container>
      <Hero
        title="Briefs"
        subtitle="Weekly intelligence on what's working in production. 10-minute reads. No theory, just deployable patterns."
      />

      <section className="py-12">
        <div className="flex gap-2 mb-8">
          <Pill active>All</Pill>
          <Pill>Prompts</Pill>
          <Pill>Workflows</Pill>
          <Pill>Team</Pill>
          <Pill>Automation</Pill>
        </div>

        <div className="grid gap-4">
          {briefs.map((brief) => (
            <Card key={brief.title} hover>
              <div className="flex justify-between items-start gap-4 mb-3">
                <h3>{brief.title}</h3>
                <span className="text-xs text-secondary">{brief.date}</span>
              </div>
              <p className="text-secondary mb-3">{brief.summary}</p>
              <div className="flex gap-2">
                {brief.tags.map((tag) => (
                  <span key={tag} className="badge">
                    {tag}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>
    </Container>
  );
}

