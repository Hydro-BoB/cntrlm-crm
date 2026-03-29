# Cntrl M CRM - Setup Guide

## 📁 Project Structure

```
cntrlm-crm/
├── backend/              # Node.js + Express API
│   ├── server.js        # Main API server
│   ├── init-db.js       # Database initialization
│   ├── import-leads.js  # CSV import script
│   └── package.json
├── dashboard/           # Next.js 15 frontend
│   ├── app/
│   ├── components/
│   ├── package.json
│   └── next.config.js
├── data/               # SQLite database + CSV
│   ├── leads.db        # (Generated after init)
│   └── website_leads.csv # (Place your CSV here)
├── docs/              # Documentation
└── .env.example       # Environment template
```

## 🚀 Quick Start (Local Development)

### 1. Install Dependencies

```bash
# Backend
cd backend
npm install

# Dashboard (in new terminal)
cd ../dashboard
npm install
```

### 2. Initialize Database

```bash
cd backend
npm run init-db
```

This creates `/data/leads.db` with the full schema.

### 3. Import CSV Data

```bash
# Place website_leads.csv in /data/ folder first
npm run import-leads
```

Output:
```
📥 Importing CSV from: .../data/website_leads.csv
  📊 Imported 100 leads...
  📊 Imported 200 leads...
  ...
✅ Import complete!
   ✓ Imported: 683
   ⊘ Skipped: 0

📈 Database stats:
   Total leads: 683
   Hot leads (no website): 541
   No website score: 541
```

### 4. Start Backend API

```bash
npm run dev
# Listening on http://localhost:3001
```

### 5. Start Dashboard (new terminal)

```bash
cd dashboard
npm run dev
# Listening on http://localhost:3000
```

## 📊 Database Schema

```sql
CREATE TABLE leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  business TEXT,
  category TEXT,
  city TEXT,
  country TEXT,
  website TEXT,
  website_score INTEGER DEFAULT 0,    -- 0-10, auto: 0 if no website
  website_weakness TEXT,
  call_status TEXT DEFAULT 'no_answer', -- booked/callback/not_interested/no_answer
  hot_flag TEXT DEFAULT 'no',           -- yes/no (auto: yes if no website)
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## 🔌 API Endpoints

### GET /api/leads
Fetch all leads with optional filters.

**Query Parameters:**
- `score_min`: Minimum website score (0-10)
- `status`: Call status filter (booked/callback/not_interested/no_answer)
- `hot`: Hot flag filter (yes/no)
- `sort`: Sort field (default: created_at)
- `order`: Sort order (ASC/DESC, default: DESC)

**Example:**
```bash
curl "http://localhost:3001/api/leads?score_min=5&hot=yes&sort=website_score"
```

### GET /api/stats
Get dashboard statistics.

**Response:**
```json
{
  "success": true,
  "data": {
    "totalLeads": 683,
    "hotLeads": 541,
    "callsBooked": 23,
    "conversionRate": "3.37%"
  }
}
```

### POST /api/leads
Add a new lead.

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+919876543210",
  "business": "Law Firm",
  "category": "Corporate",
  "city": "Kochi",
  "country": "India",
  "website": "https://example.com",
  "website_score": 7
}
```

### PATCH /api/leads/:id
Update a lead's call status or website info.

**Body:**
```json
{
  "call_status": "booked",
  "website_score": 8,
  "website_weakness": "Poor mobile UX"
}
```

### DELETE /api/leads/:id
Delete a lead.

## 🎯 Dashboard Features

### Tabs
1. **Leads Table** — All leads, sortable by any column
2. **Pipeline Kanban** — P1-P4 priority buckets
3. **Call Tracker** — Log call outcomes

### Filters
- **Min Website Score** — 0-10 range
- **Call Status** — booked/callback/not_interested/no_answer
- **Hot Flag** — yes/no

### Quick Stats
- Total Leads
- Hot Leads (no website)
- Calls Booked
- Conversion Rate %

## 📤 Deployment (Hostinger / Lovable)

### Environment Variables
Copy `.env.example` to `.env.local`:

```bash
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
PORT=3001
NODE_ENV=production
```

### Backend Deployment
1. Push code to GitHub
2. Deploy to Hostinger/Railway/Render
3. Set environment variables
4. Run `npm install && npm run init-db && npm run import-leads`
5. Start server: `npm start`

### Dashboard Deployment
1. Push code to Vercel or Hostinger
2. Set `NEXT_PUBLIC_API_URL` to your backend URL
3. Deploy: `npm run build && npm start`

## 🐛 Troubleshooting

**"Failed to fetch"**
- Check if backend is running on port 3001
- Verify `NEXT_PUBLIC_API_URL` in `.env.local`

**"Database locked"**
- Only one process can write at a time
- Stop background jobs or import scripts

**CSV Import Errors**
- Ensure CSV has headers: name, email, phone, business, category, city, country, website, rating
- Check for UTF-8 encoding

## 📞 Support

For issues:
1. Check `/data/leads.db` exists
2. Verify API is responding: `curl http://localhost:3001/api/stats`
3. Check browser console for frontend errors

---

**MVP Status:** ✅ Database | ✅ API | ✅ Dashboard | ✅ Import Script | Ready for production
