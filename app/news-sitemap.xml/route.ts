import { getAllPosts } from '@/lib/blog';

const baseUrl = 'https://comparadorinternet.co';
const publicationName = 'Comparador Internet Colombia';
const publicationLanguage = 'es';

function xmlEscape(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const now = Date.now();
  const cutoffMs = 48 * 60 * 60 * 1000;
  const cutoff = new Date(now - cutoffMs);

  const posts = getAllPosts()
    .filter((post) => new Date(post.publishedAt).getTime() >= cutoff.getTime())
    .slice(0, 1000);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
>
${posts
  .map((post) => {
    const loc = `${baseUrl}/blog/${post.slug}`;
    const publicationDate = new Date(post.publishedAt).toISOString();
    const title = xmlEscape(post.title);
    const keywords = post.tags?.length ? xmlEscape(post.tags.join(', ')) : '';

    return `  <url>
    <loc>${xmlEscape(loc)}</loc>
    <news:news>
      <news:publication>
        <news:name>${xmlEscape(publicationName)}</news:name>
        <news:language>${xmlEscape(publicationLanguage)}</news:language>
      </news:publication>
      <news:publication_date>${xmlEscape(publicationDate)}</news:publication_date>
      <news:title>${title}</news:title>
      ${keywords ? `<news:keywords>${keywords}</news:keywords>` : ''}
    </news:news>
  </url>`;
  })
  .join('\n')}
</urlset>
`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=900, s-maxage=900',
    },
  });
}

