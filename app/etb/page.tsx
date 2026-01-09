import { getProvider } from '@/lib/data';
import {
  generateOrganizationSchema,
  generateServiceSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateHowToContactSchema,
  renderJsonLd
} from '@/lib/schemas';
import Image from 'next/image';
import BenefitCard from '@/components/BenefitCard';
import ServiceCard from '@/components/ServiceCard';
import ContactForm from '@/components/ContactForm';
import WhatsAppButton from '@/components/WhatsAppButton';
import QuickCallForm from '@/components/QuickCallForm';
import { Gift, Film, Play, Tv, Theater, Tent, Flame, ClipboardList, Check } from 'lucide-react';
import FAQSection from '@/components/FAQSection';
import ProviderBlogSection from '@/components/ProviderBlogSection';
import ClusterNavigation from '@/components/ClusterNavigation';
import type { Metadata } from 'next';

const provider = getProvider('etb');

export const metadata: Metadata = {
  title: `Internet ${provider.name} Bogotá 2025 | ${provider.tagline}`,
  description: `${provider.hero.subtitle}. Internet ETB con fibra óptica simétrica. Consulta promociones especiales para Bogotá y municipios cercanos.`,
  keywords: [
    'internet ETB Bogotá',
    'ETB fibra simétrica',
    'ETB vs Claro vs Movistar',
    'planes ETB 2026',
    'ETB internet gaming',
    'WiFi 360 ETB',
    'ETB Chía Cajicá',
    'cobertura ETB Bogotá',
    'ETB soporte técnico',
    'opiniones ETB 2026',
    'por qué ETB solo Bogotá'
  ],
  alternates: {
    canonical: 'https://comparadorinternet.co/etb',
  },
  openGraph: {
    title: `Internet ${provider.name} Bogotá 2025`,
    description: provider.hero.subtitle,
    url: 'https://comparadorinternet.co/etb',
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
    title: `Internet ${provider.name} Bogotá 2025`,
    description: provider.hero.subtitle,
    images: ['/og-image.jpg'],
  },
};

// ISR: Revalidar cada hora (3600 segundos)
export const revalidate = 3600;

