let isShuttingDown = false;
let activeJobs = 0;

const processJob = async (job: { id: string }) => {
  activeJobs++;
  try {
    console.log(`Processing job: ${job.id}`);
    // Simulasi proses berat
    await Bun.sleep(5000);
    console.log(`Job ${job.id} done!`);
  } finally {
    activeJobs--;
    if (isShuttingDown && activeJobs === 0) {
      console.log("Last job finished. Exiting process.");
      process.exit(0);
    }
  }
};

// Simulasi Loop Pengambil Job (misal dari Redis)
const startWorker = async () => {
  while (!isShuttingDown) {
    await processJob({
      id: Bun.randomUUIDv7(),
    });

    await Bun.sleep(1000);
  }
};

const shutdown = async () => {
  console.log("Worker received shutdown signal. Stopping new jobs...");
  isShuttingDown = true;

  // Berikan batas waktu paksa (timeout) jika job macet terlalu lama
  setTimeout(() => {
    console.error("Forcing shutdown after 60s timeout.");
    process.exit(1);
  }, 60000);

  if (activeJobs === 0) {
    console.log("No active jobs. Exiting immediately.");
    process.exit(0);
  }
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

startWorker();
