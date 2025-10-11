import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create demo course
  const course = await prisma.course.upsert({
    where: { slug: 'ai-workflow-fundamentals' },
    update: {},
    create: {
      slug: 'ai-workflow-fundamentals',
      title: 'AI Workflow Fundamentals',
      description: 'Master the core patterns of AI-enhanced development. Build repeatable workflows.',
      level: 'Operator',
      published: true,
    },
  });

  console.log('✅ Created course:', course.title);

  // Create modules
  const module1 = await prisma.module.upsert({
    where: { courseId_order: { courseId: course.id, order: 1 } },
    update: {},
    create: {
      courseId: course.id,
      title: 'Introduction to AI Workflows',
      order: 1,
    },
  });

  const module2 = await prisma.module.upsert({
    where: { courseId_order: { courseId: course.id, order: 2 } },
    update: {},
    create: {
      courseId: course.id,
      title: 'Prompt Engineering Essentials',
      order: 2,
    },
  });

  console.log('✅ Created modules');

  // Create lessons
  await prisma.lesson.upsert({
    where: { moduleId_order: { moduleId: module1.id, order: 1 } },
    update: {},
    create: {
      moduleId: module1.id,
      slug: 'welcome-to-deployed-forward',
      title: 'Welcome to Deployed Forward',
      order: 1,
      duration: 5,
    },
  });

  await prisma.lesson.upsert({
    where: { moduleId_order: { moduleId: module1.id, order: 2 } },
    update: {},
    create: {
      moduleId: module1.id,
      slug: 'setting-up-your-environment',
      title: 'Setting Up Your Environment',
      order: 2,
      duration: 10,
    },
  });

  await prisma.lesson.upsert({
    where: { moduleId_order: { moduleId: module2.id, order: 1 } },
    update: {},
    create: {
      moduleId: module2.id,
      slug: 'anatomy-of-a-prompt',
      title: 'Anatomy of a Prompt',
      order: 1,
      duration: 15,
    },
  });

  console.log('✅ Created lessons');

  // Create coupons
  await prisma.coupon.upsert({
    where: { code: 'LAUNCH50' },
    update: {},
    create: {
      code: 'LAUNCH50',
      discountPercent: 50,
      maxUses: 100,
    },
  });

  await prisma.coupon.upsert({
    where: { code: 'OPERATOR25' },
    update: {},
    create: {
      code: 'OPERATOR25',
      discountPercent: 25,
      maxUses: null,
    },
  });

  console.log('✅ Created coupons');

  console.log('🎉 Seed complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

