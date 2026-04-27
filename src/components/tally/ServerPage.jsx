// src/components/tally/ServerPage.jsx
//
// TallyPrime-Server product page — Wave 3 redesign.
// Cloned from GoldPage.jsx structure for visual consistency
// across the Tally licensing pages. Content from products.js.server
// plus the Mark IT Solutions reference screenshot.
//
// Composed sections:
//   - Hero (with LicenseCard visual)
//   - Pricing (single Lifetime plan card)
//   - Features (4-card grid; Server-specific content)
//   - FinalCTA (2-column dark; same shape as Silver/Gold)
//
// No cross-link strip — Server is the top of the Tally license stack.
//
// External destinations:
//   TALLY_SERVER_URL = https://tallysolutions.com/tally-prime-server/
//   TALLY_TRIAL_URL  = https://tallysolutions.com/business-software-7day-free-trial/
//   PHONE            = +91 98290 06111

import { Link } from 'react-router-dom';
import { Icon, IconChip } from '../design/Icon';

const TALLY_SERVER_URL = 'https://tallysolutions.com/tally-prime-server/';
const TALLY_TRIAL_URL  = 'https://tallysolutions.com/business-software-7day-free-trial/';
const PHONE_DISPLAY    = '+91 98290 06111';
const PHONE_TEL        = '+919829006111';

