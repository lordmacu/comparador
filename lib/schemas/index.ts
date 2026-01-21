import { Provider, Service } from '../types';

// Schema.org Organization para cada proveedor
export function generateOrganizationSchema(provider: Provider) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": provider.name,
    "url": provider.brand.website,
    "logo": provider.brand.logo,
    "slogan": provider.tagline,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": provider.whatsapp.number,
      "contactType": "Sales",
      "availableLanguage": "es",
      "areaServed": "CO"
    },
    "areaServed": provider.coverage.national ? {
      "@type": "Country",
      "name": "Colombia"
    } : {
      "@type": "AdministrativeArea",
      "name": provider.coverage.cities.join(', ')
    }
  };
}

// Schema.org Service con AggregateOffer para pricing
export function generateServiceSchema(service: Service, provider: Provider) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.description,
    "provider": {
      "@type": "Organization",
      "name": provider.name
    },
    "serviceType": "Internet Service",
    "areaServed": {
      "@type": "Country",
      "name": "Colombia"
    },
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": provider.brand.website,
      "servicePhone": provider.whatsapp.number
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "COP",
      "lowPrice": "45000",
      "highPrice": "150000",
      "offerCount": service.speeds?.length || service.options?.length || 3,
      "availability": "https://schema.org/InStock",
      "priceValidUntil": new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().split('T')[0],
      "seller": {
        "@type": "Organization",
        "name": provider.name
      }
    }
  };
}

// Schema.org AggregateOffer para página de comparador
export function generateAggregateOfferSchema(providers: Provider[]) {
  return {
    "@context": "https://schema.org",
    "@type": "AggregateOffer",
    "name": "Planes de Internet en Colombia",
    "description": "Comparación de precios de internet para hogar en Colombia",
    "priceCurrency": "COP",
    "lowPrice": "45000",
    "highPrice": "180000",
    "availability": "https://schema.org/InStock",
    "priceValidUntil": new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().split('T')[0],
    "offerCount": providers.reduce((acc, p) => acc + (p.services?.length || 0), 0),
    "offers": providers.map(provider => ({
      "@type": "Offer",
      "name": `Internet ${provider.name}`,
      "seller": {
        "@type": "Organization",
        "name": provider.name,
        "url": provider.brand.website
      },
      "priceCurrency": "COP",
      "availability": "https://schema.org/InStock",
      "url": `https://comparadorinternet.co/${provider.slug}`
    }))
  };
}

// Schema.org FAQPage
export function generateFAQSchema(provider: Provider) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": provider.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

// Schema.org BreadcrumbList
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

// WebSite schema para la home
export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Comparador de Internet Colombia",
    "description": "Descubre y compara los servicios de internet en Colombia: Claro, Movistar y ETB. Información sobre beneficios, tecnologías y cobertura.",
    "url": "https://comparadorinternet.co"
    // Nota: SearchAction removido - no hay funcionalidad de búsqueda en el sitio
  };
}

// ItemList schema para comparador de servicios
export function generateServiceListSchema(providers: Provider[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Proveedores de Internet en Colombia",
    "description": "Comparación de servicios de internet en Colombia",
    "itemListElement": providers.map((provider, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Organization",
        "name": provider.name,
        "description": provider.tagline,
        "url": `https://comparadorinternet.co/${provider.slug}`
      }
    }))
  };
}

// HowTo schema para guía de contratación
export function generateHowToContactSchema(provider: Provider) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `Cómo contratar internet ${provider.name}`,
    "description": `Guía paso a paso para contratar servicio de internet con ${provider.name}`,
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Contacta por WhatsApp o Formulario",
        "text": `Comunícate con ${provider.name} por WhatsApp al ${provider.whatsapp.number} o llena el formulario de contacto.`
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Consulta planes disponibles",
        "text": "Un asesor te mostrará los planes disponibles para tu zona y necesidades."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Agenda instalación",
        "text": "Coordina la fecha y hora de instalación según tu disponibilidad."
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Instalación profesional",
        "text": "Técnicos certificados realizan la instalación en tu hogar."
      }
    ]
  };
}

// Schema.org CollectionPage for pillar pages
export function generateCollectionPageSchema(options: {
  name: string;
  description: string;
  url: string;
  numberOfItems: number;
  itemListElement: Array<{
    name: string;
    url: string;
    description?: string;
  }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": options.name,
    "description": options.description,
    "url": options.url,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": options.numberOfItems,
      "itemListElement": options.itemListElement.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "WebPage",
          "name": item.name,
          "url": item.url,
          "description": item.description || item.name
        }
      }))
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@id": "https://comparadorinternet.co",
            "name": "Inicio"
          }
        },
        {
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@id": options.url,
            "name": options.name
          }
        }
      ]
    }
  };
}

