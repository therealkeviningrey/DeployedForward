import { getAllMDXInFolder, getMDXBySlug, MDXFrontmatter } from './mdx';

export interface Mission extends MDXFrontmatter {
  level: string;
  duration: number;
  outcomes: string[];
}

export interface NewsPost extends MDXFrontmatter {
  date: string;
  tags: string[];
}

export interface Lesson extends MDXFrontmatter {
  duration?: number;
}

export async function getAllMissions() {
  const missions = await getAllMDXInFolder<Mission>('missions');
  return missions
    .filter((m) => m.published !== false)
    .sort((a, b) => {
      const levelOrder = { Operator: 1, Unit: 2, Battalion: 3 };
      return (levelOrder[a.level as keyof typeof levelOrder] || 99) - 
             (levelOrder[b.level as keyof typeof levelOrder] || 99);
    });
}

export async function getMissionBySlug(slug: string) {
  return await getMDXBySlug<Mission>('missions', slug);
}

export async function getAllNews() {
  const posts = await getAllMDXInFolder<NewsPost>('news');
  return posts
    .filter((p) => p.published !== false)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getNewsBySlug(slug: string) {
  return await getMDXBySlug<NewsPost>('news', slug);
}

export async function getLessonBySlug(slug: string) {
  return await getMDXBySlug<Lesson>('lessons', slug);
}

export async function generateStaticParamsForMissions() {
  const missions = await getAllMissions();
  return missions.map((mission) => ({
    slug: mission.slug,
  }));
}

export async function generateStaticParamsForNews() {
  const posts = await getAllNews();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

