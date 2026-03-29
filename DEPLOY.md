# 🚀 PRODUCTION DEPLOYMENT GUIDE

## ⚡ QUICK START (Render + Vercel)

This is the **fastest** path to crm.cntrlm.com live.

### Prerequisites
- GitHub account (for easy deployment)
- Namecheap access (already have)
- Twilio credentials (already configured ✅)

---

## 📋 DEPLOYMENT CHECKLIST

### Phase 1: GitHub Setup (5 min)
- [ ] Push this repo to GitHub private repo
- [ ] Name it `cntrlm-crm` or similar

### Phase 2: Backend Deployment (10 min) - Render.com
- [ ] Go to render.com
- [ ] Sign up with GitHub
- [ ] Create New → Web Service
- [ ] Connect GitHub repo (cntrlm-crm)
- [ ] Settings:
  - Name: `cntrlm-crm-api`
  - Runtime: Node
  - Build: `cd backend && npm install && npm run init-db`
  - Start: `cd backend && npm run start`
  - Region: Oregon (US) or Singapore
- [ ] Add Environment Variables (copy from backend/.env.production):
  ```
  TWILIO_ACCOUNT_SID=YOUR_TWILIO_ACCOUNT_SID
  TWILIO_AUTH_TOKEN=YOUR_TWILIO_AUTH_TOKEN
  TWILIO_PHONE_NUMBER=+12602394730
  NODE_ENV=production
  PORT=3001
  ```
- [ ] Deploy → Get URL like `https://cntrlm-crm-api.onrender.com`
- [ ] Test: `curl https://cntrlm-crm-api.onrender.com/api/stats`

### Phase 3: Frontend Deployment (10 min) - Vercel
- [ ] Go to vercel.com
- [ ] Sign in with GitHub
- [ ] Import cntrlm-crm repo
- [ ] Settings:
  - Root Directory: `dashboard`
  - Framework: Next.js
  - Build Command: `npm run build`
  - Output Directory: `.next`
- [ ] Environment Variables:
  ```
  NEXT_PUBLIC_API_URL=https://cntrlm-crm-api.onrender.com
  (or whatever Render URL you got)
  ```
- [ ] Deploy → Get URL like `https://cntrlm-crm.vercel.app`
- [ ] Test dashboard loads at that URL

### Phase 4: DNS Setup (5 min) - Namecheap
1. Go to Namecheap → Domains → cntrlm.com
2. Advanced DNS tab
3. Add this record:
   ```
   Type: A Record / CNAME
   Host: crm
   Value: [Vercel will give you this - usually a CNAME like vercel.com]
   ```
4. Wait 15-30 min for DNS to propagate

### Phase 5: Verification
- [ ] Open https://crm.cntrlm.com
- [ ] Dashboard should load
- [ ] API should respond: `https://crm.cntrlm.com/api/stats`
- [ ] Check browser console for errors

---

## 🔧 ALTERNATIVE DEPLOYMENTS

### Option: Lovable (If you want to use your Lovable account)
1. Log into Lovable
2. New Project → Upload `backend/` and `dashboard/` folders
3. Set environment variables
4. Deploy as monorepo

### Option: Namecheap cPanel Hosting
1. Namecheap Dashboard → cPanel
2. Upload project to public_html or custom folder
3. Configure Node.js in hosting panel
4. Set environment variables via cPanel UI

---

## 📊 EXPECTED RESULTS

When everything is deployed:

```
✅ Dashboard loads at https://crm.cntrlm.com
✅ API responds at https://crm.cntrlm.com/api/stats
✅ Twilio credentials working (ready for calls)
✅ Database initialized with schema
✅ All endpoints functional
```

---

## 🔌 WIRING EVERYTHING (After Deployment)

### Environment Variables

**Backend (Render):**
- ✅ Already set in Render dashboard
- TWILIO_ACCOUNT_SID
- TWILIO_AUTH_TOKEN
- TWILIO_PHONE_NUMBER
- NODE_ENV=production

