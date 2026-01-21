import type { Metadata } from 'next';
import Link from 'next/link';
import { Utensils, Wifi, CreditCard, Smartphone, Camera, Clock, CheckCircle2, Calculator, Bike, QrCode, Monitor, ArrowRight } from 'lucide-react';
import QuickCallForm from '@/components/QuickCallForm';

export const metadata: Metadata = {
  title: 'Internet para Restaurantes Bogotá 2026 | WiFi + POS desde $89.900',
  description: 'Internet para restaurantes, cafeterías y bares en Bogotá. WiFi para clientes, sistema POS, apps de domicilio (Rappi, iFood). Planes desde $89.900. Cotiza ETB, Claro, Movistar.',
  keywords: [
    'internet restaurantes bogota',
    'wifi restaurante',
    'internet cafeteria bogota',
    'internet bar bogota',
    'wifi para clientes restaurante',
    'internet domicilios rappi',
    'pos restaurante internet',
    'internet food service',
    'internet hosteleria bogota'
  ],
  alternates: {
    canonical: 'https://comparadorinternet.co/internet-restaurantes-bogota',
  },
  openGraph: {
    title: 'Internet para Restaurantes Bogotá 2026 | WiFi + Domicilios',
    description: 'Conectividad para restaurantes: WiFi clientes, apps de domicilio, POS y cámaras.',
    url: 'https://comparadorinternet.co/internet-restaurantes-bogota',
    siteName: 'Comparador Internet Colombia',
    locale: 'es_CO',
    type: 'website',
  },
};

const necesidadesRestaurante = [
  {
    titulo: 'WiFi para Clientes',
    descripcion: 'Los comensales esperan WiFi gratis. Mejora su experiencia y el tiempo de permanencia.',
    icon: Wifi,
    consumo: '30-50 Mbps',
    critico: true
  },
  {
    titulo: 'Apps de Domicilio',
    descripcion: 'Rappi, iFood, Domicilios.com. Cada tablet de domicilios necesita conexión estable.',
    icon: Bike,
    consumo: '10-20 Mbps',
    critico: true
  },
  {
    titulo: 'Sistema POS',
    descripcion: 'Software de facturación, inventario y gestión de mesas en tiempo real.',
    icon: Monitor,
    consumo: '15-30 Mbps',
    critico: true
  },
  {
    titulo: 'Datáfonos',
    descripcion: 'Pagos con tarjeta en mesa o caja. Necesitan conexión estable, no necesariamente rápida.',
    icon: CreditCard,
    consumo: '5-10 Mbps',
    critico: true
  },
  {
    titulo: 'Menú Digital / QR',
    descripcion: 'Carta digital que tus clientes escanean. Reduce costos de impresión.',
    icon: QrCode,
    consumo: '5-10 Mbps',
    critico: false
  },
  {
    titulo: 'Cámaras de Seguridad',
    descripcion: 'Vigilancia de cocina, caja y salón. Verlas desde el celular.',
    icon: Camera,
    consumo: '20-40 Mbps',
    critico: false
  },
];

const planesRestaurante = [
  {
    nombre: 'Cafetería / Pequeño',
    capacidad: '20-40 personas',
    velocidad: '100 Mbps',
    precio: '$89.900',
    caracteristicas: [
      'WiFi para 20 clientes',
      '1-2 tablets domicilios',
      'POS + 1 datáfono',
      'Router dual band',
    ],
    destacado: false
  },
  {
    nombre: 'Restaurante Mediano',
    capacidad: '40-80 personas',
    velocidad: '200 Mbps',
    precio: '$129.900',
    caracteristicas: [
      'WiFi para 50 clientes',
      'Múltiples apps domicilio',
      'POS + 3 datáfonos',
      '2-4 cámaras IP',
      'Red separada negocio/clientes',
    ],
    destacado: true
  },
  {
    nombre: 'Restaurante Grande',
    capacidad: '80-150 personas',
    velocidad: '300 Mbps',
    precio: '$169.900',
    caracteristicas: [
      'WiFi alta densidad',
      'Todas las apps de domicilio',
      'POS múltiples estaciones',
      'Cámaras HD con grabación',
      'IP Fija disponible',
      'Soporte prioritario',
    ],
    destacado: false
  },
];

