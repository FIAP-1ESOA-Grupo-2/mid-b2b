/*
  Warnings:

  - You are about to drop the column `google_id` on the `users_providers` table. All the data in the column will be lost.
  - Added the required column `provider` to the `users_providers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users_providers` DROP COLUMN `google_id`,
    ADD COLUMN `provider` VARCHAR(191) NOT NULL,
    ADD COLUMN `provider_id` VARCHAR(191) NULL;
