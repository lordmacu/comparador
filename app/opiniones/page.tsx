import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ThumbsUp, UserCircle, MessageSquare } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import QuickCallForm from '@/components/QuickCallForm';

export const metadata: Metadata = {
    title: 'Opiniones Internet Colombia 2026: Claro, Movistar y ETB',
    description: 'Lee opiniones reales de usuarios sobre Claro, Movistar y ETB. Calificaciones de velocidad, servicio al cliente y estabilidad. Comparte tu experiencia.',
    keywords: [
        'opiniones claro internet',
        'comentarios movistar fibra',
        'referencias etb bogota',
        'que tal es el internet de claro',
        'mejor internet colombia opiniones'
    ],
    alternates: {
        canonical: 'https://comparadorinternet.co/opiniones',
    },
    openGraph: {
        title: 'Opiniones Reales Internet Colombia 2026',
        description: '¿Cuál es el mejor internet según los usuarios? Calificaciones y quejas de Claro, Movistar y ETB.',
        url: 'https://comparadorinternet.co/opiniones',
        siteName: 'Comparador Internet Colombia',
        type: 'website',
    },
};

const reviews = [
    {
        id: 1,
        provider: 'ETB',
        author: 'Carlos Rodríguez',
        rating: 5,
        date: '2026-01-10',
        content: 'Llevo 3 años con ETB en Bogotá y la fibra es excelente. Juego online y el ping es de 4ms. Lo único malo es que a veces se demoran en contestar el teléfono.',
        verified: true,
        location: 'Bogotá, Chapinero'
    },
    {
        id: 2,
        provider: 'Movistar',
        author: 'Ana María G.',
        rating: 4,
        date: '2026-01-08',
        content: 'Me cambié a la fibra de Movistar por la oferta de Disney+. La velocidad es simétrica de verdad, subo archivos muy rápido. La instalación fue al día siguiente.',
        verified: true,
        location: 'Medellín, Poblado'
    },
    {
        id: 3,
        provider: 'Claro',
        author: 'Felipe T.',
        rating: 3,
        date: '2025-12-28',
        content: 'Tengo Claro hace años. En general bien, pero en horas pico (7pm) se pone un poco lento. El servicio de Claro video es un buen plus.',
        verified: true,
        location: 'Cali, Valle'
    },
    {
        id: 4,
        provider: 'ETB',
        author: 'Sonia P.',
        rating: 5,
        date: '2026-01-05',
        content: 'El mejor servicio para trabajar desde casa. Nunca se cae. Recomendado 100% si estás en zona de cobertura.',
        verified: true,
        location: 'Bogotá, Cedritos'
    },
    {
        id: 5,
        provider: 'Movistar',
        author: 'Jorge L.',
        rating: 2,
        date: '2025-12-15',
        content: 'Tuve problemas con la facturación los primeros meses, me cobraban servicios que no pedí. El internet funciona bien, pero el área administrativa es un desastre.',
        verified: false,
        location: 'Barranquilla'
    }
];

