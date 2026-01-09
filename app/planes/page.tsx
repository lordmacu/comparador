import Link from "next/link";
import { Star, Wifi, Clock, MapPin, Phone, Shield, Zap, Flame, PartyPopper, Calculator, Video } from "lucide-react";
import QuickCallForm from "@/components/QuickCallForm";

// Schema.org structured data for internet plans with Product markup
const planesStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://comparadorinternet.co/planes",
      "name": "Planes de Internet Bogotá 2026",
      "description": "Planes de internet disponibles en Bogotá con precios, velocidades y características detalladas",
      "mainEntity": {
        "@type": "ItemList",
        "name": "Planes Internet Bogotá",
        "description": "Lista completa de planes de internet disponibles en Bogotá",
        "numberOfItems": 12,
        "itemListElement": [
          {
            "@type": "Product",
            "name": "ETB Fibra 300 Mbps",
            "description": "Plan de internet residencial con fibra óptica de 300 Mbps simétricos",
            "brand": "ETB",
            "category": "Internet Service",
            "offers": {
              "@type": "Offer",
              "price": "89900",
              "priceCurrency": "COP",
              "availability": "https://schema.org/InStock",
              "validFrom": "2026-01-01"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": 4.6,
              "reviewCount": 847,
              "bestRating": 5
            }
          },
          {
            "@type": "Product", 
            "name": "Claro Internet 200 Mbps",
            "description": "Plan de internet residencial con tecnología híbrida de 200 Mbps",
            "brand": "Claro",
            "category": "Internet Service",
            "offers": {
              "@type": "Offer",
              "price": "79900",
              "priceCurrency": "COP", 
              "availability": "https://schema.org/InStock",
              "validFrom": "2026-01-01"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": 3.8,
              "reviewCount": 623,
              "bestRating": 5
            }
          },
          {
            "@type": "Product",
            "name": "Movistar Fibra 500 Mbps", 
            "description": "Plan premium de internet con fibra óptica de 500 Mbps para hogar",
            "brand": "Movistar",
            "category": "Internet Service",
            "offers": {
              "@type": "Offer",
              "price": "119900",
              "priceCurrency": "COP",
              "availability": "https://schema.org/InStock", 
              "validFrom": "2026-01-01"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": 4.5,
              "reviewCount": 392,
              "bestRating": 5
            }
          }
        ]
      }
    }
  ]
};

interface Plan {
  id: string;
  provider: "ETB" | "Claro" | "Movistar";
  name: string;
  speed: string;
  uploadSpeed?: string;
  price: number;
  originalPrice?: number;
  technology: "Fibra Óptica" | "Cable" | "Híbrido";
  features: string[];
  rating: number;
  reviewCount: number;
  coverage: string[];
  popular?: boolean;
  promo?: string;
}

