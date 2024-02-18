ALTER TABLE "Student" DROP CONSTRAINT "Student_classId_Classes_id_fk";
--> statement-breakpoint
ALTER TABLE "Student" ADD COLUMN "classesId" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Student" ADD CONSTRAINT "Student_classesId_Classes_id_fk" FOREIGN KEY ("classesId") REFERENCES "Classes"("id") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "Student" DROP COLUMN IF EXISTS "classId";