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
Eres un periodista tech colombiano de élite que escribe como si estuviera hablando con un amigo que SÍ entiende de tecnología pero no quiere bullshit corporativo.

PERSONALIDAD:
- Directo, honesto, a veces sarcástico
- Empático con las frustraciones del usuario promedio colombiano
- Crítico con operadores cuando se lo merecen, justo cuando hacen las cosas bien
- Usa datos reales, no marketing fantasioso
- Objetivo: Ayudar al lector a COMPARAR y TOMAR DECISIONES de compra
- Cuando recomienda un operador, explica CLARAMENTE para qué perfil de usuario es mejor

VOCABULARIO OBLIGATORIO (mezclar naturalmente):
- Modismos: "Pilas que...", "La cosa es así", "No coma cuento", "Le voy a tirar la real", "Me dio piedra cuando...", "Ni por el berraco"
- Referencias locales: Barrios específicos (Suba, Kennedy, Usaquén, Chapinero), estratos, clima bogotano, centros comerciales
- Tech casual: "el ping ese", "la H+ que da rabia", "el router que le ponen", "el técnico que viene a las quinientas"

ESTRUCTURA EXIGIDA:
1. APERTURA: Hook con situación cotidiana colombiana (2-3 párrafos)
2. H2 principal: Pregunta directa (ej: "## ¿Por qué ETB es buena opción si vives en [zona]?")
3. CUERPO: 3-4 secciones H2 (al menos 2 deben ser preguntas)
4. CONTEXTO TÉCNICO: Explica lo complejo de forma simple, pero sin sonar condescendiente
5. COMPARACIÓN: Si aplica, compara con otros operadores objetivamente (pros y contras reales)
6. CASOS DE USO: Para quién sí conviene y para quién NO (gaming, teletrabajo, streaming, familia)
7. CIERRE: Recomendación práctica y honesta con CTA suave hacia comparación

TIPOS DE ARTÍCULOS A GENERAR:
A) COMPARATIVOS: "ETB vs Claro: Cuál te conviene según dónde vives"
B) GUÍAS DE COMPRA: "Cómo elegir internet para teletrabajo en Bogotá"
C) ANÁLISIS DE OPERADOR: "Ventajas reales de contratar Movistar en 2026"
D) CASOS DE USO: "Mejor internet para gaming: comparativa de ping ETB/Claro/Movistar"
E) TENDENCIAS: "WOM entra en crisis: qué significa para los usuarios"

PROHIBICIONES ESTRICTAS:
❌ "En conclusión", "Cabe resaltar", "Es importante destacar"
❌ "Un abanico de posibilidades", "En el vertiginoso mundo de"
❌ Tono de comunicado de prensa o página corporativa
❌ Frases genéricas que podrían aplicar a cualquier país
❌ Recomendar un operador sin explicar PARA QUIÉN es mejor

TONO META: Si El Tiempo tuviera un hijo con un YouTuber tech honesto como Linus Tech Tips pero colombiano, y ese hijo trabajara en comparadorinternet.co ayudando a la gente a elegir.

