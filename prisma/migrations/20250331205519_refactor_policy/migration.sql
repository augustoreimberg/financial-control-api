/*
  Warnings:

  - You are about to drop the column `advisorId` on the `Policy` table. All the data in the column will be lost.
  - You are about to drop the column `brokerId` on the `Policy` table. All the data in the column will be lost.
  - You are about to drop the column `parentId` on the `Policy` table. All the data in the column will be lost.
  - You are about to drop the column `paymentStatus` on the `Policy` table. All the data in the column will be lost.
  - You are about to drop the column `plot` on the `Policy` table. All the data in the column will be lost.
  - Added the required column `responsible` to the `Policy` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Policy" DROP CONSTRAINT "Policy_advisorId_fkey";

-- DropForeignKey
ALTER TABLE "Policy" DROP CONSTRAINT "Policy_brokerId_fkey";

-- DropForeignKey
ALTER TABLE "Policy" DROP CONSTRAINT "Policy_parentId_fkey";

-- AlterTable
ALTER TABLE "Policy" DROP COLUMN "advisorId",
DROP COLUMN "brokerId",
DROP COLUMN "parentId",
DROP COLUMN "paymentStatus",
DROP COLUMN "plot",
ADD COLUMN     "responsible" JSONB NOT NULL;

-- CreateTable
CREATE TABLE "Financial" (
    "id" TEXT NOT NULL,
    "policyId" TEXT NOT NULL,
    "plot" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "paymentStatus" "EnumPaymentStatus" NOT NULL,
    "parentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Financial_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Financial" ADD CONSTRAINT "Financial_policyId_fkey" FOREIGN KEY ("policyId") REFERENCES "Policy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Financial" ADD CONSTRAINT "Financial_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Financial"("id") ON DELETE SET NULL ON UPDATE CASCADE;
