import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Icon, IconChip } from '../design/Icon';
import { siteConfig } from '../../config/site';

// ============================================================
// DashboardVisual — decorative ERP dashboard card on the right of
// the Hero. Mirrors HeroLedger's pattern in MandiPage.jsx —
// inline-styled cards with floating secondary chip behind the
// main card. All fake data, no real numbers.
// ============================================================

function DashboardVisual() {
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
        src="/Cloud ERP.png"
        alt="SoftCloud-ERP product box"
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
// Hero — same Wave 3 pattern as Mandi: large serif title,
// italic subtitle, supporting copy, single CTA, three-stat
// strip, decorative DashboardVisual on the right, marquee
// strip below.
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
              <span className="eyebrow"><span className="dot"></span>Products · SoftCloud-ERP</span>
              <span style={{display:'inline-flex', alignItems:'center', gap:6, fontSize:12, fontWeight:600, color:'var(--ink-soft)'}}>
                <Icon name="grid" size={13} stroke={2}/> Cloud-based · Multi-company
              </span>
            </div>

            <h1 className="serif" style={{fontSize:'clamp(48px,6vw,84px)', lineHeight:0.96, fontWeight:600, margin:'24px 0 0', letterSpacing:'-0.025em'}}>
              SoftCloud<span style={{color:'var(--orange)'}}>‑</span>ERP
              <div style={{fontSize:'0.32em', fontWeight:500, color:'var(--ink-soft)', marginTop:14, fontStyle:'italic', letterSpacing:'-0.01em'}}>
                Smart business control for mandis, mills & processing units.
              </div>
            </h1>

            <p style={{fontSize:18, lineHeight:1.6, color:'var(--ink-soft)', maxWidth:560, marginTop:24}}>
              A cloud-based ERP built for <strong style={{color:'var(--ink)'}}>grain, dal, spice, kirana and dry-fruit traders</strong>, plus <strong style={{color:'var(--ink)'}}>flour mills, dal mills, oil mills and processing units</strong>. Real-time profit, item-wise margin, lot-wise stock, branch-wise control and a mobile dashboard for the owner — all from one system.
            </p>

            <div style={{display:'flex', gap:12, marginTop:32, flexWrap:'wrap'}}>
              <Link to="/contact" className="btn btn-primary">
                Get a Quote <Icon name="arrow" size={16} stroke={2.2} className="arrow"/>
              </Link>
            </div>

            <div style={{display:'flex', alignItems:'center', gap:24, marginTop:40, paddingTop:24, borderTop:'1px dashed var(--line-2)'}}>
              <div>
                <div className="serif" style={{fontSize:28, fontWeight:600, lineHeight:1}}>Cloud</div>
                <div style={{fontSize:11.5, color:'var(--muted)', marginTop:4, letterSpacing:'.06em', textTransform:'uppercase'}}>Anywhere access</div>
              </div>
            </div>
          </div>

          <div style={{display:'flex', justifyContent:'flex-end', alignItems:'center'}}>
            <DashboardVisual/>
          </div>
        </div>
      </div>

      {/* Marquee strip */}
      <div style={{background:'var(--ink)', color:'#fff', padding:'18px 0', overflow:'hidden', borderTop:'1px solid rgba(255,255,255,.05)'}}>
        <div style={{display:'flex', alignItems:'center', gap:48, whiteSpace:'nowrap', animation:'softcloud-marquee 60s linear infinite'}}>
          {Array(2).fill(0).map((_,k)=>(
            <Fragment key={k}>
              {[
                ['grid',    'Smart dashboard'],
                ['coins',   'Customer credit limits'],
                ['boxes',   'Lot-wise stock'],
                ['receipt', 'Item-wise profit'],
                ['ledger',  'Branch-wise control'],
                ['msg',     'WhatsApp invoices'],
                ['factory', 'Batch-wise costing'],
                ['file',    'GST · e-Invoice · e-Way Bill'],
                ['truck',   'Yield & wastage reports'],
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
        @keyframes softcloud-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}

// ============================================================
// ProblemsSolutions — two-column section: pain points on the
// left (warm warning tone), solutions on the right (teal/check
// tone). Mirrors page-2 of the SoftCloud brochure.
// ============================================================

function ProblemsSolutions() {
  const problems = [
    'Stock register and physical godown never match',
    'No real control over customer credit and overdue',
    'Item-wise true profit is invisible',
    'Multiple branches/firms are painful to manage',
    'Hours wasted every week on payment follow-ups',
    'Batch and lot accounting is unreliable',
  ];
  const solutions = [
    'Lot-wise stock management',
    'Customer credit control system (CPI)',
    'Item-wise profit & margin reports',
    'Branch-wise & multi-company control',
    'WhatsApp automation for invoices & statements',
    'Batch-wise production costing',
  ];

  return (
    <section style={{padding:'120px 0', background:'#FBF8F1', borderBottom:'1px solid var(--line)'}}>
      <div className="container" style={{padding:'0 32px'}}>
        <div style={{textAlign:'center', maxWidth:720, margin:'0 auto 64px'}}>
          <span className="eyebrow"><span className="dot"></span>Why SoftCloud-ERP</span>
          <h2 className="serif" style={{fontSize:'clamp(36px,4.5vw,54px)', fontWeight:600, lineHeight:1.05, marginTop:16, letterSpacing:'-0.02em'}}>
            If any of these sound familiar, <span style={{color:'var(--orange)'}}>we built this for you</span>.
          </h2>
        </div>

        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:32}}>
          {/* Problems column */}
          <div style={{background:'#fff', border:'1px solid var(--line)', borderRadius:18, padding:36}}>
            <div style={{display:'inline-flex', alignItems:'center', gap:8, padding:'6px 12px', borderRadius:999, background:'rgba(225,83,11,.08)', color:'var(--orange)', fontSize:11, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase'}}>
              The problem
            </div>
            <h3 className="serif" style={{fontSize:26, fontWeight:600, marginTop:16, lineHeight:1.2}}>
              Where most traders lose money & sleep
            </h3>
            <ul style={{listStyle:'none', padding:0, margin:'24px 0 0', display:'flex', flexDirection:'column', gap:14}}>
              {problems.map((p,i)=>(
                <li key={i} style={{display:'flex', alignItems:'flex-start', gap:12, fontSize:15.5, lineHeight:1.5, color:'var(--ink)'}}>
                  <span style={{flexShrink:0, width:22, height:22, borderRadius:'50%', background:'rgba(225,83,11,.10)', color:'var(--orange)', display:'inline-flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:700, marginTop:2}}>×</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions column */}
          <div style={{background:'var(--ink)', color:'#fff', borderRadius:18, padding:36, position:'relative', overflow:'hidden'}}>
            <div style={{position:'absolute', right:'-100px', top:'-100px', width:300, height:300, borderRadius:'50%', background:'radial-gradient(circle, rgba(34,197,94,.15), transparent 60%)', pointerEvents:'none'}}/>
            <div style={{position:'relative', display:'inline-flex', alignItems:'center', gap:8, padding:'6px 12px', borderRadius:999, background:'var(--teal-soft)', color:'var(--teal)', fontSize:11, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase'}}>
              SoftCloud-ERP solves it
            </div>
            <h3 className="serif" style={{fontSize:26, fontWeight:600, marginTop:16, lineHeight:1.2, position:'relative'}}>
              One system, six clean answers
            </h3>
            <ul style={{listStyle:'none', padding:0, margin:'24px 0 0', display:'flex', flexDirection:'column', gap:14, position:'relative'}}>
              {solutions.map((s,i)=>(
                <li key={i} style={{display:'flex', alignItems:'flex-start', gap:12, fontSize:15.5, lineHeight:1.5, color:'rgba(255,255,255,.92)'}}>
                  <span style={{flexShrink:0, width:22, height:22, borderRadius:'50%', background:'var(--teal)', color:'#fff', display:'inline-flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:700, marginTop:2}}>✓</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// BenefitsGrid — five colored benefit cards from the brochure.
// Each card: large icon chip, title, supporting copy. Different
// accent color per card to create visual rhythm.
// ============================================================

function BenefitsGrid() {
  const benefits = [
    { ic:'receipt', tone:'#0E1B2C', label:'Real-time profit',         body:'Automated calculations, accurate data, instant visibility — see today\'s margin without waiting for month-end.' },
    { ic:'coins',   tone:'#16A085', label:'Lower outstanding',        body:'Better credit control across customers cuts overdue and forces payment discipline without losing relationships.' },
    { ic:'boxes',   tone:'#E1530B', label:'Tighter stock control',    body:'Inventory tracking, low-stock alerts, lot/batch trace — your godown finally matches your books.' },
    { ic:'grid',    tone:'#0F766E', label:'Multi-location made easy', body:'Coordinate branches and firms in real-time. One screen, every location, owner-only access where it matters.' },
    { ic:'msg',     tone:'#5B21B6', label:'Mobile control for owner', body:'Real-time insights, alerts and reports on your phone — monitor business from anywhere, decide on data not guesses.' },
  ];

  return (
    <section style={{padding:'120px 0', background:'linear-gradient(180deg,#FBF8F1 0%,#F1EADB 100%)', borderBottom:'1px solid var(--line)'}}>
      <div className="container" style={{padding:'0 32px'}}>
        <div style={{textAlign:'center', maxWidth:720, margin:'0 auto 64px'}}>
          <span className="eyebrow"><span className="dot"></span>The outcome</span>
          <h2 className="serif" style={{fontSize:'clamp(36px,4.5vw,54px)', fontWeight:600, lineHeight:1.05, marginTop:16, letterSpacing:'-0.02em'}}>
            What changes after SoftCloud-ERP
          </h2>
          <p style={{fontSize:17, color:'var(--ink-soft)', marginTop:16, lineHeight:1.6}}>
            Five outcomes our customers feel within the first quarter — measured, not promised.
          </p>
        </div>

        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))', gap:20}}>
          {benefits.map((b,i)=>(
            <div key={i} style={{
              background:'#fff', border:'1px solid var(--line)', borderRadius:16,
              padding:28, position:'relative', overflow:'hidden',
              transition:'transform .25s ease, box-shadow .25s ease',
            }}
            onMouseEnter={(e)=>{e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 24px 50px -28px rgba(14,27,44,.20)';}}
            onMouseLeave={(e)=>{e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none';}}
            >
              <div style={{
                width:48, height:48, borderRadius:12,
                background:b.tone, color:'#fff',
                display:'inline-flex', alignItems:'center', justifyContent:'center',
                marginBottom:18,
              }}>
                <Icon name={b.ic} size={22} stroke={2}/>
              </div>
              <h3 className="serif" style={{fontSize:21, fontWeight:600, lineHeight:1.25, margin:0}}>{b.label}</h3>
              <p style={{fontSize:14.5, color:'var(--ink-soft)', lineHeight:1.55, marginTop:10}}>{b.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FeaturesSection — five feature category cards with bullet
// items, drawn from page-4 of the brochure.
// ============================================================

function FeaturesSection() {
  const groups = [
    {
      ic:'grid',    label:'Smart dashboard',
      items:['Today\'s sales', 'Today\'s collection', 'Total outstanding', 'Gross profit', 'High-risk customers', 'Slow-moving stock'],
    },
    {
      ic:'coins',   label:'Advance credit control (CPI)',
      items:['Customer credit limits', 'Overdue alerts', 'Risk category tagging', 'Auto-block on breach'],
    },
    {
      ic:'boxes',   label:'Intelligent stock management',
      items:['Lot-wise stock', 'Slow / fast-moving report', 'Low margin alerts', 'Stock ageing report'],
    },
    {
      ic:'factory', label:'Manufacturing & mills',
      items:['Raw material FIFO', 'Batch-wise costing', 'By-product profit tracking', 'Yield & wastage reports'],
    },
    {
      ic:'file',    label:'Automation & GST',
      items:['e-Invoice', 'e-Way Bill', 'WhatsApp invoice delivery', 'Account statement sharing'],
    },
  ];

  return (
    <section style={{padding:'120px 0', background:'#FBF8F1', borderBottom:'1px solid var(--line)'}}>
      <div className="container" style={{padding:'0 32px'}}>
        <div style={{textAlign:'center', maxWidth:720, margin:'0 auto 64px'}}>
          <span className="eyebrow"><span className="dot"></span>What's inside</span>
          <h2 className="serif" style={{fontSize:'clamp(36px,4.5vw,54px)', fontWeight:600, lineHeight:1.05, marginTop:16, letterSpacing:'-0.02em'}}>
            Every module the brochure mentions, <span style={{color:'var(--orange)'}}>none of the fluff</span>.
          </h2>
        </div>

        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:20}}>
          {groups.map((g,i)=>(
            <div key={i} style={{
              background:'#fff', border:'1px solid var(--line)', borderRadius:16, padding:28,
            }}>
              <div style={{display:'flex', alignItems:'center', gap:12, marginBottom:18}}>
                <div style={{
                  width:40, height:40, borderRadius:10,
                  background:'var(--teal-soft)', color:'var(--teal)',
                  display:'inline-flex', alignItems:'center', justifyContent:'center',
                }}>
                  <Icon name={g.ic} size={18} stroke={2}/>
                </div>
                <h3 className="serif" style={{fontSize:19, fontWeight:600, margin:0, lineHeight:1.2}}>{g.label}</h3>
              </div>
              <ul style={{listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:10}}>
                {g.items.map((it,j)=>(
                  <li key={j} style={{display:'flex', alignItems:'flex-start', gap:10, fontSize:14, color:'var(--ink-soft)', lineHeight:1.45}}>
                    <span style={{flexShrink:0, width:5, height:5, borderRadius:'50%', background:'var(--orange)', marginTop:8}}/>
                    {it}
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
// MultiCompanyView — visualization of consolidated outstanding
// across multiple firms (page 5 of brochure). Three benefit
// chips on top, big consolidated card below.
// ============================================================

function MultiCompanyView() {
  return (
    <section style={{padding:'120px 0', background:'var(--ink)', color:'#fff', position:'relative', overflow:'hidden'}}>
      <div style={{position:'absolute', left:'-200px', top:'-200px', width:600, height:600, borderRadius:'50%', background:'radial-gradient(circle, rgba(225,83,11,.12), transparent 60%)', pointerEvents:'none'}}/>
      <div style={{position:'absolute', right:'-200px', bottom:'-200px', width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle, rgba(22,160,133,.12), transparent 60%)', pointerEvents:'none'}}/>

      <div className="container" style={{padding:'0 32px', position:'relative'}}>
        <div style={{textAlign:'center', maxWidth:720, margin:'0 auto 56px'}}>
          <span style={{display:'inline-flex', alignItems:'center', gap:8, padding:'6px 12px', borderRadius:999, background:'rgba(255,255,255,.08)', color:'rgba(255,255,255,.85)', fontSize:11, fontWeight:700, letterSpacing:'.16em', textTransform:'uppercase'}}>
            <span style={{width:6, height:6, borderRadius:'50%', background:'var(--orange)'}}/>
            Multi-company view
          </span>
          <h2 className="serif" style={{fontSize:'clamp(36px,4.5vw,54px)', fontWeight:600, lineHeight:1.05, marginTop:16, letterSpacing:'-0.02em'}}>
            Every firm's outstanding, <span style={{color:'var(--orange)'}}>one screen</span>.
          </h2>
          <p style={{fontSize:17, color:'rgba(255,255,255,.75)', marginTop:16, lineHeight:1.6}}>
            Stop opening three different Tally companies to add up what one customer owes you. SoftCloud-ERP rolls it up automatically.
          </p>
        </div>

        {/* benefit chips */}
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(240px, 1fr))', gap:16, marginBottom:48}}>
          {[
            { label:'Consolidated view', body:'All your firms\' books on one screen, instantly.' },
            { label:'Risk reduction',    body:'See total exposure before extending more credit.' },
            { label:'Duplicate prevention', body:'One customer can\'t quietly take credit across multiple firms.' },
          ].map((c,i)=>(
            <div key={i} style={{padding:20, background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.08)', borderRadius:14}}>
              <div className="serif" style={{fontSize:18, fontWeight:600, lineHeight:1.2}}>{c.label}</div>
              <p style={{fontSize:13.5, color:'rgba(255,255,255,.65)', marginTop:8, lineHeight:1.5}}>{c.body}</p>
            </div>
          ))}
        </div>

        {/* consolidated card */}
        <div style={{maxWidth:720, margin:'0 auto', background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.10)', borderRadius:20, padding:36, backdropFilter:'blur(8px)'}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:16}}>
            <div>
              <div style={{fontSize:11, color:'rgba(255,255,255,.55)', fontWeight:700, letterSpacing:'.16em', textTransform:'uppercase'}}>Sharma Traders · Total Outstanding</div>
              <div className="serif" style={{fontSize:48, fontWeight:600, marginTop:8, color:'var(--orange)'}}>₹5,00,000</div>
            </div>
            <div style={{padding:'8px 14px', background:'rgba(225,83,11,.16)', color:'var(--orange)', borderRadius:999, fontSize:12, fontWeight:600}}>
              Across 3 firms
            </div>
          </div>

          <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:12, marginTop:28}}>
            {[
              { co:'Company A', amt:'₹2,50,000' },
              { co:'Company B', amt:'₹1,80,000' },
              { co:'Company C', amt:'₹70,000'   },
            ].map((c,i)=>(
              <div key={i} style={{padding:18, background:'rgba(255,255,255,.04)', borderRadius:12, border:'1px solid rgba(255,255,255,.08)'}}>
                <div style={{fontSize:11, color:'rgba(255,255,255,.55)', fontWeight:600, letterSpacing:'.08em', textTransform:'uppercase'}}>{c.co}</div>
                <div className="serif" style={{fontSize:22, fontWeight:600, marginTop:6}}>{c.amt}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// TrustAndCTA — closing section with credentials, client list,
// closing quote, and final call-to-action.
// ============================================================

function TrustAndCTA() {
  const credentials = [
    { ic:'ledger', stat:'Deep',    label:'Mandi-trade understanding' },
    { ic:'file',   stat:'Stable',  label:'& reliable software' },
    { ic:'msg',    stat:'Cloud',   label:'Secure, anywhere access' },
  ];

  const clients = [
    'Rara Udyog', 'Chheetarmal Bhuramal Traders', 'Mahaveer Kirana Store',
    'Kedavat Refoils', 'Shri Tadkeshwar Agro Food Products', 'Vidya Sagar Proteins Pvt Ltd',
    'R L M Spices', 'Vital Food Products', 'Pinkcity Oils Pvt Ltd',
    'Garvit Trading Company (Alwar)',
  ];

  return (
    <section style={{padding:'120px 0', background:'#FBF8F1'}}>
      <div className="container" style={{padding:'0 32px'}}>

        {/* credentials row */}
        <div style={{textAlign:'center', maxWidth:720, margin:'0 auto 56px'}}>
          <span className="eyebrow"><span className="dot"></span>Why SoftTrade Infotech</span>
          <h2 className="serif" style={{fontSize:'clamp(36px,4.5vw,54px)', fontWeight:600, lineHeight:1.05, marginTop:16, letterSpacing:'-0.02em'}}>
            Two decades of mandi-software experience.
          </h2>
        </div>

        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(180px, 1fr))', gap:20, marginBottom:80}}>
          {credentials.map((c,i)=>(
            <div key={i} style={{textAlign:'center', padding:24, background:'#fff', border:'1px solid var(--line)', borderRadius:14}}>
              <div style={{width:44, height:44, margin:'0 auto 14px', borderRadius:12, background:'var(--teal-soft)', color:'var(--teal)', display:'inline-flex', alignItems:'center', justifyContent:'center'}}>
                <Icon name={c.ic} size={20} stroke={2}/>
              </div>
              <div className="serif" style={{fontSize:24, fontWeight:600, lineHeight:1}}>{c.stat}</div>
              <div style={{fontSize:12, color:'var(--muted)', marginTop:6, letterSpacing:'.04em'}}>{c.label}</div>
            </div>
          ))}
        </div>

        {/* clients section */}
        <div style={{background:'#fff', border:'1px solid var(--line)', borderRadius:18, padding:48, marginBottom:64}}>
          <div style={{textAlign:'center', marginBottom:32}}>
            <div style={{fontSize:11, color:'var(--muted)', fontWeight:700, letterSpacing:'.16em', textTransform:'uppercase'}}>Trusted by</div>
            <h3 className="serif" style={{fontSize:28, fontWeight:600, marginTop:8}}>Businesses across grain, oil, spices & dal trade</h3>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(240px, 1fr))', gap:14}}>
            {clients.map((name,i)=>(
              <div key={i} style={{display:'flex', alignItems:'center', gap:10, padding:'12px 16px', background:'#FBF8F1', borderRadius:10, fontSize:14, color:'var(--ink)', fontWeight:500}}>
                <span style={{flexShrink:0, width:6, height:6, borderRadius:'50%', background:'var(--orange)'}}/>
                {name}
              </div>
            ))}
          </div>
        </div>

        {/* closing quote */}
        <div style={{textAlign:'center', maxWidth:780, margin:'0 auto 64px'}}>
          <div style={{fontSize:36, color:'var(--orange)', lineHeight:1, marginBottom:8, fontFamily:'Fraunces, serif'}}>"</div>
          <p className="serif" style={{fontSize:'clamp(22px,2.6vw,30px)', fontWeight:500, fontStyle:'italic', lineHeight:1.35, color:'var(--ink)'}}>
            Today's successful trader is the one who decides by looking at data — not by guessing.
          </p>
        </div>

        {/* final CTA */}
        <div style={{
          background:'var(--ink)', color:'#fff', borderRadius:24,
          padding:'56px 48px', position:'relative', overflow:'hidden',
        }}>
          <div style={{position:'absolute', right:'-100px', top:'-100px', width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle, rgba(225,83,11,.18), transparent 60%)', pointerEvents:'none'}}/>
          <div style={{position:'relative', display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:40, alignItems:'center'}}>
            <div>
              <h2 className="serif" style={{fontSize:'clamp(28px,3.5vw,40px)', fontWeight:600, lineHeight:1.15, letterSpacing:'-0.02em'}}>
                Ready to see SoftCloud-ERP for your business?
              </h2>
              <p style={{fontSize:16, color:'rgba(255,255,255,.75)', marginTop:14, lineHeight:1.55}}>
                A 30-minute walkthrough on your own data. No commitments, no pushy sales — just an honest answer on whether it fits.
              </p>
              <div style={{display:'flex', gap:12, marginTop:28, flexWrap:'wrap'}}>
                <Link to="/contact" className="btn btn-primary">
                  Get a Quote <Icon name="arrow" size={16} stroke={2.2} className="arrow"/>
                </Link>
              </div>
            </div>
            <div style={{padding:24, background:'rgba(255,255,255,.06)', border:'1px solid rgba(255,255,255,.10)', borderRadius:14}}>
              <div style={{fontSize:11, color:'rgba(255,255,255,.55)', fontWeight:700, letterSpacing:'.16em', textTransform:'uppercase'}}>Reach us</div>
              <div className="serif" style={{fontSize:18, fontWeight:600, marginTop:10}}>{siteConfig.brand}</div>
              <div style={{fontSize:13.5, color:'rgba(255,255,255,.75)', marginTop:6, lineHeight:1.5}}>
                {siteConfig.address.line1}<br/>
                {siteConfig.address.line2}<br/>
                {siteConfig.address.line3}
              </div>
              <div style={{fontSize:13.5, color:'rgba(255,255,255,.85)', marginTop:10, fontWeight:500}}>{siteConfig.phones.sales}</div>
              <a href={`mailto:${siteConfig.emails.sales}`} style={{display:'inline-flex', alignItems:'center', gap:6, fontSize:13.5, color:'var(--orange)', marginTop:10, fontWeight:600, textDecoration:'none'}}>
                {siteConfig.emails.sales} →
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

// ============================================================
// SoftCloudERPPage — page-level composition.
// ============================================================

export default function SoftCloudERPPage() {
  return (
    <div className="design-page">
      <Hero/>
      <ProblemsSolutions/>
      <BenefitsGrid/>
      <FeaturesSection/>
      <MultiCompanyView/>
      <TrustAndCTA/>
    </div>
  );
}
