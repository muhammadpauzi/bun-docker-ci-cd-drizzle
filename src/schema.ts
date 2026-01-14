import * as t from "drizzle-orm/pg-core";

export const QuestionTypes = {
  MULTIPLE_CHOICE: "MultipleChoice",
  COMPLEX_MULTIPLE_CHOICE: "ComplexMultipleChoice",
  ESSAY: "Essay",
} as const;

export type QuestionType = (typeof QuestionTypes)[keyof typeof QuestionTypes];

const timestamps = {
  createdAt: t.timestamp("created_at").defaultNow().notNull(),
  updatedAt: t.timestamp("updated_at").defaultNow().notNull(),
};

export const questionCategories = t.pgTable("question_categories", {
  id: t.uuid().primaryKey(),
  name: t.varchar().notNull().unique(),
  ...timestamps,
});

export const questions = t.pgTable(
  "questions",
  {
    id: t.uuid().primaryKey(),
    content: t.varchar().notNull(),
    type: t.varchar().notNull().$type<QuestionType>(),
    questionCategoryId: t
      .uuid("question_category_id")
      .notNull()
      .references(() => questionCategories.id, { onDelete: "restrict" }),
    ...timestamps,
  },
  (self) => [
    t.index("idx_created_at").on(self.createdAt.desc()),
    t.index("idx_questions_category_id").on(self.questionCategoryId),
  ]
);
