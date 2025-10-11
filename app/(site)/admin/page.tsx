import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import { Container } from '@/components/Container';
import { Card } from '@/components/Card';
import { KPI } from '@/components/KPI';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const metadata = {
  title: 'Admin Dashboard',
  description: 'Course management and platform analytics.',
};

export default async function AdminPage() {
  const { userId } = auth();

  if (!userId) {
    redirect('/login');
  }

  // In production, verify admin role with Clerk
  // For now, we'll check if user exists
  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (!user) {
    redirect('/dashboard');
  }

  // Fetch admin stats
  const [totalCourses, totalUsers, totalEnrollments, recentEnrollments] = await Promise.all([
    prisma.course.count(),
    prisma.user.count(),
    prisma.enrollment.count(),
    prisma.enrollment.findMany({
      take: 10,
      orderBy: { startedAt: 'desc' },
      include: {
        user: true,
        course: true,
      },
    }),
  ]);

  return (
    <Container>
      <div className="py-12">
        <div className="flex justify-between items-center mb-8">
          <h1>Admin Dashboard</h1>
          <Link href="/admin/courses/new" className="btn btn-primary">
            Create Course
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-3 gap-4 mb-12">
          <KPI value={totalCourses.toString()} label="Total Courses" />
          <KPI value={totalUsers.toString()} label="Total Users" />
          <KPI value={totalEnrollments.toString()} label="Total Enrollments" />
        </div>

        {/* Quick Actions */}
        <section className="mb-12">
          <h2 className="mb-6">Quick Actions</h2>
          <div className="grid grid-3 gap-4">
            <Card hover>
              <h3 className="mb-3">Courses</h3>
              <p className="text-secondary text-sm mb-4">Manage courses, modules, and lessons.</p>
              <Link href="/admin/courses" className="btn btn-ghost btn-sm">
                Manage Courses
              </Link>
            </Card>
            <Card hover>
              <h3 className="mb-3">Database</h3>
              <p className="text-secondary text-sm mb-4">Direct database access via Prisma Studio.</p>
              <a
                href="https://www.prisma.io/docs/concepts/components/prisma-studio"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-sm"
              >
                Open Studio
              </a>
            </Card>
            <Card hover>
              <h3 className="mb-3">Analytics</h3>
              <p className="text-secondary text-sm mb-4">View platform metrics and user activity.</p>
              <Link href="/admin/analytics" className="btn btn-ghost btn-sm">
                View Analytics
              </Link>
            </Card>
          </div>
        </section>

        {/* Recent Activity */}
        <section>
          <h2 className="mb-6">Recent Enrollments</h2>
          <Card>
            <div className="grid gap-3">
              {recentEnrollments.length === 0 ? (
                <p className="text-secondary text-center py-4">No enrollments yet.</p>
              ) : (
                recentEnrollments.map((enrollment: any) => (
                  <div
                    key={enrollment.id}
                    className="flex justify-between items-center py-3 border-bottom"
                  >
                    <div>
                      <div className="font-semibold">{enrollment.user.name || enrollment.user.email}</div>
                      <div className="text-sm text-secondary">{enrollment.course.title}</div>
                    </div>
                    <div className="text-sm text-secondary">
                      {new Date(enrollment.startedAt).toLocaleDateString()}
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </section>
      </div>
    </Container>
  );
}

