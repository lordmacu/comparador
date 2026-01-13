import type { Metadata } from 'next';
import Link from 'next/link';
import { Building2, Key, ShieldCheck, HardHat, FileText, CheckCircle2 } from 'lucide-react';
import QuickCallForm from '@/components/QuickCallForm';

export const metadata: Metadata = {
  title: 'Internet para Edificios y Conjuntos Bogotá 2026 | Guía Instalación',
  description: '¿Vives en propiedad horizontal? Conoce qué operadores tienen permiso en tu edificio. Internet para apartamentos, permisos de administración y cableado oculto.',
  keywords: [
    'internet edificios bogota',
    'internet conjuntos residenciales',
    'permisos instalacion internet administracion',
    'internet fibra optica apartamentos',
    'cableado estructurado edificios',
    'claro edificios bogota',
    'etb propiedad horizontal'
  ],
  alternates: {
    canonical: 'https://comparadorinternet.co/internet-edificios-bogota',
  },
  openGraph: {
    title: 'Internet e Instalación en Edificios 2026',
    description: 'Evita multas y problemas con la administración. Guía de instalación.',
    url: 'https://comparadorinternet.co/internet-edificios-bogota',
    siteName: 'Comparador Internet Colombia',
    locale: 'es_CO',
    type: 'article',
  },
};

