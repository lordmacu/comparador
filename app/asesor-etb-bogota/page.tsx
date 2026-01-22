import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, Clock, MapPin, Phone, ShieldCheck } from 'lucide-react';
import QuickCallForm from '@/components/QuickCallForm';
import WhatsAppButton from '@/components/WhatsAppButton';
import { getProvider } from '@/lib/data';
import { renderJsonLd } from '@/lib/schemas';

export const revalidate = 3600;

const provider = getProvider('etb');
const phoneDisplay = '315 464 5370';
const phoneE164 = '+573154645370';

export const metadata: Metadata = {
  title: 'Asesor ETB en Bogotá | WhatsApp y Teléfono para Contratar Fibra',
  description:
    '¿Quieres contratar internet ETB en Bogotá? Te ayudamos a validar cobertura, elegir velocidad y agendar instalación. Contacta por WhatsApp o solicita llamada.',
  keywords: [
    'asesor etb bogota',
    'telefono etb fibra bogota',
    'whatsapp etb bogota',
    'contratar internet etb bogota',
    'planes etb bogota',
    'cobertura etb bogota',
    'fibra etb bogota',
  ],
  alternates: {
    canonical: 'https://comparadorinternet.co/asesor-etb-bogota',
  },
  openGraph: {
    title: 'Asesor ETB en Bogotá | Contrata Fibra',
    description: 'Verifica cobertura y contrata ETB Fibra en Bogotá con asesoría inmediata.',
    url: 'https://comparadorinternet.co/asesor-etb-bogota',
    siteName: 'Comparador Internet Colombia',
    locale: 'es_CO',
    type: 'website',
  },
};

export default function AsesorEtbBogotaPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Cómo contactar a un asesor para contratar ETB en Bogotá?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Puedes llamar o escribir por WhatsApp al ${phoneDisplay}. Validamos cobertura ETB por dirección y te recomendamos el plan más conveniente.`,
        },
      },
      {
        '@type': 'Question',
        name: '¿ETB tiene cobertura en mi barrio?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'ETB se enfoca principalmente en Bogotá y municipios cercanos. La disponibilidad se confirma por dirección (edificio, casa o conjunto).',
        },
      },
      {
        '@type': 'Question',
        name: '¿Qué datos debo enviar para validar cobertura ETB?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Dirección completa, barrio/localidad y un número de contacto. Con eso confirmamos factibilidad técnica y promociones vigentes.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Qué velocidad ETB recomiendan para teletrabajo o gaming?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Para teletrabajo + streaming suele funcionar muy bien 200 Mb; para gaming competitivo o muchos dispositivos, 910 Mb. Te recomendamos según tu uso.',
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={renderJsonLd(faqSchema)} />

      <div className="min-h-screen bg-slate-50">
        <section className="bg-gradient-to-r from-blue-800 via-indigo-800 to-slate-900 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-white/10 backdrop-blur-sm px-5 py-3 rounded-2xl border border-white/20">
                  <Image
                    src={provider.brand.logo}
                    alt="ETB"
                    width={88}
                    height={40}
                    className="h-8 w-auto"
                    priority
                  />
                </div>
              </div>

              <h1 className="text-4xl md:text-6xl font-black mb-4">Asesor ETB en Bogotá</h1>
              <p className="text-lg md:text-2xl text-blue-100 mb-8">
                Fibra óptica en Bogotá. Validamos cobertura por dirección y te ayudamos a contratar el plan adecuado.
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
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-bold bg-white text-blue-800 hover:bg-blue-50 transition-colors shadow-lg"
                >
                  <Phone className="w-5 h-5" />
                  Llamar {phoneDisplay}
                </a>

                <WhatsAppButton
                  provider={provider}
                  customMessage="Hola, quiero contratar internet ETB en Bogotá. ¿Me ayudas a validar cobertura en mi dirección?"
                  size="lg"
                  source="asesor_etb_bogota"
                />
              </div>

              <div className="max-w-md mx-auto">
                <p className="text-white font-bold text-lg mb-3">¿Prefieres que te llamemos?</p>
                <QuickCallForm provider="etb" buttonColor={provider.brand.primaryColor} />
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
                  <p className="text-sm text-gray-600">Bogotá: Suba, Kennedy, Chapinero, Usaquén, Engativá, etc.</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                  <div className="font-bold text-gray-900 mb-2">Uso y personas</div>
                  <p className="text-sm text-gray-600">Recomendamos velocidad según consumo y dispositivos.</p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/planes-etb-bogota"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-700 text-white font-semibold hover:bg-blue-800 transition-colors"
                >
                  Ver planes ETB Bogotá
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
                  href="/etb"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 text-slate-900 font-semibold hover:bg-slate-200 transition-colors"
                >
                  Info ETB (comparador)
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
