import { NextRequest, NextResponse } from 'next/server';
import { sendCallRequestEmail, type CallRequestData } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    // Parsear el cuerpo de la solicitud
    const body = await request.json();
    const { phone, provider } = body;

    // Validar el número de teléfono
    if (!phone || typeof phone !== 'string') {
      return NextResponse.json(
        { error: 'Número de teléfono requerido' },
        { status: 400 }
      );
    }

    // Validar formato de teléfono colombiano (10 dígitos)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { error: 'Número de teléfono inválido. Debe tener 10 dígitos.' },
        { status: 400 }
      );
    }

    // Preparar datos para el correo
    const emailData: CallRequestData = {
      phone,
      provider: provider || undefined,
      timestamp: new Date().toISOString(),
      source: request.headers.get('referer') || undefined,
    };

    // Verificar que las variables de entorno estén configuradas
    if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD || !process.env.NOTIFICATION_EMAIL) {
      console.error('❌ Variables de entorno SMTP no configuradas');
      return NextResponse.json(
        { error: 'Servicio de correo no configurado' },
        { status: 500 }
      );
    }

    // Enviar el correo
    const result = await sendCallRequestEmail(emailData);

    // Registrar en consola (útil para debugging)
    console.log('📞 Nueva solicitud de llamada:', {
      phone,
      provider,
      timestamp: emailData.timestamp,
    });

    // Responder con éxito
    return NextResponse.json(
      {
        success: true,
        message: 'Solicitud recibida. Te llamaremos pronto.',
        messageId: result.messageId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Error en API call-request:', error);

    // Manejar errores específicos de nodemailer
    if (error instanceof Error) {
      return NextResponse.json(
        {
          error: 'Error al procesar la solicitud',
          details: process.env.NODE_ENV === 'development' ? error.message : undefined,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

// Endpoint GET para verificación de salud
export async function GET() {
  return NextResponse.json(
    {
      status: 'ok',
      message: 'Call request API endpoint is running',
      timestamp: new Date().toISOString(),
    },
    { status: 200 }
  );
}
