import type { Metadata } from 'next';
import Link from 'next/link';
import { DollarSign, CheckCircle2, TrendingDown, Zap, Phone, AlertCircle } from 'lucide-react';
import QuickCallForm from '@/components/QuickCallForm';

export const metadata: Metadata = {
  title: 'Internet Barato Colombia 2026 | Planes desde $42.000/mes',
  description: 'Encuentra el internet más económico en Colombia. ETB desde $42.000, Claro $59.900, Movistar $59.900. Compara precios reales, fibra óptica y sin permanencia. Ahorra hasta $600.000 al año.',
  keywords: [
    'internet barato colombia',
    'internet economico bogota',
    'internet mas barato',
    'planes internet economicos',
    'internet low cost colombia',
    'internet desde 40000',
    'como conseguir internet barato',
    'internet barato sin permanencia',
    'promociones internet baratas',
    'internet familiar economico',
  ],
  alternates: {
    canonical: 'https://comparadorinternet.co/internet-barato-colombia',
  },
  openGraph: {
    title: 'Internet Barato Colombia | Desde $42.000/mes con Fibra Óptica',
    description: 'Los planes de internet más económicos. Compara precios reales y ahorra hasta $600k al año.',
    url: 'https://comparadorinternet.co/internet-barato-colombia',
    siteName: 'Comparador Internet Colombia',
    locale: 'es_CO',
    type: 'article',
  },
};

