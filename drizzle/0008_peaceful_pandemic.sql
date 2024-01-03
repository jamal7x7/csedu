ALTER TABLE "Chapter" ALTER COLUMN "level" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "Chapter" ALTER COLUMN "createdAt" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "Chapter" ALTER COLUMN "updatedAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "Chapter" ALTER COLUMN "updatedAt" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "Chapter" ALTER COLUMN "published" DROP NOT NULL;