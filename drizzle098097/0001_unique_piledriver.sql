CREATE TABLE IF NOT EXISTS "Grade" (
	"id" serial PRIMARY KEY NOT NULL,
	"testId" integer,
	"studentId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Test" (
	"id" serial PRIMARY KEY NOT NULL,
	"testName" text,
	"grade" integer,
	"type" text,
	"coefficient" integer,
	"gradeIdId" integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Grade_studentId_key" ON "Grade" ("studentId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Test_gradeId_key" ON "Test" ("gradeIdId");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Grade" ADD CONSTRAINT "Grade_studentId_Student_id_fk" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Test" ADD CONSTRAINT "Test_gradeIdId_Grade_id_fk" FOREIGN KEY ("gradeIdId") REFERENCES "Grade"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
