/**
 * Local Business Schema for improved local SEO
 * Critical for appearing in local search results and Google Maps
 */

export function generateLocalBusinessSchema(providerName?: string) {
  let name = "Comparador Internet Colombia";
  let alternateName = "Asesor de Internet Claro, Movistar y ETB";

  if (providerName === 'Claro') {
    name = "Asesor Internet Claro Colombia";
    alternateName = "Planes y Servicios Claro Hogar";
  } else if (providerName === 'Movistar') {
    name = "Asesor Internet Movistar Colombia";
    alternateName = "Planes Fibra Óptica Movistar";
  } else if (providerName === 'ETB') {
    name = "Asesor Internet ETB Bogotá";
    alternateName = "Planes Fibra Óptica ETB";
  }

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://comparadorinternet.co/#localbusiness",
    "name": name,
    "alternateName": alternateName,
    "image": "https://comparadorinternet.co/og-image.jpg",
    "url": "https://comparadorinternet.co/asesores",
    "telephone": "+573154645370",
    "priceRange": "$0 - $180,000",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Calle 100 #19-61",
      "addressLocality": "Bogotá",
      "addressRegion": "Cundinamarca",
      "postalCode": "110111",
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
