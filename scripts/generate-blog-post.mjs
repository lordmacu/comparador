import { GoogleGenAI, Type } from "@google/genai";
import fs from "fs/promises";
import path from "path";
import { exec } from "child_process";
import { promisify } from "util";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

const execAsync = promisify(exec);

// Cargar variables de entorno desde .env
dotenv.config();

// Configuración del transportador de correo
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

// Función para enviar notificación por correo
async function sendBlogNotificationEmail(blogPost) {
  const mailOptions = {
    from: `"Internet Colombia - Blog" <${process.env.SMTP_USER}>`,
    to: 'yo@cristiangarcia.co',
    subject: `✨ Nuevo blog post generado: ${blogPost.title}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            border-radius: 10px 10px 0 0;
            text-align: center;
          }
          .content {
            background: #f9f9f9;
            padding: 30px;
            border: 1px solid #ddd;
            border-top: none;
          }
          .info-row {
            background: white;
            padding: 15px;
            margin: 10px 0;
            border-radius: 5px;
            border-left: 4px solid #667eea;
          }
          .label {
            font-weight: bold;
            color: #667eea;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .value {
            font-size: 16px;
            color: #333;
            margin-top: 5px;
          }
          .title {
            font-size: 20px;
            font-weight: bold;
            color: #667eea;
          }
          .button {
            display: inline-block;
            padding: 12px 24px;
            background: #667eea;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
            font-weight: bold;
          }
          .footer {
            text-align: center;
            margin-top: 20px;
            padding: 20px;
            color: #666;
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1 style="margin: 0;">✨ Nuevo Blog Post Generado</h1>
        </div>

        <div class="content">
          <div class="info-row">
            <div class="label">Título</div>
            <div class="value title">${blogPost.title}</div>
          </div>

          <div class="info-row">
            <div class="label">Descripción</div>
            <div class="value">${blogPost.description}</div>
          </div>

          <div class="info-row">
            <div class="label">Slug</div>
            <div class="value">${blogPost.slug}</div>
          </div>

          <div class="info-row">
            <div class="label">Fecha de Publicación</div>
            <div class="value">${new Date(blogPost.publishedAt).toLocaleString('es-CO', {
              timeZone: 'America/Bogota',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}</div>
          </div>

          <div class="info-row">
            <div class="label">Imagen</div>
            <div class="value">${blogPost.image}</div>
          </div>

          <div style="text-align: center;">
            <a href="https://comparadorinternet.co/blog/${blogPost.slug}" class="button">Ver Post en el Sitio</a>
          </div>
        </div>

        <div class="footer">
          <p>Este correo fue generado automáticamente por el sistema de blog de Internet Colombia.</p>
          <p style="margin-top: 10px; color: #999;">Timestamp: ${blogPost.publishedAt}</p>
        </div>
      </body>
      </html>
    `,
    text: `
Nuevo blog post generado

Título: ${blogPost.title}
Descripción: ${blogPost.description}
Slug: ${blogPost.slug}
Fecha: ${new Date(blogPost.publishedAt).toLocaleString('es-CO', { timeZone: 'America/Bogota' })}
Imagen: ${blogPost.image}

Ver post: https://comparadorinternet.co/blog/${blogPost.slug}

---
Internet Colombia - Sistema de Blog
    `.trim(),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Correo de notificación enviado:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error al enviar correo de notificación:', error);
    // No lanzamos el error para que no falle todo el proceso si falla el correo
    return { success: false, error: error.message };
  }
}

// ==================== CONSTANTES ====================
const MODEL_RESEARCH = 'gemini-3-flash-preview';
const MODEL_WRITING = 'gemini-3-pro-preview';
const MODEL_IMAGE = 'gemini-2.5-flash-image';

// Estilos visuales variados para las imágenes (20 estilos únicos)
const IMAGE_STYLES = [
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
  "fotografía infrarroja falso color, paisaje urbano de Bogotá con personas usando celulares, vegetación en rosa-magenta brillante, cielo dramático naranja, piel en tonos cian, edificios en amarillo-verde"
];

