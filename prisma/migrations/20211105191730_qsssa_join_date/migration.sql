-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UsersOnQSSSAS" (
    "userId" TEXT NOT NULL,
    "qsssaId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("userId", "qsssaId"),
    CONSTRAINT "UsersOnQSSSAS_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UsersOnQSSSAS_qsssaId_fkey" FOREIGN KEY ("qsssaId") REFERENCES "Qsssa" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UsersOnQSSSAS" ("qsssaId", "userId") SELECT "qsssaId", "userId" FROM "UsersOnQSSSAS";
DROP TABLE "UsersOnQSSSAS";
ALTER TABLE "new_UsersOnQSSSAS" RENAME TO "UsersOnQSSSAS";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
