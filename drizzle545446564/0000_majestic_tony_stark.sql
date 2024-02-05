DO $$ BEGIN
 CREATE TYPE "BlockType" AS ENUM('INTRO', 'H1', 'H2', 'H3', 'H4', 'H5', 'FIGURE', 'DEF', 'EXEMPLE', 'P');
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
 CREATE TYPE "Role" AS ENUM('STUDENT', 'TEACHER', 'ADMIN', 'STUDENTS_PAIR');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Assessment" (
	"id" serial PRIMARY KEY NOT NULL,
	"sectionId" integer NOT NULL,
	"type" "QuizType" DEFAULT 'TEXT',
	"createdAt" timestamp(3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"content" text,
	"order" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Block" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" serial NOT NULL,
	"sectionId" integer NOT NULL,
	"type" "BlockType" DEFAULT 'P',
	"content" text NOT NULL,
	"createdAt" timestamp(3) DEFAULT now(),
	"updatedAt" timestamp(3) DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Chapter" (
	"id" serial PRIMARY KEY NOT NULL,
	"level" integer NOT NULL,
	"order" integer,
	"unitId" integer DEFAULT 1 NOT NULL,
	"title" text DEFAULT 'Title of Chapter' NOT NULL,
	"subtitle" text DEFAULT 'Subtitle',
	"description" text DEFAULT 'Description',
	"published" boolean DEFAULT false,
	"testId" integer,
	"createdAt" timestamp(3) DEFAULT now(),
	"updatedAt" timestamp(3) DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Objective" (
	"id" serial PRIMARY KEY NOT NULL,
	"sectionId" integer NOT NULL,
	"description" text,
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
	"order" integer DEFAULT 0,
	"content" text,
	"chapterId" integer NOT NULL,
	"createdAt" timestamp(3) DEFAULT now(),
	"updatedAt" timestamp(3) DEFAULT now()
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
	"updatedAt" timestamp(3) DEFAULT now() NOT NULL,
	"order" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Admin" (
	"id" serial PRIMARY KEY NOT NULL,
	"bio" text,
	"profileId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Grade" (
	"id" serial PRIMARY KEY NOT NULL,
	"studentId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "GradesToTests" (
	"gradeId" integer NOT NULL,
	"testId" integer NOT NULL,
	CONSTRAINT "GradesToTests_gradeId_testId_pk" PRIMARY KEY("gradeId","testId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Pair" (
	"id" serial PRIMARY KEY NOT NULL,
	"pairname" text,
	"pairpass" text DEFAULT '0000' NOT NULL,
	"score" integer DEFAULT 0,
	"createdAt" timestamp(3) DEFAULT now(),
	"updatedAt" timestamp(3) DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Profile" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"bio" text
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
CREATE TABLE IF NOT EXISTS "Test" (
	"id" serial PRIMARY KEY NOT NULL,
	"testName" text,
	"grade" integer,
	"type" text,
	"coefficient" integer
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
	"score" integer DEFAULT 0,
	"pairId" integer DEFAULT 0,
	"createdAt" timestamp(3) DEFAULT now(),
	"updatedAt" timestamp(3) DEFAULT now()
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Admin_profileId_key" ON "Admin" ("profileId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Grade_studentId_key" ON "Grade" ("studentId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Pair_pairname_key" ON "Pair" ("pairname");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Profile_userId_key" ON "Profile" ("userId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Student_massarNumber_key" ON "Student" ("massarNumber");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Student_profileId_key" ON "Student" ("profileId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Teacher_profileId_key" ON "Teacher" ("profileId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User" ("email");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "User_username_key" ON "User" ("username");--> statement-breakpoint
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
 ALTER TABLE "Section" ADD CONSTRAINT "Section_chapterId_Chapter_id_fk" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Admin" ADD CONSTRAINT "Admin_profileId_Profile_id_fk" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Grade" ADD CONSTRAINT "Grade_studentId_Student_id_fk" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "GradesToTests" ADD CONSTRAINT "GradesToTests_gradeId_Grade_id_fk" FOREIGN KEY ("gradeId") REFERENCES "Grade"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "GradesToTests" ADD CONSTRAINT "GradesToTests_testId_Test_id_fk" FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE no action ON UPDATE no action;
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
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "User" ADD CONSTRAINT "User_pairId_Pair_id_fk" FOREIGN KEY ("pairId") REFERENCES "Pair"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
