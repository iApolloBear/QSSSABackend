-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Group" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "identifier" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Group" ("active", "color", "id", "identifier", "name") SELECT "active", "color", "id", "identifier", "name" FROM "Group";
DROP TABLE "Group";
ALTER TABLE "new_Group" RENAME TO "Group";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