const tiposEstablecimientos = [
  { nombre: 'Restaurantes', icon: Utensils, velocidadMin: '100 Mbps' },
  { nombre: 'Cafeterías', icon: Utensils, velocidadMin: '100 Mbps' },
  { nombre: 'Bares', icon: Utensils, velocidadMin: '150 Mbps' },
  { nombre: 'Food Courts', icon: Utensils, velocidadMin: '200 Mbps' },
  { nombre: 'Dark Kitchens', icon: Bike, velocidadMin: '100 Mbps' },
  { nombre: 'Panaderías', icon: Utensils, velocidadMin: '50 Mbps' },
];

export default function InternetRestaurantesBogotaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'Internet para Restaurantes Bogotá',
            description: 'Planes de internet para restaurantes, cafeterías y bares con WiFi clientes y apps de domicilio',
            brand: {
              '@type': 'Brand',
              name: 'Comparador Internet Colombia'
            },
            offers: {
              '@type': 'AggregateOffer',
              lowPrice: '89900',
              highPrice: '250000',
              priceCurrency: 'COP',
              offerCount: '10'
            }
          }),
        }}
      />

      <div className="min-h-screen bg-slate-50">
        {/* Hero */}
        <section className="bg-gradient-to-br from-orange-900 via-orange-800 to-red-900 text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(#f97316 1px, transparent 1px)', backgroundSize: '30px 30px'}}></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-400/30 px-4 py-2 rounded-full mb-6">
                  <Utensils className="w-5 h-5 text-orange-300" />
                  <span className="font-semibold text-orange-100 uppercase tracking-wide text-sm">Restaurantes y Cafés</span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  Internet para <span className="text-orange-300">Restaurantes</span> en Bogotá
                </h1>

                <p className="text-lg text-orange-100 mb-8 max-w-lg">
                  WiFi para tus clientes, conexión estable para Rappi e iFood, y sistema POS sin interrupciones. Todo en un solo plan.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                    <Wifi className="w-6 h-6 mx-auto mb-1 text-orange-300" />
                    <div className="text-xs">WiFi Clientes</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                    <Bike className="w-6 h-6 mx-auto mb-1 text-orange-300" />
                    <div className="text-xs">Domicilios</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                    <Monitor className="w-6 h-6 mx-auto mb-1 text-orange-300" />
                    <div className="text-xs">POS</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                    <Camera className="w-6 h-6 mx-auto mb-1 text-orange-300" />
                    <div className="text-xs">Cámaras</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/calculadora-empresas"
                    className="bg-white text-orange-900 font-bold py-4 px-8 rounded-xl text-center transition-all hover:bg-orange-50 flex items-center justify-center gap-2"
                  >
                    <Calculator className="w-5 h-5" />
                    Calcular Mi Plan
                  </Link>
                  <Link
                    href="#planes"
                    className="bg-orange-600 hover:bg-orange-500 text-white font-bold py-4 px-8 rounded-xl text-center transition-all"
                  >
                    Ver Precios
                  </Link>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-2xl">
                <h2 className="text-slate-900 text-xl font-bold mb-2">Cotiza para tu Restaurante</h2>
                <p className="text-slate-600 text-sm mb-6">Te ayudamos a encontrar el mejor plan</p>
                <QuickCallForm buttonColor="#ea580c" provider="Restaurante Bogotá" />
              </div>
            </div>
          </div>
        </section>

        {/* Necesidades de un restaurante */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                ¿Qué Necesita tu Restaurante del Internet?
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Un restaurante moderno tiene múltiples sistemas que dependen del internet
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {necesidadesRestaurante.map((necesidad, index) => {
                const Icon = necesidad.icon;
                return (
                  <div key={index} className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-slate-900">{necesidad.titulo}</h3>
                          {necesidad.critico && (
                            <span className="bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded font-medium">
                              Crítico
                            </span>
                          )}
                        </div>
                        <p className="text-slate-600 text-sm mb-2">{necesidad.descripcion}</p>
                        <div className="text-orange-600 font-semibold text-sm">
                          Consume: {necesidad.consumo}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-12 bg-orange-50 rounded-2xl p-6 border border-orange-200">
              <h3 className="font-bold text-orange-900 mb-2">Fórmula Rápida para Restaurantes</h3>
              <p className="text-orange-800">
                <strong>Velocidad mínima = </strong>
                (Capacidad de clientes × 1 Mbps) + (Tablets domicilio × 10 Mbps) + (Cámaras × 10 Mbps) + 30 Mbps base
              </p>
              <p className="text-orange-700 text-sm mt-2">
                Ejemplo: Restaurante 60 personas + 3 tablets + 4 cámaras = 60 + 30 + 40 + 30 = 160 Mbps mínimo
              </p>
            </div>
          </div>
        </section>

        {/* Planes */}
        <section id="planes" className="py-16 bg-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Planes Internet para Restaurantes 2026
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Precios promedio en Bogotá. Incluyen router empresarial.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {planesRestaurante.map((plan, index) => (
                <div
                  key={index}
                  className={`rounded-2xl overflow-hidden ${
                    plan.destacado
                      ? 'bg-gradient-to-br from-orange-600 to-red-600 text-white shadow-2xl scale-105'
                      : 'bg-white shadow-lg border border-slate-200'
                  }`}
                >
                  {plan.destacado && (
                    <div className="bg-yellow-400 text-yellow-900 text-center py-2 font-bold text-sm">
                      MÁS ELEGIDO POR RESTAURANTES
                    </div>
                  )}
                  <div className="p-8">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm mb-4 ${
                      plan.destacado ? 'bg-white/20 text-white' : 'bg-orange-100 text-orange-700'
                    }`}>
                      <Utensils className="w-4 h-4" />
                      {plan.capacidad}
                    </div>

                    <h3 className={`text-xl font-bold mb-2 ${plan.destacado ? 'text-white' : 'text-slate-900'}`}>
                      {plan.nombre}
                    </h3>
                    <div className={`text-4xl font-black mb-1 ${plan.destacado ? 'text-white' : 'text-orange-600'}`}>
                      {plan.velocidad}
                    </div>
                    <div className={`text-2xl font-bold mb-6 ${plan.destacado ? 'text-orange-100' : 'text-slate-900'}`}>
                      {plan.precio}<span className="text-sm font-normal opacity-70">/mes</span>
                    </div>

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
                          ? 'bg-white text-orange-600 hover:bg-orange-50'
                          : 'bg-orange-600 hover:bg-orange-700 text-white'
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

        {/* Apps de Domicilio */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">
                  Internet Estable para Apps de Domicilio
                </h2>
                <p className="text-slate-600 mb-6">
                  Rappi, iFood, Domicilios.com... Cada plataforma tiene su tablet que necesita conexión constante. Si se desconecta, pierdes pedidos y afectas tu rating.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-4 bg-slate-50 rounded-xl p-4">
                    <Bike className="w-8 h-8 text-orange-600 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-slate-900">Múltiples Tablets Simultáneas</h3>
                      <p className="text-slate-600 text-sm">Cada app consume 5-10 Mbps. Con 4 apps activas necesitas mínimo 40 Mbps solo para domicilios.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 bg-slate-50 rounded-xl p-4">
                    <Clock className="w-8 h-8 text-orange-600 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-slate-900">Hora Pico = Internet Saturado</h3>
                      <p className="text-slate-600 text-sm">12-2pm y 7-9pm son horas críticas. Con internet residencial, tu conexión compite con vecinos.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 bg-slate-50 rounded-xl p-4">
                    <Smartphone className="w-8 h-8 text-orange-600 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-slate-900">Notificaciones Instantáneas</h3>
                      <p className="text-slate-600 text-sm">Las apps necesitan conexión estable para recibir pedidos al instante. Una desconexión de 30 segundos = pedido perdido.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-orange-900 mb-6">Checklist para Domicilios</h3>
                <ul className="space-y-4">
                  {[
                    'Red separada para tablets de domicilio',
                    'Router con priorización de tráfico',
                    'Backup 4G para emergencias',
                    'UPS para router (evita caídas por luz)',
                    'Soporte técnico en menos de 8 horas'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-orange-900">
                      <CheckCircle2 className="w-5 h-5 text-orange-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Tipos de establecimientos */}
        <section className="py-16 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Soluciones por Tipo de Establecimiento</h2>
              <p className="text-slate-400">Cada formato tiene necesidades diferentes</p>
            </div>

            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
              {tiposEstablecimientos.map((tipo, index) => {
                const Icon = tipo.icon;
                return (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/20 transition-colors">
                    <Icon className="w-8 h-8 mx-auto mb-2 text-orange-400" />
                    <h3 className="font-semibold text-sm mb-1">{tipo.nombre}</h3>
                    <p className="text-orange-300 text-xs">Desde {tipo.velocidadMin}</p>
                  </div>
                );
              })}
            </div>

            <div className="text-center mt-8">
              <p className="text-slate-400 mb-4">¿Tienes una Dark Kitchen o formato especial?</p>
              <Link
                href="/calculadora-empresas"
                className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 px-6 rounded-xl transition-colors"
              >
                <Calculator className="w-5 h-5" />
                Calcular Plan Personalizado
              </Link>
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
                  q: '¿Cuánta velocidad necesita mi restaurante de 50 mesas?',
                  a: 'Para un restaurante de 50 mesas (aprox. 150 personas): WiFi clientes (150 Mbps) + POS (30 Mbps) + 4 apps domicilio (40 Mbps) + cámaras (40 Mbps) = 260 Mbps. Recomendamos 300 Mbps con margen de seguridad.'
                },
                {
                  q: '¿Puedo ofrecer WiFi gratis a mis clientes?',
                  a: 'Sí, pero asegúrate de tener una red separada para clientes y otra para el negocio (POS, datáfonos, cámaras). Esto evita que clientes saturen tu conexión crítica y mejora la seguridad.'
                },
                {
                  q: '¿Qué pasa si se cae el internet en hora pico de domicilios?',
                  a: 'Con plan comercial tienes soporte prioritario. Además, recomendamos backup 4G (desde $30.000/mes) que activa automáticamente si falla la fibra. Las apps de domicilio penalizan los "no disponibles".'
                },
                {
                  q: '¿Necesito IP fija para mi restaurante?',
                  a: 'Solo si tienes cámaras de seguridad que quieres ver remotamente desde tu celular, o si manejas facturación electrónica desde servidor local. Para POS en la nube y domicilios, no es necesaria.'
                },
                {
                  q: '¿El WiFi llega a toda la terraza y zonas exteriores?',
                  a: 'Depende del tamaño. Para terrazas o zonas exteriores necesitas Access Points adicionales o WiFi Mesh. Los planes corporativos suelen incluirlos. Menciona tu distribución al cotizar.'
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
              Otras Soluciones para Negocios
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/internet-locales-comerciales" className="bg-slate-50 rounded-xl p-6 hover:shadow-lg transition-shadow border border-slate-200 group">
                <CreditCard className="w-10 h-10 text-orange-600 mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold mb-1">Locales Comerciales</h3>
                <p className="text-slate-500 text-sm mb-2">Tiendas, boutiques, comercios</p>
                <span className="text-orange-600 text-sm font-semibold flex items-center gap-1">
                  Ver solución <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
              <Link href="/internet-punto-venta-pos" className="bg-slate-50 rounded-xl p-6 hover:shadow-lg transition-shadow border border-slate-200 group">
                <Monitor className="w-10 h-10 text-orange-600 mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold mb-1">Punto de Venta (POS)</h3>
                <p className="text-slate-500 text-sm mb-2">Datáfonos, facturación DIAN</p>
                <span className="text-orange-600 text-sm font-semibold flex items-center gap-1">
                  Ver solución <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
              <Link href="/internet-empresas-bogota" className="bg-slate-50 rounded-xl p-6 hover:shadow-lg transition-shadow border border-slate-200 group">
                <Utensils className="w-10 h-10 text-orange-600 mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold mb-1">Todas las Soluciones PyME</h3>
                <p className="text-slate-500 text-sm mb-2">Oficinas, consultorios, más</p>
                <span className="text-orange-600 text-sm font-semibold flex items-center gap-1">
                  Ver todas <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-16 bg-gradient-to-r from-orange-600 to-red-600 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Conecta tu Restaurante
            </h2>
            <p className="text-xl text-orange-100 mb-8">
              Cotiza gratis y recibe opciones de ETB, Claro y Movistar
            </p>
            <div className="max-w-md mx-auto bg-white rounded-xl p-6 shadow-xl">
              <QuickCallForm buttonColor="#ea580c" provider="Restaurante" />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
