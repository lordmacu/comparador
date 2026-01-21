import type { Metadata } from 'next';
import Link from 'next/link';
import { Stethoscope, Shield, Wifi, Video, Calendar, FileText, CheckCircle2, Calculator, Phone, Database, Lock, ArrowRight } from 'lucide-react';
import QuickCallForm from '@/components/QuickCallForm';

export const metadata: Metadata = {
  title: 'Internet para Consultorios Médicos Bogotá 2026 | Telemedicina desde $89.900',
  description: 'Internet de alta velocidad para consultorios médicos en Bogotá. Conexión segura para telemedicina, historia clínica electrónica y agendamiento. Cumple normativa HIPAA. Desde $89.900.',
  keywords: [
    'internet consultorios medicos',
    'internet telemedicina',
    'internet consultorio bogota',
    'internet clinica',
    'wifi consultorio medico',
    'internet historia clinica',
    'internet para doctores',
    'internet odontologia',
    'internet fisioterapia',
    'planes internet salud'
  ],
  alternates: {
    canonical: 'https://comparadorinternet.co/internet-consultorios-bogota',
  },
  openGraph: {
    title: 'Internet para Consultorios Médicos Bogotá 2026 | Telemedicina Segura',
    description: 'Conectividad confiable y segura para consultorios médicos. Telemedicina, historia clínica electrónica y cumplimiento normativo.',
    url: 'https://comparadorinternet.co/internet-consultorios-bogota',
    siteName: 'Comparador Internet Colombia',
    locale: 'es_CO',
    type: 'website',
  },
};

const necesidadesConsultorio = [
  {
    titulo: 'Telemedicina HD',
    descripcion: 'Consultas virtuales con video de alta calidad. Audio claro para diagnósticos precisos a distancia.',
    icon: Video,
    mbpsRequeridos: '50-100 Mbps'
  },
  {
    titulo: 'Historia Clínica Electrónica',
    descripcion: 'Acceso rápido a HCE, imágenes médicas, laboratorios. Sincronización en tiempo real con la nube.',
    icon: FileText,
    mbpsRequeridos: '30-50 Mbps'
  },
  {
    titulo: 'Seguridad y Privacidad',
    descripcion: 'Conexión segura para datos sensibles de pacientes. Cumplimiento de normativa HIPAA y Ley 1581.',
    icon: Shield,
    mbpsRequeridos: '20-40 Mbps'
  },
  {
    titulo: 'Agendamiento Online',
    descripcion: 'Plataformas de citas, recordatorios automáticos, pagos en línea. Reducción de no-shows.',
    icon: Calendar,
    mbpsRequeridos: '10-20 Mbps'
  },
];

const tiposConsultorios = [
  {
    nombre: 'Consultorio Individual',
    descripcion: 'Médico general, especialista solo',
    icon: Stethoscope,
    necesidades: ['Telemedicina', 'HCE', 'Agendamiento'],
    velocidadMin: '100 Mbps',
    pacientes: '10-20 día'
  },
  {
    nombre: 'Consultorio Compartido',
    descripcion: '2-3 profesionales en el mismo espacio',
    icon: Stethoscope,
    necesidades: ['Múltiples telemedicinas', 'HCE compartida', 'WiFi sala espera'],
    velocidadMin: '200 Mbps',
    pacientes: '20-40 día'
  },
  {
    nombre: 'Clínica Pequeña',
    descripcion: '4-10 consultorios, servicios múltiples',
    icon: Stethoscope,
    necesidades: ['Telemedicina masiva', 'Sistema integrado', 'WiFi completo'],
    velocidadMin: '300 Mbps',
    pacientes: '50+ día'
  },
  {
    nombre: 'Consultorios Especializados',
    descripcion: 'Odontología, fisioterapia, psicología',
    icon: Stethoscope,
    necesidades: ['Imágenes pesadas', 'Agendamiento', 'Recordatorios'],
    velocidadMin: '100 Mbps',
    pacientes: '15-30 día'
  },
];

