/*
  Warnings:

  - The `sentiment` column on the `Feedback` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Feedback" DROP COLUMN "sentiment",
ADD COLUMN     "sentiment" TEXT;

-- DropEnum
DROP TYPE "Sentiment";
