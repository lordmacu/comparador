import type { Metadata } from 'next';
import Link from 'next/link';
import { Wifi, Tv, PhoneOff, CheckCircle2, TrendingDown, Youtube, MinusCircle, DollarSign } from 'lucide-react';
import QuickCallForm from '@/components/QuickCallForm';

export const metadata: Metadata = {
  title: 'Internet Solo Hogar Bogotá | Planes Sin Teléfono ni TV',
  description: '¿Buscas solo internet? Ahorra hasta 40% contratando planes "Naked" (Solo Internet). Ideal para ver Netflix/YouTube. ETB, Movistar y Claro sin línea telefónica.',
  keywords: [
    'internet solo hogar',
    'internet sin linea telefonica',
    'planes solo internet bogota',
    'internet sin tv',
    'internet naked colombia',
    'internet solo fibra optica',
    'planes internet sin relleno',
    'internet para streaming',
    'internet mas barato sin telefono'
  ],
  alternates: {
    canonical: 'https://comparadorinternet.co/internet-solo-sin-telefono',
  },
  openGraph: {
    title: 'Planes Solo Internet (Sin TV ni Teléfono) | Ahorra Dinero',
    description: 'Paga solo por lo que usas. Conecta tu Smart TV y celulares con pura Fibra Óptica.',
    url: 'https://comparadorinternet.co/internet-solo-sin-telefono',
    siteName: 'Comparador Internet Colombia',
    locale: 'es_CO',
    type: 'article',
  },
};

export default function InternetSoloPage() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        {/* Hero */}
        <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Wifi className="w-5 h-5" />
                <span className="font-semibold">Tendencia "Cord Cutting" 2026</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Planes <span className="text-yellow-300">Solo Internet</span>
                <br /><span className="text-2xl md:text-4xl font-normal opacity-90">Sin TV. Sin Teléfono Fijo. Sin Relleno.</span>
              </h1>

              <p className="text-xl md:text-2xl text-indigo-100 mb-8">
                ¿Para qué pagar por canales que no ves o un fijo que no usas? Pásate a planes puros de Fibra Óptica y ahorra.
              </p>
              
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 max-w-2xl mx-auto flex justify-center gap-8 md:gap-16">
                 <div className="text-center opacity-50 line-through decoration-red-500 decoration-4">
                    <Tv className="w-12 h-12 mx-auto mb-2" />
                    <span>TV Cable</span>
                 </div>
                 <div className="text-center opacity-50 line-through decoration-red-500 decoration-4">
                    <PhoneOff className="w-12 h-12 mx-auto mb-2" />
                    <span>Teléfono Fijo</span>
                 </div>
                 <div className="text-center transform scale-125 font-bold text-yellow-300">
                    <Wifi className="w-12 h-12 mx-auto mb-2" />
                    <span>100% Internet</span>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* Por qué elegir Solo Internet */}
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Por qué contratar "Solo Internet"?</h2>
                    <p className="text-xl text-gray-600">El modelo Triple Play (Internet+TV+Voz) está obsoleto para muchos usuarios.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-green-50 p-8 rounded-2xl">
                        <DollarSign className="w-10 h-10 text-green-600 mb-4" />
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Ahorro Mensual</h3>
                        <p className="text-gray-700">Evita pagar $30.000 - $50.000 extra al mes por decodificadores y línea telefónica que solo acumulan polvo.</p>
                    </div>
                    <div className="bg-red-50 p-8 rounded-2xl">
                        <Youtube className="w-10 h-10 text-red-600 mb-4" />
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Era del Streaming</h3>
                        <p className="text-gray-700">Con Netflix, Disney+, YouTube y TikTok, ¿quién necesita 200 canales de relleno? Invierte ese dinero en más velocidad.</p>
                    </div>
                    <div className="bg-blue-50 p-8 rounded-2xl">
                        <TrendingDown className="w-10 h-10 text-blue-600 mb-4" />
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Factura Simple</h3>
                        <p className="text-gray-700">Sin cargos sorpresa por "minutos extra" o "alquiler de decodificadores". Una tarifa plana, limpia y predecible.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Comparativa Precios */}
        <section className="py-16 bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">🤑 Comparativa: Solo Internet vs Triple Play</h2>
                
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="grid grid-cols-2 text-center border-b border-gray-200">
                        <div className="p-6 bg-indigo-600 text-white">
                            <h3 className="text-xl font-bold">Solo Internet</h3>
                            <p className="text-sm opacity-90">Lo que necesitas</p>
                        </div>
                        <div className="p-6 bg-gray-100 text-gray-500">
                            <h3 className="text-xl font-bold">Triple Play</h3>
                            <p className="text-sm">Lo tradicional</p>
                        </div>
                    </div>
                    
                    <div className="divide-y divide-gray-100">
                        <div className="grid grid-cols-2 p-6 items-center hover:bg-gray-50">
                            <div className="text-center font-bold text-gray-800">300 Megas</div>
                            <div className="text-center text-gray-500">300 Megas</div>
                        </div>
                        <div className="grid grid-cols-2 p-6 items-center hover:bg-gray-50">
                            <div className="text-center font-bold text-green-600 flex items-center justify-center gap-2">
                                <MinusCircle size={16} /> Sin TV
                            </div>
                            <div className="text-center text-gray-500 text-sm">TV Básica (Canales nacionales)</div>
                        </div>
                        <div className="grid grid-cols-2 p-6 items-center hover:bg-gray-50">
                             <div className="text-center font-bold text-green-600 flex items-center justify-center gap-2">
                                <MinusCircle size={16} /> Sin Teléfono
                            </div>
                            <div className="text-center text-gray-500 text-sm">Línea Fija Ilimitada</div>
                        </div>
                        <div className="grid grid-cols-2 p-8 items-center bg-gray-50">
                            <div className="text-center">
                                <div className="text-3xl font-black text-indigo-600">$59.900</div>
                                <div className="text-xs text-gray-500">/mes (Promedio)</div>
                            </div>
                            <div className="text-center opacity-60">
                                <div className="text-2xl font-bold text-gray-600 line-through decoration-red-500">$105.900</div>
                                <div className="text-xs text-gray-500">/mes (Promedio)</div>
                            </div>
                        </div>
                         <div className="p-4 bg-yellow-50 text-center text-yellow-800 font-semibold border-t border-yellow-100">
                            ¡Ahorras más de $550.000 al año!
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Wifi className="w-16 h-16 mx-auto mb-6" />

            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pásate a Solo Internet Hoy
            </h2>

            <p className="text-xl text-indigo-100 mb-8">
              Deja de pagar por servicios que no usas. Te conseguimos el plan de internet puro más rápido y barato.
            </p>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md mx-auto mb-8">
              <QuickCallForm provider="Solo Internet" />
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
                <Link href="/planes" className="text-white underline hover:text-indigo-200">Ver planes disponibles</Link>
                <Link href="/etb" className="text-white underline hover:text-indigo-200">Planes ETB</Link>
                <Link href="/movistar" className="text-white underline hover:text-indigo-200">Planes Movistar</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
