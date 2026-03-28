// src/app/api/players/route.ts
// Uses Cricbuzz's public (unauthenticated) JSON API to get IPL 2025 stats
// then maps them to CREX fantasy points

import { NextResponse } from 'next/server';
import { MANAGERS, calcCrexPoints } from '@/lib/teamsData';

// Cricbuzz series ID for IPL 2025
const IPL_2025_SERIES_ID = '7607';  // IPL 2025 cricbuzz series ID

interface PlayerStats {
  name: string;
  points: number;
  runs: number;
  wickets: number;
  matches: number;
}

// Fetch batting stats from Cricbuzz's open JSON endpoint
async function fetchBattingStats(): Promise<Record<string, { runs: number; balls: number; fours: number; sixes: number; innings: number }>> {
  try {
    const res = await fetch(
      `https://cricbuzz-cricket.p.rapidapi.com/series/v1/${IPL_2025_SERIES_ID}/stats/batting`,
      {
        headers: {
          'X-RapidAPI-Key': process.env.RAPIDAPI_KEY || '',
          'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com',
        },
        next: { revalidate: 300 },
      }
    );
    if (!res.ok) return {};
    const data = await res.json();
    const result: Record<string, { runs: number; balls: number; fours: number; sixes: number; innings: number }> = {};
    for (const row of data?.stats || []) {
      result[row.name] = {
        runs: parseInt(row.runs || '0'),
        balls: parseInt(row.bf || '0'),
        fours: parseInt(row.fours || '0'),
        sixes: parseInt(row.sixes || '0'),
        innings: parseInt(row.inns || '0'),
      };
    }
    return result;
  } catch { return {}; }
}

async function fetchBowlingStats(): Promise<Record<string, { wickets: number; overs: number; runs: number; maidens: number }>> {
  try {
    const res = await fetch(
      `https://cricbuzz-cricket.p.rapidapi.com/series/v1/${IPL_2025_SERIES_ID}/stats/bowling`,
      {
        headers: {
          'X-RapidAPI-Key': process.env.RAPIDAPI_KEY || '',
          'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com',
        },
        next: { revalidate: 300 },
      }
    );
    if (!res.ok) return {};
    const data = await res.json();
    const result: Record<string, { wickets: number; overs: number; runs: number; maidens: number }> = {};
    for (const row of data?.stats || []) {
      result[row.name] = {
        wickets: parseInt(row.wkts || '0'),
        overs: parseFloat(row.overs || '0'),
        runs: parseInt(row.runs || '0'),
        maidens: parseInt(row.maidens || '0'),
      };
    }
    return result;
  } catch { return {}; }
}

// If no API key, fall back to demo/mock data so the site still works
function getMockPoints(playerName: string): number {
  // Deterministic pseudo-random based on name so it's consistent
  let hash = 0;
  for (let i = 0; i < playerName.length; i++) {
    hash = ((hash << 5) - hash) + playerName.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash % 400) + 50; // 50–450 range
}

export async function GET() {
  const hasApiKey = !!process.env.RAPIDAPI_KEY;

  let playerPoints: Record<string, PlayerStats> = {};

  if (hasApiKey) {
    const [batting, bowling] = await Promise.all([
      fetchBattingStats(),
      fetchBowlingStats(),
    ]);

    // Combine into CREX points per player
    const allNames = new Set([...Object.keys(batting), ...Object.keys(bowling)]);
    for (const name of allNames) {
      const bat = batting[name] || {};
      const bowl = bowling[name] || {};
      const pts = calcCrexPoints({
        runs: bat.runs || 0,
        balls: bat.balls || 0,
        fours: bat.fours || 0,
        sixes: bat.sixes || 0,
        wickets: bowl.wickets || 0,
        oversBowled: bowl.overs || 0,
        runsConceded: bowl.runs || 0,
        maidens: bowl.maidens || 0,
        didPlay: (bat.innings || 0) > 0 || (bowl.overs || 0) > 0,
      });
      playerPoints[name] = {
        name,
        points: pts,
        runs: bat.runs || 0,
        wickets: bowl.wickets || 0,
        matches: bat.innings || 0,
      };
    }
  } else {
    // No API key — use mock data (demo mode)
    for (const manager of MANAGERS) {
      for (const player of manager.players) {
        playerPoints[player.name] = {
          name: player.name,
          points: getMockPoints(player.name),
          runs: Math.floor(getMockPoints(player.name) / 2),
          wickets: Math.floor(getMockPoints(player.name) / 80),
          matches: Math.floor(Math.random() * 10) + 1,
        };
      }
    }
  }

  // Calculate manager totals
  const managerTotals = MANAGERS.map((m) => {
    const total = m.players.reduce((sum, p) => {
      // Try exact match, then fuzzy
      const stats = playerPoints[p.name] ||
        Object.values(playerPoints).find(s =>
          s.name.toLowerCase().includes(p.name.split(' ').pop()!.toLowerCase())
        );
      return sum + (stats?.points || 0);
    }, 0);
    return { managerId: m.id, total };
  });

  return NextResponse.json({
    players: playerPoints,
    managerTotals,
    updatedAt: new Date().toISOString(),
    isDemo: !hasApiKey,
  });
}
