// src/lib/scraper.ts
// Scrapes player data from CricBuzz (public, no API key needed)

export interface PlayerData {
  name: string;
  points: number;
  imageUrl: string | null;
  crexId?: string;
}

// Normalize player name for search
function normalizeName(name: string): string {
  return name.toLowerCase().replace(/\s+/g, ' ').trim();
}

// Build a CricBuzz search URL slug from player name
function nameToSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

// Map of known player cricbuzz IDs for faster lookup (expand as needed)
const KNOWN_PLAYER_IDS: Record<string, string> = {
  'virat kohli': '253',
  'rohit sharma': '107',
  'jasprit bumrah': '625235',
  'ms dhoni': '1413',
  'rishabh pant': '931581',
  'hardik pandya': '625371',
  'shubman gill': '1078680',
  'yashasvi jaiswal': '1070173',
  'axar patel': '559235',
  'rashid khan': '793463',
  'suryakumar yadav': '446507',
  'ravindra jadeja': '234675',
  'yuzvendra chahal': '234675',
  'arshdeep singh': '1070193',
  'kuldeep yadav': '559238',
  'mohammed shami': '390193',
  'shreyas iyer': '1078658',
  'kl rahul': '422108',
  'trent boult': '230558',
  'jos buttler': '308967',
};

// Fetch player image from Cricbuzz player profile
async function fetchPlayerImageFromCricbuzz(playerName: string): Promise<string | null> {
  const slug = nameToSlug(playerName);
  const knownId = KNOWN_PLAYER_IDS[normalizeName(playerName)];

  try {
    // Try direct cricbuzz player page
    const searchUrl = `https://www.cricbuzz.com/profiles/${knownId || ''}/${slug}`;
    const res = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml',
      },
      next: { revalidate: 21600 }, // 6 hours
    });

    if (!res.ok) return null;
    const html = await res.text();

    // Extract og:image or player image
    const ogMatch = html.match(/<meta property="og:image" content="([^"]+)"/);
    if (ogMatch) return ogMatch[1];

    const imgMatch = html.match(/class="[^"]*cb-player-img[^"]*"[^>]*src="([^"]+)"/);
    if (imgMatch) return imgMatch[1];

    return null;
  } catch {
    return null;
  }
}

// Fetch points from Crex fantasy (scrape their player stats page)
async function fetchPlayerPointsFromCrex(playerName: string, team: string): Promise<number> {
  try {
    // Crex fantasy stats endpoint - scrape their IPL fantasy points page
    const searchName = encodeURIComponent(playerName);
    const url = `https://crex.live/fantasy/ipl-2025/player-stats?search=${searchName}`;

    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json, text/html',
        'Referer': 'https://crex.live',
      },
      next: { revalidate: 3600 }, // 1 hour
    });

    if (!res.ok) return 0;

    const text = await res.text();

    // Try to parse JSON response
    try {
      const json = JSON.parse(text);
      // Navigate typical fantasy API structure
      if (json.data?.players) {
        const player = json.data.players.find((p: { name?: string; player_name?: string; points?: number; fantasy_points?: number }) =>
          normalizeName(p.name || p.player_name || '') === normalizeName(playerName)
        );
        if (player) return player.points || player.fantasy_points || 0;
      }
    } catch {
      // HTML response - try to scrape points from table
      const pointsMatch = text.match(new RegExp(
        playerName.split(' ').slice(-1)[0] + '[^<]*</[^>]+>[^<]*<[^>]+>([0-9.]+)',
        'i'
      ));
      if (pointsMatch) return parseFloat(pointsMatch[1]);
    }

    return 0;
  } catch {
    return 0;
  }
}

// Main: fetch all data for a list of players
export async function fetchPlayersData(
  players: Array<{ name: string; team: string }>
): Promise<Record<string, PlayerData>> {
  const results: Record<string, PlayerData> = {};

  // Batch fetch with concurrency limit
  const BATCH_SIZE = 5;
  for (let i = 0; i < players.length; i += BATCH_SIZE) {
    const batch = players.slice(i, i + BATCH_SIZE);
    await Promise.all(
      batch.map(async (player) => {
        const [points, imageUrl] = await Promise.all([
          fetchPlayerPointsFromCrex(player.name, player.team),
          fetchPlayerImageFromCricbuzz(player.name),
        ]);
        results[player.name] = { name: player.name, points, imageUrl };
      })
    );
  }

  return results;
}

// Generate a deterministic avatar color from name
export function getAvatarColor(name: string): string {
  const colors = [
    '#FF6B1A', '#F5C518', '#22C55E', '#3B82F6',
    '#A855F7', '#EC4899', '#14B8A6', '#F97316',
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}
