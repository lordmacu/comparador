import type { Metadata } from 'next';
import Link from 'next/link';
import { Gamepad2, Zap, Timer, Globe, CheckCircle2, XCircle } from 'lucide-react';
import QuickCallForm from '@/components/QuickCallForm';

export const metadata: Metadata = {
  title: 'El Mejor Internet Gamer Bogotá 2026 | Ping Bajo y Simetría',
  description: 'Ranking del mejor internet para jugar online en Bogotá (LoL, Valorant, CoD). Comparativa de latencia (Ping) de Claro, ETB y Movistar. Planes fibra óptica gaming.',
  keywords: [
    'mejor internet gaming bogota',
    'internet para gamers colombia',
    'etb gaming 900 megas',
    'latencia internet bogota',
    'ping bajo lol colombia',
    'internet simetrico juegos',
    'mejor operador para gaming'
  ],
  alternates: {
    canonical: 'https://comparadorinternet.co/internet-gaming-bogota',
  },
  openGraph: {
    title: 'Top Internet Gamer Bogotá 2026 | Adiós al LAG',
    description: '¿Cuál es el mejor internet para jugar en Bogotá? Análisis de Ping y Jitter.',
    url: 'https://comparadorinternet.co/internet-gaming-bogota',
    siteName: 'Comparador Internet Colombia',
    locale: 'es_CO',
    type: 'article',
  },
};

