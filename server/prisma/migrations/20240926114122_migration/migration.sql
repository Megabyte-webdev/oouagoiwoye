-- CreateTable
CREATE TABLE "campus" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "image" TEXT NOT NULL,
    "video" TEXT NOT NULL,
    "campusInfo" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Faculties" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "campusId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "noOfDepartments" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    CONSTRAINT "Faculties_campusId_fkey" FOREIGN KEY ("campusId") REFERENCES "campus" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "contact" (
    "whasapp" TEXT NOT NULL,
    "facebook" TEXT NOT NULL,
    "youtube" TEXT NOT NULL,
    "campusId" INTEGER NOT NULL,
    CONSTRAINT "contact_campusId_fkey" FOREIGN KEY ("campusId") REFERENCES "campus" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "news" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "headline" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "image" TEXT NOT NULL,
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
CREATE UNIQUE INDEX "campus_id_key" ON "campus"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Faculties_id_key" ON "Faculties"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Faculties_campusId_key" ON "Faculties"("campusId");

-- CreateIndex
CREATE UNIQUE INDEX "contact_campusId_key" ON "contact"("campusId");

-- CreateIndex
CREATE UNIQUE INDEX "news_id_key" ON "news"("id");

-- CreateIndex
CREATE UNIQUE INDEX "communities_id_key" ON "communities"("id");
