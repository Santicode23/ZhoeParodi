import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma"; // ruta relativa

export async function POST(req: Request) {
  const { codigo } = await req.json();

  const usuario = await prisma.usuario.findFirst({
    where: { codigoVerificacion: codigo },
  });

  if (!usuario) {
    return NextResponse.json({ error: "Código no válido" }, { status: 400 });
  }

  await prisma.usuario.update({
    where: { id: usuario.id },
    data: {
      correoValidado: true,
      codigoVerificacion: null,
    },
  });

  return NextResponse.json({ success: true });
}
