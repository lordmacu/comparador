# Imágenes Requeridas para el Proyecto

## 📁 Estructura de Archivos

Coloca las siguientes imágenes en esta carpeta (`/public/images/`):

### 1. **Logos de Proveedores** (Alta Prioridad)

#### `claro-logo.png`
- **Dimensiones**: 200x200px (cuadrado)
- **Formato**: PNG con fondo transparente
- **Contenido**: Logo oficial de Claro
- **Donde conseguirlo**: [https://www.claro.com.co/](https://www.claro.com.co/) - botón derecho en el logo → "Guardar imagen como"
- **Usado en**: Schemas, cards de beneficios

#### `movistar-logo.png`
- **Dimensiones**: 200x200px (cuadrado)
- **Formato**: PNG con fondo transparente
- **Contenido**: Logo oficial de Movistar
- **Donde conseguirlo**: [https://www.movistar.co/](https://www.movistar.co/)
- **Usado en**: Schemas, cards de beneficios

#### `etb-logo.png`
- **Dimensiones**: 200x200px (cuadrado)
- **Formato**: PNG con fondo transparente
- **Contenido**: Logo oficial de ETB
- **Donde conseguirlo**: [https://www.etb.com.co/](https://www.etb.com.co/)
- **Usado en**: Schemas, cards de beneficios

---

## 📁 Archivos en `/public/` (raíz)

Coloca estos archivos directamente en `/public/`:

### 2. **Open Graph Image** (CRÍTICO)

#### `/public/og-image.jpg`
- **Dimensiones**: 1200x630px (proporción 1.91:1)
- **Formato**: JPG o PNG
- **Tamaño máximo**: 8MB (recomendado < 300KB)
- **Contenido sugerido**:
  ```
  Fondo: Gradiente azul/morado
  Texto principal: "Comparador Internet Colombia"
  Subtexto: "Claro • Movistar • ETB"
  Logo/ícono: Globe o WiFi
  ```
- **Herramientas para crear**:
  - [Canva](https://www.canva.com/) - Plantilla "Facebook Post"
  - [Figma](https://www.figma.com/) - 1200x630px canvas
  - Photoshop/GIMP
- **Preview**: Prueba en [Meta Debugger](https://developers.facebook.com/tools/debug/)

### 3. **Favicon e Iconos** (IMPORTANTE)

#### `/public/favicon.ico`
- **Dimensiones**: 32x32px (o multi-size ICO)
- **Formato**: .ico
- **Contenido**: Logo simplificado o letra "I" de Internet
- **Generador**: [favicon.io](https://favicon.io/)

#### `/public/icon.png`
- **Dimensiones**: 512x512px
- **Formato**: PNG con fondo transparente
- **Usado para**: PWA, marcadores de navegador
- **Next.js automáticamente lo usa para iconos**

#### `/public/apple-icon.png`
- **Dimensiones**: 180x180px
- **Formato**: PNG
- **Usado para**: iOS cuando agregan a pantalla de inicio

---

## 🎨 Especificaciones de Diseño

### Paleta de Colores del Sitio:
- **Claro**: `#EF0107` (rojo)
- **Movistar**: `#5CB615` (verde)
- **ETB**: `#FF6B00` (naranja)
- **Primario**: `#2563eb` (azul)
- **Fondo**: `#F9FAFB` (gris claro)

### Tipografía:
- **Fuente**: Inter (Google Fonts)
- **Pesos**: 400 (regular), 600 (semibold), 700 (bold), 900 (black)

---

## 📝 Ejemplo de OG Image (Texto para Canva/Figma)

```
[Fondo gradiente: #2563eb → #1e40af]

Título (grande, bold):
  "Compara Internet en Colombia"

Subtítulo (mediano):
  "Claro • Movistar • ETB"

Ícono:
  Globe/WiFi (blanco, grande)

Footer pequeño:
  "comparadorinternet.co"
```

---

## ✅ Checklist de Archivos

- [ ] `/public/images/claro-logo.png` (200x200px)
- [ ] `/public/images/movistar-logo.png` (200x200px)
- [ ] `/public/images/etb-logo.png` (200x200px)
- [ ] `/public/og-image.jpg` (1200x630px)
- [ ] `/public/favicon.ico` (32x32px)
- [ ] `/public/icon.png` (512x512px)
- [ ] `/public/apple-icon.png` (180x180px)

---

## 🚀 Después de Agregar las Imágenes

1. Verifica que las imágenes se carguen:
   ```bash
   ls -lh public/images/
   ls -lh public/*.{ico,png,jpg}
   ```

2. Prueba las previews sociales:
   - Facebook: https://developers.facebook.com/tools/debug/
   - Twitter: https://cards-dev.twitter.com/validator
   - LinkedIn: https://www.linkedin.com/post-inspector/

3. Haz build y deploy:
   ```bash
   npm run build
   ./deploy.sh "Agregar imágenes de marca y OG"
   ```

---

## 📚 Recursos Útiles

- **Descargar logos oficiales**: Sitios web de cada proveedor
- **Crear OG image**: [Canva](https://www.canva.com/)
- **Generar favicon**: [favicon.io](https://favicon.io/)
- **Optimizar imágenes**: [TinyPNG](https://tinypng.com/)
- **Validar OG**: [OpenGraph.xyz](https://www.opengraph.xyz/)
