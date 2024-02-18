ALTER TABLE "Classes" DROP CONSTRAINT "Classes_profileId_Profile_id_fk";
--> statement-breakpoint
ALTER TABLE "Student" ADD COLUMN "classId" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Student" ADD CONSTRAINT "Student_classId_Classes_id_fk" FOREIGN KEY ("classId") REFERENCES "Classes"("id") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "Classes" DROP COLUMN IF EXISTS "profileId";