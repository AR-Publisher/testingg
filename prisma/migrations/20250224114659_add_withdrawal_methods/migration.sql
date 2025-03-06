/*
  Warnings:

  - The `status` column on the `Payout` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "WithdrawalType" AS ENUM ('PAYPAL', 'STRIPE', 'BANK_TRANSFER');

-- CreateEnum
CREATE TYPE "PayoutStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED');

-- AlterTable
ALTER TABLE "Payout" ADD COLUMN     "withdrawalMethodId" TEXT,
DROP COLUMN "status",
ADD COLUMN     "status" "PayoutStatus" NOT NULL DEFAULT 'PENDING';

-- CreateTable
CREATE TABLE "WithdrawalMethod" (
    "id" TEXT NOT NULL,
    "type" "WithdrawalType" NOT NULL,
    "details" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creatorId" TEXT NOT NULL,

    CONSTRAINT "WithdrawalMethod_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WithdrawalMethod" ADD CONSTRAINT "WithdrawalMethod_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payout" ADD CONSTRAINT "Payout_withdrawalMethodId_fkey" FOREIGN KEY ("withdrawalMethodId") REFERENCES "WithdrawalMethod"("id") ON DELETE SET NULL ON UPDATE CASCADE;
