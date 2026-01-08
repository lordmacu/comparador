'use client';

import Link from "next/link";
import { Play, Clock, Eye, Calendar, Star } from "lucide-react";
import QuickCallForm from "@/components/QuickCallForm";

// Schema.org structured data for video content
const videosStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://comparadorinternet.co/videos",
      "name": "Videos Guía Internet Bogotá",
      "description": "Videos educativos sobre internet en Bogotá, operadores, velocidades y mejores prácticas",
      "mainEntity": {
        "@type": "ItemList",
        "name": "Videos Internet Bogotá",
        "description": "Colección de videos educativos sobre internet en Colombia",
        "numberOfItems": 8,
        "itemListElement": [
          {
            "@type": "VideoObject",
            "name": "Cómo Elegir Internet en Bogotá 2026",
            "description": "Guía completa para elegir el mejor operador de internet en Bogotá considerando velocidad, precio y cobertura",
            "thumbnailUrl": "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
            "uploadDate": "2025-12-01",
            "duration": "PT8M30S",
            "embedUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ",
            "contentUrl": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          },
          {
            "@type": "VideoObject", 
            "name": "ETB vs Claro vs Movistar: Comparación Completa",
            "description": "Comparación detallada entre los principales operadores de internet en Bogotá: velocidad, precio, cobertura y soporte",
            "thumbnailUrl": "https://img.youtube.com/vi/oHg5SJYRHA0/maxresdefault.jpg",
            "uploadDate": "2025-11-28",
            "duration": "PT12M15S",
            "embedUrl": "https://www.youtube.com/embed/oHg5SJYRHA0",
            "contentUrl": "https://www.youtube.com/watch?v=oHg5SJYRHA0"
          }
        ]
      }
    }
  ]
};

interface Video {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  duration: string;
  views: string;
  uploadDate: string;
  category: "Guías" | "Comparaciones" | "Instalación" | "Gaming" | "Teletrabajo";
  difficulty: "Principiante" | "Intermedio" | "Avanzado";
  featured?: boolean;
}

const videos: Video[] = [
  {
    id: "1",
    title: "Cómo Elegir Internet en Bogotá 2026",
    description: "Guía completa paso a paso para elegir el mejor operador de internet en Bogotá. Analizamos velocidad, precio, cobertura y factores clave para tomar la mejor decisión.",
    youtubeId: "dQw4w9WgXcQ", // Placeholder - replace with real video IDs
    duration: "8:30",
    views: "15.2K",
    uploadDate: "2025-12-01",
    category: "Guías",
    difficulty: "Principiante",
    featured: true
  },
  {
    id: "2", 
    title: "ETB vs Claro vs Movistar: Comparación Completa",
    description: "Comparación exhaustiva entre los tres principales operadores de internet en Bogotá. Velocidades reales, precios, cobertura y calidad de servicio al cliente.",
    youtubeId: "oHg5SJYRHA0",
    duration: "12:15",
    views: "23.8K", 
    uploadDate: "2025-11-28",
    category: "Comparaciones",
    difficulty: "Intermedio",
    featured: true
  },
  {
    id: "3",
    title: "Mejores Velocidades para Gaming en Bogotá",
    description: "Todo lo que necesitas saber sobre velocidades de internet para gaming. Ping, latencia, operadores recomendados y configuración óptima.",
    youtubeId: "9bZkp7q19f0",
    duration: "10:45",
    views: "18.7K",
    uploadDate: "2025-11-25", 
    category: "Gaming",
    difficulty: "Intermedio"
  },
  {
    id: "4",
    title: "Internet para Teletrabajo: Guía Completa",
    description: "Cómo configurar internet perfecto para trabajo remoto. Velocidades recomendadas, backup de conexión y herramientas para optimizar productividad.",
    youtubeId: "JGwWNGJdvx8",
    duration: "14:20",
    views: "31.5K",
    uploadDate: "2025-11-20",
    category: "Teletrabajo", 
    difficulty: "Intermedio",
    featured: true
  },
  {
    id: "5",
    title: "Proceso de Instalación Internet Bogotá",
    description: "Qué esperar durante la instalación de internet en Bogotá. Tiempos, procesos, documentos necesarios y tips para una instalación exitosa.",
    youtubeId: "kffacxfA7G4",
    duration: "7:55",
    views: "12.3K",
    uploadDate: "2025-11-15",
    category: "Instalación",
    difficulty: "Principiante"
  },
  {
    id: "6", 
    title: "Fibra Óptica vs Cable: ¿Cuál Elegir?",
    description: "Diferencias técnicas entre fibra óptica y cable coaxial. Ventajas, desventajas y cuál conviene más según tu uso y ubicación.",
    youtubeId: "DcM0C5hyxhg",
    duration: "9:30",
    views: "19.8K",
    uploadDate: "2025-11-10",
    category: "Guías",
    difficulty: "Intermedio"
  },
  {
    id: "7",
    title: "Solucionar Internet Lento en Casa",
    description: "Diagnóstico y soluciones para internet lento. Cómo identificar problemas, optimizar WiFi y cuándo contactar al operador.",
    youtubeId: "L_jWHffIx5E",
    duration: "11:40", 
    views: "27.1K",
    uploadDate: "2025-11-05",
    category: "Guías",
    difficulty: "Intermedio"
  },
  {
    id: "8",
    title: "Internet por Barrios: Cobertura Bogotá",
    description: "Análisis de cobertura de internet por barrios de Bogotá. Qué operadores llegan a cada zona y recomendaciones específicas por localidad.",
    youtubeId: "fJ9rUzIMcZQ",
    duration: "16:25",
    views: "35.2K",
    uploadDate: "2025-10-30",
    category: "Guías",
    difficulty: "Avanzado"
  }
];