export default function InternetBaratoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: '¿Cuál es el internet más barato en Colombia?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'ETB ofrece el plan más económico desde $42.000/mes con 300 Mbps de fibra óptica simétrica en Bogotá. A nivel nacional, Claro tiene planes desde $59.900/mes con 200 Mbps.',
                },
              },
              {
                '@type': 'Question',
                name: '¿Cómo conseguir internet barato en Colombia?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Compara precios entre operadores, elige planes sin TV incluida, pregunta por promociones sin permanencia, y contrata en temporadas de descuentos como enero-febrero.',
                },
              },
            ],
          }),
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
        {/* Hero */}
        <section className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <DollarSign className="w-5 h-5" />
                <span className="font-semibold">Precios Verificados Enero 2026</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Internet Barato en Colombia: Planes desde $42.000
              </h1>

              <p className="text-xl md:text-2xl text-green-100 mb-8">
                Encuentra el plan más <span className="font-bold text-white">económico</span> sin sacrificar velocidad ni calidad. Compara precios reales de ETB, Claro y Movistar.
              </p>

              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 max-w-2xl mx-auto mb-8">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-black">$42k</div>
                    <div className="text-sm text-green-100">Plan más barato</div>
                  </div>
                  <div>
                    <div className="text-3xl font-black">300 Mbps</div>
                    <div className="text-sm text-green-100">Velocidad incluida</div>
                  </div>
                  <div>
                    <div className="text-3xl font-black">$0</div>
                    <div className="text-sm text-green-100">Sin instalación</div>
                  </div>
                </div>
              </div>

               <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 max-w-sm mx-auto shadow-xl">
                 <h2 className="text-white text-lg font-semibold mb-2">¿Quieres el plan más barato?</h2>
                 <p className="text-green-100 text-sm mb-4">Te ayudamos a contratarlo hoy mismo.</p>
                 <QuickCallForm buttonColor="#059669" provider="Multi" />
              </div>
            </div>
          </div>
        </section>

        {/* Top 3 Más Baratos */}
        <section className="py-16 -mt-12 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                🏆 Los 3 Planes Más Económicos
              </h2>
              <p className="text-xl text-gray-600">Precios reales verificados enero 2026</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* #1 ETB */}
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-green-400 relative">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg">
                  🥇 MÁS BARATO
                </div>

                <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-6">
                  <div className="text-center">
                    <div className="text-sm font-semibold mb-2">ETB Bogotá</div>
                    <div className="text-5xl font-black mb-2">$42.000</div>
                    <div className="text-sm opacity-90">por mes</div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-4">
                    <div className="text-3xl font-bold text-blue-600 mb-1">300 Mbps</div>
                    <div className="text-sm text-gray-600">Fibra óptica simétrica</div>
                  </div>

                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>Velocidad simétrica 300/300</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>Sin permanencia mínima</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>WiFi 360 incluido</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>Instalación gratis</span>
                    </li>
                  </ul>

                  <div className="bg-green-50 rounded-lg p-3 mb-4 text-center">
                    <div className="text-sm font-semibold text-green-800">Ahorras al año:</div>
                    <div className="text-2xl font-black text-green-700">$576.000</div>
                    <div className="text-xs text-green-600">vs planes tradicionales $90k/mes</div>
                  </div>

                  <Link
                    href="/etb"
                    className="block w-full text-center bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Ver ETB
                  </Link>
                </div>
              </div>

              {/* #2 Claro */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-gray-200">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gray-500 text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg">
                  🥈 2DO LUGAR
                </div>

                <div className="bg-gradient-to-br from-red-600 to-red-700 text-white p-6">
                  <div className="text-center">
                    <div className="text-sm font-semibold mb-2">Claro Nacional</div>
                    <div className="text-5xl font-black mb-2">$59.900</div>
                    <div className="text-sm opacity-90">por mes</div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-4">
                    <div className="text-3xl font-bold text-red-600 mb-1">200 Mbps</div>
                    <div className="text-sm text-gray-600">Tecnología HFC</div>
                  </div>

                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>Cobertura nacional amplia</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>Claro Video incluido</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>Apps sin consumir datos</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>Router WiFi incluido</span>
                    </li>
                  </ul>

                  <div className="bg-blue-50 rounded-lg p-3 mb-4 text-center">
                    <div className="text-sm font-semibold text-blue-800">Ahorras al año:</div>
                    <div className="text-2xl font-black text-blue-700">$360.000</div>
                    <div className="text-xs text-blue-600">vs planes tradicionales $90k/mes</div>
                  </div>

                  <Link
                    href="/claro"
                    className="block w-full text-center bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Ver Claro
                  </Link>
                </div>
              </div>

              {/* #3 Movistar */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-gray-200">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg">
                  🥉 3ER LUGAR
                </div>

                <div className="bg-gradient-to-br from-green-600 to-green-700 text-white p-6">
                  <div className="text-center">
                    <div className="text-sm font-semibold mb-2">Movistar</div>
                    <div className="text-5xl font-black mb-2">$59.900</div>
                    <div className="text-sm opacity-90">por mes</div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-4">
                    <div className="text-3xl font-bold text-green-600 mb-1">300 Mbps</div>
                    <div className="text-sm text-gray-600">Fibra simétrica</div>
                  </div>

                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>Ultra Fibra simétrica</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>Disney+ 6 meses gratis</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>Router WiFi 6</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>Gaming mode</span>
                    </li>
                  </ul>

                  <div className="bg-purple-50 rounded-lg p-3 mb-4 text-center">
                    <div className="text-sm font-semibold text-purple-800">Ahorras al año:</div>
                    <div className="text-2xl font-black text-purple-700">$360.000</div>
                    <div className="text-xs text-purple-600">vs planes tradicionales $90k/mes</div>
                  </div>

                  <Link
                    href="/movistar"
                    className="block w-full text-center bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Ver Movistar
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cómo Ahorrar */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                💡 5 Formas de Conseguir Internet Más Barato
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
                <TrendingDown className="w-10 h-10 text-blue-600 mb-3" />
                <h3 className="font-bold text-lg text-gray-900 mb-2">1. Sin TV Incluida</h3>
                <p className="text-gray-700 text-sm">
                  Planes solo internet son $30-40k más baratos que paquetes con TV. Si usas Netflix/Prime, no necesitas TV.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
                <CheckCircle2 className="w-10 h-10 text-green-600 mb-3" />
                <h3 className="font-bold text-lg text-gray-900 mb-2">2. Sin Permanencia</h3>
                <p className="text-gray-700 text-sm">
                  Evita contratos con permanencia de 12-24 meses. ETB ofrece planes sin ataduras que puedes cancelar cuando quieras.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
                <DollarSign className="w-10 h-10 text-purple-600 mb-3" />
                <h3 className="font-bold text-lg text-gray-900 mb-2">3. Promociones de Enero</h3>
                <p className="text-gray-700 text-sm">
                  Enero-febrero tienen las mejores ofertas: hasta 3 meses gratis y descuentos del 50%.
                </p>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6">
                <Zap className="w-10 h-10 text-yellow-600 mb-3" />
                <h3 className="font-bold text-lg text-gray-900 mb-2">4. Velocidad Justa</h3>
                <p className="text-gray-700 text-sm">
                  300 Mbps es suficiente para 1-3 personas. No pagues 900 Mbps si no lo necesitas (diferencia de $50k/mes).
                </p>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6">
                <Phone className="w-10 h-10 text-red-600 mb-3" />
                <h3 className="font-bold text-lg text-gray-900 mb-2">5. Negociar Precio</h3>
                <p className="text-gray-700 text-sm">
                  Llama y menciona que encontraste mejor precio en la competencia. Muchas veces igualan u ofrecen descuento.
                </p>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-6">
                <AlertCircle className="w-10 h-10 text-indigo-600 mb-3" />
                <h3 className="font-bold text-lg text-gray-900 mb-2">6. Lee la Letra Pequeña</h3>
                <p className="text-gray-700 text-sm">
                  Verifica que el precio no suba después de 6 meses. Pregunta explícitamente si es "precio permanente".
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Comparación Precio/Velocidad */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Mejor Relación Precio/Velocidad
              </h2>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">Plan</th>
                    <th className="px-6 py-4 text-left">Precio/mes</th>
                    <th className="px-6 py-4 text-left">Velocidad</th>
                    <th className="px-6 py-4 text-left">$/Mbps</th>
                    <th className="px-6 py-4 text-left">Calificación</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-green-50 border-b">
                    <td className="px-6 py-4 font-semibold">ETB 300</td>
                    <td className="px-6 py-4">$42.000</td>
                    <td className="px-6 py-4">300 Mbps</td>
                    <td className="px-6 py-4 font-bold text-green-600">$140</td>
                    <td className="px-6 py-4">⭐⭐⭐⭐⭐</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-6 py-4 font-semibold">Movistar 300</td>
                    <td className="px-6 py-4">$59.900</td>
                    <td className="px-6 py-4">300 Mbps</td>
                    <td className="px-6 py-4">$200</td>
                    <td className="px-6 py-4">⭐⭐⭐⭐</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-6 py-4 font-semibold">Claro 200</td>
                    <td className="px-6 py-4">$59.900</td>
                    <td className="px-6 py-4">200 Mbps</td>
                    <td className="px-6 py-4">$300</td>
                    <td className="px-6 py-4">⭐⭐⭐</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-center text-sm text-gray-600 mt-6">
              * Menor $/Mbps = mejor relación precio/velocidad
            </p>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-16 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <DollarSign className="w-16 h-16 mx-auto mb-6" />

            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Quieres el Plan Más Económico?
            </h2>

            <p className="text-xl text-green-100 mb-8">
              Te ayudamos a encontrar el internet más barato con la mejor velocidad para tu hogar. Asesoría gratis sin compromiso.
            </p>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md mx-auto mb-8">
              <QuickCallForm provider="Barato" />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <Link href="/planes" className="underline hover:text-green-200">
                Comparar todos los planes →
              </Link>
              <Link href="/ofertas" className="underline hover:text-green-200">
                Ver ofertas actuales →
              </Link>
              <Link href="/contratar" className="underline hover:text-green-200">
                Contratar online →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
