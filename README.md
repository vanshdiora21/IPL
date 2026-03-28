# 🏏 IPL Fantasy League 2025

Live leaderboard with real player photos (Crex CDN), CREX fantasy points, squad pages, and auto-refresh — **no cron job needed**.

## How live data works

- On every page load, the frontend calls `/api/players`
- `/api/players` fetches IPL 2025 stats from the Cricbuzz RapidAPI and calculates CREX points
- The page **auto-refreshes every 5 minutes** — no Vercel Pro / cron required
- There's also a manual **⟳ Refresh** button

## Player photos

Fetched directly from Crex's public CDN:
```
https://cricketvectors.akamaized.net/players/org/{CREX_PLAYER_ID}.png
```
No scraping, no rate limits — just static CDN images.

## Setup

### 1. Install
```bash
npm install
```

### 2. Get a free RapidAPI key (for live stats)
1. Go to [rapidapi.com](https://rapidapi.com)
2. Search for **"Cricbuzz Cricket"** API
3. Subscribe to the free tier (500 calls/month)
4. Copy your API key

### 3. Configure env
Create `.env.local`:
```
RAPIDAPI_KEY=your_key_here
```
> Without a key, the site runs in **DEMO MODE** with simulated points — fully functional for testing.

### 4. Run locally
```bash
npm run dev
```

## Deploy to Vercel (free hobby plan ✅)

```bash
# Push to GitHub first
git init && git add . && git commit -m "init"
git remote add origin https://github.com/YOUR_USER/ipl-fantasy.git
git push -u origin main
```

Then:
1. [vercel.com](https://vercel.com) → New Project → Import your GitHub repo
2. Environment Variables → Add `RAPIDAPI_KEY=your_key`
3. Deploy!

**No cron job needed.** Vercel Hobby plan works perfectly.

## Set captains & vice-captains

Open `src/lib/teamsData.ts` and update the manager objects:
```ts
{
  id: 'arhan',
  captain: 'Axar Patel',        // full name
  viceCaptain: 'Rishabh Pant',
  super3xPlayer: 'Arshdeep Singh',
  ...
}
```

## Tech
- **Next.js 14** · TypeScript · CSS Modules
- **Vercel** (free hobby plan)
- Player photos: **Crex CDN** (cricketvectors.akamaized.net)
- Stats: **Cricbuzz via RapidAPI** (free tier)
- Points: **CREX fantasy system** calculated in-app
