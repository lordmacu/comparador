import type { Metadata } from 'next';
import Link from 'next/link';
import { Wrench, Clock, CheckCircle2, MapPin, Phone, Truck, AlertCircle, Calendar } from 'lucide-react';
import QuickCallForm from '@/components/QuickCallForm';

export const metadata: Metadata = {
  title: 'Instalación de Internet Bogotá 2026 | Guía Completa Gratis',
  description: '¿Cómo instalar internet en Bogotá? Proceso paso a paso: cobertura, agendamiento, instalación gratis. ETB, Claro, Movistar. Tiempo: 3-7 días. Sin costos ocultos.',
  keywords: [
    'instalacion internet bogota',
    'como instalar internet en bogota',
    'instalacion internet gratis',
    'cuanto demora instalacion internet',
    'proceso instalacion fibra optica',
    'requisitos instalacion internet',
    'instalacion internet residencial',
    'contratar internet bogota',
    'instalacion etb claro movistar',
    'costo instalacion internet',
  ],
  alternates: {
    canonical: 'https://comparadorinternet.co/instalacion-internet-bogota',
  },
  openGraph: {
    title: 'Instalación de Internet en Bogotá | Proceso Completo 2026',
    description: 'Todo sobre instalación de internet: tiempos, costos, proceso y requisitos.',
    url: 'https://comparadorinternet.co/instalacion-internet-bogota',
    siteName: 'Comparador Internet Colombia',
    locale: 'es_CO',
    type: 'article',
  },
};

