-- CreateTable
CREATE TABLE `admin` (
    `id_admin` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id_admin`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `detail_tempat_penitipan` (
    `id_detail_tempat_penitipan` INTEGER NOT NULL AUTO_INCREMENT,
    `foto_tempat_penitipan` VARCHAR(255) NOT NULL,
    `nama_tempat_penitipan` VARCHAR(100) NOT NULL,
    `fasilitan_tempat_penitipan` VARCHAR(150) NOT NULL,
    `info_tambahan` VARCHAR(255) NOT NULL,
    `alamat` VARCHAR(255) NOT NULL,
    `kota` VARCHAR(100) NOT NULL,
    `id_user_tempat_penitipan` INTEGER NOT NULL,

    INDEX `id_user_tempat_penitipan`(`id_user_tempat_penitipan`),
    PRIMARY KEY (`id_detail_tempat_penitipan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `detail_user` (
    `id_detail_user` INTEGER NOT NULL,
    `no_ktp` INTEGER NOT NULL,
    `alamat` VARCHAR(255) NOT NULL,
    `tanggal_lahir` DATE NOT NULL,
    `url_foto` VARCHAR(100) NOT NULL,
    `status_akun` ENUM('terverifikasi', 'belum_terverifikasi') NOT NULL,
    `url_foto_wajah` VARCHAR(100) NOT NULL,
    `url_foto_selfie_ktp` VARCHAR(100) NOT NULL,
    `jenis_kelamin` ENUM('laki_laki', 'perempuan') NOT NULL,

    INDEX `id_detail_user`(`id_detail_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `faq_admin` (
    `id_faq` INTEGER NOT NULL AUTO_INCREMENT,
    `id_admin` INTEGER NOT NULL,
    `pertanyaan` VARCHAR(255) NOT NULL,
    `jawaban` VARCHAR(255) NOT NULL,

    INDEX `id_admin`(`id_admin`),
    PRIMARY KEY (`id_faq`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `table_user` (
    `id_user` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `table_user_penitipan` (
    `id_user_penitipan` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id_user_penitipan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transaksi` (
    `id_transaksi` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_hewan` VARCHAR(100) NOT NULL,
    `jenis_hewan` ENUM('anjing', 'kucing') NOT NULL,
    `jenis_kelamin_hewan` ENUM('jantan', 'betina') NOT NULL,
    `umur` INTEGER NOT NULL,
    `tanggal_penitipan` DATE NOT NULL,
    `tanggal_pengembalian` DATE NOT NULL,
    `info_tambahan` VARCHAR(255) NOT NULL,
    `status_penitipan` ENUM('pending', 'approve', 'cancled', 'process', 'complete') NOT NULL,
    `id_user` INTEGER NOT NULL,
    `id_tempat_penitipan` INTEGER NOT NULL,

    INDEX `id_tempat_penitipan`(`id_tempat_penitipan`),
    INDEX `id_user`(`id_user`),
    PRIMARY KEY (`id_transaksi`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `detail_tempat_penitipan` ADD CONSTRAINT `detail_tempat_penitipan_ibfk_1` FOREIGN KEY (`id_user_tempat_penitipan`) REFERENCES `table_user_penitipan`(`id_user_penitipan`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detail_user` ADD CONSTRAINT `detail_user_ibfk_1` FOREIGN KEY (`id_detail_user`) REFERENCES `table_user_penitipan`(`id_user_penitipan`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `faq_admin` ADD CONSTRAINT `faq_admin_ibfk_1` FOREIGN KEY (`id_admin`) REFERENCES `admin`(`id_admin`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaksi` ADD CONSTRAINT `transaksi_ibfk_2` FOREIGN KEY (`id_tempat_penitipan`) REFERENCES `table_user_penitipan`(`id_user_penitipan`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaksi` ADD CONSTRAINT `transaksi_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `table_user`(`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;