const plans: Plan[] = [
  {
    id: "etb-fibra-300",
    provider: "ETB",
    name: "ETB Fibra 300",
    speed: "300 Mbps",
    uploadSpeed: "300 Mbps",
    price: 89900,
    technology: "Fibra Óptica",
    features: [
      "Velocidad simétrica (subida = bajada)",
      "Instalación gratuita",
      "Router WiFi 6 incluido", 
      "Soporte técnico 24/7",
      "Sin permanencia mínima"
    ],
    rating: 4.6,
    reviewCount: 847,
    coverage: ["Chapinero", "Usaquén", "Zona Rosa", "Centro"],
    popular: true
  },
  {
    id: "claro-internet-200",
    provider: "Claro",
    name: "Claro Internet 200",
    speed: "200 Mbps", 
    uploadSpeed: "20 Mbps",
    price: 79900,
    originalPrice: 99900,
    technology: "Híbrido",
    features: [
      "Descarga hasta 200 Mbps",
      "Router WiFi incluido",
      "Claro Video incluido",
      "Apps móviles sin costo de datos",
      "Soporte técnico especializado"
    ],
    rating: 3.8,
    reviewCount: 623, 
    coverage: ["Suba", "Kennedy", "Bosa", "Engativá"],
    promo: "2 meses gratis"
  },
  {
    id: "movistar-fibra-500",
    provider: "Movistar",
    name: "Movistar Fibra 500",
    speed: "500 Mbps",
    uploadSpeed: "100 Mbps", 
    price: 119900,
    technology: "Fibra Óptica",
    features: [
      "Velocidad premium 500 Mbps",
      "Fibra óptica hasta el hogar",
      "Router Mesh incluido",
      "Netflix por 6 meses",
      "Gaming Mode optimizado"
    ],
    rating: 4.5,
    reviewCount: 392,
    coverage: ["Chapinero", "Zona Norte", "La Candelaria", "Teusaquillo"], 
    popular: true
  },
  {
    id: "etb-basico-100",
    provider: "ETB", 
    name: "ETB Básico 100",
    speed: "100 Mbps",
    uploadSpeed: "100 Mbps",
    price: 49900,
    technology: "Fibra Óptica",
    features: [
      "Plan básico residencial",
      "Velocidad simétrica",
      "Ideal para 2-3 personas",
      "Router básico incluido",
      "Instalación sin costo"
    ],
    rating: 4.3,
    reviewCount: 1203,
    coverage: ["Fontibón", "Kennedy", "Bosa", "Ciudad Bolívar"]
  },
  {
    id: "claro-hogar-100",
    provider: "Claro",
    name: "Claro Hogar 100", 
    speed: "100 Mbps",
    uploadSpeed: "10 Mbps",
    price: 59900,
    technology: "Cable",
    features: [
      "Plan hogar económico",
      "Claro Música incluido",
      "WiFi de doble banda",
      "Descuentos en móvil",
      "Atención preferencial"
    ],
    rating: 3.5,
    reviewCount: 892,
    coverage: ["Suba", "Engativá", "Barrios Unidos", "San Cristóbal"]
  },
  {
    id: "movistar-smart-200",
    provider: "Movistar",
    name: "Movistar Smart 200",
    speed: "200 Mbps", 
    uploadSpeed: "50 Mbps",
    price: 89900,
    originalPrice: 109900,
    technology: "Fibra Óptica",
    features: [
      "Plan inteligente conectado",
      "Movistar TV incluida",
      "Control parental avanzado",
      "Backup de conexión",
      "Smart Home compatible"
    ],
    rating: 4.2,
    reviewCount: 567,
    coverage: ["Chapinero", "Rosales", "Zona T", "Chicó"],
    promo: "TV gratis 3 meses"
  },
  {
    id: "etb-gaming-500",
    provider: "ETB",
    name: "ETB Gaming 500",
    speed: "500 Mbps",
    uploadSpeed: "500 Mbps",
    price: 149900,
    technology: "Fibra Óptica",
    features: [
      "Optimizado para gaming",
      "Ping ultra bajo < 5ms", 
      "QoS gaming prioritario",
      "Router gaming incluido",
      "Soporte gamer 24/7"
    ],
    rating: 4.8,
    reviewCount: 234,
    coverage: ["Chapinero", "Usaquén", "Zona Rosa", "Santa Bárbara"]
  },
  {
    id: "claro-premium-300",
    provider: "Claro",
    name: "Claro Premium 300",
    speed: "300 Mbps",
    uploadSpeed: "30 Mbps",
    price: 99900,
    technology: "Híbrido", 
    features: [
      "Plan premium familiar",
      "Paramount+ incluido",
      "Router tri-banda",
      "Soporte premium",
      "Garantía de velocidad"
    ],
    rating: 4.0,
    reviewCount: 445,
    coverage: ["Suba", "Kennedy", "Fontibón", "Puente Aranda"]
  },
  {
    id: "movistar-empresarial-200",
    provider: "Movistar",
    name: "Movistar Empresarial 200", 
    speed: "200 Mbps",
    uploadSpeed: "200 Mbps",
    price: 199900,
    technology: "Fibra Óptica",
    features: [
      "Plan empresarial",
      "IP estática incluida",
      "SLA 99.5% disponibilidad",
      "Soporte técnico prioritario",
      "Facturación empresarial"
    ],
    rating: 4.7,
    reviewCount: 156,
    coverage: ["Centro", "Zona Industrial", "Chapinero", "Zona T"]
  },
  {
    id: "etb-teletrabajo-200",
    provider: "ETB",
    name: "ETB Teletrabajo 200",
    speed: "200 Mbps", 
    uploadSpeed: "200 Mbps",
    price: 79900,
    technology: "Fibra Óptica",
    features: [
      "Diseñado para trabajo remoto",
      "Velocidad simétrica garantizada",
      "VPN optimizada",
      "Backup de conectividad",
      "Videollamadas HD sin cortes"
    ],
    rating: 4.4,
    reviewCount: 678,
    coverage: ["Teusaquillo", "Chapinero", "Usaquén", "Zona Norte"],
    popular: true
  },
  {
    id: "claro-familia-150",
    provider: "Claro", 
    name: "Claro Familia 150",
    speed: "150 Mbps",
    uploadSpeed: "15 Mbps",
    price: 69900,
    technology: "Cable",
    features: [
      "Plan familiar completo",
      "Control parental incluido",
      "Apps educativas gratis",
      "Streaming sin límites",
      "WiFi para toda la casa"
    ],
    rating: 3.7,
    reviewCount: 789,
    coverage: ["Kennedy", "Bosa", "Tunjuelito", "Rafael Uribe"]
  },
  {
    id: "movistar-ultra-1000",
    provider: "Movistar",
    name: "Movistar Ultra 1000",
    speed: "1000 Mbps",
    uploadSpeed: "200 Mbps",
    price: 199900,
    originalPrice: 249900, 
    technology: "Fibra Óptica",
    features: [
      "Velocidad gigabit",
      "La más alta velocidad disponible",
      "Router WiFi 6E incluido", 
      "Amazon Prime incluido",
      "Instalación premium"
    ],
    rating: 4.9,
    reviewCount: 89,
    coverage: ["Chapinero", "Usaquén", "Santa Barbara", "Zona T"],
    promo: "50% descuento 6 meses"
  }
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
          }`}
        />
      ))}
      <span className="ml-1 text-sm font-medium text-gray-700">{rating}</span>
    </div>
  );
};

const PlanCard = ({ plan }: { plan: Plan }) => {
  const providerColors = {
    ETB: {
      bg: "from-green-500 to-emerald-600",
      badge: "bg-green-100 text-green-800",
      button: "bg-green-600 hover:bg-green-700"
    },
    Claro: {
      bg: "from-red-500 to-red-600", 
      badge: "bg-red-100 text-red-800",
      button: "bg-red-600 hover:bg-red-700"
    },
    Movistar: {
      bg: "from-blue-500 to-blue-600",
      badge: "bg-blue-100 text-blue-800", 
      button: "bg-blue-600 hover:bg-blue-700"
    }
  };

  const colors = providerColors[plan.provider];

  return (
    <div className={`bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${plan.popular ? 'ring-2 ring-blue-200 scale-105' : ''}`}>
      {/* Header */}
      <div className={`bg-gradient-to-r ${colors.bg} text-white p-6 relative`}>
        {plan.popular && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <span className="bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1">
              <Flame className="w-4 h-4" />
              Más Popular
            </span>
          </div>
        )}
        
        <div className="flex items-center justify-between mb-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${colors.badge.replace('text-', 'text-').replace('bg-', 'bg-white bg-opacity-20 text-white')}`}>
            {plan.provider}
          </span>
          <span className="text-sm opacity-90">{plan.technology}</span>
        </div>

        <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
        
        <div className="flex items-baseline space-x-2">
          <span className="text-4xl font-bold">${plan.price.toLocaleString()}</span>
          <span className="text-lg opacity-80">/mes</span>
        </div>
        
        {plan.originalPrice && (
          <div className="flex items-center space-x-2 mt-2">
            <span className="text-sm line-through opacity-70">
              ${plan.originalPrice.toLocaleString()}
            </span>
            <span className="bg-white bg-opacity-20 text-white px-2 py-1 rounded text-xs font-medium">
              AHORRO ${(plan.originalPrice - plan.price).toLocaleString()}
            </span>
          </div>
        )}
      </div>

      {/* Speed Info */}
      <div className="p-6 bg-gray-50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-blue-600" />
            <div>
              <span className="text-2xl font-bold text-gray-900">{plan.speed}</span>
              <span className="text-gray-600 ml-1">descarga</span>
            </div>
          </div>
          
          {plan.uploadSpeed && (
            <div className="text-right">
              <span className="text-lg font-semibold text-gray-700">{plan.uploadSpeed}</span>
              <span className="text-gray-500 text-sm block">subida</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <StarRating rating={plan.rating} />
          <span className="text-sm text-gray-500">
            ({plan.reviewCount.toLocaleString()} reseñas)
          </span>
        </div>
      </div>

      {/* Features */}
      <div className="p-6">
        <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
          <Shield className="w-4 h-4 mr-2 text-green-600" />
          Características Incluidas
        </h4>
        
        <ul className="space-y-2 mb-6">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start space-x-2 text-sm text-gray-600">
              <span className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* Coverage */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
            <MapPin className="w-4 h-4 mr-2 text-blue-600" />
            Cobertura Disponible
          </h4>
          <div className="flex flex-wrap gap-1">
            {plan.coverage.slice(0, 3).map((area, index) => (
              <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                {area}
              </span>
            ))}
            {plan.coverage.length > 3 && (
              <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                +{plan.coverage.length - 3} más
              </span>
            )}
          </div>
        </div>

        {/* Promo */}
        {plan.promo && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
            <div className="flex items-center space-x-2">
              <PartyPopper className="w-5 h-5 text-yellow-600" />
              <span className="text-yellow-800 font-medium text-sm">{plan.promo}</span>
            </div>
          </div>
        )}

        {/* CTA Button */}
        <button className={`w-full ${colors.button} text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2`}>
          <Phone className="w-4 h-4" />
          <span>Contratar Plan</span>
        </button>
      </div>
    </div>
  );
};

