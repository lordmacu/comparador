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

// ==================== CONFIGURACIÓN ====================
const MODEL_WRITING = 'gemini-3-pro-preview';
const MODEL_IMAGE = 'gemini-2.5-flash-image';

// ==================== OBTENER TEMA DEL ARGUMENTO ====================
const topic = process.argv[2];

if (!topic) {
  console.log(`
╔════════════════════════════════════════════════════════════════╗
║  GENERADOR DE BLOG POST POR TEMA                               ║
╠════════════════════════════════════════════════════════════════╣
║                                                                 ║
║  Uso: node scripts/generate-blog-topic.mjs "<tema>"            ║
║                                                                 ║
║  Ejemplos:                                                      ║
║    node scripts/generate-blog-topic.mjs "ETB vs Claro 2026"    ║
║    node scripts/generate-blog-topic.mjs "Mejor internet gaming"║
║    node scripts/generate-blog-topic.mjs "5G en Bogotá"         ║
║    node scripts/generate-blog-topic.mjs "Internet estrato 2"   ║
║                                                                 ║
╚════════════════════════════════════════════════════════════════╝
`);
  process.exit(1);
}

console.log(`\n🎯 Tema recibido: "${topic}"\n`);

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
          body { font-family: 'Segoe UI', sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
          .content { background: #f9f9f9; padding: 30px; border: 1px solid #ddd; border-top: none; }
          .info-row { background: white; padding: 15px; margin: 10px 0; border-radius: 5px; border-left: 4px solid #667eea; }
          .label { font-weight: bold; color: #667eea; font-size: 12px; text-transform: uppercase; }
          .value { font-size: 16px; color: #333; margin-top: 5px; }
          .button { display: inline-block; padding: 12px 24px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="header"><h1>✨ Nuevo Blog Post (Por Tema)</h1></div>
        <div class="content">
          <div class="info-row"><div class="label">Tema Solicitado</div><div class="value">${topic}</div></div>
          <div class="info-row"><div class="label">Título Generado</div><div class="value">${blogPost.title}</div></div>
          <div class="info-row"><div class="label">Slug</div><div class="value">${blogPost.slug}</div></div>
          <div style="text-align: center;"><a href="https://comparadorinternet.co/blog/${blogPost.slug}" class="button">Ver Post</a></div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Correo de notificación enviado');
  } catch (error) {
    console.log('⚠️  No se pudo enviar el correo:', error.message);
  }
}

// Estilos visuales para imágenes
const IMAGE_STYLES = [
  "fotografía documental urbana tipo National Geographic, personas reales en calles de Bogotá usando celulares, luz difusa de día nublado típico bogotano",
  "estilo fotoperiodismo Reuters, colombianos diversos con smartphones, fondo desenfocado de ladrillos rojos y buses",
  "fotografía lifestyle editorial, grupo multigeneracional colombiano en sala moderna con laptops, ventanas con cerros de Bogotá al fondo",
  "street photography estilo Magnum, primer plano de manos colombianas sosteniendo celular, rostros reflejados en ventanas",
  "ilustración digital estilo New Yorker, escena isométrica de edificios bogotanos conectados por líneas de fibra óptica brillantes",
  "arte vectorial flat design moderno, colombianos geométricos usando devices, formas abstractas de cerros y edificios",
  "Studio Ghibli estilo Spirited Away, joven colombiana en café bogotano con laptop, colores acuarelados pastel",
  "anime Ghibli tipo Whisper of the Heart, estudiante colombiano en biblioteca rodeado de libros y tablets, luz dorada de atardecer",
  "fotografía tipo Wes Anderson, composición simétrica de oficina colombiana retro-futurista, paleta pastel"
];

const WRITING_SYSTEM_PROMPT = `
Eres un periodista tecnológico profesional especializado en telecomunicaciones en Colombia.

PERSONALIDAD:
- Profesional, informado y objetivo
- Cercano pero manteniendo credibilidad editorial
- Crítico fundamentado con datos cuando corresponde
- Balanceado: reconoce fortalezas y debilidades de cada operador

ESTILO:
- Lenguaje claro y accesible
- Referencias geográficas específicas (barrios, localidades de Bogotá)
- Terminología técnica explicada de forma comprensible
- Tono conversacional profesional

ESTRUCTURA:
1. APERTURA: Introduce el tema con contexto relevante (2-3 párrafos)
2. H2 principal: Pregunta directa que enmarca el artículo
3. CUERPO: 3-4 secciones H2 (usa al menos 2 preguntas para títulos)
4. CONTEXTO TÉCNICO: Explica conceptos complejos de forma clara
5. ANÁLISIS COMPARATIVO: Cuando aplique, compara operadores objetivamente
6. CIERRE: Conclusión práctica con recomendaciones y CTA natural

PROHIBICIONES:
❌ Modismos coloquiales excesivos
❌ "En conclusión", "Cabe resaltar", "Es importante destacar"
❌ Tono de comunicado de prensa
❌ Generalizaciones sin fundamento

LONGITUD: 800-1500 palabras. Contenido denso en información útil.
`;

// ==================== TERMINAL HELPERS ====================
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  blue: '\x1b[34m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m'
};

const log = (msg, type = 'default') => {
  const timestamp = new Date().toLocaleTimeString();
  const prefixes = {
    info: `${colors.blue}ℹ${colors.reset}`,
    success: `${colors.green}✓${colors.reset}`,
    error: `${colors.red}✗${colors.reset}`,
    default: `${colors.gray}•${colors.reset}`
  };
  console.log(`${colors.gray}[${timestamp}]${colors.reset} ${prefixes[type] || prefixes.default} ${msg}`);
};

const setStatus = (status, colorName = 'gray') => {
  const colorMap = { 'blue': colors.blue, 'yellow': colors.yellow, 'green': colors.green, 'red': colors.red };
  const color = colorMap[colorName] || colors.gray;
  console.log(`\n${color}${colors.bright}══════════════════════════════════════${colors.reset}`);
  console.log(`${color}${colors.bright}  ${status.toUpperCase()}${colors.reset}`);
  console.log(`${color}${colors.bright}══════════════════════════════════════${colors.reset}\n`);
};

// ==================== MAIN FUNCTION ====================
async function run() {
  const apiKey = process.env.GOOGLE_AI_API_KEY || process.env.API_KEY;
  if (!apiKey) {
    log("ERROR: No se encontró GOOGLE_AI_API_KEY en variables de entorno.", "error");
    process.exit(1);
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    // 1. REDACCIÓN DIRECTA CON EL TEMA
    setStatus('Escribiendo Artículo', 'yellow');
    log(`Generando contenido sobre: "${topic}"`, "info");

    const writingResponse = await ai.models.generateContent({
      model: MODEL_WRITING,
      contents: `MISIÓN: Escribe un artículo periodístico tech completo sobre este tema específico.

TEMA ASIGNADO: "${topic}"

REQUISITOS:

📝 ESTRUCTURA:
- Título: Atractivo, SEO-friendly, incluye el tema
- Descripción (meta): 140-160 caracteres con beneficio claro
- Apertura: Contexto colombiano relevante (2 párrafos)
- 4-6 secciones H2 (mínimo 2 como preguntas directas)
- Cada sección: 150-250 palabras
- Cierre: Consejo práctico con CTA

🔤 FORMATO - MARKDOWN PURO:
- Párrafos: Texto normal con doble enter
- Títulos: ## Título (no HTML)
- Negritas: **texto**
- Listas: - Item o 1. Item
- NO uses HTML tags

🇨🇴 LOCALIZACIÓN:
- Keywords locales: "Bogotá", "Colombia", barrios específicos
- Precios en COP, zonas de cobertura, estratos
- Referencias: TransMilenio, localidades bogotanas

⚡ DATOS OBLIGATORIOS:
- Cifras actualizadas 2026: precios, velocidades
- Comparativas con datos medibles cuando aplique
- Keywords naturales: "mejor internet", "planes", "vs", "2026"

🔗 CTA FINAL:
Cierra invitando a comparar en comparadorinternet.co

🚫 PROHIBIDO:
- "En conclusión", frases de relleno
- HTML tags
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
    log(`Título generado: "${postData.title}"`, "success");

    // 2. GENERAR IMAGEN
    setStatus('Generando Imagen', 'yellow');
    const randomStyle = IMAGE_STYLES[Math.floor(Math.random() * IMAGE_STYLES.length)];
    log(`Estilo visual: ${randomStyle.substring(0, 50)}...`, "info");

    const imagePrompt = `Genera una imagen fotográfica de alta calidad.

TEMA: ${postData.title}
ESTILO: ${randomStyle}

ELEMENTOS:
- 2-4 personas colombianas auténticas usando tecnología
- Ubicación Bogotá: arquitectura de ladrillos rojos, cerros al fondo
- Dispositivos: smartphones, laptops, routers
- Clima típico bogotano (cielo parcialmente nublado)

TÉCNICA:
- Formato 16:9 horizontal
- Fotorrealista, calidad profesional
- Composición dinámica

PROHIBIDO:
- Texto visible, logos, watermarks
- Stock photos genéricos
- Personas mirando a cámara sonriendo falsamente`;

    try {
      const imageResponse = await ai.models.generateContent({
        model: MODEL_IMAGE,
        contents: { parts: [{ text: imagePrompt }] },
        config: { responseModalities: ["image", "text"] }
      });

      for (const part of imageResponse.candidates[0].content.parts) {
        if (part.inlineData) {
          const imageDir = path.resolve(process.cwd(), "public/blog-images");
          const imagePath = path.join(imageDir, `${postData.slug}.webp`);

          await fs.mkdir(imageDir, { recursive: true });
          const imageBuffer = Buffer.from(part.inlineData.data, 'base64');
          await fs.writeFile(imagePath, imageBuffer);

          try { await execAsync(`chmod 644 "${imagePath}"`); } catch {}

          // Comprimir imagen
          try {
            const sharp = (await import('sharp')).default;
            await sharp(imagePath).webp({ quality: 75 }).toFile(imagePath + '.tmp');
            await fs.rename(imagePath + '.tmp', imagePath);

            // Thumbnail
            const thumbnailPath = path.join(imageDir, `${postData.slug}-thumb.webp`);
            await sharp(imagePath).resize(400, 200, { fit: 'cover' }).webp({ quality: 70 }).toFile(thumbnailPath);
            postData.thumbnailImage = `/blog-images/${postData.slug}-thumb.webp`;
            log("Imagen comprimida y thumbnail generado", "success");
          } catch {}

          postData.image = `/blog-images/${postData.slug}.webp`;
          log("Imagen guardada exitosamente", "success");
        }
      }
    } catch (imgError) {
      log(`No se pudo generar imagen: ${imgError.message}`, "error");
      postData.image = `/blog-images/default.webp`;
    }

    // 3. GUARDAR RESULTADO
    postData.publishedAt = new Date().toISOString();
    if (!postData.readingTime) {
      postData.readingTime = Math.ceil(postData.content.split(/\s+/).length / 200);
    }

    const BLOG_DIR = path.resolve(process.cwd(), "content/blog");
    const filePath = path.join(BLOG_DIR, `${postData.slug}.json`);
    await fs.writeFile(filePath, JSON.stringify(postData, null, 2));

    setStatus('Completado', 'green');
    console.log(`${colors.bright}${colors.green}🎉 ¡Post Generado Exitosamente!${colors.reset}`);
    console.log(`${colors.cyan}📁 Archivo:${colors.reset} ${filePath}`);
    console.log(`${colors.cyan}📝 Título:${colors.reset} ${postData.title}`);
    console.log(`${colors.cyan}🔗 URL:${colors.reset} https://comparadorinternet.co/blog/${postData.slug}`);
    console.log(`${colors.cyan}📊 Lectura:${colors.reset} ${postData.readingTime} min`);

    // Preview JSON
    console.log(`\n${colors.gray}--- Preview JSON ---${colors.reset}`);
    console.log(JSON.stringify({ ...postData, content: postData.content.substring(0, 200) + '...' }, null, 2));

    // Notificación por correo
    sendBlogNotificationEmail(postData);

    // Reiniciar PM2 si está disponible
    try {
      log("Limpiando caché...", "info");
      await execAsync('rm -rf .next/cache');
      await execAsync('pm2 restart internet-colombia');
      log("Aplicación reiniciada", "success");

      await new Promise(resolve => setTimeout(resolve, 5000));
      await execAsync('curl -s http://localhost:3000/blog > /dev/null');
      log("Página /blog regenerada", "success");
    } catch {
      log("PM2 no disponible (modo local)", "info");
    }

  } catch (err) {
    log(`ERROR: ${err.message}`, "error");
    setStatus('Error', 'red');
    console.error(err);
    process.exit(1);
  }
}

run();
