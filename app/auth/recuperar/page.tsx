'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function RecuperarPage() {
  const [mensaje, setMensaje] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const res = await fetch('/api/auth/recuperar', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    })

    const result = await res.json()
    setMensaje(result?.error || "Revisa tu correo electrónico")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow max-w-md w-full text-center">
      <div className="flex justify-center mb-4">
  <Image src="/zhoeparodi-03_2.jpg" alt="Zhoe Parodi" width={120} height={60} />
</div>

        <h2 className="text-2xl font-bold mb-4">¿Olvidaste tu contraseña?</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo electrónico"
            className="w-full p-2 border rounded mb-4"
          />
          <button type="submit" className="w-full bg-black text-white py-2 rounded">
            Enviar código
          </button>
          <a href="/auth/login" className="text-blue-600 hover:underline text-sm">
          Cancelar
          </a>
        </form>
        {mensaje && <p className="mt-4 text-sm">{mensaje}</p>}
      </div>
    </div>
  )
}
