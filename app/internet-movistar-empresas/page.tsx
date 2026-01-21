import type { Metadata } from 'next';
import Link from 'next/link';
import { Building, Wifi, Shield, CheckCircle2, Calculator, Phone, Zap } from 'lucide-react';
import QuickCallForm from '@/components/QuickCallForm';

export const metadata: Metadata = {
  title: 'Internet Movistar Empresas 2026 | Fibra Empresarial desde $139.900',
  description: 'Planes internet Movistar para empresas en Bogotá. Fibra óptica corporativa, IP Fija, integración móvil-fijo. Ideal PyMEs y oficinas. Desde $139.900.',
  keywords: [
    'internet movistar empresas',
    'fibra movistar empresarial',
    'movistar corporativo',
    'planes movistar negocios',
    'ip fija movistar',
    'internet movistar oficinas',
    'movistar pymes'
  ],
  alternates: {
    canonical: 'https://comparadorinternet.co/internet-movistar-empresas',
  },
  openGraph: {
    title: 'Internet Movistar Empresas 2026 | Fibra + Móvil',
    description: 'Planes empresariales Movistar con integración fijo-móvil y soporte corporativo.',
    url: 'https://comparadorinternet.co/internet-movistar-empresas',
    siteName: 'Comparador Internet Colombia',
    locale: 'es_CO',
    type: 'website',
  },
};

const planesMovistar = [
  {
    nombre: 'Movistar Empresas 200 Mbps',
    velocidad: '200 Mbps',
    precio: '$139.900',
    caracteristicas: [
      'Fibra óptica simétrica',
      'Router WiFi 6 empresarial',
      'IP Fija disponible',
      'Soporte técnico 24/7',
      'Integración móvil',
      'Instalación incluida'
    ]
  },
  {
    nombre: 'Movistar Empresas 300 Mbps',
    velocidad: '300 Mbps',
    precio: '$179.900',
    destacado: true,
    caracteristicas: [
      'Fibra dedicada premium',
      '1 IP Fija incluida',
      'WiFi Mesh empresarial',
      'Soporte prioritario',
      'App gestión negocios',
      'Descuentos móvil corporativo'
    ]
  },
  {
    nombre: 'Movistar Empresas 500 Mbps',
    velocidad: '500 Mbps',
    precio: '$239.900',
    caracteristicas: [
      'Fibra dedicada 1:2',
      '2 IP Fijas incluidas',
      'SD-WAN disponible',
      'Seguridad avanzada',
      'Telefonía IP ilimitada',
      'SLA 99.9%'
    ]
  },
];

const ventajasMovistar = [
  {
    titulo: 'Integración Fijo-Móvil',
    descripcion: 'Combina internet empresarial con planes móviles corporativos y ahorra en facturación.',
    icon: Wifi
  },
  {
    titulo: 'Red Internacional',
    descripcion: 'Respaldo de Telefónica, red global para empresas con operaciones internacionales.',
    icon: Shield
  },
  {
    titulo: 'Soporte Corporativo',
    descripcion: 'Ejecutivo de cuenta dedicado y soporte técnico especializado 24/7.',
    icon: Phone
  },
  {
    titulo: 'Soluciones Cloud',
    descripcion: 'Acceso a servicios cloud, almacenamiento y herramientas de productividad.',
    icon: Zap
  },
];

export default function InternetMovistarEmpresasPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      
      <section className="bg-gradient-to-br from-green-700 via-green-600 to-green-500 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(#22c55e 1px, transparent 1px)', backgroundSize: '40px 40px'}}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-400/30 px-4 py-2 rounded-full mb-6">
                <Building className="w-5 h-5 text-green-200" />
                <span className="font-semibold text-green-100 uppercase tracking-wide text-sm">Internet Movistar Empresas</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Internet Movistar Empresas<br />
                <span className="text-green-200">Conectividad Corporativa Total</span>
              </h1>
              
              <p className="text-xl text-green-50 mb-8 max-w-lg">
                Soluciones empresariales con fibra óptica, IP Fija e integración móvil-fijo. 
                Respaldo internacional de Telefónica. <strong>Desde $139.900/mes</strong>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link 
                  href="/calculadora-empresas"
                  className="bg-white text-green-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-50 transition-all inline-flex items-center justify-center gap-2 shadow-lg"
                >
                  <Calculator className="w-5 h-5" />
                  Cotizar Movistar
                </Link>
                <Link 
                  href="/comparar"
                  className="bg-white/10 border border-white/20 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all text-center"
                >
                  Comparar Operadores
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-200">Global</div>
                  <div className="text-sm text-green-100">Red</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-200">99.9%</div>
                  <div className="text-sm text-green-100">SLA</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-200">24/7</div>
                  <div className="text-sm text-green-100">Soporte</div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
              <h2 className="text-white text-xl font-bold mb-2">Deja tu teléfono y te llamamos</h2>
              <p className="text-green-100 text-sm mb-6">Recibe asesoría especializada Movistar Empresas</p>
              <QuickCallForm buttonColor="#16a34a" provider="Movistar Empresas" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Ventajas Movistar Empresas</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {ventajasMovistar.map((ventaja, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all">
                <ventaja.icon className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">{ventaja.titulo}</h3>
                <p className="text-gray-600">{ventaja.descripcion}</p>
              </div>
            ))}
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Planes Movistar Empresas</h2>
          
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
                    RECOMENDADO
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Soluciones por Tipo de Negocio</h2>
          <div className="grid md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <Link href="/internet-movistar-locales" className="bg-white p-6 rounded-lg hover:shadow-lg transition-all">
              <h3 className="font-bold">Movistar Locales</h3>
            </Link>
            <Link href="/internet-movistar-restaurantes" className="bg-white p-6 rounded-lg hover:shadow-lg transition-all">
              <h3 className="font-bold">Movistar Restaurantes</h3>
            </Link>
            <Link href="/internet-movistar-consultorios" className="bg-white p-6 rounded-lg hover:shadow-lg transition-all">
              <h3 className="font-bold">Movistar Consultorios</h3>
            </Link>
            <Link href="/internet-oficinas-bogota" className="bg-white p-6 rounded-lg hover:shadow-lg transition-all">
              <h3 className="font-bold">Movistar Oficinas</h3>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <QuickCallForm provider="Movistar Empresas" buttonColor="#16a34a" />
        </div>
      </section>

    </div>
  );
}
