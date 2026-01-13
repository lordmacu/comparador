import Script from "next/script";

export const OrganizationSchema = () => {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Comparador Internet Colombia",
    "alternateName": "Internet Colombia",
    "description": "Plataforma líder para comparar planes de internet en Colombia. Encuentra el mejor operador para tu hogar u oficina con herramientas gratuitas y asesoría especializada.",
    "url": "https://comparadorinternet.co",
    "logo": "https://comparadorinternet.co/images/logo.png",
    "foundingDate": "2025",
    "founder": {
      "@type": "Person",
      "name": "Equipo Comparador Internet"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+57-315-464-5370",
        "contactType": "sales",
        "availableLanguage": "Spanish",
        "areaServed": "CO",
        "option": "TollFree"
      },
      {
        "@type": "ContactPoint", 
        "telephone": "+57-315-464-5370",
        "contactType": "customer service",
        "availableLanguage": "Spanish", 
        "areaServed": "CO"
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Carrera 13 #85-32",
      "addressLocality": "Bogotá",
      "addressRegion": "Cundinamarca",
      "postalCode": "110221",
      "addressCountry": "CO"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Bogotá",
        "containedInPlace": {
          "@type": "Country",
          "name": "Colombia"
        }
      }
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates", 
        "latitude": 4.7110,
        "longitude": -74.0721
      },
      "geoRadius": "50000"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": 4.6,
      "reviewCount": 2847,
      "bestRating": 5,
      "worstRating": 1
    },
    "review": [
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating", 
          "ratingValue": 5,
          "bestRating": 5
        },
        "author": {
          "@type": "Person",
          "name": "María González"
        },
        "reviewBody": "Excelente plataforma para comparar internet. Me ayudaron a encontrar el plan perfecto para mi familia. Muy recomendado.",
        "datePublished": "2025-12-15"
      },
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": 5, 
          "bestRating": 5
        },
        "author": {
          "@type": "Person",
          "name": "Carlos Rodríguez"
        },
        "reviewBody": "La calculadora de internet es fantástica. Pude comparar todos los operadores fácilmente y encontré el mejor precio.",
        "datePublished": "2025-12-10"
      },
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": 4,
          "bestRating": 5
        },
        "author": {
          "@type": "Person", 
          "name": "Ana Herrera"
        },
        "reviewBody": "Muy útil para tomar decisiones informadas. Los testimonios reales me ayudaron mucho a elegir operador.",
        "datePublished": "2025-12-05"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/comparadorinternetco",
      "https://www.twitter.com/internetcolombia",
      "https://www.instagram.com/comparadorinternet",
      "https://www.linkedin.com/company/comparador-internet-colombia",
      "https://www.youtube.com/channel/UCComparadorInternet"
    ],
    "potentialAction": [
      {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://comparadorinternet.co/search?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Planes de Internet Bogotá",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Comparación de Internet",
            "description": "Servicio gratuito de comparación de planes de internet"
          },
          "price": "0",
          "priceCurrency": "COP"
        }
      ]
    },
    "knowsAbout": [
      "Internet en Colombia",
      "Comparación de operadores",
      "ETB", 
      "Claro",
      "Movistar",
      "Fibra óptica",
      "Velocidades de internet",
      "Planes residenciales",
      "Internet empresarial"
    ],
    "department": [
      {
        "@type": "Organization",
        "name": "Atención al Cliente",
        "telephone": "+57-1-234-5678"
      },
      {
        "@type": "Organization", 
        "name": "Soporte Técnico",
        "telephone": "+57-300-123-4567"
      }
    ]
  };

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(organizationData),
      }}
    />
  );
};

export const BreadcrumbSchema = ({ items }: { items: { name: string; url: string }[] }) => {
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList", 
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbData),
      }}
    />
  );
};

export const WebsiteSchema = () => {
  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Comparador Internet Colombia",
    "url": "https://comparadorinternet.co",
    "description": "Compara planes de internet en Colombia. Encuentra el mejor operador para tu hogar con herramientas gratuitas.",
    "publisher": {
      "@type": "Organization", 
      "name": "Comparador Internet Colombia"
    },
    "potentialAction": [
      {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint", 
          "urlTemplate": "https://comparadorinternet.co/search?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    ],
    "mainEntity": {
      "@type": "ItemList",
      "name": "Herramientas Internet Colombia",
      "itemListElement": [
        {
          "@type": "SoftwareApplication",
          "name": "Calculadora de Internet",
          "url": "https://comparadorinternet.co/calculadora",
          "applicationCategory": "UtilitiesApplication"
        },
        {
          "@type": "WebPage",
          "name": "Comparar Operadores", 
          "url": "https://comparadorinternet.co/comparar"
        },
        {
          "@type": "WebPage",
          "name": "Testimonios de Usuarios",
          "url": "https://comparadorinternet.co/testimonios"
        },
        {
          "@type": "WebPage",
          "name": "Videos Guía",
          "url": "https://comparadorinternet.co/videos"  
        },
        {
          "@type": "WebPage",
          "name": "Planes de Internet",
          "url": "https://comparadorinternet.co/planes"
        }
      ]
    }
  };

  return (
    <Script
      id="website-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(websiteData),
      }}
    />
  );
};