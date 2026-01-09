/*
  Warnings:

  - A unique constraint covering the columns `[onlyfansAccountId]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "onlyfansAccountId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "user_onlyfansAccountId_key" ON "user"("onlyfansAccountId");
