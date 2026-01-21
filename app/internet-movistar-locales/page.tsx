import type { Metadata } from 'next';
import Link from 'next/link';
import { Store, Wifi, Shield, CheckCircle2, Calculator, Phone, Zap } from 'lucide-react';
import QuickCallForm from '@/components/QuickCallForm';

export const metadata: Metadata = {
  title: 'Internet Movistar Locales Comerciales 2026 | Fibra desde $119.900',
  description: 'Planes internet Movistar para locales comerciales en Bogotá. Fibra óptica, WiFi para clientes, integración con móviles. Ideal tiendas y comercios. Desde $119.900.',
  keywords: [
    'internet movistar locales',
    'fibra movistar tiendas',
    'wifi movistar comercios',
    'movistar retail',
    'internet locales bogota',
    'movistar negocios'
  ],
  alternates: {
    canonical: 'https://comparadorinternet.co/internet-movistar-locales',
  },
  openGraph: {
    title: 'Internet Movistar Locales Comerciales | WiFi + Móvil',
    description: 'Conectividad Movistar para locales comerciales con integración fijo-móvil.',
    url: 'https://comparadorinternet.co/internet-movistar-locales',
    siteName: 'Comparador Internet Colombia',
    locale: 'es_CO',
    type: 'website',
  },
};

const planesMovistar = [
  {
    nombre: 'Movistar Local 100 Mbps',
    velocidad: '100 Mbps',
    precio: '$119.900',
    caracteristicas: [
      'Fibra óptica simétrica',
      'WiFi dual admin/clientes',
      'Router empresarial',
      'App Mi Movistar Negocios',
      'Soporte técnico 24/7',
      'Instalación gratis'
    ]
  },
  {
    nombre: 'Movistar Local 200 Mbps',
    velocidad: '200 Mbps',
    precio: '$149.900',
    destacado: true,
    caracteristicas: [
      'Fibra premium',
      'WiFi Mesh cobertura total',
      'Portal cautivo branded',
      'Combo con móviles 20% OFF',
      'Datáfonos inalámbricos',
      'Cámaras IP compatibles'
    ]
  },
  {
    nombre: 'Movistar Local 300 Mbps',
    velocidad: '300 Mbps',
    precio: '$189.900',
    caracteristicas: [
      'Fibra dedicada 1:4',
      'WiFi 6 alto rendimiento',
      '1 IP Fija incluida',
      'Firewall empresarial',
      'Monitoreo remoto',
      'Múltiples datáfonos'
    ]
  },
];

const ventajasMovistar = [
  {
    titulo: 'Combo Fijo-Móvil',
    descripcion: 'Descuentos al combinar internet con líneas móviles corporativas para tu equipo.',
    icon: Wifi
  },
  {
    titulo: 'WiFi Marketing',
    descripcion: 'Portal cautivo con tu marca para captar datos de clientes y hacer marketing.',
    icon: Shield
  },
  {
    titulo: 'App de Gestión',
    descripcion: 'Controla tu conexión, consumo y servicios desde Mi Movistar Negocios.',
    icon: Phone
  },
  {
    titulo: 'Red Confiable',
    descripcion: 'Infraestructura robusta de Telefónica con cobertura en zonas comerciales.',
    icon: Zap
  },
];

export default function InternetMovistarLocalesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      
      <section className="bg-gradient-to-br from-green-700 via-green-600 to-green-500 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(#22c55e 1px, transparent 1px)', backgroundSize: '40px 40px'}}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-green-500/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-green-400/30">
                Internet Empresarial Movistar
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Internet Movistar Locales<br />
                <span className="text-green-200">WiFi + Móvil para tu Comercio</span>
              </h1>
              
              <p className="text-xl md:text-2xl mb-8 text-green-100">
                Conectividad para locales comerciales con WiFi para clientes y descuentos en móviles. 
                Ideal tiendas, boutiques y comercios. <strong>Desde $119.900/mes</strong>
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <Link 
                  href="/calculadora-empresas"
                  className="bg-white text-green-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-50 transition-all inline-flex items-center gap-2 shadow-lg"
                >
                  <Calculator className="w-5 h-5" />
                  Cotizar Ahora
                </Link>
                <Link 
                  href="/comparar"
                  className="bg-green-500/20 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-500/30 transition-all"
                >
                  Comparar Operadores
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-green-400/30">
                <div>
                  <div className="text-3xl font-bold mb-1">20%</div>
                  <div className="text-sm text-green-200">OFF Móvil</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1">WiFi</div>
                  <div className="text-sm text-green-200">Marketing</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1">24/7</div>
                  <div className="text-sm text-green-200">Soporte</div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
              <h2 className="text-white text-xl font-bold mb-2">Deja tu teléfono y te llamamos</h2>
              <p className="text-green-100 text-sm mb-6">Recibe asesoría especializada Movistar Locales</p>
              <QuickCallForm buttonColor="#22c55e" provider="Movistar Locales" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Ventajas Movistar para tu Local</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {ventajasMovistar.map((ventaja, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all">
                <ventaja.icon className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">{ventaja.titulo}</h3>
                <p className="text-gray-600">{ventaja.descripcion}</p>
              </div>
            ))}
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Planes Movistar Locales</h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {planesMovistar.map((plan, index) => (
              <div 
                key={index}
                className={`bg-white rounded-2xl shadow-lg p-8 ${
                  plan.destacado ? 'ring-4 ring-green-500 scale-105' : ''
                }`}
              >
                {plan.destacado && (
                  <div className="bg-green-600 text-white text-center py-2 -mt-8 -mx-8 mb-6 font-bold rounded-t-2xl">
                    MÁS VENDIDO
                  </div>
                )}
                
                <h3 className="text-2xl font-bold mb-4">{plan.nombre}</h3>
                <div className="text-4xl font-bold text-green-600 mb-2">{plan.precio}</div>
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
                      ? 'bg-green-600 text-white hover:bg-green-700'
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

      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Conecta Todo tu Local</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">Para tus Clientes</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ WiFi gratis con tu marca</li>
                  <li>✓ Portal personalizado</li>
                  <li>✓ Captura de datos marketing</li>
                  <li>✓ QR de conexión</li>
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
          <h2 className="text-3xl font-bold mb-6">Más Soluciones Movistar por Sector</h2>
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <Link href="/internet-movistar-empresas" className="bg-green-50 p-6 rounded-lg hover:shadow-lg transition-all">
              <h3 className="font-bold text-lg mb-2">Movistar Empresas</h3>
              <p className="text-sm text-gray-600">Oficinas y corporativos</p>
            </Link>
            <Link href="/internet-movistar-restaurantes" className="bg-green-50 p-6 rounded-lg hover:shadow-lg transition-all">
              <h3 className="font-bold text-lg mb-2">Movistar Restaurantes</h3>
              <p className="text-sm text-gray-600">Gastronomía y cafés</p>
            </Link>
            <Link href="/internet-movistar-consultorios" className="bg-green-50 p-6 rounded-lg hover:shadow-lg transition-all">
              <h3 className="font-bold text-lg mb-2">Movistar Consultorios</h3>
              <p className="text-sm text-gray-600">Salud y consultorios</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <QuickCallForm provider="Movistar Locales" buttonColor="#22c55e" />
        </div>
      </section>

    </div>
  );
}
