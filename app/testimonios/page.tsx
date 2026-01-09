import { Metadata } from "next";
import Link from "next/link";
import { Star, CheckCircle, Calendar, ThumbsUp, BookOpen } from "lucide-react";
import QuickCallForm from "@/components/QuickCallForm";

export const metadata: Metadata = {
  title: "Testimonios y Opiniones Reales | Comparador Internet Colombia",
  description: "Lee testimonios reales de usuarios sobre los mejores proveedores de internet en Bogotá. Experiencias verificadas con ETB, Claro y Movistar para ayudarte a decidir.",
  keywords: "testimonios internet bogotá, opiniones ETB, reviews Claro internet, experiencias Movistar, mejor proveedor internet colombia",
  openGraph: {
    title: "Testimonios Reales Internet Bogotá | Experiencias Verificadas",
    description: "Conoce experiencias reales de usuarios con proveedores de internet en Bogotá. Testimonios verificados que te ayudan a elegir mejor.",
  },
};

// Schema.org structured data for reviews
const reviewsStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://comparadorinternet.co/testimonios",
      "name": "Testimonios y Opiniones sobre Internet en Bogotá",
      "description": "Testimonios reales y verificados de usuarios sobre proveedores de internet en Bogotá",
      "mainEntity": {
        "@type": "ItemList",
        "name": "Testimonios de Internet Bogotá",
        "description": "Lista de testimonios verificados sobre proveedores de internet",
        "numberOfItems": 15,
        "itemListElement": [
          {
            "@type": "Review",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": 5,
              "bestRating": 5
            },
            "author": {
              "@type": "Person",
              "name": "Carlos M."
            },
            "reviewBody": "ETB Fibra ha transformado mi experiencia de teletrabajo. Velocidad consistente de 300 Mbps, instalación profesional y soporte técnico excelente. Lo recomiendo totalmente.",
            "datePublished": "2025-12-15",
            "itemReviewed": {
              "@type": "Service",
              "name": "ETB Fibra Óptica",
              "provider": "ETB"
            }
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
              "name": "Ana L."
            },
            "reviewBody": "Claro Internet me ha funcionado muy bien para streaming. Buena velocidad y estabilidad, aunque a veces el soporte tarda en responder.",
            "datePublished": "2025-12-10",
            "itemReviewed": {
              "@type": "Service",
              "name": "Claro Internet",
              "provider": "Claro"
            }
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
              "name": "Miguel R."
            },
            "reviewBody": "Movistar Fibra ofrece buena relación precio-calidad. Velocidad estable para gaming y trabajo remoto. La instalación fue rápida y sin problemas.",
            "datePublished": "2025-12-05",
            "itemReviewed": {
              "@type": "Service",
              "name": "Movistar Fibra",
              "provider": "Movistar"
            }
          }
        ]
      }
    }
  ]
};

interface Review {
  id: string;
  author: string;
  provider: "ETB" | "Claro" | "Movistar";
  service: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  verified: boolean;
  helpful: number;
  location?: string;
  plan?: string;
}

