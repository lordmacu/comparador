import type { Metadata } from 'next';
import Link from 'next/link';
import { Stethoscope, Wifi, Shield, CheckCircle2, Calculator, Phone, Lock } from 'lucide-react';
import QuickCallForm from '@/components/QuickCallForm';

export const metadata: Metadata = {
  title: 'Internet Claro Consultorios Médicos 2026 | Fibra Segura desde $129.900',
  description: 'Planes internet Claro para consultorios médicos en Bogotá. Fibra segura, telemedicina HD, historia clínica, IP Fija. Mayor cobertura salud. Desde $129.900.',
  keywords: [
    'internet claro consultorios',
    'claro salud',
    'telemedicina claro',
    'internet clinicas claro',
    'historia clinica electronica',
    'claro odontologia'
  ],
  alternates: {
    canonical: 'https://comparadorinternet.co/internet-claro-consultorios',
  },
  openGraph: {
    title: 'Internet Claro Consultorios | Telemedicina + Mayor Cobertura',
    description: 'Conectividad Claro para consultorios médicos con telemedicina HD y seguridad.',
    url: 'https://comparadorinternet.co/internet-claro-consultorios',
    siteName: 'Comparador Internet Colombia',
    locale: 'es_CO',
    type: 'website',
  },
};

const planesClaro = [
  {
    nombre: 'Claro Consultorio 150 Mbps',
    velocidad: '150 Mbps',
    precio: '$129.900',
    caracteristicas: [
      'Fibra óptica simétrica',
      'Red segura certificada',
      'Router con firewall',
      'WiFi sala espera separado',
      'Telemedicina HD',
      'Ideal 1-2 médicos'
    ]
  },
  {
    nombre: 'Claro Consultorio 250 Mbps',
    velocidad: '250 Mbps',
    precio: '$169.900',
    destacado: true,
    caracteristicas: [
      'Fibra premium',
      '1 IP Fija incluida',
      'VPN datos pacientes',
      'Historia clínica fluida',
      'Backup automático',
      'Ideal 3-5 médicos'
    ]
  },
  {
    nombre: 'Claro Consultorio 400 Mbps',
    velocidad: '400 Mbps',
    precio: '$219.900',
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

const ventajasClaro = [
  {
    titulo: 'Telemedicina HD',
    descripcion: 'Videoconsultas en alta definición sin interrupciones para atención remota de calidad.',
    icon: Stethoscope
  },
  {
    titulo: 'Seguridad Datos',
    descripcion: 'Conexión segura con firewall y encriptación para proteger datos de pacientes.',
    icon: Shield
  },
  {
    titulo: 'IP Fija Médica',
    descripcion: 'Acceso seguro a historia clínica electrónica desde cualquier ubicación.',
    icon: Lock
  },
  {
    titulo: 'Mayor Cobertura',
    descripcion: 'Presente en más edificios médicos y zonas de salud que otros operadores.',
    icon: Wifi
  },
];

export default function InternetClaroConsultoriosPage() {
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
                Internet Claro Consultorios<br />
                <span className="text-red-200">Conectividad Segura para Salud</span>
              </h1>
              
              <p className="text-xl md:text-2xl mb-8 text-red-100">
                Internet empresarial para consultorios médicos, odontológicos y clínicas. 
                Telemedicina HD, historia clínica segura e IP Fija. <strong>Desde $129.900/mes</strong>
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <Link 
                  href="/calculadora-empresas"
                  className="bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-50 transition-all inline-flex items-center gap-2 shadow-lg"
                >
                  <Calculator className="w-5 h-5" />
                  Cotizar para mi Consultorio
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
                  <div className="text-3xl font-bold mb-1">IP Fija</div>
                  <div className="text-sm text-red-200">Incluida</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1">Telemedicina</div>
                  <div className="text-sm text-red-200">HD</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1">#1</div>
                  <div className="text-sm text-red-200">Cobertura</div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
              <h2 className="text-white text-xl font-bold mb-2">Deja tu teléfono y te llamamos</h2>
              <p className="text-red-100 text-sm mb-6">Recibe asesoría especializada Claro Consultorios</p>
              <QuickCallForm buttonColor="#ef4444" provider="Claro Consultorios" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Claro para el Sector Salud</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {ventajasClaro.map((ventaja, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all">
                <ventaja.icon className="w-12 h-12 text-red-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">{ventaja.titulo}</h3>
                <p className="text-gray-600">{ventaja.descripcion}</p>
              </div>
            ))}
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Planes Claro Consultorios</h2>
          
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
                    RECOMENDADO
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
            <h2 className="text-3xl font-bold mb-8 text-center">Conectividad para Todo tu Consultorio</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">Software Médico</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Historia clínica electrónica</li>
                  <li>✓ Agendamiento online</li>
                  <li>✓ Telemedicina HD</li>
                  <li>✓ Facturación RIPS</li>
                  <li>✓ Recetas electrónicas</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">Equipos Conectados</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Equipos diagnóstico digital</li>
                  <li>✓ Rayos X digitales</li>
                  <li>✓ Ecógrafos conectados</li>
                  <li>✓ Datáfonos POS</li>
                  <li>✓ WiFi sala espera separado</li>
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
            <Link href="/internet-claro-locales" className="bg-red-50 p-6 rounded-lg hover:shadow-lg transition-all">
              <h3 className="font-bold text-lg mb-2">Claro Locales</h3>
              <p className="text-sm text-gray-600">Tiendas y comercios</p>
            </Link>
            <Link href="/internet-claro-restaurantes" className="bg-red-50 p-6 rounded-lg hover:shadow-lg transition-all">
              <h3 className="font-bold text-lg mb-2">Claro Restaurantes</h3>
              <p className="text-sm text-gray-600">Gastronomía y cafés</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <QuickCallForm provider="Claro Consultorios" buttonColor="#ef4444" />
        </div>
      </section>

    </div>
  );
}
