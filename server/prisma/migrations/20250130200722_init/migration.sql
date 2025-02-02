-- CreateTable
CREATE TABLE `admin` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NULL,

    UNIQUE INDEX `admin_id_key`(`id`),
    UNIQUE INDEX `admin_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `campus` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,
    `bannerVideo` VARCHAR(191) NULL,
    `campusInfo` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `campus_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Faculties` (
    `id` VARCHAR(191) NOT NULL,
    `campusId` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,
    `deanImage` VARCHAR(191) NULL,
    `deanName` VARCHAR(191) NULL,
    `noOfDepartments` VARCHAR(191) NOT NULL,
    `body` VARCHAR(191) NOT NULL,
    `bannerImage` VARCHAR(191) NULL,

    UNIQUE INDEX `Faculties_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `departments` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,
    `body` VARCHAR(191) NOT NULL,
    `facultyId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `departments_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lecturers` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `designation` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,
    `facultyId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `lecturers_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contact` (
    `id` VARCHAR(191) NOT NULL,
    `whatsapp` VARCHAR(191) NULL,
    `facebook` VARCHAR(191) NULL,
    `youtube` VARCHAR(191) NULL,
    `campusId` VARCHAR(191) NULL,
    `facultyId` VARCHAR(191) NULL,
    `adminId` VARCHAR(191) NULL,
    `PrincipalId` VARCHAR(191) NULL,
    `contEducationId` VARCHAR(191) NULL,
    `DirectorateId` VARCHAR(191) NULL,

    UNIQUE INDEX `contact_id_key`(`id`),
    UNIQUE INDEX `contact_campusId_key`(`campusId`),
    UNIQUE INDEX `contact_facultyId_key`(`facultyId`),
    UNIQUE INDEX `contact_adminId_key`(`adminId`),
    UNIQUE INDEX `contact_PrincipalId_key`(`PrincipalId`),
    UNIQUE INDEX `contact_contEducationId_key`(`contEducationId`),
    UNIQUE INDEX `contact_DirectorateId_key`(`DirectorateId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `news` (
    `id` VARCHAR(191) NOT NULL,
    `headline` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,
    `body` VARCHAR(191) NOT NULL,
    `author` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `news_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `communities` (
    `id` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,
    `title` VARCHAR(191) NOT NULL,
    `body` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `communities_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Administration` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `designation` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,
    `biography` VARCHAR(191) NOT NULL,
    `responsibilities` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Administration_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Principal` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `designation` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,
    `biography` VARCHAR(191) NOT NULL,
    `responsibilities` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Principal_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContinuingEducation` (
    `id` VARCHAR(191) NOT NULL,
    `program` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,
    `headline` VARCHAR(191) NOT NULL,
    `overview` VARCHAR(191) NOT NULL,
    `requirements` VARCHAR(191) NOT NULL,
    `benefits` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ContinuingEducation_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Directorates` (
    `id` VARCHAR(191) NOT NULL,
    `office` VARCHAR(191) NOT NULL,
    `headline` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,
    `history` VARCHAR(191) NULL,
    `vission` VARCHAR(191) NULL,
    `mission` VARCHAR(191) NULL,
    `responsibilities` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Directorates_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AdmissionReq` (
    `id` VARCHAR(191) NOT NULL,
    `course` VARCHAR(191) NOT NULL,
    `utmeReq` VARCHAR(191) NOT NULL,
    `olevelReq` VARCHAR(191) NOT NULL,
    `DEReq` VARCHAR(191) NOT NULL,
    `facultyId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `AdmissionReq_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `schoolFees` (
    `id` VARCHAR(191) NOT NULL,
    `course` VARCHAR(191) NOT NULL,
    `acceptanceFee` VARCHAR(191) NOT NULL,
    `admissionSchFee` VARCHAR(191) NOT NULL,
    `returningSchFee` VARCHAR(191) NOT NULL,
    `facultyId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `schoolFees_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Faq` (
    `id` VARCHAR(191) NOT NULL,
    `question` VARCHAR(191) NOT NULL,
    `answer` VARCHAR(191) NOT NULL,
    `type` ENUM('UNDERGRADUATE', 'POSTGRADUATE') NOT NULL,

    UNIQUE INDEX `Faq_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Faculties` ADD CONSTRAINT `Faculties_campusId_fkey` FOREIGN KEY (`campusId`) REFERENCES `campus`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `departments` ADD CONSTRAINT `departments_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `Faculties`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lecturers` ADD CONSTRAINT `lecturers_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `Faculties`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `contact` ADD CONSTRAINT `contact_campusId_fkey` FOREIGN KEY (`campusId`) REFERENCES `campus`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `contact` ADD CONSTRAINT `contact_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `Faculties`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `contact` ADD CONSTRAINT `contact_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Administration`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `contact` ADD CONSTRAINT `contact_PrincipalId_fkey` FOREIGN KEY (`PrincipalId`) REFERENCES `Principal`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `contact` ADD CONSTRAINT `contact_contEducationId_fkey` FOREIGN KEY (`contEducationId`) REFERENCES `ContinuingEducation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `contact` ADD CONSTRAINT `contact_DirectorateId_fkey` FOREIGN KEY (`DirectorateId`) REFERENCES `Directorates`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AdmissionReq` ADD CONSTRAINT `AdmissionReq_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `Faculties`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `schoolFees` ADD CONSTRAINT `schoolFees_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `Faculties`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
