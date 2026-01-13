import type { Metadata } from 'next';
import Link from 'next/link';
import { Wifi, Phone, Tv, CheckCircle2, MapPin, Smartphone, ShieldCheck } from 'lucide-react';
import QuickCallForm from '@/components/QuickCallForm';

export const metadata: Metadata = {
  title: 'Planes Claro Hogar 2026: Precios Internet + TV + Móvil',
  description: 'Lista oficial de precios Internet Claro Hogar 2026. Planes Triple Play desde $99.900, Solo Internet desde $59.900. Cobertura nacional y combos con Netflix/Prime.',
  keywords: [
    'planes claro hogar',
    'internet claro precios',
    'claro triple play tarifas',
    'claro fibra optica cobertura',
    'promociones claro 2026',
    'paquetes claro hogar',
    'claro gaming precio'
  ],
  alternates: {
    canonical: 'https://comparadorinternet.co/planes-claro-colombia',
  },
  openGraph: {
    title: 'Precios Planes Claro Hogar 2026 | Internet y TV',
    description: 'Cotiza tu plan Claro. Fibra óptica y 5G en una sola factura.',
    url: 'https://comparadorinternet.co/planes-claro-colombia',
    siteName: 'Comparador Internet Colombia',
    locale: 'es_CO',
    type: 'article',
  },
};

