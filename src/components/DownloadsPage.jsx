import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from './design/Icon';
import { Download } from 'lucide-react';
import { siteConfig } from '../config/site';

const PHONE_DISPLAY = siteConfig.phones.sales;
const PHONE_TEL     = siteConfig.phones.sales.replace(/\s|\+/g, '').replace(/^/, '+');

// SoftTrade installers — same OneDrive URLs used on the product pricing pages
const SOFTTRADE_DOWNLOADS = [
  {
    product: 'SoftTrade-Mandi',
    description: 'Mahajani accounting for grain, kirana and oilseed mandis.',
    image: '/softtrade-mandi-box.png',
    variants: [
      { label: 'Single User', sublabel: 'One workstation', url: 'https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL3UvYy85OTYyMjc1Y2ViMDE5MzA2L0lRRE9rY3J4WXBORlFhNFFuTzFRNUNvekFmcjR4MDZYOFVETjY0eldpX0NrcjJFP2U9Vmo3cnRH&cid=9962275CEB019306&id=9962275CEB019306%21sf1ca91ce93624145ae109ced50e42a33&parId=9962275CEB019306%21sbedc6f2afeff48b78db118964be08629&o=OneUp' },
      { label: 'Multi User',  sublabel: 'Unlimited LAN users', url: 'https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL3UvYy85OTYyMjc1Y2ViMDE5MzA2L0lRQkdITHZVSFBmY1NJdkRsQVM2eTR5TUFZYjRaQ0VaRE9rWGxyQTJSV2hDeGdJP2U9SnFxaGRr&cid=9962275CEB019306&id=9962275CEB019306%21sd4bb1c46f71c48dc8bc39404bacb8c8c&parId=9962275CEB019306%21sbedc6f2afeff48b78db118964be08629&o=OneUp' },
    ],
  },
  {
    product: 'SoftTrade-Brokwin',
    description: 'Broker-only accounting built around the sauda.',
    image: '/brokwin-removebg-preview.png',
    variants: [
      { label: 'Single User', sublabel: 'One workstation', url: 'https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL3UvYy85OTYyMjc1Y2ViMDE5MzA2L0lRRGwxRHJHX2Nhc1FiNy01cEg2czNQZUFZVXQwa0FEdEhqVkpLTGxxN1BFb2pvP2U9YnUwTE01&cid=9962275CEB019306&id=9962275CEB019306%21sc63ad4e5c6fd41acbefee691fab373de&parId=9962275CEB019306%21sbedc6f2afeff48b78db118964be08629&o=OneUp' },
      { label: 'Multi User',  sublabel: 'Unlimited LAN users', url: 'https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL3UvYy85OTYyMjc1Y2ViMDE5MzA2L0lRQmdFR0M2STN1dFJLc3JsUS1FUTJVV0FVZzhhUDE3OXZaRDFOdEZIalRLRU1NP2U9U0VUMkZu&cid=9962275CEB019306&id=9962275CEB019306%21sba6010607b2344adab2b950f84436516&parId=9962275CEB019306%21sbedc6f2afeff48b78db118964be08629&o=OneUp' },
    ],
  },
  {
    product: 'SoftTrade-Coldwin',
    description: 'Cold storage billing & stock register for the Indian cold chain.',
    image: '/Coldwin-removebg-preview.png',
    variants: [
      { label: 'Single User', sublabel: 'One workstation', url: 'https://onedrive.live.com/?cid=9962275ceb019306&id=9962275CEB019306%21sfaae245eacdf4cf8b8a8f6d80b5cac8b&resid=9962275CEB019306%21sfaae245eacdf4cf8b8a8f6d80b5cac8b&e=T6SbgP&migratedtospo=true&redeem=aHR0cHM6Ly8xZHJ2Lm1zL3UvYy85OTYyMjc1Y2ViMDE5MzA2L0lRQmVKSzc2MzZ6NFRMaW85dGdMWEt5TEFRUEotTWh5RGVFYy1xR2dZaHgyaldnP2U9VDZTYmdQ&v=validatepermission' },
      { label: 'Multi User',  sublabel: 'Unlimited LAN users', url: 'https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL3UvYy85OTYyMjc1Y2ViMDE5MzA2L0lRRGUyR2YxQ1FrM1JhN1I5NE5WbGJuNEFkMWRrS0I4cXZadmlyOUNSQmdIY1hRP2U9YmpPbGtF&cid=9962275CEB019306&id=9962275CEB019306%21sf567d8de09094537aed1f7835595b9f8&parId=9962275CEB019306%21s711b58f7a4bc4bc6a8f0c875159f065c&o=OneUp' },
    ],
  },
];

