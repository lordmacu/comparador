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

const RESEARCH_PROMPT = `Eres un analista experto en tendencias de tecnología, internet y telecomunicaciones a nivel global y local (Colombia/Bogotá).

🎯 OBJETIVO: Identificar temas RELEVANTES Y ACTUALES sobre internet que:
1. Eduquen e informen al lector
2. Posicionen en Google con keywords estratégicas
3. Al final del artículo, orienten naturalmente a comparar planes de internet en Bogotá

🌍 TIPOS DE CONTENIDO (VARIEDAD ES CLAVE):

1. TENDENCIAS GLOBALES Y TECNOLOGÍA (40%):
   • Nuevas tecnologías: WiFi 7, Internet satelital (Starlink), 6G
   • Ciberseguridad: Amenazas, VPNs, protección de datos
   • Avances: IA en redes, Internet cuántico, edge computing
   • Regulaciones: Neutralidad de red, privacidad, leyes digitales
   • Estudios: Velocidades mundiales, ranking de países, impacto digital

2. PROBLEMAS Y SOLUCIONES (30%):
   • "Por qué mi internet va lento y cómo solucionarlo"
   • "Cómo elegir el mejor router para tu hogar 2026"
   • "Señal WiFi débil: 10 soluciones que funcionan"
   • "Internet para teletrabajo: qué velocidad necesitas realmente"
   • "Gaming online: latencia vs velocidad, qué importa más"

3. NOTICIAS Y ACTUALIDAD (20%):
   • Expansión de fibra óptica en Bogotá y Colombia
   • Lanzamientos 5G, nuevas redes, inversiones
   • Apagón analógico, cambios regulatorios
   • Quejas masivas, caídas de servicio, controversias
   • Ofertas especiales, promociones del sector

4. COMPARATIVAS ESTRATÉGICAS (10%):
   • "Fibra óptica vs Cable vs 5G: cuál elegir en 2026"
   • "Internet residencial vs empresarial: diferencias clave"
   • Solo ocasionalmente: "Mejor operador para [uso específico] en Bogotá"

📋 KEYWORDS SEO (Enfoque mixto global + local):
• "velocidad internet necesaria para [actividad]"
• "cómo mejorar internet en casa"
• "qué es [tecnología] y cómo funciona"
• "mejor internet para [gaming/streaming/teletrabajo]"
• "problemas comunes internet y soluciones"
• "internet en Bogotá 2026"
• "fibra óptica Bogotá"
• Combinar: "WiFi 7 disponible Colombia" o "Starlink vs operadores tradicionales Bogotá"

🔍 CRITERIOS DE SELECCIÓN:
✓ Interés actual y volumen de búsqueda (Google Trends)
✓ Contenido defendible con datos y fuentes
✓ Útil para el lector (no solo publicitario)
✓ Conexión natural con la comparación de planes al final
✓ Mix de temas educativos, tecnológicos y prácticos

🎨 VARIEDAD REQUERIDA:
- NO todos comparativos de operadores
- Mix de temas globales (tecnología) y locales (Bogotá)
- Balance entre educación, noticias y guías prácticas
- Temas que atraigan diferentes audiencias

📤 FORMATO DE RESPUESTA:

Genera EXACTAMENTE este JSON (solo JSON, sin texto adicional):

{
  "topics": [
    {
      "title": "Título atractivo y específico con keywords SEO",
      "reason": "Por qué es relevante ahora, qué problema resuelve o información aporta, y cómo se conecta con la comparación de planes",
      "keywords": ["keyword1", "keyword2", "keyword3"],
      "scope": "global|local|mixed"
    },
    {
      "title": "Segundo título...",
      "reason": "Razón...",
      "keywords": ["keyword1", "keyword2"],
      "scope": "global|local|mixed"
    }
    },
    {
      "title": "Tercer título...",
      "reason": "Razón...",
      "keywords": ["keyword1", "keyword2"]
    }
  ]
}

IMPORTANTE: Responde SOLO con el JSON, sin explicaciones adicionales. Los temas deben estar ranqueados por relevancia actual (el primero es el más importante).`;

// ==================== PROMPT DE REDACCIÓN ====================

const WRITING_SYSTEM_PROMPT = `Eres un periodista tecnológico profesional especializado en telecomunicaciones en Colombia. Tu objetivo es escribir contenido informativo, bien estructurado y confiable.

PERSONALIDAD:
- Profesional, informado y objetivo
- Cercano pero manteniendo credibilidad editorial
- Crítico fundamentado con datos cuando corresponde
- Balanceado: reconoce fortalezas y debilidades de cada operador
- Objetivo: Ayudar al lector a comparar opciones y tomar decisiones informadas
- Explica claramente ventajas y limitaciones para diferentes perfiles de usuario

ESTILO DE ESCRITURA:
- Lenguaje claro y accesible, pero sin caer en excesiva informalidad
- Evita modismos o jerga coloquial
- Usa referencias geográficas específicas cuando sean relevantes (barrios, localidades)
- Terminología técnica explicada de forma comprensible
- Mantén un tono conversacional profesional, como una guía experta

ESTRUCTURA REQUERIDA:
- Título: Atractivo, con keywords SEO
- Descripción (meta): 140-160 caracteres, incluye beneficio claro
- Apertura: Situación cotidiana colombiana (2 párrafos)
- 4-6 secciones H2 (mínimo 2 como preguntas directas)
- Cada sección: 150-250 palabras
- Cierre: Consejo práctico, no "conclusión"

FORMATO CRÍTICO - MARKDOWN PURO:
- USA MARKDOWN, NO HTML
- Párrafos: Texto normal, saltos de línea con doble enter
- Títulos nivel 2: ## Título (sin tags <h2>)
- Listas: - Item (con guión y espacio)
- Negritas: **texto** (doble asterisco)
- Cursivas: *texto* (un asterisco)
- Links: [texto](url)
- NO uses etiquetas HTML como <ul>, <li>, <strong>, <em>, <p>

CRITERIOS DE CALIDAD:
- Datos verificables y específicos de Colombia/Bogotá
- Ejemplos de precios actuales cuando sea relevante
- Menciona nombres de barrios/localidades si aplica
- Incluye consideraciones por estrato socioeconómico
- Evita lenguaje publicitario o sesgado
- No prometas resultados garantizados
- Reconoce cuando no hay "mejor absoluto" sino "mejor según caso"`;

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
    
    // 10. Guardar artículo temporal
    log("💾 Guardando artículo temporal...", "info");
    const articlesDir = path.resolve(process.cwd(), "content/blog-drafts");
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
      saveLastMessageOnly: false,
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
