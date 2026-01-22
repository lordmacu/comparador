import type { Metadata } from 'next';
import Link from 'next/link';
import { Video, Wifi, CheckCircle2, AlertCircle, TrendingUp, Users, Zap, Phone } from 'lucide-react';
import QuickCallForm from '@/components/QuickCallForm';

export const metadata: Metadata = {
  title: 'Internet para Zoom y Reuniones Virtuales 2026 | Guía Completa Colombia',
  description: 'Descubre qué velocidad necesitas para Zoom, Teams, Meet y videollamadas sin cortes. Guía completa con planes recomendados desde $41.930/mes. ETB, Claro y Movistar comparados.',
  keywords: [
    'internet para zoom',
    'internet para reuniones virtuales',
    'internet teletrabajo colombia',
    'velocidad para videollamadas',
    'internet para teams',
    'internet para google meet',
    'mejor internet para zoom colombia',
    'internet trabajo remoto',
    'megas para zoom',
    'internet videollamadas sin cortes',
  ],
  alternates: {
    canonical: 'https://comparadorinternet.co/internet-para-zoom-reuniones',
  },
  openGraph: {
    title: 'Internet para Zoom y Reuniones Virtuales | Guía 2026',
    description: 'Qué velocidad necesitas para Zoom, Teams y Meet sin cortes. Planes desde $41.930/mes.',
    url: 'https://comparadorinternet.co/internet-para-zoom-reuniones',
    siteName: 'Comparador Internet Colombia',
    locale: 'es_CO',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Internet para Zoom y Videollamadas | Colombia 2026',
    description: 'Guía completa: velocidad ideal, planes recomendados y consejos para reuniones sin interrupciones.',
  },
};

