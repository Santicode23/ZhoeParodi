import { XCircleIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline"
import { OrderItem } from "@/src/types"
import { formatCurrency } from "@/src/lib/utils"
import { useStore } from "@/src/store"
import { useMemo } from "react"

type ProductDetailsProps = {
  item: OrderItem
}

export default function ProductDetails({ item }: ProductDetailsProps) {
  const increaseQuantity = useStore((state) => state.increaseQuantity)
  const decreaseQuantity = useStore((state) => state.decreaseQuantity)
  const removeItem = useStore((state) => state.removeItem)

  const disableDecreaseButton = useMemo(() => item.quantity === 1, [item])

  return (
    <div className="border rounded-md p-5 bg-white shadow-sm space-y-4">
      {/* Título y botón eliminar */}
      <div className="flex justify-between items-start">
        <h3 className="text-base md:text-lg font-semibold text-gray-800 uppercase tracking-wide leading-snug">
          {item.name}
        </h3>
        <button
          type="button"
          onClick={() => removeItem(item.id)}
          className="text-red-600 hover:text-red-800 transition"
        >
          <XCircleIcon className="h-6 w-6" />
        </button>
      </div>

      {/* Precio individual */}
      <p className="text-xl font-bold text-amber-500">
        {formatCurrency(item.precio)}
      </p>

      {/* Controles de cantidad */}
      <div className="flex items-center gap-5 px-4 py-2 bg-gray-100 rounded-md w-fit">
        <button
          type="button"
          onClick={() => decreaseQuantity(item.id)}
          disabled={disableDecreaseButton}
          className="disabled:opacity-30 hover:text-red-500"
        >
          <MinusIcon className="h-5 w-5" />
        </button>

        <span className="text-lg font-semibold text-gray-700">{item.quantity}</span>

        <button
          type="button"
          onClick={() => increaseQuantity(item.id)}
          className="hover:text-green-600"
        >
          <PlusIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Subtotal */}
      <p className="text-sm text-gray-600">
        Subtotal:{" "}
        <span className="font-semibold text-gray-800">
          {formatCurrency(item.subtotal)}
        </span>
      </p>
    </div>
  )
}