const RESEARCH_SYSTEM_PROMPT = `
Eres un analista experto en Big Data y tendencias digitales en Colombia. Tu misión es identificar temas CALIENTES de las últimas 48 horas.

PRIORIDADES DE BÚSQUEDA (en orden):
1. Noticias recientes sobre operadores: Lanzamientos, caídas masivas, quejas virales, cambios de precios
2. Problemas técnicos tendencia: Latencia en gaming, velocidad real vs prometida, fibra vs cable
3. Actualizaciones de infraestructura: 5G, fibra óptica, expansión a nuevas zonas
4. Fenómenos locales: Clima afectando redes, robos de cable, protestas por servicio
5. Comparativas calientes: ETB vs Claro vs Movistar vs Tigo en contextos específicos

CRITERIOS DE SELECCIÓN:
- Que tenga volumen de búsqueda actual en Colombia
- Que sea defendible con datos reales y recientes
- Que permita una perspectiva crítica y honesta (no publicitaria)
- Que resuene con estratos 2 al 6, no solo élite tech

FORMATO: JSON con 3 temas ranqueados por relevancia actual.
`;

const WRITING_SYSTEM_PROMPT = `
Eres un periodista tecnológico profesional especializado en telecomunicaciones en Colombia. Tu objetivo es escribir contenido informativo, bien estructurado y confiable.

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
1. APERTURA: Introduce el tema con contexto relevante (2-3 párrafos)
2. H2 principal: Pregunta directa que enmarca el artículo
3. CUERPO: 3-4 secciones H2 (usa al menos 2 preguntas para títulos)
4. CONTEXTO TÉCNICO: Explica conceptos complejos de forma clara y comprensible
5. ANÁLISIS COMPARATIVO: Cuando aplique, compara operadores con criterios objetivos
6. CASOS DE USO: Define claramente para qué perfiles de usuario es más adecuado cada servicio
7. CIERRE: Conclusión práctica con recomendaciones específicas y call to action natural

TIPOS DE ARTÍCULOS:
A) COMPARATIVOS: "ETB vs Claro: Análisis de cobertura y precios en Bogotá 2026"
B) GUÍAS: "Guía para elegir plan de internet según necesidades de trabajo remoto"
C) ANÁLISIS: "Análisis completo de planes Movistar 2026: velocidades y precios"
D) CASOS DE USO: "Mejor internet para gaming: comparativa de latencia por operador"
E) TENDENCIAS: "Cambios en el mercado de telecomunicaciones: impacto para usuarios"

PROHIBICIONES:
❌ Modismos coloquiales: "carreta", "pilas", "no coma cuento", "la cosa es así"
❌ Expresiones excesivamente informales o jerga callejera
❌ "En conclusión", "Cabe resaltar", "Es importante destacar"
❌ Tono de comunicado de prensa corporativo
❌ Generalizaciones sin fundamento
❌ Recomendar sin especificar para qué perfil de usuario

TONO OBJETIVO: Periodismo tecnológico profesional similar a sitios como Xataka o The Verge en español, pero enfocado en Colombia. Informativo, confiable y útil para tomar decisiones.

LONGITUD: Entre 800 y 1500 palabras. Contenido denso en información útil, sin relleno innecesario.
`;

// ==================== TERMINAL HELPERS ====================
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  blue: '\x1b[34m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m'
};

const log = (msg, type = 'default') => {
  const timestamp = new Date().toLocaleTimeString();
  let prefix = '';
  
  switch(type) {
    case 'info':
      prefix = `${colors.blue}ℹ${colors.reset}`;
      break;
    case 'success':
      prefix = `${colors.green}✓${colors.reset}`;
      break;
    case 'error':
      prefix = `${colors.red}✗${colors.reset}`;
      break;
    default:
      prefix = `${colors.gray}•${colors.reset}`;
  }
  
  console.log(`${colors.gray}[${timestamp}]${colors.reset} ${prefix} ${msg}`);
};

const setStatus = (status, colorName = 'gray') => {
  const colorMap = {
    'blue-900': colors.blue,
    'amber-900': colors.yellow,
    'green-900': colors.green,
    'red-900': colors.red,
    'gray': colors.gray
  };
  
  const color = colorMap[colorName] || colors.gray;
  console.log(`\n${color}${colors.bright}[${status.toUpperCase()}]${colors.reset}\n`);
};

