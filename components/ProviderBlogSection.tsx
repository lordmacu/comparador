import Link from 'next/link';
import { Clock, Tag } from 'lucide-react';
import { getAllPosts, getPostsForProvider } from '@/lib/blog';

interface ProviderBlogSectionProps {
  providerName: string;
  providerSlug: string;
  accentColor: string;
  limit?: number;
}

export default function ProviderBlogSection({
  providerName,
  providerSlug,
  accentColor,
  limit = 3,
}: ProviderBlogSectionProps) {
  const posts = getPostsForProvider(providerSlug, limit);
  const fallbackPosts = getAllPosts().slice(0, limit);
  const postsToRender = posts.length > 0 ? posts : fallbackPosts;

  return (
    <section className="py-16 bg-white" aria-label={`Artículos sobre ${providerName}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
            Guías y Consejos sobre {providerName}
          </h2>
          <p className="text-xl text-gray-600">
            Artículos pensados para ayudarte a elegir y contratar {providerName}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {postsToRender.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              <Link href={`/blog/${post.slug}`}>
                {/* Featured Image */}
                {(post.thumbnailImage || post.image) && (
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
                    <Tag className="w-4 h-4" style={{ color: accentColor }} />
                    <span className="text-sm font-medium" style={{ color: accentColor }}>
                      {post.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.description}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-gray-500">
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

        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-block px-8 py-3 rounded-lg font-semibold text-white transition-colors"
            style={{ backgroundColor: accentColor }}
          >
            Ver más artículos
          </Link>
          <div className="mt-4">
            <Link
              href={`/${providerSlug}#contacto`}
              className="text-sm font-semibold hover:underline"
              style={{ color: accentColor }}
            >
              ¿Prefieres que te llamemos? Solicita información →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
