import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, CheckCircle2, Building2, Store, Home, Wifi, ShieldCheck, AlertTriangle } from 'lucide-react';
import QuickCallForm from '@/components/QuickCallForm';

export const metadata: Metadata = {
  title: 'Cobertura Internet Bogotá por Zonas 2026 | Norte, Sur y Occidente',
  description: '¿Cuál es el mejor internet en tu zona? Análisis por localidades: Suba, Kennedy, Chapinero, Usaquén, Engativá. Mapas de cobertura fibra óptica ETB, Claro, Movistar.',
  keywords: [
    'internet bogota norte',
    'internet bogota sur',
    'mejor internet suba',
    'internet fibra optica chapinero',
    'cobertura internet kennedy',
    'internet usaquen',
    'internet engativa',
    'cobertura etb bogota',
    'internet fontibon',
    'proveedores internet bogota por barrios'
  ],
  alternates: {
    canonical: 'https://comparadorinternet.co/internet-bogota-cobertura',
  },
  openGraph: {
    title: 'Mejor Internet en Bogotá por Localidades | Guía 2026',
    description: 'Descubre qué operador funciona mejor en tu barrio. Análisis detallado Norte, Sur, Occidente.',
    url: 'https://comparadorinternet.co/internet-bogota-cobertura',
    siteName: 'Comparador Internet Colombia',
    locale: 'es_CO',
    type: 'article',
  },
};

