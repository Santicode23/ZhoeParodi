import { prisma } from "@/src/lib/prisma"
import CategoryIcon from "../ui/CategoryIcon"

async function getCategorias() {
    return await prisma.categoria.findMany()
}

export default async function OrderSidebar() {
    const categorias = await getCategorias()

    return (
        <section className="w-full bg-pink-50 py-10">
            <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
                {categorias.map((categoria) => (
                    <div key={categoria.id} className="bg-white rounded-xl shadow flex flex-col items-center p-4">
                        <CategoryIcon categoria={categoria} />
                    </div>
                ))}
            </div>

        </section>
    )
}
