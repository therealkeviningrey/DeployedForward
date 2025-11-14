import { NextResponse } from 'next/server';
import { sendEnrollmentEmail } from '@/lib/email';
import { prisma } from '@/lib/prisma';
import { ensureUserRecord } from '@/lib/users';
import { readRequestData } from '@/lib/http';
import { z } from 'zod';
import { getAuthSession } from '@/lib/auth';

const enrollSchema = z.object({
  courseId: z.string(),
});

export async function POST(request: Request) {
  try {
    const session = await getAuthSession();
    if (!session.isAuthenticated || !session.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data, isForm } = await readRequestData(request);
    const { courseId } = enrollSchema.parse(data);

    const user = await ensureUserRecord(session.userId);

    // Get course
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    // Check if already enrolled
    const existingEnrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: course.id,
        },
      },
    });

    if (existingEnrollment) {
      if (isForm) {
        const redirectTarget = request.headers.get('referer') || `/courses/${course.slug}`;
        return NextResponse.redirect(new URL(redirectTarget, request.url), { status: 303 });
      }
      return NextResponse.json({ message: 'Already enrolled', enrollment: existingEnrollment }, { status: 200 });
    }

    // Create enrollment
    const enrollment = await prisma.enrollment.create({
      data: {
        userId: user.id,
        courseId: course.id,
      },
    });

    // Send enrollment confirmation email
    await sendEnrollmentEmail(user.email, course.title);

    if (isForm) {
      const redirectTarget = request.headers.get('referer') || `/courses/${course.slug}`;
      return NextResponse.redirect(new URL(redirectTarget, request.url), { status: 303 });
    }

    return NextResponse.json({ success: true, enrollment }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid request', details: error.errors }, { status: 400 });
    }

    console.error('Enrollment error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
