import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/Container';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { KPI } from '@/components/KPI';
import { DashboardOnboarding } from '@/components/DashboardOnboarding';
import { StreakIndicator } from '@/components/StreakIndicator';
import { NextLessonCard } from '@/components/NextLessonCard';
import { NoCourses } from '@/components/EmptyState';
import { prisma } from '@/lib/prisma';
import { ensureUserRecord } from '@/lib/users';
import { getAuthSession } from '@/lib/auth';

export const metadata = {
  title: 'Dashboard',
  description: 'Your learning progress and enrolled courses.',
};

export default async function DashboardPage() {
  const session = await getAuthSession();
  if (!session.isAuthenticated || !session.userId) {
    redirect('/login');
  }

  const ensuredUser = await ensureUserRecord(session.userId);

  const user = await prisma.user.findUnique({
    where: { id: ensuredUser.id },
    include: {
      enrollments: {
        include: {
          course: {
            include: {
              modules: {
                include: {
                  lessons: true,
                },
              },
            },
          },
        },
      },
      progress: {
        include: {
          lesson: true,
        },
      },
      certificates: {
        include: {
          course: true,
        },
      },
    },
  });

  if (!user) {
    return (
      <Container>
        <div className="py-16 text-center">
          <h2 className="mb-4">Setting up your account...</h2>
          <p className="text-secondary">Please refresh the page.</p>
        </div>
      </Container>
    );
  }

  // Check if onboarding should be shown
  const shouldShowOnboarding = !user.onboardingCompletedAt && user.enrollments.length === 0;

  // Fetch available courses for onboarding (only if needed)
  const availableCourses = shouldShowOnboarding
    ? await prisma.course.findMany({
        where: { published: true },
        select: {
          id: true,
          slug: true,
          title: true,
          description: true,
          level: true,
        },
        take: 5,
        orderBy: { createdAt: 'asc' },
      })
    : [];

  // Calculate stats
  const totalEnrollments = user.enrollments.length;
  const completedLessons = user.progress.filter((p: any) => p.completed).length;
  const totalCertificates = user.certificates.length;

  // Find next lesson to complete
  let nextLesson = null;
  for (const enrollment of user.enrollments) {
    const course = enrollment.course;
    for (const module of course.modules) {
      for (const lesson of module.lessons) {
        const progress = user.progress.find((p: any) => p.lessonId === lesson.id);
        if (!progress || !progress.completed) {
          nextLesson = {
            courseTitle: course.title,
            courseSlug: course.slug,
            lessonTitle: lesson.title,
            lessonSlug: lesson.slug,
            moduleTitle: module.title,
            estimatedTime: lesson.duration || undefined,
            progress: progress ? 50 : 0, // If started but not completed, assume 50%
          };
          break;
        }
      }
      if (nextLesson) break;
    }
    if (nextLesson) break;
  }

  // Calculate progress for each enrollment
  const enrollmentsWithProgress = user.enrollments.map((enrollment: any) => {
    const totalLessons = enrollment.course.modules.reduce((acc: number, m: any) => acc + m.lessons.length, 0);
    const completedInCourse = user.progress.filter(
      (p: any) => p.completed && enrollment.course.modules.some((m: any) => m.lessons.some((l: any) => l.id === p.lessonId))
    ).length;
    const progressPercent = totalLessons > 0 ? Math.round((completedInCourse / totalLessons) * 100) : 0;
    const isCompleted = progressPercent === 100;

    return {
      ...enrollment,
      totalLessons,
      completedLessons: completedInCourse,
      progressPercent,
      isCompleted,
    };
  });

  return (
    <Container>
      {/* Onboarding Modal for new users */}
      <DashboardOnboarding
        shouldShowOnboarding={shouldShowOnboarding}
        userName={user.name || undefined}
        courses={availableCourses}
      />

      <div className="py-12">
        <h1 className="mb-8">Dashboard</h1>

        {/* Streak & Next Lesson */}
        <div className="grid grid-2 gap-6 mb-12">
          <StreakIndicator
            currentStreak={user.currentStreak || 0}
            longestStreak={user.longestStreak || 0}
          />
          {nextLesson && <NextLessonCard {...nextLesson} />}
        </div>

        {/* Stats */}
        <div className="grid grid-3 gap-4 mb-12">
          <KPI value={totalEnrollments.toString()} label="Courses Enrolled" />
          <KPI value={completedLessons.toString()} label="Lessons Completed" />
          <KPI value={totalCertificates.toString()} label="Certificates" />
        </div>

        {/* Enrolled Courses */}
        <section className="mb-12">
          <h2 className="mb-6">Your Courses</h2>
          {enrollmentsWithProgress.length === 0 ? (
            <NoCourses />
          ) : (
            <div className="grid gap-4">
              {enrollmentsWithProgress.map((enrollment: any) => (
                <Card key={enrollment.id} hover>
                  <div className="flex justify-between items-start mb-3">
                    <h3>{enrollment.course.title}</h3>
                    {enrollment.isCompleted && <Badge variant="orange">Completed</Badge>}
                  </div>
                  <p className="text-secondary text-sm mb-4">{enrollment.course.description}</p>
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-secondary mb-2">
                      <span>
                        {enrollment.completedLessons} / {enrollment.totalLessons} lessons
                      </span>
                      <span>{enrollment.progressPercent}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent transition-all"
                        style={{ width: `${enrollment.progressPercent}%` }}
                      />
                    </div>
                  </div>
                  <Link href={`/courses/${enrollment.course.slug}`} className="btn btn-ghost btn-sm">
                    {enrollment.isCompleted ? 'Review Course' : 'Continue Learning'}
                  </Link>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Certificates */}
        {user.certificates.length > 0 && (
          <section>
            <h2 className="mb-6">Certificates</h2>
            <div className="grid grid-2 gap-4">
              {user.certificates.map((cert: any) => (
                <Card key={cert.id}>
                  <Badge variant="orange" className="mb-3">
                    Certificate
                  </Badge>
                  <h3 className="mb-2">{cert.course.title}</h3>
                  <p className="text-xs text-secondary mb-4">
                    Issued {new Date(cert.issuedAt).toLocaleDateString()}
                  </p>
                  {cert.pdfUrl && (
                    <a href={cert.pdfUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
                      Download PDF
                    </a>
                  )}
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>
    </Container>
  );
}
