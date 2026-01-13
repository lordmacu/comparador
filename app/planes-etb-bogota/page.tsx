import type { Metadata } from 'next';
import Link from 'next/link';
import { Wifi, Phone, Tv, CheckCircle2, AlertCircle, TrendingDown, DollarSign } from 'lucide-react';
import QuickCallForm from '@/components/QuickCallForm';

export const metadata: Metadata = {
  title: 'Planes ETB Bogotá 2026 | Precios de Internet Fibra Óptica',
  description: 'Lista de precios actualizada ETB Hogar. Planes solo internet desde $42.000, Dúos y Tríos. Compara la fibra óptica de ETB vs Claro y Movistar. Promociones vigentes.',
  keywords: [
    'planes etb bogota',
    'precios internet etb',
    'etb hogar tarifas',
    'fibra optica etb precios',
    'etb 300 megas precio',
    'promociones etb 2026',
    'etb internet mas telefonia',
    'etb triple play precio'
  ],
  alternates: {
    canonical: 'https://comparadorinternet.co/planes-etb-bogota',
  },
  openGraph: {
    title: 'Precios Planes ETB Hogar Bogotá 2026 | Fibra Óptica',
    description: 'Tarifas oficiales y descuentos ocultos de ETB. Internet desde $42k.',
    url: 'https://comparadorinternet.co/planes-etb-bogota',
    siteName: 'Comparador Internet Colombia',
    locale: 'es_CO',
    type: 'article',
  },
};