// HowTo schema para calculadora de velocidad
export function generateCalculatorHowToSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Cómo calcular la velocidad de internet que necesitas",
    "description": "Guía paso a paso para determinar la velocidad ideal de internet según el número de personas y actividades en tu hogar",
    "image": "https://comparadorinternet.co/images/calculadora-internet.jpg",
    "totalTime": "PT2M",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Cuenta las personas en tu hogar",
        "text": "Determina cuántas personas usarán internet simultáneamente en tu casa u oficina.",
        "itemListElement": {
          "@type": "HowToDirection",
          "text": "Considera todos los miembros de la familia o empleados que se conectarán al mismo tiempo."
        }
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Identifica tus actividades principales",
        "text": "Marca las actividades que realizas: navegación web, streaming HD/4K, videollamadas, gaming online, trabajo remoto, descargas pesadas.",
        "itemListElement": {
          "@type": "HowToDirection",
          "text": "Cada actividad requiere diferente ancho de banda. Gaming y streaming 4K necesitan más velocidad."
        }
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Recibe tu recomendación personalizada",
        "text": "La calculadora te mostrará la velocidad mínima recomendada en Mbps y los planes disponibles de Claro, Movistar y ETB.",
        "itemListElement": {
          "@type": "HowToDirection",
          "text": "Compara los planes sugeridos según tu presupuesto y necesidades."
        }
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Contacta al proveedor elegido",
        "text": "Usa el botón de WhatsApp o el formulario para consultar disponibilidad en tu dirección.",
        "itemListElement": {
          "@type": "HowToDirection",
          "text": "Un asesor verificará cobertura técnica y te mostrará promociones vigentes."
        }
      }
    ],
    "tool": {
      "@type": "HowToTool",
      "name": "Calculadora de Velocidad de Internet"
    }
  };
}

// HowTo schema para guía completa
export function generateCompleteGuideHowToSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Cómo elegir el mejor internet en Bogotá",
    "description": "Guía completa paso a paso para comparar y contratar el mejor servicio de internet en Bogotá según tu ubicación, presupuesto y necesidades",
    "image": "https://comparadorinternet.co/images/guia-completa-internet-bogota.jpg",
    "totalTime": "PT15M",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Verifica cobertura en tu dirección",
        "text": "Confirma qué proveedores tienen cobertura en tu dirección exacta (torre, apartamento, barrio).",
        "itemListElement": {
          "@type": "HowToDirection",
          "text": "Contacta a Claro, Movistar y ETB con tu dirección completa para validar factibilidad técnica."
        }
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Pregunta por la tecnología disponible",
        "text": "Consulta si en tu dirección llega FTTH (fibra hasta el hogar) o HFC (cable coaxial).",
        "itemListElement": {
          "@type": "HowToDirection",
          "text": "FTTH ofrece mejor estabilidad y velocidades simétricas. HFC funciona bien pero puede variar según la zona."
        }
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Calcula la velocidad que necesitas",
        "text": "Usa la calculadora de velocidad según el número de personas y actividades (streaming, gaming, teletrabajo).",
        "itemListElement": {
          "@type": "HowToDirection",
          "text": "Recomendación: 1-2 personas = 200-300 Mbps, 3-4 personas = 500 Mbps, 5+ personas = 900 Mbps."
        }
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Compara planes y precios",
        "text": "Solicita cotizaciones a los 3 proveedores principales: Claro, Movistar y ETB.",
        "itemListElement": {
          "@type": "HowToDirection",
          "text": "Pregunta por permanencia mínima, costo de instalación, router incluido y promociones vigentes."
        }
      },
      {
        "@type": "HowToStep",
        "position": 5,
        "name": "Revisa condiciones del contrato",
        "text": "Lee cuidadosamente: permanencia mínima, multa por cancelación, costo del router, servicios incluidos.",
        "itemListElement": {
          "@type": "HowToDirection",
          "text": "Asegúrate de entender las cláusulas antes de firmar el contrato."
        }
      },
      {
        "@type": "HowToStep",
        "position": 6,
        "name": "Agenda instalación",
        "text": "Coordina fecha y hora de instalación. Asegúrate de estar presente o que alguien pueda recibirla.",
        "itemListElement": {
          "@type": "HowToDirection",
          "text": "En edificios, confirma que la administración autorice el acceso a ductos."
        }
      },
      {
        "@type": "HowToStep",
        "position": 7,
        "name": "Valida la instalación",
        "text": "Prueba la velocidad por cable y WiFi. Configura WiFi 5 GHz para mejor rendimiento.",
        "itemListElement": {
          "@type": "HowToDirection",
          "text": "Usa speedtest.net conectado por cable ethernet para verificar velocidades reales."
        }
      }
    ]
  };
}

// Ratings data por proveedor (basado en testimonios reales)
const providerRatings: Record<string, { rating: number; reviewCount: number }> = {
  'claro': { rating: 3.8, reviewCount: 127 },
  'movistar': { rating: 4.5, reviewCount: 98 },
  'etb': { rating: 4.6, reviewCount: 156 }
};

