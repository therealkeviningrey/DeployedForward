import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/Container';
import { Prose } from '@/components/Prose';
import { getNewsBySlug, generateStaticParamsForNews } from '@/lib/content';

export async function generateStaticParams() {
  return await generateStaticParamsForNews();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getNewsBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.summary || 'Read the latest from Deployed Forward.',
  };
}

export default async function NewsPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getNewsBySlug(slug);

  if (!post) {
    notFound();
  }

  const { frontmatter, content } = post;

  return (
    <Container size="narrow">
      <article className="py-12">
        <header className="mb-8">
          <div className="flex gap-2 mb-4">
            {frontmatter.tags?.map((tag: string) => (
              <span key={tag} className="badge">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="mb-4">{frontmatter.title}</h1>
          <time className="text-sm text-secondary">{frontmatter.date}</time>
        </header>

        <Prose>{content}</Prose>

        <footer className="mt-12 pt-8 border-top">
          <Link href="/news" className="text-accent">
            ← Back to News
          </Link>
        </footer>
      </article>
    </Container>
  );
}

