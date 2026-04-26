// src/components/softtrade/MandiPage.jsx
//
// SoftTrade-Mandi product page — Wave 3 redesign.
//
// Status of this file:
//   ✓ Hero (this prompt — Prompt 1)
//   TODO: WorkflowDiagram (Prompt 2)
//   TODO: Pricing (Prompt 2)
//   TODO: Features (Prompt 3)
//   TODO: FinalCTA (Prompt 3)
//
// Design tokens and utility classes (.serif, .paper-grid, .container,
// .btn, .btn-primary, .eyebrow, .dot, .mono) are scoped under
// .design-page in src/index.css. Inline styles and class references
// in this file only resolve correctly inside the
// <div className="design-page"> wrapper at the bottom.

import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../design/Icon';

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
// MandiPage — page-level composition.
// Renders inside Layout's <Outlet/>. The .design-page wrapper
// activates the cream theme + Inter font + scoped utility
// classes defined in src/index.css (Wave 3 design system).
// ============================================================

export default function MandiPage() {
  return (
    <div className="design-page">
      <Hero/>
      {/* TODO Prompt 2: <WorkflowDiagram/> */}
      {/* TODO Prompt 2: <Pricing/> */}
      {/* TODO Prompt 3: <Features/> */}
      {/* TODO Prompt 3: <FinalCTA/> */}
    </div>
  );
}
