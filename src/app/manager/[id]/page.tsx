'use client';
import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { MANAGERS, IPL_TEAM_COLORS, ROLE_LABELS, ROLE_ICONS, Role } from '@/lib/teamsData';
import styles from './page.module.css';

const CREX_IMG = (id: string) => `https://cricketvectors.akamaized.net/players/org/${id}.png`;
const CREX_TEAM_IMG = (code: string) => {
  const map: Record<string, string> = { MI:'F', CSK:'G', RCB:'K', KKR:'J', DC:'H', PBKS:'I', SRH:'L', RR:'M', GT:'KB', LSG:'KC' };
  return `https://cricketvectors.akamaized.net/Teams/${map[code] || code}.png`;
};

const ROLES: Role[] = ['BAT', 'BOWL', 'AR', 'WK'];

interface ApiData {
  players: Record<string, { points: number; runs: number; wickets: number; matches: number }>;
  isDemo: boolean;
}

type PageParams = { id: string };

export default function ManagerPage({ params }: { params: Promise<PageParams> }) {
  const [managerId, setManagerId] = useState<string>('');
  const [data, setData] = useState<ApiData | null>(null);
  const [loading, setLoading] = useState(true);
  const [imgErrors, setImgErrors] = useState<Set<string>>(new Set());
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    Promise.resolve(params).then((p) => setManagerId(p.id));
  }, [params]);

  const fetchData = useCallback(async (manual = false) => {
    if (manual) setRefreshing(true);
    try {
      const res = await fetch('/api/players', { cache: 'no-store' });
      setData(await res.json());
    } catch (e) { console.error(e); }
    finally { setLoading(false); setRefreshing(false); }
  }, []);

  useEffect(() => {
    if (!managerId) return;
    fetchData();
    const iv = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(iv);
  }, [fetchData, managerId]);

  const manager = MANAGERS.find(m => m.id === managerId);

  if (!managerId) {
    return <div style={{ textAlign:'center', padding:'120px 16px', color:'var(--muted)', fontFamily:'var(--f-display)', fontSize:32 }}>Loading…</div>;
  }

  if (!manager) {
    return (
      <div style={{ textAlign:'center', padding:'120px 16px' }}>
        <h1 style={{ fontFamily:'var(--f-display)', fontSize:48, color:'var(--muted)' }}>Manager not found</h1>
        <Link href="/" style={{ color:'var(--orange)', display:'block', marginTop:16 }}>← Back</Link>
      </div>
    );
  }

  const getPlayerPts = (name: string) => {
    if (!data) return 0;
    if (data.players[name]) return data.players[name].points;
    const last = name.split(' ').pop()!.toLowerCase();
    const found = Object.entries(data.players).find(([k]) => k.toLowerCase().includes(last));
    return found ? found[1].points : 0;
  };

  const enriched = manager.players.map(p => {
    const pts = getPlayerPts(p.name);
    const isCap   = manager.captain       === p.name;
    const isVC    = manager.viceCaptain   === p.name;
    const isSuper = manager.super3xPlayer === p.name;
    const multiplier = isCap ? 2 : isVC ? 1.5 : isSuper ? 3 : 1;
    return { ...p, points: pts, isCap, isVC, isSuper, multiplier, effectivePts: pts * multiplier };
  });

  const total     = enriched.reduce((s, p) => s + p.effectivePts, 0);
  const topScorer = [...enriched].sort((a, b) => b.effectivePts - a.effectivePts)[0];

  // ── Sections: C/VC first, then BAT → BOWL → AR → WK ──
  const capVC = enriched
    .filter(p => p.isCap || p.isVC)
    .sort((a, b) => (b.isCap ? 1 : 0) - (a.isCap ? 1 : 0)); // captain before VC

  const byRole = Object.fromEntries(
    ROLES.map(r => [r, enriched.filter(p => p.role === r && !p.isCap && !p.isVC)
      .sort((a, b) => b.effectivePts - a.effectivePts)])
  ) as Record<Role, typeof enriched>;

  // For the breakdown bar chart we include everyone (C/VC counted in their role)
  const byRoleAll = Object.fromEntries(
    ROLES.map(r => [r, enriched.filter(p => p.role === r)])
  ) as Record<Role, typeof enriched>;

  const sections = [
    ...( capVC.length > 0 ? [{ key: 'CAPVC', label: 'Captain & Vice-Captain', accent: 'var(--gold)', players: capVC }] : [] ),
    { key: 'BAT',  label: `${ROLE_ICONS.BAT} ${ROLE_LABELS.BAT}s`,       accent: 'var(--gold)',   players: byRole.BAT  },
    { key: 'BOWL', label: `${ROLE_ICONS.BOWL} ${ROLE_LABELS.BOWL}s`,     accent: 'var(--orange)', players: byRole.BOWL },
    { key: 'AR',   label: `${ROLE_ICONS.AR} ${ROLE_LABELS.AR}s`,         accent: 'var(--green)',  players: byRole.AR   },
    { key: 'WK',   label: `${ROLE_ICONS.WK} ${ROLE_LABELS.WK}s`,         accent: 'var(--blue)',   players: byRole.WK   },
  ].filter(s => s.players.length > 0);

  // Shared card renderer
  const renderCard = (p: typeof enriched[0], i: number) => {
    const tc     = IPL_TEAM_COLORS[p.team] || { bg:'#1E2D4A', text:'#fff' };
    const imgOk  = !imgErrors.has(p.crexId);
    return (
      <div key={p.name} className={styles.card} style={{ animationDelay:`${i * 0.04}s` }}>
        <div className={styles.strip} style={{ background: tc.bg }} />
        <div className={styles.imgWrap}>
          {imgOk ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={CREX_IMG(p.crexId)} alt={p.shortName} className={styles.playerImg}
              onError={() => setImgErrors(prev => new Set([...prev, p.crexId]))} />
          ) : (
            <div className={styles.fallbackAvatar} style={{ background: tc.bg }}>
              {p.shortName.split('. ').map((w: string) => w[0]).join('')}
            </div>
          )}
          {p.isCap   && <div className={styles.badge} style={{ background:'var(--gold)',   color:'#1a1000' }}>C</div>}
          {p.isVC    && <div className={styles.badge} style={{ background:'var(--orange)', color:'#fff'    }}>VC</div>}
          {p.isSuper && <div className={styles.badge} style={{ background:'var(--green)',  color:'#fff'    }}>3×</div>}
        </div>

        <div className={styles.info}>
          <div className={styles.pName}>{p.shortName}</div>
          <div className={styles.pMeta}>
            <div className={styles.pTeam} style={{ background: tc.bg, color: tc.text }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={CREX_TEAM_IMG(p.team)} alt={p.team} width={14} height={14}
                style={{ borderRadius:2, flexShrink:0 }}
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display='none'; }} />
              {p.team}
            </div>
            <div className={styles.pRole}>{ROLE_ICONS[p.role]} {p.role}</div>
          </div>
        </div>

        <div className={styles.pts}>
          {loading
            ? <span className="skeleton" style={{ display:'inline-block', width:48, height:30 }} />
            : <>
                <div className={styles.ptsVal}>{p.effectivePts.toFixed(0)}</div>
                {p.multiplier > 1 && (
                  <div className={styles.ptsMult} style={{ color: p.isCap ? 'var(--gold)' : p.isSuper ? 'var(--green)' : 'var(--orange)' }}>
                    {p.isCap ? '2× C' : p.isVC ? '1.5× VC' : '3× ⚡'}
                  </div>
                )}
                <div className={styles.ptsBase}>{p.points.toFixed(0)} base</div>
              </>
          }
        </div>
      </div>
    );
  };

  return (
    <div className={styles.page}>
      <Link href="/" className={styles.back}>← All Managers</Link>

      {/* HERO */}
      <div className={styles.hero}>
        <div className={styles.heroGlow} />
        <div className={styles.heroTop}>
          <div className={styles.heroAvatar}>{manager.name[0]}</div>
          <div>
            <div className={styles.heroLabel}>Fantasy Manager</div>
            <h1 className={styles.heroName}>{manager.name}</h1>
            <div className={styles.heroTeamName}>{manager.teamName}</div>
          </div>
          <button className={styles.heroRefresh} onClick={() => fetchData(true)} disabled={refreshing}>
            {refreshing ? '⟳ …' : '⟳ Refresh'}
          </button>
        </div>
        <div className={styles.heroStats}>
          {[
            { val: loading ? '—' : total.toFixed(0), lbl: 'Total Points', gold: true },
            { val: String(manager.players.length),    lbl: 'Players',      gold: false },
            { val: loading ? '—' : (topScorer?.shortName?.split('. ')[1] || '—'), lbl: 'Top Scorer', gold: false },
          ].map((s, i) => (
            <div key={i} className={styles.heroStat}>
              <div className={styles.heroStatVal} style={s.gold ? { color:'var(--gold)' } : {}}>
                {loading && s.gold
                  ? <span className="skeleton" style={{ display:'inline-block', width:60, height:28 }} />
                  : s.val}
              </div>
              <div className={styles.heroStatLbl}>{s.lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTIONED SQUAD */}
      {sections.map(section => (
        <div key={section.key} className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionAccent} style={{ background: section.accent }} />
            <h2 className={styles.sectionTitle}>{section.label}</h2>
            <span className={styles.sectionCount}>{section.players.length}</span>
          </div>
          <div className={styles.grid}>
            {section.players.map((p, i) => renderCard(p, i))}
          </div>
        </div>
      ))}

      {/* BREAKDOWN */}
      <div className={styles.breakdown}>
        <h2 className={styles.breakH}>Points by Role</h2>
        {ROLES.map(role => {
          const rPts = byRoleAll[role]?.reduce((s, p) => s + p.effectivePts, 0) ?? 0;
          const pct  = total > 0 ? (rPts / total) * 100 : 0;
          const colors: Record<Role, string> = { BAT:'var(--gold)', BOWL:'var(--orange)', AR:'var(--green)', WK:'var(--blue)' };
          return (
            <div key={role} className={styles.barRow}>
              <div className={styles.barLabel}>{ROLE_ICONS[role]} {ROLE_LABELS[role]}</div>
              <div className={styles.barTrack}>
                <div className={styles.barFill} style={{ width:`${pct}%`, background: colors[role] }} />
              </div>
              <div className={styles.barVal}>{loading ? '—' : rPts.toFixed(0)}</div>
            </div>
          );
        })}
      </div>

      <div className={styles.footer}>
        <Link href="/" className={styles.backBtn}>← Back to Leaderboard</Link>
        <div className={styles.crexNote}>Photos via <a href="https://crex.com" target="_blank" rel="noopener" style={{ color:'var(--orange)' }}>CREX</a></div>
      </div>
    </div>
  );
}
