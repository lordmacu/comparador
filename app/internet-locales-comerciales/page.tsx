import type { Metadata } from 'next';
import Link from 'next/link';
import { Store, CreditCard, Wifi, Camera, Shield, CheckCircle2, Calculator, Smartphone, ShoppingBag, Shirt, Coffee, Package, ArrowRight } from 'lucide-react';
import QuickCallForm from '@/components/QuickCallForm';
import Breadcrumbs from '@/components/Breadcrumbs';
import LastUpdated from '@/components/LastUpdated';

export const metadata: Metadata = {
  title: 'Internet para Locales Comerciales 2026 | Datáfono + WiFi desde $69.900',
  description: 'Internet para tiendas, boutiques y comercios en Bogotá. Conexión estable para datáfonos, punto de venta POS y WiFi clientes. Planes desde $69.900. Cotiza ETB, Claro, Movistar.',
  keywords: [
    'internet locales comerciales',
    'internet para tiendas',
    'internet comercio bogota',
    'internet para negocios',
    'internet datafono',
    'wifi para tienda',
    'internet boutique',
    'internet almacen bogota',
    'internet punto de venta',
    'planes internet comercial'
  ],
  alternates: {
    canonical: 'https://comparadorinternet.co/internet-locales-comerciales',
  },
  openGraph: {
    title: 'Internet para Locales Comerciales 2026 | Tiendas y Comercios',
    description: 'Conectividad estable para datáfonos, POS y WiFi de clientes en tu local comercial.',
    url: 'https://comparadorinternet.co/internet-locales-comerciales',
    siteName: 'Comparador Internet Colombia',
    locale: 'es_CO',
    type: 'website',
  },
};

const tiposLocales = [
  {
    nombre: 'Tiendas de Ropa',
    descripcion: 'Boutiques, almacenes de moda',
    icon: Shirt,
    necesidades: ['Datáfono', 'WiFi clientes', 'Cámaras'],
    velocidadMin: '50 Mbps'
  },
  {
    nombre: 'Minimercados',
    descripcion: 'Tiendas de barrio, fruvers',
    icon: ShoppingBag,
    necesidades: ['POS', 'Datáfono', 'Facturación'],
    velocidadMin: '30 Mbps'
  },
  {
    nombre: 'Cafeterías',
    descripcion: 'Cafés, panaderías pequeñas',
    icon: Coffee,
    necesidades: ['WiFi clientes', 'POS', 'Domicilios'],
    velocidadMin: '100 Mbps'
  },
  {
    nombre: 'Ferreterías',
    descripcion: 'Depósitos, ferreterías',
    icon: Package,
    necesidades: ['Inventario', 'Facturación', 'POS'],
    velocidadMin: '50 Mbps'
  },
];

const planesComerciales = [
  {
    nombre: 'Comercio Básico',
    velocidad: '50 Mbps',
    precio: '$69.900',
    ideal: 'Tiendas pequeñas',
    caracteristicas: [
      'Suficiente para 1-2 datáfonos',
      'Router WiFi incluido',
      'Instalación gratis',
      'Soporte telefónico'
    ],
    destacado: false
  },
  {
    nombre: 'Comercio Plus',
    velocidad: '100 Mbps',
    precio: '$89.900',
    ideal: 'Tiendas con WiFi clientes',
    caracteristicas: [
      'WiFi para clientes separado',
      'Múltiples datáfonos',
      '2-3 cámaras de seguridad',
      'Soporte prioritario'
    ],
    destacado: true
  },
  {
    nombre: 'Comercio Pro',
    velocidad: '200 Mbps',
    precio: '$119.900',
    ideal: 'Locales con alto tráfico',
    caracteristicas: [
      'IP Fija disponible',
      'WiFi empresarial',
      'Múltiples cámaras HD',
      'Facturación electrónica DIAN'
    ],
    destacado: false
  },
];

