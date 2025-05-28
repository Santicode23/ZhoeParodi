import { prisma } from "@/src/lib/prisma"
import ImageUpload from "./ImageUpload"
import { Producto } from "@prisma/client"

async function getCategorias() {
    return await prisma.categoria.findMany()
}

type ProductFormProps = {
    producto?: Producto
}

export default async function ProductForm({producto}: ProductFormProps) {
    const categorias = await getCategorias()

    return (
        <>
            <div className="space-y-2">
                <label
                    className="text-slate-800"
                    htmlFor="name"
                >Nombre:</label>
                <input
                    id="name"
                    type="text"
                    name="name"
                    className="block w-full p-3 bg-slate-100"
                    placeholder="Nombre Producto"
                    defaultValue={producto?.name}
                />
            </div>

            <div className="space-y-2">
                <label
                    className="text-slate-800"
                    htmlFor="precio"
                >Precio:</label>
                <input
                    id="precio"
                    name="precio"
                    className="block w-full p-3 bg-slate-100"
                    placeholder="Precio Producto"
                    defaultValue={producto?.precio}
                />
            </div>

            <div className="space-y-2">
                <label
                    className="text-slate-800"
                    htmlFor="categoriaId"
                >Categoría:</label>
                <select
                    className="block w-full p-3 bg-slate-100"
                    id="categoriaId"
                    name="categoriaId"
                    defaultValue={producto?.categoriaId}
                >
                    <option value="">-- Seleccione --</option>
                    {categorias.map(categoria => (
                        <option
                            key={categoria.id}
                            value={categoria.id}
                        >{categoria.name}</option>
                    ))}
          
                </select>
            </div>
            <ImageUpload 
                foto={producto?.foto}
            />
        </>
    )
}