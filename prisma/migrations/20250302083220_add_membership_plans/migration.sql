/*
  Warnings:

  - You are about to drop the column `userId` on the `Payout` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "MembershipPlan" AS ENUM ('PRO', 'PREMIUM', 'ELITE');

-- DropForeignKey
ALTER TABLE "Payout" DROP CONSTRAINT "Payout_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "Payout" DROP CONSTRAINT "Payout_userId_fkey";

-- AlterTable
ALTER TABLE "Payout" DROP COLUMN "userId",
ADD COLUMN     "creatorProfileUserId" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "membership" "MembershipPlan" NOT NULL DEFAULT 'PRO';

-- AddForeignKey
ALTER TABLE "Payout" ADD CONSTRAINT "Payout_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payout" ADD CONSTRAINT "Payout_creatorProfileUserId_fkey" FOREIGN KEY ("creatorProfileUserId") REFERENCES "CreatorProfile"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
