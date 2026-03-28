'use client';
// src/app/manager/[id]/page.tsx

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MANAGERS, IPL_TEAM_COLORS, ROLE_LABELS, type CricketPlayer } from '@/lib/teamsData';
import { getAvatarColor } from '@/lib/scraper';
import styles from './page.module.css';

interface PlayerWithData extends CricketPlayer {
  points: number;
  imageUrl: string | null;
}

const ROLE_ORDER = ['WK', 'BAT', 'AR', 'BOWL'];
const ROLE_ICONS: Record<string, string> = {
  BAT: '🏏', BOWL: '⚾', AR: '⚡', WK: '🧤',
};

export default function ManagerPage({ params }: { params: { id: string } }) {
  const manager = MANAGERS.find((m) => m.id === params.id);
  const [players, setPlayers] = useState<PlayerWithData[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'role' | 'points' | 'price'>('points');

  useEffect(() => {
    if (!manager) return;
    fetch('/api/players')
      .then((r) => r.json())
      .then((data) => {
        const enriched = manager.players.map((p) => ({
          ...p,
          points: data.players?.[p.name]?.points || 0,
          imageUrl: data.players?.[p.name]?.imageUrl || null,
        }));
        setPlayers(enriched);
        setLoading(false);
      })
      .catch(() => {
        setPlayers(manager.players.map((p) => ({ ...p, points: 0, imageUrl: null })));
        setLoading(false);
      });
  }, [manager]);

  if (!manager) {
    return (
      <div style={{ textAlign: 'center', padding: '120px 16px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 48, color: 'var(--text-muted)' }}>
          Manager not found
        </h1>
        <Link href="/" style={{ color: 'var(--orange)', marginTop: 16, display: 'block' }}>← Back</Link>
      </div>
    );
  }

  const totalPoints = players.reduce((s, p) => s + p.points, 0);
  const totalSpend = manager.players.reduce((s, p) => s + p.price, 0);

  const filtered = players
    .filter((p) => filter === 'ALL' || p.role === filter)
    .sort((a, b) => {
      if (sortBy === 'points') return b.points - a.points;
      if (sortBy === 'price') return b.price - a.price;
      return ROLE_ORDER.indexOf(a.role) - ROLE_ORDER.indexOf(b.role);
    });

  const topScorer = [...players].sort((a, b) => b.points - a.points)[0];
  const managerColor = getAvatarColor(manager.name);

  // Group by role for role view
  const byRole = ROLE_ORDER.reduce<Record<string, PlayerWithData[]>>((acc, r) => {
    acc[r] = players.filter((p) => p.role === r);
    return acc;
  }, {});

  return (
    <div className={styles.page}>
      {/* BACK */}
      <Link href="/" className={styles.back}>
        ← All Managers
      </Link>

      {/* HERO */}
      <div className={styles.hero} style={{ '--accent': managerColor } as React.CSSProperties}>
        <div className={styles.heroBg} style={{ background: `radial-gradient(ellipse 60% 60% at 80% 50%, ${managerColor}18, transparent)` }} />
        <div className={styles.heroContent}>
          <div className={styles.heroAvatar} style={{ background: managerColor }}>
            {manager.name[0]}
          </div>
          <div>
            <div className={styles.heroLabel}>Fantasy Manager</div>
            <h1 className={styles.heroName}>{manager.name}</h1>
            <div className={styles.heroTeam}>{manager.teamName}</div>
          </div>
        </div>

        {/* Hero stats */}
        <div className={styles.heroStats}>
          <div className={styles.heroStat}>
            <div className={styles.heroStatVal} style={{ color: 'var(--gold)' }}>
              {loading ? '—' : totalPoints.toFixed(1)}
            </div>
            <div className={styles.heroStatLabel}>Total Points</div>
          </div>
          <div className={styles.heroStatDivider} />
          <div className={styles.heroStat}>
            <div className={styles.heroStatVal}>₹{totalSpend.toFixed(1)}Cr</div>
            <div className={styles.heroStatLabel}>Squad Value</div>
          </div>
          <div className={styles.heroStatDivider} />
          <div className={styles.heroStat}>
            <div className={styles.heroStatVal}>{manager.players.length}</div>
            <div className={styles.heroStatLabel}>Players</div>
          </div>
          <div className={styles.heroStatDivider} />
          <div className={styles.heroStat}>
            <div className={styles.heroStatVal} style={{ fontSize: 16, color: 'var(--orange)' }}>
              {loading ? '—' : topScorer?.name?.split(' ').slice(-1)[0]}
            </div>
            <div className={styles.heroStatLabel}>Top Scorer</div>
          </div>
        </div>
      </div>

      {/* ROLE SUMMARY BADGES */}
      <div className={styles.roleSummary}>
        {ROLE_ORDER.map((r) => (
          <div key={r} className={styles.roleBadge}>
            <span className={styles.roleBadgeIcon}>{ROLE_ICONS[r]}</span>
            <span className={styles.roleBadgeCount}>{byRole[r]?.length || 0}</span>
            <span className={styles.roleBadgeLabel}>{ROLE_LABELS[r as keyof typeof ROLE_LABELS]}</span>
          </div>
        ))}
      </div>

      {/* FILTERS & SORT */}
      <div className={styles.controls}>
        <div className={styles.filters}>
          {['ALL', 'BAT', 'BOWL', 'AR', 'WK'].map((r) => (
            <button
              key={r}
              onClick={() => setFilter(r)}
              className={`${styles.filterBtn} ${filter === r ? styles.filterActive : ''}`}
            >
              {r === 'ALL' ? 'All' : `${ROLE_ICONS[r]} ${r}`}
            </button>
          ))}
        </div>
        <div className={styles.sorts}>
          {(['points', 'role', 'price'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSortBy(s)}
              className={`${styles.sortBtn} ${sortBy === s ? styles.sortActive : ''}`}
            >
              {s === 'points' ? '↓ Points' : s === 'price' ? '↓ Price' : 'By Role'}
            </button>
          ))}
        </div>
      </div>

      {/* PLAYER GRID */}
      <div className={styles.playerGrid}>
        {filtered.map((player, i) => {
          const teamColor = IPL_TEAM_COLORS[player.team] || { bg: '#1E2D4A', text: '#fff', accent: '#fff' };
          const isCaptain = manager.captain === player.name;
          const isVC = manager.viceCaptain === player.name;
          const isSuper = manager.super3xPlayer === player.name;
          const multiplier = isCaptain ? 2 : isVC ? 1.5 : isSuper ? 3 : 1;
          const effectivePts = player.points * multiplier;

          return (
            <div
              key={player.name}
              className={styles.playerCard}
              style={{ animationDelay: `${i * 0.04}s` }}
            >
              {/* Team colour strip */}
              <div className={styles.cardTeamStrip} style={{ background: teamColor.bg }} />

              {/* Player image or avatar */}
              <div className={styles.cardImageWrap}>
                {player.imageUrl ? (
                  <Image
                    src={player.imageUrl}
                    alt={player.name}
                    width={80}
                    height={80}
                    className={styles.cardImage}
                    unoptimized
                  />
                ) : (
                  <div
                    className={styles.cardAvatar}
                    style={{ background: `linear-gradient(135deg, ${teamColor.bg}, ${teamColor.accent || teamColor.bg})` }}
                  >
                    {player.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                  </div>
                )}
                {/* Special badges overlay */}
                {isCaptain && <div className={styles.capBadge}>C</div>}
                {isVC && <div className={styles.vcBadge}>VC</div>}
                {isSuper && <div className={styles.superBadge}>3×</div>}
              </div>

              {/* Info */}
              <div className={styles.cardInfo}>
                <div className={styles.cardName}>{player.name}</div>
                <div className={styles.cardMeta}>
                  <span
                    className={styles.cardTeamTag}
                    style={{ background: teamColor.bg, color: teamColor.text }}
                  >
                    {player.team}
                  </span>
                  <span className={styles.cardRoleTag}>
                    {ROLE_ICONS[player.role]} {player.role}
                  </span>
                </div>
                <div className={styles.cardPrice}>₹{player.price}Cr</div>
              </div>

              {/* Points */}
              <div className={styles.cardPoints}>
                {loading ? (
                  <div className="skeleton" style={{ width: 50, height: 32, borderRadius: 6 }} />
                ) : (
                  <>
                    <div className={styles.cardPtsVal}>{effectivePts.toFixed(1)}</div>
                    {multiplier > 1 && (
                      <div className={styles.cardMultiplier} style={{ color: isCaptain ? 'var(--gold)' : isSuper ? 'var(--green)' : 'var(--orange)' }}>
                        {isCaptain ? '2× Captain' : isVC ? '1.5× VC' : '3× Super'}
                      </div>
                    )}
                    <div className={styles.cardBasePts}>base: {player.points.toFixed(1)}</div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* POINTS BAR CHART (role breakdown) */}
      <div className={styles.breakdown}>
        <h2 className={styles.breakdownTitle}>Points by Role</h2>
        <div className={styles.breakdownBars}>
          {ROLE_ORDER.map((role) => {
            const rolePlayers = players.filter((p) => p.role === role);
            const roleTotal = rolePlayers.reduce((s, p) => s + p.points, 0);
            const pct = totalPoints > 0 ? (roleTotal / totalPoints) * 100 : 0;
            return (
              <div key={role} className={styles.barRow}>
                <div className={styles.barLabel}>
                  {ROLE_ICONS[role]} {ROLE_LABELS[role as keyof typeof ROLE_LABELS]}
                </div>
                <div className={styles.barTrack}>
                  <div
                    className={styles.barFill}
                    style={{ width: `${pct}%`, background: role === 'BAT' ? 'var(--gold)' : role === 'BOWL' ? 'var(--orange)' : role === 'AR' ? 'var(--green)' : 'var(--blue-accent)' }}
                  />
                </div>
                <div className={styles.barVal}>{loading ? '—' : roleTotal.toFixed(0)}</div>
              </div>
            );
          })}
        </div>
      </div>

      <footer className={styles.footer}>
        <Link href="/" className={styles.backBtn}>← Back to Leaderboard</Link>
      </footer>
    </div>
  );
}
