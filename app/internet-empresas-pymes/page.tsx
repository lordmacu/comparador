import type { Metadata } from 'next';
import Link from 'next/link';
import { Building, ShieldCheck, Server, Globe2, Briefcase, Users, Phone, FileText, CheckCircle2 } from 'lucide-react';
import QuickCallForm from '@/components/QuickCallForm';

export const metadata: Metadata = {
  title: 'Internet para Empresas Colombia 2026 | Planes Fibra + IP Fija',
  description: 'Internet Corporativo y Pymes. Canales dedicados 1:1, IP Fija gratis, Soporte Premium 24/7. ETB, Claro y Movistar Empresas. Cotiza tu plan empresarial aquí.',
  keywords: [
    'internet empresas colombia',
    'internet pymes bogota',
    'internet corporativo fibra optica',
    'internet canal dedicado',
    'internet ip fija empresas',
    'planes internet negocios',
    'internet etb empresas',
    'claro empresas internet',
    'movistar empresas fibra',
    'internet empresarial precios'
  ],
  alternates: {
    canonical: 'https://comparadorinternet.co/internet-empresas-pymes',
  },
  openGraph: {
    title: 'Internet Empresarial y Corporativo | Soluciones 2026',
    description: 'Conectividad de alta disponibilidad para tu negocio. Fibra dedicada, IP Fija y SLAs garantizados.',
    url: 'https://comparadorinternet.co/internet-empresas-pymes',
    siteName: 'Comparador Internet Colombia',
    locale: 'es_CO',
    type: 'website',
  },
};