export default function PlanesClaroPage() {
  return (
    <>
       <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'PriceSpecification',
            price: '59900',
            priceCurrency: 'COP',
            validFrom: '2026-01-01',
            validThrough: '2026-12-31',
            description: 'Plan Internet Claro Hogar 200 Megas'
          }),
        }}
      />

      <div className="min-h-screen bg-slate-50">
        {/* Hero */}
        <section className="bg-gradient-to-r from-red-600 to-red-500 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="max-w-2xl">
                    <div className="inline-block bg-white/20 px-4 py-1 rounded-full text-sm font-semibold mb-6">
                        Mayor Cobertura Nacional
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                        <img src="/images/claro-logo-white.png" alt="Claro Logo" className="h-12 w-auto brightness-0 invert" />
                        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                            Planes Claro Hogar <br/> Precios 2026
                        </h1>
                    </div>
                    <p className="text-xl text-red-100 mb-8">
                        La red de fibra más grande de Colombia. Conoce los paquetes Todo Claro (Fijo + Móvil) y ahorra en tu factura.
                    </p>
                    <div className="flex gap-4">
                        <Link href="#lista-precios" className="bg-white text-red-600 font-bold py-3 px-6 rounded-lg transition-colors shadow-lg hover:bg-gray-100">
                            Ver Paquetes
                        </Link>
                         <Link href="/internet-bogota-cobertura" className="bg-red-700/50 hover:bg-red-700/70 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                            Mapa de Cobertura
                        </Link>
                    </div>
                </div>

                <div className="bg-white text-slate-900 p-6 rounded-2xl shadow-2xl max-w-sm w-full">
                     <div className="text-center mb-4">
                         <span className="bg-red-100 text-red-800 text-xs font-bold px-3 py-1 rounded-full uppercase">Todo Incluido</span>
                    </div>
                    <div className="text-center">
                        <h3 className="text-2xl font-bold mb-2">Internet + TV + Fijo</h3>
                        <div className="text-5xl font-black text-red-600 mb-2">$104.900</div>
                        <p className="text-sm text-slate-500 mb-6">Combo Triple Play Básico</p>
                    </div>
                    <ul className="space-y-3 mb-6 bg-slate-50 p-4 rounded-lg text-sm">
                         <li className="flex gap-2 items-center"><Wifi className="w-4 h-4 text-red-500"/> 300 Megas Internet</li>
                         <li className="flex gap-2 items-center"><Tv className="w-4 h-4 text-red-500"/> TV Digital Plus (HD)</li>
                         <li className="flex gap-2 items-center"><CheckCircle2 className="w-4 h-4 text-red-500"/> Instalación $0 (Estrato 3+)</li>
                    </ul>
                    <QuickCallForm provider="Claro Triple Play" buttonColor="#dc2626" />
                </div>
             </div>
          </div>
        </section>

        {/* Tabla Precios - Segmentado */}
        <section id="lista-precios" className="py-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Elige tu modalidad</h2>
                    <p className="text-slate-600">Claro ofrece descuentos si empaquetas servicios (Todo Claro).</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Solo Internet */}
                    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                        <div className="bg-slate-800 text-white p-4 text-center font-bold">SOLO INTERNET</div>
                        <div className="p-6">
                            <ul className="space-y-6">
                                <li className="flex justify-between items-center pb-4 border-b">
                                    <div>
                                        <div className="font-bold text-lg">200 Megas</div>
                                        <div className="text-xs text-slate-500">Ideal pareja</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-xl text-red-600">$59.900</div>
                                    </div>
                                </li>
                                <li className="flex justify-between items-center pb-4 border-b">
                                    <div>
                                        <div className="font-bold text-lg">350 Megas</div>
                                         <div className="text-xs text-green-600 font-bold">MÁS VENDIDO</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-xl text-red-600">$64.900</div>
                                    </div>
                                </li>
                                <li className="flex justify-between items-center">
                                    <div>
                                        <div className="font-bold text-lg">500 Megas</div>
                                        <div className="text-xs text-slate-500">Gamer / Streaming 4K</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-xl text-red-600">$79.900</div>
                                    </div>
                                </li>
                            </ul>
                            <div className="mt-6 pt-4 border-t border-dashed border-slate-300">
                                <p className="text-xs text-center text-slate-500 mb-4">Incluye Claro Video y Telefonía Local ilimitada</p>
                                <button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3 rounded-lg transition-colors">
                                    Verificar Cobertura Solo Net
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Triple Play */}
                     <div className="bg-white rounded-2xl shadow-lg border-2 border-red-500 overflow-hidden relative">
                        <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">RECOMENDADO</div>
                         <div className="bg-red-600 text-white p-4 text-center font-bold">TRIPLE PLAY (Internet + TV)</div>
                        <div className="p-6">
                            <ul className="space-y-6">
                                <li className="flex justify-between items-center pb-4 border-b">
                                    <div>
                                        <div className="font-bold text-lg">350 Megas + TV</div>
                                        <div className="text-xs text-slate-500">Deco HD incluido</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-xl text-red-600">$109.900</div>
                                    </div>
                                </li>
                                <li className="flex justify-between items-center pb-4 border-b">
                                    <div>
                                        <div className="font-bold text-lg">500 Megas + TV</div>
                                         <div className="text-xs text-slate-500">2 Decos HD</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-xl text-red-600">$129.900</div>
                                    </div>
                                </li>
                                <li className="flex justify-between items-center">
                                    <div>
                                        <div className="font-bold text-lg">900 Megas + TV</div>
                                        <div className="text-xs text-slate-500">Ultra Velocidad</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-xl text-red-600">$159.900</div>
                                    </div>
                                </li>
                            </ul>
                             <div className="mt-6 pt-4 border-t border-dashed border-slate-300">
                                <p className="text-xs text-center text-slate-500 mb-4">Acceso a Paramount+ incluido (ver condiciones)</p>
                                <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors">
                                    Cotizar Triple Play
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Ventajas Claro */}
        <section className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-4">
                 <h2 className="text-3xl font-bold text-center mb-12">¿Por qué elegir Claro Hogar?</h2>
                 <div className="grid md:grid-cols-3 gap-8">
                    <div className="text-center p-6">
                        <MapPin className="w-12 h-12 text-red-600 mx-auto mb-4" />
                        <h3 className="font-bold text-lg mb-2">Cobertura Nacional</h3>
                        <p className="text-slate-600 text-sm">Llega a lugares donde otros no. Presencia en 99% de municipios.</p>
                    </div>
                     <div className="text-center p-6">
                        <Smartphone className="w-12 h-12 text-red-600 mx-auto mb-4" />
                        <h3 className="font-bold text-lg mb-2">Todo Claro</h3>
                        <p className="text-slate-600 text-sm">Recibe más datos en tu celular y más velocidad en casa si tienes postpago Claro.</p>
                    </div>
                     <div className="text-center p-6">
                        <ShieldCheck className="w-12 h-12 text-red-600 mx-auto mb-4" />
                        <h3 className="font-bold text-lg mb-2">Entretenimiento</h3>
                        <p className="text-slate-600 text-sm">Acceso a Claro Video con miles de películas y series sin costo adicional.</p>
                    </div>
                 </div>
            </div>
        </section>

         {/* CTA */}
        <section className="py-16 bg-slate-900 text-white text-center">
             <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-3xl font-bold mb-4">¿Ya tienes celular Claro?</h2>
                <p className="mb-8 text-slate-400">Si activas Claro Hogar, te duplicamos los datos de tu celular y te subimos la velocidad de internet GRATIS.</p>
                <div className="bg-red-600 rounded-2xl p-8 max-w-sm mx-auto shadow-2xl">
                     <p className="font-bold text-lg mb-4">Aprovechar Beneficios Todo Claro</p>
                    <QuickCallForm provider="Todo Claro" />
                </div>
            </div>
        </section>
      </div>
    </>
  );
}
