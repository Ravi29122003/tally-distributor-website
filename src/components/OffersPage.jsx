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
// All offer cards — 9 entries matching the design
// ============================================================
const OFFERS = [
  {
    id: 'tallyprime-gold-festive',
    category: 'tallyprime',
    catLabel: 'TALLYPRIME',
    badge: '-25% OFF',
    badgeTone: 'orange',
    title: 'TallyPrime Gold — festive discount',
    desc: '25% off MRP for unlimited-user Gold edition. Free installation + 30-day onboarding included.',
    originalPrice: 67500,
    finalPrice: 50625,
    priceSuffix: '+ GST',
    code: 'UNIQUE25',
    endsLabel: 'Ends 31 May',
  },
  {
    id: 'server-emi',
    category: 'tallyprime',
    catLabel: 'TALLYPRIME',
    badge: 'EMI · 0%',
    badgeTone: 'orange',
    title: 'Server edition on zero-cost EMI',
    desc: 'Split TallyPrime Server payment into 6 EMIs. Nil interest, nil processing fee on HDFC & ICICI cards.',
    originalPrice: 270000,
    finalPrice: 45000,
    priceSuffix: '/month × 6',
    code: 'EMI-SERVER',
    endsLabel: 'Ends 30 Jun',
  },
  {
    id: 'mandi-tally-bundle',
    category: 'bundles',
    catLabel: 'SOFTTRADE',
    badge: 'BUNDLE',
    badgeTone: 'orange',
    title: 'SoftTrade-Mandi + Tally Gold',
    desc: 'Buy Tally Gold and get SoftTrade-Mandi at half price. Built for grain, oilseed and cotton mandis.',
    originalPrice: 85500,
    finalPrice: 67000,
    priceSuffix: 'bundle',
    code: 'MANDI-50',
    endsLabel: 'Ends 15 Jun',
    highlight: true,
  },
  {
    id: 'tdl-pack-5',
    category: 'custom',
    catLabel: 'CUSTOMISATION',
    badge: '-30% OFF',
    badgeTone: 'orange',
    title: 'TDL pack of 5 — flat rate',
    desc: 'Five custom voucher / report TDLs at a single bundled rate. Source code handover included.',
    originalPrice: 35000,
    finalPrice: 24500,
    priceSuffix: 'one-time',
    code: 'TDL5',
    endsLabel: 'Ends 31 May',
  },
  {
    id: 'amc-3-free',
    category: 'amc',
    catLabel: 'AMC & SUPPORT',
    badge: '+3 MONTHS',
    badgeTone: 'orange',
    title: 'Annual AMC — get 3 extra months',
    desc: 'Buy any annual AMC plan (Basic / Pro / Premium) and we extend it by 3 months. New AMC clients only.',
    originalPrice: null,
    finalPrice: null,
    priceLabel: '15 mo.',
    priceSuffix: 'for price of 12',
    code: 'AMC15',
    endsLabel: 'Ends 30 Jun',
    highlight: true,
  },
  {
    id: 'starter-pack',
    category: 'bundles',
    catLabel: 'BUNDLES',
    badge: 'STARTER',
    badgeTone: 'orange',
    title: 'New-business starter pack',
    desc: 'TallyPrime Silver + 1-year AMC Basic + 2-hour onboarding. Everything you need to open your books.',
    originalPrice: 28400,
    finalPrice: 21999,
    priceSuffix: '+ GST',
    code: 'STARTUP',
    endsLabel: 'Ends 30 Jun',
  },
  {
    id: 'tss-renewal',
    category: 'tallyprime',
    catLabel: 'TALLYPRIME',
    badge: 'TSS',
    badgeTone: 'orange',
    title: 'TSS renewal — 10% off',
    desc: 'Renew your Tally Software Services subscription early and save 10%. All editions eligible.',
    originalPrice: 4500,
    finalPrice: 4050,
    priceSuffix: 'per user / yr',
    code: 'TSS10',
    endsLabel: 'Ends 30 Jun',
  },
  {
    id: 'zoho-tally',
    category: 'custom',
    catLabel: 'CUSTOMISATION',
    badge: 'INTEGRATION',
    badgeTone: 'orange',
    title: 'Zoho ↔ Tally — flat fee',
    desc: 'One-time integration setup between Zoho Books and TallyPrime. Includes 2 sync mappings.',
    originalPrice: 18000,
    finalPrice: 12500,
    priceSuffix: 'one-time',
    code: 'ZOHO12',
    endsLabel: 'Ends 30 Jun',
  },
  {
    id: 'corporate-training',
    category: 'amc',
    catLabel: 'AMC & SUPPORT',
    badge: 'GROUP',
    badgeTone: 'orange',
    title: 'Corporate training — group rate',
    desc: 'Book a 4-hour TallyPrime training for up to 10 staff. On-site in Jaipur or remote anywhere.',
    originalPrice: 15000,
    finalPrice: 9999,
    priceSuffix: 'flat',
    code: 'TRAIN10',
    endsLabel: 'Ends 30 Jun',
    highlight: true,
  },
];

