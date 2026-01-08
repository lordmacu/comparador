'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getClusterForPage, getPillarPage, isPillarPage } from '@/lib/clusters';
import { ArrowUpCircle, Grid3x3 } from 'lucide-react';

export default function ClusterNavigation() {
  const pathname = usePathname();
  const cluster = getClusterForPage(pathname);
  
  if (!cluster) return null;
  
  const isCurrentPillar = isPillarPage(pathname);
  const pillarPage = getPillarPage(pathname);
  
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-t-4 border-blue-500 rounded-lg p-6 my-8">
      {/* Pillar Page Link (if not on pillar page) */}
      {!isCurrentPillar && pillarPage && (
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
            <ArrowUpCircle size={16} />
            <span className="font-semibold">Página Principal del Tema</span>
          </div>
          <Link 
            href={pillarPage.url}
            className="block bg-white rounded-lg p-4 hover:shadow-md transition-all border-2 border-blue-200 hover:border-blue-500"
          >
            <h3 className="font-bold text-lg text-blue-900 mb-1">
              📚 {pillarPage.title}
            </h3>
            <p className="text-gray-600 text-sm">
              {pillarPage.description}
            </p>
          </Link>
        </div>
      )}
      
      {/* Cluster Pages */}
      <div>
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
          <Grid3x3 size={16} />
          <span className="font-semibold">
            {isCurrentPillar ? 'Temas Relacionados' : 'Explora Más Sobre Este Tema'}
          </span>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {cluster.clusterPages
            .filter(page => page.slug !== pathname) // Exclude current page
            .slice(0, 6)
            .map((page) => (
              <Link
                key={page.slug}
                href={page.slug}
                className="bg-white rounded-lg p-3 hover:shadow-md transition-all border border-gray-200 hover:border-blue-400 group"
              >
                <div className="flex items-start gap-2">
                  {page.icon && (
                    <span className="text-xl flex-shrink-0">{page.icon}</span>
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                      {page.title}
                    </h4>
                    <p className="text-xs text-gray-600 mt-0.5 line-clamp-2">
                      {page.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
      
      {/* View All Link for Pillar Pages */}
      {isCurrentPillar && cluster.clusterPages.length > 6 && (
        <div className="mt-4 text-center">
          <Link 
            href={pillarPage?.url || '#'}
            className="text-blue-600 hover:text-blue-700 text-sm font-semibold inline-flex items-center gap-1"
          >
            Ver todos los {cluster.clusterPages.length} temas →
          </Link>
        </div>
      )}
    </div>
  );
}
