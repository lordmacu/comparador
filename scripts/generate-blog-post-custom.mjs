import fs from "fs/promises";
import path from "path";
import dotenv from "dotenv";
import sharp from "sharp";
import { promisify } from "util";
import { exec } from "child_process";

const execAsync = promisify(exec);

dotenv.config();

// ==================== CONFIGURACIÓN ====================
const API_BASE_URL = "http://localhost:54321";
const PROMPT_API_URL = "http://localhost:54321/api/prompt/set";
const MAX_RETRIES = 60; // 60 intentos × 2 segundos = 2 minutos máximo
const RETRY_DELAY = 2000; // 2 segundos entre intentos
const IMAGE_STYLES = [
  "ilustración editorial estilo The New Yorker, minimalista, líneas limpias, paleta limitada de colores",
  "ilustración digital plana estilo Kurzgesagt, infografía con iconos, colores vibrantes y gradientes suaves",
  "arte vectorial moderno estilo tech startup, isométrico, colores corporativos azul y naranja",
  "ilustración de concepto estilo Apple keynote, limpio, elegante, enfoque en un solo objeto central",
  "diseño gráfico estilo revista Wired, futurista, neón, cyberpunk, tecnología",
  "ilustración narrativa estilo Medium, cálida, orgánica, texturas sutiles",
    // Fotografía realista (7 variantes)
  "fotografía documental urbana tipo National Geographic, personas reales en TransMilenio o calles de Bogotá usando celulares, luz difusa de día nublado típico bogotano, textura granulada",
  "estilo fotoperiodismo Reuters, colombianos diversos (vendedor ambulante, oficinista, estudiante) con smartphones, fondo desenfocado de ladrillos rojos y buses, colores vibrantes pero naturales",
  "fotografía lifestyle editorial tipo Vogue, grupo multigeneracional colombiano en sala moderna con laptops y tablets, ventanas grandes con cerros de Bogotá al fondo, tonos cálidos terracota",
  "street photography estilo Magnum, primer plano de manos colombianas sosteniendo celular en bus lleno, rostros parcialmente visibles reflejados en ventanas, blanco y negro con toques de color en pantallas",
  "fotografía arquitectónica humanizada, vista aérea 45° de family en apartamento bogotano (visible alfombra, sofá, plantas), todos en diferentes dispositivos, iluminación cálida interior vs ciudad gris exterior",
  "estilo documental tecnológico tipo Wired, técnico colombiano de ISP en poste de Bogotá empalmando fibra óptica, close-up de manos con herramientas, fondo desenfocado de cables y ciudad",
  "fotografía corporativa editorial tipo Forbes, emprendedor colombiano en oficina moderna de Chapinero, MacBook con gráficos visibles, panorámica de Bogotá nocturna tras ventanal, tonos azul-naranja complementarios",
  
  // Estilos ilustrados/artísticos (7 variantes)
  "ilustración digital estilo New Yorker, escena isométrica de edificios bogotanos conectados por líneas de fibra óptica brillantes, personas como siluetas coloridas en ventanas, paleta limitada (azul, amarillo, rojo)",
  "arte vectorial flat design moderno tipo Dropbox, colombianos geométricos diversos usando devices, formas abstractas de cerros y edificios al fondo, colores planos saturados (verde esmeralda, fucsia, amarillo canario)",
  "ilustración watercolor digital, familia colombiana en living bogotano con laptops y tablets, acuarela suave con salpicaduras, arquitectura colonial visible por ventanas, tonos pastel cálidos",
  "arte estilo comic europeo tipo Moebius, vista panorámica cyberpunk-lite de Bogotá del futuro con antenas y satélites, personas en primer plano con hologramas, líneas limpias, colores neón sobre base oscura",
  "ilustración editorial tipo The Guardian, collage semi-abstracto con rostros colombianos fotográficos mezclados con elementos gráficos (routers, cables, señales WiFi), textura de periódico, paleta rojo-negro-blanco",
  "arte digital tipo Pixar/Disney, escena 3D render de cafetería bogotana (Juan Valdez style) llena de personas cartoon con laptops, luz volumétrica, colores saturados cálidos, texturas suaves",
  "ilustración minimalista tipo Apple Marketing, siluetas negras de colombianos con devices contra degradado vibrante (naranja-rosa-morado), formas geométricas simples de Monserrate y edificios, composición limpia",
  
  // Estilos anime/Ghibli (3 variantes mejoradas)
  "Studio Ghibli estilo Spirited Away, joven colombiana en café bogotano mágico-realista con laptop, clientes fantasmales translúcidos en fondo, colores acuarelados pastel, nubes volumétricas por ventanas, detalles arquitectónicos coloniales",
  "anime Ghibli tipo Whisper of the Heart, estudiante colombiano en biblioteca de barrio bogotano rodeado de libros y tablets, luz dorada de atardecer entrando por ventanales, polvo brillante flotando, cerros verdes y ciudad al fondo, paleta cálida nostálgica",
  "Ghibli estilo Porco Rosso, técnico colombiano aventurero en azotea bogotana reparando antena gigante con herramientas steampunk, cielo dramático con nubes esponjosas, vista de tejados rojos infinitos, tonos sepia-azul-naranja",
  
  // Estilos experimentales (3 variantes)
  "fotografía tipo Wes Anderson, composición perfectamente simétrica de oficina colombiana retro-futurista, empleados idénticos en desks con computadores antiguos, paleta pastel (rosa pálido, verde menta, amarillo crema), centro absoluto",
  "collage mixto tipo David Hockney, múltiples fotografías superpuestas de mismo colombiano en diferentes momentos del día usando internet (desayuno, trabajo, noche), perspectivas cambiantes, colores saturados contrastantes",
  "fotografía infrarroja falso color, paisaje urbano de Bogotá con personas usando celulares, vegetación en rosa-magenta brillante, cielo dramático naranja, piel en tonos cian, edificios en amarillo-verde",
  "arte digital estilo Wes Anderson, simétrico, paleta pastel vintage, composición centrada",
];

// ==================== UTILIDADES DE LOGGING ====================
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
  gray: "\x1b[90m",
};

function log(message, level = "info") {
  const timestamp = new Date().toLocaleTimeString("es-CO");
  const colorMap = {
    info: colors.cyan,
    success: colors.green,
    error: colors.red,
    warning: colors.yellow,
  };
  
  const color = colorMap[level] || colors.gray;
  console.log(`${colors.dim}[${timestamp}]${colors.reset} ${color}${message}${colors.reset}`);
}

// ==================== FUNCIONES DE API ====================

/**
 * Verifica el estado del sistema
 */
async function checkStatus() {
  try {
    log(`Consultando ${API_BASE_URL}/api/status...`, "info");
    const response = await fetch(`${API_BASE_URL}/api/status`);
    const data = await response.json();
    log(`Estado: ${data.available ? 'DISPONIBLE' : 'OCUPADO'} ${data.taskId ? `(taskId: ${data.taskId})` : ''}`, data.available ? "success" : "warning");
    return data;
  } catch (error) {
    log(`Error al verificar estado: ${error.message}`, "error");
    throw new Error(`Error al verificar estado: ${error.message}`);
  }
}

/**
 * Espera a que el sistema esté disponible (sin límite de tiempo)
 */
