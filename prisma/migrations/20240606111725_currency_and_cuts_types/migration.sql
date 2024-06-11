/*
  Warnings:

  - You are about to alter the column `type` on the `currencycuts` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `currencycuts` MODIFY `type` ENUM('CASH', 'COIN') NOT NULL;
