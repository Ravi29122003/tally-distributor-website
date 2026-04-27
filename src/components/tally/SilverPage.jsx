// src/components/tally/SilverPage.jsx
//
// TallyPrime-Silver product page — Wave 3 redesign.
//
// Composed sections:
//   - Hero (with LicenseCard visual — back "SILVER vs GOLD" card dropped)
//   - Pricing (single Lifetime plan card; rentals dropped)
//   - Features (4-card grid; content from design verbatim, all consistent
//     with products.js)
//   - GoldStrip (kept; cross-sell to /products/gold)
//   - FinalCTA (2-column dark; Buy on Tally.com + tel: phone + right-side
//     "WHY BUY THROUGH US" card)
//
// External destinations:
//   TALLY_BUY_URL    = https://tallysolutions.com/buy-tally/
//   TALLY_TRIAL_URL  = https://tallysolutions.com/business-software-7day-free-trial/
//   PHONE            = +91 98290 06111
//
// Edits from the design (per content reconciliation):
//   - Hero: top inline padding 80→152px (fixed RouterNav clearance)
//   - Hero CTAs: design's 3 buttons kept with re-targeted destinations:
//     "Buy Now" → tally.com/buy-tally/ (new tab), "Talk to us" → /contact,
//     "Download trial" → tally.com 7-day trial page (new tab)
//   - LicenseCard: back "SILVER vs GOLD" comparison card dropped per
//     content reconciliation; main dark license card and floating
//     "NEW IN RELEASE 7.0" card kept verbatim
//   - Pricing: design only shows Lifetime — kept that, rentals dropped.
//     "+18% GST" sub-text under price dropped. "EMI & GST" info chip
//     dropped (3 chips → 2). A small footnote "All prices exclude
//     18% GST" shown below the pricing card.
//   - Pricing card "Buy Now" button → tally.com/buy-tally/ (new tab)
//   - Features: section title and lede kept verbatim (all factually true,
//     no unverifiable claims)
//   - GoldStrip: kept; "See TallyPrime Gold" wired as <Link to="/products/gold">
//   - FinalCTA: 2-column kept; "Buy on Tally.com" → tally.com/buy-tally/
//     (new tab); phone → tel: link to +91 98290 06111; right-side
//     "WHY BUY THROUGH US" card kept verbatim
//   - <React.Fragment> not used (LicenseCard back-card dropped removed
//     the only React.Fragment usage)

import { Link } from 'react-router-dom';
import { Icon, IconChip } from '../design/Icon';

const TALLY_BUY_URL    = 'https://tallysolutions.com/buy-tally/';
const TALLY_TRIAL_URL  = 'https://tallysolutions.com/business-software-7day-free-trial/';
const PHONE_DISPLAY    = '+91 98290 06111';
const PHONE_TEL        = '+919829006111';

// ============================================================
// LicenseCard — decorative TallyPrime Silver license-key visual.
// Main dark card + floating "NEW IN RELEASE 7.0" card.
// Back "SILVER vs GOLD" comparison card dropped per content
// reconciliation.
// ============================================================

