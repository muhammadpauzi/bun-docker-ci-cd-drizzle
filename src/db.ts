import { drizzle } from "drizzle-orm/bun-sql";
import { SQL } from "bun";
import * as schema from "./schema";

export const client = new SQL({
  url: Bun.env.DATABASE_URL!,
  // Pengaturan Pool untuk VPS 2GB
  max: 10, // Batas maksimal koneksi simultan (sesuai max_connections di Docker)
  idleTimeout: 30, // Tutup koneksi nganggur setelah 30 detik untuk hemat RAM
  connectTimeout: 5, // Gagal jika tidak konek dalam 5 detik
});

export const db = drizzle({ client, schema });
