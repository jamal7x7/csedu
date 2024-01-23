ALTER TABLE "Chapter" ALTER COLUMN "order" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "Section" ALTER COLUMN "order" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "Section" ALTER COLUMN "order" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "Section" ALTER COLUMN "order" DROP NOT NULL;