import { db } from "./db";
import index from "./index.html";
import { questionsTable } from "./schema";

export const server = Bun.serve({
  port: 3000,
  hostname: "0.0.0.0",
  routes: {
    "/*": index,
    "/api/questions": async () =>
      Response.json({
        data: await db.select().from(questionsTable).offset(2000).limit(100),
      }),
    "/api/status": Response.json({
      message: "OK",
      ts: Date.now(),
    }),

    "/api/*": Response.json({ message: "Not Found" }, { status: 404 }),
  },
});

console.log(`Server running at ${server.url}`);

const shutdown = async () => {
  console.log("Shutting down gracefully...");

  // 1. Berhenti menerima request baru
  server.stop();

  // 2. Tutup koneksi ke Database/Redis (jika ada)
  // await db.close();
  // await redis.quit();

  console.log("Cleanup complete. Goodbye!");
  process.exit(0);
};

// Tangkap sinyal dari Docker (SIGTERM) dan Ctrl+C (SIGINT)
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
