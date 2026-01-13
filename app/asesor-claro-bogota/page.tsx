import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, Clock, MapPin, Phone, ShieldCheck } from 'lucide-react';
import QuickCallForm from '@/components/QuickCallForm';
import WhatsAppButton from '@/components/WhatsAppButton';
import { getProvider } from '@/lib/data';
import { renderJsonLd } from '@/lib/schemas';

export const revalidate = 3600;

const provider = getProvider('claro');
const phoneDisplay = '315 464 5370';
const phoneE164 = '+573154645370';

export const metadata: Metadata = {
  title: 'Asesor Claro en Bogotá | Teléfono y WhatsApp para Contratar Internet',
  description:
    '¿Necesitas contratar internet Claro en Bogotá? Te ayudamos a validar cobertura (fibra/HFC), elegir plan y agendar instalación. Contacta por WhatsApp o solicita llamada.',
  keywords: [
    'asesor claro bogota',
    'telefono claro internet bogota',
    'whatsapp claro hogar bogota',
    'contratar internet claro bogota',
    'planes claro bogota',
    'cobertura claro bogota',
    'claro fibra bogota',
  ],
  alternates: {
    canonical: 'https://comparadorinternet.co/asesor-claro-bogota',
  },
  openGraph: {
    title: 'Asesor Claro en Bogotá | Contrata Internet',
    description: 'Verifica cobertura y contrata internet Claro en Bogotá con asesoría inmediata.',
    url: 'https://comparadorinternet.co/asesor-claro-bogota',
    siteName: 'Comparador Internet Colombia',
    locale: 'es_CO',
    type: 'website',
  },
};

export default function AsesorClaroBogotaPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Cómo contactar a un asesor para contratar internet Claro en Bogotá?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Puedes llamar o escribir por WhatsApp al ${phoneDisplay}. Validamos cobertura en tu dirección en Bogotá y te recomendamos el mejor plan disponible.`,
        },
      },
      {
        '@type': 'Question',
        name: '¿Qué datos debo enviar para validar cobertura Claro?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Envíanos tu dirección completa (con apartamento/torre si aplica), barrio o localidad, y un número de contacto. Con eso verificamos factibilidad técnica.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Claro ofrece fibra óptica en Bogotá?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Depende de la zona: en algunos sectores hay fibra (FTTH) y en otros HFC. Por eso es clave validar cobertura por dirección antes de contratar.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Cuánto tarda la instalación del internet Claro?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'El tiempo depende de la agenda y la cobertura en tu zona. Normalmente se coordina la visita técnica y se agenda instalación en 24-72 horas hábiles si hay disponibilidad.',
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={renderJsonLd(faqSchema)} />

      <div className="min-h-screen bg-slate-50">
        <section className="bg-gradient-to-r from-red-600 via-red-700 to-rose-700 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-white/10 backdrop-blur-sm px-5 py-3 rounded-2xl border border-white/20">
                  <Image
                    src={provider.brand.logo}
                    alt="Claro"
                    width={96}
                    height={40}
                    className="h-8 w-auto brightness-0 invert"
                    priority
                  />
                </div>
              </div>

              <h1 className="text-4xl md:text-6xl font-black mb-4">Asesor Claro en Bogotá</h1>
              <p className="text-lg md:text-2xl text-red-100 mb-8">
                Contrata internet para tu hogar en Bogotá. Verificamos cobertura por dirección y te ayudamos a elegir el plan ideal.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 text-sm mb-10">
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg border border-white/10">
                  <Clock className="w-4 h-4 text-green-300" />
                  <span>Respuesta rápida</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg border border-white/10">
                  <MapPin className="w-4 h-4 text-yellow-300" />
                  <span>Validación por barrio</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg border border-white/10">
                  <ShieldCheck className="w-4 h-4 text-blue-200" />
                  <span>Asesoría de contratación</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch mb-10">
                <a
                  href={`tel:${phoneE164}`}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-bold bg-white text-red-700 hover:bg-red-50 transition-colors shadow-lg"
                >
                  <Phone className="w-5 h-5" />
                  Llamar {phoneDisplay}
                </a>

                <WhatsAppButton
                  provider={provider}
                  customMessage="Hola, quiero contratar internet Claro en Bogotá. ¿Me ayudas a validar cobertura en mi dirección?"
                  size="lg"
                  source="asesor_claro_bogota"
                />
              </div>

              <div className="max-w-md mx-auto">
                <p className="text-white font-bold text-lg mb-3">¿Prefieres que te llamemos?</p>
                <QuickCallForm provider="claro" buttonColor={provider.brand.primaryColor} />
                <p className="text-xs text-white/80 mt-3">
                  Asesoría multimarca (Claro/Movistar/ETB). Este sitio no es la web oficial del operador.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Qué enviarnos para cotizar rápido</h2>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                  <div className="font-bold text-gray-900 mb-2">Dirección exacta</div>
                  <p className="text-sm text-gray-600">Incluye torre/apto y referencias si es conjunto o edificio.</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                  <div className="font-bold text-gray-900 mb-2">Barrio o localidad</div>
                  <p className="text-sm text-gray-600">Nos ayuda a priorizar la tecnología disponible (FTTH o HFC).</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                  <div className="font-bold text-gray-900 mb-2">Tu uso</div>
                  <p className="text-sm text-gray-600">Streaming, teletrabajo o gaming para recomendar velocidad.</p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/planes-claro-bogota"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors"
                >
                  Ver planes Claro Bogotá
                  <CheckCircle2 className="w-4 h-4" />
                </Link>
                <Link
                  href="/internet-bogota-cobertura"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 text-slate-900 font-semibold hover:bg-slate-200 transition-colors"
                >
                  Mapa cobertura Bogotá
                </Link>
                <Link
                  href="/contratar-internet-bogota"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 text-slate-900 font-semibold hover:bg-slate-200 transition-colors"
                >
                  Contratar en Bogotá
                </Link>
                <Link
                  href="/claro"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 text-slate-900 font-semibold hover:bg-slate-200 transition-colors"
                >
                  Info Claro (comparador)
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Preguntas frecuentes</h2>
            <div className="space-y-4">
              {faqSchema.mainEntity.map((item: any) => (
                <details key={item.name} className="bg-slate-50 rounded-xl border border-slate-100 p-5">
                  <summary className="font-semibold text-gray-900 cursor-pointer">{item.name}</summary>
                  <p className="text-gray-700 text-sm mt-3">{item.acceptedAnswer.text}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

