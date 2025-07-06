/*
  Warnings:

  - A unique constraint covering the columns `[id2]` on the table `authorsDrafts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id2` to the `authorsDrafts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "authorsDrafts" ADD COLUMN     "id2" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "authorsDrafts_id2_key" ON "authorsDrafts"("id2");
