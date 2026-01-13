import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, MapPin, Phone, TrendingUp, Wifi } from 'lucide-react';
import QuickCallForm from '@/components/QuickCallForm';
import WhatsAppButton from '@/components/WhatsAppButton';
import { getProvider } from '@/lib/data';
import { renderJsonLd } from '@/lib/schemas';

export const revalidate = 3600;

const provider = getProvider('claro');
const phoneDisplay = '315 464 5370';
const phoneE164 = '+573154645370';

export const metadata: Metadata = {
  title: 'Planes Claro Bogotá 2026 | Precios Internet Hogar y Cobertura',
  description:
    'Planes de internet Claro para hogar en Bogotá: precios, velocidades y recomendaciones por uso. Verifica cobertura por dirección y contrata con asesoría inmediata.',
  keywords: [
    'planes claro bogota',
    'internet claro bogota precios',
    'claro hogar bogota',
    'claro fibra bogota',
    'cobertura claro bogota',
    'internet 500 megas claro bogota',
    'contratar internet claro bogota',
  ],
  alternates: {
    canonical: 'https://comparadorinternet.co/planes-claro-bogota',
  },
  openGraph: {
    title: 'Planes Claro en Bogotá 2026',
    description: 'Precios y planes Claro hogar en Bogotá. Verifica cobertura y contrata.',
    url: 'https://comparadorinternet.co/planes-claro-bogota',
    siteName: 'Comparador Internet Colombia',
    locale: 'es_CO',
    type: 'article',
  },
};

export default function PlanesClaroBogotaPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Cuál es el plan Claro más recomendado en Bogotá?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Para la mayoría de hogares en Bogotá, 350 Mbps suele ser un punto ideal para streaming y teletrabajo. Para gaming o muchos dispositivos, 500 Mbps es una mejor opción.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Cómo saber si Claro tiene cobertura en mi dirección en Bogotá?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'La cobertura varía por barrio y edificio. Envíanos tu dirección completa y validamos disponibilidad (fibra o HFC) antes de contratar.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Cuánto cuesta el internet Claro hogar en Bogotá?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'El precio depende de la velocidad, promociones vigentes y cobertura en tu zona. Aquí ves precios de referencia; confirma el valor final con validación por dirección.',
        },
      },
    ],
  };

  const priceSchema = {
    '@context': 'https://schema.org',
    '@type': 'PriceSpecification',
    price: '59900',
    priceCurrency: 'COP',
    validFrom: '2026-01-01',
    validThrough: '2026-12-31',
    description: 'Plan Internet Claro Hogar 200 Megas (referencia Bogotá)',
  };

  const plans = [
    {
      name: '200 Mbps',
      price: '$59.900',
      highlight: 'Ideal pareja',
      cta: 'Elegir 200 Mbps',
      featured: false,
    },
    {
      name: '350 Mbps',
      price: '$64.900',
      highlight: 'Más vendido',
      cta: 'Elegir 350 Mbps',
      featured: true,
    },
    {
      name: '500 Mbps',
      price: '$79.900',
      highlight: 'Gaming y 4K',
      cta: 'Elegir 500 Mbps',
      featured: false,
    },
  ] as const;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={renderJsonLd(faqSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={renderJsonLd(priceSchema)} />

      <div className="min-h-screen bg-slate-50">
        <section className="bg-gradient-to-r from-red-600 via-red-700 to-rose-700 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
                  <TrendingUp className="w-4 h-4 text-yellow-300" />
                  <span className="text-sm font-semibold">Bogotá 2026 • Precios de referencia</span>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <Image
                    src={provider.brand.logo}
                    alt="Claro"
                    width={96}
                    height={40}
                    className="h-8 w-auto brightness-0 invert"
                    priority
                  />
                  <h1 className="text-4xl md:text-5xl font-black leading-tight">Planes Claro Bogotá</h1>
                </div>

                <p className="text-lg md:text-xl text-red-100 mb-8">
                  Te ayudamos a elegir el plan ideal y a validar cobertura por dirección (fibra/HFC) antes de contratar.
                </p>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/asesor-claro-bogota"
                    className="inline-flex items-center gap-2 bg-white text-red-700 font-bold px-5 py-3 rounded-lg hover:bg-red-50 transition-colors shadow-lg"
                  >
                    Hablar con asesor Claro
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

              <div className="bg-white rounded-2xl shadow-2xl p-6 border border-red-100">
                <div className="text-center mb-4">
                  <p className="text-sm font-semibold text-slate-700">Línea de contratación</p>
                  <a href={`tel:${phoneE164}`} className="text-3xl font-black text-red-600">
                    {phoneDisplay}
                  </a>
                </div>
                <div className="grid gap-4">
                  <WhatsAppButton
                    provider={provider}
                    customMessage="Hola, quiero cotizar planes Claro hogar en Bogotá. ¿Me ayudas a validar cobertura en mi dirección?"
                    size="lg"
                    source="planes_claro_bogota"
                  />
                  <QuickCallForm provider="claro" buttonColor={provider.brand.primaryColor} />
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
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">Planes Solo Internet (Bogotá)</h2>
              <p className="text-slate-600">El valor final se confirma tras validar cobertura en tu dirección.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`bg-white rounded-2xl shadow-xl border p-8 ${
                    plan.featured ? 'border-red-400 ring-2 ring-red-200' : 'border-slate-100'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-black text-slate-900">{plan.name}</h3>
                      <p className="text-sm text-slate-500 mt-1">{plan.highlight}</p>
                    </div>
                    <Wifi className="w-8 h-8 text-red-600" />
                  </div>

                  <div className="mt-6">
                    <div className="text-4xl font-black text-red-600">{plan.price}</div>
                    <p className="text-xs text-slate-500 mt-1">Precio mensual (referencia)</p>
                  </div>

                  <ul className="mt-6 space-y-2 text-sm text-slate-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      Verificación de cobertura por dirección
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      Recomendación de plan según uso
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
                      href="/asesor-claro-bogota"
                      className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-bold bg-red-600 text-white hover:bg-red-700 transition-colors"
                    >
                      {plan.cta}
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link href="/claro" className="text-red-700 font-bold hover:underline">
                Ver comparativa completa de Claro →
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
