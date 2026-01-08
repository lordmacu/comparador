import Link from 'next/link';
import Image from 'next/image';
import { getAllProviders, getComparableBenefits } from '@/lib/data';
import { getAllPosts } from '@/lib/blog';
import {
  generateWebSiteSchema,
  generateServiceListSchema,
  generateBreadcrumbSchema,
  generateAggregateOfferSchema,
  renderJsonLd
} from '@/lib/schemas';
import BenefitCard from '@/components/BenefitCard';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Clock, Tag } from 'lucide-react';
import QuickCallForm from '@/components/QuickCallForm';
import { Zap, Globe, Phone, Gift } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Comparador de Internet en Colombia 2025 | Claro, Movistar, ETB',
  description: 'Descubre los mejores servicios de internet en Colombia. Compara beneficios de Claro, Movistar y ETB. Fibra óptica, cobertura nacional y atención personalizada.',
  keywords: [
    'internet Colombia',
    'comparador internet',
    'internet Claro',
    'internet Movistar',
    'internet ETB',
    'fibra óptica Colombia',
    'mejor internet Bogotá 2026',
    'comparar planes internet Bogotá',
    'internet gaming Bogotá',
    'internet teletrabajo Colombia',
    'planes internet hogar',
    'contratar internet Colombia',
    'ofertas internet 2026',
    'ETB vs Claro vs Movistar',
    'internet rápido Colombia'
  ],
  alternates: {
    canonical: 'https://comparadorinternet.co',
  },
  openGraph: {
    title: 'Comparador de Internet en Colombia 2025',
    description: 'Compara servicios de internet de Claro, Movistar y ETB',
    url: 'https://comparadorinternet.co',
    type: 'website',
  },
};

// ISR: Revalidar cada hora (3600 segundos)
export const revalidate = 3600;