export default function BogotaZonasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Table',
            about: 'Cobertura de Internet en Bogotá por Localidad',
            description: 'Tabla comparativa del mejor operador de internet según la localidad en Bogotá'
          }),
        }}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
        {/* Hero */}
        <section className="bg-gradient-to-r from-blue-800 via-indigo-800 to-purple-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <MapPin className="w-5 h-5 text-yellow-300" />
                <span className="font-semibold">Cobertura Actualizada 2026</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                El Mejor Internet en Bogotá <br/>
                <span className="text-yellow-300">Según tu Ubicación</span>
              </h1>

              <p className="text-xl md:text-2xl text-blue-100 mb-8">
                La calidad del internet varía según el barrio. Te decimos cuál es la fibra óptica más estable en el Norte, Sur, Occidente y Centro.
              </p>

               <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 max-w-sm mx-auto shadow-xl mb-8">
                 <h2 className="text-white text-lg font-semibold mb-2">Verificar Cobertura Exacta</h2>
                 <p className="text-blue-100 text-sm mb-4">Ingresa tu dirección y te confirmamos viabilidad técnica.</p>
                 <QuickCallForm buttonColor="#2563eb" provider="Cobertura" />
              </div>

              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 max-w-3xl mx-auto">
                <div className="flex flex-wrap justify-center gap-4">
                  <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-semibold">📍 Norte: Usaquén - Suba</span>
                  <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-semibold">📍 Occidente: Engativá - Fontibón</span>
                  <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-semibold">📍 Sur: Kennedy - Bosa</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recomendación por Zona */}
        <section className="py-16 -mt-12 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                🏆 Mejor Operador por Zona
              </h2>
              <p className="text-xl text-gray-600">Basado en pruebas de velocidad y estabilidad 2025-2026</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Zona Norte */}
              <div className="bg-white rounded-xl shadow-xl overflow-hidden border-t-4 border-blue-500">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-blue-500" />
                    Zona Norte
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">Usaquén, Chapinero, Suba (Alta)</p>
                  
                  <div className="bg-blue-50 rounded-lg p-3 text-center mb-4">
                    <span className="block text-xs uppercase font-bold text-blue-600">Recomendado</span>
                    <span className="text-2xl font-black text-blue-800">ETB Fibra</span>
                  </div>
                  
                  <ul className="text-sm space-y-2 mb-4">
                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500"/> Mejor infraestructura subterránea</li>
                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500"/> Menor saturación en estratos 4-6</li>
                  </ul>
                  <Link href="/etb" className="block text-center text-blue-600 font-bold text-sm hover:underline">Ver planes ETB →</Link>
                </div>
              </div>

              {/* Zona Occidente */}
              <div className="bg-white rounded-xl shadow-xl overflow-hidden border-t-4 border-red-500">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <Home className="w-5 h-5 text-red-500" />
                    Zona Occidente
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">Engativá, Fontibón, Modelia</p>
                  
                  <div className="bg-red-50 rounded-lg p-3 text-center mb-4">
                    <span className="block text-xs uppercase font-bold text-red-600">Recomendado</span>
                    <span className="text-2xl font-black text-red-800">Claro / Movistar</span>
                  </div>
                  
                  <ul className="text-sm space-y-2 mb-4">
                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500"/> Claro tiene la red más extensa (HFC)</li>
                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500"/> Movistar está desplegando fibra nueva</li>
                  </ul>
                  <Link href="/claro" className="block text-center text-red-600 font-bold text-sm hover:underline">Ver planes Claro →</Link>
                </div>
              </div>

              {/* Zona Sur */}
              <div className="bg-white rounded-xl shadow-xl overflow-hidden border-t-4 border-green-500">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <Store className="w-5 h-5 text-green-500" />
                    Zona Sur
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">Kennedy, Bosa, Ciudad Bolívar</p>
                  
                  <div className="bg-green-50 rounded-lg p-3 text-center mb-4">
                    <span className="block text-xs uppercase font-bold text-green-600">Recomendado</span>
                    <span className="text-2xl font-black text-green-800">Movistar Fibra</span>
                  </div>
                  
                  <ul className="text-sm space-y-2 mb-4">
                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500"/> Gran inversión en fibra nueva al sur</li>
                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500"/> Precios más competitivos ($46k)</li>
                  </ul>
                  <Link href="/movistar" className="block text-center text-green-600 font-bold text-sm hover:underline">Ver planes Movistar →</Link>
                </div>
              </div>

              {/* Centro / Chapinero */}
              <div className="bg-white rounded-xl shadow-xl overflow-hidden border-t-4 border-purple-500">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-purple-500" />
                    Centro / Empresarial
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">La Candelaria, Teusaquillo, Centro Int.</p>
                  
                  <div className="bg-purple-50 rounded-lg p-3 text-center mb-4">
                    <span className="block text-xs uppercase font-bold text-purple-600">Recomendado</span>
                    <span className="text-2xl font-black text-purple-800">ETB Fibra</span>
                  </div>
                  
                  <ul className="text-sm space-y-2 mb-4">
                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500"/> Red antigua de cobre reemplazada</li>
                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500"/> Alta estabilidad para oficinas</li>
                  </ul>
                  <Link href="/etb" className="block text-center text-purple-600 font-bold text-sm hover:underline">Ver planes ETB →</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tabla Detallada por Barrios */}
        <section className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">📍 Detalle por Localidad Principal</h2>
                </div>

                <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-4 font-bold text-gray-700 border-b">Localidad</th>
                                <th className="p-4 font-bold text-gray-700 border-b">Mejor Opción</th>
                                <th className="p-4 font-bold text-gray-700 border-b hidden md:table-cell">Tecnología Predominante</th>
                                <th className="p-4 font-bold text-gray-700 border-b hidden md:table-cell">Comentarios</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            <tr className="hover:bg-gray-50">
                                <td className="p-4 font-semibold">1. Usaquén</td>
                                <td className="p-4 text-blue-600 font-bold">ETB / Claro</td>
                                <td className="p-4 text-gray-600 hidden md:table-cell">Fibra Óptica FTTH</td>
                                <td className="p-4 text-sm text-gray-500 hidden md:table-cell">Excelente cobertura de ambos. ETB mejor subida.</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="p-4 font-semibold">2. Chapinero</td>
                                <td className="p-4 text-blue-600 font-bold">ETB</td>
                                <td className="p-4 text-gray-600 hidden md:table-cell">Fibra Óptica FTTH</td>
                                <td className="p-4 text-sm text-gray-500 hidden md:table-cell">Zona histórica de ETB. Muy estable.</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="p-4 font-semibold">11. Suba</td>
                                <td className="p-4 text-green-600 font-bold">Movistar / ETB</td>
                                <td className="p-4 text-gray-600 hidden md:table-cell">Fibra (Zonas Altas) / Cobre (Antiguo)</td>
                                <td className="p-4 text-sm text-gray-500 hidden md:table-cell">Revisar dirección exacta. Movistar ha modernizado mucho.</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="p-4 font-semibold">10. Engativá</td>
                                <td className="p-4 text-red-600 font-bold">Claro</td>
                                <td className="p-4 text-gray-600 hidden md:table-cell">HFC (Híbrido Fibra Coaxial)</td>
                                <td className="p-4 text-sm text-gray-500 hidden md:table-cell">Claro domina en conjuntos residenciales grandes.</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="p-4 font-semibold">8. Kennedy</td>
                                <td className="p-4 text-green-600 font-bold">Movistar</td>
                                <td className="p-4 text-gray-600 hidden md:table-cell">Fibra Óptica FTTH</td>
                                <td className="p-4 text-sm text-gray-500 hidden md:table-cell">Movistar ofrece los mejores precios y velocidad aquí.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="mt-8 bg-yellow-50 border border-yellow-200 p-4 rounded-lg flex gap-4 items-start">
                    <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                    <div>
                        <h4 className="font-bold text-yellow-900">Importante sobre la cobertura</h4>
                        <p className="text-sm text-yellow-800">
                            Aunque tu barrio tenga cobertura de un operador, puede que tu edificio específico no tenga la "caja de paso" o permisos de administración. Siempre verifica con tu dirección exacta antes de contratar.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        {/* CTA General */}
        <section className="py-16 bg-gradient-to-r from-blue-800 via-indigo-800 to-purple-800 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Wifi className="w-16 h-16 mx-auto mb-6 opacity-80" />

            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿No sabes qué cobertura llega a tu casa?
            </h2>

            <p className="text-xl text-blue-100 mb-8">
              Déjanos asesorarte. Verificamos la cobertura exacta en tu dirección con todos los operadores para decirte cuál es la mejor opción.
            </p>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md mx-auto mb-8">
              <QuickCallForm provider="Cobertura Bogota" />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
                <Link href="/planes" className="text-white underline hover:text-blue-200">Ver todos los planes</Link>
                <Link href="/etb" className="text-white underline hover:text-blue-200">Cobertura ETB</Link>
                <Link href="/movistar" className="text-white underline hover:text-blue-200">Cobertura Movistar</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
