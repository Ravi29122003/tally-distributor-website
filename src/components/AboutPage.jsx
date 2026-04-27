// src/components/AboutPage.jsx
//
// About page — Wave 3 redesign. Replaces the makeSub placeholder
// AboutPage that was previously rendering at /about.
//
// Composed sections (5):
//   - Hero (eyebrow + descriptor + headline + lede + 2 CTAs +
//     4-card stat grid on right)
//   - Story (3-paragraph narrative with sticky-left kicker)
//   - Values (4-card grid, 2×2)
//   - Team (4-card grid, anonymous role tiles)
//   - Visit (2-column dark with contact info card)
//
// Timeline and Certifications sections from the design are dropped:
//   - Timeline: per Q2 reconciliation, specific years risky to verify
//   - Certs: per Q4, ISO 9001:2015 + MSME UAM not held
//
// Address, hours and email pulled from siteConfig where the design
// had different (incorrect) values.
//
// Edits from the design (per content reconciliation):
//   - Hero: top inline padding 80→152px (RouterNav clearance)
//   - Hero: breadcrumb dropped (we have nav)
//   - Hero CTAs: "Talk to us" → <Link to="/contact">, phone → tel:
//   - Hero stat cards: kept as designed (Q1 — all 4 verified accurate)
//   - Story para 3: "support desk that averages 15-minute response
//     times" → "support desk that picks up the phone fast" (Q5)
//   - Story para 1: "two-person Tally franchise opens" → "Tally
//     franchise opens" (Q5 — drop specific headcount)
//   - Story para 3: "over 600 businesses still on our AMC books"
//     kept (Q1 confirmed 600+ is accurate)
//   - Values block 1: "We've never sold a cracked or grey-market
//     licence in 16 years" → "We've never sold a cracked or grey-
//     market licence" (Q5 — drop the year qualifier; "always"
//     covers it)
//   - Team: section sub-lede ("Twelve people in our Jaipur office
//     handle every install...") dropped entirely. 4 cards kept
//     structurally but de-personalised — role abbreviations on the
//     gradient tiles instead of initials, role titles instead of
//     names, role descriptions instead of personal roles
//   - Timeline section dropped entirely (Q2)
//   - Certs section dropped entirely (Q4)
//   - Visit: address replaced with siteConfig.address (real), hours
//     replaced with siteConfig.hours, email replaced with
//     siteConfig.emails.sales (was "hello@uniqueinfosystems.in" —
//     not real). Sales phone from siteConfig.phones.sales.
//   - Visit CTAs: "Book a visit" → <Link to="/contact">, "WhatsApp
//     us" → wa.me/919829006111 (new tab)
//
// Old makeSub-derived AboutPage const is deleted from router.jsx
// (handled in EDIT 2 below) so this import resolves at the route.

import { Link } from 'react-router-dom';
import { Icon, IconChip } from './design/Icon';
import { siteConfig } from '../config/site';

const PHONE_DISPLAY = siteConfig.phones.sales;             // '+91 98290 06111'
const PHONE_TEL     = siteConfig.phones.sales.replace(/\s|\+/g, '').replace(/^/, '+'); // '+919829006111'
const WHATSAPP_URL  = `https://wa.me/${siteConfig.whatsapp}`;

// Address as a single multi-line string for the Visit card
const ADDRESS_LINES = [
  siteConfig.address.line1,
  siteConfig.address.line2,
  siteConfig.address.line3,
  siteConfig.address.region,
].join('\n');

