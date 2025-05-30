"use client"
import { useState } from "react"
import { FaBars, FaShoppingCart, FaUserCircle } from "react-icons/fa"
import { useStore } from "@/src/store"
import OrderSummary from "../order/OrderSummary"
import LogoLink from "./Logo"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  // Zustand global store
  const order = useStore((state) => state.order)
  const carritoAbierto = useStore((state) => state.carritoAbierto)
  const toggleCarrito = useStore((state) => state.toggleCarrito)
  const cerrarCarrito = useStore((state) => state.cerrarCarrito)

  const totalProductos = order.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <>
      <header className="bg-white px-6 py-4 shadow-md flex items-center justify-between relative z-50">
        {/* Botón menú móvil */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-700">
            <FaBars size={22} />
          </button>
        </div>

        {/* Logo que recarga al home */}
        <div className="flex-1 flex justify-center md:justify-center">
          <LogoLink />
        </div>

        {/* Íconos */}
        <div className="flex items-center space-x-4 md:ml-auto">
          <button onClick={toggleCarrito} className="relative">
            <FaShoppingCart size={22} className="text-gray-700 hover:text-amber-500" />
            {totalProductos > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full px-1.5 py-0.5">
                {totalProductos}
              </span>
            )}
          </button>
          <FaUserCircle size={22} className="text-gray-700 hover:text-amber-500" />
        </div>
      </header>

      {/* Sidebar del carrito */}
      {carritoAbierto && (
        <div className="fixed top-0 right-0 z-40 w-full sm:w-[400px] h-full bg-white shadow-lg transition-transform">
          <div className="flex justify-end p-4">
            <button onClick={cerrarCarrito} className="text-2xl text-gray-600">
              &times;
            </button>
          </div>
          <OrderSummary />
        </div>
      )}
    </>
  )
}
