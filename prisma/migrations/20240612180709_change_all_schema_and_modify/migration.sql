/*
  Warnings:

  - You are about to drop the `CreateArticles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "CreateArticles";

-- CreateTable
CREATE TABLE "CreateArticle" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" JSONB[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CreateArticle_pkey" PRIMARY KEY ("id")
);
