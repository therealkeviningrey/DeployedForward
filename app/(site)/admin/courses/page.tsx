import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import { Container } from '@/components/Container';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const metadata = {
  title: 'Manage Courses',
  description: 'View and manage all courses.',
};

export default async function AdminCoursesPage() {
  const { userId } = auth();

  if (!userId) {
    redirect('/login');
  }

  const courses = await prisma.course.findMany({
    include: {
      modules: {
        include: {
          lessons: true,
        },
      },
      _count: {
        select: {
          enrollments: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <Container>
      <div className="py-12">
        <div className="flex justify-between items-center mb-8">
          <h1>Manage Courses</h1>
          <div className="flex gap-3">
            <Link href="/admin" className="btn btn-ghost">
              ← Back to Admin
            </Link>
            <Link href="/admin/courses/new" className="btn btn-primary">
              Create Course
            </Link>
          </div>
        </div>

        <div className="grid gap-4">
          {courses.length === 0 ? (
            <Card>
              <p className="text-secondary text-center py-8">
                No courses yet. Create your first course to get started.
              </p>
            </Card>
          ) : (
            courses.map((course: any) => {
              const totalLessons = course.modules.reduce((acc: number, m: any) => acc + m.lessons.length, 0);
              
              return (
                <Card key={course.id} hover>
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <h3>{course.title}</h3>
                      <Badge variant={course.published ? 'orange' : 'default'}>
                        {course.published ? 'Published' : 'Draft'}
                      </Badge>
                    </div>
                    <div className="text-sm text-secondary">
                      {course._count.enrollments} enrollments
                    </div>
                  </div>

                  <p className="text-secondary text-sm mb-4">{course.description}</p>

                  <div className="flex justify-between items-center">
                    <div className="flex gap-4 text-sm text-secondary">
                      <span>{course.modules.length} modules</span>
                      <span>{totalLessons} lessons</span>
                      <span className="badge">{course.level}</span>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/courses/${course.id}/edit`}
                        className="btn btn-ghost btn-sm"
                      >
                        Edit
                      </Link>
                      <Link
                        href={`/courses/${course.slug}`}
                        className="btn btn-ghost btn-sm"
                        target="_blank"
                      >
                        Preview
                      </Link>
                    </div>
                  </div>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </Container>
  );
}

