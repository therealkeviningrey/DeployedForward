import { Container } from '@/components/Container';
import { Hero } from '@/components/Hero';
import { Card } from '@/components/Card';
import { Pill } from '@/components/Pill';
import { getAllNews } from '@/lib/content';
import Link from 'next/link';

export const metadata = {
  title: 'News',
  description: 'Platform updates, new missions, and operational intelligence from Deployed Forward.',
};

export default async function NewsPage() {
  const posts = await getAllNews();

  return (
    <Container>
      <Hero
        title="News"
        subtitle="Platform updates, new missions, and field reports. No hype, just what's shipping."
      />

      <section className="py-12">
        <div className="flex gap-2 mb-8">
          <Pill active>All</Pill>
          <Pill>Announcement</Pill>
          <Pill>Platform</Pill>
          <Pill>Launch</Pill>
        </div>

        <div className="grid gap-4">
          {posts.map((post) => (
            <Card key={post.slug} hover>
              <Link href={`/news/${post.slug}`} className="block">
                <div className="flex justify-between items-start gap-4 mb-3">
                  <h3>{post.title}</h3>
                  <span className="text-xs text-secondary whitespace-nowrap">{post.date}</span>
                </div>
                <p className="text-secondary mb-3">{post.summary}</p>
                <div className="flex gap-2">
                  {post.tags?.map((tag: string) => (
                    <span key={tag} className="badge">
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </Card>
          ))}
        </div>

        {posts.length === 0 && (
          <Card>
            <p className="text-secondary text-center">No news posts yet. Check back soon.</p>
          </Card>
        )}
      </section>
    </Container>
  );
}

