'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useScrollDepth } from '@/lib/hooks/useScrollDepth';
import { Badge } from '@/components/Badge';
import { ProgressBar } from '@/components/ProgressBar';
import { OperatorShell } from '@/components/OperatorShell';
import styles from './page.module.css';

type MissionStatus = 'in-progress' | 'not-started' | 'completed';

type Mission = {
  id: string;
  title: string;
  description: string;
  stack: string;
  category: string;
  progress: number;
  status: MissionStatus;
  updated: string;
  enrolled: boolean;
};

type QuickAction = {
  label: string;
  href: string;
};

type CommandTemplate = {
  label: string;
  description: string;
  href?: string;
  shortcut?: string;
};

const MISSIONS: Mission[] = [
  {
    id: 'mission-01',
    title: 'Landing Page Deployment',
    description: 'Ship a production-grade landing page with v0 and Vercel in one sprint.',
    stack: 'ChatGPT · v0 · Vercel',
    category: 'Launch',
    progress: 78,
    status: 'in-progress',
    updated: 'Updated 2h ago',
    enrolled: true,
  },
  {
    id: 'mission-04',
    title: 'AI Chatbot Integration',
    description: 'Connect Claude, Clerk, and rate limits to ship a support bot.',
    stack: 'Claude · Next.js · Supabase',
    category: 'Automation',
    progress: 32,
    status: 'in-progress',
    updated: 'Updated 6h ago',
    enrolled: true,
  },
  {
    id: 'mission-12',
    title: 'SaaS Application',
    description: 'Full-stack SaaS with Stripe billing, Clerk auth, Prisma data, and Cursor.',
    stack: 'Cursor · Stripe · Clerk · Prisma',
    category: 'Product',
    progress: 100,
    status: 'completed',
    updated: 'Completed yesterday',
    enrolled: true,
  },
  {
    id: 'mission-18',
    title: 'Workflow Automation',
    description: 'Design a workflow with schedulers, webhooks, and OpenAI orchestration.',
    stack: 'OpenAI · Vercel Functions · Webhooks',
    category: 'Automation',
    progress: 0,
    status: 'not-started',
    updated: 'Just added',
    enrolled: false,
  },
];

const QUICK_ACTIONS: QuickAction[] = [
  { label: 'View missions', href: '/courses' },
  { label: 'Invite teammate', href: '/dashboard' },
  { label: 'Open billing', href: '/dashboard/billing' },
];

const PINNED_DOCS = [
  { title: 'Operator handbook', description: 'Command structure and workflows.', href: '/docs' },
  { title: 'Launch checklist', description: 'Pre-flight steps before shipping.', href: '/programs/missions' },
];

const UPCOMING = [
  { title: 'Automation QA pass', time: 'Tomorrow · 09:00', detail: 'Validate Mission 18 workflow.' },
  { title: 'Operator stand-up', time: 'Wed · 13:30', detail: 'Share mission blockers and wins.' },
];

const COMMAND_TEMPLATES: CommandTemplate[] = [
  { label: 'Open missions', description: 'Browse every mission and filter by stack.', href: '/courses', shortcut: 'G M' },
  { label: 'Start checkout', description: 'Jump directly into the upgrade flow.', href: '/checkout', shortcut: 'G C' },
  { label: 'View billing', description: 'Inspect seat usage and plan limits.', href: '/dashboard/billing' },
  { label: 'Read docs', description: 'Study playbooks and integration guides.', href: '/docs' },
];

function statusLabel(status: MissionStatus) {
  switch (status) {
    case 'completed':
      return 'Completed';
    case 'in-progress':
      return 'In progress';
    default:
      return 'Not started';
  }
}

function statusBadgeVariant(status: MissionStatus) {
  return status === 'completed' ? 'default' : 'orange';
}