export default function PlanesEtbPage() {
  return (
    <>
       <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'PriceSpecification',
            price: '42000',
            priceCurrency: 'COP',
            validFrom: '2026-01-01',
            validThrough: '2026-12-31',
            description: 'Plan Internet Fibra Óptica ETB 300 Megas'
          }),
        }}
      />

      <div className="min-h-screen bg-slate-50">
        {/* Hero */}
        <section className="bg-gradient-to-r from-blue-700 to-sky-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="max-w-2xl">
                    <div className="inline-block bg-white/20 px-4 py-1 rounded-full text-sm font-semibold mb-6">
                        Tarifas Oficiales Enero 2026
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                        <img src="/images/etb-logo-white.png" alt="ETB Logo" className="h-12 w-auto brightness-0 invert" />
                        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                            Planes y Precios <br/> ETB Hogar
                        </h1>
                    </div>
                    <p className="text-xl text-blue-100 mb-8">
                        Conoce la lista completa de precios de la Fibra Óptica de Bogotá. Desde planes básicos de $42k hasta simétricos de 900 Megas.
                    </p>
                    <div className="flex gap-4">
                        <Link href="#lista-precios" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-lg">
                            Ver Tabla de Precios
                        </Link>
                        <Link href="/instalacion-internet-bogota" className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                            Info Instalación
                        </Link>
                    </div>
                </div>
                <div className="bg-white text-slate-900 p-6 rounded-2xl shadow-2xl max-w-sm w-full">
                    <div className="text-center mb-4">
                         <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full uppercase">Oferta Destacada</span>
                    </div>
                    <div className="text-center">
                        <h3 className="text-2xl font-bold mb-2">Plan 300 Megas</h3>
                        <div className="text-5xl font-black text-blue-600 mb-2">$42.000</div>
                        <p className="text-sm text-slate-500 mb-6">Precio fijo por 12 meses</p>
                    </div>
                    <ul className="space-y-3 mb-6 bg-slate-50 p-4 rounded-lg text-sm">
                        <li className="flex gap-2 items-center"><CheckCircle2 className="w-4 h-4 text-green-500"/> Fibra Óptica Simétrica</li>
                        <li className="flex gap-2 items-center"><CheckCircle2 className="w-4 h-4 text-green-500"/> Instalación Gratis (Estrato 3-6)</li>
                        <li className="flex gap-2 items-center"><CheckCircle2 className="w-4 h-4 text-green-500"/> Sin Cláusula Permanencia</li>
                    </ul>
                    <QuickCallForm provider="ETB Planes" />
                </div>
            </div>
          </div>
        </section>

        {/* Tabla Completa de Precios */}
        <section id="lista-precios" className="py-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Tabla de Tarifas ETB 2026</h2>
                    <p className="text-slate-600">Precios vigentes para Bogotá y Soacha (Estratos 3, 4, 5 y 6).</p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-slate-100 text-slate-700">
                                <tr>
                                    <th className="p-6 font-bold uppercase text-xs tracking-wider">Plan</th>
                                    <th className="p-6 font-bold uppercase text-xs tracking-wider">Bajada / Subida</th>
                                    <th className="p-6 font-bold uppercase text-xs tracking-wider">Precio Mensual</th>
                                    <th className="p-6 font-bold uppercase text-xs tracking-wider">Incluye</th>
                                    <th className="p-6 font-bold uppercase text-xs tracking-wider">Acción</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {/* Plan 1 */}
                                <tr className="hover:bg-blue-50/30 transition-colors">
                                    <td className="p-6">
                                        <div className="font-bold text-blue-700">Silver 300</div>
                                        <div className="text-xs text-orange-500 font-bold">MÁS BARATO</div>
                                    </td>
                                    <td className="p-6 font-medium">300 / 300 Mbps</td>
                                    <td className="p-6">
                                        <div className="font-black text-xl text-slate-900">$42.000</div>
                                    </td>
                                    <td className="p-6 text-sm text-slate-600">
                                        <div className="flex items-center gap-1"><Wifi className="w-3 h-3"/> WiFi 5</div>
                                    </td>
                                    <td className="p-6">
                                        <Link href="/contratar" className="inline-block bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded hover:bg-blue-700">Checkear</Link>
                                    </td>
                                </tr>
                                {/* Plan 2 */}
                                <tr className="hover:bg-blue-50/30 transition-colors bg-blue-50/20">
                                    <td className="p-6">
                                        <div className="font-bold text-blue-700">Gold 600</div>
                                        <div className="text-xs text-green-600 font-bold">MEJOR VALOR</div>
                                    </td>
                                    <td className="p-6 font-medium">600 / 600 Mbps</td>
                                    <td className="p-6">
                                        <div className="font-black text-xl text-slate-900">$59.900</div>
                                    </td>
                                    <td className="p-6 text-sm text-slate-600">
                                        <div className="flex items-center gap-1"><Wifi className="w-3 h-3"/> WiFi 6 + Extensor</div>
                                    </td>
                                    <td className="p-6">
                                        <Link href="/contratar" className="inline-block bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded hover:bg-blue-700">Checkear</Link>
                                    </td>
                                </tr>
                                 {/* Plan 3 */}
                                <tr className="hover:bg-blue-50/30 transition-colors">
                                    <td className="p-6">
                                        <div className="font-bold text-blue-700">Black 900</div>
                                        <div className="text-xs text-purple-600 font-bold">GAMING</div>
                                    </td>
                                    <td className="p-6 font-medium">900 / 900 Mbps</td>
                                    <td className="p-6">
                                        <div className="font-black text-xl text-slate-900">$85.900</div>
                                    </td>
                                    <td className="p-6 text-sm text-slate-600">
                                        <div className="flex items-center gap-1"><Wifi className="w-3 h-3"/> WiFi 6 Pro</div>
                                    </td>
                                    <td className="p-6">
                                        <Link href="/contratar" className="inline-block bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded hover:bg-blue-700">Checkear</Link>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mt-8 grid md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                        <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-3">
                            <Phone className="w-5 h-5 text-blue-600" />
                            ¿Línea Telefónica?
                        </h3>
                        <p className="text-slate-600 text-sm">
                            Todos los planes incluyen línea telefónica local ilimitada GRATIS. No es obligatoria conectarla, pero viene en el paquete.
                        </p>
                    </div>
                     <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                        <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-3">
                            <Tv className="w-5 h-5 text-blue-600" />
                            ¿Televisión?
                        </h3>
                        <p className="text-slate-600 text-sm">
                            Puedes adicionar TV Digital por +$30.000/mes. Incluye Win Sports+ (costo adicional) y canales HD.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        {/* Comparativa vs Competencia */}
        <section className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-bold text-center mb-8">ETB vs La Competencia (Solo Internet)</h2>
                <div className="grid grid-cols-3 gap-2 text-center text-sm">
                    <div className="col-span-1 p-4 bg-blue-50 rounded-l-lg font-bold text-blue-800 border border-blue-100">
                        ETB
                        <div className="text-lg md:text-2xl mt-2">$42.000</div>
                        <div className="text-xs font-normal">300 Mbps</div>
                    </div>
                    <div className="col-span-1 p-4 bg-gray-50 border border-gray-100">
                        Claro
                        <div className="text-lg md:text-2xl mt-2 text-gray-500">$59.900</div>
                        <div className="text-xs font-normal">200 Mbps</div>
                    </div>
                    <div className="col-span-1 p-4 bg-gray-50 rounded-r-lg border border-gray-100">
                        Movistar
                        <div className="text-lg md:text-2xl mt-2 text-gray-500">$59.900</div>
                        <div className="text-xs font-normal">300 Mbps</div>
                    </div>
                </div>
                <p className="text-center text-xs text-slate-500 mt-4">* Precio y velocidad para planes de entrada en Bogotá.</p>
            </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-blue-900 text-white text-center">
            <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-3xl font-bold mb-4">¿Te interesa el plan de $42.000?</h2>
                <p className="mb-8 text-blue-200">Verificamos cobertura en tu dirección en tiempo real. ETB es la opción más económica de Bogotá.</p>
                <div className="bg-white/10 backdrop-blur rounded-2xl p-8 max-w-sm mx-auto">
                    <QuickCallForm provider="Plan ETB 42k" />
                </div>
            </div>
        </section>
      </div>
    </>
  );
}
