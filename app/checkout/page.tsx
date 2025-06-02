"use client"
import { OrderSchema } from "@/src/schema"
import { toast } from "react-toastify"
import { useStore } from "@/src/store"
import { useMemo } from "react"
import { createOrder } from "@/actions/create-order-action"
import { formatCurrency } from "@/src/lib/utils"
import Image from "next/image"

export default function CheckoutPage() {
    const order = useStore((state) => state.order)
    const clearOrder = useStore((state) => state.clearOrder)
    const total = useMemo(() => order.reduce((total, item) => total + (item.quantity * item.precio), 0), [order])

    const handleCreateOrder = async (formData: FormData) => {
        const data = {
            name: formData.get('name'),
            total,
            order
        }

        const result = OrderSchema.safeParse(data)
        if (!result.success) {
            result.error.issues.forEach((issue) => {
                toast.error(issue.message)
            })

            return
        }

        const response = await createOrder(data)
        if (response?.errors) {
            response.errors.forEach((issue) => {
                toast.error(issue.message)
            })
        }

        toast.success('Pedido Realizado Correctamente')
        clearOrder()
    }

    return (
        <div className="max-w-4xl mx-auto py-10 px-4 space-y-8">
            <h1 className="text-3xl font-bold text-center">Resumen de tu compra</h1>

            {order.length === 0 ? (
                <p className="text-center text-gray-600">Tu carrito está vacío.</p>
            ) : (
                <>
                    <ul className="space-y-4">
                        {order.map((item) => (
                            <li key={item.id} className="flex items-center gap-4 border-b pb-4">
                                <div className="w-20 h-20 relative">
                                    <Image
                                        src={`/productos/${item.foto}.jpeg`}
                                        alt={`Imagen ${item.name}`}
                                        fill
                                        className="object-cover rounded"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h2 className="font-semibold text-lg">{item.name}</h2>
                                    <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
                                </div>
                                <div className="font-medium">{formatCurrency(item.precio * item.quantity)}</div>
                            </li>
                        ))}
                    </ul>

                    <form
                        className="w-full mt-10 space-y-5"
                        action={handleCreateOrder}
                    >
                        <div className="text-right space-y-2">
                            <p className="text-xl font-semibold">Total: {formatCurrency(total)}</p>
                            <input
                                type="text"
                                placeholder="Tu nombre"
                                className="bg-white border border-gray-100 p-2 w-full"
                                name="name"
                            />
                            <input
                                type="submit"
                                className="py-2 rounded uppercase text-white bg-black w-full text-center font-bold cursor-pointer"
                                value='Confirmar pedido'
                            />
                        </div>
                    </form>

                </>
            )}
        </div>
    )
}
