-- CreateEnum
CREATE TYPE "Type" AS ENUM ('UNDERGRADUATE', 'POSTGRADUATE');

-- CreateTable
CREATE TABLE "admin" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "campus" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "image" TEXT,
    "bannerVideo" TEXT,
    "campusInfo" TEXT NOT NULL,

    CONSTRAINT "campus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Faculties" (
    "id" TEXT NOT NULL,
    "campusId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT,
    "deanImage" TEXT,
    "deanName" TEXT,
    "noOfDepartments" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "bannerImage" TEXT,

    CONSTRAINT "Faculties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "departments" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT,
    "body" TEXT NOT NULL,
    "facultyId" TEXT NOT NULL,

    CONSTRAINT "departments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lecturers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "image" TEXT,
    "facultyId" TEXT NOT NULL,

    CONSTRAINT "lecturers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact" (
    "id" TEXT NOT NULL,
    "whatsapp" TEXT,
    "facebook" TEXT,
    "youtube" TEXT,
    "campusId" TEXT,
    "facultyId" TEXT,
    "adminId" TEXT,
    "PrincipalId" TEXT,
    "contEducationId" TEXT,
    "DirectorateId" TEXT,

    CONSTRAINT "contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "news" (
    "id" TEXT NOT NULL,
    "headline" TEXT NOT NULL,
    "image" TEXT,
    "body" TEXT NOT NULL,
    "author" TEXT NOT NULL,

    CONSTRAINT "news_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "communities" (
    "id" TEXT NOT NULL,
    "image" TEXT,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,

    CONSTRAINT "communities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Administration" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "image" TEXT,
    "biography" TEXT NOT NULL,
    "responsibilities" TEXT[],

    CONSTRAINT "Administration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Principal" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "image" TEXT,
    "biography" TEXT NOT NULL,
    "responsibilities" TEXT[],

    CONSTRAINT "Principal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContinuingEducation" (
    "id" TEXT NOT NULL,
    "program" TEXT NOT NULL,
    "image" TEXT,
    "headline" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "requirements" TEXT[],
    "benefits" TEXT[],

    CONSTRAINT "ContinuingEducation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Directorates" (
    "id" TEXT NOT NULL,
    "office" TEXT NOT NULL,
    "headline" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "image" TEXT,
    "history" TEXT,
    "vission" TEXT,
    "mission" TEXT,
    "responsibilities" TEXT[],

    CONSTRAINT "Directorates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdmissionReq" (
    "id" TEXT NOT NULL,
    "course" TEXT NOT NULL,
    "utmeReq" TEXT[],
    "olevelReq" TEXT[],
    "DEReq" TEXT[],
    "facultyId" TEXT NOT NULL,

    CONSTRAINT "AdmissionReq_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "schoolFees" (
    "id" TEXT NOT NULL,
    "course" TEXT NOT NULL,
    "acceptanceFee" TEXT NOT NULL,
    "admissionSchFee" TEXT NOT NULL,
    "returningSchFee" TEXT NOT NULL,
    "facultyId" TEXT NOT NULL,

    CONSTRAINT "schoolFees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Faq" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "type" "Type" NOT NULL,

    CONSTRAINT "Faq_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_id_key" ON "admin"("id");

-- CreateIndex
CREATE UNIQUE INDEX "admin_username_key" ON "admin"("username");

-- CreateIndex
CREATE UNIQUE INDEX "campus_id_key" ON "campus"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Faculties_id_key" ON "Faculties"("id");

-- CreateIndex
CREATE UNIQUE INDEX "departments_id_key" ON "departments"("id");

-- CreateIndex
CREATE UNIQUE INDEX "lecturers_id_key" ON "lecturers"("id");

-- CreateIndex
CREATE UNIQUE INDEX "contact_id_key" ON "contact"("id");

-- CreateIndex
CREATE UNIQUE INDEX "contact_campusId_key" ON "contact"("campusId");

-- CreateIndex
CREATE UNIQUE INDEX "contact_facultyId_key" ON "contact"("facultyId");

-- CreateIndex
CREATE UNIQUE INDEX "contact_adminId_key" ON "contact"("adminId");

-- CreateIndex
CREATE UNIQUE INDEX "contact_PrincipalId_key" ON "contact"("PrincipalId");

-- CreateIndex
CREATE UNIQUE INDEX "contact_contEducationId_key" ON "contact"("contEducationId");

-- CreateIndex
CREATE UNIQUE INDEX "contact_DirectorateId_key" ON "contact"("DirectorateId");

-- CreateIndex
CREATE UNIQUE INDEX "news_id_key" ON "news"("id");

-- CreateIndex
CREATE UNIQUE INDEX "communities_id_key" ON "communities"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Administration_id_key" ON "Administration"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Principal_id_key" ON "Principal"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ContinuingEducation_id_key" ON "ContinuingEducation"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Directorates_id_key" ON "Directorates"("id");

-- CreateIndex
CREATE UNIQUE INDEX "AdmissionReq_id_key" ON "AdmissionReq"("id");

-- CreateIndex
CREATE UNIQUE INDEX "schoolFees_id_key" ON "schoolFees"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Faq_id_key" ON "Faq"("id");

-- AddForeignKey
ALTER TABLE "Faculties" ADD CONSTRAINT "Faculties_campusId_fkey" FOREIGN KEY ("campusId") REFERENCES "campus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "departments" ADD CONSTRAINT "departments_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lecturers" ADD CONSTRAINT "lecturers_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contact" ADD CONSTRAINT "contact_campusId_fkey" FOREIGN KEY ("campusId") REFERENCES "campus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contact" ADD CONSTRAINT "contact_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contact" ADD CONSTRAINT "contact_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Administration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contact" ADD CONSTRAINT "contact_PrincipalId_fkey" FOREIGN KEY ("PrincipalId") REFERENCES "Principal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contact" ADD CONSTRAINT "contact_contEducationId_fkey" FOREIGN KEY ("contEducationId") REFERENCES "ContinuingEducation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contact" ADD CONSTRAINT "contact_DirectorateId_fkey" FOREIGN KEY ("DirectorateId") REFERENCES "Directorates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdmissionReq" ADD CONSTRAINT "AdmissionReq_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schoolFees" ADD CONSTRAINT "schoolFees_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculties"("id") ON DELETE CASCADE ON UPDATE CASCADE;
