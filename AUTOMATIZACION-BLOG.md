# 🤖 Automatización de Blog Posts

## ✅ Configuración Completada

El script de generación de blog posts ahora se ejecuta **automáticamente** 4 veces por semana:

- **Lunes** a las 9:30 AM
- **Miércoles** a las 9:30 AM  
- **Viernes** a las 9:30 AM
- **Sábado** a las 9:30 AM

## 📋 Detalles Técnicos

**Sistema:** macOS launchd  
**Servicio:** `co.cristiangarcia.blog-generator`  
**Script:** `/Users/cristian/internet/scripts/generate-blog-post-custom.mjs`

## 📊 Logs

Los logs se guardan automáticamente en:

- **Output:** `/Users/cristian/internet/logs/blog-generator.log`
- **Errores:** `/Users/cristian/internet/logs/blog-generator.error.log`

## 🛠️ Comandos Útiles

### Ver estado del servicio
```bash
launchctl list | grep blog-generator
```

### Ver logs en tiempo real
```bash
# Logs normales
tail -f ~/internet/logs/blog-generator.log

# Logs de error
tail -f ~/internet/logs/blog-generator.error.log
```

### Detener el servicio
```bash
launchctl unload ~/Library/LaunchAgents/co.cristiangarcia.blog-generator.plist
```

### Iniciar el servicio
```bash
launchctl load ~/Library/LaunchAgents/co.cristiangarcia.blog-generator.plist
```

### Reiniciar el servicio (aplicar cambios)
```bash
launchctl unload ~/Library/LaunchAgents/co.cristiangarcia.blog-generator.plist
launchctl load ~/Library/LaunchAgents/co.cristiangarcia.blog-generator.plist
```

### Probar ejecución manual
```bash
cd ~/internet
node scripts/generate-blog-post-custom.mjs
```

### Forzar ejecución ahora (sin esperar)
```bash
launchctl start co.cristiangarcia.blog-generator
```

## 🔧 Modificar Horario

Edita el archivo de configuración:
```bash
nano ~/Library/LaunchAgents/co.cristiangarcia.blog-generator.plist
```

Después de modificar, reinicia el servicio con los comandos de arriba.

## 📅 Cambiar Días de Ejecución

En el archivo `.plist`, los días se definen con `Weekday`:
- `0` = Domingo
- `1` = Lunes
- `2` = Martes
- `3` = Miércoles
- `4` = Jueves
- `5` = Viernes
- `6` = Sábado

## ⚙️ Proceso Automático Completo

Cuando se ejecuta automáticamente, el script:

1. ✅ **Investiga** temas actuales usando ChatGPT
2. ✅ **Genera** contenido de blog optimizado SEO
3. ✅ **Crea** imagen representativa
4. ✅ **Hace commit** a Git
5. ✅ **Hace push** a GitHub
6. ✅ **Deploys** al servidor EC2
7. ✅ **Abre** la página del artículo en el navegador

Todo completamente automático, sin intervención manual.

## 🚨 Solución de Problemas

### El servicio no se ejecuta

1. Verifica que el archivo `.plist` existe:
   ```bash
   ls -la ~/Library/LaunchAgents/co.cristiangarcia.blog-generator.plist
   ```

2. Revisa los logs de error:
   ```bash
   cat ~/internet/logs/blog-generator.error.log
   ```

3. Verifica que Node.js está en la ruta correcta:
   ```bash
   which node
   ```

### La API de ChatGPT no está disponible

El script espera automáticamente hasta que esté disponible. Revisa los logs para ver el progreso.

### Quiero deshabilitar temporalmente

```bash
launchctl unload ~/Library/LaunchAgents/co.cristiangarcia.blog-generator.plist
```

Para volver a habilitar:
```bash
launchctl load ~/Library/LaunchAgents/co.cristiangarcia.blog-generator.plist
```

## 📧 Notificaciones

El script envía un correo automático a `yo@cristiangarcia.co` cuando genera un nuevo post exitosamente.
