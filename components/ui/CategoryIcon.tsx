"use client"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation" 
import { Categoria } from "@prisma/client"

type CategoryIconProps = {
  categoria: Categoria
}

export default function CategoryIcon({ categoria }: CategoryIconProps) {
  const params = useParams()
  const isActive = categoria.slug === params?.categoria

  return (
    <Link href={`/order/${categoria.slug}`} className="w-full">
      <div className={`flex flex-col items-center text-center rounded-xl p-4 ${isActive ? 'bg-amber-300' : 'bg-white'} transition-all hover:scale-105`}>
        <div className="relative w-32 h-32 md:w-40 md:h-40 mb-4">
          <Image
            fill
            src={`/icon_${categoria.slug}.jpeg`}
            alt={`Imagen de ${categoria.name}`}
            className="object-contain rounded-lg"
          />
        </div>
        <h3 className="text-lg md:text-xl font-bold text-gray-800 uppercase">{categoria.name}</h3>
      </div>
    </Link>
  )
}
