# 🎯 Configuración de Google Analytics 4 - Guía Paso a Paso

## 📋 Crear Cuenta de Google Analytics

### 1. Acceder a Google Analytics
- Ve a: https://analytics.google.com
- Inicia sesión con tu cuenta de Google
- Click en "Empezar a medir" o "Start measuring"

### 2. Crear Cuenta
- Nombre de la cuenta: `Comparador Internet Colombia` (o el nombre que prefieras)
- Configuración de datos:
  - ✅ Recomendaciones de Google
  - ✅ Asistencia técnica
  - ✅ Especialistas de cuentas
  - ✅ Tendencias comparativas

### 3. Crear Propiedad
- Nombre de la propiedad: `Internet Colombia`
- Zona horaria: `(GMT-05:00) America/Bogota`
- Moneda: `Peso colombiano (COP)`

### 4. Detalles del Negocio
- Sector: `Internet y Telecomunicaciones`
- Tamaño de la empresa: (selecciona el apropiado)
- Objetivos:
  - ✅ Generar clientes potenciales
  - ✅ Aumentar las ventas online
  - ✅ Examinar el comportamiento del usuario

### 5. Crear Data Stream
- Plataforma: **Web**
- URL del sitio web: `http://3.138.110.50` o tu dominio personalizado
- Nombre del stream: `Web - Internet Colombia`
- ✅ Activar "Enhanced measurement" (medición mejorada)

### 6. Copiar el Measurement ID
Después de crear el stream, verás:

```
Measurement ID
G-XXXXXXXXXX
```

**¡Este es el ID que necesitas!** 🎉

---

## 🚀 Configurar en el Servidor

Una vez que tengas tu `G-XXXXXXXXXX`:

```bash
# 1. Conectar al servidor
ssh -i ~/Downloads/comparador.pem ubuntu@3.138.110.50

# 2. Navegar a la aplicación
cd /home/ubuntu/apps/comparador

# 3. Editar configuración
nano .env.local
```

### Agregar en .env.local:

```env
# Google Analytics 4
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Google Tag Manager (ya configurado)
NEXT_PUBLIC_GTM_ID=GTM-PVKVH9Q7

# Facebook Pixel (cuando lo tengas)
NEXT_PUBLIC_FB_PIXEL_ID=
```

### Guardar y reiniciar:

```bash
# Guardar en nano: Ctrl + O, Enter, Ctrl + X

# Reiniciar con las nuevas variables
pm2 restart internet-colombia --update-env

# Verificar que está corriendo
pm2 status
```

---

## ✅ Verificar que Funciona

### 1. En Google Analytics

- Ve a: **Reports → Realtime**
- Abre tu sitio en otra pestaña: `http://3.138.110.50`
- Deberías ver tu visita en tiempo real

### 2. En el Navegador

Abre tu sitio y:
- F12 → Console
- Busca mensajes de `gtag`
- Si ves errores de "Measurement ID not found", revisa la configuración

### 3. Con Google Tag Assistant

- Instala: [Tag Assistant Legacy](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk)
- Visita tu sitio
- Click en la extensión
- Deberías ver: ✅ Google Analytics (GA4)

---

## 📊 Configurar Eventos como Conversiones

Una vez que todo funcione:

1. **Admin → Events**
2. Busca estos eventos (aparecerán después de que se disparen):
   - `form_submit`
   - `whatsapp_click`
   - `phone_click`
3. Click en cada uno → **Mark as conversion**

---

## 🎯 KPIs Principales a Monitorear

### Diarios
- **Visitas** (Users)
- **Páginas vistas** (Views)
- **Conversiones totales** (form_submit + whatsapp_click + phone_click)
- **Tasa de conversión**: Conversiones / Visitas × 100

### Semanales
- **Páginas más visitadas**
- **Fuentes de tráfico** (Orgánico, Directo, Referencia)
- **Dispositivos** (Desktop vs Mobile)
- **Ciudades con más visitas**

### Mensuales
- **Tendencias de conversión**
- **Embudos de conversión**:
  - Home → Provider Page → Form Submit
  - Home → Plan View → WhatsApp Click
- **ROI de SEO**: Aumento en tráfico orgánico

---

## 🔧 Troubleshooting

### "No se detecta la etiqueta"

**Posible causa 1**: .env.local no configurado
```bash
ssh -i ~/Downloads/comparador.pem ubuntu@3.138.110.50
cat /home/ubuntu/apps/comparador/.env.local
# Verificar que NEXT_PUBLIC_GA_ID existe
```

**Posible causa 2**: No se reinició con --update-env
```bash
pm2 restart internet-colombia --update-env
```

**Posible causa 3**: ID incorrecto
- Verificar formato: `G-` seguido de 10 caracteres alfanuméricos
- Ejemplo válido: `G-1A2B3C4D5E`

### Los eventos no aparecen

- Espera 24-48 horas para datos históricos
- Los eventos en **Realtime** aparecen inmediatamente
- Verifica en: Reports → Realtime → Event count by Event name

---

## 📱 Próximo Paso: Facebook Pixel

Cuando estés listo para configurar Facebook Pixel:

1. Ve a: https://business.facebook.com/events_manager
2. Crea un nuevo pixel
3. Copia el ID (15-16 dígitos)
4. Agrégalo a `.env.local`:
   ```env
   NEXT_PUBLIC_FB_PIXEL_ID=123456789012345
   ```
5. Reinicia: `pm2 restart internet-colombia --update-env`

---

## 🎉 ¡Listo!

Con Google Analytics 4 + Google Tag Manager + Facebook Pixel tendrás:

- ✅ Tracking completo de usuarios
- ✅ Medición de conversiones
- ✅ Datos para optimizar SEO
- ✅ Remarketing en Facebook/Instagram
- ✅ Informes automáticos
