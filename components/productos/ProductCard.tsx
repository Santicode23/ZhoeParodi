import { formatCurrency, getImagePath } from "@/src/lib/utils"
import { Producto } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import AddProductButton from "./AddProductButton"

type ProductCardProps = {
  producto: Producto
}

export default function ProductCard({ producto }: ProductCardProps) {
  const imagePath = getImagePath(producto.foto)

  // Simulación visual de descuento para estilo (puedes cambiar esto luego)
  const precioOriginal = producto.precio + 200

  return (
    <div className="relative border rounded-md shadow-sm bg-white overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Etiqueta de descuento */}
      <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded z-10">
        -${(precioOriginal - producto.precio).toFixed(2)}
      </span>

      {/* Imagen cliqueable */}
      <Link href={`/order/${producto.categoriaId}/details/${producto.id}`}>
        <div className="w-full aspect-[3/4] bg-gray-100">
          <Image
            width={400}
            height={400}
            src={imagePath}
            alt={`Imagen joyas ${producto.name}`}
            quality={90}
            className="object-cover w-full h-full"
          />
        </div>
      </Link>

      {/* Info producto */}
      <div className="p-5 space-y-3">
        <h3 className="text-sm font-semibold text-gray-800 uppercase leading-tight">
          {producto.name}
        </h3>

        {/* Precios */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400 line-through">
            {formatCurrency(precioOriginal)}
          </span>
          <span className="text-lg text-red-600 font-bold">
            {formatCurrency(producto.precio)}
          </span>
        </div>

        {/* Botón agregar */}
        <AddProductButton producto={producto} />
      </div>
    </div>
  )
}
