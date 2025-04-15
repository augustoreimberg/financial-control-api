/*
  Warnings:

  - A unique constraint covering the columns `[policyNumber]` on the table `Policy` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Policy_policyNumber_key" ON "Policy"("policyNumber");
