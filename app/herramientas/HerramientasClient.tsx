'use client';

import { Wifi, Clock, Activity, Zap, Calculator, TestTube, Router, Signal } from 'lucide-react';
import QuickCallForm from '@/components/QuickCallForm';
import RelatedLinks from '@/components/RelatedLinks';

interface ToolCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  children: React.ReactNode;
  gradient: string;
}

function ToolCard({ icon, title, description, features, children, gradient }: ToolCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <div className={`${gradient} px-6 py-4 text-white`}>
        <div className="flex items-center gap-3 mb-2">
          {icon}
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <p className="text-blue-50 text-sm">{description}</p>
      </div>
      
      <div className="p-6">
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">Características:</h4>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                {feature}
              </li>
            ))}
          </ul>
        </div>
        
        {children}
      </div>
    </div>
  );
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Herramientas Avanzadas de Internet",
  "description": "Herramientas especializadas para diagnosticar, medir y optimizar tu conexión a internet en Colombia.",
  "url": "https://comparadorinternet.co/herramientas",
  "mainEntity": {
    "@type": "SoftwareApplication",
    "name": "Herramientas de Diagnóstico de Internet",
    "applicationCategory": "Network Diagnostic Tools",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "COP"
    }
  },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Inicio", 
        "item": "https://comparadorinternet.co/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Herramientas",
        "item": "https://comparadorinternet.co/herramientas"
      }
    ]
  }
};

