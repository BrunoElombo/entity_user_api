/*
  Warnings:

  - You are about to drop the column `id_entity` on the `externalentity` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `externalentity` DROP FOREIGN KEY `ExternalEntity_id_entity_fkey`;

-- AlterTable
ALTER TABLE `externalentity` DROP COLUMN `id_entity`;
