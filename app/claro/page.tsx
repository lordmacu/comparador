import { getProvider } from '@/lib/data';
import {
  generateOrganizationSchema,
  generateServiceSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateHowToContactSchema,
  generateProductSchema,
  renderJsonLd
} from '@/lib/schemas';
import Image from 'next/image';
import BenefitCard from '@/components/BenefitCard';
import ServiceCard from '@/components/ServiceCard';
import ContactForm from '@/components/ContactForm';
import WhatsAppButton from '@/components/WhatsAppButton';
import QuickCallForm from '@/components/QuickCallForm';
import FAQSection from '@/components/FAQSection';
import ProviderBlogSection from '@/components/ProviderBlogSection';
import ClusterNavigation from '@/components/ClusterNavigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import LastUpdated from '@/components/LastUpdated';
import { ClipboardList, Check } from 'lucide-react';
import type { Metadata } from 'next';

const provider = getProvider('claro');

export const metadata: Metadata = {
  title: `Planes Internet Claro Colombia 2026 | Precios desde $58.900/mes`,
  description: `Planes de internet Claro Colombia 2026 con fibra óptica y HFC. Precios desde $58.900/mes, velocidades hasta 900 Mbps. Tarifas especiales estrato 1 y 2. ¡Cotiza ahora!`,
  keywords: [
    'planes de internet claro colombia',
    'claro colombia internet planes tarifas',
    'internet claro hogar precios',
    'claro fibra óptica colombia',
    'planes claro hogar 2026',
    'internet claro estrato 1 y 2',
    'tarifas claro internet colombia',
    'claro vs movistar vs etb',
    'precios internet claro bogota',
    'contratar claro internet hogar'
  ],
  alternates: {
    canonical: 'https://comparadorinternet.co/claro',
  },
  openGraph: {
    title: `Internet ${provider.name} Colombia 2026`,
    description: provider.hero.subtitle,
    url: 'https://comparadorinternet.co/claro',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: `Internet ${provider.name} Colombia - Comparador de Planes`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Internet ${provider.name} Colombia 2026`,
    description: provider.hero.subtitle,
    images: ['/og-image.jpg'],
  },
};

// ISR: Revalidar cada hora (3600 segundos)
export const revalidate = 3600;

export default function ClaroPage() {
  const organizationSchema = generateOrganizationSchema(provider);
  const productSchema = generateProductSchema(provider);
  const faqSchema = generateFAQSchema(provider);
  const howToSchema = generateHowToContactSchema(provider);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Inicio', url: 'https://comparadorinternet.co' },
    { name: provider.name, url: 'https://comparadorinternet.co/claro' }
  ]);

  // Schemas de servicios
  const serviceSchemas = provider.services.map(service =>
    generateServiceSchema(service, provider)
  );

  return (
    <>
      {/* JSON-LD Schemas */}
      <script type="application/ld+json" dangerouslySetInnerHTML={renderJsonLd(organizationSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={renderJsonLd(productSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={renderJsonLd(faqSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={renderJsonLd(howToSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={renderJsonLd(breadcrumbSchema)} />
      {serviceSchemas.map((schema, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={renderJsonLd(schema)}
        />
      ))}

      {/* Hero Claro */}
      <section
        className="pt-3 pb-12 md:py-12 text-white"
        style={{ background: `linear-gradient(135deg, ${provider.brand.primaryColor} 0%, #CC0000 100%)` }}
      >
        <div className="container mx-auto px-4">
          {/* Provider Logo */}
          <div className="flex justify-center mb-6">
            <div className="bg-white rounded-lg p-3 shadow-md">
              <Image
                src="/images/claro-logo.svg"
                alt="Logo Claro Colombia - Internet Fibra Óptica"
                width={120}
                height={48}
                className="w-20 md:w-[120px] h-auto"
              />
            </div>
          </div>

          <nav className="text-sm mb-6 text-red-100" aria-label="Breadcrumb">
            <ol className="flex gap-2">
              <li><a href="/" className="hover:underline">Inicio</a></li>
              <li>/</li>
              <li>{provider.name}</li>
            </ol>
          </nav>

          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-black mb-4">
              Planes de Internet Claro Colombia 2026
            </h1>
            <p className="text-2xl md:text-3xl mb-2 font-bold text-white">
              Desde <span className="text-yellow-300">$58.900/mes</span> con instalación incluida
            </p>
            <p className="text-xl mb-4 font-semibold text-red-100">
              {provider.hero.subtitle}
            </p>
            <p className="text-lg mb-8 text-red-100">
              {provider.coverage.description}
            </p>

            {/* Quick Call Form */}
            <div className="mb-6 text-center animate-fade-in">
              <p className="text-white font-bold text-lg mb-3">Te llamamos gratis:</p>
              <QuickCallForm buttonColor={provider.brand.primaryColor} />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <WhatsAppButton provider={provider} size="lg" />
              <a
                href="#contacto"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg text-lg hover:bg-white hover:text-claro-primary transition-all"
              >
                <ClipboardList size={24} />
                Déjanos tus Datos
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: 'Proveedores', url: 'https://comparadorinternet.co/planes' },
            { name: provider.name, url: `https://comparadorinternet.co/${provider.slug}` }
          ]}
        />

        <LastUpdated
          date="2026-01-12"
          nextReview="2026-02-12"
          message="Información actualizada de servicios, cobertura y promociones de Claro"
          className="max-w-4xl mx-auto"
        />
      </div>

      {/* Beneficios Principales */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-black text-center mb-12 text-gray-900">
            ¿Por qué elegir {provider.name}?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-12">
            {provider.mainBenefits.map((benefit, idx) => (
              <BenefitCard
                key={idx}
                benefit={benefit}
                accentColor={provider.brand.primaryColor}
              />
            ))}
          </div>

          {/* Razones adicionales */}
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-center mb-6 text-gray-900">
              Ventajas de contratar con {provider.name}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {provider.whyChoose.map((reason, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <Check className="text-green-500 w-5 h-5 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">{reason}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Precios y Planes - Sección SEO */}
      <section id="precios" className="py-16 bg-gradient-to-br from-red-50 to-orange-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-black text-center mb-4 text-gray-900">
            Precios Internet Claro Hogar 2026
          </h2>
          <p className="text-center text-gray-600 mb-10 max-w-3xl mx-auto">
            Planes de internet Claro Colombia con tarifas desde $58.900/mes. Precios especiales para estrato 1 y 2.
          </p>

          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 mb-10">
            {/* Plan 300 Megas */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 hover:border-red-500 transition-colors">
              <h3 className="text-xl font-bold text-gray-900 mb-2">300 Megas</h3>
              <p className="text-gray-500 text-sm mb-3">Internet Fibra/HFC</p>
              <div className="text-4xl font-black text-red-600 mb-1">$58.900</div>
              <div className="text-xs text-gray-400 mb-4">/mes</div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex gap-2"><Check size={16} className="text-green-500 flex-shrink-0" /> Instalación gratis</li>
                <li className="flex gap-2"><Check size={16} className="text-green-500 flex-shrink-0" /> Línea fija incluida</li>
              </ul>
            </div>

            {/* Plan 500 Megas - Destacado */}
            <div className="bg-white rounded-2xl shadow-lg border-2 border-red-600 p-6 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                MÁS POPULAR
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">500 Megas</h3>
              <p className="text-gray-500 text-sm mb-3">Velocidad familiar</p>
              <div className="text-4xl font-black text-red-600 mb-1">$68.900</div>
              <div className="text-xs text-gray-400 mb-4">/mes</div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex gap-2"><Check size={16} className="text-green-500 flex-shrink-0" /> Hasta 2 meses gratis</li>
                <li className="flex gap-2"><Check size={16} className="text-green-500 flex-shrink-0" /> Ultra WiFi incluido</li>
              </ul>
            </div>

            {/* Plan 900 Megas */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 hover:border-red-500 transition-colors">
              <h3 className="text-xl font-bold text-gray-900 mb-2">900 Megas</h3>
              <p className="text-gray-500 text-sm mb-3">Máxima potencia</p>
              <div className="text-4xl font-black text-red-600 mb-1">$99.900</div>
              <div className="text-xs text-gray-400 mb-4">/mes</div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex gap-2"><Check size={16} className="text-green-500 flex-shrink-0" /> Ideal gaming y 4K</li>
                <li className="flex gap-2"><Check size={16} className="text-green-500 flex-shrink-0" /> Claro Club incluido</li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <a
              href="/claro/planes"
              className="inline-flex items-center gap-2 bg-red-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-red-700 transition-colors shadow-lg"
            >
              Ver todos los planes y combos Tripleplay →
            </a>
            <p className="text-sm text-gray-500 mt-4">
              *Precios de referencia. Tarifas especiales para estrato 1 y 2 disponibles.
            </p>
          </div>
        </div>
      </section>

      {/* Servicios Claro */}
      <section id="servicios" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-black text-center mb-4 text-gray-900">
            Servicios de Internet {provider.name}
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Descubre nuestras tecnologías y servicios. Contacta para conocer planes y precios disponibles en tu zona.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {provider.services.map((service, idx) => (
              <ServiceCard key={idx} service={service} provider={provider} />
            ))}
          </div>
        </div>
      </section>

      {/* Banner CTAs Internos */}
      <section className="py-12 bg-gradient-to-r from-red-600 to-pink-600">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">Descubre Todas tus Opciones</h3>
            <p className="text-red-100">Compara, ahorra y contrata online</p>
          </div>
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
            <a
              href="/claro/planes"
              className="bg-white rounded-xl p-6 text-center hover:scale-105 transition-transform shadow-lg group"
            >
              <h4 className="text-lg font-bold text-gray-900 mb-2">Planes y Precios Claro</h4>
              <p className="text-gray-600 text-sm mb-3">
                Internet desde $58.900 + Tripleplay
              </p>
              <span className="text-red-600 font-semibold text-sm">Ver tarifas →</span>
            </a>

            <a
              href="/claro/servicio-al-cliente"
              className="bg-white rounded-xl p-6 text-center hover:scale-105 transition-transform shadow-lg group"
            >
              <h4 className="text-lg font-bold text-gray-900 mb-2">Pagar y Soporte</h4>
              <p className="text-gray-600 text-sm mb-3">
                Mi Claro, pagos y atención 24/7
              </p>
              <span className="text-orange-600 font-semibold text-sm">Ver opciones →</span>
            </a>

            <a
              href="/cobertura-claro-bogota"
              className="bg-white rounded-xl p-6 text-center hover:scale-105 transition-transform shadow-lg group"
            >
              <h4 className="text-lg font-bold text-gray-900 mb-2">Cobertura Bogotá</h4>
              <p className="text-gray-600 text-sm mb-3">
                Verifica fibra o HFC en tu zona
              </p>
              <span className="text-green-600 font-semibold text-sm">Verificar →</span>
            </a>
          </div>
        </div>
      </section>

      {/* Para quién es ideal */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-black text-center mb-12 text-gray-900">
              ¿Para quién es ideal {provider.name}?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {provider.targetAudience.map((audience, idx) => (
                <div key={idx} className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-md border border-gray-200">
                  <h3 className="text-xl font-bold mb-3 text-claro-primary">
                    {audience.type}
                  </h3>
                  <p className="text-gray-700">{audience.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Intermedio */}
      <section className="py-12 bg-gradient-to-r from-red-600 to-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-black mb-4">
            ¿Listo para tener el mejor internet?
          </h3>
          <p className="text-xl mb-6 text-red-100">
            Contacta ahora y un asesor te mostrará los planes disponibles en tu zona
          </p>
          <WhatsAppButton provider={provider} size="lg" />
        </div>
      </section>

      <ProviderBlogSection
        providerName={provider.name}
        providerSlug={provider.slug}
        accentColor={provider.brand.primaryColor}
      />

      {/* Content Cluster Navigation */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <ClusterNavigation />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection faqs={provider.faqs} accentColor={provider.brand.primaryColor} />

      {/* Formulario de Contacto */}
      <section id="contacto" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <ContactForm provider={provider} title={`Solicita tu Plan ${provider.name}`} />
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-12 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-400 mb-4">
            Los servicios y planes están sujetos a disponibilidad técnica y cobertura en tu zona.
            <br />
            Contacta para conocer ofertas y promociones vigentes.
          </p>
          <a
            href="/"
            className="text-blue-400 hover:text-blue-300 text-sm font-semibold"
          >
            ← Volver al comparador
          </a>
        </div>
      </section>
    </>
  );
}
