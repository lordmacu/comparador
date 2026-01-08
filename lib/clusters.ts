// Content Clusters Configuration for SEO
export interface ClusterPage {
  slug: string;
  title: string;
  description: string;
  icon?: string;
}

export interface ContentCluster {
  id: string;
  pillarPage: {
    url: string;
    title: string;
    description: string;
  };
  clusterPages: ClusterPage[];
}

export const contentClusters: ContentCluster[] = [
  {
    id: 'proveedores',
    pillarPage: {
      url: '/guia-completa#operadores',
      title: 'Guía de Proveedores de Internet en Bogotá',
      description: 'Comparación completa de operadores: ETB, Claro y Movistar'
    },
    clusterPages: [
      { slug: '/etb', title: 'Internet ETB', description: 'Planes, cobertura y beneficios ETB', icon: '🔵' },
      { slug: '/claro', title: 'Internet Claro', description: 'Planes, cobertura y beneficios Claro', icon: '🔴' },
      { slug: '/movistar', title: 'Internet Movistar', description: 'Planes, cobertura y beneficios Movistar', icon: '🟢' },
      { slug: '/comparar/etb/claro', title: 'ETB vs Claro', description: 'Comparación directa ETB vs Claro' },
      { slug: '/comparar/etb/movistar', title: 'ETB vs Movistar', description: 'Comparación directa ETB vs Movistar' },
      { slug: '/comparar/claro/movistar', title: 'Claro vs Movistar', description: 'Comparación directa Claro vs Movistar' },
      { slug: '/planes', title: 'Todos los Planes', description: 'Comparador de todos los planes disponibles' }
    ]
  },
  {
    id: 'velocidades',
    pillarPage: {
      url: '/guia-completa#velocidades',
      title: 'Guía de Velocidades de Internet',
      description: 'Velocidades disponibles y cuál necesitas según tu uso'
    },
    clusterPages: [
      { slug: '/velocidades/100-megas', title: 'Internet 100 Mbps', description: 'Ideal para 2-3 personas', icon: '⚡' },
      { slug: '/velocidades/200-megas', title: 'Internet 200 Mbps', description: 'Ideal para 3-4 personas', icon: '⚡⚡' },
      { slug: '/velocidades/300-megas', title: 'Internet 300 Mbps', description: 'Ideal para 4-5 personas', icon: '⚡⚡⚡' },
      { slug: '/velocidades/500-megas', title: 'Internet 500 Mbps', description: 'Ideal para 5+ personas', icon: '🚀' },
      { slug: '/velocidades/fibra-optica', title: 'Fibra Óptica', description: 'Tecnología más avanzada y rápida', icon: '💎' }
    ]
  },
  {
    id: 'ubicaciones',
    pillarPage: {
      url: '/guia-completa#barrios',
      title: 'Cobertura de Internet por Ubicación',
      description: 'Disponibilidad y operadores en cada barrio de Bogotá'
    },
    clusterPages: [
      { slug: '/barrios/suba', title: 'Internet en Suba', description: 'Cobertura y planes en Suba', icon: '📍' },
      { slug: '/barrios/kennedy', title: 'Internet en Kennedy', description: 'Cobertura y planes en Kennedy', icon: '📍' },
      { slug: '/barrios/usaquen', title: 'Internet en Usaquén', description: 'Cobertura y planes en Usaquén', icon: '📍' },
      { slug: '/barrios/chapinero', title: 'Internet en Chapinero', description: 'Cobertura y planes en Chapinero', icon: '📍' },
      { slug: '/barrios/engativa', title: 'Internet en Engativá', description: 'Cobertura y planes en Engativá', icon: '📍' },
      { slug: '/barrios/ciudad-bolivar', title: 'Internet en Ciudad Bolívar', description: 'Cobertura y planes en Ciudad Bolívar', icon: '📍' },
      { slug: '/barrios/teusaquillo', title: 'Internet en Teusaquillo', description: 'Cobertura y planes en Teusaquillo', icon: '📍' },
      { slug: '/barrios/fontibon', title: 'Internet en Fontibón', description: 'Cobertura y planes en Fontibón', icon: '📍' },
      { slug: '/barrios/puente-aranda', title: 'Internet en Puente Aranda', description: 'Cobertura y planes en Puente Aranda', icon: '📍' },
      { slug: '/barrios/bosa', title: 'Internet en Bosa', description: 'Cobertura y planes en Bosa', icon: '📍' },
      { slug: '/barrios/san-cristobal', title: 'Internet en San Cristóbal', description: 'Cobertura y planes en San Cristóbal', icon: '📍' },
      { slug: '/barrios/barrios-unidos', title: 'Internet en Barrios Unidos', description: 'Cobertura y planes en Barrios Unidos', icon: '📍' },
      { slug: '/barrios/tunjuelito', title: 'Internet en Tunjuelito', description: 'Cobertura y planes en Tunjuelito', icon: '📍' },
      { slug: '/barrios/rafael-uribe-uribe', title: 'Internet en Rafael Uribe Uribe', description: 'Cobertura y planes en Rafael Uribe Uribe', icon: '📍' }
    ]
  },
  {
    id: 'casos-uso',
    pillarPage: {
      url: '/guia-completa#casos-uso',
      title: 'Internet para Casos de Uso Específicos',
      description: 'Encuentra el mejor internet según tu necesidad'
    },
    clusterPages: [
      { slug: '/casos/gaming', title: 'Internet para Gaming', description: 'Baja latencia para juegos online', icon: '🎮' },
      { slug: '/casos/teletrabajo', title: 'Internet para Teletrabajo', description: 'Videoconferencias estables', icon: '💼' },
      { slug: '/casos/streaming', title: 'Internet para Streaming', description: '4K sin buffering', icon: '📺' }
    ]
  },
  {
    id: 'viviendas',
    pillarPage: {
      url: '/guia-completa#viviendas',
      title: 'Internet según Tipo de Vivienda',
      description: 'Soluciones adaptadas a tu espacio'
    },
    clusterPages: [
      { slug: '/viviendas/apartamento', title: 'Internet para Apartamento', description: 'Soluciones para espacios reducidos', icon: '🏢' },
      { slug: '/viviendas/casa', title: 'Internet para Casa', description: 'Cobertura para casas grandes', icon: '🏠' },
      { slug: '/viviendas/oficina', title: 'Internet para Oficina', description: 'Soluciones corporativas', icon: '🏛️' },
      { slug: '/viviendas/edificio', title: 'Internet para Edificio', description: 'Conexión para edificios completos', icon: '🏗️' }
    ]
  },
  {
    id: 'soluciones',
    pillarPage: {
      url: '/guia-completa#soluciones',
      title: 'Soluciones a Problemas de Internet',
      description: 'Resuelve los problemas más comunes'
    },
    clusterPages: [
      { slug: '/soluciones/cambiar-de-operador', title: 'Cambiar de Operador', description: 'Proceso y recomendaciones', icon: '🔄' },
      { slug: '/soluciones/mejorar-velocidad', title: 'Mejorar Velocidad', description: 'Optimiza tu conexión actual', icon: '⚡' },
      { slug: '/soluciones/internet-lento', title: 'Internet Lento', description: 'Diagnóstico y soluciones', icon: '🐌' },
      { slug: '/soluciones/cortes-de-internet', title: 'Cortes de Internet', description: 'Evita desconexiones', icon: '⚠️' }
    ]
  }
];

