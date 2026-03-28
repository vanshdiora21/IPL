// src/app/api/players/route.ts
import { NextResponse } from 'next/server';
import { MANAGERS } from '@/lib/teamsData';
import { fetchPlayersData } from '@/lib/scraper';

export const revalidate = 3600; // ISR: revalidate every hour

export async function GET() {
  try {
    // Collect all unique players across all managers
    const allPlayers = MANAGERS.flatMap((m) =>
      m.players.map((p) => ({ name: p.name, team: p.team }))
    );

    // Deduplicate
    const unique = Array.from(
      new Map(allPlayers.map((p) => [p.name, p])).values()
    );

    const playerData = await fetchPlayersData(unique);

    // Calculate manager totals
    const managerTotals = MANAGERS.map((manager) => {
      const total = manager.players.reduce((sum, p) => {
        return sum + (playerData[p.name]?.points || 0);
      }, 0);
      return { managerId: manager.id, total };
    });

    return NextResponse.json(
      { players: playerData, managerTotals, updatedAt: new Date().toISOString() },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
        },
      }
    );
  } catch (error) {
    console.error('Failed to fetch player data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data', players: {}, managerTotals: [], updatedAt: new Date().toISOString() },
      { status: 500 }
    );
  }
}
