const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');
const path = require('path');

// CONFIGURACIÓN
const BASE_URL = 'https://comparadorinternet.co';
const INVENTORY_PATH = path.join(__dirname, '../public/metadata_inventory.json');
const SERP_API_KEY = process.env.SERP_API_KEY || ''; // Si tienes una key de SerpApi.com, ponla aquí

async function checkSEO() {
    console.log('🚀 Iniciando Auditoría de Posicionamiento y Salud SEO...\n');

    // 1. Cargar el inventario
    if (!fs.existsSync(INVENTORY_PATH)) {
        console.error('❌ Error: No se encontró public/metadata_inventory.json. Ejecuta primero inventory_metadata.js');
        return;
    }
    const pages = JSON.parse(fs.readFileSync(INVENTORY_PATH, 'utf8'));

    console.log(`📋 Analizando ${pages.length} páginas del inventario...\n`);

    const report = {
        scanDate: new Date().toISOString(),
        pagesChecked: 0,
        errors: [],
        rankingsToMonitor: [] // Aquí guardaremos qué keywords monitorear
    };

    for (const page of pages) {
        const fullUrl = `${BASE_URL}${page.route === '/' ? '' : page.route}`;
        console.log(`🔎 Revisando: ${fullUrl}`);

        try {
            // A. Verificación de Salud (Health Check)
            // Descargamos la página real para ver si los tags están ahí
            const response = await axios.get(fullUrl, { 
                headers: { 'User-Agent': 'SEO-Monitor-Bot/1.0' },
                validateStatus: status => status === 200 // Solo aceptar 200 OK
            });

            const $ = cheerio.load(response.data);
            const liveTitle = $('title').text();
            const liveDesc = $('meta[name="description"]').attr('content');

            // B. Preparar Keywords para Ranking
            // Tomamos las primeras 3 keywords más importantes para monitorear
            const topKeywords = page.keywords.slice(0, 3);
            
            report.rankingsToMonitor.push({
                url: fullUrl,
                keywords: topKeywords,
                targetTitle: page.title
            });

            // Validación simple
            if (!liveTitle.includes('Comparador') && !liveTitle.includes('Internet')) {
                console.warn(`   ⚠️  Alerta: Título podría estar mal optimizado: "${liveTitle}"`);
            } else {
                console.log(`   ✅  Tags OK. Keywords objetivo: ${topKeywords.join(', ') || 'Sin keywords definidas'}`);
            }

            // C. (OPCIONAL) Consultar Posición Real
            // Esto requiere una API Key pagada (como SerpApi, Serper.dev, DataForSEO)
            if (SERP_API_KEY && topKeywords.length > 0) {
                 // Ejemplo de cómo se llamaría a la API si tuvieras la key
                 // const rank = await checkRankingWithApi(topKeywords[0], fullUrl);
                 // console.log(`   🏆  Posición estimada para "${topKeywords[0]}": ${rank}`);
            }

        } catch (error) {
            console.error(`   ❌  Error conectando: ${error.message}`);
            report.errors.push({ url: fullUrl, error: error.message });
        }
        report.pagesChecked++;
        // Pequeña pausa para no saturar tu servidor
        await new Promise(r => setTimeout(r, 500)); 
    }

    // Guardar reporte
    fs.writeFileSync(path.join(__dirname, '../public/seo_audit_report.json'), JSON.stringify(report, null, 2));
    console.log('\n✅ Auditoría finalizada. Reporte guardado en public/seo_audit_report.json');
    console.log('💡 TIP: Para ver posiciones REALES en Google, necesitas integrar este script con una API externa (ej. SerpApi) o usar Google Search Console.');
}

checkSEO();
