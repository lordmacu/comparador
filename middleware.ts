import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Detectar rutas de barrios: internet-{barrio}-bogota
  const barrioMatch = pathname.match(/^\/internet-([a-z-]+)-bogota$/);
  if (barrioMatch) {
    const barrio = barrioMatch[1];
    const validBarrios = [
      'suba', 'kennedy', 'usaquen', 'chapinero', 'engativa', 'ciudad-bolivar',
      'teusaquillo', 'fontibon', 'puente-aranda', 'bosa', 'san-cristobal',
      'barrios-unidos', 'tunjuelito', 'rafael-uribe-uribe'
    ];
    
    if (validBarrios.includes(barrio)) {
      // Reescribir a la ruta interna
      const url = request.nextUrl.clone();
      url.pathname = `/barrios/${barrio}`;
      return NextResponse.rewrite(url);
    }
  }

  // Detectar rutas de casos de uso: mejor-internet-{caso}-bogota
  const casoMatch = pathname.match(/^\/mejor-internet-([a-z-]+)-bogota$/);
  if (casoMatch) {
    const caso = casoMatch[1];
    const validCasos = ['gaming', 'teletrabajo', 'streaming'];
    
    if (validCasos.includes(caso)) {
      // Reescribir a la ruta interna
      const url = request.nextUrl.clone();
      url.pathname = `/casos/${caso}`;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/internet-:barrio-bogota',
    '/mejor-internet-:caso-bogota',
  ],
};
