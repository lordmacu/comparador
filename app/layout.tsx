import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { generateWebSiteSchema, renderJsonLd } from "@/lib/schemas";
import Header from "@/components/Header";
import { OrganizationSchema, WebsiteSchema } from "@/components/SchemaMarkup";
import { WebVitals } from "@/components/WebVitals";
import { ClientProviders } from "@/components/ClientProviders";
import { Analytics } from "@/components/Analytics";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
  fallback: ['system-ui', 'arial'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://comparadorinternet.co'),
  title: {
    default: "Comparador de Internet en Colombia 2025 | Claro, Movistar, ETB",
    template: "%s | Tu Comparador"
  },
  description: "Descubre los servicios de internet en Colombia. Compara beneficios de Claro, Movistar y ETB. Consulta planes, promociones y cobertura disponible en tu zona.",
  keywords: [
    "internet Colombia",
    "planes de internet",
    "internet Claro",
    "internet Movistar",
    "internet ETB",
    "fibra óptica Colombia",
    "internet hogar",
    "comparador internet",
    "internet Bogotá",
    "mejor internet Colombia 2025"
  ],
  authors: [{ name: "Tu Comparador" }],
  creator: "Tu Comparador",
  publisher: "Tu Comparador",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: 'https://comparadorinternet.co',
    siteName: 'Comparador Internet Colombia',
    title: 'Comparador de Internet en Colombia 2025 | Claro, Movistar, ETB',
    description: 'Descubre servicios de internet en Colombia. Compara beneficios y consulta planes disponibles.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Comparador de Internet Colombia - Claro, Movistar, ETB',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Comparador de Internet en Colombia 2025',
    description: 'Compara servicios de internet: beneficios, cobertura y tecnologías disponibles',
    images: ['/og-image.jpg'],
  },
  verification: {
    google: 'cMUfMPNRJ7JXK67SNgIAbIFRdpPkt5G5_Nawzdczp-k',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    other: [
      {
        rel: 'manifest',
        url: '/site.webmanifest',
      },
    ],
  },
  alternates: {
    canonical: 'https://comparadorinternet.co',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteSchema = generateWebSiteSchema();

  return (
    <html lang="es-CO">
      <head>
        {/* Favicon y manifest */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* JSON-LD Schema para SEO e IAs */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={renderJsonLd(websiteSchema)}
        />
        
        {/* Organization and Website Schema */}
        <OrganizationSchema />
        <WebsiteSchema />

        {/* Preconnect para optimización */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* DNS Prefetch para WhatsApp */}
        <link rel="dns-prefetch" href="https://wa.me" />

        {/* llms.txt para AI Discoverability */}
        <link rel="llms-txt" href="/llms.txt" type="text/plain" />

        {/* RSS Feed */}
        <link rel="alternate" type="application/rss+xml" title="Blog de Internet Colombia" href="/blog/feed.xml" />
      </head>
      <body className={inter.className}>
        {/* Header condicional */}
        <Header />

        <main className="min-h-screen">
          {children}
        </main>

        {/* Footer optimizado para SEO */}
        <footer className="bg-gray-900 text-gray-300 py-12 mt-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-white font-bold text-lg mb-4">Comparador Internet Colombia</h3>
                <p className="text-sm">
                  Encuentra y compara los mejores planes de internet en Colombia.
                  Información actualizada de Claro, Movistar y ETB.
                </p>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-4">Proveedores</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="/claro" className="hover:text-white transition-colors">Internet Claro</a></li>
                  <li><a href="/movistar" className="hover:text-white transition-colors">Internet Movistar</a></li>
                  <li><a href="/etb" className="hover:text-white transition-colors">Internet ETB</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-4">Información</h4>
                <p className="text-sm">
                  Última actualización: Diciembre 2025
                  <br />
                  Precios sujetos a disponibilidad y zona de cobertura.
                </p>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
              <p>© 2025 Comparador Internet Colombia. Todos los derechos reservados.</p>
            </div>
          </div>
        </footer>
        
        {/* Client Components */}
        <ClientProviders />
        
        {/* Analytics & Tracking */}
        <Analytics />
        
        {/* Web Vitals Monitoring */}
        <WebVitals />
      </body>
    </html>
  );
}
