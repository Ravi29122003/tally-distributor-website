// src/components/softtrade/MandiPage.jsx
//
// SoftTrade-Mandi product page — Wave 3 redesign.
//
// Status of this file:
//   ✓ Hero (Prompt 1)
//   ✓ WorkflowDiagram (Prompt 2)
//   ✓ Pricing (Prompt 2)
//   ✓ Features (this prompt — Prompt 3)
//   ✓ FinalCTA (this prompt — Prompt 3)
//
// Design tokens and utility classes (.serif, .paper-grid, .container,
// .btn, .btn-primary, .eyebrow, .dot, .mono) are scoped under
// .design-page in src/index.css. Inline styles and class references
// in this file only resolve correctly inside the
// <div className="design-page"> wrapper at the bottom.

import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Icon, IconChip } from '../design/Icon';

// ============================================================
// HeroLedger — decorative open-ledger book visual on the right
// of the Hero. Shows a fake Chittha (left page) and Talpat
// (right page) with a back GST chip card and a floating e-Way
// Bill chip. All inline-styled HTML/CSS — no real data.
// Ported verbatim from design/hero.jsx.
// ============================================================

function HeroLedger() {
  return (
    <div style={{
      position:'relative',
      width:'100%',
      aspectRatio:'1.05 / 1',
      maxWidth: 560,
    }}>
      {/* back chip card — GSTR-1 ready */}
      <div style={{
        position:'absolute', left:'-6%', top:'12%',
        width:'62%', aspectRatio:'1.6/1',
        background:'#fff', borderRadius:14, border:'1px solid var(--line)',
        boxShadow:'0 24px 40px -28px rgba(14,27,44,.20)',
        transform:'rotate(-4deg)',
        padding:14,
        zIndex:1,
      }}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div style={{fontSize:10, fontWeight:700, letterSpacing:'.16em', color:'var(--muted)'}}>GST RETURN · GSTR-1</div>
          <div style={{
            fontSize:10, fontWeight:700, color:'var(--teal)',
            background:'var(--teal-soft)', padding:'3px 8px', borderRadius:999,
          }}>READY</div>
        </div>
        <div style={{fontFamily:"'Fraunces',serif", fontSize:24, fontWeight:600, marginTop:8, color:'var(--ink)'}}>
          ₹4,82,610
        </div>
        <div style={{fontSize:11, color:'var(--muted)', marginTop:2}}>
          Output tax · 142 invoices
        </div>
        <div style={{display:'flex', alignItems:'flex-end', gap:4, marginTop:14, height:36}}>
          {[40, 65, 30, 88, 55, 72, 92].map((h,i)=>(
            <div key={i} style={{
              flex:1, height:`${h}%`, borderRadius:3,
              background: i===6 ? 'var(--orange)' : 'var(--paper-2)',
            }}/>
          ))}
        </div>
      </div>

      {/* the open book */}
      <div style={{
        position:'absolute', right:0, top:0,
        width:'92%', aspectRatio:'1.15/1',
        zIndex:2,
      }}>
        <div style={{
          position:'absolute', inset:0,
          background:'linear-gradient(180deg, #FFFEF9 0%, #F5EDD8 100%)',
          borderRadius:14,
          boxShadow:'0 30px 60px -25px rgba(14,27,44,.28), 0 1px 0 rgba(255,255,255,.6) inset',
          border:'1px solid var(--line-2)',
          overflow:'hidden',
          display:'grid', gridTemplateColumns:'1fr 1fr',
        }}>
          {/* Left page — Chittha */}
          <div style={{padding:'18px 16px 14px', borderRight:'1px dashed var(--line-2)', position:'relative'}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
              <div style={{fontFamily:"'Fraunces',serif", fontSize:14, fontWeight:600, color:'var(--ink)'}}>चिट्ठा</div>
              <div style={{fontSize:9, fontWeight:700, letterSpacing:'.14em', color:'var(--orange)'}}>CHITTHA</div>
            </div>
            <div style={{fontSize:9, color:'var(--muted)', marginTop:2}}>
              25 Apr 2026 · Daily Register
            </div>

            <div style={{marginTop:14, display:'flex', flexDirection:'column', gap:7}}>
              {[
                ['Ramlal Aaita', '4,200', 'IN'],
                ['Mohan Mills', '12,800', 'IN'],
                ['Shyam Trader', '6,500', 'OUT'],
                ['Bansilal Dalal', '8,900', 'IN'],
                ['Krishi Bhawan', '15,200', 'OUT'],
              ].map((r,i)=>(
                <div key={i} style={{
                  display:'grid', gridTemplateColumns:'1fr auto auto',
                  alignItems:'center', gap:6,
                  paddingBottom:5, borderBottom: i<4 ? '1px solid var(--paper-grid)' : 'none',
                }}>
                  <span style={{fontSize:10.5, color:'var(--ink-2)'}}>{r[0]}</span>
                  <span className="mono" style={{fontSize:10, color:'var(--ink)', fontWeight:500}}>₹{r[1]}</span>
                  <span style={{
                    fontSize:8, fontWeight:700, padding:'2px 5px', borderRadius:4,
                    background: r[2]==='IN'?'var(--teal-soft)':'var(--orange-soft)',
                    color: r[2]==='IN'?'var(--teal)':'var(--orange)',
                  }}>{r[2]}</span>
                </div>
              ))}
            </div>
            <div style={{
              position:'absolute', left:16, right:16, bottom:14,
              paddingTop:8, borderTop:'2px solid var(--ink)',
              display:'flex', justifyContent:'space-between', alignItems:'center',
            }}>
              <span style={{fontSize:9.5, fontWeight:700, letterSpacing:'.14em', color:'var(--ink)'}}>TOTAL</span>
              <span className="mono" style={{fontSize:13, fontWeight:700, color:'var(--ink)'}}>₹47,600</span>
            </div>
          </div>

          {/* Right page — Talpat */}
          <div style={{padding:'18px 16px 14px', position:'relative'}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
              <div style={{fontFamily:"'Fraunces',serif", fontSize:14, fontWeight:600}}>तलपट</div>
              <div style={{fontSize:9, fontWeight:700, letterSpacing:'.14em', color:'var(--orange)'}}>TALPAT</div>
            </div>
            <div style={{fontSize:9, color:'var(--muted)', marginTop:2}}>
              T-format summary
            </div>

            <div style={{
              marginTop:14,
              border:'1px solid var(--line-2)',
              borderRadius:8,
              overflow:'hidden',
              background:'#fff',
            }}>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', borderBottom:'1px solid var(--line-2)'}}>
                <div style={{padding:'6px 8px', fontSize:9, fontWeight:700, letterSpacing:'.1em', borderRight:'1px solid var(--line-2)', color:'var(--ink-soft)'}}>DR</div>
                <div style={{padding:'6px 8px', fontSize:9, fontWeight:700, letterSpacing:'.1em', color:'var(--ink-soft)'}}>CR</div>
              </div>
              {[
                ['Cash', '24,500', 'Sales', '32,100'],
                ['Bank', '15,200', 'GST 18%', '5,778'],
                ['Stock', '8,900', 'Comm.', '2,450'],
                ['Aaita', '6,200', 'Aaita', '14,472'],
              ].map((r,i)=>(
                <div key={i} style={{
                  display:'grid', gridTemplateColumns:'1fr 1fr',
                  borderBottom: i<3 ? '1px solid var(--paper-grid)' : 'none',
                }}>
                  <div style={{padding:'5px 8px', borderRight:'1px solid var(--line-2)', display:'flex', justifyContent:'space-between'}}>
                    <span style={{fontSize:9.5}}>{r[0]}</span>
                    <span className="mono" style={{fontSize:9, color:'var(--ink)'}}>{r[1]}</span>
                  </div>
                  <div style={{padding:'5px 8px', display:'flex', justifyContent:'space-between'}}>
                    <span style={{fontSize:9.5}}>{r[2]}</span>
                    <span className="mono" style={{fontSize:9, color:'var(--ink)'}}>{r[3]}</span>
                  </div>
                </div>
              ))}
            </div>
            <div style={{
              marginTop:8,
              display:'flex', justifyContent:'space-between', alignItems:'center',
              padding:'6px 8px',
              background:'var(--ink)', color:'#fff', borderRadius:6,
            }}>
              <span style={{fontSize:9, fontWeight:700, letterSpacing:'.12em'}}>BALANCED ✓</span>
              <span className="mono" style={{fontSize:11, fontWeight:600}}>₹54,800</span>
            </div>
            <div style={{
              position:'absolute', left:16, right:16, bottom:14,
              fontSize:9, color:'var(--muted)', display:'flex', justifyContent:'space-between',
            }}>
              <span>Auto-posted from Chittha</span>
              <span style={{color:'var(--teal)', display:'inline-flex', alignItems:'center', gap:3}}>
                <Icon name="sync" size={9} stroke={2.2}/> live
              </span>
            </div>
          </div>

          {/* spine shadow */}
          <div style={{
            position:'absolute', left:'50%', top:0, bottom:0, width:24,
            transform:'translateX(-50%)', pointerEvents:'none',
            background:'linear-gradient(90deg, transparent 0%, rgba(14,27,44,.10) 50%, transparent 100%)',
          }}/>
        </div>
      </div>

      {/* Floating "e-Way Bill" chip */}
      <div style={{
        position:'absolute', right:'-2%', bottom:'2%',
        width:'46%',
        background:'var(--ink)', color:'#fff',
        borderRadius:14, padding:'14px 16px',
        boxShadow:'0 24px 40px -20px rgba(14,27,44,.5)',
        zIndex:3,
      }}>
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <div style={{
            width:32, height:32, borderRadius:8,
            background:'rgba(255,255,255,.10)',
            display:'grid', placeItems:'center', color:'#fff',
          }}>
            <Icon name="truck" size={16} stroke={2}/>
          </div>
          <div style={{
            fontSize:10, fontWeight:700, letterSpacing:'.12em',
            color:'var(--teal)', background:'rgba(15,138,111,.15)',
            padding:'3px 8px', borderRadius:999,
          }}>GENERATED</div>
        </div>
        <div style={{fontSize:11, color:'rgba(255,255,255,.6)', marginTop:10, fontWeight:500}}>
          e-Way Bill JSON
        </div>
        <div className="mono" style={{fontSize:13, fontWeight:600, marginTop:2, color:'#fff'}}>
          EWB-3812-9047-1426
        </div>
        <div style={{
          marginTop:10, display:'flex', alignItems:'center', gap:6,
          fontSize:10.5, color:'rgba(255,255,255,.55)',
        }}>
          <span>Jaipur → Kota</span>
          <span style={{color:'rgba(255,255,255,.3)'}}>·</span>
          <span>120km · 45kg gunny</span>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Hero — top section: title, italic subtitle, lede paragraph,
// single CTA, trust strip, decorative HeroLedger on the right,
// and a dark scrolling marquee strip of features below.
//
// Edits from the design (per content reconciliation):
//   - "North India · 600+ traders" badge — removed (Bucket 1)
//   - "Watch 90-sec demo" + "Brochure (PDF)" buttons — removed (Bucket 2)
//   - "₹50Cr+ · Daily turnover" stat + adjacent divider — removed (Bucket 1)
//   - "Get a Quote" rendered as <Link to="/contact"> (was <button>)
//   - Top inline padding 80px → 152px to clear the 72px fixed RouterNav
//   - showMarquee prop dropped — marquee always renders
//   - Keyframe renamed marquee → mandi-marquee (avoid global collision)
//   - <React.Fragment> → <Fragment> (ES module import)
// ============================================================

function Hero() {
  return (
    <section style={{
      position:'relative', overflow:'hidden',
      background:'linear-gradient(180deg, #F1EADB 0%, #FBF8F1 100%)',
      borderBottom:'1px solid var(--line)',
    }}>
      {/* paper grid texture */}
      <div className="paper-grid" style={{
        position:'absolute', inset:0, opacity:.45, pointerEvents:'none',
        maskImage:'radial-gradient(ellipse at top right, black, transparent 70%)',
        WebkitMaskImage:'radial-gradient(ellipse at top right, black, transparent 70%)',
      }}/>
      {/* warm glow */}
      <div style={{
        position:'absolute', right:'-200px', top:'-200px',
        width:600, height:600, borderRadius:'50%',
        background:'radial-gradient(circle, rgba(225,83,11,.10), transparent 60%)',
        pointerEvents:'none',
      }}/>

      <div className="container" style={{position:'relative', padding:'152px 32px 100px'}}>
        <div style={{display:'grid', gridTemplateColumns:'1.1fr 1fr', gap:80, alignItems:'center'}}>
          {/* LEFT */}
          <div>
            {/* eyebrow */}
            <div style={{display:'flex', gap:10, alignItems:'center', flexWrap:'wrap'}}>
              <span className="eyebrow">
                <span className="dot"></span>
                Products · SoftTrade-Mandi
              </span>
            </div>

            <h1 className="serif" style={{
              fontSize:'clamp(48px, 6vw, 84px)',
              lineHeight:0.96, fontWeight:600,
              margin:'24px 0 0',
              letterSpacing:'-0.025em',
            }}>
              SoftTrade<span style={{color:'var(--orange)'}}>‑</span>Mandi
              <div style={{fontSize:'0.32em', fontWeight:500, color:'var(--ink-soft)', marginTop:14, fontStyle:'italic', letterSpacing:'-0.01em'}}>
                Mahajani accounting, the way mandis actually keep books.
              </div>
            </h1>

            <p style={{
              fontSize:18, lineHeight:1.6, color:'var(--ink-soft)',
              maxWidth:560, marginTop:24,
            }}>
              A Windows-based accounting and inventory suite that runs the traditional
              <strong style={{color:'var(--ink)'}}> Mahajani (Adat) bookkeeping</strong> North Indian grain, kirana, oil-mill and commission traders actually use — Chittha, Talpat, Aaita, Dalali — while layering modern GST, e-invoice and e-Way Bill generation on top.
            </p>

            {/* CTA row */}
            <div style={{display:'flex', gap:12, marginTop:32, flexWrap:'wrap'}}>
              <Link to="/contact" className="btn btn-primary">
                Get a Quote <Icon name="arrow" size={16} stroke={2.2} className="arrow"/>
              </Link>
            </div>

            {/* trust strip */}
            <div style={{
              display:'flex', alignItems:'center', gap:24,
              marginTop:40, paddingTop:24,
              borderTop:'1px dashed var(--line-2)',
            }}>
              <div>
                <div className="serif" style={{fontSize:28, fontWeight:600, lineHeight:1}}>2009</div>
                <div style={{fontSize:11.5, color:'var(--muted)', marginTop:4, letterSpacing:'.06em', textTransform:'uppercase'}}>Built since</div>
              </div>
              <div style={{width:1, height:36, background:'var(--line-2)'}}/>
              <div>
                <div className="serif" style={{fontSize:28, fontWeight:600, lineHeight:1}}>16</div>
                <div style={{fontSize:11.5, color:'var(--muted)', marginTop:4, letterSpacing:'.06em', textTransform:'uppercase'}}>Mandi modules</div>
              </div>
              <div style={{width:1, height:36, background:'var(--line-2)'}}/>
              <div>
                <div className="serif" style={{fontSize:28, fontWeight:600, lineHeight:1}}>Jaipur</div>
                <div style={{fontSize:11.5, color:'var(--muted)', marginTop:4, letterSpacing:'.06em', textTransform:'uppercase'}}>Local support</div>
              </div>
            </div>
          </div>

          {/* RIGHT — visual */}
          <div style={{display:'flex', justifyContent:'flex-end', alignItems:'center'}}>
            <HeroLedger/>
          </div>
        </div>
      </div>

      {/* Marquee strip */}
      <div style={{
        background:'var(--ink)', color:'#fff',
        padding:'18px 0', overflow:'hidden',
        borderTop:'1px solid rgba(255,255,255,.05)',
      }}>
        <div style={{display:'flex', alignItems:'center', gap:48, whiteSpace:'nowrap',
          animation:'mandi-marquee 40s linear infinite'}}>
          {Array(2).fill(0).map((_,k)=>(
            <Fragment key={k}>
              {[
                ['ledger','Chittha · Daily register'],
                ['receipt','Talpat · T-format summary'],
                ['coins','Vyapar Khata'],
                ['boxes','Multi-godown stock'],
                ['factory','Flour · dal · oil · rice mills'],
                ['handshake','Dalali / commission workflow'],
                ['file','GSTR-1 · GSTR-3B · RCM'],
                ['truck','e-Way Bill JSON'],
                ['msg','Direct SMS / Email'],
              ].map(([ic,t],i)=>(
                <span key={`${k}-${i}`} style={{display:'inline-flex', alignItems:'center', gap:10,
                  fontSize:14, fontWeight:500, color:'rgba(255,255,255,.75)'}}>
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
        @keyframes mandi-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}

// ============================================================
// WorkflowDiagram — 6-step process flow on warm paper.
// Ported verbatim from design/features.jsx (kept as-is per
// content reconciliation).
// ============================================================

function WorkflowDiagram() {
  const steps = [
    { ic:'receipt', label:'Aaita Parchi', sub:'Arrival slip',    tone:'paper' },
    { ic:'ledger',  label:'Chittha',      sub:'Daily register',  tone:'orange' },
    { ic:'calc',    label:'Talpat',       sub:'T-summary',       tone:'paper' },
    { ic:'coins',   label:'Dalali',       sub:'Commission',      tone:'paper' },
    { ic:'file',    label:'GSTR-1 / 3B',  sub:'Auto-generated',  tone:'teal' },
    { ic:'truck',   label:'e-Way Bill',   sub:'JSON ready',      tone:'ink' },
  ];
  return (
    <section style={{background:'var(--paper)', borderTop:'1px solid var(--line-2)', borderBottom:'1px solid var(--line-2)', padding:'88px 0'}}>
      <div className="container">
        <div style={{textAlign:'center', maxWidth:680, margin:'0 auto 48px'}}>
          <div className="section-kicker">How it flows</div>
          <h2 className="section-title serif">From <em>aaita parchi</em> to e-Way Bill —<br/>one entry, one trail.</h2>
        </div>

        <div style={{
          position:'relative',
          display:'grid', gridTemplateColumns:`repeat(${steps.length}, 1fr)`,
          gap:0, alignItems:'stretch',
        }}>
          {/* dashed connecting line between steps */}
          <div style={{
            position:'absolute', left:'8%', right:'8%', top:'34px',
            height:2, background:'repeating-linear-gradient(90deg, var(--line-2) 0 8px, transparent 8px 14px)',
            zIndex:0,
          }}/>
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
          <span style={{
            display:'inline-flex', alignItems:'center', gap:8,
            padding:'8px 16px', borderRadius:999,
            background:'#fff', border:'1px solid var(--line-2)',
          }}>
            <Icon name="zap" size={14} stroke={2} style={{color:'var(--orange)'}}/>
            One Chittha entry posts to Talpat, Khatas, GSTR and e-Way Bill simultaneously
          </span>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// PlanCard — single pricing card. Used by Pricing.
//
// Edits from the design:
//   - "Quote in under 2 hours" sub-line below "Contact for pricing" — removed (Bucket 1)
//   - features prop is a flat array of strings (was [text, on] pairs).
//     The 8-item check/lock cross-plan comparison was dropped — each
//     card now shows only its own plan's highlights, all checked.
//   - CTA rendered as <Link to="/contact"> (was <button>)
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

        {/* Price block */}
        <div style={{marginTop:22, paddingBottom:22, borderBottom: highlight ? '1px solid rgba(255,255,255,.10)' : '1px solid var(--line)'}}>
          <div style={{display:'flex', alignItems:'baseline', gap:8}}>
            <span className="serif" style={{fontSize:42, fontWeight:600, lineHeight:1, letterSpacing:'-0.02em'}}>Contact</span>
            <span style={{fontSize:14, color: highlight ? 'rgba(255,255,255,.55)' : 'var(--muted)'}}>for pricing</span>
          </div>
        </div>

        {/* Features — flat list, all checked */}
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
// Pricing — 2 plan cards on the right, sticky copy + 2 info
// chips on the left.
//
// Edits from the design:
//   - Section title "Two editions — same modules, different reach" — removed
//   - "back to you within 2 working hours" clause in the lede — removed (Bucket 1)
//   - "Honest first" info chip — removed (3 chips → 2)
//   - Plan display names: "Mandi Solo" → "Single User", "Mandi Plus" → "Multi User"
//   - Plan features sourced from products.js highlights (4 per card, all checked)
//   - "MOST POPULAR" badge kept on Multi User
//   - "EDITIONS" kicker kept (only the title below it was removed)
// ============================================================

function Pricing() {
  return (
    <section style={{background:'#fff', padding:'104px 0', borderTop:'1px solid var(--line)', borderBottom:'1px solid var(--line)'}}>
      <div className="container">
        <div style={{display:'grid', gridTemplateColumns:'1fr 1.3fr', gap:64, alignItems:'flex-start'}}>
          {/* LEFT — sticky copy + info chips */}
          <div style={{position:'sticky', top:100}}>
            <div className="section-kicker">Editions</div>
            <p className="section-lede">
              Final pricing depends on number of users, modules, and annual support plan. Contact us for a tailored quote.
            </p>

            <div style={{marginTop:32, display:'flex', flexDirection:'column', gap:14}}>
              {[
                ['handshake', 'Free installation',  'Data setup and user training included in Jaipur. Outside Jaipur handled remotely or by visit as agreed.'],
                ['shield',    'Annual maintenance', 'AMC available separately to cover updates, compliance changes and priority support.'],
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

          {/* RIGHT — plan cards */}
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:20}}>
            <PlanCard
              tag="SINGLE USER"
              name="Single User"
              blurb="One workstation. Perfect for small mandi shops, kirana stores and single-godown traders."
              features={[
                'Windows desktop install',
                'All Mahajani modules included',
                'GST, e-invoice, e-Way Bill ready',
                'Local Jaipur support from Unique Info Systems',
              ]}
            />
            <PlanCard
              tag="MULTI USER · LAN"
              name="Multi User"
              blurb="Unlimited LAN users at one location, branch sync, role-based access — for growing trades and mills."
              features={[
                'Unlimited LAN users at one location',
                'Branch / godown data sync',
                'Role-based access control',
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
// featureGroups — 16 modules (matches products.js features count),
// regrouped into 4 thematic categories per the design's editorial
// choice. Each item is a [title, blurb] pair derived from
// products.js features (split on the em-dash).
// ============================================================

const featureGroups = [
  {
    id: 'mahajani',
    icon: 'ledger',
    tone: 'orange',
    title: 'Mahajani Books',
    sub: 'The traditional ledger system, digitised',
    items: [
      ['Chittha',             'Daily transaction register in traditional mandi format'],
      ['Vyapar Khata',        'Trader / customer ledger with outstanding'],
      ['Bank & Rokad Khata',  'Double-sided cash register'],
      ['Talpat',              'Daily T-format summary'],
      ['Labh-Hani Khata',     'Profit and loss account'],
      ['Kachi-Pakki Aaita',   'Distinction with Hindi bill printing'],
    ],
  },
  {
    id: 'stock',
    icon: 'boxes',
    tone: 'teal',
    title: 'Stock & Production',
    sub: 'Built for grain, mills and cold-storage',
    items: [
      ['Lot ka Maal',          'Maal Mulyankan — mandi lot tracking and valuation'],
      ['Multi-godown stock',   'Transfer register, cold-storage stock tracking'],
      ['Production module',    'For flour, dal, oil and rice mills'],
      ['Aaita & Vikray Parchi','Arrival register and sale slips'],
    ],
  },
  {
    id: 'broker',
    icon: 'handshake',
    tone: 'paper',
    title: 'Dalali & Outstanding',
    sub: 'Commission, ageing, interest',
    items: [
      ['Dalal Khata, Dalali & Pete Ugahi', 'Broker commission workflow'],
      ['Interest calculation',             'On delayed receipts and payments'],
      ['Outstanding bilty (LR)',           'Reports and party-wise ageing'],
    ],
  },
  {
    id: 'tax',
    icon: 'file',
    tone: 'ink',
    title: 'GST, e-Way & Compliance',
    sub: 'Modern returns on top of Mahajani',
    items: [
      ['GSTR-1 Excel template',  'GSTR-3B generation, RCM handling'],
      ['e-Way Bill JSON upload', 'e-invoice support, e-TDS returns'],
      ['Direct SMS / Email',     'On every transaction'],
    ],
  },
];

// ============================================================
// FeatureCard — single feature group card. Used by Features.
// ============================================================

function FeatureCard({ group }) {
  return (
    <div className="card" style={{padding:28, height:'100%', display:'flex', flexDirection:'column'}}>
      <div style={{display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:16}}>
        <IconChip name={group.icon} tone={group.tone} size={48}/>
        <span style={{fontSize:11, fontWeight:700, letterSpacing:'.14em', color:'var(--muted)'}}>
          0{featureGroups.indexOf(group)+1}
        </span>
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
// Features — 4-card grid of feature groups.
//
// Edits from the design:
//   - Section title "Sixteen modules, four ways your mandi already
//     thinks." removed
//   - Section lede paragraph removed
//   - "What you get" kicker kept (only the title and lede were removed,
//     per content reconciliation)
// ============================================================

function Features() {
  return (
    <section className="pad-section" style={{background:'var(--bg)'}}>
      <div className="container">
        <div className="section-kicker" style={{marginBottom:48}}>What you get</div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:20}}>
          {featureGroups.map(g => <FeatureCard key={g.id} group={g}/>)}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FinalCTA — dark single-column CTA card with one button.
//
// Edits from the design:
//   - Right-side "WHAT TO EXPECT" 3-row card — removed
//   - Layout switched from 2-column grid to centered single column
//   - "30-minute" word removed from body (Bucket 1)
//   - Secondary phone-number button removed (Bucket 2)
//   - "Book a demo" wired as <Link to="/contact"> (was <button>)
//   - Decorative orange glow + paper-grid overlay kept (purely visual)
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
              Free walkthrough
            </div>
            <h2 className="serif" style={{fontSize:52, lineHeight:1.05, fontWeight:600, color:'#fff', margin:'20px 0 16px', letterSpacing:'-0.02em'}}>
              Ready to see SoftTrade-Mandi in action?
            </h2>
            <p style={{fontSize:17, color:'rgba(255,255,255,.7)', maxWidth:480, lineHeight:1.6, margin:'0 auto'}}>
              Book a demo with us. We'll walk you through the Mahajani modules on your own data and answer every question — no hard selling.
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
// MandiPage — page-level composition.
// Renders inside Layout's <Outlet/>. The .design-page wrapper
// activates the cream theme + Inter font + scoped utility
// classes defined in src/index.css (Wave 3 design system).
// ============================================================

export default function MandiPage() {
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
