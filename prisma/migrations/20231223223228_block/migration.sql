/*
  Warnings:

  - You are about to drop the `Blocks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Blocks" DROP CONSTRAINT "Blocks_sectionId_fkey";

-- AlterTable
ALTER TABLE "Chapter" ADD COLUMN     "order" SERIAL,
ALTER COLUMN "unitId" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "Unit" ADD COLUMN     "order" SERIAL;

-- DropTable
DROP TABLE "Blocks";

-- CreateTable
CREATE TABLE "Block" (
    "id" SERIAL NOT NULL,
    "order" SERIAL NOT NULL,
    "sectionId" INTEGER NOT NULL,
    "type" "BlockType" DEFAULT 'P',
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Block_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Block" ADD CONSTRAINT "Block_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
