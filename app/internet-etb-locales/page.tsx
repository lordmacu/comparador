import type { Metadata } from 'next';
import Link from 'next/link';
import { Store, Wifi, Shield, CheckCircle2, Calculator, Phone, ArrowRight } from 'lucide-react';
import QuickCallForm from '@/components/QuickCallForm';

export const metadata: Metadata = {
  title: 'Internet ETB Locales Comerciales 2026 | Fibra desde $129.900',
  description: 'Planes internet ETB para locales comerciales en Bogotá. Fibra óptica simétrica, WiFi para clientes, datáfonos. Ideal tiendas, boutiques, ferreterías. Desde $129.900.',
  keywords: [
    'internet etb locales comerciales',
    'fibra etb tiendas',
    'internet etb negocios',
    'wifi etb comercios',
    'internet locales bogota',
    'etb retail',
    'conexión etb comercio'
  ],
  alternates: {
    canonical: 'https://comparadorinternet.co/internet-etb-locales',
  },
  openGraph: {
    title: 'Internet ETB Locales Comerciales 2026 | Fibra desde $129.900',
    description: 'Conectividad ETB diseñada para locales comerciales. WiFi para clientes, datáfonos y más.',
    url: 'https://comparadorinternet.co/internet-etb-locales',
    siteName: 'Comparador Internet Colombia',
    locale: 'es_CO',
    type: 'website',
  },
};

const planesETB = [
  {
    nombre: 'ETB Local 100 Mbps',
    velocidad: '100 Mbps',
    precio: '$129.900',
    caracteristicas: [
      'Fibra óptica 100% simétrica',
      'WiFi dual para clientes/admin',
      'Router empresarial',
      'Soporte 24/7',
      'Instalación gratis',
      'Ideal 1-2 datáfonos'
    ]
  },
  {
    nombre: 'ETB Local 200 Mbps',
    velocidad: '200 Mbps',
    precio: '$159.900',
    destacado: true,
    caracteristicas: [
      'Fibra dedicada 1:8',
      'WiFi Mesh cobertura total',
      'Red invitados separada',
      'Portal cautivo personalizado',
      'IP Fija opcional',
      'Ideal 3-5 datáfonos'
    ]
  },
  {
    nombre: 'ETB Local 300 Mbps',
    velocidad: '300 Mbps',
    precio: '$199.900',
    caracteristicas: [
      'Fibra dedicada 1:4',
      'WiFi 6 alto tráfico',
      'Cámaras IP compatibles',
      'Firewall básico',
      '1 IP Fija incluida',
      'Ideal 6+ datáfonos'
    ]
  },
];

const ventajasETB = [
  {
    titulo: 'WiFi para Clientes',
    descripcion: 'Red separada para tus clientes con portal personalizado y velocidad garantizada.',
    icon: Wifi
  },
  {
    titulo: 'Datáfonos Estables',
    descripcion: 'Conexión confiable para tus datáfonos físicos y virtuales sin caídas.',
    icon: Shield
  },
  {
    titulo: 'Soporte Comercial',
    descripcion: 'Atención prioritaria entendiendo las necesidades de tu negocio local.',
    icon: Phone
  },
  {
    titulo: 'Cobertura Comercial',
    descripcion: 'Presencia en las principales zonas comerciales de Bogotá.',
    icon: Store
  },
];

export default function InternetETBLocalesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      
      <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 text-white py-20">
        <div className="container-custom">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Internet ETB Locales<br />
              <span className="text-blue-200">WiFi y Conectividad para tu Comercio</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-blue-50">
              Planes diseñados para locales comerciales: tiendas, boutiques, ferreterías y más. 
              WiFi para clientes, datáfonos y cámaras IP. <strong>Desde $129.900/mes</strong>
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/calculadora-empresas"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-all inline-flex items-center gap-2 shadow-lg"
              >
                <Calculator className="w-5 h-5" />
                Cotizar Ahora
              </Link>
              <Link 
                href="/comparar"
                className="bg-blue-500/20 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-500/30 transition-all"
              >
                Comparar Operadores
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Por qué ETB para tu Local</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {ventajasETB.map((ventaja, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all">
                <ventaja.icon className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">{ventaja.titulo}</h3>
                <p className="text-gray-600">{ventaja.descripcion}</p>
              </div>
            ))}
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Planes ETB Locales Comerciales</h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {planesETB.map((plan, index) => (
              <div 
                key={index}
                className={`bg-white rounded-2xl shadow-lg p-8 ${
                  plan.destacado ? 'ring-4 ring-blue-500 scale-105' : ''
                }`}
              >
                {plan.destacado && (
                  <div className="bg-blue-600 text-white text-center py-2 -mt-8 -mx-8 mb-6 font-bold rounded-t-2xl">
                    MÁS VENDIDO
                  </div>
                )}
                
                <h3 className="text-2xl font-bold mb-4">{plan.nombre}</h3>
                <div className="text-4xl font-bold text-blue-600 mb-2">{plan.precio}</div>
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
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
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

      <section className="py-16 bg-blue-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Internet ETB para Todo Tipo de Negocio</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">Locales Comerciales</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Tiendas de ropa y calzado</li>
                  <li>✓ Ferreterías y materiales</li>
                  <li>✓ Papelerías y librerías</li>
                  <li>✓ Boutiques y accesorios</li>
                  <li>✓ Minimercados</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">Incluye</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ WiFi para empleados y clientes</li>
                  <li>✓ Conexión para datáfonos</li>
                  <li>✓ Cámaras de seguridad IP</li>
                  <li>✓ Software de inventario</li>
                  <li>✓ Facturación electrónica</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Más Soluciones ETB por Sector</h2>
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <Link href="/internet-etb-empresas" className="bg-blue-50 p-6 rounded-lg hover:shadow-lg transition-all">
              <h3 className="font-bold text-lg mb-2">ETB Empresas</h3>
              <p className="text-sm text-gray-600">Oficinas y corporativos</p>
            </Link>
            <Link href="/internet-etb-restaurantes" className="bg-blue-50 p-6 rounded-lg hover:shadow-lg transition-all">
              <h3 className="font-bold text-lg mb-2">ETB Restaurantes</h3>
              <p className="text-sm text-gray-600">Gastronomía y cafés</p>
            </Link>
            <Link href="/internet-etb-consultorios" className="bg-blue-50 p-6 rounded-lg hover:shadow-lg transition-all">
              <h3 className="font-bold text-lg mb-2">ETB Consultorios</h3>
              <p className="text-sm text-gray-600">Salud y consultorios</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container-custom max-w-2xl">
          <QuickCallForm />
        </div>
      </section>

    </div>
  );
}