// Maps category id → icon name (uses Icon component's existing names)
const CATEGORY_ICON = {
  tallyprime: 'grid',
  softtrade:  'boxes',
  custom:     'file',
  amc:        'msg',
  bundles:    'receipt',
};

// ============================================================
// OfferCard — single card inside the grid
// ============================================================
function OfferCard({ offer }) {
  return (
    <div style={{
      position:'relative', background:'#fff', border:'1px solid var(--line)',
      borderRadius:18, padding:'28px 26px 24px',
      display:'flex', flexDirection:'column',
      transition:'border-color .2s ease, transform .2s ease, box-shadow .2s ease',
      cursor:'default',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = 'rgba(225,83,11,.4)';
      e.currentTarget.style.transform = 'translateY(-3px)';
      e.currentTarget.style.boxShadow = '0 24px 40px -28px rgba(14,27,44,.18)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = 'var(--line)';
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
    }}
    >
      {/* badge top-right */}
      <span style={{
        position:'absolute', top:14, right:14,
        fontSize:10, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase',
        padding:'5px 10px', borderRadius:999,
        background:'var(--orange)', color:'#fff',
      }}>
        {offer.badge}
      </span>

      {/* category tag with icon */}
      <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:18}}>
        <span style={{
          width:36, height:36, borderRadius:10,
          background:'var(--teal-soft)', color:'var(--teal)',
          display:'inline-flex', alignItems:'center', justifyContent:'center',
        }}>
          <Icon name={CATEGORY_ICON[offer.category] || 'grid'} size={16} stroke={2}/>
        </span>
        <span style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', color:'var(--muted)'}}>
          {offer.catLabel}
        </span>
      </div>

      {/* title */}
      <h3 className="serif" style={{fontSize:21, fontWeight:600, lineHeight:1.25, margin:0, letterSpacing:'-0.01em'}}>
        {offer.title}
      </h3>

      {/* description */}
      <p style={{fontSize:13.5, color:'var(--ink-soft)', lineHeight:1.55, margin:'10px 0 22px'}}>
        {offer.desc}
      </p>

      {/* price row */}
      <div style={{paddingTop:14, paddingBottom:12, borderTop:'1px dashed var(--line-2)'}}>
        <div style={{display:'flex', alignItems:'baseline', gap:8, flexWrap:'wrap'}}>
          {offer.priceLabel ? (
            <>
              <span className="serif" style={{fontSize:32, fontWeight:600, lineHeight:1, letterSpacing:'-0.02em'}}>
                {offer.priceLabel}
              </span>
              <span style={{fontSize:12.5, color:'var(--muted)'}}>{offer.priceSuffix}</span>
            </>
          ) : (
            <>
              {offer.originalPrice && (
                <span style={{textDecoration:'line-through', color:'var(--muted)', fontSize:14}}>
                  ₹{formatINR(offer.originalPrice)}
                </span>
              )}
              <span className="serif" style={{fontSize:26, fontWeight:600, lineHeight:1, letterSpacing:'-0.015em'}}>
                ₹{formatINR(offer.finalPrice)}
              </span>
              <span style={{fontSize:12, color:'var(--muted)'}}>{offer.priceSuffix}</span>
            </>
          )}
        </div>
      </div>

      {/* meta row — ends + code */}
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap:8, marginBottom:18}}>
        <span style={{display:'inline-flex', alignItems:'center', gap:6, fontSize:11.5, color:'var(--ink-soft)'}}>
          <Icon name="grid" size={11} stroke={2}/>
          {offer.endsLabel}
        </span>
        <span style={{
          fontSize:10.5, fontWeight:700, letterSpacing:'.10em', color:'var(--ink)',
          background:'rgba(14,27,44,.06)', padding:'4px 8px', borderRadius:6,
        }}>
          {offer.code}
        </span>
      </div>

      {/* CTA — full width */}
      <Link to="/contact" className={offer.highlight ? 'btn btn-dark' : 'btn btn-primary'} style={{
        width:'100%', justifyContent:'center', marginTop:'auto',
      }}>
        Claim offer <Icon name="arrow" size={14} stroke={2.2} className="arrow"/>
      </Link>
    </div>
  );
}

