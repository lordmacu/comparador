#!/bin/bash
# fix-server-conflict.sh - Ejecutar esto EN EL SERVIDOR para resolver conflictos

echo "🧹 Limpiando archivos conflictivos en el servidor..."

# Remover archivos .next que causan conflicto
echo "Removiendo .next local del servidor..."
rm -rf .next

# Descartar cambios locales en package-lock.json
echo "Descartando cambios locales..."
git checkout -- package-lock.json 2>/dev/null || true

# Ahora hacer pull
echo "🔄 Pulling latest changes..."
git pull origin main

if [ $? -eq 0 ]; then
  echo "✅ Pull exitoso"
  
  # Instalar dependencias
  echo "📦 Installing dependencies..."
  npm install --production
  
  # Reiniciar PM2
  echo "🔄 Restarting PM2..."
  pm2 restart internet-colombia || pm2 start npm --name "internet-colombia" -- start
  pm2 save
  
  echo "✅ Servidor actualizado correctamente"
else
  echo "❌ Aún hay conflictos. Ejecuta manualmente:"
  echo "   git reset --hard origin/main"
fi
