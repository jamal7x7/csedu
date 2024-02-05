CREATE TABLE IF NOT EXISTS "Grades_Tests" (
	"id" serial PRIMARY KEY NOT NULL,
	"gradeIdId" integer NOT NULL,
	"testIdId" integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Grades_grades_tests_key" ON "Grades_Tests" ("gradeIdId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Test_grades_tests_key" ON "Grades_Tests" ("testIdId");--> statement-breakpoint
ALTER TABLE "Grade" DROP COLUMN IF EXISTS "testId";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Grades_Tests" ADD CONSTRAINT "Grades_Tests_gradeIdId_Grade_id_fk" FOREIGN KEY ("gradeIdId") REFERENCES "Grade"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Grades_Tests" ADD CONSTRAINT "Grades_Tests_testIdId_Test_id_fk" FOREIGN KEY ("testIdId") REFERENCES "Test"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