async function waitForAvailability() {
  log("Verificando disponibilidad del sistema...", "info");
  log("⚠️  Esperará indefinidamente hasta que esté disponible", "warning");
  
  let attempts = 0;
  while (true) {
    attempts++;
    const elapsed = (attempts * RETRY_DELAY) / 1000;
    
    const status = await checkStatus();
    
    if (status.available) {
      log("✅ Sistema disponible para procesar nuevo prompt", "success");
      return true;
    }
    
    log(`⏳ Sistema ocupado (taskId: ${status.taskId}), esperando ${RETRY_DELAY/1000}s... [${elapsed}s transcurridos]`, "warning");
    await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
  }
}

/**
 * Envía un prompt a la API
 */
async function sendPrompt(promptData) {
  try {
    log(`📤 Enviando POST a ${API_BASE_URL}/api/prompt/set`, "info");
    log(`   - ID: ${promptData.id}`, "info");
    log(`   - New Chat: ${promptData.newChat}`, "info");
    log(`   - Extract JSON: ${promptData.extractJson}`, "info");
    log(`   - Is Image: ${promptData.isImage || false}`, "info");
    log(`   - Prompt length: ${promptData.prompt.length} caracteres`, "info");
    
    const response = await fetch(`${API_BASE_URL}/api/prompt/set`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(promptData),
    });
    
    log(`📥 Respuesta HTTP: ${response.status} ${response.statusText}`, response.ok ? "success" : "error");
    
    const data = await response.json();
    
    if (response.status === 409) {
      log("⚠️  Conflicto 409: Sistema ocupado", "error");
      throw new Error("Sistema ocupado - Conflicto 409");
    }
    
    if (!data.success) {
      log(`❌ Error en respuesta: ${data.error || 'Unknown'}`, "error");
      throw new Error(data.error || "Error al enviar prompt");
    }
    
    log("✅ Prompt enviado exitosamente", "success");
    log(`   Respuesta: ${JSON.stringify(data.message || 'OK')}`, "info");
    
    return data;
  } catch (error) {
    log(`❌ Error al enviar prompt: ${error.message}`, "error");
    throw new Error(`Error al enviar prompt: ${error.message}`);
  }
}

/**
 * Limpia el prompt actual y resetea el sistema
 */
async function clearPrompt() {
  try {
    log("🧹 Limpiando prompt y liberando sistema...", "info");
    const response = await fetch(`${API_BASE_URL}/api/prompt/clear`, {
      method: "POST",
    });
    
    const data = await response.json();
    
    if (data.success) {
      log("✅ Sistema reseteado y disponible para nuevo proceso", "success");
      return true;
    }
    
    log("⚠️  No se pudo resetear el sistema", "warning");
    return false;
  } catch (error) {
    log(`⚠️  Error al limpiar prompt: ${error.message}`, "warning");
    return false;
  }
}

/**
 * Obtiene una conversación por ID (con polling infinito hasta que esté lista)
 */
async function getConversation(id) {
  let attempts = 0;
  log(`🔍 Iniciando polling para conversación: ${id}`, "info");
  log(`   ⚠️  Sin límite de tiempo - esperará hasta que esté lista`, "warning");
  log(`   Verificando cada ${RETRY_DELAY/1000}s...`, "info");
  
  while (true) {
    try {
      attempts++;
      const elapsed = (attempts * RETRY_DELAY) / 1000;
      
      // Cada 10 intentos, verificar el status del sistema
      if (attempts % 10 === 0) {
        log(`⏱️  Tiempo transcurrido: ${elapsed}s (${attempts} intentos)`, "info");
        try {
          const status = await checkStatus();
          if (status.taskId === id) {
            log(`   🔄 Tu tarea (${id}) aún está en proceso...`, "info");
          } else if (status.available) {
            log(`   ⚠️  Sistema disponible pero la conversación aún no existe`, "warning");
          }
        } catch (e) {
          // Ignorar errores de status check
        }
      }
      
      log(`📡 GET /api/conversations/${id} [intento ${attempts}, ${elapsed}s]`, "info");
      const response = await fetch(`${API_BASE_URL}/api/conversations/${id}`);
      
      if (response.status === 200) {
        log(`✅ Conversación encontrada (200 OK) después de ${elapsed}s`, "success");
        const data = await response.json();
        log(`   - ID: ${data.id}`, "info");
        log(`   - Mensajes: ${data.messages?.length || 0}`, "info");
        log(`   - Último mensaje de: ${data.messages?.[data.messages.length - 1]?.role || 'N/A'}`, "info");
        return data;
      }
      
      if (response.status === 404) {
        // Archivo aún no generado, seguir esperando indefinidamente
        log(`⏳ 404 - Esperando... (${elapsed}s transcurridos)`, "info");
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        continue;
      }
      
      // Otros errores HTTP
      log(`⚠️  Error HTTP ${response.status}, reintentando...`, "warning");
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      
    } catch (error) {
      const elapsed = (attempts * RETRY_DELAY) / 1000;
      log(`⚠️  Error en intento ${attempts} (${elapsed}s): ${error.message}`, "warning");
      log(`   Reintentando en ${RETRY_DELAY/1000}s...`, "info");
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
    }
  }
}

// ==================== PROMPT DE INVESTIGACIÓN ====================

