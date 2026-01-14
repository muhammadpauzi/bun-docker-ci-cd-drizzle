CREATE TABLE "question_categories" (
	"id" char(36) PRIMARY KEY,
	"name" varchar NOT NULL UNIQUE,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "questions"
ADD COLUMN "question_category_id" char(36);
INSERT INTO "question_categories"
VALUES (
		'019bbad3-98a0-7000-ad8f-92abb4c5d1ee',
		'Default'
	);
UPDATE "questions"
SET "question_category_id" = '019bbad3-98a0-7000-ad8f-92abb4c5d1ee'
WHERE "question_category_id" IS NULL;
ALTER TABLE "questions"
ALTER COLUMN "question_category_id"
SET NOT NULL;