import { Container } from '@/components/Container';
import { Hero } from '@/components/Hero';
import { CourseGrid } from '@/components/CourseGrid';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { OperatorShell } from '@/components/OperatorShell';

export const metadata = {
  title: 'Courses',
  description: 'Browse our catalog of AI workflow training courses. Operator, Unit, and Battalion levels.',
};

export default async function CoursesPage() {
  type Lesson = { duration: number | null };
  type Module = { lessons: Lesson[] };
  type Course = {
    id: string;
    slug: string;
    title: string;
    description: string;
    level: string;
    modules: Module[];
  };
  let courses: Course[] = [];

  // Try to fetch courses from database
  try {
    if (!process.env.POSTGRES_PRISMA_URL && !process.env.DATABASE_URL) {
      throw new Error('Database not configured');
    }

    courses = await prisma.course.findMany({
      where: { published: true },
      include: {
        modules: {
          include: {
            lessons: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error('Failed to fetch courses:', error);
    // Continue with empty courses array
  }

  // Calculate total lessons and duration for each course
  const coursesWithMeta = courses.map((course) => {
    const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0);
    const totalDuration = course.modules.reduce(
      (acc, module) => acc + module.lessons.reduce((sum, lesson) => sum + (lesson.duration || 0), 0),
      0
    );
    return { ...course, totalLessons, totalDuration };
  });

  return (
    <OperatorShell
      activePath="/courses"
      breadcrumb={[{ label: 'Workspace' }, { label: 'courses/' }]}
      title="Missions"
      subtitle="Structured training paths for AI workflows."
      toolbarActions={
        <Link href="/pricing" className="btn btn-primary btn-sm">
          Get Access
        </Link>
      }
    >
      <Container>
        <Hero
          title="Missions"
          subtitle="Structured training paths for AI workflows. Deploy real projects, not toy examples."
          actions={
            <Link href="/pricing" className="btn btn-primary btn-lg">
              Get Access – Build Today
            </Link>
          }
        />

        <section className="py-12">
          <CourseGrid courses={coursesWithMeta} />
        </section>
      </Container>
    </OperatorShell>
  );
}

