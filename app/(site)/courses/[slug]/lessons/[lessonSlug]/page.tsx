import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/Container';
import { Prose } from '@/components/Prose';
import { Badge } from '@/components/Badge';
import { prisma } from '@/lib/prisma';
import { getLessonBySlug } from '@/lib/content';
import { ProgressBar } from '@/components/ProgressBar';
import { StreakIndicator } from '@/components/StreakIndicator';
import { HintDrawer } from '@/components/HintDrawer';
import { LessonActions } from '@/components/LessonActions';
import { ensureUserRecord } from '@/lib/users';
import { getAuthSession } from '@/lib/auth';

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
  const session = await getAuthSession();
  const userId = session.userId;

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
  const user = await ensureUserRecord(userId);

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

  // Get progress for current lesson
  const progress = await prisma.progress.findUnique({
    where: {
      userId_lessonId: {
        userId: user.id,
        lessonId: lesson.id,
      },
    },
  });

  // Compute course progress and streak
  const courseLessonIds = lesson.module.course.modules.flatMap((m: any) => m.lessons.map((l: any) => l.id));
  const completedLessons = await prisma.progress.count({
    where: { userId: user.id, lessonId: { in: courseLessonIds }, completed: true },
  });
  const totalLessons = courseLessonIds.length || 1;
  const coursePct = Math.round((completedLessons / totalLessons) * 100);

  const recent = await prisma.progress.findMany({
    where: { userId: user.id, completed: true },
    orderBy: { lastViewedAt: 'desc' },
    take: 50,
  });
  // Calculate consecutive daily streak from today backwards
  let streakDays = 0;
  let cursor = new Date();
  cursor.setHours(0,0,0,0);
  const daysSet = new Set(recent.map(r => new Date(r.lastViewedAt).toDateString()));
  // If no progress today, no streak unless yesterday continues
  // Count back as long as each previous day exists in set
  while (daysSet.has(cursor.toDateString())) {
    streakDays += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  // Load MDX content
  const mdxContent = await getLessonBySlug(lesson.slug);

  // Find next lesson
  const allLessons = lesson.module.course.modules.flatMap((m: any) => m.lessons);
  const currentIndex = allLessons.findIndex((l: any) => l.id === lesson.id);
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  return (
    <Container size="narrow">
      <article className="py-12">
        <header className="mb-8">
          <Link href={`/courses/${lesson.module.course.slug}`} className="text-accent text-sm mb-4 inline-block">
            ← Back to {lesson.module.course.title}
          </Link>
          <div className="flex items-center justify-between mb-4">
            <div style={{ width: '65%' }}>
              <ProgressBar value={coursePct} />
            </div>
            <StreakIndicator days={streakDays} />
          </div>
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

        <div className="mt-8">
          <HintDrawer>
            <ul className="text-sm text-secondary" style={{ display: 'grid', gap: '0.5rem' }}>
              <li>Break the task into smaller steps — implement and test each step.</li>
              <li>Review the mission outcomes; align your implementation to deliver them.</li>
              <li>Use the provided code patterns/components in this repo to stay consistent.</li>
            </ul>
          </HintDrawer>
        </div>

        <footer className="mt-12 pt-8 border-top">
          <LessonActions
            lessonId={lesson.id}
            completed={!!progress?.completed}
            nextHref={nextLesson ? `/courses/${lesson.module.course.slug}/lessons/${nextLesson.slug}` : undefined}
            courseSlug={lesson.module.course.slug}
            lessonSlug={lesson.slug}
          />
        </footer>
      </article>
    </Container>
  );
}