export default function HomePage() {
  const providers = getAllProviders();
  const comparison = getComparableBenefits();

  // Schemas para SEO e IAs
  const websiteSchema = generateWebSiteSchema();
  const serviceListSchema = generateServiceListSchema(providers);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Inicio', url: 'https://comparadorinternet.co' }
  ]);
  const aggregateOfferSchema = generateAggregateOfferSchema(providers);

  return (
    <>
      {/* JSON-LD Schemas */}
      <script type="application/ld+json" dangerouslySetInnerHTML={renderJsonLd(websiteSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={renderJsonLd(serviceListSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={renderJsonLd(breadcrumbSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={renderJsonLd(aggregateOfferSchema)} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-black mb-6 text-balance">
              Encuentra el Mejor Internet en Colombia
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 text-balance">
              Compara servicios de <strong>Claro</strong>, <strong>Movistar</strong> y <strong>ETB</strong>
              <br />
              Fibra Óptica • Cobertura Nacional • Atención Personalizada
            </p>

            {/* Quick Call Form */}
            <div className="mb-6 text-center animate-fade-in">
              <p className="text-white font-bold text-lg mb-3">Te llamamos gratis:</p>
              <QuickCallForm buttonColor="#2563eb" />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/calculadora"
                className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
              >
                📊 Calcula tu Velocidad Ideal
              </a>
              <a
                href="#comparador"
                className="bg-white text-blue-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Comparar Servicios
              </a>
              <a
                href="#contacto"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-blue-700 transition-all"
              >
                Consultar Planes
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios principales */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-12">
            ¿Por qué elegir internet en Colombia?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-blue-100">
                  <Zap size={40} className="text-blue-600" strokeWidth={2} />
                </div>
              </div>
              <h3 className="font-bold text-lg mb-2">Fibra Óptica</h3>
              <p className="text-gray-600 text-sm">Tecnología de punta hasta 900 Mbps</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-green-100">
                  <Globe size={40} className="text-green-600" strokeWidth={2} />
                </div>
              </div>
              <h3 className="font-bold text-lg mb-2">Cobertura Nacional</h3>
              <p className="text-gray-600 text-sm">Disponible en todo el país</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-purple-100">
                  <Phone size={40} className="text-purple-600" strokeWidth={2} />
                </div>
              </div>
              <h3 className="font-bold text-lg mb-2">Atención 24/7</h3>
              <p className="text-gray-600 text-sm">Soporte siempre disponible</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-orange-100">
                  <Gift size={40} className="text-orange-600" strokeWidth={2} />
                </div>
              </div>
              <h3 className="font-bold text-lg mb-2">Promociones</h3>
              <p className="text-gray-600 text-sm">Ofertas exclusivas mensuales</p>
            </div>
          </div>
        </div>
      </section>

      {/* Calculadora de Velocidad - CTA */}
      <section className="py-16 bg-gradient-to-br from-yellow-50 to-orange-50 border-t-4 border-yellow-400">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-yellow-400 text-gray-900 px-4 py-2 rounded-full font-bold text-sm mb-4">
              🎯 HERRAMIENTA GRATUITA
            </div>
            <h2 className="text-3xl md:text-5xl font-black mb-6">
              ¿No sabes cuánta velocidad necesitas?
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Usa nuestra <strong>calculadora inteligente</strong> y descubre en 30 segundos<br />
              la velocidad perfecta según tu hogar y actividades
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/calculadora"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-5 rounded-xl font-bold text-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center gap-3"
              >
                <span className="text-3xl">📊</span>
                <div className="text-left">
                  <div>Calcular Ahora</div>
                  <div className="text-sm font-normal opacity-90">100% Gratis • Resultados Instantáneos</div>
                </div>
              </a>
            </div>
            <p className="text-sm text-gray-600 mt-6">
              ✅ Sin registro • ✅ Recomendaciones personalizadas • ✅ Planes de ETB, Claro y Movistar
            </p>
          </div>
        </div>
      </section>

      {/* Comparador de Servicios */}
      <section id="comparador" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-center mb-4">
              Comparador de Servicios
            </h2>
            <p className="text-center text-gray-600 mb-12">
              Conoce los beneficios de cada operador y contacta para conocer planes
            </p>

            {/* Tabla HTML semántica para SEO */}
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
                <caption className="sr-only">
                  Comparación de servicios de internet en Colombia 2025 - Claro, Movistar y ETB
                </caption>
                <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left font-bold">Proveedor</th>
                    <th scope="col" className="px-6 py-4 text-left font-bold">Tecnología</th>
                    <th scope="col" className="px-6 py-4 text-left font-bold">Cobertura</th>
                    <th scope="col" className="px-6 py-4 text-left font-bold">Beneficio Principal</th>
                    <th scope="col" className="px-6 py-4 text-center font-bold">Contacto</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {comparison.map(({ provider, mainBenefits }) => (
                    <tr key={provider.slug} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-lg" style={{ color: provider.brand.primaryColor }}>
                          {provider.name}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {provider.tagline}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-semibold text-gray-900">
                          {provider.coverage.technology}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {provider.coverage.national ? 'Nacional' : provider.coverage.cities.slice(0, 2).join(', ')}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {mainBenefits[0].title}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <a
                          href={`/${provider.slug}`}
                          className="inline-block px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-sm"
                        >
                          Ver Servicios
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios por Proveedor */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-12">
            Beneficios Destacados
          </h2>

          <div className="space-y-16">
            {providers.map((provider) => (
              <div key={provider.slug} className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                  <h3
                    className="text-3xl font-black mb-2"
                    style={{ color: provider.brand.primaryColor }}
                  >
                    {provider.name}
                  </h3>
                  <p className="text-gray-600">{provider.tagline}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {provider.mainBenefits.map((benefit, idx) => (
                    <BenefitCard
                      key={idx}
                      benefit={benefit}
                      accentColor={provider.brand.primaryColor}
                    />
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <WhatsAppButton provider={provider} size="md" />
                  <a
                    href={`/${provider.slug}`}
                    className="inline-flex items-center justify-center px-6 py-3 border-2 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all"
                    style={{ borderColor: provider.brand.primaryColor }}
                  >
                    Ver Todos los Servicios
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section id="contacto" className="py-16 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-black mb-6">
              ¿Listo para Contratar Internet?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Contacta directamente al operador de tu preferencia y conoce los planes disponibles en tu zona
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/claro"
                className="px-8 py-4 bg-white text-claro-primary font-bold rounded-lg hover:bg-gray-100 transition-all shadow-lg text-lg"
              >
                Consultar Claro
              </a>
              <a
                href="/movistar"
                className="px-8 py-4 bg-white text-movistar-primary font-bold rounded-lg hover:bg-gray-100 transition-all shadow-lg text-lg"
              >
                Consultar Movistar
              </a>
              <a
                href="/etb"
                className="px-8 py-4 bg-white text-etb-primary font-bold rounded-lg hover:bg-gray-100 transition-all shadow-lg text-lg"
              >
                Consultar ETB
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Guías y Consejos sobre Internet
            </h2>
            <p className="text-xl text-gray-600">
              Aprende a optimizar tu conexión y elegir el mejor proveedor
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {getAllPosts().slice(0, 3).map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <Link href={`/blog/${post.slug}`}>
                  {/* Featured Image */}
                  {post.image && (
                    <div className="relative w-full h-48 bg-gray-100">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Tag className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-600">
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
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Ver Todos los Artículos
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-black text-center mb-12">
              Preguntas Frecuentes
            </h2>

            <div className="space-y-4" itemScope itemType="https://schema.org/FAQPage">
              <details className="bg-white rounded-lg p-6 shadow-md" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                <summary className="font-bold text-lg cursor-pointer hover:text-blue-600" itemProp="name">
                  ¿Cuál es el mejor internet en Colombia?
                </summary>
                <div className="mt-4 text-gray-700" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <p itemProp="text">
                    Depende de tu ubicación y necesidades. Claro tiene la mayor cobertura nacional, Movistar ofrece descuentos online exclusivos,
                    y ETB es líder en Bogotá con promociones especiales. Te recomendamos contactar a cada operador para conocer disponibilidad en tu zona.
                  </p>
                </div>
              </details>

              <details className="bg-white rounded-lg p-6 shadow-md" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                <summary className="font-bold text-lg cursor-pointer hover:text-blue-600" itemProp="name">
                  ¿Cómo puedo consultar los planes disponibles?
                </summary>
                <div className="mt-4 text-gray-700" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <p itemProp="text">
                    Puedes contactar directamente por WhatsApp o llenar el formulario en la página de cada operador. Un asesor te contactará
                    para mostrarte los planes disponibles en tu zona con precios actualizados y promociones vigentes.
                  </p>
                </div>
              </details>

              <details className="bg-white rounded-lg p-6 shadow-md" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                <summary className="font-bold text-lg cursor-pointer hover:text-blue-600" itemProp="name">
                  ¿Qué velocidad de internet necesito?
                </summary>
                <div className="mt-4 text-gray-700" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <p itemProp="text">
                    Para 1-2 personas con uso básico: 200-300 Mbps. Para familias (3-5 personas): 500 Mbps.
                    Para gaming, streaming 4K múltiple o trabajo remoto intensivo: 900 Mbps o más. Los asesores te ayudarán a elegir el plan ideal.
                  </p>
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
