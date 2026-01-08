import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import QuickCallForm from '@/components/QuickCallForm';
import ClusterNavigation from '@/components/ClusterNavigation';
import FAQSection from '@/components/FAQSection';
import { Phone, Shield, Zap, Clock, TrendingUp, CheckCircle, AlertCircle, Settings } from 'lucide-react';
import { FAQ } from '@/lib/types';

// Datos de soluciones
const SOLUCIONES: Record<string, {
  slug: string;
  nombre: string;
  titulo: string;
  descripcion: string;
  problema: string;
  solucion: string;
  tiempoEstimado: string;
  dificultad: string;
  costoPromedio: string;
  beneficios: string[];
  pasos: Array<{
    numero: number;
    titulo: string;
    descripcion: string;
    tips: string[];
  }>;
  consideraciones: Array<{
    icono: string;
    titulo: string;
    descripcion: string;
  }>;
  proveedoresRecomendados: Array<{
    nombre: string;
    razon: string;
    promocion: string;
    link: string;
  }>;
  faqs: FAQ[];
  metaKeywords: string;
}> = {
  'cambiar-de-operador': {
    slug: 'cambiar-de-operador',
    nombre: 'Cambiar de Operador',
    titulo: 'Cómo Cambiar de Operador de Internet en Bogotá 2026',
    descripcion: 'Guía completa para cambiar de proveedor de internet en Bogotá sin complicaciones. Proceso paso a paso, portabilidad numérica y mejores ofertas.',
    problema: 'Mal servicio, altos precios o velocidades que no cumplen',
    solucion: 'Cambio de operador sin penalizaciones ni cortes de servicio',
    tiempoEstimado: '3-7 días',
    dificultad: 'Fácil',
    costoPromedio: '$0 - $50,000',
    beneficios: [
      'Sin penalizaciones si ya cumpliste permanencia mínima',
      'Mejores precios con promociones de nuevos clientes',
      'Puedes mantener tu número de teléfono fijo (portabilidad)',
      'Instalación gratuita en la mayoría de casos',
      'Sin corte de servicio si coordinas bien'
    ],
    pasos: [
      {
        numero: 1,
        titulo: 'Verifica tu contrato actual',
        descripcion: 'Revisa si cumpliste la permanencia mínima (usualmente 12 meses). Si no, podrías tener penalización.',
        tips: ['Llama al operador actual y pregunta por cláusula de permanencia', 'Guarda el número de radicado de la llamada']
      },
      {
        numero: 2,
        titulo: 'Compara ofertas de operadores',
        descripcion: 'Usa nuestro comparador para ver qué operador ofrece mejor precio, velocidad y cobertura en tu zona.',
        tips: ['Pregunta por promociones para nuevos clientes', 'Verifica disponibilidad de fibra óptica en tu dirección']
      },
      {
        numero: 3,
        titulo: 'Solicita portabilidad (opcional)',
        descripcion: 'Si quieres mantener tu número de teléfono fijo, solicita portabilidad al nuevo operador.',
        tips: ['El proceso toma 3-5 días hábiles', 'Necesitas factura reciente del operador actual']
      },
      {
        numero: 4,
        titulo: 'Agenda instalación con nuevo operador',
        descripcion: 'Coordina la fecha de instalación idealmente 1-2 días después del corte del servicio anterior.',
        tips: ['Pide instalación gratis (la mayoría la ofrece)', 'Confirma que incluya router WiFi sin cargo']
      },
      {
        numero: 5,
        titulo: 'Cancela servicio anterior',
        descripcion: 'Llama al operador actual y solicita cancelación. Pide número de radicado y confirmación por escrito.',
        tips: ['Hazlo máximo 30 días antes de la nueva instalación', 'Pregunta por devolución de equipo si es arrendado']
      }
    ],
    consideraciones: [
      {
        icono: '⚠️',
        titulo: 'Cláusula de permanencia',
        descripcion: 'Si no cumpliste los 12 meses, tendrás penalización. Calcula si vale la pena.'
      },
      {
        icono: '📱',
        titulo: 'Portabilidad numérica',
        descripcion: 'Solo aplica para líneas fijas. El proceso es gratuito y obligatorio por ley.'
      },
      {
        icono: '🏠',
        titulo: 'Disponibilidad técnica',
        descripcion: 'Verifica que el nuevo operador tenga cobertura con fibra óptica en tu dirección.'
      },
      {
        icono: '💰',
        titulo: 'Promociones',
        descripcion: 'Como nuevo cliente tendrás mejores precios que los actuales usuarios. Aprovéchalas.'
      }
    ],
    proveedoresRecomendados: [
      {
        nombre: 'ETB',
        razon: 'Sin permanencia mínima + fibra óptica en la mayoría de Bogotá',
        promocion: 'Instalación gratis + 3 meses de descuento',
        link: '/etb'
      },
      {
        nombre: 'Claro',
        razon: 'Portabilidad rápida (3 días) + app para gestión',
        promocion: '50% descuento primeros 6 meses',
        link: '/claro'
      },
      {
        nombre: 'Movistar',
        razon: 'Sin costos ocultos + router WiFi 6 incluido',
        promocion: 'Sin costo de instalación + Netflix 3 meses',
        link: '/movistar'
      }
    ],
    faqs: [
      {
        question: '¿Me cobran penalización por cambiar de operador?',
        answer: 'Solo si no has cumplido la cláusula de permanencia mínima (generalmente 12 meses). Si ya cumpliste el tiempo, no hay penalización. Llama a tu operador actual y pregunta por tu fecha de cumplimiento de permanencia.'
      },
      {
        question: '¿Cuánto tarda el proceso completo de cambio?',
        answer: 'Entre 3 y 7 días hábiles en promedio. La instalación del nuevo servicio toma 1-2 días, y si solicitas portabilidad numérica, suma 3-5 días adicionales.'
      },
      {
        question: '¿Puedo mantener mi número de teléfono fijo?',
        answer: 'Sí, mediante portabilidad numérica que es gratuita y obligatoria por ley. Solo necesitas solicitarla al nuevo operador con tu factura reciente del servicio actual.'
      },
      {
        question: '¿Qué hago con el router del operador anterior?',
        answer: 'Si es equipo arrendado (en comodato), debes devolverlo al cancelar el servicio. Coordina la devolución para evitar cargos adicionales. Si es tuyo (lo compraste), puedes quedártelo.'
      },
      {
        question: '¿Puedo cambiar sin quedarme sin internet?',
        answer: 'Sí, si coordinas bien las fechas. Agenda la instalación del nuevo servicio 1-2 días después del corte del anterior. Algunos operadores ofrecen 4G temporal mientras instalan.'
      }
    ],
    metaKeywords: 'cambiar operador internet bogotá, cambio de proveedor internet, portabilidad bogotá, cancelar internet, mejores ofertas internet bogotá'
  },
  'mejorar-velocidad': {
    slug: 'mejorar-velocidad',
    nombre: 'Mejorar Velocidad',
    titulo: 'Cómo Mejorar la Velocidad de Internet en Bogotá 2026',
    descripcion: 'Soluciones prácticas para aumentar la velocidad de tu internet en Bogotá. Optimización, upgrade de plan y diagnóstico de problemas.',
    problema: 'Internet lento, páginas que no cargan, videollamadas cortadas',
    solucion: 'Optimización técnica y/o upgrade de plan según tu caso',
    tiempoEstimado: '1-3 días',
    dificultad: 'Media',
    costoPromedio: '$0 - $100,000',
    beneficios: [
      'Diagnóstico técnico gratuito de tu conexión actual',
      'Mejora inmediata con optimización de red',
      'Upgrade a fibra óptica si estás en cable/DSL',
      'Router WiFi 6 moderno sin costo adicional',
      'Garantía de velocidad mínima contratada'
    ],
    pasos: [
      {
        numero: 1,
        titulo: 'Mide tu velocidad real',
        descripcion: 'Usa Fast.com o Speedtest.net conectado por cable Ethernet para medir velocidad real.',
        tips: ['Cierra todas las apps y dispositivos', 'Haz 3 mediciones en diferentes horas', 'Compara con la velocidad contratada']
      },
      {
        numero: 2,
        titulo: 'Identifica el problema',
        descripcion: 'Determina si el problema es el plan contratado, tu router WiFi, o problemas técnicos del operador.',
        tips: ['Si por cable es lento = problema del operador o plan', 'Si solo por WiFi es lento = problema de router', 'Si solo en ciertos horarios = congestión de red']
      },
      {
        numero: 3,
        titulo: 'Optimiza tu red WiFi',
        descripcion: 'Ubica el router en lugar central, cambia canal WiFi, actualiza firmware y usa banda 5GHz.',
        tips: ['Apps como WiFi Analyzer muestran canales menos congestionados', 'Banda 5GHz es más rápida pero menos alcance', 'Considera repetidores WiFi para casas grandes']
      },
      {
        numero: 4,
        titulo: 'Contacta a tu operador',
        descripcion: 'Si la velocidad por cable es menor al 80% de lo contratado, reporta al operador y exige solución.',
        tips: ['Guarda screenshots de tests de velocidad', 'Pide reporte técnico por escrito', 'Menciona que conoces la ley 1480 (garantía de servicio)']
      },
      {
        numero: 5,
        titulo: 'Evalúa upgrade o cambio',
        descripcion: 'Si tu plan es muy básico o no hay fibra óptica, considera upgrade o cambio de operador.',
        tips: ['Fibra óptica es 10x más estable que cable', 'Planes de 300+ Mbps para hogares modernos', 'Nuevos clientes tienen mejores precios']
      }
    ],
    consideraciones: [
      {
        icono: '🔌',
        titulo: 'Conexión por cable vs WiFi',
        descripcion: 'Siempre mide velocidad por cable Ethernet primero. WiFi puede ser hasta 50% más lento.'
      },
      {
        icono: '📡',
        titulo: 'Router obsoleto',
        descripcion: 'Routers de más de 3 años no soportan velocidades altas. Pide uno nuevo al operador.'
      },
      {
        icono: '🏢',
        titulo: 'Fibra óptica vs cable',
        descripcion: 'Si tienes cable/DSL, cambiar a fibra óptica puede triplicar tu velocidad.'
      },
      {
        icono: '⏰',
        titulo: 'Horarios pico',
        descripcion: 'Entre 7-10 PM hay congestión. Planes empresariales tienen prioridad.'
      }
    ],
    proveedoresRecomendados: [
      {
        nombre: 'ETB',
        razon: 'Fibra óptica pura + velocidad simétrica (misma subida y bajada)',
        promocion: 'Upgrade gratis a 600 Mbps por 3 meses',
        link: '/etb'
      },
      {
        nombre: 'Movistar',
        razon: 'Router WiFi 6 incluido + app de diagnóstico',
        promocion: 'Router nuevo gratis + instalación express 24h',
        link: '/movistar'
      },
      {
        nombre: 'Claro',
        razon: 'Planes desde 100 Mbps con fibra en la mayoría de zonas',
        promocion: 'Test de velocidad gratuito a domicilio',
        link: '/claro'
      }
    ],
    faqs: [
      {
        question: '¿Por qué mi internet está lento si pago por alta velocidad?',
        answer: 'Puede ser por: router WiFi obsoleto (más de 3 años), conexión por WiFi en lugar de cable, congestión en horario pico (7-10 PM), o problemas técnicos del operador. Mide velocidad por cable Ethernet primero para identificar la causa.'
      },
      {
        question: '¿Cuánta velocidad necesito realmente en mi hogar?',
        answer: '100 Mbps para 2-3 personas uso básico, 200 Mbps para 4-5 personas con videollamadas, 300+ Mbps para gaming, streaming 4K y teletrabajo simultáneo, 500+ Mbps para hogares grandes (6+ personas) o uso intensivo.'
      },
      {
        question: '¿Vale la pena cambiar de cable a fibra óptica?',
        answer: 'Absolutamente sí. Fibra óptica ofrece: velocidades 10x más rápidas, mayor estabilidad (menos cortes), velocidad simétrica (misma subida y bajada), y menos latencia para gaming y videollamadas. El costo es similar al cable.'
      },
      {
        question: '¿Mi operador puede garantizar la velocidad contratada?',
        answer: 'Por ley, deben garantizar mínimo 80% de la velocidad contratada. Si consistentemente recibes menos, puedes exigir solución técnica o reducción en la factura. Guarda evidencia de tests de velocidad.'
      },
      {
        question: '¿Cómo mejoro el WiFi sin cambiar de plan?',
        answer: 'Ubica el router en lugar central y alto, cambia a banda 5GHz, actualiza firmware, usa canal WiFi menos congestionado (apps como WiFi Analyzer), considera repetidores para casas grandes, y desconecta dispositivos que no uses.'
      }
    ],
    metaKeywords: 'mejorar velocidad internet bogotá, internet lento solución, aumentar velocidad internet, fibra óptica bogotá, optimizar wifi'
  },
  'internet-lento': {
    slug: 'internet-lento',
    nombre: 'Internet Lento',
    titulo: 'Soluciones para Internet Lento en Bogotá 2026',
    descripcion: 'Diagnóstico y solución definitiva para problemas de internet lento en Bogotá. Causas comunes, fixes técnicos y mejores proveedores.',
    problema: 'Velocidad baja constante, buffering en videos, descargas lentas',
    solucion: 'Diagnóstico técnico + solución según causa raíz del problema',
    tiempoEstimado: '24-48 horas',
    dificultad: 'Fácil',
    costoPromedio: '$0 - $80,000',
    beneficios: [
      'Diagnóstico técnico sin costo con operadores principales',
      'Solución en 90% de casos sin cambiar de plan',
      'Garantía de velocidad mínima por ley (80% de lo contratado)',
      'Posibilidad de upgrade o cambio sin penalización',
      'Compensación o descuento si el problema es del operador'
    ],
    pasos: [
      {
        numero: 1,
        titulo: 'Realiza test de velocidad profesional',
        descripcion: 'Conecta tu PC por cable Ethernet directamente al router, cierra todas las aplicaciones y haz test en Fast.com',
        tips: ['Haz 3 tests en diferentes horarios', 'Anota resultados: velocidad bajada, subida y ping', 'Compara con velocidad contratada en tu factura']
      },
      {
        numero: 2,
        titulo: 'Identifica causa del problema',
        descripcion: 'Según resultados del test, determina si es: plan insuficiente, problema técnico, router obsoleto o congestión.',
        tips: ['< 80% de velocidad contratada por cable = problema del operador', 'Solo lento por WiFi = problema de router o interferencias', 'Lento 7-10 PM = congestión de red']
      },
      {
        numero: 3,
        titulo: 'Aplica soluciones inmediatas',
        descripcion: 'Reinicia router (desconecta 30 seg), actualiza firmware, prueba banda 5GHz, y desconecta dispositivos innecesarios.',
        tips: ['Botón reset mantiene config, botón reboot reinicia', 'Firmware se actualiza desde panel admin del router', '5GHz es más rápido pero menor alcance que 2.4GHz']
      },
      {
        numero: 4,
        titulo: 'Reporta al operador con evidencia',
        descripcion: 'Si el problema persiste por cable, llama al operador con screenshots de tests de velocidad y exige solución técnica.',
        tips: ['Pide número de radicado del reporte', 'Menciona artículo 7 de Ley 1480 (garantía)', 'Solicita visita técnica sin costo']
      },
      {
        numero: 5,
        titulo: 'Evalúa cambio de tecnología u operador',
        descripcion: 'Si tienes cable/ADSL, cambiar a fibra óptica resuelve el 80% de problemas. Si tu operador no ofrece fibra, cambia.',
        tips: ['Fibra óptica disponible en 70% de Bogotá', 'Nuevos clientes tienen instalación gratis', 'No hay penalización si el operador incumple velocidad']
      }
    ],
    consideraciones: [
      {
        icono: '🔍',
        titulo: 'Causas más comunes',
        descripcion: 'Router viejo (40%), congestión de red (30%), problemas técnicos operador (20%), plan insuficiente (10%)'
      },
      {
        icono: '⚡',
        titulo: 'Solución más efectiva',
        descripcion: 'Migrar de cable/ADSL a fibra óptica resuelve el 80% de problemas de velocidad y estabilidad.'
      },
      {
        icono: '📞',
        titulo: 'Derechos del usuario',
        descripcion: 'Por ley tienes derecho a mínimo 80% de velocidad contratada. Si no se cumple, exige compensación.'
      },
      {
        icono: '💡',
        titulo: 'Prevención',
        descripcion: 'Actualiza router cada 3 años, usa banda 5GHz, y verifica que tienes suficiente velocidad contratada.'
      }
    ],
    proveedoresRecomendados: [
      {
        nombre: 'ETB',
        razon: 'Fibra óptica pura con velocidad garantizada + SLA empresarial',
        promocion: 'Diagnóstico técnico gratis + router WiFi 6',
        link: '/etb'
      },
      {
        nombre: 'Movistar',
        razon: 'Red renovada 2024-2025 con fibra FTTH + soporte técnico 24/7',
        promocion: 'Test de velocidad a domicilio sin costo',
        link: '/movistar'
      },
      {
        nombre: 'Claro',
        razon: 'Mayor cobertura de fibra óptica en Bogotá + app de autodiagnóstico',
        promocion: 'Upgrade gratis por 3 meses si hay problemas técnicos',
        link: '/claro'
      }
    ],
    faqs: [
      {
        question: '¿Por qué mi internet está lento solo en ciertos horarios?',
        answer: 'Es congestión de red en horario pico (7-10 PM) cuando todos los vecinos usan internet simultáneamente. Solución: upgrade a plan empresarial con QoS prioritario, cambio a fibra óptica, o cambio de operador con mejor infraestructura en tu zona.'
      },
      {
        question: '¿Qué velocidad es considerada "lenta" en 2026?',
        answer: 'Menos de 50 Mbps es lento para uso moderno. Lo mínimo recomendado es: 100 Mbps para uso básico, 200 Mbps para hogares con 4+ personas, 300+ Mbps para teletrabajo/streaming 4K simultáneo.'
      },
      {
        question: '¿Mi operador puede mejorar mi velocidad sin cambiar de plan?',
        answer: 'Sí, si el problema es técnico: reemplazo de router viejo, optimización de señal, actualización de firmware, o mejora de infraestructura en tu zona. Pero si tu plan es muy básico (< 50 Mbps), necesitarás upgrade.'
      },
      {
        question: '¿Cuándo debo cambiar de operador por internet lento?',
        answer: 'Si después de reportar 3 veces y 2 visitas técnicas el problema persiste, si tu operador no ofrece fibra óptica en tu zona, o si consistentemente recibes menos del 80% de velocidad contratada. Tienes derecho a cancelar sin penalización.'
      },
      {
        question: '¿WiFi siempre es más lento que cable?',
        answer: 'WiFi puede perder 30-50% de velocidad vs cable Ethernet por: paredes, interferencias, distancia al router, y banda usada (2.4 GHz vs 5 GHz). Para gaming, teletrabajo o streaming 4K, usa cable siempre que sea posible.'
      }
    ],
    metaKeywords: 'internet lento bogotá, solución internet lento, por qué está lento mi internet, velocidad internet bogotá, fibra óptica bogotá'
  },
  'cortes-de-internet': {
    slug: 'cortes-de-internet',
    nombre: 'Cortes de Internet',
    titulo: 'Solución a Cortes de Internet Frecuentes en Bogotá 2026',
    descripcion: 'Elimina los cortes de internet en Bogotá. Causas, soluciones técnicas y operadores con mayor estabilidad y uptime garantizado.',
    problema: 'Internet se cae constantemente, desconexiones frecuentes, inestabilidad',
    solucion: 'Migración a fibra óptica + operador con SLA de uptime 99.5%+',
    tiempoEstimado: '3-5 días',
    dificultad: 'Fácil',
    costoPromedio: '$0 - $50,000',
    beneficios: [
      'Uptime garantizado 99.5% (máximo 3.6 horas caído al mes)',
      'Compensación económica por cortes según SLA',
      'Fibra óptica inmune a interferencias eléctricas',
      'Soporte técnico prioritario 24/7',
      'Plan de respaldo 4G/5G incluido en planes premium'
    ],
    pasos: [
      {
        numero: 1,
        titulo: 'Documenta los cortes de servicio',
        descripcion: 'Durante 1 semana, registra cada corte: fecha, hora, duración. Toma screenshots de tests de conectividad.',
        tips: ['Usa apps como Pingplotter para registro automático', 'Anota si afecta todos los dispositivos o solo WiFi', 'Revisa si coincide con lluvias o tormentas']
      },
      {
        numero: 2,
        titulo: 'Reporta formalmente al operador',
        descripcion: 'Llama al operador con tu documentación, reporta el problema y exige solución técnica con número de radicado.',
        tips: ['Menciona Ley 1480 sobre garantía de servicio', 'Pide compensación si supera límite de SLA', 'Solicita visita técnica gratuita']
      },
      {
        numero: 3,
        titulo: 'Verifica instalación física',
        descripcion: 'Con el técnico, revisa: cables en mal estado, conexiones flojas, router ubicado cerca de fuentes de calor/humedad.',
        tips: ['Cables dañados son causa del 40% de cortes', 'Router debe estar ventilado y alejado de agua', 'Verifica que router tenga botón reset físico']
      },
      {
        numero: 4,
        titulo: 'Evalúa causa raíz del problema',
        descripcion: 'Determina si los cortes son por: infraestructura vieja, cable vulnerable al clima, problemas eléctricos, o router defectuoso.',
        tips: ['Cable/ADSL tiene 3x más cortes que fibra', 'Si es después de lluvias = cable aéreo dañado', 'Si es router = luz LED naranja o roja']
      },
      {
        numero: 5,
        titulo: 'Migra a fibra óptica con SLA garantizado',
        descripcion: 'Si tu operador no ofrece fibra o SLA, cambia a operador con infraestructura moderna y garantía de uptime.',
        tips: ['Fibra óptica tiene 99.5% uptime vs 95% cable', 'Planes empresariales incluyen SLA con compensación', 'ETB y Movistar tienen mejor SLA en Bogotá']
      }
    ],
    consideraciones: [
      {
        icono: '☁️',
        titulo: 'Fibra vs Cable en lluvias',
        descripcion: 'Cables coaxiales y telefónicos se dañan con agua. Fibra óptica es inmune a humedad y electricidad.'
      },
      {
        icono: '📊',
        titulo: 'SLA (Service Level Agreement)',
        descripcion: 'Garantía de uptime. Planes residenciales: 95-98%. Empresariales: 99.5-99.9%. Exige compensación si incumplen.'
      },
      {
        icono: '🔄',
        titulo: 'Plan de respaldo',
        descripcion: 'Operadores premium ofrecen 4G/5G automático como backup cuando fibra se cae (planes 200k+).'
      },
      {
        icono: '⚡',
        titulo: 'UPS para router',
        descripcion: 'Micro-cortes eléctricos causan reinicios. UPS de $50k evita el 30% de desconexiones.'
      }
    ],
    proveedoresRecomendados: [
      {
        nombre: 'ETB',
        razon: 'SLA 99.5% + infraestructura propia de fibra subterránea',
        promocion: 'Compensación automática por cortes + UPS de regalo',
        link: '/etb'
      },
      {
        nombre: 'Movistar',
        razon: 'Red FTTH renovada 2024 + backup 4G en planes premium',
        promocion: 'SLA 99.7% empresarial + soporte prioritario',
        link: '/movistar'
      },
      {
        nombre: 'Claro',
        razon: 'Mayor cobertura de fibra + monitoreo proactivo 24/7',
        promocion: 'Cambio de router gratis si hay problemas recurrentes',
        link: '/claro'
      }
    ],
    faqs: [
      {
        question: '¿Por qué mi internet se cae cuando llueve?',
        answer: 'Porque tienes cable coaxial o telefónico (ADSL) que es vulnerable al agua. Cables aéreos se mojan y cortocircuitan. Solución definitiva: migrar a fibra óptica que es inmune a humedad, rayos e interferencias eléctricas.'
      },
      {
        question: '¿Cuántos cortes al mes son "normales"?',
        answer: 'SLA estándar residencial permite ~14 horas caído al año (1.2 horas/mes). Más de 2-3 cortes al mes o más de 2 horas totales caído es anormal. Tienes derecho a compensación y solución técnica.'
      },
      {
        question: '¿Me pueden compensar por los cortes de servicio?',
        answer: 'Sí, según Ley 1480 y el SLA de tu contrato. Si supera el límite permitido (ej: 99.5% uptime), tienes derecho a: descuento proporcional en factura, días gratis de servicio, o cancelación sin penalización.'
      },
      {
        question: '¿Qué es mejor: fibra óptica o cable para evitar cortes?',
        answer: 'Fibra óptica tiene 10x menos cortes porque: no se afecta por lluvia/humedad, inmune a interferencias eléctricas, no se degrada con el tiempo, y las redes son más modernas. Cable tiene 95% uptime vs 99.5% de fibra.'
      },
      {
        question: '¿Debo comprar un UPS para mi router?',
        answer: 'Sí, especialmente si tienes micro-cortes eléctricos frecuentes. UPS de $50-80k mantiene router funcionando 2-4 horas y evita reinicios constantes que degradan el servicio. Inversión que se paga sola en 3-4 meses.'
      }
    ],
    metaKeywords: 'cortes de internet bogotá, internet se cae, estabilidad internet, fibra óptica bogotá, SLA internet, uptime garantizado'
  }
};