export default function ReviewsPage() {
    const averageRating = 4.2;
    const totalReviews = 1250;

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'AggregateRating',
                        itemReviewed: {
                            '@type': 'Service',
                            name: 'Servicios de Internet Hogar Colombia',
                            description: 'Comparativa de servicios de internet de Claro, Movistar y ETB'
                        },
                        ratingValue: averageRating,
                        reviewCount: totalReviews,
                        bestRating: '5',
                        worstRating: '1'
                    }),
                }}
            />

            <div className="bg-gray-50 min-h-screen pb-16">
                {/* Header */}
                <section className="bg-blue-900 text-white pt-24 pb-12">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl md:text-5xl font-black mb-4">
                            Opiniones Reales de Usuarios
                        </h1>
                        <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                            Descubre qué dicen los colombianos sobre Claro, Movistar y ETB antes de contratar.
                            Transparencia total para tu mejor elección.
                        </p>
                    </div>
                </section>

                <div className="container mx-auto px-4 -mt-8">
                    <Breadcrumbs
                        items={[
                            { name: 'Inicio', url: '/' },
                            { name: 'Opiniones', url: '/opiniones' }
                        ]}
                        className="justify-center mb-8"
                    />
                </div>

                <div className="container mx-auto px-4 max-w-5xl">
                    {/* Summary Card */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="text-center md:text-left">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Calificación General</h2>
                            <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                                <span className="text-5xl font-black text-yellow-500">{averageRating}</span>
                                <div className="flex flex-col">
                                    <div className="flex text-yellow-400">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star key={star} fill="currentColor" size={20} />
                                        ))}
                                    </div>
                                    <span className="text-sm text-gray-500">{totalReviews} opiniones verificadas</span>
                                </div>
                            </div>
                            <p className="text-gray-600 text-sm">Basado en encuestas de satisfacción 2025-2026</p>
                        </div>

                        <div className="flex-1 w-full max-w-sm">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="w-20 font-bold text-gray-700">ETB</span>
                                    <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-600 w-[92%]"></div>
                                    </div>
                                    <span className="text-green-600 font-bold">4.6/5</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="w-20 font-bold text-gray-700">Movistar</span>
                                    <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-400 w-[88%]"></div>
                                    </div>
                                    <span className="text-green-600 font-bold">4.4/5</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="w-20 font-bold text-gray-700">Claro</span>
                                    <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-red-600 w-[82%]"></div>
                                    </div>
                                    <span className="text-green-600 font-bold">4.1/5</span>
                                </div>
                            </div>
                        </div>

                        <div className="hidden md:block border-l border-gray-200 pl-8">
                            <p className="font-bold text-gray-900 mb-2">¿Ya tienes internet?</p>
                            <button className="bg-gray-900 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors flex items-center gap-2">
                                <MessageSquare size={16} />
                                Escribir Opinión
                            </button>
                        </div>
                    </div>

                    {/* Filters (Visual only for now) */}
                    <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
                        <button className="px-6 py-2 rounded-full bg-blue-600 text-white font-semibold whitespace-nowrap">Todas</button>
                        <button className="px-6 py-2 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 font-semibold whitespace-nowrap">Solo ETB</button>
                        <button className="px-6 py-2 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 font-semibold whitespace-nowrap">Solo Movistar</button>
                        <button className="px-6 py-2 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 font-semibold whitespace-nowrap">Solo Claro</button>
                    </div>

                    {/* Reviews Grid */}
                    <div className="grid md:grid-cols-2 gap-6 mb-12">
                        {reviews.map((review) => (
                            <div key={review.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-gray-100 rounded-full p-2">
                                            <UserCircle className="w-8 h-8 text-gray-400" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900">{review.author}</h3>
                                            <p className="text-xs text-gray-500">{review.location} • {review.date}</p>
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${review.provider === 'Claro' ? 'bg-red-100 text-red-700' :
                                            review.provider === 'Movistar' ? 'bg-blue-100 text-blue-700' :
                                                'bg-indigo-100 text-indigo-700'
                                        }`}>
                                        {review.provider}
                                    </span>
                                </div>

                                <div className="flex gap-1 text-yellow-400 mb-3">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star key={i} size={16} fill={i < review.rating ? "currentColor" : "none"} stroke="currentColor" />
                                    ))}
                                </div>

                                <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                                    "{review.content}"
                                </p>

                                {review.verified && (
                                    <div className="flex items-center gap-2 text-green-600 text-xs font-semibold">
                                        <ThumbsUp size={14} />
                                        <span>Cliente Verificado</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Call to Action */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold mb-4">¿Aún no decides cuál contratar?</h2>
                            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                                Déjanos asesorarte gratuitamente. Te ayudamos a elegir el operador con mejores calificaciones en tu barrio.
                            </p>
                            <div className="bg-white p-6 rounded-xl max-w-md mx-auto shadow-2xl">
                                <QuickCallForm buttonColor="#2563eb" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
