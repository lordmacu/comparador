#!/bin/bash
# request-indexing.sh - Script para solicitar indexación inmediata en Google

echo "🔍 Solicitando indexación de páginas en Google..."

# URLs prioritarias que necesitan indexación
URLS=(
  "https://comparadorinternet.co"
  "https://comparadorinternet.co/blog"
  "https://comparadorinternet.co/blog/checklist-para-contratar-internet-en-bogota"
  "https://comparadorinternet.co/blog/como-saber-si-hay-fibra-optica-en-tu-direccion-bogota"
  "https://comparadorinternet.co/blog/claro-vs-movistar-vs-etb-bogota"
  "https://comparadorinternet.co/blog/etb-vs-movistar-vs-claro-bogota"
  "https://comparadorinternet.co/blog/movistar-vs-claro-vs-etb-bogota"
)

# IndexNow API Key
INDEXNOW_KEY="3f4a8e7b9c2d1f6e8a5b3c9d2e7f4a8b"
HOST="comparadorinternet.co"

# Crear JSON para IndexNow (Bing, Yandex, y otros)
echo "📤 Enviando URLs a IndexNow (Bing)..."
for url in "${URLS[@]}"; do
  curl -X POST "https://api.indexnow.org/indexnow" \
    -H "Content-Type: application/json" \
    -d "{
      \"host\": \"$HOST\",
      \"key\": \"$INDEXNOW_KEY\",
      \"keyLocation\": \"https://$HOST/$INDEXNOW_KEY.txt\",
      \"urlList\": [\"$url\"]
    }"
  echo " ✅ $url enviada"
  sleep 1
done

echo ""
echo "✅ Solicitudes de indexación enviadas!"
echo ""
echo "📋 Próximos pasos manuales:"
echo "1. Ir a Google Search Console: https://search.google.com/search-console"
echo "2. Solicitar inspección de URL para cada página:"
for url in "${URLS[@]}"; do
  echo "   - $url"
done
echo ""
echo "3. Para cada URL:"
echo "   - Pegar URL en el campo de búsqueda superior"
echo "   - Click en 'Solicitar indexación'"
echo "   - Esperar confirmación"
echo ""
echo "⏱️  La indexación puede tomar de 1-7 días"
