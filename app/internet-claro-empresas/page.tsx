import type { Metadata } from 'next';
import Link from 'next/link';
import { Building, Wifi, Shield, CheckCircle2, Calculator, Phone, Zap } from 'lucide-react';
import QuickCallForm from '@/components/QuickCallForm';

export const metadata: Metadata = {
  title: 'Internet Claro Empresas 2026 | Fibra Óptica desde $129.900',
  description: 'Planes internet Claro para empresas en Bogotá. Fibra óptica empresarial, IP Fija, combo con móviles corporativos. Ideal PyMEs y oficinas. Desde $129.900.',
  keywords: [
    'internet claro empresas',
    'fibra claro empresarial',
    'claro corporativo',
    'planes claro negocios',
    'ip fija claro',
    'internet claro oficinas',
    'claro pymes'
  ],
  alternates: {
    canonical: 'https://comparadorinternet.co/internet-claro-empresas',
  },
  openGraph: {
    title: 'Internet Claro Empresas 2026 | Fibra + Móvil Corporativo',
    description: 'Planes empresariales Claro con fibra óptica y beneficios corporativos.',
    url: 'https://comparadorinternet.co/internet-claro-empresas',
    siteName: 'Comparador Internet Colombia',
    locale: 'es_CO',
    type: 'website',
  },
};

const planesClaro = [
  {
    nombre: 'Claro Empresas 200 Mbps',
    velocidad: '200 Mbps',
    precio: '$129.900',
    caracteristicas: [
      'Fibra óptica simétrica',
      'Router WiFi 6 empresarial',
      'Soporte técnico 24/7',
      'App Mi Claro Negocios',
      'Combo con móviles',
      'Instalación incluida'
    ]
  },
  {
    nombre: 'Claro Empresas 300 Mbps',
    velocidad: '300 Mbps',
    precio: '$169.900',
    destacado: true,
    caracteristicas: [
      'Fibra dedicada premium',
      '1 IP Fija incluida',
      'WiFi Mesh empresarial',
      'Soporte prioritario',
      'Descuento móvil 20%',
      'Portal de gestión'
    ]
  },
  {
    nombre: 'Claro Empresas 500 Mbps',
    velocidad: '500 Mbps',
    precio: '$229.900',
    caracteristicas: [
      'Fibra dedicada 1:2',
      '2 IP Fijas incluidas',
      'Firewall empresarial',
      'SD-WAN disponible',
      'Telefonía IP ilimitada',
      'SLA 99.9%'
    ]
  },
];

const ventajasClaro = [
  {
    titulo: 'Mayor Cobertura',
    descripcion: 'La red de fibra más amplia de Colombia, presente en más zonas empresariales.',
    icon: Wifi
  },
  {
    titulo: 'Combo Fijo-Móvil',
    descripcion: 'Ahorra combinando internet empresarial con planes móviles corporativos.',
    icon: Shield
  },
  {
    titulo: 'Soporte 24/7',
    descripcion: 'Call center especializado en empresas con atención prioritaria.',
    icon: Phone
  },
  {
    titulo: 'Infraestructura',
    descripcion: 'Red robusta de América Móvil, el operador más grande de Latinoamérica.',
    icon: Zap
  },
];

export default function InternetClaroEmpresasPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      
      <section className="bg-gradient-to-br from-red-700 via-red-600 to-red-500 text-white py-20">
        <div className="container-custom">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Internet Claro Empresas<br />
              <span className="text-red-200">La Mayor Cobertura Empresarial</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-red-50">
              Planes empresariales con la red de fibra más amplia de Colombia. 
              IP Fija, combo móvil y soporte 24/7. <strong>Desde $129.900/mes</strong>
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/calculadora-empresas"
                className="bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-50 transition-all inline-flex items-center gap-2 shadow-lg"
              >
                <Calculator className="w-5 h-5" />
                Cotizar Claro
              </Link>
              <Link 
                href="/comparar"
                className="bg-red-500/20 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-500/30 transition-all"
              >
                Comparar Operadores
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Ventajas Claro Empresas</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {ventajasClaro.map((ventaja, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all">
                <ventaja.icon className="w-12 h-12 text-red-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">{ventaja.titulo}</h3>
                <p className="text-gray-600">{ventaja.descripcion}</p>
              </div>
            ))}
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Planes Claro Empresas</h2>
          
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
                  Contratar
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-red-50">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Soluciones por Tipo de Negocio</h2>
          <div className="grid md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <Link href="/internet-claro-locales" className="bg-white p-6 rounded-lg hover:shadow-lg transition-all">
              <h3 className="font-bold">Claro Locales</h3>
            </Link>
            <Link href="/internet-claro-restaurantes" className="bg-white p-6 rounded-lg hover:shadow-lg transition-all">
              <h3 className="font-bold">Claro Restaurantes</h3>
            </Link>
            <Link href="/internet-claro-consultorios" className="bg-white p-6 rounded-lg hover:shadow-lg transition-all">
              <h3 className="font-bold">Claro Consultorios</h3>
            </Link>
            <Link href="/internet-oficinas-bogota" className="bg-white p-6 rounded-lg hover:shadow-lg transition-all">
              <h3 className="font-bold">Claro Oficinas</h3>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom max-w-2xl">
          <QuickCallForm />
        </div>
      </section>

    </div>
  );
}
