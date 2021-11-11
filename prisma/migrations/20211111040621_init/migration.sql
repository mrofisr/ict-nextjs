/*
  Warnings:

  - You are about to drop the column `foto_tempat_penitipan_2` on the `detail_tempat_penitipan` table. All the data in the column will be lost.
  - You are about to drop the column `foto_tempat_penitipan_3` on the `detail_tempat_penitipan` table. All the data in the column will be lost.
  - The values [anjing,kucing] on the enum `transaksi_jenis_hewan` will be removed. If these variants are still used in the database, this will fail.
  - The values [jantan,betina] on the enum `transaksi_jenis_kelamin_hewan` will be removed. If these variants are still used in the database, this will fail.
  - The values [pending,approve,cancled,process,complete] on the enum `transaksi_status_penitipan` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `jenis_hewan` to the `detail_tempat_penitipan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `detail_tempat_penitipan` DROP COLUMN `foto_tempat_penitipan_2`,
    DROP COLUMN `foto_tempat_penitipan_3`,
    ADD COLUMN `jenis_hewan` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `transaksi` MODIFY `jenis_hewan` ENUM('Anjing', 'Kucing') NOT NULL,
    MODIFY `jenis_kelamin_hewan` ENUM('Jantan', 'Betina') NOT NULL,
    MODIFY `status_penitipan` ENUM('Accepted', 'Pending', 'Decline') NOT NULL;
