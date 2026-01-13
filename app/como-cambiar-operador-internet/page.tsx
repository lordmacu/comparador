import type { Metadata } from 'next';
import Link from 'next/link';
import { RefreshCw, PhoneForwarded, XCircle, CheckCircle2, ShieldOff, Clock } from 'lucide-react';
import QuickCallForm from '@/components/QuickCallForm';

export const metadata: Metadata = {
  title: 'Cómo Cambiar de Operador de Internet 2026 | Guía Portabilidad',
  description: '¿Harto de tu internet actual? Guía paso a paso para cancelar Claro, Movistar o ETB sin multas y cambiarte al mejor postor. Tips de retención y paz y salvo.',
  keywords: [
    'cambiar operador internet',
    'cancelar internet claro',
    'como cancelar etb',
    'retencion movistar',
    'portabilidad internet hogar',
    'cambiar de claro a movistar',
    'carta cancelacion internet',
    'paz y salvo internet',
    'multa por cancelar internet'
  ],
  alternates: {
    canonical: 'https://comparadorinternet.co/como-cambiar-operador-internet',
  },
  openGraph: {
    title: 'Guía para Cambiar de Operador de Internet (Sin Dolor de Cabeza)',
    description: 'Basta de mal servicio. Aprende a cancelar tu contrato actual y contratar uno mejor sin quedarte desconectado.',
    url: 'https://comparadorinternet.co/como-cambiar-operador-internet',
    siteName: 'Comparador Internet Colombia',
    locale: 'es_CO',
    type: 'article',
  },
};

export default function CambiarOperadorPage() {
  return (
    <>
      <div className="min-h-screen bg-slate-50">
        {/* Hero */}
        <section className="bg-slate-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/50 text-red-100 px-4 py-2 rounded-full mb-6">
                <XCircle className="w-5 h-5" />
                <span className="font-semibold">¿Harto de tu internet actual?</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Cómo Cambiar de Operador <br/>
                <span className="text-blue-400">Sin Perder la Conexión</span>
              </h1>

              <p className="text-xl md:text-2xl text-slate-300 mb-8">
                Guía definitiva para cancelar tu servicio actual sin traumas y conseguir una mejor oferta en el proceso.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                 <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 w-40">
                    <span className="block text-3xl font-bold text-white mb-1">10</span>
                    <span className="text-sm text-slate-400">Días antes de corte</span>
                 </div>
                 <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 w-40">
                    <span className="block text-3xl font-bold text-white mb-1">$0</span>
                    <span className="text-sm text-slate-400">Multas (si sabes cómo)</span>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* El Miedo al Cambio */}
        <section className="py-16 bg-white">
             <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="prose prose-lg mx-auto text-gray-600">
                    <p>
                        Sabemos que da pereza. Llamar al call center, esperar 30 minutos, que intenten convencerte de quedarte, devolver los equipos... 
                        Pero quedarse con un mal servicio es peor. Sigue estos <strong>3 pasos maestros</strong> para hacer el cambio como un profesional.
                    </p>
                </div>
            </div>
        </section>

        {/* Pasos */}
        <section className="py-12 bg-slate-50">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                
                {/* Paso 1 */}
                <div className="bg-white rounded-2xl p-8 shadow-sm flex flex-col md:flex-row gap-8 items-start border-l-8 border-blue-500">
                    <div className="flex-shrink-0 bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold text-blue-600">1</div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Revisa tu Permanencia y Corte</h3>
                        <p className="text-gray-600 mb-4">
                            Lo primero es saber si eres libre. Revisa tu factura o llama.
                        </p>
                        <ul className="space-y-2">
                            <li className="flex items-start gap-2 text-sm text-gray-700">
                                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                                <span>Si llevas más de 12 meses, <strong>eres libre</strong>. No pueden cobrarte multa.</span>
                            </li>
                            <li className="flex items-start gap-2 text-sm text-gray-700">
                                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                                <span>Revisa tu <strong>fecha de corte</strong>. Debes cancelar al menos 3 días hábiles ANTES del corte para que no te cobren el siguiente mes completo.</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Paso 2 */}
                <div className="bg-white rounded-2xl p-8 shadow-sm flex flex-col md:flex-row gap-8 items-start border-l-8 border-yellow-500">
                    <div className="flex-shrink-0 bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold text-yellow-600">2</div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Contrata el Nuevo PRIMERO</h3>
                        <p className="text-gray-600 mb-4">
                            El error novato #1: Cancelar antes de tener el nuevo instalado.
                        </p>
                        <div className="bg-yellow-50 p-4 rounded-lg text-yellow-800 text-sm font-medium mb-4">
                            Regla de Oro: No canceles tu internet viejo hasta que el técnico del nuevo operador haya salido de tu casa y hayas verificado que el WiFi funciona.
                        </div>
                        <p className="text-sm text-gray-600">
                            Así evitas quedarte desconectado si la instalación nueva se retrasa o hay problemas técnicos en tu edificio.
                        </p>
                         <div className="mt-4">
                            <Link href="/planes" className="text-blue-600 font-bold hover:underline">Buscar nuevo operador ahora →</Link>
                        </div>
                    </div>
                </div>

                {/* Paso 3 */}
                <div className="bg-white rounded-2xl p-8 shadow-sm flex flex-col md:flex-row gap-8 items-start border-l-8 border-red-500">
                    <div className="flex-shrink-0 bg-red-100 w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold text-red-600">3</div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">La Falacia de "Retención"</h3>
                        <p className="text-gray-600 mb-4">
                            Cuando llames a cancelar, te pasarán al área de "Fidelización". Te ofrecerán el cielo y la tierra.
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-green-50 p-3 rounded text-sm text-green-800">
                                <strong>Si aceptas la oferta:</strong> Exige que te envíen las condiciones por email. Cuidado con nuevas cláusulas de permanencia.
                            </div>
                            <div className="bg-red-50 p-3 rounded text-sm text-red-800">
                                <strong>Si te vas:</strong> Sé firme. "Ya contraté con otro operador, solo quiero cancelar". Pide el número de radicado de cancelación.
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <RefreshCw className="w-16 h-16 mx-auto mb-6 text-blue-400" />

            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Listo para el cambio?
            </h2>

            <p className="text-xl text-slate-300 mb-8">
              Encontramos una oferta mejor para ti. Deja tus datos y te ayudamos a coordinar la instalación de tu nuevo proveedor.
            </p>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md mx-auto mb-8">
              <QuickCallForm provider="Cambio Operador" />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
