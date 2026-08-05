# Runbook IT — Basis Pengetahuan Tim

Aplikasi web ringan untuk mencatat dan mencari riwayat insiden IT, lengkap dengan langkah penyelesaian, penyebab, dan lampiran bukti. Cocok dipakai sebagai basis pengetahuan (knowledge base) internal tim IT.

## Fitur

- **Catat insiden baru** — judul, kategori, tingkat keparahan, gejala/masalah, penyebab, langkah penyelesaian (multi-step), tags, dan pencatat.
- **Lampiran** — upload screenshot, foto, atau dokumen (PDF/Word/txt/log) langsung saat mencatat insiden, maks. 800KB per file.
- **Kategori & filter** — kelompokkan insiden per kategori, filter cepat dari sidebar.
- **Pencarian** — cari insiden berdasarkan judul, gejala, atau tags.
- **Statistik** — ringkasan jumlah insiden per kategori/tingkat keparahan.
- **Edit & hapus** — insiden bisa diperbarui atau dihapus kapan saja.
- **Data tersimpan otomatis** — data disimpan sebagai *shared storage*, jadi bisa diakses bareng-bareng oleh semua anggota tim yang membuka aplikasi ini.

## Cara Pakai

1. Buka file `runbook.html` langsung di browser (double-click, atau lewat `File > Open`).
2. Klik **Catat Insiden Baru** untuk menambah entri.
3. Isi detail insiden, lampirkan bukti kalau ada, lalu simpan.
4. Gunakan sidebar kategori atau kolom pencarian untuk menemukan insiden lama.

## Struktur Proyek

```
runbook-it/
├── runbook.html   # Aplikasi utama (HTML + CSS + JS, single file)
└── README.md
```

## Overview

```
<img width="1113" height="381" alt="home" src="https://github.com/user-attachments/assets/6b8c9565-3b59-4cc8-b2c9-046cacde0e99" />
<img width="444" height="647" alt="form add incident" src="https://github.com/user-attachments/assets/ac1f98c2-2d56-432e-a0c0-8df347f567e4" />
<img width="1017" height="647" alt="statistik" src="https://github.com/user-attachments/assets/31ebec70-46dd-40b6-9436-60c6130ed3df" />
```

## Catatan

- Data insiden bersifat *shared* — semua orang yang mengakses aplikasi ini melihat data yang sama.
- Lampiran disimpan langsung di dalam data insiden, jadi disarankan tidak melampirkan file besar (maks. 800KB per file) supaya penyimpanan tidak cepat penuh.
