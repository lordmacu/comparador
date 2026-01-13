const fs = require('fs');
const path = require('path');
const glob = require('glob');

// ============================================
// INVENTARIO MEJORADO CON BLOGS Y RUTAS DINÁMICAS
// ============================================

function formatSlug(slug) {
    return String(slug)
        .split('-')
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');
}

function extractMetadata(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');

    const metadataMatch = content.match(/export const metadata: Metadata = ({[\s\S]+?};)/);

    if (!metadataMatch) return null;

    const metadataBlock = metadataMatch[1];

    const titleMatch = metadataBlock.match(/title:\s*['"`](.*?)['"`]/) || metadataBlock.match(/title:\s*{[\s\S]*?default:\s*['"`](.*?)['"`]/);
    const descMatch = metadataBlock.match(/description:\s*['"`]([\s\S]*?)['"`]/);

    let keywords = [];
    const keywordsMatch = metadataBlock.match(/keywords:\s*\[([\s\S]*?)\]/);
    if (keywordsMatch) {
         keywords = keywordsMatch[1]
            .split(',')
            .map(k => k.trim().replace(/['"`]/g, ''))
            .filter(k => k.length > 0);
    }

    let route = filePath.replace('app', '').replace('/page.tsx', '');
    if (route === '') route = '/';

    return {
        route,
        title: titleMatch ? titleMatch[1] : 'N/A',
        description: descMatch ? descMatch[1].replace(/\n/g, ' ').trim() : 'N/A',
        keywords: keywords
    };
}

// ============================================
// 1. PÁGINAS ESTÁTICAS
// ============================================
console.error('📄 Escaneando páginas estáticas...');
const staticFiles = glob.sync('app/**/page.tsx', {
    ignore: ['app/**/[**/page.tsx'] // Ignorar rutas dinámicas por ahora
});
const inventory = [];

staticFiles.forEach(file => {
    const data = extractMetadata(file);
    if (data && !data.route.includes('[')) { // Solo rutas estáticas
        inventory.push(data);
    }
});

console.error(`   ✅ ${inventory.length} páginas estáticas encontradas`);

// ============================================
// 2. POSTS DE BLOG (desde content/blog/*.json)
// ============================================
console.error('📝 Escaneando posts de blog...');
const blogFiles = glob.sync('content/blog/*.json');
let blogCount = 0;

blogFiles.forEach(file => {
    try {
        const blogData = JSON.parse(fs.readFileSync(file, 'utf8'));
        const slug = path.basename(file, '.json');

        inventory.push({
            route: `/blog/${slug}`,
            title: blogData.title || 'N/A',
            description: blogData.excerpt || blogData.description || 'N/A',
            keywords: blogData.keywords || blogData.tags || []
        });
        blogCount++;
    } catch (err) {
        console.error(`   ⚠️  Error leyendo ${file}: ${err.message}`);
    }
});

console.error(`   ✅ ${blogCount} posts de blog encontrados`);

// ============================================
// 3. RUTAS DINÁMICAS COMUNES (opcional pero útil)
// ============================================
console.error('🔀 Agregando rutas dinámicas conocidas...');

// Barrios de Bogotá
const barrios = [
    'suba', 'kennedy', 'usaquen', 'chapinero', 'engativa',
    'ciudad-bolivar', 'teusaquillo', 'fontibon', 'puente-aranda',
    'bosa', 'san-cristobal', 'barrios-unidos', 'tunjuelito',
    'rafael-uribe-uribe', 'santa-fe', 'los-martires',
    'antonio-narino', 'la-candelaria', 'usme', 'sumapaz'
];

barrios.forEach(barrio => {
    inventory.push({
        // Ruta SEO pública (canonical): /internet-{barrio}-bogota -> rewrite a /barrios/{barrio}
        route: `/internet-${barrio}-bogota`,
        title: `Internet en ${formatSlug(barrio)} Bogotá - Comparador`,
        description: `Compara y contrata internet (fibra óptica / banda ancha) en ${formatSlug(barrio)}, Bogotá. Verifica cobertura y disponibilidad.`,
        keywords: [
            `internet ${formatSlug(barrio)} Bogotá`,
            `fibra óptica ${formatSlug(barrio)}`,
            `cobertura internet ${formatSlug(barrio)}`
        ]
    });
});

// Ciudades
const ciudades = ['medellin', 'cali', 'barranquilla', 'cartagena', 'bucaramanga'];
ciudades.forEach(ciudad => {
    inventory.push({
        route: `/ciudades/${ciudad}`,
        title: `Internet ${ciudad} - Comparador`,
        description: `Mejores planes de internet en ${ciudad}.`,
        keywords: [`internet ${ciudad}`]
    });
});

// Casos de uso
const casos = ['gaming', 'teletrabajo', 'streaming'];
casos.forEach(caso => {
    inventory.push({
        // Ruta SEO pública (canonical): /mejor-internet-{caso}-bogota -> rewrite a /casos/{caso}
        route: `/mejor-internet-${caso}-bogota`,
        title: `Mejor Internet para ${formatSlug(caso)} en Bogotá - Comparador`,
        description: `Guía para elegir el mejor internet para ${caso} en Bogotá: velocidad recomendada, estabilidad y operadores disponibles.`,
        keywords: [
            `mejor internet ${caso} Bogotá`,
            `internet para ${caso} Bogotá`,
            `planes internet ${caso}`
        ]
    });
});

// Velocidades
const velocidades = ['100-megas', '200-megas', '300-megas', '500-megas', 'fibra-optica'];
velocidades.forEach(velocidad => {
    inventory.push({
        // Ruta SEO pública (canonical): /internet-{velocidad}-bogota -> rewrite a /velocidades/{velocidad}
        route: `/internet-${velocidad}-bogota`,
        title: `Internet ${formatSlug(velocidad)} en Bogotá - Comparador`,
        description: `Planes de internet ${formatSlug(velocidad)} en Bogotá. Compara opciones y contrata con asesor.`,
        keywords: [
            `internet ${formatSlug(velocidad)} Bogotá`,
            `planes ${formatSlug(velocidad)}`,
            `internet ${formatSlug(velocidad)} precio`
        ]
    });
});

// Tipos de vivienda
const viviendas = ['apartamento', 'casa', 'oficina', 'edificio'];
viviendas.forEach(vivienda => {
    inventory.push({
        // Ruta SEO pública (canonical): /internet-para-{vivienda}-bogota -> rewrite a /viviendas/{vivienda}
        route: `/internet-para-${vivienda}-bogota`,
        title: `Internet para ${formatSlug(vivienda)} en Bogotá - Comparador`,
        description: `Recomendaciones y planes de internet según tu tipo de vivienda (${formatSlug(vivienda)}) en Bogotá.`,
        keywords: [
            `internet para ${vivienda} Bogotá`,
            `mejor internet ${vivienda} Bogotá`,
            `planes internet ${vivienda}`
        ]
    });
});

// Soluciones (intención alta: resolver y contratar)
const soluciones = ['cambiar-de-operador', 'mejorar-velocidad', 'internet-lento', 'cortes-de-internet'];
soluciones.forEach(solucion => {
    inventory.push({
        // Ruta SEO pública (canonical): /soluciones/{solucion}-bogota -> rewrite a /soluciones/{solucion}
        route: `/soluciones/${solucion}-bogota`,
        title: `Solución: ${formatSlug(solucion)} en Bogotá - Comparador`,
        description: `Guía práctica para ${solucion.replace(/-/g, ' ')} en Bogotá, con pasos y recomendación de operador según cobertura.`,
        keywords: [
            `${solucion.replace(/-/g, ' ')} Bogotá`,
            `solución ${solucion.replace(/-/g, ' ')}`,
            `internet ${solucion.replace(/-/g, ' ')}`
        ]
    });
});

// Comparativas
const comparativas = [
    ['claro', 'movistar'],
    ['claro', 'etb'],
    ['movistar', 'etb'],
    ['etb', 'claro'],
    ['etb', 'movistar'],
    ['movistar', 'claro']
];

comparativas.forEach(([op1, op2]) => {
    inventory.push({
        route: `/comparar/${op1}/${op2}`,
        title: `${op1.toUpperCase()} vs ${op2.toUpperCase()} - Comparador`,
        description: `Comparación entre ${op1} y ${op2}.`,
        keywords: [`${op1} vs ${op2}`]
    });
});

console.error(`   ✅ ${barrios.length + ciudades.length + casos.length + velocidades.length + viviendas.length + soluciones.length + comparativas.length} rutas dinámicas agregadas`);

// ============================================
// 4. GUARDAR INVENTARIO
// ============================================
console.error(`\n📊 Total URLs en inventario: ${inventory.length}`);
console.error('💾 Guardando en public/metadata_inventory.json...\n');

// Ordenar por route
inventory.sort((a, b) => a.route.localeCompare(b.route));

// Imprimir JSON a stdout (para redirigir a archivo)
console.log(JSON.stringify(inventory, null, 2));

console.error('✅ Inventario completado exitosamente!\n');
