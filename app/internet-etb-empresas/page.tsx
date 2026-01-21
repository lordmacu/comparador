import type { Metadata } from 'next';
import Link from 'next/link';
import { Building, Wifi, Shield, CheckCircle2, Calculator, Phone, ArrowRight } from 'lucide-react';
import QuickCallForm from '@/components/QuickCallForm';

export const metadata: Metadata = {
  title: 'Internet ETB Empresas 2026 | Fibra 100% Dedicada desde $149.900',
  description: 'Planes internet ETB para empresas en Bogotá. Fibra óptica 100%, IP Fija, soporte prioritario 24/7. Ideal PyMEs, oficinas y corporativos. Desde $149.900.',
  keywords: [
    'internet etb empresas',
    'fibra etb empresarial',
    'internet etb corporativo',
    'planes etb negocios',
    'ip fija etb',
    'internet etb oficinas',
    'etb pymes',
    'fibra optica etb empresas'
  ],
  alternates: {
    canonical: 'https://comparadorinternet.co/internet-etb-empresas',
  },
  openGraph: {
    title: 'Internet ETB Empresas 2026 | Fibra Dedicada',
    description: 'Planes empresariales ETB con fibra 100%, IP Fija y soporte 24/7 para tu negocio.',
    url: 'https://comparadorinternet.co/internet-etb-empresas',
    siteName: 'Comparador Internet Colombia',
    locale: 'es_CO',
    type: 'website',
  },
};

const planesETB = [
  {
    nombre: 'ETB Empresas 200 Mbps',
    velocidad: '200 Mbps',
    precio: '$149.900',
    caracteristicas: [
      'Fibra óptica 100% simétrica',
      '1 IP Fija incluida',
      'Router WiFi 6 empresarial',
      'Soporte 24/7 prioritario',
      'Instalación gratis',
      'SLA 99.5% uptime'
    ]
  },
  {
    nombre: 'ETB Empresas 300 Mbps',
    velocidad: '300 Mbps',
    precio: '$189.900',
    destacado: true,
    caracteristicas: [
      'Fibra dedicada 1:4',
      '2 IP Fijas incluidas',
      'WiFi 6 Mesh empresarial',
      'Técnico asignado',
      'Portal de gestión',
      'SLA 99.9% uptime'
    ]
  },
  {
    nombre: 'ETB Empresas 500 Mbps',
    velocidad: '500 Mbps',
    precio: '$249.900',
    caracteristicas: [
      'Fibra dedicada 1:2',
      '3 IP Fijas incluidas',
      'Firewall empresarial',
      'VPN corporativa',
      'Soporte en sitio',
      'SLA 99.9% garantizado'
    ]
  },
];

const ventajasETB = [
  {
    titulo: 'Fibra 100% Propia',
    descripcion: 'ETB tiene su propia infraestructura de fibra óptica en Bogotá, sin depender de terceros.',
    icon: Wifi
  },
  {
    titulo: 'IP Fija Incluida',
    descripcion: 'Todos los planes empresariales incluyen al menos 1 IP Fija para acceso remoto seguro.',
    icon: Shield
  },
  {
    titulo: 'Soporte Local',
    descripcion: 'Call center en Bogotá con técnicos especializados en soluciones empresariales.',
    icon: Phone
  },
  {
    titulo: 'Mejor Cobertura Bogotá',
    descripcion: 'Como empresa de la ciudad, ETB tiene la mejor cobertura en zonas empresariales.',
    icon: Building
  },
];

export default function InternetETBEmpresasPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      
      <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 text-white py-20">
        <div className="container-custom">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Internet ETB Empresas<br />
              <span className="text-blue-200">Fibra 100% para tu Negocio</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-blue-50">
              Planes empresariales con fibra óptica 100% propia, IP Fija y soporte prioritario. 
              La mejor conectividad para empresas en Bogotá. <strong>Desde $149.900/mes</strong>
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/calculadora-empresas"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-all inline-flex items-center gap-2 shadow-lg"
              >
                <Calculator className="w-5 h-5" />
                Cotizar ETB
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
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Ventajas de ETB Empresas</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {ventajasETB.map((ventaja, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all">
                <ventaja.icon className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">{ventaja.titulo}</h3>
                <p className="text-gray-600">{ventaja.descripcion}</p>
              </div>
            ))}
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Planes ETB Empresas</h2>
          
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
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Ver Planes por Tipo de Negocio</h2>
          <div className="grid md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <Link href="/internet-etb-locales" className="bg-white p-6 rounded-lg hover:shadow-lg transition-all">
              <h3 className="font-bold">ETB Locales</h3>
            </Link>
            <Link href="/internet-etb-restaurantes" className="bg-white p-6 rounded-lg hover:shadow-lg transition-all">
              <h3 className="font-bold">ETB Restaurantes</h3>
            </Link>
            <Link href="/internet-etb-consultorios" className="bg-white p-6 rounded-lg hover:shadow-lg transition-all">
              <h3 className="font-bold">ETB Consultorios</h3>
            </Link>
            <Link href="/internet-oficinas-bogota" className="bg-white p-6 rounded-lg hover:shadow-lg transition-all">
              <h3 className="font-bold">ETB Oficinas</h3>
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
