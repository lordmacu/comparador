import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getAllProviders } from '@/lib/data';
import QuickCallForm from '@/components/QuickCallForm';
import { Zap, TrendingUp, Shield, Wifi, Download, Upload } from 'lucide-react';

// Definir las velocidades disponibles
const VELOCIDADES = {
  '100-megas': {
    nombre: '100 Megas',
    velocidad: '100 Mbps',
    descripcion: 'Ideal para navegación básica, streaming en HD y trabajo remoto',
    usoRecomendado: '2-3 personas',
    caracteristicas: ['Streaming HD', 'Videoconferencias', 'Navegación fluida', 'Redes sociales'],
    detalles: {
      streaming: '2 dispositivos en HD simultáneos',
      gaming: 'Gaming casual con latencia aceptable',
      trabajo: 'Ideal para trabajo remoto individual',
      usuarios: 'Perfecto para 2-3 usuarios',
    },
    precioPromedio: '50.000 - 80.000',
  },
  '200-megas': {
    nombre: '200 Megas',
    velocidad: '200 Mbps',
    descripcion: 'Perfecto para familias pequeñas y múltiples dispositivos conectados',
    usoRecomendado: '3-4 personas',
    caracteristicas: ['Streaming Full HD', 'Gaming online', 'Múltiples dispositivos', 'Trabajo remoto'],
    detalles: {
      streaming: '3-4 dispositivos en Full HD simultáneos',
      gaming: 'Gaming competitivo con baja latencia',
      trabajo: 'Videoconferencias múltiples sin cortes',
      usuarios: 'Ideal para 3-4 usuarios',
    },
    precioPromedio: '70.000 - 110.000',
  },
  '300-megas': {
    nombre: '300 Megas',
    velocidad: '300 Mbps',
    descripcion: 'Excelente para familias numerosas y uso intensivo de internet',
    usoRecomendado: '4-5 personas',
    caracteristicas: ['Streaming 4K', 'Gaming profesional', 'Smart Home', 'Teletrabajo intensivo'],
    detalles: {
      streaming: '4-5 dispositivos en 4K simultáneos',
      gaming: 'Gaming profesional sin lag',
      trabajo: 'Múltiples videoconferencias profesionales',
      usuarios: 'Perfecto para 4-5 usuarios',
    },
    precioPromedio: '90.000 - 140.000',
  },
  '500-megas': {
    nombre: '500 Megas',
    velocidad: '500 Mbps',
    descripcion: 'Velocidad premium para uso empresarial y familias con alto consumo',
    usoRecomendado: '5+ personas',
    caracteristicas: ['Streaming 4K múltiple', 'Gaming sin límites', 'Descargas ultrarrápidas', 'Oficina en casa'],
    detalles: {
      streaming: '5+ dispositivos en 4K sin buffering',
      gaming: 'Streaming + gaming simultáneo',
      trabajo: 'Transferencias grandes de archivos',
      usuarios: 'Ideal para 5+ usuarios o pequeñas empresas',
    },
    precioPromedio: '120.000 - 180.000',
  },
  'fibra-optica': {
    nombre: 'Fibra Óptica',
    velocidad: 'Hasta 900 Mbps',
    descripcion: 'La mejor tecnología disponible con velocidades simétricas y máxima estabilidad',
    usoRecomendado: 'Ilimitado',
    caracteristicas: ['Velocidad simétrica', 'Máxima estabilidad', 'Latencia mínima', 'Tecnología de punta'],
    detalles: {
      streaming: 'Múltiples dispositivos en 8K',
      gaming: 'E-sports profesional',
      trabajo: 'Transmisiones en vivo profesionales',
      usuarios: 'Sin límite de usuarios',
    },
    precioPromedio: '80.000 - 200.000',
  },
};

type VelocidadSlug = keyof typeof VELOCIDADES;

// Regenerar cada 1 hora
export const revalidate = 3600;
export const dynamicParams = false;

