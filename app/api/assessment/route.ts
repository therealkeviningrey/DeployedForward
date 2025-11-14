import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ensureUserRecord } from '@/lib/users';
import { z } from 'zod';
import { getAuthSession } from '@/lib/auth';

const attemptSchema = z.object({
  assessmentId: z.string(),
  answer: z.string(),
});

export async function POST(request: Request) {
  try {
    const session = await getAuthSession();
    if (!session.isAuthenticated || !session.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { assessmentId, answer } = attemptSchema.parse(body);

    const user = await ensureUserRecord(session.userId);

    // Get assessment
    const assessment = await prisma.assessment.findUnique({
      where: { id: assessmentId },
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

    if (!assessment) {
      return NextResponse.json({ error: 'Assessment not found' }, { status: 404 });
    }

    // Check enrollment
    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: assessment.lesson.module.course.id,
        },
      },
    });

    if (!enrollment) {
      return NextResponse.json({ error: 'Not enrolled in this course' }, { status: 403 });
    }

    // Evaluate answer
    const correct = evaluateAnswer(assessment, answer);

    // Create attempt record
    const attempt = await prisma.attempt.create({
      data: {
        userId: user.id,
        assessmentId: assessment.id,
        answer,
        correct,
      },
    });

    return NextResponse.json(
      {
        success: true,
        attempt: {
          id: attempt.id,
          correct: attempt.correct,
          createdAt: attempt.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid request', details: error.errors }, { status: 400 });
    }

    console.error('Assessment submission error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

function evaluateAnswer(assessment: any, answer: string): boolean {
  if (!assessment.answer) {
    // If no answer key stored, manual grading required
    return false;
  }

  switch (assessment.type) {
    case 'MCQ':
      // For MCQ, exact match
      return answer.trim().toLowerCase() === assessment.answer.trim().toLowerCase();

    case 'TEXT':
      // For text, fuzzy matching or keyword checking
      // Simple implementation: check if answer contains key phrases
      const answerLower = answer.toLowerCase();
      const correctLower = assessment.answer.toLowerCase();
      
      // Split correct answer into keywords and check if most are present
      const keywords = correctLower.split(/\s+/);
      const matches = keywords.filter((kw: string) => answerLower.includes(kw));
      return matches.length >= keywords.length * 0.7; // 70% keyword match

    case 'CODE':
      // For code, would need actual execution/testing
      // Simple implementation: check for key patterns
      return answer.includes(assessment.answer);

    default:
      return false;
  }
}