const RESEARCH_PROMPT = `Eres un analista experto en tendencias de tecnología digital, internet, telecomunicaciones e innovación tecnológica. Monitoreas constantemente Google Trends, noticias tech globales y el ecosistema digital de Colombia/Bogotá.

🎯 MISIÓN PRINCIPAL: 
Identificar temas ALTAMENTE RELEVANTES, ACTUALES Y CON POTENCIAL SEO sobre tecnología e internet que:
1. Respondan consultas reales que la gente busca en Google HOY
2. Aporten valor educativo e informativo de calidad
3. Posicionen con keywords estratégicas de alto volumen
4. Conecten naturalmente con la comparación de servicios de internet en Bogotá

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🌐 CATEGORÍAS DE CONTENIDO (Distribución estratégica):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🌐 1. BANDA ANCHA Y FIBRA ÓPTICA (40%):
────────────────────────────────────────
• Fibra óptica FTTH vs FTTB vs FTTC: diferencias técnicas y prácticas
• Expansión de fibra en Bogotá: nuevas zonas, cronogramas, operadores
• tecnologías de fibra, velocidades, futuro
• Banda ancha simétrica vs asimétrica: casos de uso, ventajas
• Internet de alta velocidad: ¿cuándo se necesitan 500 Mbps, 1 Gbps o más?
• Fibra óptica vs cable coaxial: diferencias de latencia, estabilidad, velocidad
• Última milla: cómo llega internet a tu casa, tecnologías disponibles
• Multi-gig internet residencial: disponibilidad en Colombia, casos de uso
• Calidad de banda ancha: métricas más allá de velocidad (jitter, packet loss)
• Instalación de fibra: proceso, costos, equipos necesarios
• Backbone de fibra en Colombia: inversiones, rutas, infraestructura

📡 2. INTERNET SATELITAL Y ALTERNATIVAS (20%):
───────────────────────────────────────────────
• Starlink en Colombia: cobertura, velocidades reales, costos 2026
• Internet satelital vs fibra vs 4G/5G: cuándo tiene sentido cada uno
• OneWeb, Amazon Kuiper: alternativas a Starlink, estado actual
• Latencia en internet satelital: LEO vs GEO, mejoras tecnológicas
• Internet en zonas rurales: opciones disponibles en Colombia
• 5G fijo como alternativa a fibra: velocidades, limitaciones, cobertura
• WISPs (Wireless ISPs): cuándo son una opción viable
• Soluciones híbridas: backup satelital para conexiones críticas
• Costos comparados: satelital vs terrestre en diferentes escenarios
• Regulación de internet satelital en Colombia

🔒 3. CIBERSEGURIDAD Y PRIVACIDAD (15%):
────────────────────────────────────────
• VPNs: cuándo usarlas, mejores opciones, mitos vs realidad
• DNS seguro (DoH, DoT): qué es, cómo configurar, beneficios
• Amenazas actuales: phishing, ransomware, ataques DDoS
• Protección del router: cambio de contraseñas, firmware, exploits comunes
• Redes WiFi públicas: riesgos y mejores prácticas
• Protección de datos personales en Colombia (ley 1581)
• Autenticación de dos factores para servicios críticos
• Neutralidad de red: estado actual y regulaciones
• Cifrado end-to-end en videollamadas y mensajería

🛠️ 4. GUÍAS PRÁCTICAS Y SOLUCIONES (15%):
──────────────────────────────────────────
• "Internet lento: diagnóstico completo y 15 soluciones efectivas"
• "Cómo elegir plan de internet: velocidad necesaria por uso real"
• "Optimizar WiFi: ubicación, canales, ancho de banda, interferencias"
• "Velocidad necesaria por uso: Netflix 4K, gaming competitivo, Zoom, trabajo remoto"
• "Latencia vs velocidad: qué importa para gaming, videollamadas, browsing"
• "Medir velocidad real: mejores herramientas, interpretar resultados"
• "Internet simétrico vs asimétrico: diferencias, cuándo importa"
• "Extender WiFi: comparativa de soluciones (mesh, powerline, repetidor)"
• "Bufferbloat: qué es y cómo solucionarlo"
• "Smart home: bandwidth necesario, mejores prácticas de red"
• "Trabajo remoto: setup de red ideal, backup de internet"
• "Configurar QoS: priorizar tráfico crítico en tu red"

📰 5. NOTICIAS Y ACTUALIDAD TECNOLÓGICA (10%):
───────────────────────────────────────────────
• Inversiones en infraestructura de banda ancha: Claro, Movistar, ETB
• Regulaciones MinTIC: espectro, licencias, obligaciones de cobertura
• Estudios de velocidad: Ookla, Netflix ISP Index, rankings Colombia
• Cambios tarifarios y promociones del sector telecomunicaciones
• Quejas SuperIntendencia TIC: operadores, patrones, resoluciones
• Apagones o caídas masivas de servicio
• Lanzamiento de nuevos servicios o tecnologías en Colombia
• Acuerdos de infraestructura compartida entre operadores
• Programas gobierno para conectividad rural
• Competencia en mercado de banda ancha
• GPON vs EPON vs XGS-PON: tipos de fibra, diferencias para usuario final
• Backbone de internet: cómo funciona la infraestructura global
• Cables submarinos: mapa, importancia para Latinoamérica
• Redes metropolitanas: cómo se conecta tu hogar con el mundo
• PON vs Ethernet dedicado: internet residencial vs empresarial
• Bufferbloat y diseño de queues en ISPs
• CG-NAT: qué es, limitaciones, alternativas

🌍 6. CONTEXTO LOCAL BOGOTÁ/COLOMBIA (10%):
───────────────────────────────────────────────
• Cobertura fibra óptica por localidad en Bogotá 2026
• Comparativa de tecnologías disponibles por zona
• Internet en estratos 1-2: opciones económicas, programas sociales
• Derechos del consumidor de internet en Colombia
• Proceso de cambio de operador: portabilidad, penalizaciones
• Internet para pequeñas empresas: diferencias con residencial
• Zonas con mejor/peor conectividad en Bogotá
• Iniciativas gobierno: Colombia Conecta, MinTIC

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 KEYWORDS SEO DE ALTO IMPACTO:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

INFORMATIVAS (alto volumen, bajo comercial):
✓ "qué es [tecnología] y para qué sirve"
✓ "cómo funciona [tecnología] explicado fácil"
✓ "diferencia entre [tech A] y [tech B]"
✓ "para qué sirve [función/tecnología]"
✓ "ventajas y desventajas de [tecnología]"

SOLUCIÓN DE PROBLEMAS (alta intención):
✓ "por qué mi [problema] y cómo solucionarlo"
✓ "cómo mejorar/optimizar/arreglar [aspecto]"
✓ "[problema común] causas y soluciones"
✓ "diagnóstico [problema]"

COMPARATIVAS Y DECISIONES:
✓ "qué [opción] elegir en 2026"
✓ "[opción A] vs [opción B] cuál es mejor"
✓ "mejor [producto/servicio] para [uso específico]"
✓ "vale la pena [tecnología nueva] en 2026"

CASOS DE USO ESPECÍFICOS:
✓ "velocidad internet necesaria para [actividad]"
✓ "internet para [gaming/streaming/teletrabajo]"
✓ "setup de red para [uso específico]"

LOCALES + TECH (mix poderoso):
✓ "[tecnología] en Colombia/Bogotá 2026"
✓ "[servicio] disponible en Bogotá"
✓ "cuándo llega [tecnología] a Colombia"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ CRITERIOS DE VALIDACIÓN (Todos obligatorios):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. RELEVANCIA ACTUAL:
   ✓ Tema con búsquedas activas en Google Trends
   ✓ Noticias o discusiones recientes (últimos 3 meses)
   ✓ Tecnología disponible o próxima (no ciencia ficción lejana)

2. VALOR EDUCATIVO:
   ✓ Responde preguntas reales y comunes
   ✓ Aporta información práctica y accionable
   ✓ Explicable con datos, estudios o fuentes confiables

3. POTENCIAL SEO:
   ✓ Keywords con volumen de búsqueda significativo
   ✓ Competencia moderada (posible rankear en 3-6 meses)
   ✓ Long-tail keywords específicas incluidas

4. CONEXIÓN NATURAL:
   ✓ El tema conecta lógicamente con servicios de internet
   ✓ CTA final fluye naturalmente (no forzado)
   ✓ Audiencia target tiene poder de decisión sobre contratación

5. DIFERENCIACIÓN:
   ✓ Perspectiva única o ángulo específico
   ✓ Información actualizada (no contenido genérico reciclado)
   ✓ Aplicable al contexto colombiano cuando sea relevante

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠️ EVITAR ABSOLUTAMENTE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❌ Comparativas directas de operadores (ya existen en el sitio)
❌ Contenido puramente comercial o promocional
❌ Temas sin búsquedas o demasiado nicho (< 100 búsquedas/mes estimadas)
❌ Ciencia ficción sin aplicación práctica cercana
❌ Temas sin fuentes verificables o muy polémicos
❌ Duplicados de contenido existente en el sitio

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📤 FORMATO DE RESPUESTA (JSON ESTRICTO):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

{
  "topics": [
    {
      "title": "Título SEO-optimizado con keyword principal (max 60 caracteres)",
      "reason": "Razón de relevancia ACTUAL: por qué la gente busca esto HOY, qué problema/curiosidad resuelve, datos de tendencia si es posible, y conexión lógica con comparación de planes",
      "keywords": ["keyword principal", "keyword secundaria 1", "keyword long-tail específica", "variante local si aplica"],
      "scope": "global|local|mixed",
      "category": "emergente|seguridad|practica|noticia|arquitectura|local"
    }
  ]
}

🎲 INSTRUCCIONES DE GENERACIÓN:
─────────────────────────────────
• Genera 3-4 temas variados (diferentes categorías)
• Prioriza temas con tendencia ASCENDENTE en búsquedas
• Primer tema = máxima relevancia/urgencia actual
• Balance: 60% global + 20% local + 20% mixed
• Cada título debe ser único y específico
• Keywords deben ser variadas y estratégicas

⚠️  CRÍTICO: Responde ÚNICAMENTE con el objeto JSON válido.
    Sin texto adicional, sin explicaciones, sin markdown.
    Solo JSON puro y válido.`;

