import { migrate } from "drizzle-orm/bun-sql/migrator";
import { db, client } from "./db";

async function runMigration() {
  // ID unik untuk lock migrasi kita (angka sembarang)
  const MIGRATION_LOCK_ID = 123;

  try {
    console.log("🔒 Mencoba mendapatkan lock migrasi...");

    // 1. Dapatkan Lock (Mencegah dua proses migrasi berjalan bersamaan)
    // pg_advisory_xact_lock akan otomatis lepas saat transaksi/koneksi selesai
    await client`SELECT pg_advisory_lock(${MIGRATION_LOCK_ID})`;
    console.log("🔐 Lock didapatkan. Memulai migrasi...");

    // 2. Eksekusi Migrasi
    await migrate(db, { migrationsFolder: "./drizzle" });

    console.log("✅ Migrasi selesai dengan sukses!");
  } catch (error) {
    console.error("❌ Terjadi kesalahan saat migrasi:");
    console.error(error);

    // Keluar dengan kode error agar Docker tahu ini gagal
    process.exit(1);
  } finally {
    // 3. Lepas Lock dan Tutup Koneksi
    await client`SELECT pg_advisory_unlock(${MIGRATION_LOCK_ID})`;
    await client.close();
    console.log("👋 Koneksi ditutup.");
  }
}

runMigration();
