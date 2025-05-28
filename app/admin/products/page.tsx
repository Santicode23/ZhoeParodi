import { redirect } from "next/navigation";
import ProductsPagination from "@/components/productos/ProductsPagination";
import ProductTable from "@/components/productos/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import ProductSearchForm from "@/components/productos/ProductSearchForm";

async function productCount() {
    return await prisma.producto.count();
}

async function getProducts(page: number, pageSize: number) {
    const skip = (page - 1) * pageSize;
    const productos = await prisma.producto.findMany({
        take: pageSize,
        skip: skip,
        include: {
            categoria: true,
        },
    });

    return productos;
}

export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>>;

export default async function ProductsPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string }>; // ✅ Se recibe como promesa
}) {
    const { page = "1" } = await searchParams; // ✅ Se hace await aquí
    const pageNumber = parseInt(page, 10) || 1;
    const pageSize = 10;

    if (pageNumber < 1) redirect("/admin/products");

    const productosData = getProducts(pageNumber, pageSize);
    const totalProductsData = productCount();

    const [productos, totalProducts] = await Promise.all([
        productosData,
        totalProductsData,
    ]);

    const totalPages = Math.ceil(totalProducts / pageSize);
    if (pageNumber > totalPages) redirect("/admin/products");

    return (
        <>
            <Heading>Administrar Productos</Heading>
            <div className="flex flex-col lg:flex-row lg:justify-between gap-5">
                <Link
                    href={"/admin/products/new"}
                    className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer"
                >
                    Crear Producto
                </Link>
                <ProductSearchForm />
            </div>

            <ProductTable productos={productos} />

            <ProductsPagination page={pageNumber} totalPages={totalPages} />
        </>
    );
}
