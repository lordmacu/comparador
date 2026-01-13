import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, MapPin, Phone, ShieldCheck } from 'lucide-react';
import QuickCallForm from '@/components/QuickCallForm';
import WhatsAppButton from '@/components/WhatsAppButton';
import { getProvider } from '@/lib/data';
import { renderJsonLd } from '@/lib/schemas';

export const revalidate = 3600;

const provider = getProvider('claro');
const phoneDisplay = '315 464 5370';
const phoneE164 = '+573154645370';

export const metadata: Metadata = {
  title: 'Cobertura Claro Bogotá 2026 | Verifica Fibra o HFC por Dirección',
  description:
    '¿Hay internet Claro en tu dirección en Bogotá? Validamos cobertura (fibra/HFC) por dirección, te recomendamos velocidad y agendamos instalación. Contacta por WhatsApp o solicita llamada.',
  keywords: [
    'cobertura claro bogota',
    'verificar cobertura claro bogota',
    'claro fibra bogota cobertura',
    'claro hfc bogota',
    'claro internet hogar cobertura bogota',
    'claro cobertura por direccion bogota',
  ],
  alternates: {
    canonical: 'https://comparadorinternet.co/cobertura-claro-bogota',
  },
  openGraph: {
    title: 'Cobertura Claro en Bogotá | Verificar por Dirección',
    description: 'Confirma si hay cobertura Claro (fibra/HFC) en tu dirección y contrata internet con asesoría.',
    url: 'https://comparadorinternet.co/cobertura-claro-bogota',
    siteName: 'Comparador Internet Colombia',
    locale: 'es_CO',
    type: 'website',
  },
};

export default function CoberturaClaroBogotaPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Cómo verifico la cobertura de Claro en Bogotá por dirección?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Envíanos tu dirección completa (barrio/localidad y torre/apto si aplica). Validamos si llega fibra (FTTH) o HFC y te confirmamos disponibilidad antes de contratar.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Claro tiene fibra óptica en toda Bogotá?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No en toda la ciudad. En algunos sectores hay fibra (FTTH) y en otros HFC. Por eso es clave validar por dirección y edificio antes de agendar instalación.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Qué datos debo enviar para una validación rápida?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Dirección completa, barrio/localidad, tipo de vivienda (casa/edificio) y tu uso (teletrabajo, gaming, streaming). Con eso recomendamos velocidad y revisamos factibilidad.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Puedo contratar solo internet (sin TV/telefonía)?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí. Te ayudamos a cotizar y contratar planes solo internet en Bogotá, sujetos a cobertura y promociones vigentes.',
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

              <h1 className="text-4xl md:text-6xl font-black mb-4">Cobertura Claro Bogotá</h1>
              <p className="text-lg md:text-2xl text-red-100 mb-8">
                Verificamos si llega internet Claro a tu dirección en Bogotá (fibra u HFC) y te ayudamos a contratar solo internet.
              </p>

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
                  customMessage="Hola, quiero verificar cobertura de internet Claro en Bogotá. Esta es mi dirección: _____. ¿Me ayudas a validar si llega fibra u HFC?"
                  size="lg"
                  source="cobertura_claro_bogota"
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
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Qué revisamos con tu dirección</h2>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                  <div className="flex items-center gap-2 font-bold text-gray-900 mb-2">
                    <MapPin className="w-5 h-5 text-red-600" />
                    Cobertura real
                  </div>
                  <p className="text-sm text-gray-600">Validación por dirección y edificio: fibra (FTTH) o HFC (según zona).</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                  <div className="flex items-center gap-2 font-bold text-gray-900 mb-2">
                    <ShieldCheck className="w-5 h-5 text-red-600" />
                    Factibilidad
                  </div>
                  <p className="text-sm text-gray-600">Disponibilidad técnica y condiciones del conjunto/administración si aplica.</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                  <div className="flex items-center gap-2 font-bold text-gray-900 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-red-600" />
                    Recomendación
                  </div>
                  <p className="text-sm text-gray-600">Velocidad sugerida según personas y uso (teletrabajo, gaming, streaming).</p>
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
                    Barrio o localidad (ej: Suba, Kennedy, Chapinero)
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
                  href="/asesor-claro-bogota"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors"
                >
                  Hablar con asesor Claro
                  <CheckCircle2 className="w-4 h-4" />
                </Link>
                <Link
                  href="/planes-claro-bogota"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 text-slate-900 font-semibold hover:bg-slate-200 transition-colors"
                >
                  Ver planes Claro Bogotá
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

