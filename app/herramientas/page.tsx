import { Metadata } from 'next';
import HerramientasClient from './HerramientasClient';

export const metadata: Metadata = {
  title: 'Herramientas Avanzadas de Internet - Tests y Calculadoras | Internet Colombia',
  description: 'Herramientas especializadas para diagnosticar, medir y optimizar tu conexión a internet. Tests de latencia, calculadoras de ancho de banda y más.',
  keywords: 'test latencia internet, calculadora ancho de banda, herramientas diagnostico internet, optimizar conexion internet colombia',
  openGraph: {
    title: 'Herramientas Avanzadas de Internet - Tests y Calculadoras',
    description: 'Herramientas especializadas para diagnosticar y optimizar tu conexión a internet en Colombia',
    url: 'https://comparadorinternet.co/herramientas',
    type: 'website',
  },
  alternates: {
    canonical: 'https://comparadorinternet.co/herramientas'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function HerramientasPage() {
  return <HerramientasClient />;
}