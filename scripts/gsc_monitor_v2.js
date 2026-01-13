const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');
const nodemailer = require('nodemailer');
const { execSync } = require('child_process');

// Cargar variables de entorno
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });
if (!process.env.SMTP_USER) {
    require('dotenv').config({ path: path.join(__dirname, '../.env') });
}

// CONFIGURACIÓN
const SITE_URL = 'https://comparadorinternet.co';
const KEY_FILE = process.env.GOOGLE_APPLICATION_CREDENTIALS || path.join(__dirname, '../service-account-key.json');
const INVENTORY_PATH = path.join(__dirname, '../public/metadata_inventory.json');
const HISTORY_PATH = path.join(__dirname, '../public/gsc_history.json');

// ============================================
// NUEVA FUNCIÓN: Guardar historial
// ============================================
function saveHistory(report) {
    const timestamp = new Date().toISOString();
    let history = [];

    if (fs.existsSync(HISTORY_PATH)) {
        try {
            history = JSON.parse(fs.readFileSync(HISTORY_PATH, 'utf8'));
        } catch (err) {
            console.log('   ⚠️  No se pudo leer historial anterior, creando nuevo');
        }
    }

    history.push({
        timestamp,
        data: report
    });

    // Mantener solo últimos 30 registros
    if (history.length > 30) {
        history = history.slice(-30);
    }

    fs.writeFileSync(HISTORY_PATH, JSON.stringify(history, null, 2));
}

// ============================================
// NUEVA FUNCIÓN: Comparar con período anterior
// ============================================
function compareWithPrevious(currentReport) {
    if (!fs.existsSync(HISTORY_PATH)) {
        return null;
    }

    try {
        const history = JSON.parse(fs.readFileSync(HISTORY_PATH, 'utf8'));
        if (history.length < 2) return null;

        const previous = history[history.length - 2].data;
        const current = currentReport;

        const comparison = {
            totalKeywordsChange: current.length - previous.length,
            totalImpressionsChange: 0,
            totalClicksChange: 0,
            avgPositionChange: 0,
            keywordChanges: [],
            newKeywords: [],
            majorImprovements: [] // Improvements > 3 positions or > 20% clicks
        };

        // Calcular cambios totales
        const prevTotalImpr = previous.reduce((sum, r) => sum + r.impressions, 0);
        const currTotalImpr = current.reduce((sum, r) => sum + r.impressions, 0);
        comparison.totalImpressionsChange = currTotalImpr - prevTotalImpr;

        const prevTotalClicks = previous.reduce((sum, r) => sum + r.clicks, 0);
        const currTotalClicks = current.reduce((sum, r) => sum + r.clicks, 0);
        comparison.totalClicksChange = currTotalClicks - prevTotalClicks;

        const prevAvgPos = previous.reduce((sum, r) => sum + r.position, 0) / previous.length;
        const currAvgPos = current.reduce((sum, r) => sum + r.position, 0) / current.length;
        comparison.avgPositionChange = prevAvgPos - currAvgPos; // Positivo = mejora

        // Comparar keywords individuales
        current.forEach(curr => {
            const prev = previous.find(p => p.keyword === curr.keyword && p.page === curr.page);

            if (!prev) {
                // NUEVA KEYWORD ENCONTRADA
                comparison.newKeywords.push({
                    keyword: curr.keyword,
                    page: curr.page,
                    position: curr.position,
                    clicks: curr.clicks,
                    impressions: curr.impressions
                });
            } else {
                // YA EXISTÍA, VERIFICAR MEJORAS
                const posChange = prev.position - curr.position; // Positivo = mejora
                const clicksChange = curr.clicks - prev.clicks;

                if (Math.abs(posChange) >= 2) {
                    comparison.keywordChanges.push({
                        keyword: curr.keyword,
                        page: curr.page,
                        positionChange: posChange,
                        prevPosition: prev.position,
                        currPosition: curr.position
                    });
                }

                // DETECTAR "BIG WINS" (Mejora > 3 pos o aumento significativo de clics)
                if (posChange >= 3 || (clicksChange > 0 && clicksChange >= 5)) {
                    comparison.majorImprovements.push({
                        keyword: curr.keyword,
                        page: curr.page,
                        type: posChange >= 3 ? 'Posición' : 'Clics',
                        change: posChange >= 3 ? `+${posChange.toFixed(1)} pos` : `+${clicksChange} clics`,
                        currentMetric: posChange >= 3 ? `Pos ${curr.position}` : `${curr.clicks} clics`
                    });
                }
            }
        });

        // Ordenar Novedades por impresiones
        comparison.newKeywords.sort((a, b) => b.impressions - a.impressions);

        return comparison;
    } catch (err) {
        console.log('   ⚠️  Error comparando historial:', err.message);
        return null;
    }
}

