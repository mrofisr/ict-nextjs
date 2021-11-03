/*
  Warnings:

  - You are about to drop the column `url_foto` on the `detail_user` table. All the data in the column will be lost.
  - You are about to drop the column `url_foto` on the `detail_user_penitipan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `detail_user` DROP COLUMN `url_foto`;

-- AlterTable
ALTER TABLE `detail_user_penitipan` DROP COLUMN `url_foto`;
