'use client';

import { ChevronRight, ExternalLink, Link2 } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface RelatedLink {
  title: string;
  description: string;
  href: string;
  category: 'tools' | 'guides' | 'compare' | 'info';
  isExternal?: boolean;
  priority: number; // Higher = more likely to show
}

interface RelatedLinksProps {
  maxLinks?: number;
  currentPageType?: 'provider' | 'calculator' | 'guide' | 'comparison' | 'blog' | 'tools' | 'general';
  excludeCurrentPage?: boolean;
}

// Comprehensive database of internal links with intelligent matching
const allRelatedLinks: RelatedLink[] = [
  // Tools & Calculators
  {
    title: 'Calculadora de Velocidad',
    description: 'Determina qué velocidad necesitas según tu uso',
    href: '/calculadora',
    category: 'tools',
    priority: 10
  },
  {
    title: 'Herramientas Avanzadas', 
    description: 'Tests de latencia y diagnósticos especializados',
    href: '/herramientas',
    category: 'tools',
    priority: 8
  },
  {
    title: 'Recursos Gratuitos',
    description: 'Guías, herramientas y enlaces útiles',
    href: '/recursos',
    category: 'tools',
    priority: 9
  },

  // Guides & Educational
  {
    title: 'Guía Completa de Internet',
    description: 'Todo sobre proveedores, tecnologías y precios',
    href: '/guia-completa',
    category: 'guides',
    priority: 10
  },
  {
    title: 'Videos Tutoriales',
    description: 'Aprende con tutoriales paso a paso',
    href: '/videos',
    category: 'guides',
    priority: 8
  },
  {
    title: 'Preguntas Frecuentes',
    description: 'Respuestas a dudas comunes sobre internet',
    href: '/faq',
    category: 'guides',
    priority: 7
  },

  // Comparisons & Plans
  {
    title: 'Planes de Internet',
    description: 'Compara precios y características de todos los planes',
    href: '/planes',
    category: 'compare',
    priority: 10
  },
  {
    title: 'ETB vs Claro',
    description: 'Comparación detallada entre ETB y Claro',
    href: '/comparar/etb/claro',
    category: 'compare',
    priority: 9
  },
  {
    title: 'Claro vs Movistar',
    description: 'Análisis comparativo Claro vs Movistar',
    href: '/comparar/claro/movistar',
    category: 'compare',
    priority: 9
  },
  {
    title: 'ETB vs Movistar',
    description: 'Comparación completa ETB vs Movistar',
    href: '/comparar/etb/movistar',
    category: 'compare',
    priority: 8
  },

  // Provider Pages
  {
    title: 'Internet ETB',
    description: 'Planes, cobertura y servicios de ETB',
    href: '/etb',
    category: 'info',
    priority: 8
  },
  {
    title: 'Internet Claro',
    description: 'Ofertas y servicios de Claro Colombia',
    href: '/claro',
    category: 'info',
    priority: 8
  },
  {
    title: 'Internet Movistar',
    description: 'Planes y promociones de Movistar',
    href: '/movistar',
    category: 'info',
    priority: 8
  },

  // Specialized Pages
  {
    title: 'Internet para Gaming',
    description: 'Mejores opciones para juegos online',
    href: '/casos/gaming',
    category: 'guides',
    priority: 7
  },
  {
    title: 'Internet para Teletrabajo',
    description: 'Conexiones ideales para trabajo remoto',
    href: '/casos/teletrabajo', 
    category: 'guides',
    priority: 8
  },
  {
    title: 'Internet para Streaming',
    description: 'Planes optimizados para Netflix y streaming',
    href: '/casos/streaming',
    category: 'guides',
    priority: 7
  },

  // Location-based
  {
    title: 'Internet en Suba',
    description: 'Mejores opciones de internet en Suba',
    href: '/barrios/suba',
    category: 'info',
    priority: 6
  },
  {
    title: 'Internet en Kennedy',
    description: 'Proveedores disponibles en Kennedy',
    href: '/barrios/kennedy',
    category: 'info', 
    priority: 6
  },
  {
    title: 'Internet en Usaquén',
    description: 'Cobertura de internet en Usaquén',
    href: '/barrios/usaquen',
    category: 'info',
    priority: 6
  },

  // Speed-based
  {
    title: 'Internet 100 Megas',
    description: 'Planes de 100 Mbps disponibles',
    href: '/velocidades/100-megas',
    category: 'compare',
    priority: 7
  },
  {
    title: 'Internet 200 Megas',
    description: 'Ofertas de internet de 200 Mbps',
    href: '/velocidades/200-megas',
    category: 'compare',
    priority: 7
  },
  {
    title: 'Fibra Óptica',
    description: 'Todo sobre internet de fibra óptica',
    href: '/velocidades/fibra-optica',
    category: 'compare',
    priority: 8
  },

  // Social Proof & Info
  {
    title: 'Testimonios de Usuarios',
    description: 'Experiencias reales con proveedores',
    href: '/testimonios',
    category: 'info',
    priority: 6
  },
  {
    title: 'Sobre Nosotros',
    description: 'Conoce nuestro equipo de expertos',
    href: '/empresa',
    category: 'info',
    priority: 4
  },
  {
    title: 'Blog de Internet',
    description: 'Artículos y noticias sobre telecomunicaciones',
    href: '/blog',
    category: 'info',
    priority: 5
  }
];

