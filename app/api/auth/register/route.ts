import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"; // ✅ usa bcryptjs, más compatible
import { randomBytes } from "crypto";
import { enviarCorreoVerificacion } from "@/src/lib/mailer";
import { prisma } from "@/src/lib/prisma"; // ruta relativa ajustada


export async function POST(req: Request) {
  const { nombreUsuario, nombre, edad, email, contrasena } = await req.json();

  if (!nombreUsuario || !nombre || !edad || !email || !contrasena) {
    return NextResponse.json({ error: "Todos los campos son obligatorios" }, { status: 400 });
  }

  const existente = await prisma.usuario.findUnique({ where: { email } });
  if (existente) {
    return NextResponse.json({ error: "Este correo ya está registrado" }, { status: 400 });
  }

  const hash = await bcrypt.hash(contrasena, 10);
  const codigo = randomBytes(5).toString("hex");

  await prisma.usuario.create({
    data: {
      nombreUsuario,
      nombre,
      edad: Number(edad),
      email,
      contrasena: hash,
      codigoVerificacion: codigo,
      correoValidado: false,
      permisos: "0" 
    },
  });

  await enviarCorreoVerificacion(email, codigo);

  return NextResponse.json({ message: "Registro exitoso. Revisa tu correo para verificar tu cuenta." });
}
