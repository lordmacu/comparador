import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MapPin, Phone, Clock, CheckCircle, TrendingUp, Users, Building } from 'lucide-react';
import QuickCallForm from '@/components/QuickCallForm';
import RelatedLinks from '@/components/RelatedLinks';

// Ciudad data structure
interface CityData {
  name: string;
  slug: string;
  region: string;
  population: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  providers: {
    name: string;
    coverage: string;
    speeds: string[];
    desde: string;
    destacado: boolean;
  }[];
  neighborhoods: string[];
  features: string[];
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
}

const ciudades: Record<string, CityData> = {
  'medellin': {
    name: 'Medellín',
    slug: 'medellin',
    region: 'Antioquia',
    population: '2.5 millones',
    coordinates: { lat: 6.2442, lng: -75.5812 },
    providers: [
      {
        name: 'Claro',
        coverage: '95%',
        speeds: ['100 Mbps', '200 Mbps', '300 Mbps', '600 Mbps'],
        desde: '$75,000',
        destacado: true
      },
      {
        name: 'Movistar',
        coverage: '90%',
        speeds: ['100 Mbps', '200 Mbps', '400 Mbps'],
        desde: '$70,000',
        destacado: true
      },
      {
        name: 'Tigo',
        coverage: '85%',
        speeds: ['100 Mbps', '200 Mbps', '300 Mbps'],
        desde: '$65,000',
        destacado: false
      },
      {
        name: 'UNE/EPM',
        coverage: '80%',
        speeds: ['100 Mbps', '300 Mbps', '500 Mbps'],
        desde: '$80,000',
        destacado: true
      }
    ],
    neighborhoods: ['El Poblado', 'Laureles', 'Envigado', 'Sabaneta', 'Belén', 'La América', 'Estadio', 'Centro'],
    features: [
      'Fibra óptica disponible en el 70% de la ciudad',
      'Excelente infraestructura de telecomunicaciones',
      'Múltiples proveedores con cobertura amplia',
      'Velocidades de hasta 600 Mbps disponibles',
      'Precios competitivos entre proveedores'
    ],
    seo: {
      title: 'Internet en Medellín 2026 - Comparador de Planes y Proveedores',
      description: 'Compara planes de internet en Medellín. Claro, Movistar, Tigo y UNE/EPM. Fibra óptica hasta 600 Mbps. Encuentra el mejor internet en Antioquia.',
      keywords: 'internet medellin, planes internet medellin, fibra optica medellin, claro medellin, movistar medellin, une epm, internet antioquia'
    }
  },
  'cali': {
    name: 'Cali',
    slug: 'cali',
    region: 'Valle del Cauca',
    population: '2.2 millones',
    coordinates: { lat: 3.4516, lng: -76.5320 },
    providers: [
      {
        name: 'Claro',
        coverage: '92%',
        speeds: ['100 Mbps', '200 Mbps', '300 Mbps', '500 Mbps'],
        desde: '$72,000',
        destacado: true
      },
      {
        name: 'Movistar',
        coverage: '88%',
        speeds: ['100 Mbps', '200 Mbps', '300 Mbps'],
        desde: '$68,000',
        destacado: true
      },
      {
        name: 'Tigo',
        coverage: '80%',
        speeds: ['100 Mbps', '200 Mbps', '400 Mbps'],
        desde: '$70,000',
        destacado: false
      },
      {
        name: 'Emcali',
        coverage: '75%',
        speeds: ['100 Mbps', '200 Mbps', '300 Mbps'],
        desde: '$75,000',
        destacado: true
      }
    ],
    neighborhoods: ['Granada', 'San Fernando', 'Ciudad Jardín', 'Chipichape', 'El Ingenio', 'Sur', 'Aguablanca', 'Norte'],
    features: [
      'Fibra óptica en expansión en zonas residenciales',
      'Emcali como proveedor local dominante',
      'Buena cobertura de operadores nacionales',
      'Velocidades competitivas hasta 500 Mbps',
      'Infraestructura mejorada en últimos años'
    ],
    seo: {
      title: 'Internet en Cali 2026 - Planes de Fibra Óptica y Proveedores',
      description: 'Mejores planes de internet en Cali. Compara Claro, Movistar, Tigo y Emcali. Fibra óptica hasta 500 Mbps. Internet en Valle del Cauca.',
      keywords: 'internet cali, planes internet cali, fibra optica cali, claro cali, movistar cali, emcali, internet valle del cauca'
    }
  },
  'barranquilla': {
    name: 'Barranquilla',
    slug: 'barranquilla',
    region: 'Atlántico',
    population: '1.2 millones',
    coordinates: { lat: 10.9685, lng: -74.7813 },
    providers: [
      {
        name: 'Claro',
        coverage: '93%',
        speeds: ['100 Mbps', '200 Mbps', '300 Mbps', '600 Mbps'],
        desde: '$78,000',
        destacado: true
      },
      {
        name: 'Movistar',
        coverage: '87%',
        speeds: ['100 Mbps', '200 Mbps', '400 Mbps'],
        desde: '$73,000',
        destacado: true
      },
      {
        name: 'Tigo',
        coverage: '82%',
        speeds: ['100 Mbps', '200 Mbps', '300 Mbps'],
        desde: '$68,000',
        destacado: false
      }
    ],
    neighborhoods: ['El Prado', 'Alto Prado', 'Riomar', 'Villa Country', 'El Poblado', 'Norte Centro Histórico', 'Metropolitana', 'Sur Occidente'],
    features: [
      'Excelente cobertura en zona norte',
      'Fibra óptica en expansión en toda la ciudad',
      'Hub tecnológico de la Costa Caribe',
      'Velocidades de hasta 600 Mbps disponibles',
      'Infraestructura moderna de telecomunicaciones'
    ],
    seo: {
      title: 'Internet en Barranquilla 2026 - Comparador de Planes Costa Caribe',
      description: 'Compara planes de internet en Barranquilla. Claro, Movistar y Tigo. Fibra óptica hasta 600 Mbps. El mejor internet en Atlántico.',
      keywords: 'internet barranquilla, planes internet barranquilla, fibra optica barranquilla, claro barranquilla, movistar barranquilla, internet atlantico, internet costa caribe'
    }
  },
  'cartagena': {
    name: 'Cartagena',
    slug: 'cartagena',
    region: 'Bolívar',
    population: '1 millón',
    coordinates: { lat: 10.3910, lng: -75.4794 },
    providers: [
      {
        name: 'Claro',
        coverage: '90%',
        speeds: ['100 Mbps', '200 Mbps', '300 Mbps', '500 Mbps'],
        desde: '$80,000',
        destacado: true
      },
      {
        name: 'Movistar',
        coverage: '85%',
        speeds: ['100 Mbps', '200 Mbps', '300 Mbps'],
        desde: '$75,000',
        destacado: true
      },
      {
        name: 'Tigo',
        coverage: '78%',
        speeds: ['100 Mbps', '200 Mbps', '400 Mbps'],
        desde: '$72,000',
        destacado: false
      }
    ],
    neighborhoods: ['Bocagrande', 'Castillogrande', 'Manga', 'Getsemaní', 'Centro Histórico', 'Crespo', 'Pie de la Popa', 'Norte'],
    features: [
      'Cobertura amplia en zonas turísticas y residenciales',
      'Fibra óptica en sectores premium',
      'Ciudad portuaria con buena conectividad',
      'Velocidades de hasta 500 Mbps',
      'Infraestructura en constante mejora'
    ],
    seo: {
      title: 'Internet en Cartagena 2026 - Planes Fibra Óptica Costa Caribe',
      description: 'Mejores planes de internet en Cartagena. Compara Claro, Movistar y Tigo. Fibra óptica hasta 500 Mbps. Internet en Bolívar.',
      keywords: 'internet cartagena, planes internet cartagena, fibra optica cartagena, claro cartagena, movistar cartagena, internet bolivar, internet costa'
    }
  },
  'bucaramanga': {
    name: 'Bucaramanga',
    slug: 'bucaramanga',
    region: 'Santander',
    population: '600 mil',
    coordinates: { lat: 7.1193, lng: -73.1227 },
    providers: [
      {
        name: 'Claro',
        coverage: '91%',
        speeds: ['100 Mbps', '200 Mbps', '300 Mbps', '500 Mbps'],
        desde: '$74,000',
        destacado: true
      },
      {
        name: 'Movistar',
        coverage: '86%',
        speeds: ['100 Mbps', '200 Mbps', '400 Mbps'],
        desde: '$71,000',
        destacado: true
      },
      {
        name: 'Tigo',
        coverage: '80%',
        speeds: ['100 Mbps', '200 Mbps', '300 Mbps'],
        desde: '$67,000',
        destacado: false
      }
    ],
    neighborhoods: ['Cabecera', 'Lagos del Cacique', 'Altos de Cabecera', 'La Flora', 'Provenza', 'Centro', 'Norte', 'Sur'],
    features: [
      'Ciudad con alta penetración de internet',
      'Fibra óptica en zonas residenciales principales',
      'Buena cobertura en área metropolitana',
      'Velocidades competitivas hasta 500 Mbps',
      'Hub tecnológico del nororiente colombiano'
    ],
    seo: {
      title: 'Internet en Bucaramanga 2026 - Planes y Proveedores Santander',
      description: 'Compara planes de internet en Bucaramanga. Claro, Movistar y Tigo. Fibra óptica hasta 500 Mbps. Internet en Santander.',
      keywords: 'internet bucaramanga, planes internet bucaramanga, fibra optica bucaramanga, claro bucaramanga, movistar bucaramanga, internet santander'
    }
  }
};

