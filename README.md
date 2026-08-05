# Runbook IT — Basis Pengetahuan Tim (versi server)

Aplikasi web untuk mencatat dan mencari riwayat insiden IT, lengkap dengan langkah penyelesaian, penyebab, dan lampiran bukti. Versi ini pakai backend **Node.js + Express** dan database **SQLite**, cocok di-hosting di VM internal supaya seluruh tim mengakses data yang sama secara terpusat.

## Fitur

- Catat insiden baru: judul, kategori, tingkat keparahan, gejala/masalah, penyebab, langkah penyelesaian, tags, pencatat.
- Lampiran (screenshot/foto/dokumen, maks. 800KB per file).
- Filter kategori, pencarian, dan ringkasan statistik.
- Edit & hapus insiden.
- Data tersimpan terpusat di database SQLite di server — semua anggota tim lihat data yang sama.

## Struktur Proyek

```
runbook-server/
├── server.js         # Backend Express (API + serve frontend)
├── package.json
├── public/
│   └── index.html    # Frontend (single-file HTML/CSS/JS)
└── data/
    └── runbook.db     # Database SQLite (dibuat otomatis saat pertama jalan)
```

## Cara Menjalankan (di VM internal)

**Prasyarat:** Node.js versi 18 ke atas sudah terpasang di VM.

```bash
# 1. Masuk ke folder project
cd runbook-server

# 2. Install dependency
npm install

# 3. Jalankan server
npm start
```

Setelah jalan, buka `http://<ip-vm-kamu>:3000` dari browser mana pun di jaringan internal.

Mau ganti port? Set environment variable `PORT`:
```bash
PORT=8080 npm start
```

## Menjalankan Terus-Menerus (Opsional)

Supaya server tetap jalan meski terminal ditutup atau VM restart, pakai [pm2](https://pm2.keymetrics.io/):

```bash
npm install -g pm2
pm2 start server.js --name runbook-it
pm2 save
pm2 startup   # ikuti instruksi yang muncul biar auto-start saat VM boot
```

## API

| Method | Endpoint          | Keterangan                          |
|--------|-------------------|--------------------------------------|
| GET    | `/api/incidents`  | Ambil semua insiden (array JSON)     |
| POST   | `/api/incidents`  | Simpan/replace seluruh daftar insiden|
| GET    | `/api/health`     | Cek status server                    |

## Backup Data

Semua data ada di satu file: `data/runbook.db`. Backup rutin cukup dengan copy file ini:

```bash
cp data/runbook.db backup/runbook-$(date +%Y%m%d).db
```

## Catatan & Batasan

- Lampiran disimpan langsung sebagai base64 di dalam database (mengikuti desain versi single-file sebelumnya). Ini simpel dan cukup untuk pemakaian tim kecil–menengah, tapi kalau lampiran sudah banyak dan besar, database bisa membengkak. Kalau nanti butuh skala lebih besar, lampiran sebaiknya dipindah jadi file terpisah di disk (bukan base64 di DB) — bisa diminta dibantu kalau perlu.
- Belum ada autentikasi/login. Kalau VM-nya bisa diakses banyak orang di luar tim IT, sebaiknya ditambah reverse proxy (nginx) dengan basic auth, atau batasi akses lewat firewall/VPN internal.
- Endpoint `POST /api/incidents` menerima seluruh daftar insiden sekaligus (bukan satu-per-satu), mengikuti pola penyimpanan versi sebelumnya. Cukup aman untuk data insiden dalam jumlah wajar (ratusan–ribuan entri).
