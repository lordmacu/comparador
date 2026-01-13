import type { Metadata } from 'next';
import Link from 'next/link';
import { Gamepad2, Zap, Shield, Wifi, Trophy, ChevronRight, Check } from 'lucide-react';
import QuickCallForm from '@/components/QuickCallForm';

export const metadata: Metadata = {
    title: 'Internet Gamer Bogotá 2026 | Ping < 5ms y Fibra Simétrica',
    description: 'El mejor internet para gaming en Colombia. Fibra óptica simétrica, ping ultra bajo y rutas optimizadas para LoL, Valorant, Call of Duty. Planes desde $90.000.',
    keywords: ['internet gamer bogota', 'mejor internet jugar online colombia', 'ping bajo internet bogota', 'fibra optica gaming', 'etb gaming', 'movistar fibra gaming'],
};

export default function GamingPage() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-purple-500 selection:text-white">
            {/* Hero Section */}
            <section className="relative py-24 overflow-hidden">
                {/* Background Elements */}
                <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl filter"></div>
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl filter"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full mb-8 backdrop-blur-sm animate-fade-in-up">
                            <Gamepad2 className="w-5 h-5 text-purple-400" />
                            <span className="font-semibold text-sm tracking-wide">EDICIÓN GAMER 2026</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                            DOMINA EL JUEGO <br /> SIN LAG
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl mx-auto font-light">
                            Fibra óptica simétrica real. Ping inferior a 5ms.
                            La ventaja competitiva que necesitas para ganar.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link href="#planes-gamer" className="group bg-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-purple-700 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(147,51,234,0.5)] hover:shadow-[0_0_30px_rgba(147,51,234,0.7)]">
                                <Zap className="w-5 h-5 group-hover:text-yellow-300 transition-colors" />
                                Ver Planes Pro
                            </Link>
                            <Link href="/test-de-velocidad" className="px-8 py-4 rounded-xl font-bold text-lg border border-white/20 hover:bg-white/10 transition-all">
                                Test de Ping
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="border-y border-white/10 bg-white/5 py-12 backdrop-blur-sm">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="text-4xl font-black text-green-400 mb-2">{'<'} 5ms</div>
                            <div className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Ping Promedio</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-black text-blue-400 mb-2">900</div>
                            <div className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Mbps Simétricos</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-black text-purple-400 mb-2">0%</div>
                            <div className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Packet Loss</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-black text-yellow-400 mb-2">WiFi 6</div>
                            <div className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Router Gaming</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Plans Section */}
            <section id="planes-gamer" className="py-24">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">Elige tu Arma</h2>
                        <p className="text-gray-400 text-lg">Planes diseñados específicamente para gaming competitivo y streaming</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* ETB Gaming */}
                        <div className="bg-[#151515] border border-white/10 rounded-3xl overflow-hidden hover:border-blue-500/50 transition-colors group relative">
                            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="p-8">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-1">ETB Gamer</h3>
                                        <span className="text-blue-400 text-sm font-mono">FIBRA PURA</span>
                                    </div>
                                    <div className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-lg text-xs font-bold font-mono">
                                        BEST PING
                                    </div>
                                </div>
                                <div className="mb-8">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-5xl font-black text-white">500</span>
                                        <span className="text-xl font-bold text-gray-500">Mbps</span>
                                    </div>
                                    <div className="text-sm text-gray-400 mt-2">Simétricos (Subida = Bajada)</div>
                                </div>
                                <ul className="space-y-4 mb-8">
                                    <li className="flex items-start gap-3 text-gray-300 text-sm">
                                        <div className="bg-blue-500/20 p-1 rounded">
                                            <Check size={14} className="text-blue-400" />
                                        </div>
                                        Ping optimizado para servidores NA/EU
                                    </li>
                                    <li className="flex items-start gap-3 text-gray-300 text-sm">
                                        <div className="bg-blue-500/20 p-1 rounded">
                                            <Check size={14} className="text-blue-400" />
                                        </div>
                                        IP Pública dinámica (Estática +$15k)
                                    </li>
                                    <li className="flex items-start gap-3 text-gray-300 text-sm">
                                        <div className="bg-blue-500/20 p-1 rounded">
                                            <Check size={14} className="text-blue-400" />
                                        </div>
                                        Router Dual Band Gigabit
                                    </li>
                                </ul>
                                <div className="flex items-center justify-between mt-auto">
                                    <span className="text-2xl font-bold text-white">$99.900</span>
                                    <Link href="/etb" className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2">
                                        Contratar <ChevronRight size={18} />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Movistar Gaming (Featured) */}
                        <div className="bg-[#1a1a1a] border border-purple-500/30 rounded-3xl overflow-hidden transform md:-translate-y-4 shadow-2xl shadow-purple-900/20 relative">
                            <div className="absolute top-0 right-0 bg-purple-600 text-white text-xs font-bold px-4 py-1 rounded-bl-xl">
                                RECOMENDADO
                            </div>
                            <div className="p-8">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-1">Movistar Pro</h3>
                                        <span className="text-purple-400 text-sm font-mono">FIBRA GAMING</span>
                                    </div>
                                    <Trophy className="text-yellow-400" />
                                </div>
                                <div className="mb-8">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-5xl font-black text-white">900</span>
                                        <span className="text-xl font-bold text-gray-500">Mbps</span>
                                    </div>
                                    <div className="text-sm text-gray-400 mt-2">Simétricos + Disney+ Gratis</div>
                                </div>
                                <ul className="space-y-4 mb-8">
                                    <li className="flex items-start gap-3 text-gray-300 text-sm">
                                        <div className="bg-purple-500/20 p-1 rounded">
                                            <Check size={14} className="text-purple-400" />
                                        </div>
                                        Modo Gaming Inteligente (Prioridad QOS)
                                    </li>
                                    <li className="flex items-start gap-3 text-gray-300 text-sm">
                                        <div className="bg-purple-500/20 p-1 rounded">
                                            <Check size={14} className="text-purple-400" />
                                        </div>
                                        Router WiFi 6 (Menos interferencia)
                                    </li>
                                    <li className="flex items-start gap-3 text-gray-300 text-sm">
                                        <div className="bg-purple-500/20 p-1 rounded">
                                            <Check size={14} className="text-purple-400" />
                                        </div>
                                        Soporte técnico dedicado
                                    </li>
                                </ul>
                                <div className="flex items-center justify-between mt-auto">
                                    <div>
                                        <span className="text-sm text-gray-500 line-through block">$199.900</span>
                                        <span className="text-2xl font-bold text-white">$99.950</span>
                                    </div>
                                    <Link href="/movistar" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2">
                                        Contratar <ChevronRight size={18} />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Claro Gaming */}
                        <div className="bg-[#151515] border border-white/10 rounded-3xl overflow-hidden hover:border-red-500/50 transition-colors group relative">
                            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="p-8">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-1">Claro Gamer</h3>
                                        <span className="text-red-400 text-sm font-mono">POWER</span>
                                    </div>
                                    <div className="bg-red-500/10 text-red-400 px-3 py-1 rounded-lg text-xs font-bold font-mono">
                                        HÍBRIDO
                                    </div>
                                </div>
                                <div className="mb-8">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-5xl font-black text-white">400</span>
                                        <span className="text-xl font-bold text-gray-500">Mbps</span>
                                    </div>
                                    <div className="text-sm text-gray-400 mt-2">Descarga rápida</div>
                                </div>
                                <ul className="space-y-4 mb-8">
                                    <li className="flex items-start gap-3 text-gray-300 text-sm">
                                        <div className="bg-red-500/20 p-1 rounded">
                                            <Check size={14} className="text-red-400" />
                                        </div>
                                        Sin costo instalación estrato 3+
                                    </li>
                                    <li className="flex items-start gap-3 text-gray-300 text-sm">
                                        <div className="bg-red-500/20 p-1 rounded">
                                            <Check size={14} className="text-red-400" />
                                        </div>
                                        Paga en Febrero 2026 (1er mes Gratis)
                                    </li>
                                    <li className="flex items-start gap-3 text-gray-300 text-sm">
                                        <div className="bg-red-500/20 p-1 rounded">
                                            <Check size={14} className="text-red-400" />
                                        </div>
                                        Acceso a Claro Gaming Cloud
                                    </li>
                                </ul>
                                <div className="flex items-center justify-between mt-auto">
                                    <span className="text-2xl font-bold text-white">$84.900</span>
                                    <Link href="/claro" className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2">
                                        Contratar <ChevronRight size={18} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Latency Explanation */}
            <section className="py-24 bg-white/5">
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12 max-w-6xl">
                    <div className="flex-1">
                        <Shield className="w-12 h-12 text-purple-500 mb-6" />
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Por qué pierdes partidas?</h2>
                        <div className="space-y-6">
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                                <h4 className="font-bold text-xl mb-2 flex items-center gap-2"><div className="w-2 h-2 bg-red-500 rounded-full"></div> Ping Alto (Lag)</h4>
                                <p className="text-gray-400 text-sm">El tiempo que tarda tu acción en llegar al servidor. Si es &gt; 50ms, estás en desventaja.</p>
                            </div>
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                                <h4 className="font-bold text-xl mb-2 flex items-center gap-2"><div className="w-2 h-2 bg-yellow-500 rounded-full"></div> Jitter (Inestabilidad)</h4>
                                <p className="text-gray-400 text-sm">Variaciones en tu ping que causan "tirones" o teletransportaciones.</p>
                            </div>
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                                <h4 className="font-bold text-xl mb-2 flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full"></div> Solución Fibra Óptica</h4>
                                <p className="text-gray-400 text-sm">La luz viaja más rápido que la electricidad. La fibra óptica reduce el ping hasta en un 70% vs cable de cobre.</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 bg-gradient-to-br from-purple-900/40 to-blue-900/40 p-8 rounded-3xl border border-white/10">
                        <h3 className="text-2xl font-bold mb-6 text-center">Consulta Cobertura Gamer</h3>
                        <p className="text-gray-300 text-center mb-8">Nuestros expertos validan si tu zona tiene disponibilidad de los nodos de baja latencia.</p>
                        <div className="bg-black/20 p-4 rounded-xl">
                            <QuickCallForm provider="Gamer" buttonColor="#9333ea" />
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
