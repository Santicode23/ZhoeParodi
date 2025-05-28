import EditProductForm from "@/components/productos/EditProductForm"
import ProductForm from "@/components/productos/ProductForm"
import GoBackButton from "@/components/ui/GoBackButton"
import Heading from "@/components/ui/Heading"
import { prisma } from "@/src/lib/prisma"
import { notFound } from "next/navigation"

async function getProductById(id: number) {
    const producto = await prisma.producto.findUnique({
        where: {
            id
        }
    })
    if (!producto) {
        notFound()
    }

    return producto
}


export default async function EditProductsPage({params}: {params: {id: string}}) {

    const producto = await getProductById(+params.id)

    return (
        <>
            <Heading>Editar Producto: {producto.name}</Heading>
            
            <GoBackButton />

            <EditProductForm>
                <ProductForm 
                    producto= {producto}
                />
            </EditProductForm>
        </>
    )
}