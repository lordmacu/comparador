# ✅ SEO Checklist - Optimizado para Google e IAs

## 🤖 Optimización para Inteligencias Artificiales

### Schemas JSON-LD Implementados

#### ✅ En TODAS las páginas:
- [x] **WebSite Schema** (Home) - Para búsquedas del sitio
- [x] **Organization Schema** - Info de cada proveedor
- [x] **Service Schema** - Descripción de servicios
- [x] **BreadcrumbList Schema** - Navegación estructurada
- [x] **FAQPage Schema** - Preguntas frecuentes
- [x] **Product Schema** - Cada plan individual con:
  - Nombre del producto
  - Descripción
  - Precio actual
  - Precio de instalación
  - Disponibilidad
  - Proveedor
  - Propiedades adicionales (velocidad, tecnología)
  - Rating agregado

#### ✅ En Home:
- [x] **Table Schema** - Para el comparador
- [x] **ItemList Schema** - Lista de planes

### Elementos Clave para IAs

1. **Tablas HTML Semánticas** ✅
   ```html
   <table>
     <caption>Comparación de planes...</caption>
     <thead><th scope="col">...</th></thead>
     <tbody>...</tbody>
   </table>
   ```

2. **Microdata en Componentes** ✅
   - `itemScope` y `itemType` en PlanCard
   - `itemProp` en precios, nombres, descripciones

3. **FAQ Estructurado** ✅
   - `<details>` semánticos con schema
   - Preguntas y respuestas claras

4. **Datos Tabulares Limpios** ✅
   - Precios en formato numérico
   - Velocidades estructuradas
   - Comparaciones directas

## 🔍 SEO Tradicional (Google, Bing)

### Metadata
- [x] Title único por página (formato `%s | Comparador`)
- [x] Description optimizada con keywords
- [x] Keywords relevantes
- [x] Canonical URLs
- [x] Open Graph completo
- [x] Twitter Cards
- [x] Robots meta optimizado

### Estructura
- [x] URLs limpias (`/claro`, `/movistar`, `/etb`)
- [x] Breadcrumbs con schema
- [x] Sitemap.xml dinámico
- [x] Robots.txt permitiendo IAs
- [x] Headers semánticos (H1, H2, H3)

### Contenido
- [x] Títulos H1 únicos por página
- [x] Contenido único y relevante
- [x] Keywords naturales
- [x] Alt text en iconos SVG
- [x] Aria labels en botones

### Performance
- [x] SSG (Static Site Generation)
- [x] Fuentes optimizadas con `next/font`
- [x] Preconnect a recursos externos
- [x] DNS prefetch para WhatsApp
- [x] Compresión activada
- [x] Headers de seguridad

## 📊 Bots Permitidos en robots.txt

```
✓ Googlebot
✓ Bingbot
✓ GPTBot (ChatGPT)
✓ ChatGPT-User
✓ Google-Extended (Gemini/Bard)
✓ anthropic-ai (Claude)
✓ PerplexityBot (Perplexity)
```

## 🎯 Keywords Target por Página

### Home (/)
- comparador internet Colombia
- planes internet Colombia 2025
- mejor internet Colombia
- fibra óptica Colombia
- Claro vs Movistar vs ETB

### /claro
- internet Claro Colombia
- planes Claro 2025
- fibra óptica Claro
- Claro 900 Mbps
- internet hogar Claro

### /movistar
- internet Movistar Colombia
- planes Movistar 2025
- Movistar 900 Mbps
- Disney+ Movistar
- fibra Movistar

### /etb
- internet ETB Bogotá
- ETB primer mes gratis
- fibra ETB 910 Mbps
- planes ETB 2025
- internet ETB Chía

## 🔗 Internal Linking

```
Home (/)
  ├── /claro (desde comparador, CTA, nav)
  ├── /movistar (desde comparador, CTA, nav)
  └── /etb (desde comparador, CTA, nav)

Cada landing
  └── / (breadcrumb, footer)
```

## 📱 Mobile & Accessibility

- [x] Diseño mobile-first
- [x] Responsive en todas las resoluciones
- [x] Touch targets >44px
- [x] Contraste de colores WCAG AA
- [x] Aria labels en elementos interactivos
- [x] Navegación por teclado funcional

## 🚀 Core Web Vitals Target

- **LCP (Largest Contentful Paint)**: < 2.5s ✅
- **FID (First Input Delay)**: < 100ms ✅
- **CLS (Cumulative Layout Shift)**: < 0.1 ✅

## 📈 Métricas Esperadas

### PageSpeed Insights
- Mobile: 90-100
- Desktop: 95-100

### Lighthouse
- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

## 🔍 Testing Tools

### Schema.org
1. [Rich Results Test](https://search.google.com/test/rich-results)
2. [Schema Markup Validator](https://validator.schema.org/)

### SEO General
1. [Google Search Console](https://search.google.com/search-console)
2. [PageSpeed Insights](https://pagespeed.web.dev/)
3. [Lighthouse](https://developers.google.com/web/tools/lighthouse)

### Open Graph
1. [Facebook Debugger](https://developers.facebook.com/tools/debug/)
2. [Twitter Card Validator](https://cards-dev.twitter.com/validator)

### IAs
1. Busca en ChatGPT: "mejores planes de internet en Colombia"
2. Busca en Perplexity: "comparar internet Claro Movistar ETB"
3. Busca en Google con AI Overviews activado

## ✅ Post-Deploy Checklist

### Inmediato
- [ ] Verificar sitemap.xml accesible
- [ ] Verificar robots.txt accesible
- [ ] Probar todas las rutas funcionan
- [ ] Verificar WhatsApp links funcionan
- [ ] Probar formulario de contacto

### Día 1-3
- [ ] Agregar sitio a Google Search Console
- [ ] Subir sitemap a Search Console
- [ ] Verificar propiedad del dominio
- [ ] Solicitar indexación de páginas principales
- [ ] Configurar Google Analytics

### Semana 1
- [ ] Verificar indexación en Google
- [ ] Revisar errores en Search Console
- [ ] Probar búsquedas con keywords target
- [ ] Verificar Rich Results aparecen

### Mes 1
- [ ] Analizar tráfico orgánico
- [ ] Identificar keywords que rankean
- [ ] Optimizar contenido según datos
- [ ] Crear backlinks de calidad

## 🎯 Objetivos de Posicionamiento

### Mes 1-2
- Aparecer en resultados para nombre de marca
- Indexación completa de todas las páginas
- Rich snippets visibles en Google

### Mes 3-6
- Top 10 para "planes internet [proveedor] Colombia"
- Top 20 para "comparador internet Colombia"
- Aparecer en AI Overviews de Google

### Mes 6+
- Top 5 para keywords principales
- Fuente citada en respuestas de ChatGPT/Perplexity
- Tráfico orgánico > 1000 visitas/mes

## 💡 Tips Adicionales

1. **Contenido Fresh**: Actualiza precios cada mes
2. **Blog (opcional)**: Artículos sobre "cómo elegir internet"
3. **Testimonios**: Agrega reviews de usuarios
4. **Comparaciones**: Crea más tablas comparativas
5. **FAQs**: Expande preguntas frecuentes
6. **Videos**: Tutoriales sobre contratación
7. **Local SEO**: Optimiza para ciudades específicas

¡Todo listo para dominar el SEO! 🚀
