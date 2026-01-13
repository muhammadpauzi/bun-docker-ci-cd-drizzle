import { faker } from "@faker-js/faker";
import { QuestionTypes } from "./schema";
import { sql } from "bun";

async function seed() {
  for (let i = 0; i < 100; i++) {
    const TOTAL_RECORDS = 10000;

    const questions = [];

    for (let i = 0; i < TOTAL_RECORDS; i++) {
      questions.push({
        id: Bun.randomUUIDv7(), // C# Guid
        content: faker.lorem.sentence(),
        type: faker.helpers.arrayElement([
          QuestionTypes.MULTIPLE_CHOICE,
          QuestionTypes.COMPLEX_MULTIPLE_CHOICE,
          QuestionTypes.ESSAY,
        ]),
        created_at: faker.date.past(),
        updated_at: faker.date.recent(),
      });
    }

    await sql`
      INSERT INTO "questions" ${sql(
        questions,
        "id",
        "content",
        "type",
        "created_at",
        "updated_at"
      )}
    `;
  }
}

seed();
