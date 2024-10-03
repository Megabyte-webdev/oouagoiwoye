-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Faculties" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "campusId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "deanImage" TEXT,
    "deanName" TEXT,
    "noOfDepartments" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    CONSTRAINT "Faculties_campusId_fkey" FOREIGN KEY ("campusId") REFERENCES "campus" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Faculties" ("body", "campusId", "deanImage", "deanName", "id", "image", "noOfDepartments", "title") SELECT "body", "campusId", "deanImage", "deanName", "id", "image", "noOfDepartments", "title" FROM "Faculties";
DROP TABLE "Faculties";
ALTER TABLE "new_Faculties" RENAME TO "Faculties";
CREATE UNIQUE INDEX "Faculties_id_key" ON "Faculties"("id");
CREATE UNIQUE INDEX "Faculties_campusId_key" ON "Faculties"("campusId");
CREATE TABLE "new_contact" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "whatsapp" TEXT NOT NULL,
    "facebook" TEXT NOT NULL,
    "youtube" TEXT NOT NULL,
    "campusId" INTEGER,
    "facultyId" INTEGER,
    CONSTRAINT "contact_campusId_fkey" FOREIGN KEY ("campusId") REFERENCES "campus" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "contact_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculties" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_contact" ("campusId", "facebook", "facultyId", "id", "whatsapp", "youtube") SELECT "campusId", "facebook", "facultyId", "id", "whatsapp", "youtube" FROM "contact";
DROP TABLE "contact";
ALTER TABLE "new_contact" RENAME TO "contact";
CREATE UNIQUE INDEX "contact_id_key" ON "contact"("id");
CREATE UNIQUE INDEX "contact_campusId_key" ON "contact"("campusId");
CREATE UNIQUE INDEX "contact_facultyId_key" ON "contact"("facultyId");
CREATE TABLE "new_departments" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "facultyId" INTEGER NOT NULL,
    CONSTRAINT "departments_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculties" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_departments" ("body", "facultyId", "id", "image", "title") SELECT "body", "facultyId", "id", "image", "title" FROM "departments";
DROP TABLE "departments";
ALTER TABLE "new_departments" RENAME TO "departments";
CREATE UNIQUE INDEX "departments_id_key" ON "departments"("id");
CREATE TABLE "new_lecturers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "facultyId" INTEGER NOT NULL,
    CONSTRAINT "lecturers_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculties" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_lecturers" ("designation", "facultyId", "id", "image", "name") SELECT "designation", "facultyId", "id", "image", "name" FROM "lecturers";
DROP TABLE "lecturers";
ALTER TABLE "new_lecturers" RENAME TO "lecturers";
CREATE UNIQUE INDEX "lecturers_id_key" ON "lecturers"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
