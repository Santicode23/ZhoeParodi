import ProductCard from "@/components/productos/ProductCard"
import Heading from "@/components/ui/Heading"
import { prisma } from "@/src/lib/prisma"

async function getProductos(categoriaSlug: string) {
  return await prisma.producto.findMany({
    where: {
      categoria: {
        slug: categoriaSlug,
      },
    },
  })
}

export default async function OrderPage({
  params,
}: {
  params: Promise<{ categoria: string }>
}) {
  const { categoria } = await params
  const productos = await getProductos(categoria)

  return (
    <>
      <Heading>Elige tu pedido</Heading>

      <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-4 gap-4 items-start">
        {productos.map((producto) => (
          <ProductCard key={producto.id} producto={producto} />
        ))}
      </div>
    </>
  )
}
