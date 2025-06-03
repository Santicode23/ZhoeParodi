"use client"

import { useEffect, useState } from "react"
import { FaBars, FaShoppingCart, FaUserCircle } from "react-icons/fa"
import { useStore } from "@/src/store"
import OrderSummary from "../order/OrderSummary"
import LogoLink from "./Logo"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const order = useStore((state) => state.order)
  const carritoAbierto = useStore((state) => state.carritoAbierto)
  const toggleCarrito = useStore((state) => state.toggleCarrito)
  const cerrarCarrito = useStore((state) => state.cerrarCarrito)

  const totalProductos = order.reduce((acc, item) => acc + item.quantity, 0)

  useEffect(() => {
    if (carritoAbierto) {
      document.body.classList.add("overflow-hidden")
    } else {
      document.body.classList.remove("overflow-hidden")
    }
  }, [carritoAbierto])

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).id === "overlay") {
      cerrarCarrito()
    }
  }

  return (
    <>
      {/* Barra roja fija superior */}
      <div className="bg-red-600 text-white text-sm text-center py-2 z-50 relative">
        Envío nacional GRATIS en compras mayores a $1,199 MXN
      </div>

      {/* Nav horizontal (oculto si carrito abierto) */}
      {!carritoAbierto && (
        <nav className="hidden md:flex justify-center space-x-10 py-4 text-sm font-semibold border-b bg-white sticky top-0 z-40 shadow-sm">
          <Link href="#" className="hover:text-amber-500">Colecciones</Link>
          <Link href="#" className="hover:text-amber-500">Categorías</Link>
          <Link href="#" className="hover:text-amber-500">Nuevos lanzamientos</Link>
          <Link href="#" className="hover:text-amber-500">Contacto</Link>
        </nav>
      )}

      {/* Header principal */}
      <header className="bg-white px-6 py-4 shadow-md flex items-center justify-between relative z-50">
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-700">
            <FaBars size={22} />
          </button>
        </div>

        <div className="flex-1 flex justify-center md:justify-center">
          <LogoLink />
        </div>

        <div className="flex items-center space-x-4 md:ml-auto">
          <button onClick={toggleCarrito} className="relative">
            <FaShoppingCart size={22} className="text-gray-700 hover:text-amber-500" />
            {totalProductos > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full px-1.5 py-0.5">
                {totalProductos}
              </span>
            )}
          </button>
          <Link href="/login">
            <FaUserCircle size={22} className="text-gray-700 hover:text-amber-500" />
          </Link>
        </div>
      </header>

      {/* Menú móvil */}
      {menuOpen && (
        <nav className="md:hidden bg-white border-b text-sm font-semibold px-6 py-4 space-y-2 z-40 relative">
          <Link href="#" className="block hover:text-amber-500">Colecciones</Link>
          <Link href="#" className="block hover:text-amber-500">Categorías</Link>
          <Link href="#" className="block hover:text-amber-500">Nuevos lanzamientos</Link>
          <Link href="#" className="block hover:text-amber-500">Contacto</Link>
        </nav>
      )}

      {/* Carrito: overlay + panel animado */}
      <AnimatePresence>
        {carritoAbierto && (
          <motion.div
            id="overlay"
            onClick={handleOverlayClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/50 flex justify-end"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-full sm:w-[400px] h-full bg-white shadow-lg"
            >
              <div className="flex justify-end p-4">
                <button onClick={cerrarCarrito} className="text-2xl text-gray-600">
                  &times;
                </button>
              </div>
              <OrderSummary />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
