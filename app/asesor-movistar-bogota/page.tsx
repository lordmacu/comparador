import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, Clock, MapPin, Phone, ShieldCheck, Zap } from 'lucide-react';
import QuickCallForm from '@/components/QuickCallForm';
import WhatsAppButton from '@/components/WhatsAppButton';
import { getProvider } from '@/lib/data';
import { renderJsonLd } from '@/lib/schemas';

export const revalidate = 3600;

const provider = getProvider('movistar');
const phoneDisplay = '315 464 5370';
const phoneE164 = '+573154645370';

export const metadata: Metadata = {
  title: 'Asesor Movistar Fibra en Bogotá | WhatsApp y Teléfono para Contratar',
  description:
    '¿Quieres contratar Movistar Fibra en Bogotá? Te ayudamos a validar cobertura, elegir plan simétrico y agendar instalación. Contacta por WhatsApp o solicita llamada.',
  keywords: [
    'asesor movistar bogota',
    'movistar fibra bogota whatsapp',
    'telefono movistar fibra bogota',
    'contratar movistar fibra bogota',
    'planes movistar bogota',
    'cobertura movistar bogota',
    'internet simetrico bogota',
  ],
  alternates: {
    canonical: 'https://comparadorinternet.co/asesor-movistar-bogota',
  },
  openGraph: {
    title: 'Asesor Movistar Fibra en Bogotá',
    description: 'Verifica cobertura y contrata Movistar Fibra simétrica en Bogotá con asesoría inmediata.',
    url: 'https://comparadorinternet.co/asesor-movistar-bogota',
    siteName: 'Comparador Internet Colombia',
    locale: 'es_CO',
    type: 'website',
  },
};

export default function AsesorMovistarBogotaPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Cómo contratar Movistar Fibra en Bogotá por WhatsApp o teléfono?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Escríbenos o llama al ${phoneDisplay}. Validamos cobertura de fibra por dirección en Bogotá y te ayudamos a elegir el plan ideal.`,
        },
      },
      {
        '@type': 'Question',
        name: '¿Movistar Fibra es internet simétrico?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'En fibra, Movistar ofrece velocidades simétricas (misma subida y bajada). La disponibilidad depende de la zona y se valida por dirección.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Qué datos debo enviar para validar cobertura Movistar Fibra?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Dirección completa (con torre/apto si aplica), barrio/localidad y tu número de contacto. Con eso verificamos factibilidad técnica.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Cuánto tarda la instalación de Movistar Fibra en Bogotá?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Depende de agenda y disponibilidad técnica. Usualmente se agenda entre 24 y 72 horas hábiles si hay cobertura en tu dirección.',
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={renderJsonLd(faqSchema)} />

      <div className="min-h-screen bg-slate-50">
        <section className="bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-700 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-white/10 backdrop-blur-sm px-5 py-3 rounded-2xl border border-white/20">
                  <Image
                    src={provider.brand.logo}
                    alt="Movistar"
                    width={120}
                    height={40}
                    className="h-8 w-auto"
                    priority
                  />
                </div>
              </div>

              <h1 className="text-4xl md:text-6xl font-black mb-4">Asesor Movistar Fibra en Bogotá</h1>
              <p className="text-lg md:text-2xl text-emerald-50 mb-8">
                Internet 100% simétrico (subida y bajada). Validamos cobertura por dirección y te ayudamos a contratar.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 text-sm mb-10">
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg border border-white/10">
                  <Zap className="w-4 h-4 text-yellow-300" />
                  <span>Fibra simétrica</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg border border-white/10">
                  <Clock className="w-4 h-4 text-green-200" />
                  <span>Respuesta rápida</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg border border-white/10">
                  <MapPin className="w-4 h-4 text-white" />
                  <span>Validación por barrio</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg border border-white/10">
                  <ShieldCheck className="w-4 h-4 text-blue-100" />
                  <span>Asesoría de contratación</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch mb-10">
                <a
                  href={`tel:${phoneE164}`}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-bold bg-white text-sky-700 hover:bg-slate-50 transition-colors shadow-lg"
                >
                  <Phone className="w-5 h-5" />
                  Llamar {phoneDisplay}
                </a>

                <WhatsAppButton
                  provider={provider}
                  customMessage="Hola, quiero contratar Movistar Fibra en Bogotá. ¿Me ayudas a validar cobertura en mi dirección?"
                  size="lg"
                  source="asesor_movistar_bogota"
                />
              </div>

              <div className="max-w-md mx-auto">
                <p className="text-white font-bold text-lg mb-3">¿Prefieres que te llamemos?</p>
                <QuickCallForm provider="movistar" buttonColor={provider.brand.primaryColor} />
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
                  <p className="text-sm text-gray-600">Validamos si llega fibra a tu cuadra o edificio.</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                  <div className="font-bold text-gray-900 mb-2">Uso principal</div>
                  <p className="text-sm text-gray-600">Teletrabajo, streaming o gaming para recomendar velocidad.</p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/planes-movistar-bogota"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors"
                >
                  Ver planes Movistar Bogotá
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
                  href="/movistar"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 text-slate-900 font-semibold hover:bg-slate-200 transition-colors"
                >
                  Info Movistar (comparador)
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

