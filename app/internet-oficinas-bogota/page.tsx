import type { Metadata } from 'next';
import Link from 'next/link';
import { Building, Users, Wifi, Monitor, Video, Server, Shield, CheckCircle2, Calculator, Phone, Cloud, ArrowRight } from 'lucide-react';
import QuickCallForm from '@/components/QuickCallForm';
import Breadcrumbs from '@/components/Breadcrumbs';
import LastUpdated from '@/components/LastUpdated';

export const metadata: Metadata = {
  title: 'Internet para Oficinas Bogotá 2026 | Fibra Empresarial desde $89.900',
  description: 'Internet de alta velocidad para oficinas en Bogotá. Planes empresariales con IP Fija, fibra simétrica y soporte prioritario. Ideal para 5-50 empleados. Cotiza ETB, Claro y Movistar.',
  keywords: [
    'internet oficinas bogota',
    'internet empresarial oficinas',
    'fibra optica oficinas',
    'internet coworking bogota',
    'planes internet oficina',
    'internet corporativo bogota',
    'wifi empresarial oficinas',
    'internet para empresas bogota'
  ],
  alternates: {
    canonical: 'https://comparadorinternet.co/internet-oficinas-bogota',
  },
  openGraph: {
    title: 'Internet para Oficinas Bogotá 2026 | Fibra Empresarial',
    description: 'Conectividad empresarial para oficinas. IP Fija, videoconferencias HD y soporte prioritario.',
    url: 'https://comparadorinternet.co/internet-oficinas-bogota',
    siteName: 'Comparador Internet Colombia',
    locale: 'es_CO',
    type: 'website',
  },
};

const necesidadesOficina = [
  {
    titulo: 'Videoconferencias HD',
    descripcion: 'Teams, Zoom, Meet sin cortes ni pixeleos. Necesitas mínimo 50 Mbps simétricos por sala.',
    icon: Video,
    mbpsRequeridos: '50-100 Mbps'
  },
  {
    titulo: 'Software en la Nube',
    descripcion: 'Google Workspace, Microsoft 365, Salesforce, HubSpot. Acceso rápido y sincronización constante.',
    icon: Cloud,
    mbpsRequeridos: '30-50 Mbps'
  },
  {
    titulo: 'VPN y Acceso Remoto',
    descripcion: 'Conexión segura para empleados remotos a servidores y recursos de la empresa.',
    icon: Server,
    mbpsRequeridos: '20-40 Mbps'
  },
  {
    titulo: 'Telefonía VoIP',
    descripcion: 'Líneas telefónicas IP para atención al cliente y comunicación interna.',
    icon: Phone,
    mbpsRequeridos: '10-20 Mbps'
  },
];

const planesOficina = [
  {
    nombre: 'Oficina Pequeña',
    empleados: '5-10',
    velocidad: '200 Mbps',
    precio: '$99.900',
    caracteristicas: [
      'Fibra simétrica',
      'Router WiFi 5 empresarial',
      'Soporte telefónico preferencial',
      'IP Dinámica',
      'Instalación gratis'
    ],
    ideal: 'Startups, consultorías pequeñas',
    destacado: false
  },
  {
    nombre: 'Oficina Mediana',
    empleados: '10-25',
    velocidad: '300 Mbps',
    precio: '$149.900',
    caracteristicas: [
      'Fibra simétrica 100%',
      '1 IP Fija incluida',
      'Router WiFi 6 empresarial',
      'Soporte prioritario 24h',
      'Portal de gestión'
    ],
    ideal: 'Agencias, oficinas corporativas',
    destacado: true
  },
  {
    nombre: 'Oficina Grande',
    empleados: '25-50',
    velocidad: '500 Mbps',
    precio: '$199.900',
    caracteristicas: [
      'Fibra dedicada 1:4',
      '2 IP Fijas incluidas',
      'WiFi 6 Mesh (3 APs)',
      'SLA 99.5% garantizado',
      'Soporte en sitio < 8h'
    ],
    ideal: 'Corporativos, call centers',
    destacado: false
  },
];

const zonasOficinas = [
  { zona: 'Chicó / El Nogal', tipo: 'Premium', cobertura: 'ETB, Claro, Movistar' },
  { zona: 'Chapinero / Zona G', tipo: 'Empresarial', cobertura: 'ETB, Claro, Movistar' },
  { zona: 'Usaquén / Santa Bárbara', tipo: 'Premium', cobertura: 'ETB, Claro, Movistar' },
  { zona: 'Centro Internacional', tipo: 'Corporativo', cobertura: 'ETB, Claro' },
  { zona: 'Zona Franca / Fontibón', tipo: 'Industrial', cobertura: 'ETB, Claro, Movistar' },
  { zona: 'Salitre / CAN', tipo: 'Empresarial', cobertura: 'ETB, Movistar' },
];

