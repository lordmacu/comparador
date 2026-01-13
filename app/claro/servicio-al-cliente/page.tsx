import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CreditCard, MessageCircle, ExternalLink, HelpCircle, AlertTriangle, ArrowRight } from 'lucide-react';
import QuickCallForm from '@/components/QuickCallForm';

export const metadata: Metadata = {
    title: 'Pagar Claro Hogar: Guía de Pagos y Servicio al Cliente (2026)',
    description: '¿Necesitas pagar tu factura Claro o contactar a soporte? Aquí te explicamos cómo hacerlo. Y si pagas mucho, ¡te ayudamos a cambiar a un plan más barato!',
    keywords: ['internet claro hogar pagar', 'claro servicio al cliente', 'pagar factura claro', 'claro soporte', 'telefono claro ventas'],
};

export default function ClaroServicePage() {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">

            {/* Hero Section - Sales Pivot */}
            <section className="bg-[#DA291C] text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-3xl md:text-5xl font-black mb-4">
                            Servicio al Cliente y Pagos Claro
                        </h1>
                        <p className="text-lg text-red-100 max-w-2xl mx-auto mb-6">
                            Te ayudamos a encontrar los canales oficiales de soporte y pago.
                            <br />
                            <span className="font-bold text-yellow-300">¿Tu factura llegó muy cara?</span> Cotiza un plan nuevo con nosotros.
                        </p>
                        <div className="bg-white/10 p-4 rounded-xl inline-block backdrop-blur-sm border border-white/20">
                            <p className="font-bold text-sm mb-2">📞 Línea Exclusiva de VENTAS y Mejoras de Plan:</p>
                            <QuickCallForm buttonColor="#000" provider="Claro Soporte Pivot" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Payment Guide */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 shadow-xl border border-gray-100 flex flex-col md:flex-row items-start gap-8">
                        <div className="bg-red-50 p-6 rounded-2xl md:w-1/3 text-center w-full">
                            <CreditCard size={48} className="text-red-600 mx-auto mb-4" />
                            <h3 className="font-bold text-xl text-gray-900">Pagar Factura</h3>
                        </div>
                        <div className="md:w-2/3">
                            <h2 className="text-2xl font-bold mb-3">¿Cómo pagar tu Internet Claro?</h2>
                            <p className="text-gray-600 mb-6">
                                Puedes realizar el pago de tu factura hogar a través del portal oficial "Mi Claro". Nosotros no procesamos pagos directos, somos canal comercial.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a href="https://www.claro.com.co/personas/mi-claro/" target="_blank" rel="noopener noreferrer" className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors">
                                    Ir a Pagar en Mi Claro <ExternalLink size={18} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Support Channels Grid */}
            <section className="py-16">
                <div className="container mx-auto px-4 max-w-5xl">
                    <h2 className="text-3xl font-bold text-center mb-4">Canales de Soporte Técnico</h2>
                    <p className="text-center text-gray-500 mb-12">Si tienes fallas técnicas, usa estos canales oficiales:</p>

                    <div className="grid md:grid-cols-2 gap-6">

                        {/* Channel 1: WhatsApp */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-green-100 hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                                    <MessageCircle size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">WhatsApp Claro</h3>
                                    <p className="text-gray-500 text-xs">Bot oficial</p>
                                </div>
                            </div>
                            <a href="https://api.whatsapp.com/send?phone=573112000000" className="block text-center bg-gray-50 hover:bg-green-50 text-gray-800 font-bold py-2 rounded-lg transition-colors">
                                Iniciar Chat
                            </a>
                        </div>

                        {/* Channel 2: Phone */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-blue-100 hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">Línea *611</h3>
                                    <p className="text-gray-500 text-xs">Desde tu móvil Claro</p>
                                </div>
                            </div>
                            <a href="tel:*611" className="block text-center bg-gray-50 hover:bg-blue-50 text-gray-800 font-bold py-2 rounded-lg transition-colors">
                                Llamar ahora
                            </a>
                        </div>

                    </div>
                </div>
            </section>

            {/* Retention/Sales Strategy Section */}
            <section className="py-16 bg-gray-100">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-orange-400">
                        <div className="inline-block bg-orange-100 text-orange-700 px-4 py-1 rounded-full font-bold text-sm mb-4">
                            <AlertTriangle size={14} className="inline mr-1" /> ¿Problemas con tu servicio actual?
                        </div>
                        <h2 className="text-3xl font-black mb-4 text-gray-900">
                            No sufras con un internet lento
                        </h2>
                        <p className="text-lg text-gray-600 mb-8">
                            Si tu servicio actual falla mucho o te parece costoso, es momento de comparar.
                            <br />
                            Tenemos promociones exclusivas para clientes nuevos o portabilidad.
                        </p>

                        <div className="grid md:grid-cols-2 gap-6 text-left">
                            <Link href="/claro/planes" className="group bg-gray-50 hover:bg-red-50 p-4 rounded-xl transition-colors border border-gray-200">
                                <h4 className="font-bold text-lg mb-1 group-hover:text-red-600 flex items-center gap-2">
                                    Ver Planes Claro <ArrowRight size={18} />
                                </h4>
                                <p className="text-sm text-gray-500">Actualiza tu velocidad con fibra óptica</p>
                            </Link>
                            <Link href="/etb/planes" className="group bg-gray-50 hover:bg-blue-50 p-4 rounded-xl transition-colors border border-gray-200">
                                <h4 className="font-bold text-lg mb-1 group-hover:text-blue-600 flex items-center gap-2">
                                    Ver Planes ETB <ArrowRight size={18} />
                                </h4>
                                <p className="text-sm text-gray-500">Compara con otra red de fibra</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
