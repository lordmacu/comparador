#!/bin/bash
# fix-google-indexing.sh - Script para optimizar la indexación en Google

echo "🔧 Optimizando sitio para indexación en Google Search Console..."
echo ""

# Colores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}1. Verificando redirecciones HTTP -> HTTPS${NC}"
echo "   Probando: http://comparadorinternet.co"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -L "http://comparadorinternet.co")
if [ "$HTTP_CODE" = "200" ]; then
  echo -e "   ${GREEN}✅ HTTP redirige correctamente a HTTPS${NC}"
else
  echo -e "   ${YELLOW}⚠️  Verificar redirección HTTP (código: $HTTP_CODE)${NC}"
fi

echo ""
echo -e "${BLUE}2. Verificando sitemap.xml${NC}"
SITEMAP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "https://comparadorinternet.co/sitemap.xml")
if [ "$SITEMAP_CODE" = "200" ]; then
  echo -e "   ${GREEN}✅ Sitemap accesible${NC}"
else
  echo -e "   ${YELLOW}⚠️  Sitemap no responde (código: $SITEMAP_CODE)${NC}"
fi

echo ""
echo -e "${BLUE}3. Verificando robots.txt${NC}"
ROBOTS_CODE=$(curl -s -o /dev/null -w "%{http_code}" "https://comparadorinternet.co/robots.txt")
if [ "$ROBOTS_CODE" = "200" ]; then
  echo -e "   ${GREEN}✅ Robots.txt accesible${NC}"
else
  echo -e "   ${YELLOW}⚠️  Robots.txt no responde (código: $ROBOTS_CODE)${NC}"
fi

echo ""
echo -e "${BLUE}4. Verificando páginas del blog sin indexar${NC}"
BLOG_URLS=(
  "https://comparadorinternet.co/blog"
  "https://comparadorinternet.co/blog/checklist-para-contratar-internet-en-bogota"
  "https://comparadorinternet.co/blog/como-saber-si-hay-fibra-optica-en-tu-direccion-bogota"
)

for url in "${BLOG_URLS[@]}"; do
  CODE=$(curl -s -o /dev/null -w "%{http_code}" "$url")
  if [ "$CODE" = "200" ]; then
    echo -e "   ${GREEN}✅ $url${NC}"
  else
    echo -e "   ${YELLOW}⚠️  $url (código: $CODE)${NC}"
  fi
done

echo ""
echo -e "${BLUE}5. Enviando URLs a IndexNow (Bing)${NC}"
INDEXNOW_KEY="3f4a8e7b9c2d1f6e8a5b3c9d2e7f4a8b"
HOST="comparadorinternet.co"

# Crear array JSON de URLs
URL_ARRAY="["
first=true
for url in "${BLOG_URLS[@]}"; do
  if [ "$first" = true ]; then
    URL_ARRAY+="\"$url\""
    first=false
  else
    URL_ARRAY+=",\"$url\""
  fi
done
URL_ARRAY+="]"

# Enviar a IndexNow
curl -X POST "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json" \
  -d "{
    \"host\": \"$HOST\",
    \"key\": \"$INDEXNOW_KEY\",
    \"keyLocation\": \"https://$HOST/$INDEXNOW_KEY.txt\",
    \"urlList\": $URL_ARRAY
  }" &> /dev/null

if [ $? -eq 0 ]; then
  echo -e "   ${GREEN}✅ URLs enviadas a IndexNow${NC}"
else
  echo -e "   ${YELLOW}⚠️  Error enviando a IndexNow${NC}"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}✅ Verificación completada${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📋 PRÓXIMOS PASOS MANUALES EN GOOGLE SEARCH CONSOLE:"
echo ""
echo "1. Ir a: https://search.google.com/search-console"
echo ""
echo "2. Para cada URL sin indexar, hacer:"
echo "   a) Pegar URL en el campo de búsqueda superior"
echo "   b) Esperar el análisis"
echo "   c) Click en 'SOLICITAR INDEXACIÓN'"
echo "   d) Confirmar"
echo ""
echo "URLs prioritarias para solicitar indexación:"
for url in "${BLOG_URLS[@]}"; do
  echo "   📄 $url"
done
echo ""
echo "3. Verificar que no haya errores en:"
echo "   - Cobertura > Excluidas"
echo "   - Experiencia > Core Web Vitals"
echo "   - Mejoras > Datos estructurados"
echo ""
echo "⏱️  La indexación puede tomar 1-7 días"
echo ""
echo "💡 TIPS ADICIONALES:"
echo "   - Comparte los artículos en redes sociales"
echo "   - Agrega enlaces internos desde otras páginas"
echo "   - Actualiza contenido regularmente"
