ALTER TABLE "Test" DROP CONSTRAINT "Test_gradeIdId_Grade_id_fk";
--> statement-breakpoint
DROP INDEX IF EXISTS "Grades_grades_tests_key";--> statement-breakpoint
DROP INDEX IF EXISTS "Test_gradeId_key";--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Grade_grades_tests_key" ON "Grades_Tests" ("gradeIdId");--> statement-breakpoint
ALTER TABLE "Test" DROP COLUMN IF EXISTS "gradeIdId";