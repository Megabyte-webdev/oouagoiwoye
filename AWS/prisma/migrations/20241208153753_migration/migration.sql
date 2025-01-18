/*
  Warnings:

  - Made the column `name` on table `Administration` required. This step will fail if there are existing NULL values in that column.
  - Made the column `designation` on table `Administration` required. This step will fail if there are existing NULL values in that column.
  - Made the column `image` on table `Administration` required. This step will fail if there are existing NULL values in that column.
  - Made the column `biography` on table `Administration` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Administration" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "designation" SET NOT NULL,
ALTER COLUMN "image" SET NOT NULL,
ALTER COLUMN "biography" SET NOT NULL;