export default function ZoomInternetPage() {
  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'Cómo elegir internet para Zoom y reuniones virtuales',
            description: 'Guía para elegir el plan de internet ideal para trabajo remoto con videollamadas',
            totalTime: 'PT5M',
            step: [
              {
                '@type': 'HowToStep',
                name: 'Calcula participantes',
                text: 'Determina cuántas personas usan Zoom simultáneamente en tu hogar',
              },
              {
                '@type': 'HowToStep',
                name: 'Verifica velocidad de subida',
                text: 'Necesitas mínimo 3 Mbps de subida por persona en videollamada',
              },
              {
                '@type': 'HowToStep',
                name: 'Elige fibra óptica',
                text: 'Prioriza planes con fibra óptica para mayor estabilidad',
              },
              {
                '@type': 'HowToStep',
                name: 'Compara operadores',
                text: 'ETB ofrece fibra simétrica, Movistar fibra premium, Claro cobertura amplia',
              },
            ],
          }),
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Hero */}
        <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Video className="w-5 h-5" />
                <span className="font-semibold">Guía Actualizada 2026</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Internet para Zoom y Reuniones Virtuales en Colombia
              </h1>

              <p className="text-xl md:text-2xl text-blue-100 mb-8">
                Descubre qué velocidad necesitas para Teams, Meet, Zoom y videollamadas sin interrupciones. Planes desde <span className="font-bold text-white">$41.930/mes</span>.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-lg">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Sin cortes</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-lg">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Baja latencia</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-lg">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Fibra óptica</span>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 max-w-sm mx-auto shadow-xl">
                 <h2 className="text-white text-lg font-semibold mb-2">¿Quieres contratar internet estable?</h2>
                 <p className="text-blue-100 text-sm mb-4">Déjanos tu número y te contactamos en minutos.</p>
                 <QuickCallForm buttonColor="#3b82f6" provider="Multi" />
              </div>

            </div>
          </div>
        </section>

        {/* Velocidades Requeridas */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                ¿Qué Velocidad Necesitas?
              </h2>
              <p className="text-xl text-gray-600">
                Requisitos oficiales de las principales plataformas
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
              {/* Zoom */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border-2 border-blue-200">
                <div className="text-center">
                  <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Video className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Zoom</h3>
                  
                  <div className="space-y-3 text-left">
                    <div>
                      <div className="font-semibold text-gray-700">Llamada 1 a 1:</div>
                      <div className="text-sm text-gray-600">▲ 1.5 Mbps / ▼ 1.5 Mbps</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-700">Reunión grupal:</div>
                      <div className="text-sm text-gray-600">▲ 3 Mbps / ▼ 3 Mbps</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-700">HD (720p):</div>
                      <div className="text-sm text-gray-600">▲ 3.8 Mbps / ▼ 3.0 Mbps</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-700">Full HD (1080p):</div>
                      <div className="text-sm text-gray-600">▲ 5 Mbps / ▼ 4 Mbps</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Teams */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 border-2 border-purple-200">
                <div className="text-center">
                  <div className="bg-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Microsoft Teams</h3>
                  
                  <div className="space-y-3 text-left">
                    <div>
                      <div className="font-semibold text-gray-700">Video SD:</div>
                      <div className="text-sm text-gray-600">▲ 1.2 Mbps / ▼ 1.5 Mbps</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-700">Video HD:</div>
                      <div className="text-sm text-gray-600">▲ 2.5 Mbps / ▼ 4 Mbps</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-700">Reunión grande:</div>
                      <div className="text-sm text-gray-600">▲ 4 Mbps / ▼ 4 Mbps</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-700">Pantalla compartida:</div>
                      <div className="text-sm text-gray-600">▲ 1.5 Mbps adicionales</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Meet */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border-2 border-green-200">
                <div className="text-center">
                  <div className="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Wifi className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Google Meet</h3>
                  
                  <div className="space-y-3 text-left">
                    <div>
                      <div className="font-semibold text-gray-700">Llamada 1 a 1:</div>
                      <div className="text-sm text-gray-600">▲ 1 Mbps / ▼ 1 Mbps</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-700">Reunión grupal:</div>
                      <div className="text-sm text-gray-600">▲ 2 Mbps / ▼ 2 Mbps</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-700">HD Quality:</div>
                      <div className="text-sm text-gray-600">▲ 3.2 Mbps / ▼ 2.6 Mbps</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-700">Reunión grande:</div>
                      <div className="text-sm text-gray-600">▲ 4 Mbps / ▼ 3.2 Mbps</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-6 max-w-4xl mx-auto">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">💡 Regla de Oro para Teletrabajo:</h4>
                  <p className="text-gray-700">
                    Si trabajas desde casa con videollamadas frecuentes, necesitas <strong>mínimo 300 Mbps</strong> con{' '}
                    <strong>velocidad simétrica</strong> (misma velocidad de subida y bajada). Esto garantiza:
                  </p>
                  <ul className="mt-3 space-y-1 text-sm text-gray-600">
                    <li>✓ Video HD sin pixelación</li>
                    <li>✓ Audio claro sin delays</li>
                    <li>✓ Compartir pantalla fluido</li>
                    <li>✓ Otros dispositivos funcionando simultáneamente</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Planes Recomendados */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Planes Recomendados para Zoom
              </h2>
              <p className="text-xl text-gray-600">
                Según el número de personas en videollamadas simultáneas
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Plan 1 persona */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-blue-200 hover:border-blue-400 transition-all">
                <div className="text-center mb-6">
                  <div className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-bold inline-block mb-4">
                    1 Persona
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">300 Mbps</h3>
                  <div className="text-xl font-semibold text-blue-600 mb-4">
                    Desde $41.930/mes
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Videollamadas HD sin problemas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Compartir pantalla fluido</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Otros dispositivos activos</span>
                  </li>
                </ul>

                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <div className="font-semibold text-gray-900 mb-2">Mejor opción:</div>
                  <div className="text-blue-600 font-bold">ETB Fibra 300 Mbps</div>
                  <div className="text-sm text-gray-600">Simétrica: 300 subida / 300 bajada</div>
                </div>

                <Link
                  href="/planes"
                  className="block w-full text-center bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Ver Plan
                </Link>
              </div>

              {/* Plan 2-3 personas */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border-4 border-yellow-400 hover:border-yellow-500 transition-all relative">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-sm font-bold">
                  ⭐ MÁS VENDIDO
                </div>

                <div className="text-center mb-6">
                  <div className="bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm font-bold inline-block mb-4">
                    2-3 Personas
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">500 Mbps</h3>
                  <div className="text-xl font-semibold text-purple-600 mb-4">
                    Desde $89.900/mes
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">2-3 videollamadas simultáneas HD</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Streaming 4K en paralelo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Ideal para familia teletrabajando</span>
                  </li>
                </ul>

                <div className="bg-purple-50 rounded-lg p-4 mb-4">
                  <div className="font-semibold text-gray-900 mb-2">Mejor opción:</div>
                  <div className="text-purple-600 font-bold">Movistar Fibra 600 Mbps</div>
                  <div className="text-sm text-gray-600">Simétrica: 600 subida / 600 bajada</div>
                  <div className="text-xs text-green-700 mt-1">+ Disney+ 12 meses gratis</div>
                </div>

                <Link
                  href="/planes"
                  className="block w-full text-center bg-purple-600 text-white font-bold py-3 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Ver Plan
                </Link>
              </div>

              {/* Plan 4+ personas */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-green-200 hover:border-green-400 transition-all">
                <div className="text-center mb-6">
                  <div className="bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-bold inline-block mb-4">
                    4+ Personas
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">910 Mb</h3>
                  <div className="text-xl font-semibold text-green-600 mb-4">
                    Desde $62.930/mes
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">4+ videollamadas Full HD</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Gaming + streaming simultáneos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Oficina en casa completa</span>
                  </li>
                </ul>

                <div className="bg-green-50 rounded-lg p-4 mb-4">
                  <div className="font-semibold text-gray-900 mb-2">Mejor opción:</div>
                  <div className="text-green-600 font-bold">ETB Fibra 910 Mb</div>
                  <div className="text-sm text-gray-600">Simétrica: 910 subida / 910 bajada</div>
                </div>

                <Link
                  href="/planes"
                  className="block w-full text-center bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Ver Plan
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Consejos */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                7 Consejos para Reuniones Sin Cortes
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                <h3 className="font-bold text-lg text-gray-900 mb-3">1. Usa Cable Ethernet</h3>
                <p className="text-gray-700 text-sm">
                  Conectar tu PC directamente al router con cable reduce latencia en 50% vs WiFi.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                <h3 className="font-bold text-lg text-gray-900 mb-3">2. Cierra Apps en Segundo Plano</h3>
                <p className="text-gray-700 text-sm">
                  Descargas automáticas, backups en la nube y actualizaciones consumen ancho de banda.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                <h3 className="font-bold text-lg text-gray-900 mb-3">3. Ubica el Router Correctamente</h3>
                <p className="text-gray-700 text-sm">
                  Posición central, elevado, sin paredes de concreto entre el router y tu dispositivo.
                </p>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 border border-yellow-200">
                <h3 className="font-bold text-lg text-gray-900 mb-3">4. Horarios de Menor Congestión</h3>
                <p className="text-gray-700 text-sm">
                  6-9 AM y 2-5 PM tienen menor tráfico que 7-10 PM cuando todos están conectados.
                </p>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 border border-red-200">
                <h3 className="font-bold text-lg text-gray-900 mb-3">5. Desactiva Video si es Necesario</h3>
                <p className="text-gray-700 text-sm">
                  Audio solo consume 10x menos ancho de banda que video HD (100 KB/s vs 1 MB/s).
                </p>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-6 border border-indigo-200">
                <h3 className="font-bold text-lg text-gray-900 mb-3">6. Actualiza tu Router</h3>
                <p className="text-gray-700 text-sm">
                  Routers WiFi 6 (802.11ax) son 40% más eficientes que WiFi 5 en ambientes congestionados.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-16 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Phone className="w-16 h-16 mx-auto mb-6" />

            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Necesitas Asesoría Personalizada?
            </h2>

            <p className="text-xl text-blue-100 mb-8">
              Nuestros expertos te ayudan a encontrar el plan perfecto según tus necesidades de teletrabajo y reuniones virtuales.
            </p>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md mx-auto mb-8">
              <QuickCallForm provider="Zoom" />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <Link href="/planes" className="underline hover:text-blue-200">
                Ver todos los planes →
              </Link>
              <Link href="/ofertas" className="underline hover:text-blue-200">
                Ver ofertas actuales →
              </Link>
              <Link href="/contratar" className="underline hover:text-blue-200">
                Contratar online →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