// ============================================
// NUEVA FUNCIÓN: Obtener datos por device
// ============================================
async function getDeviceBreakdown(searchconsole, activeSiteUrl, dateStringStart, dateStringEnd) {
    try {
        const res = await searchconsole.searchanalytics.query({
            siteUrl: activeSiteUrl,
            requestBody: {
                startDate: dateStringStart,
                endDate: dateStringEnd,
                dimensions: ['device'],
                rowLimit: 10
            }
        });

        const devices = {};
        (res.data.rows || []).forEach(row => {
            const device = row.keys[0];
            devices[device] = {
                impressions: row.impressions,
                clicks: row.clicks,
                ctr: row.ctr,
                position: row.position
            };
        });

        return devices;
    } catch (err) {
        console.log('   ⚠️  No se pudo obtener datos por device');
        return null;
    }
}

// ============================================
// NUEVA FUNCIÓN: Análisis de oportunidades
// ============================================
function analyzeOpportunities(report) {
    const opportunities = report.filter(r => r.position >= 11 && r.position <= 20 && r.impressions >= 5);
    opportunities.sort((a, b) => b.impressions - a.impressions);
    return opportunities.slice(0, 10); // Top 10 oportunidades
}

// ============================================
// NUEVA FUNCIÓN: Top performers
// ============================================
function getTopPerformers(report) {
    const top = report.filter(r => r.position <= 10);
    top.sort((a, b) => a.position - b.position);
    return top.slice(0, 10);
}

// ============================================
// NUEVA FUNCIÓN: Páginas sin datos con más info
// ============================================
function getPagesWithoutData(pages, report) {
    const pagesWithData = [...new Set(report.map(r => r.page))];
    const pagesWithoutData = pages
        .map(p => ({
            url: `${SITE_URL}${p.route === '/' ? '' : p.route}`,
            route: p.route,
            title: p.title
        }))
        .filter(item => !pagesWithData.includes(item.url));

    // Priorizar: Main pages > Blog > Locations
    const prioritized = pagesWithoutData.sort((a, b) => {
        const aIsMain = !a.route.includes('/blog/') && !a.route.includes('/barrios/') && !a.route.includes('/ciudades/');
        const bIsMain = !b.route.includes('/blog/') && !b.route.includes('/barrios/') && !b.route.includes('/ciudades/');
        if (aIsMain && !bIsMain) return -1;
        if (!aIsMain && bIsMain) return 1;
        return 0;
    });

    return prioritized.slice(0, 20); // Top 20
}

