import type { Metadata } from 'next';
import Link from 'next/link';
import { Wifi, Phone, Zap, Gamepad2, Timer, CheckCircle2 } from 'lucide-react';
import QuickCallForm from '@/components/QuickCallForm';

export const metadata: Metadata = {
  title: 'Planes Movistar Fibra 2026: Internet Simétrico desde $46.990',
  description: 'Conoce los nuevos planes de Fibra Óptica Movistar. Internet 100% Simétrico hasta 900 Megas. Compra ahora y paga el próximo mes. Oferta exclusiva online.',
  keywords: [
    'planes movistar fibra',
    'internet movistar simetrico',
    'movistar fibra optica bogota',
    'promociones movistar hogar',
    'movistar total precios',
    'internet fibra barato'
  ],
  alternates: {
    canonical: 'https://comparadorinternet.co/planes-movistar-fibra',
  },
  openGraph: {
    title: 'Planes Movistar Fibra Óptica 2026 | Simetría Total',
    description: 'La fibra #1 en velocidad de Colombia. Planes desde $46.990 con Disney+ incluido.',
    url: 'https://comparadorinternet.co/planes-movistar-fibra',
    siteName: 'Comparador Internet Colombia',
    locale: 'es_CO',
    type: 'article',
  },
};

export default function PlanesMovistarPage() {
  return (
    <>
       <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'PriceSpecification',
            price: '46990',
            priceCurrency: 'COP',
            validFrom: '2026-01-01',
            validThrough: '2026-12-31',
            description: 'Plan Internet Fibra Movistar 250 Megas'
          }),
        }}
      />

      <div className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-br from-green-500 to-blue-600 text-white py-20 relative overflow-hidden">
             {/* Decorative Circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-900/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                     <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold mb-6 border border-white/20">
                        <Zap className="w-4 h-4 text-yellow-300 fill-yellow-300"/> Internet 100% Simétrico
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
                        Movistar Fibra <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-white">Sin Límites</span>
                    </h1>
                    <p className="text-xl text-blue-50 mb-8 font-light">
                        Misma velocidad de subida y bajada. La mejor opción para trabajar, estudiar y gaming sin lag.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link href="#ofertas-movistar" className="bg-white text-blue-600 font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all text-center">
                            Ver Ofertas Flash
                        </Link>
                         <p className="text-xs text-white/70 self-center max-w-xs">
                            *Compra hoy y recibe el primer mes con 50% de descuento.
                        </p>
                    </div>
                </div>

                {/* Card Destacada */}
                <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-green-400 rounded-2xl blur opacity-30"></div>
                    <div className="relative bg-white text-slate-900 rounded-xl shadow-2xl p-8 border border-slate-100">
                        <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-4 py-2 rounded-bl-xl rounded-tr-xl">
                            OFERTA WEB
                        </div>
                        <h3 className="text-center font-bold text-gray-400 uppercase tracking-widest text-sm mb-2">Plan Recomendado</h3>
                        <div className="text-center mb-6">
                            <span className="text-6xl font-black text-blue-600">500</span>
                            <span className="text-xl font-bold text-gray-500">Megas</span>
                        </div>
                        <div className="flex justify-center items-baseline gap-1 mb-8">
                            <span className="text-4xl font-bold">$55.990</span>
                            <span className="text-sm text-gray-400">/mes</span>
                        </div>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center gap-3 text-sm font-medium text-slate-700">
                                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0"/>
                                <span>Simetría Total (500 subida / 500 bajada)</span>
                            </li>
                             <li className="flex items-center gap-3 text-sm font-medium text-slate-700">
                                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0"/>
                                <span>Disney+ y Star+ Incluidos en combo</span>
                            </li>
                             <li className="flex items-center gap-3 text-sm font-medium text-slate-700">
                                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0"/>
                                <span>Compra ahora, paga el otro mes</span>
                            </li>
                        </ul>
                         <QuickCallForm provider="Movistar Fibra 500" buttonColor="#16a34a" />
                    </div>
                </div>
            </div>
          </div>
        </section>

        {/* Planes Grid */}
        <section id="ofertas-movistar" className="py-20 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Elige tu velocidad simétrica</h2>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        Con Movistar Fibra, lo que tienes de bajada lo tienes de subida. Ideal para subir archivos pesados y hacer streaming.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Plan Básico */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">Fibra 250</h3>
                                <p className="text-sm text-slate-500">Plan de entrada</p>
                            </div>
                            <Wifi className="w-8 h-8 text-blue-500" />
                        </div>
                        <div className="mb-6">
                            <span className="text-3xl font-bold text-slate-900">$46.990</span>
                        </div>
                        <ul className="space-y-3 mb-8 text-sm text-slate-600">
                            <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500"/> 250 Megas Simétricas</li>
                            <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500"/> Modem WiFi 5</li>
                            <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500"/> App Smart WiFi</li>
                        </ul>
                         <Link href="/contratar?plan=movistar-250" className="block w-full py-3 text-center border-2 border-blue-600 text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors">
                            Elegir 250 Megas
                        </Link>
                    </div>

                    {/* Plan Pro */}
                     <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-green-400 transform md:-translate-y-4">
                        <div className="absolute top-0 inset-x-0 h-1 bg-green-400"></div>
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">Fibra 500</h3>
                                <p className="text-sm text-green-600 font-bold">RECOMENDADO</p>
                            </div>
                            <Zap className="w-8 h-8 text-green-500 fill-green-100" />
                        </div>
                        <div className="mb-6">
                            <span className="text-4xl font-black text-slate-900">$55.990</span>
                        </div>
                         <ul className="space-y-3 mb-8 text-sm text-slate-600">
                            <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500"/> 500 Megas Simétricas</li>
                            <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500"/> <strong>50% dcto mes 2 y 3</strong></li>
                            <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500"/> Repetidor WiFi incluido</li>
                        </ul>
                        <QuickCallForm provider="Movistar 500 Promo" />
                        <p className="text-center text-xs text-slate-400 mt-4">Sujeto a cobertura en estrato 3, 4, 5 y 6</p>
                    </div>

                    {/* Plan Gamer */}
                     <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">Fibra 900</h3>
                                <p className="text-sm text-purple-600 font-bold">GAMING PRO</p>
                            </div>
                            <Gamepad2 className="w-8 h-8 text-purple-600" />
                        </div>
                        <div className="mb-6">
                            <span className="text-3xl font-bold text-slate-900">$79.990</span>
                        </div>
                         <ul className="space-y-3 mb-8 text-sm text-slate-600">
                            <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500"/> 900 Megas Simétricas</li>
                            <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500"/> Latencia mínima</li>
                            <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500"/> Prioridad técnica</li>
                        </ul>
                         <Link href="/contratar?plan=movistar-900" className="block w-full py-3 text-center border-2 border-purple-600 text-purple-600 font-bold rounded-lg hover:bg-purple-50 transition-colors">
                            Elegir 900 Megas
                        </Link>
                    </div>
                </div>
            </div>
        </section>

        {/* Feature: Symmetry */}
        <section className="py-20 bg-blue-900 text-white overflow-hidden">
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl font-bold mb-6">¿Qué significa Internet Simétrico?</h2>
                        <ul className="space-y-6">
                            <li className="flex gap-4">
                                <div className="bg-blue-800 p-3 rounded-lg h-fit">
                                    <Timer className="w-6 h-6 text-green-400" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg">Misma velocidad Subida/Bajada</h4>
                                    <p className="text-blue-200">Si contratas 500 Megas, descargas a 500 y subes archivos a 500. Perfecto para YouTubers y Freelancers.</p>
                                </div>
                            </li>
                             <li className="flex gap-4">
                                <div className="bg-blue-800 p-3 rounded-lg h-fit">
                                    <Gamepad2 className="w-6 h-6 text-green-400" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg">Ping Ultra Bajo</h4>
                                    <p className="text-blue-200">La conexión directa de fibra óptica reduce el lag en videojuegos competitivos.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="relative">
                        {/* Abstract visual for symmetry */}
                         <div className="bg-gradient-to-t from-green-500 to-blue-500 p-1 rounded-2xl">
                            <div className="bg-slate-900 p-8 rounded-xl text-center">
                                <div className="flex justify-center gap-12 mb-8">
                                    <div className="text-center">
                                        <div className="text-sm text-gray-400 mb-2">BAJADA</div>
                                        <div className="text-4xl font-mono text-green-400">900 Mbps</div>
                                    </div>
                                    <div className="h-16 w-px bg-gray-700"></div>
                                    <div className="text-center">
                                        <div className="text-sm text-gray-400 mb-2">SUBIDA</div>
                                        <div className="text-4xl font-mono text-green-400">900 Mbps</div>
                                    </div>
                                </div>
                                <div className="text-xs text-gray-500 font-mono">TEST DE VELOCIDAD EN TIEMPO REAL</div>
                            </div>
                         </div>
                    </div>
                </div>
             </div>
        </section>
      </div>
    </>
  );
}
