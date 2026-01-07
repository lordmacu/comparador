#!/bin/bash
# setup-blog-automation.sh - Configurar generación automática de posts en servidor
# Ejecutar SOLO en el servidor EC2

set -e

echo "🤖 Configurando generación automática de posts..."
echo ""

# Verificar que estamos en el directorio correcto
if [ ! -f "scripts/generate-blog-post.mjs" ]; then
  echo "❌ Error: No se encuentra scripts/generate-blog-post.mjs"
  echo "   Ejecuta este script desde /home/ubuntu/apps/internet-colombia"
  exit 1
fi

# Verificar que existe la API key
if [ -z "$GOOGLE_AI_API_KEY" ]; then
  echo "⚠️  GOOGLE_AI_API_KEY no está configurada"
  echo ""
  read -p "Ingresa tu Google AI API Key: " api_key
  
  # Agregar al .bashrc para persistencia
  echo "" >> ~/.bashrc
  echo "# Google AI API Key para blog generator" >> ~/.bashrc
  echo "export GOOGLE_AI_API_KEY=\"$api_key\"" >> ~/.bashrc
  
  # Cargar en la sesión actual
  export GOOGLE_AI_API_KEY="$api_key"
  
  echo "✅ API Key configurada"
fi

# Crear archivo .env en el proyecto
echo "GOOGLE_AI_API_KEY=$GOOGLE_AI_API_KEY" > .env
chmod 600 .env
echo "✅ Archivo .env creado"

# Instalar dotenv si no está
if ! npm list dotenv > /dev/null 2>&1; then
  echo "📦 Instalando dotenv..."
  npm install dotenv
fi

# Probar el generador manualmente
echo ""
echo "🧪 Probando generador de posts..."
node scripts/generate-blog-post.mjs

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ Generador funciona correctamente"
else
  echo ""
  echo "❌ Error en el generador. Revisa la configuración."
  exit 1
fi

# Configurar cron jobs
echo ""
echo "📅 Configurando cron jobs..."

# Remover cron jobs antiguos del blog generator
crontab -l 2>/dev/null | grep -v "generate-blog-post.mjs" | crontab - || true

# Agregar nuevos cron jobs
(crontab -l 2>/dev/null; cat << CRON
# Auto-generar posts de blog - 3 veces por semana
# Lunes 9:00 AM
0 9 * * 1 cd $(pwd) && /usr/bin/node scripts/generate-blog-post.mjs >> /var/log/blog-generator.log 2>&1

# Miércoles 9:00 AM
0 9 * * 3 cd $(pwd) && /usr/bin/node scripts/generate-blog-post.mjs >> /var/log/blog-generator.log 2>&1

# Viernes 9:00 AM
0 9 * * 5 cd $(pwd) && /usr/bin/node scripts/generate-blog-post.mjs >> /var/log/blog-generator.log 2>&1
CRON
) | crontab -

echo "✅ Cron jobs configurados"

# Crear archivo de log si no existe
sudo touch /var/log/blog-generator.log
sudo chmod 666 /var/log/blog-generator.log

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ CONFIGURACIÓN COMPLETA"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📅 Posts se generarán automáticamente:"
echo "   • Lunes a las 9:00 AM"
echo "   • Miércoles a las 9:00 AM"
echo "   • Viernes a las 9:00 AM"
echo ""
echo "📋 Comandos útiles:"
echo "   Ver cron jobs:    crontab -l"
echo "   Ver logs:         tail -f /var/log/blog-generator.log"
echo "   Generar manual:   node scripts/generate-blog-post.mjs"
echo "   Editar horarios:  crontab -e"
echo ""
echo "🔧 Siguiente paso:"
echo "   Reinicia PM2: pm2 restart internet-colombia"
echo ""
