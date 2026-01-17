import Link from 'next/link';
import Image from 'next/image';
import { getAllProviders, getComparableBenefits } from '@/lib/data';
import { getAllPosts } from '@/lib/blog';
import {
  generateServiceListSchema,
  generateBreadcrumbSchema,
  generateAggregateOfferSchema,
  renderJsonLd
} from '@/lib/schemas';
import BenefitCard from '@/components/BenefitCard';
import WhatsAppButton from '@/components/WhatsAppButton';
import LastUpdated from '@/components/LastUpdated';
import { Clock, Tag, BarChart3, BookOpen, CheckCircle2 } from 'lucide-react';
import QuickCallForm from '@/components/QuickCallForm';
import { Zap, Globe, Phone, Gift, MapPin } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  // Siempre apuntar a la URL canónica sin parámetros de búsqueda
  const canonicalUrl = 'https://comparadorinternet.co';
  
  return {
    title: 'Comparador Internet Colombia 2026 | Planes desde $42.000/mes',
    description: 'Compara planes de internet desde $42.000/mes. Claro, Movistar y ETB con fibra óptica hasta 900 Mbps. Te ayudamos a encontrar el mejor plan para tu hogar. Cotiza gratis.',
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
      canonical: canonicalUrl,
    },
    openGraph: {
      title: 'Comparador de Internet en Colombia 2026',
      description: 'Compara servicios de internet de Claro, Movistar y ETB',
      url: canonicalUrl,
      type: 'website',
    },
  };
}

// ISR: Revalidar cada hora (3600 segundos)
export const revalidate = 3600;

