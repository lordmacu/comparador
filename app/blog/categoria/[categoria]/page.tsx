import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getAllCategories, getPostsByCategory } from "@/lib/blog";
import { categoryFromSlug, slugifyCategory, getCategorySlugMapping } from "@/lib/blog-utils";
import { Clock, Calendar, Tag, ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

// ISR: Regenera cada hora
export const revalidate = 3600;
export const dynamicParams = false;

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
  const categoryName = categoryFromSlug(categoriaSlug);

  if (!categoryName) {
    return {
      title: 'Categoría no encontrada',
    };
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
  const categoryName = categoryFromSlug(categoriaSlug);

  if (!categoryName) {
    notFound();
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
            <div className="text-center py-16">
              <p className="text-xl text-gray-600">No hay artículos en esta categoría aún.</p>
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
