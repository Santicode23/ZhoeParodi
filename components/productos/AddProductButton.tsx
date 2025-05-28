"use client"

import { Producto } from "@prisma/client"
import { useStore } from "@/src/store"

type AddProductButtonProps = {
    producto: Producto
}

export default function AddProductButton({producto}: AddProductButtonProps) {
    const addToOrder = useStore((state) => state.addToOrder)
    return (
        <button
            type="button"
            className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
            onClick={() => addToOrder(producto)}
        >Agregar</button>
    )
}