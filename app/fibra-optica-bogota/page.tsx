import type { Metadata } from 'next';
import Link from 'next/link';
import { Zap, Activity, Cable, RotateCw, MonitorPlay, Wifi } from 'lucide-react';
import QuickCallForm from '@/components/QuickCallForm';

export const metadata: Metadata = {
  title: 'Fibra Óptica Bogotá 2026 | FTTH vs HFC (Diferencias)',
  description: '¿Qué es mejor Fibra Óptica o Cable Coaxial? Análisis de ETB, Movistar (Fibra) vs Claro (HFC). La verdad sobre la velocidad simétrica y el ping en juegos.',
  keywords: [
    'fibra optica bogota',
    'cobertura fibra optica',
    'diferencia fibra y cobre',
    'hfc vs ftth',
    'internet mas rapido bogota',
    'fibra optica etb',
    'fibra optica movistar',
    'claro fibra optica o cobre',
    'internet simetrico bogota'
  ],
  alternates: {
    canonical: 'https://comparadorinternet.co/fibra-optica-bogota',
  },
  openGraph: {
    title: 'Fibra Óptica vs Cobre: La Batalla Final en Bogotá',
    description: 'No te dejes engañar. Aprende a identificar si te están vendiendo Fibra Real (FTTH) o cable viejo disfrazado.',
    url: 'https://comparadorinternet.co/fibra-optica-bogota',
    siteName: 'Comparador Internet Colombia',
    locale: 'es_CO',
    type: 'article',
  },
};

