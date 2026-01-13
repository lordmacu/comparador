import Link from 'next/link';
import type { Metadata } from 'next';
import { BookOpen, MapPin, Zap, Home, Wrench, Users, TrendingUp, Calculator, CheckCircle, ArrowRight, Building2, Building, Landmark, Construction, Gamepad2, Briefcase, Tv, RefreshCw, TrendingDown, AlertTriangle, List, Rocket, Target, Lock, DollarSign, FileText, Lightbulb, Pin, Phone, Award, CheckCircle2 } from 'lucide-react';
import QuickCallForm from '@/components/QuickCallForm';
import { generateCompleteGuideHowToSchema, renderJsonLd } from '@/lib/schemas';
import Breadcrumbs from '@/components/Breadcrumbs';
import LastUpdated from '@/components/LastUpdated';

export const metadata: Metadata = {
  title: 'Guía Completa de Internet en Bogotá 2026 | Todo lo que Necesitas Saber',
  description: 'La guía definitiva para contratar internet en Bogotá 2026. Operadores, velocidades, barrios, precios, consejos y más. 100% actualizado y gratis.',
  keywords: [
    'guía internet bogotá',
    'contratar internet bogotá 2026',
    'mejor internet bogotá',
    'comparar operadores internet',
    'ETB Claro Movistar',
    'fibra óptica bogotá',
    'internet por barrios',
    'velocidad internet recomendada',
    'planes internet bogotá',
    'guía completa internet colombia'
  ],
  alternates: {
    canonical: 'https://comparadorinternet.co/guia-completa',
  },
  openGraph: {
    title: 'Guía Completa de Internet en Bogotá 2026',
    description: 'Todo lo que necesitas saber para elegir el mejor internet en Bogotá',
    url: 'https://comparadorinternet.co/guia-completa',
    type: 'article',
    images: [
      {
        url: '/images/guia-completa-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Guía Completa Internet Bogotá 2026',
      },
    ],
  },
};

export const revalidate = 3600; // 1 hora

