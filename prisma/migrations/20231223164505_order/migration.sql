/*
  Warnings:

  - The values [TEXT] on the enum `BlockType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `number` on the `Section` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "BlockType_new" AS ENUM ('CHAPTER_TITLE', 'INTRO', 'H1', 'H2', 'H3', 'H4', 'H5', 'FIGURE', 'DEF', 'EXEMPLE', 'P', 'LIST');
ALTER TABLE "Blocks" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "Blocks" ALTER COLUMN "type" TYPE "BlockType_new" USING ("type"::text::"BlockType_new");
ALTER TYPE "BlockType" RENAME TO "BlockType_old";
ALTER TYPE "BlockType_new" RENAME TO "BlockType";
DROP TYPE "BlockType_old";
ALTER TABLE "Blocks" ALTER COLUMN "type" SET DEFAULT 'P';
COMMIT;

-- AlterTable
ALTER TABLE "Assessment" ADD COLUMN     "order" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "Blocks" ADD COLUMN     "order" SERIAL NOT NULL,
ALTER COLUMN "type" SET DEFAULT 'P';

-- AlterTable
ALTER TABLE "Objective" ADD COLUMN     "order" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "Option" ADD COLUMN     "order" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "order" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "Section" DROP COLUMN "number",
ADD COLUMN     "order" SERIAL NOT NULL;
