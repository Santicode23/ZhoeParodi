import { create } from "zustand"
import { OrderItem } from "./types"
import { Producto } from "@prisma/client"

interface Store {
  order: OrderItem[]
  carritoAbierto: boolean
  addToOrder: (producto: Producto) => void
  increaseQuantity: (id: Producto['id']) => void
  decreaseQuantity: (id: Producto['id']) => void
  removeItem: (id: Producto['id']) => void
  clearOrder: () => void
  toggleCarrito: () => void
  cerrarCarrito: () => void
}

export const useStore = create<Store>((set, get) => ({
  order: [],
  carritoAbierto: false,

  toggleCarrito: () =>
    set((state) => ({ carritoAbierto: !state.carritoAbierto })),
  cerrarCarrito: () => set(() => ({ carritoAbierto: false })),

  addToOrder: (producto) => {
    const { categoriaId, foto, ...data } = producto
    let order: OrderItem[] = []

    if (get().order.find((item) => item.id === producto.id)) {
      order = get().order.map((item) =>
        item.id === producto.id
          ? {
              ...item,
              quantity: item.quantity + 1,
              subtotal: item.precio * (item.quantity + 1),
            }
          : item
      )
    } else {
      order = [
        ...get().order,
        {
          ...data,
          quantity: 1,
          subtotal: 1 * producto.precio,
        },
      ]
    }

    set(() => ({
      order,
    }))
  },

  increaseQuantity: (id) => {
    set((state) => ({
      order: state.order.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
              subtotal: item.precio * (item.quantity + 1),
            }
          : item
      ),
    }))
  },

  decreaseQuantity: (id) => {
    const order = get().order.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: item.quantity - 1,
            subtotal: item.precio * (item.quantity - 1),
          }
        : item
    )

    set(() => ({
      order,
    }))
  },

  removeItem: (id) => {
    set((state) => ({
      order: state.order.filter((item) => item.id !== id),
    }))
  },

  clearOrder: () => {
    set(() => ({
      order: [],
    }))
  },
}))
