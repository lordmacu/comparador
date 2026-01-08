#!/bin/bash
# fix-nginx-ip.sh - Agregar IP al servidor Nginx
# Ejecutar este script EN EL SERVIDOR EC2

echo "🔧 Agregando IP 3.138.110.50 a la configuración de Nginx..."

# Crear configuración actualizada de Nginx con IP incluida
sudo tee /etc/nginx/sites-available/internet-colombia > /dev/null <<'EOF'
server {
    server_name comparadorinternet.co www.comparadorinternet.co 3.138.110.50;

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

    listen [::]:443 ssl ipv6only=on; # managed by Certbot
    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/comparadorinternet.co/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/comparadorinternet.co/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

server {
    listen 80;
    listen [::]:80;
    server_name comparadorinternet.co www.comparadorinternet.co 3.138.110.50;

    # Redirigir solo los dominios a HTTPS, permitir HTTP para la IP
    if ($host != 3.138.110.50) {
        return 301 https://$host$request_uri;
    }

    # Para la IP, hacer proxy directamente
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
    echo "✅ Nginx actualizado exitosamente!"
    echo ""
    echo "🌐 Tu sitio está disponible en:"
    echo "   • https://comparadorinternet.co"
    echo "   • https://www.comparadorinternet.co"
    echo "   • http://3.138.110.50"
    echo ""
else
    echo "❌ Error en la configuración de Nginx"
    exit 1
fi
