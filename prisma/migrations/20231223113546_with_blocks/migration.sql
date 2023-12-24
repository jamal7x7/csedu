/*
  Warnings:

  - You are about to drop the column `role` on the `Student` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "BlockType" AS ENUM ('CHAPTER_TITLE', 'INTRO', 'SECTION', 'SUBSECTION', 'FIGURE', 'DEF', 'EXEMPLE', 'TEXT', 'LIST');

-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "number" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "points" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "role";

-- CreateTable
CREATE TABLE "Section" (
    "id" SERIAL NOT NULL,
    "chapterId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Objective" (
    "id" SERIAL NOT NULL,
    "sectionId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Objective_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Blocks" (
    "id" SERIAL NOT NULL,
    "sectionId" INTEGER NOT NULL,
    "type" "BlockType" DEFAULT 'TEXT',
    "data" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Blocks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Assessment" (
    "id" SERIAL NOT NULL,
    "sectionId" INTEGER NOT NULL,
    "type" "QuizType" DEFAULT 'TEXT',
    "data" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Assessment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Objective" ADD CONSTRAINT "Objective_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blocks" ADD CONSTRAINT "Blocks_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assessment" ADD CONSTRAINT "Assessment_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
