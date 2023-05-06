/*
  Warnings:

  - Made the column `resetPasswordToken` on table `Users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `resetPasswordExpires` on table `Users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `profileImage` on table `Users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Users` MODIFY `resetPasswordToken` VARCHAR(191) NOT NULL,
    MODIFY `resetPasswordExpires` INTEGER NOT NULL,
    MODIFY `profileImage` VARCHAR(191) NOT NULL;