const TALLY_DOWNLOAD_URL = 'https://tallysolutions.com/download/';

// ============================================================
// Reusable download row
// ============================================================
function DownloadRow({ image, productName, productDesc, variants }) {
  return (
    <div style={{
      background:'#fff', border:'1px solid var(--line)', borderRadius:18,
      padding:'28px 28px 24px',
      display:'grid', gridTemplateColumns:'auto 1fr auto', gap:24, alignItems:'center',
    }}>
      {/* product image */}
      <div style={{width:90, flex:'none'}}>
        <img src={image} alt={`${productName} box`} style={{
          width:'100%', height:'auto',
          filter:'drop-shadow(0 12px 20px rgba(11,27,44,.10))',
        }}/>
      </div>

      {/* product info */}
      <div>
        <h3 className="serif" style={{fontSize:22, fontWeight:600, margin:0, lineHeight:1.2, letterSpacing:'-0.01em'}}>
          {productName}
        </h3>
        <p style={{fontSize:13.5, color:'var(--ink-soft)', marginTop:6, lineHeight:1.55}}>
          {productDesc}
        </p>
      </div>

      {/* download buttons */}
      <div style={{display:'flex', gap:10, flexWrap:'wrap'}}>
        {variants.map((v, i) => (
          <a
            key={i}
            href={v.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display:'inline-flex', alignItems:'center', gap:10,
              padding:'12px 18px', borderRadius:12, textDecoration:'none',
              background: i === 0 ? 'var(--ink)' : 'transparent',
              color: i === 0 ? '#fff' : 'var(--ink)',
              border: i === 0 ? '1px solid var(--ink)' : '1px solid var(--line)',
              transition:'background-color .2s ease, border-color .2s ease',
            }}
            onMouseEnter={(e) => {
              if (i === 0) {
                e.currentTarget.style.background = '#1a3050';
              } else {
                e.currentTarget.style.borderColor = 'var(--orange)';
                e.currentTarget.style.background = 'rgba(225,83,11,.04)';
              }
            }}
            onMouseLeave={(e) => {
              if (i === 0) {
                e.currentTarget.style.background = 'var(--ink)';
              } else {
                e.currentTarget.style.borderColor = 'var(--line)';
                e.currentTarget.style.background = 'transparent';
              }
            }}
          >
            <Download size={15} strokeWidth={2.2}/>
            <div style={{lineHeight:1.2, textAlign:'left'}}>
              <div style={{fontSize:13.5, fontWeight:600}}>{v.label}</div>
              <div style={{fontSize:11, opacity:0.7, marginTop:1}}>{v.sublabel}</div>
            </div>
          </a>
        ))}
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
      background:'linear-gradient(180deg,#F1EADB 0%,#FBF8F1 100%)',
      borderBottom:'1px solid var(--line)'}}>
      <div className="paper-grid" style={{position:'absolute', inset:0, opacity:.45, pointerEvents:'none',
        maskImage:'radial-gradient(ellipse at top right, black, transparent 70%)',
        WebkitMaskImage:'radial-gradient(ellipse at top right, black, transparent 70%)'}}/>
      <div style={{position:'absolute', right:'-200px', top:'-200px', width:600, height:600, borderRadius:'50%',
        background:'radial-gradient(circle, rgba(225,83,11,.10), transparent 60%)', pointerEvents:'none'}}/>

      <div className="container" style={{position:'relative', padding:'140px 32px 70px'}}>
        <nav aria-label="Breadcrumb" style={{
          marginBottom:24, display:'flex', alignItems:'center', gap:8,
          fontSize:12.5, fontWeight:500, color:'rgba(14,27,44,.55)',
        }}>
          <Link to="/" style={{color:'inherit', textDecoration:'none'}}>Home</Link>
          <span>›</span>
          <span style={{color:'var(--ink)'}}>Downloads</span>
        </nav>

        <span className="eyebrow"><span className="dot"></span>Quick access · all installers</span>

        <h1 className="serif" style={{
          fontSize:'clamp(44px,5.6vw,76px)', lineHeight:0.98,
          fontWeight:600, margin:'24px 0 0', letterSpacing:'-0.025em', maxWidth:880,
        }}>
          Downloads — <span style={{color:'var(--orange)', fontStyle:'italic'}}>everything</span> in one place.
        </h1>

        <p style={{fontSize:17, lineHeight:1.65, color:'var(--ink-soft)', maxWidth:560, marginTop:24}}>
          All SoftTrade installers and the official TallyPrime download. Need a licence key or activation help? Just call us.
        </p>

        <div style={{display:'flex', gap:12, marginTop:28, flexWrap:'wrap'}}>
          <a href={`tel:${PHONE_TEL}`} className="btn btn-dark">
            <Icon name="phone" size={13} stroke={2}/> {PHONE_DISPLAY}
          </a>
          <Link to="/contact" className="btn btn-primary">
            Need a licence key? <Icon name="arrow" size={15} stroke={2.2} className="arrow"/>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SoftTrade downloads section
