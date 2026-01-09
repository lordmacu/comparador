import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getAllProviders } from '@/lib/data';
import QuickCallForm from '@/components/QuickCallForm';
import ClusterNavigation from '@/components/ClusterNavigation';
import { Gamepad2, Briefcase, Video, Zap, Shield, TrendingUp, Lightbulb, Tv, Trophy, Check, Clock, Target, Camera, Lock, Smartphone, Wifi } from 'lucide-react';

// Definir los casos de uso
const CASOS_USO = {
  gaming: {
    nombre: 'Gaming',
    icon: Gamepad2,
    descripcion: 'Internet de baja latencia para gaming competitivo y streaming',
    velocidadMinima: '300 Mbps',
    velocidadRecomendada: '500-900 Mbps',
    requisitos: [
      'Latencia baja (ping menor a 20ms)',
      'Velocidad de subida alta para streaming',
      'Conexión estable sin interrupciones',
      'Priorización de tráfico gaming'
    ],
    usos: [
      'Fortnite, Valorant, Call of Duty online',
      'Streaming en Twitch o YouTube Gaming',
      'Descargas rápidas de juegos (50-150 GB)',
      'Actualización automática de juegos'
    ]
  },
  teletrabajo: {
    nombre: 'Teletrabajo',
    icon: Briefcase,
    descripcion: 'Conexión confiable para trabajo remoto y videollamadas profesionales',
    velocidadMinima: '200 Mbps',
    velocidadRecomendada: '300-500 Mbps',
    requisitos: [
      'Velocidad simétrica (subida = bajada)',
      'Alta estabilidad durante el día',
      'Buen soporte técnico rápido',
      'Conexión suficiente para VPN corporativa'
    ],
    usos: [
      'Videollamadas Zoom, Teams, Meet en HD',
      'Compartir pantalla sin lag',
      'Subir archivos pesados a la nube',
      'Acceso a servidores corporativos'
    ]
  },
  streaming: {
    nombre: 'Streaming',
    icon: Video,
    descripcion: 'Velocidad para disfrutar streaming 4K en múltiples dispositivos',
    velocidadMinima: '300 Mbps',
    velocidadRecomendada: '500 Mbps',
    requisitos: [
      'Velocidad constante sin picos',
      'Ancho de banda para varios dispositivos',
      'Baja latencia para streaming en vivo',
      'Sin límites de descarga'
    ],
    usos: [
      'Netflix, Disney+, Prime Video en 4K',
      'Múltiples TV streaming simultáneo',
      'YouTube, Twitch sin buffering',
      'Spotify, Apple Music sin cortes'
    ]
  }
};

type CasoUsoSlug = keyof typeof CASOS_USO;

export const revalidate = 3600; // Revalidar cada hora
export const dynamicParams = false; // Solo generar rutas definidas

export async function generateStaticParams() {
  console.log('[CASOS] generateStaticParams called');
  const params = Object.keys(CASOS_USO).map((caso) => ({
    caso,
  }));
  console.log('[CASOS] Generated params:', params);
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ caso: string }> }): Promise<Metadata> {
  const { caso: casoSlug } = await params;
  const caso = CASOS_USO[casoSlug as CasoUsoSlug];
  
  if (!caso) {
    return {
      title: 'Internet en Colombia | Comparador',
    };
  }

  return {
    title: `Mejor Internet para ${caso.nombre} en Bogotá 2026 | ETB, Claro, Movistar`,
    description: `Descubre el mejor internet para ${caso.nombre.toLowerCase()} en Bogotá. ${caso.descripcion}. Compara planes de ETB, Claro y Movistar.`,
    keywords: [
      `internet para ${caso.nombre.toLowerCase()}`,
      `mejor internet ${caso.nombre.toLowerCase()} Bogotá`,
      `internet ${caso.nombre.toLowerCase()} Colombia`,
      `plan internet ${caso.nombre.toLowerCase()}`,
      `${caso.nombre.toLowerCase()} sin lag`,
      `velocidad internet ${caso.nombre.toLowerCase()}`,
    ],
    alternates: {
      canonical: `https://comparadorinternet.co/mejor-internet-${casoSlug}-bogota`,
    },
    openGraph: {
      title: `Mejor Internet para ${caso.nombre} en Bogotá 2026`,
      description: caso.descripcion,
      url: `https://comparadorinternet.co/mejor-internet-${casoSlug}-bogota`,
    },
  };
}