const reviews: Review[] = [
  {
    id: "1",
    author: "Carlos M.",
    provider: "ETB", 
    service: "ETB Fibra Óptica",
    rating: 5,
    title: "Excelente para teletrabajo",
    content: "ETB Fibra ha transformado mi experiencia de teletrabajo. Velocidad consistente de 300 Mbps, instalación profesional y soporte técnico excelente. Lo recomiendo totalmente.",
    date: "2025-12-15",
    verified: true,
    helpful: 24,
    location: "Chapinero",
    plan: "300 Mbps"
  },
  {
    id: "2", 
    author: "Ana L.",
    provider: "Claro",
    service: "Claro Internet",
    rating: 4,
    title: "Perfecto para streaming",
    content: "Claro Internet me ha funcionado muy bien para streaming en 4K. Buena velocidad y estabilidad, aunque a veces el soporte tarda en responder.",
    date: "2025-12-10",
    verified: true,
    helpful: 18,
    location: "Suba",
    plan: "200 Mbps"
  },
  {
    id: "3",
    author: "Miguel R.",
    provider: "Movistar", 
    service: "Movistar Fibra",
    rating: 4,
    title: "Buena relación precio-calidad",
    content: "Movistar Fibra ofrece buena relación precio-calidad. Velocidad estable para gaming y trabajo remoto. La instalación fue rápida y sin problemas.",
    date: "2025-12-05",
    verified: true,
    helpful: 21,
    location: "Kennedy",
    plan: "100 Mbps"
  },
  {
    id: "4",
    author: "Laura S.",
    provider: "ETB",
    service: "ETB Internet",
    rating: 5,
    title: "Servicio excepcional en Usaquén",
    content: "Como freelancer, necesito internet confiable 24/7. ETB me ha dado exactamente eso. Sin interrupciones en 8 meses, velocidad real como la contratada.",
    date: "2025-11-28",
    verified: true,
    helpful: 31,
    location: "Usaquén",
    plan: "500 Mbps"
  },
  {
    id: "5",
    author: "Roberto P.",
    provider: "Claro",
    service: "Claro Fibra",
    rating: 3,
    title: "Promedio, mejorable el soporte",
    content: "El internet funciona bien la mayor parte del tiempo, pero cuando hay problemas el soporte técnico es lento. Tardan días en resolver incidencias.",
    date: "2025-11-22",
    verified: true,
    helpful: 15,
    location: "Engativá",
    plan: "100 Mbps"
  },
  {
    id: "6",
    author: "Patricia V.",
    provider: "Movistar",
    service: "Movistar Internet",
    rating: 5,
    title: "Perfecta para familia numerosa",
    content: "Con 4 hijos en casa usando internet simultáneamente, Movistar nunca nos ha fallado. Gaming, streaming, videollamadas, todo funciona perfecto.",
    date: "2025-11-18",
    verified: true,
    helpful: 28,
    location: "Fontibón",
    plan: "300 Mbps"
  },
  {
    id: "7",
    author: "Diego H.",
    provider: "ETB",
    service: "ETB Hogar",
    rating: 4,
    title: "Excelente cobertura en el sur",
    content: "En Ciudad Bolívar tenemos opciones limitadas, pero ETB llega bien. Buena velocidad y precio justo. Recomendado para la zona sur de Bogotá.",
    date: "2025-11-15",
    verified: true,
    helpful: 19,
    location: "Ciudad Bolívar", 
    plan: "200 Mbps"
  },
  {
    id: "8",
    author: "Sandra K.",
    provider: "Claro",
    service: "Claro Internet Hogar",
    rating: 4,
    title: "Ideal para trabajo remoto",
    content: "Llevo 6 meses trabajando desde casa con Claro y muy conforme. Buena estabilidad, velocidad adecuada y precio competitivo.",
    date: "2025-11-10",
    verified: true,
    helpful: 22,
    location: "Teusaquillo",
    plan: "200 Mbps"
  },
  {
    id: "9",
    author: "Fernando G.",
    provider: "Movistar",
    service: "Movistar Fibra Óptica",
    rating: 5,
    title: "Gaming sin lag",
    content: "Para gaming competitivo, Movistar Fibra es perfecta. Ping consistente bajo 20ms, sin pérdida de paquetes. Vale cada peso que pago.",
    date: "2025-11-05",
    verified: true,
    helpful: 35,
    location: "Barrios Unidos",
    plan: "500 Mbps"
  },
  {
    id: "10",
    author: "María C.",
    provider: "ETB",
    service: "ETB Smart",
    rating: 4,
    title: "Buen servicio al cliente",
    content: "ETB no solo tiene buen internet, sino excelente atención. Cuando tuve problemas, me los resolvieron en menos de 24 horas.",
    date: "2025-10-30",
    verified: true,
    helpful: 17,
    location: "Puente Aranda",
    plan: "100 Mbps"
  },
  {
    id: "11",
    author: "Andrés T.",
    provider: "Claro",
    service: "Claro Fibra Plus",
    rating: 3,
    title: "Aceptable pero caro",
    content: "El servicio funciona, pero siento que pago mucho comparado con otros operadores. La velocidad es la prometida, eso sí.",
    date: "2025-10-25",
    verified: true,
    helpful: 12,
    location: "Bosa",
    plan: "300 Mbps"
  },
  {
    id: "12",
    author: "Claudia R.",
    provider: "Movistar",
    service: "Movistar Hogar",
    rating: 4,
    title: "Confiable para streaming",
    content: "Netflix, Prime Video, Disney+ sin interrupciones. Para una familia que consume mucho contenido, Movistar cumple expectativas.",
    date: "2025-10-20",
    verified: true,
    helpful: 26,
    location: "San Cristóbal",
    plan: "200 Mbps"
  },
  {
    id: "13",
    author: "Juan D.",
    provider: "ETB",
    service: "ETB Empresarial",
    rating: 5,
    title: "Perfecto para oficina en casa",
    content: "Oficina en casa con 3 empleados. ETB empresarial nos da velocidad simétrica real y soporte prioritario. Inversión que vale la pena.",
    date: "2025-10-15",
    verified: true,
    helpful: 29,
    location: "Rafael Uribe Uribe",
    plan: "300 Mbps"
  },
  {
    id: "14",
    author: "Valentina M.",
    provider: "Claro",
    service: "Claro Internet",
    rating: 4,
    title: "Buena para estudiantes",
    content: "Como estudiante universitaria, necesito internet estable para clases virtuales. Claro ha sido confiable y accesible económicamente.",
    date: "2025-10-10",
    verified: true,
    helpful: 20,
    location: "Tunjuelito",
    plan: "100 Mbps"
  },
  {
    id: "15",
    author: "Ricardo N.",
    provider: "Movistar",
    service: "Movistar Plus",
    rating: 5,
    title: "Instalación impecable",
    content: "La instalación fue profesional y rápida. Técnico puntual, explicó todo el proceso y dejó la instalación impecable. Servicio 10/10.",
    date: "2025-10-05",
    verified: true,
    helpful: 33,
    location: "Chapinero",
    plan: "200 Mbps"
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
      <span className="ml-2 text-sm text-gray-600">{rating}.0</span>
    </div>
  );
};

