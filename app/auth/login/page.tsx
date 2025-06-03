'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const schema = z.object({
  email: z.string().email("Correo inválido"),
  contrasena: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
})

type FormData = z.infer<typeof schema>

export default function LoginPage() {
  const router = useRouter()
  const [mensaje, setMensaje] = useState("")
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include" 
    });
  
    const result = await res.json();
  
    if (res.ok) {
      const meRes = await fetch('/api/auth/me', {
        credentials: 'include'
      });
      const meData = await meRes.json();
  
      console.log("Usuario desde /me:", meData);
  
      if (meData.user?.permisos === "1") {
        router.push('/admin/products');
      } else {
        router.push('/');
      }
    } else {
      setMensaje(`❌ ${result.error || "Error al iniciar sesión"}`);
    }
  };
  
  

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-md rounded-lg max-w-md w-full p-8">
        <div className="flex justify-center mb-4">
          <Image src="/zhoeparodi-03_2.jpg" alt="Zhoe Parodi" width={120} height={60} />
        </div>
        <h2 className="text-2xl font-bold text-center mb-6">Iniciar sesión</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Correo electrónico"
            name="email"
            register={register}
            error={errors.email?.message}
            type="email"
          />
          <Input
            label="Contraseña"
            name="contrasena"
            register={register}
            error={errors.contrasena?.message}
            type="password"
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Ingresando..." : "Ingresar"}
          </button>

  <div className="flex justify-between text-sm mt-3">
    <a href="/auth/registro" className="text-blue-600 hover:underline">
      ¿No tienes cuenta? Regístrate
    </a>
    <a href="/auth/recuperar" className="text-blue-600 hover:underline">
      ¿Olvidaste tu contraseña?
    </a>
  </div>
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
