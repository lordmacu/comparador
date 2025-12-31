import { getAllPosts } from '@/lib/blog';

export async function GET() {
  const posts = getAllPosts();
  const baseUrl = 'https://comparadorinternet.co';

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Blog de Internet Colombia - Comparador Internet</title>
    <link>${baseUrl}/blog</link>
    <description>Guías, consejos y análisis sobre internet en Colombia. Aprende a optimizar tu conexión y elegir el mejor proveedor.</description>
    <language>es-CO</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/blog/feed.xml" rel="self" type="application/rss+xml"/>
    ${posts
      .map(
        (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <description><![CDATA[${post.description}]]></description>
      <content:encoded><![CDATA[${post.content.replace(/\n/g, '<br/>')}]]></content:encoded>
      <author>noreply@comparadorinternet.co (${post.author})</author>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <category>${post.category}</category>
      ${post.tags.map(tag => `<category>${tag}</category>`).join('\n      ')}
    </item>`
      )
      .join('')}
  </channel>
</rss>`;

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
