/**
 * Seed Script: Create 3 Flagship Mission Courses
 *
 * Mission 1: AI Landing Page Builder (7 lessons)
 * Mission 2: AI-Powered SaaS Dashboard (10 lessons)
 * Mission 3: AI Email Marketing Automation (9 lessons)
 *
 * Total: 26 lessons across 3 courses
 */

import { config } from 'dotenv';
import { resolve } from 'path';
import { PrismaClient } from '@prisma/client';

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') });

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Starting mission course seeding...\n');

  // ============================================
  // MISSION 1: AI Landing Page Builder
  // ============================================
  console.log('📦 Creating Mission 1: AI Landing Page Builder');

  const mission1 = await prisma.course.upsert({
    where: { slug: 'ai-landing-page-builder' },
    update: {},
    create: {
      slug: 'ai-landing-page-builder',
      title: 'AI Landing Page Builder',
      description: 'Build and deploy a production-ready landing page using AI tools in 72 hours. No coding experience required.',
      level: 'Operator',
      published: true,
    },
  });

  console.log(`  ✅ Course created: ${mission1.title}`);

  // Module 1: Setup & Planning
  const m1_module1 = await prisma.module.create({
    data: {
      courseId: mission1.id,
      title: 'Setup & Planning',
      order: 1,
    },
  });

  await prisma.lesson.createMany({
    data: [
      {
        moduleId: m1_module1.id,
        slug: 'welcome-to-ai-landing-pages',
        title: 'Welcome to AI Landing Pages',
        order: 1,
        duration: 10,
      },
      {
        moduleId: m1_module1.id,
        slug: 'planning-your-landing-page',
        title: 'Planning Your Landing Page',
        order: 2,
        duration: 15,
      },
    ],
  });

  // Module 2: Building with AI
  const m1_module2 = await prisma.module.create({
    data: {
      courseId: mission1.id,
      title: 'Building with AI',
      order: 2,
    },
  });

  await prisma.lesson.createMany({
    data: [
      {
        moduleId: m1_module2.id,
        slug: 'prompting-for-html-and-css',
        title: 'Prompting for HTML and CSS',
        order: 1,
        duration: 20,
      },
      {
        moduleId: m1_module2.id,
        slug: 'adding-interactivity-with-javascript',
        title: 'Adding Interactivity with JavaScript',
        order: 2,
        duration: 25,
      },
      {
        moduleId: m1_module2.id,
        slug: 'styling-and-responsive-design',
        title: 'Styling and Responsive Design',
        order: 3,
        duration: 20,
      },
    ],
  });

  // Module 3: Deploy & Launch
  const m1_module3 = await prisma.module.create({
    data: {
      courseId: mission1.id,
      title: 'Deploy & Launch',
      order: 3,
    },
  });

  await prisma.lesson.createMany({
    data: [
      {
        moduleId: m1_module3.id,
        slug: 'deploying-to-vercel',
        title: 'Deploying to Vercel',
        order: 1,
        duration: 15,
      },
      {
        moduleId: m1_module3.id,
        slug: 'custom-domain-and-launch',
        title: 'Custom Domain and Launch',
        order: 2,
        duration: 15,
      },
    ],
  });

  console.log(`  ✅ Created 3 modules with 7 lessons\n`);

  // ============================================
  // MISSION 2: AI-Powered SaaS Dashboard
  // ============================================
  console.log('📦 Creating Mission 2: AI-Powered SaaS Dashboard');

  const mission2 = await prisma.course.upsert({
    where: { slug: 'ai-saas-dashboard' },
    update: {},
    create: {
      slug: 'ai-saas-dashboard',
      title: 'AI-Powered SaaS Dashboard',
      description: 'Build a full-stack SaaS dashboard with authentication, data visualization, and API integration using AI-assisted development.',
      level: 'Operator',
      published: true,
    },
  });

  console.log(`  ✅ Course created: ${mission2.title}`);

  // Module 1: Foundation Setup
  const m2_module1 = await prisma.module.create({
    data: {
      courseId: mission2.id,
      title: 'Foundation Setup',
      order: 1,
    },
  });

  await prisma.lesson.createMany({
    data: [
      {
        moduleId: m2_module1.id,
        slug: 'project-architecture-planning',
        title: 'Project Architecture Planning',
        order: 1,
        duration: 15,
      },
      {
        moduleId: m2_module1.id,
        slug: 'setting-up-nextjs-with-ai',
        title: 'Setting Up Next.js with AI',
        order: 2,
        duration: 20,
      },
    ],
  });

  // Module 2: Dashboard Components
  const m2_module2 = await prisma.module.create({
    data: {
      courseId: mission2.id,
      title: 'Dashboard Components',
      order: 2,
    },
  });

  await prisma.lesson.createMany({
    data: [
      {
        moduleId: m2_module2.id,
        slug: 'building-the-sidebar-navigation',
        title: 'Building the Sidebar Navigation',
        order: 1,
        duration: 20,
      },
      {
        moduleId: m2_module2.id,
        slug: 'creating-data-visualization-cards',
        title: 'Creating Data Visualization Cards',
        order: 2,
        duration: 25,
      },
      {
        moduleId: m2_module2.id,
        slug: 'interactive-charts-and-graphs',
        title: 'Interactive Charts and Graphs',
        order: 3,
        duration: 30,
      },
    ],
  });

  // Module 3: Data & API Integration
  const m2_module3 = await prisma.module.create({
    data: {
      courseId: mission2.id,
      title: 'Data & API Integration',
      order: 3,
    },
  });

  await prisma.lesson.createMany({
    data: [
      {
        moduleId: m2_module3.id,
        slug: 'setting-up-database-with-prisma',
        title: 'Setting Up Database with Prisma',
        order: 1,
        duration: 25,
      },
      {
        moduleId: m2_module3.id,
        slug: 'building-api-routes',
        title: 'Building API Routes',
        order: 2,
        duration: 20,
      },
      {
        moduleId: m2_module3.id,
        slug: 'connecting-frontend-to-backend',
        title: 'Connecting Frontend to Backend',
        order: 3,
        duration: 25,
      },
    ],
  });

  // Module 4: Deploy & Polish
  const m2_module4 = await prisma.module.create({
    data: {
      courseId: mission2.id,
      title: 'Deploy & Polish',
      order: 4,
    },
  });

  await prisma.lesson.createMany({
    data: [
      {
        moduleId: m2_module4.id,
        slug: 'authentication-with-clerk',
        title: 'Authentication with Clerk',
        order: 1,
        duration: 20,
      },
      {
        moduleId: m2_module4.id,
        slug: 'deploying-full-stack-app',
        title: 'Deploying Your Full-Stack App',
        order: 2,
        duration: 25,
      },
    ],
  });

  console.log(`  ✅ Created 4 modules with 10 lessons\n`);

  // ============================================
  // MISSION 3: AI Email Marketing Automation
  // ============================================
  console.log('📦 Creating Mission 3: AI Email Marketing Automation');

  const mission3 = await prisma.course.upsert({
    where: { slug: 'ai-email-automation' },
    update: {},
    create: {
      slug: 'ai-email-automation',
      title: 'AI Email Marketing Automation',
      description: 'Build an automated email marketing system with beautiful templates, workflows, and analytics using AI-powered development.',
      level: 'Operator',
      published: true,
    },
  });

  console.log(`  ✅ Course created: ${mission3.title}`);

  // Module 1: Email System Setup
  const m3_module1 = await prisma.module.create({
    data: {
      courseId: mission3.id,
      title: 'Email System Setup',
      order: 1,
    },
  });

  await prisma.lesson.createMany({
    data: [
      {
        moduleId: m3_module1.id,
        slug: 'choosing-email-service-provider',
        title: 'Choosing Your Email Service Provider',
        order: 1,
        duration: 15,
      },
      {
        moduleId: m3_module1.id,
        slug: 'setting-up-resend-api',
        title: 'Setting Up Resend API',
        order: 2,
        duration: 20,
      },
    ],
  });

  // Module 2: Template Design
  const m3_module2 = await prisma.module.create({
    data: {
      courseId: mission3.id,
      title: 'Template Design',
      order: 2,
    },
  });

  await prisma.lesson.createMany({
    data: [
      {
        moduleId: m3_module2.id,
        slug: 'designing-email-templates-with-ai',
        title: 'Designing Email Templates with AI',
        order: 1,
        duration: 25,
      },
      {
        moduleId: m3_module2.id,
        slug: 'responsive-email-best-practices',
        title: 'Responsive Email Best Practices',
        order: 2,
        duration: 20,
      },
    ],
  });

  // Module 3: Automation Workflows
  const m3_module3 = await prisma.module.create({
    data: {
      courseId: mission3.id,
      title: 'Automation Workflows',
      order: 3,
    },
  });

  await prisma.lesson.createMany({
    data: [
      {
        moduleId: m3_module3.id,
        slug: 'welcome-email-sequence',
        title: 'Building a Welcome Email Sequence',
        order: 1,
        duration: 25,
      },
      {
        moduleId: m3_module3.id,
        slug: 'trigger-based-automation',
        title: 'Trigger-Based Automation',
        order: 2,
        duration: 30,
      },
      {
        moduleId: m3_module3.id,
        slug: 'scheduling-and-cron-jobs',
        title: 'Scheduling and Cron Jobs',
        order: 3,
        duration: 25,
      },
    ],
  });

  // Module 4: Analytics & Optimization
  const m3_module4 = await prisma.module.create({
    data: {
      courseId: mission3.id,
      title: 'Analytics & Optimization',
      order: 4,
    },
  });

  await prisma.lesson.createMany({
    data: [
      {
        moduleId: m3_module4.id,
        slug: 'tracking-email-performance',
        title: 'Tracking Email Performance',
        order: 1,
        duration: 20,
      },
      {
        moduleId: m3_module4.id,
        slug: 'ab-testing-and-optimization',
        title: 'A/B Testing and Optimization',
        order: 2,
        duration: 25,
      },
    ],
  });

  console.log(`  ✅ Created 4 modules with 9 lessons\n`);

  // ============================================
  // Summary
  // ============================================
  console.log('✅ Mission seeding complete!\n');
  console.log('📊 Summary:');
  console.log('  • 3 courses created');
  console.log('  • 11 modules created');
  console.log('  • 26 lessons created');
  console.log('  • All courses published and ready\n');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Error seeding missions:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
