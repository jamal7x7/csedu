/*
  Warnings:

  - You are about to drop the column `data` on the `Assessment` table. All the data in the column will be lost.
  - You are about to drop the column `data` on the `Blocks` table. All the data in the column will be lost.
  - Added the required column `content` to the `Assessment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `Blocks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Assessment" DROP COLUMN "data",
ADD COLUMN     "content" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Blocks" DROP COLUMN "data",
ADD COLUMN     "content" TEXT NOT NULL;
