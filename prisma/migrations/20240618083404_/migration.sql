-- CreateTable
CREATE TABLE `Account` (
    `id` VARCHAR(191) NOT NULL,
    `type` ENUM('MOBILE', 'CRYPTO') NOT NULL DEFAULT 'MOBILE',
    `name` VARCHAR(191) NOT NULL,
    `displayName` VARCHAR(191) NULL,
    `amount` DOUBLE NULL DEFAULT 0.0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `idEntity` VARCHAR(191) NULL,
    `idEmployee` VARCHAR(191) NULL,
    `idExternalEntity` VARCHAR(191) NULL,

    UNIQUE INDEX `Account_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_idEntity_fkey` FOREIGN KEY (`idEntity`) REFERENCES `Entity`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_idEmployee_fkey` FOREIGN KEY (`idEmployee`) REFERENCES `Employee`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_idExternalEntity_fkey` FOREIGN KEY (`idExternalEntity`) REFERENCES `ExternalEntity`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
