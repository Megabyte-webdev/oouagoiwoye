/*
  Warnings:

  - Added the required column `title` to the `campus` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_campus" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "video" TEXT NOT NULL,
    "campusInfo" TEXT NOT NULL
);
INSERT INTO "new_campus" ("campusInfo", "id", "image", "video") SELECT "campusInfo", "id", "image", "video" FROM "campus";
DROP TABLE "campus";
ALTER TABLE "new_campus" RENAME TO "campus";
CREATE UNIQUE INDEX "campus_id_key" ON "campus"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
