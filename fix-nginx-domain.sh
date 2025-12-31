#!/bin/bash
# fix-nginx-domain.sh - Actualizar Nginx con el nombre de dominio correcto
# Ejecutar este script EN EL SERVIDOR EC2

echo "🔧 Actualizando configuración de Nginx con el dominio..."

# Crear configuración actualizada de Nginx con el dominio
sudo tee /etc/nginx/sites-available/internet-colombia > /dev/null <<'EOF'
server {
    listen 80;
    listen [::]:80;
    server_name comparadorinternet.co www.comparadorinternet.co;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

echo "✅ Configuración actualizada"

# Verificar configuración
echo "🔍 Verificando configuración de Nginx..."
sudo nginx -t

if [ $? -eq 0 ]; then
    echo "✅ Configuración válida"

    # Recargar Nginx
    echo "🔄 Recargando Nginx..."
    sudo systemctl reload nginx

    echo ""
    echo "✅ Nginx actualizado con el dominio!"
    echo ""
    echo "🔐 Ahora instalando certificado SSL..."

    # Instalar el certificado que ya se creó
    sudo certbot install --cert-name comparadorinternet.co

    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ ¡SSL instalado exitosamente!"
        echo ""
        echo "🌐 Tu sitio ahora está disponible en:"
        echo "   https://comparadorinternet.co"
        echo "   https://www.comparadorinternet.co"
        echo ""
        echo "🔒 HTTP redirige automáticamente a HTTPS"
    else
        echo "❌ Error al instalar certificado SSL"
        echo "Intenta manualmente: sudo certbot --nginx -d comparadorinternet.co -d www.comparadorinternet.co"
        exit 1
    fi
else
    echo "❌ Error en la configuración de Nginx"
    exit 1
fi
