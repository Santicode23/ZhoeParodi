/*
  Warnings:

  - Added the required column `cantidad` to the `OrderProductos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderProductos" ADD COLUMN     "cantidad" INTEGER NOT NULL;
