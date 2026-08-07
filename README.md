# IT Runbook — Lightweight Incident Logger

A lightweight web app for logging, searching, and managing IT incident history — with categories, severity levels, file attachments, and quick search. **Single-file version: no backend required.**

![type](https://img.shields.io/badge/type-single--file%20web%20app-c9a567)
![deployment](https://img.shields.io/badge/deployment-github%20pages-blue)
![storage](https://img.shields.io/badge/storage-localStorage-orange)

## 🎯 Quick Demo

**Live Demo:** [adiapandi.github.io/runbook-it](https://adiapandi.github.io/runbook-it)

### How it works in 30 seconds:
```
1. Log an incident → title, category, severity, problem description
2. Add root cause → what went wrong?
3. Add resolution steps → how was it fixed?
4. Attach screenshots/docs → drag & drop files
5. Save → searchable, tagged, categorized
6. Team searches for similar incidents → learns from history
```

### Visual Flow:
```
┌──────────────────────────────────┐
│     📋 IT RUNBOOK                 │
├──────────────────────────────────┤
│ 🔍 Search: [database down____]   │
│                                  │
│ 📂 Categories:     ⚡ Severity:  │
│  ✓ All            ✓ All         │
│  ○ Network        ○ Critical    │
│  ○ Database       ○ High        │
│  ○ Server         ○ Medium      │
│  ○ Application    ○ Low         │
│                                  │
│ 📌 Recent Incidents:             │
│ ┌────────────────────────────┐   │
│ │ Database Connection Timeout│   │
│ │ Category: Database | High  │   │
│ │ 2026-08-06 14:30          │   │
│ │ [View Details] [Edit] [X] │   │
│ └────────────────────────────┘   │
│                                  │
│ [+ New Incident]                │
└──────────────────────────────────┘
         ↓ (Click "View Details")
┌──────────────────────────────────┐
│   📝 Incident Details             │
├──────────────────────────────────┤
│ Title: Database Connection Timeout│
│ Category: Database                │
│ Severity: HIGH                    │
│ Reported by: Adi                  │
│                                  │
│ 🔴 Problem:                       │
│ "All users getting timeout        │
│  connecting to main database"     │
│                                  │
│ 🟢 Root Cause:                    │
│ "Max connections reached,         │
│  hanging queries not killed"      │
│                                  │
│ ✅ Resolution:                    │
│ "1. Identified long-running query│
│  2. Killed stale connections      │
│  3. Adjusted max_connections → 500│
│  4. Restarted database service"   │
│                                  │
│ 📎 Attachments:                   │
│  • error-logs.txt (125 KB)       │
│  • screenshot-ui.png (2.3 MB)    │
│                                  │
│ 🏷️  Tags: outage, database, urgent│
│                                  │
│         [Edit]  [Delete]  [Close]│
└──────────────────────────────────┘
```

## ✨ Features

- 📝 **Log incidents** — title, category, severity, symptoms, root cause, resolution steps, tags, reporter
- 🏷️ **Categories & severity levels** — organize by type (Network, Database, Server, etc.) and urgency (Critical, High, Medium, Low)
- 🔍 **Search & filter** — find similar incidents instantly
- 📎 **File attachments** — screenshots, error logs, configs (drag & drop)
- ✏️ **Edit & delete** — update entries or remove them
- 📊 **Statistics** — incident count by category and severity
- 💾 **Local storage** — data stays in your browser, no backend needed
- 🚀 **Deploy anywhere** — GitHub Pages, static hosting, or local file

## 🚀 Getting Started

### Option 1: Open Locally
```bash
git clone https://github.com/adiapandi/runbook-it.git
cd runbook-it
# Just open index.html in your browser
# Or serve it:
python3 -m http.server 8000
# Then visit http://localhost:8000
```

### Option 2: Deploy on GitHub Pages
```bash
1. Fork or push this repo to GitHub
2. Settings → Pages → Source: main branch, / (root)
3. Wait 1-2 minutes → live at https://yourusername.github.io/runbook-it
```

### Option 3: Use Anywhere
- Netlify, Vercel, any static host — just upload the files
- Corporate Intranet — serve from internal web server
- USB Drive — works offline, no backend required

## 📖 Usage Examples

### Example 1: Log a New Incident
```
1. Click [+ New Incident]
2. Fill in:
   - Title: "Production Database Down"
   - Category: "Database"
   - Severity: "Critical"
   - Problem: "All queries timing out after 3 PM"
   - Root Cause: "Disk space full on database server"
   - Resolution: "Cleared logs, added more disk, restarted service"
   - Tags: "outage, urgent, resolved"
   - Reporter: your name
3. Drag & drop error logs or screenshots
4. Click [Save] → incident is searchable immediately
```

### Example 2: Find & Learn from Past Incidents
```
1. Search for: "database"
2. Filter by: Category = "Database", Severity = "High"
3. Click [View Details] on a similar incident
4. Learn what the root cause was & how it was fixed
5. Apply same solution to current issue
```

### Example 3: Backup Your Data
```
Data is stored in browser's localStorage automatically.
To backup:
1. Open browser DevTools (F12)
2. Storage → Local Storage → select the site
3. Right-click → "Copy All"
4. Paste into a text file → backup created

(In future: we'll add an export feature for easier backups)
```

## 📦 File Structure

```
runbook-it/
├── index.html        # Complete single-file app (HTML + CSS + JS)
├── README.md         # This file
└── (no backend, no dependencies)
```

## 🛠️ Tech Stack

- Vanilla HTML/CSS/JavaScript — no framework, no build step
- Browser `localStorage` — data persistence
- No backend, no database server required

## ⚠️ Data Persistence Notes

- **Local to your browser** — each browser/device has independent data
- **Survives page refresh** — data persists in localStorage
- **Lost if cache is cleared** — clearing browser data will erase incidents
- **No cloud sync** — use backup feature when available

**Best practice:** Periodically backup your incidents (see backup section above).

## 🗂️ Categories & Severity Reference

### Categories (default):
- Network
- Database
- Server
- Application
- Security
- Infrastructure

### Severity Levels:
- **Critical** — service completely down, all users affected
- **High** — significant impact, partial outage or degraded performance
- **Medium** — some users affected, workaround available
- **Low** — minor issue, cosmetic or one user affected

## 🎯 Use Cases

✅ IT team knowledge base  
✅ Incident post-mortems  
✅ Troubleshooting reference  
✅ Root cause analysis tracking  
✅ SLA documentation  
✅ On-call runbook  

## 🚀 Future Ideas

- [ ] Export incidents to PDF
- [ ] Dark/light theme
- [ ] Incident timeline view
- [ ] MTTR (Mean Time To Resolution) analytics
- [ ] Multi-team support
- [ ] Integration with ticketing systems

## 📄 License

MIT — free to use, modify, and distribute.

---

**Have suggestions?** Open an issue on the repository!

© 2026 adiapandi
