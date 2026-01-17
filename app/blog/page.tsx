import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getAllCategories } from "@/lib/blog";
import { Clock, Calendar, Tag } from "lucide-react";

// ISR: Regenera la lista de posts cada 1 hora si hay tráfico
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  // Siempre apuntar a la URL canónica sin parámetros de categoría
  const canonicalUrl = 'https://comparadorinternet.co/blog';
  
  return {
    title: "Blog de Internet Colombia - Guías y Consejos",
    description: "Artículos, guías y consejos sobre internet en Colombia. Aprende a optimizar tu conexión, elegir el mejor proveedor y más.",
    keywords: [
      "blog internet Colombia",
      "guías internet",
      "consejos internet",
      "fibra óptica",
      "velocidad internet",
      "internet hogar"
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: "Blog de Internet Colombia - Guías y Consejos",
      description: "Artículos, guías y consejos sobre internet en Colombia",
      url: canonicalUrl,
      type: 'website',
      locale: 'es_CO',
      siteName: 'Comparador Internet Colombia',
      images: [{
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Blog Internet Colombia - Guías y Consejos'
      }]
    },
    twitter: {
      card: 'summary_large_image',
      title: "Blog de Internet Colombia - Guías y Consejos",
      description: "Artículos, guías y consejos sobre internet en Colombia",
      images: ['/og-image.jpg'],
    },
  };
}

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  // CollectionPage JSON-LD Schema
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Blog de Internet Colombia",
    "description": "Guías, consejos y análisis sobre internet en Colombia",
    "url": "https://comparadorinternet.co/blog",
    "inLanguage": "es-CO",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": posts.map((post, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `https://comparadorinternet.co/blog/${post.slug}`,
        "name": post.title,
      }))
    }
  };

  return (
    <>
      {/* CollectionPage JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Blog de Internet Colombia
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Guías, consejos y análisis para ayudarte a elegir el mejor internet en Colombia
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <span
              key={category}
              className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
            >
              {category}
            </span>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto" role="list">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              role="listitem"
            >
              <Link href={`/blog/${post.slug}`} aria-label={`Leer artículo: ${post.title}`}>
                {/* Featured Image */}
                {post.image && (
                  <div className="relative w-full h-48 bg-gray-100">
                    <img
                      src={post.thumbnailImage || post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      width={400}
                      height={200}
                    />
                  </div>
                )}

                <div className="p-6">
                  {/* Category Badge */}
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="w-4 h-4 text-blue-600" aria-hidden="true" />
                    <span className="text-sm font-medium text-blue-600">
                      {post.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>

                  {/* Description */}
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.description}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <time dateTime={post.publishedAt}>
                        {new Date(post.publishedAt).toLocaleDateString('es-CO', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readingTime} min</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            ¿Necesitas Ayuda Eligiendo tu Internet?
          </h2>
          <p className="text-xl mb-6 opacity-90">
            Nuestros asesores te ayudan a encontrar el plan perfecto para ti
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/573001234567"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Contactar por WhatsApp
            </a>
            <button className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-400 transition-colors">
              Comparar Planes
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
