import AddProductButton from "@/components/productos/AddProductButton"
import GoBackButton from "@/components/ui/GoBackButton"
import { prisma } from "@/src/lib/prisma"
import { getImagePath } from "@/src/lib/utils"
import { ClockIcon, PaperAirplaneIcon, BeakerIcon, CheckBadgeIcon, LockClosedIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import { notFound } from "next/navigation"

async function getProducto(id: number) {
    return await prisma.producto.findUnique({
        where: { id },
    })
}

export default async function ProductDetailPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const producto = await getProducto(Number(id))

    if (!producto) return notFound()

    const imagePath = getImagePath(producto.foto)

    return (
        <div className="max-w-7xl mx-auto py-10 px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Imagen producto */}
            <div className="flex flex-col gap-4">
                <Image
                    src={imagePath}
                    alt={`Imagen joyas ${producto.name}`}
                    width={600}
                    height={600}
                    className="rounded-lg object-cover border"
                />
                {/* Miniaturas futuras aquí */}
            </div>

            {/* Info producto */}
            <div className="space-y-5">
                
                <h1 className="text-3xl font-bold">{producto.name}</h1>

                {/* Precios */}
                <div className="flex items-baseline gap-4">
                    <span className="text-gray-400 line-through text-xl">${producto.precio + 200}</span>
                    <span className="text-red-600 text-3xl font-semibold">${producto.precio}</span>
                    <span className="text-red-500 text-sm">-$200</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2 border border-gray-300 px-3 py-2 rounded hover:bg-gray-100 transition">
                        <PaperAirplaneIcon className="w-4 h-4 text-gray-600 group-hover:text-black transition" />
                        <span className="text-gray-700">1-3 días hábiles de envío</span>
                    </div>

                    <div className="flex items-center gap-2 border border-gray-300 px-3 py-2 rounded hover:bg-gray-100 transition">
                        <ClockIcon className="w-4 h-4 text-gray-600 group-hover:text-black transition" />
                        <span className="text-gray-700">5-10 días de producción</span>
                    </div>

                    <div className="flex items-center gap-2 border border-gray-300 px-3 py-2 rounded hover:bg-gray-100 transition">
                        <BeakerIcon className="w-4 h-4 text-gray-600 group-hover:text-black transition" />
                        <span className="text-gray-700">Resistente al agua</span>
                    </div>

                    <div className="flex items-center gap-2 border border-gray-300 px-3 py-2 rounded hover:bg-gray-100 transition">
                        <CheckBadgeIcon className="w-4 h-4 text-gray-600 group-hover:text-black transition" />
                        <span className="text-gray-700">No se despinta</span>
                    </div>

                    <div className="flex items-center gap-2 border border-gray-300 px-3 py-2 rounded hover:bg-gray-100 transition col-span-full">
                        <LockClosedIcon className="w-4 h-4 text-gray-600 group-hover:text-black transition" />
                        <span className="text-gray-700">Garantía de entrega y satisfacción</span>
                    </div>
                </div>


                {/* Estado de stock */}
                <p className="text-green-600 font-medium">En stock, listo para ser enviado</p>

                {/* Botón agregar */}
                <AddProductButton producto={producto} />
            </div>
        </div>
    )

}