type SolucionSlug = keyof typeof SOLUCIONES;

// Generate static params
export async function generateStaticParams() {
  const params = Object.keys(SOLUCIONES).map((solucion) => ({
    solucion: solucion as SolucionSlug,
  }));
  
  console.log('[SOLUCIONES] Generated params:', params);
  return params;
}

// Generate metadata
export async function generateMetadata(
  { params }: { params: Promise<{ solucion: string }> }
): Promise<Metadata> {
  const { solucion: solucionSlug } = await params;
  const solucion = SOLUCIONES[solucionSlug as SolucionSlug];

  if (!solucion) {
    return {
      title: 'Solución no encontrada',
    };
  }

  const canonicalUrl = `https://comparadorinternet.co/soluciones/${solucion.slug}-bogota`;

  return {
    title: `${solucion.titulo} | Comparador Internet`,
    description: solucion.descripcion,
    keywords: solucion.metaKeywords,
    openGraph: {
      title: solucion.titulo,
      description: solucion.descripcion,
      url: canonicalUrl,
      siteName: 'Comparador Internet Bogotá',
      locale: 'es_CO',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: solucion.titulo,
      description: solucion.descripcion,
    },
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function SolucionPage({
  params,
}: {
  params: Promise<{ solucion: string }>;
}) {
  const { solucion: solucionSlug } = await params;
  
  console.log('[SOLUCIONES] Params received:', params);
  console.log('[SOLUCIONES] solucionSlug:', solucionSlug);
  console.log('[SOLUCIONES] Available soluciones:', Object.keys(SOLUCIONES));

  const solucion = SOLUCIONES[solucionSlug as SolucionSlug];

  if (!solucion) {
    console.log('[SOLUCIONES] Solucion not found for slug:', solucionSlug);
    notFound();
  }

  console.log('[SOLUCIONES] Found solucion:', solucion.nombre);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section con CTA */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-6">
              <AlertCircle className="w-4 h-4" />
              <span>Solución efectiva en {solucion.tiempoEstimado}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {solucion.titulo}
            </h1>
            
            <p className="text-xl text-blue-100 mb-8">
              {solucion.descripcion}
            </p>

            {/* CTA Form Container */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
              <h2 className="font-bold text-lg mb-4">
                Te llamamos gratis para resolver tu problema de internet:
              </h2>
              <QuickCallForm buttonColor="#2563eb" />
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <div className="text-2xl font-bold">{solucion.tiempoEstimado}</div>
                <div className="text-sm text-blue-200">Tiempo Solución</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <div className="text-2xl font-bold">{solucion.dificultad}</div>
                <div className="text-sm text-blue-200">Dificultad</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <div className="text-2xl font-bold">{solucion.costoPromedio}</div>
                <div className="text-sm text-blue-200">Costo Promedio</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <div className="text-2xl font-bold">95%</div>
                <div className="text-sm text-blue-200">Efectividad</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problema y Solución */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg text-red-900 mb-2">Tu Problema</h3>
                  <p className="text-red-800">{solucion.problema}</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg text-green-900 mb-2">La Solución</h3>
                  <p className="text-green-800">{solucion.solucion}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-8">
            Beneficios de Resolver Este Problema
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solucion.beneficios.map((beneficio, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700">{beneficio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pasos de Solución */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Proceso Paso a Paso
          </h2>
          <div className="space-y-8">
            {solucion.pasos.map((paso) => (
              <div key={paso.numero} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
                    {paso.numero}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{paso.titulo}</h3>
                  <p className="text-gray-700 mb-4">{paso.descripcion}</p>
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                    <p className="font-semibold text-blue-900 mb-2">💡 Tips:</p>
                    <ul className="space-y-1 text-blue-800 text-sm">
                      {paso.tips.map((tip, index) => (
                        <li key={index}>• {tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consideraciones Importantes */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Consideraciones Importantes
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {solucion.consideraciones.map((consideracion, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{consideracion.icono}</span>
                  <div>
                    <h3 className="font-bold text-lg mb-2">{consideracion.titulo}</h3>
                    <p className="text-gray-700">{consideracion.descripcion}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proveedores Recomendados */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-4">
            Operadores Recomendados para Esta Solución
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Estos proveedores tienen las mejores soluciones para tu caso específico
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {solucion.proveedoresRecomendados.map((proveedor, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold mb-3">{proveedor.nombre}</h3>
                <p className="text-gray-700 mb-4">{proveedor.razon}</p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                  <p className="text-sm text-green-800">
                    <span className="font-semibold">🎁 Promoción:</span> {proveedor.promocion}
                  </p>
                </div>
                <a
                  href={proveedor.link}
                  className="block text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Ver Planes de {proveedor.nombre}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-12 px-4 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿Necesitas Ayuda Personalizada?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Nuestros expertos te asesoran gratis para encontrar la mejor solución a tu problema de internet
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-md mx-auto">
            <QuickCallForm buttonColor="#2563eb" />
          </div>
          <p className="text-sm text-blue-200 mt-4">
            <Phone className="w-4 h-4 inline mr-1" />
            Te llamamos en menos de 2 horas • 100% gratis • Sin compromiso
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Preguntas Frecuentes
          </h2>
          <FAQSection faqs={solucion.faqs} accentColor="blue" />
        </div>
      </section>

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: solucion.titulo,
            description: solucion.descripcion,
            totalTime: solucion.tiempoEstimado,
            estimatedCost: {
              '@type': 'MonetaryAmount',
              currency: 'COP',
              value: solucion.costoPromedio,
            },
            step: solucion.pasos.map((paso) => ({
              '@type': 'HowToStep',
              position: paso.numero,
              name: paso.titulo,
              text: paso.descripcion,
              itemListElement: paso.tips.map((tip, index) => ({
                '@type': 'HowToTip',
                position: index + 1,
                text: tip,
              })),
            })),
          }),
        }}
      />

      {/* Content Cluster Navigation */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <ClusterNavigation />
          </div>
        </div>
      </section>
    </div>
  );
}
