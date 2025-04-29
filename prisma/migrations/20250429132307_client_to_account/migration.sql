/*
  Warnings:

  - You are about to drop the column `clientId` on the `Policy` table. All the data in the column will be lost.
  - You are about to drop the `Client` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserClient` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `accountId` to the `Policy` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Policy" DROP CONSTRAINT "Policy_clientId_fkey";

-- DropForeignKey
ALTER TABLE "UserClient" DROP CONSTRAINT "UserClient_clientId_fkey";

-- DropForeignKey
ALTER TABLE "UserClient" DROP CONSTRAINT "UserClient_userId_fkey";

-- AlterTable
ALTER TABLE "Policy" DROP COLUMN "clientId",
ADD COLUMN     "accountId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Client";

-- DropTable
DROP TABLE "UserClient";

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "sinacorCode" TEXT NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAccount" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "UserAccount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserAccount_userId_accountId_key" ON "UserAccount"("userId", "accountId");

-- AddForeignKey
ALTER TABLE "Policy" ADD CONSTRAINT "Policy_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAccount" ADD CONSTRAINT "UserAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAccount" ADD CONSTRAINT "UserAccount_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
