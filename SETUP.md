# 🚀 Guía de Configuración Rápida

## ✅ El proyecto ya está listo y funcional

El build fue exitoso con las siguientes páginas generadas:
- `/` - Home con comparador
- `/claro` - Landing Claro
- `/movistar` - Landing Movistar
- `/etb` - Landing ETB
- `/robots.txt` - SEO
- `/sitemap.xml` - SEO

## 📝 Pasos Obligatorios Antes de Deploy

### 1. Cambiar el Dominio

Busca y reemplaza `https://tudominio.com` en estos archivos:

```bash
# Archivos a actualizar:
- app/layout.tsx (línea 19)
- app/sitemap.ts (línea 5)
- app/robots.ts (línea 4)
- lib/schemas/index.ts (línea 25 y más)
- README.md (donde aparezca)
```

### 2. Números de WhatsApp Reales

Edita `providers-data.json` y actualiza:

```json
"whatsapp": {
  "number": "573XXXXXXXXX",  // <-- Cambiar
  "message": "Tu mensaje aquí"
}
```

Números actuales (PLACEHOLDERS):
- Claro: 573205000000
- Movistar: 573001234567
- ETB: 573057800000

### 3. Google Search Console

En `app/layout.tsx` línea ~48, agrega tu código:

```typescript
verification: {
  google: 'tu-codigo-google-search-console', // <-- Aquí
},
```

### 4. Crear Imágenes

```bash
# Crea estas imágenes en public/:
public/og-image.jpg          # 1200x630px para Open Graph
public/images/claro-logo.png
public/images/movistar-logo.png
public/images/etb-logo.png
```

## 🏃 Comandos Disponibles

```bash
# Desarrollo
npm run dev

# Build de producción
npm run build

# Iniciar servidor producción
npm start

# Linting
npm run lint
```

## 🚀 Deployment

### Vercel (Recomendado - GRATIS)

1. Push a GitHub
2. Importa el repo en [vercel.com](https://vercel.com)
3. Deploy automático

O con CLI:
```bash
npm i -g vercel
vercel
```

### Netlify

```bash
# Build command
npm run build

# Publish directory
.next
```

## 🔍 Verificar SEO

Después del deploy:

1. **Google Search Console**
   - Sube tu sitemap: `tudominio.com/sitemap.xml`
   - Verifica robots.txt: `tudominio.com/robots.txt`

2. **Prueba Schema.org**
   - [Rich Results Test](https://search.google.com/test/rich-results)
   - Prueba cada página

3. **PageSpeed Insights**
   - [PageSpeed](https://pagespeed.web.dev/)
   - Debe dar 90+ en móvil

4. **Prueba Open Graph**
   - [Facebook Debugger](https://developers.facebook.com/tools/debug/)

## ⚙️ Actualizar Planes

Edita `providers-data.json` y haz build de nuevo:

```bash
npm run build
```

Los cambios se reflejarán en todas las páginas automáticamente.

## 📊 Analytics (Opcional)

Para añadir Google Analytics, crea `app/layout.tsx`:

```typescript
// En el <head>
<Script
  src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  `}
</Script>
```

## 🐛 Troubleshooting

### Build falla
```bash
# Limpiar caché
rm -rf .next
npm run build
```

### Estilos no se ven
```bash
# Verificar que @tailwindcss/postcss esté instalado
npm list @tailwindcss/postcss
```

### TypeScript errors
```bash
# Regenerar types
rm -rf .next
npm run dev
```

## ✅ Checklist Pre-Deploy

- [ ] Dominio actualizado en todos los archivos
- [ ] Números de WhatsApp reales
- [ ] Google Search Console configurado
- [ ] Imágenes Open Graph creadas
- [ ] Build exitoso (`npm run build`)
- [ ] Probado en modo producción (`npm start`)
- [ ] SEO verificado con herramientas

## 🎯 Siguientes Pasos

1. Deploy a Vercel/Netlify
2. Agregar dominio personalizado
3. Configurar Google Search Console
4. Agregar Google Analytics
5. Crear backlinks
6. Monitorear posiciones en Google

¡Todo listo para lanzar! 🚀
