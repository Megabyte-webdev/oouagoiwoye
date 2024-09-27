/*
  Warnings:

  - Added the required column `deanImage` to the `Faculties` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deanName` to the `Faculties` table without a default value. This is not possible if the table is not empty.
  - Added the required column `facultyInfo` to the `Faculties` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Faculties` table without a default value. This is not possible if the table is not empty.
  - Added the required column `facultyId` to the `contact` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Faculties" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "campusId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "deanImage" TEXT NOT NULL,
    "deanName" TEXT NOT NULL,
    "noOfDepartments" TEXT NOT NULL,
    "facultyInfo" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    CONSTRAINT "Faculties_campusId_fkey" FOREIGN KEY ("campusId") REFERENCES "campus" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Faculties" ("body", "campusId", "id", "noOfDepartments", "title") SELECT "body", "campusId", "id", "noOfDepartments", "title" FROM "Faculties";
DROP TABLE "Faculties";
ALTER TABLE "new_Faculties" RENAME TO "Faculties";
CREATE UNIQUE INDEX "Faculties_id_key" ON "Faculties"("id");
CREATE UNIQUE INDEX "Faculties_campusId_key" ON "Faculties"("campusId");
CREATE TABLE "new_contact" (
    "whasapp" TEXT NOT NULL,
    "facebook" TEXT NOT NULL,
    "youtube" TEXT NOT NULL,
    "campusId" INTEGER NOT NULL,
    "facultyId" INTEGER NOT NULL,
    CONSTRAINT "contact_campusId_fkey" FOREIGN KEY ("campusId") REFERENCES "campus" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "contact_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculties" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_contact" ("campusId", "facebook", "whasapp", "youtube") SELECT "campusId", "facebook", "whasapp", "youtube" FROM "contact";
DROP TABLE "contact";
ALTER TABLE "new_contact" RENAME TO "contact";
CREATE UNIQUE INDEX "contact_campusId_key" ON "contact"("campusId");
CREATE UNIQUE INDEX "contact_facultyId_key" ON "contact"("facultyId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
