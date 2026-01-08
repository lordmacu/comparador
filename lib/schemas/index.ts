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
    "url": "https://comparadorinternet.co",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://comparadorinternet.co/?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
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

// Función helper para insertar scripts JSON-LD en el HTML
export function renderJsonLd(data: object) {
  return {
    __html: JSON.stringify(data, null, 0)
  };
}
