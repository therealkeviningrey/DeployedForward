import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/Container';
import { Badge } from '@/components/Badge';
import { Card } from '@/components/Card';
import { Divider } from '@/components/Divider';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { JsonLd } from '@/components/JsonLd';
import { generateCourseJsonLd } from '@/lib/seo';

export async function generateStaticParams() {
  // Skip static generation at build time if no database
  if (!process.env.POSTGRES_PRISMA_URL && !process.env.DATABASE_URL) {
    return [];
  }

  try {
    const courses = await prisma.course.findMany({
      where: { published: true },
      select: { slug: true },
    });

    return courses.map((course: { slug: string }) => ({
      slug: course.slug,
    }));
  } catch (error) {
    // If tables don't exist or connection fails during build, skip static generation
    console.warn('Skipping static generation for courses:', error);
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = await prisma.course.findUnique({
    where: { slug },
  });

  if (!course) {
    return { title: 'Course Not Found' };
  }

  const ogUrl = `/api/og?title=${encodeURIComponent(course.title)}&subtitle=${encodeURIComponent(course.description)}&type=course`;

  return {
    title: course.title,
    description: course.description,
    openGraph: {
      title: course.title,
      description: course.description,
      images: [{ url: ogUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: course.title,
      description: course.description,
      images: [ogUrl],
    },
  };
}

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { userId } = auth();

  const course = await prisma.course.findUnique({
    where: { slug },
    include: {
      modules: {
        include: {
          lessons: {
            orderBy: { order: 'asc' },
          },
        },
        orderBy: { order: 'asc' },
      },
    },
  });

  if (!course) {
    notFound();
  }

  // Check if user is enrolled
  let enrollment = null;
  if (userId) {
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (user) {
      enrollment = await prisma.enrollment.findUnique({
        where: {
          userId_courseId: {
            userId: user.id,
            courseId: course.id,
          },
        },
      });
    }
  }

  const totalLessons = course.modules.reduce((acc: number, module: any) => acc + module.lessons.length, 0);
  const totalDuration = course.modules.reduce(
    (acc: number, module: any) => acc + module.lessons.reduce((sum: number, lesson: any) => sum + (lesson.duration || 0), 0),
    0
  );

  // Generate JSON-LD
  const jsonLd = generateCourseJsonLd({
    name: course.title,
    description: course.description,
    provider: {
      name: 'Deployed Forward',
      url: 'https://deployedforward.com',
    },
    educationalLevel: course.level,
    timeRequired: `PT${totalDuration}M`,
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <Container size="narrow">
        <article className="py-12">
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="orange">{course.level}</Badge>
              <span className="text-sm text-secondary">
                {totalLessons} lessons • {totalDuration} min
              </span>
            </div>
            <h1 className="mb-4">{course.title}</h1>
            <p className="text-lg text-secondary">{course.description}</p>

            <div className="mt-6">
              {enrollment ? (
                <Link href={`/courses/${course.slug}/lessons/${course.modules[0]?.lessons[0]?.slug}`} className="btn btn-primary">
                  Continue Learning
                </Link>
              ) : (
                <form action="/api/enroll" method="POST">
                  <input type="hidden" name="courseId" value={course.id} />
                  <button type="submit" className="btn btn-primary">
                    Enroll Now
                  </button>
                </form>
              )}
            </div>
          </header>

          <Divider />

          {/* Curriculum */}
          <section className="py-8">
            <h2 className="mb-6">Curriculum</h2>
            <div className="grid gap-4">
              {course.modules.map((module: any) => (
                <Card key={module.id}>
                  <h3 className="mb-3">{module.title}</h3>
                  <ul className="flex flex-col gap-2">
                    {module.lessons.map((lesson: any) => (
                      <li key={lesson.id} className="flex justify-between items-center text-sm">
                        <span className="text-secondary">{lesson.title}</span>
                        <span className="text-xs text-secondary">{lesson.duration} min</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </section>
        </article>
      </Container>
    </>
  );
}

