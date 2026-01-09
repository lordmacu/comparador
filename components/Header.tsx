'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  // Ocultar header en páginas de proveedores específicos
  const isProviderPage = pathname === '/claro' || pathname === '/movistar' || pathname === '/etb';

  if (isProviderPage) {
    return null;
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <a href="/" className="text-2xl font-bold text-blue-600">
            Internet Colombia
          </a>
          <div className="flex gap-6 items-center">
            {/* Items principales siempre visibles */}
            <a href="/calculadora" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Calculadora
            </a>
            <a href="/planes" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Planes
            </a>
            <a href="/videos" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Videos
            </a>
            <a href="/blog" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Blog
            </a>
            
            {/* Dropdown "Más" */}
            <div 
              className="relative"
              onMouseEnter={() => setIsMoreOpen(true)}
              onMouseLeave={() => setIsMoreOpen(false)}
            >
              <button className="text-gray-700 hover:text-blue-600 font-medium transition-colors flex items-center gap-1">
                Más
                <ChevronDown className={`w-4 h-4 transition-transform ${isMoreOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Submenu - todos los links en HTML para SEO */}
              {isMoreOpen && (
                <div 
                  className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2"
                  onMouseEnter={() => setIsMoreOpen(true)}
                  onMouseLeave={() => setIsMoreOpen(false)}
                >
                  <a href="/guia-completa" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                    Guía Completa
                  </a>
                  <a href="/recursos" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                    Recursos
                  </a>
                  <a href="/herramientas" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                    Herramientas
                  </a>
                  <a href="/testimonios" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                    Testimonios
                  </a>
                  <a href="/faq" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                    FAQ
                  </a>
                  <div className="border-t border-gray-200 my-2"></div>
                  <a href="/claro" className="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors">
                    Claro
                  </a>
                  <a href="/movistar" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors">
                    Movistar
                  </a>
                  <a href="/etb" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                    ETB
                  </a>
                  <div className="border-t border-gray-200 my-2"></div>
                  <a href="/empresa" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                    Empresa
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