export default function InternetEmpresasPage() {
  return (
    <>
       <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'Internet Fibra Óptica Empresarial',
            description: 'Soluciones de conectividad para PyMEs y grandes empresas en Colombia',
            brand: {
              '@type': 'Brand',
              name: 'Multioperador (ETB, Claro, Movistar)'
            },
            offers: {
              '@type': 'AggregateOffer',
              lowPrice: '90000',
              highPrice: '500000',
              priceCurrency: 'COP',
              offerCount: '15'
            }
          }),
        }}
      />

      <div className="min-h-screen bg-slate-50">
        {/* Hero Corporativo */}
        <section className="bg-slate-900 text-white py-16 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '30px 30px'}}></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 bg-blue-900/50 border border-blue-700/50 px-4 py-2 rounded-full mb-6">
                            <Briefcase className="w-5 h-5 text-blue-400" />
                            <span className="font-semibold text-blue-100 uppercase tracking-wide text-sm">Soluciones B2B</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                            Internet Dedicado para <span className="text-blue-500">Empresas que no Paran</span>
                        </h1>
                        <p className="text-lg text-slate-300 mb-8 max-w-lg">
                            Garantiza la operatividad de tu negocio con fibra óptica empresarial. Canales simétricos 1:1, IP Fija y soporte prioritario en menos de 4 horas.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <Link href="#planes-pymes" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-center transition-colors">
                                Ver Planes PyMEs
                            </Link>
                            <Link href="#planes-dedicados" className="bg-transparent border border-white/30 hover:bg-white/10 text-white font-bold py-3 px-6 rounded-lg text-center transition-colors">
                                Solicitar Canal Dedicado
                            </Link>
                        </div>
                    </div>

                    <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 shadow-2xl">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-blue-400" />
                            Cotización Inmediata
                        </h3>
                        <QuickCallForm provider="Empresas" />
                        <p className="text-xs text-slate-400 mt-4 text-center">
                            Te contactará un asesor especializado en soluciones corporativas.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        {/* Diferencias vs Hogar */}
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">¿Por qué CONTRATAR Internet Empresarial?</h2>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        Los planes residenciales comparten la velocidad con tus vecinos (reuso 1:10 o 1:20). Los planes empresariales te garantizan recursos.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-slate-50 p-8 rounded-xl border border-slate-100 hover:shadow-lg transition-shadow">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                            <Server className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">IP Fija Pública</h3>
                        <p className="text-slate-600">
                            Esencial para servidores, cámaras de seguridad, VPNs, facturación electrónica y acceso remoto a tus sistemas.
                        </p>
                    </div>

                    <div className="bg-slate-50 p-8 rounded-xl border border-slate-100 hover:shadow-lg transition-shadow">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                            <ShieldCheck className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">SLA Garantizado</h3>
                        <p className="text-slate-600">
                            Acuerdos de Nivel de Servicio. Si tu internet falla, tienes prioridad de reparación en horas, no en días. Disponibilidad del 99.9%.
                        </p>
                    </div>

                    <div className="bg-slate-50 p-8 rounded-xl border border-slate-100 hover:shadow-lg transition-shadow">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                            <Globe2 className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Reuso 1:1 (Dedicado)</h3>
                        <p className="text-slate-600">
                            En canales dedicados, la velocidad que contratas es exclusiva para tu empresa. Sin compartir ancho de banda con nadie más.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        {/* Planes PyMes */}
        <section id="planes-pymes" className="py-16 bg-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Planes para Negocios y PyMEs</h2>
                    <p className="text-slate-600">Soluciones costo-efectivas con beneficios corporativos</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                     {/* Plan Basico */}
                     <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:scale-105 transition-transform duration-300">
                        <div className="bg-slate-200 p-4 text-center">
                            <h3 className="font-bold text-slate-700">Emprendedor</h3>
                        </div>
                        <div className="p-8 text-center border-b border-slate-100">
                            <div className="text-4xl font-black text-slate-900 mb-2">300 Megas</div>
                            <div className="text-2xl font-bold text-blue-600">$95.900<span className="text-sm font-normal text-slate-500">/mes</span></div>
                        </div>
                        <div className="p-8">
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-center gap-3 text-sm text-slate-600">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" /> IP Dinámica
                                </li>
                                <li className="flex items-center gap-3 text-sm text-slate-600">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" /> Soporte Telefónico Preferencial
                                </li>
                                <li className="flex items-center gap-3 text-sm text-slate-600">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" /> Reuso bajo (Empresarial)
                                </li>
                                <li className="flex items-center gap-3 text-sm text-slate-600">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" /> Ideal 1-5 empleados
                                </li>
                            </ul>
                            <Link href="/contratar" className="block w-full py-3 bg-slate-900 text-white font-bold rounded-lg text-center hover:bg-slate-800">
                                Consultar Disponibilidad
                            </Link>
                        </div>
                     </div>

                     {/* Plan Avanzado */}
                     <div className="bg-white rounded-2xl shadow-xl border-2 border-blue-600 overflow-hidden transform scale-105 relative">
                        <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">MÁS VENDIDO</div>
                        <div className="bg-blue-50 p-4 text-center">
                            <h3 className="font-bold text-blue-900">Negocios Pro</h3>
                        </div>
                        <div className="p-8 text-center border-b border-slate-100">
                            <div className="text-4xl font-black text-slate-900 mb-2">500 Megas</div>
                            <div className="text-2xl font-bold text-blue-600">$149.900<span className="text-sm font-normal text-slate-500">/mes</span></div>
                        </div>
                        <div className="p-8">
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-center gap-3 text-sm text-slate-600">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" /> <strong>1 IP Fija Incluida</strong>
                                </li>
                                <li className="flex items-center gap-3 text-sm text-slate-600">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" /> Soporte en Sitio &lt; 24h
                                </li>
                                <li className="flex items-center gap-3 text-sm text-slate-600">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" /> Fibra Simétrica 100%
                                </li>
                                <li className="flex items-center gap-3 text-sm text-slate-600">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" /> Ideal 5-15 empleados
                                </li>
                            </ul>
                            <Link href="/contratar" className="block w-full py-3 bg-blue-600 text-white font-bold rounded-lg text-center hover:bg-blue-700">
                                Contratar Ahora
                            </Link>
                        </div>
                     </div>

                     {/* Plan Corporativo */}
                     <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:scale-105 transition-transform duration-300">
                        <div className="bg-slate-200 p-4 text-center">
                            <h3 className="font-bold text-slate-700">Corporativo</h3>
                        </div>
                        <div className="p-8 text-center border-b border-slate-100">
                            <div className="text-4xl font-black text-slate-900 mb-2">900 Megas</div>
                            <div className="text-2xl font-bold text-blue-600">$220.900<span className="text-sm font-normal text-slate-500">/mes</span></div>
                        </div>
                        <div className="p-8">
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-center gap-3 text-sm text-slate-600">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" /> 1 IP Fija Incluida
                                </li>
                                <li className="flex items-center gap-3 text-sm text-slate-600">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" /> Priorización de Tráfico
                                </li>
                                <li className="flex items-center gap-3 text-sm text-slate-600">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" /> WiFi 6 Mesh Pro
                                </li>
                                <li className="flex items-center gap-3 text-sm text-slate-600">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" /> Ideal 15-30 empleados
                                </li>
                            </ul>
                            <Link href="/contratar" className="block w-full py-3 bg-slate-900 text-white font-bold rounded-lg text-center hover:bg-slate-800">
                                Solicitar Asesoría
                            </Link>
                        </div>
                     </div>
                </div>
            </div>
        </section>

        {/* Sección Dedicada */}
        <section id="planes-dedicados" className="py-20 bg-slate-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-gradient-to-r from-blue-900 to-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl border border-blue-800/50">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">¿Tu operación es crítica? Necesitas un Canal Dedicado</h2>
                            <p className="text-slate-300 mb-6">
                                Olvídate del "hasta" en la velocidad. Un canal dedicado te entrega el 100% del ancho de banda contratado, 24/7, garantizado por contrato.
                            </p>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                                        <Users className="w-4 h-4 text-blue-400" />
                                    </div>
                                    <span>Conexión directa al backbone del operador</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                                        <ShieldCheck className="w-4 h-4 text-blue-400" />
                                    </div>
                                    <span>SLA de Disponibilidad &gt; 99.96%</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                                        <Phone className="w-4 h-4 text-blue-400" />
                                    </div>
                                    <span>Ingeniero NOC asignado</span>
                                </li>
                            </ul>
                            <p className="text-sm text-blue-300 font-semibold mb-2">Para Cotizaciones Dedicadas:</p>
                        </div>
                        <div className="bg-white rounded-xl p-6 text-slate-900">
                            <h3 className="font-bold text-xl mb-4 text-center">Solicitar Propuesta Dedicada</h3>
                            <QuickCallForm provider="Canal Dedicado" buttonColor="#000000" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
      </div>
    </>
  );
}
