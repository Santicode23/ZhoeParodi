import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function enviarCorreoRecuperacion(email: string, codigo: string) {
  const enlace = `http://localhost:3000/recuperar/verificar?codigo=${codigo}`

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Recuperación de contraseña - Zhoe Parodi",
    html: `
      <h2>Recuperar contraseña</h2>
      <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
      <a href="${enlace}">Cambiar contraseña</a>
    `,
  })
}