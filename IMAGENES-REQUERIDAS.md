# 📸 IMAGENES REQUERIDAS - Guía Completa

## 🚨 CRÍTICO - Debe hacerse ANTES del lanzamiento

### 1. Open Graph Image (MÁXIMA PRIORIDAD)

**Ubicación**: `/public/og-image.jpg`
**Ruta completa**: `/Users/cristian/internet/public/og-image.jpg`

**Especificaciones**:
- Dimensiones: **1200x630 píxeles** (proporción 1.91:1)
- Formato: JPG o PNG
- Tamaño: Máximo 8MB (recomendado < 300KB)
- Compresión: 85% calidad

**Contenido sugerido**:
```
┌─────────────────────────────────────────┐
│                                         │
│  [Ícono de Globe/WiFi grande]          │
│                                         │
│    COMPARADOR INTERNET                  │
│         COLOMBIA 2025                   │
│                                         │
│   Claro • Movistar • ETB                │
│                                         │
│  comparadorinternet.co                  │
│                                         │
└─────────────────────────────────────────┘
```

**Paleta de colores**:
- Fondo: Gradiente #2563eb → #1e40af (azul)
- Texto: Blanco (#FFFFFF)
- Acentos: #10b981 (verde) opcional

**Herramientas para crear**:
1. **Canva** (Más fácil):
   - Ir a canva.com
   - "Facebook Post" template (1200x630)
   - Usar texto grande y bold
   - Exportar como JPG

2. **Figma** (Profesional):
   - Frame: 1200x630px
   - Usar Inter Bold/Black
   - Exportar como JPG

3. **Photoshop/GIMP**:
   - Nuevo documento: 1200x630px, 72 DPI
   - Exportar para web

**Validar antes de subir**:
- [Facebook Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [OpenGraph.xyz](https://www.opengraph.xyz/)

---

### 2. Logos de Proveedores

**Ubicación**: `/public/images/`
**Ruta completa**: `/Users/cristian/internet/public/images/`

#### A. Logo Claro
**Archivo**: `claro-logo.png`

**Especificaciones**:
- Dimensiones: 200x200px (cuadrado)
- Formato: PNG con **fondo transparente**
- Color principal: #EF0107 (rojo Claro)

**Donde conseguirlo**:
1. Ir a https://www.claro.com.co/
2. Inspeccionar elemento en el logo
3. Copiar URL de la imagen
4. Descargar y redimensionar a 200x200px
5. Asegurar fondo transparente

#### B. Logo Movistar
**Archivo**: `movistar-logo.png`

**Especificaciones**:
- Dimensiones: 200x200px (cuadrado)
- Formato: PNG con **fondo transparente**
- Color principal: #5CB615 (verde Movistar)

**Donde conseguirlo**:
1. Ir a https://www.movistar.co/
2. Mismo proceso que Claro

#### C. Logo ETB
**Archivo**: `etb-logo.png`

**Especificaciones**:
- Dimensiones: 200x200px (cuadrado)
- Formato: PNG con **fondo transparente**
- Color principal: #FF6B00 (naranja ETB)

**Donde conseguirlo**:
1. Ir a https://www.etb.com.co/
2. Mismo proceso

**Herramienta para redimensionar**:
- Online: [Squoosh.app](https://squoosh.app/)
- Desktop: Preview (Mac), Paint (Windows)
- CLI: `convert logo.png -resize 200x200 logo-200.png` (ImageMagick)

---

### 3. Favicon e Iconos PWA

**Ubicación**: `/public/`
**Ruta completa**: `/Users/cristian/internet/public/`

#### A. Favicon
**Archivo**: `favicon.ico`

**Especificaciones**:
- Dimensiones: 32x32px (multi-size ICO preferible)
- Formato: .ico
- Contenido: Letra "C" o ícono de WiFi simplificado

**Generador automático**:
1. Ir a [favicon.io/favicon-generator](https://favicon.io/favicon-generator/)
2. Texto: "C" o usar ícono
3. Fondo: #2563eb (azul)
4. Fuente: Inter Bold
5. Descargar y extraer `favicon.ico`

#### B. Ícono PWA Principal
**Archivo**: `icon.png`

**Especificaciones**:
- Dimensiones: 512x512px
- Formato: PNG con **fondo NO transparente**
- Fondo: #2563eb (azul) o blanco
- Contenido: Logo/Letra "C" centrado

**Next.js lo usa automáticamente para**:
- Marcadores del navegador
- PWA manifest
- Tiles de Windows
- Android home screen

#### C. Ícono Apple
**Archivo**: `apple-icon.png`

**Especificaciones**:
- Dimensiones: 180x180px
- Formato: PNG
- **Sin bordes redondeados** (iOS los agrega)
- Fondo: NO transparente

**Usado para**:
- iOS "Agregar a pantalla de inicio"
- Safari bookmark icon
- iPad tiles

---

## 📋 CHECKLIST DE VERIFICACIÓN

Después de agregar todas las imágenes, verifica:

```bash
# En la terminal, desde /Users/cristian/internet/

# Verificar que todos los archivos existen
ls -lh public/og-image.jpg
ls -lh public/favicon.ico
ls -lh public/icon.png
ls -lh public/apple-icon.png
ls -lh public/images/claro-logo.png
ls -lh public/images/movistar-logo.png
ls -lh public/images/etb-logo.png
```

**Todos los archivos deben existir y tener tamaños razonables:**
- og-image.jpg: ~100-300KB
- Logos: ~10-50KB cada uno
- favicon.ico: ~5-15KB
- icon.png: ~20-100KB
- apple-icon.png: ~15-80KB

---

## 🚀 DESPUÉS DE AGREGAR IMÁGENES

### 1. Optimizar Imágenes

```bash
# Si tienes ImageMagick instalado
find public -name "*.png" -exec convert {} -strip -quality 85 {} \;
find public -name "*.jpg" -exec convert {} -strip -quality 85 {} \;
```

O usar herramientas online:
- [TinyPNG](https://tinypng.com/) - Compresión inteligente
- [Squoosh](https://squoosh.app/) - Control manual

### 2. Verificar en Local

```bash
npm run dev
```

Visita:
- http://localhost:3000 - Verificar favicon en pestaña
- Inspeccionar HTML - Ver meta tags con og:image

### 3. Validar Meta Tags

Antes de deploy, verifica que las imágenes se vean correctamente:

**Facebook/WhatsApp**:
```
https://developers.facebook.com/tools/debug/
URL: https://comparadorinternet.co
```

**Twitter**:
```
https://cards-dev.twitter.com/validator
URL: https://comparadorinternet.co
```

**LinkedIn**:
```
https://www.linkedin.com/post-inspector/
URL: https://comparadorinternet.co
```

### 4. Hacer Deploy

```bash
# Build local
npm run build

# Deploy
./deploy.sh "Agregar todas las imágenes de marca y SEO"

# En el servidor
ssh -i ~/Downloads/internet-colombia-key.pem ubuntu@3.138.110.50
cd /home/ubuntu/apps/internet-colombia
./update.sh
```

---

## 🎨 PLANTILLAS Y RECURSOS

### Plantilla Canva para OG Image

1. Ir a: https://www.canva.com/
2. Crear diseño → Dimensiones personalizadas → 1200x630px
3. Usar esta estructura:

```
Fondo: Gradiente azul (#2563eb a #1e40af)

Texto 1 (arriba, grande):
  COMPARADOR INTERNET
  COLOMBIA 2025

  Font: Inter Black
  Size: 80px
  Color: Blanco
  Align: Center

Texto 2 (medio):
  Claro • Movistar • ETB

  Font: Inter Bold
  Size: 48px
  Color: Blanco con 80% opacidad
  Align: Center

Texto 3 (abajo, pequeño):
  comparadorinternet.co

  Font: Inter Regular
  Size: 36px
  Color: Blanco con 60% opacidad
  Align: Center

Ícono (opcional):
  Globe o WiFi icon
  Size: 120px
  Color: Blanco
  Position: Top center o como decoración
```

### Bancos de Íconos Gratuitos

Para favicon/icon.png:
- [Lucide Icons](https://lucide.dev/) - Mismo que usas en el código
- [Heroicons](https://heroicons.com/)
- [Feather Icons](https://feathericons.com/)

Buscar: "globe", "wifi", "signal", "network"

---

## ❓ PREGUNTAS FRECUENTES

**P: ¿Puedo usar JPG en lugar de PNG para los logos?**
R: No recomendado. PNG permite fondo transparente que se ve mejor en diferentes contextos.

**P: ¿Necesito crear todas las variantes de favicon (16x16, 32x32, etc)?**
R: No, con favicon.ico de 32x32 es suficiente. Next.js maneja el resto automáticamente.

**P: ¿Qué pasa si no tengo Photoshop?**
R: Usa Canva (gratis, online) o GIMP (gratis, desktop).

**P: ¿Los logos de las marcas tienen copyright?**
R: Sí, pero usar logos para comparación/referencia suele estar permitido (fair use). Asegúrate de no modificarlos ni usarlos de forma que implique endoso.

**P: ¿Puedo cambiar las imágenes después del deploy?**
R: Sí, solo reemplaza el archivo y haz rebuild. Las URLs se mantienen.

---

## 📞 NECESITAS AYUDA?

Si tienes problemas creando las imágenes:

1. **Canva no funciona**: Prueba Figma (también gratis)
2. **No encuentras los logos**: Busca "claro logo png" en Google Images, filtrar por licencia
3. **Las imágenes son muy pesadas**: Usa TinyPNG para comprimir
4. **OG image no se muestra**: Limpia caché en Facebook Debugger

**Siguiente paso**: Una vez tengas todas las imágenes, ejecuta el checklist y luego podemos pasar a implementar las otras mejoras SEO (manifest.json, schemas de precios, etc.)
