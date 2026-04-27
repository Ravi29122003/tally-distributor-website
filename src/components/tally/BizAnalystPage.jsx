// src/components/tally/BizAnalystPage.jsx
//
// Biz Analyst (Tally Mobile App) page — Wave 3 redesign.
// Route: /products/mobile-app
//
// Page scope decision: this page is Biz Analyst-only (one focused
// product), not the 3-option mobility comparison that products.js
// describes. This matches both the design's intent and competitor
// precedent (e.g. Mark IT Solutions' /product/tally-mobile-app
// is also Biz Analyst-only). The Reports on Browser and Tally
// Cloud Access options from products.js are not surfaced here —
// they live on /products/cloud and elsewhere.
//
// Composed sections:
//   - Hero (with PhoneMockup visual + 4 trust chips)
//   - Why (4-card grid)
//   - Features (4-card grid; what you can do in the app)
//   - HowItWorks (3-step horizontal flow)
//   - Pricing (3-card grid: Free Trial / Business / For Sales Team)
//   - RelatedProducts (3 cross-link cards: Silver, Gold, Support)
//   - FinalCTA (2-column dark with "WHAT THE DEMO COVERS" right card)
//
// External destinations:
//   BIZ_ANALYST_URL  = https://bizanalyst.in/  (real product, in products.js)
//   WHATSAPP_URL     = https://wa.me/919829006111  (matches site.js whatsapp number)
//
// Edits from the design (per content reconciliation):
//   - Hero: top inline padding 80→152px (fixed RouterNav clearance)
//   - Hero CTAs: "Start free 7-day trial" → bizanalyst.in (new tab),
//     "WhatsApp us" → wa.me link (new tab)
//   - Hero descriptor pill: kept "Authorised partner app"
//   - Pricing: design's single dark card replaced with a 3-card grid
//     (Free Trial / Business ₹3,300 POPULAR / For Sales Team ₹3,600)
//     matching real Biz Analyst plans. ₹3,300 supersedes products.js's
//     stale ₹1,999.
//   - Pricing left chip "Honest sizing" content kept verbatim
//   - FAQ section dropped entirely (kept page focused; we've never
//     built FAQ accordion components and they're a separate pattern)
//   - "20-minute demo" / "20-min demo" wording softened to "demo"
//     in the FinalCTA (Bucket 1 — same edit we did on Mandi)
//   - FAQ-related WhatsApp inline link in design Pricing-section copy
//     dropped along with the FAQ section
//   - "the most widely used Tally mobile app in India" — never
//     rendered (was only in the dropped FAQ)
//   - Related Products section ADDED (not in design) — 3 cards
//     cross-linking to Silver, Gold, Support with real routes

import { Link } from 'react-router-dom';
import { Icon, IconChip } from '../design/Icon';

const BIZ_ANALYST_URL = 'https://bizanalyst.in/';
const WHATSAPP_URL    = 'https://wa.me/919829006111';

// ============================================================
// PhoneMockup — decorative phone with the Biz Analyst dashboard,
// floating WhatsApp reminder card and Top Customers card.
// Ported verbatim from design/biz-page.jsx.
// ============================================================

