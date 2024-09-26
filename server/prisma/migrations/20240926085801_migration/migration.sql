/*
  Warnings:

  - You are about to drop the column `email` on the `admin` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_admin" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT
);
INSERT INTO "new_admin" ("id", "password", "username") SELECT "id", "password", "username" FROM "admin";
DROP TABLE "admin";
ALTER TABLE "new_admin" RENAME TO "admin";
CREATE UNIQUE INDEX "admin_id_key" ON "admin"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
