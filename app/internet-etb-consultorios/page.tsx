import type { Metadata } from 'next';
import Link from 'next/link';
import { Stethoscope, Wifi, Shield, CheckCircle2, Calculator, Phone, Lock } from 'lucide-react';
import QuickCallForm from '@/components/QuickCallForm';

export const metadata: Metadata = {
  title: 'Internet ETB Consultorios Médicos 2026 | Conexión HIPAA desde $149.900',
  description: 'Planes internet ETB para consultorios médicos en Bogotá. Fibra segura, historia clínica electrónica, telemedicina, IP Fija. Cumple normas de salud. Desde $149.900.',
  keywords: [
    'internet etb consultorios',
    'wifi consultorios medicos',
    'internet etb clinicas',
    'telemedicina etb',
    'historia clinica electronica',
    'internet seguro salud',
    'etb odontologia'
  ],
  alternates: {
    canonical: 'https://comparadorinternet.co/internet-etb-consultorios',
  },
  openGraph: {
    title: 'Internet ETB Consultorios Médicos | Seguridad y Estabilidad',
    description: 'Conectividad ETB para consultorios médicos. Historia clínica, telemedicina y más.',
    url: 'https://comparadorinternet.co/internet-etb-consultorios',
    siteName: 'Comparador Internet Colombia',
    locale: 'es_CO',
    type: 'website',
  },
};

const planesETB = [
  {
    nombre: 'ETB Consultorio 150 Mbps',
    velocidad: '150 Mbps',
    precio: '$149.900',
    caracteristicas: [
      'Fibra óptica simétrica',
      'Red segura datos pacientes',
      'Router con firewall',
      'WiFi separado sala espera',
      'Backup automático nube',
      'Ideal 1-2 médicos'
    ]
  },
  {
    nombre: 'ETB Consultorio 250 Mbps',
    velocidad: '250 Mbps',
    precio: '$189.900',
    destacado: true,
    caracteristicas: [
      'Fibra dedicada 1:6',
      '1 IP Fija incluida',
      'VPN para datos sensibles',
      'Telemedicina HD',
      'Historia clínica fluida',
      'Ideal 3-5 médicos'
    ]
  },
  {
    nombre: 'ETB Consultorio 400 Mbps',
    velocidad: '400 Mbps',
    precio: '$239.900',
    caracteristicas: [
      'Fibra dedicada 1:4',
      '2 IP Fijas incluidas',
      'Firewall médico avanzado',
      'Imágenes diagnósticas',
      'Múltiples telemedicinas',
      'Ideal clínicas 6+ médicos'
    ]
  },
];

const ventajasETB = [
  {
    titulo: 'Seguridad Datos',
    descripcion: 'Conexión segura que cumple con normativas de protección de datos de pacientes.',
    icon: Shield
  },
  {
    titulo: 'Telemedicina Fluida',
    descripcion: 'Videoconsultas en HD sin interrupciones, ideal para atención remota.',
    icon: Stethoscope
  },
  {
    titulo: 'IP Fija Médica',
    descripcion: 'Acceso seguro a historia clínica electrónica desde cualquier lugar.',
    icon: Lock
  },
  {
    titulo: 'Soporte Prioritario',
    descripcion: 'Atención especializada entendiendo la criticidad de tu servicio médico.',
    icon: Phone
  },
];

export default function InternetETBConsultoriosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      
      <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 text-white py-20">
        <div className="container-custom">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Internet ETB Consultorios<br />
              <span className="text-blue-200">Conectividad Segura para Salud</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-blue-50">
              Internet empresarial para consultorios médicos, odontológicos y de salud. 
              Historia clínica, telemedicina, IP Fija y seguridad garantizada. <strong>Desde $149.900/mes</strong>
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/calculadora-empresas"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-all inline-flex items-center gap-2 shadow-lg"
              >
                <Calculator className="w-5 h-5" />
                Cotizar para mi Consultorio
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
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Internet Diseñado para el Sector Salud</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {ventajasETB.map((ventaja, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all">
                <ventaja.icon className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">{ventaja.titulo}</h3>
                <p className="text-gray-600">{ventaja.descripcion}</p>
              </div>
            ))}
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Planes ETB Consultorios</h2>
          
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
            <h2 className="text-3xl font-bold mb-8 text-center">Conectividad para Todo tu Consultorio</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">Software Médico</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Historia clínica electrónica</li>
                  <li>✓ Agendamiento de citas</li>
                  <li>✓ Facturación RIPS</li>
                  <li>✓ Telemedicina HD</li>
                  <li>✓ Almacenamiento seguro</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">Equipos Conectados</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Equipos diagnóstico digital</li>
                  <li>✓ Rayos X / Ecografías</li>
                  <li>✓ Impresoras de fórmulas</li>
                  <li>✓ Datáfonos y POS</li>
                  <li>✓ WiFi sala de espera</li>
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
            <Link href="/internet-etb-locales" className="bg-blue-50 p-6 rounded-lg hover:shadow-lg transition-all">
              <h3 className="font-bold text-lg mb-2">ETB Locales</h3>
              <p className="text-sm text-gray-600">Tiendas y comercios</p>
            </Link>
            <Link href="/internet-etb-restaurantes" className="bg-blue-50 p-6 rounded-lg hover:shadow-lg transition-all">
              <h3 className="font-bold text-lg mb-2">ETB Restaurantes</h3>
              <p className="text-sm text-gray-600">Gastronomía y cafés</p>
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
