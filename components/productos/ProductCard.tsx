import { formatCurrency, getImagePath } from "@/src/lib/utils"
import { Producto } from "@prisma/client"
import Image from "next/image"
import AddProductButton from "./AddProductButton"

type ProductCardProps = {
    producto: Producto
}

export default function ProductCard({producto} : ProductCardProps) {

    const imagePath = getImagePath(producto.foto)

    return (
        <div className="border bg-white">

            <Image
                width={400}
                height={400}
                src={imagePath}
                alt={`Imagen joyas ${producto.name}`}
                quality={90}
            />

            <div className="p-5">
                <h3 className="text-2xl font-bold">{producto.name}</h3>
                <p className="mt-5 font-black text-4xl text-amber-500">
                    { formatCurrency (producto.precio)}
                </p>
                <AddProductButton 
                    producto={producto}
                />
            </div>
        </div>
    )
}