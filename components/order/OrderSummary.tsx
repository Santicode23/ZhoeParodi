"use client"
import { useStore } from "@/src/store"
import ProductDetails from "./ProductDetails"
import { useMemo } from "react"
import { formatCurrency } from "@/src/lib/utils"
import Link from "next/link"

export default function OrderSummary() {
    const order = useStore((state) => state.order)
    const total = useMemo(() => order.reduce((total, item) => total + (item.quantity * item.precio), 0), [order])
    return (
        <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
            <h1 className="text-4xl text-center font-black">Mi Pedido</h1>

            {order.length === 0 ? <p className="text-center my-10">El carrito esta vacio</p> : (
                <div className="mt-5">
                    {order.map(item => (
                        <ProductDetails
                            key={item.id}
                            item={item}
                        />
                    ))}

                    <p className="text-2xl mt-20 text-center">
                        Total a pagar: {''}
                        <span className="font-bold">{formatCurrency(total)}</span>
                    </p>
                        <Link
                            href="/checkout"
                            className="block text-center bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded transition mt-4"
                        >
                            Finalizar compra
                        </Link>
                </div>
            )}
        </aside>
    )
}