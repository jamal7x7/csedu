-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER');

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER';