export async function generateStaticParams() {
  console.log('[VELOCIDADES] generateStaticParams called');
  const params = Object.keys(VELOCIDADES).map((velocidad) => ({
    velocidad,
  }));
  console.log('[VELOCIDADES] Generated params:', params);
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ velocidad: string }> }): Promise<Metadata> {
  const { velocidad: velocidadSlug } = await params;
  const velocidad = VELOCIDADES[velocidadSlug as VelocidadSlug];

  if (!velocidad) {
    return {
      title: 'Velocidad no encontrada',
    };
  }

  const urlPath = velocidadSlug === 'fibra-optica' 
    ? `internet-fibra-optica-bogota`
    : `internet-${velocidadSlug}-bogota`;

  return {
    title: `Internet ${velocidad.nombre} en Bogotá 2026 | Planes y Precios`,
    description: `${velocidad.descripcion}. Compara planes de internet ${velocidad.velocidad} de ETB, Claro y Movistar en Bogotá. Precio promedio: $${velocidad.precioPromedio} COP/mes.`,
    keywords: [
      `internet ${velocidad.velocidad} bogotá`,
      `planes ${velocidad.velocidad}`,
      `internet ${velocidad.nombre} bogotá`,
      'comparador internet',
      'ETB Claro Movistar',
    ],
    alternates: {
      canonical: `https://comparadorinternet.co/${urlPath}`,
    },
    openGraph: {
      title: `Internet ${velocidad.nombre} en Bogotá 2026`,
      description: velocidad.descripcion,
      url: `https://comparadorinternet.co/${urlPath}`,
      siteName: 'Comparador Internet Colombia',
      type: 'website',
    },
  };
}

