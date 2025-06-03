'use client'

import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import Image from 'next/image'

export default function CambiarContrasenaPage() {
  const searchParams = useSearchParams()
  const codigo = searchParams.get('codigo')
  const [contrasena, setContrasena] = useState('')
  const [mensaje, setMensaje] = useState('')

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const res = await fetch('/api/auth/recuperar/actualizar', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ codigo, contrasena })
    })

    const result = await res.json()
    setMensaje(result?.error || "Contraseña actualizada con éxito")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow max-w-md w-full text-center">
        <div className="flex justify-center mb-4">
          <Image src="/zhoeparodi-03_2.jpg" alt="Zhoe Parodi" width={120} height={60} />
        </div>
        <h2 className="text-xl font-bold mb-4">Establecer nueva contraseña</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            placeholder="Nueva contraseña"
            className="w-full p-2 border rounded mb-4"
          />
          <button type="submit" className="w-full bg-black text-white py-2 rounded">
            Actualizar
          </button>
        </form>
        {mensaje && (
  <>
    <p className="mt-4 text-sm">{mensaje}</p>
    {mensaje.includes("éxito") && (
      <div className="mt-3">
        <a href="/auth/login" className="text-blue-600 hover:underline text-sm">
          Iniciar sesión
        </a>
      </div>
    )}
  </>
)}


      </div>
    </div>
  )
}