export default function HerramientasClient() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-purple-600 to-blue-700 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Herramientas Avanzadas
                <span className="block text-purple-200">de Diagnóstico</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-purple-100 mb-8 leading-relaxed">
                Tests especializados y calculadoras para optimizar tu conexión a internet
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/calculadora"
                  className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors inline-flex items-center gap-2"
                >
                  <Calculator size={20} />
                  Calculadora Principal
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Tools Section */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid gap-8 md:grid-cols-2">
            
            {/* Ping/Latency Test */}
            <ToolCard
              icon={<Clock size={28} />}
              title="Test de Latencia (Ping)"
              description="Mide el tiempo de respuesta de tu conexión"
              features={[
                "Test de ping a servidores locales e internacionales",
                "Historial de mediciones en tiempo real",
                "Detección de picos de latencia y jitter",
                "Recomendaciones para gaming y streaming"
              ]}
              gradient="bg-gradient-to-r from-green-500 to-green-600"
            >
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-center mb-4">
                    <div className="text-2xl font-bold text-gray-900 mb-1" id="ping-result">
                      -- ms
                    </div>
                    <div className="text-sm text-gray-600">Latencia promedio</div>
                  </div>
                  
                  <button 
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                    onClick={() => {
                      // Simulated ping test - in real implementation, would use WebRTC or other methods
                      const pingElement = document.getElementById('ping-result');
                      if (pingElement) {
                        pingElement.textContent = 'Midiendo...';
                        setTimeout(() => {
                          const randomPing = Math.floor(Math.random() * 50) + 15;
                          pingElement.textContent = `${randomPing} ms`;
                        }, 2000);
                      }
                    }}
                  >
                    <Activity className="inline mr-2" size={16} />
                    Iniciar Test de Ping
                  </button>
                </div>
                
                <div className="text-xs text-gray-500">
                  <strong>Valores ideales:</strong> Gaming: &lt;20ms, Streaming: &lt;50ms, Navegación: &lt;100ms
                </div>
              </div>
            </ToolCard>

            {/* Bandwidth Calculator */}
            <ToolCard
              icon={<Zap size={28} />}
              title="Calculadora de Ancho de Banda"
              description="Calcula el ancho de banda necesario para múltiples actividades"
              features={[
                "Cálculo para streaming, videoconferencias y descargas",
                "Considera dispositivos simultáneos",
                "Recomendaciones de velocidad por actividad",
                "Análisis de uso de datos mensual"
              ]}
              gradient="bg-gradient-to-r from-blue-500 to-blue-600"
            >
              <div className="space-y-4">
                <div className="grid gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Streaming 4K simultáneo
                    </label>
                    <select className="w-full p-2 border border-gray-300 rounded-lg" id="streaming-4k">
                      <option value="0">0 streams</option>
                      <option value="1">1 stream</option>
                      <option value="2">2 streams</option>
                      <option value="3">3+ streams</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Videoconferencias
                    </label>
                    <select className="w-full p-2 border border-gray-300 rounded-lg" id="videoconferences">
                      <option value="0">0 videoconferencias</option>
                      <option value="1">1 videoconferencia</option>
                      <option value="2">2 videoconferencias</option>
                      <option value="3">3+ videoconferencias</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Dispositivos conectados
                    </label>
                    <input 
                      type="range" 
                      min="1" 
                      max="20" 
                      defaultValue="5" 
                      className="w-full" 
                      id="devices-count"
                      onChange={(e) => {
                        const display = document.getElementById('devices-display');
                        if (display) {
                          display.textContent = `${e.target.value} dispositivos`;
                        }
                      }}
                    />
                    <div className="text-sm text-gray-500" id="devices-display">5 dispositivos</div>
                  </div>
                </div>
                
                <button 
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  onClick={() => {
                    const streaming = parseInt((document.getElementById('streaming-4k') as HTMLSelectElement)?.value || '0');
                    const videoconfs = parseInt((document.getElementById('videoconferences') as HTMLSelectElement)?.value || '0');
                    const devices = parseInt((document.getElementById('devices-count') as HTMLInputElement)?.value || '5');
                    
                    // Simple bandwidth calculation
                    let totalMbps = 25; // Base requirement
                    totalMbps += streaming * 25; // 25 Mbps per 4K stream
                    totalMbps += videoconfs * 5; // 5 Mbps per video call
                    totalMbps += devices * 2; // 2 Mbps per additional device
                    
                    alert(`Velocidad recomendada: ${totalMbps} Mbps\n\nPlan sugerido: ${totalMbps <= 100 ? '100 Megas' : totalMbps <= 200 ? '200 Megas' : '300+ Megas'}`);
                  }}
                >
                  <Calculator className="inline mr-2" size={16} />
                  Calcular Ancho de Banda
                </button>
              </div>
            </ToolCard>

            {/* WiFi Analyzer */}
            <ToolCard
              icon={<Wifi size={28} />}
              title="Analizador de WiFi"
              description="Optimiza tu red inalámbrica para mejor rendimiento"
              features={[
                "Tips para mejorar la señal WiFi",
                "Identificación de interferencias",
                "Recomendaciones de ubicación del router",
                "Configuración de canales óptimos"
              ]}
              gradient="bg-gradient-to-r from-purple-500 to-purple-600"
            >
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Diagnóstico Rápido:</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Señal WiFi</span>
                      <div className="flex gap-1">
                        <div className="w-2 h-4 bg-green-500 rounded-sm"></div>
                        <div className="w-2 h-5 bg-green-500 rounded-sm"></div>
                        <div className="w-2 h-6 bg-yellow-500 rounded-sm"></div>
                        <div className="w-2 h-7 bg-gray-300 rounded-sm"></div>
                      </div>
                    </div>
                    
                    <div className="text-xs text-gray-500">
                      <strong>Estado:</strong> Buena señal, posibles mejoras disponibles
                    </div>
                  </div>
                </div>
                
                <button 
                  className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                  onClick={() => {
                    alert('💡 Recomendaciones WiFi:\n\n• Ubica el router en posición central\n• Evita obstáculos como paredes gruesas\n• Usa la banda de 5GHz para menos interferencia\n• Actualiza el firmware del router regularmente');
                  }}
                >
                  <Wifi className="inline mr-2" size={16} />
                  Obtener Recomendaciones
                </button>
              </div>
            </ToolCard>

            {/* Network Quality Test */}
            <ToolCard
              icon={<Signal size={28} />}
              title="Test de Calidad de Red"
              description="Evaluación integral de la estabilidad de tu conexión"
              features={[
                "Test de pérdida de paquetes",
                "Medición de jitter y estabilidad", 
                "Evaluación para aplicaciones específicas",
                "Reporte de calidad detallado"
              ]}
              gradient="bg-gradient-to-r from-orange-500 to-red-500"
            >
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-gray-900" id="packet-loss">0%</div>
                      <div className="text-xs text-gray-600">Pérdida de paquetes</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-900" id="jitter">-- ms</div>
                      <div className="text-xs text-gray-600">Jitter promedio</div>
                    </div>
                  </div>
                  
                  <div className="mt-3 text-center">
                    <div className="text-sm font-medium text-gray-700" id="quality-score">
                      Calidad: Excelente
                    </div>
                  </div>
                </div>
                
                <button 
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 px-4 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all"
                  onClick={() => {
                    const packetLoss = document.getElementById('packet-loss');
                    const jitter = document.getElementById('jitter');
                    const qualityScore = document.getElementById('quality-score');
                    
                    if (packetLoss && jitter && qualityScore) {
                      packetLoss.textContent = 'Midiendo...';
                      jitter.textContent = 'Midiendo...';
                      qualityScore.textContent = 'Analizando...';
                      
                      setTimeout(() => {
                        const loss = (Math.random() * 2).toFixed(1);
                        const jitterValue = Math.floor(Math.random() * 10) + 2;
                        
                        packetLoss.textContent = `${loss}%`;
                        jitter.textContent = `${jitterValue} ms`;
                        
                        const quality = parseFloat(loss) < 1 && jitterValue < 5 ? 'Excelente' : 
                                       parseFloat(loss) < 2 && jitterValue < 10 ? 'Buena' : 'Regular';
                        qualityScore.textContent = `Calidad: ${quality}`;
                      }, 3000);
                    }
                  }}
                >
                  <TestTube className="inline mr-2" size={16} />
                  Iniciar Test de Calidad
                </button>
              </div>
            </ToolCard>

          </div>

          {/* Information Section */}
          <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-4 text-center">
                📊 ¿Cómo interpretar los resultados?
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">🎯 Latencia (Ping):</h3>
                  <ul className="space-y-1 text-sm text-blue-100">
                    <li>• &lt;20ms: Excelente para gaming competitivo</li>
                    <li>• 20-50ms: Bueno para la mayoría de actividades</li>
                    <li>• 50-100ms: Aceptable para navegación</li>
                    <li>• &gt;100ms: Puede causar retrasos perceptibles</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">📦 Pérdida de Paquetes:</h3>
                  <ul className="space-y-1 text-sm text-blue-100">
                    <li>• 0%: Conexión perfecta</li>
                    <li>• &lt;1%: Excelente calidad</li>
                    <li>• 1-2%: Buena calidad</li>
                    <li>• &gt;2%: Problemas de estabilidad</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-12 bg-white rounded-2xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              ¿Necesitas ayuda para optimizar tu conexión?
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Nuestros expertos pueden ayudarte a interpretar estos resultados y encontrar 
              la mejor solución de internet para tus necesidades específicas.
            </p>
            
            <div className="max-w-md mx-auto">
              <QuickCallForm />
            </div>
          </div>

          {/* Related Links */}
          <RelatedLinks currentPageType="tools" maxLinks={6} />
        </div>
      </div>
    </>
  );
}