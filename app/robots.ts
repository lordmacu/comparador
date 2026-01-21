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
          '/blog?*',  // Bloquear páginas de blog con filtros de categoría
          '/?q=*',    // Bloquear búsquedas con parámetros
          '/viviendas/*',  // Bloquear rutas antiguas de viviendas
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
          '/blog?*',  // Bloquear páginas de blog con query params (category filters)
          '/?q=*',    // Bloquear búsquedas con parámetros
          '/viviendas/edificio',  // Bloquear ruta antigua, canonical apunta a /internet-para-edificio-bogota
        ],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/api/', 
          '/private/',
          '/blog?*',
          '/?q=*',
          '/viviendas/edificio',
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
