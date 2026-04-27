// src/components/services/CustomizationPage.jsx
//
// Tally Customisation (TDL) service page — Wave 3 redesign.
// Route: /services/customization
//
// Composed sections:
//   - Hero (with CodeEditor visual)
//   - Process (4-step horizontal flow)
//   - WhatWeBuild (4-card grid: Vouchers / Reports / Industry / Logic)
//   - Scenarios (6 Rajasthan case cards in a 2-column grid)
//   - Pricing (single dark "Scoped Project" card + sticky left)
//   - FinalCTA (2-column dark with "WHAT THE WORKSHOP COVERS")
//
// Edits from the design (per content reconciliation):
//   - Hero: top inline padding 80→152px (fixed RouterNav clearance)
//   - Hero CTAs: "Start a conversation" → /contact (React Router),
//     "Book a free workshop" → /contact (was "Book a 30-min
//     workshop"; "30-min" wording dropped per Bucket 1 — see below)
//   - "30-minute" / "30-min" wording dropped throughout per
//     Bucket 1, replaced with:
//       * Hero CTA "Book a 30-min workshop" → "Book a free workshop"
//       * Process step 1 sub: "Free requirements call. We sketch..."
//         (was "30-minute requirements call...")
//       * Pricing left chip: "30 minutes. Sketch the approach..."
//         → "Free workshop. Sketch the approach..."
//       * Pricing-section lede: "...we run a free 30-minute
//         requirements workshop and quote..." → "...we run a free
//         scoping workshop and quote..."
//       * FinalCTA eyebrow "30-minute workshop · no obligation" →
//         "Free workshop · no obligation"
//       * FinalCTA body: "...run a 30-minute requirements workshop"
//         → "...run a free requirements workshop"
//   - All CTAs (3 "Start a conversation" / "Get a Quote" / "Book a
//     free workshop") wired as <Link to="/contact">
//   - FinalCTA secondary phone button → tel:+919829006111 (real
//     number from siteConfig.phones.sales)
//   - <React.Fragment> not used in TDL design — clean ES module imports
//   - Pricing card "30-day post-deployment bug-fix window" and
//     "Optional AMC for ongoing tweaks" kept verbatim (both real
//     policies per content reconciliation)
//   - WhatWeBuild 4-card structure (Vouchers / Reports / Industry /
//     Logic) ported verbatim from design (consistent with products.js)
//   - Scenarios: design's 6 Rajasthan cases ported verbatim (more
//     visual variety than products.js's 4)
//   - CodeEditor visual: ported verbatim (decorative TDL code window;
//     fake project ID #TDL-2486 and "4-day turnaround" stay as
//     fixture data inside the visual mock, same convention as the
//     Mandi ledger book)

import { Link } from 'react-router-dom';
import { Icon, IconChip } from '../design/Icon';

const PHONE_DISPLAY = '+91 98290 06111';
const PHONE_TEL     = '+919829006111';

// ============================================================
// CodeEditor — decorative TDL code window with floating
// "Scope Brief" card (back, rotated −3°) and floating
// "Upgrade-safe" card (front-right). Ported verbatim from
// design/tdl-page.jsx.
// ============================================================