const HOURS_LINE = siteConfig.hours;
const EMAIL_LINE = siteConfig.emails.sales;

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
      <div className="container wave-hero" style={{position:'relative', padding:'152px 32px 100px'}}>
        <div className="wave-hero-grid" style={{display:'grid', gridTemplateColumns:'1.2fr 1fr', gap:64, alignItems:'center'}}>
          <div>
            <div style={{display:'flex', gap:10, alignItems:'center', flexWrap:'wrap'}}>
              <span className="eyebrow"><span className="dot"></span>About · since 2009</span>
              <span style={{display:'inline-flex', alignItems:'center', gap:6, fontSize:12, fontWeight:600,
                color:'var(--ink-soft)', padding:'4px 10px', border:'1px solid var(--line-2)', borderRadius:999, background:'#fff'}}>
                <Icon name="award" size={12} stroke={2}/> 5-Star Tally Partner
              </span>
            </div>

            <h1 className="serif" style={{fontSize:'clamp(46px,5.4vw,80px)', lineHeight:0.98, fontWeight:600,
              margin:'24px 0 0', letterSpacing:'-0.025em'}}>
              A team that takes <em style={{color:'var(--orange)', fontStyle:'italic', fontWeight:500}}>Tally</em> seriously.
            </h1>

            <p style={{fontSize:19, lineHeight:1.6, color:'var(--ink-soft)', maxWidth:580, marginTop:24}}>
              Sixteen years, five-star certification, and hundreds of businesses still on our books — that's the only resume that matters.
            </p>

            <div style={{display:'flex', gap:12, marginTop:32, flexWrap:'wrap'}}>
              <Link to="/contact" className="btn btn-primary">
                Talk to us <Icon name="arrow" size={16} stroke={2.2} className="arrow"/>
              </Link>
              <a href={`tel:${PHONE_TEL}`} className="btn btn-dark">
                <Icon name="phone" size={13} stroke={2}/> {PHONE_DISPLAY}
              </a>
            </div>
          </div>

          {/* Stats card stack */}
          <div className="wave-grid-2" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14}}>
            {[
              ['2009',  'Founded in Jaipur',     'calc'],
              ['600+',  'Active clients',         'users'],
              ['5★',   'Tally Partner tier',     'star'],
              ['16',    'Modules shipped',        'grid'],
            ].map(([n,l,ic],i)=>(
              <div key={i} style={{background:'#fff', border:'1px solid var(--line)', borderRadius:14, padding:'22px 22px',
                boxShadow: i%3===0?'0 24px 40px -28px rgba(14,27,44,.20)':'none',
                transform: i%3===1?'translateY(14px)':'none'}}>
                <Icon name={ic} size={18} stroke={2} style={{color:'var(--orange)'}}/>
                <div className="serif" style={{fontSize:38, fontWeight:600, lineHeight:1, marginTop:14, letterSpacing:'-0.02em'}}>{n}</div>
                <div style={{fontSize:12.5, color:'var(--ink-soft)', marginTop:6}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Story — 3 paragraphs, sticky-left kicker. "two-person franchise"
// and "15-minute response times" softened per Q5.
// ============================================================

function Story() {
  return (
    <section className="pad-section" style={{background:'#fff'}}>
      <div className="container">
        <div className="wave-split" style={{display:'grid', gridTemplateColumns:'1fr 1.4fr', gap:64, alignItems:'flex-start'}}>
          <div style={{position:'sticky', top:100}}>
            <div className="section-kicker">Our story</div>
            <h2 className="section-title serif">Built by accountants,<br/>not just coders.</h2>
          </div>
          <div style={{display:'flex', flexDirection:'column', gap:24, fontSize:17, lineHeight:1.7, color:'var(--ink-soft)'}}>
            <p>
              We started in 2009 as a Tally franchise from a small office in Jaipur. The brief was simple: sell genuine licences, install them properly, and pick up the phone when something breaks. Sixteen years on, the brief hasn't changed — we've just gotten better at it.
            </p>
            <p>
              {"What did change is who we built for. Mandi traders kept asking us why TallyPrime didn't speak "}<em>their</em>{" language — Aaita, Chittha, Talpat. So we built "}<strong style={{color:'var(--ink)'}}>SoftTrade-Mandi</strong>{". Brokers asked the same question about Sauda. We built "}<strong style={{color:'var(--ink)'}}>Brokwin</strong>{". Cold-storage owners about Hammali and Bardana — "}<strong style={{color:'var(--ink)'}}>Coldwin</strong>{". Every product in our catalogue started as a customer phone call."}
            </p>
            <p>
              {"Today we're a 5-Star Certified Premier Tally Partner with an in-house TDL team, a support desk that picks up the phone fast, and over 600 businesses still on our AMC books. No call centre, no hold music — just people who know your books because they helped set them up."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Values — 2×2 grid. Block 1 "...in 16 years" qualifier dropped.
// ============================================================

function Values() {
  const items = [
    ['handshake','Genuine licences, always',  'We\'ve never sold a cracked or grey-market licence. Every key comes direct from Tally Solutions.'],
    ['phone',    'We pick up the phone',      'No ticket portal between you and a fix. Call, WhatsApp, or walk in — someone responds in minutes.'],
    ['shield',   'Source code is yours',      'Every TDL we write gets handed over on project close. Switch partners later if you want — it\'s your code.'],
    ['ledger',   'Books over buzzwords',      'We know the difference between a Talpat and a Trial Balance. We design like accountants, not bloggers.'],
  ];
  return (
    <section className="pad-section" style={{background:'#fff'}}>
      <div className="container">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:48, gap:32, flexWrap:'wrap'}}>
          <div>
            <div className="section-kicker">What we believe</div>
            <h2 className="section-title serif">Four things we<br/>refuse to compromise on.</h2>
          </div>
          <p className="section-lede">
            Plenty of Tally vendors will undercut us on price. None of them will be here in 2030. These four make the difference.
          </p>
        </div>
        <div className="wave-grid-2" style={{display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:18}}>
          {items.map(([ic,h,t],i)=>(
            <div key={i} style={{padding:'30px 32px', background:'var(--paper)', border:'1px solid var(--line-2)', borderRadius:18}}>
              <div style={{display:'flex', alignItems:'center', gap:16}}>
                <IconChip name={ic} tone={i%2===0?'orange':'teal'} size={52}/>
                <div>
                  <div style={{fontSize:11, fontWeight:700, letterSpacing:'.14em', color:'var(--muted)'}}>0{i+1}</div>
                  <div className="serif" style={{fontSize:22, fontWeight:600, marginTop:2, letterSpacing:'-0.01em'}}>{h}</div>
                </div>
              </div>
              <p style={{fontSize:14.5, color:'var(--ink-soft)', marginTop:16, lineHeight:1.65, marginBottom:0}}>{t}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Team — 4-card grid, de-personalised per Q3. Real names removed;
// role abbreviation tiles + role titles + role descriptions. Sub-
// lede about "Twelve people..." dropped.
// ============================================================

function Team() {
  const folks = [
    ['Founder',          'Sales & implementation lead',                  'F',   'orange'],
    ['Customer Success', 'Day-to-day client coordination',               'CS',  'teal'],
    ['TDL Lead',         'Custom modules & TDL development',             'TDL', 'ink'],
    ['Compliance',       'GST, e-invoice & e-Way Bill specialist',       'GC',  'paper'],
  ];
  const tones = {
    orange: { bg:'linear-gradient(135deg,#F4A57A,#E1530B)', fg:'#fff' },
    teal:   { bg:'linear-gradient(135deg,#5DDDB0,#0F8A6F)', fg:'#fff' },
    ink:    { bg:'linear-gradient(135deg,#3A4A60,#0E1B2C)', fg:'#fff' },
    paper:  { bg:'linear-gradient(135deg,#E8DFC7,#C8B98A)', fg:'#0E1B2C' },
  };
  return (
    <section className="pad-section" style={{background:'var(--paper)', borderTop:'1px solid var(--line-2)', borderBottom:'1px solid var(--line-2)'}}>
      <div className="container">
        <div style={{textAlign:'center', maxWidth:680, margin:'0 auto 48px'}}>
          <div className="section-kicker">The team</div>
          <h2 className="section-title serif">Real people.<br/>Same office. No outsourcing.</h2>
        </div>
        <div className="wave-grid-4" style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:18}}>
          {folks.map(([role,desc,abbr,tone],i)=>{
            const t = tones[tone];
            return (
              <div key={i} style={{background:'#fff', border:'1px solid var(--line-2)', borderRadius:18, padding:24, textAlign:'center'}}>
                <div style={{width:96, height:96, margin:'0 auto', borderRadius:'50%', background:t.bg, color:t.fg,
                  display:'grid', placeItems:'center', fontFamily:"'Fraunces',serif", fontSize:abbr.length>2?22:32, fontWeight:600, letterSpacing:'-0.02em',
                  border:'4px solid #fff', boxShadow:'0 12px 24px -12px rgba(14,27,44,.25)'}}>{abbr}</div>
                <div className="serif" style={{fontSize:18, fontWeight:600, marginTop:16, letterSpacing:'-0.01em'}}>{role}</div>
                <div style={{fontSize:12.5, color:'var(--ink-soft)', marginTop:4}}>{desc}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Visit — 2-column dark with contact info card. Address, hours,
// email all sourced from siteConfig (overrides the design's
// incorrect placeholder values).
// ============================================================

function Visit() {
  return (
    <section className="pad-section">
      <div className="container">
        <div style={{position:'relative', overflow:'hidden', background:'var(--ink)', borderRadius:24, padding:'56px 56px',
          display:'grid', gridTemplateColumns:'1.1fr 1fr', gap:48, alignItems:'center'}} className="wave-finalcta">
          <div style={{position:'absolute', right:-100, top:-100, width:400, height:400, borderRadius:'50%',
            background:'radial-gradient(circle, rgba(225,83,11,.25), transparent 60%)'}}/>
          <div style={{position:'relative'}}>
            <div className="eyebrow" style={{background:'rgba(255,255,255,.08)', borderColor:'rgba(255,255,255,.12)', color:'#fff'}}>
              <span className="dot" style={{background:'var(--orange)'}}></span>Visit us · Jaipur
            </div>
            <h2 className="serif" style={{fontSize:44, lineHeight:1.05, fontWeight:600, color:'#fff', margin:'20px 0 16px', letterSpacing:'-0.02em'}}>
              Walk in, call, or WhatsApp.
            </h2>
            <p style={{fontSize:16, color:'rgba(255,255,255,.7)', maxWidth:480, lineHeight:1.6, margin:0}}>
              We genuinely prefer in-person meetings. Coffee's on us, and you'll meet whoever ends up handling your account.
            </p>
            <div style={{display:'flex', gap:12, marginTop:28, flexWrap:'wrap'}}>
              <Link to="/contact" className="btn btn-primary">
                Book a visit <Icon name="arrow" size={16} stroke={2.2} className="arrow"/>
              </Link>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn"
                 style={{background:'#25D366', color:'#fff', border:'1px solid #1FB055'}}>
                <Icon name="wa" size={14} stroke={2}/> WhatsApp us
              </a>
            </div>
          </div>
          <div style={{position:'relative'}}>
            <div style={{background:'rgba(255,255,255,.06)', border:'1px solid rgba(255,255,255,.10)', borderRadius:18, padding:'28px 28px'}}>
              <div style={{display:'flex', flexDirection:'column', gap:18}}>
                {[
                  ['map',   'Office',  ADDRESS_LINES],
                  ['phone', 'Call us', `${PHONE_DISPLAY}\n${HOURS_LINE}`],
                  ['mail',  'Email',   EMAIL_LINE],
                ].map(([ic,h,t],i)=>(
                  <div key={i} style={{display:'flex', gap:14, alignItems:'flex-start',
                    paddingBottom: i<2?16:0, borderBottom: i<2?'1px solid rgba(255,255,255,.08)':'none'}}>
                    <div style={{width:38, height:38, borderRadius:10, background:'rgba(255,255,255,.08)',
                      color:'#fff', display:'grid', placeItems:'center', flexShrink:0}}>
                      <Icon name={ic} size={16} stroke={2}/>
                    </div>
                    <div>
                      <div style={{fontSize:11.5, fontWeight:700, letterSpacing:'.14em', color:'rgba(255,255,255,.5)'}}>{h.toUpperCase()}</div>
                      <div style={{fontSize:14, color:'#fff', marginTop:4, lineHeight:1.5, whiteSpace:'pre-line'}}>{t}</div>
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
// AboutPage — page-level composition.
// ============================================================

export default function AboutPage() {
  return (
    <div className="design-page">
      <Hero/>
      <Story/>
      <Values/>
      <Team/>
      <Visit/>
    </div>
  );
}
