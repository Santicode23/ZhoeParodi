import { NextResponse } from 'next/server'
import { prisma } from '@/src/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
  const { codigo, contrasena } = await req.json()

  const usuario = await prisma.usuario.findFirst({
    where: { codigoVerificacion: codigo }
  })

  if (!usuario) {
    return NextResponse.json({ error: "Código inválido" }, { status: 400 })
  }

  const hash = await bcrypt.hash(contrasena, 10)

  await prisma.usuario.update({
    where: { id: usuario.id },
    data: {
      contrasena: hash,
      codigoVerificacion: null
    }
  })

  return NextResponse.json({ success: true })
}
