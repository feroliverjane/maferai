import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ContactFormData {
  nombre: string;
  empresa: string;
  cargo: string;
  email: string;
  sector: string;
  facturacion: string;
  mensaje: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const formData: ContactFormData = await req.json();

    const emailBody = `
Nuevo mensaje de contacto desde MAFER CAPITAL

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DATOS DEL CONTACTO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Nombre: ${formData.nombre}
Empresa: ${formData.empresa}
Cargo: ${formData.cargo}
Email: ${formData.email}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INFORMACIÓN DEL NEGOCIO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Sector: ${formData.sector}
Facturación objetivo: ${formData.facturacion}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MENSAJE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${formData.mensaje || 'No se proporcionó mensaje adicional.'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Fecha: ${new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' })}
    `;

    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    
    if (!resendApiKey) {
      throw new Error('RESEND_API_KEY no configurada');
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: 'MAFER CAPITAL <contacto@mafer.app>',
        to: ['info@mafer.app'],
        reply_to: formData.email,
        subject: `Nuevo contacto: ${formData.nombre} - ${formData.empresa}`,
        text: emailBody,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Error al enviar email');
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Email enviado correctamente' }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Error desconocido' 
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 500,
      }
    );
  }
});