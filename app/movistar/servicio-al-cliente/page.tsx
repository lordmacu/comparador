import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CreditCard, MessageCircle, ExternalLink, HelpCircle, ArrowRight, Zap } from 'lucide-react';
import QuickCallForm from '@/components/QuickCallForm';

export const metadata: Metadata = {
    title: 'Movistar Pagos y Servicio al Cliente: Pagar Factura y Soporte (2026)',
    description: 'Guía para pagar tu factura Movistar Hogar o Móvil. Contacta a servicio al cliente. ¿Pagas mucho? Te ofrecemos mejores planes.',
    keywords: ['movistar pagos', 'movistar internet hogar precios colombia', 'pagar factura movistar', 'servicio al cliente movistar'],
};

export default function MovistarServicePage() {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">

            {/* Hero Section - Sales Pivot */}
            <section className="bg-[#0b2749] text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-3xl md:text-5xl font-black mb-4">
                            Pagos y Soporte Movistar
                        </h1>
                        <p className="text-lg text-blue-200 max-w-2xl mx-auto mb-6">
                            Encuentra aquí los enlaces para pagar tu factura y números de atención.
                            <br />
                            <span className="font-bold text-green-400">¿Quieres mejorar tu plan actual?</span>
                        </p>
                        <div className="bg-white/10 p-4 rounded-xl inline-block backdrop-blur-sm border border-white/20">
                            <p className="font-bold text-sm mb-2 text-green-300">⚡ Línea de VENTAS y Mejoras de Plan:</p>
                            <QuickCallForm buttonColor="#5cb615" provider="Movistar Soporte Pivot" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Payment Guide */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 shadow-xl border border-gray-100 flex flex-col md:flex-row items-start gap-8">
                        <div className="bg-blue-50 p-6 rounded-2xl md:w-1/3 text-center w-full">
                            <CreditCard size={48} className="text-blue-600 mx-auto mb-4" />
                            <h3 className="font-bold text-xl text-gray-900">Pagos Online</h3>
                        </div>
                        <div className="md:w-2/3">
                            <h2 className="text-2xl font-bold mb-3">Pagar Factura Movistar</h2>
                            <p className="text-gray-600 mb-6">
                                Usa el botón abajo para ir a la plataforma de pagos oficial de Movistar (PSE / Tarjeta).
                                Recuerda que nosotros somos asesores comerciales, no recaudamos dinero.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a href="https://www.movistar.com.co/pagos-y-recargas" target="_blank" rel="noopener noreferrer" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors">
                                    Ir a Pagos Movistar <ExternalLink size={18} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Support Channels Grid */}
            <section className="py-16">
                <div className="container mx-auto px-4 max-w-5xl">
                    <h2 className="text-3xl font-bold text-center mb-12">Atención al Cliente</h2>

                    <div className="grid md:grid-cols-2 gap-6">

                        {/* Channel 1: WhatsApp */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-green-100 hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                                    <MessageCircle size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">WhatsApp Oficial</h3>
                                    <p className="text-gray-500 text-xs">Soporte técnico y consultas</p>
                                </div>
                            </div>
                            <a href="https://api.whatsapp.com/send?phone=573166066666" className="block text-center bg-gray-50 hover:bg-green-50 text-gray-800 font-bold py-2 rounded-lg transition-colors">
                                Chatear +57 316 606 6666
                            </a>
                        </div>

                        {/* Channel 2: Phone */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-blue-100 hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">Desde un Movistar</h3>
                                    <p className="text-gray-500 text-xs">Marcación rápida gratuita</p>
                                </div>
                            </div>
                            <a href="tel:*611" className="block text-center bg-gray-50 hover:bg-blue-50 text-gray-800 font-bold py-2 rounded-lg transition-colors">
                                Marcar *611
                            </a>
                        </div>

                    </div>
                </div>
            </section>

            {/* Retention/Sales Strategy Section */}
            <section className="py-16 bg-gray-100">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-green-400">
                        <div className="inline-block bg-green-100 text-green-700 px-4 py-1 rounded-full font-bold text-sm mb-4">
                            <Zap size={14} className="inline mr-1" /> Oferta Especial de Portabilidad
                        </div>
                        <h2 className="text-3xl font-black mb-4 text-gray-900">
                            ¿Quieres más gigas o más velocidad?
                        </h2>
                        <p className="text-lg text-gray-600 mb-8">
                            No te conformes. Comparamos tu plan actual y te buscamos una mejor oferta en Movistar, Claro o ETB.
                        </p>

                        <div className="grid md:grid-cols-2 gap-6 text-left">
                            <Link href="/movistar/planes" className="group bg-gray-50 hover:bg-green-50 p-4 rounded-xl transition-colors border border-gray-200">
                                <h4 className="font-bold text-lg mb-1 group-hover:text-green-600 flex items-center gap-2">
                                    Ver Planes Movistar <ArrowRight size={18} />
                                </h4>
                                <p className="text-sm text-gray-500">Fibra óptica con descuentos</p>
                            </Link>
                            <Link href="/claro/planes" className="group bg-gray-50 hover:bg-red-50 p-4 rounded-xl transition-colors border border-gray-200">
                                <h4 className="font-bold text-lg mb-1 group-hover:text-red-600 flex items-center gap-2">
                                    Ver Planes Claro <ArrowRight size={18} />
                                </h4>
                                <p className="text-sm text-gray-500">Mayor cobertura nacional</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
