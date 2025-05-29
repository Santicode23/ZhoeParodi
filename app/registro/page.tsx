'use client'

import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'

const schema = z.object({
  nombreUsuario: z.string().min(3, "Debe tener al menos 3 caracteres"),
  nombre: z.string().min(3, "Debe tener al menos 3 caracteres"),
  edad: z.coerce.number().min(1, "Edad requerida"),
  email: z.string().email("Correo inválido"),
  contrasena: z.string().min(6, "Mínimo 6 caracteres")
})

type FormData = z.infer<typeof schema>

export default function Registro() {
  const [mensaje, setMensaje] = useState("")
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })

    const result = await res.json()
    if (res.ok) {
      setMensaje("✅ Registro exitoso. Revisa tu correo.")
      reset()
    } else {
      setMensaje(`❌ ${result.error || "Error en el registro"}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-md rounded-lg max-w-md w-full p-8">
        <div className="flex justify-center mb-4">
          <Image src="/zhoeparodi-03_2.jpg" alt="Zhoe Parodi" width={120} height={60} />
        </div>
        <h2 className="text-2xl font-bold text-center mb-6">Crear cuenta</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Nombre de usuario" name="nombreUsuario" register={register} error={errors.nombreUsuario?.message} />
          <Input label="Nombre completo" name="nombre" register={register} error={errors.nombre?.message} />
          <Input label="Edad" name="edad" register={register} error={errors.edad?.message} type="number" />
          <Input label="Correo electrónico" name="email" register={register} error={errors.email?.message} type="email" />
          <Input label="Contraseña" name="contrasena" register={register} error={errors.contrasena?.message} type="password" />

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registrando..." : "Registrarse"}
          </button>
        </form>

        {mensaje && (
          <p className="mt-4 text-center font-medium">{mensaje}</p>
        )}
      </div>
    </div>
  )
}

function Input({ label, name, register, error, type = "text" }: any) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        {...register(name)}
        className={`w-full p-2 border rounded mt-1 ${error ? 'border-red-500' : 'border-gray-300'}`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
}
