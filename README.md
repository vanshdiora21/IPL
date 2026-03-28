# 🏏 IPL Fantasy League 2025

Live fantasy cricket leaderboard with real-time CREX points, player photos, and squad management.

## Features
- 🏆 Live leaderboard with podium for top 3
- 👤 Manager detail pages with full squad cards
- 📊 Points by role breakdown charts
- 🖼️ Player photos scraped from CricBuzz
- ⚡ Live CREX fantasy points (scraped every 6 hours via Vercel Cron)
- 📱 Fully mobile-responsive

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
```bash
cp .env.example .env.local
# Edit .env.local with your values
```

### 3. Run locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel

### Option A: Via GitHub (recommended)
1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Add environment variables:
   - `NEXT_PUBLIC_BASE_URL` = your Vercel deployment URL (e.g. `https://ipl-fantasy.vercel.app`)
   - `CRON_SECRET` = any random string (e.g. run `openssl rand -hex 32` in terminal)
4. Deploy!

### Option B: Via Vercel CLI
```bash
npm i -g vercel
vercel
```

## Cron Job
Vercel automatically runs `/api/cron/refresh` every 6 hours (configured in `vercel.json`).
This keeps points fresh without requiring manual updates.

To trigger a manual refresh, call:
```
GET /api/players
```

## Updating Team Data
All squad data is in `src/lib/teamsData.ts`.
- To add/change captains: set `captain` and `viceCaptain` fields on each manager
- To set the Super 3× player: set `super3xPlayer` on the manager

## Tech Stack
- **Next.js 14** (App Router)
- **TypeScript**
- **CSS Modules** (no Tailwind dependency)
- **Vercel** (hosting + cron)
- Data scraped from **CricBuzz** (images) and **CREX** (points)
