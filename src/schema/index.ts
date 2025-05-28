import { z } from "zod"

export const OrderSchema = z.object({
    name: z.string().min(1, 'Tu nombre es Obligatorio'),
    total: z.number().min(1, 'Hay errores en el pedido'),
    order: z.array(z.object({
        id: z.number(),
        name: z.string(),
        precio: z.number(),
        quantity: z.number(),
        subtotal: z.number()
    }))
})

export const SearchSchema = z.object({
    search: z.string().trim().min(1, {message: 'La busqueda no puede ir vacia'})
})

export const ProductSchema = z.object({
    name: z.string()
        .trim()
        .min(1, { message: 'El Nombre del Producto no puede ir vacio'}),
    precio: z.string()
        .trim()
        .transform((value) => parseFloat(value)) 
        .refine((value) => value > 0, { message: 'Precio no válido' })
        .or(z.number().min(1, {message: 'La Categoría es Obligatoria' })),
    categoriaId: z.string()
        .trim()
        .transform((value) => parseInt(value)) 
        .refine((value) => value > 0, { message: 'La Categoría es Obligatoria' })
        .or(z.number().min(1, {message: 'La Categoría es Obligatoria' })),
    foto: z.string().min(1,{message: 'La imagen es obligarotia'})
})