// ============================================
// NUEVA FUNCIÓN: Generar archivo de análisis para IA
// ============================================
function generateAIAnalysisPrompt(report, pagesWithoutData, topPerformers, opportunities) {
    const timestamp = new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' });

    let promptContent = `═══════════════════════════════════════════════════════════════════
🤖 PROMPT DE ANÁLISIS SEO PARA IA - ComparadorInternet.co
═══════════════════════════════════════════════════════════════════

Fecha de generación: ${timestamp}
Total de páginas monitoreadas: ${report.length + pagesWithoutData.length}
Páginas con ranking: ${report.length}
Páginas sin datos: ${pagesWithoutData.length}

═══════════════════════════════════════════════════════════════════
📊 PARTE 1: PÁGINAS QUE SÍ ESTÁN RANKEANDO (${report.length})
═══════════════════════════════════════════════════════════════════

`;

    // Top Performers (posición 1-10)
    if (topPerformers.length > 0) {
        promptContent += `\n🏆 TOP PERFORMERS (Posición 1-10) - ${topPerformers.length} páginas:\n`;
        promptContent += '─────────────────────────────────────────────────────────────────\n';
        topPerformers.forEach((item, idx) => {
            promptContent += `${idx + 1}. ${item.page}\n`;
            promptContent += `   Keyword: "${item.keyword}"\n`;
            promptContent += `   Posición: ${item.position} | Impresiones: ${item.impressions} | Clics: ${item.clicks}\n\n`;
        });
    }

    // Oportunidades (posición 11-20)
    if (opportunities.length > 0) {
        promptContent += `\n🎯 OPORTUNIDADES (Posición 11-20) - ${opportunities.length} páginas:\n`;
        promptContent += '─────────────────────────────────────────────────────────────────\n';
        promptContent += 'NOTA: Estas son las más fáciles de optimizar para llegar a Top 10\n\n';
        opportunities.forEach((item, idx) => {
            promptContent += `${idx + 1}. ${item.page}\n`;
            promptContent += `   Keyword: "${item.keyword}"\n`;
            promptContent += `   Posición: ${item.position} | Impresiones: ${item.impressions} | Clics: ${item.clicks}\n\n`;
        });
    }

    // Resto de páginas con ranking
    const otherRanking = report.filter(r =>
        !topPerformers.some(t => t.page === r.page && t.keyword === r.keyword) &&
        !opportunities.some(o => o.page === r.page && o.keyword === o.keyword)
    );

    if (otherRanking.length > 0) {
        promptContent += `\n📈 OTRAS PÁGINAS RANKEANDO (Posición 21+) - ${otherRanking.length} páginas:\n`;
        promptContent += '─────────────────────────────────────────────────────────────────\n';
        const uniquePages = [...new Set(otherRanking.map(r => r.page))];
        uniquePages.slice(0, 20).forEach((page, idx) => {
            const pageKeywords = otherRanking.filter(r => r.page === page);
            const bestPosition = Math.min(...pageKeywords.map(k => k.position));
            promptContent += `${idx + 1}. ${page}\n`;
            promptContent += `   Mejor posición: ${bestPosition.toFixed(1)}\n`;
            promptContent += `   Keywords: ${pageKeywords.length}\n\n`;
        });
    }

    // Páginas sin datos
    promptContent += `\n\n═══════════════════════════════════════════════════════════════════
⚠️ PARTE 2: PÁGINAS SIN DATOS EN GSC (${pagesWithoutData.length})
═══════════════════════════════════════════════════════════════════

NOTA IMPORTANTE: Estas páginas NO aparecen en Google Search Console.
Pueden ser nuevas, no estar indexadas, o no tener tráfico orgánico aún.

`;

    // Categorizar páginas sin datos
    const mainPages = pagesWithoutData.filter(p =>
        !p.route.includes('/blog/') &&
        !p.route.includes('/barrios/') &&
        !p.route.includes('/ciudades/')
    );

    const blogPages = pagesWithoutData.filter(p => p.route.includes('/blog/'));

    const locationPages = pagesWithoutData.filter(p =>
        p.route.includes('/barrios/') || p.route.includes('/ciudades/')
    );

    if (mainPages.length > 0) {
        promptContent += `\n🎯 PÁGINAS PRINCIPALES (Prioridad Alta) - ${mainPages.length}:\n`;
        promptContent += '─────────────────────────────────────────────────────────────────\n';
        mainPages.forEach((item, idx) => {
            promptContent += `${idx + 1}. ${item.url}\n`;
            promptContent += `   Título: ${item.title}\n`;
            promptContent += `   Ruta: ${item.route}\n\n`;
        });
    }

    if (blogPages.length > 0) {
        promptContent += `\n📝 BLOG POSTS - ${blogPages.length}:\n`;
        promptContent += '─────────────────────────────────────────────────────────────────\n';
        blogPages.forEach((item, idx) => {
            promptContent += `${idx + 1}. ${item.url}\n`;
            promptContent += `   Título: ${item.title}\n\n`;
        });
    }

    if (locationPages.length > 0) {
        promptContent += `\n🏘️ PÁGINAS DE UBICACIÓN (Barrios/Ciudades) - ${locationPages.length}:\n`;
        promptContent += '─────────────────────────────────────────────────────────────────\n';
        locationPages.forEach((item, idx) => {
            promptContent += `${idx + 1}. ${item.url}\n`;
            promptContent += `   Título: ${item.title}\n\n`;
        });
    }

    // Prompt para IA
    promptContent += `\n\n═══════════════════════════════════════════════════════════════════
🤖 PROMPT PARA ANÁLISIS CON IA (COPIAR Y PEGAR EN CLAUDE)
═══════════════════════════════════════════════════════════════════

Eres un experto en SEO y análisis de rankings de Google. Analiza los datos anteriores de ComparadorInternet.co y proporciona:

**1. DIAGNÓSTICO DE PÁGINAS SIN DATOS:**
   - ¿Por qué estas páginas no aparecen en GSC?
   - ¿Están indexadas en Google? ¿Cómo verificarlo?
   - ¿Cuáles deberían priorizarse primero?

**2. ESTRATEGIA DE BACKLINKS:**
   - ¿A cuáles páginas sin datos debería crear backlinks primero?
   - ¿Qué tipo de backlinks recomiendas para cada categoría (principales/blog/ubicación)?
   - ¿Qué anchor text usar?

**3. OPTIMIZACIÓN DE OPORTUNIDADES:**
   - Analiza las keywords en posición 11-20
   - ¿Qué optimizaciones específicas recomiendas para llevarlas a Top 10?
   - ¿Hay oportunidades de contenido adicional?

**4. COMPARACIÓN DE PATRONES:**
   - ¿Qué tienen en común las páginas que SÍ rankean bien?
   - ¿Qué les falta a las páginas sin datos comparado con las que sí rankean?
   - ¿Hay patrones en las URLs, títulos o estructura?

**5. ACCIONES PRIORITARIAS:**
   - Dame una lista de 10 acciones concretas y priorizadas
   - Ordena por impacto esperado vs esfuerzo requerido

**6. PREDICCIÓN DE RESULTADOS:**
   - ¿Cuánto tiempo tomaría ver resultados en las páginas sin datos?
   - ¿Cuál sería el impacto estimado en tráfico orgánico?

Por favor, sé específico y práctico. Necesito acciones ejecutables inmediatamente.

═══════════════════════════════════════════════════════════════════
FIN DEL ARCHIVO - Generado automáticamente por GSC Monitor v2
═══════════════════════════════════════════════════════════════════
`;

    return promptContent;
}

