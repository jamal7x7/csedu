ALTER TYPE "Role" ADD VALUE 'STUDENTS_PAIR';--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Pair" (
	"id" serial PRIMARY KEY NOT NULL,
	"pairname" text,
	"password" text DEFAULT '0000' NOT NULL,
	"score" integer DEFAULT 0,
	"createdAt" timestamp(3) DEFAULT now(),
	"updatedAt" timestamp(3) DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "Section" ALTER COLUMN "createdAt" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "Unit" ALTER COLUMN "updatedAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "User" ADD COLUMN "pairId" integer DEFAULT 0;--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Pair_pairname_key" ON "Pair" ("pairname");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "User" ADD CONSTRAINT "User_pairId_Pair_id_fk" FOREIGN KEY ("pairId") REFERENCES "Pair"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
