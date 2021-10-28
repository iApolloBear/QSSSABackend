-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserGroup" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "identifier" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "qsssaId" TEXT NOT NULL,
    "selectedId" TEXT,
    CONSTRAINT "UserGroup_qsssaId_fkey" FOREIGN KEY ("qsssaId") REFERENCES "Qsssa" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserGroup_selectedId_fkey" FOREIGN KEY ("selectedId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_UserGroup" ("active", "color", "id", "identifier", "name", "qsssaId", "selectedId") SELECT "active", "color", "id", "identifier", "name", "qsssaId", "selectedId" FROM "UserGroup";
DROP TABLE "UserGroup";
ALTER TABLE "new_UserGroup" RENAME TO "UserGroup";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