function CodeEditor() {
  return (
    <div style={{position:'relative', width:'100%', maxWidth:560}}>
      {/* Behind: scope brief */}
      <div style={{
        position:'absolute', left:'-6%', top:'-2%', width:'56%',
        background:'#fff', border:'1px solid var(--line)', borderRadius:14,
        padding:'14px 16px', boxShadow:'0 24px 40px -28px rgba(14,27,44,.20)',
        transform:'rotate(-3deg)', zIndex:1,
      }}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8}}>
          <div style={{fontSize:10, fontWeight:700, letterSpacing:'.16em', color:'var(--muted)'}}>SCOPE BRIEF · #TDL-2486</div>
          <div style={{fontSize:10, fontWeight:700, color:'var(--teal)', background:'var(--teal-soft)', padding:'3px 8px', borderRadius:999}}>SIGNED</div>
        </div>
        <div style={{fontSize:13, fontWeight:600, marginTop:6}}>Custom GSTR-1 summary</div>
        <div style={{fontSize:11.5, color:'var(--ink-soft)', marginTop:4, lineHeight:1.5}}>
          Add HSN-grouped totals with rate slabs, exportable to Excel from inside Tally. 4-day turnaround.
        </div>
        <div style={{marginTop:10, paddingTop:8, borderTop:'1px dashed var(--line-2)', display:'flex', justifyContent:'space-between', fontSize:10.5}}>
          <span style={{color:'var(--muted)'}}>Industry</span>
          <span style={{fontWeight:600}}>Textile · Bhilwara</span>
        </div>
      </div>

      {/* Main: code window */}
      <div style={{
        position:'relative', zIndex:2, width:'92%', marginLeft:'auto',
        background:'#0E1B2C', borderRadius:14, overflow:'hidden',
        boxShadow:'0 30px 60px -22px rgba(14,27,44,.5)',
        border:'1px solid rgba(255,255,255,.08)',
      }}>
        {/* Title bar */}
        <div style={{display:'flex', alignItems:'center', gap:8, padding:'10px 14px', borderBottom:'1px solid rgba(255,255,255,.08)'}}>
          <span style={{width:11, height:11, borderRadius:'50%', background:'#ED6155'}}/>
          <span style={{width:11, height:11, borderRadius:'50%', background:'#F2BD3E'}}/>
          <span style={{width:11, height:11, borderRadius:'50%', background:'#5DDDB0'}}/>
          <span style={{marginLeft:14, fontSize:11.5, fontWeight:600, color:'rgba(255,255,255,.8)'}} className="mono">gstr1-hsn-summary.tdl</span>
          <span style={{marginLeft:'auto', fontSize:10, fontWeight:600, color:'#5DDDB0',
            background:'rgba(15,138,111,.20)', padding:'3px 8px', borderRadius:999}}>SANDBOX</span>
        </div>

        {/* Code body */}
        <div className="mono" style={{padding:'18px 18px 18px 4px', fontSize:12.5, lineHeight:1.7,
          color:'rgba(255,255,255,.85)', display:'flex'}}>
          <div style={{flexShrink:0, color:'rgba(255,255,255,.25)', textAlign:'right', paddingRight:12, userSelect:'none'}}>
            {Array.from({length:11}).map((_,i)=>(<div key={i}>{i+1}</div>))}
          </div>
          <div style={{flex:1}}>
            <div><span style={{color:'#9C8AC9'}}>;;</span> <span style={{color:'rgba(255,255,255,.4)'}}>HSN summary with rate slabs</span></div>
            <div><span style={{color:'#FF8A65'}}>[Report:</span> <span style={{color:'#5DDDB0'}}>HSNSummary</span><span style={{color:'#FF8A65'}}>]</span></div>
            <div style={{paddingLeft:14}}><span style={{color:'#9C8AC9'}}>Form</span> : HSNSummaryForm</div>
            <div style={{paddingLeft:14}}><span style={{color:'#9C8AC9'}}>Title</span> : <span style={{color:'#FFB07A'}}>"GSTR-1 · HSN-wise"</span></div>
            <div style={{height:6}}/>
            <div><span style={{color:'#FF8A65'}}>[Collection:</span> <span style={{color:'#5DDDB0'}}>VchByHSN</span><span style={{color:'#FF8A65'}}>]</span></div>
            <div style={{paddingLeft:14}}><span style={{color:'#9C8AC9'}}>Type</span> : Voucher : <span style={{color:'#5DDDB0'}}>VchType</span></div>
            <div style={{paddingLeft:14}}><span style={{color:'#9C8AC9'}}>Filter</span> : IsSales</div>
            <div style={{paddingLeft:14}}><span style={{color:'#9C8AC9'}}>Sort</span> : <span style={{color:'#FFB07A'}}>"@@HSNCode"</span> : <span style={{color:'#FFB07A'}}>"@@RateSlab"</span></div>
            <div style={{height:6}}/>
            <div><span style={{color:'#9C8AC9'}}>;;</span> <span style={{color:'rgba(255,255,255,.4)'}}>Rate-slab grouping</span></div>
            <div><span style={{color:'#FF8A65'}}>[System:</span> <span style={{color:'#5DDDB0'}}>Formula</span><span style={{color:'#FF8A65'}}>]</span></div>
            <div style={{paddingLeft:14}}><span style={{color:'#9C8AC9'}}>RateSlab</span> : <span style={{color:'#FFB07A'}}>$$IGSTRate + $$CGSTRate * 2</span></div>
          </div>
        </div>

        {/* Status bar */}
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'8px 14px',
          background:'rgba(255,255,255,.03)', borderTop:'1px solid rgba(255,255,255,.08)',
          fontSize:10.5, color:'rgba(255,255,255,.55)'}} className="mono">
          <span>↑ TDL · UTF-8 · LF</span>
          <span style={{display:'inline-flex', alignItems:'center', gap:6, color:'#5DDDB0'}}>
            <span style={{width:6, height:6, borderRadius:'50%', background:'#5DDDB0'}}/> Compiles · 0 errors
          </span>
        </div>
      </div>

      {/* Floating: upgrade-compatible badge */}
      <div style={{
        position:'absolute', right:'-4%', bottom:'-12%', width:'52%', zIndex:3,
        background:'#fff', border:'1px solid var(--line)', borderRadius:14,
        padding:'14px 16px', boxShadow:'0 24px 40px -20px rgba(14,27,44,.30)',
      }}>
        <div style={{display:'flex', alignItems:'center', gap:10}}>
          <div style={{width:32, height:32, borderRadius:8, background:'var(--teal-soft)',
            color:'var(--teal)', display:'grid', placeItems:'center'}}>
            <Icon name="shield" size={16} stroke={2}/>
          </div>
          <div>
            <div style={{fontSize:11, fontWeight:700, letterSpacing:'.12em', color:'var(--muted)'}}>UPGRADE-SAFE</div>
            <div style={{fontSize:13, fontWeight:600, marginTop:1}}>Tested vs. TallyPrime 7.0</div>
          </div>
        </div>
        <div style={{marginTop:10, paddingTop:10, borderTop:'1px dashed var(--line-2)',
          display:'flex', justifyContent:'space-between', fontSize:11}}>
          <span style={{color:'var(--ink-soft)'}}>Source code handed over</span>
          <span style={{fontWeight:700, color:'var(--teal)'}}>✓</span>
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
      background:'linear-gradient(180deg,#F4EEDF 0%,#FBF8F1 100%)', borderBottom:'1px solid var(--line)'}}>
      <div className="paper-grid" style={{position:'absolute', inset:0, opacity:.4, pointerEvents:'none',
        maskImage:'radial-gradient(ellipse at top right, black, transparent 70%)',
        WebkitMaskImage:'radial-gradient(ellipse at top right, black, transparent 70%)'}}/>

      <div className="container wave-hero" style={{position:'relative', padding:'152px 32px 110px'}}>
        <div className="wave-hero-grid" style={{display:'grid', gridTemplateColumns:'1.1fr 1fr', gap:60, alignItems:'center'}}>
          <div>
            <div style={{display:'flex', gap:10, alignItems:'center', flexWrap:'wrap'}}>
              <span className="eyebrow"><span className="dot"></span>Services · Tally Customisation</span>
              <span style={{display:'inline-flex', alignItems:'center', gap:6, fontSize:12, fontWeight:600,
                color:'var(--ink-soft)', padding:'4px 10px', border:'1px solid var(--line-2)', borderRadius:999, background:'#fff'}}>
                <Icon name="shield" size={12} stroke={2}/> 5-Star Tally Partner · in-house dev
              </span>
            </div>

            <h1 className="serif" style={{fontSize:'clamp(46px,5.4vw,76px)', lineHeight:0.98, fontWeight:600,
              margin:'24px 0 0', letterSpacing:'-0.025em'}}>
              Tally <em style={{color:'var(--orange)', fontStyle:'italic', fontWeight:500}}>Customisation</em>.
              <div style={{fontSize:'0.32em', fontWeight:500, color:'var(--ink-soft)', marginTop:14, fontStyle:'italic', letterSpacing:'-0.01em'}}>
                Custom vouchers, reports, print formats and modules — built in TDL.
              </div>
            </h1>

            <p style={{fontSize:18, lineHeight:1.6, color:'var(--ink-soft)', maxWidth:560, marginTop:24}}>
              <strong style={{color:'var(--ink)'}}>TDL</strong> (Tally Definition Language) lets a certified partner modify almost every user-facing element in TallyPrime — input screens, voucher types, masters, print formats, reports and business logic — without breaking upgrade compatibility.
            </p>

            <div style={{display:'flex', gap:12, marginTop:32, flexWrap:'wrap'}}>
              <Link to="/contact" className="btn btn-primary">
                Start a conversation <Icon name="arrow" size={16} stroke={2.2} className="arrow"/>
              </Link>
              <Link to="/contact" className="btn btn-dark">
                <Icon name="phone" size={13} stroke={2}/> Book a free workshop
              </Link>
            </div>

            <div style={{display:'flex', alignItems:'center', gap:24, marginTop:40, paddingTop:24,
              borderTop:'1px dashed var(--line-2)', flexWrap:'wrap'}}>
              <div>
                <div className="serif" style={{fontSize:28, fontWeight:600, lineHeight:1}}>In-house</div>
                <div style={{fontSize:11.5, color:'var(--muted)', marginTop:4, letterSpacing:'.06em', textTransform:'uppercase'}}>Dev team</div>
              </div>
              <div style={{width:1, height:36, background:'var(--line-2)'}}/>
              <div>
                <div className="serif" style={{fontSize:28, fontWeight:600, lineHeight:1}}>Fixed quote</div>
                <div style={{fontSize:11.5, color:'var(--muted)', marginTop:4, letterSpacing:'.06em', textTransform:'uppercase'}}>After scoping</div>
              </div>
              <div style={{width:1, height:36, background:'var(--line-2)'}}/>
              <div>
                <div className="serif" style={{fontSize:28, fontWeight:600, lineHeight:1}}>Source code</div>
                <div style={{fontSize:11.5, color:'var(--muted)', marginTop:4, letterSpacing:'.06em', textTransform:'uppercase'}}>Handed over</div>
              </div>
            </div>
          </div>

          <div style={{display:'flex', justifyContent:'center'}}><CodeEditor/></div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Process — 4-step horizontal flow on white. "30-minute"
