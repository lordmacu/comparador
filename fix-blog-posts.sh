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
echo "🧹 Limpiando caché y páginas pregeneradas de Next.js..."
rm -rf .next/cache
rm -rf .next/server/app/blog/*.html
rm -rf .next/server/app/blog/*.rsc
rm -rf .next/server/app/sitemap.xml.body

echo ""
echo "� Reiniciando aplicación..."
pm2 restart internet-colombia

echo ""
echo "⏳ Esperando 5 segundos para que la app inicie..."
sleep 5

echo ""
echo "🔥 Forzando regeneración de páginas..."
curl -s http://localhost:3000/blog > /dev/null
curl -s http://localhost:3000/sitemap.xml > /dev/null

echo "⏳ Esperando 5 segundos más..."
sleep 5

echo ""
echo "📊 Verificación automática:"
SITEMAP_COUNT=$(curl -s http://localhost:3000/sitemap.xml | grep -c '/blog/')
BLOG_COUNT=$(curl -s http://localhost:3000/blog | grep -c '<article')

echo "   • Posts en sitemap: $SITEMAP_COUNT (debe ser 23)"
echo "   • Posts en /blog: $BLOG_COUNT (debe ser 23)"

if [ "$SITEMAP_COUNT" -eq 23 ] && [ "$BLOG_COUNT" -eq 23 ]; then
  echo ""
  echo "✅ ¡ÉXITO! Todos los posts aparecen correctamente"
else
  echo ""
  echo "⚠️  Aún faltan posts. Revisa los logs:"
  echo "   pm2 logs internet-colombia --lines 50"
fi
