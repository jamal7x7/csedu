ALTER TABLE "Grades_Tests" ADD CONSTRAINT "Grades_Tests_gradeIdId_testIdId_pk" PRIMARY KEY("gradeIdId","testIdId");--> statement-breakpoint
ALTER TABLE "Grades_Tests" DROP COLUMN IF EXISTS "id";