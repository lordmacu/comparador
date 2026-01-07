#!/bin/bash
# deploy-with-automation.sh - Deploy completo incluyendo configuración de posts automáticos

# Configuración
SERVER_USER="ubuntu"
SERVER_IP="3.138.110.50"
SERVER_PATH="/home/ubuntu/apps/internet-colombia"
KEY_PATH="$HOME/Downloads/internet-colombia-key.pem"

# Verificar mensaje de commit
if [ -z "$1" ]; then
  echo "❌ Error: Debes proporcionar un mensaje de commit"
  echo "Uso: ./deploy-with-automation.sh \"tu mensaje de commit\""
  exit 1
fi

COMMIT_MSG="$1"

echo "🏗️  Building project locally..."
npm run build

if [ $? -ne 0 ]; then
  echo "❌ Build failed. Fix errors and try again."
  exit 1
fi

echo "✅ Build successful!"
echo ""
echo "📦 Adding files to Git..."
git add .

echo "💾 Committing changes..."
git commit -m "$COMMIT_MSG"

if [ $? -ne 0 ]; then
  echo "⚠️  No changes to commit or commit failed"
  # Continuar de todas formas si no hay cambios
fi

echo "📤 Pushing to remote repository..."
git push origin main

if [ $? -ne 0 ]; then
  echo "❌ Push failed. Check your Git configuration."
  exit 1
fi

echo ""
echo "📤 Deploying to EC2 server..."
echo ""

# Subir archivos al servidor
ssh -i $KEY_PATH ${SERVER_USER}@${SERVER_IP} << 'EOF'
  cd /home/ubuntu/apps/internet-colombia
  
  echo "🔄 Pulling latest changes..."
  git pull origin main
  
  echo "📦 Installing dependencies..."
  npm install --production
  
  echo "🏗️  Building on server..."
  npm run build
  
  echo "🔄 Restarting PM2..."
  pm2 restart internet-colombia || pm2 start npm --name "internet-colombia" -- start
  pm2 save
  
  echo ""
  echo "✅ Deployment complete!"
  pm2 status
EOF

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ DEPLOYMENT SUCCESSFUL"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🌐 Site: http://3.138.110.50"
echo ""
echo "🤖 Para configurar posts automáticos (solo primera vez):"
echo "   ssh -i $KEY_PATH ${SERVER_USER}@${SERVER_IP}"
echo "   cd $SERVER_PATH"
echo "   ./setup-blog-automation.sh"
echo ""
