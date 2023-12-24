/*
  Warnings:

  - The values [SECTION,SUBSECTION] on the enum `BlockType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "BlockType_new" AS ENUM ('CHAPTER_TITLE', 'INTRO', 'H1', 'H2', 'H3', 'H4', 'H5', 'FIGURE', 'DEF', 'EXEMPLE', 'TEXT', 'LIST');
ALTER TABLE "Blocks" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "Blocks" ALTER COLUMN "type" TYPE "BlockType_new" USING ("type"::text::"BlockType_new");
ALTER TYPE "BlockType" RENAME TO "BlockType_old";
ALTER TYPE "BlockType_new" RENAME TO "BlockType";
DROP TYPE "BlockType_old";
ALTER TABLE "Blocks" ALTER COLUMN "type" SET DEFAULT 'TEXT';
COMMIT;
