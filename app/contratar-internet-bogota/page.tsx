import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Clock, MapPin, Phone, ShieldCheck } from 'lucide-react';
import QuickCallForm from '@/components/QuickCallForm';
import WhatsAppButton from '@/components/WhatsAppButton';
import { getProvider } from '@/lib/data';
import { renderJsonLd } from '@/lib/schemas';

export const revalidate = 3600;

const claro = getProvider('claro');
const movistar = getProvider('movistar');
const etb = getProvider('etb');

const phoneDisplay = '315 464 5370';
const phoneE164 = '+573154645370';

export const metadata: Metadata = {
  title: 'Contratar Internet en Bogotá 2026 | Claro, Movistar y ETB',
  description:
    'Contrata internet en Bogotá con asesoría: validamos cobertura por dirección, te recomendamos plan y agendamos instalación. Claro, Movistar y ETB. Contacta por WhatsApp o solicita llamada.',
  keywords: [
    'contratar internet bogota',
    'comprar internet bogota',
    'planes internet bogota',
    'internet fibra bogota contratar',
    'asesor internet bogota',
    'cobertura internet bogota',
    'telefono contratar internet bogota',
  ],
  alternates: {
    canonical: 'https://comparadorinternet.co/contratar-internet-bogota',
  },
  openGraph: {
    title: 'Contratar Internet en Bogotá',
    description: 'Valida cobertura, elige tu plan y agenda instalación con asesoría.',
    url: 'https://comparadorinternet.co/contratar-internet-bogota',
    siteName: 'Comparador Internet Colombia',
    locale: 'es_CO',
    type: 'website',
  },
};

export default function ContratarInternetBogotaPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Cómo contratar internet en Bogotá rápido?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Envíanos tu dirección completa y barrio por WhatsApp o solicita llamada al ${phoneDisplay}. Validamos cobertura y te recomendamos el plan ideal de Claro, Movistar o ETB.`,
        },
      },
      {
        '@type': 'Question',
        name: '¿Cuál es el mejor internet en Bogotá?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Depende de tu dirección: algunos barrios tienen fibra disponible y otros no. Por eso primero validamos cobertura y luego comparamos precio, velocidad y estabilidad.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Qué datos necesito para cotizar internet en Bogotá?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Dirección exacta (incluye torre/apto), barrio/localidad, tipo de vivienda (casa/apto) y tu uso (teletrabajo, streaming, gaming).',
        },
      },
      {
        '@type': 'Question',
        name: '¿Puedo contratar por WhatsApp?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Sí. Escríbenos al ${phoneDisplay} por WhatsApp y te ayudamos con cobertura, plan y agenda de instalación.`,
        },
      },
    ],
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Cómo contratar internet en Bogotá',
    description: 'Guía rápida para contratar internet en Bogotá con validación de cobertura.',
    totalTime: 'PT5M',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Valida cobertura por dirección',
        text: 'Comparte tu dirección completa y barrio para confirmar factibilidad técnica.',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Elige velocidad según tu uso',
        text: 'Recomendamos el plan por cantidad de personas, dispositivos y actividades (teletrabajo, streaming, gaming).',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Agenda instalación',
        text: 'Coordinamos fecha y hora de instalación según disponibilidad en tu zona.',
      },
    ],
  };

  const providers = [
    {
      provider: etb,
      accent: 'border-blue-600',
      planHref: '/planes-etb-bogota',
      advisorHref: '/asesor-etb-bogota',
      badge: 'Bogotá',
      highlight: 'Fibra óptica local (según cobertura).',
    },
    {
      provider: claro,
      accent: 'border-red-600',
      planHref: '/planes-claro-bogota',
      advisorHref: '/asesor-claro-bogota',
      badge: 'Nacional',
      highlight: 'Cobertura amplia (fibra/HFC según zona).',
    },
    {
      provider: movistar,
      accent: 'border-emerald-600',
      planHref: '/planes-movistar-bogota',
      advisorHref: '/asesor-movistar-bogota',
      badge: 'Fibra',
      highlight: 'Fibra simétrica (sujeto a cobertura).',
    },
  ] as const;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={renderJsonLd(faqSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={renderJsonLd(howToSchema)} />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <section className="bg-gradient-to-r from-blue-800 via-indigo-800 to-slate-900 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
                <MapPin className="w-4 h-4 text-yellow-300" />
                <span className="text-sm font-semibold">Bogotá • Validación de cobertura por dirección</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-black mb-6">Contratar Internet en Bogotá</h1>
              <p className="text-lg md:text-2xl text-blue-100 mb-10">
                Te ayudamos a elegir y contratar el mejor plan disponible en tu zona: Claro, Movistar o ETB.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 text-sm mb-10">
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg border border-white/10">
                  <Clock className="w-4 h-4 text-green-300" />
                  <span>Respuesta rápida</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg border border-white/10">
                  <ShieldCheck className="w-4 h-4 text-blue-100" />
                  <span>Asesoría de contratación</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-yellow-300" />
                  <span>Recomendación por uso</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch">
                <a
                  href={`tel:${phoneE164}`}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-bold bg-white text-blue-800 hover:bg-blue-50 transition-colors shadow-lg"
                >
                  <Phone className="w-5 h-5" />
                  Llamar {phoneDisplay}
                </a>

                <WhatsAppButton
                  provider={claro}
                  customMessage="Hola, quiero contratar internet en Bogotá. ¿Me ayudas a validar cobertura en mi dirección y recomendarme el mejor plan (Claro/Movistar/ETB)?"
                  size="lg"
                  source="contratar_internet_bogota"
                />
              </div>

              <div className="mt-10 max-w-md mx-auto">
                <p className="text-white font-bold text-lg mb-3">¿Te llamamos para cotizar?</p>
                <QuickCallForm provider="Bogotá" buttonColor="#2563eb" />
                <p className="text-xs text-white/80 mt-3">
                  Asesoría multimarca (Claro/Movistar/ETB). Este sitio no es la web oficial de los operadores.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 -mt-10 relative z-10">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-3 gap-6">
              {providers.map(({ provider, accent, planHref, advisorHref, badge, highlight }) => (
                <div key={provider.slug} className={`bg-white rounded-2xl shadow-xl border-t-4 ${accent} overflow-hidden`}>
                  <div className="p-8 text-center flex flex-col h-full">
                    <div className="flex items-center justify-center gap-3 mb-5">
                      <Image src={provider.brand.logo} alt={provider.name} width={120} height={44} className="h-8 w-auto" />
                      <span className="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1 rounded-full">{badge}</span>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{provider.name}</h2>
                    <p className="text-sm text-gray-600 mb-6">{highlight}</p>

                    <div className="space-y-3 mt-auto">
                      <Link
                        href={planHref}
                        className="block w-full py-3 rounded-xl font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors"
                      >
                        Ver planes en Bogotá
                      </Link>
                      <Link
                        href={advisorHref}
                        className="block w-full py-3 rounded-xl font-bold text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors"
                      >
                        Hablar con asesor
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link href="/contratar" className="inline-flex items-center gap-2 text-blue-700 font-bold hover:underline">
                Ir al formulario de contratación (4 pasos)
                <ArrowRight className="w-4 h-4" />
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

