# IT Runbook — Team Knowledge Base (server version)

A web app for logging and searching IT incident history, complete with resolution steps, root causes, and supporting attachments. This version uses a **Node.js + Express** backend with a **SQLite** database, making it suitable for hosting on an internal VM so the whole team accesses the same centralized data.

## Features

- Log new incidents: title, category, severity, symptoms/problem, root cause, resolution steps, tags, reporter.
- Attachments (screenshots/photos/documents, max 800KB per file).
- Category filtering, search, and summary statistics.
- Edit & delete incidents.
- Data stored centrally in a SQLite database on the server — the whole team sees the same data.

## Project Structure

```
runbook-it/
├── server.js         # Express backend (API + serves frontend)
├── package.json
├── public/
│   └── index.html    # Frontend (single-file HTML/CSS/JS)
└── data/
    └── runbook.db     # SQLite database (created automatically on first run)
```

## Running It (on an internal VM)

**Prerequisite:** Node.js version 18 or later installed on the VM.

```bash
# 1. Go into the project folder
cd runbook-it

# 2. Install dependencies
npm install

# 3. Start the server
npm start
```

Once running, open `http://<your-vm-ip>:3000` from any browser on the internal network.

Want a different port? Set the `PORT` environment variable:
```bash
PORT=8080 npm start
```

## Keep It Running (Optional)

To keep the server running after closing the terminal or after a VM restart, use [pm2](https://pm2.keymetrics.io/):

```bash
npm install -g pm2
pm2 start server.js --name runbook-it
pm2 save
pm2 startup   # follow the printed instructions to auto-start on VM boot
```

## API

| Method | Endpoint          | Description                            |
|--------|-------------------|------------------------------------------|
| GET    | `/api/incidents`  | Get all incidents (JSON array)           |
| POST   | `/api/incidents`  | Save/replace the entire incident list    |
| GET    | `/api/health`     | Check server status                      |

## Backing Up Data

All data lives in a single file: `data/runbook.db`. Regular backups are as simple as copying this file:

```bash
cp data/runbook.db backup/runbook-$(date +%Y%m%d).db
```

## Notes & Limitations

- Attachments are stored directly as base64 inside the database (following the design of the earlier single-file version). This is simple and works fine for a small-to-medium team, but if attachments grow large and numerous, the database can bloat. If you need to scale up later, attachments should be moved to separate files on disk instead of base64 in the DB — happy to help with that when needed.
- No authentication/login yet. If the VM is reachable by people outside the IT team, consider adding a reverse proxy (nginx) with basic auth, or restricting access via firewall/internal VPN.
- The `POST /api/incidents` endpoint accepts the entire incident list at once (not one-by-one), following the same storage pattern as the previous version. This is fine for a reasonable number of records (hundreds to thousands of entries).
