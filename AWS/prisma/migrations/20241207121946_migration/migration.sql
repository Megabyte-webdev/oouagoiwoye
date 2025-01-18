/*
  Warnings:

  - You are about to drop the `mapdata` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[adminId]` on the table `contact` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[PrincipalId]` on the table `contact` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[contEducationId]` on the table `contact` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[DirectorateId]` on the table `contact` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `PrincipalId` to the `contact` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "contact" ADD COLUMN     "DirectorateId" INTEGER,
ADD COLUMN     "PrincipalId" INTEGER NOT NULL,
ADD COLUMN     "adminId" INTEGER,
ADD COLUMN     "contEducationId" INTEGER;

-- DropTable
DROP TABLE "mapdata";

-- CreateTable
CREATE TABLE "Responsibilities" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Responsibilities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Administration" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "biography" TEXT NOT NULL,
    "responsibilities" TEXT[],

    CONSTRAINT "Administration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Principal" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "biography" TEXT NOT NULL,
    "responsibilities" TEXT[],

    CONSTRAINT "Principal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContinuingEducation" (
    "id" SERIAL NOT NULL,
    "program" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "headline" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "requirements" TEXT[],
    "benefits" TEXT[],

    CONSTRAINT "ContinuingEducation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Directorates" (
    "id" SERIAL NOT NULL,
    "office" TEXT NOT NULL,
    "headline" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "history" TEXT,
    "vission" TEXT,
    "mission" TEXT,
    "responsibilities" TEXT[],

    CONSTRAINT "Directorates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Responsibilities_id_key" ON "Responsibilities"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Administration_id_key" ON "Administration"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Principal_id_key" ON "Principal"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ContinuingEducation_id_key" ON "ContinuingEducation"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Directorates_id_key" ON "Directorates"("id");

-- CreateIndex
CREATE UNIQUE INDEX "contact_adminId_key" ON "contact"("adminId");

-- CreateIndex
CREATE UNIQUE INDEX "contact_PrincipalId_key" ON "contact"("PrincipalId");

-- CreateIndex
CREATE UNIQUE INDEX "contact_contEducationId_key" ON "contact"("contEducationId");

-- CreateIndex
CREATE UNIQUE INDEX "contact_DirectorateId_key" ON "contact"("DirectorateId");

-- AddForeignKey
ALTER TABLE "contact" ADD CONSTRAINT "contact_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Administration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contact" ADD CONSTRAINT "contact_PrincipalId_fkey" FOREIGN KEY ("PrincipalId") REFERENCES "Principal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contact" ADD CONSTRAINT "contact_contEducationId_fkey" FOREIGN KEY ("contEducationId") REFERENCES "ContinuingEducation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contact" ADD CONSTRAINT "contact_DirectorateId_fkey" FOREIGN KEY ("DirectorateId") REFERENCES "Directorates"("id") ON DELETE CASCADE ON UPDATE CASCADE;
