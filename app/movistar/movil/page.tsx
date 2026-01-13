import type { Metadata } from 'next';
import Link from 'next/link';
import { Smartphone, RotateCcw, ShoppingCart, Zap, Check } from 'lucide-react';
import QuickCallForm from '@/components/QuickCallForm';

export const metadata: Metadata = {
    title: 'Movistar Móvil: Comprar Gigas, Pospago y Recargas (2026)',
    description: 'Todo lo que necesitas para tu celular Movistar. Compra paquetes prepago, recargas online o pásate a Pospago con datos ilimitados.',
    keywords: ['comprar gigas movistar', 'paquetes movistar prepago colombia', 'planes movistar pospago', 'recargas datos movistar', 'movistar ilimitado'],
};

export default function MovistarMovilPage() {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-[#0b2749] to-blue-900 text-white py-12">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-black mb-4">
                        Movistar Móvil 2026
                    </h1>
                    <p className="text-xl text-blue-200 max-w-2xl mx-auto mb-8">
                        Más datos, más velocidad 5G y mejores precios. ¿Eres Prepago? Pásate a Pospago y deja de recargar.
                    </p>
                    <div className="flex justify-center">
                        <QuickCallForm buttonColor="#5cb615" provider="Movistar Pospago" />
                    </div>
                </div>
            </section>

            {/* Main Options Grid */}
            <section className="py-12 -mt-8">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">

                        {/* Option 1: Recharge */}
                        <div className="bg-white rounded-2xl shadow-xl p-6 text-center border-b-4 border-blue-500">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                                <RotateCcw size={32} />
                            </div>
                            <h2 className="text-2xl font-bold mb-2">Recargas y Paquetes</h2>
                            <p className="text-gray-600 mb-6 text-sm">
                                Compra saldo o paquetes de datos prepago "Todo en Uno".
                            </p>
                            <a href="https://www.movistar.com.co/recargas" target="_blank" rel="noopener noreferrer" className="block w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors">
                                Recargar Ahora
                            </a>
                        </div>

                        {/* Option 2: Postpaid (Focus) */}
                        <div className="bg-white rounded-2xl shadow-xl p-8 text-center border-b-4 border-green-500 transform md:-translate-y-4 scale-105 z-10">
                            <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">MEJOR OPCIÓN</div>
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                                <Zap size={32} />
                            </div>
                            <h2 className="text-2xl font-bold mb-2">Planes Pospago</h2>
                            <p className="text-gray-600 mb-6 text-sm">
                                Datos ilimitados, minutos ilimitados y apps incluidas sin gastar datos.
                            </p>
                            <div className="mb-6">
                                <div className="text-3xl font-black text-gray-900">$39.990<span className="text-sm font-normal text-gray-500">/mes</span></div>
                            </div>
                            <a href="#contacto" className="block w-full bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-green-600 transition-colors">
                                Solicitar Plan
                            </a>
                        </div>

                        {/* Option 3: Buy Gigas */}
                        <div className="bg-white rounded-2xl shadow-xl p-6 text-center border-b-4 border-purple-500">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600">
                                <ShoppingCart size={32} />
                            </div>
                            <h2 className="text-2xl font-bold mb-2">Comprar Gigas</h2>
                            <p className="text-gray-600 mb-6 text-sm">
                                ¿Te quedaste sin datos? Compra paquetes adicionales de navegación.
                            </p>
                            <a href="https://www.movistar.com.co/paquetes" target="_blank" rel="noopener noreferrer" className="block w-full bg-purple-600 text-white font-bold py-3 rounded-lg hover:bg-purple-700 transition-colors">
                                Comprar Paquete
                            </a>
                        </div>

                    </div>
                </div>
            </section>

            {/* Why Postpaid? */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-bold text-center mb-12">¿Por qué pasarte a Pospago?</h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="flex gap-4">
                            <div className="bg-green-100 p-3 h-fit rounded-lg text-green-600"><Check /></div>
                            <div>
                                <h3 className="font-bold text-lg">Nunca te quedas sin datos</h3>
                                <p className="text-gray-600">Navega sin interrupciones con planes de gigas generosos o ilimitados.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="bg-green-100 p-3 h-fit rounded-lg text-green-600"><Smartphone /></div>
                            <div>
                                <h3 className="font-bold text-lg">Equipo nuevo a cuotas</h3>
                                <p className="text-gray-600">Accede a los últimos smartphones pagándolos mes a mes en tu factura.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="bg-green-100 p-3 h-fit rounded-lg text-green-600"><Zap /></div>
                            <div>
                                <h3 className="font-bold text-lg">Roaming Internacional</h3>
                                <p className="text-gray-600">Usa tus datos en otros países de América sin costo adicional (en planes seleccionados).</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="bg-green-100 p-3 h-fit rounded-lg text-green-600"><RotateCcw /></div>
                            <div>
                                <h3 className="font-bold text-lg">Sin cláusulas</h3>
                                <p className="text-gray-600">Disfruta la libertad de estar por el servicio, no por obligación.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section id="contacto" className="py-16 bg-blue-900 text-white text-center">
                <div className="container mx-auto px-4 max-w-2xl">
                    <h2 className="text-3xl font-black mb-6">Pásate a Movistar con tu mismo número</h2>
                    <p className="text-lg text-blue-200 mb-8">
                        Hacemos la portabilidad fácil. Te llevamos la SIM a tu casa.
                    </p>
                    <div className="bg-white p-6 rounded-2xl shadow-xl">
                        <QuickCallForm buttonColor="#5cb615" />
                    </div>
                </div>
            </section>

        </div>
    );
}
