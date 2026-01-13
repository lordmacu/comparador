import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, MapPin, Phone, Zap } from 'lucide-react';
import QuickCallForm from '@/components/QuickCallForm';
import WhatsAppButton from '@/components/WhatsAppButton';
import { getProvider } from '@/lib/data';
import { renderJsonLd } from '@/lib/schemas';

export const revalidate = 3600;

const provider = getProvider('movistar');
const phoneDisplay = '315 464 5370';
const phoneE164 = '+573154645370';

export const metadata: Metadata = {
  title: 'Planes Movistar Fibra Bogotá 2026 | Precios Internet Simétrico',
  description:
    'Planes Movistar Fibra en Bogotá: precios de referencia, velocidades simétricas y recomendaciones por uso. Verifica cobertura por dirección y contrata con asesoría.',
  keywords: [
    'planes movistar bogota',
    'movistar fibra bogota precios',
    'internet simetrico movistar bogota',
    'cobertura movistar fibra bogota',
    'contratar movistar fibra bogota',
    'movistar 500 megas bogota',
  ],
  alternates: {
    canonical: 'https://comparadorinternet.co/planes-movistar-bogota',
  },
  openGraph: {
    title: 'Planes Movistar Fibra en Bogotá 2026',
    description: 'Precios y planes Movistar Fibra simétrica en Bogotá. Verifica cobertura y contrata.',
    url: 'https://comparadorinternet.co/planes-movistar-bogota',
    siteName: 'Comparador Internet Colombia',
    locale: 'es_CO',
    type: 'article',
  },
};

export default function PlanesMovistarBogotaPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Movistar Fibra en Bogotá es simétrica?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'En fibra, Movistar ofrece simetría (misma velocidad de subida y bajada). La disponibilidad se valida por dirección en Bogotá.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Cuál plan Movistar Fibra recomiendan para teletrabajo en Bogotá?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Para teletrabajo con videollamadas y varios dispositivos, 250-500 Mbps suele ser suficiente. Si haces uploads grandes o gaming, 500-900 Mbps es mejor.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Cómo validar cobertura de Movistar Fibra en mi dirección?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Envíanos tu dirección completa (con apartamento/torre si aplica) y barrio/localidad. Confirmamos factibilidad técnica antes de contratar.',
        },
      },
    ],
  };

  const priceSchema = {
    '@context': 'https://schema.org',
    '@type': 'PriceSpecification',
    price: '46990',
    priceCurrency: 'COP',
    validFrom: '2026-01-01',
    validThrough: '2026-12-31',
    description: 'Plan Movistar Fibra 250 Mbps (referencia Bogotá)',
  };

  const plans = [
    {
      name: 'Fibra 250',
      speed: '250 Mbps simétricos',
      price: '$46.990',
      highlight: 'Plan de entrada',
      featured: false,
    },
    {
      name: 'Fibra 500',
      speed: '500 Mbps simétricos',
      price: '$55.990',
      highlight: 'Recomendado',
      featured: true,
    },
    {
      name: 'Fibra 900',
      speed: '900 Mbps simétricos',
      price: '$79.990',
      highlight: 'Gaming / pro',
      featured: false,
    },
  ] as const;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={renderJsonLd(faqSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={renderJsonLd(priceSchema)} />

      <div className="min-h-screen bg-slate-50">
        <section className="bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-700 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
                  <Zap className="w-4 h-4 text-yellow-300" />
                  <span className="text-sm font-semibold">Bogotá 2026 • Fibra simétrica</span>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <Image src={provider.brand.logo} alt="Movistar" width={120} height={40} className="h-8 w-auto" priority />
                  <h1 className="text-4xl md:text-5xl font-black leading-tight">Planes Movistar Fibra Bogotá</h1>
                </div>

                <p className="text-lg md:text-xl text-emerald-50 mb-8">
                  Precios de referencia y recomendaciones por uso. Validamos cobertura por dirección en Bogotá antes de contratar.
                </p>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/asesor-movistar-bogota"
                    className="inline-flex items-center gap-2 bg-white text-sky-700 font-bold px-5 py-3 rounded-lg hover:bg-slate-50 transition-colors shadow-lg"
                  >
                    Hablar con asesor Movistar
                    <CheckCircle2 className="w-5 h-5" />
                  </Link>
                  <Link
                    href="/internet-bogota-cobertura"
                    className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white font-semibold px-5 py-3 rounded-lg hover:bg-white/20 transition-colors"
                  >
                    <MapPin className="w-5 h-5" />
                    Cobertura Bogotá
                  </Link>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-2xl p-6 border border-emerald-100">
                <div className="text-center mb-4">
                  <p className="text-sm font-semibold text-slate-700">Línea de contratación</p>
                  <a href={`tel:${phoneE164}`} className="text-3xl font-black text-emerald-600">
                    {phoneDisplay}
                  </a>
                </div>
                <div className="grid gap-4">
                  <WhatsAppButton
                    provider={provider}
                    customMessage="Hola, quiero cotizar planes Movistar Fibra en Bogotá. ¿Me ayudas a validar cobertura en mi dirección?"
                    size="lg"
                    source="planes_movistar_bogota"
                  />
                  <QuickCallForm provider="movistar" buttonColor={provider.brand.primaryColor} />
                </div>
                <p className="text-xs text-slate-500 mt-4">
                  Precios y disponibilidad sujetos a cobertura y promociones vigentes. Este sitio no es la web oficial del operador.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">Planes Movistar Fibra (Bogotá)</h2>
              <p className="text-slate-600">El valor final se confirma tras validar cobertura en tu dirección.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`bg-white rounded-2xl shadow-xl border p-8 ${
                    plan.featured ? 'border-emerald-400 ring-2 ring-emerald-200' : 'border-slate-100'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-black text-slate-900">{plan.name}</h3>
                      <p className="text-sm text-slate-500 mt-1">{plan.highlight}</p>
                    </div>
                    <Zap className="w-8 h-8 text-emerald-600" />
                  </div>

                  <div className="mt-6">
                    <div className="text-4xl font-black text-emerald-600">{plan.price}</div>
                    <p className="text-xs text-slate-500 mt-1">Precio mensual (referencia)</p>
                  </div>

                  <p className="mt-4 text-sm font-semibold text-slate-800">{plan.speed}</p>

                  <ul className="mt-6 space-y-2 text-sm text-slate-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      Simetría (subida y bajada)
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      Verificación de cobertura por dirección
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      Agendamiento de instalación
                    </li>
                  </ul>

                  <div className="mt-8 grid gap-3">
                    <a
                      href={`tel:${phoneE164}`}
                      className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors"
                    >
                      <Phone className="w-5 h-5" />
                      Llamar para contratar
                    </a>
                    <Link
                      href="/asesor-movistar-bogota"
                      className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                    >
                      Elegir {plan.name}
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link href="/planes-movistar-fibra" className="text-emerald-700 font-bold hover:underline">
                Ver página completa de Movistar Fibra →
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-black text-gray-900 mb-8">Preguntas frecuentes</h2>
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
