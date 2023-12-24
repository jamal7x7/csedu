-- CreateEnum
CREATE TYPE "QuizType" AS ENUM ('MULTI', 'YESNO', 'TEXT');

-- AlterTable
ALTER TABLE "Chapter" ADD COLUMN     "testId" INTEGER;

-- CreateTable
CREATE TABLE "Quiz" (
    "id" SERIAL NOT NULL,
    "level" INTEGER,
    "chapterId" INTEGER,
    "type" "QuizType" DEFAULT 'MULTI',
    "question" TEXT NOT NULL DEFAULT 'Title',
    "subtitle" TEXT DEFAULT 'Subtitle',
    "description" TEXT DEFAULT 'Description',
    "hint" TEXT DEFAULT 'Hint!',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Quiz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Option" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL DEFAULT 'True',
    "description" TEXT DEFAULT 'Option description',
    "correct" BOOLEAN DEFAULT false,
    "quizId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Option_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
