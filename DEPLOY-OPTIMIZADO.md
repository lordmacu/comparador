# Configuración de Deploy Optimizado

## Script de Deploy Automatizado

El script `deploy-optimized.sh` automatiza todo el proceso de deploy incluyendo:

✅ Build local  
✅ Commit y push a Git  
✅ Deploy automático al servidor  
✅ Restart de PM2  
✅ Health check del sitio  
✅ Purge automático de cache de Cloudflare  

## Configuración de Cloudflare API

Para habilitar el purge automático de cache, necesitas:

### 1. Obtener tu Zone ID

1. Ve a: https://dash.cloudflare.com
2. Selecciona tu dominio: **comparadorinternet.co**
3. En el panel derecho, busca **Zone ID** (es un hash como: `abc123def456...`)
4. Cópialo

### 2. Crear API Token

1. Ve a: https://dash.cloudflare.com/profile/api-tokens
2. Click en **Create Token**
3. Usa el template **Edit zone DNS** o crea uno personalizado con:
   - **Zone.Cache Purge** - Purge
   - **Zone.Zone** - Read
4. En **Zone Resources**, selecciona:
   - Include → Specific zone → **comparadorinternet.co**
5. Click en **Continue to summary** → **Create Token**
6. **¡COPIA EL TOKEN AHORA!** (solo se muestra una vez)

### 3. Configurar Variables de Entorno

En tu Mac, agrega estas líneas a tu `~/.zshrc`:

```bash
# Cloudflare API Configuration
export CLOUDFLARE_ZONE_ID="tu-zone-id-aqui"
export CLOUDFLARE_API_TOKEN="tu-api-token-aqui"
```

Luego recarga:
```bash
source ~/.zshrc
```

### 4. Verificar Configuración

```bash
echo $CLOUDFLARE_ZONE_ID
echo $CLOUDFLARE_API_TOKEN
```

Ambos deberían mostrar valores.

## Uso del Script

### Deploy normal (con purge automático de Cloudflare):
```bash
./deploy-optimized.sh "Mensaje de commit"
```

### Deploy sin configuración de Cloudflare:
El script funcionará igual, pero tendrás que purgar manualmente el cache de Cloudflare en:
https://dash.cloudflare.com → Tu dominio → Caching → Purge Everything

## Qué hace el script paso a paso

1. **Build Local**: Compila el proyecto y verifica errores
2. **Git**: Commit y push de cambios
3. **SSH Deploy**: 
   - Pull en el servidor
   - Instala dependencias
   - Restart de PM2
4. **Health Check**: Verifica que el sitio responda HTTP 200
5. **Cloudflare Purge**: Limpia todo el cache automáticamente
6. **Resumen**: Muestra enlaces útiles y status

## Rollback en caso de error

Si algo falla después del deploy:

```bash
# SSH al servidor
ssh -i '/Users/cristian/Downloads/comparador.pem' ubuntu@3.138.110.50

# Ver logs
pm2 logs nextjs-app --lines 50

# Rollback Git (volver a commit anterior)
cd ~/apps/comparador
git log --oneline -5
git reset --hard <commit-id-anterior>
pm2 restart nextjs-app

# Purgar Cloudflare manualmente
# https://dash.cloudflare.com
```

## Scripts Disponibles

- `deploy.sh` - Script original (sin purge automático)
- `deploy-optimized.sh` - Script mejorado con purge y health checks ⭐
- `deploy-with-automation.sh` - Otro script de deploy
- `update.sh` - Script para correr en el servidor

**Recomendación**: Usa `deploy-optimized.sh` para todos tus deploys futuros.

## Beneficios

- ⚡ Deploy en ~2 minutos (vs 5-10 minutos manual)
- 🔄 Cache siempre actualizado (sin chunks 404)
- ✅ Verificación automática de salud
- 🛡️ Detección temprana de errores
- 📊 Logs automáticos si algo falla

## Troubleshooting

### Error: "Push failed"
- Verifica tu conexión a Internet
- Asegúrate de que no haya conflictos: `git pull origin main`

### Error: "Site returned HTTP 500"
- El script te mostrará el comando para ver logs
- Revisa errores en PM2: `pm2 logs nextjs-app`

### Error: "Failed to purge Cloudflare cache"
- Verifica que las variables de entorno estén configuradas
- Purga manualmente en el dashboard
- Revisa que el API token tenga los permisos correctos
