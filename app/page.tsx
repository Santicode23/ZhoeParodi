"use client"
import OrderSidebar from "@/components/order/OrderSidebar";
import Header from "@/components/ui/Header";
import { Producto } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home({ producto }: { producto?: Producto }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-white text-gray-800">
      {/* Barra roja superior */}
      <div className="bg-red-600 text-white text-sm text-center py-2">
        Envío nacional GRATIS en compras mayores a $1,199 MXN
      </div>

      <Header />

      {/* Navegación horizontal en pantallas grandes */}
      <nav className="hidden md:flex justify-center space-x-10 py-4 text-sm font-semibold border-b bg-white sticky top-0 z-50 shadow-sm">
        <Link href="#" className="hover:text-amber-500">Colecciones</Link>
        <Link href="#" className="hover:text-amber-500">Categorías</Link>
        <Link href="#" className="hover:text-amber-500">Nuevos lanzamientos</Link>
        <Link href="#" className="hover:text-amber-500">Contacto</Link>
      </nav>

      {/* Navegación desplegable en móvil */}
      {menuOpen && (
        <nav className="md:hidden bg-white border-b text-sm font-semibold px-6 py-4 space-y-2">
          <Link href="#" className="block hover:text-amber-500">Colecciones</Link>
          <Link href="#" className="block hover:text-amber-500">Categorías</Link>
          <Link href="#" className="block hover:text-amber-500">Nuevos lanzamientos</Link>
          <Link href="#" className="block hover:text-amber-500">Contacto</Link>
        </nav>
      )}

      {/* Banner de imagen tipo hero */}
      <section className="relative w-full h-[380px]">
        <Image
          src="/IMG_0933.JPG"
          alt="Zhoe Parodi promocion"
          fill
          className="object-cover"
          priority
        />
      </section>

      {/* Texto promocional */}
      <section className="py-6 text-center">
        <h2 className="text-4xl font-bold text-gray-800">HOT SALE 25% OFF</h2>
        <p className="text-lg text-gray-600 mt-2">Aprovecha nuestras promociones</p>
      </section>

      <section className="py-6 text-center">
        <OrderSidebar />
        <h2 className="text-4xl font-bold text-gray-800">PRODUCTOS PRINCIPALES</h2>
      </section>

      {/* Footer */}
      <footer className="bg-indigo-900 text-white py-6">
        <div className="text-center">
          <p>&copy; 2025 Zhoe Parodi. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
