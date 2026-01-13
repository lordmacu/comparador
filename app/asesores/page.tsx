import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, MessageSquare, Clock, CheckCircle2, ShieldCheck, UserCheck } from 'lucide-react';
import QuickCallForm from '@/components/QuickCallForm';

export const metadata: Metadata = {
  title: 'Asesores de Internet | Claro, Movistar y ETB Colombia',
  description: '¿Buscas un asesor de Claro, Movistar o ETB? Contacta directamente aquí. Línea única de contratación para las tres compañías. Atención inmediata.',
  keywords: [
    'asesor etb bogota',
    'asesor claro internet',
    'asesor movistar fibra',
    'telefono ventas claro',
    'numero asesor etb',
    'contacto comercial movistar',
    'asesores internet colombia'
  ],
  alternates: {
    canonical: 'https://comparadorinternet.co/asesores',
  },
  openGraph: {
    title: 'Habla con un Asesor de Internet | Claro, Movistar, ETB',
    description: '¿Necesitas contratar internet? Te conectamos con el asesor indicado para tu zona y necesidad. Atención personalizada las 24h.',
    url: 'https://comparadorinternet.co/asesores',
    type: 'website',
  },
};

export default function AsesoresPage() {
  const providers = [
    {
      name: 'ETB',
      slug: 'etb',
      color: 'bg-[#002880]',
      logo: '/images/etb-logo.svg',
      logoWidth: 100,
      textColor: 'text-[#002880]',
      borderColor: 'border-[#002880]',
      description: 'Para hablar con un asesor de internet de ETB, puedes usar la línea principal de Bogotá 315 464 5370. Especialistas en Fibra Óptica.',
      number: '315 464 5370'
    },
    {
      name: 'Movistar',
      slug: 'movistar',
      color: 'bg-[#00377d]',
      logo: '/images/movistar-logo.png',
      logoWidth: 100,
      textColor: 'text-[#00377d]',
      borderColor: 'border-[#00377d]',
      description: 'Para hablar con un asesor de internet de Movistar, usa nuestra línea de atención comercial 315 464 5370. Líderes en Fibra Simétrica.',
      number: '315 464 5370'
    },
    {
      name: 'Claro',
      slug: 'claro',
      color: 'bg-[#DA291C]',
      logo: '/images/claro-logo.svg',
      logoWidth: 100,
      textColor: 'text-[#DA291C]',
      borderColor: 'border-[#DA291C]',
      description: 'Para hablar con un asesor de internet de Claro, comunícate con la línea de ventas 315 464 5370. Mayor cobertura del país.',
      number: '315 464 5370'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
       <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "¿Cómo hablar con un asesor comercial de ETB?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Para contratar internet ETB en Bogotá, puedes comunicarte directamente con la línea de asesores comerciales al 315 464 5370 o dejar tus datos para recibir una llamada inmediata."
                }
              },
              {
                "@type": "Question",
                "name": "¿Cuál es el número de un asesor de Claro Internet?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Puedes contactar a un asesor de ventas Claro marcando al 315 464 5370. Si prefieres WhatsApp, usa el mismo número para chatear con un especialista en planes hogar."
                }
              },
              {
                "@type": "Question",
                "name": "¿Cómo contacto a un asesor de Movistar Fibra?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Para hablar con un asesor de Movistar Colombia sobre planes de fibra óptica, llama al 315 464 5370. Atención personalizada para contratar nuevos servicios."
                }
              }
            ]
          })
        }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-16">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
            <UserCheck className="w-5 h-5 text-green-400" />
            <span className="font-semibold text-green-50">Línea Directa de Contrataciones</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            Habla con un <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Asesor Experto</span>
          </h1>
          
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            ¿Necesitas ayuda para elegir tu plan? Conéctate con nuestros asesores comerciales certificados de Claro, Movistar y ETB. Sin esperas, sin contestadores automáticos.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg">
              <Clock className="w-5 h-5 text-green-400" />
              <span>Respuesta en &lt; 5 minutos</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg">
              <ShieldCheck className="w-5 h-5 text-green-400" />
              <span>Asesores Certificados</span>
            </div>
          </div>
        </div>
      </section>

      {/* Provider Cards */}
      <section className="py-12 -mt-10 mb-12 relative z-10 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-6">
            {providers.map((provider) => (
              <div 
                key={provider.slug} 
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-t-4"
                style={{ borderColor: provider.color.replace('bg-[', '').replace(']', '') }}
              >
                <div className="p-8 text-center flex flex-col h-full">
                  <div className="h-16 flex items-center justify-center mb-6">
                    <div className="bg-gray-50 p-3 rounded-lg w-full max-w-[180px] h-[80px] flex items-center justify-center">
                        <Image
                        src={provider.logo}
                        alt={`Asesor ${provider.name}`}
                        width={provider.logoWidth}
                        height={40}
                        className="object-contain h-full w-auto"
                        />
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Asesor {provider.name}
                  </h2>
                  
                  <p className="text-gray-600 mb-6 flex-grow text-sm">
                    {provider.description}
                  </p>

                  <div className="space-y-4 mt-auto">
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Línea Directa</p>
                      <a href={`tel:+57${provider.number.replace(/\s/g, '')}`} className={`text-2xl font-black ${provider.textColor}`}>
                        {provider.number}
                      </a>
                    </div>

                    <a 
                      href={`https://wa.me/57${provider.number.replace(/\s/g, '')}?text=Hola,%20quiero%20hablar%20con%20un%20asesor%20de%20${provider.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block w-full py-4 rounded-xl font-bold text-white transition-colors flex items-center justify-center gap-2 ${provider.color}`}
                    >
                      <MessageSquare className="w-5 h-5" />
                      Chat por WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Call Form Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Prefieres que te llamemos?</h2>
          <p className="text-gray-600 mb-8">Déjanos tu número y un asesor disponible te contactará inmediatamente.</p>
          
          <div className="flex flex-col items-center justify-center">
            <div className="bg-gray-50 p-8 rounded-2xl w-full max-w-md shadow-inner border border-gray-200">
                <QuickCallForm provider="Asesor General" />
            </div>
            <p className="mt-4 text-sm text-gray-500 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Solo te llamaremos para darte la información que solicitas.
            </p>
          </div>
        </div>
      </section>

      {/* Info Adicional */}
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-blue-600" />
                Seguridad Garantizada
              </h3>
              <p className="text-gray-600">
                Todos nuestros asesores están verificados y son canales oficiales de contratación. Tu información esta protegida y no compartimos tus datos con terceros no autorizados.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="w-6 h-6 text-blue-600" />
                Horarios de Atención
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex justify-between border-b border-gray-200 pb-1">
                  <span>Lunes a Viernes:</span>
                  <span className="font-semibold">8:00 AM - 8:00 PM</span>
                </li>
                <li className="flex justify-between border-b border-gray-200 pb-1">
                  <span>Sábados:</span>
                  <span className="font-semibold">9:00 AM - 6:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Domingos y Festivos:</span>
                  <span className="font-semibold">10:00 AM - 4:00 PM</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
