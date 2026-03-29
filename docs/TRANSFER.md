# Cntrl M CRM — Transfer to Another Mac

## TL;DR
```bash
cp -r ~/Desktop/cntrlm-crm ~/Desktop/cntrlm-crm-backup
# Move cntrlm-crm to new Mac via AirDrop, cloud, or USB
cd cntrlm-crm/backend && npm install && npm start
# Done! 🎉
```

---

## Why This Works

Everything needed is in the folder:

✅ Database (`data/cntrlm.db`) — All leads travel with you  
✅ Node modules frozen (`package-lock.json`) — Reproducible installs  
✅ Config files (`.env`) — Already set to localhost  
✅ Scripts — Ready to run on new machine  
✅ Docs — Everything explained  

**No setup, no cloud, no API keys.**

---

## Step-by-Step Transfer

### On Original Mac

#### 1. Backup current data
```bash
# Create backup before transfer
cp -r ~/Desktop/cntrlm-crm ~/Desktop/cntrlm-crm-$(date +%Y%m%d)

# Verify database exists
ls -lh ~/Desktop/cntrlm-crm/data/cntrlm.db
```

#### 2. Clean up before moving
```bash
cd ~/Desktop/cntrlm-crm

# Remove node_modules (can re-install with npm install)
rm -rf backend/node_modules
rm -rf dashboard/node_modules

# Keep package-lock.json! (ensures same versions)
ls -la backend/package-lock.json
```

#### 3. Verify critical files
```bash
# These MUST exist:
- backend/db.js ✓
- backend/server.js ✓
- backend/package.json ✓
- backend/package-lock.json ✓
- backend/.env ✓
- data/cntrlm.db ✓
- docs/API_REFERENCE.md ✓
```

#### 4. Export to new Mac
**Option A: AirDrop**
```bash
# Compress for easier transfer
tar -czf cntrlm-crm.tar.gz ~/Desktop/cntrlm-crm
# Then AirDrop to new Mac
```

**Option B: Cloud (iCloud Drive, Dropbox)**
```bash
mv ~/Desktop/cntrlm-crm ~/Library/Mobile\ Documents/com\~apple\~CloudDocs/cntrlm-crm
# Sync, then copy from iCloud on new Mac
```

**Option C: USB**
```bash
# Copy to USB drive
cp -r ~/Desktop/cntrlm-crm /Volumes/USB_DRIVE/
```

---

### On New Mac

#### 1. Place the folder
```bash
# Assume you copied cntrlm-crm to ~/Desktop/
cd ~/Desktop/cntrlm-crm

# Verify structure
ls -la
# backend/
# dashboard/
# data/
# docs/
# pipeline-map/
# scripts/
# README.md
```

#### 2. Install backend
```bash
cd backend

# Install dependencies from lock file (exact versions)
npm install

# Verify SQLite can access database
ls -lh ../data/cntrlm.db
```

#### 3. Start backend
```bash
npm start

# Should see:
# 🚀 CRM API running on http://localhost:5000
# Connected to SQLite database at .../cntrlm.db
# Leads table initialized or already exists
```

#### 4. Install & start dashboard (new terminal)
```bash
cd ~/Desktop/cntrlm-crm/dashboard
npm install
npm run dev

# Should see:
# > next dev
# Ready in X.Xs
# > Local: http://localhost:3000
```

#### 5. Test the transfer
```bash
# In another terminal, verify API works
curl http://localhost:5000/health

# List existing leads (should see data from original Mac!)
curl http://localhost:5000/leads
```

✅ **You're live on the new Mac!**

---

## What Gets Transferred

