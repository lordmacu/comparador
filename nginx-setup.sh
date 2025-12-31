#!/bin/bash
# nginx-setup.sh - Script para configurar Nginx en el servidor EC2
# Ejecutar  s este script EN EL SERVIDOR EC2, no en tu máquina local

echo "🔧 Configurando Nginx para Internet Colombia..."

# Crear archivo de configuración de Nginx
sudo tee /etc/nginx/sites-available/internet-colombia > /dev/null <<'EOF'
server {
    listen 80;
    listen [::]:80;
    server_name 3.138.110.50;

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

echo "✅ Archivo de configuración creado"

# Eliminar configuración por defecto
sudo rm -f /etc/nginx/sites-enabled/default

echo "✅ Configuración por defecto removida"

# Crear enlace simbólico para habilitar el sitio
sudo ln -sf /etc/nginx/sites-available/internet-colombia /etc/nginx/sites-enabled/

echo "✅ Sitio habilitado"

# Verificar configuración de Nginx
echo "🔍 Verificando configuración de Nginx..."
sudo nginx -t

if [ $? -eq 0 ]; then
    echo "✅ Configuración válida"

    # Reiniciar Nginx
    echo "🔄 Reiniciando Nginx..."
    sudo systemctl restart nginx

    echo ""
    echo "✅ Nginx configurado correctamente!"
    echo ""
    echo "🌐 Tu aplicación debería estar disponible en: http://3.138.110.50"
    echo ""
else
    echo "❌ Error en la configuración de Nginx"
    exit 1
fi
