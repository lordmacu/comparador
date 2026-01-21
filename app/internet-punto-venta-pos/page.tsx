import type { Metadata } from 'next';
import Link from 'next/link';
import { CreditCard, Wifi, Zap, Shield, CheckCircle2, Calculator, Clock, TrendingUp, AlertTriangle, ArrowRight } from 'lucide-react';
import QuickCallForm from '@/components/QuickCallForm';

export const metadata: Metadata = {
  title: 'Internet para Punto de Venta POS 2026 | Datáfonos Sin Cortes desde $69.900',
  description: 'Internet ultra confiable para punto de venta POS y datáfonos en Bogotá. Sin caídas, conexión estable para no perder ventas. Fibra dedicada desde $69.900. ETB, Claro, Movistar.',
  keywords: [
    'internet punto de venta',
    'internet pos',
    'internet datafono',
    'internet para ventas',
    'conexion estable datafono',
    'internet comercio bogota',
    'internet para tienda',
    'fibra optica pos',
    'internet sin caidas',
    'planes internet comercial'
  ],
  alternates: {
    canonical: 'https://comparadorinternet.co/internet-punto-venta-pos',
  },
  openGraph: {
    title: 'Internet para Punto de Venta POS 2026 | Sin Caídas',
    description: 'Conexión ultra estable para datáfonos y sistemas POS. No pierdas ventas por fallas de internet.',
    url: 'https://comparadorinternet.co/internet-punto-venta-pos',
    siteName: 'Comparador Internet Colombia',
    locale: 'es_CO',
    type: 'website',
  },
};

const problemasSinInternet = [
  {
    problema: 'Ventas Perdidas',
    descripcion: 'Clientes que se van porque el datáfono no funciona',
    costo: 'Hasta $500.000/mes',
    icon: TrendingUp
  },
  {
    problema: 'Mala Reputación',
    descripcion: 'Clientes frustrados por esperar que el POS responda',
    costo: 'Pérdida de clientes',
    icon: AlertTriangle
  },
  {
    problema: 'Tiempo Perdido',
    descripcion: 'Intentos múltiples, reiniciar dispositivos, llamar soporte',
    costo: '2-3 horas/semana',
    icon: Clock
  },
  {
    problema: 'Estrés Operativo',
    descripcion: 'Incertidumbre si la venta se procesó correctamente',
    costo: 'Alta rotación personal',
    icon: Shield
  },
];

const requisitosPos = [
  {
    titulo: 'Latencia Baja',
    descripcion: 'Menos de 50ms para autorización instantánea de transacciones.',
    valor: '< 50ms',
    icon: Zap
  },
  {
    titulo: 'Alta Disponibilidad',
    descripcion: 'Uptime 99.9% garantizado. Máximo 8 horas de caída al año.',
    valor: '99.9%',
    icon: Shield
  },
  {
    titulo: 'Velocidad Mínima',
    descripcion: 'Aunque el POS use poco ancho de banda, se necesita estabilidad.',
    valor: '30+ Mbps',
    icon: Wifi
  },
  {
    titulo: 'Redundancia',
    descripcion: 'Backup 4G/5G automático si cae la conexión principal.',
    valor: 'Dual WAN',
    icon: Shield
  },
];

const planesPos = [
  {
    nombre: 'POS Básico',
    velocidad: '50 Mbps',
    precio: '$69.900',
    ideal: 'Tiendas pequeñas, 1-2 datáfonos',
    caracteristicas: [
      'Fibra ultra estable',
      'Latencia < 30ms',
      'Router empresarial incluido',
      'QoS priorizado para POS',
      'Instalación gratis',
      'Soporte telefónico'
    ],
    destacado: false
  },
  {
    nombre: 'POS Plus',
    velocidad: '100 Mbps',
    precio: '$89.900',
    ideal: 'Comercios medianos, 3-5 datáfonos',
    caracteristicas: [
      'Fibra simétrica dedicada',
      'Backup 4G incluido',
      'Múltiples POS simultáneos',
      'IP Fija para conexión segura',
      'Soporte prioritario 24/7',
      'Reemplazo router en 4h'
    ],
    destacado: true
  },
  {
    nombre: 'POS Enterprise',
    velocidad: '200 Mbps',
    precio: '$129.900',
    ideal: 'Locales grandes, franquicias, 6+ POS',
    caracteristicas: [
      'Fibra dedicada 1:2',
      'Dual WAN (fibra + 4G backup)',
      'SLA 99.9% uptime garantizado',
      '2 IP Fijas',
      'Soporte técnico en sitio',
      'Monitoreo 24/7',
      'Reemplazo router en 2h'
    ],
    destacado: false
  },
];

