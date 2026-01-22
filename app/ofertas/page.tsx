import type { Metadata } from 'next';
import Link from 'next/link';
import { Clock, Gift, Percent, TrendingUp, Zap, Phone, Check, AlertCircle, Calendar } from 'lucide-react';
import QuickCallForm from '@/components/QuickCallForm';

export const metadata: Metadata = {
  title: 'Ofertas Internet Enero 2026 | Promociones y Descuentos Exclusivos',
  description: 'Ofertas y promociones de internet en Colombia - Enero 2026. Descuentos sujetos a cobertura y condiciones vigentes. ETB, Claro y Movistar. Cotiza y contrata con asesoría inmediata.',
  keywords: [
    'ofertas internet colombia 2026',
    'promociones internet enero',
    'descuentos internet fibra',
    'meses gratis internet',
    'ofertas claro movistar etb',
    'promociones internet bogota',
    'internet barato colombia',
    'ofertas internet fibra optica',
  ],
  alternates: {
    canonical: 'https://comparadorinternet.co/ofertas',
  },
  openGraph: {
    title: 'Ofertas Internet Enero 2026 | Hasta 3 Meses Gratis + Descuentos 50%',
    description: 'Promociones de internet en Colombia. Descuentos sujetos a cobertura y condiciones vigentes. Válido enero 2026.',
    url: 'https://comparadorinternet.co/ofertas',
    siteName: 'Comparador Internet Colombia',
    locale: 'es_CO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ofertas Internet Enero 2026 | Promociones Exclusivas',
    description: 'Promociones de internet: meses de descuento y beneficios sujetos a condiciones vigentes.',
  },
};

interface Offer {
  id: string;
  provider: 'ETB' | 'Claro' | 'Movistar';
  title: string;
  subtitle: string;
  speed: number;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  benefits: string[];
  savings: number;
  validUntil: string;
  terms: string;
  featured?: boolean;
  limited?: boolean;
  color: 'blue' | 'green' | 'red';
}

