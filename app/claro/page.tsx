import { getProvider } from '@/lib/data';
import {
  generateOrganizationSchema,
  generateServiceSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateHowToContactSchema,
  renderJsonLd
} from '@/lib/schemas';
import BenefitCard from '@/components/BenefitCard';
import ServiceCard from '@/components/ServiceCard';
import ContactForm from '@/components/ContactForm';
import WhatsAppButton from '@/components/WhatsAppButton';
import QuickCallForm from '@/components/QuickCallForm';
import FAQSection from '@/components/FAQSection';
import { ClipboardList } from 'lucide-react';
import type { Metadata } from 'next';

const provider = getProvider('claro');

export const metadata: Metadata = {
  title: `Internet ${provider.name} Colombia 2025 | ${provider.tagline}`,
  description: `${provider.hero.subtitle}. Conoce los servicios de internet Claro: ${provider.coverage.technology}. Contacta para consultar planes disponibles en tu zona.`,
  keywords: [
    'internet Claro Colombia',
    'fibra óptica Claro',
    'servicios Claro 2025',
    'internet hogar Claro',
    '5G Claro',
    'Claro TV+',
    'cobertura Claro'
  ],
  alternates: {
    canonical: 'https://comparadorinternet.co/claro',
  },
  openGraph: {
    title: `Internet ${provider.name} Colombia 2025`,
    description: provider.hero.subtitle,
    url: 'https://comparadorinternet.co/claro',
  },
};

// ISR: Revalidar cada hora (3600 segundos)
export const revalidate = 3600;

export default function ClaroPage() {
  const organizationSchema = generateOrganizationSchema(provider);
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
        className="py-12 text-white"
        style={{ background: `linear-gradient(135deg, ${provider.brand.primaryColor} 0%, #CC0000 100%)` }}
      >
        <div className="container mx-auto px-4">
          <nav className="text-sm mb-6 text-red-100" aria-label="Breadcrumb">
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
            <p className="text-2xl md:text-3xl mb-4 font-bold text-red-100">
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
                  <span className="text-green-500 text-xl flex-shrink-0 mt-1">✓</span>
                  <span className="text-gray-700">{reason}</span>
                </div>
              ))}
            </div>
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
