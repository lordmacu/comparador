import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, MapPin, Phone, ShieldCheck } from 'lucide-react';
import QuickCallForm from '@/components/QuickCallForm';
import WhatsAppButton from '@/components/WhatsAppButton';
import { getProvider } from '@/lib/data';
import { renderJsonLd } from '@/lib/schemas';

export const revalidate = 3600;

const provider = getProvider('etb');
const phoneDisplay = '315 464 5370';
const phoneE164 = '+573154645370';

export const metadata: Metadata = {
  title: 'Cobertura ETB Fibra Bogotá 2026 | Verifica por Dirección',
  description:
    '¿Hay fibra ETB en tu dirección en Bogotá? Validamos cobertura por dirección/edificio, recomendamos velocidad y agendamos instalación. Contacta por WhatsApp o solicita llamada.',
  keywords: [
    'cobertura etb bogota',
    'etb fibra bogota cobertura',
    'verificar cobertura etb bogota',
    'etb ftth bogota',
    'etb internet hogar bogota',
  ],
  alternates: {
    canonical: 'https://comparadorinternet.co/cobertura-etb-bogota',
  },
  openGraph: {
    title: 'Cobertura ETB Fibra en Bogotá | Verificar por Dirección',
    description: 'Confirma si hay fibra ETB (FTTH) en tu dirección y contrata internet con asesoría.',
    url: 'https://comparadorinternet.co/cobertura-etb-bogota',
    siteName: 'Comparador Internet Colombia',
    locale: 'es_CO',
    type: 'website',
  },
};

export default function CoberturaEtbBogotaPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Cómo verifico cobertura ETB en Bogotá por dirección?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Envíanos tu dirección completa (torre/apto si aplica) y validamos si hay fibra (FTTH) ETB disponible en tu edificio o casa antes de contratar.',
        },
      },
      {
        '@type': 'Question',
        name: '¿ETB solo tiene cobertura en Bogotá?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'ETB es principalmente un operador de Bogotá y municipios cercanos. La disponibilidad exacta se confirma por dirección.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Qué debo enviar para validar cobertura rápido?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Dirección completa, barrio/localidad, tipo de vivienda (casa/edificio) y tu uso (teletrabajo, gaming, streaming).',
        },
      },
      {
        '@type': 'Question',
        name: '¿Puedo contratar solo internet ETB?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí. Te ayudamos a cotizar y contratar solo internet, sujeto a cobertura y promociones vigentes.',
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={renderJsonLd(faqSchema)} />

      <div className="min-h-screen bg-slate-50">
        <section className="bg-gradient-to-r from-blue-700 via-sky-700 to-indigo-800 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-white/10 backdrop-blur-sm px-5 py-3 rounded-2xl border border-white/20">
                  <Image
                    src={provider.brand.logo}
                    alt="ETB"
                    width={96}
                    height={40}
                    className="h-8 w-auto"
                    priority
                  />
                </div>
              </div>

              <h1 className="text-4xl md:text-6xl font-black mb-4">Cobertura ETB Fibra Bogotá</h1>
              <p className="text-lg md:text-2xl text-blue-100 mb-8">
                Verificamos si hay fibra ETB (FTTH) en tu dirección/edificio en Bogotá y te ayudamos a contratar solo internet.
              </p>

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
                  customMessage="Hola, quiero verificar cobertura de fibra ETB en Bogotá. Esta es mi dirección: _____. ¿Me ayudas a validar disponibilidad por edificio?"
                  size="lg"
                  source="cobertura_etb_bogota"
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
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Qué revisamos con tu dirección</h2>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                  <div className="flex items-center gap-2 font-bold text-gray-900 mb-2">
                    <MapPin className="w-5 h-5 text-blue-700" />
                    Disponibilidad FTTH
                  </div>
                  <p className="text-sm text-gray-600">Confirmamos si hay fibra ETB en tu edificio o casa (Bogotá y alrededores).</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                  <div className="flex items-center gap-2 font-bold text-gray-900 mb-2">
                    <ShieldCheck className="w-5 h-5 text-blue-700" />
                    Condiciones del conjunto
                  </div>
                  <p className="text-sm text-gray-600">Permisos, canalizaciones y acceso técnico (especialmente en edificios antiguos).</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                  <div className="flex items-center gap-2 font-bold text-gray-900 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-700" />
                    Plan recomendado
                  </div>
                  <p className="text-sm text-gray-600">Velocidad ideal según tu uso y cantidad de personas en casa.</p>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Para validar rápido, envíanos:</h3>
                <ul className="grid md:grid-cols-2 gap-3 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                    Dirección completa (incluye torre/apto si aplica)
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                    Barrio o localidad (ej: Chapinero, Teusaquillo, Suba)
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                    Tipo de vivienda (casa/edificio) y si es conjunto
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                    Tu uso principal y número de personas
                  </li>
                </ul>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/asesor-etb-bogota"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-700 text-white font-semibold hover:bg-blue-800 transition-colors"
                >
                  Hablar con asesor ETB
                  <CheckCircle2 className="w-4 h-4" />
                </Link>
                <Link
                  href="/planes-etb-bogota"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 text-slate-900 font-semibold hover:bg-slate-200 transition-colors"
                >
                  Ver planes ETB Bogotá
                </Link>
                <Link
                  href="/internet-bogota-cobertura"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 text-slate-900 font-semibold hover:bg-slate-200 transition-colors"
                >
                  Cobertura Bogotá (general)
                </Link>
                <Link
                  href="/contratar-internet-bogota"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 text-slate-900 font-semibold hover:bg-slate-200 transition-colors"
                >
                  Contratar internet en Bogotá
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