// ============================================================
// OfferCardsGrid — section that filters OFFERS by activeCategory
// ============================================================
function OfferCardsGrid({ activeCategory }) {
  const visibleOffers = activeCategory === 'all'
    ? OFFERS
    : OFFERS.filter(o => o.category === activeCategory);

  return (
    <section style={{padding:'80px 0 100px', background:'#FBF8F1', borderBottom:'1px solid var(--line)'}}>
      <div className="container" style={{padding:'0 32px'}}>
        {/* section header */}
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap', gap:24, marginBottom:40}}>
          <div>
            <div style={{fontSize:11, fontWeight:700, letterSpacing:'.16em', color:'var(--orange)', textTransform:'uppercase'}}>
              {visibleOffers.length} live offer{visibleOffers.length === 1 ? '' : 's'}
            </div>
            <h2 className="serif" style={{fontSize:'clamp(28px,3.6vw,40px)', fontWeight:600, lineHeight:1.1, marginTop:8, letterSpacing:'-0.02em'}}>
              Pick what suits you.
            </h2>
          </div>
          <div style={{display:'flex', alignItems:'center', gap:8, fontSize:12, color:'var(--ink-soft)'}}>
            <Icon name="check" size={13} stroke={2}/>
            All licences genuine · issued by Tally Solutions Pvt. Ltd.
          </div>
        </div>

        {/* cards grid — 3 columns, responsive */}
        {visibleOffers.length > 0 ? (
          <div style={{
            display:'grid',
            gridTemplateColumns:'repeat(auto-fill, minmax(320px, 1fr))',
            gap:20,
          }}>
            {visibleOffers.map(o => <OfferCard key={o.id} offer={o}/>)}
          </div>
        ) : (
          <div style={{textAlign:'center', padding:'60px 20px', background:'#fff', border:'1px dashed var(--line-2)', borderRadius:18}}>
            <p style={{fontSize:15, color:'var(--ink-soft)'}}>
              No offers in this category right now. Check back next month — or call us at {PHONE_DISPLAY}.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

// ============================================================
// HowItWorks — 3-step explainer below the cards grid
// ============================================================
function HowItWorks() {
  const steps = [
    {
      ic:'msg',
      label:'Call or WhatsApp',
      body:'Tell us which offer caught your eye. We confirm eligibility and current stock in 2 minutes.',
    },
    {
      ic:'receipt',
      label:'Quote + invoice',
      body:'We send a GST-compliant quote. Pay by NEFT, UPI, card or EMI — your choice.',
    },
    {
      ic:'check',
      label:'Activation',
      body:'Genuine licence key arrives within 30 minutes. Free remote installation the same day.',
    },
  ];

  return (
    <section style={{padding:'100px 0', background:'#FBF8F1', borderBottom:'1px solid var(--line)'}}>
      <div className="container" style={{padding:'0 32px'}}>
        <div style={{textAlign:'center', maxWidth:640, margin:'0 auto 56px'}}>
          <div style={{fontSize:11, fontWeight:700, letterSpacing:'.20em', color:'var(--orange)', textTransform:'uppercase'}}>
            How it works
          </div>
          <h2 className="serif" style={{fontSize:'clamp(32px,4.2vw,48px)', fontWeight:600, lineHeight:1.05, marginTop:14, letterSpacing:'-0.02em'}}>
            Three calls, one clean install.
          </h2>
        </div>

        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))', gap:20}}>
          {steps.map((s, i) => (
            <div key={i} style={{
              background:'#fff', border:'1px solid var(--line)', borderRadius:16,
              padding:28, position:'relative',
            }}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:18}}>
                <span style={{
                  width:42, height:42, borderRadius:10,
                  background:'var(--ink)', color:'#fff',
                  display:'inline-flex', alignItems:'center', justifyContent:'center',
                }}>
                  <Icon name={s.ic} size={18} stroke={2}/>
                </span>
                <span style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', color:'var(--muted)'}}>
                  STEP 0{i + 1}
                </span>
              </div>
              <h3 className="serif" style={{fontSize:20, fontWeight:600, margin:0, lineHeight:1.2}}>
                {s.label}
              </h3>
              <p style={{fontSize:13.5, color:'var(--ink-soft)', lineHeight:1.55, marginTop:10}}>
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

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
      <OfferCardsGrid activeCategory={activeCategory}/>
      <HowItWorks/>
      {/* Newsletter and FAQ — coming in next prompt */}
    </div>
  );
}