// ============================================
// EMAIL MEJORADO con análisis y archivo adjunto
// ============================================
async function sendEnhancedEmailReport(reportData, comparison, devices, opportunities, topPerformers, pagesWithoutData, pages) {
    if (!reportData || reportData.length === 0) {
        console.log('📧 No hay datos nuevos para reportar por correo.');
        return;
    }

    if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD || !process.env.NOTIFICATION_EMAIL) {
        console.warn('⚠️ Faltan credenciales SMTP en .env.local. No se envió el correo.');
        return;
    }

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    // Generar archivo de análisis para IA
    console.log('📝 Generando archivo de análisis para IA...');
    const aiPromptContent = generateAIAnalysisPrompt(reportData, pagesWithoutData, topPerformers, opportunities);
    const aiPromptPath = path.join(__dirname, '../public/gsc_ai_analysis_prompt.txt');
    fs.writeFileSync(aiPromptPath, aiPromptContent, 'utf8');
    console.log('   ✅ Archivo generado: gsc_ai_analysis_prompt.txt');

    // Calcular métricas totales
    const totalImpressions = reportData.reduce((sum, r) => sum + r.impressions, 0);
    const totalClicks = reportData.reduce((sum, r) => sum + r.clicks, 0);
    const avgCTR = totalClicks > 0 ? (totalClicks / totalImpressions * 100).toFixed(2) : '0';
    const avgPosition = (reportData.reduce((sum, r) => sum + r.position, 0) / reportData.length).toFixed(1);

    // Sección resumen ejecutivo
    let executiveSummary = `
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 8px; color: white; margin-bottom: 20px;">
            <h3 style="margin: 0 0 15px 0; font-size: 18px;">📈 RESUMEN EJECUTIVO</h3>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
                <div>
                    <div style="font-size: 24px; font-weight: bold;">${reportData.length}</div>
                    <div style="font-size: 12px; opacity: 0.9;">Total Keywords</div>
                </div>
                <div>
                    <div style="font-size: 24px; font-weight: bold;">${totalImpressions.toLocaleString()}</div>
                    <div style="font-size: 12px; opacity: 0.9;">Total Impresiones</div>
                </div>
                <div>
                    <div style="font-size: 24px; font-weight: bold;">${totalClicks}</div>
                    <div style="font-size: 12px; opacity: 0.9;">Total Clics</div>
                </div>
                <div>
                    <div style="font-size: 24px; font-weight: bold;">${avgPosition}</div>
                    <div style="font-size: 12px; opacity: 0.9;">Posición Promedio</div>
                </div>
            </div>
    `;

    // Agregar cambios si hay comparación
    if (comparison) {
        const keywordsSymbol = comparison.totalKeywordsChange > 0 ? '↑' : comparison.totalKeywordsChange < 0 ? '↓' : '→';
        const impressionsSymbol = comparison.totalImpressionsChange > 0 ? '↑' : comparison.totalImpressionsChange < 0 ? '↓' : '→';
        const clicksSymbol = comparison.totalClicksChange > 0 ? '↑' : comparison.totalClicksChange < 0 ? '↓' : '→';
        const posSymbol = comparison.avgPositionChange > 0 ? '↑' : comparison.avgPositionChange < 0 ? '↓' : '→';

        executiveSummary += `
            <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid rgba(255,255,255,0.3);">
                <div style="font-size: 12px; opacity: 0.9; margin-bottom: 5px;">vs. Período Anterior:</div>
                <div style="font-size: 14px;">
                    Keywords: ${keywordsSymbol} ${comparison.totalKeywordsChange > 0 ? '+' : ''}${comparison.totalKeywordsChange} |
                    Impr: ${impressionsSymbol} ${comparison.totalImpressionsChange > 0 ? '+' : ''}${comparison.totalImpressionsChange} |
                    Clics: ${clicksSymbol} ${comparison.totalClicksChange > 0 ? '+' : ''}${comparison.totalClicksChange} |
                    Pos: ${posSymbol} ${comparison.avgPositionChange > 0 ? '+' : ''}${comparison.avgPositionChange.toFixed(1)}
                </div>
            </div>
        `;
    }

    executiveSummary += `</div>`;

    // SECCIÓN ESPECIAL: NOVEDADES Y MEJORAS
    let highlightsHtml = '';
    if (comparison && (comparison.newKeywords.length > 0 || comparison.majorImprovements.length > 0)) {
        highlightsHtml += `
            <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; border-left: 4px solid #16a34a; margin-bottom: 30px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
                <h3 style="color: #15803d; margin: 0 0 15px 0;">🚀 NOVEDADES Y MEJORAS DESTACADAS</h3>
                
                ${comparison.newKeywords.length > 0 ? `
                    <div style="margin-bottom: 20px;">
                        <h4 style="color: #166534; font-size: 14px; margin-bottom: 10px;">✨ Nuevas Keywords Detectadas (${comparison.newKeywords.length})</h4>
                        <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 6px; overflow: hidden;">
                            <thead style="background: #dcfce7;">
                                <tr>
                                    <th style="padding: 8px; text-align: left; font-size: 12px; color: #14532d;">Keyword</th>
                                    <th style="padding: 8px; text-align: center; font-size: 12px; color: #14532d;">Pos</th>
                                    <th style="padding: 8px; text-align: center; font-size: 12px; color: #14532d;">Impr</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${comparison.newKeywords.slice(0, 5).map(k => `
                                    <tr style="border-bottom: 1px solid #f0fdf4;">
                                        <td style="padding: 8px; font-size: 12px;"><strong>${k.keyword}</strong></td>
                                        <td style="padding: 8px; text-align: center; font-size: 12px;">${k.position}</td>
                                        <td style="padding: 8px; text-align: center; font-size: 12px;">${k.impressions}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                        ${comparison.newKeywords.length > 5 ? `<p style="font-size: 11px; color: #166534; margin-top: 5px;">...y ${comparison.newKeywords.length - 5} más.</p>` : ''}
                    </div>
                ` : ''}

                ${comparison.majorImprovements.length > 0 ? `
                    <div>
                        <h4 style="color: #166534; font-size: 14px; margin-bottom: 10px;">🔥 Grandes Saltos de Rendimiento</h4>
                        <ul style="margin: 0; padding-left: 20px; font-size: 12px; color: #14532d;">
                            ${comparison.majorImprovements.slice(0, 5).map(i => `
                                <li style="margin-bottom: 5px;">
                                    <strong>${i.keyword}</strong>: Mejora de <span style="background: #bbf7d0; padding: 2px 4px; rounded: 4px;">${i.change}</span> (${i.currentMetric})
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                ` : ''}
            </div>
        `;
    }

    // Top Performers
    let topPerformersHtml = '';
    if (topPerformers.length > 0) {
        topPerformersHtml = `
            <h3 style="color: #1f2937; margin-top: 30px;">🏆 TOP KEYWORDS (Posición 1-10)</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <thead>
                    <tr style="background-color: #dcfce7;">
                        <th style="padding: 10px 8px; text-align: left; font-size: 13px;">Keyword</th>
                        <th style="padding: 10px 8px; text-align: center; font-size: 13px;">Pos</th>
                        <th style="padding: 10px 8px; text-align: center; font-size: 13px;">Impr</th>
                        <th style="padding: 10px 8px; text-align: center; font-size: 13px;">Clics</th>
                        <th style="padding: 10px 8px; text-align: left; font-size: 13px;">Página</th>
                    </tr>
                </thead>
                <tbody>
                    ${topPerformers.map(r => `
                        <tr style="border-bottom: 1px solid #e5e7eb;">
                            <td style="padding: 8px;">${r.keyword}</td>
                            <td style="padding: 8px; text-align: center;"><b style="color: #16a34a;">${r.position}</b></td>
                            <td style="padding: 8px; text-align: center;">${r.impressions}</td>
                            <td style="padding: 8px; text-align: center;">${r.clicks}</td>
                            <td style="padding: 8px; font-size: 12px;"><a href="${r.page}" style="color: #2563eb; text-decoration: none;">${r.page.replace(SITE_URL, '') || '/'}</a></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }

    // Oportunidades
    let opportunitiesHtml = '';
    if (opportunities.length > 0) {
        opportunitiesHtml = `
            <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 20px 0;">
                <h3 style="color: #92400e; margin-top: 0;">🎯 TOP OPORTUNIDADES (Posición 11-20)</h3>
                <p style="color: #78350f; font-size: 14px; margin: 5px 0 15px 0;">⚡ Estas son las MÁS FÁCILES de optimizar para llegar a Top 10</p>
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="background-color: #fde68a;">
                            <th style="padding: 8px; text-align: left; font-size: 13px;">Keyword</th>
                            <th style="padding: 8px; text-align: center; font-size: 13px;">Pos</th>
                            <th style="padding: 8px; text-align: center; font-size: 13px;">Impr</th>
                            <th style="padding: 8px; text-align: left; font-size: 13px;">Página</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${opportunities.slice(0, 5).map(r => `
                            <tr style="border-bottom: 1px solid #fde68a;">
                                <td style="padding: 8px;">${r.keyword}</td>
                                <td style="padding: 8px; text-align: center;"><b style="color: #d97706;">${r.position}</b></td>
                                <td style="padding: 8px; text-align: center;">${r.impressions}</td>
                                <td style="padding: 8px; font-size: 12px;"><a href="${r.page}" style="color: #92400e; text-decoration: none;">${r.page.replace(SITE_URL, '') || '/'}</a></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    // Device breakdown
    let devicesHtml = '';
    if (devices && Object.keys(devices).length > 0) {
        const total = Object.values(devices).reduce((sum, d) => sum + d.impressions, 0);
        devicesHtml = `
            <h3 style="color: #1f2937; margin-top: 30px;">📱 MÓVIL vs DESKTOP</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 20px;">
                ${Object.entries(devices).map(([device, data]) => {
            const percentage = ((data.impressions / total) * 100).toFixed(0);
            const deviceIcon = device === 'MOBILE' ? '📱' : device === 'DESKTOP' ? '🖥️' : '📟';
            return `
                        <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 15px;">
                            <div style="font-size: 24px; margin-bottom: 5px;">${deviceIcon}</div>
                            <div style="font-weight: bold; color: #1f2937;">${device}</div>
                            <div style="font-size: 14px; color: #6b7280; margin: 5px 0;">${data.impressions.toLocaleString()} impr (${percentage}%)</div>
                            <div style="font-size: 12px; color: #9ca3af;">Pos Prom: ${data.position.toFixed(1)}</div>
                        </div>
                    `;
        }).join('')}
            </div>
        `;
    }

    // Páginas sin datos - CATEGORIZADO
    let pagesWithoutDataHtml = '';
    if (pagesWithoutData.length > 0) {
        // Categorizar
        const mainPages = pagesWithoutData.filter(p =>
            !p.route.includes('/blog/') &&
            !p.route.includes('/barrios/') &&
            !p.route.includes('/ciudades/')
        );
        const blogPages = pagesWithoutData.filter(p => p.route.includes('/blog/'));
        const locationPages = pagesWithoutData.filter(p =>
            p.route.includes('/barrios/') || p.route.includes('/ciudades/')
        );

        pagesWithoutDataHtml = `
            <div style="background-color: #fee2e2; padding: 20px; border-radius: 8px; border-left: 4px solid #dc2626; margin: 20px 0;">
                <h3 style="color: #991b1b; margin-top: 0;">⚠️ PÁGINAS SIN DATOS (${pagesWithoutData.length}/${pages.length})</h3>
                <p style="color: #7f1d1d; font-size: 13px; margin: 5px 0 15px 0;">
                    📎 Ver archivo adjunto <strong>gsc_ai_analysis_prompt.txt</strong> para análisis detallado con IA
                </p>

                ${mainPages.length > 0 ? `
                    <div style="margin-bottom: 15px;">
                        <h4 style="color: #991b1b; margin: 0 0 8px 0; font-size: 14px;">🎯 PÁGINAS PRINCIPALES (Prioridad Alta)</h4>
                        <ul style="margin: 0; padding-left: 20px; color: #991b1b; font-size: 12px;">
                            ${mainPages.slice(0, 5).map(p => `<li><a href="${p.url}" style="color: #991b1b; text-decoration: none;">${p.route}</a> - ${p.title}</li>`).join('')}
                            ${mainPages.length > 5 ? `<li><i>...y ${mainPages.length - 5} más</i></li>` : ''}
                        </ul>
                    </div>
                ` : ''}

                ${blogPages.length > 0 ? `
                    <div style="margin-bottom: 15px;">
                        <h4 style="color: #991b1b; margin: 0 0 8px 0; font-size: 14px;">📝 BLOG POSTS (${blogPages.length})</h4>
                        <ul style="margin: 0; padding-left: 20px; color: #991b1b; font-size: 12px;">
                            ${blogPages.slice(0, 3).map(p => `<li><a href="${p.url}" style="color: #991b1b; text-decoration: none;">${p.route.replace('/blog/', '')}</a></li>`).join('')}
                            ${blogPages.length > 3 ? `<li><i>...y ${blogPages.length - 3} más</i></li>` : ''}
                        </ul>
                    </div>
                ` : ''}

                ${locationPages.length > 0 ? `
                    <div style="margin-bottom: 15px;">
                        <h4 style="color: #991b1b; margin: 0 0 8px 0; font-size: 14px;">🏘️ PÁGINAS DE UBICACIÓN (${locationPages.length})</h4>
                        <p style="margin: 0; padding-left: 20px; color: #7f1d1d; font-size: 12px; font-style: italic;">
                            ${locationPages.length} páginas de barrios/ciudades sin datos
                        </p>
                    </div>
                ` : ''}

                <div style="background-color: #fef3c7; padding: 12px; border-radius: 6px; margin-top: 15px;">
                    <h4 style="color: #78350f; margin: 0 0 8px 0; font-size: 13px;">💡 Tips para mejorar:</h4>
                    <ol style="margin: 0; padding-left: 20px; color: #78350f; font-size: 12px; line-height: 1.6;">
                        <li>Verifica que estén indexadas: <code>site:comparadorinternet.co [ruta]</code> en Google</li>
                        <li>Crea backlinks internos desde páginas que sí rankean</li>
                        <li>Comparte en redes sociales para acelerar indexación</li>
                        <li>Actualiza el sitemap.xml y reenvía en GSC</li>
                        <li>Usa la herramienta de inspección de URL en GSC</li>
                    </ol>
                </div>
            </div>
        `;
    }

    // Tabla completa de todas las keywords
    const allKeywordsHtml = `
        <h3 style="color: #1f2937; margin-top: 30px;">📊 TODAS LAS KEYWORDS (${reportData.length})</h3>
        <table style="width: 100%; border-collapse: collapse; text-align: left; margin: 20px 0;">
            <thead>
                <tr style="background-color: #f3f4f6;">
                    <th style="padding: 12px 8px; font-weight: 600; color: #1f2937;">Keyword</th>
                    <th style="padding: 12px 8px; text-align: center; font-weight: 600; color: #1f2937;">Pos</th>
                    <th style="padding: 12px 8px; text-align: center; font-weight: 600; color: #1f2937;">Impr</th>
                    <th style="padding: 12px 8px; text-align: center; font-weight: 600; color: #1f2937;">Clics</th>
                    <th style="padding: 12px 8px; font-weight: 600; color: #1f2937;">Página</th>
                </tr>
            </thead>
            <tbody>
                ${reportData.map(r => `
                    <tr style="border-bottom: 1px solid #e5e7eb;">
                        <td style="padding: 8px;">${r.keyword}</td>
                        <td style="padding: 8px; text-align: center;"><b>${r.position}</b></td>
                        <td style="padding: 8px; text-align: center;">${r.impressions}</td>
                        <td style="padding: 8px; text-align: center;">${r.clicks}</td>
                        <td style="padding: 8px; font-size: 12px;">
                            <a href="${r.page}" target="_blank" style="color: #2563eb; text-decoration: none;">
                                ${r.page.replace(SITE_URL, '') || '/'}
                            </a>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 900px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #2563eb; margin-bottom: 10px;">🚀 Reporte SEO Mejorado: ComparadorInternet.co</h2>
            <p style="color: #6b7280; font-size: 14px;">Período analizado: últimos 30 días</p>

            ${executiveSummary}
            ${highlightsHtml}
            ${topPerformersHtml}
            ${opportunitiesHtml}
            ${devicesHtml}
            ${pagesWithoutDataHtml}
            ${allKeywordsHtml}

            <div style="margin-top: 30px; padding: 15px; background-color: #f9fafb; border-radius: 8px; text-align: center;">
                <p style="margin: 0; font-size: 12px; color: #6b7280;">
                    Reporte generado automáticamente por GSC Monitor v2<br>
                    💡 Haz clic en cualquier página para visitarla directamente<br>
                    📎 <strong>Archivo adjunto:</strong> gsc_ai_analysis_prompt.txt - Copia y pega su contenido en Claude para análisis detallado
                </p>
            </div>
        </div>
    `;

    try {
        await transporter.sendMail({
            from: `"SEO Monitor Pro" <${process.env.SMTP_USER}>`,
            to: process.env.NOTIFICATION_EMAIL,
            subject: `📈 Reporte SEO: ${reportData.length} keywords | ${totalImpressions} impresiones${comparison ? ` (${comparison.totalKeywordsChange > 0 ? '+' : ''}${comparison.totalKeywordsChange} keywords)` : ''}`,
            html: htmlContent,
            attachments: [
                {
                    filename: 'gsc_ai_analysis_prompt.txt',
                    path: aiPromptPath,
                    contentType: 'text/plain; charset=utf-8'
                }
            ]
        });
        console.log(`✅ Correo enviado exitosamente a: ${process.env.NOTIFICATION_EMAIL}`);
        console.log(`   📎 Archivo adjunto: gsc_ai_analysis_prompt.txt`);
    } catch (error) {
        console.error(`❌ Error enviando correo: ${error.message}`);
    }
}

// ============================================
// FUNCIÓN PRINCIPAL
// ============================================
async function checkGSC() {
    console.log('🚀 Iniciando Google Search Console Monitor v2...\n');

    // 0. ACTUALIZAR INVENTARIO AUTOMÁTICAMENTE
    console.log('📦 Actualizando inventario de páginas...');
    try {
        execSync('node scripts/inventory_metadata.js 2>/dev/null > public/metadata_inventory.json', {
            cwd: path.join(__dirname, '..'),
            stdio: 'pipe'
        });
        console.log('   ✅ Inventario actualizado exitosamente\n');
    } catch (error) {
        console.error('   ⚠️  Error actualizando inventario:', error.message, '\n');
    }

    // 1. Verificar credenciales
    if (!fs.existsSync(KEY_FILE)) {
        console.error(`❌ Error: No se encontró el archivo de credenciales en: ${KEY_FILE}`);
        return;
    }

    // 2. Autenticación
    const auth = new google.auth.GoogleAuth({
        keyFile: KEY_FILE,
        scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
    });

    const searchconsole = google.searchconsole({ version: 'v1', auth });

    // DIAGNÓSTICO AUTOMÁTICO DE PROPIEDAD
    console.log('🕵️‍♀️ Verificando acceso a propiedades en GSC...');
    let activeSiteUrl = SITE_URL;

    try {
        const sitesRes = await searchconsole.sites.list();
        const sites = sitesRes.data.siteEntry || [];

        console.log('   Sitios accesibles para el bot:', sites.length > 0 ? '' : 'NINGUNO');
        sites.forEach(s => console.log(`   - ${s.siteUrl} (${s.permissionLevel})`));

        const match = sites.find(s => s.siteUrl.includes('comparadorinternet.co'));

        if (match) {
            activeSiteUrl = match.siteUrl;
            console.log(`✅ Propiedad detectada y vinculada: ${activeSiteUrl}\n`);
        }
    } catch (err) {
        console.warn('   ⚠️ No se pudo listar sitios, intentando directo URL...');
    }

    // 3. Cargar inventario
    if (!fs.existsSync(INVENTORY_PATH)) {
        console.error('❌ Error: No se encontró metadata_inventory.json');
        return;
    }
    const pages = JSON.parse(fs.readFileSync(INVENTORY_PATH, 'utf8'));

    // Fechas
    const endDate = new Date();
    endDate.setDate(endDate.getDate() - 3);
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 33);

    const dateStringStart = startDate.toISOString().split('T')[0];
    const dateStringEnd = endDate.toISOString().split('T')[0];

    console.log(`📅 Consultando datos del ${dateStringStart} al ${dateStringEnd}...\n`);

    const report = [];

    // Consultar cada página
    for (const page of pages) {
        let pageUrl = `${SITE_URL}${page.route === '/' ? '' : page.route}`;

        console.log(`🔎 Consultando: ${pageUrl}`);

        try {
            const res = await searchconsole.searchanalytics.query({
                siteUrl: activeSiteUrl,
                requestBody: {
                    startDate: dateStringStart,
                    endDate: dateStringEnd,
                    dimensions: ['query'],
                    dimensionFilterGroups: [{
                        filters: [{
                            dimension: 'page',
                            operator: 'EQUALS',
                            expression: pageUrl
                        }]
                    }],
                    rowLimit: 10 // Aumentado a 10
                },
            });

            const rows = res.data.rows || [];

            if (rows.length > 0) {
                console.log(`   ✅ ${rows.length} keywords encontradas`);
                rows.forEach(row => {
                    report.push({
                        page: pageUrl,
                        keyword: row.keys[0],
                        position: parseFloat(row.position.toFixed(1)),
                        clicks: row.clicks,
                        impressions: row.impressions,
                        ctr: row.ctr
                    });
                });
            } else {
                console.log(`   ⚠️  Sin datos`);
            }

        } catch (error) {
            console.error(`   ❌ Error: ${error.message}`);
        }

        await new Promise(r => setTimeout(r, 200));
    }

    // Guardar historial
    if (report.length > 0) {
        saveHistory(report);
    }

    // Análisis avanzado
    console.log('\n📊 Generando análisis avanzado...');
    const comparison = compareWithPrevious(report);
    const devices = await getDeviceBreakdown(searchconsole, activeSiteUrl, dateStringStart, dateStringEnd);
    const opportunities = analyzeOpportunities(report);
    const topPerformers = getTopPerformers(report);
    const pagesWithoutData = getPagesWithoutData(pages, report);

    console.log(`   ✅ Keywords totales: ${report.length}`);
    console.log(`   ✅ Top performers: ${topPerformers.length}`);
    console.log(`   ✅ Oportunidades: ${opportunities.length}`);
    console.log(`   ✅ Páginas sin datos: ${pagesWithoutData.length}`);

    // Guardar CSV
    if (report.length > 0) {
        const csvContent = [
            'Page,Keyword,Position,Clicks,Impressions,CTR',
            ...report.map(r => `${r.page},"${r.keyword}",${r.position},${r.clicks},${r.impressions},${r.ctr}`)
        ].join('\n');

        fs.writeFileSync(path.join(__dirname, '../public/gsc_ranking_report.csv'), csvContent);
        console.log(`\n📄 CSV guardado`);

        // ENVIAR EMAIL MEJORADO
        await sendEnhancedEmailReport(report, comparison, devices, opportunities, topPerformers, pagesWithoutData, pages);

    } else {
        console.log('\n⚠️ No se obtuvieron datos de ranking.');
    }
}

checkGSC();
