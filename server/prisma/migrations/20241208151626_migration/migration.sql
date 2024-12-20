/*
  Warnings:

  - You are about to drop the `Responsibilities` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Administration" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "designation" DROP NOT NULL,
ALTER COLUMN "image" DROP NOT NULL,
ALTER COLUMN "biography" DROP NOT NULL;

-- DropTable
DROP TABLE "Responsibilities";