const offers: Offer[] = [
  {
    id: 'etb-promo-910',
    provider: 'ETB',
    title: '30% Descuento 12 Meses',
    subtitle: 'Internet Fibra 910 Mb',
    speed: 910,
    originalPrice: 89900,
    discountedPrice: 62930,
    discount: 30,
    benefits: [
      'Promo 12 meses (estratos 1-3)',
      'Velocidad simétrica 910 Mb',
      'DGO y/o Universal+ primer mes sin costo',
      'Win Play y/o Hot Pack 50% meses 1 y 2',
      'Validación de cobertura por dirección',
    ],
    savings: 323640,
    validUntil: '2026-02-28',
    terms: 'Aplica para nuevos clientes. Estratos 4-6: $69.930 promo / $99.900 plena.',
    featured: true,
    limited: true,
    color: 'blue',
  },
  {
    id: 'movistar-disney',
    provider: 'Movistar',
    title: 'Disney+ 12 Meses Gratis',
    subtitle: 'Fibra 600 Mbps Simétrica',
    speed: 600,
    originalPrice: 119900,
    discountedPrice: 89900,
    discount: 25,
    benefits: [
      'Disney+ Premium por 12 meses',
      'Descuento de $30.000/mes',
      'Ultra Fibra 600 Mbps simétrica',
      'Router WiFi 6 mesh incluido',
      'Gaming mode optimizado',
    ],
    savings: 480000,
    validUntil: '2026-01-31',
    terms: 'Disney+ gratis por 12 meses luego renueva automáticamente. Descuento válido por 6 meses.',
    featured: true,
    color: 'green',
  },
  {
    id: 'claro-streaming',
    provider: 'Claro',
    title: 'HBO Max + Paramount+ Incluidos',
    subtitle: 'Internet 600 Mbps',
    speed: 600,
    originalPrice: 149900,
    discountedPrice: 109900,
    discount: 27,
    benefits: [
      'Beneficios digitales según promoción vigente',
      'Validación de cobertura por dirección',
      'Router WiFi incluido (según plan)',
      'Soporte técnico',
      'Ahorra $40.000/mes',
      'Router tri-banda premium',
    ],
    savings: 240000,
    validUntil: '2026-01-31',
    terms: 'Promoción válida para nuevos clientes y portabilidad. Permanencia mínima de 12 meses.',
    featured: true,
    limited: true,
    color: 'red',
  },
  {
    id: 'etb-todos-conectados-200',
    provider: 'ETB',
    title: '30% Descuento 6 Meses',
    subtitle: 'Internet 200 Mb (Todos Conectados)',
    speed: 200,
    originalPrice: 59900,
    discountedPrice: 41930,
    discount: 30,
    benefits: [
      'Promo 6 meses Bogotá estratos 2-3',
      'Fibra 100% simétrica',
      'DGO y/o Universal+ primer mes sin costo',
      'Win Play y/o Hot Go 50% meses 1 y 2',
      'Tarifa plena $59.900',
    ],
    savings: 107820,
    validUntil: '2026-02-28',
    terms: 'Municipios estratos 1-6: $39.534 por 12 meses. Valores sujetos a cobertura.',
    color: 'blue',
  },
  {
    id: 'movistar-gamer',
    provider: 'Movistar',
    title: '50% Descuento 6 Meses',
    subtitle: 'Ultra Fibra Gaming 900 Mbps',
    speed: 900,
    originalPrice: 199900,
    discountedPrice: 99950,
    discount: 50,
    benefits: [
      'Mitad de precio por 6 meses',
      'Ping ultra bajo < 5ms',
      'Router gaming WiFi 6E',
      'QoS gaming prioritario',
      'Amazon Prime 6 meses',
      'Soporte gamer 24/7',
    ],
    savings: 599400,
    validUntil: '2026-01-31',
    terms: 'Descuento aplicable durante los primeros 6 meses. Luego precio regular.',
    limited: true,
    color: 'green',
  },
  {
    id: 'claro-familia',
    provider: 'Claro',
    title: 'Internet hogar desde $79.900',
    subtitle: 'Plan Familia Completo 400 Mbps',
    speed: 400,
    originalPrice: 119900,
    discountedPrice: 79900,
    discount: 33,
    benefits: [
      'Ahorro de $40.000/mes',
      'Claro Video + Claro Música',
      'Control parental avanzado',
      'Apps móviles sin costo de datos',
      'Descuento permanente',
    ],
    savings: 480000,
    validUntil: '2026-01-31',
    terms: 'Precio promocional por 12 meses con permanencia mínima.',
    color: 'red',
  },
];

const CountdownTimer = ({ validUntil }: { validUntil: string }) => {
  const endDate = new Date(validUntil);
  const now = new Date();
  const daysLeft = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="inline-flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg font-bold text-sm">
      <Clock className="w-4 h-4 animate-pulse" />
      <span>¡Quedan solo {daysLeft} días!</span>
    </div>
  );
};

