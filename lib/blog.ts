import fs from 'fs';
import path from 'path';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  category: string;
  tags: string[];
  readingTime: number;
  image?: string;
}

// Función para cargar un post desde JSON
function loadPostFromJSON(slug: string): BlogPost | null {
  try {
    const filePath = path.join(process.cwd(), 'content', 'blog', `${slug}.json`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error);
    return null;
  }
}

// Lista de slugs de posts disponibles
const availableSlugs = [
  'como-mejorar-velocidad-internet-casa',
  'mejor-internet-gaming-colombia',
  'fibra-optica-vs-cable-colombia',
  'como-conseguir-internet-gratis-colombia',
  'mejores-proveedores-internet-bogota',
  'como-saber-si-hay-fibra-optica-en-tu-direccion-bogota',
  'internet-para-teletrabajo-bogota',
  'checklist-para-contratar-internet-en-bogota',
  'internet-barato-en-bogota',
  'internet-para-apartamento-bogota',
  'instalacion-internet-bogota',
  'como-bajar-el-ping-en-bogota',
  'claro-vs-movistar-vs-etb-bogota',
  'movistar-vs-claro-vs-etb-bogota',
  'etb-vs-movistar-vs-claro-bogota',
];

// Cargar todos los posts
export const blogPosts: BlogPost[] = availableSlugs
  .map(slug => loadPostFromJSON(slug))
  .filter((post): post is BlogPost => post !== null);

export function getAllPosts(): BlogPost[] {
  return blogPosts.sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter(post => post.category === category);
}

export function getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
  const currentPost = getPostBySlug(currentSlug);
  if (!currentPost) return [];

  return blogPosts
    .filter(post =>
      post.slug !== currentSlug &&
      (post.category === currentPost.category ||
       post.tags.some(tag => currentPost.tags.includes(tag)))
    )
    .slice(0, limit);
}

export function getAllCategories(): string[] {
  return Array.from(new Set(blogPosts.map(post => post.category)));
}

export function getAllTags(): string[] {
  const tags = blogPosts.flatMap(post => post.tags);
  return Array.from(new Set(tags));
}

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export function getPostsForProvider(provider: string, limit = 3): BlogPost[] {
  const normalizedProviderRaw = normalizeText(provider);
  const stopwords = new Set(['colombia', 'internet', 'hogar', 'bogota', 'bogotá']);
  const tokens = normalizedProviderRaw
    .split(/[^a-z0-9]+/g)
    .map((t) => t.trim())
    .filter(Boolean)
    .filter((t) => !stopwords.has(t));

  const normalizedProvider = tokens[0] || normalizedProviderRaw;
  const all = getAllPosts();

  const byTag = all.filter((post) =>
    post.tags.some((tag) => normalizeText(tag) === normalizedProvider)
  );

  const byLooseMatch = all.filter((post) => {
    const haystack = normalizeText(`${post.title} ${post.description} ${post.content} ${post.tags.join(' ')}`);
    return tokens.length > 0
      ? tokens.some((t) => haystack.includes(t))
      : haystack.includes(normalizedProvider);
  });

  const unique: BlogPost[] = [];
  const seen = new Set<string>();
  for (const post of [...byTag, ...byLooseMatch]) {
    if (seen.has(post.slug)) continue;
    seen.add(post.slug);
    unique.push(post);
    if (unique.length >= limit) break;
  }

  return unique;
}
