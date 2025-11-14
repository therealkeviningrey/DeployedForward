import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/Container';
import { Badge } from '@/components/Badge';
import { Card } from '@/components/Card';
import { Divider } from '@/components/Divider';
import { prisma } from '@/lib/prisma';
import { JsonLd } from '@/components/JsonLd';
import { generateCourseJsonLd } from '@/lib/seo';
import styles from './page.module.css';
import { StickyEnrollBar } from '@/components/StickyEnrollBar';
import { CourseStorySection } from '@/components/CourseStorySection';
import { CourseTransformation } from '@/components/CourseTransformation';
import { CourseProjectPreview } from '@/components/CourseProjectPreview';
import { CourseWhyNow } from '@/components/CourseWhyNow';
import { StrikethroughPrice } from '@/components/StrikethroughPrice';
import { TrackedLink } from '@/components/TrackedLink';
import { ensureUserRecord } from '@/lib/users';
import { getAuthSession } from '@/lib/auth';

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
  const session = await getAuthSession();
  const userId = session.userId;

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
    const user = await ensureUserRecord(userId);
    enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: course.id,
        },
      },
    });
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

  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://deployedforward.com/' },
      { '@type': 'ListItem', position: 2, name: 'Courses', item: 'https://deployedforward.com/courses' },
      { '@type': 'ListItem', position: 3, name: course.title, item: `https://deployedforward.com/courses/${course.slug}` },
    ],
  } as const;

  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonLd data={breadcrumbs as any} />
      <Container>
        <div className="py-12">
          <div className={styles.layout}>
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

              {/* Section 1: Story - The Problem */}
              <CourseStorySection
                story={`
                  <p>It was <em>just a few months ago</em> when building with AI felt like trying to assemble IKEA furniture without instructions. You'd watch tutorials, copy prompts, and somehow end up with something that <strong>almost</strong> worked.</p>
                  
                  <p>The problem? Most courses teach you to be a <em>prompt copier</em>. They give you templates and hope you figure out the rest. But when your project doesn't match their example? You're stuck.</p>
                  
                  <p><strong>This course is different.</strong> Instead of templates, you'll learn the patterns that make AI tools actually useful. The kind of patterns that let you build anything, not just follow along with demos.</p>
                `}
              />
              
              {/* CTA after story */}
              <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <TrackedLink
                  href="/pricing"
                  className="btn btn-primary btn-lg"
                  label={`Course ${course.slug} - Story CTA`}
                  location={`Course Page - ${course.slug}`}
                >
                  Start Building Today
                </TrackedLink>
              </div>

              {/* Section 2: Transformation - Before vs After */}
              <CourseTransformation
                before={[
                  {
                    title: 'Copying prompts from tutorials',
                    description: 'Following along but not understanding why it works',
                  },
                  {
                    title: 'Stuck when projects don\'t match examples',
                    description: 'No idea how to adapt what you learned to your actual work',
                  },
                  {
                    title: 'Hours watching, nothing shipping',
                    description: 'Lots of notes, zero deployed projects',
                  },
                ]}
                after={[
                  {
                    title: 'Building from scratch with confidence',
                    description: 'Understanding the patterns that make any AI tool work',
                    metric: '3 hours to first deploy',
                  },
                  {
                    title: 'Adapting techniques to any project',
                    description: 'Using the same patterns across different tools and use cases',
                    metric: '10x faster iteration',
                  },
                  {
                    title: 'Portfolio of working products',
                    description: 'Real applications you can demo in interviews and show to clients',
                    metric: `${totalLessons} completed projects`,
                  },
                ]}
              />
              
              {/* CTA after transformation */}
              <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <TrackedLink
                  href="/pricing"
                  className="btn btn-primary btn-lg"
                  label={`Course ${course.slug} - Transformation CTA`}
                  location={`Course Page - ${course.slug}`}
                >
                  Enroll Now – $19/mo
                </TrackedLink>
              </div>

              {/* Section 3: Course Syllabus with Project Previews */}
              <section className="mb-12">
                <h2 className="mb-6">What You'll Build</h2>
                <div className="grid gap-6">
                  {course.modules.map((module: any, index: number) => (
                    <div key={module.id}>
                      <Card>
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
                            <ul className="flex flex-col gap-2 mb-4">
                              {module.lessons.map((lesson: any) => (
                                <li key={lesson.id} className="flex justify-between items-center text-sm">
                                  <span className="text-secondary">→ {lesson.title}</span>
                                  <span className="text-xs text-secondary">{lesson.duration} min</span>
                                </li>
                              ))}
                            </ul>
                            
                            {/* Project Preview for each module */}
                            <CourseProjectPreview
                              title={`Module ${index + 1} Project`}
                              description={`Apply what you learned by building a real-world project. This module's project focuses on practical application of the concepts covered in the lessons above.`}
                              technologies={['AI Tools', 'Production Deploy']}
                              estimatedTime={`${module.lessons.reduce((sum: number, l: any) => sum + (l.duration || 0), 0)} min`}
                              deliverable="Working application ready for your portfolio"
                            />
                          </div>
                        </div>
                      </Card>
                    </div>
                  ))}
                </div>
              </section>
              
              {/* CTA after syllabus */}
              <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <TrackedLink
                  href="/pricing"
                  className="btn btn-primary btn-lg"
                  label={`Course ${course.slug} - Syllabus CTA`}
                  location={`Course Page - ${course.slug}`}
                >
                  Get Full Access – $19/mo
                </TrackedLink>
              </div>

              {/* Section 4: Why Learn This Now */}
              <CourseWhyNow
                points={[
                  {
                    icon: (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                      </svg>
                    ),
                    title: 'AI is reshaping every role',
                    stat: '75% of jobs',
                    description: 'Will be augmented by AI by 2025. Those who can build with AI will lead their teams.',
                  },
                  {
                    icon: (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                      </svg>
                    ),
                    title: 'Higher earning potential',
                    stat: '+32% salary',
                    description: 'Professionals with AI skills earn significantly more than their peers in the same role.',
                  },
                  {
                    icon: (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <path d="M22 4L12 14.01l-3-3" />
                      </svg>
                    ),
                    title: 'Early mover advantage',
                    stat: 'Right now',
                    description: 'The best time to build AI skills was a year ago. The second best time is today.',
                  },
                ]}
                closingStatement="This course gives you production-ready skills, not theoretical knowledge. You'll ship real projects that prove you can build with AI, not just talk about it."
              />
              
              {/* Section 5: FAQ */}
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
                  <Card>
                    <h3 className="text-lg mb-2">Is there a money-back guarantee?</h3>
                    <p className="text-secondary">
                      Yes! 30-day money-back guarantee. If you complete 3 lessons and haven't shipped a working project, we'll refund you in full.
                    </p>
                  </Card>
                </div>
              </section>
              
              {/* Final CTA */}
              <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <Card>
                  <div style={{ padding: '2rem', textAlign: 'center' }}>
                    <h3 style={{ marginBottom: '1rem' }}>Ready to Start Building?</h3>
                    <p className="text-secondary" style={{ marginBottom: '2rem', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
                      Join the first 100 founding operators and lock in $19/mo pricing for life. 
                      Everyone after pays $29/mo.
                    </p>
                    <TrackedLink
                      href="/pricing"
                      className="btn btn-primary btn-lg"
                      label={`Course ${course.slug} - Final CTA`}
                      location={`Course Page - ${course.slug}`}
                    >
                      Claim Your $19 Seat
                    </TrackedLink>
                  </div>
                </Card>
              </div>
            </div>

            {/* Sticky Sidebar (Desktop only) */}
            <aside className={styles.desktopSidebar}>
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
                    <div className="text-sm text-secondary mb-2">Founding Price</div>
                    <StrikethroughPrice
                      originalPrice={29}
                      discountedPrice={19}
                      period="mo"
                      size="lg"
                      showSavings={false}
                    />
                    <div className="text-xs text-secondary mt-2">Locks forever • First 100 only</div>
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
                      <button type="submit" className={`btn btn-primary btn-lg ${styles.fullWidth}`}>
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <span>✓</span>
                      <span>Community access</span>
                    </div>
                  </div>
                  
                  {/* Guarantee Badge */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem',
                    background: 'rgba(255, 107, 0, 0.05)',
                    border: '1px solid rgba(255, 107, 0, 0.2)',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    color: 'var(--text-secondary)',
                  }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ color: 'var(--accent)', flexShrink: 0 }}>
                      <path
                        d="M8 1L10.5 5.5L15.5 6.5L12 10.5L12.5 15.5L8 13.5L3.5 15.5L4 10.5L0.5 6.5L5.5 5.5L8 1Z"
                        fill="currentColor"
                      />
                    </svg>
                    <span>30-day money-back guarantee</span>
                  </div>
                </div>
              </Card>
            </aside>
          </div>

          {/* Mobile CTA (Bottom sticky) */}
          <div className={styles.mobileCta}>
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
              {enrollment ? (
                <Link
                  href={`/courses/${course.slug}/lessons/${course.modules[0]?.lessons[0]?.slug}`}
                  className={`btn btn-primary btn-lg ${styles.fullWidth}`}
                >
                  Continue Learning
                </Link>
              ) : (
                <form action="/api/enroll" method="POST">
                  <input type="hidden" name="courseId" value={course.id} />
                  <button type="submit" className={`btn btn-primary btn-lg ${styles.fullWidth}`}>
                    Enroll Now – $19/mo
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
      <StickyEnrollBar 
        title={course.title}
        courseSlug={course.slug}
        courseId={course.id}
        enrolled={!!enrollment}
        firstLessonSlug={course.modules[0]?.lessons[0]?.slug}
      />
    </>
  );
}
