import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/Container';
import { Badge } from '@/components/Badge';
import { Card } from '@/components/Card';
import { Divider } from '@/components/Divider';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { JsonLd } from '@/components/JsonLd';
import { generateCourseJsonLd } from '@/lib/seo';

export async function generateStaticParams() {
  // Skip static generation at build time if no database
  if (!process.env.POSTGRES_PRISMA_URL && !process.env.DATABASE_URL) {
    return [];
  }

  try {
    const courses = await prisma.course.findMany({
      where: { published: true },
      select: { slug: true },
    });

    return courses.map((course: { slug: string }) => ({
      slug: course.slug,
    }));
  } catch (error) {
    // If tables don't exist or connection fails during build, skip static generation
    console.warn('Skipping static generation for courses:', error);
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = await prisma.course.findUnique({
    where: { slug },
  });

  if (!course) {
    return { title: 'Course Not Found' };
  }

  const ogUrl = `/api/og?title=${encodeURIComponent(course.title)}&subtitle=${encodeURIComponent(course.description)}&type=course`;

  return {
    title: course.title,
    description: course.description,
    openGraph: {
      title: course.title,
      description: course.description,
      images: [{ url: ogUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: course.title,
      description: course.description,
      images: [ogUrl],
    },
  };
}

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { userId } = auth();

  const course = await prisma.course.findUnique({
    where: { slug },
    include: {
      modules: {
        include: {
          lessons: {
            orderBy: { order: 'asc' },
          },
        },
        orderBy: { order: 'asc' },
      },
    },
  });

  if (!course) {
    notFound();
  }

  // Check if user is enrolled
  let enrollment = null;
  if (userId) {
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (user) {
      enrollment = await prisma.enrollment.findUnique({
        where: {
          userId_courseId: {
            userId: user.id,
            courseId: course.id,
          },
        },
      });
    }
  }

  const totalLessons = course.modules.reduce((acc: number, module: any) => acc + module.lessons.length, 0);
  const totalDuration = course.modules.reduce(
    (acc: number, module: any) => acc + module.lessons.reduce((sum: number, lesson: any) => sum + (lesson.duration || 0), 0),
    0
  );

  // Generate JSON-LD
  const jsonLd = generateCourseJsonLd({
    name: course.title,
    description: course.description,
    provider: {
      name: 'Deployed Forward',
      url: 'https://deployedforward.com',
    },
    educationalLevel: course.level,
    timeRequired: `PT${totalDuration}M`,
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <Container>
        <div className="py-12">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4rem' }}>
            {/* Main Content */}
            <div style={{ gridColumn: '1', maxWidth: '800px' }}>
              {/* Header */}
              <header className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="orange">{course.level}</Badge>
                  <span className="text-sm text-secondary">
                    {totalLessons} lessons • {totalDuration} min
                  </span>
                </div>
                <h1 className="mb-4">{course.title}</h1>
                <p className="text-lg text-secondary">{course.description}</p>
              </header>

              {/* Section 1: What You'll Achieve (Outcome) */}
              <section className="mb-12">
                <h2 className="mb-6">What You'll Achieve</h2>
                <Card>
                  <div className="grid gap-4">
                    <div>
                      <h3 className="text-lg mb-2">✓ Build Real Projects</h3>
                      <p className="text-secondary">
                        Deploy working applications you can showcase in your portfolio. Every lesson produces tangible results.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg mb-2">✓ Master AI Tools</h3>
                      <p className="text-secondary">
                        Learn ChatGPT, Claude, and Cursor with hands-on practice. Skip theory, focus on shipping.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg mb-2">✓ Accelerate Your Career</h3>
                      <p className="text-secondary">
                        Stand out in your role by building solutions while others are still watching tutorials.
                      </p>
                    </div>
                  </div>
                </Card>
              </section>

              {/* Section 2: Course Syllabus */}
              <section className="mb-12">
                <h2 className="mb-6">Course Syllabus</h2>
                <div className="grid gap-4">
                  {course.modules.map((module: any, index: number) => (
                    <Card key={module.id}>
                      <div className="flex items-start gap-4">
                        <div
                          className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                          style={{
                            background: 'rgba(255, 107, 0, 0.1)',
                            border: '1px solid rgba(255, 107, 0, 0.3)',
                          }}
                        >
                          <span className="font-bold text-sm" style={{ color: 'var(--accent)' }}>
                            {index + 1}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h3 className="mb-3">{module.title}</h3>
                          <ul className="flex flex-col gap-2">
                            {module.lessons.map((lesson: any) => (
                              <li key={lesson.id} className="flex justify-between items-center text-sm">
                                <span className="text-secondary">→ {lesson.title}</span>
                                <span className="text-xs text-secondary">{lesson.duration} min</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Section 3: FAQ */}
              <section className="mb-12">
                <h2 className="mb-6">Frequently Asked Questions</h2>
                <div className="grid gap-4">
                  <Card>
                    <h3 className="text-lg mb-2">Do I need coding experience?</h3>
                    <p className="text-secondary">
                      No! This course teaches you to build with AI tools. No traditional programming knowledge required.
                    </p>
                  </Card>
                  <Card>
                    <h3 className="text-lg mb-2">How long does it take to complete?</h3>
                    <p className="text-secondary">
                      Most students finish in 2-4 weeks at 5 hours/week. All courses are self-paced with lifetime access.
                    </p>
                  </Card>
                  <Card>
                    <h3 className="text-lg mb-2">What if I get stuck?</h3>
                    <p className="text-secondary">
                      Access our community forum and get help from instructors and fellow learners. Most questions answered within 24 hours.
                    </p>
                  </Card>
                </div>
              </section>
            </div>

            {/* Sticky Sidebar (Desktop only) */}
            <aside
              style={{
                display: 'none',
                position: 'sticky',
                top: '100px',
                height: 'fit-content',
                gridColumn: '2',
              }}
              className="desktop-sidebar"
            >
              <Card>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div>
                    <h3 className="text-xl mb-2">{course.title}</h3>
                    <p className="text-sm text-secondary mb-4">
                      {totalLessons} lessons • {totalDuration} min
                    </p>
                  </div>

                  <div
                    style={{
                      padding: '1rem',
                      background: 'rgba(255, 107, 0, 0.1)',
                      border: '1px solid rgba(255, 107, 0, 0.3)',
                      borderRadius: '8px',
                    }}
                  >
                    <div className="text-sm text-secondary mb-1">Founding Price</div>
                    <div className="text-2xl font-bold" style={{ color: 'var(--accent)' }}>
                      $19/mo
                    </div>
                    <div className="text-xs text-secondary mt-1">Locks forever • First 100 only</div>
                  </div>

                  {enrollment ? (
                    <Link
                      href={`/courses/${course.slug}/lessons/${course.modules[0]?.lessons[0]?.slug}`}
                      className="btn btn-primary btn-lg w-full"
                    >
                      Continue Learning
                    </Link>
                  ) : (
                    <form action="/api/enroll" method="POST">
                      <input type="hidden" name="courseId" value={course.id} />
                      <button type="submit" className="btn btn-primary btn-lg w-full">
                        Enroll Now
                      </button>
                    </form>
                  )}

                  <div className="text-xs text-secondary" style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <span>✓</span>
                      <span>Lifetime access</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <span>✓</span>
                      <span>Certificate on completion</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span>✓</span>
                      <span>30-day money-back guarantee</span>
                    </div>
                  </div>
                </div>
              </Card>
            </aside>
          </div>

          {/* Mobile CTA (Bottom sticky) */}
          <div
            className="mobile-cta"
            style={{
              display: 'block',
              position: 'fixed',
              bottom: '0',
              left: '0',
              right: '0',
              padding: '1rem',
              background: 'var(--bg-secondary)',
              borderTop: '1px solid var(--border-subtle)',
              zIndex: '100',
            }}
          >
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
              {enrollment ? (
                <Link
                  href={`/courses/${course.slug}/lessons/${course.modules[0]?.lessons[0]?.slug}`}
                  className="btn btn-primary btn-lg w-full"
                >
                  Continue Learning
                </Link>
              ) : (
                <form action="/api/enroll" method="POST">
                  <input type="hidden" name="courseId" value={course.id} />
                  <button type="submit" className="btn btn-primary btn-lg w-full">
                    Enroll Now – $19/mo
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        <style jsx>{`
          @media (min-width: 1024px) {
            div[style*="gridTemplateColumns"] {
              grid-template-columns: 1fr 350px !important;
            }
            .desktop-sidebar {
              display: block !important;
            }
            .mobile-cta {
              display: none !important;
            }
          }
          .w-full {
            width: 100%;
          }
        `}</style>
      </Container>
    </>
  );
}

