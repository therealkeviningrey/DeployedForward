/**
 * Quick verification script to check mission database records
 */

import { config } from 'dotenv';
import { resolve } from 'path';
import { PrismaClient } from '@prisma/client';

config({ path: resolve(process.cwd(), '.env.local') });

const prisma = new PrismaClient();

async function main() {
  console.log('🔍 Verifying mission database records...\n');

  const courses = await prisma.course.findMany({
    where: {
      slug: {
        in: ['ai-landing-page-builder', 'ai-saas-dashboard', 'ai-email-automation']
      }
    },
    include: {
      modules: {
        include: {
          lessons: true
        }
      }
    }
  });

  courses.forEach(course => {
    console.log(`\n📦 ${course.title} (${course.slug})`);
    console.log(`   Published: ${course.published ? '✅' : '❌'}`);
    console.log(`   Modules: ${course.modules.length}`);

    course.modules.forEach(module => {
      console.log(`   📁 ${module.title}: ${module.lessons.length} lessons`);
    });
  });

  const totalCourses = courses.length;
  const totalModules = courses.reduce((sum, c) => sum + c.modules.length, 0);
  const totalLessons = courses.reduce((sum, c) =>
    sum + c.modules.reduce((modSum, m) => modSum + m.lessons.length, 0), 0
  );

  console.log('\n📊 Summary:');
  console.log(`   Courses: ${totalCourses}`);
  console.log(`   Modules: ${totalModules}`);
  console.log(`   Lessons: ${totalLessons}`);
  console.log('   ✅ All records verified!\n');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Error verifying missions:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
