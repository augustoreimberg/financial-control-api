/*
  Warnings:

  - You are about to drop the column `parentId` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_parentId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "parentId";

-- CreateTable
CREATE TABLE "ProductParent" (
    "parentId" TEXT NOT NULL,
    "childId" TEXT NOT NULL,

    CONSTRAINT "ProductParent_pkey" PRIMARY KEY ("parentId","childId")
);

-- AddForeignKey
ALTER TABLE "ProductParent" ADD CONSTRAINT "ProductParent_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductParent" ADD CONSTRAINT "ProductParent_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
