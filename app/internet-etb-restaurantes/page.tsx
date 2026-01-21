import type { Metadata } from 'next';
import Link from 'next/link';
import { UtensilsCrossed, Wifi, Shield, CheckCircle2, Calculator, Phone, ArrowRight } from 'lucide-react';
import QuickCallForm from '@/components/QuickCallForm';

export const metadata: Metadata = {
  title: 'Internet ETB Restaurantes 2026 | WiFi + Datáfonos desde $139.900',
  description: 'Planes internet ETB para restaurantes en Bogotá. WiFi para clientes, domicilios, POS y reservas online. Ideal restaurantes, cafés, bares. Desde $139.900.',
  keywords: [
    'internet etb restaurantes',
    'wifi restaurantes bogota',
    'internet etb cafes',
    'conexion etb gastronomia',
    'wifi clientes restaurante',
    'internet domicilios rappi',
    'etb bares'
  ],
  alternates: {
    canonical: 'https://comparadorinternet.co/internet-etb-restaurantes',
  },
  openGraph: {
    title: 'Internet ETB Restaurantes 2026 | WiFi Gratis para Clientes',
    description: 'Conectividad ETB para restaurantes. WiFi invitados, domicilios, POS y más.',
    url: 'https://comparadorinternet.co/internet-etb-restaurantes',
    siteName: 'Comparador Internet Colombia',
    locale: 'es_CO',
    type: 'website',
  },
};

const planesETB = [
  {
    nombre: 'ETB Restaurante 150 Mbps',
    velocidad: '150 Mbps',
    precio: '$139.900',
    caracteristicas: [
      'Fibra óptica simétrica',
      'WiFi dual: admin/clientes',
      'Router empresarial',
      'Ideal 20-30 clientes',
      'Domicilios simultáneos',
      'Soporte 24/7'
    ]
  },
  {
    nombre: 'ETB Restaurante 250 Mbps',
    velocidad: '250 Mbps',
    precio: '$179.900',
    destacado: true,
    caracteristicas: [
      'Fibra dedicada 1:6',
      'WiFi Mesh cobertura total',
      'Portal cautivo branding',
      'Ideal 40-60 clientes',
      'POS + domicilios',
      'Streaming sin buffering'
    ]
  },
  {
    nombre: 'ETB Restaurante 400 Mbps',
    velocidad: '400 Mbps',
    precio: '$229.900',
    caracteristicas: [
      'Fibra dedicada 1:4',
      'WiFi 6 alto tráfico',
      'Cámaras + TV streaming',
      'Ideal 80+ clientes',
      'Múltiples POS',
      '1 IP Fija incluida'
    ]
  },
];

const ventajasETB = [
  {
    titulo: 'WiFi Gratis Clientes',
    descripcion: 'Red separada con portal personalizado para que tus clientes se conecten sin afectar operación.',
    icon: Wifi
  },
  {
    titulo: 'Domicilios Rápidos',
    descripcion: 'Conexión estable para Rappi, Didi Food, Uber Eats y todas las apps de domicilios.',
    icon: UtensilsCrossed
  },
  {
    titulo: 'POS Sin Fallas',
    descripcion: 'Conectividad confiable para datáfonos y sistemas de punto de venta.',
    icon: Shield
  },
  {
    titulo: 'Soporte Local',
    descripcion: 'Atención prioritaria sabiendo que cada minuto sin internet afecta tus ventas.',
    icon: Phone
  },
];

export default function InternetETBRestaurantesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      
      <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '40px 40px'}}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-blue-500/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-blue-400/30">
                Internet Empresarial ETB
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Internet ETB Restaurantes<br />
                <span className="text-blue-200">WiFi + Domicilios + POS</span>
              </h1>
              
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Internet empresarial diseñado para restaurantes, cafés y bares en Bogotá. 
                WiFi para clientes, apps de domicilios y POS sin caídas. <strong>Desde $139.900/mes</strong>
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <Link 
                  href="/calculadora-empresas"
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-all inline-flex items-center gap-2 shadow-lg"
                >
                  <Calculator className="w-5 h-5" />
                  Cotizar para mi Restaurante
                </Link>
                <Link 
                  href="/comparar"
                  className="bg-blue-500/20 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-500/30 transition-all"
                >
                  Comparar Operadores
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-blue-400/30">
                <div>
                  <div className="text-3xl font-bold mb-1">WiFi</div>
                  <div className="text-sm text-blue-200">Gratis Clientes</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1">POS</div>
                  <div className="text-sm text-blue-200">Sin Fallas</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1">24/7</div>
                  <div className="text-sm text-blue-200">Soporte</div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
              <h2 className="text-white text-xl font-bold mb-2">Deja tu teléfono y te llamamos</h2>
              <p className="text-blue-100 text-sm mb-6">Recibe asesoría especializada ETB Restaurantes</p>
              <QuickCallForm buttonColor="#3b82f6" provider="ETB Restaurantes" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">ETB Entiende tu Restaurante</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {ventajasETB.map((ventaja, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all">
                <ventaja.icon className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">{ventaja.titulo}</h3>
                <p className="text-gray-600">{ventaja.descripcion}</p>
              </div>
            ))}
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Planes ETB Restaurantes</h2>
          
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
                  Contratar
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Todo lo que Necesitas Conectado</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">Para tus Clientes</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ WiFi gratis sin límites</li>
                  <li>✓ Portal con tu logo</li>
                  <li>✓ QR para conectarse</li>
                  <li>✓ Música streaming (Spotify)</li>
                  <li>✓ TV streaming (deportes)</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">Para tu Operación</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ POS y datáfonos</li>
                  <li>✓ Rappi, Didi, Uber Eats</li>
                  <li>✓ Reservas online</li>
                  <li>✓ Cámaras de seguridad</li>
                  <li>✓ Software de facturación</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Más Soluciones ETB Empresariales</h2>
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <Link href="/internet-etb-empresas" className="bg-blue-50 p-6 rounded-lg hover:shadow-lg transition-all">
              <h3 className="font-bold text-lg mb-2">ETB Empresas</h3>
              <p className="text-sm text-gray-600">Oficinas y corporativos</p>
            </Link>
            <Link href="/internet-etb-locales" className="bg-blue-50 p-6 rounded-lg hover:shadow-lg transition-all">
              <h3 className="font-bold text-lg mb-2">ETB Locales</h3>
              <p className="text-sm text-gray-600">Tiendas y retail</p>
            </Link>
            <Link href="/internet-etb-consultorios" className="bg-blue-50 p-6 rounded-lg hover:shadow-lg transition-all">
              <h3 className="font-bold text-lg mb-2">ETB Consultorios</h3>
              <p className="text-sm text-gray-600">Salud y consultorios</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <QuickCallForm provider="ETB Restaurantes" buttonColor="#3b82f6" />
        </div>
      </section>

    </div>
  );
}
