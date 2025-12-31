const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const BLOG_IMAGES_DIR = path.join(process.cwd(), 'public', 'blog-images');
const BLOG_CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');

/**
 * Convert a single PNG/JPG image to WebP and delete the original
 * Usage: node scripts/convert-single-image.js <image-name.png>
 */
async function convertSingleImage(imageFileName) {
  if (!imageFileName) {
    console.error('❌ Error: Debes proporcionar el nombre de la imagen');
    console.log('Uso: node scripts/convert-single-image.js <nombre-imagen.png>');
    process.exit(1);
  }

  const imagePath = path.join(BLOG_IMAGES_DIR, imageFileName);
  const ext = path.extname(imageFileName);
  const baseName = path.basename(imageFileName, ext);

  // Validate file exists
  try {
    await fs.access(imagePath);
  } catch {
    console.error(`❌ Error: No se encontró la imagen: ${imageFileName}`);
    console.log(`   Ruta buscada: ${imagePath}`);
    process.exit(1);
  }

  // Validate extension
  if (!['.png', '.jpg', '.jpeg'].includes(ext.toLowerCase())) {
    console.error(`❌ Error: Solo se aceptan imágenes PNG, JPG o JPEG`);
    console.log(`   Recibido: ${ext}`);
    process.exit(1);
  }

  console.log(`\n🚀 Convirtiendo imagen a WebP...\n`);
  console.log(`📸 Procesando: ${imageFileName}`);

  // Convert to WebP
  const webpPath = imagePath.replace(ext, '.webp');
  try {
    await sharp(imagePath)
      .webp({ quality: 85 })
      .toFile(webpPath);

    console.log(`✓ Convertido: ${path.basename(imagePath)} → ${path.basename(webpPath)}`);
  } catch (error) {
    console.error(`✗ Error al convertir: ${error.message}`);
    process.exit(1);
  }

  // Update corresponding JSON file
  const jsonFileName = `${baseName}.json`;
  const jsonPath = path.join(BLOG_CONTENT_DIR, jsonFileName);

  try {
    await fs.access(jsonPath);

    const content = await fs.readFile(jsonPath, 'utf8');
    const data = JSON.parse(content);

    if (data.image && data.image.endsWith(ext)) {
      const oldImage = data.image;
      data.image = data.image.replace(ext, '.webp');

      const updatedContent = JSON.stringify(data, null, 2) + '\n';
      await fs.writeFile(jsonPath, updatedContent, 'utf8');

      console.log(`  ✓ JSON actualizado: ${jsonFileName}`);
      console.log(`    ${oldImage} → ${data.image}`);
    } else {
      console.log(`  ⚠ JSON encontrado pero no necesita actualización`);
    }
  } catch {
    console.log(`  ⚠ No se encontró JSON: ${jsonFileName}`);
  }

  // Delete original PNG/JPG file
  try {
    await fs.unlink(imagePath);
    console.log(`  ✓ Imagen original eliminada: ${imageFileName}`);
  } catch (error) {
    console.error(`  ✗ Error al eliminar imagen original: ${error.message}`);
  }

  console.log('\n' + '='.repeat(60));
  console.log('✅ Conversión completada!');
  console.log('='.repeat(60));
  console.log('\n💡 Próximos pasos:');
  console.log('   1. Verifica la imagen WebP en public/blog-images/');
  console.log('   2. Ejecuta: rm -rf .next && npm run build');
}

// Get image filename from command line arguments
const imageFileName = process.argv[2];
convertSingleImage(imageFileName).catch(console.error);