// ==================== PROMPT DE REDACCIÓN ====================

const WRITING_SYSTEM_PROMPT = `Eres un periodista tecnológico geek con profundo conocimiento técnico de redes, telecomunicaciones e infraestructura de internet. Escribes con la pasión de un tech enthusiast pero la rigurosidad de un periodista investigativo.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 TU PERSONALIDAD COMO ESCRITOR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**GEEK TECH AUTÉNTICO:**
- Entiendes profundamente cómo funcionan las redes: GPON, latencia, bufferbloat, QoS
- Te emociona explicar tecnología compleja de forma accesible
- Usas analogías ingeniosas para conceptos técnicos difíciles
- Referencias culturales tech: speedtest memes, subreddits de networking, YouTubers tech

**PERIODISTA INVESTIGATIVO:**
- Basas afirmaciones en datos verificables (Ookla, MinTIC, reportes operadores)
- Crítico cuando hay que serlo, objetivo siempre
- Reconoces ventajas y limitaciones sin sesgos comerciales
- Citas fuentes cuando introduces estadísticas o estudios

**CERCANO Y CONVERSACIONAL:**
- Hablas directo al lector, como un amigo experto explicando
- Usas segunda persona: "si tu internet va lento", "cuando estés jugando"
- Preguntas retóricas que conectan: "¿Te ha pasado que...?"
- Toques de humor sutil cuando sea apropiado (nunca forzado)

**COLOMBIANO CON CONTEXTO:**
- Referencias geográficas específicas: Chapinero, Suba, Kennedy, TransMilenio
- Menciona realidades locales: estratos, coberturas por barrio, precios COP
- Compara con contexto regional cuando sea relevante
- Evita modismos excesivos pero usa algunos estratégicamente

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✍️ ESTILO DE ESCRITURA Y RITMO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**VARIACIÓN DE RITMO:**
- Alterna párrafos cortos (impacto) con párrafos medios (desarrollo)
- Usa listas bullet para conceptos claros y escaneables
- Párrafos de apertura: cortos y enganchadores (2-3 líneas)
- Secciones técnicas: desarrolladas pero digestibles (4-5 líneas máx por párrafo)

**HOOKS EFECTIVOS:**
- Abre secciones con preguntas directas o datos sorprendentes
- "Aquí está el detalle que pocos conocen..."
- "Esto es lo que realmente importa..."
- "La verdad técnica detrás de..."

**TRANSICIONES FLUIDAS:**
- Conecta ideas naturalmente sin usar "por otro lado" repetitivo
- "Ahora bien...", "Lo interesante es que...", "Pero hay más..."
- Cierra secciones con gancho a la siguiente

**EXPLICACIONES TÉCNICAS:**
- Concepto → Analogía → Aplicación práctica
- Ejemplo: "GPON es como un árbol: una fibra principal se ramifica a múltiples hogares. 
  Esto significa que compartes ancho de banda con tus vecinos, como compartir un carril en autopista."
- Siempre responde: "¿Por qué me importa esto?"

**TONO Y VOZ:**
- Entusiasta sin ser exagerado
- Informado sin ser pedante
- Crítico sin ser cínico
- Cercano sin ser informal en exceso
- Comparar con: The Verge en español, Xataka, Genbeta (tono tech pero accesible)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📐 ESTRUCTURA NARRATIVA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**APERTURA (Hook + Contexto):**
- Dato sorprendente o pregunta provocadora (1 párrafo corto)
- Contexto y relevancia actual (1-2 párrafos)
- Preview de lo que aprenderás (1 párrafo)

**DESARROLLO (5-7 secciones H2):**
- Usa H2 como preguntas que el lector haría (mínimo 2)
  ✅ "## ¿Qué es fibra GPON y por qué importa?"
  ✅ "## ¿Cuánta velocidad necesitas realmente?"
  ❌ "## Características de la fibra óptica"
  
**CADA SECCIÓN:**
- Hook/pregunta (1 línea)
- Explicación técnica accesible (2-3 párrafos)
- Ejemplo práctico o datos específicos
- Transición a siguiente tema

**CIERRE:**
- Resumen de puntos clave (bullet list)
- Consejo accionable específico
- CTA natural para comparar planes

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚫 PROHIBICIONES ESTRICTAS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❌ **Clichés corporativos:**
- "En conclusión...", "Cabe resaltar...", "Es importante mencionar..."
- Lenguaje de comunicado de prensa
- Promesas exageradas o garantías absolutas

❌ **Informalidad excesiva:**
- "Pilas", "carreta", "no coma cuento", "bacano", "chimba"
- Emojis en el cuerpo del texto
- Lenguaje tipo WhatsApp o redes sociales

❌ **Errores técnicos:**
- Confundir velocidad con latencia
- Decir "megas" cuando son "Mbps"
- Generalizar sin especificar contexto de uso

❌ **Contenido genérico:**
- "El internet es importante en la vida moderna..."
- Relleno obvio sin información útil
- No copiar frases de otros blogs palabra por palabra

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💡 PRINCIPIOS GUÍA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. **DENSIDAD DE INFORMACIÓN:** Cada párrafo debe aportar algo útil
2. **ESPECIFICIDAD:** Datos concretos > generalidades vagas
3. **PERSPECTIVA ÚNICA:** No repitas lo que ya está en Wikipedia
4. **UTILIDAD PRÁCTICA:** El lector debe salir sabiendo QUÉ HACER
5. **HONESTIDAD:** No hay "mejor absoluto", solo "mejor para [perfil]"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📏 SPECS TÉCNICAS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- **Longitud total:** 1200-1800 palabras
- **Párrafos:** 2-5 líneas promedio (no bloques de 10+ líneas)
- **Secciones H2:** 5-7 secciones
- **Listas:** Usa bullets cuando enumeres 3+ items
- **Formato:** MARKDOWN PURO (nunca HTML tags)
- **Reading level:** Entendible para público general pero respetando inteligencia del lector`;

