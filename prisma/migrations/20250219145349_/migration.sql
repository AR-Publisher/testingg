-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "creatorId" DROP DEFAULT,
ALTER COLUMN "userId" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Subscription" ALTER COLUMN "supporterId" DROP DEFAULT;
