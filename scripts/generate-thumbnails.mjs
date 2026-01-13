#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BLOG_IMAGES_DIR = path.join(__dirname, '../public/blog-images');
const BLOG_CONTENT_DIR = path.join(__dirname, '../content/blog');

async function generateThumbnails() {
  try {
    console.log('🖼️  Generando thumbnails para imágenes existentes...\n');

    // Leer todas las imágenes en el directorio
    const files = await fs.readdir(BLOG_IMAGES_DIR);
    const imageFiles = files.filter(f => f.endsWith('.webp') && !f.includes('-thumb'));

    console.log(`📁 Encontradas ${imageFiles.length} imágenes para procesar\n`);

    let processed = 0;
    let updated = 0;
    let errors = 0;

    for (const imageFile of imageFiles) {
      try {
        const imagePath = path.join(BLOG_IMAGES_DIR, imageFile);
        const thumbnailFile = imageFile.replace('.webp', '-thumb.webp');
        const thumbnailPath = path.join(BLOG_IMAGES_DIR, thumbnailFile);

        // Verificar si el thumbnail ya existe
        const thumbExists = await fs.access(thumbnailPath).then(() => true).catch(() => false);
        
        if (thumbExists) {
          console.log(`⏭️  ${imageFile} - thumbnail ya existe, saltando...`);
          continue;
        }

        // Generar thumbnail
        console.log(`🔨 Procesando: ${imageFile}`);
        
        const statsBefore = await fs.stat(imagePath);
        console.log(`   Original: ${(statsBefore.size / 1024).toFixed(2)} KB`);

        await sharp(imagePath)
          .resize(400, 200, { fit: 'cover', position: 'center' })
          .webp({ quality: 70, effort: 6 })
          .toFile(thumbnailPath);

        const statsAfter = await fs.stat(thumbnailPath);
        console.log(`   Thumbnail: ${(statsAfter.size / 1024).toFixed(2)} KB`);

        // Actualizar JSON del post
        const slug = imageFile.replace('.webp', '');
        const jsonPath = path.join(BLOG_CONTENT_DIR, `${slug}.json`);
        
        try {
          const jsonExists = await fs.access(jsonPath).then(() => true).catch(() => false);
          
          if (jsonExists) {
            const postData = JSON.parse(await fs.readFile(jsonPath, 'utf-8'));
            postData.thumbnailImage = `/blog-images/${thumbnailFile}`;
            await fs.writeFile(jsonPath, JSON.stringify(postData, null, 2));
            console.log(`   ✅ JSON actualizado: ${slug}.json`);
            updated++;
          } else {
            console.log(`   ⚠️  JSON no encontrado: ${slug}.json`);
          }
        } catch (jsonError) {
          console.log(`   ⚠️  Error actualizando JSON: ${jsonError.message}`);
        }

        processed++;
        console.log(`   ✅ Thumbnail generado exitosamente\n`);

      } catch (error) {
        console.error(`   ❌ Error procesando ${imageFile}: ${error.message}\n`);
        errors++;
      }
    }

    console.log('\n' + '='.repeat(60));
    console.log('📊 RESUMEN:');
    console.log(`   Total de imágenes: ${imageFiles.length}`);
    console.log(`   Thumbnails generados: ${processed}`);
    console.log(`   JSONs actualizados: ${updated}`);
    console.log(`   Errores: ${errors}`);
    console.log('='.repeat(60));

    if (processed > 0) {
      console.log('\n✨ Proceso completado. Reconstruye el proyecto con: npm run build');
    }

  } catch (error) {
    console.error('❌ Error fatal:', error);
    process.exit(1);
  }
}

generateThumbnails();
