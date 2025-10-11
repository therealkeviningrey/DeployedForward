import { compileMDX } from 'next-mdx-remote/rsc';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { readFile } from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

export interface MDXFrontmatter {
  title: string;
  slug: string;
  date?: string;
  summary?: string;
  tags?: string[];
  level?: string;
  duration?: number;
  outcomes?: string[];
  published?: boolean;
}

export async function compileMDXContent<T = MDXFrontmatter>(source: string) {
  return await compileMDX<T>({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: 'wrap',
              properties: {
                className: ['heading-link'],
              },
            },
          ],
        ],
      },
    },
  });
}

export async function getMDXBySlug<T = MDXFrontmatter>(
  folder: 'missions' | 'news' | 'lessons',
  slug: string
): Promise<{ frontmatter: T; content: any } | null> {
  try {
    const filePath = path.join(process.cwd(), 'content', folder, `${slug}.mdx`);
    const source = await readFile(filePath, 'utf-8');
    const { content, frontmatter } = await compileMDXContent<T>(source);
    return { frontmatter, content };
  } catch (error) {
    console.error(`Error loading MDX file: ${folder}/${slug}`, error);
    return null;
  }
}

export async function getAllMDXInFolder<T = MDXFrontmatter>(
  folder: 'missions' | 'news' | 'lessons'
): Promise<T[]> {
  try {
    const fs = require('fs');
    const folderPath = path.join(process.cwd(), 'content', folder);
    
    if (!fs.existsSync(folderPath)) {
      return [];
    }

    const files = fs.readdirSync(folderPath).filter((file: string) => file.endsWith('.mdx'));
    
    const items = await Promise.all(
      files.map(async (file: string) => {
        const filePath = path.join(folderPath, file);
        const source = fs.readFileSync(filePath, 'utf-8');
        const { data } = matter(source);
        return data as T;
      })
    );

    return items.filter((item): item is T => item !== null);
  } catch (error) {
    console.error(`Error reading MDX folder: ${folder}`, error);
    return [];
  }
}

