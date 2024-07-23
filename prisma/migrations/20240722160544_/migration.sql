/*
  Warnings:

  - You are about to drop the column `id_entity` on the `type_entity` table. All the data in the column will be lost.
  - Added the required column `id_external_entity` to the `Type_Entity` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `type_entity` DROP FOREIGN KEY `Type_Entity_id_entity_fkey`;

-- AlterTable
ALTER TABLE `type_entity` DROP COLUMN `id_entity`,
    ADD COLUMN `id_external_entity` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Type_Entity` ADD CONSTRAINT `Type_Entity_id_external_entity_fkey` FOREIGN KEY (`id_external_entity`) REFERENCES `ExternalEntity`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