function LicenseCard() {
  return (
    <div style={{position:'relative', width:'100%', maxWidth:520}}>
      {/* Main dark license card */}
      <div style={{
        position:'relative', zIndex:2, width:'88%',
        background:'linear-gradient(155deg, #1B2C42 0%, #0E1B2C 100%)',
        borderRadius:18, padding:'28px 30px', color:'#fff',
        boxShadow:'0 30px 60px -22px rgba(14,27,44,.5)',
        border:'1px solid rgba(255,255,255,.08)', overflow:'hidden',
      }}>
        <div style={{position:'absolute', right:-80, top:-80, width:240, height:240, borderRadius:'50%',
          background:'radial-gradient(circle, rgba(225,83,11,.30), transparent 60%)', pointerEvents:'none'}}/>

        <div style={{position:'relative', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <div style={{display:'flex', alignItems:'center', gap:10}}>
            <div style={{width:36, height:36, borderRadius:9, background:'#fff',
              display:'grid', placeItems:'center', fontFamily:"'Fraunces',serif", fontSize:18, fontWeight:700, color:'var(--ink)', letterSpacing:'-0.02em'}}>T</div>
            <div>
              <div style={{fontSize:11, fontWeight:700, letterSpacing:'.14em', color:'rgba(255,255,255,.5)'}}>TALLYPRIME · 7.0</div>
              <div style={{fontSize:14, fontWeight:600, marginTop:1}}>Silver License</div>
            </div>
          </div>
          <div style={{display:'inline-flex', alignItems:'center', gap:5, fontSize:10, fontWeight:600,
            padding:'5px 9px', borderRadius:999, background:'rgba(15,138,111,.20)', color:'#5DDDB0',
            border:'1px solid rgba(15,138,111,.3)'}}>
            <span style={{width:6, height:6, borderRadius:'50%', background:'#5DDDB0'}}></span>Activated
          </div>
        </div>

        <div style={{position:'relative', marginTop:24, padding:'14px 16px', background:'rgba(255,255,255,.04)',
          border:'1px dashed rgba(255,255,255,.15)', borderRadius:10}}>
          <div style={{fontSize:10, fontWeight:700, letterSpacing:'.14em', color:'rgba(255,255,255,.4)'}}>SERIAL NUMBER</div>
          <div className="mono" style={{fontSize:18, fontWeight:600, marginTop:4, letterSpacing:'.06em'}}>
            777 · 2486 · <span style={{color:'var(--orange)'}}>1029</span>
          </div>
        </div>

        <div style={{position:'relative', display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginTop:18}}>
          {[
            ['USERS',    '1 concurrent'],
            ['ACCESS',   'Single PC'],
            ['TSS',      '12 months'],
            ['INCLUDES', 'Release 7.0'],
          ].map((r,i)=>(
            <div key={i} style={{borderTop:'1px solid rgba(255,255,255,.08)', paddingTop:10}}>
              <div style={{fontSize:10, fontWeight:700, letterSpacing:'.12em', color:'rgba(255,255,255,.4)'}}>{r[0]}</div>
              <div style={{fontSize:14, fontWeight:600, marginTop:3}}>{r[1]}</div>
            </div>
          ))}
        </div>

        <div style={{position:'relative', marginTop:18, paddingTop:14, borderTop:'1px solid rgba(255,255,255,.08)',
          display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div style={{fontSize:11, color:'rgba(255,255,255,.5)'}}>Sold &amp; serviced by</div>
          <div style={{display:'flex', alignItems:'center', gap:6, fontSize:12, fontWeight:600}}>
            <span style={{width:18, height:18, borderRadius:4, background:'var(--orange)',
              display:'grid', placeItems:'center', fontSize:10, fontWeight:700}}>U</span>
            Unique Info Systems
          </div>
        </div>
      </div>

      {/* Floating "NEW IN RELEASE 7.0" card */}
      <div style={{
        position:'absolute', right:0, bottom:'-10%', width:'56%',
        background:'#fff', border:'1px solid var(--line)', borderRadius:14,
        padding:'16px 18px', boxShadow:'0 24px 40px -20px rgba(14,27,44,.30)', zIndex:3,
      }}>
        <div style={{display:'flex', alignItems:'center', gap:10}}>
          <div style={{width:34, height:34, borderRadius:8, background:'var(--orange-soft)',
            color:'var(--orange)', display:'grid', placeItems:'center'}}>
            <Icon name="sparkle" size={16} stroke={2}/>
          </div>
          <div style={{fontSize:11.5, fontWeight:700, letterSpacing:'.14em', color:'var(--muted)'}}>NEW IN RELEASE 7.0</div>
        </div>
        <div style={{display:'flex', flexDirection:'column', gap:8, marginTop:12}}>
          {['SmartFind — fuzzy search', 'PrimeBanking Payments', 'Auto Backup', 'Connected GST + IMS'].map((t,i)=>(
            <div key={i} style={{display:'flex', alignItems:'center', gap:8, fontSize:12.5}}>
              <span style={{width:14, height:14, borderRadius:'50%', background:'var(--teal-soft)',
                color:'var(--teal)', display:'grid', placeItems:'center'}}>
                <Icon name="check" size={9} stroke={3}/>
              </span>
              <span style={{fontWeight:500}}>{t}</span>
            </div>
          ))}
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

      <div className="container wave-hero" style={{position:'relative', padding:'152px 32px 120px'}}>
        <div className="wave-hero-grid" style={{display:'grid', gridTemplateColumns:'1.05fr 1fr', gap:80, alignItems:'center'}}>
          <div>
            <div style={{display:'flex', gap:10, alignItems:'center', flexWrap:'wrap'}}>
              <span className="eyebrow"><span className="dot"></span>Tally · TallyPrime Silver</span>
              <span style={{display:'inline-flex', alignItems:'center', gap:6, fontSize:12, fontWeight:600,
                color:'var(--ink-soft)', padding:'4px 10px', border:'1px solid var(--line-2)', borderRadius:999, background:'#fff'}}>
                <Icon name="shield" size={12} stroke={2}/> Certified 5-Star Tally Partner
              </span>
            </div>

            <h1 className="serif" style={{fontSize:'clamp(48px,5.6vw,80px)', lineHeight:0.98, fontWeight:600,
              margin:'24px 0 0', letterSpacing:'-0.025em'}}>
              TallyPrime <em style={{color:'var(--orange)', fontStyle:'italic', fontWeight:500}}>Silver</em>.
              <div style={{fontSize:'0.32em', fontWeight:500, color:'var(--ink-soft)', marginTop:14, fontStyle:'italic', letterSpacing:'-0.01em'}}>
                For businesses that need TallyPrime on a single PC.
              </div>
            </h1>

            <p style={{fontSize:18, lineHeight:1.6, color:'var(--ink-soft)', maxWidth:560, marginTop:24}}>
              The single-user edition of TallyPrime — perfect for proprietors, freelancers, and small offices where one person runs Tally at a time. Ships with <strong style={{color:'var(--ink)'}}>Release 7.0</strong> including SmartFind, Auto Backup, and PrimeBanking Payments.
            </p>

            <div style={{display:'flex', gap:12, marginTop:32, flexWrap:'wrap'}}>
              <a href={TALLY_BUY_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Buy Now <Icon name="arrow" size={16} stroke={2.2} className="arrow"/>
              </a>
              <Link to="/contact" className="btn btn-dark">
                <Icon name="phone" size={13} stroke={2}/> Talk to us
              </Link>
              <a href={TALLY_TRIAL_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <Icon name="download" size={15} stroke={2}/> Download trial
              </a>
            </div>

            <div style={{display:'flex', alignItems:'center', gap:24, marginTop:40, paddingTop:24,
              borderTop:'1px dashed var(--line-2)', flexWrap:'wrap'}}>
              <div>
                <div className="serif" style={{fontSize:28, fontWeight:600, lineHeight:1}}>1 user</div>
                <div style={{fontSize:11.5, color:'var(--muted)', marginTop:4, letterSpacing:'.06em', textTransform:'uppercase'}}>Single PC</div>
              </div>
              <div style={{width:1, height:36, background:'var(--line-2)'}}/>
              <div>
                <div className="serif" style={{fontSize:28, fontWeight:600, lineHeight:1}}>Release 7.0</div>
                <div style={{fontSize:11.5, color:'var(--muted)', marginTop:4, letterSpacing:'.06em', textTransform:'uppercase'}}>Latest version</div>
              </div>
              <div style={{width:1, height:36, background:'var(--line-2)'}}/>
              <div>
                <div className="serif" style={{fontSize:28, fontWeight:600, lineHeight:1}}>Lifetime</div>
                <div style={{fontSize:11.5, color:'var(--muted)', marginTop:4, letterSpacing:'.06em', textTransform:'uppercase'}}>One-time purchase</div>
              </div>
            </div>
          </div>

          <div style={{display:'flex', justifyContent:'flex-end'}}><LicenseCard/></div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// PlanCard — single Lifetime pricing card. "+18% GST" sub-text
// dropped per content reconciliation; replaced with a footnote
// below the card.
// ============================================================

function PlanCard() {
  const feats = [
    'Lifetime license — yours to keep',
    'Includes 1-year TSS',
    'Free expert assistance from local Jaipur team',
    'Zero-cost EMI available',
    'Free installation, activation and migration',
    'Switch from Silver to Gold anytime — pay the difference',
  ];
  return (
    <div style={{position:'relative', background:'var(--ink)', color:'#fff',
      border:'1px solid var(--ink)', borderRadius:18, padding:'30px 26px',
      display:'flex', flexDirection:'column',
      boxShadow:'0 30px 60px -25px rgba(14,27,44,.4)', overflow:'hidden'}}>
      <span style={{position:'absolute', top:18, right:18, fontSize:10, fontWeight:700, letterSpacing:'.14em',
        padding:'5px 9px', borderRadius:999, background:'var(--orange)', color:'#fff'}}>BEST ROI</span>

      <div style={{fontSize:11, fontWeight:700, letterSpacing:'.16em', color:'rgba(255,255,255,.5)'}}>LIFETIME LICENSE</div>
      <div style={{display:'flex', alignItems:'baseline', gap:10, marginTop:12}}>
        <div className="serif" style={{fontSize:42, fontWeight:600, lineHeight:1, letterSpacing:'-0.02em'}}>₹22,500</div>
      </div>
      <div style={{fontSize:13, fontWeight:600, color:'#fff', marginTop:10}}>Best long-term ROI</div>

      <div style={{fontSize:13, color:'rgba(255,255,255,.6)', marginTop:14, lineHeight:1.5,
        paddingTop:14, borderTop:'1px solid rgba(255,255,255,.08)'}}>
        One-time purchase. Renew TSS annually to keep connected features active.
      </div>

      <ul style={{listStyle:'none', padding:0, margin:'18px 0 0', display:'flex', flexDirection:'column', gap:11, flex:1}}>
        {feats.map((f,i)=>(
          <li key={i} style={{display:'flex', alignItems:'flex-start', gap:9, fontSize:13.5, color:'rgba(255,255,255,.85)'}}>
            <span style={{width:16, height:16, borderRadius:'50%', background:'rgba(255,255,255,.10)',
              color:'#fff', display:'grid', placeItems:'center', flexShrink:0, marginTop:2}}>
              <Icon name="check" size={9} stroke={2.5}/>
            </span>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <a href={TALLY_BUY_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary"
         style={{marginTop:22, width:'100%', justifyContent:'center'}}>
        Buy Now <Icon name="arrow" size={15} stroke={2.2} className="arrow"/>
      </a>
    </div>
  );
}

// ============================================================
// Pricing — single Lifetime card on right + sticky kicker/lede/
// 2 info chips on left. "EMI & GST" info chip dropped per
// content reconciliation; "All prices exclude 18% GST" shown
// as a footnote below the card.
// ============================================================

function Pricing() {
  return (
    <section style={{background:'#fff', padding:'104px 0', borderTop:'1px solid var(--line)', borderBottom:'1px solid var(--line)'}}>
      <div className="container">
        <div className="wave-split" style={{display:'grid', gridTemplateColumns:'1fr 1.1fr', gap:64, alignItems:'center'}}>
          <div>
            <div className="section-kicker">One plan. One price.</div>
            <h2 className="section-title serif">Own TallyPrime Silver for life.</h2>
            <p className="section-lede" style={{marginTop:20}}>
              One-time purchase, single-PC use, full TallyPrime — no features gated, no recurring rental. Renew TSS annually to keep connected features (GST, banking, e-invoice) active.
            </p>
            <div style={{marginTop:32, display:'flex', flexDirection:'column', gap:14}}>
              {[
                ['handshake','Free installation',     'Activation, data setup and migration handled by us.'],
                ['shield',   'Switch to Gold anytime','Outgrew single-user? Upgrade and pay only the difference.'],
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
          <div style={{maxWidth:480, margin:'0 0 0 auto', width:'100%'}}>
            <PlanCard/>
            <div style={{fontSize:12, color:'var(--muted)', marginTop:14, textAlign:'center'}}>
              All prices exclude 18% GST.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Features — 4-card grid. Section title and lede kept verbatim
// from design (all factually true and consistent with products.js).
// ============================================================

const featureGroups = [
  { ic:'sparkle', tone:'orange', title:'Release 7.0 highlights', items:[
    ['SmartFind',             'Fuzzy search across all loaded companies'],
    ['PrimeBanking Payments', 'Online payments with real-time status'],
    ['Auto Backup',           'Configurable, scheduled, automatic'],
  ]},
  { ic:'file', tone:'teal', title:'Connected compliance', items:[
    ['Connected GST',         'GSTR-1 / 3B filing, 2A / 2B auto-reconciliation'],
    ['e-Invoice & e-Way Bill','Generation inside Tally'],
    ['IMS',                   'Invoice Management with ITC reduction support'],
  ]},
  { ic:'ledger', tone:'paper', title:'Banking & data', items:[
    ['Connected Banking',       'Axis, SBI, Kotak (ICICI reconciliation only)'],
    ['TallyDrive cloud backup', '1 GB free with active TSS'],
    ['1 free TVU pack',         'For secure virtual access'],
  ]},
  { ic:'user', tone:'ink', title:'Single-user edition', items:[
    ['Single user, single-PC', 'Concurrent access by one person'],
    ['All TallyPrime features','No capability gating by plan'],
    ['Free expert assistance', 'From your local Jaipur partner'],
  ]},
];

function Features() {
  return (
    <section className="pad-section" style={{background:'var(--bg)'}}>
      <div className="container">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:48, gap:32, flexWrap:'wrap'}}>
          <div>
            <div className="section-kicker">What you get with Silver</div>
            <h2 className="section-title serif">Full TallyPrime —<br/>no features held back by plan.</h2>
          </div>
          <p className="section-lede">
            Silver is the same TallyPrime engine as Gold. Capability is identical; the only difference is concurrent users. Upgrade to Gold whenever your team grows.
          </p>
        </div>
        <div className="wave-grid-4" style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:20}}>
          {featureGroups.map((g,i)=>(
            <div key={i} className="card" style={{padding:26, height:'100%', display:'flex', flexDirection:'column'}}>
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
// GoldStrip — kept; cross-sell to /products/gold (real route).
// CTA wired as <Link to="/products/gold"> (was href="#").
// ============================================================

function GoldStrip() {
  return (
    <section style={{padding:'56px 0', background:'var(--paper)', borderTop:'1px solid var(--line-2)', borderBottom:'1px solid var(--line-2)'}}>
      <div className="container">
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:32, flexWrap:'wrap'}}>
          <div style={{display:'flex', alignItems:'center', gap:18}}>
            <div style={{width:56, height:56, borderRadius:14,
              background:'linear-gradient(135deg, #E1BB4F 0%, #B0832F 100%)',
              color:'#fff', display:'grid', placeItems:'center',
              fontFamily:"'Fraunces',serif", fontSize:24, fontWeight:700,
              boxShadow:'0 10px 24px -10px rgba(176,131,47,.6)'}}>G</div>
            <div>
              <div style={{fontSize:11.5, fontWeight:700, letterSpacing:'.14em', color:'var(--orange)'}}>OUTGROWN SILVER?</div>
              <div className="serif" style={{fontSize:24, fontWeight:600, marginTop:4, letterSpacing:'-0.015em'}}>
                Need TallyPrime on multiple PCs at once? See Gold.
              </div>
              <div style={{fontSize:14, color:'var(--ink-soft)', marginTop:4, maxWidth:560}}>
                Networked, multi-user edition for offices where many people work in Tally simultaneously. Upgrade your Silver license — pay only the difference.
              </div>
            </div>
          </div>
          <Link to="/products/gold" className="btn btn-dark">
            See TallyPrime Gold <Icon name="arrow" size={15} stroke={2.2} className="arrow"/>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FinalCTA — design's 2-column layout kept. Buy on Tally.com →
// tally.com (new tab); phone → tel: link to +91 98290 06111;
// right-side "WHY BUY THROUGH US" card kept verbatim.
// ============================================================

function FinalCTA() {
  return (
    <section className="pad-section">
      <div className="container">
        <div style={{position:'relative', overflow:'hidden', background:'var(--ink)', borderRadius:24, padding:'72px 64px',
          display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:48, alignItems:'center'}} className="wave-finalcta">
          {/* decorative orange glow */}
          <div style={{position:'absolute', right:-100, top:-100, width:400, height:400, borderRadius:'50%',
            background:'radial-gradient(circle, rgba(225,83,11,.25), transparent 60%)'}}/>

          <div style={{position:'relative'}}>
            <div className="eyebrow" style={{background:'rgba(255,255,255,.08)', borderColor:'rgba(255,255,255,.12)', color:'#fff'}}>
              <span className="dot" style={{background:'var(--orange)'}}></span>Ready to get started?
            </div>
            <h2 className="serif" style={{fontSize:52, lineHeight:1.05, fontWeight:600, color:'#fff', margin:'20px 0 16px', letterSpacing:'-0.02em'}}>
              Talk to us about the right edition for your business.
            </h2>
            <p style={{fontSize:17, color:'rgba(255,255,255,.7)', maxWidth:480, lineHeight:1.6, margin:0}}>
              We've been certified by Tally Solutions Pvt. Ltd. for over a decade. Get the right plan, free installation, and local support — or head straight to Tally.com to buy.
            </p>
            <div style={{display:'flex', gap:12, marginTop:32, flexWrap:'wrap'}}>
              <a href={TALLY_BUY_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Buy on Tally.com <Icon name="arrow" size={16} stroke={2.2} className="arrow"/>
              </a>
              <a href={`tel:${PHONE_TEL}`} className="btn"
                 style={{background:'rgba(255,255,255,.08)', color:'#fff', border:'1px solid rgba(255,255,255,.15)'}}>
                <Icon name="phone" size={14} stroke={2}/> {PHONE_DISPLAY}
              </a>
            </div>
          </div>
          <div style={{position:'relative'}}>
            <div style={{background:'rgba(255,255,255,.06)', border:'1px solid rgba(255,255,255,.10)', borderRadius:18, padding:24}}>
              <div style={{fontSize:11.5, fontWeight:700, letterSpacing:'.14em', color:'rgba(255,255,255,.5)'}}>WHY BUY THROUGH US</div>
              <div style={{display:'flex', flexDirection:'column', gap:14, marginTop:16}}>
                {[
                  ['5-Star Tally Partner','Certified by Tally Solutions Pvt. Ltd.'],
                  ['Free installation',  'Activation and migration handled by us'],
                  ['Local Jaipur support','Same team for SoftTrade and Tally — one number'],
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
// SilverPage — page-level composition.
// ============================================================

export default function SilverPage() {
  return (
    <div className="design-page">
      <Hero/>
      <Pricing/>
      <Features/>
      <GoldStrip/>
      <FinalCTA/>
    </div>
  );
}
