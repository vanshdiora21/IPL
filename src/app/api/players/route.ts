// src/app/api/players/route.ts
// Scrapes Cricbuzz IPL 2026 (series 9241) scorecards to calculate CREX fantasy points

import { NextResponse } from 'next/server';
import { MANAGERS, calcCrexPoints } from '@/lib/teamsData';

export const dynamic = 'force-dynamic';

const CB_SERIES_ID = 9241; // IPL 2026
const CB_BASE = 'https://www.cricbuzz.com';
const FETCH_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.5',
};

// ── In-memory cache ──────────────────────────────────────────────────────────
// Persist processed match data across warm invocations so we don't re-scrape
// completed matches on every request.
const processedMatches = new Map<number, Map<string, number>>(); // matchId → name → pts
let cachedResponse: object | null = null;
let cacheExpiry = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// ── RSC Parsing ──────────────────────────────────────────────────────────────
// Cricbuzz uses Next.js App Router with RSC streaming. Player stats are embedded
// in the initial HTML as __next_f flight data — no JS execution needed.

function parseRsc(html: string): string {
  let out = '';
  const re = /self\.__next_f\.push\(\[1,"([\s\S]+?)"\]\)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    try {
      // The content is a JSON-escaped string — unwrap it
      out += JSON.parse('"' + m[1] + '"');
    } catch {
      out += m[1];
    }
  }
  return out;
}

async function fetchRsc(url: string): Promise<string> {
  try {
    const res = await fetch(url, { headers: FETCH_HEADERS, cache: 'no-store' });
    if (!res.ok) return '';
    return parseRsc(await res.text());
  } catch {
    return '';
  }
}

// ── Cricbuzz scraping helpers ────────────────────────────────────────────────

async function getCompletedMatchIds(): Promise<number[]> {
  const rsc = await fetchRsc(
    `${CB_BASE}/cricket-series/${CB_SERIES_ID}/ipl-2026/matches`
  );
  if (!rsc) return [];

  // Build matchId → seriesId and matchId → state maps
  const seriesOf = new Map<number, number>();
  const stateOf  = new Map<number, string>();

  for (const m of rsc.matchAll(/"matchId":(\d+)[^{}]{1,700}"seriesId":(\d+)/g)) {
    seriesOf.set(parseInt(m[1]), parseInt(m[2]));
  }
  for (const m of rsc.matchAll(/"matchId":(\d+)[^{}]{1,400}"state":"([^"]+)"/g)) {
    stateOf.set(parseInt(m[1]), m[2]);
  }

  const ids: number[] = [];
  for (const [id, sid] of seriesOf) {
    if (sid === CB_SERIES_ID && stateOf.get(id) === 'Complete') ids.push(id);
  }
  return [...new Set(ids)];
}

// Convert Cricbuzz over notation (3.2 = 3 overs 2 balls) to decimal overs
function toDecimalOvers(cricbuzzOvers: number): number {
  const whole = Math.floor(cricbuzzOvers);
  const balls = Math.round(cricbuzzOvers * 10) % 10;
  return whole + balls / 6;
}

async function scrapeMatchPoints(matchId: number): Promise<Map<string, number>> {
  // Cricbuzz ignores the slug — only the numeric ID matters
  const rsc = await fetchRsc(`${CB_BASE}/live-cricket-scorecard/${matchId}/match`);
  if (!rsc) return new Map();

  // ── Batting ──
  const batMap = new Map<string, { runs: number; balls: number; fours: number; sixes: number; outDesc: string }>();
  const batRe = /"batName":"([^"]+)"[^}]*?"runs":(\d+)[^}]*?"balls":(\d+)[^}]*?"fours":(\d+)[^}]*?"sixes":(\d+)[^}]*?"outDesc":"([^"]*)"/g;
  for (const m of rsc.matchAll(batRe)) {
    const [, name, runs, balls, fours, sixes, outDesc] = m;
    if (!batMap.has(name)) {
      batMap.set(name, {
        runs: +runs, balls: +balls, fours: +fours, sixes: +sixes, outDesc,
      });
    }
  }

  // ── Bowling ──
  const bowlMap = new Map<string, { overs: number; maidens: number; runs: number; wickets: number }>();
  const bowlRe = /"bowlName":"([^"]+)"[^}]*?"overs":([\d.]+)[^}]*?"maidens":(\d+)[^}]*?"runs":(\d+)[^}]*?"wickets":(\d+)/g;
  for (const m of rsc.matchAll(bowlRe)) {
    const [, name, overs, maidens, runs, wickets] = m;
    if (!bowlMap.has(name)) {
      bowlMap.set(name, {
        overs: toDecimalOvers(parseFloat(overs)),
        maidens: +maidens, runs: +runs, wickets: +wickets,
      });
    }
  }

  // ── LBW / Bowled bonus per bowler ──
  // outDesc for bowled: "b BowlerName"  |  for LBW: "lbw b BowlerName"
  const lbwBowled = new Map<string, number>();
  for (const { outDesc } of batMap.values()) {
    const hit = outDesc.match(/^(?:lbw )?b ([A-Z][a-z]+(?:\s[A-Z][a-z]+)*)/);
    if (hit) lbwBowled.set(hit[1], (lbwBowled.get(hit[1]) ?? 0) + 1);
  }

  // ── Calculate per-match CREX points ──
  const pts = new Map<string, number>();
  for (const name of new Set([...batMap.keys(), ...bowlMap.keys()])) {
    const bat  = batMap.get(name);
    const bowl = bowlMap.get(name);
    pts.set(name, calcCrexPoints({
      runs:         bat?.runs    ?? 0,
      balls:        bat?.balls   ?? 0,
      fours:        bat?.fours   ?? 0,
      sixes:        bat?.sixes   ?? 0,
      wickets:      bowl?.wickets  ?? 0,
      oversBowled:  bowl?.overs    ?? 0,
      runsConceded: bowl?.runs     ?? 0,
      maidens:      bowl?.maidens  ?? 0,
      isLbwBowled:  lbwBowled.get(name) ?? 0,
      didPlay:      true,
    }));
  }
  return pts;
}

