import { MetadataRoute } from 'next';
import { getAllMissions, getAllNews } from '@/lib/content';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://deployedforward.com';

  const missions = await getAllMissions();
  const news = await getAllNews();

  const staticRoutes = [
    '',
    '/product',
    '/programs',
    '/programs/briefs',
    '/programs/missions',
    '/programs/campaigns',
    '/pricing',
    '/company',
    '/news',
    '/docs',
    '/login',
    '/legal/privacy',
    '/legal/terms',
    '/changelog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const missionRoutes = missions.map((mission) => ({
    url: `${baseUrl}/programs/missions/${mission.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const newsRoutes = news.map((post) => ({
    url: `${baseUrl}/news/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...missionRoutes, ...newsRoutes];
}

