import ProductSearchForm from "@/components/productos/ProductSearchForm";
import ProductTable from "@/components/productos/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

async function searchProducts(searchTerm: string) {
    const productos = await prisma.producto.findMany({
        where: {
            name: {
                contains: searchTerm,
                mode: 'insensitive',
            },
        },
        include: {
            categoria: true,
        },
    });
    return productos;
}

export default async function SearchPage({
    searchParams,
}: {
    searchParams: Promise<{ search?: string }>;
}) {
    const { search = "" } = await searchParams; // ✅ await necesario

    const productos = await searchProducts(search);

    return (
        <>
            <Heading>Resultados de búsqueda: {search}</Heading>

            <div className="flex flex-col lg:flex-row lg:justify-end gap-5">
                <ProductSearchForm />
            </div>

            {productos.length ? (
                <ProductTable productos={productos} />
            ) : (
                <p className="text-center text-lg">No hay resultados</p>
            )}
        </>
    );
}
