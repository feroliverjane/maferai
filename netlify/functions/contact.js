exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Método no permitido' }),
    };
  }

  try {
    const data = JSON.parse(event.body);

    if (data.botField) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true }),
      };
    }

    if (!data.name || !data.workEmail || !data.message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Por favor completa los campos requeridos: Nombre, Email corporativo y Mensaje' }),
      };
    }

    const emailHtml = `
      <h2>Nuevo contacto desde MAFER CAPITAL</h2>
      <table style="border-collapse: collapse; width: 100%; max-width: 600px; font-family: Arial, sans-serif;">
        <tr style="background-color: #f3f4f6;">
          <td style="padding: 12px; border: 1px solid #e5e7eb; font-weight: bold;">Nombre</td>
          <td style="padding: 12px; border: 1px solid #e5e7eb;">${data.name || ''}</td>
        </tr>
        <tr>
          <td style="padding: 12px; border: 1px solid #e5e7eb; font-weight: bold;">Empresa</td>
          <td style="padding: 12px; border: 1px solid #e5e7eb;">${data.company || ''}</td>
        </tr>
        <tr style="background-color: #f3f4f6;">
          <td style="padding: 12px; border: 1px solid #e5e7eb; font-weight: bold;">Cargo</td>
          <td style="padding: 12px; border: 1px solid #e5e7eb;">${data.title || ''}</td>
        </tr>
        <tr>
          <td style="padding: 12px; border: 1px solid #e5e7eb; font-weight: bold;">Email corporativo</td>
          <td style="padding: 12px; border: 1px solid #e5e7eb;">${data.workEmail || ''}</td>
        </tr>
        <tr style="background-color: #f3f4f6;">
          <td style="padding: 12px; border: 1px solid #e5e7eb; font-weight: bold;">Sector</td>
          <td style="padding: 12px; border: 1px solid #e5e7eb;">${data.sector || ''}</td>
        </tr>
        <tr>
          <td style="padding: 12px; border: 1px solid #e5e7eb; font-weight: bold;">Facturación objetivo</td>
          <td style="padding: 12px; border: 1px solid #e5e7eb;">${data.revenueTarget || ''}</td>
        </tr>
        <tr style="background-color: #f3f4f6;">
          <td style="padding: 12px; border: 1px solid #e5e7eb; font-weight: bold; vertical-align: top;">Mensaje</td>
          <td style="padding: 12px; border: 1px solid #e5e7eb; white-space: pre-wrap;">${data.message || ''}</td>
        </tr>
      </table>
      <p style="margin-top: 20px; color: #6b7280; font-size: 14px;">
        Este mensaje fue enviado desde el formulario de contacto de MAFER CAPITAL
      </p>
    `;

    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      throw new Error('RESEND_API_KEY no configurada');
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: 'MAFER AI Contact Form <onboarding@resend.dev>',
        to: ['fernando@mafer.app'],
        reply_to: data.workEmail,
        subject: `Nuevo lead: ${data.name} · ${data.company || 'Sin empresa'}`,
        html: emailHtml,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Error al enviar el email');
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, message: 'Email enviado correctamente' }),
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message || 'Error al procesar la solicitud' }),
    };
  }
};
