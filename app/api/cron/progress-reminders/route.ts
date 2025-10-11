import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendProgressReminder } from '@/lib/email';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    // Verify Vercel Cron secret
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Find users with incomplete enrollments (started but not finished)
    // Last viewed more than 3 days ago
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    const incompleteEnrollments = await prisma.enrollment.findMany({
      where: {
        completedAt: null,
        startedAt: {
          lte: threeDaysAgo,
        },
      },
      include: {
        user: true,
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
      take: 100, // Limit to avoid timeout
    });

    const emailsSent = [];

    for (const enrollment of incompleteEnrollments) {
      // Get user's progress
      const progress = await prisma.progress.findMany({
        where: {
          userId: enrollment.user.id,
          lesson: {
            module: {
              courseId: enrollment.course.id,
            },
          },
        },
      });

      // Check if they have recent activity (within last 3 days)
      const recentActivity = progress.some(
        (p: any) => new Date(p.lastViewedAt) > threeDaysAgo
      );

      // Skip if they've been active recently
      if (recentActivity) continue;

      const totalLessons = enrollment.course.modules.reduce(
        (acc: number, m: any) => acc + m.lessons.length,
        0
      );
      const completedLessons = progress.filter((p: any) => p.completed).length;

      // Only send if they've started (>0%) and haven't finished (< 100%)
      if (completedLessons > 0 && completedLessons < totalLessons) {
        await sendProgressReminder(
          enrollment.user.email,
          enrollment.user.name || 'there',
          enrollment.course.title,
          completedLessons,
          totalLessons
        );

        emailsSent.push({
          user: enrollment.user.email,
          course: enrollment.course.title,
          progress: `${completedLessons}/${totalLessons}`,
        });
      }
    }

    return NextResponse.json({
      success: true,
      sent: emailsSent.length,
      details: emailsSent,
    });
  } catch (error) {
    console.error('Progress reminder cron error:', error);
    return NextResponse.json({ error: 'Cron job failed' }, { status: 500 });
  }
}

