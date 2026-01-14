ALTER TABLE "questions" DROP CONSTRAINT "questions_question_category_id_question_categories_id_fkey";
ALTER TABLE "question_categories"
ALTER COLUMN "id"
SET DATA TYPE uuid USING "id"::uuid;
--> statement-breakpoint
ALTER TABLE "questions"
ALTER COLUMN "id"
SET DATA TYPE uuid USING "id"::uuid;
--> statement-breakpoint
ALTER TABLE "questions"
ALTER COLUMN "question_category_id"
SET DATA TYPE uuid USING "question_category_id"::uuid;
--> statement-breakpoint
ALTER TABLE "questions"
ADD CONSTRAINT "questions_question_category_id_question_categories_id_fkey" FOREIGN KEY ("question_category_id") REFERENCES "question_categories"("id") ON DELETE RESTRICT;