-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "level" INTEGER,
    "classCode" TEXT,
    "studentNumber" INTEGER,
    "firstName" TEXT,
    "lastName" TEXT,
    "email" TEXT,
    "username" TEXT NOT NULL,
    "massarNumber" TEXT,
    "password" TEXT NOT NULL,
    "group" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'USER',

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnitTitle" (
    "id" SERIAL NOT NULL,
    "level" INTEGER,
    "title" TEXT NOT NULL DEFAULT 'Title',
    "subtitle" TEXT DEFAULT 'Subtitle',
    "description" TEXT DEFAULT 'Description',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UnitTitle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Student_username_key" ON "Student"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Student_massarNumber_key" ON "Student"("massarNumber");
