/*
  Warnings:

  - You are about to drop the `ProductParent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductParent" DROP CONSTRAINT "ProductParent_childId_fkey";

-- DropForeignKey
ALTER TABLE "ProductParent" DROP CONSTRAINT "ProductParent_parentId_fkey";

-- DropTable
DROP TABLE "ProductParent";
