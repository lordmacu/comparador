import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getAllPosts, getRelatedPosts } from "@/lib/blog";
import { Clock, Calendar, ArrowLeft, Tag } from "lucide-react";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import BlogContactForm from "@/components/BlogContactForm";
import TableOfContents from "@/components/TableOfContents";
import InlineBlogCallWidget from "@/components/InlineBlogCallWidget";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Artículo no encontrado",
    };
  }

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: post.author }],
    alternates: {
      canonical: `https://comparadorinternet.co/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://comparadorinternet.co/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.slug);

  // Calculate word count
  const wordCount = post.content.split(/\s+/).length;

  const splitMarkdownForInlineCta = (markdown: string) => {
    const headingMatches = Array.from(markdown.matchAll(/^##\s+/gm));
    if (headingMatches.length >= 2) {
      const midIndex = Math.floor(headingMatches.length / 2);
      const insertAt = headingMatches[midIndex].index ?? 0;
      return {
        before: markdown.slice(0, insertAt).trimEnd(),
        after: markdown.slice(insertAt).trimStart(),
      };
    }

    const paragraphBreaks = Array.from(markdown.matchAll(/\n{2,}/g));
    if (paragraphBreaks.length >= 2) {
      const match = paragraphBreaks[Math.floor(paragraphBreaks.length / 2)];
      const insertAt = (match.index ?? 0) + match[0].length;
      return {
        before: markdown.slice(0, insertAt).trimEnd(),
        after: markdown.slice(insertAt).trimStart(),
      };
    }

    return { before: markdown, after: '' };
  };

  const { before: contentBeforeCta, after: contentAfterCta } = splitMarkdownForInlineCta(post.content);

  const markdownComponents: Components = {
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold text-gray-900 mt-8 mb-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="text-gray-700 mb-4 leading-relaxed">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal pl-6 mb-4 space-y-2 text-gray-700">{children}</ol>
    ),
    li: ({ children }) => <li className="leading-relaxed">{children}</li>,
    strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
    a: ({ href, children }) => (
      <a href={href} className="text-blue-600 hover:text-blue-800 underline">{children}</a>
    ),
    table: ({ children }) => (
      <div className="overflow-x-auto my-8 rounded-lg shadow-md">
        <table className="min-w-full border-collapse bg-white">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">{children}</thead>
    ),
    tbody: ({ children }) => <tbody className="divide-y divide-gray-200">{children}</tbody>,
    tr: ({ children }) => <tr className="hover:bg-blue-50 transition-colors">{children}</tr>,
    th: ({ children }) => (
      <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider border-r border-blue-500 last:border-r-0">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-6 py-4 text-sm text-gray-700 border-r border-gray-200 last:border-r-0">
        {children}
      </td>
    ),
  };

  // Article JSON-LD Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "image": post.image || "https://comparadorinternet.co/og-image.jpg",
    "datePublished": post.publishedAt,
    "dateModified": post.updatedAt || post.publishedAt,
    "author": {
      "@type": "Person",
      "name": post.author,
    },
    "publisher": {
      "@type": "Organization",
      "name": "Comparador Internet Colombia",
      "logo": {
        "@type": "ImageObject",
        "url": "https://comparadorinternet.co/icon.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://comparadorinternet.co/blog/${post.slug}`
    },
    "articleSection": post.category,
    "keywords": post.tags.join(", "),
    "wordCount": wordCount,
    "inLanguage": "es-CO",
    "isAccessibleForFree": true,
  };

  // Breadcrumb JSON-LD Schema
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
        "name": post.category,
        "item": `https://comparadorinternet.co/blog?category=${encodeURIComponent(post.category)}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": post.title,
        "item": `https://comparadorinternet.co/blog/${post.slug}`
      }
    ]
  };

  return (
    <>
      {/* Article JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Breadcrumb JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al Blog
            </Link>
          </nav>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <article className="bg-white rounded-xl shadow-lg p-8">
                {/* Category Badge */}
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-600">
                    {post.category}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  {post.title}
                </h1>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 pb-8 border-b">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <time dateTime={post.publishedAt}>
                      {new Date(post.publishedAt).toLocaleDateString('es-CO', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>{post.readingTime} min de lectura</span>
                  </div>
                  <div className="text-gray-600">
                    Por {post.author}
                  </div>
                </div>

                {/* Content */}
                <div className="prose prose-lg max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                    {contentBeforeCta}
                  </ReactMarkdown>

                  <InlineBlogCallWidget postSlug={post.slug} />

                  <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                    {contentAfterCta}
                  </ReactMarkdown>
                </div>

                {/* Tags */}
                <div className="mt-8 pt-8 border-t">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Etiquetas:</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Artículos Relacionados
                  </h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    {relatedPosts.map((relatedPost) => (
                      <Link
                        key={relatedPost.slug}
                        href={`/blog/${relatedPost.slug}`}
                        className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
                      >
                        <span className="text-xs text-blue-600 font-medium">
                          {relatedPost.category}
                        </span>
                        <h3 className="text-lg font-bold text-gray-900 mt-2 mb-2">
                          {relatedPost.title}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {relatedPost.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* Contact Form */}
                <BlogContactForm />

                {/* Compare Plans CTA */}
                <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Compara Planes
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Encuentra el mejor internet para tu hogar o negocio
                  </p>
                  <Link
                    href="/"
                    className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Ver Comparador
                  </Link>
                </div>

                {/* Quick Links */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Proveedores
                  </h3>
                  <ul className="space-y-3">
                    <li>
                      <Link href="/claro" className="text-blue-600 hover:text-blue-800 hover:underline">
                        Internet Claro
                      </Link>
                    </li>
                    <li>
                      <Link href="/movistar" className="text-blue-600 hover:text-blue-800 hover:underline">
                        Internet Movistar
                      </Link>
                    </li>
                    <li>
                      <Link href="/etb" className="text-blue-600 hover:text-blue-800 hover:underline">
                        Internet ETB
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
