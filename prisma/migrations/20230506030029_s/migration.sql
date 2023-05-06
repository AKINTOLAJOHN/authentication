-- AlterTable
ALTER TABLE `Users` MODIFY `resetPasswordToken` VARCHAR(191) NULL,
    MODIFY `resetPasswordExpires` INTEGER NULL,
    MODIFY `profileImage` VARCHAR(191) NULL;
