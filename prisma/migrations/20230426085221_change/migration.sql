/*
  Warnings:

  - You are about to drop the column `active` on the `Users` table. All the data in the column will be lost.
  - Made the column `firstName` on table `Users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastName` on table `Users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Users` DROP COLUMN `active`,
    MODIFY `firstName` VARCHAR(191) NOT NULL,
    MODIFY `lastName` VARCHAR(191) NOT NULL;
