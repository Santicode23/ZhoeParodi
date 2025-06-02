import { Order, OrderProductos, Producto } from "@prisma/client";

export type OrderItem = Pick<Producto, 'id' | 'name' | 'precio' | 'foto' > & {
    quantity: number
    subtotal: number
}

export type OrderWithProducts = Order & {
    orderProductos: (OrderProductos & {
        producto: Producto
    })[]
}