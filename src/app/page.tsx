'use client';
// src/app/page.tsx

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MANAGERS } from '@/lib/teamsData';
import styles from './page.module.css';

interface ManagerScore {
  managerId: string;
  total: number;
}

interface ApiResponse {
  players: Record<string, { points: number; imageUrl: string | null }>;
  managerTotals: ManagerScore[];
  updatedAt: string;
}

const MANAGER_COLORS = [
  '#FF6B1A', '#F5C518', '#22C55E', '#3B82F6',
  '#A855F7', '#EC4899', '#14B8A6', '#F97316', '#EF4444',
];

export default function HomePage() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/players')
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  // Build ranked list
  const ranked = [...MANAGERS]
    .map((m) => {
      const scoreEntry = data?.managerTotals?.find((mt) => mt.managerId === m.id);
      return { ...m, total: scoreEntry?.total || 0 };
    })
    .sort((a, b) => b.total - a.total);

  const top3 = ranked.slice(0, 3);
  const rest = ranked.slice(3);
  const lastUpdated = data?.updatedAt ? new Date(data.updatedAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' }) : '—';

  return (
    <div className={styles.page}>
      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.liveChip}>
            <span className={styles.liveDot} />
            LIVE · IPL 2025
          </div>
          <h1 className={styles.title}>Fantasy<br />Standings</h1>
          <p className={styles.subtitle}>CREX Points System · 9 Managers</p>
          <div className={styles.lastUpdated}>
            Last updated: <span>{lastUpdated}</span>
          </div>
        </div>
        {/* Decorative cricket stumps SVG */}
        <svg className={styles.stumps} viewBox="0 0 120 160" fill="none">
          <rect x="10" y="20" width="8" height="130" rx="4" fill="rgba(245,197,24,0.15)" />
          <rect x="56" y="20" width="8" height="130" rx="4" fill="rgba(245,197,24,0.2)" />
          <rect x="102" y="20" width="8" height="130" rx="4" fill="rgba(245,197,24,0.15)" />
          <rect x="0" y="18" width="120" height="8" rx="4" fill="rgba(245,197,24,0.25)" />
          <rect x="0" y="6" width="120" height="8" rx="4" fill="rgba(245,197,24,0.2)" />
        </svg>
      </header>

      {/* STAT ROW */}
      <div className={styles.statRow}>
        {[
          { label: 'Managers', value: '9' },
          { label: 'Season', value: 'IPL 2025' },
          { label: 'Points System', value: 'CREX' },
          { label: 'Gameweek', value: loading ? '—' : 'Live' },
        ].map((s) => (
          <div key={s.label} className={styles.statItem}>
            <div className={styles.statVal}>{s.value}</div>
            <div className={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* PODIUM TOP 3 */}
      <section className={styles.podiumSection}>
        <div className={styles.podium}>
          {/* 2nd */}
          {top3[1] && (
            <Link href={`/manager/${top3[1].id}`} className={`${styles.podiumCard} ${styles.second}`}>
              <div className={styles.podiumRank}>2</div>
              <div className={styles.podiumAvatar} style={{ background: MANAGER_COLORS[ranked.indexOf(top3[1])] }}>
                {top3[1].name[0]}
              </div>
              <div className={styles.podiumName}>{top3[1].name}</div>
              <div className={styles.podiumTeamName}>{top3[1].teamName}</div>
              <div className={styles.podiumPts}>{loading ? '—' : top3[1].total.toFixed(1)}</div>
              <div className={styles.podiumPtsLabel}>pts</div>
              <div className={styles.podiumBar} style={{ height: '80px', background: 'rgba(160,176,192,0.3)' }} />
            </Link>
          )}
          {/* 1st */}
          {top3[0] && (
            <Link href={`/manager/${top3[0].id}`} className={`${styles.podiumCard} ${styles.first}`}>
              <div className={styles.crown}>👑</div>
              <div className={styles.podiumAvatar} style={{ background: MANAGER_COLORS[0], width: 72, height: 72, fontSize: 32 }}>
                {top3[0].name[0]}
              </div>
              <div className={styles.podiumName}>{top3[0].name}</div>
              <div className={styles.podiumTeamName}>{top3[0].teamName}</div>
              <div className={styles.podiumPts} style={{ fontSize: 48, color: 'var(--gold)' }}>
                {loading ? '—' : top3[0].total.toFixed(1)}
              </div>
              <div className={styles.podiumPtsLabel}>pts</div>
              <div className={styles.podiumBar} style={{ height: '110px', background: 'linear-gradient(to top, rgba(245,197,24,0.3), transparent)' }} />
            </Link>
          )}
          {/* 3rd */}
          {top3[2] && (
            <Link href={`/manager/${top3[2].id}`} className={`${styles.podiumCard} ${styles.third}`}>
              <div className={styles.podiumRank}>3</div>
              <div className={styles.podiumAvatar} style={{ background: MANAGER_COLORS[2] }}>
                {top3[2].name[0]}
              </div>
              <div className={styles.podiumName}>{top3[2].name}</div>
              <div className={styles.podiumTeamName}>{top3[2].teamName}</div>
              <div className={styles.podiumPts}>{loading ? '—' : top3[2].total.toFixed(1)}</div>
              <div className={styles.podiumPtsLabel}>pts</div>
              <div className={styles.podiumBar} style={{ height: '60px', background: 'rgba(205,127,50,0.25)' }} />
            </Link>
          )}
        </div>
      </section>

      {/* FULL TABLE */}
      <section className={styles.tableSection}>
        <div className={styles.tableHead}>
          <span>#</span>
          <span>Manager</span>
          <span>Squad</span>
          <span>Total Pts</span>
        </div>

        {/* Top 3 mini rows */}
        {ranked.map((m, i) => {
          const isBottom3 = i >= ranked.length - 3;
          const color = MANAGER_COLORS[i % MANAGER_COLORS.length];
          return (
            <Link
              key={m.id}
              href={`/manager/${m.id}`}
              className={`${styles.tableRow} ${isBottom3 ? styles.bottom3 : ''}`}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className={styles.rankCell}>
                <span className={styles.rankNum} style={{ color: i < 3 ? 'var(--gold)' : 'var(--text-muted)' }}>
                  {i + 1}
                </span>
              </div>
              <div className={styles.managerCell}>
                <div className={styles.tableAvatar} style={{ background: color }}>
                  {m.name[0]}
                </div>
                <div>
                  <div className={styles.managerName}>
                    {m.name}
                    {i === 0 && <span className={styles.badge} style={{ background: 'rgba(245,197,24,0.15)', color: 'var(--gold)', border: '1px solid rgba(245,197,24,0.3)' }}>👑 LEADER</span>}
                    {isBottom3 && <span className={styles.badge} style={{ background: 'rgba(239,68,68,0.1)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.2)' }}>VC 2×</span>}
                  </div>
                  <div className={styles.managerSub}>{m.teamName}</div>
                </div>
              </div>
              <div className={styles.squadCell}>
                <span>{m.players.length} players</span>
              </div>
              <div className={styles.ptsCell}>
                <span className={styles.ptsVal}>{loading ? <span className="skeleton" style={{ display: 'inline-block', width: 50, height: 24 }} /> : m.total.toFixed(1)}</span>
              </div>
            </Link>
          );
        })}

        <div className={styles.bottom3Note}>
          <span style={{ color: 'var(--red)', fontWeight: 700 }}>⚠ Bottom 3:</span> Vice-Captain boosted to 2× for next 16 games
        </div>
      </section>

      {/* RULES QUICK REF */}
      <section className={styles.rulesSection}>
        <h2 className={styles.rulesTitle}>League Rules</h2>
        <div className={styles.rulesGrid}>
          {[
            { icon: '👥', title: 'Squad', desc: 'Min 3 BAT · 3 BOWL · 3 AR · 1 WK · Max 6 BAT · Budget ₹200Cr' },
            { icon: '🃏', title: 'RTM Cards', desc: '2 RTM cards each. Chit draw between all RTM users + highest bidder.' },
            { icon: '🔄', title: 'C/VC Rotation', desc: 'Change Captain & Vice-Captain every 16 games. C=2× · VC=1.5×' },
            { icon: '⚡', title: 'Super 3× Player', desc: 'Once with a BAT, once with a BOWL — earns 3× points for one week.' },
            { icon: '📉', title: 'Bottom 3 Rule', desc: 'After every 16 games, bottom 3 get VC boosted to 2× next round.' },
          ].map((r) => (
            <div key={r.title} className={styles.ruleCard}>
              <span className={styles.ruleIcon}>{r.icon}</span>
              <div>
                <div className={styles.ruleTitle}>{r.title}</div>
                <div className={styles.ruleDesc}>{r.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className={styles.footer}>
        IPL Fantasy League 2025 · Powered by CREX Points · Built with Next.js
      </footer>
    </div>
  );
}
