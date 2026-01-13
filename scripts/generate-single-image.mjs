import { GoogleGenAI } from "@google/genai";
import fs from "fs/promises";
import path from "path";
import { exec } from "child_process";
import { promisify } from "util";
import dotenv from "dotenv";
import sharp from "sharp";

const execAsync = promisify(exec);
dotenv.config();

const MODEL_IMAGE = "gemini-2.5-flash-image";

const IMAGE_STYLES = [
  "ilustración digital estilo New Yorker, escena isométrica de edificios bogotanos conectados por líneas de fibra óptica brillantes, personas como siluetas coloridas en ventanas, paleta limitada (azul, amarillo, rojo)",
  "ilustración digital plana estilo Kurzgesagt, infografía sobre conectividad 5G en Colombia, íconos geométricos simples de antenas, celulares y ciudades, colores vibrantes saturados (cyan, naranja, magenta), sin gradientes",
  "flat design tipo Dropbox, ilustración vectorial minimalista de familia colombiana usando internet en diferentes dispositivos (laptop, tablet, celular), colores pasteles suaves, composición centrada con espacio negativo",
  "ilustración minimalista tipo Apple Marketing, siluetas negras de colombianos con devices contra degradado vibrante (naranja-rosa-morado), formas geométricas simples de Monserrate y edificios, composición limpia",
  "Studio Ghibli estilo Spirited Away, joven colombiana en café bogotano mágico-realista con laptop, clientes fantasmales translúcidos en fondo, colores acuarelados pastel, nubes volumétricas por ventanales, detalles arquitectónicos coloniales",
  "anime Ghibli tipo Whisper of the Heart, estudiante colombiano en biblioteca de barrio bogotano rodeado de libros y tablets, luz dorada de atardecer entrando por ventanales, polvo brillante flotando, cerros verdes y ciudad al fondo, paleta cálida nostálgica",
  "fotografía tipo Wes Anderson, composición perfectamente simétrica de oficina colombiana retro-futurista, empleados idénticos en desks con computadores antiguos, paleta pastel (rosa pálido, verde menta, amarillo crema), centro absoluto"
];

async function generateImage(slug, title, description = "") {
  const apiKey = process.env.GOOGLE_AI_API_KEY || process.env.API_KEY;
  if (!apiKey) {
    console.error("ERROR: No se encontró la API key.");
    process.exit(1);
  }

  const ai = new GoogleGenAI({ apiKey });
  
  try {
    console.log(`🎨 Generando imagen para: ${title}`);
    
    const randomStyle = IMAGE_STYLES[Math.floor(Math.random() * IMAGE_STYLES.length)];
    console.log(`📐 Estilo seleccionado: ${randomStyle}`);
    
    const imagePrompt = `Genera una imagen fotográfica HIPERREALISTA de alta calidad profesional.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 TEMA DEL ARTÍCULO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${title}

${description ? `Descripción: ${description}` : ''}

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
• Elementos según tema: Antenas, torres de telecomunicaciones, cables de fibra óptica
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
• Escenario realista: Apartamento/casa en instalación o uso de internet
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

    const imageResponse = await ai.models.generateContent({
      model: MODEL_IMAGE,
      contents: {
        parts: [{ text: imagePrompt }]
      },
      config: {
        imageConfig: { aspectRatio: "16:9" }
      }
    });

    console.log("📦 Respuesta completa:", JSON.stringify(imageResponse, null, 2));

    // Extract image from parts
    if (imageResponse.candidates && imageResponse.candidates[0]) {
      for (const part of imageResponse.candidates[0].content.parts) {
        if (part.inlineData) {
        // Guardar imagen en disco con compresión
        const imageDir = path.resolve(process.cwd(), "public/blog-images");
        const imagePath = path.join(imageDir, `${slug}.webp`);
        const tempPath = path.join(imageDir, `${slug}.temp.webp`);
        
        // Crear directorio si no existe
        await fs.mkdir(imageDir, { recursive: true });
        
        // Convertir base64 a buffer y guardar temporalmente
        const imageBuffer = Buffer.from(part.inlineData.data, 'base64');
        await fs.writeFile(tempPath, imageBuffer);
        
        // Comprimir con sharp (calidad 80, máximo 300KB target)
        await sharp(tempPath)
          .webp({ quality: 80, effort: 6 })
          .resize(1200, 630, { fit: 'cover', position: 'center' })
          .toFile(imagePath);
        
        // Eliminar temporal
        await fs.unlink(tempPath);
        
        // Ajustar permisos para que nginx pueda servir la imagen
        try {
          await execAsync(`chmod 644 "${imagePath}"`);
          console.log("✅ Permisos de imagen ajustados correctamente.");
        } catch (permError) {
          console.log(`⚠️  Advertencia: No se pudieron ajustar permisos de imagen: ${permError.message}`);
        }
        
        console.log(`✅ Imagen guardada: ${imagePath}`);
        console.log(`📏 Tamaño original: ${(imageBuffer.length / 1024).toFixed(2)} KB`);
        
        // Comprimir imagen para reducir tamaño
        try {
          console.log("🗜️  Comprimiendo imagen...");
          const sharp = (await import('sharp')).default;
          await sharp(imagePath)
            .webp({ quality: 75, effort: 6 })
            .toFile(imagePath + '.tmp');
          await fs.rename(imagePath + '.tmp', imagePath);
          await execAsync(`chmod 644 "${imagePath}"`);
          
          const statsAfter = await fs.stat(imagePath);
          const reduction = ((1 - imageBuffer.length / statsAfter.size) * 100).toFixed(1);
          console.log(`✅ Imagen comprimida: ${(statsAfter.size / 1024).toFixed(2)} KB (reducción: ${Math.abs(reduction)}%)`);
          
          // Generar thumbnail 400x200 para lista de posts
          console.log("🖼️  Generando thumbnail 400x200...");
          const thumbnailPath = imagePath.replace('.webp', '-thumb.webp');
          await sharp(imagePath)
            .resize(400, 200, { fit: 'cover', position: 'center' })
            .webp({ quality: 70, effort: 6 })
            .toFile(thumbnailPath);
          await execAsync(`chmod 644 "${thumbnailPath}"`);
          
          const thumbStats = await fs.stat(thumbnailPath);
          console.log(`✅ Thumbnail generado: ${(thumbStats.size / 1024).toFixed(2)} KB`);
        } catch (compError) {
          console.log(`⚠️  Advertencia: No se pudo comprimir: ${compError.message}`);
        }
        
        return imagePath;
      }
    }
    }

    throw new Error("No se encontró imagen en la respuesta");
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    if (error.stack) console.error(error.stack);
    process.exit(1);
  }
}

// Ejecutar
const slug = process.argv[2] || "claro-dominancia-5g-expansion-colombia";
const title = process.argv[3] || "Claro y su aplanadora 5G: ¿Ya vuela su internet o sigue 'cargando' en 3G?";

generateImage(slug, title);