const tiposNegociosPos = [
  {
    nombre: 'Supermercados',
    descripcion: 'Alto volumen transacciones',
    datáfonos: '4-10',
    velocidadMin: '100 Mbps'
  },
  {
    nombre: 'Restaurantes',
    descripcion: 'Múltiples mesas, propinas',
    datáfonos: '2-5',
    velocidadMin: '50 Mbps'
  },
  {
    nombre: 'Tiendas Ropa',
    descripcion: 'Transacciones medianas',
    datáfonos: '1-3',
    velocidadMin: '50 Mbps'
  },
  {
    nombre: 'Farmacias',
    descripcion: 'Volumen alto, ticket bajo',
    datáfonos: '2-4',
    velocidadMin: '100 Mbps'
  },
  {
    nombre: 'Ferreterías',
    descripcion: 'Transacciones grandes',
    datáfonos: '1-2',
    velocidadMin: '30 Mbps'
  },
  {
    nombre: 'Gasolineras',
    descripcion: 'Múltiples bombas',
    datáfonos: '4-8',
    velocidadMin: '200 Mbps'
  },
];

const consejosPro = [
  'Configura QoS (Quality of Service) en el router para priorizar tráfico POS sobre WiFi clientes',
  'Usa cables Ethernet para datáfonos fijos (más estable que WiFi)',
  'Ten un plan de backup celular (4G/5G) para emergencias',
  'Configura alertas cuando la conexión cae más de 30 segundos',
  'Realiza pruebas de latencia semanalmente (comando: ping 8.8.8.8)',
  'Ubica el router cerca de los datáfonos para mejor señal WiFi'
];

