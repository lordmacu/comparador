import type { Metadata } from 'next';
import Link from 'next/link';
import { Wifi, Tv, Phone, Check, Zap, Info, Smartphone } from 'lucide-react';
import QuickCallForm from '@/components/QuickCallForm';

export const metadata: Metadata = {
    title: 'Internet Claro Hogar Precios: Planes Estrato 1 y 2 (2026)',
    description: 'Conoce los precios de Internet Claro Hogar 2026. Subsidios para Estrato 1 y 2. Paquetes de Tripleplay con TV, Internet y Telefonía. ¡Llama y cotiza ya!',
    keywords: ['internet hogar claro', 'internet claro hogar precios', 'internet claro estrato 1 y 2', 'planes de internet claro hogar', 'internet claro hogar precios colombia', 'claro tripleplay'],
};

export default function ClaroPlanesPage() {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-red-700 to-red-600 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-black mb-4">
                        Planes Claro Hogar 2026
                    </h1>
                    <p className="text-xl text-red-100 max-w-2xl mx-auto mb-8">
                        La red de mayor cobertura en Colombia. Precios especiales para <strong>Estrato 1 y 2</strong> y combos Tripleplay con todo incluido.
                    </p>
                    <div className="flex justify-center">
                        <QuickCallForm buttonColor="#facc15" provider="Claro Planes" />
                    </div>
                </div>
            </section>

            {/* Estratos Badge */}
            <section className="bg-yellow-50 border-b border-yellow-100 py-3">
                <div className="container mx-auto px-4 text-center text-yellow-800 text-sm font-semibold flex items-center justify-center gap-2">
                    <Info size={16} />
                    <span>¿Buscas subsidios de Estrato 1 y 2? Déjanos tu número para verificar cobertura.</span>
                </div>
            </section>

            {/* Planes Grid */}
            <section className="py-12">
                <div className="container mx-auto px-4 max-w-6xl">

                    {/* Solo Internet */}
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-red-600">
                        <Wifi /> Internet Fibra / HFC
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6 mb-16">
                        {/* Plan 1 */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:border-red-500 transition-colors">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">300 Megas</h3>
                            <p className="text-gray-500 text-sm mb-4">El más económico</p>
                            <div className="text-4xl font-black text-red-600 mb-1">$58.900</div>
                            <div className="text-xs text-gray-400 mb-6">/mes (Ref Estrato 2)</div>
                            <ul className="space-y-2 mb-6 text-sm text-gray-700">
                                <li className="flex gap-2"><Check size={16} className="text-red-500" /> Instalación Gratis (según promo)</li>
                                <li className="flex gap-2"><Check size={16} className="text-red-500" /> Línea fija incluida</li>
                            </ul>
                            <a href="#contacto" className="block text-center bg-gray-100 text-gray-900 font-bold py-3 rounded-lg hover:bg-gray-200">Cotizar este plan</a>
                        </div>
                        {/* Plan 2 */}
                        <div className="bg-white rounded-2xl shadow-lg border-2 border-red-600 p-6 relative">
                            <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">RECOMENDADO</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">500 Megas</h3>
                            <p className="text-gray-500 text-sm mb-4">Velocidad familiar</p>
                            <div className="text-4xl font-black text-red-600 mb-1">$68.900</div>
                            <div className="text-xs text-gray-400 mb-6">/mes (Ref Estrato 3)</div>
                            <ul className="space-y-2 mb-6 text-sm text-gray-700">
                                <li className="flex gap-2"><Check size={16} className="text-red-500" /> Hasta 2 meses gratis</li>
                                <li className="flex gap-2"><Check size={16} className="text-red-500" /> Puntos cableados Ultra WiFi</li>
                            </ul>
                            <a href="#contacto" className="block text-center bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700">Cotizar este plan</a>
                        </div>
                        {/* Plan 3 */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:border-red-500 transition-colors">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">900 Megas</h3>
                            <p className="text-gray-500 text-sm mb-4">Máxima Potencia</p>
                            <div className="text-4xl font-black text-red-600 mb-1">$99.900</div>
                            <div className="text-xs text-gray-400 mb-6">/mes (Ref Estrato 3)</div>
                            <ul className="space-y-2 mb-6 text-sm text-gray-700">
                                <li className="flex gap-2"><Check size={16} className="text-red-500" /> Ideal Gaming y 4K</li>
                                <li className="flex gap-2"><Check size={16} className="text-red-500" /> Privilegios Claro Club</li>
                            </ul>
                            <a href="#contacto" className="block text-center bg-gray-100 text-gray-900 font-bold py-3 rounded-lg hover:bg-gray-200">Cotizar este plan</a>
                        </div>
                    </div>

                    {/* Tripleplay */}
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-red-600">
                        <Tv /> Tripleplay (Todo Incluido)
                    </h2>
                    <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                            <Tv size={200} className="text-red-600" />
                        </div>
                        <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
                            <div>
                                <h3 className="text-2xl font-bold mb-4">Combos Claro Hogar</h3>
                                <p className="text-gray-600 mb-6">
                                    Unifica tus servicios y paga menos en una sola factura. Televisión con Claro Video y Paramount+ incluidos.
                                </p>
                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-center gap-3">
                                        <div className="bg-red-100 p-2 rounded-lg text-red-600"><Tv size={20} /></div>
                                        <span>Claro TV+ (Decodificador Android TV)</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><Phone size={20} /></div>
                                        <span>Línea Fija Ilimitada Local</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="bg-yellow-100 p-2 rounded-lg text-yellow-600"><Smartphone size={20} /></div>
                                        <span>Beneficios Todo Claro (Datos extra en tu móvil)</span>
                                    </li>
                                </ul>
                                <Link href="/contratar" className="inline-block bg-red-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-red-700 shadow-lg hover:shadow-red-500/30 transition-all">
                                    Quiero un Combo Tripleplay
                                </Link>
                            </div>
                            <div className="bg-gray-100 rounded-2xl p-6 text-center border-l-4 border-red-600">
                                <h4 className="font-bold text-gray-500 mb-4">Precios Combos desde</h4>
                                <div className="text-5xl font-black text-gray-900 mb-2">$101.900</div>
                                <div className="text-sm text-gray-500 mb-6">IVA incluido / mes</div>
                                <p className="text-xs text-gray-400 italic">
                                    *El precio varía según estrato y ciudad. Déjanos tus datos para validar tu tarifa exacta.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* FAQ */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h2 className="text-2xl font-bold mb-8 text-center text-gray-900">
                        Dudas Comunes sobre Precios Claro
                    </h2>
                    <div className="space-y-4">
                        <details className="bg-gray-50 rounded-xl p-6 open:bg-red-50 transition-colors">
                            <summary className="font-bold text-lg cursor-pointer list-none flex justify-between items-center">
                                ¿Tienen planes para Estrato 1 y 2?
                                <span className="text-red-600">+</span>
                            </summary>
                            <p className="mt-4 text-gray-600">
                                Sí, Claro ofrece tarifas diferenciales para estratos 1 y 2 en muchas zonas de Colombia.
                                Es necesario validar con tu cédula y dirección exacta para aplicar al descuento.
                            </p>
                        </details>
                        <details className="bg-gray-50 rounded-xl p-6 open:bg-red-50 transition-colors">
                            <summary className="font-bold text-lg cursor-pointer list-none flex justify-between items-center">
                                ¿Cómo activar el beneficio "Todo Claro"?
                                <span className="text-red-600">+</span>
                            </summary>
                            <p className="mt-4 text-gray-600">
                                Al contratar tus servicios de hogar y tener una línea móvil Claro pospago, recibes hasta 50% más de datos
                                en tu celular y mayor velocidad en casa. ¡Pregunta a nuestro asesor por esta promoción!
                            </p>
                        </details>
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section id="contacto" className="py-16 bg-red-800 text-white text-center">
                <div className="container mx-auto px-4 max-w-2xl">
                    <h2 className="text-3xl font-black mb-6">¿Quieres contratar Claro Hogar?</h2>
                    <p className="text-lg text-red-200 mb-8">
                        Somos asesores autorizados. Te ayudamos a encontrar la mejor promoción y agendamos tu instalación.
                    </p>
                    <div className="bg-white p-6 rounded-2xl shadow-xl">
                        <QuickCallForm buttonColor="#dc2626" />
                    </div>
                </div>
            </section>

        </div>
    );
}
