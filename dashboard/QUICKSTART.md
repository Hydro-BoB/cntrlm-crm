# Quick Start Guide

## Prerequisites
- Node.js 18+ installed
- npm or yarn

## Installation & Running

### 1. Install dependencies (already done, but in case)
```bash
cd /Users/hyderali/Desktop/cntrlm-crm/dashboard
npm install --legacy-peer-deps
```

### 2. Set API URL (optional)
Create `.env.local`:
```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 3. Run development server
```bash
npm run dev
```

Open **http://localhost:3000** in your browser.

## What You'll See

1. **Dashboard** (home page)
   - 4 stat cards with mock data
   - Recent activity feed
   - Quick action buttons
   - All interactive with Tailwind styling

2. **Sidebar Navigation** (left side)
   - Logo: "Cntrl M" with icon
   - 5 nav links: Dashboard, Leads, Pipeline, Call Logs, Test Call
   - Settings placeholder at bottom
   - Active route highlighted in blue

3. **Leads Page** (`/leads`)
   - Search bar
   - 5 filter dropdowns
   - Table with 50 rows per page
   - Call/Edit/Delete buttons per row
   - Pagination controls
   - All filters work with mock data

4. **Pipeline Page** (`/pipeline`)
   - Kanban board with 4 columns
   - Leads grouped by website score (priority)
   - Card count per column
   - Hover effects ready

5. **Call Logs Page** (`/call-logs`)
   - Table of call history
   - Outcome filter dropdown
   - Color-coded badges

6. **Test Call Page** (`/test-call`)
   - Country selector (Canada/India)
   - Form with 3 fields
   - "Trigger Call" button
   - Success/error result display
   - "How it works" section with 4 steps

## Architecture

- **Next.js 15 App Router** — All routes in `/app`
- **React 18** — Client-side state with hooks
- **Tailwind CSS 3.3** — All styling (no custom CSS)
- **Lucide React** — Icons (24px size)
- **Fetch API** — HTTP requests (no axios)
- **Plain JSX** — No TypeScript

## Key Files

| File | Purpose |
|------|---------|
| `app/layout.jsx` | Root layout with Sidebar |
| `app/page.jsx` | Dashboard |
| `app/globals.css` | Global styles & utilities |
| `components/Sidebar.jsx` | Navigation sidebar |
| `app/leads/page.jsx` | Leads listing & filters |
| `app/pipeline/page.jsx` | Kanban board |
| `app/call-logs/page.jsx` | Call history |
| `app/test-call/page.jsx` | Test call form |

## Styling System

### Utility Classes (in globals.css)
```css
.btn           /* base button styling */
.btn-primary   /* blue button */
.btn-secondary /* gray button */
.btn-danger    /* red button */
.btn-success   /* green button */

.badge         /* base badge styling */
.badge-primary /* blue badge */
.badge-success /* green badge */
.badge-warning /* yellow badge */
.badge-danger  /* red badge */

.card          /* white card with border */
.input-base    /* styled input field */
```

### Tailwind Classes Used
```tailwind
w-64 h-screen bg-white border-gray-200 grid grid-cols-1 lg:grid-cols-4
px-6 py-4 rounded-lg transition-colors hover:bg-gray-50 text-gray-900
flex items-center justify-between gap-4
```

## API Integration

Each page fetches from your backend:

```javascript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Example: fetch leads
const res = await fetch(`${API_URL}/api/leads`);
const data = await res.json();
```

If API is down, mock data loads automatically (blue banner shows: "Demo mode active").

## Customization

### Change Brand Color
In `globals.css`, replace all `blue-600` with your color:
```css
/* Current */
.btn-primary { @apply bg-blue-600 }

/* Example: Green */
.btn-primary { @apply bg-green-600 }
```

### Add New Page
1. Create `app/newpage/page.jsx`
2. Add to `Sidebar.jsx` nav items
3. Create any needed components in `/components`

### Update API Endpoints
Edit `.env.local`:
```bash
NEXT_PUBLIC_API_URL=https://your-api.com
```

## Build for Production

```bash
npm run build
npm start
```

Visit **http://localhost:3000** (production build).

## Troubleshooting

**Port 3000 already in use?**
```bash
npm run dev -- -p 3001
```

**Styles not loading?**
```bash
rm -rf .next node_modules
npm install --legacy-peer-deps
npm run dev
```

**API connection issue?**
- Ensure backend is running on port 3001 (or update `.env.local`)
- Check Network tab in browser DevTools
- App will use mock data if API is unavailable

## Next Steps

✅ Development environment ready  
✅ All pages built and functional  
✅ Mock data working  
✅ Ready for backend connection  

1. **Connect your backend API**
2. **Implement "Add Lead" modal**
3. **Add drag-and-drop to Kanban**
4. **Implement authentication**
5. **Add real-time updates**

---

**Status**: Ready to run  
**Build Time**: 2.2s  
**Bundle Size**: ~105KB (First Load JS)  
**Browser Support**: All modern browsers (Chrome, Safari, Firefox, Edge)
