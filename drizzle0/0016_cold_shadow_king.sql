DROP TABLE "_prisma_migrations";--> statement-breakpoint
ALTER TABLE "Block" ALTER COLUMN "sectionId" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "Chapter" ALTER COLUMN "unitId" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "Section" ALTER COLUMN "chapterId" DROP NOT NULL;