// src/components/softtrade/BrokwinPage.jsx
//
// SoftTrade-Brokwin product page — Wave 3 redesign.
//
// Composed sections:
//   - Hero (with SaudaVisual + dark marquee)
//   - WorkflowDiagram (6-step sauda flow)
//   - Pricing (2 plan cards + sticky kicker/lede/2 info chips)
//   - Features (4-card grid, content aligned with products.js)
//   - FinalCTA (single-column centered dark card)
//
// Design tokens and utility classes (.serif, .paper-grid, .container,
// .btn, .btn-primary, .eyebrow, .dot, .mono) are scoped under
// .design-page in src/index.css.
//
// Edits from the design (per content reconciliation 2026-04-26):
//   - Hero: kept "Pure brokers · no own stock" secondary descriptor
//   - Hero: dropped "Watch 90-sec demo" and "Brochure (PDF)" buttons
//   - Hero: top inline padding 80→152px (fixed RouterNav clearance)
//   - Hero: marquee always renders; keyframe renamed brokwin-marquee
//   - Pricing: dropped title "Two editions — same engine, different reach"
//   - Pricing: dropped "No commission salesmen" info chip (3 → 2)
//   - Pricing: dropped "Quote in under 2 hours" sub-line in cards
//   - Pricing: 8-item check/lock comparison dropped — 4 highlights per
//     card sourced from products.js, all checked
//   - Pricing: plan names "Single User" / "Multi User"
//     (was "Brokwin Solo" / "Brokwin Plus")
//   - Pricing: inline Mandi link rewired as <Link to="/products/softtrade-mandi">
//   - Features: dropped section title "Built for brokers — not retro-fitted
//     from accounting" and lede paragraph; "WHAT YOU GET" kicker kept
//   - Features: 4-card content aligned with products.js features (12 items
//     total). Removed design's "Outstanding tracking", "Pete Ugahi" and
//     "Direct SMS / Email"; added "Payment Register" (Card 3) and
//     "GSTR-1 / 2 / 3B" (Card 4) from products.js.
//   - FinalCTA: right-side "WHAT TO EXPECT" card dropped; single-column centered
//   - FinalCTA: secondary phone button dropped; only "Book a demo" remains
//   - All CTAs ("Get a Quote", "Book a demo", plan card CTAs) wired as
//     <Link to="/contact">
//   - <React.Fragment> → <Fragment> (ES module import)
//   - CrossLink section dropped entirely

import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Icon, IconChip } from '../design/Icon';

// ============================================================
// SaudaVisual — decorative sauda contract visual on the right of
// the Hero. Shows a fake contract (header / parties / goods /
// brokerage / footer chips), a back BROKERAGE MATRIX card, and a
// floating commission summary card. All inline-styled HTML/CSS —
// no real data. Ported verbatim from design/brokwin-hero.jsx.
// ============================================================

