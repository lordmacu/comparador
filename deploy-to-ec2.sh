#!/bin/bash
# deploy-to-ec2.sh

# Configuración
SERVER_USER="ubuntu"
SERVER_IP="3.138.110.50"  # Cambia esto
SERVER_PATH="/home/ubuntu/apps/internet-colombia"
KEY_PATH="$HOME/Downloads/internet-colombia-key.pem"  # Ajusta la ruta

echo "🏗️  Building project..."
npm run build

echo "📤 Deploying to EC2..."

# Subir archivos compilados
rsync -avz --delete -e "ssh -i $KEY_PATH" \
  .next/ \
  ${SERVER_USER}@${SERVER_IP}:${SERVER_PATH}/.next/

rsync -avz --delete -e "ssh -i $KEY_PATH" \
  public/ \
  ${SERVER_USER}@${SERVER_IP}:${SERVER_PATH}/public/

# Subir configuraciones si cambiaron
rsync -avz -e "ssh -i $KEY_PATH" \
  package.json package-lock.json next.config.ts \
  ${SERVER_USER}@${SERVER_IP}:${SERVER_PATH}/

echo "🔄 Restarting application..."
ssh -i $KEY_PATH ${SERVER_USER}@${SERVER_IP} << 'EOF'
  cd /home/ubuntu/apps/internet-colombia
  npm install --production
  pm2 restart internet-colombia || pm2 start npm --name "internet-colombia" -- start
  pm2 save
EOF

echo "✅ Deployment complete!"
echo "🌐 Visit: http://$SERVER_IP"
