import { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from './design/Icon';
import { siteConfig } from '../config/site';

const PHONE_DISPLAY = siteConfig.phones.sales;
const PHONE_TEL     = siteConfig.phones.sales.replace(/\s|\+/g, '').replace(/^/, '+');

// Master flag — flip to true when real live offers exist
const OFFERS_ACTIVE = false;

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

// ============================================================
// FAQ entries — 5 questions, all answers in user's own voice
// ============================================================
const FAQ_ITEMS = [
  {
    q: 'Are these offers genuine?',
    a: 'Yes — every licence is a fresh activation key issued direct by Tally Solutions Pvt. Ltd. We do not sell second-hand or grey-market keys. Channel-partner discounts come from Tally; bundle and customisation discounts come from us.',
  },
  {
    q: 'Can I combine offers?',
    a: 'In most cases, no — each offer applies on its own. The exception is bundles, where the bundle price already factors in the SoftTrade discount. If you want to stack a customisation offer on top of a Tally licence offer, call us and we will work it out.',
  },
  {
    q: 'Do prices include GST?',
    a: 'Prices shown are exclusive of 18% GST unless we specifically mark "incl. GST". Your final invoice will always show the GST line separately so you can claim the input credit.',
  },
  {
    q: 'What about returns?',
    a: 'Tally licences are non-refundable once the activation key is issued, since the key is tied to your serial. AMC and customisation work is refundable on a pro-rata basis if you cancel before the work begins.',
  },
  {
    q: 'Do you ship outside Rajasthan?',
    a: 'Yes. Genuine Tally licences are delivered as digital activation keys — no shipping required. Remote installation works anywhere in India over screen-share. On-site visits are limited to Rajasthan, but we do travel for enterprise deals.',
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
  if (!OFFERS_ACTIVE) {
    return (
      <section style={{padding:'40px 0 80px', background:'#FBF8F1', borderBottom:'1px solid var(--line)'}}>
        <div className="container" style={{padding:'0 32px'}}>
          <div style={{
            maxWidth:760, margin:'0 auto',
            padding:'56px 40px', textAlign:'center',
            background:'#fff', border:'1px dashed var(--line-2)', borderRadius:20,
          }}>
            <div style={{
              width:56, height:56, borderRadius:'50%',
              background:'rgba(225,83,11,.10)', color:'var(--orange)',
              display:'inline-flex', alignItems:'center', justifyContent:'center',
              marginBottom:18,
            }}>
              <Icon name="receipt" size={24} stroke={2}/>
            </div>
            <h2 className="serif" style={{fontSize:'clamp(24px,3.2vw,34px)', fontWeight:600, lineHeight:1.15, letterSpacing:'-0.015em', margin:0}}>
              The next batch drops soon.
            </h2>
            <p style={{fontSize:15, color:'var(--ink-soft)', lineHeight:1.65, marginTop:14, maxWidth:520, marginLeft:'auto', marginRight:'auto'}}>
              We refresh offers on the first of each month — festive deals, bundle pricing, AMC sweeteners. Subscribe below or get in touch directly for a custom quote.
            </p>
            <div style={{display:'inline-flex', flexWrap:'wrap', gap:10, justifyContent:'center', marginTop:24}}>
              <Link to="/contact" className="btn btn-primary">
                Get a custom quote <Icon name="arrow" size={14} stroke={2.2} className="arrow"/>
              </Link>
              <a href="#newsletter" className="btn btn-dark">
                Subscribe for the next drop
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const visibleOffers = activeCategory === 'all'
    ? OFFERS
    : OFFERS.filter(o => o.category === activeCategory);

  return (
    <section style={{padding:'80px 0 100px', background:'#FBF8F1', borderBottom:'1px solid var(--line)'}}>
      <div className="container" style={{padding:'0 32px'}}>
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
  if (!OFFERS_ACTIVE) return null;
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

        {OFFERS_ACTIVE ? (
          <div className="wave-hero-grid" style={{display:'grid', gridTemplateColumns:'1.05fr 1fr', gap:64, alignItems:'center'}}>
            <div>
              <span className="eyebrow"><span className="dot"></span>Live offers</span>
              <h1 className="serif" style={{fontSize:'clamp(44px,5.6vw,76px)', lineHeight:0.98, fontWeight:600, margin:'24px 0 0', letterSpacing:'-0.025em'}}>
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

            {/* FEATURED OFFER CARD with countdown — keep existing JSX */}
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
                Claim {FEATURED_OFFER.title} <Icon name="arrow" size={15} stroke={2.2} className="arrow"/>
              </Link>
            </div>
          </div>
        ) : (
          // INACTIVE state — between cycles
          <div style={{maxWidth: 760}}>
            <span className="eyebrow"><span className="dot"></span>Between offer cycles</span>
            <h1 className="serif" style={{fontSize:'clamp(44px,5.6vw,76px)', lineHeight:0.98, fontWeight:600, margin:'24px 0 0', letterSpacing:'-0.025em'}}>
              No live offers <span style={{color:'var(--orange)', fontStyle:'italic'}}>right now</span>.
            </h1>
            <p style={{fontSize:17, lineHeight:1.65, color:'var(--ink-soft)', maxWidth:600, marginTop:24}}>
              Our next wave of festive and bundle pricing drops on the first of the month. Subscribe below to be the first to know — or call us anytime for a direct quote on TallyPrime licences, AMC, customisation or SoftTrade software.
            </p>
            <div style={{display:'flex', gap:12, marginTop:32, flexWrap:'wrap'}}>
              <a href="#newsletter" className="btn btn-primary">
                Notify me <Icon name="arrow" size={16} stroke={2.2} className="arrow"/>
              </a>
              <a href={`tel:${PHONE_TEL}`} className="btn btn-dark">
                <Icon name="phone" size={13} stroke={2}/> {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ============================================================
// FilterStrip — sticky-feeling tab row below the hero. Receives
// active state from page so cards filter accordingly.
// ============================================================
function FilterStrip({ active, setActive }) {
  if (!OFFERS_ACTIVE) return null;
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
// Newsletter — dark section with subscribe form. Form does not
// actually submit anywhere yet (UI-only); user can wire it up
// to Mailchimp/ConvertKit/etc. later.
// ============================================================
function Newsletter() {
  const [name, setName]   = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    // TODO: wire up to Mailchimp / ConvertKit / your email tool here
    setSubmitted(true);
  };

  return (
    <section id="newsletter" style={{
      position:'relative', overflow:'hidden',
      background:'var(--ink)', color:'#fff',
      padding:'90px 0',
    }}>
      <div style={{position:'absolute', right:'-200px', top:'-150px', width:500, height:500, borderRadius:'50%',
        background:'radial-gradient(circle, rgba(225,83,11,.18), transparent 65%)', pointerEvents:'none'}}/>
      <div style={{position:'absolute', left:'-150px', bottom:'-150px', width:400, height:400, borderRadius:'50%',
        background:'radial-gradient(circle, rgba(22,160,133,.10), transparent 65%)', pointerEvents:'none'}}/>

      <div className="container" style={{position:'relative', padding:'0 32px'}}>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1.1fr', gap:60, alignItems:'center'}}>
          {/* LEFT — copy */}
          <div>
            <div style={{fontSize:11, fontWeight:700, letterSpacing:'.20em', color:'rgba(255,255,255,.55)', textTransform:'uppercase'}}>
              Stay in the loop
            </div>
            <h2 className="serif" style={{
              fontSize:'clamp(32px,4.2vw,48px)', fontWeight:600,
              lineHeight:1.05, marginTop:14, letterSpacing:'-0.02em',
            }}>
              New offers, every first of the month.
            </h2>
            <p style={{fontSize:15, color:'rgba(255,255,255,.65)', marginTop:18, lineHeight:1.6, maxWidth:440}}>
              One short email a month. Festive deals, TDL bundles, AMC sweeteners. No spam, unsubscribe anytime.
            </p>
          </div>

          {/* RIGHT — form */}
          <div style={{
            background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.10)',
            borderRadius:18, padding:32, backdropFilter:'blur(8px)',
          }}>
            {submitted ? (
              <div style={{textAlign:'center', padding:'12px 0'}}>
                <div style={{
                  width:52, height:52, borderRadius:'50%', background:'var(--teal)',
                  display:'inline-flex', alignItems:'center', justifyContent:'center',
                  marginBottom:14,
                }}>
                  <Icon name="check" size={22} stroke={2.5}/>
                </div>
                <h3 className="serif" style={{fontSize:22, fontWeight:600, margin:0}}>
                  You're subscribed.
                </h3>
                <p style={{fontSize:13.5, color:'rgba(255,255,255,.65)', marginTop:8}}>
                  We'll send the next deal to <strong style={{color:'#fff'}}>{email}</strong> on the 1st.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate>
                <div style={{fontSize:11, fontWeight:700, letterSpacing:'.16em', color:'rgba(255,255,255,.55)', textTransform:'uppercase', marginBottom:14}}>
                  Subscribe free
                </div>

                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:10}}>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    required
                    style={{
                      width:'100%', padding:'13px 14px', fontSize:14, color:'#fff',
                      background:'rgba(255,255,255,.06)', border:'1px solid rgba(255,255,255,.12)',
                      borderRadius:10, outline:'none',
                    }}
                  />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone / WhatsApp"
                    style={{
                      width:'100%', padding:'13px 14px', fontSize:14, color:'#fff',
                      background:'rgba(255,255,255,.06)', border:'1px solid rgba(255,255,255,.12)',
                      borderRadius:10, outline:'none',
                    }}
                  />
                </div>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  required
                  style={{
                    width:'100%', padding:'13px 14px', fontSize:14, color:'#fff',
                    background:'rgba(255,255,255,.06)', border:'1px solid rgba(255,255,255,.12)',
                    borderRadius:10, outline:'none', marginBottom:14,
                  }}
                />

                <button type="submit" className="btn btn-primary" style={{
                  width:'100%', justifyContent:'center', padding:'14px 20px',
                }}>
                  Send me the next deal <Icon name="arrow" size={15} stroke={2.2} className="arrow"/>
                </button>

                <p style={{fontSize:11.5, color:'rgba(255,255,255,.45)', textAlign:'center', marginTop:14}}>
                  Trusted by Tally users across Rajasthan
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FAQ — accordion. First item open by default.
// ============================================================
function FAQItem({ item, isOpen, onToggle }) {
  return (
    <div style={{
      background:'#fff', border:'1px solid var(--line)', borderRadius:14,
      overflow:'hidden', transition:'border-color .2s ease',
      borderColor: isOpen ? 'rgba(225,83,11,.4)' : 'var(--line)',
    }}>
      <button
        type="button"
        onClick={onToggle}
        style={{
          width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center',
          gap:16, padding:'22px 26px', background:'transparent', border:'none',
          textAlign:'left', cursor:'pointer', fontFamily:'inherit',
        }}
      >
        <span className="serif" style={{
          fontSize:16, fontWeight:600, color:'var(--ink)', lineHeight:1.4,
        }}>
          {item.q}
        </span>
        <span style={{
          flexShrink:0, width:32, height:32, borderRadius:'50%',
          background: isOpen ? 'var(--orange)' : 'rgba(14,27,44,.06)',
          color: isOpen ? '#fff' : 'var(--ink)',
          display:'inline-flex', alignItems:'center', justifyContent:'center',
          transition:'background-color .2s ease, color .2s ease, transform .2s ease',
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
        }}>
          <Icon name="arrow" size={14} stroke={2.5} style={{transform:'rotate(90deg)'}}/>
        </span>
      </button>

      {isOpen && (
        <div style={{padding:'0 26px 24px'}}>
          <p style={{fontSize:14, color:'var(--ink-soft)', lineHeight:1.65, margin:0}}>
            {item.a}
          </p>
        </div>
      )}
    </div>
  );
}

function FAQ() {
  const [openIdx, setOpenIdx] = useState(0); // first open by default

  return (
    <section style={{padding:'100px 0', background:'#FBF8F1'}}>
      <div className="container" style={{padding:'0 32px'}}>
        <div style={{textAlign:'center', maxWidth:560, margin:'0 auto 48px'}}>
          <div style={{fontSize:11, fontWeight:700, letterSpacing:'.20em', color:'var(--orange)', textTransform:'uppercase'}}>
            FAQ
          </div>
          <h2 className="serif" style={{fontSize:'clamp(32px,4.2vw,48px)', fontWeight:600, lineHeight:1.05, marginTop:14, letterSpacing:'-0.02em'}}>
            About these offers.
          </h2>
        </div>

        <div style={{maxWidth:760, margin:'0 auto', display:'flex', flexDirection:'column', gap:12}}>
          {FAQ_ITEMS.map((item, i) => (
            <FAQItem
              key={i}
              item={item}
              isOpen={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? -1 : i)}
            />
          ))}
        </div>

        {/* closing CTA strip */}
        <div style={{
          maxWidth:760, margin:'48px auto 0',
          padding:'24px 28px', background:'#fff',
          border:'1px solid var(--line)', borderRadius:16,
          display:'flex', justifyContent:'space-between', alignItems:'center',
          flexWrap:'wrap', gap:16,
        }}>
          <div>
            <div className="serif" style={{fontSize:17, fontWeight:600, color:'var(--ink)'}}>
              Still have questions?
            </div>
            <div style={{fontSize:13, color:'var(--ink-soft)', marginTop:4}}>
              We pick up the phone every working day, 10:00 to 19:00.
            </div>
          </div>
          <div style={{display:'flex', gap:10, flexWrap:'wrap'}}>
            <a href={`tel:${PHONE_TEL}`} className="btn btn-dark">
              <Icon name="phone" size={13} stroke={2}/> {PHONE_DISPLAY}
            </a>
            <Link to="/contact" className="btn btn-primary">
              Contact us <Icon name="arrow" size={14} stroke={2.2} className="arrow"/>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// OffersPage — page shell.
// ============================================================
export default function OffersPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  return (
    <div className="design-page">
      <Hero/>
      <FilterStrip active={activeCategory} setActive={setActiveCategory}/>
      <OfferCardsGrid activeCategory={activeCategory}/>
      <HowItWorks/>
      <Newsletter/>
      <FAQ/>
    </div>
  );
}
