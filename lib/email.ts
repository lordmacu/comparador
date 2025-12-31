import nodemailer from 'nodemailer';

// Configuración del transportador SMTP de Gmail
export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true para 465, false para otros puertos
  auth: {
    user: process.env.SMTP_USER, // Tu correo de Gmail
    pass: process.env.SMTP_PASSWORD, // Contraseña de aplicación de Gmail
  },
});

// Verificar configuración del transportador
export async function verifyEmailConfig() {
  try {
    await transporter.verify();
    console.log('✅ Servidor de correo listo para enviar mensajes');
    return true;
  } catch (error) {
    console.error('❌ Error en la configuración de correo:', error);
    return false;
  }
}

// Interfaz para los datos del formulario
export interface CallRequestData {
  phone: string;
  provider?: string; // claro, movistar, etb
  timestamp: string;
  source?: string; // URL de donde vino el formulario
}

// Función para enviar correo de solicitud de llamada
export async function sendCallRequestEmail(data: CallRequestData) {
  const { phone, provider, timestamp, source } = data;

  const mailOptions = {
    from: `"Internet Colombia - Formulario" <${process.env.SMTP_USER}>`,
    to: process.env.NOTIFICATION_EMAIL, // Correo donde recibirás las notificaciones
    subject: `🔔 Nueva solicitud de llamada ${provider ? `- ${provider.toUpperCase()}` : ''}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            border-radius: 10px 10px 0 0;
            text-align: center;
          }
          .content {
            background: #f9f9f9;
            padding: 30px;
            border: 1px solid #ddd;
            border-top: none;
          }
          .info-row {
            background: white;
            padding: 15px;
            margin: 10px 0;
            border-radius: 5px;
            border-left: 4px solid #667eea;
          }
          .label {
            font-weight: bold;
            color: #667eea;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .value {
            font-size: 18px;
            color: #333;
            margin-top: 5px;
          }
          .phone {
            font-size: 24px;
            font-weight: bold;
            color: #2ecc71;
          }
          .footer {
            text-align: center;
            margin-top: 20px;
            padding: 20px;
            color: #666;
            font-size: 12px;
          }
          .badge {
            display: inline-block;
            padding: 5px 10px;
            background: #667eea;
            color: white;
            border-radius: 15px;
            font-size: 12px;
            font-weight: bold;
            text-transform: uppercase;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1 style="margin: 0;">📞 Nueva Solicitud de Llamada</h1>
          ${provider ? `<p style="margin: 10px 0 0 0;"><span class="badge">${provider}</span></p>` : ''}
        </div>

        <div class="content">
          <div class="info-row">
            <div class="label">Número de Teléfono</div>
            <div class="value phone">${phone}</div>
          </div>

          <div class="info-row">
            <div class="label">Proveedor de Interés</div>
            <div class="value">${provider ? provider.toUpperCase() : 'No especificado'}</div>
          </div>

          <div class="info-row">
            <div class="label">Fecha y Hora</div>
            <div class="value">${new Date(timestamp).toLocaleString('es-CO', {
              timeZone: 'America/Bogota',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}</div>
          </div>

          ${source ? `
          <div class="info-row">
            <div class="label">Página de Origen</div>
            <div class="value">${source}</div>
          </div>
          ` : ''}
        </div>

        <div class="footer">
          <p>Este correo fue generado automáticamente por el sistema de formularios de Internet Colombia.</p>
          <p style="margin-top: 10px; color: #999;">Timestamp: ${timestamp}</p>
        </div>
      </body>
      </html>
    `,
    text: `
Nueva solicitud de llamada

Teléfono: ${phone}
Proveedor: ${provider || 'No especificado'}
Fecha: ${new Date(timestamp).toLocaleString('es-CO', { timeZone: 'America/Bogota' })}
${source ? `Página: ${source}` : ''}

---
Internet Colombia - Sistema de Formularios
    `.trim(),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Correo enviado:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error al enviar correo:', error);
    throw error;
  }
}
