-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "fileUrl" TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'SUPPORTER';
