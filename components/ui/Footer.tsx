"use client"

import Link from "next/link"
import { FaInstagram, FaTiktok } from "react-icons/fa"

export default function Footer() {
  return (
    <footer className="bg-[#99a472] text-sm text-gray-800 py-10 mt-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Sección de links */}
        <div className="space-y-2">
          <h4 className="text-xs font-semibold uppercase">Links</h4>
          <ul className="space-y-1">
            <li><Link href="#">Búsqueda</Link></li>
            <li><Link href="#">Política de privacidad</Link></li>
            <li><Link href="#">Términos del servicio</Link></li>
            <li><Link href="#">Política de envío</Link></li>
            <li><Link href="#">Política de reembolso</Link></li>
            <li><Link href="#">Contáctanos</Link></li>
            <li><Link href="#">Preguntas frecuentes</Link></li>
          </ul>
        </div>

        {/* Sección de newsletter y redes */}
        <div className="space-y-4">
          <h4 className="text-xs font-semibold uppercase">Newsletter</h4>
          <div className="flex flex-col sm:flex-row gap-2 sm:items-center border-b border-gray-800 pb-1">
            <input
              type="email"
              placeholder="Su correo electrónico"
              className="bg-transparent focus:outline-none text-sm placeholder-gray-700 w-full"
            />
            <button className="uppercase text-sm font-semibold">
              Suscribirse
            </button>
          </div>

          {/* Íconos sociales con <a> para evitar hydration error */}
          <div className="flex gap-4 mt-2">
            <a href="https://www.instagram.com/zhoe_parodi/" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="w-4 h-4 text-gray-700 hover:text-black cursor-pointer" />
            </a>
            <a href="https://www.tiktok.com/@zhoeparodi?lang=es-419" target="_blank" rel="noopener noreferrer">
              <FaTiktok className="w-4 h-4 text-gray-700 hover:text-black cursor-pointer" />
            </a>
          </div>
        </div>
      </div>

      {/* Texto legal */}
      <div className="mt-10 text-xs text-center px-4">
        <p>Copyright © 2025, Zhoe Parodi. Todos los derechos reservados.</p>
        <p>Consulta nuestras condiciones de uso y el aviso de privacidad.</p>
      </div>
    </footer>
  )
}
