-- CreateEnum
CREATE TYPE "Type" AS ENUM ('UNDERGRADUATE', 'POSTGRADUATE');

-- CreateTable
CREATE TABLE "AdmissionReq" (
    "id" SERIAL NOT NULL,
    "course" TEXT NOT NULL,
    "utmeReq" TEXT NOT NULL,
    "olevelReq" TEXT NOT NULL,
    "DEReq" TEXT NOT NULL,
    "facultyId" INTEGER NOT NULL,

    CONSTRAINT "AdmissionReq_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "schoolFees" (
    "id" SERIAL NOT NULL,
    "course" TEXT NOT NULL,
    "acceptanceFee" INTEGER NOT NULL,
    "admissionSchFee" INTEGER NOT NULL,
    "returningSchFee" INTEGER NOT NULL,

    CONSTRAINT "schoolFees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Faq" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "type" "Type" NOT NULL,

    CONSTRAINT "Faq_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdmissionReq_id_key" ON "AdmissionReq"("id");

-- CreateIndex
CREATE UNIQUE INDEX "schoolFees_id_key" ON "schoolFees"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Faq_id_key" ON "Faq"("id");

-- AddForeignKey
ALTER TABLE "AdmissionReq" ADD CONSTRAINT "AdmissionReq_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculties"("id") ON DELETE CASCADE ON UPDATE CASCADE;
