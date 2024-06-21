/*
  Warnings:

  - You are about to drop the column `type` on the `account` table. All the data in the column will be lost.
  - Added the required column `idOperator` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `account` DROP COLUMN `type`,
    ADD COLUMN `idOperator` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Operator` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `type` ENUM('MOBILE', 'CRYPTO') NOT NULL DEFAULT 'MOBILE',
    `displayName` VARCHAR(191) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_idOperator_fkey` FOREIGN KEY (`idOperator`) REFERENCES `Operator`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
