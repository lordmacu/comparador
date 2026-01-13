import type { Metadata } from 'next';
import Link from 'next/link';
import { PhoneOff, ArrowRight, ShieldCheck, Clock, CheckCircle2, AlertTriangle, PhoneCall } from 'lucide-react';
import QuickCallForm from '@/components/QuickCallForm';

export const metadata: Metadata = {
    title: 'Cómo Cancelar Claro/Movistar/ETB y Cambiar de Internet (Guía 2026)',
    description: 'Guía paso a paso para cancelar tu internet actual sin pagar multas. Scripts para hablar con retenciones y cómo coordinar la nueva instalación sin quedarte desconectado.',
    keywords: ['cancelar internet claro', 'cancelar movistar hogar', 'retenciones claro numero', 'cambiar de operador internet', 'carta cancelacion etb'],
};

export default function SwitchingGuidePage() {
    return (
        <div className="min-h-screen bg-white text-gray-900">

            {/* Hero Section */}
            <section className="bg-red-50 py-16 border-b border-red-100">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-1 rounded-full text-sm font-bold mb-6">
                            <PhoneOff size={16} /> GUÍA ANTI-DOLOR DE CABEZA
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black mb-6 text-gray-900">
                            ¿Harto de tu Operador Actual?
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                            Te enseñamos el truco exacto para cancelar sin perder tiempo, evitar cobros extra y tener tu nuevo internet instalado <b>antes</b> de que corten el viejo.
                        </p>

                        <div className="bg-white p-6 rounded-2xl shadow-xl max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-6">
                            <div className="flex-1 text-left">
                                <h3 className="font-bold text-lg mb-2">¿Quieres que lo hagamos por ti?</h3>
                                <p className="text-sm text-gray-500">Nuestros asesores expertos coordinan el cambio para que no te quedes ni un minuto sin WiFi.</p>
                            </div>
                            <div className="flex-shrink-0">
                                <QuickCallForm buttonColor="#dc2626" provider="Cambio Operador" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* The 3 Steps */}
            <section className="py-24">
                <div className="container mx-auto px-4 max-w-5xl">
                    <h2 className="text-3xl font-bold text-center mb-16">El Método "Cambio Seguro"</h2>

                    <div className="space-y-12">
                        {/* Step 1 */}
                        <div className="flex flex-col md:flex-row gap-8 items-start relative">
                            <div className="hidden md:block absolute left-8 top-16 bottom-[-48px] w-0.5 bg-gray-200"></div>
                            <div className="bg-blue-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center font-black text-2xl flex-shrink-0 shadow-lg z-10">
                                1
                            </div>
                            <div className="flex-1 bg-gray-50 rounded-3xl p-8 border border-gray-100">
                                <h3 className="text-2xl font-bold mb-4">No canceles todavía (Mortal Mistake)</h3>
                                <p className="text-gray-600 mb-6">
                                    El error #1 es llamar a cancelar y quedarse sin internet 5 días mientras llega el nuevo.
                                    Primero debes <b>asegurar la nueva instalación</b>.
                                </p>
                                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl flex gap-3 text-sm text-yellow-800">
                                    <AlertTriangle className="flex-shrink-0" />
                                    <strong>Tip Pro:</strong> Programa la nueva instalación 2 días ANTES de tu fecha de corte de facturación.
                                </div>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex flex-col md:flex-row gap-8 items-start relative">
                            <div className="hidden md:block absolute left-8 top-16 bottom-[-48px] w-0.5 bg-gray-200"></div>
                            <div className="bg-blue-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center font-black text-2xl flex-shrink-0 shadow-lg z-10">
                                2
                            </div>
                            <div className="flex-1 bg-gray-50 rounded-3xl p-8 border border-gray-100">
                                <h3 className="text-2xl font-bold mb-4">Instala el Nuevo Servicio</h3>
                                <p className="text-gray-600 mb-6">
                                    Deja que ETB, Movistar o Claro instalen la nueva fibra. Comprueba que la velocidad es real y estable.
                                    Ahora tendrás dos redes WiFi en casa por unos días (la vieja lenta y la nueva rápida).
                                </p>
                                <Link href="/planes" className="inline-flex items-center text-blue-600 font-bold hover:underline">
                                    Ver ofertas disponibles en tu zona <ArrowRight size={16} className="ml-1" />
                                </Link>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            <div className="bg-blue-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center font-black text-2xl flex-shrink-0 shadow-lg z-10">
                                3
                            </div>
                            <div className="flex-1 bg-gray-50 rounded-3xl p-8 border border-gray-100">
                                <h3 className="text-2xl font-bold mb-4">La Llamada Final (Con Script)</h3>
                                <p className="text-gray-600 mb-6">
                                    Ahora sí, llama a cancelar el servicio viejo. Te pasarán al área de "Retención" donde te ofrecerán el oro y el moro.
                                    Sé firme. Ya tienes un mejor internet instalado.
                                </p>

                                <div className="bg-white border rounded-xl p-6 shadow-sm">
                                    <h4 className="font-bold text-sm text-gray-500 uppercase mb-3 flex items-center gap-2">
                                        <PhoneCall size={16} /> Usa este Script
                                    </h4>
                                    <p className="font-mono text-gray-800 bg-gray-100 p-4 rounded-lg italic text-sm">
                                        "Hola, deseo cancelar el servicio por motivo de viaje/mudanza fuera del país. No necesito ofertas de retención, ya no viviré aquí. Por favor denme el número de radicado de cancelación."
                                    </p>
                                    <p className="text-xs text-gray-400 mt-2 text-center">
                                        *Decir "viaje" es la forma más rápida de evitar que te insistan con descuentos.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Direct Numbers Section */}
            <section className="bg-gray-900 text-white py-24">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Números Directos para Cancelar</h2>
                    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        <div className="bg-white/10 p-6 rounded-2xl text-center backdrop-blur-sm border border-white/10 hover:border-red-500/50 transition-colors">
                            <h3 className="font-bold text-xl mb-2">Claro Hogar</h3>
                            <p className="text-4xl font-mono font-bold mb-2">*611</p>
                            <p className="text-gray-400 text-sm">Opción 2 - 4 - 2</p>
                        </div>
                        <div className="bg-white/10 p-6 rounded-2xl text-center backdrop-blur-sm border border-white/10 hover:border-blue-500/50 transition-colors">
                            <h3 className="font-bold text-xl mb-2">Movistar</h3>
                            <p className="text-4xl font-mono font-bold mb-2">01 8000 930 930</p>
                            <p className="text-gray-400 text-sm">Dí "Cancelar Servicio"</p>
                        </div>
                        <div className="bg-white/10 p-6 rounded-2xl text-center backdrop-blur-sm border border-white/10 hover:border-blue-800/50 transition-colors">
                            <h3 className="font-bold text-xl mb-2">ETB</h3>
                            <p className="text-4xl font-mono font-bold mb-2">377 77 77</p>
                            <p className="text-gray-400 text-sm">Línea Bogotá</p>
                        </div>
                    </div>
                    <p className="text-center text-gray-500 mt-8 text-sm max-w-2xl mx-auto">
                        *Nota: Los operadores suelen demorar entre 15 y 45 minutos en contestar estas líneas. Ten paciencia o deja que nosotros coordinemos tu nuevo internet primero.
                    </p>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-24 bg-blue-50">
                <div className="container mx-auto px-4 max-w-3xl text-center">
                    <CheckCircle2 className="w-16 h-16 text-blue-600 mx-auto mb-6" />
                    <h2 className="text-3xl font-black mb-6">¿Listo para mejorar tu internet hoy?</h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Ya sabes cómo cancelar. Ahora elige el internet que sí te mereces.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/test-de-velocidad" className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl border-2 border-blue-600 hover:bg-blue-50 transition-all">
                            Probar velocidad actual
                        </Link>
                        <Link href="/planes" className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl">
                            Ver Planes de Fibra
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
}
