DROP INDEX IF EXISTS "Student_sClassId_key";--> statement-breakpoint
ALTER TABLE "SClass" ALTER COLUMN "schoolYearId" SET NOT NULL;