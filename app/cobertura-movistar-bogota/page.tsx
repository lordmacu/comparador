import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, MapPin, Phone, ShieldCheck } from 'lucide-react';
import QuickCallForm from '@/components/QuickCallForm';
import WhatsAppButton from '@/components/WhatsAppButton';
import { getProvider } from '@/lib/data';
import { renderJsonLd } from '@/lib/schemas';

export const revalidate = 3600;

const provider = getProvider('movistar');
const phoneDisplay = '315 464 5370';
const phoneE164 = '+573154645370';

export const metadata: Metadata = {
  title: 'Cobertura Movistar Fibra Bogotá 2026 | Verifica por Dirección',
  description:
    '¿Hay Movistar Fibra en tu dirección en Bogotá? Validamos cobertura de fibra (FTTH) por dirección/edificio, recomendamos velocidad y agendamos instalación. Contacta por WhatsApp o solicita llamada.',
  keywords: [
    'cobertura movistar bogota',
    'movistar fibra bogota cobertura',
    'verificar cobertura movistar fibra bogota',
    'movistar ultra fibra bogota',
    'movistar internet cobertura bogota',
  ],
  alternates: {
    canonical: 'https://comparadorinternet.co/cobertura-movistar-bogota',
  },
  openGraph: {
    title: 'Cobertura Movistar Fibra en Bogotá | Verificar por Dirección',
    description: 'Confirma si hay Movistar Fibra (FTTH) en tu dirección y contrata internet con asesoría.',
    url: 'https://comparadorinternet.co/cobertura-movistar-bogota',
    siteName: 'Comparador Internet Colombia',
    locale: 'es_CO',
    type: 'website',
  },
};

export default function CoberturaMovistarBogotaPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Cómo verifico si Movistar Fibra llega a mi dirección en Bogotá?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Envíanos tu dirección completa (torre/apto si aplica). Validamos disponibilidad de fibra (FTTH) por edificio y te confirmamos antes de contratar.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Movistar tiene fibra en todo Bogotá?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. La cobertura varía por barrio y edificio. Por eso hacemos validación por dirección para confirmar si hay disponibilidad de Ultra Fibra.',
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
        name: '¿Puedo contratar solo internet Movistar?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí. Te ayudamos a cotizar y contratar planes solo internet, sujetos a cobertura y promociones vigentes.',
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={renderJsonLd(faqSchema)} />

      <div className="min-h-screen bg-slate-50">
        <section className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-white/10 backdrop-blur-sm px-5 py-3 rounded-2xl border border-white/20">
                  <Image
                    src={provider.brand.logo}
                    alt="Movistar"
                    width={120}
                    height={48}
                    className="h-8 w-auto"
                    priority
                  />
                </div>
              </div>

              <h1 className="text-4xl md:text-6xl font-black mb-4">Cobertura Movistar Fibra Bogotá</h1>
              <p className="text-lg md:text-2xl text-blue-100 mb-8">
                Verificamos si hay Movistar Fibra (FTTH) en tu dirección/edificio en Bogotá y te ayudamos a contratar solo internet.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch mb-10">
                <a
                  href={`tel:${phoneE164}`}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-bold bg-white text-blue-700 hover:bg-blue-50 transition-colors shadow-lg"
                >
                  <Phone className="w-5 h-5" />
                  Llamar {phoneDisplay}
                </a>

                <WhatsAppButton
                  provider={provider}
                  customMessage="Hola, quiero verificar cobertura de Movistar Fibra en Bogotá. Esta es mi dirección: _____. ¿Me ayudas a validar disponibilidad por edificio?"
                  size="lg"
                  source="cobertura_movistar_bogota"
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
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Qué revisamos con tu dirección</h2>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                  <div className="flex items-center gap-2 font-bold text-gray-900 mb-2">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    Disponibilidad FTTH
                  </div>
                  <p className="text-sm text-gray-600">Confirmamos si hay fibra (Ultra Fibra) en tu edificio o casa.</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                  <div className="flex items-center gap-2 font-bold text-gray-900 mb-2">
                    <ShieldCheck className="w-5 h-5 text-blue-600" />
                    Requisitos del edificio
                  </div>
                  <p className="text-sm text-gray-600">Permisos de administración, cajas de paso y puntos de instalación (si aplica).</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                  <div className="flex items-center gap-2 font-bold text-gray-900 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-600" />
                    Plan recomendado
                  </div>
                  <p className="text-sm text-gray-600">Velocidad sugerida según tu hogar: trabajo, gaming o streaming.</p>
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
                    Barrio o localidad (ej: Suba, Kennedy, Usaquén)
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
                  href="/asesor-movistar-bogota"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
                >
                  Hablar con asesor Movistar
                  <CheckCircle2 className="w-4 h-4" />
                </Link>
                <Link
                  href="/planes-movistar-bogota"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 text-slate-900 font-semibold hover:bg-slate-200 transition-colors"
                >
                  Ver planes Movistar Bogotá
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

