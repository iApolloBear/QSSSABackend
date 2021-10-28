/*
  Warnings:

  - Added the required column `selectedId` to the `UserGroup` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserGroup" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "identifier" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "qsssaId" TEXT NOT NULL,
    "selectedId" TEXT NOT NULL,
    CONSTRAINT "UserGroup_qsssaId_fkey" FOREIGN KEY ("qsssaId") REFERENCES "Qsssa" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserGroup_selectedId_fkey" FOREIGN KEY ("selectedId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserGroup" ("active", "color", "id", "identifier", "name", "qsssaId") SELECT "active", "color", "id", "identifier", "name", "qsssaId" FROM "UserGroup";
DROP TABLE "UserGroup";
ALTER TABLE "new_UserGroup" RENAME TO "UserGroup";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
