#!/bin/bash
# update.sh - Server-side update script for EC2

# Load environment variables
if [ -f ~/.bashrc ]; then
  source ~/.bashrc
fi

echo "🧹 Descartando cambios locales..."
git reset --hard HEAD

echo "🔄 Pulling latest changes from Git (with built .next)..."
git pull origin main

if [ $? -ne 0 ]; then
  echo "❌ Git pull failed. Check your repository access."
  exit 1
fi

# Verificar que .next existe después del pull
if [ ! -d ".next" ]; then
  echo "⚠️  .next directory not found after pull. Building locally..."
  npm run build
  if [ $? -ne 0 ]; then
    echo "❌ Build failed."
    exit 1
  fi
fi

echo "📦 Installing production dependencies..."
npm install --production

if [ $? -ne 0 ]; then
  echo "❌ npm install failed."
  exit 1
fi

echo "� Reinstalling Sharp for Linux..."
rm -rf node_modules/sharp
npm install --os=linux --cpu=x64 sharp

if [ $? -ne 0 ]; then
  echo "⚠️  Sharp installation failed, but continuing..."
fi

echo "�🔄 Restarting application with PM2..."
pm2 restart nextjs-app

if [ $? -ne 0 ]; then
  echo "⚠️  PM2 restart failed, trying to start..."
  pm2 start npm --name "nextjs-app" -- start
  pm2 save
fi
# Purge Cloudflare cache
if [ -n "$CLOUDFLARE_ZONE_ID" ] && [ -n "$CLOUDFLARE_API_TOKEN" ]; then
  echo "🔄 Purging Cloudflare cache..."
  
  PURGE_RESPONSE=$(curl -s -X POST "https://api.cloudflare.com/client/v4/zones/$CLOUDFLARE_ZONE_ID/purge_cache" \
       -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
       -H "Content-Type: application/json" \
       --data '{"purge_everything":true}')
  
  if echo "$PURGE_RESPONSE" | grep -q '"success":[[:space:]]*true'; then
    echo "✅ Cloudflare cache purged successfully"
  else
    echo "⚠️  Failed to purge Cloudflare cache"
    echo "Response: $PURGE_RESPONSE"
  fi
else
  echo "⚠️  Cloudflare credentials not set. Skipping cache purge."
  echo "Set CLOUDFLARE_ZONE_ID and CLOUDFLARE_API_TOKEN in ~/.bashrc"
fi
# Configurar cron job para generación automática de posts (si no existe)
if ! crontab -l 2>/dev/null | grep -q "generate-blog-post.mjs"; then
  echo "📅 Configurando cron job para posts automáticos..."
  CURRENT_DIR=$(pwd)
  (crontab -l 2>/dev/null; cat << CRON
# Auto-generar posts de blog - Lunes, Miércoles, Viernes a las 9 AM
0 9 * * 1 cd $CURRENT_DIR && /usr/bin/node scripts/generate-blog-post.mjs >> /var/log/blog-generator.log 2>&1
0 9 * * 3 cd $CURRENT_DIR && /usr/bin/node scripts/generate-blog-post.mjs >> /var/log/blog-generator.log 2>&1
0 9 * * 5 cd $CURRENT_DIR && /usr/bin/node scripts/generate-blog-post.mjs >> /var/log/blog-generator.log 2>&1
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
