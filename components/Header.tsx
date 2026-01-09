'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          
          {/* Menú Desktop - oculto en mobile */}
          <div className="hidden lg:flex gap-6 items-center">
            {/* Items principales siempre visibles */}
            <a href="/planes" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Planes
            </a>
            <a href="/videos" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Videos
            </a>
            <a href="/blog" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Blog
            </a>
            <a href="/claro" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
              Claro
            </a>
            <a href="/movistar" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
              Movistar
            </a>
            <a href="/etb" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              ETB
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
                  className="absolute right-0 top-full pt-2 w-48"
                >
                  <div className="bg-white border border-gray-200 rounded-lg shadow-lg py-2">
                  <a href="/calculadora" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                    Calculadora
                  </a>
                  <div className="border-t border-gray-200 my-2"></div>
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
                  <a href="/empresa" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                    Empresa
                  </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Botón Hamburguesa - visible solo en mobile */}
          <button 
            className="lg:hidden text-gray-700 hover:text-blue-600 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Menú Mobile - desplegable */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 space-y-2">
            <a href="/planes" className="block py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 rounded transition-colors">
              Planes
            </a>
            <a href="/videos" className="block py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 rounded transition-colors">
              Videos
            </a>
            <a href="/blog" className="block py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 rounded transition-colors">
              Blog
            </a>
            <a href="/claro" className="block py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 px-4 rounded transition-colors">
              Claro
            </a>
            <a href="/movistar" className="block py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 px-4 rounded transition-colors">
              Movistar
            </a>
            <a href="/etb" className="block py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 rounded transition-colors">
              ETB
            </a>
            <div className="border-t border-gray-200 my-2"></div>
            <a href="/calculadora" className="block py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 rounded transition-colors">
              Calculadora
            </a>
            <a href="/guia-completa" className="block py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 rounded transition-colors">
              Guía Completa
            </a>
            <a href="/recursos" className="block py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 rounded transition-colors">
              Recursos
            </a>
            <a href="/herramientas" className="block py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 rounded transition-colors">
              Herramientas
            </a>
            <a href="/testimonios" className="block py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 rounded transition-colors">
              Testimonios
            </a>
            <a href="/faq" className="block py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 rounded transition-colors">
              FAQ
            </a>
            <a href="/empresa" className="block py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 rounded transition-colors">
              Empresa
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