export default function InternetGamingPage() {
  return (
    <>
       <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'El Mejor Internet para Gaming en Bogotá (2026)',
            description: 'Guía definitiva para elegir internet gamer en Colombia. Análisis de latencia y estabilidad.',
            author: {
                '@type': 'Organization',
                name: 'Comparador Internet Colombia'
            },
            publisher: {
                '@type': 'Organization',
                name: 'Comparador Internet Colombia',
                logo: {
                    '@type': 'ImageObject',
                    url: 'https://comparadorinternet.co/logo.png'
                }
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
                  "name": "¿Qué velocidad necesito para jugar online?",
                  "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Para jugar necesitas mínimo 50 Megas, pero lo más importante NO es la velocidad, sino la latencia (ping) y la estabilidad. Busca fibra óptica simétrica."
                  }
              },
              {
                  "@type": "Question",
                  "name": "¿Cuál es el mejor operador para gaming en Bogotá?",
                  "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "ETB y Movistar Fibra suelen ofrecer el mejor ping (entre 5ms y 20ms localmente) gracias a su red 100% fibra óptica pura hasta el hogar (FTTH)."
                  }
              },
               {
                  "@type": "Question",
                  "name": "¿Cómo bajar el ping en juegos?",
                  "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "1. Usa cable Ethernet (CAT6), nunca WiFi. 2. Cierra descargas en segundo plano. 3. Contrata un proveedor con rutas directas como ETB o Movistar."
                  }
              }
              ]
          })
          }}
      />

      <div className="min-h-screen bg-slate-950 text-slate-200">
        {/* Hero Gamer */}
        <section className="relative py-20 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <div className="inline-flex items-center gap-2 bg-purple-900/50 border border-purple-500/30 backdrop-blur-md px-4 py-1 rounded-full text-purple-200 text-sm font-bold mb-6">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    Edición Gamer 2026
                </div>
                <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight text-white">
                    Juega <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Sin Lag</span> <br/>
                    Gana la Partida
                </h1>
                <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
                    No pierdas por culpa de tu internet. Comparamos los mejores proveedores de Bogotá para Gaming Competitivo (Low Ping).
                </p>

                <div className="bg-slate-900/50 backdrop-blur border border-slate-800 p-8 rounded-2xl max-w-4xl mx-auto shadow-2xl">
                    <div className="grid md:grid-cols-3 gap-8">
                         <div className="text-center">
                            <div className="flex justify-center mb-3">
                                <Timer className="w-10 h-10 text-green-400" />
                            </div>
                            <h3 className="font-bold text-white text-lg">Ping Ultra Bajo</h3>
                            <p className="text-sm text-slate-400">Prioriza rutas directas a servidores de Miami y Brasil.</p>
                        </div>
                         <div className="text-center">
                            <div className="flex justify-center mb-3">
                                <Zap className="w-10 h-10 text-yellow-400" />
                            </div>
                            <h3 className="font-bold text-white text-lg">Fibra Simétrica</h3>
                            <p className="text-sm text-slate-400">Misma velocidad de subida para hostear y streamear.</p>
                        </div>
                         <div className="text-center">
                            <div className="flex justify-center mb-3">
                                <Globe className="w-10 h-10 text-blue-400" />
                            </div>
                            <h3 className="font-bold text-white text-lg">Sin Packet Loss</h3>
                            <p className="text-sm text-slate-400">Estabilidad garantizada 24/7 sin picos de lag.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Ranking Operadores */}
        <section className="py-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                    <Gamepad2 className="w-8 h-8 text-purple-500"/>
                    Ranking: Mejor Internet Gamer Bogotá
                </h2>

                <div className="space-y-6">
                    {/* Top 1: ETB */}
                    <div className="bg-slate-900 border-2 border-green-500/50 rounded-2xl p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-green-500 text-black font-black px-4 py-1 rounded-bl-xl">#1 RECOMENDADO</div>
                        <div className="grid md:grid-cols-12 gap-6 items-center">
                            <div className="md:col-span-8">
                                <h3 className="text-2xl font-bold text-white mb-2">ETB Fibra Óptica</h3>
                                <div className="flex gap-4 mb-4 text-sm font-mono">
                                    <span className="text-green-400">PING: 5-50ms</span>
                                    <span className="text-slate-500">|</span>
                                    <span className="text-blue-400">JITTER: &lt;2ms</span>
                                </div>
                                <p className="text-slate-400 mb-4 text-sm">
                                    La mejor latencia local. Al ser un operador 100% fibra hasta el hogar (FTTH), ofrece la conexión más estable para LoL y Valorant en Bogotá.
                                </p>
                                <ul className="grid grid-cols-2 gap-2 text-sm text-slate-300">
                                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500"/> IP Pública (solicitable)</li>
                                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500"/> Simétrico 1:1</li>
                                </ul>
                            </div>
                            <div className="md:col-span-4 bg-slate-800 p-4 rounded-xl text-center">
                                <div className="text-xs text-slate-400 mb-1">PLAN GAMER 500</div>
                                <div className="text-3xl font-black text-white">$149.900</div>
                                <div className="text-xs text-slate-500 mb-4">*Aprox</div>
                                <Link href="/planes-etb-bogota" className="block w-full bg-green-600 hover:bg-green-500 text-black font-bold py-2 rounded transition-colors">
                                    Ver Planes ETB
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Top 2: Movistar */}
                     <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
                        <div className="grid md:grid-cols-12 gap-6 items-center">
                            <div className="md:col-span-8">
                                <h3 className="text-2xl font-bold text-white mb-2">Movistar Fibra</h3>
                                <div className="flex gap-4 mb-4 text-sm font-mono">
                                    <span className="text-yellow-400">PING: 10-60ms</span>
                                    <span className="text-slate-500">|</span>
                                    <span className="text-blue-400">JITTER: &lt;3ms</span>
                                </div>
                                <p className="text-slate-400 mb-4 text-sm">
                                    Excelente opción simétrica. Su peering internacional ha mejorado mucho para servidores de NA East (Miami).
                                </p>
                                <ul className="grid grid-cols-2 gap-2 text-sm text-slate-300">
                                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500"/> App Smart WiFi Gaming</li>
                                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500"/> Alta Cobertura</li>
                                </ul>
                            </div>
                            <div className="md:col-span-4 bg-slate-800 p-4 rounded-xl text-center">
                                <div className="text-xs text-slate-400 mb-1">PLAN 500 MEGAS</div>
                                <div className="text-3xl font-black text-white">$55.990</div>
                                <div className="text-xs text-slate-500 mb-4">Mes 4: $79.990</div>
                                <Link href="/planes-movistar-fibra" className="block w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded transition-colors">
                                    Ver Planes Movistar
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Top 3: Claro */}
                     <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 opacity-70 hover:opacity-100 transition-opacity">
                        <div className="grid md:grid-cols-12 gap-6 items-center">
                            <div className="md:col-span-8">
                                <h3 className="text-2xl font-bold text-white mb-2">Claro Hogar</h3>
                                <div className="flex gap-4 mb-4 text-sm font-mono">
                                    <span className="text-orange-400">PING: 20-80ms</span>
                                    <span className="text-slate-500">|</span>
                                    <span className="text-red-400">HÍBRIDO HFC</span>
                                </div>
                                <p className="text-slate-400 mb-4 text-sm">
                                    Generalmente usa cable coaxial (HFC), lo que aumenta ligeramente el ping. Es buena opción solo si tienes cobertura FTTH.
                                </p>
                                <ul className="grid grid-cols-2 gap-2 text-sm text-slate-300">
                                    <li className="flex gap-2"><XCircle className="w-4 h-4 text-red-500"/> Asimétrico (baja subida)</li>
                                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500"/> La mayor cobertura</li>
                                </ul>
                            </div>
                            <div className="md:col-span-4 bg-slate-800 p-4 rounded-xl text-center">
                                <Link href="/planes-claro-colombia" className="block w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 rounded transition-colors">
                                    Ver Ofertas Claro
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Tips para Bajar Ping */}
         <section className="py-16 bg-slate-900">
            <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-white mb-8 text-center">Cómo optimizar tu conexión gamer</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-slate-950 p-6 rounded-xl border border-slate-800">
                        <h4 className="font-bold text-green-400 mb-2">1. CABLE ETHERNET (OBLIGATORIO)</h4>
                        <p className="text-slate-400 text-sm">
                            El WiFi introduce "jitter" (inestabilidad). Conecta tu PC o Consola directamente al router con un cable CAT6. Es la mejora #1 que puedes hacer.
                        </p>
                    </div>
                     <div className="bg-slate-950 p-6 rounded-xl border border-slate-800">
                        <h4 className="font-bold text-blue-400 mb-2">2. REVISA LA SIMETRÍA</h4>
                        <p className="text-slate-400 text-sm">
                            Si eres streamer (Twitch/YouTube), necesitas ALTA velocidad de subida. Los planes de cobre/coaxial solo dan 10-30 Megas de subida. Busca Fibra Óptica real.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        {/* CTA */}
        <section className="py-20 text-center">
            <div className="max-w-xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-white mb-6">¿Quieres internet PRO?</h2>
                <p className="text-slate-400 mb-8">
                    Déjanos tu número. Te explicamos cuál operador tiene la mejor caja (NAP) cerca de tu casa para garantizar el menor ping.
                </p>
                <div className="bg-slate-800/50 p-8 rounded-2xl border border-purple-500/20 shadow-2xl shadow-purple-900/20">
                    <QuickCallForm provider="Plan Gamer" />
                </div>
            </div>
        </section>
      </div>
    </>
  );
}
