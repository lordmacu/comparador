import type { Metadata } from 'next';
import Link from 'next/link';
import { Unlock, CalendarOff, AlertCircle, ShoppingCart, CheckCircle2, TrendingUp, XCircle } from 'lucide-react';
import QuickCallForm from '@/components/QuickCallForm';

export const metadata: Metadata = {
  title: 'Internet Sin Permanencia Colombia | Sin Cláusulas de Contrato',
  description: 'Contrata internet sin cláusulas de permanencia. Cancela cuando quieras sin multas. Planes ETB sin contrato y opciones prepago. Libertad total.',
  keywords: [
    'internet sin permanencia',
    'internet sin contrato',
    'internet sin clausula permanencia',
    'etb sin permanencia',
    'internet prepago colombia',
    'internet mes a mes',
    'internet hogar sin contrato',
    'cancelar internet sin multa',
    'planes internet flexibles'
  ],
  alternates: {
    canonical: 'https://comparadorinternet.co/internet-sin-permanencia',
  },
  openGraph: {
    title: 'Internet Sin Permanencia | Libertad Total para tu Hogar',
    description: 'No te amarres a un contrato de 12 meses. Encuentra planes que puedes cancelar cuando quieras.',
    url: 'https://comparadorinternet.co/internet-sin-permanencia',
    siteName: 'Comparador Internet Colombia',
    locale: 'es_CO',
    type: 'article',
  },
};

export default function SinPermanenciaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: '¿Qué operadores ofrecen internet sin permanencia?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'ETB ofrece la mayoría de sus planes de fibra óptica sin cláusula de permanencia, aunque puede cobrar la instalación si cancelas antes de 12 meses. Directv ofrece internet prepago sin facturas mensuales.'
                }
              },
              {
                '@type': 'Question',
                name: '¿Es más caro el internet sin permanencia?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'A veces sí. Las promociones agresivas (descuentos del 50%, meses gratis) suelen estar atadas a firmar una permanencia de 12 meses. Sin permanencia pagas la tarifa plena o costos de instalación.'
                }
              }
            ]
          }),
        }}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50">
        {/* Hero */}
        <section className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Unlock className="w-5 h-5" />
                <span className="font-semibold">Libertad Total</span>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Internet <span className="underline decoration-wavy decoration-white/30">Sin Cláusulas</span> de Permanencia
              </h1>

              <p className="text-xl md:text-2xl text-orange-100 mb-8">
                Contrata tu servicio sin amarrarte 12 meses. Ideal para estudiantes, arrendamientos cortos o si simplemente valoras tu libertad.
              </p>

              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 max-w-2xl mx-auto">
                <div className="flex justify-around items-center text-center">
                    <div>
                        <div className="text-4xl font-black mb-1 flex justify-center"><CalendarOff size={40} /></div>
                        <div className="text-sm font-bold text-orange-100">Sin Contratos 12 Meses</div>
                    </div>
                    <div className="w-px h-12 bg-white/30"></div>
                     <div>
                        <div className="text-4xl font-black mb-1 flex justify-center"><XCircle size={40} /></div>
                        <div className="text-sm font-bold text-orange-100">Sin Multas</div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Realidad del Mercado */}
        <section className="py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-2xl shadow-xl p-8 border-l-8 border-orange-500">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <AlertCircle className="w-6 h-6 text-orange-500" />
                        La Verdad sobre la "Permanencia"
                    </h2>
                    <p className="text-gray-700 mb-4">
                        Por ley en Colombia (CRC), las cláusulas de permanencia mínima están reguladas. Sin embargo, los operadores las aplican legalmente a través de <strong>beneficios condicionados</strong>.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                        <div className="bg-red-50 p-4 rounded-lg">
                            <h3 className="font-bold text-red-800 mb-2">Con Permanencia</h3>
                            <ul className="text-sm text-red-700 space-y-2">
                                <li>✅ Instalación GRATIS ($0)</li>
                                <li>✅ Meses de descuento (Ejs: compra ahora paga marzo)</li>
                                <li>✅ Mayor velocidad promocional</li>
                                <li>❌ Multa si cancelas antes de 12 meses</li>
                            </ul>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                            <h3 className="font-bold text-green-800 mb-2">Sin Permanencia</h3>
                            <ul className="text-sm text-green-700 space-y-2">
                                <li>✅ Cancelas cuando quieras sin multa</li>
                                <li>✅ No tienes "deuda" pendiente</li>
                                <li>❌ Pagas costo de instalación (aprox $50k-$150k)</li>
                                <li>❌ No accedes a ciertas promociones</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Mejor Opción Actual */}
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900">🏆 Mejor Opción Sin Permanencia 2026</h2>
                </div>

                <div className="max-w-md mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-blue-600 relative">
                     <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">RECOMENDADO</div>
                    <div className="p-8 text-center">
                        <img src="/images/etb-logo.png" alt="ETB Logo" className="h-12 mx-auto mb-4 object-contain" />
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">ETB Fibra Óptica</h3>
                        <p className="text-gray-600 mb-6">El único operador masivo que promueve activamente planes sin ataduras.</p>
                        
                        <div className="bg-gray-100 rounded-lg p-4 mb-6">
                            <div className="text-4xl font-black text-blue-600 mb-1">$42.000</div>
                            <div className="text-sm text-gray-500">Precio mensual / 300 Megas</div>
                        </div>

                        <ul className="text-left space-y-3 mb-8">
                            <li className="flex items-start gap-2 text-sm text-gray-700">
                                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                                <span><strong>Sin cláusula de permanencia</strong> explícita en contrato estándar.</span>
                            </li>
                            <li className="flex items-start gap-2 text-sm text-gray-700">
                                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                                <span>Libertad de cancelar notificando con antelación.</span>
                            </li>
                            <li className="flex items-start gap-2 text-sm text-gray-700">
                                <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0" />
                                <span>*Ojo: Si aceptas beneficios extras (como TV incluída o instalación $0) podrías activar una permanencia. <strong>Pregunta siempre al asesor.</strong></span>
                            </li>
                        </ul>

                        <Link href="/etb" className="block w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors">
                            Ver Planes ETB Sin Permanencia
                        </Link>
                    </div>
                </div>
            </div>
        </section>

        {/* CTA Consulta */}
        <section className="py-16 bg-gradient-to-r from-orange-600 to-red-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Quieres confirmar qué plan no tiene multas?
            </h2>
            <p className="text-xl text-orange-100 mb-8">
              La letra pequeña cambia mes a mes. Llámanos y te decimos en tiempo real cuál plan te da libertad total hoy.
            </p>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md mx-auto mb-8">
              <QuickCallForm provider="Sin Permanencia" />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