export default function InternetPuntoVentaPosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 text-white py-20">
        <div className="container-custom">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <CreditCard className="w-5 h-5" />
              <span className="text-sm font-semibold">Sistemas de Pago</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Internet para Punto de Venta<br />
              <span className="text-green-200">POS y Datáfonos Sin Cortes</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-green-50">
              Conexión ultra estable para que nunca pierdas una venta. 
              Latencia mínima, alta disponibilidad y backup automático. 
              <strong> Desde $69.900/mes</strong>
            </p>
            
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-green-300" />
                <span className="text-lg">Latencia {'<'} 30ms</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-green-300" />
                <span className="text-lg">Uptime 99.9%</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-green-300" />
                <span className="text-lg">Backup 4G automático</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/calculadora-empresas"
                className="bg-white text-green-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-50 transition-all inline-flex items-center gap-2 shadow-lg"
              >
                <Calculator className="w-5 h-5" />
                Calcular Mi Plan
              </Link>
              <a 
                href="#planes"
                className="bg-green-500/20 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-500/30 transition-all inline-flex items-center gap-2"
              >
                Ver Planes
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Problemas sin Internet Confiable */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Cuánto Te Cuesta una Mala Conexión?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Los cortes de internet en tu punto de venta tienen un costo real y medible
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {problemasSinInternet.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all border border-red-100">
                <item.icon className="w-12 h-12 text-red-600 mb-4" />
                <h3 className="text-xl font-bold mb-2 text-red-700">{item.problema}</h3>
                <p className="text-gray-600 mb-4">{item.descripcion}</p>
                <div className="bg-red-50 px-3 py-2 rounded-lg">
                  <span className="text-sm font-semibold text-red-700">{item.costo}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500 p-6 rounded-lg max-w-4xl mx-auto">
            <h3 className="text-xl font-bold mb-2">💰 Cálculo Real</h3>
            <p className="text-gray-700">
              Si pierdes <strong>2 ventas por día</strong> (promedio $50.000 cada una) por fallas de internet, 
              estás dejando de ganar <strong>$3.000.000/mes</strong>. Un plan empresarial confiable cuesta 
              solo $89.900/mes. <strong className="text-red-700">El retorno de inversión es inmediato.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Requisitos Técnicos POS */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Requisitos Técnicos para POS
            </h2>
            <p className="text-xl text-gray-600">
              No cualquier internet sirve para sistemas de pago
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {requisitosPos.map((requisito, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all">
                <requisito.icon className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">{requisito.titulo}</h3>
                <p className="text-gray-600 mb-4 text-sm">{requisito.descripcion}</p>
                <div className="bg-green-50 px-4 py-2 rounded-lg">
                  <span className="text-lg font-bold text-green-700">{requisito.valor}</span>
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
              Planes Internet para POS
            </h2>
            <p className="text-xl text-gray-600">
              Optimizados para sistemas de punto de venta y datáfonos
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {planesPos.map((plan, index) => (
              <div 
                key={index}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden ${
                  plan.destacado ? 'ring-4 ring-green-500 scale-105' : ''
                }`}
              >
                {plan.destacado && (
                  <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white text-center py-2 font-bold">
                    RECOMENDADO
                  </div>
                )}
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.nombre}</h3>
                  <p className="text-gray-600 mb-4">{plan.ideal}</p>
                  
                  <div className="mb-6">
                    <div className="text-4xl font-bold text-green-600 mb-2">{plan.precio}</div>
                    <div className="text-gray-600">{plan.velocidad} dedicados</div>
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
                        ? 'bg-green-600 text-white hover:bg-green-700'
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

      {/* Tipos de Negocios */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Cuántos Datáfonos Necesita tu Negocio?
            </h2>
            <p className="text-xl text-gray-600">
              Recomendaciones según tipo de comercio
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {tiposNegociosPos.map((tipo, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all">
                <CreditCard className="w-10 h-10 text-green-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">{tipo.nombre}</h3>
                <p className="text-gray-600 mb-3 text-sm">{tipo.descripcion}</p>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Datáfonos:</span>
                  <span className="font-bold text-green-600">{tipo.datáfonos}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Velocidad mínima:</span>
                  <span className="font-bold text-green-600">{tipo.velocidadMin}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consejos Pro */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Shield className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Consejos de Configuración
              </h2>
              <p className="text-xl text-gray-600">
                Maximiza la confiabilidad de tu punto de venta
              </p>
            </div>
            
            <div className="space-y-4">
              {consejosPro.map((consejo, index) => (
                <div key={index} className="bg-white p-5 rounded-lg shadow-md flex items-start gap-4 hover:shadow-lg transition-all">
                  <div className="bg-green-100 text-green-700 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 pt-1">{consejo}</p>
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
              Internet POS por Operador
            </h2>
            <p className="text-xl text-gray-600">
              Compara planes especializados de cada proveedor
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link href="/internet-etb-empresas" className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-8 rounded-xl hover:scale-105 transition-all shadow-lg">
              <h3 className="text-2xl font-bold mb-2">ETB Empresas</h3>
              <p className="mb-4">Fibra 100% + SLA garantizado</p>
              <div className="flex items-center gap-2 text-blue-100">
                <span>Ver planes ETB</span>
                <ArrowRight className="w-5 h-5" />
              </div>
            </Link>
            
            <Link href="/internet-claro-empresas" className="bg-gradient-to-br from-red-600 to-red-700 text-white p-8 rounded-xl hover:scale-105 transition-all shadow-lg">
              <h3 className="text-2xl font-bold mb-2">Claro Empresas</h3>
              <p className="mb-4">Alta velocidad + backup 4G</p>
              <div className="flex items-center gap-2 text-red-100">
                <span>Ver planes Claro</span>
                <ArrowRight className="w-5 h-5" />
              </div>
            </Link>
            
            <Link href="/internet-movistar-empresas" className="bg-gradient-to-br from-green-600 to-green-700 text-white p-8 rounded-xl hover:scale-105 transition-all shadow-lg">
              <h3 className="text-2xl font-bold mb-2">Movistar Empresas</h3>
              <p className="mb-4">Simétrica + soporte prioritario</p>
              <div className="flex items-center gap-2 text-green-100">
                <span>Ver planes Movistar</span>
                <ArrowRight className="w-5 h-5" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Final */}
      <section className="py-16 bg-gradient-to-br from-green-600 to-emerald-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            No Pierdas Más Ventas por Fallas de Internet
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Cotiza un plan empresarial confiable para tu punto de venta
          </p>
          <Link
            href="/calculadora-empresas"
            className="bg-white text-green-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-50 transition-all inline-flex items-center gap-2 shadow-lg"
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