const planesConsultorios = [
  {
    nombre: 'Consultorio Básico',
    velocidad: '100 Mbps',
    precio: '$89.900',
    ideal: 'Consultorio individual, 1 profesional',
    caracteristicas: [
      'Telemedicina HD sin cortes',
      'Router WiFi seguro incluido',
      'Soporte historia clínica nube',
      'Red separada admin/pacientes',
      'Instalación gratis'
    ],
    destacado: false
  },
  {
    nombre: 'Consultorio Plus',
    velocidad: '200 Mbps',
    precio: '$129.900',
    ideal: 'Consultorio compartido, 2-3 profesionales',
    caracteristicas: [
      'Múltiples telemedicinas simultáneas',
      'Fibra simétrica para subir imágenes',
      'WiFi dual (admin + sala espera)',
      'IP Fija para acceso remoto seguro',
      'Soporte prioritario 24/7'
    ],
    destacado: true
  },
  {
    nombre: 'Clínica Pro',
    velocidad: '300 Mbps',
    precio: '$179.900',
    ideal: 'Clínicas, centros médicos, 4+ profesionales',
    caracteristicas: [
      'Fibra dedicada ultra rápida',
      'WiFi 6 Mesh (múltiples access points)',
      '2 IP Fijas incluidas',
      'VPN empresarial para datos sensibles',
      'Soporte técnico en sitio',
      'Portal de gestión avanzado'
    ],
    destacado: false
  },
];

const requisitosSeguridad = [
  {
    titulo: 'Protección de Datos',
    items: [
      'Cumplimiento Ley 1581 (Habeas Data)',
      'Encriptación de datos sensibles',
      'Firewall empresarial incluido',
      'Backup automático HCE'
    ]
  },
  {
    titulo: 'Acceso Controlado',
    items: [
      'Red WiFi separada para pacientes',
      'Contraseñas robustas WPA3',
      'VPN para acceso remoto seguro',
      'Logs de auditoría'
    ]
  },
];

const beneficiosTelemedicina = [
  'Amplía tu cobertura a pacientes fuera de Bogotá',
  'Reduce costos operativos del consultorio',
  'Mayor flexibilidad horaria para profesionales',
  'Seguimiento continuo de pacientes crónicos',
  'Disminuye no-shows con recordatorios',
  'Segunda opinión médica sin desplazamiento'
];

export default function InternetConsultoriosBogotaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-600 text-white py-20">
        <div className="container-custom">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Stethoscope className="w-5 h-5" />
              <span className="text-sm font-semibold">Sector Salud</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Internet para Consultorios<br />
              <span className="text-cyan-200">Telemedicina + HCE Segura</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-cyan-50">
              Conectividad confiable y segura para tu consultorio médico en Bogotá. 
              Telemedicina HD, historia clínica electrónica y cumplimiento normativo. 
              <strong> Desde $89.900/mes</strong>
            </p>
            
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-green-300" />
                <span className="text-lg">Telemedicina sin cortes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-green-300" />
                <span className="text-lg">Datos protegidos HIPAA</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-green-300" />
                <span className="text-lg">HCE en la nube rápida</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/calculadora-empresas"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-all inline-flex items-center gap-2 shadow-lg"
              >
                <Calculator className="w-5 h-5" />
                Calcular Mi Plan
              </Link>
              <a 
                href="#planes"
                className="bg-blue-500/20 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-500/30 transition-all inline-flex items-center gap-2"
              >
                Ver Planes
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Necesidades del Consultorio */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Qué Necesita tu Consultorio?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Internet confiable para brindar la mejor atención a tus pacientes
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {necesidadesConsultorio.map((necesidad, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-100">
                <necesidad.icon className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">{necesidad.titulo}</h3>
                <p className="text-gray-600 mb-4">{necesidad.descripcion}</p>
                <div className="bg-blue-50 px-3 py-2 rounded-lg inline-block">
                  <span className="text-sm font-semibold text-blue-700">{necesidad.mbpsRequeridos}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tipos de Consultorios */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Planes según Tipo de Consultorio
            </h2>
            <p className="text-xl text-gray-600">
              Cada práctica médica tiene necesidades de conectividad diferentes
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiposConsultorios.map((tipo, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all">
                <tipo.icon className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">{tipo.nombre}</h3>
                <p className="text-gray-600 mb-2 text-sm">{tipo.descripcion}</p>
                <p className="text-blue-600 font-semibold mb-4 text-sm">{tipo.pacientes}</p>
                <div className="space-y-2 mb-4">
                  {tipo.necesidades.map((necesidad, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>{necesidad}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-blue-50 px-3 py-2 rounded-lg">
                  <span className="text-sm font-semibold text-blue-700">Desde {tipo.velocidadMin}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Planes */}
      <section id="planes" className="py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Planes Internet para Consultorios
            </h2>
            <p className="text-xl text-gray-600">
              Comparamos ETB, Claro y Movistar para encontrar la mejor opción
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {planesConsultorios.map((plan, index) => (
              <div 
                key={index}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden ${
                  plan.destacado ? 'ring-4 ring-blue-500 scale-105' : ''
                }`}
              >
                {plan.destacado && (
                  <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-center py-2 font-bold">
                    MÁS POPULAR
                  </div>
                )}
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.nombre}</h3>
                  <p className="text-gray-600 mb-4">{plan.ideal}</p>
                  
                  <div className="mb-6">
                    <div className="text-4xl font-bold text-blue-600 mb-2">{plan.precio}</div>
                    <div className="text-gray-600">{plan.velocidad} simétricos</div>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.caracteristicas.map((caracteristica, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{caracteristica}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link
                    href="/calculadora-empresas"
                    className={`block text-center px-6 py-3 rounded-lg font-bold transition-all ${
                      plan.destacado
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    Cotizar Plan
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seguridad y Cumplimiento */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Shield className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Seguridad y Cumplimiento Normativo
              </h2>
              <p className="text-xl text-gray-600">
                Protege los datos sensibles de tus pacientes con conexión segura
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {requisitosSeguridad.map((requisito, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Lock className="w-6 h-6 text-blue-600" />
                    {requisito.titulo}
                  </h3>
                  <ul className="space-y-3">
                    {requisito.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                <Shield className="w-6 h-6 text-yellow-600" />
                Importante: Cumplimiento Legal
              </h3>
              <p className="text-gray-700">
                Los consultorios médicos deben cumplir con la <strong>Ley 1581 de 2012</strong> (Protección de Datos Personales) 
                y <strong>Resolución 1995 de 1999</strong> (Historia Clínica). Una conexión segura con encriptación 
                y backups automáticos es fundamental para evitar sanciones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios Telemedicina */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Video className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Beneficios de la Telemedicina
              </h2>
              <p className="text-xl text-gray-600">
                Expande tu práctica médica más allá del consultorio físico
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {beneficiosTelemedicina.map((beneficio, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-md flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <span className="font-semibold">{beneficio}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Por Operador */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Internet Consultorios por Operador
            </h2>
            <p className="text-xl text-gray-600">
              Conoce las opciones de cada proveedor para el sector salud
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link href="/internet-etb-consultorios" className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-8 rounded-xl hover:scale-105 transition-all shadow-lg">
              <h3 className="text-2xl font-bold mb-2">ETB Consultorios</h3>
              <p className="mb-4">Fibra 100% + VPN segura</p>
              <div className="flex items-center gap-2 text-blue-100">
                <span>Ver planes ETB</span>
                <ArrowRight className="w-5 h-5" />
              </div>
            </Link>
            
            <Link href="/internet-claro-consultorios" className="bg-gradient-to-br from-red-600 to-red-700 text-white p-8 rounded-xl hover:scale-105 transition-all shadow-lg">
              <h3 className="text-2xl font-bold mb-2">Claro Consultorios</h3>
              <p className="mb-4">Alta velocidad + IP Fija</p>
              <div className="flex items-center gap-2 text-red-100">
                <span>Ver planes Claro</span>
                <ArrowRight className="w-5 h-5" />
              </div>
            </Link>
            
            <Link href="/internet-movistar-consultorios" className="bg-gradient-to-br from-green-600 to-green-700 text-white p-8 rounded-xl hover:scale-105 transition-all shadow-lg">
              <h3 className="text-2xl font-bold mb-2">Movistar Consultorios</h3>
              <p className="mb-4">Simétrica + soporte 24/7</p>
              <div className="flex items-center gap-2 text-green-100">
                <span>Ver planes Movistar</span>
                <ArrowRight className="w-5 h-5" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Final */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-cyan-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Listo para modernizar tu consultorio?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Cotiza planes empresariales especializados en salud
          </p>
          <Link
            href="/calculadora-empresas"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-all inline-flex items-center gap-2 shadow-lg"
          >
            <Calculator className="w-6 h-6" />
            Calcular Plan Ideal
          </Link>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16">
        <div className="container-custom max-w-2xl">
          <QuickCallForm />
        </div>
      </section>

    </div>
  );
}
