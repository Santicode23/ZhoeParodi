import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "@/src/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "clave-super-secreta";


export async function POST(req: Request) {
 

  const { email, contrasena } = await req.json();

  // Verifica que vengan los campos
  if (!email || !contrasena) {
    return NextResponse.json({ error: "Email y contraseña requeridos" }, { status: 400 });
  }

  const usuario = await prisma.usuario.findUnique({ where: { email } });

  // Usuario no encontrado
  if (!usuario) {
    return NextResponse.json({ error: "Correo o contraseña incorrectos" }, { status: 401 });
  }

  // Verifica contraseña
  const match = await bcrypt.compare(contrasena, usuario.contrasena);
  if (!match) {
    return NextResponse.json({ error: "Correo o contraseña incorrectos" }, { status: 401 });
  }

  // Verifica si validó su correo
  if (!usuario.correoValidado) {
    return NextResponse.json({ error: "Debes verificar tu correo antes de iniciar sesión" }, { status: 403 });
  }

  // Generar JWT
  const token = jwt.sign(
    { id: usuario.id, email: usuario.email, nombre: usuario.nombre, permisos: usuario.permisos },
    JWT_SECRET,
    { expiresIn: "7d" }
  );



  // Devolver cookie segura con el token
  const response = NextResponse.json({ success: true });

  response.cookies.set({
    name: "token",
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 días
  });

  return response;
}

