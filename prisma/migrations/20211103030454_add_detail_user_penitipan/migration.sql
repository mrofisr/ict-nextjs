-- DropForeignKey
ALTER TABLE `detail_user` DROP FOREIGN KEY `detail_user_ibfk_1`;

-- AlterTable
ALTER TABLE `detail_user` ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- CreateTable
CREATE TABLE `detail_user_penitipan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_detail_user_penitipan` INTEGER NOT NULL,
    `no_ktp` INTEGER NOT NULL,
    `alamat` VARCHAR(255) NOT NULL,
    `tanggal_lahir` DATE NOT NULL,
    `url_foto` VARCHAR(100) NOT NULL,
    `status_akun` ENUM('terverifikasi', 'belum_terverifikasi') NOT NULL,
    `url_foto_wajah` VARCHAR(100) NOT NULL,
    `url_foto_selfie_ktp` VARCHAR(100) NOT NULL,
    `jenis_kelamin` ENUM('laki_laki', 'perempuan') NOT NULL,

    INDEX `id_detail_user_penitipan`(`id_detail_user_penitipan`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `detail_user` ADD CONSTRAINT `detail_user_ibfk_1` FOREIGN KEY (`id_detail_user`) REFERENCES `table_user`(`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detail_user_penitipan` ADD CONSTRAINT `detail_user_penitipan_ibfk_1` FOREIGN KEY (`id_detail_user_penitipan`) REFERENCES `table_user_penitipan`(`id_user_penitipan`) ON DELETE CASCADE ON UPDATE CASCADE;
