import { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from './design/Icon';
import { siteConfig } from '../config/site';

const PHONE_DISPLAY = siteConfig.phones.sales;
const PHONE_TEL     = siteConfig.phones.sales.replace(/\s|\+/g, '').replace(/^/, '+');

// ============================================================
// Featured offer — the big hero card
// ============================================================
const FEATURED_OFFER = {
  badge: 'FEATURED',
  badgeSecondary: 'LIMITED',
  code: 'UNIQUE25',
  title: '25% off',
  subtitle: 'TallyPrime Gold',
  originalPrice: 67500,
  finalPrice: 50625,
  // Set the offer end date — adjust as needed. Currently 21 days from now
  endsInDays: 21,
};

// ============================================================
// Filter categories
// ============================================================
const CATEGORIES = [
  { id: 'all',        label: 'All offers' },
  { id: 'tallyprime', label: 'TallyPrime' },
  { id: 'softtrade',  label: 'SoftTrade' },
  { id: 'custom',     label: 'Customisation' },
  { id: 'amc',        label: 'AMC & Support' },
  { id: 'bundles',    label: 'Bundles' },
];

// ============================================================
// Format helpers
// ============================================================
function formatINR(n) {
  return new Intl.NumberFormat('en-IN').format(n);
}

// ============================================================
// CountdownTimer — live ticking timer for the featured offer
// ============================================================
function CountdownTimer({ endsAt }) {
  const calculate = () => {
    const diff = Math.max(0, endsAt - Date.now());
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);
    return { days, hours, mins, secs };
  };

  const [t, setT] = useState(calculate());

  useEffect(() => {
    const id = setInterval(() => setT(calculate()), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endsAt]);

  const Cell = ({ value, label }) => (
    <div style={{
      flex:1, padding:'14px 8px', textAlign:'center',
      background:'rgba(255,255,255,.06)', borderRadius:10,
      border:'1px solid rgba(255,255,255,.08)',
    }}>
      <div className="serif" style={{fontSize:28, fontWeight:600, lineHeight:1, color:'#fff'}}>
        {String(value).padStart(2, '0')}
      </div>
      <div style={{fontSize:9.5, color:'rgba(255,255,255,.55)', fontWeight:700, letterSpacing:'.16em', textTransform:'uppercase', marginTop:6}}>
        {label}
      </div>
    </div>
  );

  return (
    <div style={{display:'flex', gap:10}}>
      <Cell value={t.days}  label="Days"  />
      <Cell value={t.hours} label="Hours" />
      <Cell value={t.mins}  label="Min"   />
      <Cell value={t.secs}  label="Sec"   />
    </div>
  );
}

// ============================================================
// Hero — left: copy + CTAs · right: featured offer card with timer
// ============================================================
function Hero() {
  const endsAt = Date.now() + FEATURED_OFFER.endsInDays * 24 * 60 * 60 * 1000;

  return (
    <section style={{position:'relative', overflow:'hidden',
      background:'linear-gradient(180deg,#F1EADB 0%,#FBF8F1 100%)',
      borderBottom:'1px solid var(--line)'}}>
      <div className="paper-grid" style={{position:'absolute', inset:0, opacity:.45, pointerEvents:'none',
        maskImage:'radial-gradient(ellipse at top right, black, transparent 70%)',
        WebkitMaskImage:'radial-gradient(ellipse at top right, black, transparent 70%)'}}/>
      <div style={{position:'absolute', right:'-200px', top:'-200px', width:600, height:600, borderRadius:'50%',
        background:'radial-gradient(circle, rgba(225,83,11,.12), transparent 60%)', pointerEvents:'none'}}/>

      <div className="container wave-hero" style={{position:'relative', padding:'140px 32px 80px'}}>
        {/* breadcrumb */}
        <nav aria-label="Breadcrumb" style={{
          marginBottom:24, display:'flex', alignItems:'center', gap:8,
          fontSize:12.5, fontWeight:500, color:'rgba(14,27,44,.55)',
        }}>
          <Link to="/" style={{color:'inherit', textDecoration:'none'}}>Home</Link>
          <span>›</span>
          <span style={{color:'var(--ink)'}}>Offers</span>
        </nav>

        <div className="wave-hero-grid" style={{display:'grid', gridTemplateColumns:'1.05fr 1fr', gap:64, alignItems:'center'}}>
          <div>
            <span className="eyebrow"><span className="dot"></span>Live offers · May 2026</span>

            <h1 className="serif" style={{
              fontSize:'clamp(44px,5.6vw,76px)', lineHeight:0.98,
              fontWeight:600, margin:'24px 0 0', letterSpacing:'-0.025em',
            }}>
              Save more on{' '}
              <span style={{color:'var(--orange)', fontStyle:'italic'}}>genuine</span>{' '}
              Tally this season.
            </h1>

            <p style={{fontSize:17, lineHeight:1.65, color:'var(--ink-soft)', maxWidth:520, marginTop:24}}>
              Festive discounts, bundle pricing on TDL customisation, and zero-cost EMI on Server edition. New offers added every month — straight from our Jaipur partner desk.
            </p>

            <div style={{display:'flex', gap:12, marginTop:32, flexWrap:'wrap'}}>
              <Link to="/contact" className="btn btn-primary">
                Claim your offer <Icon name="arrow" size={16} stroke={2.2} className="arrow"/>
              </Link>
              <a href={`tel:${PHONE_TEL}`} className="btn btn-dark">
                <Icon name="phone" size={13} stroke={2}/> {PHONE_DISPLAY}
              </a>
            </div>
          </div>

          {/* FEATURED OFFER CARD */}
          <div style={{
            position:'relative', background:'var(--ink)', color:'#fff',
            borderRadius:20, padding:'32px 32px 28px',
            boxShadow:'0 40px 80px -40px rgba(14,27,44,.45)',
            overflow:'hidden',
          }}>
            <div style={{position:'absolute', right:'-80px', top:'-80px', width:280, height:280, borderRadius:'50%',
              background:'radial-gradient(circle, rgba(225,83,11,.20), transparent 65%)', pointerEvents:'none'}}/>

            <div style={{position:'relative', display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:12}}>
              <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
                <span style={{
                  fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase',
                  background:'var(--orange)', color:'#fff', padding:'5px 10px', borderRadius:999,
                }}>
                  ✦ {FEATURED_OFFER.badge}
                </span>
                <span style={{
                  fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase',
                  background:'rgba(255,255,255,.08)', color:'rgba(255,255,255,.85)',
                  padding:'5px 10px', borderRadius:999, border:'1px solid rgba(255,255,255,.10)',
                }}>
                  {FEATURED_OFFER.badgeSecondary}
                </span>
              </div>
              <div style={{textAlign:'right'}}>
                <div style={{fontSize:10, color:'rgba(255,255,255,.55)', fontWeight:600, letterSpacing:'.12em', textTransform:'uppercase'}}>Code</div>
                <div className="serif" style={{fontSize:16, fontWeight:600, marginTop:2, color:'var(--orange)'}}>
                  {FEATURED_OFFER.code}
                </div>
              </div>
            </div>

            <div style={{position:'relative', marginTop:24}}>
              <div className="serif" style={{fontSize:54, fontWeight:600, lineHeight:1, letterSpacing:'-0.025em'}}>
                {FEATURED_OFFER.title}
              </div>
              <div className="serif" style={{fontSize:24, fontStyle:'italic', fontWeight:500, marginTop:6, color:'rgba(255,255,255,.82)'}}>
                {FEATURED_OFFER.subtitle}
              </div>
            </div>

            <div style={{position:'relative', marginTop:20, display:'flex', alignItems:'baseline', gap:14, flexWrap:'wrap'}}>
              <div style={{textDecoration:'line-through', color:'rgba(255,255,255,.5)', fontSize:18, fontWeight:500}}>
                ₹{formatINR(FEATURED_OFFER.originalPrice)}
              </div>
              <div className="serif" style={{fontSize:36, fontWeight:600, color:'#fff', letterSpacing:'-0.02em'}}>
                ₹{formatINR(FEATURED_OFFER.finalPrice)}
              </div>
              <div style={{fontSize:13, color:'rgba(255,255,255,.55)', fontWeight:500}}>+ GST</div>
            </div>

            <div style={{position:'relative', marginTop:24}}>
              <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.16em', textTransform:'uppercase', color:'rgba(255,255,255,.55)', marginBottom:10}}>
                Offer ends in
              </div>
              <CountdownTimer endsAt={endsAt}/>
            </div>

            <Link to="/contact" className="btn btn-primary" style={{
              position:'relative', marginTop:24, width:'100%', justifyContent:'center',
            }}>
              Claim 25% off <Icon name="arrow" size={15} stroke={2.2} className="arrow"/>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FilterStrip — sticky-feeling tab row below the hero. Receives
// active state from page so cards filter accordingly.
// ============================================================
function FilterStrip({ active, setActive }) {
  return (
    <section style={{
      position:'relative', background:'#FBF8F1',
      borderBottom:'1px solid var(--line)',
    }}>
      <div className="container" style={{padding:'18px 32px', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:16}}>
        <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
          {CATEGORIES.map(cat => {
            const isActive = cat.id === active;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActive(cat.id)}
                style={{
                  padding:'8px 16px', borderRadius:999,
                  fontSize:13, fontWeight:600, cursor:'pointer',
                  background: isActive ? 'var(--ink)' : '#fff',
                  color: isActive ? '#fff' : 'var(--ink)',
                  border: isActive ? '1px solid var(--ink)' : '1px solid var(--line)',
                  transition:'background-color .2s ease, color .2s ease, border-color .2s ease',
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        <div style={{display:'flex', alignItems:'center', gap:8, fontSize:12, fontWeight:500, color:'var(--ink-soft)'}}>
          <span style={{
            width:6, height:6, borderRadius:'50%', background:'var(--teal)',
          }}/>
          Updated weekly
        </div>
      </div>
    </section>
  );
}

// ============================================================
// OffersPage — page shell. More sections come in next prompts.
// ============================================================
export default function OffersPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  return (
    <div className="design-page">
      <Hero/>
      <FilterStrip active={activeCategory} setActive={setActiveCategory}/>
      {/* Offer cards grid, How It Works, Newsletter, FAQ — coming in next prompts */}
      <section style={{padding:'80px 0', background:'#FBF8F1', textAlign:'center'}}>
        <div className="container" style={{padding:'0 32px'}}>
          <p style={{fontSize:14, color:'var(--ink-soft)', fontStyle:'italic'}}>
            Offer card grid coming next. Selected: <strong>{activeCategory}</strong>
          </p>
        </div>
      </section>
    </div>
  );
}
