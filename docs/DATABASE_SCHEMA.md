# Cntrl M CRM — Database Schema

## Overview
Single SQLite database (`cntrlm.db`) stored in `/data/` for easy portability across machines.

## Leads Table

| Field | Type | Description | Default |
|-------|------|-------------|---------|
| `id` | INTEGER PK | Unique identifier | Auto-increment |
| `name` | TEXT | Lead name (required) | — |
| `email` | TEXT | Email (required, unique) | — |
| `phone` | TEXT | Phone number | NULL |
| `business` | TEXT | Company/business name | NULL |
| `website` | TEXT | Website URL | NULL |
| `website_score` | INTEGER | Lead quality score (0-100) | 0 |
| `call_status` | TEXT | Call tracking status | `not_called` |
| `hot_flag` | INTEGER | Hot lead flag (0/1) | 0 |
| `priority` | INTEGER | Priority level (1-4) | 4 |
| `notes` | TEXT | Internal notes | NULL |
| `created_at` | DATETIME | Creation timestamp | NOW |
| `updated_at` | DATETIME | Last update timestamp | NOW |

## Call Status Values
- `not_called` — Lead hasn't been contacted
- `called` — Lead has been called
- `voicemail` — Left voicemail
- `no_answer` — No one answered
- `booked` — Meeting/call scheduled
- `declined` — Lead declined
- `converted` — Converted to customer

## Priority Levels
- `1` — P1 (Hot, call immediately)
- `2` — P2 (High priority)
- `3` — P3 (Medium priority)
- `4` — P4 (Low priority / follow-up later)

## Indexes
- `idx_email` — Fast lookup by email
- `idx_call_status` — Fast filtering by status
- `idx_hot_flag` — Quick hot leads query

## Migration Strategy
To transfer to another Mac:
1. Copy entire `/cntrlm-crm/` folder
2. Run `cd backend && npm install` (installs from package-lock.json)
3. Run `npm start` — database auto-initializes if missing
4. Database file auto-creates at `/data/cntrlm.db`

No manual setup needed. ✅