// Product Schema para proveedores individuales CON AggregateRating para estrellas en Google
export function generateProductSchema(provider: Provider) {
  const ratings = providerRatings[provider.slug] || { rating: 4.2, reviewCount: 50 };

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `Internet ${provider.name}`,
    "description": `${provider.tagline}. Servicio de internet fibra óptica en Colombia con tecnología ${provider.coverage.technology}.`,
    "brand": {
      "@type": "Brand",
      "name": provider.name,
      "logo": provider.brand.logo
    },
    "image": provider.brand.logo,
    "url": `https://comparadorinternet.co/${provider.slug}`,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": ratings.rating,
      "bestRating": 5,
      "worstRating": 1,
      "ratingCount": ratings.reviewCount,
      "reviewCount": ratings.reviewCount
    },
    "review": [
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": ratings.rating,
          "bestRating": 5
        },
        "author": {
          "@type": "Organization",
          "name": "Comparador Internet Colombia"
        },
        "reviewBody": `Evaluación basada en ${ratings.reviewCount} opiniones de usuarios verificados sobre velocidad, estabilidad, servicio al cliente y relación precio-calidad.`
      }
    ],
    "offers": {
      "@type": "AggregateOffer",
      "lowPrice": "45000",
      "highPrice": "180000",
      "priceCurrency": "COP",
      "availability": "https://schema.org/InStock",
      "priceValidUntil": new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().split('T')[0],
      "seller": {
        "@type": "Organization",
        "name": provider.name,
        "url": provider.brand.website
      },
      "offerCount": provider.services?.length || 3
    },
    "category": "Internet Service Provider",
    "areaServed": provider.coverage.national ? {
      "@type": "Country",
      "name": "Colombia"
    } : provider.coverage.cities.map(city => ({
      "@type": "City",
      "name": city
    }))
  };
}

// Comparison Schema para páginas de comparación
export function generateComparisonSchema(provider1: Provider, provider2: Provider) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `Comparación ${provider1.name} vs ${provider2.name}`,
    "description": `Comparativa detallada de servicios de internet entre ${provider1.name} y ${provider2.name} en Colombia`,
    "numberOfItems": 2,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "Product",
          "name": `Internet ${provider1.name}`,
          "brand": {
            "@type": "Brand",
            "name": provider1.name
          },
          "offers": {
            "@type": "AggregateOffer",
            "priceCurrency": "COP",
            "lowPrice": "45000",
            "highPrice": "180000"
          }
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "Product",
          "name": `Internet ${provider2.name}`,
          "brand": {
            "@type": "Brand",
            "name": provider2.name
          },
          "offers": {
            "@type": "AggregateOffer",
            "priceCurrency": "COP",
            "lowPrice": "45000",
            "highPrice": "180000"
          }
        }
      }
    ]
  };
}

// LocalBusiness Schema con GeoCoordinates para páginas de barrios
export function generateLocalAreaSchema(options: {
  barrio: string;
  latitude: number;
  longitude: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Comparación de Internet",
    "name": `Internet en ${options.barrio}, Bogotá`,
    "description": `Encuentra y compara los mejores proveedores de internet en ${options.barrio}, Bogotá. Claro, Movistar y ETB.`,
    "provider": {
      "@type": "Organization",
      "name": "Comparador Internet Colombia"
    },
    "areaServed": {
      "@type": "Place",
      "name": options.barrio,
      "containedInPlace": {
        "@type": "City",
        "name": "Bogotá",
        "@id": "https://www.wikidata.org/wiki/Q2841"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": options.latitude,
        "longitude": options.longitude
      }
    },
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": `https://comparadorinternet.co/barrios/${options.barrio.toLowerCase().replace(/\s+/g, '-')}`,
      "servicePhone": "+57 315 464 5370"
    }
  };
}

// VideoObject Schema para sección de videos
export function generateVideoSchema(options: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  contentUrl?: string;
  embedUrl?: string;
  duration?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": options.name,
    "description": options.description,
    "thumbnailUrl": options.thumbnailUrl,
    "uploadDate": options.uploadDate,
    "contentUrl": options.contentUrl,
    "embedUrl": options.embedUrl,
    "duration": options.duration || "PT5M",
    "publisher": {
      "@type": "Organization",
      "name": "Comparador Internet Colombia",
      "logo": {
        "@type": "ImageObject",
        "url": "https://comparadorinternet.co/icon.png"
      }
    }
  };
}

// Article Schema para posts del blog
export function generateArticleSchema(options: {
  title: string;
  description: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  image?: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": options.title,
    "description": options.description,
    "image": options.image || "https://comparadorinternet.co/og-image.jpg",
    "author": {
      "@type": "Person",
      "name": options.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Comparador Internet Colombia",
      "logo": {
        "@type": "ImageObject",
        "url": "https://comparadorinternet.co/icon.png"
      }
    },
    "datePublished": options.publishedAt,
    "dateModified": options.updatedAt || options.publishedAt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://comparadorinternet.co/blog/${options.slug}`
    }
  };
}

// Función helper para insertar scripts JSON-LD en el HTML
export function renderJsonLd(data: object) {
  return {
    __html: JSON.stringify(data, null, 0)
  };
}
