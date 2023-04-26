/*
  Warnings:

  - You are about to drop the column `termAndCondition` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Users` DROP COLUMN `termAndCondition`,
    DROP COLUMN `token`;
