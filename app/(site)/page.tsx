'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import {
  Target,
  Grid3x3,
  DollarSign,
  Quote,
  Code2,
  Headset,
  FileText,
  Terminal,
} from 'lucide-react';

import { AIMasteryDashboard } from '@/components/AIMasteryDashboard';
import { Badge } from '@/components/Badge';
import { CodeSnippet } from '@/components/CodeSnippet';
import { Counter } from '@/components/Counter';
import { TrackedLink } from '@/components/TrackedLink';
import { LoadingState } from '@/components/LoadingSpinner';
import { useScrollDepth } from '@/lib/hooks/useScrollDepth';
import type { WindowApp } from '@/components/OperatorOS';

import styles from './page.module.css';

// Code-split OperatorDesktop for better initial page load
const OperatorDesktop = dynamic(
  () => import('@/components/OperatorOS').then(mod => ({ default: mod.OperatorDesktop })),
  {
    loading: () => <LoadingState message="Loading OperatorOS..." />,
    ssr: false, // OperatorOS uses client-side features like localStorage
  }
);

const WINDOW_APPS: WindowApp[] = [
  {
    id: 'mission-brief',
    title: 'Mission Brief',
    callsign: 'OPS-001',
    icon: Target,
    content: <MissionBriefWindow />,
    initialSize: { width: 920, height: 620 },
  },
  {
    id: 'features',
    title: 'Feature Arsenal',
    callsign: 'OPS-002',
    icon: Grid3x3,
    content: <FeaturesWindow />,
    initialSize: { width: 840, height: 600 },
  },
  {
    id: 'pricing',
    title: 'Pricing Intel',
    callsign: 'OPS-003',
    icon: DollarSign,
    content: <PricingWindow />,
    initialSize: { width: 820, height: 580 },
  },
  {
    id: 'testimonials',
    title: 'Operator Testimonials',
    callsign: 'OPS-004',
    icon: Quote,
    content: <TestimonialsWindow />,
    initialSize: { width: 760, height: 540 },
  },
  {
    id: 'mission-blueprint',
    title: 'Mission Blueprint',
    callsign: 'OPS-005',
    icon: FileText,
    content: <MissionBlueprintWindow />,
    initialSize: { width: 780, height: 560 },
  },
  {
    id: 'workspace-console',
    title: 'Workspace Console',
    callsign: 'OPS-006',
    icon: Terminal,
    content: <WorkspaceConsoleWindow />,
    initialSize: { width: 820, height: 600 },
  },
  {
    id: 'tech-stack',
    title: 'Tech Stack',
    callsign: 'OPS-007',
    icon: Code2,
    content: <TechStackWindow />,
    initialSize: { width: 760, height: 560 },
  },
  {
    id: 'support',
    title: 'Support Comms',
    callsign: 'OPS-008',
    icon: Headset,
    content: <SupportWindow />,
    initialSize: { width: 720, height: 520 },
  },
];

export default function HomePage() {
  useScrollDepth();
  return <OperatorDesktop apps={WINDOW_APPS} autoOpenAppId="mission-brief" />;
}

function MissionBriefWindow() {
  return (
    <div className={styles.windowContent}>
      <section className={styles.heroPanel}>
        <div>
          <h1>Mission Brief</h1>
          <p>Ship your first AI-powered product by Friday. Hands-on training for ChatGPT, Claude, and Cursor.</p>
        </div>
        <div className={styles.actionRow}>
          <TrackedLink href="/pricing" className={styles.actionButton} label="Get Access" location="OS Mission Brief">
            Get Access
          </TrackedLink>
          <TrackedLink href="/courses" className={styles.actionButton} label="Browse Missions" location="OS Mission Brief">
            Browse Missions
          </TrackedLink>
        </div>
      </section>

      <section className={styles.metricBar}>
        <article className={styles.metricCard}>
          <span className={styles.metricLabel}>Active operators</span>
          <span className={styles.metricValue}>200+</span>
          <span className={styles.metricCaption}>Currently in motion</span>
        </article>
        <article className={styles.metricCard}>
          <span className={styles.metricLabel}>Automation coverage</span>
          <span className={styles.metricValue}>63%</span>
          <span className={styles.metricCaption}>Workflows scripted with AI</span>
        </article>
        <article className={styles.metricCard}>
          <span className={styles.metricLabel}>Launch time</span>
          <span className={styles.metricValue}><Counter end={72} suffix=" hrs" /></span>
          <span className={styles.metricCaption}>To production deploy</span>
        </article>
      </section>

      <div className={styles.briefingDashboard}>
        <AIMasteryDashboard />
      </div>
    </div>
  );
}

