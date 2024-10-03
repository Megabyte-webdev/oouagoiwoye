-- CreateTable
CREATE TABLE "admin" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT
);

-- CreateTable
CREATE TABLE "campus" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "campusInfo" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Faculties" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "campusId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "deanImage" TEXT,
    "deanName" TEXT,
    "noOfDepartments" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    CONSTRAINT "Faculties_campusId_fkey" FOREIGN KEY ("campusId") REFERENCES "campus" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "departments" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "facultyId" INTEGER NOT NULL,
    CONSTRAINT "departments_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculties" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "lecturers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "facultyId" INTEGER NOT NULL,
    CONSTRAINT "lecturers_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculties" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "contact" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "whatsapp" TEXT NOT NULL,
    "facebook" TEXT NOT NULL,
    "youtube" TEXT NOT NULL,
    "campusId" INTEGER,
    "facultyId" INTEGER,
    CONSTRAINT "contact_campusId_fkey" FOREIGN KEY ("campusId") REFERENCES "campus" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "contact_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculties" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "news" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "headline" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "author" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "communities" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "image" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_id_key" ON "admin"("id");

-- CreateIndex
CREATE UNIQUE INDEX "campus_id_key" ON "campus"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Faculties_id_key" ON "Faculties"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Faculties_campusId_key" ON "Faculties"("campusId");

-- CreateIndex
CREATE UNIQUE INDEX "departments_id_key" ON "departments"("id");

-- CreateIndex
CREATE UNIQUE INDEX "departments_facultyId_key" ON "departments"("facultyId");

-- CreateIndex
CREATE UNIQUE INDEX "lecturers_id_key" ON "lecturers"("id");

-- CreateIndex
CREATE UNIQUE INDEX "lecturers_facultyId_key" ON "lecturers"("facultyId");

-- CreateIndex
CREATE UNIQUE INDEX "contact_id_key" ON "contact"("id");

-- CreateIndex
CREATE UNIQUE INDEX "contact_campusId_key" ON "contact"("campusId");

-- CreateIndex
CREATE UNIQUE INDEX "contact_facultyId_key" ON "contact"("facultyId");

-- CreateIndex
CREATE UNIQUE INDEX "news_id_key" ON "news"("id");

-- CreateIndex
CREATE UNIQUE INDEX "communities_id_key" ON "communities"("id");
