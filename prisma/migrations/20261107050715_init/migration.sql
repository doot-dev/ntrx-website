-- CreateTable
CREATE TABLE `enquiries` (
    `id` CHAR(36) NOT NULL,
    `name` VARCHAR(120) NOT NULL,
    `company` VARCHAR(160) NOT NULL DEFAULT '',
    `email` VARCHAR(254) NOT NULL,
    `interest` VARCHAR(60) NOT NULL DEFAULT 'general',
    `message` TEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `enquiries_created_at_idx`(`created_at` DESC),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
