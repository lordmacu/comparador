import { Metadata } from 'next';
import { generateCalculatorHowToSchema, renderJsonLd } from '@/lib/schemas';
import Breadcrumbs from '@/components/Breadcrumbs';
import LastUpdated from '@/components/LastUpdated';

export const metadata: Metadata = {
  title: 'Calculadora de Velocidad de Internet | ¿Cuántos Mbps Necesito? Bogotá 2026',
  description: 'Calcula gratis cuánta velocidad de internet necesitas según el número de personas y actividades. Recomendaciones personalizadas con precios actualizados en Bogotá.',
  keywords: 'calculadora velocidad internet, cuantos megas necesito, velocidad internet ideal, mbps requeridos, internet hogar, calculadora mbps, cuanta velocidad internet',
  openGraph: {
    title: 'Calculadora de Velocidad de Internet - Descubre Cuántos Mbps Necesitas',
    description: 'Herramienta gratis para calcular la velocidad ideal de internet según tus necesidades. Resultado instantáneo con recomendaciones de planes.',
    url: 'https://comparadorinternet.co/calculadora',
    siteName: 'Comparador Internet Bogotá',
    locale: 'es_CO',
    type: 'website',
    images: [
      {
        url: '/images/calculadora-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Calculadora de Velocidad de Internet'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculadora de Velocidad de Internet',
    description: 'Descubre cuánta velocidad necesitas según tus actividades online. Gratis e instantáneo.',
  },
  alternates: {
    canonical: 'https://comparadorinternet.co/calculadora',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CalculadoraLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const howToSchema = generateCalculatorHowToSchema();

  return (
    <>
      {/* HowTo Schema para calculadora */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={renderJsonLd(howToSchema)}
      />

      <div className="container mx-auto px-4 py-8">
        {children}
      </div>
    </>
  );
}
