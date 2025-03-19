-- CreateTable
CREATE TABLE "Entry" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "hash" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "views" INTEGER NOT NULL,
    "imgLargeUrl" TEXT NOT NULL,
    "imgLargeWidth" INTEGER NOT NULL,
    "imgLargeHeight" INTEGER NOT NULL,
    "imgMediumUrl" TEXT NOT NULL,
    "imgMediumWidth" INTEGER NOT NULL,
    "imgMediumHeight" INTEGER NOT NULL,
    "imgSmallUrl" TEXT NOT NULL,
    "imgSmallWidth" INTEGER NOT NULL,
    "imgSmallHeight" INTEGER NOT NULL
);