// ── Mock fallback ────────────────────────────────────────────────────────────

function mockPoints(name: string): number {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (Math.imul(31, h) + name.charCodeAt(i)) | 0;
  return Math.abs(h % 320) + 80;
}

// ── Response builder ─────────────────────────────────────────────────────────

function buildApiResponse(totals: Map<string, number>, isDemo: boolean) {
  const players: Record<string, { name: string; points: number; runs: number; wickets: number; matches: number }> = {};
  for (const [name, points] of totals) {
    players[name] = { name, points, runs: 0, wickets: 0, matches: 0 };
  }

  const managerTotals = MANAGERS.map(m => {
    const total = m.players.reduce((sum, p) => {
      const basePts =
        players[p.name]?.points ??
        Object.entries(players).find(([k]) =>
          k.toLowerCase().includes(p.name.split(' ').pop()!.toLowerCase())
        )?.[1]?.points ??
        0;
      const isCap   = m.captain        === p.name;
      const isVC    = m.viceCaptain    === p.name;
      const isSuper = m.super3xPlayer  === p.name;
      const mult = isCap ? 2 : isVC ? 1.5 : isSuper ? 3 : 1;
      return sum + basePts * mult;
    }, 0);
    return { managerId: m.id, total };
  });

  return { players, managerTotals, updatedAt: new Date().toISOString(), isDemo };
}

// ── Route handler ────────────────────────────────────────────────────────────

export async function GET() {
  // Serve from cache if fresh
  if (cachedResponse && Date.now() < cacheExpiry) {
    return NextResponse.json(cachedResponse);
  }

  try {
    const completedIds = await getCompletedMatchIds();

    if (completedIds.length === 0) {
      // Season not started yet → mock data
      const totals = new Map<string, number>();
      for (const m of MANAGERS) for (const p of m.players)
        if (!totals.has(p.name)) totals.set(p.name, mockPoints(p.name));
      cachedResponse = buildApiResponse(totals, true);
      cacheExpiry = Date.now() + CACHE_TTL;
      return NextResponse.json(cachedResponse);
    }

    // Fetch only matches we haven't processed yet (completed = immutable)
    const newIds = completedIds.filter(id => !processedMatches.has(id));
    await Promise.all(
      newIds.map(async id => {
        const pts = await scrapeMatchPoints(id);
        if (pts.size > 0) processedMatches.set(id, pts);
      })
    );

    // Aggregate points across all processed matches
    const totals = new Map<string, number>();
    for (const matchPts of processedMatches.values()) {
      for (const [name, pts] of matchPts) {
        totals.set(name, (totals.get(name) ?? 0) + pts);
      }
    }

    if (totals.size === 0) {
      // Scraping failed → mock
      for (const m of MANAGERS) for (const p of m.players)
        if (!totals.has(p.name)) totals.set(p.name, mockPoints(p.name));
      cachedResponse = buildApiResponse(totals, true);
    } else {
      cachedResponse = buildApiResponse(totals, false);
    }

    cacheExpiry = Date.now() + CACHE_TTL;
    return NextResponse.json(cachedResponse);

  } catch (err) {
    console.error('[/api/players] scraper error:', err);
    const totals = new Map<string, number>();
    for (const m of MANAGERS) for (const p of m.players)
      if (!totals.has(p.name)) totals.set(p.name, mockPoints(p.name));
    return NextResponse.json(buildApiResponse(totals, true));
  }
}
