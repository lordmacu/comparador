// Content Clusters Configuration for SEO
export interface ClusterPage {
  slug: string;
  title: string;
  description: string;
  icon?: string; // Legacy emoji - will be replaced with iconName
  iconName?: string; // Lucide icon name
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
      { slug: '/etb', title: 'Internet ETB', description: 'Planes, cobertura y beneficios ETB', iconName: 'CircleDot' },
      { slug: '/claro', title: 'Internet Claro', description: 'Planes, cobertura y beneficios Claro', iconName: 'Circle' },
      { slug: '/movistar', title: 'Internet Movistar', description: 'Planes, cobertura y beneficios Movistar', iconName: 'CheckCircle' },
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
      { slug: '/velocidades/100-megas', title: 'Internet 100 Mbps', description: 'Ideal para 2-3 personas', iconName: 'Zap' },
      { slug: '/velocidades/200-megas', title: 'Internet 200 Mbps', description: 'Ideal para 3-4 personas', iconName: 'Zap' },
      { slug: '/velocidades/300-megas', title: 'Internet 300 Mbps', description: 'Ideal para 4-5 personas', iconName: 'Zap' },
      { slug: '/velocidades/500-megas', title: 'Internet 500 Mbps', description: 'Ideal para 5+ personas', iconName: 'Rocket' },
      { slug: '/velocidades/fibra-optica', title: 'Fibra Óptica', description: 'Tecnología más avanzada y rápida', iconName: 'Gem' }
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
      { slug: '/barrios/suba', title: 'Internet en Suba', description: 'Cobertura y planes en Suba', iconName: 'MapPin' },
      { slug: '/barrios/kennedy', title: 'Internet en Kennedy', description: 'Cobertura y planes en Kennedy', iconName: 'MapPin' },
      { slug: '/barrios/usaquen', title: 'Internet en Usaquén', description: 'Cobertura y planes en Usaquén', iconName: 'MapPin' },
      { slug: '/barrios/chapinero', title: 'Internet en Chapinero', description: 'Cobertura y planes en Chapinero', iconName: 'MapPin' },
      { slug: '/barrios/engativa', title: 'Internet en Engativá', description: 'Cobertura y planes en Engativá', iconName: 'MapPin' },
      { slug: '/barrios/ciudad-bolivar', title: 'Internet en Ciudad Bolívar', description: 'Cobertura y planes en Ciudad Bolívar', iconName: 'MapPin' },
      { slug: '/barrios/teusaquillo', title: 'Internet en Teusaquillo', description: 'Cobertura y planes en Teusaquillo', iconName: 'MapPin' },
      { slug: '/barrios/fontibon', title: 'Internet en Fontibón', description: 'Cobertura y planes en Fontibón', iconName: 'MapPin' },
      { slug: '/barrios/puente-aranda', title: 'Internet en Puente Aranda', description: 'Cobertura y planes en Puente Aranda', iconName: 'MapPin' },
      { slug: '/barrios/bosa', title: 'Internet en Bosa', description: 'Cobertura y planes en Bosa', iconName: 'MapPin' },
      { slug: '/barrios/san-cristobal', title: 'Internet en San Cristóbal', description: 'Cobertura y planes en San Cristóbal', iconName: 'MapPin' },
      { slug: '/barrios/barrios-unidos', title: 'Internet en Barrios Unidos', description: 'Cobertura y planes en Barrios Unidos', iconName: 'MapPin' },
      { slug: '/barrios/tunjuelito', title: 'Internet en Tunjuelito', description: 'Cobertura y planes en Tunjuelito', iconName: 'MapPin' },
      { slug: '/barrios/rafael-uribe-uribe', title: 'Internet en Rafael Uribe Uribe', description: 'Cobertura y planes en Rafael Uribe Uribe', iconName: 'MapPin' }
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
      { slug: '/casos/gaming', title: 'Internet para Gaming', description: 'Baja latencia para juegos online', iconName: 'Gamepad2' },
      { slug: '/casos/teletrabajo', title: 'Internet para Teletrabajo', description: 'Videoconferencias estables', iconName: 'Briefcase' },
      { slug: '/casos/streaming', title: 'Internet para Streaming', description: '4K sin buffering', iconName: 'Tv' }
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
      { slug: '/viviendas/apartamento', title: 'Internet para Apartamento', description: 'Soluciones para espacios reducidos', iconName: 'Building2' },
      { slug: '/viviendas/casa', title: 'Internet para Casa', description: 'Cobertura para casas grandes', iconName: 'Home' },
      { slug: '/viviendas/oficina', title: 'Internet para Oficina', description: 'Soluciones corporativas', iconName: 'Building' },
      { slug: '/viviendas/edificio', title: 'Internet para Edificio', description: 'Conexión para edificios completos', iconName: 'Landmark' }
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
      { slug: '/soluciones/cambiar-de-operador', title: 'Cambiar de Operador', description: 'Proceso y recomendaciones', iconName: 'RefreshCw' },
      { slug: '/soluciones/mejorar-velocidad', title: 'Mejorar Velocidad', description: 'Optimiza tu conexión actual', iconName: 'Zap' },
      { slug: '/soluciones/internet-lento', title: 'Internet Lento', description: 'Diagnóstico y soluciones', iconName: 'TrendingDown' },
      { slug: '/soluciones/cortes-de-internet', title: 'Cortes de Internet', description: 'Evita desconexiones', iconName: 'WifiOff' }
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
