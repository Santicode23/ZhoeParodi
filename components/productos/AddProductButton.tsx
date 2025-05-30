"use client"

import { Producto } from "@prisma/client"
import { useStore } from "@/src/store"

type AddProductButtonProps = {
  producto: Producto
}

export default function AddProductButton({ producto }: AddProductButtonProps) {
  const addToOrder = useStore((state) => state.addToOrder)

  return (
    <button
      type="button"
      onClick={() => addToOrder(producto)}
      className="w-full mt-4 px-4 py-2 border border-gray-800 text-gray-800 rounded-md hover:bg-gray-800 hover:text-white transition-colors duration-200 text-sm font-medium tracking-wide cursor-pointer"
    >
      Agregar al carrito
    </button>
  )
}
