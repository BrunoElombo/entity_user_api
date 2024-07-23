/*
  Warnings:

  - You are about to drop the column `id_user` on the `department` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `department` DROP FOREIGN KEY `Department_id_user_fkey`;

-- AlterTable
ALTER TABLE `department` DROP COLUMN `id_user`;
