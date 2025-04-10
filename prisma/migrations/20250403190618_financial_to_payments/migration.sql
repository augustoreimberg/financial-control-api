/*
  Warnings:

  - You are about to drop the `Financial` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Financial" DROP CONSTRAINT "Financial_parentId_fkey";

-- DropForeignKey
ALTER TABLE "Financial" DROP CONSTRAINT "Financial_policyId_fkey";

-- DropTable
DROP TABLE "Financial";

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "policyId" TEXT NOT NULL,
    "plot" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "paymentStatus" "EnumPaymentStatus" NOT NULL,
    "parentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_policyId_fkey" FOREIGN KEY ("policyId") REFERENCES "Policy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Payment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
