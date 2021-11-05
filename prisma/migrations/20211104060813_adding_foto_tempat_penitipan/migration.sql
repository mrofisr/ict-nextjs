/*
  Warnings:

  - Added the required column `foto_tempat_penitipan_2` to the `detail_tempat_penitipan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `foto_tempat_penitipan_3` to the `detail_tempat_penitipan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `detail_tempat_penitipan` ADD COLUMN `foto_tempat_penitipan_2` VARCHAR(255) NOT NULL,
    ADD COLUMN `foto_tempat_penitipan_3` VARCHAR(255) NOT NULL;
