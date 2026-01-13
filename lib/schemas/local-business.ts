/**
 * Local Business Schema for improved local SEO
 * Critical for appearing in local search results and Google Maps
 */

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://comparadorinternet.co/#localbusiness",
    "name": "Comparador Internet Colombia",
    "alternateName": "Asesor de Internet Claro, Movistar y ETB",
    "image": "https://comparadorinternet.co/og-image.jpg",
    "url": "https://comparadorinternet.co/asesores",
    "telephone": "+573154645370",
    "priceRange": "$0 - $180,000",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bogotá",
      "addressRegion": "Cundinamarca",
      "addressCountry": "CO"
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
