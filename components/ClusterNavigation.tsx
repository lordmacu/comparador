'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getClusterForPage, getPillarPage, isPillarPage } from '@/lib/clusters';
import { ArrowUpCircle, Grid3x3, Sparkles, BookOpen } from 'lucide-react';

export default function ClusterNavigation() {
  const pathname = usePathname();
  const cluster = getClusterForPage(pathname);
  
  if (!cluster) return null;
  
  const isCurrentPillar = isPillarPage(pathname);
  const pillarPage = getPillarPage(pathname);
  
  return (
    <div className="bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 border-2 border-indigo-200 rounded-xl p-8 my-8 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-indigo-600 rounded-lg">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-black text-gray-900">
            {isCurrentPillar ? 'Explora Todos los Temas' : 'Contenido Relacionado'}
          </h3>
          <p className="text-sm text-gray-600">
            {isCurrentPillar 
              ? `${cluster.clusterPages.length} recursos sobre este tema`
              : 'Descubre más información útil'
            }
          </p>
        </div>
      </div>
      
      {/* Pillar Page Link (if not on pillar page) */}
      {!isCurrentPillar && pillarPage && (
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm font-semibold text-indigo-700 mb-3">
            <ArrowUpCircle size={18} />
            <span>Guía Principal</span>
          </div>
          <Link 
            href={pillarPage.url}
            className="block bg-white rounded-xl p-5 hover:shadow-lg transition-all border-2 border-indigo-300 hover:border-indigo-500 group"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-bold text-lg text-indigo-900 mb-2 group-hover:text-indigo-600 transition-colors">
                  <BookOpen className="w-5 h-5 inline" /> {pillarPage.title}
                </h4>
                <p className="text-gray-600 text-sm">
                  {pillarPage.description}
                </p>
              </div>
              <div className="ml-4 text-indigo-600 group-hover:translate-x-1 transition-transform">
                →
              </div>
            </div>
          </Link>
        </div>
      )}
      
      {/* Cluster Pages */}
      <div>
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-4">
          <Grid3x3 size={18} />
          <span>
            {isCurrentPillar ? 'Todos los Temas' : 'Más Sobre Este Tema'}
          </span>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cluster.clusterPages
            .filter(page => page.slug !== pathname) // Exclude current page
            .slice(0, isCurrentPillar ? 9 : 6) // Show more on pillar pages
            .map((page) => (
              <Link
                key={page.slug}
                href={page.slug}
                className="bg-white rounded-lg p-4 hover:shadow-md transition-all border-2 border-gray-100 hover:border-indigo-400 group"
              >
                <div className="flex items-start gap-3">
                  {page.icon && (
                    <span className="text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">{page.icon}</span>
                  )}
                  <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-sm text-gray-900 group-hover:text-indigo-600 transition-colors mb-1 line-clamp-2">
                      {page.title}
                    </h5>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {page.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
      
      {/* View All Link for cluster pages */}
      {!isCurrentPillar && pillarPage && cluster.clusterPages.length > 6 && (
        <div className="mt-6 text-center">
          <Link 
            href={pillarPage.url}
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold text-sm group"
          >
            <span>Ver todos los {cluster.clusterPages.length} temas</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      )}
    </div>
  );
}
