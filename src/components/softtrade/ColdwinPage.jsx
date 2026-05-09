// src/components/softtrade/ColdwinPage.jsx
//
// SoftTrade-Coldwin product page — Wave 3 redesign.
//
// Composed sections:
//   - Hero (with ChamberMap visual + dark marquee)
//   - WorkflowDiagram (6-step inward → outward flow)
//   - Pricing (2 plan cards + sticky kicker/lede/2 info chips)
//   - Features (4-card grid; 13 items aligned with products.js)
//   - FinalCTA (single-column centered dark card)
//
// Edits from the design (per content reconciliation):
//   - Hero: kept "Offline · single-site" secondary descriptor
//   - Hero: dropped "Watch 90-sec demo" and "Brochure (PDF)" buttons
//   - Hero: dropped "1,800+ / Indian businesses" trust strip stat
//     (would have read as Coldwin-specific even though products.js
//     uses it as a SoftTrade family-level claim) — 3 stats → 2,
//     1 divider removed accordingly
//   - Hero: top inline padding 80→152px (fixed RouterNav clearance)
//   - Hero: marquee always renders; keyframe renamed coldwin-marquee
//   - Hero description: "SoftTrade-Mandi" mention wired as a
//     <Link to="/products/softtrade-mandi"> (orange, semi-bold) so
//     the cross-reference survives even though CrossLink is dropped
//   - Pricing: dropped section title "Sold per site — one install
//     per cold storage" (info redundant with the lede)
//   - Pricing: dropped "Honest first" info chip (3 → 2; kept
//     "Free installation" and "Not for enterprise 3PL")
//   - Pricing: dropped "Quote in under 2 hours" sub-line in cards
//   - Pricing: 8-item check/lock comparison dropped — 4 highlights
//     per card sourced from products.js, all checked
//   - Pricing: plan names "Single User" / "Multi User" (was
//     "Coldwin Solo" / "Coldwin Plus")
//   - Features: dropped section title "Standard cold-storage workflow,
//     without the IoT complexity" and lede paragraph; "WHAT YOU GET"
//     kicker kept. Card content (13 items) is a verbatim regrouping
//     of products.js — 10 from additionalFeatures + 3 GST items from
//     main features. The 3 main-features items NOT in cards (Offline,
//     "runs on Mandi engine", "1,800+ businesses") are positioning
//     content, not workflow features — Offline appears in the Hero
//     trust strip already.
//   - FinalCTA: right-side "WHAT TO EXPECT" card dropped; centered
//     single-column layout
//   - FinalCTA: secondary phone button dropped; only "Book a
//     walkthrough" remains
//   - FinalCTA: body text uses products.js wording verbatim (was
//     different in the design)
//   - All CTAs wired as React Router <Link to="/contact">
//   - <React.Fragment> → <Fragment> (ES module import)
//   - CrossLink section ("SAME FAMILY" cross-sell to Mandi) dropped
//     entirely; the inline Mandi link in the hero description
//     replaces its function

import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Icon, IconChip } from '../design/Icon';

// ============================================================
// ChamberMap — decorative cold-storage chamber occupancy visual
// on the right of the Hero. Shows a 6×4 chamber grid with one
// chamber highlighted (orange ring) and a selected-lot detail
// row, a back STORAGE RATE card, and a floating "TODAY'S OPS"
// inward/outward card. All inline-styled HTML/CSS — no real data.
// Ported verbatim from design/coldwin-hero.jsx.
// ============================================================

function ChamberMap() {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      maxWidth: 760,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <img
        src="/Coldwin-removebg-preview.png"
        alt="SoftTrade Coldwin product box"
        style={{
          width: '100%',
          height: 'auto',
          maxWidth: 720,
          objectFit: 'contain',
          filter: 'drop-shadow(0 30px 50px rgba(14, 27, 44, 0.18))',
        }}
      />
    </div>
  );
}

// ============================================================
// Hero
// ============================================================