export async function generateStaticParams() {
  console.log('[CIUDADES] generateStaticParams called');
  const params = Object.keys(ciudades).map(ciudad => ({
    ciudad
  }));
  console.log('[CIUDADES] Generated params:', params);
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ ciudad: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const ciudad = ciudades[resolvedParams.ciudad];
  
  if (!ciudad) {
    return {
      title: 'Ciudad no encontrada',
      description: 'La ciudad que buscas no está disponible'
    };
  }

  return {
    title: ciudad.seo.title,
    description: ciudad.seo.description,
    keywords: ciudad.seo.keywords,
    openGraph: {
      title: ciudad.seo.title,
      description: ciudad.seo.description,
      url: `https://comparadorinternet.co/ciudades/${ciudad.slug}`,
      type: 'website',
    },
    alternates: {
      canonical: `https://comparadorinternet.co/ciudades/${ciudad.slug}`
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function CiudadPage({ params }: { params: Promise<{ ciudad: string }> }) {
  console.log('[CIUDADES] Params received:', params);
  const resolvedParams = await params;
  const ciudadSlug = resolvedParams.ciudad;
  console.log('[CIUDADES] ciudadSlug:', ciudadSlug);
  console.log('[CIUDADES] Available ciudades:', Object.keys(ciudades));
  
  const ciudad = ciudades[ciudadSlug];
  
  if (!ciudad) {
    console.log('[CIUDADES] Ciudad not found:', ciudadSlug);
    notFound();
  }
  
  console.log('[CIUDADES] Found ciudad:', ciudad.name);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `Internet en ${ciudad.name}`,
    "description": ciudad.seo.description,
    "url": `https://comparadorinternet.co/ciudades/${ciudad.slug}`,
    "about": {
      "@type": "Service",
      "serviceType": "Internet Service Provider Comparison",
      "areaServed": {
        "@type": "City",
        "name": ciudad.name,
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": ciudad.coordinates.lat,
          "longitude": ciudad.coordinates.lng
        },
        "containedInPlace": {
          "@type": "AdministrativeArea",
          "name": ciudad.region
        }
      },
      "provider": ciudad.providers.map(p => ({
        "@type": "Organization",
        "name": p.name,
        "areaServed": ciudad.name
      }))
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Inicio",
          "item": "https://comparadorinternet.co/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Ciudades",
          "item": "https://comparadorinternet.co/#ciudades"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": ciudad.name,
          "item": `https://comparadorinternet.co/ciudades/${ciudad.slug}`
        }
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section with City Info */}
        <div className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <MapPin size={32} className="text-blue-200" />
                <h1 className="text-4xl md:text-5xl font-bold">
                  Internet en {ciudad.name}
                </h1>
              </div>
              
              <p className="text-xl md:text-2xl text-blue-100 mb-6">
                Compara los mejores planes de internet en {ciudad.region}
              </p>
              
              <div className="flex flex-wrap gap-6 text-blue-100">
                <div className="flex items-center gap-2">
                  <Building size={20} />
                  <span>{ciudad.region}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={20} />
                  <span>{ciudad.population} habitantes</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp size={20} />
                  <span>{ciudad.providers.length} proveedores disponibles</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          
          {/* Providers Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Proveedores de Internet en {ciudad.name}
            </h2>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {ciudad.providers.map((provider, index) => (
                <div 
                  key={index}
                  className={`bg-white rounded-xl shadow-lg border-2 p-6 ${
                    provider.destacado ? 'border-blue-500' : 'border-gray-200'
                  }`}
                >
                  {provider.destacado && (
                    <div className="bg-blue-500 text-white text-xs font-bold py-1 px-3 rounded-full inline-block mb-3">
                      Recomendado
                    </div>
                  )}
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{provider.name}</h3>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle size={18} className="text-green-500" />
                      <span className="text-gray-700">Cobertura: {provider.coverage}</span>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Velocidades disponibles:</p>
                      <div className="flex flex-wrap gap-2">
                        {provider.speeds.map((speed, i) => (
                          <span key={i} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm">
                            {speed}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="pt-3 border-t border-gray-200">
                      <p className="text-sm text-gray-600">Desde</p>
                      <p className="text-2xl font-bold text-blue-600">{provider.desde}/mes</p>
                    </div>
                  </div>
                  
                  <a 
                    href={`/${provider.name.toLowerCase()}`}
                    className="block w-full bg-blue-600 text-white text-center py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Ver Planes
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Features Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Características de Internet en {ciudad.name}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              {ciudad.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-1" />
                  <p className="text-gray-700">{feature}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Neighborhoods Section */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl shadow-lg p-8 text-white mb-12">
            <h2 className="text-2xl font-bold mb-6">
              Barrios con Mejor Cobertura en {ciudad.name}
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {ciudad.neighborhoods.map((barrio, index) => (
                <div key={index} className="flex items-center gap-2">
                  <MapPin size={16} className="text-purple-200" />
                  <span>{barrio}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              ¿Necesitas ayuda para elegir el mejor plan en {ciudad.name}?
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Nuestros expertos conocen la cobertura y disponibilidad de cada proveedor en {ciudad.name}. 
              Te ayudamos a encontrar el plan perfecto para tu ubicación y necesidades.
            </p>
            
            <div className="max-w-md mx-auto">
              <QuickCallForm />
            </div>
          </div>

          {/* Related Links */}
          <RelatedLinks currentPageType="general" maxLinks={6} />
        </div>
      </div>
    </>
  );
}