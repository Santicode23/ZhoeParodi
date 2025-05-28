import { prisma } from "@/src/lib/prisma"

export async function GET() {
    const orders = await prisma.order.findMany({
            where: {
                status: false
            },
            include : {
                orderProductos: {
                    include: {
                        producto: true
                    }
                }
            }
        })   

        return Response.json(orders)
}