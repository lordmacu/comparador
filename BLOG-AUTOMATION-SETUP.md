# Configuración de Automatización de Blog

## Problema Resuelto
Las imágenes generadas automáticamente por el cron no estaban disponibles públicamente porque Next.js solo sirve archivos que existen durante el build.

## Solución Implementada

### 1. Nginx Configurado para Servir Imágenes Directamente
**Archivo:** `/etc/nginx/sites-available/internet-colombia`

```nginx
# Servir imágenes del blog directamente desde el filesystem
# Esto permite que el script automático genere imágenes sin necesidad de recompilar
location /blog-images/ {
    alias /home/ubuntu/apps/comparador/public/blog-images/;
    expires 7d;
    add_header Cache-Control "public, max-age=604800, immutable";
    access_log off;
}
```

**Ventajas:**
- ✅ Las imágenes generadas por el cron están disponibles inmediatamente
- ✅ No requiere recompilar Next.js
- ✅ Cache de 7 días en el navegador
- ✅ Cloudflare también cachea las imágenes

### 2. Permisos Configurados

**Directorios:**
```bash
sudo chmod 755 /home/ubuntu
sudo chmod 755 /home/ubuntu/apps
sudo chmod 755 /home/ubuntu/apps/comparador
sudo chmod 755 /home/ubuntu/apps/comparador/public
sudo chmod 755 /home/ubuntu/apps/comparador/public/blog-images/
```

**Archivos:**
```bash
sudo chmod 644 /home/ubuntu/apps/comparador/public/blog-images/*.webp
```

### 3. Script Actualizado
**Archivo:** `scripts/generate-blog-post.mjs`

El script ahora ajusta automáticamente los permisos después de generar cada imagen:

```javascript
// Ajustar permisos para que nginx pueda servir la imagen
try {
  await execAsync(`chmod 644 "${imagePath}"`);
  log("Permisos de imagen ajustados correctamente.", "success");
} catch (permError) {
  log(`Advertencia: No se pudieron ajustar permisos de imagen: ${permError.message}`, "error");
}
```

### 4. Crontab Configurado
```bash
# Generar posts automáticamente los viernes a las 9 AM
0 9 * * 5 cd /home/ubuntu/apps/comparador && /usr/bin/node scripts/generate-blog-post.mjs
```

## Flujo de Trabajo Actual

### Para Nuevos Posts Automáticos (Cron)
1. ⏰ **Viernes 9:00 AM** - Cron ejecuta el script
2. 🤖 **Gemini API** - Genera contenido + imagen
3. 💾 **Guardado** - Post JSON en `/content/blog/`, imagen en `/public/blog-images/`
4. 🔒 **Permisos** - Script ajusta permisos automáticamente (`chmod 644`)
5. 🌐 **Nginx** - Sirve la imagen directamente desde filesystem
6. 🔄 **PM2** - Script reinicia la app y fuerza regeneración ISR
7. ✅ **Resultado** - Post e imagen disponibles inmediatamente

### Para Cambios de Código (Manual)
1. 💻 **Local** - Modificas código y compilas (`npm run build`)
2. 📤 **Git** - Commit y push a GitHub
3. 📥 **Servidor** - Pull cambios con `./update.sh`
4. 🔄 **PM2** - Reinicia automáticamente
5. ✅ **Resultado** - Cambios en producción

## Verificación

### Comprobar que nginx sirve las imágenes:
```bash
curl -I https://comparadorinternet.co/blog-images/[nombre-imagen].webp
# Debe retornar: HTTP/2 200
```

### Ver logs del cron:
```bash
tail -f /var/log/blog-generator.log
```

### Ver configuración de nginx:
```bash
cat /etc/nginx/sites-available/internet-colombia
```

### Recargar nginx (si modificas configuración):
```bash
sudo nginx -t && sudo systemctl reload nginx
```

## URLs de Ejemplo

- **Imagen que funciona:** https://comparadorinternet.co/blog-images/planes-internet-2026-fin-redes-sociales-gratis-colombia.webp
- **Blog:** https://comparadorinternet.co/blog

## Beneficios de Esta Configuración

1. ✅ **No requiere compilar** - El cron genera posts sin necesidad de `npm run build`
2. ✅ **Imágenes instantáneas** - Nginx sirve archivos directamente del filesystem
3. ✅ **Cache optimizado** - Cloudflare + Nginx cachean las imágenes (7 días)
4. ✅ **Automático** - Permisos se ajustan automáticamente al generar
5. ✅ **Separación de concerns** - Código compilado localmente, contenido generado en servidor
6. ✅ **ISR funciona** - Next.js regenera páginas dinámicas automáticamente

## Notas Importantes

- Las imágenes en `/blog-images/` NO necesitan estar en el build de Next.js
- Nginx tiene prioridad sobre Next.js para rutas `/blog-images/*`
- Los archivos JSON de posts SÍ requieren reinicio de PM2 para aparecer
- El script limpia cache ISR y fuerza regeneración automáticamente