export default function InternetOficinasBogotaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'Internet para Oficinas Bogotá',
            description: 'Planes de internet empresarial para oficinas y coworkings en Bogotá',
            brand: {
              '@type': 'Brand',
              name: 'Comparador Internet Colombia'
            },
            offers: {
              '@type': 'AggregateOffer',
              lowPrice: '99900',
              highPrice: '350000',
              priceCurrency: 'COP',
              offerCount: '12'
            }
          }),
        }}
      />

      <div className="min-h-screen bg-slate-50">
        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'linear-gradient(90deg, transparent 49%, rgba(255,255,255,0.1) 50%, transparent 51%), linear-gradient(transparent 49%, rgba(255,255,255,0.1) 50%, transparent 51%)', backgroundSize: '40px 40px'}}></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 px-4 py-2 rounded-full mb-6">
                  <Building className="w-5 h-5 text-blue-300" />
                  <span className="font-semibold text-blue-100 uppercase tracking-wide text-sm">Oficinas Bogotá</span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  Internet para <span className="text-blue-300">Oficinas</span> en Bogotá
                </h1>

                <p className="text-lg text-blue-100 mb-8 max-w-lg">
                  Fibra empresarial diseñada para equipos de trabajo. Videoconferencias sin cortes, software en la nube fluido y soporte cuando lo necesitas.
                </p>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold">5-50</div>
                    <div className="text-sm text-blue-200">Empleados</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold">200-500</div>
                    <div className="text-sm text-blue-200">Mbps</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold">IP Fija</div>
                    <div className="text-sm text-blue-200">Disponible</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/calculadora-empresas"
                    className="bg-white text-blue-900 font-bold py-4 px-8 rounded-xl text-center transition-all hover:bg-blue-50 flex items-center justify-center gap-2"
                  >
                    <Calculator className="w-5 h-5" />
                    Calcular Mi Velocidad
                  </Link>
                  <Link
                    href="#planes"
                    className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-xl text-center transition-all"
                  >
                    Ver Planes
                  </Link>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-2xl">
                <h2 className="text-slate-900 text-xl font-bold mb-2">Cotiza Internet para tu Oficina</h2>
                <p className="text-slate-600 text-sm mb-6">Recibe propuestas de los 3 principales operadores</p>
                <QuickCallForm buttonColor="#1e40af" provider="Oficinas Bogotá" />
              </div>
            </div>
          </div>
        </section>

        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Breadcrumbs
            items={[
              { name: 'Internet Empresas', url: 'https://comparadorinternet.co/internet-empresas-bogota' },
              { name: 'Oficinas', url: 'https://comparadorinternet.co/internet-oficinas-bogota' }
            ]}
          />
          <LastUpdated
            date="2026-01-21"
            nextReview="2026-02-21"
            message="Precios y planes actualizados para oficinas enero 2026"
          />
        </div>

        {/* Necesidades de una oficina */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                ¿Qué Necesita tu Oficina del Internet?
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Las oficinas modernas dependen del internet para casi todas sus operaciones
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {necesidadesOficina.map((necesidad, index) => {
                const Icon = necesidad.icon;
                return (
                  <div key={index} className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:shadow-lg transition-shadow">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2">{necesidad.titulo}</h3>
                    <p className="text-slate-600 text-sm mb-3">{necesidad.descripcion}</p>
                    <div className="text-blue-600 font-semibold text-sm">
                      Requiere: {necesidad.mbpsRequeridos}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Planes */}
        <section id="planes" className="py-16 bg-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Planes Internet para Oficinas 2026
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Precios promedio en Bogotá. Cotiza para obtener precio exacto en tu zona.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {planesOficina.map((plan, index) => (
                <div
                  key={index}
                  className={`rounded-2xl overflow-hidden ${
                    plan.destacado
                      ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-2xl scale-105'
                      : 'bg-white shadow-lg border border-slate-200'
                  }`}
                >
                  {plan.destacado && (
                    <div className="bg-yellow-400 text-yellow-900 text-center py-2 font-bold text-sm">
                      MÁS ELEGIDO POR OFICINAS
                    </div>
                  )}
                  <div className="p-8">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm mb-4 ${
                      plan.destacado ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-700'
                    }`}>
                      <Users className="w-4 h-4" />
                      {plan.empleados} empleados
                    </div>

                    <h3 className={`text-xl font-bold mb-2 ${plan.destacado ? 'text-white' : 'text-slate-900'}`}>
                      {plan.nombre}
                    </h3>
                    <div className={`text-4xl font-black mb-1 ${plan.destacado ? 'text-white' : 'text-blue-600'}`}>
                      {plan.velocidad}
                    </div>
                    <div className={`text-2xl font-bold mb-2 ${plan.destacado ? 'text-blue-100' : 'text-slate-900'}`}>
                      {plan.precio}<span className="text-sm font-normal opacity-70">/mes</span>
                    </div>
                    <p className={`text-sm mb-6 ${plan.destacado ? 'text-blue-100' : 'text-slate-500'}`}>
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
                          ? 'bg-white text-blue-600 hover:bg-blue-50'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
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

        {/* Zonas de oficinas */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Cobertura en Zonas de Oficinas
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Principales zonas empresariales de Bogotá con cobertura de fibra óptica
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {zonasOficinas.map((zona, index) => (
                <div key={index} className="bg-slate-50 rounded-xl p-6 border border-slate-200 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-slate-900">{zona.zona}</h3>
                    <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded">
                      {zona.tipo}
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm">
                    <span className="font-medium">Operadores:</span> {zona.cobertura}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Por qué fibra para oficinas */}
        <section className="py-16 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  ¿Por qué tu Oficina Necesita Fibra Empresarial?
                </h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Wifi className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Velocidad Simétrica</h3>
                      <p className="text-slate-400 text-sm">
                        Misma velocidad de subida y bajada. Crítico para subir archivos a la nube, videollamadas y backups.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Shield className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Estabilidad Garantizada</h3>
                      <p className="text-slate-400 text-sm">
                        La fibra no sufre interferencias. Menos caídas, menos frustración, más productividad.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Múltiples Usuarios</h3>
                      <p className="text-slate-400 text-sm">
                        Diseñada para que todos los empleados trabajen simultáneamente sin notar lentitud.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h3 className="text-xl font-bold mb-6">Fórmula para Oficinas</h3>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-slate-300">Por empleado:</span>
                    <span className="font-bold">15-20 Mbps</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-slate-300">Videoconferencia simultánea:</span>
                    <span className="font-bold">+50 Mbps</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-slate-300">VPN / Servidor:</span>
                    <span className="font-bold">+30 Mbps</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-slate-300">Margen de seguridad:</span>
                    <span className="font-bold">+30%</span>
                  </div>
                </div>
                <Link
                  href="/calculadora-empresas"
                  className="block w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl text-center transition-colors"
                >
                  Calcular Velocidad Exacta
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-8">
              Preguntas sobre Internet para Oficinas
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: '¿Cuánta velocidad necesita mi oficina de 15 empleados?',
                  a: 'Para 15 empleados recomendamos mínimo 250-300 Mbps. Calcula 15-20 Mbps por persona, más 50 Mbps si hay videollamadas frecuentes. Usa nuestra calculadora para un cálculo preciso.'
                },
                {
                  q: '¿Necesito IP fija para mi oficina?',
                  a: 'Depende. Necesitas IP fija si: tienes un servidor local, usas VPN empresarial, manejas facturación electrónica desde servidor propio, o tienes cámaras de seguridad. Para uso general de nube, no es necesaria.'
                },
                {
                  q: '¿Puedo tener WiFi en toda la oficina con un solo router?',
                  a: 'Depende del tamaño. Hasta 100m² un router empresarial es suficiente. Para oficinas más grandes, necesitas WiFi Mesh o múltiples Access Points. Los planes corporativos suelen incluirlos.'
                },
                {
                  q: '¿Qué pasa si se cae el internet en horario de trabajo?',
                  a: 'Con planes empresariales tienes soporte prioritario. Plan básico: respuesta en 24h. Plan con SLA: respuesta en 4-8h con compensación. Para oficinas críticas, considera backup 4G.'
                },
                {
                  q: '¿Puedo migrar mi oficina de internet residencial a empresarial?',
                  a: 'Sí, es un proceso simple. El operador hace la migración sin costo adicional en la mayoría de casos. Conservas la misma fibra pero con mejor servicio, IP fija y soporte.'
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

        {/* Otras soluciones */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-center mb-8">
              Otras Soluciones Empresariales
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              <Link href="/internet-locales-comerciales" className="bg-slate-50 rounded-xl p-6 hover:shadow-lg transition-shadow border border-slate-200 group text-center">
                <Monitor className="w-10 h-10 text-blue-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold mb-1">Locales Comerciales</h3>
                <p className="text-slate-500 text-sm">Tiendas y comercios</p>
              </Link>
              <Link href="/internet-restaurantes-bogota" className="bg-slate-50 rounded-xl p-6 hover:shadow-lg transition-shadow border border-slate-200 group text-center">
                <Monitor className="w-10 h-10 text-blue-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold mb-1">Restaurantes</h3>
                <p className="text-slate-500 text-sm">POS y WiFi clientes</p>
              </Link>
              <Link href="/internet-consultorios-bogota" className="bg-slate-50 rounded-xl p-6 hover:shadow-lg transition-shadow border border-slate-200 group text-center">
                <Shield className="w-10 h-10 text-blue-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold mb-1">Consultorios</h3>
                <p className="text-slate-500 text-sm">Médicos y salud</p>
              </Link>
              <Link href="/internet-punto-venta-pos" className="bg-slate-50 rounded-xl p-6 hover:shadow-lg transition-shadow border border-slate-200 group text-center">
                <Server className="w-10 h-10 text-blue-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold mb-1">Punto de Venta</h3>
                <p className="text-slate-500 text-sm">Datáfonos y POS</p>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              ¿Listo para Conectar tu Oficina?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Cotiza gratis con ETB, Claro y Movistar Empresas
            </p>
            <div className="max-w-md mx-auto bg-white rounded-xl p-6 shadow-xl">
              <QuickCallForm buttonColor="#1e40af" provider="Oficinas" />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
