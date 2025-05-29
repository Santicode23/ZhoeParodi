'use client'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Verificar() {
  const params = useSearchParams()
  const codigo = params.get("codigo")
  const [estado, setEstado] = useState("Verificando...")

  useEffect(() => {
    if (!codigo) {
      setEstado("Código no válido.")
      return
    }

    fetch('/api/auth/verify', {
      method: 'POST',
      body: JSON.stringify({ codigo }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) setEstado("✅ Cuenta verificada correctamente")
        else setEstado(data.error || "❌ Ocurrió un error")
      })
  }, [codigo])

  return <div className="p-6 text-center text-xl">{estado}</div>
}