function buildWritingPrompt(selectedTopic) {
  return `MISIÓN: Escribe un artículo periodístico tech sobre este tema con estilo colombiano auténtico.

TEMA: "${selectedTopic.title}"
KEYWORDS SEO: ${selectedTopic.keywords.join(', ')}
CONTEXTO: ${selectedTopic.reason}
ALCANCE: ${selectedTopic.scope || 'mixed'} (global, local o mixed)

REQUISITOS ESTRICTOS:

📝 ESTRUCTURA:
- Título: Atractivo, con keywords SEO naturales
- Descripción (meta): 140-160 caracteres, incluye beneficio claro
- Apertura: Contexto relevante (2 párrafos) - puede ser global o local según el tema
- 5-7 secciones H2 (mínimo 2 como preguntas directas del lector)
- Cada sección: 200-300 palabras
- Cierre: Resumen práctico con llamado a la acción natural

🔤 FORMATO CRÍTICO - MARKDOWN PURO:
- USA MARKDOWN, NO HTML
- Párrafos: Texto normal, saltos de línea con doble enter
- Títulos nivel 2: ## Título (sin tags <h2>)
- Listas: - Item (con guión y espacio)
- Negritas: **texto** (doble asterisco)
- Enlaces: [texto](url)
- NO uses <ul>, <li>, <strong>, <p> ni otros tags HTML

🔗 ENLACES INTERNOS OBLIGATORIOS (SEO):
**IMPORTANTE**: Debes incluir enlaces naturales en el texto según estas reglas:

1. **Cuando menciones ETB** → Enlaza: [ETB](https://comparadorinternet.co/etb)
   Ejemplo: "Según estudios recientes, [ETB](https://comparadorinternet.co/etb) ofrece..."

2. **Cuando menciones Claro** → Enlaza: [Claro](https://comparadorinternet.co/claro)
   Ejemplo: "Por otro lado, [Claro](https://comparadorinternet.co/claro) se destaca por..."

3. **Cuando menciones Movistar** → Enlaza: [Movistar](https://comparadorinternet.co/movistar)
   Ejemplo: "En el caso de [Movistar](https://comparadorinternet.co/movistar), la ventaja es..."

4. **Cuando hables de comparar planes o elegir operador** → Enlaza a la home
   Ejemplos:
   - "Si necesitas [comparar planes de internet](https://comparadorinternet.co)..."
   - "Puedes [ver todas las opciones disponibles](https://comparadorinternet.co) en tu zona"
   - "Para [encontrar el mejor plan](https://comparadorinternet.co) según tus necesidades..."

**REGLAS DE ENLACES**:
- ✅ Enlaza SOLO la primera mención de cada operador
- ✅ Usa el nombre del operador como anchor text
- ✅ Incluye al menos 2-3 enlaces internos por artículo
- ✅ Hazlo natural, no forzado
- ❌ NO enlaces todas las menciones (spam)
- ❌ NO uses "haz clic aquí" como anchor text

🎯 CONTENIDO:
- Primera línea: Gancho directo con pregunta o afirmación
- Si es tema global: Contextualiza para Colombia/Bogotá
- Si es tema local: Aporta perspectiva global cuando sea relevante
- Datos específicos verificables (precios, velocidades, estudios)
- Balanceado y objetivo, no publicitario
- Casos de uso claros según el tema
- **Menciona operadores cuando sea relevante** para poder enlazarlos

🌍 ENFOQUE SEGÚN ALCANCE:
- Global: Habla de tendencias mundiales pero menciona aplicación en Colombia
- Local: Enfoque Bogotá pero referencia contexto nacional/internacional
- Mixed: Balance equilibrado entre ambos

🔗 SECCIÓN FINAL (OBLIGATORIA):
La última sección debe cerrar con un párrafo que oriente naturalmente a comparar planes:

Ejemplo apropiado:
"Ahora que conoces [tema], es momento de evaluar tus opciones. Si estás en Bogotá, operadores como [ETB](https://comparadorinternet.co/etb), [Claro](https://comparadorinternet.co/claro) y [Movistar](https://comparadorinternet.co/movistar) ofrecen diferentes soluciones. Puedes [comparar todos los planes disponibles](https://comparadorinternet.co) para encontrar el que mejor se ajuste a tu caso."

📊 METADATOS:
- Autor: "Equipo Editorial"
- Categoría: Elige entre [Tecnología, Comparativas, Guías, Noticias, Fibra Óptica, 5G, Gaming, Teletrabajo, Seguridad]
- Tags: 4-6 tags relevantes (incluye tecnología + operadores si se mencionan)

📤 FORMATO DE RESPUESTA:

Genera EXACTAMENTE este JSON (solo JSON, sin texto adicional):

{
  "slug": "url-amigable-del-articulo",
  "title": "Título del artículo",
  "description": "Meta descripción de 140-160 caracteres",
  "content": "# Título principal\\n\\nPárrafo intro...\\n\\n## Primera sección\\n\\nCuando hablamos de conectividad, operadores como [ETB](https://comparadorinternet.co/etb) ofrecen...\\n\\n## Segunda sección\\n\\nContenido...\\n\\n## Cierre\\n\\nPuedes [comparar planes aquí](https://comparadorinternet.co)...",
  "author": "Equipo Editorial",
  "category": "Categoría",
  "tags": ["tag1", "tag2", "tag3", "tag4"],
  "readingTime": 10
}

NOTAS IMPORTANTES:
1. El campo "content" debe ser un STRING con Markdown puro
2. Usa \\n para saltos de línea dentro del string JSON
3. **INCLUYE LOS ENLACES INTERNOS EN EL CONTENIDO**
4. Formato de enlaces: [texto](https://comparadorinternet.co/operador)
5. NO uses HTML, solo Markdown
6. El slug debe ser SEO-friendly (minúsculas, sin acentos, con guiones)
7. readingTime = palabras totales / 200 (redondear)
8. **Mínimo 2-3 enlaces internos por artículo**

GENERA EL ARTÍCULO AHORA CON LOS ENLACES INTERNOS.`;
}

// ==================== FUNCIÓN PRINCIPAL DE INVESTIGACIÓN ====================

