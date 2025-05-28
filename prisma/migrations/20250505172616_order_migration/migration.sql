-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "orderReadyAt" TIMESTAMP(3),

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderProductos" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "productoId" INTEGER NOT NULL,

    CONSTRAINT "OrderProductos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrderProductos" ADD CONSTRAINT "OrderProductos_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderProductos" ADD CONSTRAINT "OrderProductos_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
