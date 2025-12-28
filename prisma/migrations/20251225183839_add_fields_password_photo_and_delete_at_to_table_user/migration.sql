/*
  Warnings:

  - Added the required column `passord` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `deletedAt` DATETIME(3) NULL,
    ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `passord` VARCHAR(191) NOT NULL,
    ADD COLUMN `photo` VARCHAR(191) NULL;
