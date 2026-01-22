import type { Metadata } from 'next';
import Link from 'next/link';
import { Wifi, CheckCircle2 } from 'lucide-react';
import QuickCallForm from '@/components/QuickCallForm';

export const metadata: Metadata = {
  title: 'Planes ETB Bogotá 2026 | Precios de Internet Fibra Óptica',
  description: 'Lista de precios de referencia ETB Hogar en Bogotá. Planes solo internet con fibra óptica simétrica. Promos desde $41.930 y velocidad hasta 910 Mb.',
  keywords: [
    'planes etb bogota',
    'precios internet etb',
    'etb hogar tarifas',
    'fibra optica etb precios',
    'etb 200 megas precio',
    'promociones etb 2026',
    'etb solo internet',
    'etb fibra bogota'
  ],
  alternates: {
    canonical: 'https://comparadorinternet.co/planes-etb-bogota',
  },
  openGraph: {
    title: 'Precios Planes ETB Hogar Bogotá 2026 | Fibra Óptica',
    description: 'Tarifas oficiales y descuentos de ETB. Internet desde $41.930.',
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
            price: '41930',
            priceCurrency: 'COP',
            validFrom: '2026-01-01',
            validThrough: '2026-12-31',
            description: 'Plan Internet Fibra Óptica ETB 200 Mb (promo Bogotá)'
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
                        <img src="/images/etb-logo.svg" alt="ETB Logo" className="h-12 w-auto" />
                        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                            Planes y Precios <br/> ETB Hogar
                        </h1>
                    </div>
                    <p className="text-xl text-blue-100 mb-8">
                        Conoce la lista completa de precios de la Fibra Óptica de Bogotá. Desde $41.930 (200 Mb) hasta 910 Mb con velocidad simétrica.
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
                        <h3 className="text-2xl font-bold mb-2">Plan 200 Mb</h3>
                        <div className="text-5xl font-black text-blue-600 mb-2">$41.930</div>
                        <p className="text-sm text-slate-500 mb-2">Promo mes 1 al 6 (Bogotá estratos 2-3)</p>
                        <p className="text-xs text-slate-400 mb-6">Tarifa plena $59.900/mes</p>
                    </div>
                    <ul className="space-y-3 mb-6 bg-slate-50 p-4 rounded-lg text-sm">
                        <li className="flex gap-2 items-center"><CheckCircle2 className="w-4 h-4 text-green-500"/> Fibra Óptica Simétrica</li>
                        <li className="flex gap-2 items-center"><CheckCircle2 className="w-4 h-4 text-green-500"/> DGO y/o Universal+ primer mes sin costo</li>
                        <li className="flex gap-2 items-center"><CheckCircle2 className="w-4 h-4 text-green-500"/> Win Play y/o Hot Go 50% meses 1 y 2</li>
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
                    <p className="text-slate-600">Precios vigentes para Bogotá y municipios cercanos. Promos según estrato y zona.</p>
                </div>

                <div className="space-y-10">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
                        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
                            <h3 className="text-lg font-bold text-slate-900">Solo Internet</h3>
                            <p className="text-sm text-slate-500">Fibra óptica simétrica con precios por estrato.</p>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-slate-100 text-slate-700">
                                    <tr>
                                        <th className="p-4 font-bold uppercase text-xs tracking-wider">Plan</th>
                                        <th className="p-4 font-bold uppercase text-xs tracking-wider">Estrato / Zona</th>
                                        <th className="p-4 font-bold uppercase text-xs tracking-wider">Precio promo</th>
                                        <th className="p-4 font-bold uppercase text-xs tracking-wider">Tarifa plena</th>
                                        <th className="p-4 font-bold uppercase text-xs tracking-wider">Vigencia</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    <tr className="hover:bg-blue-50/30 transition-colors">
                                        <td className="p-4 font-semibold text-blue-700">Internet 200 Mb</td>
                                        <td className="p-4 text-sm text-slate-600">Bogotá estratos 2-3</td>
                                        <td className="p-4 font-semibold">$41.930 (mes 1-6)</td>
                                        <td className="p-4">$59.900</td>
                                        <td className="p-4 text-sm text-slate-500">6 meses</td>
                                    </tr>
                                    <tr className="hover:bg-blue-50/30 transition-colors">
                                        <td className="p-4 font-semibold text-blue-700">Internet 200 Mb</td>
                                        <td className="p-4 text-sm text-slate-600">Municipios estratos 1-6</td>
                                        <td className="p-4 font-semibold">$39.534 (mes 1-12)</td>
                                        <td className="p-4">$59.900</td>
                                        <td className="p-4 text-sm text-slate-500">12 meses</td>
                                    </tr>
                                    <tr className="hover:bg-blue-50/30 transition-colors">
                                        <td className="p-4 font-semibold text-blue-700">Internet 910 Mb</td>
                                        <td className="p-4 text-sm text-slate-600">Estratos 1-3</td>
                                        <td className="p-4 font-semibold">$62.930 (mes 1-12)</td>
                                        <td className="p-4">$89.900</td>
                                        <td className="p-4 text-sm text-slate-500">12 meses</td>
                                    </tr>
                                    <tr className="hover:bg-blue-50/30 transition-colors">
                                        <td className="p-4 font-semibold text-blue-700">Internet 910 Mb</td>
                                        <td className="p-4 text-sm text-slate-600">Estratos 4-6</td>
                                        <td className="p-4 font-semibold">$69.930 (mes 1-12)</td>
                                        <td className="p-4">$99.900</td>
                                        <td className="p-4 text-sm text-slate-500">12 meses</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="px-6 py-4 text-xs text-slate-500">
                            Incluye: DGO y/o Universal+ primer mes sin costo; Win Play y/o Hot Go 50% meses 1 y 2.
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
                        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
                            <h3 className="text-lg font-bold text-slate-900">Internet + Apps (910 Mb)</h3>
                            <p className="text-sm text-slate-500">Elige DGO Pass, HBO Max, Win Play o Universal+.</p>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-slate-100 text-slate-700">
                                    <tr>
                                        <th className="p-4 font-bold uppercase text-xs tracking-wider">Plan</th>
                                        <th className="p-4 font-bold uppercase text-xs tracking-wider">Estrato</th>
                                        <th className="p-4 font-bold uppercase text-xs tracking-wider">Precio promo</th>
                                        <th className="p-4 font-bold uppercase text-xs tracking-wider">Tarifa plena</th>
                                        <th className="p-4 font-bold uppercase text-xs tracking-wider">Vigencia</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    <tr className="hover:bg-blue-50/30 transition-colors">
                                        <td className="p-4 font-semibold text-blue-700">910 Mb + 1 App</td>
                                        <td className="p-4 text-sm text-slate-600">Estratos 1-3</td>
                                        <td className="p-4 font-semibold">$83.930 (mes 1-12)</td>
                                        <td className="p-4">$119.900</td>
                                        <td className="p-4 text-sm text-slate-500">12 meses</td>
                                    </tr>
                                    <tr className="hover:bg-blue-50/30 transition-colors">
                                        <td className="p-4 font-semibold text-blue-700">910 Mb + 1 App</td>
                                        <td className="p-4 text-sm text-slate-600">Estratos 4-6</td>
                                        <td className="p-4 font-semibold">$90.930 (mes 1-12)</td>
                                        <td className="p-4">$129.900</td>
                                        <td className="p-4 text-sm text-slate-500">12 meses</td>
                                    </tr>
                                    <tr className="hover:bg-blue-50/30 transition-colors">
                                        <td className="p-4 font-semibold text-blue-700">910 Mb + 2 Apps</td>
                                        <td className="p-4 text-sm text-slate-600">Estratos 1-3</td>
                                        <td className="p-4 font-semibold">$97.930 (mes 1-12)</td>
                                        <td className="p-4">$139.900</td>
                                        <td className="p-4 text-sm text-slate-500">12 meses</td>
                                    </tr>
                                    <tr className="hover:bg-blue-50/30 transition-colors">
                                        <td className="p-4 font-semibold text-blue-700">910 Mb + 2 Apps</td>
                                        <td className="p-4 text-sm text-slate-600">Estratos 4-6</td>
                                        <td className="p-4 font-semibold">$104.930 (mes 1-12)</td>
                                        <td className="p-4">$149.900</td>
                                        <td className="p-4 text-sm text-slate-500">12 meses</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
                        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
                            <h3 className="text-lg font-bold text-slate-900">Internet + TV (910 Mb)</h3>
                            <p className="text-sm text-slate-500">TV Básica (55 canales), TV Plus (100+ canales) y Telefonía local ilimitada.</p>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-slate-100 text-slate-700">
                                    <tr>
                                        <th className="p-4 font-bold uppercase text-xs tracking-wider">Plan</th>
                                        <th className="p-4 font-bold uppercase text-xs tracking-wider">Estrato</th>
                                        <th className="p-4 font-bold uppercase text-xs tracking-wider">Precio promo</th>
                                        <th className="p-4 font-bold uppercase text-xs tracking-wider">Tarifa plena</th>
                                        <th className="p-4 font-bold uppercase text-xs tracking-wider">Vigencia</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    <tr className="hover:bg-blue-50/30 transition-colors">
                                        <td className="p-4 font-semibold text-blue-700">TV Básica</td>
                                        <td className="p-4 text-sm text-slate-600">Estratos 2-3</td>
                                        <td className="p-4 font-semibold">$76.930 (mes 1-6)</td>
                                        <td className="p-4">$109.900</td>
                                        <td className="p-4 text-sm text-slate-500">6 meses</td>
                                    </tr>
                                    <tr className="hover:bg-blue-50/30 transition-colors">
                                        <td className="p-4 font-semibold text-blue-700">TV Básica</td>
                                        <td className="p-4 text-sm text-slate-600">Estratos 4-6</td>
                                        <td className="p-4 font-semibold">$83.930 (mes 1-6)</td>
                                        <td className="p-4">$119.900</td>
                                        <td className="p-4 text-sm text-slate-500">6 meses</td>
                                    </tr>
                                    <tr className="hover:bg-blue-50/30 transition-colors">
                                        <td className="p-4 font-semibold text-blue-700">TV Plus</td>
                                        <td className="p-4 text-sm text-slate-600">Estratos 2-3</td>
                                        <td className="p-4 font-semibold">$104.930 (mes 1-6)</td>
                                        <td className="p-4">$149.900</td>
                                        <td className="p-4 text-sm text-slate-500">6 meses</td>
                                    </tr>
                                    <tr className="hover:bg-blue-50/30 transition-colors">
                                        <td className="p-4 font-semibold text-blue-700">TV Plus</td>
                                        <td className="p-4 text-sm text-slate-600">Estratos 4-6</td>
                                        <td className="p-4 font-semibold">$111.930 (mes 1-6)</td>
                                        <td className="p-4">$159.900</td>
                                        <td className="p-4 text-sm text-slate-500">6 meses</td>
                                    </tr>
                                    <tr className="hover:bg-blue-50/30 transition-colors">
                                        <td className="p-4 font-semibold text-blue-700">TV Plus + Telefonía</td>
                                        <td className="p-4 text-sm text-slate-600">Estratos 2-3</td>
                                        <td className="p-4 font-semibold">$118.930 (mes 1-6)</td>
                                        <td className="p-4">$169.900</td>
                                        <td className="p-4 text-sm text-slate-500">6 meses</td>
                                    </tr>
                                    <tr className="hover:bg-blue-50/30 transition-colors">
                                        <td className="p-4 font-semibold text-blue-700">TV Plus + Telefonía</td>
                                        <td className="p-4 text-sm text-slate-600">Estratos 4-6</td>
                                        <td className="p-4 font-semibold">$125.930 (mes 1-6)</td>
                                        <td className="p-4">$179.900</td>
                                        <td className="p-4 text-sm text-slate-500">6 meses</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="px-6 py-4 text-xs text-slate-500">
                            Incluye 1 deco, Grabar y Retroceder por 12 meses y beneficios en apps durante meses 1 y 2.
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
                        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
                            <h3 className="text-lg font-bold text-slate-900">Internet 200 Mb + DGO Pass</h3>
                            <p className="text-sm text-slate-500">Aplica para Bogotá estratos 2-3 y municipios estratos 1-6.</p>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-slate-100 text-slate-700">
                                    <tr>
                                        <th className="p-4 font-bold uppercase text-xs tracking-wider">Plan</th>
                                        <th className="p-4 font-bold uppercase text-xs tracking-wider">Precio promo</th>
                                        <th className="p-4 font-bold uppercase text-xs tracking-wider">Tarifa plena</th>
                                        <th className="p-4 font-bold uppercase text-xs tracking-wider">Vigencia</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    <tr className="hover:bg-blue-50/30 transition-colors">
                                        <td className="p-4 font-semibold text-blue-700">200 Mb + DGO Pass</td>
                                        <td className="p-4 font-semibold">$55.930 (mes 1-6)</td>
                                        <td className="p-4">$79.900</td>
                                        <td className="p-4 text-sm text-slate-500">Internet 6 meses / DGO 2 meses</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="px-6 py-4 text-xs text-slate-500">
                            Incluye Universal+ primer mes sin costo y Win Play y/o Hot Go 50% meses 1 y 2.
                        </div>
                    </div>
                </div>

                <div className="mt-8 grid md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                        <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-3">
                            <CheckCircle2 className="w-5 h-5 text-blue-600" />
                            Instalación y cobertura
                        </h3>
                        <p className="text-slate-600 text-sm">
                            La cobertura varía por barrio y edificio. Compártenos tu dirección y confirmamos disponibilidad de fibra antes de agendar la instalación.
                        </p>
                    </div>
                     <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                        <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-3">
                            <Wifi className="w-5 h-5 text-blue-600" />
                            WiFi 360 (opcional)
                        </h3>
                        <p className="text-slate-600 text-sm">
                            Si tu casa es grande o hay paredes gruesas, pregunta por extensores/mesh disponibles según plan para mejorar la señal.
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
                        <div className="text-lg md:text-2xl mt-2">$41.930</div>
                        <div className="text-xs font-normal">200 Mb</div>
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
                <h2 className="text-3xl font-bold mb-4">¿Te interesa el plan de $41.930?</h2>
                <p className="mb-8 text-blue-200">Verificamos cobertura en tu dirección en tiempo real. ETB es la opción más económica de Bogotá.</p>
                <div className="bg-white/10 backdrop-blur rounded-2xl p-8 max-w-sm mx-auto">
                    <QuickCallForm provider="Plan ETB 200 Mb" />
                </div>
            </div>
        </section>
      </div>
    </>
  );
}