// Intelligent link selection based on current page context
function getRelevantLinks(
  currentPath: string,
  pageType: string = 'general',
  maxLinks: number = 4
): RelatedLink[] {
  // Filter out current page
  const availableLinks = allRelatedLinks.filter(link => link.href !== currentPath);
  
  // Scoring algorithm based on page context
  const scoredLinks = availableLinks.map(link => {
    let score = link.priority;
    
    // Boost score based on page type relevance
    switch (pageType) {
      case 'provider':
        if (link.category === 'compare' || link.category === 'tools') score += 3;
        break;
      case 'calculator':
        if (link.category === 'tools' || link.category === 'guides') score += 3;
        if (link.category === 'compare') score += 2;
        break;
      case 'guide':
        if (link.category === 'tools' || link.category === 'compare') score += 3;
        if (link.category === 'guides') score += 1;
        break;
      case 'comparison':
        if (link.category === 'tools' || link.category === 'info') score += 3;
        if (link.category === 'compare') score += 1;
        break;
      case 'blog':
        if (link.category === 'guides' || link.category === 'tools') score += 3;
        break;
      case 'tools':
        if (link.category === 'compare' || link.category === 'guides') score += 3;
        if (link.category === 'tools') score += 1;
        break;
      default:
        if (link.category === 'tools' || link.category === 'compare') score += 2;
    }
    
    // Boost high-value pages
    if (link.href === '/calculadora' || link.href === '/planes' || link.href === '/guia-completa') {
      score += 2;
    }
    
    // Context-specific boosts
    if (currentPath.includes('/barrios/') && link.href.includes('/velocidades/')) score += 2;
    if (currentPath.includes('/velocidades/') && link.category === 'compare') score += 2;
    if (currentPath.includes('/comparar/') && link.category === 'tools') score += 3;
    
    return { ...link, score };
  });
  
  // Sort by score and return top results
  return scoredLinks
    .sort((a, b) => b.score - a.score)
    .slice(0, maxLinks);
}

export default function RelatedLinks({ 
  maxLinks = 4, 
  currentPageType = 'general',
  excludeCurrentPage = true 
}: RelatedLinksProps) {
  const pathname = usePathname();
  
  // Don't show on provider-specific pages that hide header
  if (pathname === '/claro' || pathname === '/movistar' || pathname === '/etb') {
    return null;
  }
  
  const relevantLinks = getRelevantLinks(pathname, currentPageType, maxLinks);
  
  if (relevantLinks.length === 0) {
    return null;
  }
  
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mt-8">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          <Link2 className="w-5 h-5 inline" /> También te puede interesar
        </h3>
        <p className="text-sm text-gray-600">
          Herramientas y recursos relacionados para ayudarte a encontrar el mejor internet
        </p>
      </div>
      
      <div className="grid gap-3 sm:grid-cols-2">
        {relevantLinks.map((link, index) => (
          <a
            key={index}
            href={link.href}
            className="group flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100 hover:border-blue-300 hover:shadow-sm transition-all duration-200"
            {...(link.isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-medium text-gray-900 text-sm group-hover:text-blue-600 transition-colors">
                  {link.title}
                </h4>
                {link.isExternal && <ExternalLink size={12} className="text-gray-400" />}
              </div>
              <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                {link.description}
              </p>
            </div>
            
            <ChevronRight 
              size={16} 
              className="text-gray-400 group-hover:text-blue-500 transition-colors flex-shrink-0" 
            />
          </a>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <a
          href="/recursos"
          className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          Ver todos los recursos
          <ChevronRight size={14} />
        </a>
      </div>
    </div>
  );
}