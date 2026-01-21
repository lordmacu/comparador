import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getAllCategories, getPostsByCategory } from "@/lib/blog";
import { categoryFromSlug, slugifyCategory, getCategorySlugMapping } from "@/lib/blog-utils";
import { Clock, Calendar, Tag, ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

// ISR: Regenera cada hora
export const revalidate = 3600;
export const dynamicParams = true; // Permitir categorías dinámicas

// Generar páginas estáticas para todas las categorías
export function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((category) => ({
    categoria: slugifyCategory(category),
  }));
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ categoria: string }> 
}): Promise<Metadata> {
  const { categoria: categoriaSlug } = await params;
  
  // Intentar obtener nombre de categoría conocida, o generar desde slug
  let categoryName = categoryFromSlug(categoriaSlug);
  if (!categoryName) {
    // Convertir slug a nombre legible: "internet-y-telefonia" -> "Internet y Telefonía"
    categoryName = categoriaSlug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  const posts = getPostsByCategory(categoryName);
  const canonicalUrl = `https://comparadorinternet.co/blog/categoria/${categoriaSlug}`;

  return {
    title: `${categoryName} - Blog Internet Colombia`,
    description: `Artículos sobre ${categoryName.toLowerCase()}. ${posts.length} guías y consejos sobre internet en Colombia.`,
    keywords: [
      `blog ${categoryName.toLowerCase()}`,
      `${categoryName.toLowerCase()} internet Colombia`,
      'guías internet',
      'consejos internet Colombia',
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${categoryName} - Blog Internet Colombia`,
      description: `${posts.length} artículos sobre ${categoryName.toLowerCase()}`,
      url: canonicalUrl,
      type: 'website',
      locale: 'es_CO',
      siteName: 'Comparador Internet Colombia',
      images: [{
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: `${categoryName} - Blog Internet Colombia`
      }]
    },
    twitter: {
      card: 'summary_large_image',
      title: `${categoryName} - Blog Internet Colombia`,
      description: `${posts.length} artículos sobre ${categoryName.toLowerCase()}`,
      images: ['/og-image.jpg'],
    },
  };
}

export default async function CategoryPage({ 
  params 
}: { 
  params: Promise<{ categoria: string }> 
}) {
  const { categoria: categoriaSlug } = await params;
  
  // Intentar obtener nombre de categoría conocida, o generar desde slug
  let categoryName = categoryFromSlug(categoriaSlug);
  if (!categoryName) {
    // Convertir slug a nombre legible: "internet-y-telefonia" -> "Internet y Telefonía"
    categoryName = categoriaSlug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  const posts = getPostsByCategory(categoryName);
  const allCategories = getAllCategories();

  // CollectionPage JSON-LD Schema
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${categoryName} - Blog Internet Colombia`,
    "description": `Artículos sobre ${categoryName.toLowerCase()}`,
    "url": `https://comparadorinternet.co/blog/categoria/${categoriaSlug}`,
    "inLanguage": "es-CO",
    "isPartOf": {
      "@type": "WebSite",
      "url": "https://comparadorinternet.co"
    },
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": posts.length,
      "itemListElement": posts.map((post, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `https://comparadorinternet.co/blog/${post.slug}`,
        "name": post.title,
      }))
    }
  };

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Inicio",
        "item": "https://comparadorinternet.co"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://comparadorinternet.co/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": categoryName,
        "item": `https://comparadorinternet.co/blog/categoria/${categoriaSlug}`
      }
    ]
  };

  return (
    <>
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-8 flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Inicio</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-blue-600">Blog</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{categoryName}</span>
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al blog
            </Link>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {categoryName}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {posts.length} {posts.length === 1 ? 'artículo' : 'artículos'} en esta categoría
            </p>
          </div>

          {/* Otras Categorías */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <Link
              href="/blog"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              Todas
            </Link>
            {allCategories.map((category) => {
              const isActive = category === categoryName;
              return (
                <Link
                  key={category}
                  href={`/blog/categoria/${slugifyCategory(category)}`}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  }`}
                >
                  {category}
                </Link>
              );
            })}
          </div>

          {/* Blog Posts Grid */}
          {posts.length === 0 ? (
            <div className="max-w-4xl mx-auto">
              {/* Mensaje de búsqueda */}
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  ¿Estás buscando información sobre {categoryName}?
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Aunque aún no tenemos artículos específicos sobre <strong>{categoryName.toLowerCase()}</strong>, 
                  estamos constantemente creando contenido nuevo sobre internet y telecomunicaciones en Colombia.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Te invitamos a explorar nuestras otras categorías donde encontrarás guías completas, 
                  comparativas detalladas y consejos expertos para ayudarte a elegir el mejor servicio de internet 
                  para tu hogar o empresa.
                </p>
                
                {/* Beneficios */}
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">📊 Comparación Inteligente</h3>
                    <p className="text-gray-600 text-sm">
                      Compara planes de Claro, Movistar y ETB en tiempo real
                    </p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">💰 Mejor Precio</h3>
                    <p className="text-gray-600 text-sm">
                      Encuentra las mejores ofertas y promociones del mercado
                    </p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">🎯 Asesoría Gratuita</h3>
                    <p className="text-gray-600 text-sm">
                      Recibe recomendaciones personalizadas sin costo
                    </p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">⚡ Rápido y Fácil</h3>
                    <p className="text-gray-600 text-sm">
                      Contrata tu plan en minutos desde casa
                    </p>
                  </div>
                </div>

                {/* CTA Principal */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white text-center">
                  <h3 className="text-2xl font-bold mb-3">
                    ¿Necesitas Contratar Internet Ya?
                  </h3>
                  <p className="text-lg mb-6 opacity-90">
                    Déjanos ayudarte a encontrar el plan perfecto para tus necesidades
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/comparar"
                      className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold hover:bg-blue-50 transition-colors text-lg"
                    >
                      Ver Planes Disponibles
                    </Link>
                    <Link
                      href="/calculadora"
                      className="bg-blue-500 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-400 transition-colors text-lg border-2 border-white"
                    >
                      Calcular Mi Plan Ideal
                    </Link>
                  </div>
                </div>
              </div>

              {/* Explorar otras categorías */}
              <div className="bg-gray-50 rounded-xl p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Explora Nuestras Categorías
                </h3>
                <p className="text-gray-600 mb-6">
                  Encuentra artículos útiles en nuestras otras categorías
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {allCategories.map((category) => (
                    <Link
                      key={category}
                      href={`/blog/categoria/${slugifyCategory(category)}`}
                      className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ) : (
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
          )}

          {/* CTA Section */}
          <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              ¿Buscas el Mejor Plan de Internet?
            </h2>
            <p className="text-xl mb-6 opacity-90">
              Compara planes y encuentra la mejor opción para tu hogar
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/comparar"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center justify-center"
              >
                Comparar Planes
              </Link>
              <Link
                href="/calculadora"
                className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-400 transition-colors"
              >
                Calcular mi Plan Ideal
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
