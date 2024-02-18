CREATE TABLE IF NOT EXISTS "Classes" (
	"id" serial PRIMARY KEY NOT NULL,
	"level" integer,
	"classCode" text,
	"academyYear" text,
	"establishmentCode" text,
	"schoolName" text,
	"academy" text,
	"delegation" text,
	"teachers" text,
	"subjects" text,
	"semestre" text,
	"profileId" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Classes" ADD CONSTRAINT "Classes_profileId_Profile_id_fk" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
