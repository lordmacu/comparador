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
      locale: 'es_CO',
      siteName: 'Comparador Internet Colombia',
      images: [{
        url: post.image || 'https://comparadorinternet.co/og-image.jpg',
        width: 1200,
        height: 630,
        alt: post.title
      }]
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.image || 'https://comparadorinternet.co/og-image.jpg'],
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
    h2: ({ children }) => {
      const text = String(children);
      const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
      return <h2 id={id} className="text-2xl font-bold text-gray-900 mt-8 mb-4 -mx-4 px-4 py-2 rounded-lg">{children}</h2>;
    },
    h3: ({ children }) => {
      const text = String(children);
      const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
      return <h3 id={id} className="text-xl font-bold text-gray-900 mt-6 mb-3 -mx-4 px-4 py-2 rounded-lg">{children}</h3>;
    },
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
    a: ({ href, children }) => {
      const isExternal = href && !href.startsWith('/') && !href.startsWith('#') && !href.includes('comparadorinternet.co');
      return (
        <a
          href={href}
          className="text-blue-600 hover:text-blue-800 underline"
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
        >
          {children}
        </a>
      );
    },
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

  // FAQ Schema - Extract Q&A from content
  const extractFAQ = (content: string) => {
    const faqs: Array<{ question: string; answer: string }> = [];

    // Match headings that are questions (contain ¿ or end with ?)
    const questionRegex = /^##\s+(¿[^?]+\?|[^?]+\?)\s*$/gm;
    const matches = Array.from(content.matchAll(questionRegex));

    matches.forEach((match, index) => {
      const question = match[1].trim();
      const questionIndex = match.index || 0;
      const nextQuestionIndex = matches[index + 1]?.index || content.length;

      // Extract content between this question and next question
      const answerContent = content
        .slice(questionIndex + match[0].length, nextQuestionIndex)
        .trim()
        .split('\n\n')[0] // Get first paragraph
        .replace(/^#{1,6}\s+/gm, '') // Remove any markdown headings
        .replace(/\*\*/g, '') // Remove bold markers
        .trim();

      if (answerContent) {
        faqs.push({
          question,
          answer: answerContent
        });
      }
    });

    return faqs;
  };

  const faqItems = extractFAQ(post.content);
  const faqSchema = faqItems.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  // Review Schema - For comparative posts
  const isComparativePost = post.slug.includes('vs') ||
                           post.title.toLowerCase().includes('mejor') ||
                           post.title.toLowerCase().includes('comparación') ||
                           post.category === 'Comparativas';

  const reviewSchema = isComparativePost ? {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "Service",
      "name": post.title.includes('ETB') ? 'Internet ETB' :
              post.title.includes('Movistar') ? 'Internet Movistar' :
              post.title.includes('Claro') ? 'Internet Claro' : 'Servicios de Internet Colombia',
      "provider": {
        "@type": "Organization",
        "name": "Comparador Internet Colombia"
      }
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": 4.5,
      "bestRating": 5,
      "worstRating": 1
    },
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "reviewBody": post.description,
    "datePublished": post.publishedAt
  } : null;

  // HowTo Schema - For guide posts with steps
  const extractHowToSteps = (content: string) => {
    const steps: Array<{ name: string; text: string }> = [];

    // Match numbered headings or "Paso X" patterns
    const stepRegex = /^##\s+(?:(?:Paso|Tip|Step)\s+)?(\d+)[.:)]\s+(.+)$/gm;
    const matches = Array.from(content.matchAll(stepRegex));

    matches.forEach((match, index) => {
      const stepTitle = match[2].trim();
      const stepIndex = match.index || 0;
      const nextStepIndex = matches[index + 1]?.index || content.length;

      // Extract content for this step
      const stepContent = content
        .slice(stepIndex + match[0].length, nextStepIndex)
        .trim()
        .split('\n\n')[0]
        .replace(/^#{1,6}\s+/gm, '')
        .replace(/\*\*/g, '')
        .trim();

      if (stepContent) {
        steps.push({
          name: stepTitle,
          text: stepContent.substring(0, 200) // Limit to 200 chars
        });
      }
    });

    return steps;
  };

  const isHowToPost = post.title.toLowerCase().includes('cómo') ||
                     post.title.toLowerCase().includes('como') ||
                     post.category === 'Guías' ||
                     post.slug.includes('como-');

  const howToSteps = isHowToPost ? extractHowToSteps(post.content) : [];
  const howToSchema = howToSteps.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": post.title,
    "description": post.description,
    "image": post.image || "https://comparadorinternet.co/og-image.jpg",
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "COP",
      "value": "0"
    },
    "step": howToSteps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text
    }))
  } : null;

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

      {/* FAQ JSON-LD Schema (if Q&A found) */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Review JSON-LD Schema (if comparative post) */}
      {reviewSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
        />
      )}

      {/* HowTo JSON-LD Schema (if guide post with steps) */}
      {howToSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
      )}

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="mb-6" aria-label="Breadcrumb">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
              aria-label="Volver a la página principal del blog"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              Volver al Blog
            </Link>
          </nav>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <article className="bg-white rounded-xl shadow-lg p-8" aria-labelledby="article-title">
                {/* Category Badge */}
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-600">
                    {post.category}
                  </span>
                </div>

                {/* Title */}
                <h1 id="article-title" className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
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

                {/* Contact Form - Top of Article (Mobile) */}
                <div className="lg:hidden mb-8">
                  <BlogContactForm />
                </div>

                {/* Compare Plans CTA - Top of Article */}
                <div className="mb-8 p-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg">
                  <div className="text-white">
                    <h3 className="text-xl font-bold mb-2">
                      Compara Planes de Internet
                    </h3>
                    <p className="text-blue-100 text-sm mb-4">
                      Encuentra el mejor internet para tu hogar o negocio en Bogotá
                    </p>
                    <Link
                      href="/"
                      className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-md"
                    >
                      Ver Comparador
                    </Link>
                  </div>
                </div>

                {/* Featured Image */}
                {post.image && (
                  <div className="mb-8">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-auto rounded-lg shadow-lg"
                    />
                  </div>
                )}

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

                {/* Contact Form - Bottom of Article */}
                <div className="mt-12 p-8 bg-gradient-to-br from-blue-50 to-white rounded-xl border-2 border-blue-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                    ¿Necesitas Ayuda para Elegir tu Plan de Internet?
                  </h3>
                  <p className="text-gray-700 text-center mb-6">
                    Déjanos tu número y uno de nuestros asesores te contactará para ayudarte a encontrar el mejor plan según tu zona y necesidades
                  </p>
                  <BlogContactForm />
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

              {/* Provider Links */}
              <div className="mt-12 bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Explora Planes por Proveedor
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <Link
                    href="/claro"
                    className="p-6 bg-gradient-to-br from-red-50 to-white border-2 border-red-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <h4 className="text-xl font-bold text-red-600 mb-2">Internet Claro</h4>
                    <p className="text-gray-600 text-sm">Ver planes y cobertura</p>
                  </Link>
                  <Link
                    href="/movistar"
                    className="p-6 bg-gradient-to-br from-green-50 to-white border-2 border-green-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <h4 className="text-xl font-bold text-green-600 mb-2">Internet Movistar</h4>
                    <p className="text-gray-600 text-sm">Ver planes y cobertura</p>
                  </Link>
                  <Link
                    href="/etb"
                    className="p-6 bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <h4 className="text-xl font-bold text-blue-600 mb-2">Internet ETB</h4>
                    <p className="text-gray-600 text-sm">Ver planes y cobertura</p>
                  </Link>
                </div>
              </div>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <section className="mt-12" aria-labelledby="related-posts-heading">
                  <h2 id="related-posts-heading" className="text-2xl font-bold text-gray-900 mb-6">
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
                </section>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1" aria-label="Barra lateral del blog">
              <div className="sticky top-8">
                {/* Table of Contents */}
                <TableOfContents content={post.content} />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
