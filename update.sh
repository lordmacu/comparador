#!/bin/bash
# update.sh - Server-side update script for EC2
# This file should be copied to /home/ubuntu/apps/internet-colombia/ on your EC2 server

echo "🧹 Limpiando .next para evitar conflictos..."
git reset --hard HEAD
rm -rf .next

echo "🔄 Pulling latest changes from Git (with built .next)..."
git pull origin main

if [ $? -ne 0 ]; then
  echo "❌ Git pull failed. Check your repository access."
  exit 1
fi

echo "📦 Installing production dependencies..."
npm install --production

if [ $? -ne 0 ]; then
  echo "❌ npm install failed."
  exit 1
fi

echo "🔄 Restarting application with PM2..."
pm2 restart internet-colombia

if [ $? -ne 0 ]; then
  echo "⚠️  PM2 restart failed, trying to start..."
  pm2 start npm --name "internet-colombia" -- start
  pm2 save
fi

echo "🔄 Restarting application with PM2..."
pm2 restart internet-colombia

if [ $? -ne 0 ]; then
  echo "⚠️  PM2 restart failed, trying to start..."
  pm2 start npm --name "internet-colombia" -- start
  pm2 save
fi

# Configurar cron job para generación automática de posts (si no existe)
if ! crontab -l 2>/dev/null | grep -q "generate-blog-post.mjs"; then
  echo "📅 Configurando cron job para posts automáticos..."
  (crontab -l 2>/dev/null; cat << 'CRON'
# Auto-generar posts de blog - Lunes, Miércoles, Viernes a las 9 AM
0 9 * * 1 cd /home/ubuntu/apps/internet-colombia && /usr/bin/node scripts/generate-blog-post.mjs >> /var/log/blog-generator.log 2>&1
0 9 * * 3 cd /home/ubuntu/apps/internet-colombia && /usr/bin/node scripts/generate-blog-post.mjs >> /var/log/blog-generator.log 2>&1
0 9 * * 5 cd /home/ubuntu/apps/internet-colombia && /usr/bin/node scripts/generate-blog-post.mjs >> /var/log/blog-generator.log 2>&1
CRON
  ) | crontab -
  echo "✅ Cron jobs configurados para generar posts automáticamente"
fi

echo ""
echo "✅ Update complete!"
echo "📊 Application status:"
pm2 status
echo ""
echo "🌐 Your site should be running at: http://3.138.110.50"
echo ""
echo "📝 Blog posts will auto-generate:"
echo "   • Lunes 9 AM"
echo "   • Miércoles 9 AM"
echo "   • Viernes 9 AM"
echo ""
echo "📋 Check logs: tail -f /var/log/blog-generator.log"
echo ""
