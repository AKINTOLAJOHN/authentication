-- AlterTable
ALTER TABLE `Users` MODIFY `resetPasswordToken` VARCHAR(191) NULL,
    MODIFY `resetPasswordExpires` VARCHAR(191) NULL,
    MODIFY `profileImage` VARCHAR(191) NULL;
