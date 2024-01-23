ALTER TABLE "Block" ALTER COLUMN "sectionId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "Chapter" ALTER COLUMN "unitId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "Section" ALTER COLUMN "chapterId" SET NOT NULL;