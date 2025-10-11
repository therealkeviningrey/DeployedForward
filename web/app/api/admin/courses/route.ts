import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const courseSchema = z.object({
  title: z.string().min(3),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  description: z.string().min(10),
  level: z.enum(['Operator', 'Unit', 'Battalion']),
  published: z.boolean().optional().default(false),
});

export async function POST(request: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // In production, verify admin role here
    // const user = await clerkClient.users.getUser(userId);
    // if (!user.publicMetadata.role === 'admin') { return 401; }

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

