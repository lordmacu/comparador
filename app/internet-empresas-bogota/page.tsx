import type { Metadata } from 'next';
import Link from 'next/link';
import { Building, ShieldCheck, Server, Globe2, Briefcase, Users, Phone, FileText, CheckCircle2, Calculator, Store, Utensils, Stethoscope, CreditCard, ArrowRight } from 'lucide-react';
import QuickCallForm from '@/components/QuickCallForm';
import Breadcrumbs from '@/components/Breadcrumbs';
import LastUpdated from '@/components/LastUpdated';

export const metadata: Metadata = {
  title: 'Internet Empresas Bogotá 2026 | Planes PyME desde $89.900 + IP Fija',
  description: 'Internet Empresarial en Bogotá. Planes para PyMEs, oficinas, locales comerciales y restaurantes. Fibra óptica con IP Fija, SLA garantizado. ETB, Claro y Movistar Empresas. Cotiza gratis.',
  keywords: [
    'internet empresas bogota',
    'internet pymes bogota',
    'internet oficinas bogota',
    'internet comercial bogota',
    'planes internet empresarial',
    'internet ip fija bogota',
    'internet negocios bogota',
    'fibra optica empresas bogota',
    'internet locales comerciales',
    'internet restaurantes bogota'
  ],
  alternates: {
    canonical: 'https://comparadorinternet.co/internet-empresas-bogota',
  },
  openGraph: {
    title: 'Internet Empresarial Bogotá 2026 | PyMEs, Oficinas y Comercios',
    description: 'Conectividad empresarial para tu negocio en Bogotá. IP Fija, SLA y soporte prioritario.',
    url: 'https://comparadorinternet.co/internet-empresas-bogota',
    siteName: 'Comparador Internet Colombia',
    locale: 'es_CO',
    type: 'website',
  },
};

const tiposNegocio = [
  {
    titulo: 'Oficinas y Coworkings',
    descripcion: 'Internet de alta velocidad para equipos de trabajo, videoconferencias y software en la nube',
    icon: Building,
    link: '/internet-oficinas-bogota',
    empleados: '5-50',
    velocidadMin: '200 Mbps'
  },
  {
    titulo: 'Locales Comerciales',
    descripcion: 'Conectividad estable para punto de venta, datáfonos y atención al cliente',
    icon: Store,
    link: '/internet-locales-comerciales',
    empleados: '1-10',
    velocidadMin: '100 Mbps'
  },
  {
    titulo: 'Restaurantes y Cafés',
    descripcion: 'WiFi para clientes, sistemas POS, pedidos online y cámaras de seguridad',
    icon: Utensils,
    link: '/internet-restaurantes-bogota',
    empleados: '5-20',
    velocidadMin: '150 Mbps'
  },
  {
    titulo: 'Consultorios y Clínicas',
    descripcion: 'Internet seguro para historias clínicas, telemedicina y equipos médicos conectados',
    icon: Stethoscope,
    link: '/internet-consultorios-bogota',
    empleados: '2-15',
    velocidadMin: '100 Mbps'
  },
  {
    titulo: 'Puntos de Venta',
    descripcion: 'Conexión crítica para datáfonos, facturación electrónica DIAN y sistemas POS',
    icon: CreditCard,
    link: '/internet-punto-venta-pos',
    empleados: '1-5',
    velocidadMin: '50 Mbps'
  },
];

const planesDestacados = [
  {
    nombre: 'PyME Básico',
    velocidad: '200 Mbps',
    precio: '$89.900',
    ideal: '1-5 empleados',
    caracteristicas: ['IP Dinámica', 'Soporte telefónico', 'Router WiFi incluido', 'Instalación gratis'],
    popular: false
  },
  {
    nombre: 'PyME Pro',
    velocidad: '300 Mbps',
    precio: '$129.900',
    ideal: '5-15 empleados',
    caracteristicas: ['1 IP Fija incluida', 'Soporte prioritario 24h', 'Fibra simétrica', 'Router empresarial'],
    popular: true
  },
  {
    nombre: 'Corporativo',
    velocidad: '500 Mbps',
    precio: '$179.900',
    ideal: '15-30 empleados',
    caracteristicas: ['IP Fija + SLA 99.5%', 'Soporte en sitio < 8h', 'Priorización de tráfico', 'WiFi 6 Mesh'],
    popular: false
  },
];

const zonasCobertura = [
  { nombre: 'Zona Norte', barrios: 'Usaquén, Chapinero, Chicó, Santa Bárbara', cobertura: '100%' },
  { nombre: 'Centro', barrios: 'Candelaria, Teusaquillo, Santa Fe', cobertura: '95%' },
  { nombre: 'Zona Industrial', barrios: 'Fontibón, Puente Aranda, Zona Franca', cobertura: '100%' },
  { nombre: 'Occidente', barrios: 'Engativá, Kennedy, Suba', cobertura: '90%' },
];