async function investigarTemas() {
  try {
    log("=".repeat(60), "info");
    log("🔍 INICIANDO INVESTIGACIÓN DE TEMAS", "info");
    log("=".repeat(60), "info");
    
    // 1. Esperar disponibilidad
    await waitForAvailability();
    
    // 2. Generar ID único para esta investigación
    const taskId = `research_${Date.now()}`;
    log(`Task ID: ${taskId}`, "info");
    
    // 3. Enviar prompt de investigación
    log("Enviando prompt de investigación a ChatGPT...", "info");
    await sendPrompt({
      prompt: RESEARCH_PROMPT,
      id: taskId,
      newChat: true,
      saveLastMessageOnly: true,
      extractJson: true, // Importante: extraer JSON automáticamente
      focused: true, // No mostrar ventana
    });
    
    log("✓ Prompt enviado, esperando respuesta de ChatGPT...", "success");
    
    // 4. Esperar y obtener respuesta
    log("Polling conversación (esto puede tomar 30-60 segundos)...", "info");
    const conversation = await getConversation(taskId);
    
    // 5. Procesar respuesta
    log("=".repeat(60), "success");
    log("✅ RESPUESTA RECIBIDA DE CHATGPT", "success");
    log("=".repeat(60), "success");
    
    // La API ya parsea el JSON automáticamente si extractJson: true
    const responseText = conversation.messages[conversation.messages.length - 1].text;
    log(`📄 Tipo de respuesta: ${typeof responseText}`, "info");
    
    if (typeof responseText === 'string') {
      log(`   Longitud: ${responseText.length} caracteres`, "info");
      log(`   Preview: ${responseText.substring(0, 100)}...`, "info");
    }
    
    let topics;
    if (typeof responseText === 'object') {
      // Ya está parseado
      log("✅ Respuesta ya es objeto JSON (parseado por API)", "success");
      topics = responseText;
    } else {
      // Parsear manualmente si es string
      log("🔄 Parseando respuesta de texto a JSON...", "info");
      try {
        topics = JSON.parse(responseText);
        log("✅ JSON parseado exitosamente", "success");
      } catch (error) {
        log("⚠️  Error al parsear JSON directo, intentando extraer de code block...", "warning");
        // Intentar extraer JSON de markdown code blocks
        const jsonMatch = responseText.match(/```json\s*([\s\S]*?)\s*```/) || 
                         responseText.match(/```\s*([\s\S]*?)\s*```/);
        if (jsonMatch) {
          log("✅ JSON extraído de code block markdown", "success");
          topics = JSON.parse(jsonMatch[1]);
        } else {
          log("❌ No se encontró JSON en la respuesta", "error");
          log(`Respuesta completa:\n${responseText}`, "error");
          throw new Error("No se pudo parsear el JSON de la respuesta");
        }
      }
    }
    
    // 6. Validar estructura
    log("🔍 Validando estructura de respuesta...", "info");
    log(`   Tiene propiedad 'topics': ${!!topics.topics}`, "info");
    log(`   'topics' es array: ${Array.isArray(topics.topics)}`, "info");
    
    if (!topics.topics || !Array.isArray(topics.topics)) {
      log("❌ Estructura inválida", "error");
      log(`Estructura recibida: ${JSON.stringify(Object.keys(topics))}`, "error");
      throw new Error("Respuesta no tiene la estructura esperada");
    }
    
    log(`✅ Estructura válida: ${topics.topics.length} temas encontrados`, "success");
    
    // 7. Mostrar resultados
    console.log("\n");
    log(`📊 TEMAS ENCONTRADOS: ${topics.topics.length}`, "success");
    console.log("\n");
    
    topics.topics.forEach((topic, index) => {
      console.log(`${colors.bright}${colors.cyan}[${index + 1}] ${topic.title}${colors.reset}`);
      console.log(`${colors.dim}   📝 ${topic.reason}${colors.reset}`);
      console.log(`${colors.dim}   🔑 Keywords: ${topic.keywords.join(", ")}${colors.reset}`);
      console.log("");
    });
    
    // 8. Guardar resultados temporales
    log("💾 Guardando resultados...", "info");
    const resultsDir = path.resolve(process.cwd(), "content/blog-research");
    log(`   Directorio: ${resultsDir}`, "info");
    
    await fs.mkdir(resultsDir, { recursive: true });
    log("   ✓ Directorio creado/verificado", "success");
    
    const resultsPath = path.join(resultsDir, `${taskId}.json`);
    const resultsData = {
      taskId,
      timestamp: new Date().toISOString(),
      topics: topics.topics,
      conversationId: conversation.id,
    };
    
    await fs.writeFile(resultsPath, JSON.stringify(resultsData, null, 2));
    log(`✅ Resultados guardados: ${resultsPath}`, "success");
    log(`   Tamaño: ${JSON.stringify(resultsData).length} bytes`, "info");
    
    // 9. Limpiar prompt para liberar sistema
    log("🧹 Limpiando sistema para próxima fase...", "info");
    await clearPrompt();
    log("✅ Sistema disponible para siguiente proceso", "success");
    
    // 10. Retornar tema seleccionado (el primero)
    const selectedTopic = topics.topics[0];
    log("=".repeat(60), "info");
    log(`🎯 TEMA SELECCIONADO: "${selectedTopic.title}"`, "success");
    log("=".repeat(60), "info");
    
    return {
      selectedTopic,
      allTopics: topics.topics,
      taskId,
      resultsPath,
    };
    
  } catch (error) {
    log(`❌ ERROR: ${error.message}`, "error");
    console.error(error);
    process.exit(1);
  }
}

// ==================== FUNCIÓN DE GENERACIÓN DE CONTENIDO ====================

