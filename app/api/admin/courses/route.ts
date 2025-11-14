import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { getAuthSession, assertRole } from '@/lib/auth';

const courseSchema = z.object({
  title: z.string().min(3),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  description: z.string().min(10),
  level: z.enum(['Operator', 'Unit', 'Battalion']),
  published: z.boolean().optional().default(false),
});

export async function POST(request: Request) {
  try {
    const session = await getAuthSession();
    if (!session.isAuthenticated || !session.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
      await assertRole('org:admin');
    } catch {
      try {
        await assertRole('admin');
      } catch {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }
    }

    const formData = await request.formData();
    const data = {
      title: formData.get('title') as string,
      slug: formData.get('slug') as string,
      description: formData.get('description') as string,
      level: formData.get('level') as string,
      published: formData.get('published') === 'on',
    };

    const validated = courseSchema.parse(data);

    const course = await prisma.course.create({
      data: validated,
    });

    // Redirect to courses list
    return NextResponse.redirect(new URL('/admin/courses', request.url));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid data', details: error.errors }, { status: 400 });
    }

    console.error('Course creation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

