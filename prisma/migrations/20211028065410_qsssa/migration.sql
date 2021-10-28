-- CreateTable
CREATE TABLE "QSSSA" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "topic" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "sentenceStem" TEXT,
    "accessCode" TEXT NOT NULL,
    "onlyRecordings" BOOLEAN NOT NULL DEFAULT false,
    "teacherId" TEXT NOT NULL,
    CONSTRAINT "QSSSA_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UsersOnQSSSAS" (
    "userId" TEXT NOT NULL,
    "qsssaId" TEXT NOT NULL,

    PRIMARY KEY ("userId", "qsssaId"),
    CONSTRAINT "UsersOnQSSSAS_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UsersOnQSSSAS_qsssaId_fkey" FOREIGN KEY ("qsssaId") REFERENCES "QSSSA" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
