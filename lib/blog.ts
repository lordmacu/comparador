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
  thumbnailImage?: string;
  // Campos opcionales generados por Gemini AI
  localNuances?: string[];
  seoScore?: number;
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

// Función para obtener todos los slugs disponibles dinámicamente
function getAllAvailableSlugs(): string[] {
  try {
    const blogDir = path.join(process.cwd(), 'content', 'blog');
    const files = fs.readdirSync(blogDir);
    
    // Filtrar solo archivos .json y remover la extensión
    return files
      .filter(file => file.endsWith('.json'))
      .map(file => file.replace('.json', ''));
  } catch (error) {
    console.error('Error reading blog directory:', error);
    return [];
  }
}

// Función para cargar todos los posts (ejecutada cada vez que se necesite)
function loadAllPosts(): BlogPost[] {
  return getAllAvailableSlugs()
    .map(slug => loadPostFromJSON(slug))
    .filter((post): post is BlogPost => post !== null);
}

export function getAllPosts(): BlogPost[] {
  const posts = loadAllPosts();
  return posts.sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return loadPostFromJSON(slug) || undefined;
}

export function getPostsByCategory(category: string): BlogPost[] {
  const posts = loadAllPosts();
  return posts.filter(post => post.category === category);
}

export function getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
  const currentPost = getPostBySlug(currentSlug);
  if (!currentPost) return [];

  const posts = loadAllPosts();
  return posts
    .filter(post =>
      post.slug !== currentSlug &&
      (post.category === currentPost.category ||
       post.tags.some(tag => currentPost.tags.includes(tag)))
    )
    .slice(0, limit);
}

export function getAllCategories(): string[] {
  const posts = loadAllPosts();
  return Array.from(new Set(posts.map(post => post.category)));
}

export function getAllTags(): string[] {
  const posts = loadAllPosts();
  const tags = posts.flatMap(post => post.tags);
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
