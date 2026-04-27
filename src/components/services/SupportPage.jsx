// src/components/services/SupportPage.jsx
//
// Tally Support Services (AMC) page — Wave 3 redesign.
// Route: /services/support
//
// This is the first real implementation of /services/support — until
// now the route used a placeholder makeSub component. There is no
// products.js entry for "support"; the design content (with the
// content-reconciliation edits below) is the source of truth.
//
// Composed sections (7):
//   - Hero (with TicketVisual + WhatsApp plan-picker card + 4 trust chips)
//   - AMCPricing (4 tier cards: Starter / Basic / Plus POPULAR / Premium —
//     all "Contact for pricing")
//   - WithYou (2-column copy block; GST calculator sentence dropped)
//   - HowItWorks (4-step horizontal flow)
//   - Benefits (9-card grid in 3 columns)
//   - Related (3 cross-link cards: TSS Renewal, Training, Customisation)
//   - FinalCTA (2-column dark with QUICK DECISION FAQs right card)
//
// FAQ and SalientFeatures sections from the design are dropped.
//
// Edits from the design (per content reconciliation):
//   - Hero: top inline padding 80→152px (RouterNav clearance)
//   - Hero: breadcrumb dropped (we have nav)
//   - Hero descriptor pill: "5-Star Tally Partner · 20+ years" softened
//     to "5-Star Tally Partner" (Q2 — drop year claim entirely)
//   - WithYou: opening clause "Twenty years as a..." rewritten — drop
//     year claim, lead with the proof point
//   - WithYou: second paragraph closing sentence about "free GST
//     calculator" dropped entirely (Q5 — fake link, dropping with the
//     surrounding text since it's just an aside)
//   - AMCPricing: design's prices (₹12,000 / ₹22,000 / ₹32,000 /
//     ₹48,000) replaced with "Contact for pricing" per Q1 (mirrors
//     Mandi/Brokwin/Coldwin pattern). Tier names, sub-labels,
//     taglines and bullet lists kept verbatim.
//   - AMCPricing: section lede "Prices below are GST-extra" softened
//     to a generic note about pricing on request
//   - AMCPricing "Choose {tier}" CTAs wired as <Link to="/contact">
//   - Below-table CTA phone link uses tel:+919829006111 (was already
//     correct in design — confirm preserved)
//   - Hero plan-picker WhatsApp button → wa.me/919829006111 (new tab)
//   - Hero "Request a Quote" → <Link to="/contact">
//   - Hero phone button → tel:+919829006111
//   - Related: 3 cross-link cards rewired to real React Router routes
//     (/services/tss-renewal, /services/training, /services/customization
//     — was design's fake URLs)
//   - FinalCTA "Request a Quote" → <Link to="/contact">; phone → tel:
//   - FAQ section dropped (Q3)
//   - SalientFeatures section dropped (Q3)
//   - <React.Fragment> not used; clean ES module imports
//
// Decorative fixture data preserved verbatim (visual mocks, not
// customer-facing claims):
//   - "TICKET #UI-48217 · Plus AMC · Bhilwara"
//   - Timeline times (10:42 / 10:54 / 11:21 / 11:30)
//   - "AMC LOG · Q3 2026 · 14 tickets · 14 closed · 3/18 visits"
//   - "RESPONSE SLA · 15 min avg." floating card
//   Same convention as Mandi ledger book, Brokwin sauda, etc.

import { Link } from 'react-router-dom';
import { Icon, IconChip } from '../design/Icon';

const PHONE_DISPLAY = '+91 98290 06111';
const PHONE_TEL     = '+919829006111';
const WHATSAPP_URL  = 'https://wa.me/919829006111';

// ============================================================
// TicketVisual — decorative support ticket showing a resolved
// GSTR-1 issue with timeline; floating Response SLA card behind
// (rotated −3°) and dark AMC log card front-right. Ported verbatim
// from design/support-page.jsx.
// ============================================================

