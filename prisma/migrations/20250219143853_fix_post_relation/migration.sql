-- CreateEnum
CREATE TYPE "Visibility" AS ENUM ('PUBLIC', 'SUPPORTERS_ONLY', 'PRIVATE');

-- Step 1: Temporarily convert role to TEXT to avoid data loss
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE TEXT USING role::TEXT;

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_creatorId_fkey";

-- AlterTable: Like
ALTER TABLE "Like" DROP COLUMN "createdAt";

-- AlterTable: Post
ALTER TABLE "Post" DROP COLUMN "authorId",
DROP COLUMN "imageUrl",
DROP COLUMN "videoUrl",
ADD COLUMN "creatorId" TEXT NOT NULL DEFAULT 'TEMP_USER_ID',
ADD COLUMN "userId" TEXT NOT NULL DEFAULT 'TEMP_USER_ID',
ADD COLUMN "image" TEXT,
ADD COLUMN "video" TEXT,
ADD COLUMN "visibility" "Visibility" NOT NULL DEFAULT 'PUBLIC',
ALTER COLUMN "content" SET NOT NULL;

-- AlterTable: Subscription
ALTER TABLE "Subscription" DROP COLUMN "createdAt",
ADD COLUMN "supporterId" TEXT NOT NULL DEFAULT 'TEMP_USER_ID';

-- AlterTable: User (Role)
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role" USING role::"Role";

-- DropTable: Comment (No longer needed)
DROP TABLE "Comment";

-- CreateTable: CreatorProfile
CREATE TABLE "CreatorProfile" (
    "userId" TEXT NOT NULL,
    "bio" TEXT,
    "image" TEXT,

    CONSTRAINT "CreatorProfile_pkey" PRIMARY KEY ("userId")
);

-- CreateTable: SupporterProfile
CREATE TABLE "SupporterProfile" (
    "userId" TEXT NOT NULL,
    "interests" TEXT,

    CONSTRAINT "SupporterProfile_pkey" PRIMARY KEY ("userId")
);

-- CreateTable: Notification
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKeys
ALTER TABLE "CreatorProfile" ADD CONSTRAINT "CreatorProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "SupporterProfile" ADD CONSTRAINT "SupporterProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_supporterId_fkey" FOREIGN KEY ("supporterId") REFERENCES "SupporterProfile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "CreatorProfile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Post" ADD CONSTRAINT "Post_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "CreatorProfile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
