import { Container } from '@/components/Container';
import { Hero } from '@/components/Hero';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';

export const metadata = {
  title: 'Campaigns',
  description: 'Bundled missions that deploy complete workflows. Build capability as a unit.',
};

export default function CampaignsPage() {
  const campaigns = [
    {
      title: 'AI-Powered API Development',
      missions: ['AI Workflow Setup', 'Code Generation Patterns', 'Automated Testing', 'Deployment Automation'],
      duration: 90,
      outcome: 'Ship a production API with AI-assisted workflows end-to-end.',
    },
    {
      title: 'Team AI Standardization',
      missions: ['Template Systems', 'Team Coordination', 'Code Review Automation', 'Quality Metrics'],
      duration: 120,
      outcome: 'Standardize AI usage across your team and measure improvement.',
    },
  ];

  return (
    <Container>
      <Hero
        title="Campaigns"
        subtitle="Multiple missions bundled as complete workflows. Deploy entire capabilities, not fragments."
      />

      <section className="py-12">
        <div className="grid grid-2 gap-4">
          {campaigns.map((campaign) => (
            <Card key={campaign.title} hover>
              <div className="flex justify-between items-start mb-4">
                <Badge variant="orange">BUNDLE</Badge>
                <span className="text-xs text-secondary">{campaign.duration} min total</span>
              </div>
              <h3 className="mb-3">{campaign.title}</h3>
              <p className="text-secondary text-sm mb-4">{campaign.outcome}</p>
              <div className="mb-4">
                <h4 className="text-xs uppercase text-secondary mb-2">Includes</h4>
                <ul className="flex flex-col gap-1">
                  {campaign.missions.map((mission) => (
                    <li key={mission} className="text-sm">
                      • {mission}
                    </li>
                  ))}
                </ul>
              </div>
              <button className="btn btn-ghost btn-sm">Start Campaign</button>
            </Card>
          ))}
        </div>
      </section>
    </Container>
  );
}

