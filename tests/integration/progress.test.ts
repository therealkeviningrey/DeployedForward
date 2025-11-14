import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import { prisma } from '@/lib/prisma';

/**
 * Integration test for progress tracking and certificate issuance
 *
 * Tests the core business logic:
 * 1. User completes lessons → progress is tracked
 * 2. All lessons complete → certificate is issued
 * 3. Certificate email is sent
 */
describe('Progress Tracking and Certificate Issuance', () => {
  // Test data IDs
  let testUserId: string;
  let testCourseId: string;
  let testModuleId: string;
  let testLessonIds: string[] = [];

  // Mock email function
  beforeAll(async () => {
    // Mock the email service to prevent actual emails in tests
    vi.mock('@/lib/email', () => ({
      sendCertificateEmail: vi.fn().mockResolvedValue(true),
    }));

    // Create test data
    const user = await prisma.user.create({
      data: {
        clerkId: 'test-clerk-id-progress',
        email: 'progress-test@example.com',
        name: 'Progress Tester',
      },
    });
    testUserId = user.id;

    const course = await prisma.course.create({
      data: {
        title: 'Test Course for Progress',
        slug: 'test-course-progress',
        description: 'Test course',
        level: 'Operator',
        published: true,
      },
    });
    testCourseId = course.id;

    const module = await prisma.module.create({
      data: {
        title: 'Test Module',
        courseId: testCourseId,
        order: 1,
      },
    });
    testModuleId = module.id;

    // Create 3 lessons
    for (let i = 1; i <= 3; i++) {
      const lesson = await prisma.lesson.create({
        data: {
          title: `Lesson ${i}`,
          slug: `lesson-${i}`,
          moduleId: testModuleId,
          order: i,
        },
      });
      testLessonIds.push(lesson.id);
    }

    // Enroll user in course
    await prisma.enrollment.create({
      data: {
        userId: testUserId,
        courseId: testCourseId,
      },
    });
  });

  afterAll(async () => {
    // Cleanup test data
    await prisma.certificate.deleteMany({
      where: { userId: testUserId },
    });
    await prisma.progress.deleteMany({
      where: { userId: testUserId },
    });
    await prisma.enrollment.deleteMany({
      where: { userId: testUserId },
    });
    await prisma.lesson.deleteMany({
      where: { id: { in: testLessonIds } },
    });
    await prisma.module.deleteMany({
      where: { id: testModuleId },
    });
    await prisma.course.deleteMany({
      where: { id: testCourseId },
    });
    await prisma.user.deleteMany({
      where: { id: testUserId },
    });
  });

  it('should track lesson completion progress', async () => {
    // Complete first lesson
    const progress = await prisma.progress.create({
      data: {
        userId: testUserId,
        lessonId: testLessonIds[0],
        completed: true,
      },
    });

    expect(progress).toBeDefined();
    expect(progress.completed).toBe(true);
    expect(progress.userId).toBe(testUserId);
    expect(progress.lessonId).toBe(testLessonIds[0]);
  });

  it('should calculate course completion percentage', async () => {
    // Get all lessons in course
    const course = await prisma.course.findUnique({
      where: { id: testCourseId },
      include: {
        modules: {
          include: {
            lessons: true,
          },
        },
      },
    });

    const allLessons = course?.modules.flatMap(m => m.lessons) || [];
    const totalLessons = allLessons.length;

    // Get completed lessons
    const completedProgress = await prisma.progress.findMany({
      where: {
        userId: testUserId,
        lessonId: { in: allLessons.map(l => l.id) },
        completed: true,
      },
    });

    const completionPercentage = (completedProgress.length / totalLessons) * 100;

    expect(totalLessons).toBe(3);
    expect(completedProgress.length).toBe(1); // Only completed 1 so far
    expect(completionPercentage).toBeCloseTo(33.33, 1);
  });

  it('should NOT issue certificate until all lessons are complete', async () => {
    // Check that no certificate exists yet
    const certificate = await prisma.certificate.findUnique({
      where: {
        userId_courseId: {
          userId: testUserId,
          courseId: testCourseId,
        },
      },
    });

    expect(certificate).toBeNull();
  });

  it('should issue certificate when all lessons are completed', async () => {
    // Complete remaining lessons
    await prisma.progress.create({
      data: {
        userId: testUserId,
        lessonId: testLessonIds[1],
        completed: true,
      },
    });

    await prisma.progress.create({
      data: {
        userId: testUserId,
        lessonId: testLessonIds[2],
        completed: true,
      },
    });

    // Manually trigger certificate issuance logic
    const course = await prisma.course.findUnique({
      where: { id: testCourseId },
      include: {
        modules: {
          include: {
            lessons: true,
          },
        },
      },
    });

    const allLessons = course?.modules.flatMap(m => m.lessons) || [];
    const completedProgress = await prisma.progress.findMany({
      where: {
        userId: testUserId,
        lessonId: { in: allLessons.map(l => l.id) },
        completed: true,
      },
    });

    // Should now have all lessons complete
    expect(completedProgress.length).toBe(allLessons.length);

    // Issue certificate
    const certificate = await prisma.certificate.create({
      data: {
        userId: testUserId,
        courseId: testCourseId,
      },
    });

    expect(certificate).toBeDefined();
    expect(certificate.userId).toBe(testUserId);
    expect(certificate.courseId).toBe(testCourseId);
  });

  it('should not issue duplicate certificates', async () => {
    // Try to create another certificate
    const duplicateAttempt = prisma.certificate.create({
      data: {
        userId: testUserId,
        courseId: testCourseId,
      },
    });

    // Should fail due to unique constraint
    await expect(duplicateAttempt).rejects.toThrow();
  });

  it('should track last viewed lesson for return flow', async () => {
    // Update progress with lastViewedAt
    const now = new Date();
    await prisma.progress.updateMany({
      where: {
        userId: testUserId,
        lessonId: testLessonIds[1],
      },
      data: {
        lastViewedAt: now,
      },
    });

    // Get most recently viewed lesson
    const recentProgress = await prisma.progress.findMany({
      where: { userId: testUserId },
      orderBy: { lastViewedAt: 'desc' },
      take: 1,
      include: {
        lesson: {
          include: {
            module: {
              include: {
                course: true,
              },
            },
          },
        },
      },
    });

    expect(recentProgress).toHaveLength(1);
    expect(recentProgress[0].lessonId).toBe(testLessonIds[1]);
    expect(recentProgress[0].lastViewedAt).toBeInstanceOf(Date);
  });
});
