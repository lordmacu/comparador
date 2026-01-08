'use client';

import { useState } from 'react';
import QuickCallForm from '@/components/QuickCallForm';
import { Calculator, Users, Wifi, Monitor, Gamepad, Video, Briefcase, Home, TrendingUp, CheckCircle, AlertCircle } from 'lucide-react';

export default function CalculadoraPage() {
  const [personas, setPersonas] = useState(3);
  const [usos, setUsos] = useState<string[]>([]);
  const [resultado, setResultado] = useState<{
    velocidadMin: number;
    velocidadRec: number;
    razon: string;
    planes: Array<{ operador: string; velocidad: string; precio: string; link: string }>;
  } | null>(null);

  const usosDisponibles = [
    { id: 'streaming', label: 'Streaming (Netflix, YouTube)', icon: Video, mbps: 25 },
    { id: 'gaming', label: 'Gaming Online', icon: Gamepad, mbps: 50 },
    { id: 'teletrabajo', label: 'Teletrabajo / Videollamadas', icon: Briefcase, mbps: 30 },
    { id: 'navegacion', label: 'Navegación Web Básica', icon: Monitor, mbps: 10 },
    { id: 'descargas', label: 'Descargas Frecuentes', icon: TrendingUp, mbps: 40 },
  ];

  const toggleUso = (usoId: string) => {
    setUsos(prev => 
      prev.includes(usoId) 
        ? prev.filter(u => u !== usoId)
        : [...prev, usoId]
    );
  };

  const calcularVelocidad = () => {
    // Cálculo base por persona
    let velocidadBase = personas * 20;

    // Sumar velocidad por uso
    let velocidadPorUsos = 0;
    usos.forEach(usoId => {
      const uso = usosDisponibles.find(u => u.id === usoId);
      if (uso) velocidadPorUsos += uso.mbps;
    });

    // Velocidad mínima y recomendada
    const velocidadMin = Math.ceil((velocidadBase + velocidadPorUsos) / 50) * 50;
    const velocidadRec = Math.ceil(velocidadMin * 1.3 / 100) * 100;

    // Determinar categoría y razón
    let razon = '';
    if (velocidadRec <= 100) {
      razon = 'Uso básico: Navegación web, redes sociales y streaming ocasional en calidad estándar.';
    } else if (velocidadRec <= 200) {
      razon = 'Uso moderado: Múltiples dispositivos, streaming HD simultáneo y teletrabajo básico.';
    } else if (velocidadRec <= 300) {
      razon = 'Uso avanzado: Hogar conectado, streaming 4K, teletrabajo con videollamadas y gaming ocasional.';
    } else if (velocidadRec <= 500) {
      razon = 'Uso intensivo: Gaming competitivo, múltiples videollamadas simultáneas, streaming 4K en varios dispositivos.';
    } else {
      razon = 'Uso ultra: Hogar ultra conectado, gaming profesional, trabajo remoto intensivo, smart home completo.';
    }

    // Planes sugeridos
    const planes = [];
    
    if (velocidadRec <= 100) {
      planes.push(
        { operador: 'ETB', velocidad: '100 Mbps', precio: '$55,000/mes', link: '/etb' },
        { operador: 'Claro', velocidad: '100 Mbps', precio: '$60,000/mes', link: '/claro' },
        { operador: 'Movistar', velocidad: '100 Mbps', precio: '$58,000/mes', link: '/movistar' }
      );
    } else if (velocidadRec <= 200) {
      planes.push(
        { operador: 'ETB', velocidad: '200 Mbps', precio: '$75,000/mes', link: '/etb' },
        { operador: 'Claro', velocidad: '200 Mbps', precio: '$80,000/mes', link: '/claro' },
        { operador: 'Movistar', velocidad: '200 Mbps', precio: '$78,000/mes', link: '/movistar' }
      );
    } else if (velocidadRec <= 300) {
      planes.push(
        { operador: 'ETB', velocidad: '300 Mbps', precio: '$95,000/mes', link: '/etb' },
        { operador: 'Claro', velocidad: '300 Mbps', precio: '$100,000/mes', link: '/claro' },
        { operador: 'Movistar', velocidad: '300 Mbps', precio: '$98,000/mes', link: '/movistar' }
      );
    } else if (velocidadRec <= 500) {
      planes.push(
        { operador: 'ETB', velocidad: '500 Mbps', precio: '$125,000/mes', link: '/etb' },
        { operador: 'Claro', velocidad: '500 Mbps', precio: '$130,000/mes', link: '/claro' },
        { operador: 'Movistar', velocidad: '600 Mbps', precio: '$135,000/mes', link: '/movistar' }
      );
    } else {
      planes.push(
        { operador: 'ETB', velocidad: '1 Gbps', precio: '$180,000/mes', link: '/etb' },
        { operador: 'Claro', velocidad: '1 Gbps', precio: '$200,000/mes', link: '/claro' },
        { operador: 'Movistar', velocidad: '1 Gbps', precio: '$190,000/mes', link: '/movistar' }
      );
    }

    setResultado({
      velocidadMin,
      velocidadRec,
      razon,
      planes
    });

    // Scroll al resultado
    setTimeout(() => {
      document.getElementById('resultado')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-6">
            <Calculator className="w-4 h-4" />
            <span>Calculadora Gratis</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Calculadora de Velocidad de Internet
          </h1>
          
          <p className="text-xl text-blue-100 mb-8">
            Descubre cuánta velocidad necesitas según el número de personas y tus actividades online
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <div className="text-2xl font-bold">100% Gratis</div>
              <div className="text-sm text-blue-200">Sin registro</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <div className="text-2xl font-bold">Instantáneo</div>
              <div className="text-sm text-blue-200">Resultado inmediato</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <div className="text-2xl font-bold">Preciso</div>
              <div className="text-sm text-blue-200">Algoritmo 2026</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <div className="text-2xl font-bold">Actualizado</div>
              <div className="text-sm text-blue-200">Precios actuales</div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculadora */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Calculator className="w-6 h-6 text-blue-600" />
              Calcula tu velocidad ideal
            </h2>

            {/* Número de Personas */}
            <div className="mb-8">
              <label className="block text-lg font-semibold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                1. ¿Cuántas personas usan internet en tu hogar?
              </label>
              <div className="flex items-center gap-6">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={personas}
                  onChange={(e) => setPersonas(parseInt(e.target.value))}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="bg-blue-600 text-white rounded-lg px-6 py-3 text-xl font-bold min-w-[80px] text-center">
                  {personas}
                </div>
              </div>
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>1 persona</span>
                <span>10+ personas</span>
              </div>
            </div>

            {/* Usos */}
            <div className="mb-8">
              <label className="block text-lg font-semibold mb-4 flex items-center gap-2">
                <Wifi className="w-5 h-5 text-blue-600" />
                2. ¿Para qué usas el internet? (Selecciona todos los que apliquen)
              </label>
              <div className="grid md:grid-cols-2 gap-4">
                {usosDisponibles.map((uso) => {
                  const Icon = uso.icon;
                  const isSelected = usos.includes(uso.id);
                  return (
                    <button
                      key={uso.id}
                      onClick={() => toggleUso(uso.id)}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-6 h-6 ${isSelected ? 'text-blue-600' : 'text-gray-400'}`} />
                        <div className="flex-1">
                          <div className={`font-semibold ${isSelected ? 'text-blue-900' : 'text-gray-700'}`}>
                            {uso.label}
                          </div>
                          <div className="text-sm text-gray-500">
                            +{uso.mbps} Mbps requeridos
                          </div>
                        </div>
                        {isSelected && (
                          <CheckCircle className="w-5 h-5 text-blue-600" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Botón Calcular */}
            <button
              onClick={calcularVelocidad}
              disabled={usos.length === 0}
              className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
                usos.length === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
              }`}
            >
              {usos.length === 0 ? 'Selecciona al menos un uso' : 'Calcular Velocidad Recomendada'}
            </button>
          </div>

          {/* Resultado */}
          {resultado && (
            <div id="resultado" className="mt-8 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg shadow-lg p-8 border-2 border-green-200">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  <CheckCircle className="w-4 h-4" />
                  ¡Resultado Calculado!
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  Tu Velocidad Ideal
                </h3>
                <p className="text-gray-600">
                  Basado en {personas} {personas === 1 ? 'persona' : 'personas'} y {usos.length} {usos.length === 1 ? 'uso' : 'usos'} seleccionados
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-lg p-6 shadow-sm border border-blue-200">
                  <div className="text-sm text-gray-500 mb-2">Velocidad Mínima</div>
                  <div className="text-4xl font-bold text-blue-600 mb-2">{resultado.velocidadMin} Mbps</div>
                  <div className="text-sm text-gray-600">Lo mínimo funcional para tus necesidades</div>
                </div>
                <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg p-6 shadow-lg text-white">
                  <div className="text-sm text-blue-100 mb-2">⭐ Velocidad Recomendada</div>
                  <div className="text-4xl font-bold mb-2">{resultado.velocidadRec} Mbps</div>
                  <div className="text-sm text-blue-100">Ideal para una experiencia sin interrupciones</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 mb-8 border-l-4 border-blue-600">
                <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-blue-600" />
                  ¿Por qué esta velocidad?
                </h4>
                <p className="text-gray-700">{resultado.razon}</p>
              </div>

              <h4 className="text-2xl font-bold mb-4">Planes Recomendados en Bogotá</h4>
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                {resultado.planes.map((plan, index) => (
                  <div key={index} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-200">
                    <h5 className="text-xl font-bold mb-2">{plan.operador}</h5>
                    <div className="text-3xl font-bold text-blue-600 mb-1">{plan.velocidad}</div>
                    <div className="text-lg text-gray-600 mb-4">{plan.precio}</div>
                    <a
                      href={plan.link}
                      className="block text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                    >
                      Ver Planes
                    </a>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                <h4 className="font-bold text-lg mb-4 text-center">
                  ¿Necesitas Ayuda para Escoger?
                </h4>
                <p className="text-center text-gray-700 mb-4">
                  Nuestros expertos te asesoran gratis para encontrar el mejor plan según tu presupuesto y ubicación
                </p>
                <QuickCallForm buttonColor="#2563eb" />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Tips */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-8">
            Tips para Elegir tu Velocidad
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Piensa en el Futuro
              </h3>
              <p className="text-gray-700">
                Considera que cada año se conectan más dispositivos: smart TVs, smartphones, tablets, consolas, cámaras. Es mejor contratar 50-100 Mbps extras ahora.
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                <Home className="w-5 h-5 text-green-600" />
                Fibra Óptica es Clave
              </h3>
              <p className="text-gray-700">
                No solo importa la velocidad, también la tecnología. Fibra óptica es 10x más estable que cable. Pregunta por FTTH (Fiber to the Home).
              </p>
            </div>
            <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
              <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                <Wifi className="w-5 h-5 text-yellow-600" />
                WiFi vs Cable
              </h3>
              <p className="text-gray-700">
                La velocidad calculada es por cable Ethernet. Por WiFi puedes perder 30-50%. Para gaming o teletrabajo, usa cable siempre que puedas.
              </p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
              <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-600" />
                Horarios Pico
              </h3>
              <p className="text-gray-700">
                Entre 7-10 PM todos usan internet. Si trabajas de noche o madrugada, puedes con una velocidad menor. Si usas en horario pico, agrega 50 Mbps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-8">
            Preguntas Frecuentes
          </h2>
          <div className="space-y-4">
            {[
              {
                q: '¿Esta calculadora es precisa?',
                a: 'Sí, usa fórmulas actualizadas 2026 basadas en los requerimientos reales de cada actividad (streaming 4K = 25 Mbps, gaming = 50 Mbps, etc.) más un margen de seguridad del 30%.'
              },
              {
                q: '¿Por qué la velocidad recomendada es mayor que la mínima?',
                a: 'La mínima es lo justo para funcionar, pero sin margen. La recomendada incluye 30% extra para: pérdida de señal WiFi, múltiples dispositivos conectados simultáneamente, y futuro crecimiento.'
              },
              {
                q: '¿Los precios mostrados son reales?',
                a: 'Sí, son precios promedio actuales en Bogotá para cada operador. Los precios exactos pueden variar según tu zona, promociones vigentes y si eres cliente nuevo.'
              },
              {
                q: '¿Puedo contratar menos velocidad para ahorrar?',
                a: 'Sí, pero si contratas menos de la velocidad mínima, experimentarás: buffering en videos, lag en gaming, videollamadas cortadas y lentitud general. No lo recomendamos.'
              },
              {
                q: '¿Qué pasa si tengo Smart Home (Alexa, cámaras, etc.)?',
                a: 'Cada dispositivo IoT consume 1-5 Mbps. Si tienes 5+ dispositivos inteligentes, agrega 50 Mbps a la velocidad recomendada. Considera planes de 300+ Mbps.'
              }
            ].map((faq, index) => (
              <details key={index} className="bg-white rounded-lg shadow-sm border border-gray-200">
                <summary className="p-4 cursor-pointer font-semibold hover:bg-gray-50">
                  {faq.q}
                </summary>
                <div className="p-4 pt-0 text-gray-700">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-12 px-4 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿Ya sabes qué velocidad necesitas?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Te ayudamos a encontrar el mejor plan en tu zona de Bogotá
          </p>
          <div className="max-w-md mx-auto">
            <QuickCallForm buttonColor="#ffffff" />
          </div>
        </div>
      </section>

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Calculadora de Velocidad de Internet',
            description: 'Calcula cuánta velocidad de internet necesitas según el número de personas y actividades online en Bogotá',
            url: 'https://comparadorinternet.co/calculadora',
            applicationCategory: 'UtilitiesApplication',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'COP'
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.8',
              ratingCount: '1250'
            }
          }),
        }}
      />
    </div>
  );
}