export default async function CasoUsoPage({ params }: { params: Promise<{ caso: string }> }) {
  console.log('[CASOS] Params received:', params);
  const { caso: casoSlug } = await params;
  console.log('[CASOS] casoSlug:', casoSlug);
  console.log('[CASOS] Available casos:', Object.keys(CASOS_USO));
  const caso = CASOS_USO[casoSlug as CasoUsoSlug];
  console.log('[CASOS] Found caso:', caso ? caso.nombre : 'NOT FOUND');
  const providers = getAllProviders();

  if (!caso) {
    return <div>Caso de uso no encontrado</div>;
  }

  const Icon = caso.icon;

  // Determinar el mejor operador según el caso
  const mejorOperador = casoSlug === 'gaming' ? 'Claro' : 
                        casoSlug === 'teletrabajo' ? 'Movistar' :
                        'ETB';

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <Icon className="w-8 h-8" />
              <span className="text-xl font-semibold">{caso.nombre}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              Mejor Internet para {caso.nombre} en Bogotá 2026
            </h1>
            
            <p className="text-xl text-purple-100 mb-8">
              {caso.descripcion}. Compara planes optimizados de <strong>ETB</strong>, <strong>Claro</strong> y <strong>Movistar</strong>.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-sm text-purple-200 mb-1">Velocidad Mínima</div>
                <div className="text-2xl font-bold">{caso.velocidadMinima}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-sm text-purple-200 mb-1">Velocidad Recomendada</div>
                <div className="text-2xl font-bold">{caso.velocidadRecomendada}</div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h2 className="font-bold text-lg mb-4">Te asesoramos gratis para encontrar el mejor plan:</h2>
              <QuickCallForm buttonColor="#a855f7" />
            </div>
          </div>
        </div>
      </section>

      {/* Requisitos */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-black mb-8">
              Requisitos de Internet para {caso.nombre}
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Shield className="w-6 h-6 text-indigo-600" />
                  Características Técnicas
                </h3>
                <ul className="space-y-3">
                  {caso.requisitos.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Zap className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Icon className="w-6 h-6 text-purple-600" />
                  Usos Principales
                </h3>
                <ul className="space-y-3">
                  {caso.usos.map((uso, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <TrendingUp className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span>{uso}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6">
              <h3 className="font-bold text-lg mb-3"><Lightbulb className="w-5 h-5 inline mr-2" /> Recomendación del Experto</h3>
              <p className="text-gray-700">
                Para {caso.nombre.toLowerCase()}, recomendamos planes de al menos <strong>{caso.velocidadMinima}</strong>, 
                pero idealmente <strong>{caso.velocidadRecomendada}</strong> para una experiencia óptima sin interrupciones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Planes Recomendados */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-black mb-4">
              Mejores Planes para {caso.nombre}
            </h2>
            <p className="text-gray-600 mb-8">
              Estos operadores ofrecen las mejores características para {caso.nombre.toLowerCase()} en Bogotá:
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {providers.map((provider, idx) => {
                const esMejor = provider.name === mejorOperador;
                
                return (
                  <div 
                    key={provider.slug} 
                    className={`bg-white rounded-lg p-6 ${esMejor ? 'border-4 border-indigo-500 relative' : 'border-2 border-gray-200'}`}
                  >
                    {esMejor && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-indigo-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                        <Trophy className="w-5 h-5 inline" /> Mejor para {caso.nombre}
                      </div>
                    )}

                    <div className="flex items-center justify-center mb-4 mt-2">
                      <Image
                        src={provider.brand.logo}
                        alt={`${provider.name} logo`}
                        width={100}
                        height={50}
                        className="h-12 w-auto"
                      />
                    </div>

                    <h3 className="text-xl font-bold mb-4 text-center">{provider.name}</h3>

                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Velocidad:</span>
                        <span className="font-semibold">Hasta 900 Mbps</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Tecnología:</span>
                        <span className="font-semibold">{provider.coverage.technology}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Latencia:</span>
                        <span className="font-semibold">
                          {provider.name === 'Claro' ? '< 15ms' : '< 20ms'}
                        </span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="font-semibold mb-2 text-sm">Ideal para:</div>
                      <ul className="text-sm space-y-1">
                        {provider.whyChoose?.slice(0, 2).map((ventaja, i) => (
                          <li key={i} className="text-gray-700 flex items-start gap-2">
                            <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                            <span>{ventaja}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link
                      href={`/${provider.slug}`}
                      className={`block text-center px-4 py-3 rounded-lg font-bold transition-colors ${
                        esMejor 
                          ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                      }`}
                    >
                      Ver Planes {provider.name}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Consejos Específicos */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-black mb-8">
              Consejos para Optimizar tu Internet para {caso.nombre}
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {casoSlug === 'gaming' && (
                <>
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-3"><Gamepad2 className="w-5 h-5 inline mr-2" /> Conexión por Cable</h3>
                    <p className="text-sm text-gray-700">
                      Usa cable Ethernet en lugar de WiFi para reducir latencia. 
                      Un cable Cat 6 directo al router puede reducir el ping en 10-20ms.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-3">⚡ QoS Gaming</h3>
                    <p className="text-sm text-gray-700">
                      Configura Quality of Service (QoS) en tu router para priorizar 
                      el tráfico de gaming sobre otros dispositivos.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                      <Clock className="w-5 h-5" /> Horarios
                    </h3>
                    <p className="text-sm text-gray-700">
                      Juega en horas de menor congestión (9 AM - 3 PM) para 
                      obtener la mejor latencia posible.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                      <Target className="w-5 h-5" /> Servidor Cercano
                    </h3>
                    <p className="text-sm text-gray-700">
                      Selecciona servidores en Brasil o Miami para obtener el menor 
                      ping desde Colombia (30-60ms típicamente).
                    </p>
                  </div>
                </>
              )}

              {casoSlug === 'teletrabajo' && (
                <>
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-3"><Briefcase className="w-5 h-5 inline mr-2" /> Router Profesional</h3>
                    <p className="text-sm text-gray-700">
                      Invierte en un router de calidad con WiFi 6 para mejor cobertura 
                      y estabilidad en toda tu casa.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                      <Camera className="w-5 h-5" /> Videollamadas HD
                    </h3>
                    <p className="text-sm text-gray-700">
                      Para Zoom/Teams, necesitas mínimo 3 Mbps subida y bajada. 
                      Un plan de 300 Mbps simétrico es ideal.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                      <Lock className="w-5 h-5" /> VPN Corporativa
                    </h3>
                    <p className="text-sm text-gray-700">
                      Si usas VPN, considera 30-40% más velocidad de la que necesitas, 
                      ya que las VPN reducen el rendimiento.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-3">☁️ Respaldo 4G/5G</h3>
                    <p className="text-sm text-gray-700">
                      Mantén un plan móvil con datos como respaldo para reuniones 
                      críticas en caso de fallas del internet fijo.
                    </p>
                  </div>
                </>
              )}

              {casoSlug === 'streaming' && (
                <>
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-3"><Tv className="w-5 h-5 inline mr-2" /> 4K Streaming</h3>
                    <p className="text-sm text-gray-700">
                      Netflix 4K requiere 25 Mbps por TV. Con 500 Mbps puedes 
                      ver 4K en 3-4 TV simultáneamente sin problemas.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                      <Smartphone className="w-5 h-5" /> Múltiples Dispositivos
                    </h3>
                    <p className="text-sm text-gray-700">
                      Calcula 50 Mbps por persona para streaming + navegación. 
                      Familia de 4: mínimo 200 Mbps, ideal 500 Mbps.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                      <Wifi className="w-5 h-5" /> WiFi Óptimo
                    </h3>
                    <p className="text-sm text-gray-700">
                      Ubica el router en el centro de tu casa. Para casas grandes, 
                      usa repetidores o sistema mesh WiFi.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-3">⏱️ Horario Prime</h3>
                    <p className="text-sm text-gray-700">
                      7-11 PM es horario pico. Si ves mucho streaming nocturno, 
                      considera plan de 500+ Mbps para evitar lentitud.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-black mb-8">Preguntas Frecuentes</h2>

            <div className="space-y-4">
              <details className="bg-white rounded-lg p-6">
                <summary className="font-bold text-lg cursor-pointer">
                  ¿Qué velocidad necesito para {caso.nombre.toLowerCase()}?
                </summary>
                <p className="mt-4 text-gray-700">
                  La velocidad mínima recomendada es <strong>{caso.velocidadMinima}</strong>, 
                  pero para una experiencia óptima sugerimos <strong>{caso.velocidadRecomendada}</strong>. 
                  Esto garantiza que puedas realizar todas las actividades sin interrupciones, 
                  incluso si hay otros dispositivos conectados.
                </p>
              </details>

              <details className="bg-white rounded-lg p-6">
                <summary className="font-bold text-lg cursor-pointer">
                  ¿Cuál operador es mejor para {caso.nombre.toLowerCase()}?
                </summary>
                <p className="mt-4 text-gray-700">
                  {casoSlug === 'gaming' && 
                    'Claro destaca por su baja latencia y estabilidad. ETB también es excelente con velocidad simétrica ideal para streaming mientras juegas.'}
                  {casoSlug === 'teletrabajo' && 
                    'Movistar ofrece la mejor velocidad simétrica crucial para videollamadas y subir archivos. ETB destaca en soporte técnico local.'}
                  {casoSlug === 'streaming' && 
                    'Los tres operadores funcionan bien. ETB y Movistar tienen velocidad simétrica, Claro ofrece gran estabilidad. Elige según tu zona.'}
                </p>
              </details>

              <details className="bg-white rounded-lg p-6">
                <summary className="font-bold text-lg cursor-pointer">
                  ¿WiFi o cable es mejor para {caso.nombre.toLowerCase()}?
                </summary>
                <p className="mt-4 text-gray-700">
                  {casoSlug === 'gaming' && 
                    'Cable Ethernet es MUCHO mejor. Reduce latencia en 10-20ms y elimina pérdidas de paquetes del WiFi.'}
                  {casoSlug === 'teletrabajo' && 
                    'Para el escritorio de trabajo, usa cable. Para movilidad en casa, WiFi 6 de calidad es suficiente.'}
                  {casoSlug === 'streaming' && 
                    'WiFi es suficiente para streaming 4K si tienes buen router. Cable da más estabilidad pero no es crítico.'}
                </p>
              </details>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-12 bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-black mb-4">
              Encuentra el Plan Perfecto para {caso.nombre}
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Compara planes de ETB, Claro y Movistar optimizados para tu uso
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

      {/* Content Cluster Navigation */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <ClusterNavigation />
          </div>
        </div>
      </section>
    </>
  );
}
