#!/bin/bash
# ssl-setup.sh - Configurar SSL/HTTPS con Let's Encrypt
# Ejecutar este script EN EL SERVIDOR EC2

echo "🔐 Configurando SSL/HTTPS con Let's Encrypt..."

# 1. Instalar Certbot y el plugin de Nginx
echo "📦 Instalando Certbot..."
sudo apt update
sudo apt install -y certbot python3-certbot-nginx

# 2. Obtener certificado SSL
echo "🔑 Obteniendo certificado SSL..."
echo "⚠️  Se te pedirá un correo electrónico y aceptar términos"

# Obtener certificado para ambos dominios (con y sin www)
sudo certbot --nginx -d comparadorinternet.co -d www.comparadorinternet.co

# 3. Verificar renovación automática
echo "🔄 Configurando renovación automática..."
sudo certbot renew --dry-run

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ SSL configurado exitosamente!"
    echo ""
    echo "🌐 Tu sitio ahora está disponible en:"
    echo "   https://comparadorinternet.co"
    echo "   https://www.comparadorinternet.co"
    echo ""
    echo "📝 Certbot ha configurado automáticamente:"
    echo "   - Redirección HTTP → HTTPS"
    echo "   - Renovación automática del certificado"
    echo ""
    echo "🔄 Los certificados se renovarán automáticamente cada 90 días"
else
    echo "❌ Error en la configuración de renovación automática"
    exit 1
fi