async function generarContenido(selectedTopic) {
  try {
    log("=".repeat(60), "info");
    log("✍️  INICIANDO GENERACIÓN DE CONTENIDO", "info");
    log("=".repeat(60), "info");
    log(`📰 Tema: ${selectedTopic.title}`, "info");
    
    // 1. Esperar disponibilidad
    await waitForAvailability();
    
    // 2. Generar ID único para el artículo (slug temporal)
    const tempSlug = selectedTopic.title
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Quitar acentos
      .replace(/[^a-z0-9]+/g, "-") // Reemplazar caracteres especiales
      .replace(/^-+|-+$/g, ""); // Quitar guiones al inicio/fin
    
    const taskId = `article_${Date.now()}_${tempSlug.substring(0, 30)}`;
    log(`🆔 Task ID: ${taskId}`, "info");
    
    // 3. Construir prompt de redacción
    const writingPrompt = buildWritingPrompt(selectedTopic);
    
    // 4. Enviar prompt de redacción
    log("Enviando prompt de redacción a ChatGPT...", "info");
    log(`   Prompt incluye: ${WRITING_SYSTEM_PROMPT.split('\n')[0]}`, "info");
    
    await sendPrompt({
      prompt: `${WRITING_SYSTEM_PROMPT}\n\n---\n\n${writingPrompt}`,
      id: taskId,
      newChat: true,
      saveLastMessageOnly: true,
      extractJson: true,
      focused: true,
    });
    
    log("✓ Prompt enviado, esperando que ChatGPT redacte el artículo...", "success");
    log("⏱️  Esto puede tomar 1-2 minutos (artículo completo)...", "info");
    
    // 5. Esperar y obtener respuesta
    const conversation = await getConversation(taskId);
    
    // 6. Procesar respuesta
    log("=".repeat(60), "success");
    log("✅ ARTÍCULO GENERADO", "success");
    log("=".repeat(60), "success");
    
    const responseText = conversation.messages[conversation.messages.length - 1].text;
    log(`📄 Tipo de respuesta: ${typeof responseText}`, "info");
    
    let articleData;
    if (typeof responseText === 'object') {
      log("✅ Respuesta ya es objeto JSON", "success");
      articleData = responseText;
    } else {
      log("🔄 Parseando respuesta JSON...", "info");
      try {
        articleData = JSON.parse(responseText);
        log("✅ JSON parseado exitosamente", "success");
      } catch (error) {
        log("⚠️  Intentando extraer JSON de code block...", "warning");
        const jsonMatch = responseText.match(/```json\s*([\s\S]*?)\s*```/) || 
                         responseText.match(/```\s*([\s\S]*?)\s*```/);
        if (jsonMatch) {
          articleData = JSON.parse(jsonMatch[1]);
          log("✅ JSON extraído de code block", "success");
        } else {
          log("❌ No se pudo parsear JSON", "error");
          log(`Respuesta:\n${responseText.substring(0, 500)}...`, "error");
          throw new Error("No se pudo parsear el JSON de la respuesta");
        }
      }
    }
    
    // 7. Validar estructura del artículo
    log("🔍 Validando estructura del artículo...", "info");
    const requiredFields = ["slug", "title", "description", "content", "author", "category", "tags", "readingTime"];
    const missingFields = requiredFields.filter(field => !articleData[field]);
    
    if (missingFields.length > 0) {
      log(`❌ Campos faltantes: ${missingFields.join(", ")}`, "error");
      throw new Error(`Artículo incompleto. Faltan: ${missingFields.join(", ")}`);
    }
    
    log("✅ Todos los campos requeridos presentes", "success");
    
    // 8. Mostrar resumen del artículo
    console.log("\n");
    log("📊 RESUMEN DEL ARTÍCULO GENERADO:", "success");
    console.log(`${colors.bright}${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    console.log(`${colors.bright}Título:${colors.reset} ${articleData.title}`);
    console.log(`${colors.bright}Slug:${colors.reset} ${articleData.slug}`);
    console.log(`${colors.bright}Descripción:${colors.reset} ${articleData.description}`);
    console.log(`${colors.bright}Categoría:${colors.reset} ${articleData.category}`);
    console.log(`${colors.bright}Tags:${colors.reset} ${articleData.tags.join(", ")}`);
    console.log(`${colors.bright}Autor:${colors.reset} ${articleData.author}`);
    console.log(`${colors.bright}Tiempo de lectura:${colors.reset} ${articleData.readingTime} minutos`);
    console.log(`${colors.bright}Longitud del contenido:${colors.reset} ${articleData.content.length} caracteres`);
    console.log(`${colors.bright}Palabras aprox:${colors.reset} ${articleData.content.split(/\s+/).length}`);
    console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);
    
    // 9. Preview del contenido (primeras líneas)
    const contentPreview = articleData.content.split('\n').slice(0, 10).join('\n');
    console.log(`${colors.dim}--- Preview del Contenido (primeras 10 líneas) ---${colors.reset}`);
    console.log(contentPreview);
    console.log(`${colors.dim}... (${articleData.content.split('\n').length} líneas totales)${colors.reset}\n`);
    
    // 10. Guardar artículo
    log("💾 Guardando artículo...", "info");
    const articlesDir = path.resolve(process.cwd(), "content/blog");
    await fs.mkdir(articlesDir, { recursive: true });
    log("   ✓ Directorio creado/verificado", "success");
    
    const articlePath = path.join(articlesDir, `${articleData.slug}.json`);
    
    // Agregar metadata adicional
    const fullArticleData = {
      ...articleData,
      publishedAt: new Date().toISOString(),
      conversationId: conversation.id,
      taskId: taskId,
      generatedAt: new Date().toISOString(),
    };
    
    await fs.writeFile(articlePath, JSON.stringify(fullArticleData, null, 2));
    log(`✅ Artículo guardado: ${articlePath}`, "success");
    log(`   Tamaño: ${JSON.stringify(fullArticleData).length} bytes`, "info");
    
    // 11. Limpiar prompt para liberar sistema
    log("🧹 Limpiando sistema para próxima fase...", "info");
    await clearPrompt();
    log("✅ Sistema disponible para siguiente proceso", "success");
    
    return {
      articleData: fullArticleData,
      articlePath,
      taskId,
    };
    
  } catch (error) {
    log(`❌ ERROR en generación de contenido: ${error.message}`, "error");
    console.error(error);
    throw error;
  }
}

// ==================== GENERACIÓN DE IMAGEN ====================

/**
 * Genera imagen para el artículo usando el servicio local
 */
async function generarImagen(articleData) {
  try {
    log("🎨 INICIANDO GENERACIÓN DE IMAGEN", "info");
    log(`   Artículo: ${articleData.title}`, "info");
    log(`   Slug: ${articleData.slug}`, "info");
    
    // 1. Esperar disponibilidad
    await waitForAvailability();
    
    // 2. Generar ID único para esta tarea
    const taskId = Date.now();
    log(`📋 Task ID: ${taskId}`, "info");
    
    // 3. Seleccionar estilo aleatorio
    const randomStyle = IMAGE_STYLES[Math.floor(Math.random() * IMAGE_STYLES.length)];
    log(`🎨 Estilo seleccionado: ${randomStyle.substring(0, 60)}...`, "info");
    
    // 4. Crear prompt para imagen - Versión abstracta y conceptual
    const imagePrompt = `Create an original abstract digital illustration in this style: ${randomStyle}

CONCEPT: Connectivity and modern technology
Visual theme inspired by the general topic of internet services and telecommunications

VISUAL ELEMENTS (abstract representation):
- Flowing data streams or light paths
- Geometric network patterns
- Abstract nodes and connection points
- Soft glowing elements suggesting digital connectivity
- Modern minimalist shapes

COMPOSITION:
- Horizontal format 1200x630 pixels
- Clean, professional aesthetic
- Balanced and harmonious design
- NO text, logos, or brand names
- NO specific company references

COLOR PALETTE:
- Contemporary tech colors (blues, teals, purples)
- Clean gradients
- Professional and trustworthy feel

Create something unique, artistic, and conceptual that evokes the feeling of modern digital connectivity without depicting specific products or services.`;

    log("📝 Prompt de imagen generado", "info");
    log(`   Longitud: ${imagePrompt.length} caracteres`, "info");
    
    // 5. Enviar solicitud a API local
    const promptData = {
      prompt: imagePrompt,
      newChat: true,
      id: taskId,
      extractJson: false,
      saveLastMessageOnly: true,
      focused: true,
      isImage: true,
    };
    
    log(`📤 Enviando solicitud a ${PROMPT_API_URL}`, "info");
    await sendPrompt(promptData);
    log("✅ Solicitud de imagen enviada", "success");
    
    // 6. Polling para obtener la imagen (sin límite de tiempo)
    log("⏳ Esperando generación de imagen...", "info");
    log("   ⚠️  El script esperará el tiempo que sea necesario", "warning");
    const conversation = await getConversation(taskId);
    
    log("📥 Conversación recibida, analizando estructura...", "info");
    log(`   Total de mensajes: ${conversation.messages.length}`, "info");
    
    // 7. Extraer imagen de la respuesta
    const lastMessage = conversation.messages[conversation.messages.length - 1];
    log(`   Rol del último mensaje: ${lastMessage.role}`, "info");
    log(`   Es imagen: ${!!lastMessage.isImage}`, "info");
    log(`   Contenido text: ${lastMessage.text?.substring(0, 100)}`, "info");
    
    // Verificar que sea una respuesta de imagen
    if (!lastMessage.isImage || !lastMessage.text) {
      log("❌ No se generó ninguna imagen", "error");
      log("🔍 Estructura completa del último mensaje:", "error");
      console.log(JSON.stringify(lastMessage, null, 2));
      log("💡 Verifica que el servicio local retorne { isImage: true, text: '/images/...' }", "warning");
      throw new Error("No se encontró imagen en la respuesta");
    }
    
    // La URL de la imagen está en el campo 'text'
    const imageUrl = `http://localhost:54321${lastMessage.text}`;
    log(`✅ URL de imagen encontrada: ${imageUrl}`, "success");
    
    // 8. Descargar la imagen
    log("📥 Descargando imagen desde el servidor...", "info");
    const imageResponse = await fetch(imageUrl);
    
    if (!imageResponse.ok) {
      log(`❌ Error al descargar imagen: HTTP ${imageResponse.status}`, "error");
      throw new Error(`Error al descargar imagen: HTTP ${imageResponse.status}`);
    }
    
    const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());
    log(`✅ Imagen descargada: ${(imageBuffer.length / 1024).toFixed(2)} KB`, "success");
    
    // 9. Guardar imagen
    // 9. Guardar imagen
    const publicDir = path.join(process.cwd(), "public", "blog-images");
    await fs.mkdir(publicDir, { recursive: true });
    
    const imagePath = path.join(publicDir, `${articleData.slug}.webp`);
    const thumbnailPath = path.join(publicDir, `${articleData.slug}-thumb.webp`);
    
    // Guardar imagen original
    log(`💾 Guardando imagen: ${imagePath}`, "info");
    await fs.writeFile(imagePath, imageBuffer);
    
    // Ajustar permisos
    await execAsync(`chmod 644 "${imagePath}"`);
    log("✅ Permisos de imagen ajustados", "success");
    
    const stats = await fs.stat(imagePath);
    log(`📏 Tamaño original: ${(stats.size / 1024).toFixed(2)} KB`, "info");
    
    // 10. Optimizar imagen con Sharp
    // 10. Optimizar imagen con Sharp
    log("🗜️  Comprimiendo imagen...", "info");
    const optimizedBuffer = await sharp(imageBuffer)
      .resize(1200, 630, { fit: "cover", position: "center" })
      .webp({ quality: 80 })
      .toBuffer();
    
    await fs.writeFile(imagePath, optimizedBuffer);
    await execAsync(`chmod 644 "${imagePath}"`);
    
    const optimizedStats = await fs.stat(imagePath);
    log(`✅ Imagen comprimida: ${(optimizedStats.size / 1024).toFixed(2)} KB`, "success");
    
    // 11. Generar thumbnail
    // 11. Generar thumbnail
    log("🖼️  Generando thumbnail 400x200...", "info");
    const thumbnailBuffer = await sharp(optimizedBuffer)
      .resize(400, 200, { fit: "cover", position: "center" })
      .webp({ quality: 75 })
      .toBuffer();
    
    await fs.writeFile(thumbnailPath, thumbnailBuffer);
    await execAsync(`chmod 644 "${thumbnailPath}"`);
    
    const thumbnailStats = await fs.stat(thumbnailPath);
    log(`✅ Thumbnail generado: ${(thumbnailStats.size / 1024).toFixed(2)} KB`, "success");
    
    // 12. Limpiar sistema
    await clearPrompt();
    
    return {
      imagePath: `/blog-images/${articleData.slug}.webp`,
      thumbnailPath: `/blog-images/${articleData.slug}-thumb.webp`,
      style: randomStyle,
    };
    
  } catch (error) {
    log(`❌ ERROR en generación de imagen: ${error.message}`, "error");
    console.error(error);
    throw error;
  }
}

