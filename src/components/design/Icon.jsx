// src/components/design/Icon.jsx
//
// Hand-rolled SVG icon set used by Wave 3 redesigned pages
// (any page wrapped in <div className="design-page">).
// Ported verbatim from the Claude Design components.jsx export.
//
// Used by: src/components/softtrade/*Page.jsx, and future redesigned pages.

export function Icon({ name, size = 18, stroke = 1.75, className = '', style }) {
  const s = size;
  const common = {
    width: s,
    height: s,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: stroke,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className,
    style,
  };
  const p = {
    check: <polyline points="20 6 9 17 4 12" />,
    arrow: <><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></>,
    phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" />,
    chevron: <polyline points="6 9 12 15 18 9" />,
    sparkle: <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />,
    book: <><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v15.5a2.5 2.5 0 0 0 0 5H6.5A2.5 2.5 0 0 1 4 20V4.5z" /><line x1="8" y1="7" x2="16" y2="7" /><line x1="8" y1="11" x2="14" y2="11" /></>,
    ledger: <><rect x="3" y="4" width="18" height="16" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="4" x2="9" y2="20"/></>,
    coins: <><circle cx="9" cy="12" r="6"/><path d="M15 6a6 6 0 0 1 0 12"/><path d="M9 9v6"/><path d="M11 10.5a1.5 1.5 0 1 0 0 3h-2a1.5 1.5 0 1 1 0-3h3"/></>,
    boxes: <><path d="M3 8l9-5 9 5"/><path d="M3 8v9l9 5 9-5V8"/><line x1="12" y1="13" x2="12" y2="22"/><line x1="3" y1="8" x2="12" y2="13"/><line x1="21" y1="8" x2="12" y2="13"/></>,
    factory: <><path d="M3 21V11l5 3V11l5 3V8l8 5v8H3z"/><line x1="9" y1="17" x2="9" y2="19"/><line x1="14" y1="17" x2="14" y2="19"/></>,
    receipt: <><path d="M5 3v18l2-2 2 2 2-2 2 2 2-2 2 2 2-2V3l-2 2-2-2-2 2-2-2-2 2-2-2-2 2z"/><line x1="9" y1="9" x2="15" y2="9"/><line x1="9" y1="13" x2="15" y2="13"/></>,
    truck: <><rect x="1" y="6" width="14" height="11" rx="1"/><path d="M15 9h4l3 4v4h-7"/><circle cx="6" cy="19" r="2"/><circle cx="18" cy="19" r="2"/></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></>,
    chart: <><line x1="3" y1="20" x2="21" y2="20"/><rect x="6" y="12" width="3" height="8"/><rect x="11" y="6" width="3" height="14"/><rect x="16" y="14" width="3" height="6"/></>,
    shield: <path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z"/>,
    map: <><polygon points="1 6 8 3 16 6 23 3 23 18 16 21 8 18 1 21 1 6"/><line x1="8" y1="3" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="21"/></>,
    star: <polygon points="12 2 15 9 22 9.5 17 14.5 18.5 22 12 18.5 5.5 22 7 14.5 2 9.5 9 9 12 2"/>,
    rupee: <><path d="M6 4h12"/><path d="M6 8h12"/><path d="M6 12h6a3 3 0 0 0 0-6"/><path d="M6 12l8 8"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/></>,
    users: <><circle cx="9" cy="8" r="4"/><path d="M2 21c0-4 3.5-7 7-7s7 3 7 7"/><circle cx="17" cy="6" r="3"/><path d="M22 18c0-3-2.5-5-5-5"/></>,
    download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></>,
    play: <polygon points="6 4 20 12 6 20 6 4" fill="currentColor" stroke="none"/>,
    grid: <><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></>,
    lock: <><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></>,
    sync: <><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.5 9a9 9 0 0 1 14.85-3.36L23 10"/><path d="M20.5 15a9 9 0 0 1-14.85 3.36L1 14"/></>,
    cloud: <path d="M18 16a4 4 0 0 0-1-7.87A6 6 0 0 0 5.34 11 4 4 0 0 0 6 19h12a3 3 0 0 0 0-6 3 3 0 0 0-3-3"/>,
    zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>,
    file: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></>,
    mail: <><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22 6 12 13 2 6"/></>,
    msg: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>,
    calc: <><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="8" y2="10"/><line x1="12" y1="10" x2="12" y2="10"/><line x1="16" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="8" y2="14"/><line x1="12" y1="14" x2="12" y2="14"/><line x1="16" y1="14" x2="16" y2="14"/><line x1="8" y1="18" x2="8" y2="18"/><line x1="12" y1="18" x2="12" y2="18"/><line x1="16" y1="18" x2="16" y2="18"/></>,
    handshake: <><path d="M11 17l2 2 7-7-3-3-2 2"/><path d="M9 11L4 6 2 8l5 5"/><path d="M3 13l4 4 2-2"/><path d="M14 8l-4 4"/></>,
    award: <><circle cx="12" cy="9" r="6"/><polyline points="8 13 6 21 12 18 18 21 16 13"/></>,
    fb: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" fill="currentColor" stroke="none"/>,
    ig: <><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></>,
    in: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2" fill="currentColor"/></>,
    yt: <><path d="M22.5 6.5a3 3 0 0 0-2-2C18.5 4 12 4 12 4s-6.5 0-8.5.5a3 3 0 0 0-2 2C1 8.5 1 12 1 12s0 3.5.5 5.5a3 3 0 0 0 2 2C5.5 20 12 20 12 20s6.5 0 8.5-.5a3 3 0 0 0 2-2C23 15.5 23 12 23 12s0-3.5-.5-5.5z"/><polygon points="10 15 15 12 10 9 10 15" fill="currentColor"/></>,
    wa: <><path d="M3 21l1.5-5A8 8 0 1 1 8 19.5L3 21z"/><path d="M8 10c0 4 2 6 6 6"/></>,
  };
  return <svg {...common}>{p[name]}</svg>;
}

export function IconChip({ name, tone = 'paper', size = 44 }) {
  const tones = {
    paper:  { bg: 'var(--paper-2)',     fg: 'var(--ink)' },
    orange: { bg: 'var(--orange-soft)', fg: 'var(--orange)' },
    teal:   { bg: 'var(--teal-soft)',   fg: 'var(--teal)' },
    ink:    { bg: 'var(--ink)',         fg: '#fff' },
    white:  { bg: '#fff',               fg: 'var(--ink)' },
  };
  const t = tones[tone];
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: 12,
      background: t.bg,
      color: t.fg,
      display: 'grid',
      placeItems: 'center',
      flexShrink: 0,
      border: tone === 'white' ? '1px solid var(--line-2)' : 'none',
    }}>
      <Icon name={name} size={Math.round(size * 0.5)} stroke={1.8} />
    </div>
  );
}
