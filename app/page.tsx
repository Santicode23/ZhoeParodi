import OrderSidebar from "@/components/order/OrderSidebar";
import { Producto } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export default function Home({ producto }: { producto?: Producto }) {
  return (
    <div className="bg-white text-gray-800">
      <section className="relative w-full h-[380px]">
        <Image
          src="/IMG_0933.JPG"
          alt="Zhoe Parodi promoción"
          fill
          className="object-cover"
          priority
        />
      </section>

      <section className="py-6 text-center">
        <h2 className="text-4xl font-bold text-gray-800">HOT SALE 25% OFF</h2>
        <p className="text-lg text-gray-600 mt-2">Aprovecha nuestras promociones</p>
      </section>

      <section className="py-6 text-center">
        <OrderSidebar />
        <h2 className="text-4xl font-bold text-gray-800">PRODUCTOS PRINCIPALES</h2>
      </section>   
    </div>
  )
}