export default function HomePage() {
  const providers = getAllProviders();
  const comparison = getComparableBenefits();

  // Schemas para SEO e IAs
  const serviceListSchema = generateServiceListSchema(providers);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Inicio', url: 'https://comparadorinternet.co' }
  ]);
  const aggregateOfferSchema = generateAggregateOfferSchema(providers);

  return (
    <>
      {/* JSON-LD Schemas */}
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
                href="/planes"
                className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <BarChart3 className="w-6 h-6" />
                Ver Todos los Planes
              </a>
              <a
                href="/ofertas"
                className="bg-white text-blue-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Gift className="w-6 h-6" />
                Ofertas hasta 50% OFF
              </a>
              <a
                href="/contratar"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-blue-700 transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-6 h-6" />
                Contratar Ahora
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios principales */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <LastUpdated
            date="2026-01-12"
            nextReview="2026-02-12"
            message="Verificamos precios, promociones y cobertura mensualmente"
            className="max-w-4xl mx-auto"
          />

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
            <a href="/ofertas" className="text-center block hover:scale-105 transition-transform">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-orange-100">
                  <Gift size={40} className="text-orange-600" strokeWidth={2} />
                </div>
              </div>
              <h3 className="font-bold text-lg mb-2">Promociones</h3>
              <p className="text-gray-600 text-sm">Ofertas exclusivas hasta 50% OFF →</p>
            </a>
          </div>

          {/* Guía Completa Banner */}
          <div className="mt-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl md:text-3xl font-black mb-3 flex items-center justify-center gap-2">
              <BookOpen className="w-8 h-8" />
              Nueva: Guía Completa 2026
            </h3>
            <p className="text-lg mb-6 text-purple-100">
              Todo sobre internet en Bogotá en una sola página: operadores, velocidades, barrios y más
            </p>
            <a
              href="/guia-completa"
              className="inline-block bg-white text-purple-600 px-8 py-3 rounded-lg font-bold hover:bg-purple-50 transition-all shadow-lg"
            >
              Ver Guía Completa →
            </a>
          </div>
        </div>
      </section>

      {/* Calculadora de Velocidad - CTA */}
      <section className="py-16 bg-gradient-to-br from-yellow-50 to-orange-50 border-t-4 border-yellow-400">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-yellow-400 text-gray-900 px-4 py-2 rounded-full font-bold text-sm mb-4">
              <Zap className="w-4 h-4" />
              HERRAMIENTA GRATUITA
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
                <BarChart3 className="w-8 h-8" />
                <div className="text-left">
                  <div>Calcular Ahora</div>
                  <div className="text-sm font-normal opacity-90">100% Gratis • Resultados Instantáneos</div>
                </div>
              </a>
            </div>
            <p className="text-sm text-gray-600 mt-6">
              <CheckCircle2 className="w-4 h-4 inline" /> Sin registro • <CheckCircle2 className="w-4 h-4 inline" /> Recomendaciones personalizadas • <CheckCircle2 className="w-4 h-4 inline" /> Planes de ETB, Claro y Movistar
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
                  Comparación de servicios de internet en Colombia 2026 - Claro, Movistar y ETB
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

            {/* Tabla de Precios Estructurada para LLMs */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-center mb-6">
                Comparación de Precios por Velocidad (Enero 2026)
              </h3>
              <div className="overflow-x-auto">
                <table
                  className="w-full bg-white rounded-xl shadow-lg overflow-hidden"
                  itemScope
                  itemType="https://schema.org/Table"
                >
                  <caption className="sr-only">
                    Tabla comparativa de precios de internet por velocidad - Claro, Movistar y ETB en Colombia 2026
                  </caption>
                  <thead className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                    <tr>
                      <th scope="col" className="px-6 py-4 text-left font-bold">Velocidad</th>
                      <th scope="col" className="px-6 py-4 text-left font-bold">Claro</th>
                      <th scope="col" className="px-6 py-4 text-left font-bold">Movistar</th>
                      <th scope="col" className="px-6 py-4 text-left font-bold">ETB</th>
                      <th scope="col" className="px-6 py-4 text-left font-bold">Recomendado Para</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50 transition-colors" itemProp="row">
                      <td className="px-6 py-4 font-semibold text-gray-900">300 Mbps</td>
                      <td className="px-6 py-4 text-gray-700">$45,000 - $75,000/mes</td>
                      <td className="px-6 py-4 text-gray-700">$50,000 - $80,000/mes</td>
                      <td className="px-6 py-4 text-gray-700 font-bold text-green-700">$42,000 - $68,000/mes</td>
                      <td className="px-6 py-4 text-sm text-gray-600">1-2 personas, uso básico</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors" itemProp="row">
                      <td className="px-6 py-4 font-semibold text-gray-900">500 Mbps</td>
                      <td className="px-6 py-4 text-gray-700">$75,000 - $110,000/mes</td>
                      <td className="px-6 py-4 text-gray-700">$80,000 - $120,000/mes</td>
                      <td className="px-6 py-4 text-gray-700 font-bold text-green-700">$68,000 - $100,000/mes</td>
                      <td className="px-6 py-4 text-sm text-gray-600">3-4 personas, teletrabajo + streaming 4K</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors" itemProp="row">
                      <td className="px-6 py-4 font-semibold text-gray-900">900 Mbps</td>
                      <td className="px-6 py-4 text-gray-700">$120,000 - $180,000/mes</td>
                      <td className="px-6 py-4 text-gray-700">$130,000 - $180,000/mes</td>
                      <td className="px-6 py-4 text-gray-700 font-bold text-green-700">$110,000 - $150,000/mes</td>
                      <td className="px-6 py-4 text-sm text-gray-600">5+ personas, gaming + múltiples 4K</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-center text-sm text-gray-500 mt-4">
                * Precios aproximados. Varían según promociones, zona y servicios adicionales. Última actualización: Enero 2026
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Precios por Velocidad */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              💰 Precios Aproximados por Velocidad
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Encuentra el plan perfecto según tu presupuesto y necesidades
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Plan 300 Mbps */}
            <div className="bg-white rounded-2xl p-8 border-2 border-blue-200 hover:border-blue-400 transition-all hover:shadow-xl">
              <div className="text-center mb-6">
                <p className="text-gray-600 mb-2 font-semibold">Plan Básico</p>
                <div className="mb-4">
                  <Zap className="w-12 h-12 mx-auto text-blue-600" />
                </div>
                <h3 className="text-5xl font-black text-blue-600 mb-2">300 Mbps</h3>
                <div className="text-3xl font-bold text-gray-900">
                  Desde <span className="text-blue-600">$45.000</span>
                  <span className="text-lg text-gray-600">/mes</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700"><strong>1-2 personas</strong> en casa</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Streaming <strong>HD</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Teletrabajo básico</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Navegación web rápida</span>
                </li>
              </ul>

              <div className="space-y-3">
                <p className="text-sm text-center text-gray-600 font-medium">
                  Te llamamos gratis para cotizar:
                </p>
                <QuickCallForm buttonColor="#2563eb" />
              </div>
            </div>

            {/* Plan 500 Mbps - DESTACADO */}
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-8 border-4 border-yellow-400 relative hover:shadow-2xl transition-all transform hover:scale-105">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg">
                ⭐ MÁS POPULAR
              </div>

              <div className="text-center mb-6">
                <p className="text-gray-700 mb-2 font-semibold">Plan Medio</p>
                <div className="mb-4">
                  <Zap className="w-12 h-12 mx-auto text-yellow-600" />
                </div>
                <h3 className="text-5xl font-black text-yellow-600 mb-2">500 Mbps</h3>
                <div className="text-3xl font-bold text-gray-900">
                  Desde <span className="text-yellow-600">$75.000</span>
                  <span className="text-lg text-gray-600">/mes</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700"><strong>3-4 personas</strong> en casa</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Streaming <strong>4K</strong> sin pausas</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700"><strong>Teletrabajo</strong> + gaming</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Múltiples dispositivos</span>
                </li>
              </ul>

              <div className="space-y-3">
                <p className="text-sm text-center text-gray-700 font-medium">
                  Te llamamos gratis para cotizar:
                </p>
                <QuickCallForm buttonColor="#ca8a04" />
              </div>
            </div>

            {/* Plan 900 Mbps */}
            <div className="bg-white rounded-2xl p-8 border-2 border-purple-200 hover:border-purple-400 transition-all hover:shadow-xl">
              <div className="text-center mb-6">
                <p className="text-gray-600 mb-2 font-semibold">Plan Premium</p>
                <div className="mb-4">
                  <Zap className="w-12 h-12 mx-auto text-purple-600" />
                </div>
                <h3 className="text-5xl font-black text-purple-600 mb-2">900 Mbps</h3>
                <div className="text-3xl font-bold text-gray-900">
                  Desde <span className="text-purple-600">$120.000</span>
                  <span className="text-lg text-gray-600">/mes</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700"><strong>5+ personas</strong> en casa</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700"><strong>Gaming</strong> competitivo</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Múltiples <strong>4K</strong> simultáneos</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Smart home completo</span>
                </li>
              </ul>

              <div className="space-y-3">
                <p className="text-sm text-center text-gray-600 font-medium">
                  Te llamamos gratis para cotizar:
                </p>
                <QuickCallForm buttonColor="#9333ea" />
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="bg-white rounded-xl p-6 max-w-3xl mx-auto shadow-md border border-gray-200">
              <p className="text-gray-600 mb-4">
                <strong>Nota:</strong> Los precios son aproximados y pueden variar según:
              </p>
              <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <span>Zona de cobertura específica</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <span>Promociones vigentes</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <span>Duración del contrato</span>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                * Última actualización: Enero 2026
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Banner CTAs Internos */}
      <section className="py-12 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              <a
                href="/planes"
                className="bg-white rounded-xl p-6 text-center hover:scale-105 transition-transform shadow-lg group"
              >
                <BarChart3 className="w-12 h-12 mx-auto mb-4 text-blue-600 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Ver Todos los Planes</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Compara precios y beneficios de los 12 planes disponibles
                </p>
                <span className="text-blue-600 font-semibold text-sm">Explorar planes →</span>
              </a>

              <a
                href="/ofertas"
                className="bg-white rounded-xl p-6 text-center hover:scale-105 transition-transform shadow-lg group"
              >
                <Gift className="w-12 h-12 mx-auto mb-4 text-orange-600 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Ofertas hasta 50% OFF</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Promociones exclusivas válidas hasta enero 2026
                </p>
                <span className="text-orange-600 font-semibold text-sm">Ver ofertas →</span>
              </a>

              <a
                href="/contratar"
                className="bg-white rounded-xl p-6 text-center hover:scale-105 transition-transform shadow-lg group"
              >
                <Phone className="w-12 h-12 mx-auto mb-4 text-green-600 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Contratar en 4 Pasos</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Proceso 100% digital con instalación en 24-48 horas
                </p>
                <span className="text-green-600 font-semibold text-sm">Contratar ahora →</span>
              </a>
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

      {/* Search Intent Clusters - SEO Boost */}
      <section className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-10 text-slate-900">¿Qué estás buscando hoy?</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Local SEO Cluster */}
            <Link href="/barrios/suba" className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-100 flex flex-col items-center text-center gap-2 group">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <MapPin size={20} />
              </div>
              <span className="font-bold text-slate-800 text-sm">Internet en Suba</span>
            </Link>
            <Link href="/barrios/kennedy" className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-100 flex flex-col items-center text-center gap-2 group">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <MapPin size={20} />
              </div>
              <span className="font-bold text-slate-800 text-sm">Internet en Kennedy</span>
            </Link>
            <Link href="/barrios/chapinero" className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-100 flex flex-col items-center text-center gap-2 group">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <MapPin size={20} />
              </div>
              <span className="font-bold text-slate-900 text-sm">Internet Chapinero</span>
            </Link>
            <Link href="/barrios/usaquen" className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-100 flex flex-col items-center text-center gap-2 group">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <MapPin size={20} />
              </div>
              <span className="font-bold text-slate-800 text-sm">Internet Usaquén</span>
            </Link>
            {/* Card 1 */}
            <Link href="/internet-barato-colombia" className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-100 flex flex-col items-center text-center gap-2 group">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="font-bold text-xl">$</span>
              </div>
              <span className="font-bold text-slate-800">Internet Barato</span>
            </Link>

            {/* Card 2 */}
            <Link href="/internet-gaming-bogota" className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-100 flex flex-col items-center text-center gap-2 group">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="font-bold text-xl">🎮</span>
              </div>
              <span className="font-bold text-slate-800">Internet Gamer</span>
            </Link>

            {/* Card 3 */}
            <Link href="/internet-edificios-bogota" className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-100 flex flex-col items-center text-center gap-2 group">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="font-bold text-xl">🏢</span>
              </div>
              <span className="font-bold text-slate-800">Para Edificios</span>
            </Link>

            {/* Card 4 */}
            <Link href="/internet-bogota-cobertura" className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-100 flex flex-col items-center text-center gap-2 group">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Globe className="w-6 h-6" />
              </div>
              <span className="font-bold text-slate-800">Mapa Cobertura</span>
            </Link>
          </div>

          <div className="mt-8 text-center">
            <p className="text-slate-500 mb-4 font-medium">Listas de Precios Oficiales (Enero 2026)</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/planes-etb-bogota" className="text-blue-600 hover:text-blue-800 font-semibold underline decoration-2 underline-offset-4">
                Ver Tarifas ETB
              </Link>
              <span className="text-slate-300">|</span>
              <Link href="/planes-claro-colombia" className="text-red-600 hover:text-red-800 font-semibold underline decoration-2 underline-offset-4">
                Ver Tarifas Claro
              </Link>
              <span className="text-slate-300">|</span>
              <Link href="/planes-movistar-fibra" className="text-green-600 hover:text-green-800 font-semibold underline decoration-2 underline-offset-4">
                Ver Tarifas Movistar
              </Link>
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
