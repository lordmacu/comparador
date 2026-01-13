#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function compressImages() {
  const imagesDir = path.join(__dirname, '..', 'public', 'blog-images');
  
  console.log('🗜️  Comprimiendo imágenes en:', imagesDir);
  console.log('');
  
  const files = await fs.readdir(imagesDir);
  const webpFiles = files.filter(f => f.endsWith('.webp'));
  
  let totalBefore = 0;
  let totalAfter = 0;
  
  for (const file of webpFiles) {
    const filePath = path.join(imagesDir, file);
    
    try {
      const statsBefore = await fs.stat(filePath);
      totalBefore += statsBefore.size;
      
      console.log(`📦 ${file}`);
      console.log(`   Antes: ${(statsBefore.size / 1024).toFixed(2)} KB`);
      
      // Comprimir
      await sharp(filePath)
        .webp({ quality: 75, effort: 6 })
        .toFile(filePath + '.tmp');
      
      await fs.rename(filePath + '.tmp', filePath);
      
      const statsAfter = await fs.stat(filePath);
      totalAfter += statsAfter.size;
      
      const reduction = ((1 - statsAfter.size / statsBefore.size) * 100).toFixed(1);
      console.log(`   Después: ${(statsAfter.size / 1024).toFixed(2)} KB (${reduction}% reducción)`);
      console.log('');
    } catch (error) {
      console.error(`❌ Error con ${file}:`, error.message);
    }
  }
  
  const totalReduction = ((1 - totalAfter / totalBefore) * 100).toFixed(1);
  console.log('');
  console.log('✅ RESUMEN');
  console.log(`   Imágenes procesadas: ${webpFiles.length}`);
  console.log(`   Tamaño total antes: ${(totalBefore / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Tamaño total después: ${(totalAfter / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Reducción total: ${totalReduction}%`);
}

compressImages().catch(console.error);
