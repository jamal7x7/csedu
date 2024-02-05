DROP TABLE "Pair";--> statement-breakpoint
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_User_id_fk";
--> statement-breakpoint
ALTER TABLE "Student" DROP CONSTRAINT "Student_profileId_Profile_id_fk";
--> statement-breakpoint
ALTER TABLE "User" DROP CONSTRAINT "User_pairId_Pair_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Student" ADD CONSTRAINT "Student_profileId_Profile_id_fk" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "User" DROP COLUMN IF EXISTS "pairId";