/*
  Warnings:

  - You are about to drop the column `productId` on the `inventoryItems` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[variantId]` on the table `inventoryItems` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "inventoryItems" DROP CONSTRAINT "inventoryItems_productId_fkey";

-- DropIndex
DROP INDEX "inventoryItems_productId_key";

-- AlterTable
ALTER TABLE "inventoryAdjustments" ALTER COLUMN "quantityBefore" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "quantityAfter" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "inventoryItems" DROP COLUMN "productId",
ADD COLUMN     "variantId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "inventoryItems_variantId_key" ON "inventoryItems"("variantId");

-- AddForeignKey
ALTER TABLE "inventoryItems" ADD CONSTRAINT "inventoryItems_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "productVariants"("id") ON DELETE SET NULL ON UPDATE CASCADE;