const OfferCard = ({ offer }: { offer: Offer }) => {
  const bgGradients = {
    blue: 'from-blue-600 to-blue-700',
    green: 'from-green-600 to-green-700',
    red: 'from-red-600 to-red-700',
  };

  const badgeColors = {
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    red: 'bg-red-100 text-red-800',
  };

  const buttonColors = {
    blue: 'bg-blue-600 hover:bg-blue-700',
    green: 'bg-green-600 hover:bg-green-700',
    red: 'bg-red-600 hover:bg-red-700',
  };

  return (
    <div
      className={`bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all hover:scale-105 ${
        offer.featured ? 'ring-4 ring-yellow-400' : ''
      }`}
    >
      {/* Header con descuento */}
      <div className={`bg-gradient-to-r ${bgGradients[offer.color]} text-white p-6 relative`}>
        {offer.featured && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
            <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-1">
              ⭐ OFERTA DESTACADA
            </span>
          </div>
        )}

        {offer.limited && (
          <div className="absolute top-4 right-4">
            <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
              CUPOS LIMITADOS
            </span>
          </div>
        )}

        <div className="mb-4">
          <span className={`inline-block ${badgeColors[offer.color].replace('text-', 'text-white bg-white/20')} px-3 py-1 rounded-full text-sm font-semibold`}>
            {offer.provider}
          </span>
        </div>

        <h3 className="text-3xl font-black mb-2">{offer.title}</h3>
        <p className="text-xl text-white/90">{offer.subtitle}</p>

        <div className="mt-4 flex items-center gap-2">
          <Zap className="w-6 h-6" />
          <span className="text-2xl font-bold">{offer.speed} Mbps</span>
        </div>
      </div>

      {/* Precio y descuento */}
      <div className="p-6 bg-gradient-to-br from-gray-50 to-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-gray-900">
                ${offer.discountedPrice.toLocaleString('es-CO')}
              </span>
              <span className="text-gray-600">/mes</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-lg text-gray-500 line-through">
                ${offer.originalPrice.toLocaleString('es-CO')}
              </span>
              <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-bold">
                -{offer.discount}%
              </span>
            </div>
          </div>

          <div className="text-center">
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg">
              <div className="text-xs font-semibold">AHORRAS</div>
              <div className="text-2xl font-black">
                ${offer.savings.toLocaleString('es-CO')}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <CountdownTimer validUntil={offer.validUntil} />
        </div>

        {/* Beneficios */}
        <div className="space-y-3 mb-6">
          {offer.benefits.map((benefit, index) => (
            <div key={index} className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-700">{benefit}</span>
            </div>
          ))}
        </div>

        {/* Terms */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-yellow-800">{offer.terms}</p>
          </div>
        </div>

        {/* CTA */}
        <Link
          href={`/${offer.provider.toLowerCase()}`}
          className={`block w-full text-center py-4 px-6 rounded-xl font-bold text-white transition-all transform hover:scale-105 ${buttonColors[offer.color]} shadow-lg`}
        >
          Aprovechar esta oferta
        </Link>
      </div>
    </div>
  );
};

