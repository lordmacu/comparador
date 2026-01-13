import { getAllPosts } from '@/lib/blog';

function escapeCdata(value: string): string {
  return value.replaceAll(']]>', ']]]]><![CDATA[>');
}

export async function GET() {
  const posts = getAllPosts().slice(0, 50);
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
      <title><![CDATA[${escapeCdata(post.title)}]]></title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <description><![CDATA[${escapeCdata(post.description)}]]></description>
      <content:encoded><![CDATA[${escapeCdata(post.content.replace(/\n/g, '<br/>'))}]]></content:encoded>
      <author>noreply@comparadorinternet.co (${post.author})</author>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <category><![CDATA[${escapeCdata(post.category)}]]></category>
      ${post.tags.map(tag => `<category><![CDATA[${escapeCdata(tag)}]]></category>`).join('\n      ')}
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
