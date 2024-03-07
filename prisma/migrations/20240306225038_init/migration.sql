-- AlterTable
ALTER TABLE `users` MODIFY `sector` VARCHAR(191) NULL,
    MODIFY `role` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `interest_users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `interestId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `interest_users` ADD CONSTRAINT `interest_users_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `interest_users` ADD CONSTRAINT `interest_users_interestId_fkey` FOREIGN KEY (`interestId`) REFERENCES `interests`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