function SaudaVisual() {
  return (
    <div style={{position:'relative', width:'100%', aspectRatio:'1.05/1', maxWidth:560}}>
      {/* Back card — Brokerage rate matrix */}
      <div style={{
        position:'absolute', left:'-6%', top:'10%',
        width:'62%', aspectRatio:'1.55/1',
        background:'#fff', borderRadius:14, border:'1px solid var(--line)',
        boxShadow:'0 24px 40px -28px rgba(14,27,44,.20)',
        transform:'rotate(-4deg)', padding:14, zIndex:1,
      }}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div style={{fontSize:10, fontWeight:700, letterSpacing:'.16em', color:'var(--muted)'}}>BROKERAGE MATRIX</div>
          <div style={{fontSize:10, fontWeight:700, color:'var(--teal)', background:'var(--teal-soft)', padding:'3px 8px', borderRadius:999}}>AUTO</div>
        </div>
        <div style={{marginTop:10, display:'grid', gridTemplateColumns:'1fr auto auto auto', fontSize:9.5, gap:'4px 8px'}}>
          <span style={{fontWeight:700, color:'var(--muted)', fontSize:9}}>ITEM</span>
          <span style={{fontWeight:700, color:'var(--muted)', fontSize:9, textAlign:'right'}}>JPR</span>
          <span style={{fontWeight:700, color:'var(--muted)', fontSize:9, textAlign:'right'}}>KOTA</span>
          <span style={{fontWeight:700, color:'var(--muted)', fontSize:9, textAlign:'right'}}>UDR</span>
          {[
            ['Wheat',  '1.50%','1.75%','2.00%'],
            ['Mustard','2.00%','2.25%','2.50%'],
            ['Bajra',  '1.25%','1.50%','1.75%'],
            ['Gram',   '1.75%','2.00%','2.25%'],
          ].map((r,i)=>(
            <Fragment key={i}>
              <span style={{color:'var(--ink)', borderTop:'1px solid var(--paper-grid)', paddingTop:3}}>{r[0]}</span>
              <span className="mono" style={{textAlign:'right', borderTop:'1px solid var(--paper-grid)', paddingTop:3, color: i===1?'var(--orange)':'var(--ink)'}}>{r[1]}</span>
              <span className="mono" style={{textAlign:'right', borderTop:'1px solid var(--paper-grid)', paddingTop:3}}>{r[2]}</span>
              <span className="mono" style={{textAlign:'right', borderTop:'1px solid var(--paper-grid)', paddingTop:3}}>{r[3]}</span>
            </Fragment>
          ))}
        </div>
      </div>

      {/* Main: Sauda contract */}
      <div style={{position:'absolute', right:0, top:0, width:'92%', aspectRatio:'1.15/1', zIndex:2}}>
        <div style={{
          position:'absolute', inset:0,
          background:'linear-gradient(180deg,#FFFEF9 0%,#F5EDD8 100%)',
          borderRadius:14, boxShadow:'0 30px 60px -25px rgba(14,27,44,.28)',
          border:'1px solid var(--line-2)', overflow:'hidden', padding:'20px 22px',
        }}>
          {/* Header */}
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', borderBottom:'2px solid var(--ink)', paddingBottom:10}}>
            <div>
              <div style={{fontFamily:"'Fraunces',serif", fontSize:18, fontWeight:600}}>सौदा / Sauda</div>
              <div style={{fontSize:10, color:'var(--muted)', marginTop:2}}>Contract Note · Brokwin Reg.</div>
            </div>
            <div style={{textAlign:'right'}}>
              <div className="mono" style={{fontSize:11, fontWeight:600, color:'var(--orange)'}}>SD-2026-04812</div>
              <div style={{fontSize:9.5, color:'var(--muted)', marginTop:2}}>25 Apr 2026</div>
            </div>
          </div>

          {/* Parties */}
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginTop:12}}>
            {[
              ['SELLER · विक्रेता','Ramlal Aaita','Krishi Mandi, Jaipur'],
              ['BUYER · क्रेता','Mohan Flour Mill','Industrial Area, Kota'],
            ].map((c,i)=>(
              <div key={i} style={{background:'#fff', border:'1px solid var(--line-2)', borderRadius:8, padding:'8px 10px'}}>
                <div style={{fontSize:8.5, fontWeight:700, letterSpacing:'.12em', color:'var(--muted)'}}>{c[0]}</div>
                <div style={{fontSize:11.5, fontWeight:600, marginTop:3, color:'var(--ink)'}}>{c[1]}</div>
                <div style={{fontSize:9.5, color:'var(--ink-soft)', marginTop:1}}>{c[2]}</div>
              </div>
            ))}
          </div>

          {/* Goods */}
          <div style={{marginTop:10, background:'var(--paper)', border:'1px solid var(--line-2)', borderRadius:8, padding:'10px 12px'}}>
            <div style={{display:'grid', gridTemplateColumns:'1.2fr 1fr 1fr 1fr', gap:6, alignItems:'baseline'}}>
              <div>
                <div style={{fontSize:8.5, fontWeight:700, letterSpacing:'.1em', color:'var(--muted)'}}>ITEM</div>
                <div style={{fontSize:11.5, fontWeight:600, marginTop:2}}>Wheat (Lokwan)</div>
              </div>
              <div>
                <div style={{fontSize:8.5, fontWeight:700, letterSpacing:'.1em', color:'var(--muted)'}}>QTY</div>
                <div className="mono" style={{fontSize:11.5, fontWeight:600, marginTop:2}}>500 qtl</div>
              </div>
              <div>
                <div style={{fontSize:8.5, fontWeight:700, letterSpacing:'.1em', color:'var(--muted)'}}>RATE</div>
                <div className="mono" style={{fontSize:11.5, fontWeight:600, marginTop:2}}>₹2,840</div>
              </div>
              <div>
                <div style={{fontSize:8.5, fontWeight:700, letterSpacing:'.1em', color:'var(--muted)'}}>VALUE</div>
                <div className="mono" style={{fontSize:11.5, fontWeight:700, marginTop:2, color:'var(--ink)'}}>₹14,20,000</div>
              </div>
            </div>
          </div>

          {/* Brokerage auto-calc */}
          <div style={{marginTop:10, display:'flex', justifyContent:'space-between', alignItems:'center',
            padding:'8px 12px', background:'var(--ink)', color:'#fff', borderRadius:8}}>
            <div>
              <div style={{fontSize:9, fontWeight:700, letterSpacing:'.12em', color:'rgba(255,255,255,.55)'}}>BROKERAGE · 1.75%</div>
              <div style={{fontSize:9, color:'rgba(255,255,255,.7)', marginTop:1}}>Auto-applied · station rate matrix</div>
            </div>
            <div className="mono" style={{fontSize:14, fontWeight:700}}>₹24,850</div>
          </div>

          {/* Footer chips */}
          <div style={{position:'absolute', left:22, right:22, bottom:14, display:'flex', gap:6, flexWrap:'wrap'}}>
            {['Confirmation Letter','Covering Letter','Brokerage Bill','Dalal Ledger'].map((c,i)=>(
              <span key={i} style={{
                fontSize:9, fontWeight:600, padding:'3px 8px', borderRadius:999,
                background: i===0?'var(--teal-soft)':'#fff',
                color: i===0?'var(--teal)':'var(--ink-soft)',
                border: i===0?'1px solid var(--teal)':'1px solid var(--line-2)',
              }}>
                {i===0 && '✓ '}{c}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Floating commission card */}
      <div style={{
        position:'absolute', right:'-2%', bottom:'2%', width:'46%',
        background:'#fff', border:'1px solid var(--line)',
        borderRadius:14, padding:'14px 16px',
        boxShadow:'0 24px 40px -20px rgba(14,27,44,.30)', zIndex:3,
      }}>
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <div style={{
            width:32, height:32, borderRadius:8,
            background:'var(--orange-soft)', color:'var(--orange)',
            display:'grid', placeItems:'center',
          }}>
            <Icon name="coins" size={16} stroke={2}/>
          </div>
          <div style={{fontSize:10, fontWeight:700, letterSpacing:'.12em', color:'var(--muted)'}}>THIS MONTH</div>
        </div>
        <div style={{fontSize:11, color:'var(--muted)', marginTop:10, fontWeight:500}}>
          Brokerage earned
        </div>
        <div className="serif" style={{fontSize:24, fontWeight:600, marginTop:2, letterSpacing:'-0.015em'}}>
          ₹3,84,250
        </div>
        <div style={{marginTop:8, display:'flex', alignItems:'center', gap:6, fontSize:10.5, color:'var(--ink-soft)'}}>
          <span style={{color:'var(--teal)', fontWeight:600}}>↑ 18%</span>
          <span>vs March</span>
          <span style={{color:'var(--muted)'}}>·</span>
          <span>142 saudas</span>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Hero
// ============================================================

function Hero() {
  return (
    <section style={{position:'relative', overflow:'hidden',
      background:'linear-gradient(180deg,#F1EADB 0%,#FBF8F1 100%)',
      borderBottom:'1px solid var(--line)'}}>
      <div className="paper-grid" style={{position:'absolute', inset:0, opacity:.45, pointerEvents:'none',
        maskImage:'radial-gradient(ellipse at top right, black, transparent 70%)',
        WebkitMaskImage:'radial-gradient(ellipse at top right, black, transparent 70%)'}}/>
      <div style={{position:'absolute', right:'-200px', top:'-200px', width:600, height:600, borderRadius:'50%',
        background:'radial-gradient(circle, rgba(225,83,11,.10), transparent 60%)', pointerEvents:'none'}}/>

      <div className="container wave-hero" style={{position:'relative', padding:'152px 32px 100px'}}>
        <div className="wave-hero-grid" style={{display:'grid', gridTemplateColumns:'1.1fr 1fr', gap:80, alignItems:'center'}}>
          <div>
            <div style={{display:'flex', gap:10, alignItems:'center', flexWrap:'wrap'}}>
              <span className="eyebrow"><span className="dot"></span>Products · SoftTrade-Brokwin</span>
              <span style={{display:'inline-flex', alignItems:'center', gap:6, fontSize:12, fontWeight:600, color:'var(--ink-soft)'}}>
                <Icon name="handshake" size={13} stroke={2}/> Pure brokers · no own stock
              </span>
            </div>

            <h1 className="serif" style={{fontSize:'clamp(48px,6vw,84px)', lineHeight:0.96, fontWeight:600, margin:'24px 0 0', letterSpacing:'-0.025em'}}>
              SoftTrade<span style={{color:'var(--orange)'}}>‑</span>Brokwin
              <div style={{fontSize:'0.32em', fontWeight:500, color:'var(--ink-soft)', marginTop:14, fontStyle:'italic', letterSpacing:'-0.01em'}}>
                Broker-only Mahajani accounting, built around the sauda.
              </div>
            </h1>

            <p style={{fontSize:18, lineHeight:1.6, color:'var(--ink-soft)', maxWidth:560, marginTop:24}}>
              A purpose-built product for pure <strong style={{color:'var(--ink)'}}>commission agents</strong> — grain, kirana, cattle-feed, oil-cake, bilty-cut and textile brokers who never take ownership of goods. The primary document is the <strong style={{color:'var(--ink)'}}>sauda (contract)</strong>, with confirmation slips, covering letters, brokerage bills and dual-party Mahajani ledgers all flowing from it.
            </p>

            <div style={{display:'flex', gap:12, marginTop:32, flexWrap:'wrap'}}>
              <Link to="/contact" className="btn btn-primary">
                Get a Quote <Icon name="arrow" size={16} stroke={2.2} className="arrow"/>
              </Link>
            </div>

            <div style={{display:'flex', alignItems:'center', gap:24, marginTop:40, paddingTop:24, borderTop:'1px dashed var(--line-2)'}}>
              <div>
                <div className="serif" style={{fontSize:28, fontWeight:600, lineHeight:1}}>Sauda</div>
                <div style={{fontSize:11.5, color:'var(--muted)', marginTop:4, letterSpacing:'.06em', textTransform:'uppercase'}}>Built around</div>
              </div>
              <div style={{width:1, height:36, background:'var(--line-2)'}}/>
              <div>
                <div className="serif" style={{fontSize:28, fontWeight:600, lineHeight:1}}>Hindi-first</div>
                <div style={{fontSize:11.5, color:'var(--muted)', marginTop:4, letterSpacing:'.06em', textTransform:'uppercase'}}>Trade vocabulary</div>
              </div>
              <div style={{width:1, height:36, background:'var(--line-2)'}}/>
              <div>
                <div className="serif" style={{fontSize:28, fontWeight:600, lineHeight:1}}>Free trial</div>
                <div style={{fontSize:11.5, color:'var(--muted)', marginTop:4, letterSpacing:'.06em', textTransform:'uppercase'}}>Use first, buy after</div>
              </div>
            </div>
          </div>

          <div style={{display:'flex', justifyContent:'flex-end', alignItems:'center'}}>
            <SaudaVisual/>
          </div>
        </div>
      </div>

      {/* Marquee strip */}
      <div style={{background:'var(--ink)', color:'#fff', padding:'18px 0', overflow:'hidden', borderTop:'1px solid rgba(255,255,255,.05)'}}>
        <div style={{display:'flex', alignItems:'center', gap:48, whiteSpace:'nowrap', animation:'brokwin-marquee 40s linear infinite'}}>
          {Array(2).fill(0).map((_,k)=>(
            <Fragment key={k}>
              {[
                ['file',    'Sauda · Contract Note'],
                ['mail',    'Confirmation Letter'],
                ['receipt', 'Covering Letter'],
                ['coins',   'Brokerage Bill'],
                ['ledger',  'Dalal Khata · dual-party'],
                ['grid',    'Item × Party × Station matrix'],
                ['truck',   'e-Way Bill JSON · ₹50K+'],
                ['file',    'GST · e-invoice ready'],
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
        @keyframes brokwin-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}

// ============================================================
// WorkflowDiagram — 6-step sauda flow on warm paper.
// Ported verbatim from design/brokwin-content.jsx.
// ============================================================

function WorkflowDiagram() {
  const steps = [
    { ic:'file',    label:'Sauda',           sub:'Contract entered',      tone:'orange' },
    { ic:'mail',    label:'Confirmation',    sub:'To both parties',       tone:'paper' },
    { ic:'receipt', label:'Covering Letter', sub:'Despatch / intimation', tone:'paper' },
    { ic:'coins',   label:'Brokerage Bill',  sub:'Auto from matrix',      tone:'teal' },
    { ic:'ledger',  label:'Dalal Khata',     sub:'Dual-party posting',    tone:'paper' },
    { ic:'truck',   label:'e-Way + GST',     sub:'JSON · returns',        tone:'ink' },
  ];
  return (
    <section style={{background:'var(--paper)', borderTop:'1px solid var(--line-2)', borderBottom:'1px solid var(--line-2)', padding:'88px 0'}}>
      <div className="container">
        <div style={{textAlign:'center', maxWidth:680, margin:'0 auto 48px'}}>
          <div className="section-kicker">How it flows</div>
          <h2 className="section-title serif">One sauda in.<br/>Every document, ledger and return out.</h2>
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
            Sauda → confirmation → bill → ledgers → e-Way Bill, with no re-typing
          </span>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// PlanCard — single pricing card. Each card shows its own plan's
// 4 highlights from products.js, all checked. CTA is <Link to="/contact">.
// ============================================================

function PlanCard({ tag, name, blurb, features, highlight, badge, ctaLabel = 'Get a Quote' }) {
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
      </div>
    </div>
  );
}

// ============================================================
// Pricing — 2 plan cards on the right; sticky kicker + lede +
// 2 info chips on the left. The lede inline-links to the
// SoftTrade-Mandi page via <Link>.
// ============================================================

function Pricing() {
  return (
    <section style={{background:'#fff', padding:'104px 0', borderTop:'1px solid var(--line)', borderBottom:'1px solid var(--line)'}}>
      <div className="container">
        <div className="wave-split" style={{display:'grid', gridTemplateColumns:'1fr 1.3fr', gap:64, alignItems:'flex-start'}}>
          <div style={{position:'sticky', top:100}}>
            <div className="section-kicker">Editions</div>
            <p className="section-lede">
              Brokwin is for pure brokers only. If you also trade on own account or hold stock,
              <Link to="/products/softtrade-mandi" style={{color:'var(--orange)', fontWeight:600}}> SoftTrade-Mandi</Link> is the right product — same accounting engine, different transaction primitives.
            </p>

            <div style={{marginTop:32, display:'flex', flexDirection:'column', gap:14}}>
              {[
                ['handshake', 'Free installation', 'Data setup and user training. AMC available separately for updates and priority support.'],
                ['shield',    'Free trial first',  'Per SoftTrade\'s motto — "First use our software, buy after". No risk to try.'],
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
              blurb="One workstation. For independent commission agents and small brokerage firms."
              features={[
                'Windows desktop install',
                'Complete sauda-to-settlement workflow',
                'GST-ready with e-Way Bill JSON',
                'Local Jaipur support',
              ]}
            />
            <PlanCard
              tag="MULTI USER · LAN"
              name="Multi User"
              blurb="Unlimited LAN users at one location, station-wise access — for growing brokerage houses."
              features={[
                'Unlimited LAN users at one location',
                'Shared sauda book and dalal ledger',
                'Station and party-wise access control',
                'On-site installation and training',
              ]}
              highlight
              badge="MOST POPULAR"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// featureGroups — 12 features (matches products.js features
// count exactly), regrouped into 4 thematic categories per the
// design's editorial choice. Each item is a [title, blurb] pair
// derived from products.js features for Brokwin.
// ============================================================

const featureGroups = [
  {
    icon:'file', tone:'orange', title:'Sauda & Contracts',
    sub:'The contract is the source of truth',
    items:[
      ['Contract Book',      'Sauda register with Contract Slip printing'],
      ['Sauda Confirmation', 'Letters to both buying and selling parties'],
      ['Covering Letter',    'Formal despatch / intimation for every contract'],
      ['Hindi-first UI',     'Standard trade vocabulary — sauda, bilty, arhat'],
    ],
  },
  {
    icon:'coins', tone:'teal', title:'Brokerage Engine',
    sub:'Rate matrix that does the math',
    items:[
      ['Brokerage Bill',         'To paying party with Brokerage Receipt voucher'],
      ['Item / Party / Station', 'Wise brokerage rate matrix applied automatically'],
      ['Free trial',             'SoftTrade motto — "First use our software, buy after"'],
    ],
  },
  {
    icon:'ledger', tone:'paper', title:'Dual-party Ledgers',
    sub:'Mahajani posting on both sides',
    items:[
      ['Dalal Ledger',     'Dual-party Mahajani posting on each sauda'],
      ['Payment Register', 'Tracking money flow between buyer and seller'],
    ],
  },
  {
    icon:'shield', tone:'ink', title:'GST, e-Way & Compliance',
    sub:'Modern returns on top of Mahajani',
    items:[
      ['GSTR-1 / 2 / 3B',   'Generation with RCM handling'],
      ['e-Way Bill JSON',   'Default ₹50,000 threshold, configurable'],
      ['e-invoice support', 'As per vendor marketing — current rule parity'],
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
// "Book a demo" button. Right-side "WHAT TO EXPECT" panel and
// secondary phone button dropped per content reconciliation.
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
          {/* paper grid overlay (subtle, light-on-dark) */}
          <div className="paper-grid" style={{
            position:'absolute', inset:0, opacity:.04,
            backgroundImage:'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
            backgroundSize:'48px 48px',
          }}/>

          <div style={{position:'relative'}}>
            <div className="eyebrow" style={{background:'rgba(255,255,255,.08)', borderColor:'rgba(255,255,255,.12)', color:'#fff'}}>
              <span className="dot" style={{background:'var(--orange)'}}></span>
              Free trial · no commitment
            </div>
            <h2 className="serif" style={{fontSize:52, lineHeight:1.05, fontWeight:600, color:'#fff', margin:'20px 0 16px', letterSpacing:'-0.02em'}}>
              Want to see Brokwin running on your data?
            </h2>
            <p style={{fontSize:17, color:'rgba(255,255,255,.7)', maxWidth:480, lineHeight:1.6, margin:'0 auto'}}>
              We'll set up a demo with your own sauda scenarios, party and station masters, and brokerage rates — so you can judge fit before you commit.
            </p>
            <div style={{display:'flex', gap:12, marginTop:32, flexWrap:'wrap', justifyContent:'center'}}>
              <Link to="/contact" className="btn btn-primary">
                Book a demo <Icon name="arrow" size={16} stroke={2.2} className="arrow"/>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// BrokwinPage — page-level composition.
// ============================================================

export default function BrokwinPage() {
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