// ==================== MAIN FUNCTION ====================
async function run() {
  // Obtener API key de variable de entorno
  const apiKey = process.env.GOOGLE_AI_API_KEY || process.env.API_KEY;
  if (!apiKey) {
    log("ERROR: No se encontró la API key. Define GOOGLE_AI_API_KEY o API_KEY en las variables de entorno.", "error");
    process.exit(1);
  }

  const ai = new GoogleGenAI({ apiKey });
  
  try {
    setStatus('Researching', 'blue-900');
    log("Iniciando investigación de tendencias en Colombia...", "info");
    
    // 1. INVESTIGACIÓN
    log("Consultando modelo de investigación (gemini-3-flash-preview)...", "info");
    const researchPromise = ai.models.generateContent({
      model: MODEL_RESEARCH,
      contents: `Busca en Google las ÚLTIMAS NOTICIAS y tendencias sobre internet en Colombia (ETB, Claro, Movistar, Tigo, WOM).

🎯 OBJETIVO: Generar artículos SEO que posicionen en Google y atraigan tráfico para vender planes de internet.

📰 PRIORIZA NOTICIAS ACTUALES (50%):
• Lanzamientos nuevos: planes 5G, ofertas, expansión de cobertura
• Noticias corporativas: fusiones, inversiones, nuevos servicios
• Eventos relevantes: caídas de servicio, mejoras de red, quejas masivas
• Anuncios oficiales de operadores con impacto en usuarios

⚡ COMPARATIVAS SEO (30%):
• "ETB vs Claro vs Movistar 2026" con datos actualizados
• "Mejor internet para [gaming/teletrabajo/streaming] en Bogotá"
• Comparativas de velocidad, precio, cobertura, ping
• Rankings: "Top 3 operadores para [caso de uso]"

🏆 VENTAJAS Y BENEFICIOS (20%):
• Por qué contratar ETB: fibra propia, cobertura Bogotá
• Ventajas Claro: 5G, red más grande, combos
• Beneficios Movistar: velocidad simétrica, soporte empresarial

📋 KEYWORDS SEO PRIORITARIAS (usar en títulos):
• "ETB vs Claro vs Movistar"
• "mejor internet [gaming/teletrabajo/streaming] Bogotá"
• "planes internet 2026"
• "5G Bogotá"
• "fibra óptica vs cable"
• "internet [barrio] Bogotá"
• "opiniones [operador] 2026"
• "velocidad internet Colombia"

📋 ENTREGA: 3 propuestas con estas keywords en el título. Cada artículo debe rankear en Google para búsquedas comerciales.`,
      config: {
        systemInstruction: RESEARCH_SYSTEM_PROMPT,
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            topics: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  reason: { type: Type.STRING },
                  keywords: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                required: ["title", "reason", "keywords"]
              }
            }
          },
          required: ["topics"]
        }
      }
    });

    // Aplicar timeout de 60 segundos
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Timeout: La investigación tardó más de 60 segundos')), 60000)
    );
    
    log("Esperando respuesta del modelo (máximo 60 segundos)...", "info");
    const researchResponse = await Promise.race([researchPromise, timeoutPromise]);

    const researchData = JSON.parse(researchResponse.text || '{"topics":[]}');
    const selectedTopic = researchData.topics[0];
    
    // Extracting and logging search grounding URLs
    const chunks = researchResponse.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    chunks.forEach((chunk) => {
      if (chunk.web) {
        log(`Fuente consultada: ${chunk.web.title} (${chunk.web.uri})`, "info");
      }
    });

    log(`Tendencias encontradas: ${researchData.topics.length}`, "success");
    log(`Tema seleccionado automáticamente: "${selectedTopic.title}"`, "info");
    log(`Contexto: ${selectedTopic.reason}`);

    // 2. REDACCIÓN
    setStatus('Writing', 'amber-900');
    log("Generando contenido con motor Gemini (Estilo Cero-Robot)...", "info");

    const writingResponse = await ai.models.generateContent({
      model: MODEL_WRITING,
      contents: `MISIÓN: Escribe un artículo periodístico tech sobre este tema con estilo colombiano auténtico.

TEMA: "${selectedTopic.title}"
KEYWORDS SEO: ${selectedTopic.keywords.join(', ')}
CONTEXTO: ${selectedTopic.reason}

REQUISITOS ESTRICTOS:

📝 ESTRUCTURA:
- Título: Atractivo, con modismo colombiano si aplica
- Descripción (meta): 140-160 caracteres, incluye beneficio claro
- Apertura: Situación cotidiana colombiana (2 párrafos)
- 4-6 secciones H2 (mínimo 2 como preguntas directas)
- Cada sección: 150-250 palabras
- Cierre: Consejo práctico, no "conclusión"

🔤 FORMATO CRÍTICO - MARKDOWN PURO:
- USA MARKDOWN, NO HTML
- Párrafos: Texto normal, saltos de línea con doble enter
- Títulos nivel 2: ## Título (sin tags <h2>)
- Negritas: **texto** (sin tags <strong>)
- Cursivas: *texto* (sin tags <em>)
- Listas: - Item o 1. Item (sin tags <ul>/<li>)
- NO uses <p>, <h2>, <ul>, <li>, <strong>, <em> ni ningún HTML tag
- Ejemplo correcto: "## ¿Por qué?\n\nAquí está la **verdad** que nadie dice..."

🇨🇴 LOCALIZACIÓN SEO:
- Keywords locales: "Bogotá", "Colombia", barrios específicos
- Menciona: Precios en COP, zonas de cobertura, estratos
- Referencias: TransMilenio, centros comerciales, localidades bogotanas

🎯 TONO PERIODÍSTICO:
- Informativo pero cercano (como El Tiempo o Portafolio tech)
- Objetivo con datos verificables
- Crítico cuando sea necesario, destacando ventajas reales
- Accesible sin ser demasiado informal

⚡ DATOS SEO OBLIGATORIOS:
- Cifras actualizadas 2026: precios, velocidades, cobertura
- Comparativas con datos medibles (ping, Mbps, disponibilidad)
- Tabla comparativa cuando sea posible
- Keywords naturales: "mejor internet", "planes [operador]", "vs", "2026"

💰 ENFOQUE COMERCIAL:
- Destaca ventajas comerciales de cada operador
- Menciona ofertas, promociones, planes populares
- Facilita la decisión de compra con datos concretos

🔗 CTA FINAL OBLIGATORIO:
Cierra con: "Compara los planes actualizados de [operadores] en comparadorinternet.co y encuentra la mejor oferta para tu hogar o negocio." O variaciones naturales que inviten a comparar en el sitio.

🚫 PROHIBIDO:
- "En conclusión", frases de relleno
- Opiniones sin sustento
- HTML tags (solo Markdown)
- Tecnicismos sin explicar`,
      config: {
        systemInstruction: WRITING_SYSTEM_PROMPT,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            slug: { type: Type.STRING },
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            author: { type: Type.STRING },
            publishedAt: { type: Type.STRING },
            category: { type: Type.STRING },
            tags: { type: Type.ARRAY, items: { type: Type.STRING } },
            content: { type: Type.STRING },
            readingTime: { type: Type.NUMBER }
          },
          required: ["slug", "title", "content", "description", "author", "category", "tags", "readingTime"]
        }
      }
    });

    const postData = JSON.parse(writingResponse.text || '{}');
    
    log("Artículo generado exitosamente.", "success");

    // 3. GENERAR IMAGEN
    setStatus('Generating Image', 'amber-900');
    log("Generando imagen con Gemini Image...", "info");
    
    // Seleccionar estilo aleatorio
    const randomStyle = IMAGE_STYLES[Math.floor(Math.random() * IMAGE_STYLES.length)];
    log(`Estilo seleccionado: ${randomStyle}`, "info");
    
    // Construir prompt detallado
    const imagePrompt = `Genera una imagen fotográfica HIPERREALISTA de alta calidad profesional.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 TEMA DEL ARTÍCULO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${postData.title}

Descripción: ${postData.description}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎨 ESTILO VISUAL SELECCIONADO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${randomStyle}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ ELEMENTOS OBLIGATORIOS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👥 PERSONAS (PROTAGONISTAS):
• 2-4 personas colombianas auténticas
• Diversidad: Edades variadas (jóvenes, adultos), diferentes estratos sociales visibles en vestimenta
• Expresiones: Naturales, concentrados en tecnología, conversando
• NO stock photos genéricos, deben verse reales y espontáneos

🏙️ UBICACIÓN BOGOTÁ:
• Arquitectura característica: Ladrillos rojos, edificios de varias plantas, construcciones mixtas
• Fondo: Cerros orientales difuminados o skyline urbano de Bogotá
• Clima típico: Cielo parcialmente nublado/gris o luz difusa (NO siempre sol radiante)
• Detalles urbanos: Semáforos, buses rojos, señalización colombiana

📱 TECNOLOGÍA VISIBLE:
• Dispositivos: Smartphones, laptops, tablets, routers WiFi
• Elementos según tema: ${postData.tags.includes('5G') || postData.tags.includes('Fibra Óptica') ? 'Antenas, torres de telecomunicaciones, cables de fibra óptica' : 'Cables ethernet, routers domésticos, pantallas mostrando velocidad de internet'}
• Interacción natural: Personas usando los dispositivos genuinamente

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎬 COMPOSICIÓN Y TÉCNICA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Formato: 16:9 horizontal
• Enfoque: Personas en primer/segundo plano, tecnología integrada naturalmente
• Profundidad: Desenfoque suave en fondo (bokeh)
• Iluminación: Natural, realista para Bogotá (no muy contrastada)
• Calidad: Fotorrealista, grano sutil de cámara profesional
• Perspectiva: A la altura de ojos, composición dinámica pero no forzada

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎭 AMBIENTE Y CONTEXTO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Escenario realista: ${postData.category === 'Gaming' ? 'Setup de gaming doméstico o café internet' : postData.category === 'Fibra Óptica' ? 'Apartamento/casa en instalación o uso de internet' : 'Oficina moderna o espacio de coworking bogotano'}
• Mood: Profesional pero accesible, tecnología integrada a la vida cotidiana
• Detalles culturales: Tinto en vaso, snacks colombianos sutiles, decoración local

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚫 PROHIBIDO ESTRICTAMENTE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
❌ Texto visible, logos de marcas, nombres de operadores
❌ Watermarks, firmas, overlays
❌ Stock photos estilo "happy diverse team"
❌ Iluminación artificial/perfecta tipo publicidad
❌ Personas mirando directamente a cámara sonriendo falsamente
❌ Estética genérica que podría ser de cualquier país

GENERA LA IMAGEN AHORA.`;
    
    try {
      const imageResponse = await ai.models.generateContent({
        model: MODEL_IMAGE,
        contents: {
          parts: [{ text: imagePrompt }]
        },
        config: {
          imageConfig: { aspectRatio: "16:9" }
        }
      });

      // Extract image from parts
      for (const part of imageResponse.candidates[0].content.parts) {
        if (part.inlineData) {
          // Guardar imagen en disco
          const imageDir = path.resolve(process.cwd(), "public/blog-images");
          const imagePath = path.join(imageDir, `${postData.slug}.webp`);
          
          // Crear directorio si no existe
          await fs.mkdir(imageDir, { recursive: true });
          
          // Convertir base64 a buffer y guardar
          const imageBuffer = Buffer.from(part.inlineData.data, 'base64');
          await fs.writeFile(imagePath, imageBuffer);
          
          // Ajustar permisos para que nginx pueda servir la imagen
          try {
            await execAsync(`chmod 644 "${imagePath}"`);
            log("Permisos de imagen ajustados correctamente.", "success");
          } catch (permError) {
            log(`Advertencia: No se pudieron ajustar permisos de imagen: ${permError.message}`, "error");
          }
          
          // Comprimir imagen para reducir tamaño
          try {
            const statsBefore = await fs.stat(imagePath);
            log(`Tamaño original: ${(statsBefore.size / 1024).toFixed(2)} KB`, "info");
            log("Comprimiendo imagen...", "info");
            
            const sharp = (await import('sharp')).default;
            await sharp(imagePath)
              .webp({ quality: 75, effort: 6 })
              .toFile(imagePath + '.tmp');
            await fs.rename(imagePath + '.tmp', imagePath);
            await execAsync(`chmod 644 "${imagePath}"`);
            
            const statsAfter = await fs.stat(imagePath);
            const reduction = ((1 - statsAfter.size / statsBefore.size) * 100).toFixed(1);
            log(`Imagen comprimida: ${(statsAfter.size / 1024).toFixed(2)} KB (reducción: ${reduction}%)`, "success");
            
            // Generar thumbnail 400x200 para lista de posts
            log("Generando thumbnail 400x200...", "info");
            const thumbnailPath = path.join(imageDir, `${postData.slug}-thumb.webp`);
            await sharp(imagePath)
              .resize(400, 200, { fit: 'cover', position: 'center' })
              .webp({ quality: 70, effort: 6 })
              .toFile(thumbnailPath);
            await execAsync(`chmod 644 "${thumbnailPath}"`);
            
            const thumbStats = await fs.stat(thumbnailPath);
            log(`Thumbnail generado: ${(thumbStats.size / 1024).toFixed(2)} KB`, "success");
            
            postData.thumbnailImage = `/blog-images/${postData.slug}-thumb.webp`;
          } catch (compError) {
            log(`Advertencia: No se pudo comprimir la imagen: ${compError.message}`, "error");
          }
          
          postData.image = `/blog-images/${postData.slug}.webp`;
          log("Imagen generada y guardada exitosamente.", "success");
        }
      }
    } catch (imgError) {
      log(`Advertencia: No se pudo generar la imagen. ${imgError.message}`, "error");
      postData.image = `/blog-images/${postData.slug}.webp`;
    }

    // 4. GUARDAR RESULTADO
    // Forzar fecha actual (ignorar fecha generada por Gemini)
    const currentDate = new Date().toISOString();
    const geminiDate = postData.publishedAt;
    postData.publishedAt = currentDate;
    
    // Validar y reportar fecha
    if (geminiDate && geminiDate !== currentDate) {
      log(`⚠️  Fecha corregida: Gemini generó ${geminiDate}, usando ${currentDate}`, "info");
    } else {
      log(`✓ Fecha de publicación: ${currentDate}`, "success");
    }
    
    if (!postData.readingTime) {
      const words = postData.content.split(/\s+/).length;
      postData.readingTime = Math.ceil(words / 200); // ~200 palabras por minuto
    }

    const BLOG_DIR = path.resolve(process.cwd(), "content/blog");
    const fileName = `${postData.slug}.json`;
    const filePath = path.join(BLOG_DIR, fileName);

    await fs.writeFile(filePath, JSON.stringify(postData, null, 2));

    setStatus('Complete', 'green-900');
    console.log(`${colors.bright}${colors.green}🎉 ¡Post Generado Exitosamente!${colors.reset}`);
    console.log(`${colors.cyan}📁 Archivo:${colors.reset} ${filePath}`);
    console.log(`${colors.cyan}📝 Título:${colors.reset} ${postData.title}`);
    console.log(`${colors.cyan}📊 Tiempo de lectura:${colors.reset} ${postData.readingTime} min`);
    
    // Mostrar preview del JSON generado
    console.log(`\n${colors.dim}${colors.gray}--- Preview JSON ---${colors.reset}`);
    console.log(JSON.stringify(postData, null, 2));

    // Enviar notificación por correo (no bloqueante)
    console.log(`\n${colors.cyan}📧 Enviando notificación por correo...${colors.reset}`);
    sendBlogNotificationEmail(postData)
      .then(result => {
        if (result.success) {
          console.log(`${colors.green}✅ Notificación enviada correctamente a yo@cristiangarcia.co${colors.reset}`);
        } else {
          console.log(`${colors.yellow}⚠️  No se pudo enviar la notificación por correo${colors.reset}`);
        }
      })
      .catch(err => {
        console.log(`${colors.yellow}⚠️  Error al enviar correo: ${err.message}${colors.reset}`);
      });

    // Reiniciar PM2 para cargar el nuevo post (solo en servidor)
    try {
      console.log(`\n${colors.cyan}🔄 Limpiando caché y páginas pregeneradas...${colors.reset}`);
      // Limpiar caché ISR de Next.js y páginas pregeneradas
      await execAsync('rm -rf .next/cache');
      await execAsync('rm -rf .next/server/app/blog.html');
      await execAsync('rm -rf .next/server/app/blog.rsc');
      await execAsync('rm -rf .next/server/app/sitemap.xml.body');
      
      // Reiniciar aplicación
      console.log(`${colors.cyan}🔄 Reiniciando aplicación PM2...${colors.reset}`);
      await execAsync('pm2 restart internet-colombia');
      console.log(`${colors.green}✅ Aplicación reiniciada exitosamente${colors.reset}`);
      
      // Esperar que la app inicie
      console.log(`${colors.cyan}⏳ Esperando 5 segundos para que la app inicie...${colors.reset}`);
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      // Forzar regeneración inmediata de páginas con ISR
      console.log(`${colors.cyan}🔥 Forzando regeneración de /blog y /sitemap.xml...${colors.reset}`);
      await execAsync('curl -s http://localhost:3000/blog > /dev/null');
      await execAsync('curl -s http://localhost:3000/sitemap.xml > /dev/null');
      console.log(`${colors.green}✅ Páginas regeneradas - El post debería aparecer inmediatamente${colors.reset}`);
    } catch (pm2Error) {
      // PM2 no disponible (probablemente corriendo en local)
      console.log(`${colors.yellow}⚠️  PM2 no disponible (modo local)${colors.reset}`);
    }

  } catch (err) {
    log(`ERROR: ${err.message}`, "error");
    setStatus('Error', 'red-900');
    console.error(err);
    process.exit(1);
  }
}

// Ejecutar directamente
run();
