-- CreateTable
CREATE TABLE "Entry" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "hash" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "views" INTEGER NOT NULL
);
