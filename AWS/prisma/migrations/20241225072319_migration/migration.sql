/*
  Warnings:

  - The `utmeReq` column on the `AdmissionReq` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `olevelReq` column on the `AdmissionReq` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `DEReq` column on the `AdmissionReq` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "AdmissionReq" DROP COLUMN "utmeReq",
ADD COLUMN     "utmeReq" TEXT[],
DROP COLUMN "olevelReq",
ADD COLUMN     "olevelReq" TEXT[],
DROP COLUMN "DEReq",
ADD COLUMN     "DEReq" TEXT[];
