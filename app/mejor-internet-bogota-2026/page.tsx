import type { Metadata } from 'next';
import Link from 'next/link';
import { Trophy, Medal, ThumbsUp, TrendingDown, Star, Check, X, Info } from 'lucide-react';
import QuickCallForm from '@/components/QuickCallForm';

export const metadata: Metadata = {
    title: 'Mejor Internet Bogotá 2026: Ranking Definitivo (Velocidad y Precio)',
    description: 'Análisis independiente de los mejores proveedores de internet en Bogotá para 2026. Comparamos precio, velocidad real y servicio al cliente de ETB, Claro y Movistar.',
    keywords: ['mejor internet bogota 2026', 'ranking internet colombia', 'cual es el mejor internet en bogota', 'etb vs claro vs movistar 2026'],
};

export default function BestInternetPage() {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">

            {/* Hero Section */}
            <section className="bg-slate-900 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-300 px-4 py-1 rounded-full text-sm font-bold mb-6 border border-yellow-500/30">
                        <Trophy size={16} /> RANKING ACTUALIZADO: ENERO 2026
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black mb-6">
                        El Mejor Internet de Bogotá
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
                        Analizamos más de 50 planes, pruebas de velocidad y opiniones de usuarios para decirte cuál contratar según tus necesidades.
                    </p>
                    <p className="text-sm text-gray-500 italic">
                        Última actualización: 13 de Enero de 2026
                    </p>
                </div>
            </section>

            {/* The Winners Podium */}
            <section className="py-12 -mt-8">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">

                        {/* Silver: Movistar */}
                        <div className="order-2 md:order-1 bg-white rounded-3xl p-8 shadow-xl border border-gray-100 relative group md:translate-y-8">
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-300 text-gray-800 w-12 h-12 rounded-full flex items-center justify-center font-black text-xl border-4 border-white shadow">
                                2
                            </div>
                            <div className="text-center mb-6 mt-4">
                                <span className="text-blue-600 font-bold block mb-2">MEJOR SIMETRÍA</span>
                                <h3 className="text-3xl font-black mb-2 text-gray-900">Movistar</h3>
                                <div className="flex justify-center text-yellow-400 mb-2">
                                    <Star fill="currentColor" size={18} /><Star fill="currentColor" size={18} /><Star fill="currentColor" size={18} /><Star fill="currentColor" size={18} /><Star fill="currentColor" size={18} className="text-gray-300" />
                                </div>
                            </div>
                            <ul className="space-y-3 mb-6 text-sm text-gray-600">
                                <li className="flex gap-2"><Check className="text-green-500 shrink-0" size={18} /> Subida = Bajada (Simétrico)</li>
                                <li className="flex gap-2"><Check className="text-green-500 shrink-0" size={18} /> App Smart WiFi excelente</li>
                                <li className="flex gap-2"><X className="text-red-400 shrink-0" size={18} /> Servicio al cliente mejorable</li>
                            </ul>
                            <Link href="/movistar" className="block w-full py-3 bg-gray-100 hover:bg-blue-50 text-blue-700 font-bold rounded-xl text-center transition-colors">
                                Ver Planes Movistar
                            </Link>
                        </div>

                        {/* Gold: ETB */}
                        <div className="order-1 md:order-2 bg-white rounded-3xl p-8 shadow-2xl border-2 border-yellow-400 relative transform scale-105 z-10">
                            <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-xs font-bold px-4 py-1 rounded-bl-xl">
                                GANADOR 2026
                            </div>
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-400 text-yellow-900 w-16 h-16 rounded-full flex items-center justify-center font-black text-3xl border-4 border-white shadow">
                                1
                            </div>
                            <div className="text-center mb-6 mt-6">
                                <span className="text-blue-800 font-bold block mb-2">MEJOR ESTABILIDAD</span>
                                <h3 className="text-4xl font-black mb-2 text-blue-900">ETB Fibra</h3>
                                <div className="flex justify-center text-yellow-400 mb-2">
                                    <Star fill="currentColor" size={20} /><Star fill="currentColor" size={20} /><Star fill="currentColor" size={20} /><Star fill="currentColor" size={20} /><Star fill="currentColor" size={20} />
                                </div>
                            </div>
                            <p className="text-gray-600 text-center text-sm mb-6">
                                La red propia de fibra más extensa de Bogotá. Menor latencia para gaming y mayor estabilidad para teletrabajo.
                            </p>
                            <ul className="space-y-3 mb-8 text-sm text-gray-700">
                                <li className="flex gap-2"><Check className="text-green-600 shrink-0" size={18} /> Ping ultra-bajo (local)</li>
                                <li className="flex gap-2"><Check className="text-green-600 shrink-0" size={18} /> No comparte ancho de banda</li>
                                <li className="flex gap-2"><Check className="text-green-600 shrink-0" size={18} /> Soporte técnico en Bogotá</li>
                            </ul>
                            <Link href="/etb" className="block w-full py-4 bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700 text-white font-bold rounded-xl text-center shadow-lg transition-all">
                                Ver Oferta Ganadora
                            </Link>
                        </div>

                        {/* Bronze: Claro */}
                        <div className="order-3 bg-white rounded-3xl p-8 shadow-xl border border-gray-100 relative md:translate-y-8">
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-700 text-yellow-100 w-12 h-12 rounded-full flex items-center justify-center font-black text-xl border-4 border-white shadow">
                                3
                            </div>
                            <div className="text-center mb-6 mt-4">
                                <span className="text-red-500 font-bold block mb-2">MEJOR COBERTURA</span>
                                <h3 className="text-3xl font-black mb-2 text-gray-900">Claro</h3>
                                <div className="flex justify-center text-yellow-400 mb-2">
                                    <Star fill="currentColor" size={18} /><Star fill="currentColor" size={18} /><Star fill="currentColor" size={18} /><Star fill="currentColor" size={18} className="text-gray-300" /><Star fill="currentColor" size={18} className="text-gray-300" />
                                </div>
                            </div>
                            <ul className="space-y-3 mb-6 text-sm text-gray-600">
                                <li className="flex gap-2"><Check className="text-green-500 shrink-0" size={18} /> Entretenimiento incluido (TV)</li>
                                <li className="flex gap-2"><Check className="text-green-500 shrink-0" size={18} /> Llega a todos los rincones</li>
                                <li className="flex gap-2"><Info className="text-orange-500 shrink-0" size={18} /> Fibra híbrida en zonas viejas</li>
                            </ul>
                            <Link href="/claro" className="block w-full py-3 bg-gray-100 hover:bg-red-50 text-red-700 font-bold rounded-xl text-center transition-colors">
                                Ver Planes Claro
                            </Link>
                        </div>

                    </div>
                </div>
            </section>

            {/* Comparison Table */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 max-w-5xl">
                    <h2 className="text-3xl font-bold text-center mb-12">Comparativa Técnica 2026</h2>
                    <div className="overflow-x-auto rounded-3xl shadow-lg border border-gray-200">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 text-gray-700">
                                    <th className="p-6 font-bold border-b">Criterio</th>
                                    <th className="p-6 font-bold border-b text-blue-800">ETB</th>
                                    <th className="p-6 font-bold border-b text-blue-600">Movistar</th>
                                    <th className="p-6 font-bold border-b text-red-600">Claro</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                <tr>
                                    <td className="p-6 font-semibold bg-gray-50/50">Tecnología</td>
                                    <td className="p-6 text-green-700 font-medium">100% Fibra Pura</td>
                                    <td className="p-6 text-green-700 font-medium">100% Fibra Pura</td>
                                    <td className="p-6">Híbrido (HFC) / Fibra</td>
                                </tr>
                                <tr>
                                    <td className="p-6 font-semibold bg-gray-50/50">Simetría</td>
                                    <td className="p-6">Sí (Subida=Bajada)</td>
                                    <td className="p-6">Sí (Subida=Bajada)</td>
                                    <td className="p-6 text-orange-600">No (Subida más lenta)</td>
                                </tr>
                                <tr>
                                    <td className="p-6 font-semibold bg-gray-50/50">Precio Base (300MB)</td>
                                    <td className="p-6 font-bold">$64.900</td>
                                    <td className="p-6 font-bold">$69.900</td>
                                    <td className="p-6 font-bold">$62.900</td>
                                </tr>
                                <tr>
                                    <td className="p-6 font-semibold bg-gray-50/50">Permanencia</td>
                                    <td className="p-6">12 Meses</td>
                                    <td className="p-6">12 Meses</td>
                                    <td className="p-6">12 Meses</td>
                                </tr>
                                <tr>
                                    <td className="p-6 font-semibold bg-gray-50/50">Ideal Para</td>
                                    <td className="p-6"><span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-bold">GAMER / PRO</span></td>
                                    <td className="p-6"><span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-bold">HOME OFFICE</span></td>
                                    <td className="p-6"><span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-bold">FAMILIA + TV</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Final Verdict */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <Medal className="w-16 h-16 mx-auto mb-6 text-slate-800" />
                    <h2 className="text-3xl font-bold mb-6">El Veredicto Final</h2>
                    <div className="bg-white p-8 rounded-3xl shadow-sm text-left space-y-4">
                        <p className="text-gray-700 text-lg">
                            Si vives en Bogotá y tienes cobertura, <strong>ETB es indiscutiblemente la mejor opción técnica</strong> por su estabilidad y latencia.
                        </p>
                        <p className="text-gray-700 text-lg">
                            Si ETB no llega a tu edificio, <strong>Movistar Fibra</strong> es una segunda opción excelente, casi idéntica en rendimiento.
                        </p>
                        <p className="text-gray-700 text-lg">
                            Elige <strong>Claro</strong> principalmente si buscas paquetes de Televisión robustos o vives en zonas donde la fibra óptica pura aún no ha sido desplegada.
                        </p>
                    </div>

                    <div className="mt-12">
                        <h3 className="text-xl font-bold mb-6">¿Quieres verificar qué operador llega a tu casa?</h3>
                        <div className="bg-white p-6 rounded-2xl shadow-lg inline-block w-full max-w-md">
                            <QuickCallForm />
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