export default function OfertasPage() {
  const featuredOffers = offers.filter((o) => o.featured);
  const regularOffers = offers.filter((o) => !o.featured);

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Ofertas de Internet Colombia Enero 2026',
            description: 'Promociones y descuentos exclusivos en planes de internet',
            numberOfItems: offers.length,
            itemListElement: offers.map((offer, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              item: {
                '@type': 'Offer',
                name: `${offer.provider} - ${offer.title}`,
                description: offer.subtitle,
                price: offer.discountedPrice,
                priceCurrency: 'COP',
                availability: 'https://schema.org/InStock',
                priceValidUntil: offer.validUntil,
                seller: {
                  '@type': 'Organization',
                  name: offer.provider,
                },
                itemOffered: {
                  '@type': 'Service',
                  name: `Internet ${offer.speed} Mbps`,
                  category: 'Internet Service',
                },
              },
            })),
          }),
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-red-600 via-orange-600 to-pink-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6 animate-pulse">
                <Gift className="w-5 h-5" />
                <span className="font-bold">OFERTAS VÁLIDAS HASTA 31 DE ENERO 2026</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
                🔥 Ofertas Exclusivas de Internet
              </h1>

              <p className="text-2xl md:text-3xl text-orange-100 mb-8 font-semibold">
                Hasta <span className="text-white font-black">3 meses GRATIS</span> + Descuentos del <span className="text-white font-black">50%</span>
              </p>

              <div className="flex flex-wrap items-center justify-center gap-6">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-lg">
                  <Percent className="w-5 h-5" />
                  <span className="font-bold">Ahorra hasta $599.400</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-lg">
                  <Calendar className="w-5 h-5" />
                  <span className="font-bold">Promociones Enero 2026</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-lg">
                  <TrendingUp className="w-5 h-5" />
                  <span className="font-bold">Cupos Limitados</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Offers */}
        <section className="py-16 -mt-12 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                ⭐ Mejores Ofertas del Mes
              </h2>
              <p className="text-xl text-gray-600">
                Las promociones más populares con los mayores descuentos
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredOffers.map((offer) => (
                <OfferCard key={offer.id} offer={offer} />
              ))}
            </div>
          </div>
        </section>

        {/* Regular Offers */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Más Ofertas Disponibles
              </h2>
              <p className="text-lg text-gray-600">
                Promociones adicionales con excelentes beneficios
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {regularOffers.map((offer) => (
                <OfferCard key={offer.id} offer={offer} />
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Compara los Ahorros
              </h2>
              <p className="text-lg text-gray-600">
                Cuánto puedes ahorrar con cada promoción
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left font-bold">Operador</th>
                      <th className="px-6 py-4 text-left font-bold">Oferta</th>
                      <th className="px-6 py-4 text-left font-bold">Precio Normal</th>
                      <th className="px-6 py-4 text-left font-bold">Precio Oferta</th>
                      <th className="px-6 py-4 text-left font-bold">Ahorro Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {offers.map((offer, index) => (
                      <tr
                        key={offer.id}
                        className={`border-b border-gray-200 ${
                          offer.featured ? 'bg-yellow-50' : index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                        }`}
                      >
                        <td className="px-6 py-4 font-semibold">{offer.provider}</td>
                        <td className="px-6 py-4">
                          <div className="font-medium">{offer.title}</div>
                          <div className="text-sm text-gray-600">{offer.speed} Mbps</div>
                        </td>
                        <td className="px-6 py-4 text-gray-500 line-through">
                          ${offer.originalPrice.toLocaleString('es-CO')}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-lg font-bold text-green-600">
                            ${offer.discountedPrice.toLocaleString('es-CO')}
                          </div>
                          <span className="inline-block bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded-full">
                            -{offer.discount}%
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-xl font-black text-green-700">
                            ${offer.savings.toLocaleString('es-CO')}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-red-600 via-orange-600 to-pink-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Phone className="w-20 h-20 mx-auto mb-6" />

            <h2 className="text-4xl md:text-5xl font-black mb-6">
              ¡No Dejes Pasar Estas Ofertas!
            </h2>

            <p className="text-2xl text-orange-100 mb-8">
              Asegura tu cupo antes de que se acaben. Nuestros asesores te ayudan a elegir la mejor oferta para ti.
            </p>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md mx-auto mb-8">
              <QuickCallForm provider="Ofertas" />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5" />
                <span>Asesoría inmediata y gratuita</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5" />
                <span>Validamos cobertura al instante</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5" />
                <span>Garantizamos el mejor precio</span>
              </div>
            </div>
          </div>
        </section>

        {/* Legal */}
        <section className="py-8 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg p-6 shadow">
              <h3 className="font-bold text-gray-900 mb-3">⚠️ Términos y Condiciones de las Ofertas</h3>
              <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
                <li>Todas las ofertas son válidas hasta el 31 de enero de 2026 o hasta agotar cupos disponibles</li>
                <li>Aplican para nuevos clientes y portabilidad desde otros operadores</li>
                <li>Los precios mostrados no incluyen IVA cuando aplique</li>
                <li>Instalación sujeta a validación de cobertura técnica en el domicilio</li>
                <li>Algunos planes requieren permanencia mínima especificada en cada oferta</li>
                <li>Promociones de streaming (Disney+, HBO Max, etc.) requieren creación de cuenta y pueden renovarse automáticamente</li>
                <li>Los descuentos temporales aplican por el período indicado, luego tarifa regular</li>
                <li>Beneficios y condiciones específicos de cada operador aplican según términos individuales</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