// ============================================================
// LicenseCard — decorative TallyPrime Server license-key visual.
// Same structure as Silver/Gold's, with Server-specific labels.
// "T" tile uses dark navy gradient to signal enterprise tier.
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
            <div style={{width:36, height:36, borderRadius:9,
              background:'linear-gradient(135deg, #2A3D58 0%, #16263C 100%)',
              border:'1px solid rgba(255,255,255,.12)',
              display:'grid', placeItems:'center', fontFamily:"'Fraunces',serif", fontSize:18, fontWeight:700, color:'#fff', letterSpacing:'-0.02em'}}>T</div>
            <div>
              <div style={{fontSize:11, fontWeight:700, letterSpacing:'.14em', color:'rgba(255,255,255,.5)'}}>TALLYPRIME · 7.0</div>
              <div style={{fontSize:14, fontWeight:600, marginTop:1}}>Server License</div>
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
            999 · 2486 · <span style={{color:'var(--orange)'}}>1029</span>
          </div>
        </div>

        <div style={{position:'relative', display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginTop:18}}>
          {[
            ['USERS',    '10+ concurrent'],
            ['ACCESS',   'Server-based'],
            ['TSS',      'Required'],
            ['INCLUDES', '20 free TVU packs'],
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

      {/* Floating "ENTERPRISE EDITION" card (replaces "NEW IN RELEASE 7.0"
          from Silver/Gold — Server's positioning is enterprise-grade
          architecture, not feature novelty) */}
      <div style={{
        position:'absolute', right:0, bottom:'-10%', width:'56%',
        background:'#fff', border:'1px solid var(--line)', borderRadius:14,
        padding:'16px 18px', boxShadow:'0 24px 40px -20px rgba(14,27,44,.30)', zIndex:3,
      }}>
        <div style={{display:'flex', alignItems:'center', gap:10}}>
          <div style={{width:34, height:34, borderRadius:8, background:'var(--paper-2)',
            color:'var(--ink)', display:'grid', placeItems:'center'}}>
            <Icon name="shield" size={16} stroke={2}/>
          </div>
          <div style={{fontSize:11.5, fontWeight:700, letterSpacing:'.14em', color:'var(--muted)'}}>ENTERPRISE EDITION</div>
        </div>
        <div style={{display:'flex', flexDirection:'column', gap:8, marginTop:12}}>
          {[
            'Server-based architecture',
            'No queueing on reads or writes',
            'Windows Service with monitoring',
            '20 free TVU packs included',
          ].map((t,i)=>(
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
              <span className="eyebrow"><span className="dot"></span>Tally · TallyPrime Server</span>
              <span style={{display:'inline-flex', alignItems:'center', gap:6, fontSize:12, fontWeight:600,
                color:'var(--ink-soft)', padding:'4px 10px', border:'1px solid var(--line-2)', borderRadius:999, background:'#fff'}}>
                <Icon name="shield" size={12} stroke={2}/> Certified 5-Star Tally Partner
              </span>
            </div>

            <h1 className="serif" style={{fontSize:'clamp(48px,5.6vw,80px)', lineHeight:0.98, fontWeight:600,
              margin:'24px 0 0', letterSpacing:'-0.025em'}}>
              TallyPrime <em style={{color:'var(--orange)', fontStyle:'italic', fontWeight:500}}>Server</em>.
              <div style={{fontSize:'0.32em', fontWeight:500, color:'var(--ink-soft)', marginTop:14, fontStyle:'italic', letterSpacing:'-0.01em'}}>
                Enterprise-grade architecture for 10+ concurrent users.
              </div>
            </h1>

            <p style={{fontSize:18, lineHeight:1.6, color:'var(--ink-soft)', maxWidth:560, marginTop:24}}>
              Server-based data architecture built for businesses where Gold's <strong style={{color:'var(--ink)'}}>peer-to-peer model starts to slow down</strong>. True concurrency, no queueing on reads or writes, and 20 extra TVU packs included. Works as a Windows Service with session monitoring.
            </p>

            <div style={{display:'flex', gap:12, marginTop:32, flexWrap:'wrap'}}>
              <a href={TALLY_SERVER_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
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
                <div className="serif" style={{fontSize:28, fontWeight:600, lineHeight:1}}>10+ users</div>
                <div style={{fontSize:11.5, color:'var(--muted)', marginTop:4, letterSpacing:'.06em', textTransform:'uppercase'}}>Built for</div>
              </div>
              <div style={{width:1, height:36, background:'var(--line-2)'}}/>
              <div>
                <div className="serif" style={{fontSize:28, fontWeight:600, lineHeight:1}}>Server</div>
                <div style={{fontSize:11.5, color:'var(--muted)', marginTop:4, letterSpacing:'.06em', textTransform:'uppercase'}}>Architecture</div>
              </div>
              <div style={{width:1, height:36, background:'var(--line-2)'}}/>
              <div>
                <div className="serif" style={{fontSize:28, fontWeight:600, lineHeight:1}}>20 TVU</div>
                <div style={{fontSize:11.5, color:'var(--muted)', marginTop:4, letterSpacing:'.06em', textTransform:'uppercase'}}>Free packs included</div>
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
// PlanCard — single Lifetime pricing card. 6 bullets including
// "Requires active Gold license underneath" (real product
// constraint per products.js). Sub-text below price replaces
// the generic "One-time purchase. Renew TSS annually..."
// with Server's specific dependency note.
// ============================================================

function PlanCard() {
  const feats = [
    'Perpetual license — yours to keep',
    'Server-based architecture, no queueing',
    'Includes 20 free TVU packs (stack with Gold for 30)',
    'Free expert assistance from local Jaipur team',
    'Zero-cost EMI available',
    'Requires active TallyPrime Gold license underneath',
  ];
  return (
    <div style={{position:'relative', background:'var(--ink)', color:'#fff',
      border:'1px solid var(--ink)', borderRadius:18, padding:'30px 26px',
      display:'flex', flexDirection:'column',
      boxShadow:'0 30px 60px -25px rgba(14,27,44,.4)', overflow:'hidden'}}>
      <span style={{position:'absolute', top:18, right:18, fontSize:10, fontWeight:700, letterSpacing:'.14em',
        padding:'5px 9px', borderRadius:999, background:'var(--orange)', color:'#fff'}}>ENTERPRISE</span>

      <div style={{fontSize:11, fontWeight:700, letterSpacing:'.16em', color:'rgba(255,255,255,.5)'}}>PERPETUAL LICENSE</div>
      <div style={{display:'flex', alignItems:'baseline', gap:10, marginTop:12}}>
        <div className="serif" style={{fontSize:42, fontWeight:600, lineHeight:1, letterSpacing:'-0.02em'}}>₹2,70,000</div>
      </div>
      <div style={{fontSize:13, fontWeight:600, color:'#fff', marginTop:10}}>Enterprise architecture</div>

      <div style={{fontSize:13, color:'rgba(255,255,255,.6)', marginTop:14, lineHeight:1.5,
        paddingTop:14, borderTop:'1px solid rgba(255,255,255,.08)'}}>
        One-time purchase. Add-on to TallyPrime Gold — requires an active Gold license to function.
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

      <a href={TALLY_SERVER_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary"
         style={{marginTop:22, width:'100%', justifyContent:'center'}}>
        Buy Now <Icon name="arrow" size={15} stroke={2.2} className="arrow"/>
      </a>
    </div>
  );
}

// ============================================================
// Pricing — single Perpetual card on right + sticky kicker/lede/
// 2 info chips on left. Same shape as Silver/Gold.
// ============================================================

function Pricing() {
  return (
    <section style={{background:'#fff', padding:'104px 0', borderTop:'1px solid var(--line)', borderBottom:'1px solid var(--line)'}}>
      <div className="container">
        <div className="wave-split" style={{display:'grid', gridTemplateColumns:'1fr 1.1fr', gap:64, alignItems:'center'}}>
          <div>
            <div className="section-kicker">Enterprise tier</div>
            <h2 className="section-title serif">Built for the largest Tally deployments.</h2>
            <p className="section-lede" style={{marginTop:20}}>
              TallyPrime Server is an enterprise add-on that runs alongside an active Gold license. It replaces Gold's peer-to-peer access with a true server architecture — for businesses where 10+ users hit Tally simultaneously or data volumes have grown beyond comfortable peer-to-peer performance.
            </p>
            <div style={{marginTop:32, display:'flex', flexDirection:'column', gap:14}}>
              {[
                ['handshake', 'Capacity-planning support', 'We help size your deployment, plan rollout windows and migrate Gold data with zero downtime.'],
                ['shield',    'Requires Gold underneath',  'Server is an add-on, not a standalone product. Active TallyPrime Gold license + active TSS required.'],
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
            <div style={{fontSize:12, color:'var(--muted)', marginTop:14, textAlign:'center', lineHeight:1.5}}>
              All prices exclude 18% GST.<br/>
              Requires an active TallyPrime Gold license.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Features — 4-card grid. Server-specific positioning: server
// architecture, concurrency, monitoring, capacity. Content from
// products.js.server.features verbatim.
// ============================================================

const featureGroups = [
  { ic:'shield', tone:'orange', title:'Server architecture', items:[
    ['Server-based, not peer-to-peer','True client-server data architecture'],
    ['Concurrent read+read, read+write','No queueing on simultaneous operations'],
    ['Connect by server name',         'Users connect by name, not file path'],
  ]},
  { ic:'sync', tone:'teal', title:'Zero-downtime ops', items:[
    ['Load, save, print, import',          'Without taking the system down'],
    ['Export, backup live',                'No service interruptions for routine ops'],
    ['Runs as Windows Service',            'With session monitoring and admin control'],
  ]},
  { ic:'users', tone:'paper', title:'Capacity & users', items:[
    ['10+ simultaneous users',     'Or large data volumes Gold can\'t handle smoothly'],
    ['20 free TVU packs',          'Stack with Gold\'s 10 for 30 total remote users'],
    ['Admin session control',      'Monitor and disconnect active sessions'],
  ]},
  { ic:'handshake', tone:'ink', title:'Deployment support', items:[
    ['Capacity planning',          'We help size hardware, network, deployment scope'],
    ['Requires active Gold + TSS', 'Server is an add-on, not standalone — Gold underneath'],
    ['Local Jaipur deployment',    'Free expert assistance through Unique Info Systems'],
  ]},
];

function Features() {
  return (
    <section className="pad-section" style={{background:'var(--bg)'}}>
      <div className="container">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:48, gap:32, flexWrap:'wrap'}}>
          <div>
            <div className="section-kicker">What you get with Server</div>
            <h2 className="section-title serif">When Gold's peer-to-peer<br/>stops being enough.</h2>
          </div>
          <p className="section-lede">
            Server replaces Gold's peer-to-peer data access with a true server architecture. Same TallyPrime, same data, same workflows — but built for concurrent enterprise use, with monitoring, session control and zero-downtime operations.
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
// FinalCTA — same 2-column shape as Silver/Gold's. Buy on Tally.com
// points to the Server product page (TALLY_SERVER_URL) instead of
// the generic buy-tally page.
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
              <span className="dot" style={{background:'var(--orange)'}}></span>Enterprise deployment
            </div>
            <h2 className="serif" style={{fontSize:52, lineHeight:1.05, fontWeight:600, color:'#fff', margin:'20px 0 16px', letterSpacing:'-0.02em'}}>
              Plan your Tally Server rollout with us.
            </h2>
            <p style={{fontSize:17, color:'rgba(255,255,255,.7)', maxWidth:480, lineHeight:1.6, margin:0}}>
              We size your deployment, plan the cutover from Gold's peer-to-peer setup, and stay with you through go-live and TSS renewals. Or head straight to Tally.com to buy the license.
            </p>
            <div style={{display:'flex', gap:12, marginTop:32, flexWrap:'wrap'}}>
              <a href={TALLY_SERVER_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
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
                  ['5-Star Tally Partner', 'Certified by Tally Solutions Pvt. Ltd.'],
                  ['Free installation',    'Activation and migration handled by us'],
                  ['Local Jaipur support', 'Same team for SoftTrade and Tally — one number'],
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
// ServerPage — page-level composition. No cross-link strip
// (Server is the top of the Tally license stack).
// ============================================================

export default function ServerPage() {
  return (
    <div className="design-page">
      <Hero/>
      <Pricing/>
      <Features/>
      <FinalCTA/>
    </div>
  );
}
