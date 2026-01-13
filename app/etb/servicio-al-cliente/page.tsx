import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, Users, MessageCircle, ExternalLink, HelpCircle, FileText, Smartphone } from 'lucide-react';
import QuickCallForm from '@/components/QuickCallForm';

export const metadata: Metadata = {
    title: 'ETB Servicio al Cliente: Teléfonos, Chat, WhatsApp y Mi ETB',
    description: 'Guía de soporte ETB 2026. Resuelve fallas, paga tu factura en línea, entra a Mi ETB y contacta a servicio al cliente por WhatsApp o línea telefónica.',
    keywords: ['ETB servicio al cliente', 'numero ETB bogota', 'mi etb', 'chat etb', 'pagar factura etb', 'reportar falla etb', 'soporte etb'],
};

export default function ETBServicePage() {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">

            {/* Hero Section */}
            <section className="bg-[#0033A0] text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1 rounded-full text-sm font-bold mb-6">
                            <Users size={16} /> CENTRO DE AYUDA
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black mb-4">
                            Servicio al Cliente ETB
                        </h1>
                        <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
                            Todos los canales de atención oficiales de ETB en un solo lugar. Soluciona problemas, paga facturas y gestiona tu cuenta.
                        </p>
                    </div>
                </div>
            </section>

            {/* Access to Mi ETB */}
            <section className="py-12 -mt-8">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 shadow-xl border border-gray-100 flex flex-col md:flex-row items-center gap-8">
                        <div className="bg-orange-100 p-6 rounded-2xl md:w-1/3 text-center">
                            <Smartphone size={48} className="text-orange-600 mx-auto mb-4" />
                            <h3 className="font-bold text-xl text-gray-900">Mi ETB</h3>
                        </div>
                        <div className="md:w-2/3">
                            <h2 className="text-2xl font-bold mb-3">Gestiona tu cuenta online</h2>
                            <p className="text-gray-600 mb-6">
                                Desde el portal <strong>Mi ETB</strong> puedes descargar tu factura, ver tu consumo, cambiar la clave del WiFi y activar servicios adicionales sin llamar.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <a href="https://etb.com/mietb/" target="_blank" rel="noopener noreferrer" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 transition-colors">
                                    Ingresar a Mi ETB <ExternalLink size={18} />
                                </a>
                                <a href="https://etb.com/pagos/" target="_blank" rel="noopener noreferrer" className="bg-white border-2 border-orange-500 text-orange-600 hover:bg-orange-50 font-bold py-3 px-6 rounded-xl flex items-center gap-2 transition-colors">
                                    <FileText size={18} /> Pagar Factura
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Support Channels Grid */}
            <section className="py-16">
                <div className="container mx-auto px-4 max-w-5xl">
                    <h2 className="text-3xl font-bold text-center mb-12">Canales de Atención 2026</h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {/* Channel 1: WhatsApp */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-green-100 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                                <MessageCircle size={24} />
                            </div>
                            <h3 className="font-bold text-lg mb-2">WhatsApp ETB</h3>
                            <p className="text-gray-500 text-sm mb-4">Chatbot 'Luz' para consultas rápidas y soporte automatizado.</p>
                            <a href="https://api.whatsapp.com/send?phone=573057800000" className="text-green-600 font-bold hover:underline">
                                +57 305 780 0000
                            </a>
                        </div>

                        {/* Channel 2: Phone */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-blue-100 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                                <Phone size={24} />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Línea Bogotá</h3>
                            <p className="text-gray-500 text-sm mb-4">Atención telefónica general y reportes técnicos.</p>
                            <a href="tel:6013777777" className="text-blue-600 font-bold hover:underline">
                                (601) 377 7777
                            </a>
                        </div>

                        {/* Channel 3: Mobile code */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center mb-4">
                                <Smartphone size={24} />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Desde Móvil</h3>
                            <p className="text-gray-500 text-sm mb-4">Marca gratis desde tu línea celular Tigo, Claro o Movistar.</p>
                            <p className="font-mono font-bold text-xl text-gray-800">
                                01 8000 112 170
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            {/* Common issues FAQ */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h2 className="text-3xl font-bold text-center mb-12 flex items-center justify-center gap-2">
                        <HelpCircle className="text-etb-primary" /> Soluciones Frecuentes
                    </h2>

                    <div className="space-y-4">
                        <details className="bg-gray-50 rounded-xl p-6 open:bg-blue-50 transition-colors">
                            <summary className="font-bold text-lg cursor-pointer list-none flex justify-between items-center">
                                ¿Cómo activar el WiFi 360 de ETB?
                                <span className="text-blue-600">+</span>
                            </summary>
                            <p className="mt-4 text-gray-600">
                                Debes solicitar la instalación de los puntos 'Mesh' adicionales. Si tienes un plan de más de 500 Megas,
                                a veces incluye un extensor gratuito. Llama al 377 7777 opción 2 para verificar tu elegibilidad.
                            </p>
                        </details>

                        <details className="bg-gray-50 rounded-xl p-6 open:bg-blue-50 transition-colors">
                            <summary className="font-bold text-lg cursor-pointer list-none flex justify-between items-center">
                                Mi internet está lento, ¿qué hago?
                                <span className="text-blue-600">+</span>
                            </summary>
                            <div className="mt-4 text-gray-600">
                                <ol className="list-decimal pl-5 space-y-2">
                                    <li>Reinicia el módem (desconéctalo 10 segundos).</li>
                                    <li>Realiza nuestro <Link href="/etb/test-de-velocidad" className="text-blue-600 hover:underline">Test de Velocidad ETB</Link> conectado por cable LAN.</li>
                                    <li>Si la velocidad es menos del 80% de lo contratado, reporta la falla en WhatsApp.</li>
                                </ol>
                            </div>
                        </details>

                        <details className="bg-gray-50 rounded-xl p-6 open:bg-blue-50 transition-colors">
                            <summary className="font-bold text-lg cursor-pointer list-none flex justify-between items-center">
                                ¿Cómo cancelar mi plan ETB?
                                <span className="text-blue-600">+</span>
                            </summary>
                            <p className="mt-4 text-gray-600">
                                Para retiros, debes llamar a la línea 377 7777 en horario de oficina. Ten en cuenta las cláusulas de permanencia.
                                Te recomendamos ver nuestra <Link href="/cambiar-de-operador" className="text-blue-600 hover:underline">Guía de Cancelación</Link> antes de llamar.
                            </p>
                        </details>
                    </div>
                </div>
            </section>

            {/* Sales CTA */}
            <section className="py-24 bg-gradient-to-br from-gray-900 to-blue-900 text-white text-center">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h2 className="text-3xl font-black mb-6">¿Aún no eres cliente ETB?</h2>
                    <p className="text-xl text-blue-200 mb-8">
                        Contrata hoy la mejor fibra óptica de Bogotá con instalación prioritaria.
                    </p>
                    <div className="flex justify-center">
                        <div className="bg-white text-gray-900 p-6 rounded-2xl shadow-xl w-full max-w-md">
                            <QuickCallForm />
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
