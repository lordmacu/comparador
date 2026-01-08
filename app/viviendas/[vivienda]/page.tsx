import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllProviders } from '@/lib/data';
import QuickCallForm from '@/components/QuickCallForm';

interface ViviendaInfo {
  nombre: string;
  titulo: string;
  descripcion: string;
  caracteristicas: Array<{
    icono: string;
    titulo: string;
    descripcion: string;
  }>;
  consideraciones: string[];
  velocidadRecomendada: string;
  tipoUsuarios: string;
  instalacion: string;
  precioPromedio: string;
}

const VIVIENDAS: Record<string, ViviendaInfo> = {
  'apartamento': {
    nombre: 'Apartamento',
    titulo: 'Internet para Apartamento en Bogotá',
    descripcion: 'Encuentra el mejor plan de internet para tu apartamento. Compara precios, velocidades y beneficios de ETB, Claro y Movistar para espacios reducidos.',
    caracteristicas: [
      {
        icono: '🏠',
        titulo: 'Optimizado para Espacios Pequeños',
        descripcion: 'Cobertura WiFi perfecta para apartamentos de 50-100m² sin necesidad de repetidores adicionales.'
      },
      {
        icono: '📱',
        titulo: 'Ideal para 2-4 Personas',
        descripcion: 'Suficiente para streaming simultáneo, videollamadas y navegación sin interrupciones.'
      },
      {
        icono: '💰',
        titulo: 'Planes Económicos',
        descripcion: 'Desde $50.000/mes con velocidades entre 100-300 Mbps, perfectas para apartamentos.'
      },
      {
        icono: '🔧',
        titulo: 'Instalación Rápida',
        descripcion: 'Instalación en 24-48 horas sin obras. Ideal para arrendatarios que no pueden hacer modificaciones.'
      }
    ],
    consideraciones: [
      'Verifica si tu edificio tiene preinstalación de fibra óptica',
      'Los planes de 100-200 Mbps son ideales para apartamentos pequeños',
      'Ubica el router en zona central para mejor cobertura',
      'Algunos edificios tienen convenios especiales con operadores'
    ],
    velocidadRecomendada: '100-200 Mbps',
    tipoUsuarios: '2-4 personas',
    instalacion: '24-48 horas',
    precioPromedio: '$50.000 - $90.000'
  },
  'casa': {
    nombre: 'Casa',
    titulo: 'Internet para Casa en Bogotá',
    descripcion: 'Encuentra el mejor internet para tu casa en Bogotá. Planes con mayor cobertura WiFi, múltiples dispositivos y velocidades superiores para toda la familia.',
    caracteristicas: [
      {
        icono: '🏡',
        titulo: 'Mayor Cobertura WiFi',
        descripcion: 'Routers potentes o mesh WiFi para cubrir casas de 100-200m² incluyendo segundo piso y jardín.'
      },
      {
        icono: '👨‍👩‍👧‍👦',
        titulo: 'Para Toda la Familia',
        descripcion: 'Soporta 5-10 dispositivos simultáneos: Smart TV, tablets, consolas, computadores y celulares.'
      },
      {
        icono: '🎮',
        titulo: 'Gaming y Streaming 4K',
        descripcion: 'Velocidades 300-500 Mbps para gaming online, streaming 4K y teletrabajo sin lag.'
      },
      {
        icono: '🛡️',
        titulo: 'Mayor Estabilidad',
        descripcion: 'Conexión dedicada con menor congestión que edificios. Ideal para domótica y cámaras de seguridad.'
      }
    ],
    consideraciones: [
      'Casas de 2 pisos pueden necesitar repetidores WiFi o sistema mesh',
      'Velocidades de 300-500 Mbps recomendadas para familias numerosas',
      'Considera planes con TV incluida si tienes múltiples televisores',
      'Verifica cobertura de fibra óptica en tu barrio específico'
    ],
    velocidadRecomendada: '300-500 Mbps',
    tipoUsuarios: '4-8 personas',
    instalacion: '48-72 horas',
    precioPromedio: '$90.000 - $150.000'
  },
  'oficina': {
    nombre: 'Oficina',
    titulo: 'Internet para Oficina en Bogotá',
    descripcion: 'Internet empresarial para oficinas en Bogotá. Planes con IP fija, mayor velocidad de carga, soporte prioritario y SLA garantizado.',
    caracteristicas: [
      {
        icono: '💼',
        titulo: 'Internet Empresarial',
        descripcion: 'Planes corporativos con IP fija, velocidad simétrica y soporte técnico 24/7 prioritario.'
      },
      {
        icono: '☁️',
        titulo: 'Para Aplicaciones Cloud',
        descripcion: 'Alta velocidad de carga (upload) para trabajar con Drive, Dropbox, Teams y herramientas colaborativas.'
      },
      {
        icono: '👥',
        titulo: 'Múltiples Usuarios',
        descripcion: 'Soporta 10-50 empleados trabajando simultáneamente con videollamadas, CRM y aplicaciones pesadas.'
      },
      {
        icono: '🔒',
        titulo: 'Seguridad Empresarial',
        descripcion: 'VPN corporativa, firewall avanzado y protección contra amenazas para datos empresariales.'
      }
    ],
    consideraciones: [
      'Planes empresariales desde 500 Mbps con IP fija incluida',
      'Soporte técnico prioritario con SLA de respuesta garantizada',
      'Velocidad simétrica (misma subida y bajada) esencial para oficinas',
      'Considera planes con respaldo 4G para evitar caídas críticas'
    ],
    velocidadRecomendada: '500 Mbps - 1 Gbps',
    tipoUsuarios: '10-50 empleados',
    instalacion: '3-5 días hábiles',
    precioPromedio: '$150.000 - $400.000'
  },
  'edificio': {
    nombre: 'Edificio',
    titulo: 'Internet para Edificio en Bogotá',
    descripcion: 'Internet para edificios residenciales en Bogotá. Planes corporativos, precios por volumen y gestión centralizada para conjuntos y copropiedades.',
    caracteristicas: [
      {
        icono: '🏢',
        titulo: 'Planes Corporativos',
        descripcion: 'Convenios especiales para edificios con descuentos por volumen. Un solo contrato para todos los apartamentos.'
      },
      {
        icono: '📊',
        titulo: 'Gestión Centralizada',
        descripcion: 'Administración única desde portería. Control de pagos y soporte técnico centralizado.'
      },
      {
        icono: '💎',
        titulo: 'Infraestructura Dedicada',
        descripcion: 'Fibra óptica exclusiva para el edificio. Menor congestión y mejor velocidad que conexiones individuales.'
      },
      {
        icono: '🎁',
        titulo: 'Beneficios Exclusivos',
        descripcion: 'Internet en zonas comunes gratis, descuentos en TV e instalación sin costo para todos los residentes.'
      }
    ],
    consideraciones: [
      'Requiere aprobación de asamblea de copropietarios',
      'Descuentos del 20-40% vs. contratos individuales',
      'Internet gratis en portería, gimnasio y zonas comunes',
      'Instalación y cableado interno incluido en el convenio'
    ],
    velocidadRecomendada: '200-500 Mbps por apartamento',
    tipoUsuarios: '50+ apartamentos',
    instalacion: '2-4 semanas',
    precioPromedio: '$40.000 - $80.000 por apto'
  }
};

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  console.log('[VIVIENDAS] generateStaticParams called');
  const params = Object.keys(VIVIENDAS).map((vivienda) => ({
    vivienda
  }));
  console.log('[VIVIENDAS] Generated params:', params);
  return params;
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ vivienda: string }> 
}): Promise<Metadata> {
  const { vivienda: viviendaSlug } = await params;
  const vivienda = VIVIENDAS[viviendaSlug];

  if (!vivienda) {
    return {
      title: 'Tipo de vivienda no encontrado',
    };
  }

  return {
    title: `${vivienda.titulo} 2026 | Planes desde ${vivienda.precioPromedio}`,
    description: vivienda.descripcion,
    keywords: `internet ${vivienda.nombre.toLowerCase()} bogotá, internet para ${vivienda.nombre.toLowerCase()}, planes internet ${vivienda.nombre.toLowerCase()}, mejor internet ${vivienda.nombre.toLowerCase()} bogotá`,
    openGraph: {
      title: vivienda.titulo,
      description: vivienda.descripcion,
      type: 'website',
      locale: 'es_CO',
    },
    twitter: {
      card: 'summary_large_image',
      title: vivienda.titulo,
      description: vivienda.descripcion,
    },
    alternates: {
      canonical: `https://comparadorinternet.co/internet-para-${viviendaSlug}-bogota`,
    },
  };
}

