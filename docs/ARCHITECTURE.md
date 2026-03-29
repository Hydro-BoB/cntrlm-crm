# Cntrl M CRM — Modular Architecture

## Overview
Every component is portable. Copy the folder, run `npm install`, and you're live on a new Mac.

```
cntrlm-crm/
├── backend/                  # Node.js + Express API
│   ├── server.js            # Main API server (REST endpoints)
│   ├── db.js                # SQLite connection + initialization
│   ├── package.json         # Dependencies (frozen, npm install = reproducible)
│   ├── package-lock.json    # Exact versions
│   └── .env                 # Environment variables
│
├── dashboard/               # Next.js React frontend
│   ├── pages/              # API routes + pages
│   ├── components/         # Reusable React components
│   ├── public/             # Static assets
│   ├── next.config.js      # Next.js config (API URL env)
│   └── package.json        # Dependencies
│
├── data/                   # Database + imports
│   ├── cntrlm.db          # SQLite database (auto-created)
│   └── leads-import.csv   # Bulk import template
│
├── pipeline-map/          # Visual workflow documentation
│   ├── pipeline.png       # Diagram (Scrape → Score → Prioritize → Call → Log → Book → Report)
│   └── README.md          # Explanation of each step
│
├── scripts/               # Utilities
│   ├── import-csv.js      # Bulk import leads from CSV
│   ├── backup-db.js       # Backup database to timestamped file
│   └── seed-demo.js       # Populate with demo data
│
├── docs/                  # Documentation (you are here)
│   ├── DATABASE_SCHEMA.md
│   ├── API_REFERENCE.md
│   ├── ARCHITECTURE.md    (this file)
│   ├── SETUP.md
│   └── TRANSFER.md
│
└── README.md             # Quick start
```

## Design Principles

### 1. **No External Dependencies**
- SQLite (local, file-based, zero setup)
- Express (lightweight API)
- Next.js (standard React framework)
- No cloud services, no API keys needed for basic setup

### 2. **Portable = Copy & Paste**
- Database lives in `/data/` (travels with the folder)
- All config in `.env` (single source of truth)
- Dependencies frozen in `package-lock.json`
- Script: `cp -r cntrlm-crm /path/on/new/mac && cd cntrlm-crm/backend && npm install && npm start`

### 3. **Modular = Easy to Extend**
Each part is independent:
- Backend talks REST (can swap UI)
- Database schema is simple (easy migrations)
- Scripts are standalone (can run independently)
- Docs explain everything (no magic)

### 4. **Local-First Development**
- Backend: `npm start` → runs on `http://localhost:5000`
- Dashboard: `npm run dev` → runs on `http://localhost:3000`
- Database: auto-creates on first run
- No waiting for cloud, no internet needed for dev

---

## Data Flow

```
CSV Import
    ↓
Backend API (REST)
    ↓
SQLite Database
    ↓
Dashboard Frontend (Next.js)
    ↓
Lead Management UI (add, edit, filter, search)
    ↓
Call Outcome Tracking
    ↓
Pipeline Visualization (Kanban/Funnel)
```

---

## API Layer

**File:** `backend/server.js`

Handles:
- ✅ CRUD operations (Create, Read, Update, Delete leads)
- ✅ Filtering (by status, priority, hot flag)
- ✅ Search (name, email, business)
- ✅ Statistics (pipeline stats, hot leads)
- ✅ Bulk operations (via CSV import script)

**Endpoints:**
```
GET    /health                 # Health check
GET    /leads                  # List with filters
GET    /leads/:id              # Single lead
POST   /leads                  # Create
PATCH  /leads/:id              # Update
DELETE /leads/:id              # Delete
GET    /stats/pipeline         # Stats by status
GET    /stats/hot-leads        # Hot leads
```

---

## Database Layer

**File:** `backend/db.js`

Handles:
- ✅ Connection pooling
- ✅ Table initialization (auto-creates on first run)
- ✅ Index creation (fast searches)
- ✅ Error handling

**Tables:**
- `leads` — Main data table

**Future tables (when needed):**
- `call_logs` — Track every call/interaction
- `templates` — Email/SMS templates
- `users` — Team members + permissions
- `reports` — Generated reports/exports

---

## Frontend Layer

**File:** `dashboard/` (To be built in Phase 3)

Will handle:
- ✅ Lead table (sortable, filterable)
- ✅ Add/edit forms
- ✅ Website scoring UI
- ✅ Call outcome tracking
- ✅ Pipeline visualization (Kanban/funnel)
- ✅ Bulk actions (import, export)

---

## Scripts

**Location:** `scripts/`

### CSV Import (`import-csv.js`)
Load leads from CSV file:
```bash
node scripts/import-csv.js data/leads-import.csv
```

### Backup Database (`backup-db.js`)
Automatic backups:
```bash
node scripts/backup-db.js
```
Creates timestamped backup in `data/backups/`.

### Seed Demo Data (`seed-demo.js`)
Populate with test data:
```bash
node scripts/seed-demo.js
```

---

## Transfer Checklist

Moving to new Mac?

1. ✅ Copy entire `cntrlm-crm/` folder
2. ✅ `cd backend && npm install`
3. ✅ `npm start` (DB auto-creates)
4. ✅ `cd ../dashboard && npm install`
5. ✅ `npm run dev`
6. ✅ Open `http://localhost:3000`

**No manual setup, no cloud setup, no API keys.**

---

## Future Expansion

### Phase 3 Additions
- [ ] Lead table component (shadcn/ui)
- [ ] Filter sidebar
- [ ] Add lead form (modal)
- [ ] Search bar (real-time)
- [ ] Call tracking UI
- [ ] Pipeline Kanban view

### Phase 4 Additions
- [ ] Pipeline map diagram (SVG/Mermaid)
- [ ] Modular boxes (Scrape → Score → Prioritize → Call → Log → Book → Report)
- [ ] Process documentation

### Future Phases
- [ ] Multi-user support (login, role-based access)
- [ ] Call logs table (detailed call history)
- [ ] Email/SMS templates
- [ ] Automatic lead scoring algorithm
- [ ] Bulk email/SMS campaigns
- [ ] Google Sheets sync
- [ ] WhatsApp integration
- [ ] Analytics dashboard (MoM growth, conversion rates)

---

## Tech Stack Summary

| Layer | Tech | Why |
|-------|------|-----|
| Backend | Node.js + Express | Fast, lightweight, npm ecosystem |
| Database | SQLite | Zero setup, portable, fast for <50k records |
| Frontend | Next.js + React | Modern, fast, great DX |
| Styling | shadcn/ui (Phase 3) | Beautiful, accessible, Tailwind-based |
| Hosting | Local (no cloud needed) | Dev/testing on any Mac |

---

## Performance Notes

- **Current:** Handles ~10k-100k leads efficiently
- **Scaling:** If >100k leads, consider PostgreSQL (drop-in replacement for SQLite)
- **Indexes:** Added on email, call_status, hot_flag for fast filtering
- **Caching:** Can add Redis later if needed

---

## Questions?

Check `docs/SETUP.md` for quick start or `docs/TRANSFER.md` for move instructions.
