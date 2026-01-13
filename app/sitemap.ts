import { MetadataRoute } from 'next';
import { getProviderSlugs } from '@/lib/data';
import { getAllPosts } from '@/lib/blog';

// Regenerar sitemap cada 1 hora
export const revalidate = 3600;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://comparadorinternet.co'; // CAMBIAR por tu dominio real
  const providerSlugs = getProviderSlugs();
  const blogPosts = getAllPosts();

  // Barrios de Bogotá
  const barrios = [
    'suba', 'kennedy', 'usaquen', 'chapinero', 'engativa', 'ciudad-bolivar',
    'teusaquillo', 'fontibon', 'puente-aranda', 'bosa', 'san-cristobal',
    'barrios-unidos', 'tunjuelito', 'rafael-uribe-uribe',
    'santa-fe', 'los-martires', 'antonio-narino', 'la-candelaria', 'usme', 'sumapaz'
  ];
  
  // Casos de uso
  const casos = ['gaming', 'teletrabajo', 'streaming'];
  
  // Velocidades
  const velocidades = ['100-megas', '200-megas', '300-megas', '500-megas', 'fibra-optica'];
  
  // Tipos de vivienda
  const viviendas = ['apartamento', 'casa', 'oficina', 'edificio'];
  
  // Soluciones
  const soluciones = ['cambiar-de-operador', 'mejorar-velocidad', 'internet-lento', 'cortes-de-internet'];
  
  // Comparativas de operadores
  const comparativas = [
    ['etb', 'claro'],
    ['etb', 'movistar'],
    ['claro', 'movistar'],
    ['claro', 'etb'],
    ['movistar', 'etb'],
    ['movistar', 'claro']
  ];

  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/guia-completa`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/asesores`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/asesor-claro-bogota`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/asesor-movistar-bogota`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/asesor-etb-bogota`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/calculadora`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/videos`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/planes`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/comparar`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/planes-claro-bogota`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/planes-movistar-bogota`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ofertas`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/contratar`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/contratar-internet-bogota`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/internet-barato-colombia`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/instalacion-internet-bogota`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/internet-bogota-cobertura`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cobertura-claro-bogota`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cobertura-movistar-bogota`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cobertura-etb-bogota`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/claro-vs-movistar-bogota`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/etb-vs-claro-bogota`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/etb-vs-movistar-bogota`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/internet-empresas-pymes`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/internet-sin-permanencia`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/internet-para-zoom-reuniones`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/internet-solo-sin-telefono`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/como-cambiar-operador-internet`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/fibra-optica-bogota`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/planes-etb-bogota`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/planes-claro-colombia`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/planes-movistar-fibra`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/internet-gaming-bogota`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/internet-edificios-bogota`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/recursos`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/herramientas`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/testimonios`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },    {
      url: `${baseUrl}/empresa`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    ...providerSlugs.map((slug) => ({
      url: `${baseUrl}/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...barrios.map((barrio) => ({
      url: `${baseUrl}/internet-${barrio}-bogota`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...casos.map((caso) => ({
      url: `${baseUrl}/mejor-internet-${caso}-bogota`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...velocidades.map((velocidad) => ({
      url: `${baseUrl}/internet-${velocidad}-bogota`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...viviendas.map((vivienda) => ({
      url: `${baseUrl}/internet-para-${vivienda}-bogota`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...soluciones.map((solucion) => ({
      url: `${baseUrl}/soluciones/${solucion}-bogota`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...comparativas.map(([op1, op2]) => ({
      url: `${baseUrl}/comparar/${op1}/${op2}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt || post.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];

  return routes;
}
