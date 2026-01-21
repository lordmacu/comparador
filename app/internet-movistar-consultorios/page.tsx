import type { Metadata } from 'next';
import Link from 'next/link';
import { Stethoscope, Wifi, Shield, CheckCircle2, Calculator, Phone, Lock } from 'lucide-react';
import QuickCallForm from '@/components/QuickCallForm';

export const metadata: Metadata = {
  title: 'Internet Movistar Consultorios Médicos 2026 | Fibra Segura desde $139.900',
  description: 'Planes internet Movistar para consultorios médicos en Bogotá. Fibra segura, telemedicina HD, historia clínica, IP Fija. Salud conectada. Desde $139.900.',
  keywords: [
    'internet movistar consultorios',
    'movistar salud',
    'telemedicina movistar',
    'internet clinicas movistar',
    'historia clinica electronica',
    'movistar odontologia'
  ],
  alternates: {
    canonical: 'https://comparadorinternet.co/internet-movistar-consultorios',
  },
  openGraph: {
    title: 'Internet Movistar Consultorios | Telemedicina + Seguridad',
    description: 'Conectividad Movistar para consultorios médicos. Telemedicina HD y datos seguros.',
    url: 'https://comparadorinternet.co/internet-movistar-consultorios',
    siteName: 'Comparador Internet Colombia',
    locale: 'es_CO',
    type: 'website',
  },
};

const planesMovistar = [
  {
    nombre: 'Movistar Consultorio 150 Mbps',
    velocidad: '150 Mbps',
    precio: '$139.900',
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
    nombre: 'Movistar Consultorio 250 Mbps',
    velocidad: '250 Mbps',
    precio: '$179.900',
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
    nombre: 'Movistar Consultorio 400 Mbps',
    velocidad: '400 Mbps',
    precio: '$229.900',
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

const ventajasMovistar = [
  {
    titulo: 'Telemedicina HD',
    descripcion: 'Videoconsultas en alta definición sin cortes ni retrasos para atención remota.',
    icon: Stethoscope
  },
  {
    titulo: 'Datos Protegidos',
    descripcion: 'Conexión segura con firewall y encriptación para proteger información de pacientes.',
    icon: Shield
  },
  {
    titulo: 'IP Fija Médica',
    descripcion: 'Acceso remoto seguro a historia clínica desde casa o múltiples sedes.',
    icon: Lock
  },
  {
    titulo: 'Soporte Salud',
    descripcion: 'Atención prioritaria con técnicos capacitados en necesidades del sector salud.',
    icon: Phone
  },
];

export default function InternetMovistarConsultoriosPage() {
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
                Internet Movistar Consultorios<br />
                <span className="text-green-200">Conectividad Segura para Salud</span>
              </h1>
              
              <p className="text-xl md:text-2xl mb-8 text-green-100">
                Internet empresarial para consultorios médicos, odontológicos y clínicas. 
                Telemedicina HD, historia clínica segura e IP Fija. <strong>Desde $139.900/mes</strong>
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <Link 
                  href="/calculadora-empresas"
                  className="bg-white text-green-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-50 transition-all inline-flex items-center gap-2 shadow-lg"
                >
                  <Calculator className="w-5 h-5" />
                  Cotizar para mi Consultorio
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
                  <div className="text-3xl font-bold mb-1">IP Fija</div>
                  <div className="text-sm text-green-200">Incluida</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1">Telemedicina</div>
                  <div className="text-sm text-green-200">HD</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1">VPN</div>
                  <div className="text-sm text-green-200">Segura</div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
              <h2 className="text-white text-xl font-bold mb-2">Deja tu teléfono y te llamamos</h2>
              <p className="text-green-100 text-sm mb-6">Recibe asesoría especializada Movistar Consultorios</p>
              <QuickCallForm buttonColor="#22c55e" provider="Movistar Consultorios" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Movistar para el Sector Salud</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {ventajasMovistar.map((ventaja, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all">
                <ventaja.icon className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">{ventaja.titulo}</h3>
                <p className="text-gray-600">{ventaja.descripcion}</p>
              </div>
            ))}
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Planes Movistar Consultorios</h2>
          
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
            <h2 className="text-3xl font-bold mb-8 text-center">Todo lo que Necesita tu Consultorio</h2>
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
                  <li>✓ Equipos diagnóstico</li>
                  <li>✓ Rayos X digitales</li>
                  <li>✓ Ecógrafos conectados</li>
                  <li>✓ Datáfonos POS</li>
                  <li>✓ WiFi pacientes separado</li>
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
            <Link href="/internet-movistar-locales" className="bg-green-50 p-6 rounded-lg hover:shadow-lg transition-all">
              <h3 className="font-bold text-lg mb-2">Movistar Locales</h3>
              <p className="text-sm text-gray-600">Tiendas y comercios</p>
            </Link>
            <Link href="/internet-movistar-restaurantes" className="bg-green-50 p-6 rounded-lg hover:shadow-lg transition-all">
              <h3 className="font-bold text-lg mb-2">Movistar Restaurantes</h3>
              <p className="text-sm text-gray-600">Gastronomía y cafés</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <QuickCallForm provider="Movistar Consultorios" buttonColor="#22c55e" />
        </div>
      </section>

    </div>
  );
}