// ============================================================
function SoftTradeDownloads() {
  return (
    <section style={{padding:'80px 0', background:'#FBF8F1', borderBottom:'1px solid var(--line)'}}>
      <div className="container" style={{padding:'0 32px'}}>
        <div style={{marginBottom:36}}>
          <div style={{fontSize:11, fontWeight:700, letterSpacing:'.20em', color:'var(--orange)', textTransform:'uppercase'}}>
            Our software
          </div>
          <h2 className="serif" style={{fontSize:'clamp(28px,3.6vw,40px)', fontWeight:600, lineHeight:1.1, marginTop:10, letterSpacing:'-0.02em'}}>
            SoftTrade installers
          </h2>
        </div>

        <div style={{display:'flex', flexDirection:'column', gap:18}}>
          {SOFTTRADE_DOWNLOADS.map((p, i) => (
            <DownloadRow
              key={i}
              image={p.image}
              productName={p.product}
              productDesc={p.description}
              variants={p.variants}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Tally download section
// ============================================================
function TallyDownload() {
  return (
    <section style={{padding:'80px 0', background:'var(--ink)', color:'#fff', position:'relative', overflow:'hidden'}}>
      <div style={{position:'absolute', right:'-200px', top:'-150px', width:500, height:500, borderRadius:'50%',
        background:'radial-gradient(circle, rgba(225,83,11,.15), transparent 65%)', pointerEvents:'none'}}/>

      <div className="container" style={{position:'relative', padding:'0 32px'}}>
        <div style={{marginBottom:36}}>
          <div style={{fontSize:11, fontWeight:700, letterSpacing:'.20em', color:'var(--orange)', textTransform:'uppercase'}}>
            Tally
          </div>
          <h2 className="serif" style={{fontSize:'clamp(28px,3.6vw,40px)', fontWeight:600, lineHeight:1.1, marginTop:10, letterSpacing:'-0.02em'}}>
            TallyPrime — official download
          </h2>
        </div>

        <div style={{
          background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.10)',
          borderRadius:18, padding:'28px 32px',
          display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:20,
        }}>
          <div style={{flex:'1 1 auto', minWidth:260}}>
            <div className="serif" style={{fontSize:22, fontWeight:600, letterSpacing:'-0.01em'}}>
              Download TallyPrime
            </div>
            <p style={{fontSize:13.5, color:'rgba(255,255,255,.70)', marginTop:8, lineHeight:1.55, maxWidth:520}}>
              Get the latest TallyPrime installer direct from Tally Solutions Pvt. Ltd. Already a Tally customer? Your serial number and TSS work with the same installer.
            </p>
          </div>
          <a
            href={TALLY_DOWNLOAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{padding:'14px 22px'}}
          >
            <Download size={15} strokeWidth={2.2}/>
            Open Tally downloads <Icon name="arrow" size={14} stroke={2.2} className="arrow"/>
          </a>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Closing help strip
// ============================================================
function HelpStrip() {
  return (
    <section style={{padding:'70px 0', background:'#FBF8F1'}}>
      <div className="container" style={{padding:'0 32px'}}>
        <div style={{
          padding:'24px 28px', background:'#fff',
          border:'1px solid var(--line)', borderRadius:14,
          display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:16,
        }}>
          <div>
            <div className="serif" style={{fontSize:17, fontWeight:600, color:'var(--ink)'}}>
              Trouble downloading or activating?
            </div>
            <div style={{fontSize:13, color:'var(--ink-soft)', marginTop:4}}>
              Call us — we walk you through it in 5 minutes, Mon–Sat 10:00–19:00.
            </div>
          </div>
          <div style={{display:'flex', gap:10, flexWrap:'wrap'}}>
            <a href={`tel:${PHONE_TEL}`} className="btn btn-dark">
              <Icon name="phone" size={13} stroke={2}/> {PHONE_DISPLAY}
            </a>
            <Link to="/contact" className="btn btn-primary">
              Send a message <Icon name="arrow" size={14} stroke={2.2} className="arrow"/>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Page
// ============================================================
export default function DownloadsPage() {
  return (
    <div className="design-page">
      <Hero/>
      <SoftTradeDownloads/>
      <TallyDownload/>
      <HelpStrip/>
    </div>
  );
}
