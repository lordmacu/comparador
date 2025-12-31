'use client';

import { usePathname } from 'next/navigation';
import { Globe } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();

  // Ocultar header en páginas de proveedores específicos
  const isProviderPage = pathname === '/claro' || pathname === '/movistar' || pathname === '/etb';

  if (isProviderPage) {
    return null;
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <a href="/" className="text-2xl font-bold text-blue-600 flex items-center gap-2">
            <Globe size={28} />
            Internet Colombia
          </a>
          <div className="flex gap-4">
            <a href="/blog" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Blog
            </a>
            <a href="/claro" className="text-gray-700 hover:text-claro-primary font-medium transition-colors">
              Claro
            </a>
            <a href="/movistar" className="text-gray-700 hover:text-movistar-primary font-medium transition-colors">
              Movistar
            </a>
            <a href="/etb" className="text-gray-700 hover:text-etb-primary font-medium transition-colors">
              ETB
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