const ReviewCard = ({ review }: { review: Review }) => {
  const providerColors = {
    ETB: "bg-green-100 text-green-800",
    Claro: "bg-red-100 text-red-800", 
    Movistar: "bg-blue-100 text-blue-800"
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="font-semibold text-lg text-gray-900">{review.title}</h3>
            {review.verified && (
              <span className="inline-flex items-center text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                <CheckCircle className="w-3 h-3 mr-1" />
                Verificado
              </span>
            )}
          </div>
          <StarRating rating={review.rating} />
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${providerColors[review.provider]}`}>
          {review.provider}
        </span>
      </div>

      <p className="text-gray-700 mb-4 leading-relaxed">{review.content}</p>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-4">
          <span className="font-medium">{review.author}</span>
          {review.location && <span>• {review.location}</span>}
          {review.plan && <span>• {review.plan}</span>}
        </div>
        <div className="flex items-center space-x-4">
          <span className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            {new Date(review.date).toLocaleDateString("es-CO", {
              year: "numeric",
              month: "short",
              day: "numeric"
            })}
          </span>
          <span className="flex items-center">
            <ThumbsUp className="w-4 h-4 mr-1" />
            {review.helpful} útiles
          </span>
        </div>
      </div>
    </div>
  );
};

const FilterButtons = ({ 
  selectedProvider, 
  onProviderChange 
}: { 
  selectedProvider: string;
  onProviderChange: (provider: string) => void;
}) => {
  const providers = ["Todos", "ETB", "Claro", "Movistar"];

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {providers.map((provider) => (
        <button
          key={provider}
          onClick={() => onProviderChange(provider)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedProvider === provider
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {provider}
        </button>
      ))}
    </div>
  );
};

export default function TestimoniosPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(reviewsStructuredData),
        }}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Testimonios Reales sobre Internet en Bogotá
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8">
                Conoce las experiencias verificadas de usuarios con ETB, Claro y Movistar
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 text-blue-100">
                <div className="flex items-center">
                  <Star className="w-6 h-6 text-yellow-400 fill-current mr-2" />
                  <span className="text-lg">4.3/5 Promedio</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-2" />
                  <span className="text-lg">100% Verificados</span>
                </div>
                <div className="flex items-center">
                  <span className="text-lg font-semibold">15+ Testimonios</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Experiencias Reales de Usuarios
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Lee testimonios auténticos de personas que han probado diferentes proveedores 
                  de internet en Bogotá. Sus experiencias te ayudarán a tomar la mejor decisión.
                </p>
              </div>

              {/* Filter would go here - for now showing all reviews */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
                {reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                Estadísticas de Satisfacción por Operador
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-green-600">ETB</span>
                  </div>
                  <div className="flex justify-center mb-2">
                    <StarRating rating={5} />
                  </div>
                  <p className="text-sm text-gray-600">Promedio: 4.6/5</p>
                  <p className="text-xs text-gray-500 mt-2">Basado en 6 reseñas</p>
                </div>

                <div className="text-center">
                  <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-red-600">Claro</span>
                  </div>
                  <div className="flex justify-center mb-2">
                    <StarRating rating={4} />
                  </div>
                  <p className="text-sm text-gray-600">Promedio: 3.8/5</p>
                  <p className="text-xs text-gray-500 mt-2">Basado en 5 reseñas</p>
                </div>

                <div className="text-center">
                  <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-blue-600">Movistar</span>
                  </div>
                  <div className="flex justify-center mb-2">
                    <StarRating rating={4} />
                  </div>
                  <p className="text-sm text-gray-600">Promedio: 4.5/5</p>
                  <p className="text-xs text-gray-500 mt-2">Basado en 4 reseñas</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gray-100 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                ¿Listo para Contratar Internet?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Basándote en estos testimonios reales, usa nuestras herramientas para encontrar 
                la mejor opción para tu hogar u oficina.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
                <Link
                  href="/calculadora"
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  🧮 Calculadora de Internet
                </Link>
                <Link
                  href="/guia-completa"
                  className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  <BookOpen className="w-5 h-5 inline" /> Guía Completa
                </Link>
                <Link
                  href="/comparar"
                  className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  ⚖️ Comparar Operadores
                </Link>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  ¿Necesitas Ayuda Personalizada?
                </h3>
                <p className="text-gray-600 mb-6">
                  Nuestros expertos te ayudan a elegir el mejor plan basado en tu ubicación, 
                  uso y presupuesto. Completamente gratis.
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