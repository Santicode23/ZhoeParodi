import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "clave-super-secreta";

export async function GET(req: NextRequest) {
  // 1. Obtener token desde las cookies
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    // 2. Verificar el token
    const decoded = jwt.verify(token, JWT_SECRET);

    // 3. Retornar el usuario (ya viene con nombre, email, permisos, etc.)
    return NextResponse.json({ user: decoded });
  } catch (err) {
    return NextResponse.json({ error: "Token inválido" }, { status: 401 });
  }
}
