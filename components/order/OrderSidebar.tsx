import { prisma } from "@/src/lib/prisma"
import CategoryIcon from "../ui/CategoryIcon"
import Logo from "../ui/Logo"

async function getCategorias() {
    return await prisma.categoria.findMany()
}

export default async function OrderSidebar() {
    const categorias = await getCategorias()

    return(
        <aside className="md:w-72 md:h-screen bg-white">
            <Logo />
            <nav className="mt-10">
                {categorias.map(categoria => (
                    <CategoryIcon 
                        key={categoria.id}
                        categoria={categoria}
                    />
                ))}
            </nav>
        </aside>
    )
}