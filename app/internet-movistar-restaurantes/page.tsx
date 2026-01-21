import type { Metadata } from 'next';
import Link from 'next/link';
import { UtensilsCrossed, Wifi, Shield, CheckCircle2, Calculator, Phone, Zap } from 'lucide-react';
import QuickCallForm from '@/components/QuickCallForm';

export const metadata: Metadata = {
  title: 'Internet Movistar Restaurantes 2026 | WiFi Gratis desde $129.900',
  description: 'Planes internet Movistar para restaurantes en Bogotá. WiFi clientes, domicilios, POS, combo con móviles. Ideal restaurantes, cafés, bares. Desde $129.900.',
  keywords: [
    'internet movistar restaurantes',
    'wifi movistar cafes',
    'movistar gastronomia',
    'internet domicilios rappi',
    'wifi restaurante movistar',
    'movistar bares'
  ],
  alternates: {
    canonical: 'https://comparadorinternet.co/internet-movistar-restaurantes',
  },
  openGraph: {
    title: 'Internet Movistar Restaurantes | WiFi + Domicilios + POS',
    description: 'Conectividad Movistar diseñada para restaurantes y cafés con WiFi para clientes.',
    url: 'https://comparadorinternet.co/internet-movistar-restaurantes',
    siteName: 'Comparador Internet Colombia',
    locale: 'es_CO',
    type: 'website',
  },
};

const planesMovistar = [
  {
    nombre: 'Movistar Restaurante 150 Mbps',
    velocidad: '150 Mbps',
    precio: '$129.900',
    caracteristicas: [
      'Fibra óptica simétrica',
      'WiFi dual cocina/salón',
      'Portal WiFi personalizado',
      'Ideal 20-40 comensales',
      'Apps domicilios estables',
      'Soporte 24/7'
    ]
  },
  {
    nombre: 'Movistar Restaurante 250 Mbps',
    velocidad: '250 Mbps',
    precio: '$169.900',
    destacado: true,
    caracteristicas: [
      'Fibra premium',
      'WiFi Mesh total coverage',
      'Branding en portal WiFi',
      'Ideal 50-80 comensales',
      'POS + domicilios + reservas',
      'Combo móviles 15% OFF'
    ]
  },
  {
    nombre: 'Movistar Restaurante 400 Mbps',
    velocidad: '400 Mbps',
    precio: '$219.900',
    caracteristicas: [
      'Fibra dedicada 1:4',
      'WiFi 6 alto tráfico',
      '1 IP Fija incluida',
      'Ideal 100+ comensales',
      'Múltiples POS + TV',
      'Cámaras IP + música'
    ]
  },
];

const ventajasMovistar = [
  {
    titulo: 'WiFi Marketing',
    descripcion: 'Portal cautivo con tu logo para captar datos de clientes y hacer remarketing.',
    icon: Wifi
  },
  {
    titulo: 'Apps Domicilios',
    descripcion: 'Conexión optimizada para Rappi, Didi Food, Uber Eats sin interrupciones.',
    icon: UtensilsCrossed
  },
  {
    titulo: 'Combo Ahorro',
    descripcion: 'Descuentos en líneas móviles para tu personal (meseros, domiciliarios).',
    icon: Shield
  },
  {
    titulo: 'Soporte Express',
    descripcion: 'Atención prioritaria porque sabemos que cada minuto sin internet es venta perdida.',
    icon: Phone
  },
];

export default function InternetMovistarRestaurantesPage() {
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
                Internet Movistar Restaurantes<br />
                <span className="text-green-200">WiFi + Domicilios + POS</span>
              </h1>
              
              <p className="text-xl md:text-2xl mb-8 text-green-100">
                Conectividad diseñada para restaurantes, cafés y bares. WiFi para clientes, 
                apps de domicilios y descuentos en móviles. <strong>Desde $129.900/mes</strong>
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <Link 
                  href="/calculadora-empresas"
                  className="bg-white text-green-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-50 transition-all inline-flex items-center gap-2 shadow-lg"
                >
                  <Calculator className="w-5 h-5" />
                  Cotizar para mi Restaurante
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
                  <div className="text-3xl font-bold mb-1">WiFi</div>
                  <div className="text-sm text-green-200">Gratis</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1">Rappi</div>
                  <div className="text-sm text-green-200">Estable</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1">15%</div>
                  <div className="text-sm text-green-200">OFF Móvil</div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
              <h2 className="text-white text-xl font-bold mb-2">Deja tu teléfono y te llamamos</h2>
              <p className="text-green-100 text-sm mb-6">Recibe asesoría especializada Movistar Restaurantes</p>
              <QuickCallForm buttonColor="#22c55e" provider="Movistar Restaurantes" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Movistar para tu Restaurante</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {ventajasMovistar.map((ventaja, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all">
                <ventaja.icon className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">{ventaja.titulo}</h3>
                <p className="text-gray-600">{ventaja.descripcion}</p>
              </div>
            ))}
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Planes Movistar Restaurantes</h2>
          
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
                  Contratar
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Todo Conectado en tu Restaurante</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">Para tus Clientes</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ WiFi gratis sin límites</li>
                  <li>✓ Portal con tu branding</li>
                  <li>✓ Captura emails/teléfonos</li>
                  <li>✓ QR fácil de conectar</li>
                  <li>✓ Streaming música/TV</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">Para tu Operación</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ POS y datáfonos rápidos</li>
                  <li>✓ Rappi + Didi + Uber Eats</li>
                  <li>✓ Sistema de reservas</li>
                  <li>✓ Cámaras de seguridad</li>
                  <li>✓ Software de comandas</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Más Soluciones Movistar Empresariales</h2>
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <Link href="/internet-movistar-empresas" className="bg-green-50 p-6 rounded-lg hover:shadow-lg transition-all">
              <h3 className="font-bold text-lg mb-2">Movistar Empresas</h3>
              <p className="text-sm text-gray-600">Oficinas y corporativos</p>
            </Link>
            <Link href="/internet-movistar-locales" className="bg-green-50 p-6 rounded-lg hover:shadow-lg transition-all">
              <h3 className="font-bold text-lg mb-2">Movistar Locales</h3>
              <p className="text-sm text-gray-600">Tiendas y comercios</p>
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
          <QuickCallForm provider="Movistar Restaurantes" buttonColor="#22c55e" />
        </div>
      </section>

    </div>
  );
}
