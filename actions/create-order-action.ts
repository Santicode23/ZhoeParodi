"use server"

import { prisma } from "@/src/lib/prisma"
import { OrderSchema } from "@/src/schema"

export async function createOrder(data: unknown) {
    const result = OrderSchema.safeParse(data)

    if (!result.success) {
        return {
            errors: result.error.issues
        }
    }

    try {
        await prisma.order.create({
            data: {
                name: result.data.name,
                total: result.data.total,
                orderProductos: {
                    create: result.data.order.map(producto => ({
                        productoId: producto.id,
                        cantidad: producto.quantity
                    }))
                }
            }
        })
    } catch (error) {
        console.log(error)
    }
}