export default function GuiaCompletaPage() {
  const barrios = [
    { slug: 'suba', nombre: 'Suba', poblacion: '1.3M' },
    { slug: 'kennedy', nombre: 'Kennedy', poblacion: '1.2M' },
    { slug: 'usaquen', nombre: 'Usaquén', poblacion: '500K' },
    { slug: 'chapinero', nombre: 'Chapinero', poblacion: '140K' },
    { slug: 'engativa', nombre: 'Engativá', poblacion: '900K' },
    { slug: 'teusaquillo', nombre: 'Teusaquillo', poblacion: '150K' },
    { slug: 'fontibon', nombre: 'Fontibón', poblacion: '400K' },
    { slug: 'puente-aranda', nombre: 'Puente Aranda', poblacion: '260K' },
    { slug: 'bosa', nombre: 'Bosa', poblacion: '750K' },
    { slug: 'ciudad-bolivar', nombre: 'Ciudad Bolívar', poblacion: '700K' },
    { slug: 'san-cristobal', nombre: 'San Cristóbal', poblacion: '400K' },
    { slug: 'barrios-unidos', nombre: 'Barrios Unidos', poblacion: '240K' },
    { slug: 'tunjuelito', nombre: 'Tunjuelito', poblacion: '200K' },
    { slug: 'rafael-uribe-uribe', nombre: 'Rafael Uribe Uribe', poblacion: '350K' },
  ];

  const velocidades = [
    { slug: '100-megas', nombre: '100 Mbps', uso: '2-3 personas', precio: '$50-80K' },
    { slug: '200-megas', nombre: '200 Mbps', uso: '3-4 personas', precio: '$70-110K' },
    { slug: '300-megas', nombre: '300 Mbps', uso: '4-5 personas', precio: '$90-140K' },
    { slug: '500-megas', nombre: '500 Mbps', uso: '5+ personas', precio: '$120-180K' },
    { slug: 'fibra-optica', nombre: 'Fibra Óptica', uso: 'Ilimitado', precio: '$80-200K' },
  ];

  const viviendas = [
    { slug: 'apartamento', nombre: 'Apartamento', IconComponent: Building2 },
    { slug: 'casa', nombre: 'Casa', IconComponent: Home },
    { slug: 'oficina', nombre: 'Oficina', IconComponent: Landmark },
    { slug: 'edificio', nombre: 'Edificio', IconComponent: Construction },
  ];

  const casos = [
    { slug: 'gaming', nombre: 'Gaming', desc: 'Baja latencia y alta velocidad', IconComponent: Gamepad2 },
    { slug: 'teletrabajo', nombre: 'Teletrabajo', desc: 'Videoconferencias estables', IconComponent: Briefcase },
    { slug: 'streaming', nombre: 'Streaming', desc: '4K sin buffering', IconComponent: Tv },
  ];

  const soluciones = [
    { slug: 'cambiar-de-operador', nombre: 'Cambiar de Operador', IconComponent: RefreshCw },
    { slug: 'mejorar-velocidad', nombre: 'Mejorar Velocidad', IconComponent: Zap },
    { slug: 'internet-lento', nombre: 'Internet Lento', IconComponent: TrendingDown },
    { slug: 'cortes-de-internet', nombre: 'Cortes de Internet', IconComponent: AlertTriangle },
  ];

  const howToSchema = generateCompleteGuideHowToSchema();

  return (
    <>
      {/* HowTo Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={renderJsonLd(howToSchema)}
      />

      {/* Breadcrumbs y LastUpdated */}
      <div className="container mx-auto px-4 py-6">
        <Breadcrumbs
          items={[
            { name: 'Recursos', url: 'https://comparadorinternet.co/recursos' },
            { name: 'Guía Completa', url: 'https://comparadorinternet.co/guia-completa' }
          ]}
        />

        <LastUpdated
          date="2026-01-12"
          nextReview="2026-02-12"
          message="Guía actualizada con información de todos los barrios y operadores de Bogotá"
          className="max-w-4xl mx-auto"
        />
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-yellow-400 text-gray-900 px-4 py-2 rounded-full font-bold mb-6">
              <BookOpen size={20} />
              <span>GUÍA COMPLETA 2026</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Todo sobre Internet en Bogotá en una Sola Página
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              La guía definitiva para elegir el mejor internet. <strong>14 barrios</strong> • <strong>3 operadores</strong> • <strong>5 velocidades</strong> • <strong>100% actualizado</strong>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#calculadora-rapida"
                className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Calculator className="w-6 h-6" />
                Calcular mi Velocidad
              </a>
              <a
                href="#tabla-contenidos"
                className="bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2"
              >
                <BookOpen className="w-6 h-6" />
                Ver Índice Completo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Tabla de Contenidos */}
      <section id="tabla-contenidos" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-center mb-4 flex items-center justify-center gap-3">
              <FileText className="w-10 h-10 text-blue-600" />
              Índice de Contenidos
            </h2>
            <p className="text-center text-gray-600 mb-12">
              Salta directamente a lo que necesitas
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <a href="#calculadora-rapida" className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl p-6 hover:shadow-lg transition-all transform hover:scale-105">
                <div className="flex items-center gap-4">
                  <Calculator size={40} className="text-gray-900" />
                  <div>
                    <h3 className="font-bold text-xl text-gray-900">1. Calculadora de Velocidad</h3>
                    <p className="text-gray-800">Descubre cuántos Mbps necesitas</p>
                  </div>
                </div>
              </a>

              <a href="#operadores" className="bg-white rounded-xl p-6 hover:shadow-lg transition-all border-2 border-gray-200 hover:border-blue-500">
                <div className="flex items-center gap-4">
                  <Users size={40} className="text-blue-600" />
                  <div>
                    <h3 className="font-bold text-xl">2. Operadores</h3>
                    <p className="text-gray-600">ETB, Claro y Movistar comparados</p>
                  </div>
                </div>
              </a>

              <a href="#velocidades" className="bg-white rounded-xl p-6 hover:shadow-lg transition-all border-2 border-gray-200 hover:border-blue-500">
                <div className="flex items-center gap-4">
                  <Zap size={40} className="text-green-600" />
                  <div>
                    <h3 className="font-bold text-xl">3. Velocidades</h3>
                    <p className="text-gray-600">De 100 Mbps a Fibra Óptica</p>
                  </div>
                </div>
              </a>

              <a href="#barrios" className="bg-white rounded-xl p-6 hover:shadow-lg transition-all border-2 border-gray-200 hover:border-blue-500">
                <div className="flex items-center gap-4">
                  <MapPin size={40} className="text-red-600" />
                  <div>
                    <h3 className="font-bold text-xl">4. Por Barrio</h3>
                    <p className="text-gray-600">Cobertura en 14 localidades</p>
                  </div>
                </div>
              </a>

              <a href="#viviendas" className="bg-white rounded-xl p-6 hover:shadow-lg transition-all border-2 border-gray-200 hover:border-blue-500">
                <div className="flex items-center gap-4">
                  <Home size={40} className="text-purple-600" />
                  <div>
                    <h3 className="font-bold text-xl">5. Tipo de Vivienda</h3>
                    <p className="text-gray-600">Apartamento, casa, oficina</p>
                  </div>
                </div>
              </a>

              <a href="#casos-uso" className="bg-white rounded-xl p-6 hover:shadow-lg transition-all border-2 border-gray-200 hover:border-blue-500">
                <div className="flex items-center gap-4">
                  <TrendingUp size={40} className="text-orange-600" />
                  <div>
                    <h3 className="font-bold text-xl">6. Casos de Uso</h3>
                    <p className="text-gray-600">Gaming, teletrabajo, streaming</p>
                  </div>
                </div>
              </a>

              <a href="#soluciones" className="bg-white rounded-xl p-6 hover:shadow-lg transition-all border-2 border-gray-200 hover:border-blue-500">
                <div className="flex items-center gap-4">
                  <Wrench size={40} className="text-indigo-600" />
                  <div>
                    <h3 className="font-bold text-xl">7. Soluciones</h3>
                    <p className="text-gray-600">Resuelve problemas comunes</p>
                  </div>
                </div>
              </a>

              <a href="#consejos" className="bg-white rounded-xl p-6 hover:shadow-lg transition-all border-2 border-gray-200 hover:border-blue-500">
                <div className="flex items-center gap-4">
                  <CheckCircle size={40} className="text-teal-600" />
                  <div>
                    <h3 className="font-bold text-xl">8. Consejos Pro</h3>
                    <p className="text-gray-600">Tips de expertos</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Calculadora Rápida */}
      <section id="calculadora-rapida" className="py-16 bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-black mb-6">
              <Calculator className="w-5 h-5 inline" /> 1. Calculadora de Velocidad
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Descubre en <strong>30 segundos</strong> cuánta velocidad necesitas según tu hogar
            </p>
            <a
              href="/calculadora"
              className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-12 py-6 rounded-xl font-bold text-2xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              <Rocket className="w-5 h-5 inline" /> Ir a la Calculadora
            </a>
            <p className="text-sm text-gray-600 mt-4">
              <CheckCircle2 className="w-5 h-5 inline" /> Gratis • <CheckCircle2 className="w-5 h-5 inline" /> Sin registro • <CheckCircle2 className="w-5 h-5 inline" /> Recomendaciones personalizadas
            </p>
          </div>
        </div>
      </section>

      {/* Operadores */}
      <section id="operadores" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black mb-4 flex items-center gap-3">
              <Users className="w-8 h-8" /> 2. Operadores en Bogotá
            </h2>
            <p className="text-gray-600 mb-8">
              Comparación completa de los 3 principales proveedores
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Link href="/etb" className="border-2 border-blue-200 rounded-xl p-6 hover:shadow-lg transition-all hover:border-blue-500">
                <h3 className="font-bold text-2xl mb-2 text-[#0033A0]">ETB</h3>
                <p className="text-gray-600 mb-4">Operador local con mejor soporte técnico</p>
                <ul className="space-y-2 text-sm mb-4">
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Soporte técnico local 24/7</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Fibra óptica hasta 900 Mbps</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Planes desde $55.000/mes</span>
                  </li>
                </ul>
                <div className="text-blue-600 font-semibold flex items-center gap-2">
                  Ver planes ETB <ArrowRight size={16} />
                </div>
              </Link>

              <Link href="/claro" className="border-2 border-red-200 rounded-xl p-6 hover:shadow-lg transition-all hover:border-red-500">
                <h3 className="font-bold text-2xl mb-2 text-red-600">Claro</h3>
                <p className="text-gray-600 mb-4">Mayor cobertura nacional y 5G</p>
                <ul className="space-y-2 text-sm mb-4">
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Mayor cobertura en Colombia</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Tecnología 5G disponible</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Planes desde $60.000/mes</span>
                  </li>
                </ul>
                <div className="text-red-600 font-semibold flex items-center gap-2">
                  Ver planes Claro <ArrowRight size={16} />
                </div>
              </Link>

              <Link href="/movistar" className="border-2 border-green-200 rounded-xl p-6 hover:shadow-lg transition-all hover:border-green-500">
                <h3 className="font-bold text-2xl mb-2 text-[#019E45]">Movistar</h3>
                <p className="text-gray-600 mb-4">Velocidad simétrica y estabilidad</p>
                <ul className="space-y-2 text-sm mb-4">
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Velocidad simétrica garantizada</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Mejor estabilidad de conexión</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Planes desde $58.000/mes</span>
                  </li>
                </ul>
                <div className="text-green-600 font-semibold flex items-center gap-2">
                  Ver planes Movistar <ArrowRight size={16} />
                </div>
              </Link>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="font-bold text-lg mb-3"><Lightbulb className="w-5 h-5 inline" /> ¿Cuál elegir?</h3>
              <div className="space-y-2 text-gray-700">
                <p>• <strong>ETB:</strong> Si valoras el soporte técnico local y conoces Bogotá</p>
                <p>• <strong>Claro:</strong> Si necesitas la mejor cobertura móvil incluida</p>
                <p>• <strong>Movistar:</strong> Si priorizas velocidad de subida (streaming, trabajo remoto)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Velocidades */}
      <section id="velocidades" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              <Zap className="w-5 h-5 inline" /> 3. Guía de Velocidades
            </h2>
            <p className="text-gray-600 mb-8">
              ¿Qué velocidad necesitas? Comparación detallada
            </p>

            <div className="space-y-4">
              {velocidades.map((velocidad) => (
                <Link
                  key={velocidad.slug}
                  href={`/velocidades/${velocidad.slug}`}
                  className="block bg-white rounded-lg p-6 hover:shadow-lg transition-all border-2 border-gray-200 hover:border-blue-500"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-xl mb-2">{velocidad.nombre}</h3>
                      <p className="text-gray-600">
                        <strong>Ideal para:</strong> {velocidad.uso} • <strong>Precio:</strong> {velocidad.precio}/mes
                      </p>
                    </div>
                    <div className="text-blue-600 font-semibold flex items-center gap-2">
                      Ver detalles <ArrowRight size={16} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="bg-yellow-50 rounded-lg p-6 mt-8 border-l-4 border-yellow-400">
              <h3 className="font-bold text-lg mb-3"><Pin className="w-5 h-5 inline" /> Regla de Oro</h3>
              <p className="text-gray-700">
                Calcula <strong>20 Mbps por persona</strong> + necesidades específicas (gaming: +50 Mbps, streaming 4K: +25 Mbps, teletrabajo: +30 Mbps)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Barrios */}
      <section id="barrios" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black mb-4 flex items-center gap-3">
              <Pin className="w-8 h-8" /> 4. Internet por Barrio
            </h2>
            <p className="text-gray-600 mb-8">
              Cobertura, operadores y recomendaciones para 14 localidades de Bogotá
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {barrios.map((barrio) => (
                <Link
                  key={barrio.slug}
                  href={`/barrios/${barrio.slug}`}
                  className="bg-white border-2 border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all hover:border-blue-500"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-lg">{barrio.nombre}</h3>
                      <p className="text-sm text-gray-600">{barrio.poblacion} habitantes</p>
                    </div>
                    <MapPin size={24} className="text-blue-600" />
                  </div>
                </Link>
              ))}
            </div>

            <div className="bg-green-50 rounded-lg p-6 mt-8">
              <h3 className="font-bold text-lg mb-3"><CheckCircle2 className="w-5 h-5 inline" /> Cobertura Completa</h3>
              <p className="text-gray-700">
                Los 3 operadores (ETB, Claro, Movistar) tienen cobertura en todas estas localidades. 
                Haz clic en tu barrio para ver detalles específicos y planes disponibles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Viviendas */}
      <section id="viviendas" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              <Home className="w-5 h-5 inline" /> 5. Por Tipo de Vivienda
            </h2>
            <p className="text-gray-600 mb-8">
              Recomendaciones según donde vives o trabajas
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {viviendas.map((vivienda) => (
                <Link
                  key={vivienda.slug}
                  href={`/viviendas/${vivienda.slug}`}
                  className="bg-white rounded-xl p-6 hover:shadow-lg transition-all border-2 border-gray-200 hover:border-blue-500 text-center"
                >
                  <div className="flex justify-center mb-3">
                    <vivienda.IconComponent size={48} className="text-blue-600" />
                  </div>
                  <h3 className="font-bold text-xl">{vivienda.nombre}</h3>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Casos de Uso */}
      <section id="casos-uso" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              <Target className="w-5 h-5 inline" /> 6. Casos de Uso
            </h2>
            <p className="text-gray-600 mb-8">
              Internet optimizado para tu actividad principal
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {casos.map((caso) => (
                <Link
                  key={caso.slug}
                  href={`/casos/${caso.slug}`}
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 hover:shadow-lg transition-all border-2 border-blue-200 hover:border-blue-500"
                >
                  <caso.IconComponent size={40} className="text-blue-600 mb-3" />
                  <h3 className="font-bold text-xl mb-2">{caso.nombre}</h3>
                  <p className="text-gray-600">{caso.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Soluciones */}
      <section id="soluciones" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              <Wrench className="w-5 h-5 inline" /> 7. Soluciones a Problemas Comunes
            </h2>
            <p className="text-gray-600 mb-8">
              ¿Tienes problemas con tu internet actual? Encuentra la solución
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {soluciones.map((solucion) => (
                <Link
                  key={solucion.slug}
                  href={`/soluciones/${solucion.slug}`}
                  className="bg-white rounded-xl p-6 hover:shadow-lg transition-all border-2 border-gray-200 hover:border-blue-500"
                >
                  <div className="flex items-center gap-4">
                    <solucion.IconComponent size={40} className="text-blue-600" />
                    <div>
                      <h3 className="font-bold text-xl">{solucion.nombre}</h3>
                      <p className="text-blue-600 text-sm flex items-center gap-1 mt-1">
                        Ver solución <ArrowRight size={14} />
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Consejos Pro */}
      <section id="consejos" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black mb-4 text-center">
              <Award className="w-5 h-5 inline" /> 8. Consejos de Expertos
            </h2>
            <p className="text-gray-600 mb-12 text-center">
              Tips que los operadores no te cuentan
            </p>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border-l-4 border-green-500">
                <h3 className="font-bold text-lg mb-2"><CheckCircle2 className="w-5 h-5 inline" /> Siempre negocia el precio</h3>
                <p className="text-gray-700">
                  Los operadores tienen margen de negociación del 20-30%. Llama, menciona ofertas de la competencia y pide descuentos.
                </p>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-6 border-l-4 border-blue-500">
                <h3 className="font-bold text-lg mb-2"><Phone className="w-5 h-5 inline" /> Guarda números de soporte</h3>
                <p className="text-gray-700">
                  ETB: 555-5555 • Claro: #611 • Movistar: #611. Ten estos números siempre a mano.
                </p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg p-6 border-l-4 border-purple-500">
                <h3 className="font-bold text-lg mb-2"><Zap className="w-5 h-5 inline" /> Prioriza fibra óptica</h3>
                <p className="text-gray-700">
                  Si está disponible en tu zona, siempre elige fibra sobre cable. Mayor velocidad, estabilidad y velocidades simétricas.
                </p>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg p-6 border-l-4 border-orange-500">
                <h3 className="font-bold text-lg mb-2"><Lock className="w-5 h-5 inline" /> Protege tu WiFi</h3>
                <p className="text-gray-700">
                  Usa contraseñas fuertes (mínimo 12 caracteres), WPA3 si tu router lo soporta, y cambia las credenciales por defecto.
                </p>
              </div>

              <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-lg p-6 border-l-4 border-red-500">
                <h3 className="font-bold text-lg mb-2"><Calculator className="w-5 h-5 inline" /> Mide tu velocidad real</h3>
                <p className="text-gray-700">
                  Usa Speedtest.net o Fast.com para verificar que recibes la velocidad contratada. Si es menor al 70%, reclama.
                </p>
              </div>

              <div className="bg-gradient-to-r from-yellow-50 to-lime-50 rounded-lg p-6 border-l-4 border-yellow-500">
                <h3 className="font-bold text-lg mb-2"><DollarSign className="w-5 h-5 inline" /> Evita permanencias largas</h3>
                <p className="text-gray-700">
                  Prefiere contratos mes a mes o máximo 6 meses. La tecnología avanza rápido y querrás flexibilidad.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-black mb-6">
              ¿Listo para Contratar el Mejor Internet?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Te llamamos <strong>gratis</strong> para ofrecerte los mejores planes disponibles en tu zona
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 mb-8">
              <QuickCallForm buttonColor="#fbbf24" />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/calculadora"
                className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-all shadow-lg"
              >
                <Calculator className="w-5 h-5 inline" /> Calcular Velocidad
              </a>
              <a
                href="/"
                className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/30 transition-all"
              >
                <Home className="w-5 h-5 inline" /> Volver al Inicio
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Guide',
            name: 'Guía Completa de Internet en Bogotá 2026',
            description: 'Guía definitiva para contratar internet en Bogotá con comparativas de operadores, velocidades, barrios y consejos',
            url: 'https://comparadorinternet.co/guia-completa',
            author: {
              '@type': 'Organization',
              name: 'Comparador Internet Colombia',
            },
            datePublished: '2026-01-08',
            dateModified: '2026-01-08',
            inLanguage: 'es-CO',
          }),
        }}
      />
    </>
  );
}