export default function FibraOpticaPage() {
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Hero */}
        <section className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white py-20 relative overflow-hidden">
             <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #fff 10px, #fff 11px)'}}></div>
             
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Cable className="w-5 h-5 text-cyan-200" />
                <span className="font-semibold text-cyan-50">Tecnología FTTH</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-7xl font-black mb-6 leading-tight tracking-tight">
                FIBRA ÓPTICA <br/> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-white">VS</span> COBRE
              </h1>

              <p className="text-xl md:text-2xl text-cyan-100 mb-8 max-w-2xl mx-auto">
                ¿Te vendieron "Fibra" pero tu internet sigue lento? Te explicamos la diferencia vital entre <strong>FTTH</strong> (Fibra Real) y <strong>HFC</strong> (Híbrido).
              </p>

              <div className="flex justify-center gap-8 text-center mt-12 mb-12">
                <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/20 hover:scale-105 transition-transform">
                    <div className="text-4xl font-black mb-2 flex items-center justify-center gap-2">
                         <Zap className="fill-yellow-400 text-yellow-400" /> 10x
                    </div>
                    <div className="text-sm font-semibold uppercase tracking-wider">Más Rápido</div>
                </div>
                 <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/20 hover:scale-105 transition-transform">
                    <div className="text-4xl font-black mb-2 flex items-center justify-center gap-2">
                         <Activity className="text-green-400" /> 2ms
                    </div>
                    <div className="text-sm font-semibold uppercase tracking-wider">Menor Latencia</div>
                </div>
              </div>

               <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 max-w-sm mx-auto shadow-xl">
                 <h2 className="text-white text-lg font-semibold mb-2">¿Quieres Fibra Óptica Real?</h2>
                 <p className="text-cyan-100 text-sm mb-4">Verificamos si llega FTTH a tu dirección.</p>
                 <QuickCallForm buttonColor="#0891b2" provider="Fibra" />
              </div>
            </div>
          </div>
        </section>

        {/* La Gran Diferencia */}
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">El Secreto de la Simetría</h2>
                        <div className="prose text-gray-600 mb-8">
                            <p className="text-lg">
                                La mayor ventaja de la Fibra Óptica (FTTH) no es solo la velocidad de bajada (descargar cosas), sino la <strong>velocidad de subida</strong> (enviar cosas).
                            </p>
                            <p>
                                Mientras que el cable tradicional (HFC) te da 300 Megas de bajada pero solo 30 de subida, la Fibra Óptica pura te da 300 de bajada y <strong>300 de subida</strong>.
                            </p>
                            <p className="font-bold text-blue-600">
                                Esto es crucial para: Videollamadas HD, subir archivos a la nube, gaming online y streaming.
                            </p>
                        </div>
                    </div>
                    <div className="bg-gray-100 p-8 rounded-3xl relative">
                        {/* Gráfica Visual */}
                        <div className="space-y-8">
                            {/* FTTH */}
                            <div>
                                <div className="flex justify-between mb-2">
                                    <span className="font-bold text-blue-600 flex items-center gap-2"><Wifi /> Fibra Óptica (ETB/Movistar)</span>
                                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Simétrico</span>
                                </div>
                                <div className="h-4 bg-gray-200 rounded-full overflow-hidden flex">
                                    <div className="w-1/2 bg-blue-500 h-full"></div>
                                    <div className="w-1/2 bg-blue-400 h-full"></div>
                                </div>
                                <div className="flex justify-between text-xs text-gray-500 mt-1 px-1">
                                    <span>Bajada: 300 Mbps</span>
                                    <span>Subida: 300 Mbps</span>
                                </div>
                            </div>
                            
                            {/* HFC */}
                            <div className="opacity-70">
                                <div className="flex justify-between mb-2">
                                    <span className="font-bold text-red-600 flex items-center gap-2"><Cable /> Cobre/HFC (Tradicional)</span>
                                    <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Asimétrico</span>
                                </div>
                                <div className="h-4 bg-gray-200 rounded-full overflow-hidden flex">
                                    <div className="w-1/2 bg-red-500 h-full"></div>
                                    <div className="w-[5%] bg-red-300 h-full"></div>
                                </div>
                                <div className="flex justify-between text-xs text-gray-500 mt-1 px-1">
                                    <span>Bajada: 300 Mbps</span>
                                    <span>Subida: 30 Mbps</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        {/* Tabla Comparativa Operadores */}
        <section className="py-20 bg-gray-50">
             <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">¿Quién tiene Fibra Real en Bogotá?</h2>
                    <p className="text-gray-600">Análisis técnico de la infraestructura de los principales operadores.</p>
                </div>
                
                <div className="overflow-hidden rounded-xl shadow-xl border border-gray-200 bg-white">
                    <table className="w-full text-left">
                        <thead className="bg-gray-900 text-white">
                            <tr>
                                <th className="p-4">Operador</th>
                                <th className="p-4">Tecnología Principal</th>
                                <th className="p-4">Simetría</th>
                                <th className="p-4">Veredicto</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                             <tr className="hover:bg-blue-50/50">
                                <td className="p-4 font-bold flex items-center gap-2">
                                     <img src="/images/etb-logo.png" alt="ETB" className="h-6 w-auto" /> ETB
                                </td>
                                <td className="p-4"><span className="text-green-600 font-bold">100% Fibra (FTTH)</span></td>
                                <td className="p-4 text-sm">✅ Sí, en todos los planes</td>
                                <td className="p-4 text-sm text-green-700 font-medium">Excelente. La red más pura en Bogotá.</td>
                            </tr>
                            <tr className="hover:bg-blue-50/50">
                                <td className="p-4 font-bold flex items-center gap-2">
                                     <img src="/images/movistar-logo.png" alt="Movistar" className="h-6 w-auto" /> Movistar
                                </td>
                                <td className="p-4"><span className="text-green-600 font-bold">Fibra (FTTH)</span></td>
                                <td className="p-4 text-sm">✅ Sí, planes Fibra</td>
                                <td className="p-4 text-sm text-green-700 font-medium">Muy buena. Gran expansión reciente.</td>
                            </tr>
                            <tr className="hover:bg-red-50/50">
                                <td className="p-4 font-bold flex items-center gap-2">
                                     <img src="/images/claro-logo.png" alt="Claro" className="h-6 w-auto" /> Claro
                                </td>
                                <td className="p-4"><span className="text-orange-600 font-bold">Híbrido (HFC)</span> / Fibra</td>
                                <td className="p-4 text-sm">⚠️ Depende zona (Mayoría NO)</td>
                                <td className="p-4 text-sm text-orange-700 font-medium">Mayoría es cable coaxial. Preguntar cobertura Fibra.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
             </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-cyan-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              ¿Quieres Fibra Óptica REAL?
            </h2>

            <p className="text-xl text-cyan-200 mb-10">
              Verificamos en tu dirección qué operadores llegan con fibra pura hasta tu casa (FTTH) para que no pagues por tecnología vieja.
            </p>

            <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 max-w-lg mx-auto border border-white/10">
              <QuickCallForm provider="Fibra Optica" />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
