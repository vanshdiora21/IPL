'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { MANAGERS } from '@/lib/teamsData';
import styles from './page.module.css';

interface ApiData {
  managerTotals: { managerId: string; total: number }[];
  updatedAt: string;
  isDemo: boolean;
}

const COLORS = ['#FF6B1A','#F5C518','#22C55E','#3B82F6','#A855F7','#EC4899','#14B8A6','#F97316','#EF4444'];

export default function Home() {
  const [data, setData] = useState<ApiData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastFetch, setLastFetch] = useState<Date | null>(null);

  const fetchData = useCallback(async (isManual = false) => {
    if (isManual) setRefreshing(true);
    try {
      const res = await fetch('/api/players', { cache: 'no-store' });
      const d = await res.json();
      setData(d);
      setLastFetch(new Date());
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    // Auto-refresh every 5 minutes — no cron needed!
    const interval = setInterval(() => fetchData(), 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const ranked = [...MANAGERS]
    .map((m, i) => {
      const entry = data?.managerTotals?.find(t => t.managerId === m.id);
      return { ...m, total: entry?.total ?? 0, color: COLORS[i % COLORS.length] };
    })
    .sort((a, b) => b.total - a.total)
    .map((m, i) => ({ ...m, rank: i + 1 }));

  const top3 = ranked.slice(0, 3);
  const rest = ranked.slice(3);

  const timeAgo = lastFetch
    ? `${Math.floor((Date.now() - lastFetch.getTime()) / 60000)}m ago`
    : '—';

  return (
    <main className={styles.page}>
      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.chips}>
          <span className={styles.liveChip}><span className={styles.dot} />LIVE · IPL 2025</span>
          {data?.isDemo && <span className={styles.demoChip}>⚠ DEMO MODE — Add RAPIDAPI_KEY for live data</span>}
        </div>
        <h1 className={styles.title}>Fantasy<br/>League</h1>
        <p className={styles.sub}>CREX Points · 9 Managers · Auto-refreshes every 5 min</p>
        <div className={styles.refreshRow}>
          <span className={styles.updated}>Updated {timeAgo}</span>
          <button
            className={styles.refreshBtn}
            onClick={() => fetchData(true)}
            disabled={refreshing}
          >
            {refreshing ? '⟳ Refreshing…' : '⟳ Refresh'}
          </button>
        </div>
      </header>

      {/* STATS BAR */}
      <div className={styles.statsBar}>
        {[
          ['9', 'Managers'],
          ['IPL 2025', 'Season'],
          ['CREX', 'Points System'],
          [ranked[0]?.name || '—', 'Leader'],
        ].map(([v, l]) => (
          <div key={l} className={styles.statItem}>
            <div className={styles.statVal}>{v}</div>
            <div className={styles.statLbl}>{l}</div>
          </div>
        ))}
      </div>

      {/* PODIUM */}
      <section className={styles.podium}>
        {/* Silver - 2nd */}
        {top3[1] && (
          <Link href={`/manager/${top3[1].id}`} className={`${styles.podCard} ${styles.p2}`}>
            <div className={styles.podRank} style={{ color: '#9EB0C8' }}>2</div>
            <div className={styles.podAvatar} style={{ background: top3[1].color }}>
              {top3[1].name[0]}
            </div>
            <div className={styles.podName}>{top3[1].name}</div>
            <div className={styles.podTeam}>{top3[1].teamName}</div>
            <div className={styles.podPts}>
              {loading ? <span className="skeleton" style={{display:'inline-block',width:60,height:32}} /> : top3[1].total.toFixed(0)}
            </div>
            <div className={styles.podPtsLbl}>pts</div>
          </Link>
        )}
        {/* Gold - 1st */}
        {top3[0] && (
          <Link href={`/manager/${top3[0].id}`} className={`${styles.podCard} ${styles.p1}`}>
            <div className={styles.crown}>👑</div>
            <div className={styles.podAvatar} style={{ background: top3[0].color, width:70,height:70,fontSize:34 }}>
              {top3[0].name[0]}
            </div>
            <div className={styles.podName}>{top3[0].name}</div>
            <div className={styles.podTeam}>{top3[0].teamName}</div>
            <div className={styles.podPts} style={{ fontSize:52,color:'var(--gold)' }}>
              {loading ? <span className="skeleton" style={{display:'inline-block',width:80,height:44}} /> : top3[0].total.toFixed(0)}
            </div>
            <div className={styles.podPtsLbl}>pts</div>
          </Link>
        )}
        {/* Bronze - 3rd */}
        {top3[2] && (
          <Link href={`/manager/${top3[2].id}`} className={`${styles.podCard} ${styles.p3}`}>
            <div className={styles.podRank} style={{ color: '#CD7F32' }}>3</div>
            <div className={styles.podAvatar} style={{ background: top3[2].color }}>
              {top3[2].name[0]}
            </div>
            <div className={styles.podName}>{top3[2].name}</div>
            <div className={styles.podTeam}>{top3[2].teamName}</div>
            <div className={styles.podPts}>
              {loading ? <span className="skeleton" style={{display:'inline-block',width:60,height:32}} /> : top3[2].total.toFixed(0)}
            </div>
            <div className={styles.podPtsLbl}>pts</div>
          </Link>
        )}
      </section>

      {/* FULL TABLE */}
      <section className={styles.table}>
        <div className={styles.tableHead}>
          <span>#</span><span>Manager</span><span>Squad</span><span>Pts</span>
        </div>

        {ranked.map((m, i) => {
          const isBottom3 = m.rank >= ranked.length - 2;
          return (
            <Link
              key={m.id}
              href={`/manager/${m.id}`}
              className={`${styles.row} ${isBottom3 ? styles.rowBottom : ''}`}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <span className={styles.rowRank} style={{ color: m.rank <= 3 ? 'var(--gold)' : 'var(--muted)' }}>
                {m.rank}
              </span>
              <div className={styles.rowManager}>
                <div className={styles.rowAvatar} style={{ background: m.color }}>{m.name[0]}</div>
                <div>
                  <div className={styles.rowName}>
                    {m.name}
                    {m.rank === 1 && <span className={styles.badge} style={{background:'rgba(245,197,24,.12)',color:'var(--gold)',border:'1px solid rgba(245,197,24,.25)'}}>👑 Leader</span>}
                    {isBottom3 && <span className={styles.badge} style={{background:'rgba(239,68,68,.1)',color:'var(--red)',border:'1px solid rgba(239,68,68,.2)'}}>VC 2×</span>}
                  </div>
                  <div className={styles.rowSub}>{m.teamName}</div>
                </div>
              </div>
              <div className={styles.rowSquad}>{m.players.length} players</div>
              <div className={styles.rowPts}>
                {loading
                  ? <span className="skeleton" style={{display:'inline-block',width:48,height:26}} />
                  : <span>{m.total.toFixed(0)}</span>
                }
              </div>
            </Link>
          );
        })}

        <div className={styles.bottom3Note}>
          <strong style={{color:'var(--red)'}}>⚠ Bottom 3:</strong> Vice-Captain boosted to 2× for next 16 games
        </div>
      </section>

      {/* RULES */}
      <section className={styles.rules}>
        <h2 className={styles.rulesH}>League Rules</h2>
        <div className={styles.rulesGrid}>
          {[
            ['👥','Squad','Min 3 BAT · 3 BOWL · 3 AR · 1 WK · Max 6 BAT · Budget ₹200Cr'],
            ['🃏','RTM Cards','2 RTM cards each. Chit draw between all RTM users + highest bidder.'],
            ['🔄','C/VC Rotation','Change C & VC every 16 games. Captain=2× · Vice-Captain=1.5×'],
            ['⚡','Super 3×','Once with BAT, once with BOWL — earns 3× points for one week.'],
            ['📉','Bottom 3','After 16 games, bottom 3 get VC boosted to 2× for next round.'],
          ].map(([icon, title, desc]) => (
            <div key={title} className={styles.ruleCard}>
              <span className={styles.ruleIcon}>{icon}</span>
              <div>
                <div className={styles.ruleTitle}>{title}</div>
                <div className={styles.ruleDesc}>{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className={styles.footer}>
        IPL Fantasy League 2025 · CREX Points · Built with Next.js · Deployed on Vercel
      </footer>
    </main>
  );
}
