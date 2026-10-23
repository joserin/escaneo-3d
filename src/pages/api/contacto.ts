import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData();
    const name = data.get('name');
    const email = data.get('email');
    const phone = data.get('phone');
    const company = data.get('company');

    // Aquí llamarías a una API de terceros como Resend (resend.com) o SendGrid
    // Ejemplo con Resend por fetch:
    /*
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer TU_API_KEY_DE_RESEND'
      },
      body: JSON.stringify({
        from: 'no-reply@tudominio.com',
        to: 'proyectos@vector3d.com',
        subject: `Nueva cotización de ${company}`,
        text: `Nombre: ${name}\nCorreo: ${email}\nTeléfono: ${phone}`
      })
    });
    */

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: 'Error al enviar' }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};