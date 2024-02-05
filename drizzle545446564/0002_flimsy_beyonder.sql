ALTER TABLE "Grade" DROP CONSTRAINT "Grade_studentId_Student_id_fk";
--> statement-breakpoint
ALTER TABLE "GradesToTests" DROP CONSTRAINT "GradesToTests_gradeId_Grade_id_fk";
--> statement-breakpoint
ALTER TABLE "Profile" ADD COLUMN "birthDate" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Grade" ADD CONSTRAINT "Grade_studentId_Student_id_fk" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "GradesToTests" ADD CONSTRAINT "GradesToTests_gradeId_Grade_id_fk" FOREIGN KEY ("gradeId") REFERENCES "Grade"("id") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