export default function HomePageV2() {
  useScrollDepth();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [commandQuery, setCommandQuery] = useState('');

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    if (!paletteOpen) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [paletteOpen]);

  const commands = useMemo(
    () =>
      COMMAND_TEMPLATES.map((template) => ({
        ...template,
        action: () => {
          if (template.href) {
            router.push(template.href);
          }
          setPaletteOpen(false);
        },
      })),
    [router]
  );

  const filteredCommands = useMemo(() => {
    const q = commandQuery.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((command) =>
      command.label.toLowerCase().includes(q) || command.description.toLowerCase().includes(q)
    );
  }, [commands, commandQuery]);

  const filteredMissions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return MISSIONS;
    return MISSIONS.filter((mission) =>
      mission.title.toLowerCase().includes(q) ||
      mission.description.toLowerCase().includes(q) ||
      mission.stack.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const featuredMission = filteredMissions[0] ?? null;
  const remainingMissions = featuredMission ? filteredMissions.slice(1) : [];

  const metrics = useMemo(
    () => [
      {
        label: 'Active missions',
        value: MISSIONS.filter((mission) => mission.status !== 'completed').length,
        caption: 'Currently in motion',
      },
      {
        label: 'Completion rate',
        value: `${Math.round(
          (MISSIONS.filter((mission) => mission.status === 'completed').length / MISSIONS.length) * 100
        )}%`,
        caption: 'Across enrolled missions',
      },
      {
        label: 'Automation coverage',
        value: '63%',
        caption: 'Workflows scripted with AI',
      },
    ],
    []
  );

  return (
    <>
      <OperatorShell
        activePath="/homepage-v2"
        breadcrumb={[{ label: 'Workspace' }, { label: 'home.mdx' }]}
        subtitle="Keep your operator view calm and focused."
        search={{
          value: searchQuery,
          onChange: (value) => setSearchQuery(value),
          placeholder: 'Search missions, docs, media',
          shortcutHint: '⌘K',
        }}
        commandButton={{
          label: 'Command palette',
          onClick: () => setPaletteOpen(true),
          shortcutHint: '⌘K',
        }}
      >
        <section className={styles.heroPanel}>
          <div>
            <h1>Operator overview</h1>
            <p>Track your missions, automation coverage, and upcoming cadence from a single calm surface.</p>
          </div>
          <div className={styles.actionRow}>
            {QUICK_ACTIONS.map((action) => (
              <Link key={action.label} href={action.href} className={styles.actionButton}>
                {action.label}
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.metricBar}>
          {metrics.map((metric) => (
            <article key={metric.label} className={styles.metricCard}>
              <span className={styles.metricLabel}>{metric.label}</span>
              <span className={styles.metricValue}>{metric.value}</span>
              <span className={styles.metricCaption}>{metric.caption}</span>
            </article>
          ))}
        </section>

        <div className={styles.grid}>
          <section className={styles.focusPanel}>
            {featuredMission ? (
              <article className={styles.featuredMission}>
                <header>
                  <Badge variant={statusBadgeVariant(featuredMission.status)}>
                    {statusLabel(featuredMission.status)}
                  </Badge>
                  <span>{featuredMission.updated}</span>
                </header>
                <h2>{featuredMission.title}</h2>
                <p>{featuredMission.description}</p>
                <div className={styles.featuredMeta}>
                  <span>{featuredMission.stack}</span>
                  <span>{featuredMission.category}</span>
                </div>
                <div className={styles.featuredProgress}>
                  <ProgressBar value={featuredMission.progress} />
                  <span>{featuredMission.progress}% complete</span>
                </div>
                <div className={styles.featuredActions}>
                  <Link href={`/courses${featuredMission.enrolled ? '' : '#enroll'}`} className={styles.primaryLink}>
                    {featuredMission.enrolled ? 'Open mission' : 'Enroll now'}
                  </Link>
                  <Link href="/dashboard" className={styles.secondaryLink}>
                    View progress
                  </Link>
                </div>
              </article>
            ) : (
              <div className={styles.emptyState}>
                <h2>No missions found</h2>
                <p>Adjust your filters or browse the full mission library.</p>
                <Link href="/courses" className={styles.primaryLink}>
                  Browse missions
                </Link>
              </div>
            )}

            {remainingMissions.length > 0 && (
              <section className={styles.missionList} aria-label="Additional missions">
                <h3>More missions</h3>
                <ul role="list">
                  {remainingMissions.map((mission) => (
                    <li key={mission.id} className={styles.missionListItem}>
                      <div>
                        <strong>{mission.title}</strong>
                        <p>{mission.description}</p>
                      </div>
                      <div className={styles.missionListMeta}>
                        <span>{mission.stack}</span>
                        <Badge variant={statusBadgeVariant(mission.status)}>{statusLabel(mission.status)}</Badge>
                      </div>
                      <Link href={`/courses${mission.enrolled ? '' : '#enroll'}`}>Open</Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </section>

          <aside className={styles.sidePanel}>
            <section className={styles.surface}>
              <h3>Pinned docs</h3>
              <ul role="list">
                {PINNED_DOCS.map((doc) => (
                  <li key={doc.title}>
                    <Link href={doc.href}>
                      <span>{doc.title}</span>
                      <small>{doc.description}</small>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section className={styles.surface}>
              <h3>Upcoming cadence</h3>
              <ul className={styles.timeline} role="list">
                {UPCOMING.map((item) => (
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
          </aside>
        </div>
      </OperatorShell>

      {paletteOpen && (
        <div className={styles.paletteOverlay} role="dialog" aria-modal="true">
          <div className={styles.palette}>
            <label className={styles.paletteSearch}>
              <svg viewBox="0 0 20 20" aria-hidden>
                <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.4" fill="none" />
                <path d="m14.5 14.5 3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              <input
                value={commandQuery}
                onChange={(event) => setCommandQuery(event.target.value)}
                placeholder="Type a command..."
                autoFocus
              />
            </label>

            <div className={styles.paletteResults}>
              {filteredCommands.length === 0 ? (
                <p className={styles.paletteEmpty}>No commands found. Try a different search.</p>
              ) : (
                filteredCommands.map((command) => (
                  <button key={command.label} type="button" onClick={command.action} className={styles.paletteItem}>
                    <div>
                      <strong>{command.label}</strong>
                      <span>{command.description}</span>
                    </div>
                    {command.shortcut && <kbd>{command.shortcut}</kbd>}
                  </button>
                ))
              )}
            </div>

            <footer className={styles.paletteFooter}>Press Esc to close</footer>
          </div>
        </div>
      )}
    </>
  );
}

