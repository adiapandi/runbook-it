const express = require('express');
const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');

const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');
const DB_PATH = path.join(DATA_DIR, 'runbook.db');

// Pastikan folder data ada
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

// Setup database
const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');
db.exec(`
  CREATE TABLE IF NOT EXISTS store (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TEXT NOT NULL
  )
`);

const STORE_KEY = 'runbook-articles';

const app = express();
app.use(express.json({ limit: '25mb' })); // lampiran base64 butuh limit lebih besar dari default
app.use(express.static(path.join(__dirname, 'public')));

// Ambil semua insiden
app.get('/api/incidents', (req, res) => {
  try {
    const row = db.prepare('SELECT value FROM store WHERE key = ?').get(STORE_KEY);
    res.json(row ? JSON.parse(row.value) : []);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Gagal membaca data' });
  }
});

// Simpan (replace) seluruh daftar insiden
app.post('/api/incidents', (req, res) => {
  const list = req.body;
  if (!Array.isArray(list)) {
    return res.status(400).json({ error: 'Payload harus berupa array insiden' });
  }
  try {
    const value = JSON.stringify(list);
    db.prepare(`
      INSERT INTO store (key, value, updated_at) VALUES (?, ?, datetime('now'))
      ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at
    `).run(STORE_KEY, value);
    res.json({ ok: true, count: list.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Gagal menyimpan data' });
  }
});

// Cek kesehatan server (buat monitoring/VM)
app.get('/api/health', (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Runbook IT server jalan di http://localhost:${PORT}`);
  console.log(`Database: ${DB_PATH}`);
});