export default function InternetEmpresasBogotaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'Internet Empresarial Bogotá',
            description: 'Planes de internet para empresas, PyMEs y negocios en Bogotá con IP Fija y SLA',
            brand: {
              '@type': 'Brand',
              name: 'Comparador Internet Colombia'
            },
            offers: {
              '@type': 'AggregateOffer',
              lowPrice: '89900',
              highPrice: '500000',
              priceCurrency: 'COP',
              offerCount: '20'
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.8',
              ratingCount: '856'
            }
          }),
        }}
      />

      <div className="min-h-screen bg-slate-50">
        {/* Hero */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '40px 40px'}}></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 px-4 py-2 rounded-full mb-6">
                  <Building className="w-5 h-5 text-blue-400" />
                  <span className="font-semibold text-blue-100 uppercase tracking-wide text-sm">Internet Empresarial Bogotá</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  Internet para <span className="text-blue-400">Empresas y PyMEs</span> en Bogotá
                </h1>

                <p className="text-lg text-slate-300 mb-8 max-w-lg">
                  Conectividad empresarial diseñada para negocios que no pueden parar. IP Fija, SLA garantizado y soporte prioritario con ETB, Claro y Movistar.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Link
                    href="/calculadora-empresas"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl text-center transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                  >
                    <Calculator className="w-5 h-5" />
                    Calcular Mi Plan Ideal
                  </Link>
                  <Link
                    href="#planes"
                    className="bg-white/10 border border-white/20 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-xl text-center transition-all"
                  >
                    Ver Planes y Precios
                  </Link>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400">3</div>
                    <div className="text-sm text-slate-400">Operadores</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400">99.5%</div>
                    <div className="text-sm text-slate-400">SLA Disponibilidad</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400">&lt;8h</div>
                    <div className="text-sm text-slate-400">Soporte en Sitio</div>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
                <h2 className="text-white text-xl font-bold mb-2">Cotización Gratuita</h2>
                <p className="text-slate-300 text-sm mb-6">Recibe propuestas de ETB, Claro y Movistar Empresas</p>
                <QuickCallForm buttonColor="#3b82f6" provider="Empresas Bogotá" />
              </div>
            </div>
          </div>
        </section>

        {/* Breadcrumbs y Last Updated */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Breadcrumbs
            items={[
              { name: 'Internet Empresas', url: 'https://comparadorinternet.co/internet-empresas-pymes' },
              { name: 'Bogotá', url: 'https://comparadorinternet.co/internet-empresas-bogota' }
            ]}
          />
          <LastUpdated
            date="2026-01-21"
            nextReview="2026-02-21"
            message="Tarifas empresariales actualizadas enero 2026"
          />
        </div>

        {/* Tipos de Negocio */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Soluciones por Tipo de Negocio
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Cada negocio tiene necesidades únicas. Encuentra la solución perfecta para tu empresa.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tiposNegocio.map((tipo, index) => {
                const Icon = tipo.icon;
                return (
                  <Link
                    key={index}
                    href={tipo.link}
                    className="bg-slate-50 rounded-2xl p-6 hover:shadow-xl transition-all border border-slate-100 group hover:border-blue-200"
                  >
                    <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                      <Icon className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {tipo.titulo}
                    </h3>
                    <p className="text-slate-600 text-sm mb-4">
                      {tipo.descripcion}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">{tipo.empleados} empleados</span>
                      <span className="text-blue-600 font-semibold flex items-center gap-1">
                        Desde {tipo.velocidadMin}
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Planes Destacados */}
        <section id="planes" className="py-16 bg-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Planes Internet Empresarial Bogotá 2026
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Precios promedio de ETB, Claro y Movistar. Solicita cotización personalizada para tu zona.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {planesDestacados.map((plan, index) => (
                <div
                  key={index}
                  className={`rounded-2xl overflow-hidden transition-all ${
                    plan.popular
                      ? 'bg-white shadow-2xl border-2 border-blue-600 scale-105'
                      : 'bg-white shadow-lg border border-slate-200 hover:shadow-xl'
                  }`}
                >
                  {plan.popular && (
                    <div className="bg-blue-600 text-white text-center py-2 font-semibold text-sm">
                      MÁS POPULAR
                    </div>
                  )}
                  <div className="p-8">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.nombre}</h3>
                    <div className="text-4xl font-black text-blue-600 mb-1">{plan.velocidad}</div>
                    <div className="text-2xl font-bold text-slate-900 mb-4">
                      {plan.precio}<span className="text-sm font-normal text-slate-500">/mes</span>
                    </div>
                    <p className="text-slate-500 text-sm mb-6">Ideal para {plan.ideal}</p>

                    <ul className="space-y-3 mb-8">
                      {plan.caracteristicas.map((car, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-slate-600">
                          <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                          {car}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href="/calculadora-empresas"
                      className={`block w-full py-3 rounded-xl text-center font-bold transition-colors ${
                        plan.popular
                          ? 'bg-blue-600 hover:bg-blue-700 text-white'
                          : 'bg-slate-900 hover:bg-slate-800 text-white'
                      }`}
                    >
                      Calcular Mi Plan
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <p className="text-slate-500 text-sm mb-4">
                ¿Necesitas más de 500 Mbps o canal dedicado?
              </p>
              <Link
                href="/internet-empresas-pymes#planes-dedicados"
                className="text-blue-600 font-semibold hover:underline"
              >
                Ver Planes Dedicados y Corporativos →
              </Link>
            </div>
          </div>
        </section>

        {/* Por qué Internet Empresarial */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                ¿Por qué tu Negocio Necesita Internet Empresarial?
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                El internet residencial no está diseñado para operaciones comerciales críticas
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <Server className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">IP Fija Pública</h3>
                <p className="text-slate-600">
                  Esencial para facturación electrónica DIAN, cámaras de seguridad remotas, VPN empresarial y servidores locales.
                </p>
              </div>

              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <ShieldCheck className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">SLA Garantizado</h3>
                <p className="text-slate-600">
                  Acuerdos de nivel de servicio con 99.5% de disponibilidad. Si falla, reparación prioritaria en horas, no días.
                </p>
              </div>

              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <Globe2 className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Velocidad Simétrica</h3>
                <p className="text-slate-600">
                  Misma velocidad de subida y bajada. Crítico para videollamadas, respaldos en nube y software empresarial.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Cobertura */}
        <section className="py-16 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Cobertura Empresarial en Bogotá</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                ETB, Claro y Movistar tienen cobertura empresarial en las principales zonas comerciales
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {zonasCobertura.map((zona, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <h3 className="font-bold text-lg mb-2">{zona.nombre}</h3>
                  <p className="text-slate-400 text-sm mb-4">{zona.barrios}</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: zona.cobertura }}
                      ></div>
                    </div>
                    <span className="text-blue-400 font-semibold text-sm">{zona.cobertura}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <p className="text-slate-400 mb-4">¿No encuentras tu zona? Verificamos cobertura gratis</p>
              <Link
                href="/contratar"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors"
              >
                Verificar Cobertura
              </Link>
            </div>
          </div>
        </section>

        {/* CTA con Calculadora */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <Calculator className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿No sabes qué plan necesitas?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Usa nuestra calculadora empresarial. En 30 segundos te decimos qué velocidad, si necesitas IP fija y qué plan te conviene.
            </p>
            <Link
              href="/calculadora-empresas"
              className="inline-flex items-center gap-2 bg-white text-blue-600 font-bold py-4 px-8 rounded-xl hover:bg-blue-50 transition-colors shadow-lg"
            >
              <Calculator className="w-5 h-5" />
              Usar Calculadora Gratis
            </Link>
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
                  q: '¿Cuál es el mejor internet empresarial en Bogotá?',
                  a: 'Depende de tu ubicación y necesidades. ETB tiene la mejor cobertura de fibra en Bogotá, Claro ofrece buenos paquetes con móvil incluido, y Movistar destaca en soporte empresarial. Recomendamos cotizar los 3 para comparar.'
                },
                {
                  q: '¿Cuánto cuesta el internet empresarial en Bogotá?',
                  a: 'Los planes PyME comienzan desde $89.900/mes (200 Mbps). Planes con IP fija desde $129.900/mes. Canales dedicados desde $350.000/mes. Los precios varían según zona y operador.'
                },
                {
                  q: '¿Necesito IP fija para mi negocio?',
                  a: 'Sí, si usas: facturación electrónica DIAN, cámaras de seguridad con acceso remoto, VPN para trabajo remoto, servidor local, o telefonía VoIP. Si solo navegas y usas email, no es necesaria.'
                },
                {
                  q: '¿Qué pasa si se cae el internet en mi negocio?',
                  a: 'Con planes empresariales tienes soporte prioritario. Un plan PyME básico tiene respuesta en 24h. Con SLA, respuesta en 4-8h con compensación si no se cumple. Considera backup 4G para operaciones críticas.'
                },
                {
                  q: '¿Puedo tener internet para clientes y para el negocio separados?',
                  a: 'Sí, los routers empresariales permiten crear redes separadas (VLAN). Una red para operación (POS, cámaras) y otra para WiFi de clientes. Pregunta por esta opción al contratar.'
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

        {/* CTA Final */}
        <section className="py-16 bg-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Conecta tu Negocio con la Mejor Fibra de Bogotá
            </h2>
            <p className="text-slate-300 mb-8">
              Recibe cotizaciones personalizadas de ETB, Claro y Movistar Empresas
            </p>
            <div className="max-w-md mx-auto bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <QuickCallForm buttonColor="#3b82f6" provider="Empresas Bogotá" />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