| File/Folder | Size | Transfers? | Notes |
|-------------|------|----------|-------|
| `backend/db.js` | 1.5K | ✅ | Database logic |
| `backend/server.js` | 6K | ✅ | API code |
| `backend/package.json` | 0.5K | ✅ | Dependencies list |
| `backend/package-lock.json` | 50K | ✅ **CRITICAL** | Exact versions |
| `backend/.env` | 50B | ✅ | Config (localhost:5000) |
| `backend/node_modules/` | 150MB | ❌ Not needed | Re-create with `npm install` |
| `data/cntrlm.db` | 10-100MB | ✅ **CRITICAL** | All your leads! |
| `data/backups/` | varies | ✅ | Backup files (if any) |
| `docs/` | 30K | ✅ | Documentation |
| `scripts/` | varies | ✅ | Utility scripts |
| `dashboard/` | varies | ✅ | React frontend code |

---

## Potential Issues & Fixes

### "npm install fails"
```bash
# Try clean install
rm -rf node_modules package-lock.json
npm install
```

### "sqlite3 binding error"
```bash
# Rebuild native modules
npm rebuild sqlite3

# Or reinstall
npm uninstall sqlite3 && npm install sqlite3
```

### "Port 5000 already in use"
```bash
# Find process
lsof -i :5000

# Kill it
kill -9 <PID>

# Or change port in backend/.env
echo "PORT=5001" > backend/.env
```

### "Database file missing"
```bash
# Database auto-creates on first run
# If you truly lost it, this is bad — use backup
ls -la data/backups/
# Find most recent backup and restore
```

### "Dashboard shows "failed to connect API""
Check `dashboard/next.config.js`:
```javascript
NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
```

If backend is on different port, update `.env.local` in dashboard:
```bash
echo "NEXT_PUBLIC_API_URL=http://localhost:5001" > dashboard/.env.local
```

---

## Backup Strategy

### Before Every Transfer
```bash
# Backup your database
cp data/cntrlm.db data/backups/cntrlm-$(date +%Y%m%d-%H%M%S).db

# Or use backup script (Phase 2)
node scripts/backup-db.js
```

### Restore from Backup
```bash
# If something goes wrong:
cp data/backups/cntrlm-YYYYMMDD-HHMMSS.db data/cntrlm.db

# Restart backend
npm start
```

---

## Verification Checklist

After transfer, verify:

- [ ] Database file exists: `data/cntrlm.db`
- [ ] Backend starts: `npm start` (port 5000)
- [ ] Dashboard installs: `npm install` (in dashboard/)
- [ ] API responds: `curl http://localhost:5000/health`
- [ ] Leads exist: `curl http://localhost:5000/leads`
- [ ] Database has your data (not empty)
- [ ] Can create new leads via API
- [ ] Dashboard loads: `http://localhost:3000`

---

## Migration Scenarios

### Scenario 1: New Mac, Keep Everything
```bash
cp -r ~/Desktop/cntrlm-crm ~/Desktop/cntrlm-crm-backup  # Original
# Use backup as transfer source
cd cntrlm-crm/backend && npm install && npm start
```

### Scenario 2: Upgrade Mac
```bash
# Transfer via AirDrop or iCloud
# Folder lands in Downloads/
cd ~/Downloads/cntrlm-crm
cd backend && npm install && npm start
# Move to ~/Desktop/ after verifying it works
```

### Scenario 3: Multiple Macs (Team)
```bash
# Each team member:
git clone [repo] or cp -r [shared-folder]/cntrlm-crm
cd cntrlm-crm/backend
npm install && npm start

# ⚠️ Note: Database is local, not shared
# For team collaboration, move database to shared cloud later (Phase 3+)
```

---

## Performance Notes

- **Transfer time:** <1 min (copy folder) + ~2 min (npm install)
- **Database startup:** First run creates indexes (~5-10 sec for large DB)
- **No downtime:** Database doesn't corrupt during transfer (SQLite is robust)

---

## Questions?

- Setup guide: `docs/SETUP.md`
- API reference: `docs/API_REFERENCE.md`
- Architecture: `docs/ARCHITECTURE.md`

---

## You're Ready! 🚀

CRM is **100% portable**. Copy, install, run. Done.
