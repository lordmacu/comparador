import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getAllProviders } from '@/lib/data';
import QuickCallForm from '@/components/QuickCallForm';
import WhatsAppButton from '@/components/WhatsAppButton';
import { MapPin, Zap, TrendingUp, Shield } from 'lucide-react';

// Definir los barrios de Bogotá
const BARRIOS = {
  suba: {
    nombre: 'Suba',
    descripcion: 'Una de las localidades más grandes de Bogotá con excelente cobertura de internet',
    poblacion: '1.3 millones',
    caracteristicas: ['Zona residencial y comercial', 'Alta demanda de internet', 'Cobertura completa de operadores']
  },
  kennedy: {
    nombre: 'Kennedy',
    descripcion: 'La localidad más poblada de Bogotá con amplia infraestructura de telecomunicaciones',
    poblacion: '1.2 millones',
    caracteristicas: ['Zona comercial activa', 'Alta conectividad', 'Múltiples operadores disponibles']
  },
  usaquen: {
    nombre: 'Usaquén',
    descripcion: 'Zona norte de Bogotá con alta demanda de internet de calidad',
    poblacion: '500 mil',
    caracteristicas: ['Zona residencial premium', 'Alto uso empresarial', 'Mejor infraestructura']
  },
  chapinero: {
    nombre: 'Chapinero',
    descripcion: 'Centro empresarial y residencial con necesidades de internet de alta velocidad',
    poblacion: '140 mil',
    caracteristicas: ['Zona empresarial', 'Teletrabajo intensivo', 'Demanda de velocidad']
  },
  engativa: {
    nombre: 'Engativá',
    descripcion: 'Localidad con creciente demanda de servicios de internet para familias',
    poblacion: '900 mil',
    caracteristicas: ['Zona familiar', 'Uso residencial alto', 'Buena cobertura']
  },
  'ciudad-bolivar': {
    nombre: 'Ciudad Bolívar',
    descripcion: 'Localidad en expansión con creciente acceso a internet de calidad',
    poblacion: '700 mil',
    caracteristicas: ['Expansión de servicios', 'Planes económicos', 'Mejora de infraestructura']
  }
};

type BarrioSlug = keyof typeof BARRIOS;

export async function generateStaticParams() {
  return Object.keys(BARRIOS).map((barrio) => ({
    barrio,
  }));
}

export async function generateMetadata({ params }: { params: { barrio: string } }): Promise<Metadata> {
  const barrio = BARRIOS[params.barrio as BarrioSlug];
  
  if (!barrio) {
    return {
      title: 'Internet en Bogotá | Comparador',
    };
  }

  return {
    title: `Internet en ${barrio.nombre} Bogotá 2026 | ETB, Claro, Movistar`,
    description: `Compara los mejores planes de internet en ${barrio.nombre}, Bogotá. Fibra óptica, velocidades de hasta 900 Mbps. Encuentra el mejor operador para tu zona.`,
    keywords: [
      `internet ${barrio.nombre}`,
      `internet ${barrio.nombre} Bogotá`,
      `planes internet ${barrio.nombre}`,
      `ETB ${barrio.nombre}`,
      `Claro ${barrio.nombre}`,
      `Movistar ${barrio.nombre}`,
      `fibra óptica ${barrio.nombre}`,
      `mejor internet ${barrio.nombre} 2026`
    ],
    alternates: {
      canonical: `https://comparadorinternet.co/internet-${params.barrio}-bogota`,
    },
    openGraph: {
      title: `Internet en ${barrio.nombre} Bogotá 2026`,
      description: `Compara planes de internet en ${barrio.nombre}`,
      url: `https://comparadorinternet.co/internet-${params.barrio}-bogota`,
    },
  };
}

export const revalidate = 3600; // ISR: 1 hora

