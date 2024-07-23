/*
  Warnings:

  - Added the required column `endTime` to the `ArchivedTask` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `ArchivedTask` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endTime` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ArchivedTask" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "relevance" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "startTime" DATETIME NOT NULL,
    "endTime" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    "sentiment" TEXT,
    CONSTRAINT "ArchivedTask_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ArchivedTask" ("description", "endDate", "id", "name", "relevance", "sentiment", "startDate", "userId") SELECT "description", "endDate", "id", "name", "relevance", "sentiment", "startDate", "userId" FROM "ArchivedTask";
DROP TABLE "ArchivedTask";
ALTER TABLE "new_ArchivedTask" RENAME TO "ArchivedTask";
CREATE TABLE "new_Task" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "relevance" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "startTime" DATETIME NOT NULL,
    "endTime" DATETIME NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "sentiment" TEXT,
    CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Task" ("archived", "description", "endDate", "id", "name", "relevance", "sentiment", "startDate", "status", "userId") SELECT "archived", "description", "endDate", "id", "name", "relevance", "sentiment", "startDate", "status", "userId" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
