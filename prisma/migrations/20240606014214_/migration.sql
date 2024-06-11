-- CreateTable
CREATE TABLE `CashDesk` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NULL,
    `idEntity` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CashDesk` ADD CONSTRAINT `CashDesk_idEntity_fkey` FOREIGN KEY (`idEntity`) REFERENCES `Entity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
