import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/Container';
import { Prose } from '@/components/Prose';
import { Badge } from '@/components/Badge';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { getLessonBySlug } from '@/lib/content';

export async function generateMetadata({ params }: { params: Promise<{ slug: string; lessonSlug: string }> }) {
  const { lessonSlug } = await params;
  const lesson = await prisma.lesson.findFirst({
    where: { slug: lessonSlug },
    include: { module: { include: { course: true } } },
  });

  if (!lesson) {
    return { title: 'Lesson Not Found' };
  }

  return {
    title: `${lesson.title} | ${lesson.module.course.title}`,
    description: `Learn ${lesson.title} as part of ${lesson.module.course.title}`,
  };
}

export default async function LessonPage({ params }: { params: Promise<{ slug: string; lessonSlug: string }> }) {
  const { slug, lessonSlug } = await params;
  const { userId } = auth();

  if (!userId) {
    return (
      <Container size="narrow">
        <div className="py-16 text-center">
          <h2 className="mb-4">Sign in required</h2>
          <p className="text-secondary mb-8">You must be signed in and enrolled to view lessons.</p>
          <Link href="/login" className="btn btn-primary">
            Sign In
          </Link>
        </div>
      </Container>
    );
  }

  // Find user and check enrollment
  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (!user) {
    return notFound();
  }

  const lesson = await prisma.lesson.findFirst({
    where: { slug: lessonSlug },
    include: {
      module: {
        include: {
          course: {
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
          },
        },
      },
    },
  });

  if (!lesson) {
    notFound();
  }

  // Check enrollment
  const enrollment = await prisma.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId: user.id,
        courseId: lesson.module.course.id,
      },
    },
  });

  if (!enrollment) {
    return (
      <Container size="narrow">
        <div className="py-16 text-center">
          <h2 className="mb-4">Enrollment required</h2>
          <p className="text-secondary mb-8">You must be enrolled in this course to view lessons.</p>
          <Link href={`/courses/${lesson.module.course.slug}`} className="btn btn-primary">
            Enroll Now
          </Link>
        </div>
      </Container>
    );
  }

  // Get progress
  const progress = await prisma.progress.findUnique({
    where: {
      userId_lessonId: {
        userId: user.id,
        lessonId: lesson.id,
      },
    },
  });

  // Load MDX content
  const mdxContent = await getLessonBySlug(lesson.slug);

  // Find next lesson
  const allLessons = lesson.module.course.modules.flatMap((m) => m.lessons);
  const currentIndex = allLessons.findIndex((l) => l.id === lesson.id);
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  return (
    <Container size="narrow">
      <article className="py-12">
        <header className="mb-8">
          <Link href={`/courses/${lesson.module.course.slug}`} className="text-accent text-sm mb-4 inline-block">
            ← Back to {lesson.module.course.title}
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <Badge>{lesson.module.title}</Badge>
            {lesson.duration && <span className="text-sm text-secondary">{lesson.duration} min</span>}
            {progress?.completed && <Badge variant="orange">Completed</Badge>}
          </div>
          <h1>{lesson.title}</h1>

          {lesson.videoUrl && (
            <div className="mt-6 aspect-video bg-secondary border-hair rounded-lg">
              {/* Video player placeholder - integrate with your video provider */}
              <iframe
                src={lesson.videoUrl}
                className="w-full h-full rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </header>

        {mdxContent && <Prose>{mdxContent.content}</Prose>}

        <footer className="mt-12 pt-8 border-top flex justify-between items-center">
          <form action="/api/progress" method="POST">
            <input type="hidden" name="lessonId" value={lesson.id} />
            <input type="hidden" name="completed" value="true" />
            <button type="submit" className="btn btn-ghost">
              {progress?.completed ? '✓ Completed' : 'Mark as Complete'}
            </button>
          </form>

          {nextLesson && (
            <Link href={`/courses/${lesson.module.course.slug}/lessons/${nextLesson.slug}`} className="btn btn-primary">
              Next Lesson →
            </Link>
          )}
        </footer>
      </article>
    </Container>
  );
}

