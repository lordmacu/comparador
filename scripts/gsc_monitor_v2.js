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
            keywordChanges: []
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
            if (prev) {
                const posChange = prev.position - curr.position; // Positivo = mejora
                if (Math.abs(posChange) >= 2) {
                    comparison.keywordChanges.push({
                        keyword: curr.keyword,
                        page: curr.page,
                        positionChange: posChange,
                        prevPosition: prev.position,
                        currPosition: curr.position
                    });
                }
            }
        });

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
// NUEVA FUNCIÓN: Páginas sin datos
// ============================================
function getPagesWithoutData(pages, report) {
    const pagesWithData = [...new Set(report.map(r => r.page))];
    const pagesWithoutData = pages
        .map(p => `${SITE_URL}${p.route === '/' ? '' : p.route}`)
        .filter(url => !pagesWithData.includes(url));
    return pagesWithoutData.slice(0, 10); // Top 10
}

// ============================================
// EMAIL MEJORADO con análisis
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

    // Páginas sin datos
    let pagesWithoutDataHtml = '';
    if (pagesWithoutData.length > 0) {
        pagesWithoutDataHtml = `
            <div style="background-color: #fee2e2; padding: 15px; border-radius: 8px; border-left: 4px solid #dc2626; margin: 20px 0;">
                <h3 style="color: #991b1b; margin-top: 0;">⚠️ PÁGINAS SIN DATOS (${pagesWithoutData.length}/${pages.length})</h3>
                <p style="color: #7f1d1d; font-size: 13px; margin: 5px 0;">Páginas nuevas o que no están rankeando aún:</p>
                <ul style="margin: 10px 0; padding-left: 20px; color: #991b1b; font-size: 13px;">
                    ${pagesWithoutData.slice(0, 5).map(url => `<li>${url.replace(SITE_URL, '')}</li>`).join('')}
                    ${pagesWithoutData.length > 5 ? `<li><i>...y ${pagesWithoutData.length - 5} más</i></li>` : ''}
                </ul>
                <p style="color: #7f1d1d; font-size: 12px; margin: 10px 0 0 0;">💡 Considera crear backlinks o mejorar el contenido de estas páginas</p>
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
            ${topPerformersHtml}
            ${opportunitiesHtml}
            ${devicesHtml}
            ${pagesWithoutDataHtml}
            ${allKeywordsHtml}

            <div style="margin-top: 30px; padding: 15px; background-color: #f9fafb; border-radius: 8px; text-align: center;">
                <p style="margin: 0; font-size: 12px; color: #6b7280;">
                    Reporte generado automáticamente por GSC Monitor v2<br>
                    💡 Haz clic en cualquier página para visitarla directamente
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
        });
        console.log(`✅ Correo enviado exitosamente a: ${process.env.NOTIFICATION_EMAIL}`);
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
