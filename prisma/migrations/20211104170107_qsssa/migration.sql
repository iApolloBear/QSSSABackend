-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Qsssa" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "topic" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "sentenceStem" TEXT,
    "accessCode" TEXT NOT NULL,
    "onlyRecordings" BOOLEAN NOT NULL DEFAULT false,
    "img" TEXT,
    "teacherId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Qsssa_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Qsssa" ("accessCode", "id", "img", "onlyRecordings", "question", "sentenceStem", "teacherId", "topic") SELECT "accessCode", "id", "img", "onlyRecordings", "question", "sentenceStem", "teacherId", "topic" FROM "Qsssa";
DROP TABLE "Qsssa";
ALTER TABLE "new_Qsssa" RENAME TO "Qsssa";
CREATE UNIQUE INDEX "Qsssa_accessCode_key" ON "Qsssa"("accessCode");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
