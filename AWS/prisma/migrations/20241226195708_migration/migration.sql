/*
  Warnings:

  - Added the required column `facultyId` to the `schoolFees` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "schoolFees" ADD COLUMN     "facultyId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "schoolFees" ADD CONSTRAINT "schoolFees_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculties"("id") ON DELETE CASCADE ON UPDATE CASCADE;
