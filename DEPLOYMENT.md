# Guía de Despliegue - Internet Colombia

## Estrategia de Despliegue

Este proyecto utiliza un flujo de despliegue basado en Git:
1. **Build local** - Compilas el proyecto en tu máquina (no consume recursos del servidor)
2. **Push a Git** - Subes el código compilado (carpeta `.next`) al repositorio
3. **Pull en servidor** - Actualizas el servidor EC2 con el código compilado

## Configuración Inicial del Servidor EC2

### 1. Conectar al servidor
```bash
ssh -i ~/Downloads/internet-colombia-key.pem ubuntu@3.138.110.50
```

### 2. Instalar dependencias del sistema
```bash
# Actualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Instalar PM2 globalmente
sudo npm install -g pm2

# Instalar Git
sudo apt install -y git
```

### 3. Configurar Git en el servidor
```bash
# Configurar usuario Git
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"

# Si el repositorio es privado, configurar SSH key o token
```

### 4. Clonar el repositorio
```bash
# Crear directorio de aplicaciones
mkdir -p /home/ubuntu/apps
cd /home/ubuntu/apps

# Clonar repositorio (ajusta la URL)
git clone https://github.com/tu-usuario/internet-colombia.git
cd internet-colombia

# Copiar script de actualización y hacerlo ejecutable
chmod +x update.sh
```

### 5. Instalar dependencias y iniciar
```bash
# Instalar solo dependencias de producción
npm install --production

# Iniciar aplicación con PM2
pm2 start npm --name "internet-colombia" -- start
pm2 save
pm2 startup
```

### 6. Configurar Nginx (opcional pero recomendado)
```bash
sudo apt install -y nginx

# Crear configuración
sudo nano /etc/nginx/sites-available/internet-colombia
```

Contenido del archivo:
```nginx
server {
    listen 80;
    server_name 3.138.110.50;  # Cambia por tu dominio cuando lo tengas

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Habilitar sitio
sudo ln -s /etc/nginx/sites-available/internet-colombia /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## Flujo de Trabajo Diario

### Desde tu máquina local

Cada vez que hagas cambios y quieras desplegar:

```bash
# Hacer tus cambios en el código...

# Desplegar (esto hace build, commit y push automáticamente)
./deploy.sh "Descripción de tus cambios"
```

El script `deploy.sh` hace:
1. `npm run build` - Compila el proyecto localmente
2. `git add .` - Agrega todos los cambios (incluyendo `.next/`)
3. `git commit -m "tu mensaje"` - Hace commit
4. `git push origin main` - Sube al repositorio

### En el servidor EC2

Cuando el push esté completo, conéctate al servidor y actualiza:

```bash
# Conectar
ssh -i ~/Downloads/internet-colombia-key.pem ubuntu@3.138.110.50

# Ir al directorio del proyecto
cd /home/ubuntu/apps/internet-colombia

# Ejecutar script de actualización
./update.sh
```

El script `update.sh` hace:
1. `git pull origin main` - Descarga últimos cambios
2. `npm install --production` - Actualiza dependencias si es necesario
3. `pm2 restart internet-colombia` - Reinicia la aplicación

## Comandos Útiles en el Servidor

```bash
# Ver status de la aplicación
pm2 status

# Ver logs en tiempo real
pm2 logs internet-colombia

# Ver logs de errores
pm2 logs internet-colombia --err

# Reiniciar aplicación manualmente
pm2 restart internet-colombia

# Detener aplicación
pm2 stop internet-colombia

# Ver uso de recursos
pm2 monit
```

## Notas Importantes

- **La carpeta `.next/` está incluida en el repositorio** - Modificamos `.gitignore` para permitir esto
- **No se hace build en el servidor** - Esto ahorra recursos en tu instancia EC2
- **Siempre usa el script `deploy.sh`** - No hagas commits manuales para mantener consistencia
- **El script requiere mensaje de commit** - No funcionará sin uno

## Solución de Problemas

### Error: "Build failed"
- Verifica que no haya errores de TypeScript o ESLint
- Ejecuta `npm run build` manualmente para ver el error completo

### Error: "Git push failed"
- Verifica tu conexión a Internet
- Asegúrate de tener permisos en el repositorio
- Comprueba que estás en la rama correcta

### Error: "PM2 restart failed"
- Conéctate al servidor y revisa los logs: `pm2 logs internet-colombia`
- Verifica que el puerto 3000 esté libre
- Intenta iniciar manualmente: `pm2 start npm --name "internet-colombia" -- start`

### La aplicación no se ve actualizada
- Limpia caché del navegador (Ctrl + Shift + R)
- Verifica que PM2 se reinició correctamente: `pm2 status`
- Revisa los logs: `pm2 logs internet-colombia`

## Seguridad

- **Nunca subas al repositorio:**
  - `.env` con variables de entorno sensibles
  - Archivos con claves privadas
  - Credenciales de base de datos

- **Mantén actualizado el servidor:**
  ```bash
  sudo apt update && sudo apt upgrade -y
  ```

- **Configura SSL/HTTPS cuando tengas dominio:**
  ```bash
  sudo apt install certbot python3-certbot-nginx
  sudo certbot --nginx -d tudominio.com
  ```