const necesidadesCriticas = [
  {
    titulo: 'Datáfonos / Pagos con Tarjeta',
    descripcion: 'Un datáfono necesita conexión estable (no necesariamente rápida). Con 10 Mbps por datáfono es suficiente, pero la estabilidad es crítica.',
    icon: CreditCard,
    consejo: 'La fibra óptica es 10x más estable que el internet por cable coaxial.'
  },
  {
    titulo: 'Sistema Punto de Venta (POS)',
    descripcion: 'Software como Siigo, World Office o sistemas propios que manejan inventario, facturación y ventas en tiempo real.',
    icon: Smartphone,
    consejo: 'Si tu POS está en la nube, necesitas mínimo 30 Mbps. Si es local, solo el datáfono necesita internet.'
  },
  {
    titulo: 'WiFi para Clientes',
    descripcion: 'Ofrecer WiFi gratis aumenta el tiempo de permanencia y mejora la experiencia. Pero debe estar separado de tu red de negocio.',
    icon: Wifi,
    consejo: 'Pide un router que permita crear 2 redes: una para el negocio y otra para clientes.'
  },
  {
    titulo: 'Cámaras de Seguridad',
    descripcion: 'Cámaras IP que puedes ver desde tu celular. Cada cámara HD consume 5-10 Mbps de subida.',
    icon: Camera,
    consejo: 'Para 4 cámaras HD necesitas mínimo 50 Mbps simétricos. La velocidad de SUBIDA es clave.'
  },
];

