import type { Metadata } from 'next';
import Link from 'next/link';
import { Store, Wifi, Shield, CheckCircle2, Calculator, Phone, Zap } from 'lucide-react';
import QuickCallForm from '@/components/QuickCallForm';

export const metadata: Metadata = {
  title: 'Internet Claro Locales Comerciales 2026 | Fibra desde $109.900',
  description: 'Planes internet Claro para locales comerciales en Bogotá. Fibra óptica, WiFi para clientes, combo móvil. Ideal tiendas, boutiques, comercios. Desde $109.900.',
  keywords: [
    'internet claro locales',
    'fibra claro tiendas',
    'wifi claro comercios',
    'claro retail',
    'internet locales bogota',
    'claro negocios'
  ],
  alternates: {
    canonical: 'https://comparadorinternet.co/internet-claro-locales',
  },
  openGraph: {
    title: 'Internet Claro Locales Comerciales | WiFi + Mayor Cobertura',
    description: 'Conectividad Claro para locales comerciales con la mayor cobertura de Colombia.',
    url: 'https://comparadorinternet.co/internet-claro-locales',
    siteName: 'Comparador Internet Colombia',
    locale: 'es_CO',
    type: 'website',
  },
};

const planesClaro = [
  {
    nombre: 'Claro Local 100 Mbps',
    velocidad: '100 Mbps',
    precio: '$109.900',
    caracteristicas: [
      'Fibra óptica simétrica',
      'WiFi dual admin/clientes',
      'Router empresarial',
      'App Mi Claro Negocios',
      'Instalación gratis',
      'Soporte técnico 24/7'
    ]
  },
  {
    nombre: 'Claro Local 200 Mbps',
    velocidad: '200 Mbps',
    precio: '$139.900',
    destacado: true,
    caracteristicas: [
      'Fibra premium',
      'WiFi Mesh cobertura total',
      'Portal WiFi personalizado',
      'Combo móvil 20% OFF',
      'Datáfonos conectados',
      'Cámaras IP compatibles'
    ]
  },
  {
    nombre: 'Claro Local 300 Mbps',
    velocidad: '300 Mbps',
    precio: '$179.900',
    caracteristicas: [
      'Fibra dedicada 1:4',
      'WiFi 6 alto rendimiento',
      '1 IP Fija incluida',
      'Firewall básico',
      'Múltiples datáfonos',
      'Monitoreo remoto'
    ]
  },
];

const ventajasClaro = [
  {
    titulo: 'Mayor Cobertura',
    descripcion: 'Presente en más zonas comerciales de Bogotá que cualquier otro operador.',
    icon: Wifi
  },
  {
    titulo: 'WiFi para Clientes',
    descripcion: 'Red separada con portal personalizado para que tus clientes se conecten.',
    icon: Shield
  },
  {
    titulo: 'Combo Ahorro',
    descripcion: 'Descuentos al combinar internet con líneas móviles para tu equipo de trabajo.',
    icon: Phone
  },
  {
    titulo: 'Soporte Rápido',
    descripcion: 'Call center especializado en negocios con técnicos disponibles 24/7.',
    icon: Zap
  },
];

export default function InternetClaroLocalesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      
      <section className="bg-gradient-to-br from-red-700 via-red-600 to-red-500 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(#ef4444 1px, transparent 1px)', backgroundSize: '40px 40px'}}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-red-500/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-red-400/30">
                Internet Empresarial Claro
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Internet Claro Locales<br />
                <span className="text-red-200">La Mayor Cobertura Comercial</span>
              </h1>
              
              <p className="text-xl md:text-2xl mb-8 text-red-100">
                Conectividad para locales comerciales con WiFi para clientes y combo móvil. 
                La red más amplia de Bogotá. <strong>Desde $109.900/mes</strong>
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <Link 
                  href="/calculadora-empresas"
                  className="bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-50 transition-all inline-flex items-center gap-2 shadow-lg"
                >
                  <Calculator className="w-5 h-5" />
                  Cotizar Ahora
                </Link>
                <Link 
                  href="/comparar"
                  className="bg-red-500/20 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-500/30 transition-all"
                >
                  Comparar Operadores
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-red-400/30">
                <div>
                  <div className="text-3xl font-bold mb-1">#1</div>
                  <div className="text-sm text-red-200">Cobertura</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1">WiFi</div>
                  <div className="text-sm text-red-200">Dual Gratis</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1">24/7</div>
                  <div className="text-sm text-red-200">Soporte</div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
              <h2 className="text-white text-xl font-bold mb-2">Deja tu teléfono y te llamamos</h2>
              <p className="text-red-100 text-sm mb-6">Recibe asesoría especializada Claro Locales</p>
              <QuickCallForm buttonColor="#ef4444" provider="Claro Locales" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Ventajas Claro para tu Local</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {ventajasClaro.map((ventaja, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all">
                <ventaja.icon className="w-12 h-12 text-red-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">{ventaja.titulo}</h3>
                <p className="text-gray-600">{ventaja.descripcion}</p>
              </div>
            ))}
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Planes Claro Locales</h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {planesClaro.map((plan, index) => (
              <div 
                key={index}
                className={`bg-white rounded-2xl shadow-lg p-8 ${
                  plan.destacado ? 'ring-4 ring-red-500 scale-105' : ''
                }`}
              >
                {plan.destacado && (
                  <div className="bg-red-600 text-white text-center py-2 -mt-8 -mx-8 mb-6 font-bold rounded-t-2xl">
                    MÁS VENDIDO
                  </div>
                )}
                
                <h3 className="text-2xl font-bold mb-4">{plan.nombre}</h3>
                <div className="text-4xl font-bold text-red-600 mb-2">{plan.precio}</div>
                <div className="text-gray-600 mb-6">{plan.velocidad} simétricos</div>
                
                <ul className="space-y-3 mb-8">
                  {plan.caracteristicas.map((car, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{car}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  href="/calculadora-empresas"
                  className={`block text-center px-6 py-3 rounded-lg font-bold ${
                    plan.destacado
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  Solicitar
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Conecta Todo tu Local</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">Para tus Clientes</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ WiFi gratis con tu marca</li>
                  <li>✓ Portal personalizado</li>
                  <li>✓ Captura datos marketing</li>
                  <li>✓ QR fácil conexión</li>
                  <li>✓ Velocidad garantizada</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">Para tu Negocio</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Datáfonos fijos y móviles</li>
                  <li>✓ Cámaras de seguridad IP</li>
                  <li>✓ Software de inventario</li>
                  <li>✓ Facturación electrónica</li>
                  <li>✓ App gestión remota</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Más Soluciones Claro por Sector</h2>
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <Link href="/internet-claro-empresas" className="bg-red-50 p-6 rounded-lg hover:shadow-lg transition-all">
              <h3 className="font-bold text-lg mb-2">Claro Empresas</h3>
              <p className="text-sm text-gray-600">Oficinas y corporativos</p>
            </Link>
            <Link href="/internet-claro-restaurantes" className="bg-red-50 p-6 rounded-lg hover:shadow-lg transition-all">
              <h3 className="font-bold text-lg mb-2">Claro Restaurantes</h3>
              <p className="text-sm text-gray-600">Gastronomía y cafés</p>
            </Link>
            <Link href="/internet-claro-consultorios" className="bg-red-50 p-6 rounded-lg hover:shadow-lg transition-all">
              <h3 className="font-bold text-lg mb-2">Claro Consultorios</h3>
              <p className="text-sm text-gray-600">Salud y consultorios</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <QuickCallForm provider="Claro Locales" buttonColor="#ef4444" />
        </div>
      </section>

    </div>
  );
}
