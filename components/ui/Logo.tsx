"use client"
import { useState } from "react"
import Image from "next/image"
import { ImSpinner2 } from "react-icons/im"

export default function LogoLink() {
  const [loading, setLoading] = useState(false)

  const handleClick = () => {
    setLoading(true)
    setTimeout(() => {
      window.location.href = "/" // fuerza recarga completa
    }, 1000) // puedes ajustar el tiempo si deseas
  }

  return (
    <button onClick={handleClick} className="cursor-pointer flex items-center justify-center h-[60px] w-[140px]">
      {loading ? (
        <ImSpinner2 className="animate-spin text-amber-500 text-3xl" />
      ) : (
        <Image
          src="/zhoeparodi-03_2.jpg"
          alt="Zhoe Parodi"
          width={140}
          height={60}
          priority
        />
      )}
    </button>
  )
}
