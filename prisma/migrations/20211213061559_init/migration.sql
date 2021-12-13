/*
  Warnings:

  - You are about to drop the column `onlyRecordings` on the `Qsssa` table. All the data in the column will be lost.
  - Added the required column `type` to the `Qsssa` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Qsssa" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "topic" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "sentenceStem" TEXT,
    "accessCode" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "img" TEXT,
    "teacherId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Qsssa_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Qsssa" ("accessCode", "createdAt", "id", "img", "question", "sentenceStem", "teacherId", "topic") SELECT "accessCode", "createdAt", "id", "img", "question", "sentenceStem", "teacherId", "topic" FROM "Qsssa";
DROP TABLE "Qsssa";
ALTER TABLE "new_Qsssa" RENAME TO "Qsssa";
CREATE UNIQUE INDEX "Qsssa_accessCode_key" ON "Qsssa"("accessCode");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
