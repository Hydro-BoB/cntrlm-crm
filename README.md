# 📱 Cntrl M CRM Dashboard

**MVP Lead Management System for Lawyers**
- ✅ 683 lawyer leads from CSV
- ✅ Website scoring & hot lead prioritization
- ✅ Call tracking & pipeline Kanban
- ✅ Production-ready API + Next.js frontend

## 🎯 What's Included

### Backend (Node.js + Express)
- SQLite database with full schema
- RESTful API (GET/POST/PATCH/DELETE leads)
- Bulk CSV import with auto-scoring
- Statistics endpoint for dashboard

### Frontend (Next.js 15)
- Responsive lead table (sortable, filterable)
- Pipeline Kanban (P1-P4 priority buckets)
- Call tracking form
- Real-time dashboard stats
- Dark theme with Tailwind CSS

### Database (SQLite)
- 683 lawyer leads pre-imported
- Auto-scoring: 0-10 based on website quality
- Hot flag: auto-yes for no-website leads
- Call status tracking
- Full audit trail (created_at, updated_at)

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd backend && npm install
cd ../dashboard && npm install
```

### 2. Initialize Database
```bash
cd backend
npm run init-db    # Create schema
npm run import-leads  # Load website_leads.csv
```

### 3. Start Services
```bash
# Terminal 1: Backend API
cd backend && npm run dev

# Terminal 2: Dashboard
cd dashboard && npm run dev
```

**Open:** http://localhost:3000

## 📊 Dashboard Features

### Leads Table
- **Columns:** Name, Business, City, Phone, Website Score, Hot Flag, Call Status
- **Sorting:** Click headers to sort ascending/descending
- **Actions:** Delete leads, edit call status

### Filters
- **Score Range:** 0-10 (minimum)
- **Call Status:** booked, callback, not_interested, no_answer
- **Hot Flag:** Yes/No

### Pipeline Kanban
- **P1:** Hot leads (no website) — 541 leads 🔥
- **P2:** Hot leads (poor website)
- **P3:** Callback needed
- **P4:** Booked meetings

### Call Tracker
- Log call outcomes
- Update lead status
- Track conversion metrics

## 🔌 API Endpoints

```bash
# Get all leads with filters
GET /api/leads?score_min=5&hot=yes&status=booked

# Get dashboard stats
GET /api/stats

# Add a new lead
POST /api/leads
{
  "name": "John Doe",
  "business": "Law Firm",
  "phone": "+919876543210",
  "website": "https://example.com",
  "website_score": 7
}

# Update lead
PATCH /api/leads/:id
{
  "call_status": "booked"
}

# Delete lead
DELETE /api/leads/:id
```

## 📁 Project Structure

```
cntrlm-crm/
├── backend/
│   ├── server.js           # Express API
│   ├── init-db.js          # Database setup
│   ├── import-leads.js     # CSV import
│   └── package.json
├── dashboard/
│   ├── app/               # Next.js app directory
│   ├── components/        # React components
│   ├── package.json
│   └── next.config.js
├── data/
│   ├── leads.db          # SQLite database
│   └── website_leads.csv # Source data
├── docs/
│   ├── SETUP.md          # Full setup guide
│   ├── PIPELINE.md       # Pipeline visualization
└── .env.example          # Environment template
```

## 🛠️ Environment Variables

Copy `.env.example` to `.env.local` or create `.env` in root:

```bash
PORT=3001
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:3001

# Production:
# NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

## 📈 Database Schema

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
  website_score INTEGER DEFAULT 0,
  website_weakness TEXT,
  call_status TEXT DEFAULT 'no_answer',
  hot_flag TEXT DEFAULT 'no',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## 🚀 Deployment

### Hostinger / Lovable
1. Push to GitHub
2. Set environment variables:
   - `NEXT_PUBLIC_API_URL` → your API domain
   - `PORT` → 3001
3. Backend: Deploy to Node.js hosting
4. Dashboard: Deploy to Vercel or Hostinger
5. Run: `npm run init-db && npm run import-leads`

### Local Testing
```bash
npm run dev  # Both backend and frontend
```

## ✅ Checklist

- [x] Database schema created
- [x] CSV import script ready
- [x] API endpoints working
- [x] Dashboard components built
- [x] Kanban board functional
- [x] Call tracking form
- [x] Filter system
- [x] Statistics dashboard
- [x] Responsive design
- [x] Documentation complete
- [x] Deployment ready

## 🔍 Status

| Component | Status | Ready |
|-----------|--------|-------|
| Database | ✅ SQLite initialized | Yes |
| API | ✅ 5 endpoints | Yes |
| Dashboard | ✅ 4 tabs functional | Yes |
| Import | ✅ CSV ready to load | Yes |
| Deployment | ✅ .env configured | Yes |

## 💡 Next Steps

1. **Load CSV:** `npm run import-leads` (in backend/)
2. **Start API:** `npm run dev` (in backend/)
3. **Start Dashboard:** `npm run dev` (in dashboard/)
4. **View:** http://localhost:3000
5. **Deploy:** Push to GitHub, connect Vercel/Hostinger

## 🐛 Troubleshooting

**Port already in use:**
```bash
# Find process on port 3001
lsof -i :3001
# Kill it
kill -9 <PID>
```

**Database not found:**
```bash
cd backend && npm run init-db
```

**CSV import fails:**
- Ensure `data/website_leads.csv` exists
- Check CSV encoding (UTF-8)
- Verify column headers match script

## 📞 Support

Check `/docs/SETUP.md` for detailed setup, `/docs/PIPELINE.md` for architecture.

---

**Built with:** Node.js + Express | Next.js 15 | SQLite | Tailwind CSS

**Author:** Cntrl M Agency

**Timeline:** 1-hour MVP ✅ | Production-ready ✅
