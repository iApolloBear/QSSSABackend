/*
  Warnings:

  - A unique constraint covering the columns `[accessCode]` on the table `Qsssa` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Qsssa_accessCode_key" ON "Qsssa"("accessCode");
