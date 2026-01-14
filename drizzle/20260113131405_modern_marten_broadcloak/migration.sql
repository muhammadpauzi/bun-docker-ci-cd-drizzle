CREATE TABLE "questions" (
	"id" char(36) PRIMARY KEY NOT NULL,
	"content" varchar NOT NULL,
	"type" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
