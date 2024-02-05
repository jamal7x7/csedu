ALTER TABLE "Grades_Tests" DROP CONSTRAINT "Grades_Tests_gradeIdId_Grade_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Grades_Tests" ADD CONSTRAINT "Grades_Tests_gradeIdId_Grade_id_fk" FOREIGN KEY ("gradeIdId") REFERENCES "Grade"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
