/*
  Warnings:

  - You are about to drop the `QSSSA` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "QSSSA";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Qsssa" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "topic" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "sentenceStem" TEXT,
    "accessCode" TEXT NOT NULL,
    "onlyRecordings" BOOLEAN NOT NULL DEFAULT false,
    "img" TEXT,
    "teacherId" TEXT NOT NULL,
    CONSTRAINT "Qsssa_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UsersOnQSSSAS" (
    "userId" TEXT NOT NULL,
    "qsssaId" TEXT NOT NULL,

    PRIMARY KEY ("userId", "qsssaId"),
    CONSTRAINT "UsersOnQSSSAS_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UsersOnQSSSAS_qsssaId_fkey" FOREIGN KEY ("qsssaId") REFERENCES "Qsssa" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UsersOnQSSSAS" ("qsssaId", "userId") SELECT "qsssaId", "userId" FROM "UsersOnQSSSAS";
DROP TABLE "UsersOnQSSSAS";
ALTER TABLE "new_UsersOnQSSSAS" RENAME TO "UsersOnQSSSAS";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
