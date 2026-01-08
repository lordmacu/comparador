import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllProviders, getProviderBySlug } from '@/lib/data';
import QuickCallForm from '@/components/QuickCallForm';
import { Check, Zap, Shield } from 'lucide-react';

// Definir las comparativas permitidas
const COMPARATIVAS = [
  ['etb', 'claro'],
  ['etb', 'movistar'],
  ['claro', 'movistar'],
  ['claro', 'etb'],
  ['movistar', 'etb'],
  ['movistar', 'claro'],
];

export async function generateStaticParams() {
  return COMPARATIVAS.map(([op1, op2]) => ({
    operadores: [op1, op2],
  }));
}

export async function generateMetadata({ params }: { params: { operadores: string[] } }): Promise<Metadata> {
  const [slug1, slug2] = params.operadores || [];
  
  if (!slug1 || !slug2) {
    return { title: 'Comparador de Internet en Colombia' };
  }

  const provider1 = getProviderBySlug(slug1);
  const provider2 = getProviderBySlug(slug2);
  
  if (!provider1 || !provider2) {
    return { title: 'Comparador de Internet en Colombia' };
  }

  const nombre1 = provider1.name;
  const nombre2 = provider2.name;

  return {
    title: `${nombre1} vs ${nombre2} 2026: ¿Cuál es Mejor? | Comparación Completa`,
    description: `Comparativa completa entre ${nombre1} y ${nombre2}. Velocidad, precio, cobertura y opiniones reales. Descubre cuál es el mejor internet para ti en 2026.`,
    keywords: [
      `${nombre1} vs ${nombre2}`,
      `${nombre2} vs ${nombre1}`,
      `diferencia entre ${nombre1} y ${nombre2}`,
      `qué es mejor ${nombre1} o ${nombre2}`,
      `comparar ${nombre1} ${nombre2}`,
      `opiniones ${nombre1} vs ${nombre2}`,
      `velocidad ${nombre1} vs ${nombre2}`,
      `precio ${nombre1} vs ${nombre2}`
    ],
    alternates: {
      canonical: `https://comparadorinternet.co/comparar/${slug1}/${slug2}`,
    },
    openGraph: {
      title: `${nombre1} vs ${nombre2} 2026`,
      description: `Comparación detallada entre ${nombre1} y ${nombre2}`,
      url: `https://comparadorinternet.co/comparar/${slug1}/${slug2}`,
    },
  };
}

export const revalidate = 3600;

