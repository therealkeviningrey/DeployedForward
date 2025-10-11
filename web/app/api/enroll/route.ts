import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import { sendEnrollmentEmail } from '@/lib/email';
import { z } from 'zod';

const enrollSchema = z.object({
  courseId: z.string(),
});

export async function POST(request: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { courseId } = enrollSchema.parse(body);

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      // Get user info from Clerk
      const clerkUser = await (await import('@clerk/nextjs/server')).clerkClient.users.getUser(userId);
      
      user = await prisma.user.create({
        data: {
          clerkId: userId,
          email: clerkUser.emailAddresses[0]?.emailAddress || '',
          name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim(),
        },
      });
    }

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
      return NextResponse.json(
        { message: 'Already enrolled', enrollment: existingEnrollment },
        { status: 200 }
      );
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

    return NextResponse.json(
      { success: true, enrollment },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid request', details: error.errors }, { status: 400 });
    }

    console.error('Enrollment error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

