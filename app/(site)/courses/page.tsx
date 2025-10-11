import { Container } from '@/components/Container';
import { Hero } from '@/components/Hero';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { Pill } from '@/components/Pill';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const metadata = {
  title: 'Courses',
  description: 'Browse our catalog of AI workflow training courses. Operator, Unit, and Battalion levels.',
};

export default async function CoursesPage() {
  // Fetch published courses from database (empty if no DB configured)
  if (!process.env.POSTGRES_PRISMA_URL && !process.env.DATABASE_URL) {
    return (
      <Container>
        <Hero title="Courses" subtitle="Structured training paths for AI workflows." />
        <section className="py-12">
          <Card>
            <p className="text-secondary text-center">Configure DATABASE_URL to see courses.</p>
          </Card>
        </section>
      </Container>
    );
  }

  const courses = await prisma.course.findMany({
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

  // Calculate total lessons and duration for each course
  const coursesWithMeta = courses.map((course: any) => {
    const totalLessons = course.modules.reduce((acc: number, module: any) => acc + module.lessons.length, 0);
    const totalDuration = course.modules.reduce(
      (acc: number, module: any) => acc + module.lessons.reduce((sum: number, lesson: any) => sum + (lesson.duration || 0), 0),
      0
    );
    return { ...course, totalLessons, totalDuration };
  });

  return (
    <Container>
      <Hero
        title="Courses"
        subtitle="Structured training paths for AI workflows. Each course contains multiple lessons with hands-on missions."
      />

      <section className="py-12">
        {/* Filter pills */}
        <div className="flex gap-2 mb-8">
          <Pill active>All Courses</Pill>
          <Pill>Operator</Pill>
          <Pill>Unit</Pill>
          <Pill>Battalion</Pill>
        </div>

        <div className="grid grid-2 gap-4">
          {coursesWithMeta.map((course: any) => (
            <Card key={course.id} hover>
              <div className="flex justify-between items-start mb-3">
                <Badge variant={course.level === 'Operator' ? 'default' : 'orange'}>
                  {course.level}
                </Badge>
                <span className="text-xs text-secondary">{course.totalDuration} min</span>
              </div>
              <h3 className="mb-2">{course.title}</h3>
              <p className="text-secondary text-sm mb-4">{course.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-secondary">{course.totalLessons} lessons</span>
                <Link href={`/courses/${course.slug}`} className="btn btn-primary btn-sm">
                  Start Course
                </Link>
              </div>
            </Card>
          ))}

          {coursesWithMeta.length === 0 && (
            <Card className="col-span-2">
              <p className="text-secondary text-center">
                No courses available yet. Check back soon or{' '}
                <Link href="/programs/missions" className="text-accent">
                  browse missions
                </Link>
                .
              </p>
            </Card>
          )}
        </div>
      </section>
    </Container>
  );
}

