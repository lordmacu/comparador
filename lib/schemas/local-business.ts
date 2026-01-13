/**
 * Local Business Schema for improved local SEO
 * Critical for appearing in local search results and Google Maps
 */

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://comparadorinternet.co/#localbusiness",
    "name": "Asesor Internet Etb, Claro, Movistar",
    "alternateName": "Comparador Internet Colombia",
    "image": "https://comparadorinternet.co/og-image.jpg",
    "url": "https://comparadorinternet.co",
    "telephone": "+573154645370",
    "priceRange": "$45,000 - $180,000",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Calle 100 # 19-61", // ACTUALIZAR con dirección real
      "addressLocality": "Bogotá",
      "addressRegion": "Cundinamarca",
      "postalCode": "110111",
      "addressCountry": "CO"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "4.6943", // ACTUALIZAR con coordenadas reales
      "longitude": "-74.0392"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Bogotá"
      },
      {
        "@type": "Country",
        "name": "Colombia"
      }
    ],
    "sameAs": [
      // Agregar redes sociales cuando existan
      // "https://www.facebook.com/comparadorinternetco",
      // "https://twitter.com/comparadorinternet",
      // "https://www.instagram.com/comparadorinternet",
      // "https://www.linkedin.com/company/comparadorinternet"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "08:00",
        "closes": "20:00"
      }
    ]
  };
}
