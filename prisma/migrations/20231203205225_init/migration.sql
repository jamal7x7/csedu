/*
  Warnings:

  - You are about to drop the `UnitTitle` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "UnitTitle";

-- CreateTable
CREATE TABLE "Chapter" (
    "id" SERIAL NOT NULL,
    "level" INTEGER,
    "unitId" INTEGER NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'Title',
    "subtitle" TEXT DEFAULT 'Subtitle',
    "description" TEXT DEFAULT 'Description',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Chapter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Unit" (
    "id" SERIAL NOT NULL,
    "level" INTEGER,
    "code" TEXT,
    "name" TEXT NOT NULL DEFAULT 'Title',
    "subtitle" TEXT DEFAULT 'Subtitle',
    "description" TEXT DEFAULT 'Description',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Unit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