function TicketVisual() {
  return (
    <div style={{position:'relative', width:'100%', maxWidth:540}}>
      {/* Behind: response-time SLA card */}
      <div style={{
        position:'absolute', left:'-4%', top:'-4%', width:'52%',
        background:'#fff', border:'1px solid var(--line)', borderRadius:14,
        padding:'14px 16px', boxShadow:'0 24px 40px -28px rgba(14,27,44,.20)',
        transform:'rotate(-3deg)', zIndex:1,
      }}>
        <div style={{fontSize:10, fontWeight:700, letterSpacing:'.16em', color:'var(--muted)'}}>RESPONSE SLA</div>
        <div style={{display:'flex', alignItems:'baseline', gap:6, marginTop:8}}>
          <div className="serif" style={{fontSize:34, fontWeight:600, lineHeight:1, color:'var(--teal)'}}>15</div>
          <div style={{fontSize:13, color:'var(--ink-soft)'}}>min avg.</div>
        </div>
        <div style={{fontSize:11.5, color:'var(--ink-soft)', marginTop:6, lineHeight:1.5}}>
          Phone or remote pickup, business hours. On-site by next working day.
        </div>
      </div>

      {/* Main: Support ticket */}
      <div style={{
        position:'relative', zIndex:2, width:'94%', marginLeft:'auto',
        background:'#fff', borderRadius:16, overflow:'hidden',
        boxShadow:'0 30px 60px -22px rgba(14,27,44,.30)',
        border:'1px solid var(--line)',
      }}>
        <div style={{padding:'14px 20px', borderBottom:'1px solid var(--line)',
          display:'flex', justifyContent:'space-between', alignItems:'center', background:'var(--paper)'}}>
          <div style={{display:'flex', alignItems:'center', gap:10}}>
            <span style={{width:28, height:28, borderRadius:8, background:'var(--ink)', color:'#fff',
              display:'grid', placeItems:'center', fontSize:11, fontWeight:700}} className="mono">U</span>
            <div>
              <div className="mono" style={{fontSize:11, fontWeight:600, color:'var(--ink-soft)'}}>TICKET #UI-48217</div>
              <div style={{fontSize:11, color:'var(--muted)', marginTop:1}}>Plus AMC · Bhilwara</div>
            </div>
          </div>
          <span style={{fontSize:10.5, fontWeight:700, color:'var(--teal)', background:'var(--teal-soft)', padding:'4px 10px', borderRadius:999, letterSpacing:'.06em'}}>● RESOLVED</span>
        </div>

        <div style={{padding:'22px 22px 4px'}}>
          <div className="serif" style={{fontSize:20, fontWeight:600, letterSpacing:'-0.01em'}}>
            GSTR-1 export mismatch — HSN totals
          </div>
          <div style={{fontSize:13, color:'var(--ink-soft)', marginTop:6, lineHeight:1.55}}>
            Two HSN slabs not summing on Q3 export. Resolved via remote session, data rectified, future-prevention rule added.
          </div>
        </div>

        {/* Timeline */}
        <div style={{padding:'18px 22px 22px'}}>
          {[
            ['10:42','Call received','Phone support · Priyam'],
            ['10:54','Remote session','AnyDesk · diagnosed in 8 min'],
            ['11:21','Resolved','Data rectified, GSTR re-exported'],
            ['11:30','Follow-up','Confirmation email + AMC log'],
          ].map(([time,event,detail],i,arr)=>(
            <div key={i} style={{display:'grid', gridTemplateColumns:'52px 18px 1fr', gap:12, alignItems:'flex-start',
              paddingBottom: i===arr.length-1?0:14}}>
              <div className="mono" style={{fontSize:11.5, fontWeight:600, color:'var(--ink-soft)', paddingTop:1}}>{time}</div>
              <div style={{position:'relative', height:'100%'}}>
                <span style={{position:'absolute', top:4, left:4, width:10, height:10, borderRadius:'50%',
                  background: i===arr.length-1?'var(--teal)':'var(--orange)',
                  boxShadow: '0 0 0 3px '+(i===arr.length-1?'var(--teal-soft)':'var(--orange-soft)')}}/>
                {i!==arr.length-1 && <span style={{position:'absolute', top:18, left:8, bottom:-14, width:2, background:'var(--line-2)'}}/>}
              </div>
              <div>
                <div style={{fontSize:13.5, fontWeight:600}}>{event}</div>
                <div style={{fontSize:12, color:'var(--ink-soft)', marginTop:2}}>{detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating: AMC log entry */}
      <div style={{
        position:'absolute', right:'-2%', bottom:'-10%', width:'48%', zIndex:3,
        background:'var(--ink)', color:'#fff', borderRadius:14,
        padding:'14px 16px', boxShadow:'0 24px 40px -20px rgba(14,27,44,.40)',
      }}>
        <div style={{fontSize:10, fontWeight:700, letterSpacing:'.14em', color:'rgba(255,255,255,.5)'}}>AMC LOG · Q3 2026</div>
        <div style={{display:'flex', alignItems:'baseline', gap:6, marginTop:8}}>
          <div className="serif" style={{fontSize:30, fontWeight:600, lineHeight:1}}>14</div>
          <div style={{fontSize:12.5, color:'rgba(255,255,255,.65)'}}>tickets · 14 closed</div>
        </div>
        <div style={{marginTop:10, paddingTop:10, borderTop:'1px solid rgba(255,255,255,.08)',
          display:'flex', justifyContent:'space-between', fontSize:11}}>
          <span style={{color:'rgba(255,255,255,.55)'}}>On-site visits used</span>
          <span style={{fontWeight:700}}>3 / 18</span>
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
        <div className="wave-hero-grid" style={{display:'grid', gridTemplateColumns:'1.05fr 1fr', gap:60, alignItems:'center'}}>
          <div>
            <div style={{display:'flex', gap:10, alignItems:'center', flexWrap:'wrap'}}>
              <span className="eyebrow"><span className="dot"></span>Services · AMC & Support</span>
              <span style={{display:'inline-flex', alignItems:'center', gap:6, fontSize:12, fontWeight:600,
                color:'var(--ink-soft)', padding:'4px 10px', border:'1px solid var(--line-2)', borderRadius:999, background:'#fff'}}>
                <Icon name="shield" size={12} stroke={2}/> 5-Star Tally Partner
              </span>
            </div>

            <h1 className="serif" style={{fontSize:'clamp(46px,5.4vw,76px)', lineHeight:0.98, fontWeight:600,
              margin:'24px 0 0', letterSpacing:'-0.025em'}}>
              Tally <em style={{color:'var(--orange)', fontStyle:'italic', fontWeight:500}}>Support</em>.
              <div style={{fontSize:'0.32em', fontWeight:500, color:'var(--ink-soft)', marginTop:14, fontStyle:'italic', letterSpacing:'-0.01em'}}>
                AMC plans with priority response, on-site visits, and someone who picks up the phone.
              </div>
            </h1>

            {/* Quick decision helper */}
            <div style={{marginTop:28, padding:'18px 20px', background:'#fff', border:'1px solid var(--line)', borderRadius:14,
              boxShadow:'0 10px 24px -16px rgba(14,27,44,.15)', display:'flex', alignItems:'center', gap:18, flexWrap:'wrap'}}>
              <div style={{flex:'1 1 280px'}}>
                <div style={{fontSize:11.5, fontWeight:700, letterSpacing:'.14em', color:'var(--orange)', marginBottom:4}}>10-MIN PLAN PICKER</div>
                <div style={{fontSize:14, color:'var(--ink-soft)', lineHeight:1.5}}>
                  Tell us users, branches, and workflow — we'll recommend the right plan in ten minutes.
                </div>
              </div>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn"
                 style={{background:'#25D366', color:'#fff', border:'1px solid #1FB055'}}>
                <Icon name="wa" size={14} stroke={2}/> WhatsApp us
              </a>
            </div>

            <div style={{display:'flex', gap:12, marginTop:24, flexWrap:'wrap'}}>
              <Link to="/contact" className="btn btn-primary">
                Request a Quote <Icon name="arrow" size={16} stroke={2.2} className="arrow"/>
              </Link>
              <a href={`tel:${PHONE_TEL}`} className="btn btn-dark">
                <Icon name="phone" size={13} stroke={2}/> {PHONE_DISPLAY}
              </a>
            </div>

            {/* Top feature strip */}
            <div className="wave-grid-4" style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10, marginTop:36}}>
              {[
                ['grid','AMC Plans','Starter → Premium'],
                ['sync','Remote','Instant assistance'],
                ['truck','On-site','Hands-on visits'],
                ['zap','Fast','Minimal disruption'],
              ].map(([ic,h,t],i)=>(
                <div key={i} style={{padding:'12px 14px', background:'#fff', border:'1px solid var(--line-2)', borderRadius:12}}>
                  <Icon name={ic} size={16} stroke={2} style={{color:'var(--orange)'}}/>
                  <div style={{fontSize:13, fontWeight:600, marginTop:8}}>{h}</div>
                  <div style={{fontSize:11.5, color:'var(--ink-soft)', marginTop:1}}>{t}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{display:'flex', justifyContent:'center'}}><TicketVisual/></div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// AMCPricing — 4 tier cards (Starter / Basic / Plus POPULAR /
// Premium). Per Q1: prices replaced with "Contact for pricing".
// Tier names, sub-labels, taglines, bullets ported verbatim.
// "Choose {tier}" CTAs wired as <Link to="/contact">.
// ============================================================

function AMCPricing() {
  const allInclude = ['Phone & Remote Support','License Support','Data Rectification','Accounting Support','GST Support','Remote Access Support'];
  const tiers = [
    { name:'Starter', sub:'Remote AMC', tagline:'Small businesses · phone + remote only',
      bullets:['Phone & remote support','License & GST support','— No on-site visits','— No training','— No E-Invoice / E-Way Bill setup'],
    },
    { name:'Basic', sub:'AMC', tagline:'On-site + compliance',
      bullets:['Everything in Starter','4 hrs training','Up to 8 on-site visits','E-Invoice & E-Way Bill setup','Quarterly compliance check'],
    },
    { name:'Plus', sub:'AMC', popular:true, tagline:'Growing businesses',
      bullets:['Everything in Basic','8 hrs training','Up to 18 on-site visits','Sync & .NET remote','Priority phone queue'],
    },
    { name:'Premium', sub:'AMC', tagline:'Enterprise · priority',
      bullets:['Everything in Plus','16 hrs training','Unlimited on-site visits','Dedicated account manager','Quarterly business review'],
    },
  ];
  return (
    <section className="pad-section" style={{background:'var(--paper)', borderTop:'1px solid var(--line-2)', borderBottom:'1px solid var(--line-2)'}}>
      <div className="container">
        <div style={{textAlign:'center', maxWidth:680, margin:'0 auto 40px'}}>
          <div className="section-kicker">AMC Plans</div>
          <h2 className="section-title serif">Four tiers.<br/>Pick by your team size.</h2>
          <p className="section-lede" style={{margin:'18px auto 0'}}>
            Annual maintenance contracts that include licence support, data rectification, GST help, and on-site visits where the plan covers it. Prices on request — we tailor to your team size and workflow.
          </p>
        </div>

        {/* All plans include */}
        <div style={{margin:'0 auto 36px', maxWidth:980, padding:'18px 24px', background:'#fff',
          border:'1px solid var(--line-2)', borderRadius:14, display:'flex', alignItems:'center',
          gap:24, flexWrap:'wrap', justifyContent:'center'}}>
          <span style={{fontSize:11, fontWeight:700, letterSpacing:'.14em', color:'var(--muted)', flexShrink:0}}>ALL PLANS INCLUDE</span>
          {allInclude.map((f,i)=>(
            <span key={i} style={{display:'inline-flex', alignItems:'center', gap:6, fontSize:13, color:'var(--ink-soft)'}}>
              <Icon name="check" size={11} stroke={2.5} style={{color:'var(--teal)'}}/>
              {f}
            </span>
          ))}
        </div>

        {/* Pricing grid */}
        <div className="wave-grid-4" style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:18}}>
          {tiers.map((tier,i)=>{
            const popular = tier.popular;
            return (
              <div key={i} style={{position:'relative', background: popular?'var(--ink)':'#fff', color: popular?'#fff':'var(--ink)',
                border: popular?'1px solid var(--ink)':'1px solid var(--line-2)', borderRadius:18, padding:'30px 26px',
                boxShadow: popular?'0 24px 50px -20px rgba(14,27,44,.45)':'0 1px 0 rgba(14,27,44,.02)',
                transform: popular?'translateY(-8px)':'none'}}>
                {popular && (
                  <div style={{position:'absolute', top:-12, left:'50%', transform:'translateX(-50%)',
                    fontSize:10.5, fontWeight:700, letterSpacing:'.14em',
                    background:'var(--orange)', color:'#fff', padding:'5px 12px', borderRadius:999}}>
                    MOST POPULAR
                  </div>
                )}
                <div style={{fontSize:11, fontWeight:700, letterSpacing:'.14em', color: popular?'rgba(255,255,255,.55)':'var(--muted)'}}>
                  {tier.sub.toUpperCase()}
                </div>
                <div className="serif" style={{fontSize:28, fontWeight:600, marginTop:6, letterSpacing:'-0.01em'}}>
                  {tier.name}
                </div>
                <div style={{fontSize:12.5, color: popular?'rgba(255,255,255,.6)':'var(--ink-soft)', marginTop:4}}>
                  {tier.tagline}
                </div>
                <div style={{display:'flex', alignItems:'baseline', gap:6, marginTop:18, paddingTop:18,
                  borderTop:'1px '+(popular?'solid rgba(255,255,255,.10)':'dashed var(--line-2)')}}>
                  <span className="serif" style={{fontSize:24, fontWeight:600, lineHeight:1.1, letterSpacing:'-0.015em'}}>Contact</span>
                  <span style={{fontSize:13, color: popular?'rgba(255,255,255,.55)':'var(--muted)'}}>for pricing</span>
                </div>
                <ul style={{listStyle:'none', padding:0, margin:'20px 0 0', display:'flex', flexDirection:'column', gap:8}}>
                  {tier.bullets.map((b,j)=>{
                    const dim = b.startsWith('—');
                    return (
                      <li key={j} style={{display:'flex', alignItems:'flex-start', gap:8, fontSize:13,
                        color: dim ? (popular?'rgba(255,255,255,.4)':'var(--muted)') : (popular?'rgba(255,255,255,.85)':'var(--ink-soft)')}}>
                        {dim ? (
                          <span style={{width:14, height:14, marginTop:2, flexShrink:0,
                            display:'grid', placeItems:'center', color:'inherit'}}>—</span>
                        ) : (
                          <span style={{width:14, height:14, borderRadius:'50%',
                            background: popular?'rgba(255,255,255,.12)':'var(--teal-soft)',
                            color: popular?'#fff':'var(--teal)',
                            display:'grid', placeItems:'center', flexShrink:0, marginTop:2}}>
                            <Icon name="check" size={8} stroke={2.6}/>
                          </span>
                        )}
                        <span>{dim ? b.replace(/^—\s*/,'') : b}</span>
                      </li>
                    );
                  })}
                </ul>
                <Link to="/contact" className="btn" style={{marginTop:24, width:'100%', justifyContent:'center',
                  background: popular?'var(--orange)':'var(--ink)', color:'#fff',
                  border: popular?'1px solid var(--orange)':'1px solid var(--ink)'}}>
                  Choose {tier.name} <Icon name="arrow" size={14} stroke={2.2} className="arrow"/>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Below table CTA */}
        <div style={{textAlign:'center', marginTop:32, fontSize:14.5, color:'var(--ink-soft)'}}>
          Not sure which plan is right? <a href={`tel:${PHONE_TEL}`} style={{color:'var(--orange)', fontWeight:600, textDecoration:'none'}}>Call {PHONE_DISPLAY}</a> for a personalised recommendation.
        </div>
      </div>
    </section>
  );
}

// ============================================================
// WithYou — 2-column copy block. Year claim removed; GST
// calculator sentence dropped (Q5).
// ============================================================

function WithYou() {
  return (
    <section className="pad-section" style={{background:'#fff'}}>
      <div className="container">
        <div className="wave-split" style={{display:'grid', gridTemplateColumns:'1fr 1.3fr', gap:64, alignItems:'center'}}>
          <div>
            <div className="section-kicker">Why our AMC</div>
            <h2 className="section-title serif">With you, for<br/>every entry.</h2>
          </div>
          <div>
            <p style={{fontSize:17, lineHeight:1.7, color:'var(--ink-soft)', margin:0}}>
              As a <strong style={{color:'var(--ink)'}}>5-Star Certified Premier Tally Partner</strong>, we've seen every kind of mid-month panic — a corrupted .tsf, a missed TSS renewal, a GSTR that won't tally. Our AMC is built to prevent the panic in the first place: scheduled health-checks, remote troubleshooting in minutes, and on-site visits where they're earned.
            </p>
            <p style={{fontSize:17, lineHeight:1.7, color:'var(--ink-soft)', marginTop:18}}>
              Keep your <strong style={{color:'var(--ink)'}}>TSS subscription renewed</strong> — it's what unlocks remote access, e-invoicing, and the latest compliance updates.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// HowItWorks — 4-step horizontal flow on warm paper. Last
// circle is orange (Follow-up = the destination).
// ============================================================

function HowItWorks() {
  const steps = [
    ['01','Contact',  'Call, email, or WhatsApp with your Tally issue.'],
    ['02','Diagnose', 'Experts diagnose remotely or on-site within SLA.'],
    ['03','Resolve',  'Fix with minimal downtime — books stay open.'],
    ['04','Follow-up','Confirm smooth running. Logged in your AMC ledger.'],
  ];
  return (
    <section className="pad-section" style={{background:'var(--paper)', borderTop:'1px solid var(--line-2)', borderBottom:'1px solid var(--line-2)'}}>
      <div className="container">
        <div style={{textAlign:'center', maxWidth:680, margin:'0 auto 56px'}}>
          <div className="section-kicker">How it works</div>
          <h2 className="section-title serif">From phone call<br/>to resolved — in four steps.</h2>
        </div>
        <div className="wave-grid-4" style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:20, position:'relative'}}>
          <div style={{position:'absolute', top:36, left:'10%', right:'10%', height:2,
            background:'repeating-linear-gradient(90deg, var(--line-2) 0 8px, transparent 8px 14px)', zIndex:0}}/>
          {steps.map(([n,h,t],i)=>(
            <div key={i} style={{textAlign:'center', position:'relative', zIndex:1}}>
              <div style={{margin:'0 auto', width:72, height:72, borderRadius:'50%',
                background: i===steps.length-1?'var(--orange)':'var(--ink)', color:'#fff',
                display:'grid', placeItems:'center', fontFamily:"'Fraunces',serif", fontSize:24, fontWeight:600,
                border:'4px solid var(--paper)', boxShadow:'0 12px 24px -10px rgba(14,27,44,.3)'}}>{n}</div>
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
// Benefits — 9-card grid (3 columns) on white. Ported verbatim.
// ============================================================

function Benefits() {
  const items = [
    ['download', 'Re-installation',   'Fresh setup on a new machine, with all licences re-activated.'],
    ['sync',     'Remote support',    'Instant AnyDesk sessions during business hours.'],
    ['grid',     'Re-configuration',  'Re-do company masters, voucher classes, and print configs.'],
    ['shield',   'Backup & restore',  'Scheduled backups; restore from any prior point.'],
    ['zap',      'Emergency rescue',  'When Tally won\'t open at month-end — we triage first.'],
    ['lock',     'User permissions',  'Set up roles, security levels, and access controls.'],
    ['file',     'Custom modules',    'Configure TDL add-ons we\'ve built or others have.'],
    ['bell',     'Round-the-year',    'Year-long coverage, not pay-per-call surprises.'],
    ['msg',      'Product news',      'Updates, tips, and version transitions delivered to you.'],
  ];
  return (
    <section className="pad-section" style={{background:'#fff'}}>
      <div className="container">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:48, gap:32, flexWrap:'wrap'}}>
          <div>
            <div className="section-kicker">Benefits</div>
            <h2 className="section-title serif">Nine ways the AMC<br/>pays for itself.</h2>
          </div>
          <p className="section-lede">
            Each AMC tier covers the work below. Plus and Premium add training hours and on-site visits.
          </p>
        </div>
        <div className="wave-grid-3" style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:18}}>
          {items.map(([ic,h,t],i)=>(
            <div key={i} style={{padding:24, background:'var(--paper)', border:'1px solid var(--line-2)', borderRadius:14}}>
              <div style={{display:'flex', alignItems:'center', gap:14}}>
                <IconChip name={ic} tone={i%3===0?'orange':i%3===1?'teal':'paper'} size={42}/>
                <div className="serif" style={{fontSize:18, fontWeight:600, letterSpacing:'-0.01em'}}>{h}</div>
              </div>
              <div style={{fontSize:13.5, color:'var(--ink-soft)', marginTop:12, lineHeight:1.55}}>{t}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Related — 3 cross-link cards. Real React Router routes used
// (was design's fake URLs).
// ============================================================

function Related() {
  const cards = [
    ['sync',  'TSS Renewal',          'Keep remote access, e-invoicing, and updates active.', '/services/tss-renewal'],
    ['users', 'Corporate Training',   'Group training for finance and accounts teams.',       '/services/training'],
    ['file',  'Tally Customisation',  'Custom vouchers, reports, and modules built in TDL.',  '/services/customization'],
  ];
  return (
    <section className="pad-section" style={{background:'var(--paper)', borderTop:'1px solid var(--line-2)', borderBottom:'1px solid var(--line-2)'}}>
      <div className="container">
        <div style={{textAlign:'center', maxWidth:680, margin:'0 auto 40px'}}>
          <div className="section-kicker">Related services</div>
          <h2 className="section-title serif">Pairs well with —</h2>
        </div>
        <div className="wave-grid-3" style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:18}}>
          {cards.map(([ic,h,t,to],i)=>(
            <Link key={i} to={to} style={{textDecoration:'none', color:'inherit'}}>
              <div className="card" style={{padding:28, height:'100%', cursor:'pointer'}}>
                <IconChip name={ic} tone={i===0?'orange':i===1?'teal':'paper'} size={48}/>
                <h3 className="serif" style={{fontSize:21, fontWeight:600, margin:'18px 0 0', letterSpacing:'-0.01em'}}>{h}</h3>
                <p style={{fontSize:13.5, color:'var(--ink-soft)', marginTop:8, lineHeight:1.55}}>{t}</p>
                <div style={{marginTop:16, fontSize:13, fontWeight:600, color:'var(--orange)', display:'inline-flex', alignItems:'center', gap:6}}>
                  Learn more <Icon name="arrow" size={13} stroke={2.2}/>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FinalCTA — 2-column dark with QUICK DECISION FAQs right card.
// ============================================================

function FinalCTA() {
  const quick = [
    ['Single user, concurrent, or server?', 'Single-user is fine up to ~3 staff. Concurrent (Gold) for 4–10. Server when you need 24×7 uptime or branches.'],
    ['TSS renewal vs AMC support?',         'Renew TSS first — without it, e-invoicing and remote access stop. AMC bundles support on top of an active TSS.'],
    ['Do you handle setup and migration?',  'Yes. Fresh installs, ERP 9 → Prime migrations, and multi-machine sync setup are all included in Basic+ plans.'],
  ];
  return (
    <section className="pad-section">
      <div className="container">
        <div style={{position:'relative', overflow:'hidden', background:'var(--ink)', borderRadius:24, padding:'64px 56px',
          display:'grid', gridTemplateColumns:'1.3fr 1fr', gap:48, alignItems:'center'}} className="wave-finalcta">
          <div style={{position:'absolute', right:-100, top:-100, width:400, height:400, borderRadius:'50%',
            background:'radial-gradient(circle, rgba(225,83,11,.25), transparent 60%)'}}/>

          <div style={{position:'relative'}}>
            <div className="eyebrow" style={{background:'rgba(255,255,255,.08)', borderColor:'rgba(255,255,255,.12)', color:'#fff'}}>
              <span className="dot" style={{background:'var(--orange)'}}></span>Free 10-minute plan picker
            </div>
            <h2 className="serif" style={{fontSize:48, lineHeight:1.05, fontWeight:600, color:'#fff', margin:'20px 0 16px', letterSpacing:'-0.02em'}}>
              Ready to get started?
            </h2>
            <p style={{fontSize:17, color:'rgba(255,255,255,.7)', maxWidth:480, lineHeight:1.6, margin:0}}>
              Share your team size and workflow — we'll recommend Starter, Basic, Plus, or Premium and send a fixed quote.
            </p>
            <div style={{display:'flex', gap:12, marginTop:32, flexWrap:'wrap'}}>
              <Link to="/contact" className="btn btn-primary">
                Request a Quote <Icon name="arrow" size={16} stroke={2.2} className="arrow"/>
              </Link>
              <a href={`tel:${PHONE_TEL}`} className="btn"
                 style={{background:'rgba(255,255,255,.08)', color:'#fff', border:'1px solid rgba(255,255,255,.15)'}}>
                <Icon name="phone" size={14} stroke={2}/> {PHONE_DISPLAY}
              </a>
            </div>
          </div>

          <div style={{position:'relative'}}>
            <div style={{background:'rgba(255,255,255,.06)', border:'1px solid rgba(255,255,255,.10)', borderRadius:18, padding:24}}>
              <div style={{fontSize:11.5, fontWeight:700, letterSpacing:'.14em', color:'rgba(255,255,255,.5)'}}>QUICK DECISION FAQs</div>
              <div style={{display:'flex', flexDirection:'column', gap:14, marginTop:16}}>
                {quick.map(([q,a],i)=>(
                  <div key={i} style={{paddingBottom:14, borderBottom: i<quick.length-1?'1px solid rgba(255,255,255,.08)':'none'}}>
                    <div style={{fontSize:13.5, fontWeight:600, color:'#fff'}}>{q}</div>
                    <div style={{fontSize:12.5, color:'rgba(255,255,255,.6)', marginTop:4, lineHeight:1.55}}>{a}</div>
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
// SupportPage — page-level composition.
// ============================================================

export default function SupportPage() {
  return (
    <div className="design-page">
      <Hero/>
      <AMCPricing/>
      <WithYou/>
      <HowItWorks/>
      <Benefits/>
      <Related/>
      <FinalCTA/>
    </div>
  );
}
