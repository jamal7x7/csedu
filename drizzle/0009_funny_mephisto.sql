ALTER TABLE "Section" ALTER COLUMN "content" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "Section" ALTER COLUMN "updatedAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "Section" ALTER COLUMN "updatedAt" DROP NOT NULL;