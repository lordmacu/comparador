import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://comparadorinternet.co';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/', 
          '/private/',
          '/viviendas/*',  // Bloquear rutas internas (redirigen a URLs SEO-friendly)
          '/*.ico$',
          '/*.png$',
          '/*.jpg$',
          '/*.jpeg$',
          '/*.gif$',
          '/*.svg$',
          '/*.webp$',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/', 
          '/private/',
          '/viviendas/*',
        ],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/api/', 
          '/private/',
          '/viviendas/*',
        ],
      },
      // Permitir bots de IA
      {
        userAgent: 'GPTBot', // ChatGPT
        allow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
      },
      {
        userAgent: 'Google-Extended', // Bard/Gemini
        allow: '/',
      },
      {
        userAgent: 'anthropic-ai', // Claude
        allow: '/',
      },
      {
        userAgent: 'PerplexityBot', // Perplexity
        allow: '/',
      },
    ],
    sitemap: [`${baseUrl}/sitemap.xml`, `${baseUrl}/news-sitemap.xml`],
  };
}
