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

export const questionsTable = t.pgTable("questions", {
  id: t.char({ length: 36 }).primaryKey(),
  content: t.varchar().notNull(),
  type: t.varchar().notNull().$type<QuestionType>(),
  ...timestamps,
});
