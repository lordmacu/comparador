import { Metadata } from 'next';
import Link from 'next/link';
import {
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Search,
  Phone,
  Calculator,
  BookOpen,
  Lightbulb,
  MessageCircle
} from 'lucide-react';
import QuickCallForm from '@/components/QuickCallForm';

export const metadata: Metadata = {
  title: 'Preguntas Frecuentes sobre Internet en Colombia 2026 | FAQ Completo',
  description: 'Resuelve todas tus dudas sobre internet en Colombia: velocidades, precios, instalación, operadores y más. Respuestas de expertos actualizadas 2026.',
  keywords: 'preguntas frecuentes internet Colombia, FAQ internet, dudas internet Colombia, velocidad internet, instalación internet, operadores Colombia, ETB vs Claro vs Movistar',
  authors: [{ name: 'Comparador Internet Colombia' }],
  creator: 'Comparador Internet Colombia',
  publisher: 'Comparador Internet Colombia',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://comparadorinternet.co/faq'
  },
  openGraph: {
    type: 'website',
    title: 'FAQ: Preguntas Frecuentes sobre Internet en Colombia',
    description: 'Todas las respuestas sobre internet en Colombia: velocidades, precios, instalación y operadores.',
    url: 'https://comparadorinternet.co/faq',
    siteName: 'Comparador Internet Colombia',
    images: [
      {
        url: 'https://comparadorinternet.co/images/faq-og.jpg',
        width: 1200,
        height: 630,
        alt: 'FAQ Internet Colombia - Preguntas Frecuentes'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQ: Preguntas Frecuentes sobre Internet en Colombia',
    description: 'Resuelve todas tus dudas sobre internet en Colombia.',
    images: ['https://comparadorinternet.co/images/faq-og.jpg']
  }
};

const faqData = [
  // Velocidades y Planes
  {
    category: "Velocidades y Planes",
    questions: [
      {
        question: "¿Qué velocidad de internet necesito para mi hogar?",
        answer: "La velocidad depende del número de personas y dispositivos conectados. Como regla general: 1-2 personas necesitan 50-100 Mbps, 3-4 personas requieren 200-300 Mbps, y familias de 5+ personas necesitan 500+ Mbps. Para trabajo remoto o gaming, considera velocidades simétricas de fibra óptica."
      },
      {
        question: "¿Cuál es la diferencia entre fibra óptica y cable?",
        answer: "La fibra óptica ofrece velocidades más altas y estables, menor latencia (ping bajo) y velocidades simétricas (misma velocidad de subida y bajada). El cable tradicional es más económico pero tiene velocidades asimétricas y puede saturarse en horas pico. En 2026, recomendamos fibra óptica para mejor rendimiento."
      },
      {
        question: "¿Por qué mi internet va más lento de lo contratado?",
        answer: "Varios factores afectan la velocidad: saturación de la red en horas pico, distancia del router, dispositivos conectados, plan asimétrico vs simétrico, y calidad del WiFi. Usa un cable ethernet directo al router para medir la velocidad real y contacta a tu operador si hay diferencias significativas."
      }
    ]
  },
  
  // Operadores
  {
    category: "Operadores",
    questions: [
      {
        question: "¿Cuál es el mejor operador de internet en Colombia?",
        answer: "No hay un 'mejor' operador universal, depende de tu ubicación y necesidades. ETB domina en Bogotá con fibra simétrica, Claro tiene la mayor cobertura nacional, y Movistar ofrece buenos precios en ciudades principales. Te recomendamos usar nuestra calculadora para encontrar la mejor opción para tu caso específico."
      },
      {
        question: "¿ETB, Claro o Movistar? ¿Cuál elegir?",
        answer: "ETB: Ideal en Bogotá, fibra simétrica, soporte local. Claro: Mayor cobertura nacional, 5G, planes variados. Movistar: Buenos precios, fibra óptica, descuentos online. La mejor elección depende de tu ubicación, presupuesto y necesidades de velocidad."
      },
      {
        question: "¿Puedo cambiar de operador sin penalizaciones?",
        answer: "Sí, pero revisa tu contrato actual. Las permanencias varían entre 6-24 meses. Si estás en permanencia, podrías pagar una multa. Algunos operadores ofrecen asumir la multa por cambiarte. Siempre negocia antes de firmar un nuevo contrato."
      }
    ]
  },

  // Instalación y Técnico
  {
    category: "Instalación y Soporte",
    questions: [
      {
        question: "¿Cuánto demora la instalación de internet?",
        answer: "La instalación típicamente demora 3-10 días hábiles desde la contratación. ETB puede demorar hasta 15 días en zonas nuevas, Claro usualmente instala en 5-7 días, y Movistar entre 7-10 días. En temporadas altas (diciembre-enero) los tiempos pueden extenderse."
      },
      {
        question: "¿Qué pasa si no hay fibra óptica en mi edificio?",
        answer: "Los operadores pueden instalar fibra hasta el edificio si hay factibilidad técnica y permisos de la administración. El proceso puede tomar 30-60 días adicionales. Mientras tanto, puedes optar por planes de cable o híbridos. Consulta con múltiples operadores para verificar cobertura."
      },
      {
        question: "¿El técnico cobra extra por la instalación?",
        answer: "La instalación básica debe ser gratuita según la normativa colombiana. Sin embargo, trabajos adicionales como cableado especial, puntos adicionales, o instalaciones complejas pueden tener costos extra. Pregunta por escrito qué incluye la instalación gratuita."
      }
    ]
  },

  // Precios y Facturación
  {
    category: "Precios y Facturación",
    questions: [
      {
        question: "¿Cuánto cuesta el internet en Colombia en 2026?",
        answer: "Los precios varían según velocidad y operador: 100 Mbps desde $50,000, 200 Mbps desde $70,000, 300 Mbps desde $90,000, 500 Mbps desde $120,000, y 1 Gbps desde $180,000. ETB tiende a ser más económico en Bogotá, mientras que Claro y Movistar tienen precios similares nacionalmente."
      },
      {
        question: "¿Puedo negociar el precio con los operadores?",
        answer: "¡Absolutamente sí! Los operadores siempre tienen margen para negociar. Menciona ofertas de la competencia, tu historial como buen pagador, o amenaza con cancelar. Comúnmente puedes obtener 20-30% de descuento, meses gratis, o servicios adicionales incluidos."
      },
      {
        question: "¿Qué incluye realmente el precio del plan?",
        answer: "El precio base incluye la conexión a internet y router básico. NO incluye: instalación de puntos adicionales, servicios premium, canales de TV, llamadas internacionales, o soporte técnico especializado. Siempre lee la letra pequeña y pregunta qué está incluido."
      }
    ]
  },

  // Gaming y Streaming
  {
    category: "Gaming y Streaming",
    questions: [
      {
        question: "¿Qué internet necesito para gaming online?",
        answer: "Para gaming necesitas: velocidad mínima 50 Mbps, pero más importante es ping bajo (<50ms) y conexión estable. La fibra óptica simétrica es ideal. Evita WiFi y usa cable ethernet directo. Para streaming simultáneo de juegos, considera 200+ Mbps."
      },
      {
        question: "¿Por qué tengo lag en los juegos online?",
        answer: "El lag se debe a alta latencia (ping). Causas comunes: WiFi en lugar de cable, muchos dispositivos conectados, horas pico de la red, servidores de juego lejanos, o plan de internet asimétrico. La fibra óptica simétrica minimiza estos problemas."
      },
      {
        question: "¿Cuánto internet consume Netflix, YouTube y streaming?",
        answer: "Netflix 4K consume ~7 GB/hora, HD ~3 GB/hora, SD ~1 GB/hora. YouTube 4K ~2.7 GB/hora, 1080p ~1.6 GB/hora. Para múltiples pantallas simultáneas, calcula el consumo total. Un plan de 200 Mbps soporta cómodamente 3-4 streams 4K simultáneos."
      }
    ]
  },

  // Teletrabajo
  {
    category: "Teletrabajo",
    questions: [
      {
        question: "¿Qué plan de internet necesito para trabajar desde casa?",
        answer: "Para teletrabajo necesitas mínimo 100 Mbps simétricos, idealmente 200+ Mbps si hay múltiples usuarios. Prioriza fibra óptica para estabilidad, ping bajo para videoconferencias, y velocidad de subida alta para enviar archivos grandes."
      },
      {
        question: "¿Cómo mejorar la calidad de las videoconferencias?",
        answer: "Usa conexión por cable ethernet, cierra aplicaciones que consuman internet, coloca el router cerca de tu área de trabajo, actualiza el firmware del router, y considera un plan con velocidad simétrica. La fibra óptica elimina la mayoría de problemas de videoconferencias."
      },
      {
        question: "¿Puedo deducir el internet del hogar en mi declaración de renta?",
        answer: "Sí, si trabajas desde casa puedes deducir un porcentaje del servicio de internet como gasto deducible. Consulta con un contador para determinar el porcentaje válido según tu situación laboral y mantén las facturas organizadas."
      }
    ]
  }
];

const categories = [
  "Velocidades y Planes",
  "Operadores", 
  "Instalación y Soporte",
  "Precios y Facturación",
  "Gaming y Streaming",
  "Teletrabajo"
];

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Schema.org FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqData.flatMap(category => 
              category.questions.map(qa => ({
                "@type": "Question",
                "name": qa.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": qa.answer
                }
              }))
            ),
            "about": {
              "@type": "Thing",
              "name": "Internet en Colombia",
              "description": "Servicios de internet, operadores y planes en Colombia"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Comparador Internet Colombia",
              "url": "https://comparadorinternet.co"
            }
          })
        }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 rounded-full">
                <HelpCircle size={48} className="text-yellow-400" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Preguntas <span className="text-yellow-400">Frecuentes</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Resuelve todas tus dudas sobre <strong>internet en Colombia</strong><br/>
              Respuestas de expertos • Actualizadas 2026 • 100% Confiables
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/calculadora" 
                className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Calculator size={24} />
                Calcular mi Velocidad
              </Link>
              <Link 
                href="/guia-completa" 
                className="bg-white text-blue-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <BookOpen size={24} />
                Ver Guía Completa
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
              <input
                type="text"
                placeholder="Busca tu pregunta aquí..."
                className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                id="faq-search"
              />
            </div>
            <p className="text-center text-gray-600 mt-4">
              <Lightbulb className="w-5 h-5 inline" /> <strong>Tip:</strong> Usa Ctrl+F para buscar rápidamente cualquier palabra clave
            </p>
          </div>
        </div>
      </section>

      {/* Categories Navigation */}
      <section className="py-8 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-black text-center mb-8">Navega por Categorías</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category, index) => (
                <a
                  key={index}
                  href={`#${category.toLowerCase().replace(/\s+/g, '-')}`}
                  className="bg-white p-4 rounded-lg text-center hover:bg-blue-50 transition-all shadow-sm hover:shadow-md border border-gray-200"
                >
                  <div className="font-bold text-sm text-gray-700 hover:text-blue-600">
                    {category}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {faqData.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-12">
                <h2 
                  id={category.category.toLowerCase().replace(/\s+/g, '-')}
                  className="text-3xl font-black mb-8 text-gray-900 border-b-4 border-blue-600 pb-4"
                >
                  {category.category}
                </h2>
                
                <div className="space-y-4">
                  {category.questions.map((qa, questionIndex) => (
                    <details 
                      key={questionIndex}
                      className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all group"
                    >
                      <summary className="p-6 cursor-pointer list-none flex items-center justify-between">
                        <h3 className="text-lg font-bold text-gray-900 pr-4 group-hover:text-blue-600 transition-colors">
                          {qa.question}
                        </h3>
                        <div className="flex-shrink-0">
                          <ChevronDown size={24} className="text-gray-500 group-hover:text-blue-600 group-open:hidden transition-colors" />
                          <ChevronUp size={24} className="text-gray-500 group-hover:text-blue-600 hidden group-open:block transition-colors" />
                        </div>
                      </summary>
                      
                      <div className="px-6 pb-6 border-t border-gray-100">
                        <div className="pt-4">
                          <p className="text-gray-700 leading-relaxed text-base">
                            {qa.answer}
                          </p>
                        </div>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Tools */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-black mb-8">
              ¿Necesitas Ayuda Personalizada?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Usa nuestras herramientas gratuitas o habla directamente con un experto
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <Link 
                href="/calculadora" 
                className="bg-white text-blue-700 p-6 rounded-xl hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Calculator size={48} className="mx-auto mb-4 text-blue-600" />
                <h3 className="font-bold text-lg mb-2">Calculadora</h3>
                <p className="text-gray-600 text-sm">Encuentra tu velocidad ideal en 30 segundos</p>
              </Link>

              <Link 
                href="/guia-completa" 
                className="bg-white text-blue-700 p-6 rounded-xl hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <BookOpen size={48} className="mx-auto mb-4 text-blue-600" />
                <h3 className="font-bold text-lg mb-2">Guía Completa</h3>
                <p className="text-gray-600 text-sm">Todo sobre internet en una sola página</p>
              </Link>

              <div className="bg-white text-blue-700 p-6 rounded-xl">
                <Phone size={48} className="mx-auto mb-4 text-blue-600" />
                <h3 className="font-bold text-lg mb-4">Asesoría Gratis</h3>
                <QuickCallForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-black mb-6">¿Aún tienes dudas?</h2>
            <p className="text-lg text-gray-700 mb-8">
              Si no encontraste la respuesta que buscabas, contáctanos directamente. 
              Respondemos en menos de 2 horas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://wa.me/573154645370?text=Hola%2C%20tengo%20una%20pregunta%20sobre%20internet%20que%20no%20encontré%20en%20el%20FAQ" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition-all shadow-lg hover:shadow-xl"
              >
                <MessageCircle className="w-5 h-5 inline" /> WhatsApp Directo
              </a>
              <Link 
                href="/empresa" 
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
              >
                <Phone className="w-5 h-5 inline" /> Llamada Programada
              </Link>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              ⏰ Respondemos: Lun-Vie 8AM-6PM, Sáb 9AM-2PM
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}