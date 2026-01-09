/*
  Warnings:

  - You are about to drop the column `onlyfansAccountId` on the `user` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "user_onlyfansAccountId_key";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "onlyfansAccountId";