function Hero() {
  return (
    <section style={{position:'relative', overflow:'hidden',
      background:'linear-gradient(180deg,#F1EADB 0%,#FBF8F1 100%)', borderBottom:'1px solid var(--line)'}}>
      <div className="paper-grid" style={{position:'absolute', inset:0, opacity:.45, pointerEvents:'none',
        maskImage:'radial-gradient(ellipse at top right, black, transparent 70%)',
        WebkitMaskImage:'radial-gradient(ellipse at top right, black, transparent 70%)'}}/>
      <div style={{position:'absolute', right:'-200px', top:'-200px', width:600, height:600, borderRadius:'50%',
        background:'radial-gradient(circle, rgba(15,138,111,.10), transparent 60%)', pointerEvents:'none'}}/>

      <div className="container wave-hero" style={{position:'relative', padding:'152px 32px 100px'}}>
        <div className="wave-hero-grid" style={{display:'grid', gridTemplateColumns:'1.1fr 1fr', gap:80, alignItems:'center'}}>
          <div>
            <div style={{display:'flex', gap:10, alignItems:'center', flexWrap:'wrap'}}>
              <span className="eyebrow"><span className="dot"></span>Products · SoftTrade-Coldwin</span>
              <span style={{display:'inline-flex', alignItems:'center', gap:6, fontSize:12, fontWeight:600, color:'var(--ink-soft)'}}>
                <Icon name="boxes" size={13} stroke={2}/> Offline · single-site
              </span>
            </div>

            <h1 className="serif" style={{fontSize:'clamp(48px,6vw,84px)', lineHeight:0.96, fontWeight:600, margin:'24px 0 0', letterSpacing:'-0.025em'}}>
              SoftTrade<span style={{color:'var(--orange)'}}>‑</span>Coldwin
              <div style={{fontSize:'0.32em', fontWeight:500, color:'var(--ink-soft)', marginTop:14, fontStyle:'italic', letterSpacing:'-0.01em'}}>
                Cold storage billing &amp; stock register, built for the Indian cold chain.
              </div>
            </h1>

            <p style={{fontSize:18, lineHeight:1.6, color:'var(--ink-soft)', maxWidth:560, marginTop:24}}>
              An offline Windows-based accounting and billing product for Indian cold storage operators and warehouses. Covers <strong style={{color:'var(--ink)'}}>inward / outward, per-bag and per-bilty billing</strong>, GST invoicing and return filing. Part of the same trusted product family as <Link to="/products/softtrade-mandi" style={{color:'var(--orange)', fontWeight:600}}>SoftTrade-Mandi</Link>.
            </p>

            <div style={{display:'flex', gap:12, marginTop:32, flexWrap:'wrap'}}>
              <Link to="/contact" className="btn btn-primary">
                Get a Quote <Icon name="arrow" size={16} stroke={2.2} className="arrow"/>
              </Link>
            </div>

            {/* Trust strip — "1,800+ / Indian businesses" stat dropped per content reconciliation */}
            <div style={{display:'flex', alignItems:'center', gap:24, marginTop:40, paddingTop:24, borderTop:'1px dashed var(--line-2)'}}>
              <div>
                <div className="serif" style={{fontSize:28, fontWeight:600, lineHeight:1}}>Offline</div>
                <div style={{fontSize:11.5, color:'var(--muted)', marginTop:4, letterSpacing:'.06em', textTransform:'uppercase'}}>No internet needed</div>
              </div>
              <div style={{width:1, height:36, background:'var(--line-2)'}}/>
              <div>
                <div className="serif" style={{fontSize:28, fontWeight:600, lineHeight:1}}>Per-site</div>
                <div style={{fontSize:11.5, color:'var(--muted)', marginTop:4, letterSpacing:'.06em', textTransform:'uppercase'}}>One install per facility</div>
              </div>
            </div>
          </div>

          <div style={{display:'flex', justifyContent:'flex-end', alignItems:'center'}}>
            <ChamberMap/>
          </div>
        </div>
      </div>

      {/* Marquee strip */}
      <div style={{background:'var(--ink)', color:'#fff', padding:'18px 0', overflow:'hidden', borderTop:'1px solid rgba(255,255,255,.05)'}}>
        <div style={{display:'flex', alignItems:'center', gap:48, whiteSpace:'nowrap', animation:'coldwin-marquee 40s linear infinite'}}>
          {Array(2).fill(0).map((_,k)=>(
            <Fragment key={k}>
              {[
                ['boxes',   'Inward / Outward register'],
                ['grid',    'Lot-wise (marka) tracking'],
                ['map',     'Chamber / floor / rack allotment'],
                ['receipt', 'Bardana issue & receipt'],
                ['coins',   'Hammali & shedding charges'],
                ['file',    'GSTR-1 · GSTR-3B'],
                ['truck',   'e-Way Bill JSON'],
                ['ledger',  'Outstanding bilty reports'],
              ].map(([ic,t],i)=>(
                <span key={`${k}-${i}`} style={{display:'inline-flex', alignItems:'center', gap:10, fontSize:14, fontWeight:500, color:'rgba(255,255,255,.75)'}}>
                  <Icon name={ic} size={16} stroke={1.8}/>
                  {t}
                  <span style={{color:'var(--orange)', marginLeft:48}}>✦</span>
                </span>
              ))}
            </Fragment>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes coldwin-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}

// ============================================================
// WorkflowDiagram — 6-step inward → outward flow on warm paper.
// Ported verbatim from design/coldwin-content.jsx.
// ============================================================

function WorkflowDiagram() {
  const steps = [
    { ic:'truck',   label:'Inward',      sub:'Party · marka · bags',  tone:'orange' },
    { ic:'map',     label:'Chamber',     sub:'Floor / rack allotted', tone:'paper' },
    { ic:'boxes',   label:'Storage',     sub:'Daily / season slab',   tone:'paper' },
    { ic:'coins',   label:'Hammali',     sub:'Charges captured',      tone:'teal' },
    { ic:'receipt', label:'Outward',     sub:'Challan + gatepass',    tone:'paper' },
    { ic:'file',    label:'GST + e-Way', sub:'JSON · returns',        tone:'ink' },
  ];
  return (
    <section style={{background:'var(--paper)', borderTop:'1px solid var(--line-2)', borderBottom:'1px solid var(--line-2)', padding:'88px 0'}}>
      <div className="container">
        <div style={{textAlign:'center', maxWidth:680, margin:'0 auto 48px'}}>
          <div className="section-kicker">How it flows</div>
          <h2 className="section-title serif">Inward to outward —<br/>every bag, charge and return tracked.</h2>
        </div>
        <div style={{position:'relative', display:'grid', gridTemplateColumns:`repeat(${steps.length}, 1fr)`, gap:0, alignItems:'stretch'}}>
          <div style={{position:'absolute', left:'8%', right:'8%', top:'34px', height:2,
            background:'repeating-linear-gradient(90deg, var(--line-2) 0 8px, transparent 8px 14px)', zIndex:0}}/>
          {steps.map((s,i)=>(
            <div key={i} style={{display:'flex', flexDirection:'column', alignItems:'center', gap:14, position:'relative', zIndex:1}}>
              <div style={{background:'var(--paper)', padding:'0 8px'}}>
                <IconChip name={s.ic} tone={s.tone} size={68}/>
              </div>
              <div style={{textAlign:'center'}}>
                <div style={{fontSize:11, fontWeight:700, letterSpacing:'.14em', color:'var(--muted)'}}>STEP {i+1}</div>
                <div className="serif" style={{fontSize:20, fontWeight:600, marginTop:4, letterSpacing:'-0.01em'}}>{s.label}</div>
                <div style={{fontSize:13, color:'var(--ink-soft)', marginTop:2}}>{s.sub}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{textAlign:'center', marginTop:48, fontSize:14, color:'var(--ink-soft)'}}>
          <span style={{display:'inline-flex', alignItems:'center', gap:8, padding:'8px 16px', borderRadius:999, background:'#fff', border:'1px solid var(--line-2)'}}>
            <Icon name="zap" size={14} stroke={2} style={{color:'var(--orange)'}}/>
            One inward entry posts to chamber map, charges, GST and bilty register — automatically
          </span>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// PlanCard — single pricing card. 4 highlights from products.js,
// all checked. CTA is <Link to="/contact">.
// ============================================================

function PlanCard({ tag, name, blurb, features, highlight, badge, ctaLabel = 'Get a Quote', downloadUrl }) {
  return (
    <div style={{
      position:'relative',
      background: highlight ? 'var(--ink)' : '#fff',
      color: highlight ? '#fff' : 'var(--ink)',
      border: highlight ? '1px solid var(--ink)' : '1px solid var(--line)',
      borderRadius:20,
      padding:'36px 32px',
      display:'flex', flexDirection:'column',
      boxShadow: highlight ? '0 30px 60px -25px rgba(14,27,44,.4)' : '0 1px 0 rgba(14,27,44,.02)',
      overflow:'hidden',
    }}>
      {highlight && (
        <div className="paper-grid" style={{
          position:'absolute', inset:0, opacity:.04, pointerEvents:'none',
          backgroundImage:'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize:'40px 40px',
        }}/>
      )}
      {badge && (
        <span style={{
          position:'absolute', top:20, right:20,
          fontSize:10.5, fontWeight:700, letterSpacing:'.14em',
          padding:'5px 10px', borderRadius:999,
          background:'var(--orange)', color:'#fff',
        }}>{badge}</span>
      )}

      <div style={{position:'relative'}}>
        <div style={{fontSize:11, fontWeight:700, letterSpacing:'.16em', color: highlight ? 'rgba(255,255,255,.5)' : 'var(--muted)'}}>{tag}</div>
        <div className="serif" style={{fontSize:34, fontWeight:600, marginTop:10, letterSpacing:'-0.015em'}}>{name}</div>
        <div style={{fontSize:14, color: highlight ? 'rgba(255,255,255,.65)' : 'var(--ink-soft)', marginTop:6, lineHeight:1.5}}>{blurb}</div>

        <div style={{marginTop:22, paddingBottom:22, borderBottom: highlight ? '1px solid rgba(255,255,255,.10)' : '1px solid var(--line)'}}>
          <div style={{display:'flex', alignItems:'baseline', gap:8}}>
            <span className="serif" style={{fontSize:42, fontWeight:600, lineHeight:1, letterSpacing:'-0.02em'}}>Contact</span>
            <span style={{fontSize:14, color: highlight ? 'rgba(255,255,255,.55)' : 'var(--muted)'}}>for pricing</span>
          </div>
        </div>

        <ul style={{listStyle:'none', padding:0, margin:'24px 0 0', display:'flex', flexDirection:'column', gap:12}}>
          {features.map((t, i)=>(
            <li key={i} style={{display:'flex', alignItems:'flex-start', gap:10, fontSize:14, color: highlight ? '#fff' : 'var(--ink)'}}>
              <span style={{
                width:18, height:18, borderRadius:'50%',
                background: highlight ? 'rgba(255,255,255,.10)' : 'var(--teal-soft)',
                color: highlight ? '#fff' : 'var(--teal)',
                display:'grid', placeItems:'center', flexShrink:0, marginTop:1,
              }}>
                <Icon name="check" size={10} stroke={2.5}/>
              </span>
              <span>{t}</span>
            </li>
          ))}
        </ul>

        <Link to="/contact" className={highlight ? 'btn btn-primary' : 'btn btn-dark'} style={{marginTop:28, width:'100%', justifyContent:'center'}}>
          {ctaLabel} <Icon name="arrow" size={15} stroke={2.2} className="arrow"/>
        </Link>
        {downloadUrl && (
          <a
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              marginTop: 12,
              width: '100%',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              padding: '12px 20px',
              borderRadius: 999,
              fontSize: 14,
              fontWeight: 600,
              background: 'transparent',
              color: highlight ? '#fff' : 'var(--ink)',
              border: highlight ? '1px solid rgba(255,255,255,.25)' : '1px solid var(--line)',
              textDecoration: 'none',
              transition: 'background-color .2s ease, border-color .2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = highlight ? 'rgba(255,255,255,.08)' : 'var(--teal-soft)';
              e.currentTarget.style.borderColor = highlight ? 'rgba(255,255,255,.4)' : 'var(--teal)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = highlight ? 'rgba(255,255,255,.25)' : 'var(--line)';
            }}
          >
            <Icon name="arrow" size={14} stroke={2.2} style={{ transform: 'rotate(90deg)' }}/>
            Download installer
          </a>
        )}
      </div>
    </div>
  );
}

// ============================================================
// Pricing — 2 plan cards on the right; sticky kicker + lede +
// 2 info chips on the left. Section title dropped (the lede
// already conveys the per-site licensing model).
// ============================================================

function Pricing() {
  return (
    <section style={{background:'#fff', padding:'104px 0', borderTop:'1px solid var(--line)', borderBottom:'1px solid var(--line)'}}>
      <div className="container">
        <div className="wave-split" style={{display:'grid', gridTemplateColumns:'1fr 1.3fr', gap:64, alignItems:'flex-start'}}>
          <div style={{position:'sticky', top:100}}>
            <div className="section-kicker">Editions</div>
            <p className="section-lede">
              Coldwin is sold per site (one installation per cold storage facility). Multi-site deployments are available on request.
            </p>

            <div style={{marginTop:32, display:'flex', flexDirection:'column', gap:14}}>
              {[
                ['handshake', 'Free installation',     'Data setup and user training. AMC available separately for updates and priority support.'],
                ['shield',    'Not for enterprise 3PL','We focus on billing, stock register and compliance — not RFID, IoT or temperature telemetry.'],
              ].map(([ic, h, t], i)=>(
                <div key={i} style={{display:'flex', gap:14, alignItems:'flex-start'}}>
                  <IconChip name={ic} tone="paper" size={36}/>
                  <div>
                    <div style={{fontSize:14.5, fontWeight:600}}>{h}</div>
                    <div style={{fontSize:13.5, color:'var(--ink-soft)', marginTop:3, lineHeight:1.55}}>{t}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:20}}>
            <PlanCard
              tag="SINGLE USER"
              name="Single User"
              blurb="One workstation. For small cold storages and single-site warehouses."
              features={[
                'Windows desktop install',
                'Offline — works without internet',
                'GST billing and return filing',
                'Local Jaipur support',
              ]}
              downloadUrl="https://onedrive.live.com/?cid=9962275ceb019306&id=9962275CEB019306%21sfaae245eacdf4cf8b8a8f6d80b5cac8b&resid=9962275CEB019306%21sfaae245eacdf4cf8b8a8f6d80b5cac8b&e=T6SbgP&migratedtospo=true&redeem=aHR0cHM6Ly8xZHJ2Lm1zL3UvYy85OTYyMjc1Y2ViMDE5MzA2L0lRQmVKSzc2MzZ6NFRMaW85dGdMWEt5TEFRUEotTWh5RGVFYy1xR2dZaHgyaldnP2U9VDZTYmdQ&v=validatepermission"
            />
            <PlanCard
              tag="MULTI USER · LAN"
              name="Multi User"
              blurb="Unlimited LAN users at one site, role-based access — for larger cold chain facilities."
              features={[
                'Unlimited LAN users at one location',
                'Shared inward/outward registers',
                'Role-based access control',
                'On-site installation and training',
              ]}
              highlight
              badge="MOST POPULAR"
              downloadUrl="https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL3UvYy85OTYyMjc1Y2ViMDE5MzA2L0lRRGUyR2YxQ1FrM1JhN1I5NE5WbGJuNEFkMWRrS0I4cXZadmlyOUNSQmdIY1hRP2U9YmpPbGtF&cid=9962275CEB019306&id=9962275CEB019306%21sf567d8de09094537aed1f7835595b9f8&parId=9962275CEB019306%21s711b58f7a4bc4bc6a8f0c875159f065c&o=OneUp"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// featureGroups — 13 items in 4 cards. Each item is a verbatim
// regrouping of products.js for Coldwin: 10 from additionalFeatures
// (workflow content) plus 3 from main features (the GST / e-Way
// items). The 3 main-features items NOT mapped to cards are
// positioning content — Offline (in Hero trust strip already),
// "runs on Mandi engine" (cross-reference in hero description),
// and "1,800+ businesses" (dropped per content reconciliation).
// ============================================================

const featureGroups = [
  {
    icon:'boxes', tone:'orange', title:'Inward & Outward',
    sub:'Lot-wise tracking, every bag accounted',
    items:[
      ['Inward entry',      'Party, commodity, variety, bag count and weight'],
      ['Lot-wise (marka)',  'Stock tracking by marka and party'],
      ['Outward delivery',  'Challan and gatepass against each lot'],
      ['Bardana register',  'Gunny-bag issue and receipt'],
    ],
  },
  {
    icon:'map', tone:'teal', title:'Chamber & Allotment',
    sub:'Plan space, see occupancy live',
    items:[
      ['Chamber / floor / rack', 'Location allotment per lot'],
      ['Outstanding bilty',      'Reports and chamber/party-wise stock register'],
      ['Advance against stock',  'And part-payment handling'],
    ],
  },
  {
    icon:'coins', tone:'paper', title:'Charges & Billing',
    sub:'Storage, hammali, shedding — auto-priced',
    items:[
      ['Storage rate master',  'Per bag, quintal or package'],
      ['Season / monthly slabs','Per-bag rate slabs auto-applied'],
      ['Hammali, shedding',    'Loading, unloading and handling charge capture'],
    ],
  },
  {
    icon:'file', tone:'ink', title:'GST & Compliance',
    sub:'Returns, e-Way, e-invoice ready',
    items:[
      ['GST billing',     'With automatic tax calculation'],
      ['GSTR-1, GSTR-3B', 'Generation and return filing support'],
      ['e-Way Bill JSON', 'Export at configurable thresholds'],
    ],
  },
];

// ============================================================
// FeatureCard — single feature group card. Used by Features.
// ============================================================

function FeatureCard({ group, idx }) {
  return (
    <div className="card" style={{padding:28, height:'100%', display:'flex', flexDirection:'column'}}>
      <div style={{display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:16}}>
        <IconChip name={group.icon} tone={group.tone} size={48}/>
        <span style={{fontSize:11, fontWeight:700, letterSpacing:'.14em', color:'var(--muted)'}}>0{idx+1}</span>
      </div>
      <div style={{marginTop:20}}>
        <h3 className="serif" style={{fontSize:24, fontWeight:600, margin:0, letterSpacing:'-0.015em'}}>
          {group.title}
        </h3>
        <div style={{fontSize:13.5, color:'var(--muted)', marginTop:4}}>{group.sub}</div>
      </div>
      <ul style={{listStyle:'none', padding:0, margin:'20px 0 0', display:'flex', flexDirection:'column', gap:12}}>
        {group.items.map((it,i)=>(
          <li key={i} style={{display:'flex', alignItems:'flex-start', gap:10, paddingTop:12, borderTop:'1px solid var(--line)'}}>
            <span style={{
              width:18, height:18, borderRadius:'50%',
              background:'var(--teal-soft)', color:'var(--teal)',
              display:'grid', placeItems:'center', flexShrink:0, marginTop:2,
            }}>
              <Icon name="check" size={11} stroke={2.5}/>
            </span>
            <div>
              <div style={{fontSize:14, fontWeight:600, color:'var(--ink)'}}>{it[0]}</div>
              <div style={{fontSize:13, color:'var(--ink-soft)', marginTop:2, lineHeight:1.5}}>{it[1]}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ============================================================
// Features — 4-card grid. Section title and lede dropped per
// content reconciliation; only "WHAT YOU GET" kicker remains.
// ============================================================

function Features() {
  return (
    <section className="pad-section" style={{background:'var(--bg)'}}>
      <div className="container">
        <div className="section-kicker" style={{marginBottom:48}}>What you get</div>
        <div className="wave-grid-4" style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:20}}>
          {featureGroups.map((g,i) => <FeatureCard key={i} group={g} idx={i}/>)}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FinalCTA — dark single-column centered card with one
// "Book a walkthrough" button. Body text uses products.js wording
// verbatim (the design's wording was different).
// ============================================================

function FinalCTA() {
  return (
    <section className="pad-section">
      <div className="container">
        <div style={{
          position:'relative', overflow:'hidden',
          background:'var(--ink)',
          borderRadius:24,
          padding:'72px 64px',
          textAlign:'center',
        }}>
          {/* decorative orange glow */}
          <div style={{
            position:'absolute', right:-100, top:-100,
            width:400, height:400, borderRadius:'50%',
            background:'radial-gradient(circle, rgba(225,83,11,.25), transparent 60%)',
          }}/>
          {/* paper grid overlay */}
          <div className="paper-grid" style={{
            position:'absolute', inset:0, opacity:.04,
            backgroundImage:'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
            backgroundSize:'48px 48px',
          }}/>

          <div style={{position:'relative'}}>
            <div className="eyebrow" style={{background:'rgba(255,255,255,.08)', borderColor:'rgba(255,255,255,.12)', color:'#fff'}}>
              <span className="dot" style={{background:'var(--orange)'}}></span>
              Free walkthrough
            </div>
            <h2 className="serif" style={{fontSize:52, lineHeight:1.05, fontWeight:600, color:'#fff', margin:'20px 0 16px', letterSpacing:'-0.02em'}}>
              Considering Coldwin for your cold storage?
            </h2>
            <p style={{fontSize:17, color:'rgba(255,255,255,.7)', maxWidth:480, lineHeight:1.6, margin:'0 auto'}}>
              Let us understand your billing model — per-bag, per-season, or contract — and walk you through the software on your own rate card. No hard selling.
            </p>
            <div style={{display:'flex', gap:12, marginTop:32, flexWrap:'wrap', justifyContent:'center'}}>
              <Link to="/contact" className="btn btn-primary">
                Book a walkthrough <Icon name="arrow" size={16} stroke={2.2} className="arrow"/>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// ColdwinPage — page-level composition.
// ============================================================

export default function ColdwinPage() {
  return (
    <div className="design-page">
      <Hero/>
      <WorkflowDiagram/>
      <Pricing/>
      <Features/>
      <FinalCTA/>
    </div>
  );
}