export default function InternetEdificiosPage() {
  return (
    <>
       <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Internet en Propiedad Horizontal: Guía de Instalación',
            description: 'Derechos de los usuarios en conjuntos residenciales y permisos de instalación.',
            author: {
                '@type': 'Organization',
                name: 'Comparador Internet Colombia'
            }
          }),
        }}
      />
       <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
          __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
              {
                  "@type": "Question",
                  "name": "¿La administración puede prohibirme instalar otro internet?",
                  "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "NO. Según la CRC (Comisión de Regulación de Comunicaciones), existe la libre elección. La administración NO puede firmar contratos de exclusividad ni prohibir el ingreso de otros operadores, siempre que utilicen la infraestructura existente o ductos disponibles."
                  }
              },
              {
                  "@type": "Question",
                  "name": "¿Se puede pasar cable por la fachada?",
                  "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Generalmente NO. Los reglamentos de Propiedad Horizontal prohíben alterar fachadas. La instalación debe ir por los ductos internos (shut de basuras o ductos de telecomunicaciones)."
                  }
              }
              ]
          })
          }}
      />

      <div className="min-h-screen bg-slate-50">
        {/* Hero */}
        <section className="bg-slate-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="max-w-2xl">
                    <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 px-4 py-1 rounded-full text-sm font-semibold mb-6">
                        <Building2 className="w-4 h-4"/> Propiedad Horizontal
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                        Internet para <br/> Apartamentos y Conjuntos
                    </h1>
                    <p className="text-xl text-slate-300 mb-8">
                        ¿Problemas con la administración? ¿Ductos tapados? Te ayudamos a instalar el servicio en tu edificio sin romper normas.
                    </p>
                    <div className="flex gap-4">
                        <Link href="#cobertura-edificios" className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-6 rounded-lg transition-colors shadow-lg">
                            Consultar Cobertura
                        </Link>
                         <Link href="#permisos" className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                            Tema Permisos
                        </Link>
                    </div>
                </div>
                 <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm max-w-sm w-full">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <Key className="w-5 h-5 text-yellow-500"/>
                        ¿Edificio Antiguo?
                    </h3>
                    <p className="text-sm text-slate-400 mb-6">
                        Muchos edificios viejos en Bogotá no tienen ductería para Fibra Óptica. Cuéntanos tu caso y te decimos qué operador sí llega.
                    </p>
                    <QuickCallForm provider="Edificios Consulta" />
                </div>
            </div>
          </div>
        </section>

        {/* Problemas Comunes */}
        <section id="permisos" className="py-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                 <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Desafíos en Propiedad Horizontal</h2>
                 
                 <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                            <ShieldCheck className="w-6 h-6 text-red-600"/>
                        </div>
                        <h3 className="font-bold text-lg mb-2 text-slate-900">Exclusividad Ilegal</h3>
                        <p className="text-slate-600 text-sm">
                            Algunos administradores dicen "Aquí solo entra Claro/ETB". <strong>Esto es ilegal.</strong> Tienes derecho a la libre elección según la CRC.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                            <HardHat className="w-6 h-6 text-blue-600"/>
                        </div>
                        <h3 className="font-bold text-lg mb-2 text-slate-900">Ductería Obstruida</h3>
                        <p className="text-slate-600 text-sm">
                            Si el edificio es antiguo, los ductos pueden estar llenos de cables viejos (cobre). La fibra óptica es delgada y suele pasar más fácil.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                            <FileText className="w-6 h-6 text-green-600"/>
                        </div>
                        <h3 className="font-bold text-lg mb-2 text-slate-900">Permisos por Escrito</h3>
                        <p className="text-slate-600 text-sm">
                            Los técnicos necesitan autorización para entrar a los gabinetes (shuts). Debes gestionar esto con la administración antes de la visita.
                        </p>
                    </div>
                 </div>
            </div>
        </section>

        {/* Recomendaciones */}
        <section id="cobertura-edificios" className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">¿Cuál operador entra más fácil?</h2>
                <div className="space-y-4">
                    <Link href="/planes-etb-bogota" className="block group">
                        <div className="flex items-center justify-between p-6 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">E</div>
                                <div>
                                    <h4 className="font-bold text-lg group-hover:text-blue-700">ETB (Empresa de Teléfonos de Bogotá)</h4>
                                    <p className="text-sm text-slate-500">Al ser la empresa histórica, tiene la mejor infraestructura heredada en edificios viejos (cajas y ductos).</p>
                                </div>
                            </div>
                            <CheckCircle2 className="w-6 h-6 text-slate-300 group-hover:text-blue-500"/>
                        </div>
                    </Link>

                     <Link href="/planes-claro-colombia" className="block group">
                        <div className="flex items-center justify-between p-6 rounded-xl border border-slate-200 hover:border-red-500 hover:bg-red-50 transition-all">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 bg-red-100 rounded-full flex items-center justify-center font-bold text-red-600">C</div>
                                <div>
                                    <h4 className="font-bold text-lg group-hover:text-red-700">Claro Hogar</h4>
                                    <p className="text-sm text-slate-500">Excelente cobertura en conjuntos nuevos y grandes desarrollos urbanísticos.</p>
                                </div>
                            </div>
                            <CheckCircle2 className="w-6 h-6 text-slate-300 group-hover:text-red-500"/>
                        </div>
                    </Link>
                </div>

                <div className="mt-8 bg-yellow-50 border border-yellow-200 p-4 rounded-lg text-sm text-yellow-800">
                    <strong>Consejo Pro:</strong> Si vives en un primer piso o casa interna, pregunta por instalación de "acometida externa" si los ductos internos están rotos.
                </div>
            </div>
        </section>

         {/* CTA */}
         <section className="py-16 bg-slate-900 text-white text-center">
            <div className="max-w-2xl mx-auto px-4">
                <h2 className="text-3xl font-bold mb-4">¿Dudas de cobertura en tu conjunto?</h2>
                <p className="mb-8 text-slate-400">Verificamos la dirección exacta y te decimos qué "caja" (NAP) tiene disponibilidad de puertos en tu edificio.</p>
                 <div className="bg-white rounded-2xl p-8 max-w-sm mx-auto shadow-2xl">
                     <p className="font-bold text-lg mb-4 text-slate-900">Consulta Gratis Aquí</p>
                    <QuickCallForm provider="Consulta Edificios" />
                </div>
            </div>
        </section>
      </div>
    </>
  );
}
