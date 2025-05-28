"use client"
import { Producto } from "@prisma/client";
import Image from "next/image";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
import OrderSidebar from "@/components/order/OrderSidebar";

type ProductCardPropss = {
  producto: Producto;
};

const Banner = () => {
  const [message, setMessage] = useState('Bienvenidos a nuestra Joyería');

  useEffect(() => {
    const messages = [
      'Bienvenidos a nuestra Joyería',
      'Explora nuestras colecciones exclusivas',
      '¡Descubre lo mejor en joyas!',
    ];
    let index = 0;
    const interval = setInterval(() => {
      setMessage(messages[index]);
      index = (index + 1) % messages.length;
    }, 3000); // Cambia cada 3 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[120px] bg-cover bg-center">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute inset-0 flex justify-center items-center text-white">
        <h1 className="text-4xl font-bold">{message}</h1>
      </div>
    </section>
  );
};

export default function Home({ producto }: ProductCardPropss) {
  return (
    <div className="bg-white text-gray-800">
      {/* Header */}
      <header className="py-4 px-8 bg-indigo-900 text-white flex justify-between items-center">
        <div className="text-xl font-bold">
          <h1>Zhoe Parodi</h1>
        </div>
        {/* Iconos de carrito y cuenta */}
        <div className="flex space-x-6">
          <button className="text-white hover:text-amber-400">
            <FaShoppingCart size={24} />
          </button>
          <button className="text-white hover:text-amber-400">
            <FaUserCircle size={24} />
          </button>
        </div>
      </header>

      {/* Hero Section con Banner Dinámico */}
      <Banner />

      {/* Productos Destacados */}
      <section className="py-10 px-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-indigo-900">Lo más vendido</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4">
              <h3 className="text-xl font-semibold text-indigo-900">Collar</h3>
              <Image
                width={350}
                height={400}
                src="/productos/collar_05.jpeg"
                alt="Imagen joyas"
                quality={90}
              />
              <p className="text-lg text-gray-600">$500</p>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4">
              <h3 className="text-xl font-semibold text-indigo-900">Anillo</h3>
              <Image
                width={350}
                height={400}
                src="/productos/anillo_03.jpeg"
                alt="Imagen joyas"
                quality={90}
              />
              <p className="text-lg text-gray-600">$800</p>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4">
              <h3 className="text-xl font-semibold text-indigo-900">Brazalete</h3>
              <Image
                width={350}
                height={400}
                src="/productos/brazalete_02.jpeg"
                alt="Imagen joyas"
                quality={90}
              />
              <p className="text-lg text-gray-600">$1200</p>
            </div>
          </div>
        </div>
      </section>
      
      <OrderSidebar/>

      {/* Footer */}
      <footer className="bg-indigo-900 text-white py-6">
        <div className="text-center ">
          <p>&copy; 2025 Zhoe Parodi. Todos los derechos reservados.</p>
          <div className="mt-4 space-x-4">
            <a className="hover:text-amber-400">Facebook</a>
            <a className="hover:text-amber-400">Instagram</a>
            <a className="hover:text-amber-400">Productos</a>
            <a className="hover:text-amber-400">Nosotros</a>
            <a className="hover:text-amber-400">Contacto</a>
          </div>
        </div>
      </footer>
    </div>
  );
}