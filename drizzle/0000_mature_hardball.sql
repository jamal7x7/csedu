DO $$ BEGIN
 CREATE TYPE "BlockType" AS ENUM('CHAPTER_TITLE', 'INTRO', 'H1', 'H2', 'H3', 'H4', 'H5', 'FIGURE', 'DEF', 'EXEMPLE', 'P', 'LIST');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "QuizType" AS ENUM('MULTI', 'YESNO', 'TEXT');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "Role" AS ENUM('STUDENT', 'TEACHER', 'ADMIN');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Admin" (
	"id" serial PRIMARY KEY NOT NULL,
	"bio" text,
	"profileId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Assessment" (
	"id" serial PRIMARY KEY NOT NULL,
	"sectionId" integer NOT NULL,
	"type" "QuizType" DEFAULT 'TEXT',
	"createdAt" timestamp(3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"content" text NOT NULL,
	"order" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Block" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" serial NOT NULL,
	"sectionId" integer NOT NULL,
	"type" "BlockType" DEFAULT 'P',
	"content" text NOT NULL,
	"createdAt" timestamp(3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Chapter" (
	"id" serial PRIMARY KEY NOT NULL,
	"level" integer,
	"unitId" integer DEFAULT 1 NOT NULL,
	"title" text DEFAULT 'Title of Chapter' NOT NULL,
	"subtitle" text DEFAULT 'Subtitle',
	"description" text DEFAULT 'Description',
	"createdAt" timestamp(3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"number" serial NOT NULL,
	"published" boolean DEFAULT false NOT NULL,
	"testId" integer,
	"order" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Objective" (
	"id" serial PRIMARY KEY NOT NULL,
	"sectionId" integer NOT NULL,
	"description" text NOT NULL,
	"createdAt" timestamp(3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"order" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Option" (
	"id" serial PRIMARY KEY NOT NULL,
	"content" text DEFAULT 'True' NOT NULL,
	"description" text DEFAULT 'Option description',
	"correct" boolean DEFAULT false,
	"quizId" integer NOT NULL,
	"createdAt" timestamp(3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"order" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"checksum" varchar(64) NOT NULL,
	"finished_at" timestamp with time zone,
	"migration_name" varchar(255) NOT NULL,
	"logs" text,
	"rolled_back_at" timestamp with time zone,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"applied_steps_count" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Profile" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Quiz" (
	"id" serial PRIMARY KEY NOT NULL,
	"level" integer,
	"chapterId" integer,
	"type" "QuizType" DEFAULT 'MULTI',
	"question" text DEFAULT 'Title' NOT NULL,
	"subtitle" text DEFAULT 'Subtitle',
	"description" text DEFAULT 'Description',
	"hint" text DEFAULT 'Hint!',
	"createdAt" timestamp(3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"number" integer DEFAULT 1 NOT NULL,
	"points" integer DEFAULT 1 NOT NULL,
	"order" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Section" (
	"id" serial PRIMARY KEY NOT NULL,
	"chapterId" integer NOT NULL,
	"content" text NOT NULL,
	"createdAt" timestamp(3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"order" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Student" (
	"id" serial PRIMARY KEY NOT NULL,
	"level" integer,
	"classCode" text,
	"studentNumber" integer,
	"massarNumber" text,
	"group" text,
	"profileId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Teacher" (
	"id" serial PRIMARY KEY NOT NULL,
	"bio" text,
	"profileId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Unit" (
	"id" serial PRIMARY KEY NOT NULL,
	"level" integer,
	"code" text,
	"name" text DEFAULT 'Title' NOT NULL,
	"subtitle" text DEFAULT 'Subtitle',
	"description" text DEFAULT 'Description',
	"createdAt" timestamp(3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"order" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "User" (
	"id" serial PRIMARY KEY NOT NULL,
	"role" "Role" DEFAULT 'STUDENT' NOT NULL,
	"firstName" text,
	"lastName" text,
	"email" text,
	"username" text NOT NULL,
	"password" text NOT NULL,
	"createdAt" timestamp(3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Admin_profileId_key" ON "Admin" ("profileId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Profile_userId_key" ON "Profile" ("userId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Student_massarNumber_key" ON "Student" ("massarNumber");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Student_profileId_key" ON "Student" ("profileId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Teacher_profileId_key" ON "Teacher" ("profileId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User" ("email");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "User_username_key" ON "User" ("username");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Admin" ADD CONSTRAINT "Admin_profileId_Profile_id_fk" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Assessment" ADD CONSTRAINT "Assessment_sectionId_Section_id_fk" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Block" ADD CONSTRAINT "Block_sectionId_Section_id_fk" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_unitId_Unit_id_fk" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Objective" ADD CONSTRAINT "Objective_sectionId_Section_id_fk" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Option" ADD CONSTRAINT "Option_quizId_Quiz_id_fk" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Section" ADD CONSTRAINT "Section_chapterId_Chapter_id_fk" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Student" ADD CONSTRAINT "Student_profileId_Profile_id_fk" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_profileId_Profile_id_fk" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