// dropped from step 1 sub-copy.
// ============================================================

function Process() {
  const steps = [
    ['1','Workshop',     'Free requirements call. We sketch the approach and confirm scope is buildable.'],
    ['2','Fixed quote',  'Scoped quote — fixed price, fixed timeline. No hourly drift.'],
    ['3','Sandbox build','Built in a sandbox TDL on our test data. You see it before deployment.'],
    ['4','Deploy',       'Tested against current TallyPrime, deployed on your machine, source code handed over.'],
  ];
  return (
    <section className="pad-section" style={{background:'#fff', borderBottom:'1px solid var(--line)'}}>
      <div className="container">
        <div style={{textAlign:'center', maxWidth:680, margin:'0 auto 56px'}}>
          <div className="section-kicker">How we work</div>
          <h2 className="section-title serif">Honest process —<br/>no surprises after.</h2>
        </div>
        <div className="wave-grid-4" style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:20, position:'relative'}}>
          <div style={{position:'absolute', top:36, left:'10%', right:'10%', height:2,
            background:'repeating-linear-gradient(90deg, var(--line-2) 0 8px, transparent 8px 14px)', zIndex:0}}/>
          {steps.map(([n,h,t],i)=>(
            <div key={i} style={{textAlign:'center', position:'relative', zIndex:1}}>
              <div style={{margin:'0 auto', width:72, height:72, borderRadius:'50%',
                background: i===steps.length-1?'var(--orange)':'var(--ink)', color:'#fff',
                display:'grid', placeItems:'center', fontFamily:"'Fraunces',serif", fontSize:30, fontWeight:600,
                border:'4px solid #fff', boxShadow:'0 12px 24px -10px rgba(14,27,44,.3)'}}>{n}</div>
              <div className="serif" style={{fontSize:21, fontWeight:600, marginTop:18, letterSpacing:'-0.01em'}}>{h}</div>
              <div style={{fontSize:13.5, color:'var(--ink-soft)', marginTop:6, lineHeight:1.55, maxWidth:240, margin:'8px auto 0'}}>{t}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// WhatWeBuild — 4-card grid on warm paper. Ported verbatim
// from the design.
// ============================================================

const buildGroups = [
  { ic:'receipt', tone:'orange', title:'Vouchers & Inputs', items:[
    ['Custom voucher types',  'New voucher classes with bespoke fields and behaviour'],
    ['Input-screen tweaks',   'Add fields, validations, defaults, auto-fill rules'],
    ['Voucher print formats', 'Brand-matched invoice, challan, gatepass templates'],
  ]},
  { ic:'ledger', tone:'teal', title:'Reports & Analytics', items:[
    ['Custom GSTR summaries', 'HSN-grouped, rate-slab breakdowns, exportable'],
    ['Industry-specific MIS', 'Sales / cash / outstanding by your business cuts'],
    ['Excel export',          'Tally-native, no copy-paste'],
  ]},
  { ic:'grid', tone:'paper', title:'Industry Modules', items:[
    ['Textile · weaving · ginning', 'Pcs / metres / bales accounting layers'],
    ['Marble · granite',            'Slab-wise inventory and SQM billing'],
    ['Cold chain & mandi',          'Bardana, hammali, marka tracking on top of Tally'],
  ]},
  { ic:'shield', tone:'ink', title:'Business Logic', items:[
    ['Custom approval flows', 'Multi-level voucher approvals'],
    ['Auto-postings',         'Trigger entries on voucher save'],
    ['Connected APIs',        'Integrate Tally with your portals and apps'],
  ]},
];

function WhatWeBuild() {
  return (
    <section style={{background:'var(--paper)', padding:'104px 0', borderTop:'1px solid var(--line-2)', borderBottom:'1px solid var(--line-2)'}}>
      <div className="container">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:48, gap:32, flexWrap:'wrap'}}>
          <div>
            <div className="section-kicker">What we customise</div>
            <h2 className="section-title serif">From a single field to a full<br/>industry module.</h2>
          </div>
          <p className="section-lede">
            Narrow enhancements (a new field on a sales voucher, a custom GSTR-1 summary) or full industry modules — same team, same upgrade-safe TDL discipline.
          </p>
        </div>
        <div className="wave-grid-4" style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:20}}>
          {buildGroups.map((g,i)=>(
            <div key={i} className="card" style={{padding:26, height:'100%'}}>
              <div style={{display:'flex', alignItems:'flex-start', justifyContent:'space-between'}}>
                <IconChip name={g.ic} tone={g.tone} size={48}/>
                <span style={{fontSize:11, fontWeight:700, letterSpacing:'.14em', color:'var(--muted)'}}>0{i+1}</span>
              </div>
              <h3 className="serif" style={{fontSize:21, fontWeight:600, margin:'18px 0 0', letterSpacing:'-0.01em'}}>{g.title}</h3>
              <ul style={{listStyle:'none', padding:0, margin:'18px 0 0', display:'flex', flexDirection:'column', gap:11}}>
                {g.items.map((it,j)=>(
                  <li key={j} style={{display:'flex', alignItems:'flex-start', gap:10, paddingTop:11, borderTop:'1px solid var(--line)'}}>
                    <span style={{width:16, height:16, borderRadius:'50%', background:'var(--teal-soft)', color:'var(--teal)', display:'grid', placeItems:'center', flexShrink:0, marginTop:2}}>
                      <Icon name="check" size={9} stroke={2.5}/>
                    </span>
                    <div>
                      <div style={{fontSize:13.5, fontWeight:600}}>{it[0]}</div>
                      <div style={{fontSize:12.5, color:'var(--ink-soft)', marginTop:2, lineHeight:1.45}}>{it[1]}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Scenarios — 6 Rajasthan case cards on white, sticky-left
// kicker. Ported verbatim from design.
// ============================================================

function Scenarios() {
  const items = [
    ['Bhilwara textile mill',         'Pcs / metres / bales added to all sales vouchers, with GSTR-1 reflecting count + value.'],
    ['Kishangarh marble unit',        'Slab-wise inventory by SQM. Custom challan with slab numbers and dispatch photos.'],
    ['Jodhpur handicraft exporter',   'Custom commercial invoice with packing list, gross/net weight, EPCG details.'],
    ['Jaipur jewellery wholesaler',   'Karat-wise stock with making charges; dual-rate (gold rate + labour) print format.'],
    ['Sri Ganganagar grain trader',   'Aaita / mandi tax / commission layers added to standard sales — books still tally.'],
    ['Udaipur hospitality group',     'Property-wise cost centres with consolidated MIS across 4 hotels.'],
  ];
  return (
    <section className="pad-section" style={{background:'#fff'}}>
      <div className="container">
        <div className="wave-split" style={{display:'grid', gridTemplateColumns:'1fr 1.6fr', gap:64, alignItems:'flex-start'}}>
          <div style={{position:'sticky', top:100}}>
            <div className="section-kicker">Where we've shipped</div>
            <h2 className="section-title serif">Typical Rajasthan<br/>scenarios.</h2>
            <p style={{fontSize:14, color:'var(--ink-soft)', marginTop:20, lineHeight:1.6}}>
              Real customisations we've built for businesses near you. Industry, scope and outcome — references on request.
            </p>
          </div>
          <div className="wave-grid-2" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:18}}>
            {items.map(([h,t],i)=>(
              <div key={i} style={{padding:'22px 22px', background:'var(--paper)', border:'1px solid var(--line-2)', borderRadius:14}}>
                <div style={{display:'flex', alignItems:'center', gap:8, fontSize:11, fontWeight:700, letterSpacing:'.12em', color:'var(--orange)'}}>
                  <span style={{width:18, height:18, borderRadius:4, background:'#fff', border:'1px solid var(--line-2)',
                    display:'grid', placeItems:'center', fontSize:10, color:'var(--ink-soft)'}}>{i+1}</span>
                  CASE {String(i+1).padStart(2,'0')}
                </div>
                <div className="serif" style={{fontSize:18, fontWeight:600, marginTop:8, letterSpacing:'-0.01em'}}>{h}</div>
                <div style={{fontSize:13.5, color:'var(--ink-soft)', marginTop:6, lineHeight:1.55}}>{t}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Pricing — single dark "Scoped Project" card on right + sticky
// kicker/lede + 3 info chips on left. Pricing-section lede has
// "30-minute" softened to "scoping". The chip "Free scoping
// workshop" sub-copy has "30 minutes" softened too. Card features
// kept verbatim including 30-day bug-fix window and AMC option.
// ============================================================

function Pricing() {
  return (
    <section style={{background:'var(--paper)', padding:'104px 0', borderTop:'1px solid var(--line-2)', borderBottom:'1px solid var(--line-2)'}}>
      <div className="container">
        <div className="wave-split" style={{display:'grid', gridTemplateColumns:'1fr 1.05fr', gap:64, alignItems:'center'}}>
          <div>
            <div className="section-kicker">Pricing</div>
            <h2 className="section-title serif">Scoped projects.<br/>Fixed quote after the workshop.</h2>
            <p className="section-lede" style={{marginTop:20}}>
              Every TDL job is unique. We refuse to give blind hourly rates — they incentivise the wrong things. Instead, we run a free scoping workshop and quote a fixed price.
            </p>
            <div style={{marginTop:28, display:'flex', flexDirection:'column', gap:14}}>
              {[
                ['handshake','Free scoping workshop', 'Free workshop. Sketch the approach. Walk away if it\'s not the right fit.'],
                ['shield',   'Upgrade-compatible',     'Every build tested against the current TallyPrime release before handover.'],
                ['file',     'Source code yours',      'We hand over the .tdl file. Switch partners later — your code, your call.'],
              ].map(([ic,h,t],i)=>(
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

          <div style={{position:'relative', background:'var(--ink)', color:'#fff', borderRadius:20, padding:'40px 36px', overflow:'hidden'}}>
            <div style={{position:'absolute', right:-100, top:-100, width:300, height:300, borderRadius:'50%',
              background:'radial-gradient(circle, rgba(225,83,11,.25), transparent 60%)', pointerEvents:'none'}}/>
            <div style={{position:'relative'}}>
              <div style={{fontSize:11, fontWeight:700, letterSpacing:'.16em', color:'rgba(255,255,255,.5)'}}>SCOPED PROJECT</div>
              <div className="serif" style={{fontSize:48, fontWeight:600, lineHeight:1.05, marginTop:14, letterSpacing:'-0.02em'}}>
                Contact for pricing
              </div>
              <div style={{fontSize:13, color:'rgba(255,255,255,.55)', marginTop:8}}>Fixed quote · GST extra</div>

              <div style={{marginTop:28, paddingTop:24, borderTop:'1px solid rgba(255,255,255,.1)',
                display:'flex', flexDirection:'column', gap:12}}>
                {[
                  'Fixed quote after a scoped requirements workshop',
                  'Built in sandbox TDL, tested, then deployed',
                  'Source code handed over on project close',
                  'Upgrade-compatible — tested against current TallyPrime',
                  '30-day post-deployment bug-fix window',
                  'Optional AMC for ongoing tweaks',
                ].map((f,i)=>(
                  <div key={i} style={{display:'flex', alignItems:'flex-start', gap:10, fontSize:14}}>
                    <span style={{width:18, height:18, borderRadius:'50%', background:'rgba(255,255,255,.10)', color:'#fff',
                      display:'grid', placeItems:'center', flexShrink:0, marginTop:2}}>
                      <Icon name="check" size={10} stroke={2.5}/>
                    </span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              <Link to="/contact" className="btn btn-primary" style={{marginTop:28, width:'100%', justifyContent:'center'}}>
                Get a Quote <Icon name="arrow" size={15} stroke={2.2} className="arrow"/>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FinalCTA — 2-column dark; "Start a conversation" → /contact,
// secondary phone button → tel:+919829006111. "30-minute"
// dropped from eyebrow and body. "WHAT THE WORKSHOP COVERS"
// right card kept verbatim.
// ============================================================

function FinalCTA() {
  return (
    <section className="pad-section">
      <div className="container">
        <div style={{position:'relative', overflow:'hidden', background:'var(--ink)', borderRadius:24, padding:'72px 64px',
          display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:48, alignItems:'center'}} className="wave-finalcta">
          <div style={{position:'absolute', right:-100, top:-100, width:400, height:400, borderRadius:'50%',
            background:'radial-gradient(circle, rgba(225,83,11,.25), transparent 60%)'}}/>

          <div style={{position:'relative'}}>
            <div className="eyebrow" style={{background:'rgba(255,255,255,.08)', borderColor:'rgba(255,255,255,.12)', color:'#fff'}}>
              <span className="dot" style={{background:'var(--orange)'}}></span>Free workshop · no obligation
            </div>
            <h2 className="serif" style={{fontSize:52, lineHeight:1.05, fontWeight:600, color:'#fff', margin:'20px 0 16px', letterSpacing:'-0.02em'}}>
              Have a Tally customisation in mind?
            </h2>
            <p style={{fontSize:17, color:'rgba(255,255,255,.7)', maxWidth:480, lineHeight:1.6, margin:0}}>
              Share what you're trying to achieve — even if it's vague. We'll run a free requirements workshop, sketch an approach, and give you a scoped quote.
            </p>
            <div style={{display:'flex', gap:12, marginTop:32, flexWrap:'wrap'}}>
              <Link to="/contact" className="btn btn-primary">
                Start a conversation <Icon name="arrow" size={16} stroke={2.2} className="arrow"/>
              </Link>
              <a href={`tel:${PHONE_TEL}`} className="btn"
                 style={{background:'rgba(255,255,255,.08)', color:'#fff', border:'1px solid rgba(255,255,255,.15)'}}>
                <Icon name="phone" size={14} stroke={2}/> {PHONE_DISPLAY}
              </a>
            </div>
          </div>

          <div style={{position:'relative'}}>
            <div style={{background:'rgba(255,255,255,.06)', border:'1px solid rgba(255,255,255,.10)', borderRadius:18, padding:24}}>
              <div style={{fontSize:11.5, fontWeight:700, letterSpacing:'.14em', color:'rgba(255,255,255,.5)'}}>WHAT THE WORKSHOP COVERS</div>
              <div style={{display:'flex', flexDirection:'column', gap:14, marginTop:16}}>
                {[
                  ['Listen first',        'You explain the workflow, we ask questions'],
                  ['Sketch the approach', 'Show you what TDL can — and can\'t — do'],
                  ['Scoped quote',        'Fixed price, fixed timeline. No obligation'],
                ].map((r,i)=>(
                  <div key={i} style={{display:'flex', gap:12, alignItems:'flex-start'}}>
                    <span style={{width:24, height:24, borderRadius:'50%', background:'var(--orange)', color:'#fff',
                      display:'grid', placeItems:'center', flexShrink:0, fontSize:11, fontWeight:700}}>{i+1}</span>
                    <div>
                      <div style={{fontSize:14.5, fontWeight:600, color:'#fff'}}>{r[0]}</div>
                      <div style={{fontSize:13, color:'rgba(255,255,255,.55)', marginTop:2}}>{r[1]}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CustomizationPage — page-level composition.
// ============================================================

export default function CustomizationPage() {
  return (
    <div className="design-page">
      <Hero/>
      <Process/>
      <WhatWeBuild/>
      <Scenarios/>
      <Pricing/>
      <FinalCTA/>
    </div>
  );
}