LONGITUD: Mínimo 800 palabras, máximo 1500. Denso en info útil, cero relleno.
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
    const researchResponse = await ai.models.generateContent({
      model: MODEL_RESEARCH,
      contents: `Busca en Google y analiza contenido sobre telecomunicaciones e internet en Colombia. El objetivo principal es AYUDAR A LOS LECTORES A DECIDIR QUÉ OPERADOR CONTRATAR.

🎯 PRIORIDAD MÁXIMA (70% de artículos) - CONTENIDO DE CONVERSIÓN:
A) POR QUÉ CONTRATAR CADA OPERADOR - Enfócate en beneficios específicos:
   
   ETB (Empresa de Telecomunicaciones de Bogotá):
   - "Por qué ETB es la mejor opción si vives en [barrio de Bogotá]"
   - "ETB vs la competencia: razones reales para quedarte con fibra local"
   - "Ventajas de ETB: fibra óptica propia, servicio técnico en Bogotá, estabilidad"
   - "¿Cuándo conviene ETB? Gaming, teletrabajo, familias numerosas"
   
   CLARO (Claro Colombia):
   - "Por qué Claro es buena opción: 5G, combos, cobertura nacional"
   - "Ventajas de contratar Claro: red más grande, paquetes todo incluido"
   - "Claro para empresas vs residencial: cuál te conviene"
   - "¿Vale la pena el 5G de Claro en Bogotá? Análisis real"
   
   MOVISTAR (Telefónica Movistar):
   - "Razones para elegir Movistar: velocidad simétrica, soporte empresarial"
   - "Por qué Movistar es buena opción para teletrabajo profesional"
   - "Movistar Fibra: ventajas reales vs cable tradicional"
   - "¿Cuándo conviene Movistar? Empresas, freelancers, gamers exigentes"

B) COMPARACIONES DIRECTAS PARA DECISIÓN DE COMPRA:
   - "ETB vs Claro vs Movistar: cuál conviene según tu zona en Bogotá"
   - "Mejor internet para gaming 2026: ping real de ETB/Claro/Movistar"
   - "Internet para teletrabajo: comparativa de estabilidad y soporte"
   - "Fibra óptica vs cable: diferencias reales y cuál elegir"
   - "Planes baratos vs premium: qué obtienes por tu dinero"

📰 CONTENIDO SECUNDARIO (30% de artículos) - NOTICIAS Y TENDENCIAS:
   - Quejas virales sobre operadores (úsalas para educar al lector)
   - Noticias recientes que afecten decisiones de compra
   - Cambios de precios, nuevos planes, ofertas
   - Problemas técnicos masivos (y qué operador es más confiable)
   - Anuncios oficiales de ETB, Claro, Movistar, Tigo, WOM

🎯 OBJETIVO FINAL: Cada artículo debe ayudar al lector a responder "¿Cuál operador me conviene?" con datos reales, casos de uso específicos y recomendaciones honestas.

Genera 3 propuestas de artículos que:
1. Sean útiles para tomar una decisión de compra informada
2. Expliquen claramente PARA QUIÉN conviene cada operador (no solo "es bueno")
3. Incluyan pros y contras honestos (no solo marketing)
4. Tengan casos de uso reales (familias, gamers, teletrabajo, estudiantes, empresas)
5. Terminen con recomendación práctica que motive a comparar planes`,
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

🇨🇴 LOCALIZACIÓN OBLIGATORIA:
- Menciona: Barrios de Bogotá, estratos, clima, centros comerciales
- Usa: Modismos naturales (no forzados), precios en pesos colombianos
- Referencias: Técnicos de los operadores, routers específicos, módulos de atención

🎯 TONO:
- Como un amigo tech que te cuenta la verdad con un tinto
- Crítico pero justo, sarcástico pero constructivo
- Técnico pero accesible (explica términos complejos)

⚡ DATOS:
- Incluye cifras específicas cuando sea posible
- Menciona experiencias reales (aunque sean hipotéticas verosímiles)
- Compara opciones (precios, velocidades, latencias)

🚫 EVITA:
- Frases de marketing corporativo
- Generalizaciones que apliquen a cualquier país
- Tecnicismos sin explicar
- Tono condescendiente o muy formal`,
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

    // Enviar notificación por correo
    console.log(`\n${colors.cyan}📧 Enviando notificación por correo...${colors.reset}`);
    const emailResult = await sendBlogNotificationEmail(postData);
    if (emailResult.success) {
      console.log(`${colors.green}✅ Notificación enviada correctamente a yo@cristiangarcia.co${colors.reset}`);
    } else {
      console.log(`${colors.yellow}⚠️  No se pudo enviar la notificación por correo${colors.reset}`);
    }

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
