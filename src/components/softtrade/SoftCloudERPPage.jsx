import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Icon, IconChip } from '../design/Icon';

// ============================================================
// DashboardVisual — decorative ERP dashboard card on the right of
// the Hero. Mirrors HeroLedger's pattern in MandiPage.jsx —
// inline-styled cards with floating secondary chip behind the
// main card. All fake data, no real numbers.
// ============================================================

function DashboardVisual() {
  return (
    <div style={{ position:'relative', width:'100%', aspectRatio:'1.05 / 1', maxWidth: 560 }}>
      {/* back chip card — multi-company outstanding */}
      <div style={{
        position:'absolute', left:'-6%', top:'10%',
        width:'62%', aspectRatio:'1.5/1',
        background:'#fff', borderRadius:14, border:'1px solid var(--line)',
        boxShadow:'0 24px 40px -28px rgba(14,27,44,.20)',
        transform:'rotate(-4deg)', padding:14, zIndex:1,
      }}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div style={{fontSize:10, fontWeight:700, letterSpacing:'.16em', color:'var(--muted)'}}>CONSOLIDATED OUTSTANDING</div>
          <div style={{fontSize:10, fontWeight:700, color:'var(--teal)', background:'var(--teal-soft)', padding:'3px 8px', borderRadius:999}}>3 FIRMS</div>
        </div>
        <div style={{marginTop:14, fontSize:11, color:'var(--ink-soft)'}}>Sharma Traders</div>
        <div className="serif" style={{fontSize:28, fontWeight:600, marginTop:2}}>₹5,00,000</div>
        <div style={{marginTop:10, display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:6, fontSize:10}}>
          <div><div style={{color:'var(--muted)'}}>Co. A</div><div style={{fontWeight:600}}>₹2.50L</div></div>
          <div><div style={{color:'var(--muted)'}}>Co. B</div><div style={{fontWeight:600}}>₹1.80L</div></div>
          <div><div style={{color:'var(--muted)'}}>Co. C</div><div style={{fontWeight:600}}>₹0.70L</div></div>
        </div>
      </div>

      {/* main dashboard card */}
      <div style={{
        position:'absolute', right:'0', top:'4%',
        width:'78%', background:'#fff', borderRadius:18,
        border:'1px solid var(--line)', boxShadow:'0 40px 80px -40px rgba(14,27,44,.30)',
        padding:22, zIndex:2,
      }}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div>
            <div style={{fontSize:10, fontWeight:700, letterSpacing:'.16em', color:'var(--muted)'}}>SMART DASHBOARD</div>
            <div className="serif" style={{fontSize:18, fontWeight:600, marginTop:2}}>Today · 25 Apr 2026</div>
          </div>
          <div style={{width:32, height:32, borderRadius:8, background:'var(--orange)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:14, fontWeight:700}}>
            <Icon name="grid" size={16} stroke={2.2}/>
          </div>
        </div>

        <div style={{marginTop:18, display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
          <div style={{padding:12, background:'var(--teal-soft)', borderRadius:10}}>
            <div style={{fontSize:10, color:'var(--ink-soft)', fontWeight:600}}>SALES TODAY</div>
            <div className="serif" style={{fontSize:22, fontWeight:600, marginTop:4}}>₹8.4L</div>
            <div style={{fontSize:10, color:'var(--teal)', marginTop:2, fontWeight:600}}>↑ 12% vs avg</div>
          </div>
          <div style={{padding:12, background:'rgba(225,83,11,.08)', borderRadius:10}}>
            <div style={{fontSize:10, color:'var(--ink-soft)', fontWeight:600}}>COLLECTION</div>
            <div className="serif" style={{fontSize:22, fontWeight:600, marginTop:4}}>₹6.2L</div>
            <div style={{fontSize:10, color:'var(--orange)', marginTop:2, fontWeight:600}}>74% of sales</div>
          </div>
        </div>

        <div style={{marginTop:10, padding:12, background:'var(--ink)', borderRadius:10, color:'#fff'}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div>
              <div style={{fontSize:10, color:'rgba(255,255,255,.65)', fontWeight:600}}>TOTAL OUTSTANDING</div>
              <div className="serif" style={{fontSize:22, fontWeight:600, marginTop:2}}>₹47.6L</div>
            </div>
            <div style={{fontSize:10, color:'#fff', background:'rgba(255,255,255,.12)', padding:'4px 10px', borderRadius:999, fontWeight:600}}>4 high-risk</div>
          </div>
        </div>

        <div style={{marginTop:12, display:'flex', alignItems:'center', gap:8, fontSize:11, color:'var(--ink-soft)'}}>
          <Icon name="grid" size={13} stroke={1.8}/>
          <span>Live · auto-refresh every 60s</span>
        </div>
      </div>

      {/* floating chip — mobile alert */}
      <div style={{
        position:'absolute', right:'-4%', bottom:'4%',
        background:'var(--ink)', color:'#fff',
        borderRadius:12, padding:'10px 14px',
        boxShadow:'0 24px 40px -20px rgba(14,27,44,.45)',
        zIndex:3, display:'flex', alignItems:'center', gap:10,
        fontSize:12, fontWeight:500,
      }}>
        <div style={{width:8, height:8, borderRadius:'50%', background:'#22c55e'}}/>
        <span>Mobile alert · Owner sees this live</span>
      </div>
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
                <div className="serif" style={{fontSize:28, fontWeight:600, lineHeight:1}}>20+</div>
                <div style={{fontSize:11.5, color:'var(--muted)', marginTop:4, letterSpacing:'.06em', textTransform:'uppercase'}}>Years experience</div>
              </div>
              <div style={{width:1, height:36, background:'var(--line-2)'}}/>
              <div>
                <div className="serif" style={{fontSize:28, fontWeight:600, lineHeight:1}}>3,000+</div>
                <div style={{fontSize:11.5, color:'var(--muted)', marginTop:4, letterSpacing:'.06em', textTransform:'uppercase'}}>Active users</div>
              </div>
              <div style={{width:1, height:36, background:'var(--line-2)'}}/>
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
// SoftCloudERPPage — page-level composition.
// More sections (benefits, features, multi-company view, trust,
// final CTA) come in the next prompt.
// ============================================================

export default function SoftCloudERPPage() {
  return (
    <div className="design-page">
      <Hero/>
      <ProblemsSolutions/>
    </div>
  );
}
