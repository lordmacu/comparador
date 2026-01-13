import type { Metadata } from 'next';
import Link from 'next/link';
import { PiggyBank, Search, CheckCircle2, AlertCircle, TrendingDown, Phone, ArrowUpRight } from 'lucide-react';
import QuickCallForm from '@/components/QuickCallForm';

export const metadata: Metadata = {
    title: 'Internet Barato Bogotá 2026 | Planes desde $42.000 (Estrato 1, 2 y 3)',
    description: 'Compara el internet más barato de Bogotá. Planes económicos para estudiantes y hogar desde $40k. Fibra óptica de ETB, Claro y Movistar con descuentos.',
    keywords: ['internet barato bogota', 'internet economico bogota', 'internet estudiantes bogota', 'planes internet estrato 2', 'internet mas barato colombia'],
};

interface CheapPlan {
    provider: 'ETB' | 'Claro' | 'Movistar';
    name: string;
    speed: number;
    price: number;
    features: string[];
    bestFor: string;
    color: string;
}

const cheapPlans: CheapPlan[] = [
    {
        provider: 'ETB',
        name: 'Plan Entrada Fibra',
        speed: 100,
        price: 49900,
        features: ['Instalación Gratis', 'Fibra Óptica', 'Soporte 24/7'],
        bestFor: 'Estudiantes',
        color: 'blue'
    },
    {
        provider: 'Claro',
        name: 'Hogar Básico',
        speed: 100,
        price: 59900,
        features: ['Televisión MP', 'Claro Video', 'Red 4G de respaldo'],
        bestFor: 'Familias Pequeñas',
        color: 'red'
    },
    {
        provider: 'Movistar',
        name: 'Fibra Pura',
        speed: 200,
        price: 62900,
        features: ['Compra hoy, paga en Marzo', 'Simetría total', 'App Smart WiFi'],
        bestFor: 'Home Office Básico',
        color: 'green'
    }
];

export default function EconomicoPage() {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">

            {/* Hero Section */}
            <section className="bg-emerald-600 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <div className="inline-flex items-center gap-2 bg-emerald-700 rounded-full px-4 py-1 mb-6 text-sm font-semibold border border-emerald-500">
                        <TrendingDown size={16} /> AHORRO TOTAL 2026
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">Internet Barato en Bogotá</h1>
                    <p className="text-xl md:text-2xl text-emerald-100 max-w-2xl mx-auto mb-10">
                        No pagues de más. Filtramos los planes más económicos con la mejor calidad precio del mercado.
                    </p>

                    <div className="bg-white p-6 rounded-2xl shadow-xl max-w-4xl mx-auto transform translate-y-8">
                        <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                            <div className="p-4">
                                <div className="text-gray-500 text-sm mb-1 uppercase font-bold">Más Barato</div>
                                <div className="text-3xl font-black text-emerald-600">$49.900</div>
                                <div className="text-xs text-gray-400">Mensual</div>
                            </div>
                            <div className="p-4">
                                <div className="text-gray-500 text-sm mb-1 uppercase font-bold">Instalación</div>
                                <div className="text-3xl font-black text-emerald-600">$0</div>
                                <div className="text-xs text-gray-400">En estratos 1, 2 y 3</div>
                            </div>
                            <div className="p-4 flex flex-col justify-center">
                                <Link href="#lista-planes" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2">
                                    Ver Opciones <ArrowUpRight size={18} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section id="lista-planes" className="py-24 pt-32">
                <div className="container mx-auto px-4">

                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900">Top 3 Planes Económicos (Enero 2026)</h2>
                        <p className="text-gray-600 mt-2">Seleccionados por precio bajo y estabilidad.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
                        {cheapPlans.map((plan, idx) => (
                            <div key={idx} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow relative">
                                {idx === 0 && (
                                    <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-bl-lg">
                                        MEJOR PRECIO
                                    </div>
                                )}
                                <div className={`h-2 w-full bg-${plan.color}-500`}></div>
                                <div className="p-6">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="font-bold text-gray-500">{plan.provider}</span>
                                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-semibold">{plan.bestFor}</span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                                    <div className="flex items-baseline gap-1 mb-6">
                                        <span className="text-4xl font-black text-gray-900">${plan.price.toLocaleString('es-CO')}</span>
                                    </div>

                                    <div className="flex items-center gap-2 mb-6 p-3 bg-gray-50 rounded-lg">
                                        <TrendingDown className="text-green-600" size={20} />
                                        <span className="text-sm font-medium">Ahorras $300k al año vs planes premium</span>
                                    </div>

                                    <ul className="space-y-3 mb-8">
                                        <li className="flex items-center gap-3 text-sm text-gray-600">
                                            <CheckCircle2 size={16} className={`text-${plan.color}-500`} />
                                            {plan.speed} Mbps de Velocidad
                                        </li>
                                        {plan.features.map((feature, fIdx) => (
                                            <li key={fIdx} className="flex items-center gap-3 text-sm text-gray-600">
                                                <CheckCircle2 size={16} className={`text-${plan.color}-500`} />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    <Link href={`/${plan.provider.toLowerCase()}`} className={`block w-full py-3 rounded-lg font-bold text-center text-white bg-${plan.color}-600 hover:bg-${plan.color}-700 transition-colors`}>
                                        Ver Detalles
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Why Cheap Section */}
                    <div className="bg-emerald-50 rounded-3xl p-8 md:p-12 mb-16">
                        <div className="flex flex-col md:flex-row gap-12 items-center">
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold mb-6">¿Cómo encontrar internet barato en Bogotá?</h3>
                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <div className="bg-white p-3 rounded-full h-fit text-emerald-600 shadow-sm"><PiggyBank size={24} /></div>
                                        <div>
                                            <h4 className="font-bold text-lg">Revisa tu Estrato</h4>
                                            <p className="text-gray-600 text-sm">Los estratos 1, 2 y 3 tienen subsidios y precios especiales por ley. Asegúrate de cotizar con tu dirección exacta.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="bg-white p-3 rounded-full h-fit text-emerald-600 shadow-sm"><Search size={24} /></div>
                                        <div>
                                            <h4 className="font-bold text-lg">Solo Internet vs Triple Play</h4>
                                            <p className="text-gray-600 text-sm">Si quieres ahorrar, contrata "Solo Internet". La TV y telefonía pueden subir tu factura hasta un 40%.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 w-full bg-white p-8 rounded-2xl shadow-lg border border-emerald-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <AlertCircle className="text-emerald-600" />
                                    <h4 className="font-bold text-lg">Cotiza Gratis Tu Zona</h4>
                                </div>
                                <p className="text-gray-600 text-sm mb-6">
                                    A veces el plan más barato es aquel que no requiere comprar equipos adicionales. Nuestros asesores verifican tu cobertura exacta.
                                </p>
                                <QuickCallForm />
                            </div>
                        </div>
                    </div>

                    {/* FAQ */}
                    <div className="max-w-3xl mx-auto">
                        <h3 className="text-2xl font-bold text-center mb-8">Preguntas Frecuentes</h3>
                        <div className="space-y-4">
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <h4 className="font-bold text-lg mb-2">¿Cuál es el internet más barato en Bogotá?</h4>
                                <p className="text-gray-600">Actualmente ETB ofrece planes de fibra desde $49.900 en zonas de cobertura específica para estratos 1 y 2.</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <h4 className="font-bold text-lg mb-2">¿Necesito cláusula de permanencia?</h4>
                                <p className="text-gray-600">Los planes más económicos suelen requerir 12 meses de permanencia para ofrecerte la instalación gratuita. Sin permanencia, la instalación puede costar hasta $150.000.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
}
