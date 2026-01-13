import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, MapPin, Phone, TrendingUp } from 'lucide-react';
import QuickCallForm from '@/components/QuickCallForm';
import WhatsAppButton from '@/components/WhatsAppButton';
import { getProvider } from '@/lib/data';
import { renderJsonLd } from '@/lib/schemas';

export const revalidate = 3600;

const claro = getProvider('claro');
const movistar = getProvider('movistar');
const phoneDisplay = '315 464 5370';
const phoneE164 = '+573154645370';

export const metadata: Metadata = {
  title: 'Claro vs Movistar en Bogotá 2026 | ¿Cuál Internet Conviene Más?',
  description:
    'Comparativa BOFU: Claro vs Movistar en Bogotá (solo internet). Te ayudamos a elegir según cobertura por dirección, tecnología (fibra/HFC/FTTH) y tu uso. Contacta para validar disponibilidad.',
  keywords: [
    'claro vs movistar bogota',
    'movistar vs claro bogota',
    'mejor internet bogota claro o movistar',
    'claro fibra bogota vs movistar fibra',
    'cobertura claro bogota vs movistar fibra',
  ],
  alternates: {
    canonical: 'https://comparadorinternet.co/claro-vs-movistar-bogota',
  },
  openGraph: {
    title: 'Claro vs Movistar en Bogotá | Comparativa Solo Internet',
    description: 'Elige mejor entre Claro y Movistar en Bogotá según cobertura por dirección y tu uso.',
    url: 'https://comparadorinternet.co/claro-vs-movistar-bogota',
    siteName: 'Comparador Internet Colombia',
    locale: 'es_CO',
    type: 'article',
  },
};

export default function ClaroVsMovistarBogotaPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Qué es mejor en Bogotá: Claro o Movistar (solo internet)?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Depende de tu dirección y edificio. Movistar destaca si hay fibra (FTTH) disponible por su subida simétrica. Claro suele tener amplia disponibilidad (fibra u HFC según zona). La decisión correcta se toma validando cobertura por dirección.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Por qué la cobertura por edificio importa tanto?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'En Bogotá puede haber cobertura en el barrio pero no en tu edificio (cajas de paso, permisos o canalizaciones). Por eso recomendamos validar por dirección exacta antes de contratar.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Qué velocidad debería contratar?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Como referencia: 1-2 personas 200-300 Mbps, 3-4 personas 500 Mbps, 5+ personas 900 Mbps. El plan ideal depende del número de dispositivos y uso (teletrabajo, gaming, streaming).',
        },
      },
      {
        '@type': 'Question',
        name: '¿Puedo contratar solo internet sin TV/telefonía?',
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
        <section className="bg-gradient-to-r from-slate-900 via-indigo-900 to-blue-900 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/15">
                <TrendingUp className="w-4 h-4 text-yellow-300" />
                <span className="text-sm font-semibold">Bogotá • Solo Internet • BOFU</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-black mb-4">Claro vs Movistar en Bogotá</h1>
              <p className="text-lg md:text-2xl text-blue-100 mb-10">
                Te ayudamos a elegir el mejor internet para tu dirección (cobertura por edificio) y tu uso.
              </p>

              <div className="flex flex-wrap justify-center items-center gap-6 mb-10">
                <div className="bg-white rounded-xl p-4 shadow-lg">
                  <Image src={claro.brand.logo} alt="Claro" width={110} height={44} className="h-10 w-auto" />
                </div>
                <div className="text-2xl font-black text-white/80">VS</div>
                <div className="bg-white rounded-xl p-4 shadow-lg">
                  <Image src={movistar.brand.logo} alt="Movistar" width={130} height={52} className="h-10 w-auto" />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch">
                <a
                  href={`tel:${phoneE164}`}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-bold bg-white text-slate-900 hover:bg-slate-100 transition-colors shadow-lg"
                >
                  <Phone className="w-5 h-5" />
                  Llamar {phoneDisplay}
                </a>
                <WhatsAppButton
                  provider={claro}
                  customMessage="Hola, quiero elegir entre Claro y Movistar en Bogotá (solo internet). Mi dirección es _____. ¿Me ayudas a validar cobertura por edificio y recomendarme el plan?"
                  size="lg"
                  source="vs_claro_movistar_bogota"
                />
              </div>

              <div className="max-w-md mx-auto mt-8">
                <p className="text-white font-bold text-lg mb-3">¿Prefieres que te llamemos?</p>
                <QuickCallForm provider="comparativa-bogota" buttonColor="#2563eb" />
                <p className="text-xs text-white/70 mt-3">
                  Este sitio no es la web oficial de los operadores. Asesoría independiente para contratación.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                <h2 className="text-2xl font-black text-gray-900 mb-5">Cómo decidir rápido</h2>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                    Si tu prioridad es <strong>subida estable</strong> (videollamadas/creación), Movistar suele destacar cuando hay fibra disponible.
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                    Si tu prioridad es <strong>disponibilidad</strong> en más conjuntos/edificios, Claro puede ser una buena opción (fibra u HFC según zona).
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                    La regla de oro en Bogotá: decide con <strong>validación por dirección exacta</strong> (barrio + edificio).
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                <h2 className="text-2xl font-black text-gray-900 mb-5">Qué necesitamos para validar cobertura</h2>
                <div className="grid gap-4 text-sm text-gray-700">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <div className="font-bold text-gray-900">Dirección completa</div>
                      <div className="text-gray-600">Incluye torre/apto y nombre del conjunto si aplica.</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <div className="font-bold text-gray-900">Tu uso principal</div>
                      <div className="text-gray-600">Teletrabajo, gaming, streaming y número de personas.</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <div className="font-bold text-gray-900">Tipo de vivienda</div>
                      <div className="text-gray-600">Casa o edificio (para anticipar permisos/instalación).</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4">Accesos rápidos</h2>
              <div className="flex flex-wrap gap-3">
                <Link href="/cobertura-claro-bogota" className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors">
                  Cobertura Claro Bogotá
                </Link>
                <Link href="/cobertura-movistar-bogota" className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors">
                  Cobertura Movistar Bogotá
                </Link>
                <Link href="/planes-claro-bogota" className="px-4 py-2 rounded-lg bg-slate-100 text-slate-900 font-semibold hover:bg-slate-200 transition-colors">
                  Planes Claro Bogotá
                </Link>
                <Link href="/planes-movistar-bogota" className="px-4 py-2 rounded-lg bg-slate-100 text-slate-900 font-semibold hover:bg-slate-200 transition-colors">
                  Planes Movistar Bogotá
                </Link>
                <Link href="/internet-bogota-cobertura" className="px-4 py-2 rounded-lg bg-slate-100 text-slate-900 font-semibold hover:bg-slate-200 transition-colors">
                  Cobertura Bogotá (mapa)
                </Link>
                <Link href="/comparar/claro/movistar" className="px-4 py-2 rounded-lg bg-slate-100 text-slate-900 font-semibold hover:bg-slate-200 transition-colors">
                  Comparativa completa
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

