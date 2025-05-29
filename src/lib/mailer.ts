// lib/mailer.ts
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function enviarCorreoVerificacion(email: string, codigo: string) {
  const enlace = `http://localhost:3000/verificar?codigo=${codigo}`; // cámbialo en producción

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Verifica tu cuenta en Zhoe Parodi",
    html: `
      <h2>¡Bienvenida a Zhoe Parodi!</h2>
      <p>Gracias por registrarte. Por favor, verifica tu cuenta haciendo clic en el siguiente enlace:</p>
      <a href="${enlace}">Verificar mi cuenta</a>
    `,
  });
}
