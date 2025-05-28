"use client"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation" 
import { Categoria } from "@prisma/client"

type CategoryIconProps = {
    categoria: Categoria
}

export default function CategoryIcon({categoria}: CategoryIconProps) {
    const params = useParams()

    return (
        <div
            className={`${categoria.slug === params.categoria ? 'bg-amber-400' : '' } flex items-center gap-4 w-full border-t border-gray-200 p-3 last-of-type:border-b`}
        >
            <div className="w-56 h-56 relative">
                <Image 
                    fill
                    src={`/icon_${categoria.slug}.jpeg`} 
                    alt="Imagen categoria" 
                />
            </div>
            <Link
                className="text-xl font-bold"
                href={` /order/${categoria.slug}`}
            >{categoria.name}</Link>
        </div>
    )
}