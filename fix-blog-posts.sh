#!/bin/bash
# Script para eliminar campos extra de posts problemáticos

cd /home/ubuntu/apps/comparador || exit 1

echo "🔧 Eliminando campos localNuances y seoScore de posts problemáticos..."

# Posts problemáticos
POSTS=(
  "crisis-wom-colombia-portabilidad-ley-1116"
  "etb-fallas-fibra-optica-bogota-chapinero-solucion"
  "robo-cables-fibra-optica-internet-bogota-causas"
  "sim-swapping-fraude-bancario-sic-investigacion"
)

for post in "${POSTS[@]}"; do
  file="content/blog/$post.json"
  
  if [ -f "$file" ]; then
    echo "📝 Procesando: $post..."
    
    # Crear backup
    cp "$file" "$file.bak"
    
    # Eliminar campos usando jq
    jq 'del(.localNuances, .seoScore)' "$file" > "$file.tmp" && mv "$file.tmp" "$file"
    
    echo "✅ Actualizado: $post"
  else
    echo "⚠️  No encontrado: $file"
  fi
done

echo ""
echo "🧹 Limpiando caché de Next.js..."
rm -rf .next/cache

echo ""
echo "🔄 Reiniciando aplicación..."
pm2 restart internet-colombia

echo ""
echo "✅ Proceso completado. Espera 30 segundos y verifica:"
echo "   • curl -s http://localhost:3000/sitemap.xml | grep -c '/blog/'"
echo "   • curl -s http://localhost:3000/blog | grep -c '<article'"
