import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BarChart3, CheckCircle2 } from 'lucide-react';
import QuickCallForm from '@/components/QuickCallForm';
import { generateCollectionPageSchema, renderJsonLd } from '@/lib/schemas';

export const metadata: Metadata = {
  title: 'Comparar Operadores de Internet | Claro vs Movistar vs ETB',
  description: 'Comparativas claras entre Claro, Movistar y ETB: precio, velocidad, cobertura y tecnología. Elige el mejor operador para tu zona y contrata con asesoría.',
  alternates: {
    canonical: 'https://comparadorinternet.co/comparar',
  },
  openGraph: {
    title: 'Comparar Operadores de Internet en Colombia',
    description: 'Compara Claro, Movistar y ETB con datos prácticos y recomendaciones por uso.',
    url: 'https://comparadorinternet.co/comparar',
    type: 'website',
  },
};

const COMPARATIVAS = [
  {
    slug1: 'claro',
    slug2: 'movistar',
    title: 'Claro vs Movistar',
    description: 'Cobertura, precio y tecnología (FTTH/HFC) para elegir mejor.',
  },
  {
    slug1: 'movistar',
    slug2: 'claro',
    title: 'Movistar vs Claro',
    description: 'Comparativa inversa para búsquedas específicas por marca.',
  },
  {
    slug1: 'etb',
    slug2: 'claro',
    title: 'ETB vs Claro',
    description: 'Bogotá vs cobertura nacional: velocidad, estabilidad y costos.',
  },
  {
    slug1: 'claro',
    slug2: 'etb',
    title: 'Claro vs ETB',
    description: '¿Qué conviene más en tu zona? Promos, permanencia y precio.',
  },
  {
    slug1: 'etb',
    slug2: 'movistar',
    title: 'ETB vs Movistar',
    description: 'Fibra simétrica, latencia y rendimiento para teletrabajo y streaming.',
  },
  {
    slug1: 'movistar',
    slug2: 'etb',
    title: 'Movistar vs ETB',
    description: 'Comparativa por ciudad (Bogotá y Sabana) y disponibilidad.',
  },
] as const;

export default function CompararIndexPage() {
  const collectionSchema = generateCollectionPageSchema({
    name: 'Comparar operadores de internet en Colombia',
    description: 'Comparativas entre Claro, Movistar y ETB para elegir el mejor plan según tu zona y uso.',
    url: 'https://comparadorinternet.co/comparar',
    numberOfItems: COMPARATIVAS.length,
    itemListElement: COMPARATIVAS.map((item) => ({
      name: item.title,
      url: `https://comparadorinternet.co/comparar/${item.slug1}/${item.slug2}`,
      description: item.description,
    })),
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={renderJsonLd(collectionSchema)} />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <section className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white py-14">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
              <BarChart3 className="w-5 h-5" />
              <span className="font-semibold">Comparativas 2026</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black mb-4">
              Compara Operadores de Internet
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8">
              Claro, Movistar y ETB: precio, velocidad, cobertura y recomendaciones por uso.
            </p>

            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 max-w-sm mx-auto shadow-xl">
              <h2 className="text-white text-lg font-semibold mb-2">¿Quieres que te asesoremos?</h2>
              <p className="text-blue-100 text-sm mb-4">Te llamamos para validar cobertura y recomendarte el plan.</p>
              <QuickCallForm buttonColor="#1d4ed8" provider="Multi" />
            </div>
          </div>
        </section>

        <section className="py-14">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {COMPARATIVAS.map((item) => {
                const href = `/comparar/${item.slug1}/${item.slug2}`;
                return (
                  <Link
                    key={`${item.slug1}-${item.slug2}`}
                    href={href}
                    className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl hover:-translate-y-0.5 transition-all"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                        <p className="text-sm text-gray-600 mt-2">{item.description}</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                    </div>

                    <div className="mt-5 flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>Ver comparativa completa</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