export default async function VelocidadPage({ params }: { params: Promise<{ velocidad: string }> }) {
  const { velocidad: velocidadSlug } = await params;

  console.log('[VELOCIDADES] Params received:', params);
  console.log('[VELOCIDADES] velocidadSlug:', velocidadSlug);
  console.log('[VELOCIDADES] Available velocidades:', Object.keys(VELOCIDADES));

  const velocidad = VELOCIDADES[velocidadSlug as VelocidadSlug];

  if (!velocidad) {
    console.log('[VELOCIDADES] Velocidad NOT FOUND');
    return <div>Velocidad no encontrada</div>;
  }

  console.log('[VELOCIDADES] Found velocidad:', velocidad.nombre);

  const providers = getAllProviders();

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-10 h-10" />
              <span className="text-xl font-semibold">Internet {velocidad.velocidad}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              Planes de Internet {velocidad.nombre} en Bogotá 2026
            </h1>
            
            <p className="text-xl text-blue-100 mb-8">
              {velocidad.descripcion}. Compara los mejores planes de <strong>ETB</strong>, <strong>Claro</strong> y <strong>Movistar</strong> con velocidad de {velocidad.velocidad}.
            </p>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
              <h2 className="font-bold text-lg mb-4">Te llamamos gratis para ofrecerte planes {velocidad.velocidad}:</h2>
              <QuickCallForm buttonColor="#2563eb" />
            </div>

            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-start gap-2">
                <Shield className="w-5 h-5 text-blue-300 flex-shrink-0 mt-0.5" />
                <span>Uso recomendado: {velocidad.usoRecomendado}</span>
              </div>
              <div className="flex items-start gap-2">
                <TrendingUp className="w-5 h-5 text-blue-300 flex-shrink-0 mt-0.5" />
                <span>Precio promedio: ${velocidad.precioPromedio} COP/mes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Características principales */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-black mb-8">¿Qué puedes hacer con {velocidad.velocidad}?</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {velocidad.caracteristicas.map((caracteristica, idx) => (
                <div key={idx} className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex items-start gap-3">
                    <Wifi className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                    <span className="font-semibold">{caracteristica}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="font-bold text-lg mb-4">Detalles de uso con {velocidad.velocidad}</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <span className="font-semibold text-blue-900">📺 Streaming:</span>
                  <p className="text-gray-700">{velocidad.detalles.streaming}</p>
                </div>
                <div>
                  <span className="font-semibold text-blue-900">🎮 Gaming:</span>
                  <p className="text-gray-700">{velocidad.detalles.gaming}</p>
                </div>
                <div>
                  <span className="font-semibold text-blue-900">💼 Trabajo:</span>
                  <p className="text-gray-700">{velocidad.detalles.trabajo}</p>
                </div>
                <div>
                  <span className="font-semibold text-blue-900">👥 Usuarios:</span>
                  <p className="text-gray-700">{velocidad.detalles.usuarios}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Planes por operador */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-black mb-8">Operadores con planes de {velocidad.velocidad}</h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {providers.map((provider) => (
                <div key={provider.slug} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`${provider.name === 'ETB' ? 'bg-[#0033A0] p-3 rounded-lg' : ''}`}>
                      <Image
                        src={provider.brand.logo}
                        alt={`${provider.name} logo`}
                        width={60}
                        height={30}
                        className="h-8 w-auto"
                      />
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-lg mb-2">{provider.name}</h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-green-600 font-semibold">
                      <Download className="w-4 h-4" />
                      <span>Hasta {velocidad.velocidad}</span>
                    </div>
                    {velocidadSlug === 'fibra-optica' && (
                      <div className="flex items-center gap-2 text-blue-600 font-semibold">
                        <Upload className="w-4 h-4" />
                        <span>Simétrica</span>
                      </div>
                    )}
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

            {/* Banner Calculadora */}
            <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl p-8 mb-8 text-center shadow-lg">
              <div className="max-w-2xl mx-auto">
                <h3 className="text-2xl font-black text-gray-900 mb-3">
                  💡 ¿Es {velocidad.velocidad} la velocidad correcta para ti?
                </h3>
                <p className="text-gray-800 mb-5 text-lg">
                  Descúbrelo con nuestra calculadora inteligente en <strong>menos de 1 minuto</strong>
                </p>
                <a
                  href="/calculadora"
                  className="inline-block bg-gray-900 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  📊 Calcular mi Velocidad Ideal
                </a>
                <p className="text-sm text-gray-700 mt-3">
                  ✅ Gratis • ✅ Sin registro • ✅ Resultados instantáneos
                </p>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="font-bold text-lg mb-3">💡 Consejo para elegir {velocidad.velocidad}</h3>
              <p className="text-gray-700">
                {velocidadSlug === 'fibra-optica' 
                  ? 'La fibra óptica ofrece la mejor estabilidad y velocidades simétricas. Todos los operadores en Bogotá ofrecen esta tecnología. Verifica disponibilidad en tu dirección exacta.'
                  : `Los ${velocidad.velocidad} son ${velocidad.descripcion.toLowerCase()}. Considera la cantidad de dispositivos conectados simultáneamente y el tipo de actividades que realizarás para asegurar una experiencia óptima.`
                }
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparativa de velocidades */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-black mb-8">Compara con otras velocidades</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(VELOCIDADES)
                .filter(([slug]) => slug !== velocidadSlug)
                .map(([slug, vel]) => (
                  <Link
                    key={slug}
                    href={slug === 'fibra-optica' ? '/internet-fibra-optica-bogota' : `/internet-${slug}-bogota`}
                    className="bg-white rounded-lg p-5 hover:shadow-lg transition-shadow border-2 border-transparent hover:border-blue-500"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-5 h-5 text-blue-600" />
                      <h3 className="font-bold">{vel.nombre}</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{vel.velocidad}</p>
                    <p className="text-xs text-gray-500">{vel.usoRecomendado}</p>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-12 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-black mb-4">¿Listo para contratar {velocidad.velocidad}?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Compara planes y elige el mejor para ti
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors"
          >
            Comparar Todos los Planes
          </Link>
        </div>
      </section>
    </>
  );
}
