import type { APIRoute } from "astro";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    const {
      nombre,
      apellido,
      telefono,
      email,
      ambientes,
      contactoPreferido,
      website // honeypot
    } = body;

    // Anti-spam honeypot
    if (website) {
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    }

    // Validación básica
    if (!nombre || !apellido || !telefono || !email || !ambientes || !contactoPreferido) {
      return new Response(
        JSON.stringify({ error: "Faltan campos obligatorios" }),
        { status: 400 }
      );
    }

    // Email al cliente
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "valen03ort@gmail.com", // CAMBIAR POR EL EMAIL REAL
      subject: "Nuevo presupuesto solicitado",
     html: `
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F3F4F6;padding:30px 0;font-family:Arial,Helvetica,sans-serif;">
  <tr>
    <td align="center">
      <table width="650" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:10px;padding:40px;">
        
        <tr>
          <td align="center" style="padding-bottom:20px;">
            <img src="logo-sisa.webp" alt="Mudanzas SISA" width="180" style="display:block;" />
          </td>
        </tr>

        <tr>
          <td>
            <h2 style="color:#0A2540;margin-bottom:5px;">Nueva solicitud de presupuesto</h2>
            <p style="color:#6B7280;margin-top:0;">Se recibió una nueva consulta desde el sitio web.</p>
          </td>
        </tr>

        <tr>
          <td style="padding-top:25px;">
            <table width="100%" cellpadding="8" cellspacing="0" style="border-collapse:collapse;">
              <tr style="background:#F9FAFB;">
                <td><strong>Nombre</strong></td>
                <td>${nombre} ${apellido}</td>
              </tr>
              <tr>
                <td><strong>Teléfono</strong></td>
                <td>${telefono}</td>
              </tr>
              <tr style="background:#F9FAFB;">
                <td><strong>Email</strong></td>
                <td>${email}</td>
              </tr>
              <tr>
                <td><strong>Ambientes</strong></td>
                <td>${ambientes}</td>
              </tr>
              <tr style="background:#F9FAFB;">
                <td><strong>Contacto preferido</strong></td>
                <td>${contactoPreferido}</td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td style="padding-top:30px;">
            <a href="mailto:${email}" 
               style="background:#1D4ED8;color:#ffffff;padding:12px 20px;text-decoration:none;border-radius:6px;font-weight:bold;display:inline-block;">
               Responder al cliente
            </a>
          </td>
        </tr>

        <tr>
          <td style="padding-top:30px;font-size:12px;color:#9CA3AF;">
            Mensaje generado automáticamente desde el formulario web.
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
`,
    });

    // Email automático al usuario
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "valen03ort@gmail.com",
      subject: "Hemos recibido tu consulta",
     html: `
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F3F4F6;padding:30px 0;font-family:Arial,Helvetica,sans-serif;">
  <tr>
    <td align="center">
      <table width="650" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:10px;padding:40px;text-align:center;">
        
        <!-- LOGO -->
        <tr>
          <td>
            <img src="https://sisatest.vercel.app/logo-sisa.webp" alt="Mudanzas SISA" width="180" style="display:block;margin:0 auto 20px;" />
          </td>
        </tr>

        <!-- HEADER -->
        <tr>
          <td>
            <h1 style="color:#0A2540;margin-bottom:5px;">¡Solicitud recibida!</h1>
            <p style="color:#6B7280;margin-top:0;font-size:16px;">
              Hola ${nombre}, recibimos tu solicitud de presupuesto correctamente.
            </p>
          </td>
        </tr>

        <!-- RESUMEN -->
        <tr>
          <td style="padding:30px 0;">
            <table width="100%" cellpadding="10" cellspacing="0" style="border-collapse:collapse;text-align:left;">
              <tr style="background:#F9FAFB;">
                <td><strong>Nombre</strong></td>
                <td>${nombre} ${apellido}</td>
              </tr>
              <tr>
                <td><strong>Teléfono</strong></td>
                <td>${telefono}</td>
              </tr>
              <tr style="background:#F9FAFB;">
                <td><strong>Email</strong></td>
                <td>${email}</td>
              </tr>
              <tr>
                <td><strong>Ambientes</strong></td>
                <td>${ambientes}</td>
              </tr>
              <tr style="background:#F9FAFB;">
                <td><strong>Contacto preferido</strong></td>
                <td>${contactoPreferido}</td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- MENSAJE -->
        <tr>
          <td style="font-size:16px;color:#374151;">
            En breve uno de nuestros asesores se comunicará contigo.
          </td>
        </tr>

        <!-- BOTÓN PRINCIPAL -->
        <tr>
          <td style="padding:30px 0;">
            <a href="https://sisamudanzas.com"
               style="background:#1D4ED8;color:#ffffff;padding:14px 28px;text-decoration:none;border-radius:6px;font-weight:bold;display:inline-block;">
               Visitar nuestro sitio
            </a>
          </td>
        </tr>

        <!-- MEDIOS DE CONTACTO -->
        <tr>
          <td style="padding-top:10px;">
            <p style="margin:5px 0;">
              📞 <a href="tel:+5491154586060" style="color:#1D4ED8;text-decoration:none;">+54 9 11 5458 6060</a>
            </p>
            <p style="margin:5px 0;">
              💬 <a href="https://wa.me/5491154586060" style="color:#1D4ED8;text-decoration:none;">WhatsApp directo</a>
            </p>
            <p style="margin:5px 0;">
              ✉ <a href="mailto:contacto@mudanzassisa.com" style="color:#1D4ED8;text-decoration:none;">contacto@mudanzassisa.com</a>
            </p>
          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td style="padding-top:30px;font-size:12px;color:#9CA3AF;">
            Mudanzas SISA © ${new Date().getFullYear()} <br/>
            Servicio profesional de mudanzas en Argentina.
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
`,
    });

    console.log("API KEY:", import.meta.env.RESEND_API_KEY);

    return new Response(JSON.stringify({ success: true }), { status: 200 });

  } catch (error) {
    return new Response(JSON.stringify({ error: "Error interno" }), { status: 500 });
  }
};