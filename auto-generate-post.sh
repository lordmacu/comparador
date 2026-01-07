#!/bin/bash

# Script para generar post y actualizar el sitio
# Uso: ./auto-generate-post.sh

set -e

echo "🤖 Generando nuevo post..."

# Ir al directorio del proyecto
cd /ruta/a/tu/proyecto/internet

# Asegurarse de tener la API key
export GOOGLE_AI_API_KEY="${GOOGLE_AI_API_KEY:-TU_API_KEY_AQUI}"

# Generar el post
node scripts/generate-blog-post.mjs

# Verificar si se creó un nuevo post
if [ $? -eq 0 ]; then
    echo "✅ Post generado exitosamente"
    
    # Opcional: Commit automático a Git
    if [ -d ".git" ]; then
        NEW_POST=$(ls -t content/blog/*.json | head -1)
        git add content/blog/
        git add public/blog-images/
        git commit -m "🤖 Auto-generated blog post: $(basename $NEW_POST .json)" || true
        git push origin main || true
    fi
    
    # Si usas ISR, no necesitas rebuild
    # Si NO usas ISR, descomenta estas líneas:
    # echo "🔨 Rebuilding Next.js..."
    # npm run build
    # pm2 restart nextjs-app
    
    echo "🎉 Proceso completado"
else
    echo "❌ Error generando post"
    exit 1
fi
