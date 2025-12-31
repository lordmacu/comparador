const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const BLOG_IMAGES_DIR = path.join(process.cwd(), 'public', 'blog-images');
const BLOG_CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');

/**
 * Convert PNG/JPG images to WebP format
 */
async function convertImageToWebP(imagePath) {
  const ext = path.extname(imagePath);
  const webpPath = imagePath.replace(ext, '.webp');

  try {
    await sharp(imagePath)
      .webp({ quality: 85 })
      .toFile(webpPath);

    console.log(`✓ Converted: ${path.basename(imagePath)} → ${path.basename(webpPath)}`);
    return webpPath;
  } catch (error) {
    console.error(`✗ Failed to convert ${path.basename(imagePath)}:`, error.message);
    return null;
  }
}

/**
 * Update JSON file to reference WebP image instead of PNG/JPG
 */
async function updateBlogPostJSON(jsonPath, oldExt, newExt) {
  try {
    const content = await fs.readFile(jsonPath, 'utf8');
    const data = JSON.parse(content);

    if (data.image && data.image.endsWith(oldExt)) {
      const oldImage = data.image;
      data.image = data.image.replace(oldExt, newExt);

      const updatedContent = JSON.stringify(data, null, 2) + '\n';
      await fs.writeFile(jsonPath, updatedContent, 'utf8');

      console.log(`  ✓ Updated JSON: ${path.basename(jsonPath)}`);
      console.log(`    ${oldImage} → ${data.image}`);
      return true;
    }

    return false;
  } catch (error) {
    console.error(`  ✗ Failed to update ${path.basename(jsonPath)}:`, error.message);
    return false;
  }
}

/**
 * Main conversion process
 */
async function convertAllImagesToWebP() {
  console.log('🚀 Starting image conversion to WebP...\n');

  try {
    // Read all files in blog-images directory
    const imageFiles = await fs.readdir(BLOG_IMAGES_DIR);
    const pngFiles = imageFiles.filter(file =>
      file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')
    );

    if (pngFiles.length === 0) {
      console.log('✓ No PNG/JPG images found to convert.');
      return;
    }

    console.log(`📁 Found ${pngFiles.length} image(s) to convert:\n`);

    let convertedCount = 0;
    let updatedJSONCount = 0;

    for (const imageFile of pngFiles) {
      const imagePath = path.join(BLOG_IMAGES_DIR, imageFile);
      const ext = path.extname(imageFile);
      const baseName = path.basename(imageFile, ext);

      console.log(`\n📸 Processing: ${imageFile}`);

      // Convert image to WebP
      const webpPath = await convertImageToWebP(imagePath);
      if (webpPath) {
        convertedCount++;

        // Find and update corresponding JSON file
        const jsonFileName = `${baseName}.json`;
        const jsonPath = path.join(BLOG_CONTENT_DIR, jsonFileName);

        try {
          await fs.access(jsonPath);
          const updated = await updateBlogPostJSON(jsonPath, ext, '.webp');
          if (updated) updatedJSONCount++;
        } catch {
          console.log(`  ⚠ No matching JSON found: ${jsonFileName}`);
        }
      }
    }

    console.log('\n' + '='.repeat(60));
    console.log('✅ Conversion complete!');
    console.log(`   Images converted: ${convertedCount}/${pngFiles.length}`);
    console.log(`   JSON files updated: ${updatedJSONCount}`);
    console.log('='.repeat(60));

    if (convertedCount > 0) {
      console.log('\n💡 Next steps:');
      console.log('   1. Review the converted WebP images in public/blog-images/');
      console.log('   2. Test the blog posts to ensure images load correctly');
      console.log('   3. If everything looks good, you can delete the old PNG files');
      console.log('   4. Run: npm run build');
    }

  } catch (error) {
    console.error('❌ Error during conversion:', error);
    process.exit(1);
  }
}

// Run the script
convertAllImagesToWebP().catch(console.error);