export default function ETBPage() {
  const organizationSchema = generateOrganizationSchema(provider);
  const faqSchema = generateFAQSchema(provider);
  const howToSchema = generateHowToContactSchema(provider);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Inicio', url: 'https://comparadorinternet.co' },
    { name: provider.name, url: 'https://comparadorinternet.co/etb' }
  ]);

  const serviceSchemas = provider.services.map(service =>
    generateServiceSchema(service, provider)
  );

  return (
    <>
      {/* JSON-LD Schemas */}
      <script type="application/ld+json" dangerouslySetInnerHTML={renderJsonLd(organizationSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={renderJsonLd(faqSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={renderJsonLd(howToSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={renderJsonLd(breadcrumbSchema)} />
      {serviceSchemas.map((schema, idx) => (
        <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={renderJsonLd(schema)} />
      ))}

      {/* Hero ETB */}
      <section
        className="pt-3 pb-12 md:py-12 text-white"
        style={{ background: `linear-gradient(135deg, ${provider.brand.primaryColor} 0%, #002880 100%)` }}
      >
        <div className="container mx-auto px-4">
          {/* Provider Logo */}
          <div className="flex justify-center mb-6">
            <Image
              src="/images/etb-logo.svg"
              alt="ETB Logo"
              width={120}
              height={48}
              className="w-20 md:w-[120px] h-auto"
            />
          </div>

          <nav className="text-sm mb-6 text-blue-100" aria-label="Breadcrumb">
            <ol className="flex gap-2">
              <li><a href="/" className="hover:underline">Inicio</a></li>
              <li>/</li>
              <li>{provider.name}</li>
            </ol>
          </nav>

          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-black mb-6">
              {provider.hero.title}
            </h1>
            <p className="text-2xl md:text-3xl mb-4 font-bold text-blue-100">
              {provider.hero.subtitle}
            </p>
            <p className="text-lg mb-8 text-blue-100">
              Operador local de Bogotá con más de 140 años de experiencia
            </p>

            {/* Quick Call Form */}
            <div className="mb-6 text-center animate-fade-in">
              <p className="text-white font-bold text-lg mb-3">Te llamamos gratis:</p>
              <QuickCallForm buttonColor={provider.brand.primaryColor} />
            </div>

            <div className="bg-orange-500/20 backdrop-blur-sm rounded-xl p-4 mb-6 inline-block border-2 border-orange-400">
              <p className="text-2xl font-black text-white flex items-center justify-center gap-2">
                <Gift size={32} className="inline-block" />
                Promociones Exclusivas Bogotá
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <WhatsAppButton provider={provider} size="lg" />
              <a
                href="#contacto"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg text-lg hover:bg-white hover:text-etb-primary transition-all"
              >
                <ClipboardList size={24} className="inline-block" />
                Consultar Promociones
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios Principales */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-black text-center mb-12 text-gray-900">
            Beneficios {provider.name}
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
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-center mb-6 text-gray-900">
              ¿Por qué los bogotanos confían en ETB?
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

      {/* Cobertura ETB */}
      <section className="py-12 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-black mb-4">
              Cobertura en Bogotá y Sabana
            </h3>
            <p className="text-lg mb-6 text-blue-100">
              Servicio disponible en:
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {provider.coverage.cities.map((city, idx) => (
                <span
                  key={idx}
                  className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold"
                >
                  {city}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Servicios ETB */}
      <section id="servicios" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-black text-center mb-4 text-gray-900">
            Servicios ETB para tu Hogar
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Fibra óptica simétrica + servicios adicionales. Consulta planes y promociones vigentes para tu zona.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {provider.services.map((service, idx) => (
              <ServiceCard key={idx} service={service} provider={provider} />
            ))}
          </div>
        </div>
      </section>

      {/* Apps de Streaming */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-black text-center mb-12 text-gray-900">
              Apps de Streaming con Descuento
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
              {[
                { name: 'MAX', icon: Film },
                { name: 'Win Play', icon: Play },
                { name: 'DGO', icon: Tv },
                { name: 'Paramount+', icon: Theater },
                { name: 'Universal+', icon: Tent },
                { name: 'Hot Go', icon: Flame }
              ].map((app, idx) => {
                const Icon = app.icon;
                return (
                  <div key={idx} className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 text-center shadow-md">
                    <div className="flex justify-center mb-3">
                      <Icon size={40} className="text-orange-600" strokeWidth={2} />
                    </div>
                    <div className="font-bold text-lg text-gray-900">{app.name}</div>
                  </div>
                );
              })}
            </div>

            <div className="text-center bg-orange-100 rounded-xl p-6">
              <p className="text-orange-900 font-semibold flex items-center justify-center gap-2">
                <Gift size={24} className="inline-block" />
                Consulta descuentos y promociones especiales para clientes ETB
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Para quién es ideal */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-black text-center mb-12 text-gray-900">
              ETB es ideal para
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {provider.targetAudience.map((audience, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 shadow-md border border-blue-100">
                  <h3 className="text-xl font-bold mb-3 text-etb-primary">
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
      <section className="py-12 bg-gradient-to-r from-orange-500 to-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-black mb-4">
            ¿Vives en Bogotá o Sabana?
          </h3>
          <p className="text-xl mb-6 text-orange-100">
            Consulta las promociones especiales que tenemos para tu zona
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
      <section id="contacto" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <ContactForm provider={provider} title="Solicita tu Promoción ETB" />
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-12 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-400 mb-4">
            Promociones válidas según vigencia comercial y disponibilidad técnica.
            <br />
            Aplican condiciones según estrato y zona de cobertura.
          </p>
          <a
            href="/"
            className="text-blue-400 hover:text-blue-300 text-sm font-semibold"
          >
            ← Ver otros proveedores
          </a>
        </div>
      </section>
    </>
  );
}