function FeaturesWindow() {
  const missions = [
    { title: 'Build in hours, not weeks', description: 'Your first working product deploys in 72 hours. Portfolio-ready projects, not tutorials.', stack: 'ChatGPT · v0 · Vercel' },
    { title: 'No coding degree needed', description: 'Product managers, marketers, and founders are shipping real products. You can too.', stack: 'Claude · Cursor' },
    { title: 'Skip the trial and error', description: 'Learn patterns that work from someone who\'s deployed AI at enterprise scale.', stack: 'Cursor · Next.js' },
    { title: 'Stand out in your role', description: 'While others talk about AI, you\'ll be the one shipping solutions.', stack: 'Full Stack' },
  ];

  return (
    <div className={styles.windowContent}>
      <section className={styles.heroPanel}>
        <div>
          <Badge>Mission Deck</Badge>
          <h2>Replace hours of theory with deployable builds</h2>
          <p>These are the missions operators run weekly. Each comes with briefs, prompts, QA checklists, and deployment scripts.</p>
        </div>
      </section>

      <section className={styles.missionList}>
        <ul role="list">
          {missions.map((mission) => (
            <li key={mission.title} className={styles.missionListItem}>
              <div>
                <strong>{mission.title}</strong>
                <p>{mission.description}</p>
              </div>
              <div className={styles.missionListMeta}>
                <span>{mission.stack}</span>
              </div>
              <Link href="/courses" className={styles.secondaryLink}>Explore</Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function PricingWindow() {
  return (
    <div className={styles.windowContent}>
      <section className={styles.heroPanel}>
        <div>
          <Badge>Founding Operators</Badge>
          <h2>Lock $19/mo seats and unlock Slack operator support</h2>
          <p>Founding operators keep their price forever, gain private Slack access, and receive every mission we ship.</p>
        </div>
      </section>

      <div className={styles.pricingGrid}>
        <article className={styles.surface}>
          <h3>$19<span className={styles.pricingSuffix}>/mo</span></h3>
          <p>Founding operator seat lock</p>
          <ul className={styles.pricingList}>
            <li>All current and future missions</li>
            <li>Private Slack operator channel</li>
            <li>Automation coverage reviews</li>
            <li>Price locked forever</li>
          </ul>
          <Link href="/pricing" className={styles.primaryLink}>
            Claim founding seat
          </Link>
        </article>
        <article className={styles.surface}>
          <h3>Mission Acceleration</h3>
          <p>Bring the team—operators guide multi-seat rollouts and automation programs.</p>
          <ul className={styles.pricingList}>
            <li>Team onboarding checklist</li>
            <li>Weekly operator office hours</li>
            <li>Incident escalation playbooks</li>
            <li>Direct concierge access</li>
          </ul>
          <Link href="/company#contact" className={styles.secondaryLink}>
            Talk to an operator
          </Link>
        </article>
      </div>

      <div className={styles.pricingMeta}>
        <div>
          <span className={styles.metaLabel}>Seats remaining</span>
          <span className={styles.metaValue}>&lt; 100</span>
        </div>
        <div>
          <span className={styles.metaLabel}>Billing cadence</span>
          <span className={styles.metaValue}>Monthly or annual</span>
        </div>
      </div>
    </div>
  );
}

function TestimonialsWindow() {
  const testimonials = [
    { quote: 'We shipped productized AI workflows in a week because the operator guardrails eliminated all the trial-and-error.', author: 'Alex Collins', role: 'Product Lead, Launch Velocity' },
    { quote: 'The tactical approach and deployment focus made this the most practical AI training I\'ve seen.', author: 'Sarah Chen', role: 'Engineering Manager' },
    { quote: 'Finally, AI training that doesn\'t waste time on theory. We deployed our first automation in 48 hours.', author: 'Marcus Rivera', role: 'Operations Director' },
  ];

  return (
    <div className={styles.windowContent}>
      <section className={styles.heroPanel}>
        <div>
          <Badge>Operator Intel</Badge>
          <h2>Real operators shipping real products</h2>
        </div>
      </section>

      <section className={styles.testimonialList}>
        {testimonials.map((testimonial, idx) => (
          <article key={idx} className={styles.surface}>
            <p className={styles.testimonialQuote}>"{testimonial.quote}"</p>
            <footer className={styles.testimonialAuthor}>
              <strong>{testimonial.author}</strong>
              <span>{testimonial.role}</span>
            </footer>
          </article>
        ))}
      </section>
    </div>
  );
}

function MissionBlueprintWindow() {
  const docs = [
    { title: 'Operator timeline', description: '72-hour sprints with clear checkpoints.' },
    { title: 'Coverage targets', description: 'Track automation and human-in-loop balance.' },
    { title: 'Code snippets', description: 'Production-ready prompts for Cursor.' },
    { title: 'QA checklist', description: 'Deployment gates and rollback procedures.' },
  ];

  return (
    <div className={styles.windowContent}>
      <section className={styles.heroPanel}>
        <div>
          <Badge>Mission Blueprint</Badge>
          <h2>Deploy with tactical precision</h2>
          <p>Every mission ships with timelines, guardrail prompts, deployment scripts, and QA sweeps.</p>
        </div>
      </section>

      <section className={styles.sidePanel}>
        {docs.map((doc) => (
          <article key={doc.title} className={styles.surface}>
            <h3>{doc.title}</h3>
            <p>{doc.description}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

function WorkspaceConsoleWindow() {
  const upcoming = [
    { title: 'Automation QA pass', time: 'Tomorrow · 09:00', detail: 'Validate Mission 18 workflow.' },
    { title: 'Operator stand-up', time: 'Wed · 13:30', detail: 'Share mission blockers and wins.' },
    { title: 'Deployment window', time: 'Fri · 16:00', detail: 'Launch Mission 12 to production.' },
  ];

  return (
    <div className={styles.windowContent}>
      <section className={styles.heroPanel}>
        <div>
          <Badge>Workspace Console</Badge>
          <h2>Command center for operator workflows</h2>
          <p>The Operator OS keeps pulses, pinned docs, and incidents in one terminal-inspired UI.</p>
        </div>
      </section>

      <section className={styles.surface}>
        <h3>Upcoming cadence</h3>
        <ul className={styles.timeline} role="list">
          {upcoming.map((item) => (
            <li key={item.title}>
              <div>
                <span>{item.title}</span>
                <small>{item.detail}</small>
              </div>
              <span>{item.time}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.surface}>
        <h3>Automation coverage</h3>
        <p>63% of your recurring workflows are automated. Target 80% to unlock the next tier.</p>
        <div className={styles.healthBar}>
          <div style={{ width: '63%' }} />
        </div>
        <span className={styles.healthCaption}>Based on the last 30 days</span>
      </section>

      <CodeSnippet
        language="bash"
        code={`# Launch mission dashboard
$ ops dashboard --view=active

# Pull incident runbook  
$ ops runbook stripe-webhook-failure

# Check automation coverage
$ ops coverage --team=backend`}
      />
    </div>
  );
}

function TechStackWindow() {
  const tools = [
    { name: 'ChatGPT', use: 'Prompt engineering & API integration' },
    { name: 'Claude', use: 'Advanced reasoning & long context' },
    { name: 'Cursor', use: 'AI-assisted development' },
    { name: 'Vercel', use: 'Deploy to production' },
    { name: 'Stripe', use: 'Payments & billing automation' },
    { name: 'PostHog', use: 'Product analytics instrumentation' },
  ];

  return (
    <div className={styles.windowContent}>
      <section className={styles.heroPanel}>
        <div>
          <Badge>Tech Stack</Badge>
          <h2>Master best-in-class tools</h2>
          <p>Deploy with the same stack that enterprise teams trust.</p>
        </div>
      </section>

      <section className={styles.missionList}>
        <h3>Operator Tools</h3>
        <ul role="list">
          {tools.map((tool) => (
            <li key={tool.name} className={styles.missionListItem}>
              <div>
                <strong>{tool.name}</strong>
                <p>{tool.use}</p>
              </div>
              <Link href="/courses" className={styles.secondaryLink}>Learn</Link>
            </li>
          ))}
        </ul>
      </section>

      <CodeSnippet
        language="bash"
        code={`# Launch mission with stack context
$ ops launch mission --stack=cursor,vercel

# Check tool coverage
$ ops tools --audit=dependencies`}
      />
    </div>
  );
}

function SupportWindow() {
  const docs = [
    { title: 'Operator handbook', description: 'Command structure and workflows.' },
    { title: 'Launch checklist', description: 'Pre-flight steps before shipping.' },
    { title: 'Incident runbooks', description: 'Stripe, Clerk, PostHog escalation paths.' },
  ];

  return (
    <div className={styles.windowContent}>
      <section className={styles.heroPanel}>
        <div>
          <Badge>Operator Support</Badge>
          <h2>Spec ops coverage when you hit friction</h2>
          <p>Drop context, get a playbook. Operators are on-call Monday through Saturday with escalation paths.</p>
        </div>
        <div className={styles.actionRow}>
          <a href="mailto:concierge@deployedforward.com" className={styles.actionButton}>
            Email concierge
          </a>
          <Link href="/company#contact" className={styles.actionButton}>
            Schedule call
          </Link>
        </div>
      </section>

      <section className={styles.sidePanel}>
        <h3>Pinned docs</h3>
        {docs.map((doc) => (
          <article key={doc.title} className={styles.surface}>
            <span>{doc.title}</span>
            <small>{doc.description}</small>
          </article>
        ))}
      </section>

      <section className={styles.surface}>
        <h3>Response time</h3>
        <p>Average response under 4 hours. Coverage Mon–Sat · 8am–8pm ET.</p>
        <div className={styles.actionRow}>
          <Link href="/pricing" className={styles.primaryLink}>
            Lock founding seat
          </Link>
        </div>
      </section>
    </div>
  );
}