export default function InternetLocalesComercialesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'Internet para Locales Comerciales',
            description: 'Planes de internet para tiendas, boutiques y comercios con datáfono y WiFi',
            brand: {
              '@type': 'Brand',
              name: 'Comparador Internet Colombia'
            },
            offers: {
              '@type': 'AggregateOffer',
              lowPrice: '69900',
              highPrice: '200000',
              priceCurrency: 'COP',
              offerCount: '10'
            }
          }),
        }}
      />

      <div className="min-h-screen bg-slate-50">
        {/* Hero */}
        <section className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px)', backgroundSize: '30px 30px'}}></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 px-4 py-2 rounded-full mb-6">
                  <Store className="w-5 h-5 text-emerald-300" />
                  <span className="font-semibold text-emerald-100 uppercase tracking-wide text-sm">Comercios y Tiendas</span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  Internet para <span className="text-emerald-300">Locales Comerciales</span>
                </h1>

                <p className="text-lg text-emerald-100 mb-8 max-w-lg">
                  Conexión estable para que tus datáfonos nunca fallen, tu POS siempre funcione y tus clientes tengan WiFi. Desde $69.900/mes.
                </p>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                    <CreditCard className="w-8 h-8 mx-auto mb-2 text-emerald-300" />
                    <div className="text-sm">Datáfonos</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                    <Wifi className="w-8 h-8 mx-auto mb-2 text-emerald-300" />
                    <div className="text-sm">WiFi Clientes</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                    <Camera className="w-8 h-8 mx-auto mb-2 text-emerald-300" />
                    <div className="text-sm">Cámaras</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/calculadora-empresas"
                    className="bg-white text-emerald-900 font-bold py-4 px-8 rounded-xl text-center transition-all hover:bg-emerald-50 flex items-center justify-center gap-2"
                  >
                    <Calculator className="w-5 h-5" />
                    Calcular Mi Plan
                  </Link>
                  <Link
                    href="#planes"
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 px-8 rounded-xl text-center transition-all"
                  >
                    Ver Precios
                  </Link>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-2xl">
                <h2 className="text-slate-900 text-xl font-bold mb-2">Cotiza para tu Local</h2>
                <p className="text-slate-600 text-sm mb-6">Te contactamos con la mejor opción para tu zona</p>
                <QuickCallForm buttonColor="#059669" provider="Local Comercial" />
              </div>
            </div>
          </div>
        </section>

        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Breadcrumbs
            items={[
              { name: 'Internet Empresas', url: 'https://comparadorinternet.co/internet-empresas-bogota' },
              { name: 'Locales Comerciales', url: 'https://comparadorinternet.co/internet-locales-comerciales' }
            ]}
          />
          <LastUpdated
            date="2026-01-21"
            nextReview="2026-02-21"
            message="Precios para comercios actualizados enero 2026"
          />
        </div>

        {/* Tipos de Locales */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                ¿Qué Tipo de Local Tienes?
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Cada comercio tiene necesidades diferentes. Identifica la tuya.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tiposLocales.map((tipo, index) => {
                const Icon = tipo.icon;
                return (
                  <div key={index} className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:shadow-lg transition-shadow">
                    <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-7 h-7 text-emerald-600" />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-1">{tipo.nombre}</h3>
                    <p className="text-slate-500 text-sm mb-3">{tipo.descripcion}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {tipo.necesidades.map((nec, i) => (
                        <span key={i} className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded">
                          {nec}
                        </span>
                      ))}
                    </div>
                    <div className="text-emerald-600 font-semibold text-sm">
                      Desde {tipo.velocidadMin}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Lo que necesita un local */}
        <section className="py-16 bg-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                ¿Qué Necesita tu Local del Internet?
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Entiende qué requiere cada servicio para elegir el plan correcto
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {necesidadesCriticas.map((necesidad, index) => {
                const Icon = necesidad.icon;
                return (
                  <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 mb-2">{necesidad.titulo}</h3>
                        <p className="text-slate-600 text-sm mb-3">{necesidad.descripcion}</p>
                        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                          <p className="text-emerald-800 text-sm">
                            <strong>Consejo:</strong> {necesidad.consejo}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Planes */}
        <section id="planes" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Planes Internet para Comercios 2026
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Precios promedio en Bogotá. Cotiza para precio exacto en tu zona.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {planesComerciales.map((plan, index) => (
                <div
                  key={index}
                  className={`rounded-2xl overflow-hidden ${
                    plan.destacado
                      ? 'bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-2xl scale-105'
                      : 'bg-white shadow-lg border border-slate-200'
                  }`}
                >
                  {plan.destacado && (
                    <div className="bg-yellow-400 text-yellow-900 text-center py-2 font-bold text-sm">
                      MÁS POPULAR EN COMERCIOS
                    </div>
                  )}
                  <div className="p-8">
                    <h3 className={`text-xl font-bold mb-2 ${plan.destacado ? 'text-white' : 'text-slate-900'}`}>
                      {plan.nombre}
                    </h3>
                    <div className={`text-4xl font-black mb-1 ${plan.destacado ? 'text-white' : 'text-emerald-600'}`}>
                      {plan.velocidad}
                    </div>
                    <div className={`text-2xl font-bold mb-2 ${plan.destacado ? 'text-emerald-100' : 'text-slate-900'}`}>
                      {plan.precio}<span className="text-sm font-normal opacity-70">/mes</span>
                    </div>
                    <p className={`text-sm mb-6 ${plan.destacado ? 'text-emerald-100' : 'text-slate-500'}`}>
                      Ideal: {plan.ideal}
                    </p>

                    <ul className="space-y-3 mb-8">
                      {plan.caracteristicas.map((car, i) => (
                        <li key={i} className={`flex items-center gap-3 text-sm ${plan.destacado ? 'text-white' : 'text-slate-600'}`}>
                          <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${plan.destacado ? 'text-green-300' : 'text-green-500'}`} />
                          {car}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href="/calculadora-empresas"
                      className={`block w-full py-3 rounded-xl text-center font-bold transition-colors ${
                        plan.destacado
                          ? 'bg-white text-emerald-600 hover:bg-emerald-50'
                          : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      }`}
                    >
                      Cotizar Plan
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Advertencia Internet Residencial */}
        <section className="py-16 bg-amber-50 border-y border-amber-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-16 h-16 bg-amber-200 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Shield className="w-8 h-8 text-amber-700" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-amber-900 mb-3">
                  ¿Tienes Internet Residencial en tu Local?
                </h2>
                <p className="text-amber-800 mb-4">
                  Muchos comercios usan internet de hogar para ahorrar, pero esto tiene riesgos:
                </p>
                <ul className="space-y-2 text-amber-800 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-1">!</span>
                    <span><strong>Datáfonos fallan</strong> en horas pico cuando los vecinos saturan el internet</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-1">!</span>
                    <span><strong>Sin IP Fija:</strong> Cámaras de seguridad pierden conexión remota</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-1">!</span>
                    <span><strong>Soporte lento:</strong> 24-72 horas sin internet = ventas perdidas</span>
                  </li>
                </ul>
                <p className="text-amber-900 font-semibold">
                  La diferencia de precio entre residencial y comercial es de $20.000-$30.000/mes.
                  Una venta perdida por datáfono caído cuesta más.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-8">
              Preguntas Frecuentes
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: '¿Cuánta velocidad necesito para mi tienda?',
                  a: 'Para un local básico con 1-2 datáfonos: 30-50 Mbps. Si ofreces WiFi a clientes: 100 Mbps. Si tienes cámaras de seguridad: 100-200 Mbps. Usa nuestra calculadora para un cálculo preciso.'
                },
                {
                  q: '¿Puedo usar internet de hogar para mi negocio?',
                  a: 'Técnicamente sí, pero no es recomendable. Los planes residenciales tienen reuso alto (1:10), soporte lento y no incluyen IP fija. Una caída en hora pico puede costarte más en ventas perdidas que la diferencia de precio.'
                },
                {
                  q: '¿Necesito IP fija para mi local comercial?',
                  a: 'Solo si tienes cámaras de seguridad que quieres ver remotamente, o si usas facturación electrónica desde un servidor local. Para datáfonos y POS en la nube, no es necesaria.'
                },
                {
                  q: '¿Puedo tener WiFi para clientes y otra red para el negocio?',
                  a: 'Sí, y es lo recomendado. Pide un router que permita crear redes separadas (VLAN). Así los clientes no acceden a tus equipos de trabajo y no saturan la conexión del datáfono.'
                },
                {
                  q: '¿Qué pasa si se cae el internet y no puedo cobrar con datáfono?',
                  a: 'Con plan comercial tienes soporte prioritario (respuesta en 8-24h). Para negocios críticos, considera un backup 4G que active automáticamente si falla la fibra (desde $30.000/mes adicionales).'
                }
              ].map((faq, index) => (
                <details key={index} className="bg-white rounded-xl shadow-sm border border-slate-200">
                  <summary className="p-4 cursor-pointer font-semibold hover:bg-slate-50 rounded-xl">
                    {faq.q}
                  </summary>
                  <div className="p-4 pt-0 text-slate-700">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Links relacionados */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-center mb-8">
              Soluciones Relacionadas
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/internet-restaurantes-bogota" className="bg-slate-50 rounded-xl p-6 hover:shadow-lg transition-shadow border border-slate-200 group">
                <Coffee className="w-10 h-10 text-emerald-600 mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold mb-1">Restaurantes y Cafés</h3>
                <p className="text-slate-500 text-sm mb-2">WiFi clientes, apps de domicilio, POS</p>
                <span className="text-emerald-600 text-sm font-semibold flex items-center gap-1">
                  Ver solución <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
              <Link href="/internet-punto-venta-pos" className="bg-slate-50 rounded-xl p-6 hover:shadow-lg transition-shadow border border-slate-200 group">
                <CreditCard className="w-10 h-10 text-emerald-600 mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold mb-1">Punto de Venta (POS)</h3>
                <p className="text-slate-500 text-sm mb-2">Datáfonos, facturación DIAN</p>
                <span className="text-emerald-600 text-sm font-semibold flex items-center gap-1">
                  Ver solución <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
              <Link href="/internet-empresas-bogota" className="bg-slate-50 rounded-xl p-6 hover:shadow-lg transition-shadow border border-slate-200 group">
                <Store className="w-10 h-10 text-emerald-600 mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold mb-1">Todas las Soluciones PyME</h3>
                <p className="text-slate-500 text-sm mb-2">Oficinas, consultorios, más</p>
                <span className="text-emerald-600 text-sm font-semibold flex items-center gap-1">
                  Ver todas <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-16 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Conecta tu Local Comercial
            </h2>
            <p className="text-xl text-emerald-100 mb-8">
              Cotiza gratis y recibe opciones de ETB, Claro y Movistar
            </p>
            <div className="max-w-md mx-auto bg-white rounded-xl p-6 shadow-xl">
              <QuickCallForm buttonColor="#059669" provider="Local Comercial" />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