function PhoneMockup() {
  return (
    <div style={{position:'relative', width:'100%', maxWidth:560, margin:'0 auto'}}>
      <div style={{position:'absolute', left:'50%', top:'40%', transform:'translate(-50%,-50%)',
        width:480, height:480, borderRadius:'50%',
        background:'radial-gradient(circle, rgba(225,83,11,.12), transparent 60%)', pointerEvents:'none', zIndex:0}}/>

      {/* Floating reminder card */}
      <div style={{
        position:'absolute', left:'-12%', top:'8%', width:'52%', zIndex:3,
        background:'#fff', border:'1px solid var(--line)', borderRadius:14,
        padding:'14px 16px', boxShadow:'0 24px 40px -20px rgba(14,27,44,.30)',
        transform:'rotate(-3deg)',
      }}>
        <div style={{display:'flex', alignItems:'center', gap:10}}>
          <div style={{width:32, height:32, borderRadius:8, background:'#25D36622',
            color:'#1AAE52', display:'grid', placeItems:'center', fontSize:16, fontWeight:700}}>W</div>
          <div>
            <div style={{fontSize:11, fontWeight:700, letterSpacing:'.12em', color:'var(--muted)'}}>WHATSAPP REMINDER</div>
            <div style={{fontSize:13, fontWeight:600, marginTop:1}}>Sent to 18 customers</div>
          </div>
        </div>
        <div style={{marginTop:10, padding:'8px 10px', background:'var(--paper)', borderRadius:8, fontSize:11.5, color:'var(--ink-soft)', lineHeight:1.5}}>
          "Dear Suresh ji, gentle reminder for invoice #INV-2486 — ₹84,200 due since 12 Apr."
        </div>
      </div>

      {/* Floating top customers card */}
      <div style={{
        position:'absolute', right:'-8%', bottom:'8%', width:'48%', zIndex:3,
        background:'#fff', border:'1px solid var(--line)', borderRadius:14,
        padding:'14px 16px', boxShadow:'0 24px 40px -20px rgba(14,27,44,.30)',
      }}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div style={{fontSize:11, fontWeight:700, letterSpacing:'.14em', color:'var(--muted)'}}>TOP CUSTOMERS · APR</div>
          <span style={{fontSize:10, fontWeight:700, color:'var(--teal)'}}>↑ 12%</span>
        </div>
        <div style={{display:'flex', flexDirection:'column', gap:8, marginTop:10}}>
          {[['Suresh & Co.','₹4.2L'],['Maheshwari Trd.','₹3.1L'],['Gupta Bros.','₹2.4L']].map((r,i)=>(
            <div key={i} style={{display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:12}}>
              <div style={{display:'flex', alignItems:'center', gap:6}}>
                <span style={{width:18, height:18, borderRadius:'50%', background:'var(--paper)', fontSize:9, fontWeight:700,
                  display:'grid', placeItems:'center', color:'var(--ink-soft)'}}>{i+1}</span>
                <span style={{fontWeight:500}}>{r[0]}</span>
              </div>
              <span className="mono" style={{fontWeight:600}}>{r[1]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Phone */}
      <div style={{
        position:'relative', width:'62%', margin:'0 auto', aspectRatio:'9/19',
        background:'#0E1B2C', borderRadius:38, padding:8,
        boxShadow:'0 50px 80px -30px rgba(14,27,44,.5), 0 0 0 1px rgba(0,0,0,.5) inset',
        zIndex:2,
      }}>
        <div style={{position:'relative', width:'100%', height:'100%', borderRadius:30, overflow:'hidden',
          background:'linear-gradient(180deg, #FBF8F1 0%, #fff 30%)'}}>
          <div style={{position:'absolute', left:'50%', top:8, transform:'translateX(-50%)', width:'30%', height:22,
            background:'#0E1B2C', borderRadius:14, zIndex:5}}/>

          <div style={{padding:'14px 22px 0', display:'flex', justifyContent:'space-between', fontSize:10, fontWeight:600, color:'var(--ink)'}}>
            <span>9:41</span>
            <span>•••</span>
          </div>

          <div style={{padding:'18px 18px 0'}}>
            <div style={{fontSize:9.5, fontWeight:700, letterSpacing:'.14em', color:'var(--muted)'}}>BIZ ANALYST</div>
            <div className="serif" style={{fontSize:18, fontWeight:600, letterSpacing:'-0.01em', marginTop:2}}>Good morning, Rajesh</div>
          </div>

          <div style={{padding:'14px 18px 0', display:'grid', gridTemplateColumns:'1fr 1fr', gap:8}}>
            <div style={{background:'var(--ink)', color:'#fff', borderRadius:11, padding:'10px 12px'}}>
              <div style={{fontSize:8.5, fontWeight:700, letterSpacing:'.12em', color:'rgba(255,255,255,.5)'}}>SALES · TODAY</div>
              <div className="serif" style={{fontSize:18, fontWeight:600, marginTop:3, letterSpacing:'-0.01em'}}>₹2.4L</div>
              <div style={{fontSize:9, color:'#5DDDB0', marginTop:1}}>↑ 18% vs yest.</div>
            </div>
            <div style={{background:'var(--orange-soft)', borderRadius:11, padding:'10px 12px'}}>
              <div style={{fontSize:8.5, fontWeight:700, letterSpacing:'.12em', color:'var(--orange)'}}>OUTSTANDING</div>
              <div className="serif" style={{fontSize:18, fontWeight:600, marginTop:3, letterSpacing:'-0.01em'}}>₹14.2L</div>
              <div style={{fontSize:9, color:'var(--ink-soft)', marginTop:1}}>23 invoices</div>
            </div>
          </div>

          <div style={{margin:'12px 18px 0', background:'#fff', border:'1px solid var(--line)', borderRadius:11, padding:'10px 12px'}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <div style={{fontSize:9.5, fontWeight:700}}>Sales · Last 7 days</div>
              <div style={{fontSize:8.5, color:'var(--muted)'}}>₹16.8L</div>
            </div>
            <div style={{display:'flex', alignItems:'flex-end', gap:5, height:38, marginTop:8}}>
              {[40,55,30,72,48,90,65].map((h,i)=>(
                <div key={i} style={{flex:1, height:`${h}%`,
                  background: i===5?'var(--orange)':'var(--ink)',
                  borderRadius:'2px 2px 0 0', opacity: i===5?1:0.85}}/>
              ))}
            </div>
          </div>

          <div style={{padding:'12px 18px 0'}}>
            <div style={{fontSize:9.5, fontWeight:700, letterSpacing:'.12em', color:'var(--muted)'}}>RECENT VOUCHERS</div>
            <div style={{display:'flex', flexDirection:'column', gap:6, marginTop:8}}>
              {[
                ['Sales Invoice','#SI-1820','₹84,200','var(--teal)'],
                ['Receipt','#RC-0942','₹1,20,000','var(--orange)'],
                ['Order','#SO-3411','₹2,40,500','var(--ink-soft)'],
              ].map((r,i)=>(
                <div key={i} style={{display:'flex', alignItems:'center', justifyContent:'space-between',
                  padding:'8px 10px', background:'#fff', border:'1px solid var(--line)', borderRadius:9}}>
                  <div>
                    <div style={{fontSize:10, fontWeight:600}}>{r[0]}</div>
                    <div className="mono" style={{fontSize:8.5, color:'var(--muted)', marginTop:1}}>{r[1]}</div>
                  </div>
                  <div className="mono" style={{fontSize:11, fontWeight:600, color:r[3]}}>{r[2]}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{position:'absolute', right:14, bottom:18, width:42, height:42, borderRadius:'50%',
            background:'var(--orange)', boxShadow:'0 8px 18px -4px rgba(225,83,11,.5)',
            display:'grid', placeItems:'center', color:'#fff', fontSize:20, fontWeight:300}}>+</div>
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

      <div className="container" style={{position:'relative', padding:'152px 32px 100px'}}>
        <div style={{display:'grid', gridTemplateColumns:'1.1fr 1fr', gap:60, alignItems:'center'}}>
          <div>
            <div style={{display:'flex', gap:10, alignItems:'center', flexWrap:'wrap'}}>
              <span className="eyebrow"><span className="dot"></span>Tally · Mobile App</span>
              <span style={{display:'inline-flex', alignItems:'center', gap:6, fontSize:12, fontWeight:600,
                color:'var(--ink-soft)', padding:'4px 10px', border:'1px solid var(--line-2)', borderRadius:999, background:'#fff'}}>
                <Icon name="shield" size={12} stroke={2}/> Authorised partner app
              </span>
            </div>

            <h1 className="serif" style={{fontSize:'clamp(46px,5.4vw,76px)', lineHeight:0.98, fontWeight:600,
              margin:'24px 0 0', letterSpacing:'-0.025em'}}>
              Biz Analyst <em style={{color:'var(--orange)', fontStyle:'italic', fontWeight:500}}>—</em> Tally on your phone.
              <div style={{fontSize:'0.32em', fontWeight:500, color:'var(--ink-soft)', marginTop:14, fontStyle:'italic', letterSpacing:'-0.01em'}}>
                Anytime, anywhere.
              </div>
            </h1>

            <p style={{fontSize:18, lineHeight:1.6, color:'var(--ink-soft)', maxWidth:560, marginTop:24}}>
              Access your TallyPrime data on Android and iOS. <strong style={{color:'var(--ink)'}}>Pull reports, send payment reminders, and create vouchers</strong> — without sitting in front of your Tally machine.
            </p>

            <div style={{display:'flex', gap:12, marginTop:32, flexWrap:'wrap'}}>
              <a href={BIZ_ANALYST_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Start free 7-day trial <Icon name="arrow" size={16} stroke={2.2} className="arrow"/>
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-dark">
                <Icon name="wa" size={14} stroke={2}/> WhatsApp us
              </a>
            </div>

            <div style={{display:'flex', gap:18, marginTop:32, flexWrap:'wrap'}}>
              {[
                'Official TallyPrime integration',
                'Encrypted data sync',
                'Works offline',
                'Setup by our team',
              ].map((t,i)=>(
                <span key={i} style={{display:'inline-flex', alignItems:'center', gap:6, fontSize:13, fontWeight:500, color:'var(--ink-soft)'}}>
                  <span style={{width:16, height:16, borderRadius:'50%', background:'var(--teal-soft)', color:'var(--teal)', display:'grid', placeItems:'center'}}>
                    <Icon name="check" size={9} stroke={3}/>
                  </span>
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div style={{display:'flex', justifyContent:'center'}}><PhoneMockup/></div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Why — 4-card grid. Sticky-left kicker, cards on right.
// ============================================================

function Why() {
  const items = [
    ['zap',  'Decisions don\'t wait',         'Check sales, cash, and outstandings from your phone in seconds — never wait for end-of-day.', 'orange'],
    ['user', 'Stop chasing your accountant',  'Every Tally report, a tap away. P&L, balance sheet, ledger — all on your phone.',                'teal'],
    ['truck','Faster sales team',             'Field reps place orders and collect payments at the customer\'s location, geo-tagged.',          'paper'],
    ['shield','Your data stays yours',        'Biz Analyst reads from your existing Tally license through an encrypted sync.',                  'ink'],
  ];
  return (
    <section className="pad-section" style={{background:'var(--bg)'}}>
      <div className="container">
        <div style={{display:'grid', gridTemplateColumns:'1fr 1.6fr', gap:64, alignItems:'flex-start'}}>
          <div>
            <div className="section-kicker">Why Biz Analyst</div>
            <h2 className="section-title serif">Tally without the desk.</h2>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:20}}>
            {items.map(([ic,h,t,tone],i)=>(
              <div key={i} className="card" style={{padding:24}}>
                <IconChip name={ic} tone={tone} size={44}/>
                <div className="serif" style={{fontSize:20, fontWeight:600, margin:'16px 0 6px', letterSpacing:'-0.01em'}}>{h}</div>
                <div style={{fontSize:14, color:'var(--ink-soft)', lineHeight:1.55}}>{t}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Features — 4-card grid on warm paper
// ============================================================

const featureGroups = [
  { ic:'ledger', tone:'orange', title:'Reports & Dashboards', items:[
    ['Live Dashboard',     'Sales, purchases, receivables, payables, cash & bank at a glance'],
    ['Sales Analysis',     'Top customers, inactive buyers, upsell opportunities'],
    ['Multiple Companies', 'Add every company on your Tally license. Switch in one tap'],
  ]},
  { ic:'coins', tone:'teal', title:'Get Paid Faster', items:[
    ['Outstanding Reminders','Bulk reminders via WhatsApp, SMS, and email'],
    ['Auto-follow-up',       'Schedule polite reminders at fixed intervals'],
    ['Payment tracking',     'See which reminders triggered payments'],
  ]},
  { ic:'receipt', tone:'paper', title:'Create on the go', items:[
    ['Sales Invoices',     'Create and sync back to Tally automatically'],
    ['Orders & Receipts',  'Field rep places order at customer location'],
    ['Payments',           'Record collections, syncs to Tally instantly'],
  ]},
  { ic:'map', tone:'ink', title:'Sales Team Tools', items:[
    ['Geo-tagged check-in','Visit notes and follow-up reminders'],
    ['Role-based access',  'Restrict reps to their own customers'],
    ['Offline mode',       'Synced data viewable without internet'],
  ]},
];

function Features() {
  return (
    <section style={{background:'var(--paper)', padding:'104px 0', borderTop:'1px solid var(--line-2)', borderBottom:'1px solid var(--line-2)'}}>
      <div className="container">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:48, gap:32, flexWrap:'wrap'}}>
          <div>
            <div className="section-kicker">What you can do</div>
            <h2 className="section-title serif">Twelve things Biz Analyst<br/>does better than your laptop.</h2>
          </div>
          <p className="section-lede">
            Built specifically for the way Indian SMEs use Tally — invoices, outstandings, sales follow-ups. Not a watered-down dashboard.
          </p>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:20}}>
          {featureGroups.map((g,i)=>(
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
// HowItWorks — 3-step horizontal flow on white
// ============================================================

function HowItWorks() {
  const steps = [
    ['1','We install', 'Biz Analyst connector goes on your Tally machine. We link your companies.'],
    ['2','We test',    'Verify the sync, create logins for your team. You watch us do it.'],
    ['3','You go',     'Download the app, log in, start using it. Setup takes under an hour.'],
  ];
  return (
    <section className="pad-section" style={{background:'#fff'}}>
      <div className="container">
        <div style={{textAlign:'center', maxWidth:680, margin:'0 auto 56px'}}>
          <div className="section-kicker">How it works</div>
          <h2 className="section-title serif">Up and running in under an hour.</h2>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:24, position:'relative'}}>
          <div style={{position:'absolute', top:36, left:'14%', right:'14%', height:2,
            background:'repeating-linear-gradient(90deg, var(--line-2) 0 8px, transparent 8px 14px)', zIndex:0}}/>
          {steps.map(([n,h,t],i)=>(
            <div key={i} style={{textAlign:'center', position:'relative', zIndex:1}}>
              <div style={{margin:'0 auto', width:72, height:72, borderRadius:'50%', background:'var(--ink)', color:'#fff',
                display:'grid', placeItems:'center', fontFamily:"'Fraunces',serif", fontSize:30, fontWeight:600,
                border:'4px solid #fff', boxShadow:'0 12px 24px -10px rgba(14,27,44,.3)'}}>{n}</div>
              <div className="serif" style={{fontSize:22, fontWeight:600, marginTop:18, letterSpacing:'-0.01em'}}>{h}</div>
              <div style={{fontSize:14, color:'var(--ink-soft)', marginTop:6, lineHeight:1.55, maxWidth:280, margin:'8px auto 0'}}>{t}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// PlanCard — pricing card. Shape similar to Silver/Gold's, with
// optional "trial" variant (₹0) that uses ghost CTA + lighter
// styling, and "highlight" variant for the POPULAR middle card.
// ============================================================

function PlanCard({ tag, name, price, priceUnit, blurb, features, highlight, trial, badge, ctaLabel, ctaUrl }) {
  const isDark = !!highlight;
  return (
    <div style={{
      position:'relative',
      background: isDark ? 'var(--ink)' : '#fff',
      color: isDark ? '#fff' : 'var(--ink)',
      border: isDark ? '1px solid var(--ink)' : '1px solid var(--line)',
      borderRadius:18, padding:'30px 26px',
      display:'flex', flexDirection:'column',
      boxShadow: isDark ? '0 30px 60px -25px rgba(14,27,44,.4)' : '0 1px 0 rgba(14,27,44,.02)',
      overflow:'hidden',
    }}>
      {badge && (
        <span style={{position:'absolute', top:18, right:18, fontSize:10, fontWeight:700, letterSpacing:'.14em',
          padding:'5px 9px', borderRadius:999, background:'var(--orange)', color:'#fff'}}>{badge}</span>
      )}

      <div style={{fontSize:11, fontWeight:700, letterSpacing:'.16em', color: isDark ? 'rgba(255,255,255,.5)' : 'var(--muted)'}}>{tag}</div>
      <div className="serif" style={{fontSize:24, fontWeight:600, marginTop:8, letterSpacing:'-0.015em'}}>{name}</div>
      <div style={{display:'flex', alignItems:'baseline', gap:8, marginTop:12}}>
        <div className="serif" style={{fontSize:trial ? 36 : 40, fontWeight:600, lineHeight:1, letterSpacing:'-0.02em'}}>{price}</div>
        {priceUnit && <div style={{fontSize:13, color: isDark ? 'rgba(255,255,255,.55)' : 'var(--muted)'}}>{priceUnit}</div>}
      </div>
      {blurb && <div style={{fontSize:13, color: isDark ? 'rgba(255,255,255,.65)' : 'var(--ink-soft)', marginTop:8, lineHeight:1.5}}>{blurb}</div>}

      <ul style={{listStyle:'none', padding:0, margin:'22px 0 0', display:'flex', flexDirection:'column', gap:11, flex:1,
        paddingTop:18, borderTop: isDark ? '1px solid rgba(255,255,255,.10)' : '1px solid var(--line)'}}>
        {features.map((t,i)=>(
          <li key={i} style={{display:'flex', alignItems:'flex-start', gap:9, fontSize:13.5, color: isDark ? 'rgba(255,255,255,.85)' : 'var(--ink)'}}>
            <span style={{width:16, height:16, borderRadius:'50%',
              background: isDark ? 'rgba(255,255,255,.10)' : 'var(--teal-soft)',
              color: isDark ? '#fff' : 'var(--teal)',
              display:'grid', placeItems:'center', flexShrink:0, marginTop:2}}>
              <Icon name="check" size={9} stroke={2.5}/>
            </span>
            <span>{t}</span>
          </li>
        ))}
      </ul>

      <a href={ctaUrl} target="_blank" rel="noopener noreferrer"
         className={isDark ? 'btn btn-primary' : (trial ? 'btn btn-ghost' : 'btn btn-dark')}
         style={{marginTop:24, width:'100%', justifyContent:'center'}}>
        {ctaLabel} <Icon name="arrow" size={15} stroke={2.2} className="arrow"/>
      </a>
    </div>
  );
}

// ============================================================
// Pricing — 3-card grid (matches competitor reference). Free
// Trial / Business POPULAR / For Sales Team.
// ============================================================

function Pricing() {
  return (
    <section style={{background:'var(--paper)', padding:'104px 0', borderTop:'1px solid var(--line-2)', borderBottom:'1px solid var(--line-2)'}}>
      <div className="container">
        <div style={{textAlign:'center', maxWidth:720, margin:'0 auto 56px'}}>
          <div className="section-kicker">Pricing</div>
          <h2 className="section-title serif">Choose the plan that fits.</h2>
          <p className="section-lede" style={{margin:'20px auto 0'}}>
            Three plans — start with a free trial, then upgrade to Business for SMEs or For Sales Team if you have field reps. Per-device, per-Tally-license. Multi-year discounts available.
          </p>
        </div>

        <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:20, alignItems:'stretch'}}>
          <PlanCard
            tag="7 DAYS FREE"
            name="Free Trial"
            price="₹0"
            priceUnit="/ 7 days"
            features={[
              'Full Business plan features',
              'Connect to your Tally',
              'No credit card required',
              'Setup help from us',
            ]}
            trial
            ctaLabel="Start Free Trial"
            ctaUrl={BIZ_ANALYST_URL}
          />
          <PlanCard
            tag="FOR BUSINESS OWNERS"
            name="Business"
            price="₹3,300"
            priceUnit="/ year"
            blurb="The standard plan for SMEs running TallyPrime. Per device."
            features={[
              'Live Dashboard',
              'Unlimited Tally companies',
              'Outstanding Reminders (WhatsApp, SMS, email)',
              'Voucher creation with auto-sync to Tally',
              'Multi-user accounts',
              'Offline mode',
            ]}
            highlight
            badge="POPULAR"
            ctaLabel="Get Started"
            ctaUrl={BIZ_ANALYST_URL}
          />
          <PlanCard
            tag="FOR SALES TEAMS"
            name="For Sales Team"
            price="₹3,600"
            priceUnit="/ year"
            blurb="Everything in Business, plus field-rep tools."
            features={[
              'All Business plan features',
              'Geo-tagged check-in & check-out',
              'Follow-up reminders for reps',
              'Field sales management',
              'Team empowerment tools',
            ]}
            ctaLabel="Get Started"
            ctaUrl={BIZ_ANALYST_URL}
          />
        </div>

        <div style={{textAlign:'center', fontSize:12, color:'var(--muted)', marginTop:28, lineHeight:1.6}}>
          All prices exclude 18% GST. Subscription charges are per device per Tally license.<br/>
          The 7-day free trial is not applicable to additional users on existing accounts.
        </div>
      </div>
    </section>
  );
}

// ============================================================
// RelatedProducts — 3 cross-link cards: Silver, Gold, Support.
// All link to existing real routes. Added here per content
// reconciliation (not in original design).
// ============================================================

function RelatedProducts() {
  const items = [
    {
      to: '/products/silver',
      tag: 'TALLYPRIME · SILVER',
      title: 'Single-PC Tally license',
      blurb: 'For businesses that need TallyPrime on one workstation. Perfect for proprietors and small offices.',
    },
    {
      to: '/products/gold',
      tag: 'TALLYPRIME · GOLD',
      title: 'Unlimited LAN users',
      blurb: 'Multi-user Tally for growing teams. Pairs naturally with Biz Analyst — your office on Gold, your team on the phone.',
    },
    {
      to: '/services/support',
      tag: 'SUPPORT SERVICES',
      title: 'Setup, training, troubleshooting',
      blurb: 'Same team handles your Tally and Biz Analyst install, training, and ongoing support. One number to call.',
    },
  ];
  return (
    <section className="pad-section" style={{background:'var(--bg)'}}>
      <div className="container">
        <div style={{textAlign:'center', maxWidth:600, margin:'0 auto 48px'}}>
          <div className="section-kicker">Related products</div>
          <h2 className="section-title serif">Buy together, save together.</h2>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:20}}>
          {items.map((it,i)=>(
            <Link key={i} to={it.to} className="card"
              style={{padding:26, textDecoration:'none', color:'var(--ink)', display:'flex', flexDirection:'column', gap:10,
                transition:'transform .2s ease, box-shadow .2s ease'}}>
              <div style={{fontSize:11, fontWeight:700, letterSpacing:'.14em', color:'var(--orange)'}}>{it.tag}</div>
              <h3 className="serif" style={{fontSize:22, fontWeight:600, margin:0, letterSpacing:'-0.015em'}}>{it.title}</h3>
              <p style={{fontSize:14, color:'var(--ink-soft)', lineHeight:1.55, margin:0, flex:1}}>{it.blurb}</p>
              <div style={{display:'inline-flex', alignItems:'center', gap:6, fontSize:13.5, fontWeight:600, color:'var(--orange)', marginTop:6}}>
                Learn more <Icon name="arrow" size={13} stroke={2.2}/>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FinalCTA — 2-column dark; "Book a demo" → /contact, "WhatsApp
// us" → wa.me link. Right-side "WHAT THE DEMO COVERS" card kept
// (verifiable factual content, not unverifiable claims).
// "20-minute" wording softened to just "demo" per Bucket 1.
// ============================================================

function FinalCTA() {
  return (
    <section className="pad-section" style={{background:'var(--bg)'}}>
      <div className="container">
        <div style={{position:'relative', overflow:'hidden', background:'var(--ink)', borderRadius:24, padding:'72px 64px',
          display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:48, alignItems:'center'}}>
          <div style={{position:'absolute', right:-100, top:-100, width:400, height:400, borderRadius:'50%',
            background:'radial-gradient(circle, rgba(225,83,11,.25), transparent 60%)'}}/>

          <div style={{position:'relative'}}>
            <div className="eyebrow" style={{background:'rgba(255,255,255,.08)', borderColor:'rgba(255,255,255,.12)', color:'#fff'}}>
              <span className="dot" style={{background:'var(--orange)'}}></span>Free demo
            </div>
            <h2 className="serif" style={{fontSize:52, lineHeight:1.05, fontWeight:600, color:'#fff', margin:'20px 0 16px', letterSpacing:'-0.02em'}}>
              See Biz Analyst on your own data.
            </h2>
            <p style={{fontSize:17, color:'rgba(255,255,255,.7)', maxWidth:480, lineHeight:1.6, margin:0}}>
              Book a free demo. We'll walk you through every feature on a sample Tally company — or yours, if you'd like.
            </p>
            <div style={{display:'flex', gap:12, marginTop:32, flexWrap:'wrap'}}>
              <Link to="/contact" className="btn btn-primary">
                Book a demo <Icon name="arrow" size={16} stroke={2.2} className="arrow"/>
              </Link>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn"
                 style={{background:'rgba(255,255,255,.08)', color:'#fff', border:'1px solid rgba(255,255,255,.15)'}}>
                <Icon name="wa" size={14} stroke={2}/> WhatsApp us
              </a>
            </div>
          </div>

          <div style={{position:'relative'}}>
            <div style={{background:'rgba(255,255,255,.06)', border:'1px solid rgba(255,255,255,.10)', borderRadius:18, padding:24}}>
              <div style={{fontSize:11.5, fontWeight:700, letterSpacing:'.14em', color:'rgba(255,255,255,.5)'}}>WHAT THE DEMO COVERS</div>
              <div style={{display:'flex', flexDirection:'column', gap:14, marginTop:16}}>
                {[
                  ['Live dashboard tour',  'We pull up sample sales, cash, outstandings'],
                  ['Reminder workflow',    'Send a real WhatsApp reminder, see it land'],
                  ['Voucher round-trip',   'Create on the phone, watch it sync to Tally'],
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
// BizAnalystPage — page-level composition.
// ============================================================

export default function BizAnalystPage() {
  return (
    <div className="design-page">
      <Hero/>
      <Why/>
      <Features/>
      <HowItWorks/>
      <Pricing/>
      <RelatedProducts/>
      <FinalCTA/>
    </div>
  );
}