const FilterSection = ({ 
  selectedProvider, 
  selectedSpeed,
  selectedPrice,
  onProviderChange, 
  onSpeedChange,
  onPriceChange
}: { 
  selectedProvider: string;
  selectedSpeed: string;
  selectedPrice: string;
  onProviderChange: (provider: string) => void;
  onSpeedChange: (speed: string) => void;
  onPriceChange: (price: string) => void;
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Filtrar Planes</h3>
      
      <div className="grid md:grid-cols-3 gap-4">
        {/* Provider Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Operador</label>
          <select 
            value={selectedProvider}
            onChange={(e) => onProviderChange(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Todos">Todos los operadores</option>
            <option value="ETB">ETB</option>
            <option value="Claro">Claro</option>
            <option value="Movistar">Movistar</option>
          </select>
        </div>

        {/* Speed Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Velocidad</label>
          <select
            value={selectedSpeed}
            onChange={(e) => onSpeedChange(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Todas">Todas las velocidades</option>
            <option value="100">100 Mbps o menos</option>
            <option value="200">200 Mbps</option>
            <option value="300">300 Mbps o más</option>
            <option value="500">500 Mbps o más</option>
          </select>
        </div>

        {/* Price Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Precio</label>
          <select
            value={selectedPrice}
            onChange={(e) => onPriceChange(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Todos">Todos los precios</option>
            <option value="50000">Hasta $50.000</option>
            <option value="100000">$50.000 - $100.000</option>
            <option value="150000">$100.000 - $150.000</option>
            <option value="200000">Más de $150.000</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default function PlanesPage() {
  const popularPlans = plans.filter(plan => plan.popular);
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(planesStructuredData),
        }}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Planes de Internet Bogotá 2026
              </h1>
              <p className="text-xl md:text-2xl text-indigo-100 mb-8">
                Compara precios, velocidades y características de todos los operadores
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 text-indigo-100">
                <div className="flex items-center">
                  <Wifi className="w-6 h-6 text-white mr-2" />
                  <span className="text-lg">12 Planes Disponibles</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-6 h-6 text-yellow-400 mr-2" />
                  <span className="text-lg">Ratings Verificados</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-6 h-6 text-white mr-2" />
                  <span className="text-lg">Actualizado 2026</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Plans */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Planes Más Populares
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Los planes más contratados y mejor valorados por los usuarios en Bogotá
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {popularPlans.map((plan) => (
                  <PlanCard key={plan.id} plan={plan} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* All Plans */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Todos los Planes Disponibles
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Encuentra el plan perfecto para tu hogar u oficina comparando todas las opciones
                </p>
              </div>

              {/* Filter Section would go here */}
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {plans.map((plan) => (
                  <PlanCard key={plan.id} plan={plan} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="bg-gray-100 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Comparación Rápida por Operador
                </h2>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                {['ETB', 'Claro', 'Movistar'].map((provider) => {
                  const providerPlans = plans.filter(p => p.provider === provider);
                  const avgRating = providerPlans.reduce((acc, p) => acc + p.rating, 0) / providerPlans.length;
                  const minPrice = Math.min(...providerPlans.map(p => p.price));
                  
                  return (
                    <div key={provider} className="bg-white p-6 rounded-lg shadow-lg text-center">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">{provider}</h3>
                      <div className="space-y-3">
                        <div>
                          <span className="block text-sm text-gray-600">Planes disponibles</span>
                          <span className="text-xl font-semibold text-gray-900">{providerPlans.length}</span>
                        </div>
                        <div>
                          <span className="block text-sm text-gray-600">Desde</span>
                          <span className="text-xl font-semibold text-gray-900">
                            ${minPrice.toLocaleString()}/mes
                          </span>
                        </div>
                        <div>
                          <span className="block text-sm text-gray-600 mb-1">Rating promedio</span>
                          <StarRating rating={Math.round(avgRating * 10) / 10} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                ¿No sabes cuál plan elegir?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Usa nuestras herramientas para encontrar el plan perfecto según tu uso y presupuesto
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
                <Link
                  href="/calculadora"
                  className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Calculator className="w-5 h-5" />
                  Calculadora de Internet
                </Link>
                <Link
                  href="/testimonios"
                  className="bg-yellow-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Star className="w-5 h-5" />
                  Ver Opiniones Reales
                </Link>
                <Link
                  href="/videos"
                  className="border-2 border-indigo-600 text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Video className="w-5 h-5" />
                  Videos Comparativos
                </Link>
              </div>

              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Asesoría Personalizada Gratuita
                </h3>
                <p className="text-gray-600 mb-6">
                  Nuestros expertos analizan tu ubicación, uso y presupuesto para 
                  recomendarte el plan ideal. Sin compromisos.
                </p>
                <QuickCallForm />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}