**Frontend (Vercel):**
- ✅ Already set in Vercel dashboard
- NEXT_PUBLIC_API_URL=https://api.cntrlm.com

### Update DNS to Backend API (if custom domain)
If you want `api.cntrlm.com` for backend:
1. Namecheap → Add A Record:
   ```
   Host: api
   Value: [Render IP - they'll show you]
   ```
2. Wait for propagation
3. Update Vercel env: NEXT_PUBLIC_API_URL=https://api.cntrlm.com

---

## 📞 TWILIO INTEGRATION

Backend is already configured with:
- Account SID: YOUR_TWILIO_ACCOUNT_SID
- Auth Token: YOUR_TWILIO_AUTH_TOKEN
- Phone: +12602394730

To test after deployment:
```bash
curl -X POST https://crm.cntrlm.com/api/call \
  -H "Content-Type: application/json" \
  -d '{"phone": "+919876543210", "message": "Test call"}'
```

---

## 💾 DATABASE & DATA

### Initialize on Deployment
The Render build command handles this:
```
npm run init-db     # Creates leads.db schema
npm run import-leads  # Imports CSV (if exists)
```

### Import Leads CSV Later
After deployment, if you have `website_leads.csv`:
1. Place in `/data/website_leads.csv`
2. Run: `npm run import-leads` (SSH into Render or do it locally)
3. Or via API:
```bash
curl -X POST https://crm.cntrlm.com/api/import \
  -F "file=@website_leads.csv"
```

---

## 🛠️ TROUBLESHOOTING

### Backend not starting
- Check: `npm run init-db` completed
- Check build logs in Render dashboard
- Verify environment variables are set

### Frontend 404 errors
- Check: NEXT_PUBLIC_API_URL is correct
- Check: Backend is actually running
- Check: CORS is enabled (it is by default)

### DNS not working
- Namecheap records take 15-30 min to propagate
- Use DNS checker: https://dnschecker.org
- Check you have correct record type (CNAME or A)

### Twilio calls failing
- Verify credentials in backend/.env.production
- Check Twilio account is active (trial expires after 30 days)
- Test account:
  ```bash
  curl https://api.twilio.com/2010-04-01/Accounts/YOUR_TWILIO_ACCOUNT_SID \
    -u YOUR_TWILIO_ACCOUNT_SID:YOUR_TWILIO_AUTH_TOKEN
  ```

---

## 📱 TESTING CHECKLIST

After deployment, verify:

1. **Dashboard loads:**
   ```
   curl https://crm.cntrlm.com
   # Should return HTML dashboard
   ```

2. **API responds:**
   ```
   curl https://crm.cntrlm.com/api/stats
   # Should return JSON stats
   ```

3. **Database works:**
   ```
   curl https://crm.cntrlm.com/api/leads
   # Should return leads array (may be empty if no import yet)
   ```

4. **Twilio configured:**
   - Check backend logs for Twilio auth
   - Test call endpoint

---

## 🎯 QUICK REFERENCE

| Component | Platform | Status | URL |
|-----------|----------|--------|-----|
| Backend API | Render | Ready | https://cntrlm-crm-api.onrender.com |
| Dashboard | Vercel | Ready | https://crm.cntrlm.com |
| Database | Render (SQLite) | Ready | /data/leads.db |
| Twilio | Configured | ✅ | Trial account |
| Domain | Namecheap | Pending DNS | crm.cntrlm.com |

---

## 🚀 YOU'RE READY!

Everything is prepared. Just:
1. Push to GitHub
2. Deploy to Render (backend)
3. Deploy to Vercel (frontend)
4. Update Namecheap DNS
5. Watch it live! 🎉

**Total time: ~30 minutes**

---

**Last Updated:** 2026-03-29
**Status:** ✅ Ready for Production
**Next:** Import leads CSV & configure daily email reports