export default function InstalacionInternetPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'Cómo Instalar Internet en Bogotá',
            description: 'Proceso completo para instalar internet en tu hogar en Bogotá',
            totalTime: 'P7D',
            tool: ['Computador o celular', 'Documento de identidad', 'Recibo de servicios'],
            step: [
              {
                '@type': 'HowToStep',
                position: 1,
                name: 'Verificar cobertura en tu dirección',
                text: 'Consulta en la página del operador si hay cobertura en tu dirección. En Bogotá, ETB, Claro y Movistar tienen amplia cobertura.',
                url: 'https://comparadorinternet.co/instalacion-internet-bogota#cobertura',
              },
              {
                '@type': 'HowToStep',
                position: 2,
                name: 'Contratar el plan',
                text: 'Contrata online o por teléfono proporcionando: nombre completo, cédula, dirección exacta, teléfono de contacto.',
                url: 'https://comparadorinternet.co/instalacion-internet-bogota#contratar',
              },
              {
                '@type': 'HowToStep',
                position: 3,
                name: 'Agendar instalación',
                text: 'El operador te contactará en 24-48 horas para agendar fecha. Instalación toma 2-4 horas.',
                url: 'https://comparadorinternet.co/instalacion-internet-bogota#agendar',
              },
              {
                '@type': 'HowToStep',
                position: 4,
                name: 'Recibir al técnico',
                text: 'El técnico instalará cable, ONT/router y configurará WiFi. Debe estar alguien mayor de 18 años presente.',
                url: 'https://comparadorinternet.co/instalacion-internet-bogota#instalacion',
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
                <MapPin className="w-5 h-5" />
                <span className="font-semibold">Bogotá | Actualizado Enero 2026</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Instalación de Internet en Bogotá: Guía Completa
              </h1>

              <p className="text-xl md:text-2xl text-blue-100 mb-8">
                Todo lo que necesitas saber para <span className="font-bold text-white">instalar internet</span> en tu hogar: tiempos, costos, proceso y requisitos.
              </p>

              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 max-w-2xl mx-auto">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-black">3-7 días</div>
                    <div className="text-sm text-blue-100">Tiempo promedio</div>
                  </div>
                  <div>
                    <div className="text-3xl font-black">$0</div>
                    <div className="text-sm text-blue-100">Costo instalación</div>
                  </div>
                  <div>
                    <div className="text-3xl font-black">2-4h</div>
                    <div className="text-sm text-blue-100">Duración visita</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Proceso Paso a Paso */}
        <section className="py-16 -mt-12 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                📋 Proceso Completo de Instalación
              </h2>
              <p className="text-xl text-gray-600">4 pasos simples para tener internet en tu hogar</p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              {/* Paso 1 */}
              <div id="cobertura" className="bg-white rounded-2xl shadow-xl p-8 border-l-4 border-blue-500">
                <div className="flex items-start gap-6">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-black text-blue-600">1</span>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      Verificar Cobertura
                    </h3>

                    <p className="text-gray-700 mb-4">
                      Antes de contratar, verifica que el operador tenga cobertura en tu dirección exacta.
                    </p>

                    <div className="bg-blue-50 rounded-lg p-4 mb-4">
                      <div className="font-semibold text-blue-900 mb-2">Operadores con Mayor Cobertura:</div>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-blue-600" />
                          <span><strong>ETB:</strong> 95% de Bogotá (solo Bogotá)</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-blue-600" />
                          <span><strong>Claro:</strong> 90% de Bogotá + municipios cercanos</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-blue-600" />
                          <span><strong>Movistar:</strong> 85% de Bogotá (fibra en expansión)</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-semibold text-yellow-900 text-sm">Tip:</div>
                          <p className="text-sm text-yellow-800">
                            Pregunta específicamente por <strong>fibra óptica</strong>. Si solo hay cable/cobre disponible, considera esperar o cambiar de operador.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Paso 2 */}
              <div id="contratar" className="bg-white rounded-2xl shadow-xl p-8 border-l-4 border-green-500">
                <div className="flex items-start gap-6">
                  <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-black text-green-600">2</span>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      Contratar el Plan
                    </h3>

                    <p className="text-gray-700 mb-4">
                      Puedes contratar por teléfono, online o en puntos de atención.
                    </p>

                    <div className="bg-green-50 rounded-lg p-4 mb-4">
                      <div className="font-semibold text-green-900 mb-2">Documentos Necesarios:</div>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          <span>Cédula de ciudadanía (original o copia)</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          <span>Dirección exacta de instalación</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          <span>Teléfono celular de contacto</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          <span>Email (opcional pero recomendado)</span>
                        </li>
                      </ul>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="font-semibold text-gray-900 mb-2">✅ Contratación Online:</div>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Proceso en 10 minutos</li>
                          <li>• Precios web más bajos</li>
                          <li>• Promociones exclusivas</li>
                        </ul>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="font-semibold text-gray-900 mb-2">📞 Por Teléfono:</div>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Asesor te guía</li>
                          <li>• Puedes negociar precio</li>
                          <li>• Resuelves dudas en tiempo real</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Paso 3 */}
              <div id="agendar" className="bg-white rounded-2xl shadow-xl p-8 border-l-4 border-purple-500">
                <div className="flex items-start gap-6">
                  <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-black text-purple-600">3</span>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      Agendar Instalación
                    </h3>

                    <p className="text-gray-700 mb-4">
                      Después de contratar, el operador te contactará para agendar fecha y hora.
                    </p>

                    <div className="bg-purple-50 rounded-lg p-4 mb-4">
                      <div className="font-semibold text-purple-900 mb-2">Tiempos por Operador:</div>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center justify-between p-2 bg-white rounded">
                          <span><strong>ETB:</strong> Contacto en 24-48h</span>
                          <span className="text-purple-600 font-semibold">Instalación 3-5 días</span>
                        </li>
                        <li className="flex items-center justify-between p-2 bg-white rounded">
                          <span><strong>Claro:</strong> Contacto en 24-72h</span>
                          <span className="text-purple-600 font-semibold">Instalación 5-7 días</span>
                        </li>
                        <li className="flex items-center justify-between p-2 bg-white rounded">
                          <span><strong>Movistar:</strong> Contacto en 48h</span>
                          <span className="text-purple-600 font-semibold">Instalación 4-6 días</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start gap-2">
                        <Calendar className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-semibold text-blue-900 text-sm">Importante:</div>
                          <p className="text-sm text-blue-800">
                            Agenda en horarios que puedas estar presente (mañana 8am-12pm o tarde 2pm-6pm). La instalación toma 2-4 horas.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Paso 4 */}
              <div id="instalacion" className="bg-white rounded-2xl shadow-xl p-8 border-l-4 border-orange-500">
                <div className="flex items-start gap-6">
                  <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-black text-orange-600">4</span>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      Día de Instalación
                    </h3>

                    <p className="text-gray-700 mb-4">
                      El técnico llegará en la ventana horaria acordada.
                    </p>

                    <div className="bg-orange-50 rounded-lg p-4 mb-4">
                      <div className="font-semibold text-orange-900 mb-2">Qué Hará el Técnico:</div>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <Truck className="w-4 h-4 text-orange-600 mt-1 flex-shrink-0" />
                          <span><strong>1. Verificar punto de llegada:</strong> Identifica dónde entra la fibra/cable al edificio</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Wrench className="w-4 h-4 text-orange-600 mt-1 flex-shrink-0" />
                          <span><strong>2. Instalar cable:</strong> Tendido desde punto común hasta tu apartamento</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Wrench className="w-4 h-4 text-orange-600 mt-1 flex-shrink-0" />
                          <span><strong>3. Configurar ONT/router:</strong> Equipo que convierte señal óptica a WiFi</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Wrench className="w-4 h-4 text-orange-600 mt-1 flex-shrink-0" />
                          <span><strong>4. Probar conexión:</strong> Mide velocidad y verifica estabilidad</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-orange-600 mt-1 flex-shrink-0" />
                          <span><strong>5. Configurar WiFi:</strong> Te da nombre de red y contraseña (¡apúntalos!)</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-semibold text-red-900 text-sm">Requisito Obligatorio:</div>
                          <p className="text-sm text-red-800">
                            Debe estar presente una persona <strong>mayor de 18 años</strong> para firmar acta de instalación y recibir equipos.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Costos Instalación */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                💰 Costos de Instalación
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 text-center">
                <div className="text-5xl font-black text-blue-600 mb-2">$0</div>
                <div className="font-bold text-lg text-gray-900 mb-2">ETB</div>
                <p className="text-sm text-gray-700">Instalación gratis en todos los planes</p>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 text-center">
                <div className="text-5xl font-black text-red-600 mb-2">$0</div>
                <div className="font-bold text-lg text-gray-900 mb-2">Claro</div>
                <p className="text-sm text-gray-700">Sin costo en promociones (valor normal $80k)</p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 text-center">
                <div className="text-5xl font-black text-green-600 mb-2">$0</div>
                <div className="font-bold text-lg text-gray-900 mb-2">Movistar</div>
                <p className="text-sm text-gray-700">Gratis en planes desde $59.900</p>
              </div>
            </div>

            <div className="mt-8 bg-green-50 border-2 border-green-200 rounded-xl p-6 max-w-2xl mx-auto">
              <div className="text-center">
                <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-3" />
                <p className="text-lg font-semibold text-green-900 mb-2">
                  ✅ En enero 2026 TODOS los operadores ofrecen instalación GRATIS
                </p>
                <p className="text-sm text-green-800">
                  Aprovecha las promociones de inicio de año. Pregunta explícitamente para confirmar.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Preguntas Frecuentes */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                ❓ Preguntas Frecuentes
              </h2>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="font-bold text-lg text-gray-900 mb-2">
                  ¿Puedo instalar internet el mismo día que lo contrato?
                </h3>
                <p className="text-gray-700">
                  No. El proceso mínimo es 3-5 días. Primero deben verificar cobertura, agendar técnico y coordinar logística. En casos excepcionales ETB puede hacerlo en 48h.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="font-bold text-lg text-gray-900 mb-2">
                  ¿Necesito hacer huecos en las paredes?
                </h3>
                <p className="text-gray-700">
                  Depende. En apartamentos normalmente se usa canaleta externa o ductos existentes. En casas puede requerirse perforación si quieres cable interno (más estético).
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="font-bold text-lg text-gray-900 mb-2">
                  ¿Qué pasa si no hay cobertura en mi dirección?
                </h3>
                <p className="text-gray-700">
                  Pregunta cuándo llegará (algunos operadores están expandiendo). Si es urgente, considera internet móvil 4G/5G de Claro, Movistar o Tigo como alternativa temporal.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="font-bold text-lg text-gray-900 mb-2">
                  ¿Me cobran si cancelo antes de la instalación?
                </h3>
                <p className="text-gray-700">
                  No. Puedes cancelar sin costo antes de que se realice la instalación. Una vez instalado, aplican condiciones de permanencia si las aceptaste.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="font-bold text-lg text-gray-900 mb-2">
                  ¿Debo estar en casa todo el día de instalación?
                </h3>
                <p className="text-gray-700">
                  No. Te dan una ventana de 4 horas (ejemplo: 8am-12pm). El técnico llama 30 minutos antes de llegar. La instalación toma 2-4 horas normalmente.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-16 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Phone className="w-16 h-16 mx-auto mb-6" />

            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Listo para Instalar Internet?
            </h2>

            <p className="text-xl text-blue-100 mb-8">
              Te ayudamos con todo el proceso: verificamos cobertura, comparamos planes y coordinamos instalación. Asesoría gratis.
            </p>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md mx-auto mb-8">
              <QuickCallForm provider="Instalacion" />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <Link href="/planes" className="underline hover:text-blue-200">
                Comparar planes disponibles →
              </Link>
              <Link href="/ofertas" className="underline hover:text-blue-200">
                Ver ofertas de instalación gratis →
              </Link>
              <Link href="/contratar" className="underline hover:text-blue-200">
                Contratar online ahora →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
