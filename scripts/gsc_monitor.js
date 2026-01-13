const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');
const nodemailer = require('nodemailer');

// Cargar variables de entorno (intentar .env.local, luego .env)
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });
if (!process.env.SMTP_USER) {
    require('dotenv').config({ path: path.join(__dirname, '../.env') });
}

// CONFIGURACIÓN
const SITE_URL = 'https://comparadorinternet.co'; 
const KEY_FILE = process.env.GOOGLE_APPLICATION_CREDENTIALS || path.join(__dirname, '../service-account-key.json');
const INVENTORY_PATH = path.join(__dirname, '../public/metadata_inventory.json');

// Función de envío de email
async function sendEmailReport(reportData) {
    if (!reportData || reportData.length === 0) {
        console.log('📧 No hay datos nuevos para reportar por correo.');
        return;
    }

    if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD || !process.env.NOTIFICATION_EMAIL) {
        console.warn('⚠️ Faltan credenciales SMTP (SMTP_USER, SMTP_PASSWORD, NOTIFICATION_EMAIL) en .env.local. No se envió el correo.');
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

    // Construir HTML del correo
    const rowsHtml = reportData.map(r => `
        <tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${r.keyword}</td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: center;"><b>${r.position}</b></td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: center;">${r.impressions}</td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: center;">${r.clicks}</td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd; font-size: 0.8em;">
                <a href="${r.page}" target="_blank" style="color: #2563eb; text-decoration: none;">
                    ${r.page.replace(SITE_URL, '') || '/'}
                </a>
            </td>
        </tr>
    `).join('');

    const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto;">
            <h2 style="color: #2563eb;">🚀 Reporte SEO Semanal: ComparadorInternet.co</h2>
            <p style="color: #374151; line-height: 1.6;">
                Hola, aquí están las palabras clave posicionadas en Google Search Console recientemente:
            </p>

            <table style="width: 100%; border-collapse: collapse; text-align: left; margin: 20px 0;">
                <thead>
                    <tr style="background-color: #f3f4f6;">
                        <th style="padding: 12px 8px; font-weight: 600; color: #1f2937;">Keyword</th>
                        <th style="padding: 12px 8px; text-align: center; font-weight: 600; color: #1f2937;">Posición</th>
                        <th style="padding: 12px 8px; text-align: center; font-weight: 600; color: #1f2937;">Impresiones</th>
                        <th style="padding: 12px 8px; text-align: center; font-weight: 600; color: #1f2937;">Clics</th>
                        <th style="padding: 12px 8px; font-weight: 600; color: #1f2937;">Página</th>
                    </tr>
                </thead>
                <tbody>
                    ${rowsHtml}
                </tbody>
            </table>

            <div style="margin-top: 30px; padding: 15px; background-color: #f9fafb; border-left: 4px solid #2563eb; border-radius: 4px;">
                <p style="margin: 0; font-size: 0.9em; color: #666;">
                    <strong>📊 Resumen:</strong><br>
                    Total palabras clave encontradas: <strong>${reportData.length}</strong><br>
                    Reporte generado automáticamente por tu Script de Monitoreo.
                </p>
            </div>

            <p style="margin-top: 20px; font-size: 0.85em; color: #9ca3af; text-align: center;">
                💡 Haz clic en cualquier página para visitarla directamente en tu sitio web.
            </p>
        </div>
    `;

    try {
        await transporter.sendMail({
            from: `"SEO Monitor" <${process.env.SMTP_USER}>`,
            to: process.env.NOTIFICATION_EMAIL,
            subject: `📈 Reporte SEO: ${reportData.length} keywords posicionadas`,
            html: htmlContent,
        });
        console.log(`✅ Correo enviado exitosamente a: ${process.env.NOTIFICATION_EMAIL}`);
    } catch (error) {
        console.error(`❌ Error enviando correo: ${error.message}`);
    }
}

async function checkGSC() {
    console.log('🚀 Iniciando conexión con Google Search Console API...\n');

    // 1. Verificar credenciales
    if (!fs.existsSync(KEY_FILE)) {
        console.error(`❌ Error: No se encontró el archivo de credenciales en: ${KEY_FILE}`);
        console.error('   Debes crear una Service Account en Google Cloud, descargar el JSON y guardarlo como service-account-key.json en la raíz.');
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

        // Buscar coincidencia inteligente
        const match = sites.find(s => s.siteUrl.includes('comparadorinternet.co'));
        
        if (match) {
            activeSiteUrl = match.siteUrl;
            console.log(`✅ Propiedad detectada y vinculada: ${activeSiteUrl}\n`);
        } else {
            console.error('\n❌ CRÍTICO: El bot se autenticó pero NO ve tu sitio en su lista.');
            console.error('   Verifica que agregaste el correo a la propiedad correcta.');
            console.error('   Bot email: seo-bot@comparador-seo.iam.gserviceaccount.com\n');
            // No detenemos el script por si acaso, pero avisamos
        }

    } catch (err) {
        console.warn('   ⚠️ No se pudo listar sitios (posiblemente falta permiso global), intentando directo URL...');
    }

    // 3. Cargar inventario para saber qué páginas nos interesan
    if (!fs.existsSync(INVENTORY_PATH)) {
        console.error('❌ Error: No se encontró public/metadata_inventory.json. Ejecuta primero inventory_metadata.js');
        return;
    }
    const pages = JSON.parse(fs.readFileSync(INVENTORY_PATH, 'utf8'));
    
    // Fecha: GSC tiene un retraso de ~2-3 días. Pedimos datos de hace 3 días a hace 1 mes.
    const endDate = new Date(); 
    endDate.setDate(endDate.getDate() - 3); // GSC data is not real-time
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 33);

    const dateStringStart = startDate.toISOString().split('T')[0];
    const dateStringEnd = endDate.toISOString().split('T')[0];

    console.log(`📅 Consultando datos del ${dateStringStart} al ${dateStringEnd}...\n`);

    const report = [];

    for (const page of pages) {
        // Normalizar URL (asegurar trailing slash si tu GSC lo usa, o no)
        let pageUrl = `${SITE_URL}${page.route === '/' ? '' : page.route}`;
        // GSC a veces es quisquilloso con las barras al final, verifica cómo está tu propiedad.
        // Si page.route no empieza con /, agregarlo (aunque en el JSON suele estar bien)
        
        console.log(`🔎 Consultando: ${pageUrl}`);

        try {
            const res = await searchconsole.searchanalytics.query({
                siteUrl: activeSiteUrl,
                requestBody: {
                    startDate: dateStringStart,
                    endDate: dateStringEnd,
                    dimensions: ['query'], // Queremos ver por qué palabras clave aparecemos
                    dimensionFilterGroups: [
                        {
                            filters: [
                                {
                                    dimension: 'page',
                                    operator: 'EQUALS',
                                    expression: pageUrl
                                }
                            ]
                        }
                    ],
                    rowLimit: 5 // Top 5 palabras clave por página
                },
            });

            const rows = res.data.rows || [];

            if (rows.length > 0) {
                console.log(`   ✅ Datos encontrados:`);
                rows.forEach(row => {
                    const query = row.keys[0];
                    const position = row.position.toFixed(1);
                    const clicks = row.clicks;
                    const impressions = row.impressions;
                    console.log(`      🔹 "${query}" -> Posición: ${position} | Clics: ${clicks} | Impr: ${impressions}`);
                    
                    report.push({
                        page: pageUrl,
                        keyword: query,
                        position: parseFloat(position),
                        clicks: clicks,
                        impressions: impressions,
                        ctr: row.ctr
                    });
                });
            } else {
                console.log(`   ⚠️  Sin datos recientes para esta página.`);
            }

        } catch (error) {
            console.error(`   ❌ Error GSC: ${error.message}`);
            if (error.message.includes('User does not have sufficient permissions')) {
                console.error('      ---> ¿Agregaste el email de la Service Account como usuario en Search Console?');
                process.exit(1); 
            }
        }
        
        // Evitar Rate Limiting
        await new Promise(r => setTimeout(r, 200));
    }

    // Guardar Reporte CSV
    if (report.length > 0) {
        const csvContent = [
            'Page,Keyword,Position,Clicks,Impressions,CTR',
            ...report.map(r => `${r.page},"${r.keyword}",${r.position},${r.clicks},${r.impressions},${r.ctr}`)
        ].join('\n');
        
        const outputPath = path.join(__dirname, '../public/gsc_ranking_report.csv');
        fs.writeFileSync(outputPath, csvContent);
        console.log(`\n📄 Reporte guardado en: ${outputPath}`);

        // ENVIAR CORREO
        await sendEmailReport(report);

    } else {
        console.log('\n⚠️ No se obtuvieron datos de ranking. Verifica si el sitio es nuevo o las fechas.');
    }
}

checkGSC();