/**
 * Get cluster information for a specific page
 */
export function getClusterForPage(currentPath: string): ContentCluster | null {
  // Remove query params and trailing slash
  const cleanPath = currentPath.split('?')[0].replace(/\/$/, '');
  
  for (const cluster of contentClusters) {
    // Check if current page is the pillar page
    if (cluster.pillarPage.url.split('#')[0] === cleanPath) {
      return cluster;
    }
    
    // Check if current page is in cluster pages
    const isInCluster = cluster.clusterPages.some(page => page.slug === cleanPath);
    if (isInCluster) {
      return cluster;
    }
  }
  
  return null;
}

/**
 * Get related pages within the same cluster (excluding current page)
 */
export function getRelatedClusterPages(currentPath: string, limit: number = 6): ClusterPage[] {
  const cluster = getClusterForPage(currentPath);
  if (!cluster) return [];
  
  const cleanPath = currentPath.split('?')[0].replace(/\/$/, '');
  
  // Filter out current page
  return cluster.clusterPages
    .filter(page => page.slug !== cleanPath)
    .slice(0, limit);
}

/**
 * Get pillar page for current cluster
 */
export function getPillarPage(currentPath: string) {
  const cluster = getClusterForPage(currentPath);
  return cluster?.pillarPage || null;
}

/**
 * Check if current page is a pillar page
 */
export function isPillarPage(currentPath: string): boolean {
  const cleanPath = currentPath.split('?')[0].replace(/\/$/, '');
  return contentClusters.some(cluster => 
    cluster.pillarPage.url.split('#')[0] === cleanPath
  );
}
