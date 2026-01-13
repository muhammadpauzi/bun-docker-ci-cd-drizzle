import { migrate } from "drizzle-orm/bun-sql/migrator";
import { db } from "./db";
import type { MigrationConfig } from "drizzle-orm/migrator";

const migrationConfig: MigrationConfig = {
  migrationsFolder: "./drizzle",
};

//Execute Migrations
const migratation = async () => await migrate(db, migrationConfig);
migratation();
