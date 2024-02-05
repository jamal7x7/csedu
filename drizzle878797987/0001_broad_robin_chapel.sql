ALTER TABLE "Grades_Tests" RENAME COLUMN "gradeIdId" TO "gradeId";--> statement-breakpoint
ALTER TABLE "Grades_Tests" RENAME COLUMN "testIdId" TO "testId";--> statement-breakpoint
ALTER TABLE "Grades_Tests" DROP CONSTRAINT "Grades_Tests_gradeIdId_Grade_id_fk";
--> statement-breakpoint
ALTER TABLE "Grades_Tests" DROP CONSTRAINT "Grades_Tests_testIdId_Test_id_fk";
--> statement-breakpoint
ALTER TABLE "Grades_Tests" DROP CONSTRAINT "Grades_Tests_gradeIdId_testIdId_pk";--> statement-breakpoint
ALTER TABLE "Grades_Tests" ADD CONSTRAINT "Grades_Tests_gradeId_testId_pk" PRIMARY KEY("gradeId","testId");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Grades_Tests" ADD CONSTRAINT "Grades_Tests_gradeId_Grade_id_fk" FOREIGN KEY ("gradeId") REFERENCES "Grade"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Grades_Tests" ADD CONSTRAINT "Grades_Tests_testId_Test_id_fk" FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