const VideoCard = ({ video }: { video: Video }) => {
  const categoryColors = {
    "Guías": "bg-blue-100 text-blue-800",
    "Comparaciones": "bg-purple-100 text-purple-800", 
    "Instalación": "bg-green-100 text-green-800",
    "Gaming": "bg-red-100 text-red-800",
    "Teletrabajo": "bg-yellow-100 text-yellow-800"
  };

  const difficultyColors = {
    "Principiante": "bg-emerald-100 text-emerald-700",
    "Intermedio": "bg-orange-100 text-orange-700",
    "Avanzado": "bg-red-100 text-red-700"
  };

  return (
    <div className={`bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${video.featured ? 'ring-2 ring-blue-200' : ''}`}>
      {/* Video Thumbnail */}
      <div className="relative aspect-video bg-gray-200 group cursor-pointer">
        <img
          src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
          alt={video.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center group-hover:bg-opacity-40 transition-all">
          <div className="bg-red-600 rounded-full p-4 group-hover:scale-110 transition-transform">
            <Play className="w-8 h-8 text-white fill-current" />
          </div>
        </div>
        {video.featured && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center">
            <Star className="w-4 h-4 mr-1" />
            Destacado
          </div>
        )}
        <div className="absolute bottom-3 right-3 bg-black bg-opacity-80 text-white px-2 py-1 rounded text-sm font-medium">
          {video.duration}
        </div>
      </div>

      {/* Video Info */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
              {video.title}
            </h3>
          </div>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
          {video.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${categoryColors[video.category]}`}>
            {video.category}
          </span>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${difficultyColors[video.difficulty]}`}>
            {video.difficulty}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <Eye className="w-4 h-4 mr-1" />
              {video.views} vistas
            </span>
            <span className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {new Date(video.uploadDate).toLocaleDateString("es-CO", {
                year: "numeric",
                month: "short",
                day: "numeric"
              })}
            </span>
          </div>
          <div className="flex items-center text-blue-600">
            <Clock className="w-4 h-4 mr-1" />
            {video.duration}
          </div>
        </div>

        <button 
          onClick={() => window.open(`https://www.youtube.com/watch?v=${video.youtubeId}`, '_blank')}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
        >
          <Play className="w-5 h-5 mr-2" />
          Ver Video
        </button>
      </div>
    </div>
  );
};

const CategoryFilter = ({ 
  selectedCategory, 
  onCategoryChange 
}: { 
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}) => {
  const categories = ["Todos", "Guías", "Comparaciones", "Gaming", "Teletrabajo", "Instalación"];

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === category
              ? "bg-red-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default function VideosPage() {
  const featuredVideos = videos.filter(video => video.featured);
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(videosStructuredData),
        }}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-red-600 to-pink-700 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Videos Guía Internet Bogotá 2026
              </h1>
              <p className="text-xl md:text-2xl text-red-100 mb-8">
                Aprende todo sobre internet en Bogotá con nuestros videos tutoriales
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 text-red-100">
                <div className="flex items-center">
                  <Play className="w-6 h-6 text-white mr-2" />
                  <span className="text-lg">8 Videos Tutoriales</span>
                </div>
                <div className="flex items-center">
                  <Eye className="w-6 h-6 text-white mr-2" />
                  <span className="text-lg">200K+ Visualizaciones</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-6 h-6 text-white mr-2" />
                  <span className="text-lg">Contenido Actualizado</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Videos */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Videos Destacados
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Los videos más populares y útiles para elegir el mejor internet en Bogotá
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
                {featuredVideos.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* All Videos */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Todos los Videos
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Explora nuestra biblioteca completa de contenido sobre internet en Bogotá
                </p>
              </div>

              {/* Filter would go here - for now showing all videos */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {videos.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Video Statistics */}
        <section className="bg-gray-100 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                Estadísticas de Contenido
              </h2>
              
              <div className="grid md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Play className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">8</h3>
                  <p className="text-gray-600">Videos Tutoriales</p>
                </div>

                <div className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Eye className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">200K+</h3>
                  <p className="text-gray-600">Visualizaciones</p>
                </div>

                <div className="text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">85</h3>
                  <p className="text-gray-600">Minutos de Contenido</p>
                </div>

                <div className="text-center">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">4.8</h3>
                  <p className="text-gray-600">Rating Promedio</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                ¿Necesitas Ayuda Personalizada?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Después de ver nuestros videos, usa nuestras herramientas para encontrar 
                la opción perfecta para tu hogar u oficina.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
                <Link
                  href="/calculadora"
                  className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  🧮 Calculadora de Internet
                </Link>
                <Link
                  href="/testimonios"
                  className="bg-yellow-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-700 transition-colors"
                >
                  ⭐ Ver Testimonios
                </Link>
                <Link
                  href="/guia-completa"
                  className="border-2 border-red-600 text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors"
                >
                  📖 Guía Completa
                </Link>
              </div>

              <div className="bg-gradient-to-r from-red-50 to-pink-50 p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  ¿Prefieres Hablar con un Experto?
                </h3>
                <p className="text-gray-600 mb-6">
                  Nuestros especialistas te ayudan a elegir basándose en los videos 
                  y tu situación específica. Completamente gratis.
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