/*
  Warnings:

  - You are about to drop the column `fasilitan_tempat_penitipan` on the `detail_tempat_penitipan` table. All the data in the column will be lost.
  - You are about to drop the column `info_tambahan` on the `detail_tempat_penitipan` table. All the data in the column will be lost.
  - Added the required column `deskripsi` to the `detail_tempat_penitipan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `harga` to the `detail_tempat_penitipan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `detail_tempat_penitipan` DROP COLUMN `fasilitan_tempat_penitipan`,
    DROP COLUMN `info_tambahan`,
    ADD COLUMN `deskripsi` TEXT NOT NULL,
    ADD COLUMN `harga` VARCHAR(50) NOT NULL;
