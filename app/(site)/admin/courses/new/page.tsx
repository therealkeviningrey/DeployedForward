import { redirect } from 'next/navigation';
import { Container } from '@/components/Container';
import { Card } from '@/components/Card';
import { getAuthSession, assertRole } from '@/lib/auth';
import Link from 'next/link';

export const metadata = {
  title: 'Create Course',
  description: 'Create a new course.',
};

export default async function NewCoursePage() {
  const session = await getAuthSession();
  if (!session.isAuthenticated || !session.userId) {
    redirect('/login');
  }

  let authorized = true;
  try {
    await assertRole('org:admin');
  } catch {
    try {
      await assertRole('admin');
    } catch {
      authorized = false;
    }
  }

  if (!authorized) {
    redirect('/dashboard');
  }

  return (
    <Container size="narrow">
      <div className="py-12">
        <div className="mb-8">
          <Link href="/admin/courses" className="text-accent text-sm mb-4 inline-block">
            ← Back to Courses
          </Link>
          <h1>Create Course</h1>
        </div>

        <Card>
          <form action="/api/admin/courses" method="POST" className="grid gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-semibold mb-2">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                className="w-full px-4 py-3 bg-primary border-hair rounded"
                placeholder="AI Workflow Fundamentals"
              />
            </div>

            <div>
              <label htmlFor="slug" className="block text-sm font-semibold mb-2">
                Slug *
              </label>
              <input
                type="text"
                id="slug"
                name="slug"
                required
                className="w-full px-4 py-3 bg-primary border-hair rounded"
                placeholder="ai-workflow-fundamentals"
              />
              <p className="text-xs text-secondary mt-1">
                URL-friendly identifier (lowercase, hyphens only)
              </p>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-semibold mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={4}
                className="w-full px-4 py-3 bg-primary border-hair rounded"
                placeholder="Master the core patterns of AI-enhanced development..."
              />
            </div>

            <div>
              <label htmlFor="level" className="block text-sm font-semibold mb-2">
                Level *
              </label>
              <select
                id="level"
                name="level"
                required
                className="w-full px-4 py-3 bg-primary border-hair rounded"
              >
                <option value="Operator">Operator</option>
                <option value="Unit">Unit</option>
                <option value="Battalion">Battalion</option>
              </select>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="published"
                name="published"
                className="w-5 h-5"
              />
              <label htmlFor="published" className="text-sm">
                Publish immediately
              </label>
            </div>

            <div className="flex gap-3 pt-4">
              <button type="submit" className="btn btn-primary">
                Create Course
              </button>
              <Link href="/admin/courses" className="btn btn-ghost">
                Cancel
              </Link>
            </div>
          </form>

          <div className="mt-8 pt-8 border-top">
            <h3 className="text-sm font-semibold mb-3">Note:</h3>
            <p className="text-sm text-secondary">
              After creating the course, use <strong>Prisma Studio</strong> to add modules, lessons, and assessments:
            </p>
            <pre className="mt-3 p-3 bg-primary rounded text-xs">
              npm run db:studio
            </pre>
            <p className="text-sm text-secondary mt-3">
              Full admin CMS coming soon. For now, Prisma Studio provides direct database access with a visual interface.
            </p>
          </div>
        </Card>
      </div>
    </Container>
  );
}