export default function ComparativaPage({ params }: { params: { operadores: string[] } }) {
  const [slug1, slug2] = params.operadores || [];
  
  if (!slug1 || !slug2) {
    notFound();
  }

  const provider1 = getProviderBySlug(slug1);
  const provider2 = getProviderBySlug(slug2);

  if (!provider1 || !provider2) {
    notFound();
  }

  const nombre1 = provider1.name;
  const nombre2 = provider2.name;

  // Comparación de características
  const comparacion = [
    {
      categoria: 'Velocidad Máxima',
      [nombre1]: '900 Mbps',
      [nombre2]: '900 Mbps',
      ganador: 'empate'
    },
    {
      categoria: 'Tecnología',
      [nombre1]: provider1.coverage.technology,
      [nombre2]: provider2.coverage.technology,
      ganador: 'empate'
    },
    {
      categoria: 'Cobertura',
      [nombre1]: provider1.coverage.national ? 'Nacional' : 'Bogotá',
      [nombre2]: provider2.coverage.national ? 'Nacional' : 'Bogotá',
      ganador: provider1.coverage.national && !provider2.coverage.national ? nombre1 : 
               provider2.coverage.national && !provider1.coverage.national ? nombre2 : 'empate'
    },
    {
      categoria: 'Velocidad Simétrica',
      [nombre1]: nombre1 === 'ETB' || nombre1 === 'Movistar' ? 'Sí' : 'No',
      [nombre2]: nombre2 === 'ETB' || nombre2 === 'Movistar' ? 'Sí' : 'No',
      ganador: (nombre1 === 'ETB' || nombre1 === 'Movistar') && (nombre2 !== 'ETB' && nombre2 !== 'Movistar') ? nombre1 : 
               (nombre2 === 'ETB' || nombre2 === 'Movistar') && (nombre1 !== 'ETB' && nombre1 !== 'Movistar') ? nombre2 : 'empate'
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              {nombre1} vs {nombre2} 2026
            </h1>
            
            <p className="text-xl text-blue-100 mb-8">
              Comparación completa de velocidad, precio, cobertura y servicios. 
              Descubre cuál es el mejor operador para tus necesidades.
            </p>

            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-8">
              <div className="flex flex-col items-center">
                <div className="bg-white rounded-lg p-4 mb-2">
                  <Image
                    src={provider1.brand.logo}
                    alt={`${nombre1} logo`}
                    width={120}
                    height={60}
                    className="h-12 w-auto"
                  />
                </div>
                <span className="font-bold">{nombre1}</span>
              </div>

              <div className="text-3xl font-black">VS</div>

              <div className="flex flex-col items-center">
                <div className="bg-white rounded-lg p-4 mb-2">
                  <Image
                    src={provider2.brand.logo}
                    alt={`${nombre2} logo`}
                    width={120}
                    height={60}
                    className="h-12 w-auto"
                  />
                </div>
                <span className="font-bold">{nombre2}</span>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h2 className="font-bold text-lg mb-4">¿No sabes cuál elegir? Te asesoramos gratis:</h2>
              <QuickCallForm buttonColor="#7c3aed" />
            </div>
          </div>
        </div>
      </section>

      {/* Tabla Comparativa */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-black mb-8 text-center">Comparación Detallada</h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-4 text-left font-bold">Característica</th>
                    <th className="border p-4 text-center font-bold">{nombre1}</th>
                    <th className="border p-4 text-center font-bold">{nombre2}</th>
                  </tr>
                </thead>
                <tbody>
                  {comparacion.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="border p-4 font-semibold">{item.categoria}</td>
                      <td className={`border p-4 text-center ${item.ganador === nombre1 ? 'bg-green-50 font-bold' : ''}`}>
                        {item[nombre1]}
                        {item.ganador === nombre1 && <Check className="inline ml-2 w-5 h-5 text-green-600" />}
                      </td>
                      <td className={`border p-4 text-center ${item.ganador === nombre2 ? 'bg-green-50 font-bold' : ''}`}>
                        {item[nombre2]}
                        {item.ganador === nombre2 && <Check className="inline ml-2 w-5 h-5 text-green-600" />}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Ventajas y Beneficios */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-black mb-8 text-center">¿Por Qué Elegir Cada Operador?</h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Provider 1 */}
              <div className="bg-white rounded-lg p-6 border-2 border-blue-500">
                <div className="flex items-center gap-3 mb-6">
                  <Image
                    src={provider1.brand.logo}
                    alt={`${nombre1} logo`}
                    width={80}
                    height={40}
                    className="h-10 w-auto"
                  />
                </div>

                <div className="mb-6">
                  <h3 className="font-bold text-lg mb-3 text-green-600 flex items-center gap-2">
                    <Check className="w-5 h-5" />
                    Por qué elegir {nombre1}
                  </h3>
                  <ul className="space-y-2">
                    {provider1.whyChoose?.slice(0, 4).map((ventaja, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-sm">{ventaja}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-3 text-gray-600 flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Beneficios Destacados
                  </h3>
                  <ul className="space-y-2">
                    {provider1.mainBenefits?.slice(0, 3).map((beneficio, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Zap className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                        <span className="text-sm">{beneficio.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={`/${provider1.slug}`}
                  className="mt-6 block text-center bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors font-bold"
                >
                  Ver Planes {nombre1}
                </Link>
              </div>

              {/* Provider 2 */}
              <div className="bg-white rounded-lg p-6 border-2 border-purple-500">
                <div className="flex items-center gap-3 mb-6">
                  <Image
                    src={provider2.brand.logo}
                    alt={`${nombre2} logo`}
                    width={80}
                    height={40}
                    className="h-10 w-auto"
                  />
                </div>

                <div className="mb-6">
                  <h3 className="font-bold text-lg mb-3 text-green-600 flex items-center gap-2">
                    <Check className="w-5 h-5" />
                    Por qué elegir {nombre2}
                  </h3>
                  <ul className="space-y-2">
                    {provider2.whyChoose?.slice(0, 4).map((ventaja, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-sm">{ventaja}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-3 text-gray-600 flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Beneficios Destacados
                  </h3>
                  <ul className="space-y-2">
                    {provider2.mainBenefits?.slice(0, 3).map((beneficio, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Zap className="w-4 h-4 text-purple-600 mt-1 flex-shrink-0" />
                        <span className="text-sm">{beneficio.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={`/${provider2.slug}`}
                  className="mt-6 block text-center bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition-colors font-bold"
                >
                  Ver Planes {nombre2}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-black mb-8">Preguntas Frecuentes</h2>

            <div className="space-y-4">
              <details className="bg-gray-50 rounded-lg p-6">
                <summary className="font-bold text-lg cursor-pointer">
                  ¿Cuál tiene mejor velocidad, {nombre1} o {nombre2}?
                </summary>
                <p className="mt-4 text-gray-700">
                  Ambos operadores ofrecen velocidades de hasta 900 Mbps con fibra óptica. 
                  {nombre1 === 'ETB' || nombre1 === 'Movistar' || nombre2 === 'ETB' || nombre2 === 'Movistar' 
                    ? ' ETB y Movistar destacan por ofrecer velocidad simétrica (igual subida y bajada).'
                    : ' La velocidad real dependerá de tu ubicación y el plan contratado.'}
                </p>
              </details>

              <details className="bg-gray-50 rounded-lg p-6">
                <summary className="font-bold text-lg cursor-pointer">
                  ¿Cuál es más barato, {nombre1} o {nombre2}?
                </summary>
                <p className="mt-4 text-gray-700">
                  Los precios varían según el plan y las promociones vigentes. Te recomendamos solicitar cotizaciones 
                  de ambos operadores para comparar ofertas específicas en tu zona.
                </p>
              </details>

              <details className="bg-gray-50 rounded-lg p-6">
                <summary className="font-bold text-lg cursor-pointer">
                  ¿Puedo cambiar de {nombre1} a {nombre2}?
                </summary>
                <p className="mt-4 text-gray-700">
                  Sí, puedes cambiar de operador. Si tienes permanencia mínima vigente, puede haber penalizaciones. 
                  Sin embargo, muchos operadores ofrecen bonificaciones por portabilidad.
                </p>
              </details>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-12 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-black mb-4">
              ¿Ya Decidiste? Compara los Planes
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Solicita una llamada gratis para recibir asesoría personalizada
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/${provider1.slug}`}
                className="px-6 py-3 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-100 transition-all"
              >
                Ver Planes {nombre1}
              </Link>
              <Link
                href={`/${provider2.slug}`}
                className="px-6 py-3 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-100 transition-all"
              >
                Ver Planes {nombre2}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