export default async function ViviendaPage({ 
  params 
}: { 
  params: Promise<{ vivienda: string }> 
}) {
  console.log('[VIVIENDAS] Params received:', params);
  const { vivienda: viviendaSlug } = await params;
  console.log('[VIVIENDAS] viviendaSlug:', viviendaSlug);
  
  const vivienda = VIVIENDAS[viviendaSlug];
  console.log('[VIVIENDAS] Found vivienda:', vivienda?.nombre);

  if (!vivienda) {
    notFound();
  }

  const providers = getAllProviders();

  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {vivienda.titulo}
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                {vivienda.descripcion}
              </p>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
                <h2 className="font-bold text-lg mb-4">Te llamamos gratis para consultar planes para tu {vivienda.nombre}:</h2>
                <QuickCallForm buttonColor="#2563eb" />
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                  <div className="text-2xl font-bold">{vivienda.velocidadRecomendada}</div>
                  <div className="text-sm text-blue-200">Velocidad</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                  <div className="text-2xl font-bold">{vivienda.tipoUsuarios}</div>
                  <div className="text-sm text-blue-200">Usuarios</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                  <div className="text-2xl font-bold">{vivienda.instalacion}</div>
                  <div className="text-sm text-blue-200">Instalación</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                  <div className="text-2xl font-bold">{vivienda.precioPromedio}</div>
                  <div className="text-sm text-blue-200">Precio/mes</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Características Section */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">
              ¿Por Qué Elegir Internet para {vivienda.nombre}?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {vivienda.caracteristicas.map((caracteristica, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all">
                  <div className="text-4xl mb-4">{caracteristica.icono}</div>
                  <h3 className="text-xl font-bold mb-3">{caracteristica.titulo}</h3>
                  <p className="text-gray-600">{caracteristica.descripcion}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Consideraciones Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">
              Consideraciones Importantes
            </h2>
            <div className="bg-blue-50 rounded-2xl p-8">
              <ul className="space-y-4">
                {vivienda.consideraciones.map((consideracion, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-blue-600 text-xl mt-1">✓</span>
                    <span className="text-gray-700 text-lg">{consideracion}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Proveedores Section */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">
              Mejores Proveedores para {vivienda.nombre}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {providers.map((provider) => (
                <div key={provider.slug} className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all">
                  <div className="flex justify-center mb-6">
                    <div className={`relative w-32 h-32 ${provider.name === 'ETB' ? 'bg-[#0033A0] p-3 rounded-lg' : ''}`}>
                      <img
                        src={provider.brand.logo}
                        alt={`Logo ${provider.name}`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-center mb-4">{provider.name}</h3>
                  <p className="text-center text-gray-600 mb-6">{provider.tagline}</p>
                  <div className="space-y-3 mb-6">
                    {provider.mainBenefits.slice(0, 3).map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">✓</span>
                        <span className="text-gray-700 text-sm">{benefit.title}</span>
                      </div>
                    ))}
                  </div>
                  <a
                    href={`/${provider.slug}`}
                    className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all"
                  >
                    Ver Planes {provider.name}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparar Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">
              Compara Otros Tipos de Vivienda
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(VIVIENDAS)
                .filter(([key]) => key !== viviendaSlug)
                .map(([key, viviendaItem]) => (
                  <a
                    key={key}
                    href={`/internet-para-${key}-bogota`}
                    className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all text-center"
                  >
                    <div className="text-4xl mb-3">{viviendaItem.caracteristicas[0].icono}</div>
                    <h3 className="text-xl font-bold mb-2">{viviendaItem.nombre}</h3>
                    <p className="text-sm text-gray-600 mb-3">{viviendaItem.velocidadRecomendada}</p>
                    <span className="text-blue-600 font-semibold">Ver Planes →</span>
                  </a>
                ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-blue-800">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              ¿Listo para Contratar Internet para tu {vivienda.nombre}?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Te ayudamos a encontrar el mejor plan para tus necesidades
            </p>
            <QuickCallForm />
          </div>
        </section>
      </main>
    </>
  );
}