// ==================== EJECUCIÓN ====================

async function run() {
  console.log(`\n${colors.bright}${colors.blue}╔════════════════════════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.bright}${colors.blue}║     GENERADOR DE BLOGS - API CUSTOM CHATGPT               ║${colors.reset}`);
  console.log(`${colors.bright}${colors.blue}║     localhost:54321                                        ║${colors.reset}`);
  console.log(`${colors.bright}${colors.blue}╚════════════════════════════════════════════════════════════╝${colors.reset}\n`);
  
  try {
    // FASE 1: Investigación
    log("🚀 FASE 1: INVESTIGACIÓN DE TEMAS", "info");
    log("⚠️  IMPORTANTE: El sistema procesa UN prompt a la vez", "warning");
    const researchResult = await investigarTemas();
    
    console.log("\n" + "═".repeat(60) + "\n");
    log("✅ Fase 1 completada. Sistema limpio.", "success");
    log("⏳ Esperando 2 segundos antes de la siguiente fase...", "info");
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // FASE 2: Generación de contenido
    log("🚀 FASE 2: GENERACIÓN DE CONTENIDO", "info");
    log("⚠️  Verificando disponibilidad antes de continuar...", "warning");
    
    // Verificar que el sistema esté disponible antes de continuar
    await waitForAvailability();
    
    const contentResult = await generarContenido(researchResult.selectedTopic);
    
    console.log("\n" + "═".repeat(60) + "\n");
    log("✅ Fase 2 completada. Sistema limpio.", "success");
    log("⏳ Esperando 2 segundos antes de la siguiente fase...", "info");
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // FASE 3: Generación de imagen
    log("🚀 FASE 3: GENERACIÓN DE IMAGEN", "info");
    log("⚠️  Verificando disponibilidad antes de continuar...", "warning");
    
    await waitForAvailability();
    
    const imageResult = await generarImagen(contentResult.articleData);
    
    // Actualizar archivo JSON con las rutas de imagen
    const updatedArticleData = {
      ...contentResult.articleData,
      image: imageResult.imagePath,
      thumbnailImage: imageResult.thumbnailPath,
    };
    
    await fs.writeFile(
      contentResult.articlePath,
      JSON.stringify(updatedArticleData, null, 2),
      "utf-8"
    );
    
    log("✅ Artículo actualizado con rutas de imagen", "success");
    
    console.log("\n" + "═".repeat(60) + "\n");
    log("✅ Fase 3 completada. Sistema limpio.", "success");
    
    // Resumen final
    console.log(`${colors.bright}${colors.green}🎉 PROCESO COMPLETADO EXITOSAMENTE${colors.reset}\n`);
    console.log(`${colors.cyan}📋 Resumen:${colors.reset}`);
    console.log(`   ${colors.dim}Investigación:${colors.reset} ${researchResult.resultsPath}`);
    console.log(`   ${colors.dim}Artículo:${colors.reset} ${contentResult.articlePath}`);
    console.log(`   ${colors.dim}Título:${colors.reset} ${contentResult.articleData.title}`);
    console.log(`   ${colors.dim}Slug:${colors.reset} ${contentResult.articleData.slug}`);
    console.log(`   ${colors.dim}Imagen:${colors.reset} ${imageResult.imagePath}`);
    console.log(`   ${colors.dim}Thumbnail:${colors.reset} ${imageResult.thumbnailPath}`);
    console.log(`   ${colors.dim}Estilo:${colors.reset} ${imageResult.style.substring(0, 50)}...\n`);
    
    console.log(`${colors.green}✅ Blog post completo generado con éxito${colors.reset}\n`);
    
    // FASE 4: Deploy automático
    console.log("\n" + "═".repeat(60) + "\n");
    log("🚀 FASE 4: DEPLOY AUTOMÁTICO", "info");
    
    try {
      const commitMessage = `🤖 Auto-generated blog post: ${contentResult.articleData.title}`;
      const deployScript = path.join(process.cwd(), 'deploy-optimized.sh');
      
      log(`Ejecutando deploy con mensaje: "${commitMessage}"`, "info");
      log("Esto puede tomar unos minutos...", "warning");
      
      const { stdout, stderr } = await execAsync(`bash "${deployScript}" "${commitMessage}"`);
      
      if (stdout) {
        console.log(stdout);
      }
      if (stderr) {
        console.error(stderr);
      }
      
      log("✅ Deploy completado exitosamente", "success");
      
      // Construir URL del artículo nuevo
      const articleUrl = `https://comparadorinternet.co/blog/${contentResult.articleData.slug}`;
      console.log(`${colors.bright}${colors.green}🌐 Sitio actualizado en: https://comparadorinternet.co${colors.reset}`);
      console.log(`${colors.bright}${colors.cyan}📰 Artículo publicado en: ${articleUrl}${colors.reset}\n`);
      
      // Abrir la página del artículo en el navegador
      log("🌍 Abriendo página del artículo...", "info");
      try {
        await execAsync(`open "${articleUrl}"`);
        log("✅ Página abierta en el navegador", "success");
      } catch (browserError) {
        log(`⚠️  No se pudo abrir el navegador automáticamente`, "warning");
        log(`   Visita manualmente: ${articleUrl}`, "info");
      }
    } catch (deployError) {
      log(`⚠️  Error durante el deploy: ${deployError.message}`, "error");
      log("El blog post se generó correctamente pero el deploy falló", "warning");
      log("Puedes ejecutar manualmente: ./deploy-optimized.sh \"tu mensaje\"", "info");
    }
    
    return {
      research: researchResult,
      article: contentResult,
      image: imageResult,
    };
  } catch (error) {
    log(`❌ ERROR FATAL: ${error.message}`, "error");
    console.error(error);
    
    // Intentar limpiar el sistema si hay error
    log("🧹 Intentando limpiar sistema después del error...", "warning");
    try {
      await clearPrompt();
    } catch (clearError) {
      log("⚠️  No se pudo limpiar el sistema", "warning");
    }
    
    process.exit(1);
  }
}

// Ejecutar si se llama directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  run();
}

export { investigarTemas, generarContenido, generarImagen, sendPrompt, getConversation, waitForAvailability, clearPrompt };
