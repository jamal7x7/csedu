ALTER TABLE "Grade" DROP CONSTRAINT "Grade_studentId_Student_id_fk";
--> statement-breakpoint
ALTER TABLE "Grade" ALTER COLUMN "studentId" DROP NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Grade" ADD CONSTRAINT "Grade_studentId_Student_id_fk" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
