/*
  Warnings:

  - Made the column `displayName` on table `department` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `department` MODIFY `displayName` VARCHAR(191) NOT NULL,
    MODIFY `description` VARCHAR(191) NULL;
