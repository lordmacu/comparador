# Comparador de Internet Colombia 🇨🇴

Landing page optimizada para SEO e IAs que compara planes de internet de Claro, Movistar y ETB en Colombia.

## 🚀 Tecnologías

- **Next.js 15** (App Router)
- **TypeScript**
- **TailwindCSS**
- **SSG (Static Site Generation)**
- Optimizado para Core Web Vitals
- Schema.org JSON-LD para SEO e IAs

## 📊 Características SEO

### ✅ Optimización para Buscadores Tradicionales
- Metadata dinámica por página
- Open Graph y Twitter Cards
- Canonical URLs
- Sitemap.xml automático
- Robots.txt optimizado
- Tabla HTML semántica en comparador

### ✅ Optimización para IAs (ChatGPT, Perplexity, Gemini, Claude)
- **JSON-LD Schemas completos**:
  - Product Schema (cada plan)
  - Organization Schema (cada proveedor)
  - FAQPage Schema
  - BreadcrumbList Schema
  - Table Schema (comparador)
  - Service Schema
  - WebSite Schema
- **Datos estructurados** fácilmente parseables
- **Tablas HTML semánticas** para comparaciones
- **Microdata** en componentes clave
- Permitido para todos los bots de IA en robots.txt

## 🏗️ Estructura del Proyecto

```
internet/
├── app/
│   ├── layout.tsx          # Layout global + metadata base
│   ├── page.tsx            # Home con comparador
│   ├── claro/page.tsx      # Landing Claro
│   ├── movistar/page.tsx   # Landing Movistar
│   ├── etb/page.tsx        # Landing ETB
│   ├── sitemap.ts          # Sitemap dinámico
│   ├── robots.ts           # Robots.txt dinámico
│   └── globals.css         # Estilos globales
├── components/
│   ├── PlanCard.tsx        # Tarjeta de plan
│   ├── ContactForm.tsx     # Formulario de contacto
│   └── WhatsAppButton.tsx  # Botón WhatsApp
├── lib/
│   ├── types.ts            # TypeScript types
│   ├── data.ts             # Helpers para datos
│   └── schemas/
│       └── index.ts        # Generadores de JSON-LD
├── public/
│   └── images/             # Imágenes optimizadas
├── providers-data.json     # Data source de planes
└── package.json
```

## 🛠️ Instalación

```bash
# Instalar dependencias
npm install

# Modo desarrollo con Turbopack
npm run dev

# Build para producción
npm run build

# Iniciar servidor de producción
npm start
```

## 📝 Configuración Necesaria

### 1. Cambiar el dominio base
Busca y reemplaza `https://tudominio.com` en:
- `app/layout.tsx`
- `app/sitemap.ts`
- `app/robots.ts`
- `lib/schemas/index.ts`

### 2. Actualizar números de WhatsApp
Edita `providers-data.json` con los números reales:
```json
"whatsapp": {
  "number": "573XXXXXXXXX",  // Número real
  "message": "..."
}
```

### 3. Agregar Google Search Console
En `app/layout.tsx`, agrega tu código de verificación:
```typescript
verification: {
  google: 'tu-codigo-aqui'
}
```

### 4. Crear imagen Open Graph
Crea una imagen `public/og-image.jpg` (1200x630px) para redes sociales.

### 5. Logos de proveedores (opcional)
Agrega logos en `public/images/`:
- `claro-logo.png`
- `movistar-logo.png`
- `etb-logo.png`

## 🎯 Rutas Principales

- `/` - Home con comparador
- `/claro` - Landing de Claro
- `/movistar` - Landing de Movistar
- `/etb` - Landing de ETB
- `/sitemap.xml` - Sitemap automático
- `/robots.txt` - Robots.txt automático

## 📊 Actualizar Planes

Edita el archivo `providers-data.json` para actualizar:
- Precios
- Velocidades
- Beneficios
- Promociones

El sitio se regenera automáticamente en el siguiente build.

## 🚀 Deployment

### Vercel (Recomendado)
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify
```bash
# Build command
npm run build

# Publish directory
.next
```

### Servidor propio
```bash
npm run build
npm start
```

## 📈 SEO Checklist

- [x] Metadata completa en todas las páginas
- [x] JSON-LD schemas en todas las páginas
- [x] Open Graph tags
- [x] Twitter Cards
- [x] Sitemap.xml dinámico
- [x] Robots.txt optimizado
- [x] Canonical URLs
- [x] Breadcrumbs con schema
- [x] FAQ con schema
- [x] Tabla HTML semántica
- [x] Permitir bots de IA
- [ ] Google Search Console configurado
- [ ] Imágenes Open Graph creadas
- [ ] Analytics configurado

## 🤖 Optimización para IAs

Este sitio está especialmente optimizado para aparecer en respuestas de:
- ChatGPT Search
- Perplexity AI
- Google AI Overviews
- Claude
- Bing Chat

Características clave:
1. **JSON-LD completo** - Las IAs leen directamente los datos estructurados
2. **Tablas HTML semánticas** - Fácil parseo para comparaciones
3. **FAQ Schema** - Aparece en respuestas directas
4. **Product Schema** - Información rica de productos
5. **Datos tabulares limpios** - Ideal para IAs

## 📞 Funcionalidades de Conversión

- Botones de WhatsApp en cada plan
- Formulario de contacto en cada landing
- CTAs claros y visibles
- Diseño mobile-first responsive

## 🎨 Personalización

Los colores de cada proveedor están en `tailwind.config.ts`:
```typescript
colors: {
  claro: { primary: '#FF0000', secondary: '#CC0000' },
  movistar: { primary: '#00A9E0', secondary: '#0085B2' },
  etb: { primary: '#0033A0', secondary: '#002880' },
}
```

## 📄 Licencia

MIT

## 👨‍💻 Desarrollo

Este proyecto fue creado con enfoque en:
- **SEO máximo** para posicionamiento orgánico
- **Optimización para IAs** para aparecer en búsquedas de IA
- **Conversión** con WhatsApp y formularios
- **Rendimiento** con SSG y Core Web Vitals
