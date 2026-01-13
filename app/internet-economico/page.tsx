import type { Metadata } from 'next';
import Link from 'next/link';
import { PiggyBank, Search, CheckCircle2, AlertCircle, TrendingDown, Phone, ArrowUpRight, MapPin } from 'lucide-react';
import QuickCallForm from '@/components/QuickCallForm';

export const metadata: Metadata = {
    title: 'Internet Hogar Económico Bogotá 2026 | Planes desde $42.000',
    description: '¿Buscas internet hogar barato en Bogotá? Compara planes económicos para Estrato 1, 2 y 3. Cobertura en Suba, Kennedy, Engativá y más. Instalación gratis.',
    keywords: ['internet hogar bogota', 'internet hogar economico bogota', 'plan solo internet hogar', 'internet barato bogota', 'planes internet bogota estrato 2'],
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
        features: ['Instalación Gratis Bogotá', 'Fibra Óptica Pura', 'Soporte Local'],
        bestFor: 'Estudiantes',
        color: 'blue'
    },
    {
        provider: 'Claro',
        name: 'Hogar Básico',
        speed: 100,
        price: 58900,
        features: ['Cobertura en el 99% de Bogotá', 'Claro Video', 'Red de Respaldo'],
        bestFor: 'Familias',
        color: 'red'
    },
    {
        provider: 'Movistar',
        name: 'Fibra Pura',
        speed: 200,
        price: 62900,
        features: ['Descuento en Suba y Norte', 'Simetría total', 'App Smart WiFi'],
        bestFor: 'Teletrabajo',
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
                        <MapPin size={16} /> OFERTA EXCLUSIVA BOGOTÁ 2026
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">Internet Hogar Económico en Bogotá</h1>
                    <p className="text-xl md:text-2xl text-emerald-100 max-w-2xl mx-auto mb-10">
                        Encuentra los planes más baratos para tu localidad. Cobertura garantizada en el norte, sur y occidente de la capital.
                    </p>

                    <div className="bg-white p-6 rounded-2xl shadow-xl max-w-4xl mx-auto transform translate-y-8">
                        <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                            <div className="p-4">
                                <div className="text-gray-500 text-sm mb-1 uppercase font-bold">Desde</div>
                                <div className="text-3xl font-black text-emerald-600">$49.900</div>
                                <div className="text-xs text-gray-400">Mensual en Bogotá</div>
                            </div>
                            <div className="p-4">
                                <div className="text-gray-500 text-sm mb-1 uppercase font-bold">Beneficio Local</div>
                                <div className="text-3xl font-black text-emerald-600">$0 Costo</div>
                                <div className="text-xs text-gray-400">Instalación (Estratos 1-3)</div>
                            </div>
                            <div className="p-4 flex flex-col justify-center">
                                <Link href="#lista-planes" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2">
                                    Ver Planes por Zona <ArrowUpRight size={18} />
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
                        <h2 className="text-3xl font-bold text-gray-900">Planes de Internet más Baratos en Bogotá</h2>
                        <p className="text-gray-600 mt-2">Precios verificados para Kennedy, Suba, Engativá y Bosa.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
                        {cheapPlans.map((plan, idx) => (
                            <div key={idx} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow relative">
                                {idx === 0 && (
                                    <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-bl-lg">
                                        RECOMENDADO BOGOTÁ
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
                                        <MapPin className="text-green-600" size={20} />
                                        <span className="text-sm font-medium">Cobertura total en tu barrio</span>
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

                                    <Link href={`/${plan.provider.toLowerCase()}/planes`} className={`block w-full py-3 rounded-lg font-bold text-center text-white bg-${plan.color}-600 hover:bg-${plan.color}-700 transition-colors`}>
                                        Ver Disponibilidad
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Local Tips Section */}
                    <div className="bg-emerald-50 rounded-3xl p-8 md:p-12 mb-16">
                        <div className="flex flex-col md:flex-row gap-12 items-center">
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold mb-6">Consejos para ahorrar en Bogotá</h3>
                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <div className="bg-white p-3 rounded-full h-fit text-emerald-600 shadow-sm"><PiggyBank size={24} /></div>
                                        <div>
                                            <h4 className="font-bold text-lg">Plan Solo Internet Hogar vs Triple Play</h4>
                                            <p className="text-gray-600 text-sm">Si quieres ahorrar, busca un "Plan Solo Internet Hogar". La TV y telefonía pueden subir tu factura hasta un 40%.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="bg-white p-3 rounded-full h-fit text-emerald-600 shadow-sm"><Search size={24} /></div>
                                        <div>
                                            <h4 className="font-bold text-lg">Fibra vs Cobre</h4>
                                            <p className="text-gray-600 text-sm">
                                                En barrios antiguos de Teusaquillo o Chapinero aún hay redes de cobre. Exige siempre Fibra Óptica para garantizar tu velocidad.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 w-full bg-white p-8 rounded-2xl shadow-lg border border-emerald-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <AlertCircle className="text-emerald-600" />
                                    <h4 className="font-bold text-lg">Validador de Cobertura Bogotá</h4>
                                </div>
                                <p className="text-gray-600 text-sm mb-6">
                                    Ingresa tu número y te decimos qué operador tiene la infraestructura más nueva en tu cuadra.
                                </p>
                                <QuickCallForm />
                            </div>
                        </div>
                    </div>

                    {/* FAQ */}
                    <div className="max-w-3xl mx-auto">
                        <h3 className="text-2xl font-bold text-center mb-8">Preguntas Frecuentes Bogotá</h3>
                        <div className="space-y-4">
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <h4 className="font-bold text-lg mb-2">¿Qué operador es más económico en Bogotá?</h4>
                                <p className="text-gray-600">ETB suele tener los precios de entrada más bajos para fibra óptica en Bogotá, seguido de cerca por las ofertas de portabilidad de Movistar en el norte de la ciudad.</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <h4 className="font-bold text-lg mb-2">¿Hay internet gratuito en Bogotá?</h4>
                                <p className="text-gray-600">Existen Zonas Wifi Gratis del Distrito en parques y portales de Transmilenio, pero para el hogar recomendamos planes básicos desde $49.900 para garantizar estabilidad.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
}
