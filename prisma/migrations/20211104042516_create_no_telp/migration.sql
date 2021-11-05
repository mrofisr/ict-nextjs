/*
  Warnings:

  - Added the required column `no_telp` to the `detail_user_penitipan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `detail_user_penitipan` ADD COLUMN `no_telp` VARCHAR(15) NOT NULL;
