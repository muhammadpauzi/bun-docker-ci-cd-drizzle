# Variabel
APP_NAME=letsee

.PHONY: up down restart logs build ps clean

# Menjalankan semua container di background
up:
	docker compose up -d

# Mematikan semua container
down:
	docker compose down

# Rebuild image dan jalankan ulang (Gunakan ini jika ada perubahan kode)
deploy:
	docker compose up -d --build

# Melihat log dari semua service secara real-time
logs:
	docker compose logs -f

# Melihat log khusus API Bun
logs-api:
	docker compose logs -f api

# Melihat log khusus Worker Bun
logs-worker:
	docker compose logs -f worker

# Cek status container
ps:
	docker compose ps

# Membersihkan image yang tidak terpakai (menghemat disk VPS)
clean:
	docker image prune -f

stats:
	docker stats --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.MemPerc}}"

db-shell:
	docker exec -it main_db psql -U ${DB_USER} -d ${DB_NAME}