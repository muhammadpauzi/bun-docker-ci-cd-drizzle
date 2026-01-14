import * as t from "drizzle-orm/pg-core";

export const QuestionTypes = {
  MULTIPLE_CHOICE: "MultipleChoice",
  COMPLEX_MULTIPLE_CHOICE: "ComplexMultipleChoice",
  ESSAY: "Essay",
} as const;

export type QuestionType = (typeof QuestionTypes)[keyof typeof QuestionTypes];

const timestamps = {
  created_at: t.timestamp().defaultNow().notNull(),
  updated_at: t.timestamp().defaultNow().notNull(),
};

export const questionCategories = t.pgTable("question_categories", {
  id: t.uuid().primaryKey(),
  name: t.varchar().notNull().unique(),
  ...timestamps,
});

export const questions = t.pgTable("questions", {
  id: t.uuid().primaryKey(),
  content: t.varchar().notNull(),
  type: t.varchar().notNull().$type<QuestionType>(),
  questionCategoryId: t
    .uuid("question_category_id")
    .notNull()
    .references(() => questionCategories.id, { onDelete: "restrict" }),
  ...timestamps,
});
