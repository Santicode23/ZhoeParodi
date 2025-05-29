import { NextResponse } from 'next/server'
import { prisma } from '@/src/lib/prisma'
import { randomBytes } from 'crypto'
import { enviarCorreoRecuperacion } from '@/src/lib/mailerRecuperacion'

export async function POST(req: Request) {
  const { email } = await req.json()

  const usuario = await prisma.usuario.findUnique({ where: { email } })

  if (!usuario) {
    return NextResponse.json({ error: "Correo no registrado" }, { status: 404 })
  }

  const codigo = randomBytes(5).toString('hex')

  await prisma.usuario.update({
    where: { email },
    data: { codigoVerificacion: codigo },
  })

  await enviarCorreoRecuperacion(email, codigo)
  return NextResponse.json({ success: true })
}
