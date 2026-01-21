import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { slugifyCategory } from "@/lib/blog-utils";
import { Search, Calendar, Clock, Tag, ArrowLeft } from "lucide-react";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Buscar en el Blog - Comparador Internet Colombia",
  description: "Busca artículos, guías y consejos sobre internet en Colombia",
  robots: {
    index: true,
    follow: true,
  },
};

function SearchResults({ searchQuery }: { searchQuery: string }) {
  const allPosts = getAllPosts();
  
  // Filtrar posts por el término de búsqueda
  const filteredPosts = searchQuery
    ? allPosts.filter((post) => {
        const query = searchQuery.toLowerCase();
        return (
          post.title.toLowerCase().includes(query) ||
          post.description.toLowerCase().includes(query) ||
          post.category.toLowerCase().includes(query) ||
          post.tags.some(tag => tag.toLowerCase().includes(query))
        );
      })
    : [];

  if (!searchQuery) {
    return (
      <div className="text-center py-16">
        <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Busca artículos en nuestro blog
        </h2>
        <p className="text-gray-600">
          Escribe algo en el campo de búsqueda para encontrar artículos
        </p>
      </div>
    );
  }

  if (filteredPosts.length === 0) {
    return (
      <div className="text-center py-16">
        <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          No se encontraron resultados para "{searchQuery}"
        </h2>
        <p className="text-gray-600 mb-8">
          Intenta con otros términos de búsqueda o explora nuestras categorías
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Ver todos los artículos
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          {filteredPosts.length} {filteredPosts.length === 1 ? 'resultado' : 'resultados'} para "{searchQuery}"
        </h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <article
            key={post.slug}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <Link href={`/blog/${post.slug}`}>
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
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-4 h-4 text-blue-600" />
                  <Link
                    href={`/blog/categoria/${slugifyCategory(post.category)}`}
                    className="text-sm font-medium text-blue-600 hover:text-blue-700"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {post.category}
                  </Link>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.description}
                </p>

                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <time dateTime={post.publishedAt}>
                      {new Date(post.publishedAt).toLocaleDateString('es-CO', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </time>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readingTime} min</span>
                  </div>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const searchQuery = params.q || "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-600">Inicio</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-blue-600">Blog</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">Buscar</span>
        </div>

        {/* Header */}
        <div className="mb-12">
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al blog
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Buscar en el Blog
          </h1>

          {/* Search Box */}
          <form method="get" action="/buscar" className="max-w-2xl">
            <div className="relative">
              <input
                type="text"
                name="q"
                defaultValue={searchQuery}
                placeholder="Buscar artículos, guías, tutoriales..."
                className="w-full px-6 py-4 pr-14 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-lg"
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors"
                aria-label="Buscar"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>

        {/* Results */}
        <Suspense fallback={
          <div className="text-center py-16">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-8"></div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="h-48 bg-gray-200"></div>
                    <div className="p-6">
                      <div className="h-4 bg-gray-200 rounded w-20 mb-4"></div>
                      <div className="h-6 bg-gray-200 rounded mb-3"></div>
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        }>
          <SearchResults searchQuery={searchQuery} />
        </Suspense>

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
  );
}
