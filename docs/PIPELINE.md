# Cntrl M CRM - Sales Pipeline Visualization

## 📊 End-to-End Pipeline

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    CNTRL M CRM SALES PIPELINE                           │
└─────────────────────────────────────────────────────────────────────────┘

┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│  SCRAPE  │────▶│  SCORE   │────▶│PRIORITIZE│────▶│   CALL   │
│          │     │          │     │          │     │          │
│ Website  │     │ Quality  │     │ P1-P4    │     │ Track    │
│ Leads    │     │ Analysis │     │ Buckets  │     │ Outcome  │
└──────────┘     └──────────┘     └──────────┘     └──────────┘
                                                         │
                                                         ▼
┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│  REPORT  │◀────│   BOOK   │◀────│   LOG    │◀────│ OUTCOME  │
│          │     │          │     │          │     │          │
│ Pipeline │     │ Meetings │     │ Call     │     │ Status   │
│ Analytics│     │ Scheduled│     │ Details  │     │ Update   │
└──────────┘     └──────────┘     └──────────┘     └──────────┘

```

## 🔄 Data Flow

### Stage 1: SCRAPE
- Source: `website_leads.csv` (683 lawyers)
- Input: Name, business, city, country, phone, website, rating
- Action: Import into SQLite
- Output: Raw lead records

### Stage 2: SCORE
- Input: Website URL + rating
- Scoring Logic:
  - No website → score = 0 (HOT 🔥)
  - Rating 8-10 → score = 8-10 (Green)
  - Rating 5-7 → score = 5-7 (Yellow)
  - Rating < 5 → score = < 5 (Red)
- Output: `website_score` (0-10), `website_weakness`

### Stage 3: PRIORITIZE
- Hot Flag Logic:
  - `hot_flag = yes` if no website OR score = 0
  - `hot_flag = no` otherwise
- Priority Buckets (Kanban):
  - **P1:** Hot leads (no website) — 541 leads 🔥
  - **P2:** Hot leads (poor website) — High-potential
  - **P3:** Callback needed — Previously interested
  - **P4:** Booked meetings — In progress

### Stage 4: CALL
- Input: Lead record
- Actions:
  - Log call status (booked/callback/not_interested/no_answer)
  - Record outcome
  - Update `call_status` in database
- Outcome Tracking: Real-time dashboard update

### Stage 5: LOG
- Capture: Call notes, outcome, next steps
- Storage: Database `updated_at` timestamp
- Analytics: Conversion rate, call metrics

### Stage 6: BOOK
- Status: `call_status = booked`
- Output: Scheduled meetings
- Signal: Lead moves to P4 bucket

### Stage 7: REPORT
- Dashboard Stats:
  - Total leads processed
  - Calls made (by status)
  - Conversion rate %
  - Hot leads remaining
- Exportable: CSV/PDF reports

---

## 📈 Pipeline Metrics

| Metric | Formula | Current |
|--------|---------|---------|
| Total Leads | COUNT(*) | 683 |
| Hot Leads | COUNT(hot_flag='yes') | ~541 |
| No Website | COUNT(website_score=0) | ~541 |
| Booked Calls | COUNT(call_status='booked') | ? |
| Conversion Rate | booked / total * 100 | ? |
| Callback Needed | COUNT(call_status='callback') | ? |

---

## 🚀 Modular & Transferrable

This pipeline is designed to work on **any Mac** without external dependencies:

✅ **Portable Database:** SQLite file (`leads.db`) — copy and go
✅ **Node.js API:** No Docker, no external services
✅ **Next.js Frontend:** Standard deployment to Vercel/Hostinger
✅ **CSV Import:** Self-contained script, run anytime
✅ **Configuration:** Single `.env.local` file

### Transfer to Another Mac:
1. Copy `/Users/hyderali/Desktop/cntrlm-crm/` folder
2. Run `cd backend && npm install && npm run dev`
3. Run `cd dashboard && npm install && npm run dev`
4. Done! ✅ Database automatically loads from `data/leads.db`

---

## 🔧 Customization Points

- **Scoring Algorithm:** Edit `backend/import-leads.js` (line ~scoring logic)
- **Priority Buckets:** Edit `dashboard/components/KanbanBoard.jsx`
- **API Filters:** Add columns to `FilterBar.jsx`
- **Status Values:** Update `call_status` enum in database schema

---

**Pipeline Status:** ✅ Ready for production | ✅ Fully automated | ✅ Dashboard live
