-- AlterTable
ALTER TABLE `bank` ADD COLUMN `displayName` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `cashdesk` ADD COLUMN `displayName` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `currency` ADD COLUMN `displayName` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `department` ADD COLUMN `displayName` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `echeloncategory` ADD COLUMN `displayName` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `entity` ADD COLUMN `displayName` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `externalentity` ADD COLUMN `displayName` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `function` ADD COLUMN `displayName` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `grade` ADD COLUMN `displayName` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `product` ADD COLUMN `displayName` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `role` ADD COLUMN `displayName` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `site` ADD COLUMN `displayName` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `displayName` VARCHAR(191) NULL;
