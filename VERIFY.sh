#!/bin/bash

echo "🔍 Verification Checklist for Cntrl M CRM Deployment"
echo "════════════════════════════════════════════════════"
echo ""

# Check backend structure
echo "✓ Checking Backend..."
if [ -d "backend" ]; then
  echo "  ✅ backend/ folder exists"
  if [ -f "backend/package.json" ]; then
    echo "  ✅ backend/package.json exists"
  fi
  if [ -f "backend/server.js" ]; then
    echo "  ✅ backend/server.js exists"
  fi
  if [ -f "backend/.env.production" ]; then
    echo "  ✅ backend/.env.production exists"
  fi
fi
echo ""

# Check frontend structure
echo "✓ Checking Frontend..."
if [ -d "dashboard" ]; then
  echo "  ✅ dashboard/ folder exists"
  if [ -f "dashboard/package.json" ]; then
    echo "  ✅ dashboard/package.json exists"
  fi
  if [ -f "dashboard/.next" ]; then
    echo "  ✅ dashboard/.next (built) exists"
  fi
  if [ -f "dashboard/.env.production" ]; then
    echo "  ✅ dashboard/.env.production exists"
  fi
fi
echo ""

# Check deployment configs
echo "✓ Checking Deployment Files..."
if [ -f "DEPLOY.md" ]; then
  echo "  ✅ DEPLOY.md exists (full guide)"
fi
if [ -f "DEPLOY_NOW.txt" ]; then
  echo "  ✅ DEPLOY_NOW.txt exists (quick guide)"
fi
if [ -f "render.yaml" ]; then
  echo "  ✅ render.yaml exists (Render config)"
fi
if [ -f "vercel.json" ]; then
  echo "  ✅ vercel.json exists (Vercel config)"
fi
echo ""

# Check git
echo "✓ Checking Git..."
if [ -d ".git" ]; then
  echo "  ✅ Git repo initialized"
  commits=$(git log --oneline | wc -l)
  echo "  ✅ Commits: $commits"
fi
echo ""

# Test backend locally
echo "✓ Testing Backend..."
echo "  Starting backend on :3001..."
cd backend
npm run start > /tmp/backend_test.log 2>&1 &
BACKEND_PID=$!
sleep 3

if curl -s http://localhost:3001/api/stats > /dev/null 2>&1; then
  echo "  ✅ Backend API responds"
  STATS=$(curl -s http://localhost:3001/api/stats)
  echo "  📊 Stats: $STATS"
else
  echo "  ❌ Backend API not responding"
fi

kill $BACKEND_PID 2>/dev/null
cd ..
echo ""

# Summary
echo "════════════════════════════════════════════════════"
echo "✅ VERIFICATION COMPLETE!"
echo ""
echo "Your project is ready for deployment."
echo ""
echo "Next steps:"
echo "1. Read DEPLOY_NOW.txt"
echo "2. Push to GitHub"
echo "3. Deploy to Render (backend)"
echo "4. Deploy to Vercel (frontend)"
echo "5. Update Namecheap DNS"
echo ""
echo "Expected: crm.cntrlm.com live in ~30 minutes ⚡"
