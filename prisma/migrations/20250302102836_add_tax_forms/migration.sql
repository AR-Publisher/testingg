-- CreateTable
CREATE TABLE "TaxForm" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "formType" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "fileUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TaxForm_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TaxForm_userId_key" ON "TaxForm"("userId");