export default function InternetBarrioPage({ params }: { params: { barrio: string } }) {
  const barrio = BARRIOS[params.barrio as BarrioSlug];
  const providers = getAllProviders();

  if (!barrio) {
    return <div>Barrio no encontrado</div>;
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-6 h-6" />
              <span className="text-blue-200">{barrio.nombre}, Bogotá</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              Internet en {barrio.nombre} Bogotá 2026
            </h1>
            
            <p className="text-xl text-blue-100 mb-8">
              {barrio.descripcion}. Compara planes de <strong>ETB</strong>, <strong>Claro</strong> y <strong>Movistar</strong> disponibles en tu zona.
            </p>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
              <h2 className="font-bold text-lg mb-4">Te llamamos gratis para consultar planes en {barrio.nombre}:</h2>
              <QuickCallForm buttonColor="#2563eb" />
            </div>

            <div className="grid md:grid-cols-3 gap-4 text-sm">
              {barrio.caracteristicas.map((caracteristica, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <Shield className="w-5 h-5 text-blue-300 flex-shrink-0 mt-0.5" />
                  <span>{caracteristica}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cobertura en el Barrio */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-black mb-8">Cobertura de Internet en {barrio.nombre}</h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {providers.map((provider) => (
                <div key={provider.slug} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <Image
                      src={provider.brand.logo}
                      alt={`${provider.name} logo`}
                      width={60}
                      height={30}
                      className="h-8 w-auto"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center gap-2 text-green-600 font-semibold mb-2">
                      <Zap className="w-4 h-4" />
                      <span>Disponible en {barrio.nombre}</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {provider.coverage.technology}
                    </p>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="text-sm">
                      <span className="font-semibold">Velocidad:</span> Hasta 900 Mbps
                    </div>
                    <div className="text-sm">
                      <span className="font-semibold">Tecnología:</span> {provider.coverage.technology}
                    </div>
                  </div>

                  <Link
                    href={`/${provider.slug}`}
                    className="block text-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                  >
                    Ver Planes {provider.name}
                  </Link>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="font-bold text-lg mb-3">💡 Consejo para residentes de {barrio.nombre}</h3>
              <p className="text-gray-700">
                Los tres operadores ofrecen cobertura en {barrio.nombre}. ETB suele tener ventajas en soporte técnico local, 
                Claro ofrece la mayor cobertura 5G, y Movistar destaca en velocidad simétrica. Te recomendamos comparar 
                los planes específicos disponibles en tu dirección exacta.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Planes Recomendados */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-black mb-4">Planes Recomendados para {barrio.nombre}</h2>
            <p className="text-gray-600 mb-8">
              Basándonos en las necesidades más comunes en {barrio.nombre}, estos son los planes más solicitados:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 border-2 border-blue-500">
                <div className="flex items-center gap-2 text-blue-600 mb-3">
                  <TrendingUp className="w-5 h-5" />
                  <span className="font-bold">Más Popular</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Plan 500 Mbps</h3>
                <p className="text-gray-600 mb-4">
                  Ideal para familias de 3-5 personas. Streaming, gaming y teletrabajo simultáneo.
                </p>
                <ul className="space-y-2 mb-4 text-sm">
                  <li>✓ 500 Mbps de velocidad</li>
                  <li>✓ Perfecto para 4-5 dispositivos</li>
                  <li>✓ Streaming 4K en varios TV</li>
                  <li>✓ Gaming sin lag</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-6 border-2 border-gray-300">
                <h3 className="text-xl font-bold mb-2">Plan 200-300 Mbps</h3>
                <p className="text-gray-600 mb-4">
                  Económico y eficiente para parejas o familias pequeñas.
                </p>
                <ul className="space-y-2 mb-4 text-sm">
                  <li>✓ 200-300 Mbps</li>
                  <li>✓ 2-3 dispositivos simultáneos</li>
                  <li>✓ Streaming HD</li>
                  <li>✓ Navegación fluida</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-black mb-4">
              ¿Listo para Contratar Internet en {barrio.nombre}?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Compara planes de ETB, Claro y Movistar disponibles en tu dirección
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {providers.map((provider) => (
                <Link
                  key={provider.slug}
                  href={`/${provider.slug}`}
                  className="px-6 py-3 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-100 transition-all"
                >
                  Ver Planes {provider.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Local */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-black mb-8">Preguntas Frecuentes - Internet en {barrio.nombre}</h2>

            <div className="space-y-4">
              <details className="bg-gray-50 rounded-lg p-6">
                <summary className="font-bold text-lg cursor-pointer">
                  ¿Qué operadores tienen cobertura en {barrio.nombre}?
                </summary>
                <p className="mt-4 text-gray-700">
                  ETB, Claro y Movistar tienen cobertura en {barrio.nombre}. Los tres operadores ofrecen fibra óptica 
                  en la mayoría de sectores de la localidad, aunque la disponibilidad exacta puede variar según tu dirección.
                </p>
              </details>

              <details className="bg-gray-50 rounded-lg p-6">
                <summary className="font-bold text-lg cursor-pointer">
                  ¿Cuál es el mejor internet para {barrio.nombre}?
                </summary>
                <p className="mt-4 text-gray-700">
                  Depende de tus necesidades. ETB es excelente para residentes que valoran el soporte local, 
                  Claro ofrece la mejor cobertura 5G móvil, y Movistar destaca en velocidad simétrica para teletrabajo profesional.
                </p>
              </details>

              <details className="bg-gray-50 rounded-lg p-6">
                <summary className="font-bold text-lg cursor-pointer">
                  ¿Cuánto cuesta el internet en {barrio.nombre}?
                </summary>
                <p className="mt-4 text-gray-700">
                  Los precios varían según el plan y operador. En promedio, planes de 200-300 Mbps rondan los $60.000-$80.000/mes, 
                  mientras que planes de 500 Mbps pueden costar entre $80.000-$120.000/mes. Contacta a cada operador para 
                  conocer promociones vigentes en tu zona.
                </p>
              </details>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
