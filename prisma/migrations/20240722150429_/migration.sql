/*
  Warnings:

  - Made the column `displayName` on table `externalentity` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `externalentity` MODIFY `displayName` VARCHAR(191) NOT NULL;
