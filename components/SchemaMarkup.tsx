import Script from "next/script";

export const OrganizationSchema = () => {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://comparadorinternet.co/#organization",
    "name": "Comparador Internet Colombia",
    "alternateName": "Comparador de Internet en Colombia",
    "description": "Plataforma líder para comparar planes de internet en Colombia. Encuentra el mejor operador para tu hogar u oficina con herramientas gratuitas y asesoría especializada.",
    "url": "https://comparadorinternet.co",
    "logo": {
      "@type": "ImageObject",
      "url": "https://comparadorinternet.co/icon.png",
      "width": 512,
      "height": 512
    },
    "telephone": "+573154645370",
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+573154645370",
        "contactType": "sales",
        "availableLanguage": ["es"],
        "areaServed": "CO"
      }
    ],
    "areaServed": {
      "@type": "Country",
      "name": "Colombia"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Planes de Internet Colombia",
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
      "Planes de internet en Colombia",
      "Comparación de operadores",
      "ETB",
      "Claro",
      "Movistar",
      "Fibra óptica",
      "Velocidades de internet",
      "Cobertura de internet",
      "Internet hogar",
      "Internet empresarial"
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
    "@id": "https://comparadorinternet.co/#website",
    "name": "Comparador Internet Colombia",
    "alternateName": ["Comparador Internet", "ComparadorInternet.co", "ComparadorInternet"],
    "url": "https://comparadorinternet.co",
    "description": "Compara planes de internet en Colombia. Encuentra el mejor operador para tu hogar con herramientas gratuitas.",
    "publisher": {
      "@id": "https://comparadorinternet.co/#organization"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://comparadorinternet.co/blog?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "inLanguage": "es-CO",
    "mainEntity": {
      "@type": "ItemList",
      "name": "Herramientas Internet Colombia",
      "itemListElement": [
        {
          "@type": "SoftwareApplication",
          "name": "Calculadora de Internet",
          "url": "https://comparadorinternet.co/calculadora",
          "applicationCategory": "UtilitiesApplication",
          "operatingSystem": "Web",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.6",
            "reviewCount": "87",
            "bestRating": "5",
            "worstRating": "1"
          }
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
