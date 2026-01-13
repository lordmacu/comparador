import type { Metadata } from 'next';
import Link from 'next/link';
import { Wifi, Tv, Phone, Check, Zap, Info } from 'lucide-react';
import QuickCallForm from '@/components/QuickCallForm';

export const metadata: Metadata = {
    title: 'Planes ETB Hogar Internet y TV: Precios Estrato 2 y 3 (2026)',
    description: 'Consulta los precios actualizados de Internet ETB Fibra Óptica para Estrato 2 y 3. Combos con TV digital, Netflix y HBO incluidos. Velocidades hasta 900 Mbps.',
    keywords: ['planes ETB hogar internet y tv', 'etb internet hogar precios', 'planes etb hogar estrato 3', 'planes etb hogar estrato 2', 'etb duo', 'etb trio'],
};

export default function ETBPlanesPage() {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-black mb-4">
                        Planes ETB Hogar 2026
                    </h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
                        Fibra óptica 100% simétrica con precios especiales para <strong>Estrato 2 y 3</strong>.
                        Elige entre sólo Internet, Dúo (Internet + Telefonía) o Trío (Internet + TV + Teléfono).
                    </p>
                    <div className="flex justify-center">
                        <QuickCallForm buttonColor="#f97316" provider="ETB Planes" />
                    </div>
                </div>
            </section>

            {/* Estratos Badge */}
            <section className="bg-orange-50 border-b border-orange-100 py-3">
                <div className="container mx-auto px-4 text-center text-orange-800 text-sm font-semibold flex items-center justify-center gap-2">
                    <Info size={16} />
                    <span>Precios con IVA incluido sujetos a verificación de cobertura y estrato.</span>
                </div>
            </section>

            {/* Planes Grid */}
            <section className="py-12">
                <div className="container mx-auto px-4 max-w-6xl">

                    {/* Solo Internet */}
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <Wifi className="text-blue-600" /> Internet Fibra (Single)
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6 mb-16">
                        {/* Plan 1 */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:border-blue-500 transition-colors">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">300 Megas</h3>
                            <p className="text-gray-500 text-sm mb-4">Ideal para familias pequeñas</p>
                            <div className="text-4xl font-black text-blue-600 mb-1">$64.900</div>
                            <div className="text-xs text-gray-400 mb-6">/mes (Aprox Estrato 3)</div>
                            <ul className="space-y-2 mb-6 text-sm text-gray-700">
                                <li className="flex gap-2"><Check size={16} className="text-green-500" /> 100% Simétrico</li>
                                <li className="flex gap-2"><Check size={16} className="text-green-500" /> Instalación incluida</li>
                            </ul>
                            <a href="#contacto" className="block text-center bg-gray-100 text-gray-900 font-bold py-3 rounded-lg hover:bg-gray-200">Cotizar ahora</a>
                        </div>
                        {/* Plan 2 */}
                        <div className="bg-white rounded-2xl shadow-lg border-2 border-blue-600 p-6 relative">
                            <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">MAS VENDIDO</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">600 Megas</h3>
                            <p className="text-gray-500 text-sm mb-4">Para teletrabajo y streaming</p>
                            <div className="text-4xl font-black text-blue-600 mb-1">$74.900</div>
                            <div className="text-xs text-gray-400 mb-6">/mes (Aprox Estrato 3)</div>
                            <ul className="space-y-2 mb-6 text-sm text-gray-700">
                                <li className="flex gap-2"><Check size={16} className="text-green-500" /> 100% Simétrico</li>
                                <li className="flex gap-2"><Check size={16} className="text-green-500" /> Puntos cableados extra</li>
                            </ul>
                            <a href="#contacto" className="block text-center bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700">Cotizar ahora</a>
                        </div>
                        {/* Plan 3 */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:border-blue-500 transition-colors">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">900 Megas</h3>
                            <p className="text-gray-500 text-sm mb-4">Gamer / Pro</p>
                            <div className="text-4xl font-black text-blue-600 mb-1">$99.900</div>
                            <div className="text-xs text-gray-400 mb-6">/mes (Aprox Estrato 3)</div>
                            <ul className="space-y-2 mb-6 text-sm text-gray-700">
                                <li className="flex gap-2"><Check size={16} className="text-green-500" /> WiFi 6 (Alta velocidad)</li>
                                <li className="flex gap-2"><Check size={16} className="text-green-500" /> Prioridad de soporte</li>
                            </ul>
                            <a href="#contacto" className="block text-center bg-gray-100 text-gray-900 font-bold py-3 rounded-lg hover:bg-gray-200">Cotizar ahora</a>
                        </div>
                    </div>

                    {/* Duos y Trios */}
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <Tv className="text-orange-500" /> Combos con Televisión (Dúo / Trío)
                    </h2>
                    <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div>
                                <h3 className="text-2xl font-bold mb-4">Entretenimiento Total ETB</h3>
                                <p className="text-gray-600 mb-6">
                                    Lleva la mejor televisión digital con grabación en la nube y tus plataformas de streaming favoritas integradas en la factura.
                                </p>
                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-center gap-3">
                                        <div className="bg-orange-100 p-2 rounded-lg text-orange-600"><Tv size={20} /></div>
                                        <span>Televisión Digital Avanzada (+120 canales)</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><Phone size={20} /></div>
                                        <span>Línea Telefónica Ilimitada Local</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="bg-purple-100 p-2 rounded-lg text-purple-600"><Zap size={20} /></div>
                                        <span>HBO Max o Universal+ (en planes seleccionados)</span>
                                    </li>
                                </ul>
                                <Link href="/contratar" className="inline-block bg-orange-500 text-white font-bold py-3 px-8 rounded-xl hover:bg-orange-600 shadow-lg hover:shadow-orange-500/30 transition-all">
                                    Ver Combos TV
                                </Link>
                            </div>
                            <div className="bg-gray-100 rounded-2xl p-6 text-center">
                                <h4 className="font-bold text-gray-500 mb-4">Precios Combos desde</h4>
                                <div className="text-5xl font-black text-gray-900 mb-2">$95.900</div>
                                <div className="text-sm text-gray-500 mb-6">IVA incluido / mes</div>
                                <p className="text-xs text-gray-400 italic">
                                    *Precio referencia Estrato 3. Puede bajar en Estrato 2 o subir en Estrato 4-6.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* FAQ Precios */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h2 className="text-2xl font-bold mb-8 text-center text-gray-900">
                        Preguntas sobre Precios y Estratos
                    </h2>
                    <div className="space-y-4">
                        <details className="bg-gray-50 rounded-xl p-6 open:bg-blue-50 transition-colors">
                            <summary className="font-bold text-lg cursor-pointer list-none flex justify-between items-center">
                                ¿Cuál es el plan ETB más barato para Estrato 2?
                                <span className="text-blue-600">+</span>
                            </summary>
                            <p className="mt-4 text-gray-600">
                                Los precios en Estrato 2 suelen tener un subsidio o tarifa diferencial. El plan de entrada de 300 Megas
                                puede conseguirse desde aprox. $50.000-$55.000 dependiendo de la zona y promociones vigentes.
                            </p>
                        </details>
                        <details className="bg-gray-50 rounded-xl p-6 open:bg-blue-50 transition-colors">
                            <summary className="font-bold text-lg cursor-pointer list-none flex justify-between items-center">
                                ¿Qué incluye el plan "Solo Internet"?
                                <span className="text-blue-600">+</span>
                            </summary>
                            <p className="mt-4 text-gray-600">
                                Incluye el módem WiFi de última generación, la instalación cableada y una línea telefónica local
                                (que es opcional de usar, pero viene incluída por regulación). No incluye decodificador de TV.
                            </p>
                        </details>
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section id="contacto" className="py-16 bg-blue-900 text-white text-center">
                <div className="container mx-auto px-4 max-w-2xl">
                    <h2 className="text-3xl font-black mb-6">Cotiza tu dirección exacta</h2>
                    <p className="text-lg text-blue-200 mb-8">
                        Déjanos tu número. Te llamamos en 5 minutos para confirmarte cobertura y el precio exacto para tu estrato.
                    </p>
                    <div className="bg-white p-6 rounded-2xl shadow-xl">
                        <QuickCallForm buttonColor="#2563eb" />
                    </div>
                </div>
            </section>

        </div>
    );
}
