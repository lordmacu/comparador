import type { Metadata } from 'next';
import Link from 'next/link';
import { Wifi, Tv, Phone, Check, Zap, Info, Smartphone } from 'lucide-react';
import QuickCallForm from '@/components/QuickCallForm';

export const metadata: Metadata = {
    title: {
        absolute: 'Movistar Internet Hogar Precios: Planes con TV y Netflix (2026)'
    },
    description: 'Precios actualizados de Movistar Fibra Óptica 2026. Planes desde $49.990 con 50% de descuento en meses seleccionados. Internet + TV + Telefonía.',
    keywords: ['movistar internet hogar precios', 'planes movistar hogar internet y tv', 'movistar internet hogar precios colombia', 'movistar fibra optica bogota'],
};

export default function MovistarPlanesPage() {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-500 to-green-400 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-black mb-4">
                        Planes Movistar Fibra 2026
                    </h1>
                    <p className="text-xl text-blue-900 font-medium max-w-2xl mx-auto mb-8">
                        La fibra óptica más rápida según Ookla. Compra 2 y recibe descuentos exclusivos online.
                    </p>
                    <div className="flex justify-center">
                        <QuickCallForm buttonColor="#019df4" provider="Movistar Planes" />
                    </div>
                </div>
            </section>

            {/* Promo Badge */}
            <section className="bg-blue-900 py-3">
                <div className="container mx-auto px-4 text-center text-white text-sm font-bold flex items-center justify-center gap-2">
                    <Zap size={16} className="text-yellow-400" />
                    <span>Oferta Web: Compra hoy y recibe instalación prioritaria en 24h.</span>
                </div>
            </section>

            {/* Planes Grid */}
            <section className="py-12">
                <div className="container mx-auto px-4 max-w-6xl">

                    {/* Solo Internet */}
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-blue-600">
                        <Wifi /> Fibra Simétrica
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6 mb-16">
                        {/* Plan 1 */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:border-blue-500 transition-colors">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">500 Megas</h3>
                            <p className="text-gray-500 text-sm mb-4">Fibra básica</p>
                            <div className="text-4xl font-black text-blue-600 mb-1">$72.990</div>
                            <div className="text-xs text-gray-400 mb-6">/mes</div>
                            <ul className="space-y-2 mb-6 text-sm text-gray-700">
                                <li className="flex gap-2"><Check size={16} className="text-green-500" /> Simetría Total</li>
                                <li className="flex gap-2"><Check size={16} className="text-green-500" /> App Smart WiFi</li>
                            </ul>
                            <a href="#contacto" className="block text-center bg-gray-100 text-gray-900 font-bold py-3 rounded-lg hover:bg-gray-200">Solicitar promo</a>
                        </div>
                        {/* Plan 2 */}
                        <div className="bg-white rounded-2xl shadow-lg border-2 border-green-400 p-6 relative">
                            <div className="absolute top-0 right-0 bg-green-400 text-blue-900 text-xs font-bold px-3 py-1 rounded-bl-lg">OFERTA ESPECIAL</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">700 Megas</h3>
                            <p className="text-gray-500 text-sm mb-4">Velocidad superior</p>
                            <div className="text-4xl font-black text-blue-600 mb-1">$84.990</div>
                            <div className="text-xs text-gray-400 mb-6">/mes</div>
                            <ul className="space-y-2 mb-6 text-sm text-gray-700">
                                <li className="flex gap-2"><Check size={16} className="text-green-500" /> Repetidor WiFi incluido</li>
                                <li className="flex gap-2"><Check size={16} className="text-green-500" /> Descuento meses 1 y 2</li>
                            </ul>
                            <a href="#contacto" className="block text-center bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700">¡Lo quiero!</a>
                        </div>
                        {/* Plan 3 */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:border-blue-500 transition-colors">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">900 Megas</h3>
                            <p className="text-gray-500 text-sm mb-4">Gamer Pro</p>
                            <div className="text-4xl font-black text-blue-600 mb-1">$99.990</div>
                            <div className="text-xs text-gray-400 mb-6">/mes</div>
                            <ul className="space-y-2 mb-6 text-sm text-gray-700">
                                <li className="flex gap-2"><Check size={16} className="text-green-500" /> Máxima velocidad</li>
                                <li className="flex gap-2"><Check size={16} className="text-green-500" /> Prioridad de tráfico</li>
                            </ul>
                            <a href="#contacto" className="block text-center bg-gray-100 text-gray-900 font-bold py-3 rounded-lg hover:bg-gray-200">Solicitar promo</a>
                        </div>
                    </div>

                    {/* TV Bundles */}
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-blue-600">
                        <Tv /> Combos Fibra + TV
                    </h2>
                    <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm relative overflow-hidden">
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div>
                                <h3 className="text-2xl font-bold mb-4">Tu Entretenimiento Favorito</h3>
                                <p className="text-gray-600 mb-6">
                                    Llevando tu plan con TV recibes decodificador Movistar TV con acceso a apps.
                                </p>
                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-center gap-3">
                                        <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><Tv size={20} /></div>
                                        <span>Movistar TV APP (Ver en celular/PC)</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="bg-green-100 p-2 rounded-lg text-green-600"><Phone size={20} /></div>
                                        <span>Línea Fija Ilimitada</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="bg-red-100 p-2 rounded-lg text-red-600"><Zap size={20} /></div>
                                        <span>Disney+ y Star+ (Según oferta local)</span>
                                    </li>
                                </ul>
                                <Link href="/contratar" className="inline-block bg-green-500 text-white font-bold py-3 px-8 rounded-xl hover:bg-green-600 shadow-lg hover:shadow-green-500/30 transition-all">
                                    Ver Ofertas con TV
                                </Link>
                            </div>
                            <div className="bg-gray-50 rounded-2xl p-6 text-center">
                                <h4 className="font-bold text-gray-500 mb-4">Combos desde</h4>
                                <div className="text-5xl font-black text-gray-900 mb-2">$104.990</div>
                                <div className="text-sm text-gray-500 mb-6">IVA incluido</div>
                                <p className="text-xs text-gray-400 italic">
                                    *Sujeto a cobertura.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* CTA Final */}
            <section id="contacto" className="py-16 bg-blue-900 text-white text-center">
                <div className="container mx-auto px-4 max-w-2xl">
                    <h2 className="text-3xl font-black mb-6">Cámbiate a Movistar</h2>
                    <p className="text-lg text-blue-200 mb-8">
                        Déjanos tus datos, verificamos si tienes cobertura de fibra óptica y te agendamos la instalación.
                    </p>
                    <div className="bg-white p-6 rounded-2xl shadow-xl">
                        <QuickCallForm buttonColor="#019df4" />
                    </div>
                </div>
            </section>

        </div>
    );
}
