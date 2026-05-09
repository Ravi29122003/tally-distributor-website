import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from './design/Icon';
import { siteConfig } from '../config/site';

const PHONE_DISPLAY = siteConfig.phones.sales;            // '+91 98290 06111'
const PHONE_TEL     = siteConfig.phones.sales.replace(/\s|\+/g, '').replace(/^/, '+');
const WHATSAPP_NUM  = siteConfig.whatsapp;                // '919829006111'
const EMAIL_DISPLAY = siteConfig.emails.sales;
const ADDRESS_LINES = [
  siteConfig.address.line1,
  siteConfig.address.line2,
  siteConfig.address.line3,
  siteConfig.address.region,
];

// ============================================================
// Help-with options for the form chip selector
// ============================================================
const HELP_OPTIONS = [
  'New Tally licence',
  'TDL customisation',
  'AMC / Support',
  'SoftTrade products',
  'Training',
  'Something else',
];

// ============================================================
// Departments — 4 cards in the lower section
// ============================================================
const DEPARTMENTS = [
  { ic:'receipt', label:'Sales & licensing',    body:'For new TallyPrime, SoftTrade and edition upgrades.' },
  { ic:'msg',     label:'AMC & Support',        body:'Existing customers. Phone, remote and on-site fixes.' },
  { ic:'file',    label:'TDL & Customisation',  body:'Custom modules, reports and integrations.' },
  { ic:'grid',    label:'Training & onboarding',body:'Group training, CA-firm onboarding, video courses.' },
];

// ============================================================
// Build the WhatsApp deep-link with the form contents
// ============================================================
function buildWhatsAppUrl({ name, company, phone, email, helpWith, message }) {
  const lines = [
    `Hi ${siteConfig.brand}, I'd like to get in touch.`,
    '',
    `Name: ${name}`,
  ];
  if (company)  lines.push(`Company: ${company}`);
  if (phone)    lines.push(`Phone: ${phone}`);
  if (email)    lines.push(`Email: ${email}`);
  if (helpWith) lines.push(`Looking for: ${helpWith}`);
  if (message) {
    lines.push('');
    lines.push(`Details: ${message}`);
  }
  const text = lines.join('\n');
  return `https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent(text)}`;
}

// ============================================================
// Hero — left: heading/copy/contact-info tiles · right: form
// ============================================================
function Hero() {
  const [name,     setName]     = useState('');
  const [company,  setCompany]  = useState('');
  const [helpWith, setHelpWith] = useState([]);
  const [message,  setMessage]  = useState('');
  const [errors,   setErrors]   = useState({});

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    const url = buildWhatsAppUrl({
      name,
      company,
      helpWith: helpWith.join(', '),
      message,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const inputStyle = (hasErr) => ({
    width:'100%', padding:'13px 14px', fontSize:14,
    background:'#fff', color:'var(--ink)',
    border: hasErr ? '1px solid var(--orange)' : '1px solid var(--line)',
    borderRadius:10, outline:'none', fontFamily:'inherit',
    transition:'border-color .2s ease',
  });

  return (
    <section style={{position:'relative', overflow:'hidden',
      background:'linear-gradient(180deg,#F1EADB 0%,#FBF8F1 100%)',
      borderBottom:'1px solid var(--line)'}}>
      <div className="paper-grid" style={{position:'absolute', inset:0, opacity:.45, pointerEvents:'none',
        maskImage:'radial-gradient(ellipse at top right, black, transparent 70%)',
        WebkitMaskImage:'radial-gradient(ellipse at top right, black, transparent 70%)'}}/>
      <div style={{position:'absolute', right:'-200px', top:'-200px', width:600, height:600, borderRadius:'50%',
        background:'radial-gradient(circle, rgba(225,83,11,.10), transparent 60%)', pointerEvents:'none'}}/>

      <div className="container wave-hero" style={{position:'relative', padding:'140px 32px 100px'}}>
        {/* breadcrumb */}
        <nav aria-label="Breadcrumb" style={{
          marginBottom:24, display:'flex', alignItems:'center', gap:8,
          fontSize:12.5, fontWeight:500, color:'rgba(14,27,44,.55)',
        }}>
          <Link to="/" style={{color:'inherit', textDecoration:'none'}}>Home</Link>
          <span>›</span>
          <span style={{color:'var(--ink)'}}>Contact</span>
        </nav>

        <div className="wave-hero-grid" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:60, alignItems:'flex-start'}}>
          {/* LEFT — heading + contact tiles */}
          <div>
            <span className="eyebrow"><span className="dot"></span>We pick up the phone</span>

            <h1 className="serif" style={{
              fontSize:'clamp(48px,6vw,84px)', lineHeight:0.96,
              fontWeight:600, margin:'24px 0 0', letterSpacing:'-0.025em',
            }}>
              Let's <span style={{color:'var(--orange)', fontStyle:'italic'}}>talk</span>.
            </h1>

            <p style={{fontSize:17, lineHeight:1.6, color:'var(--ink-soft)', maxWidth:480, marginTop:24}}>
              Reach out by phone, WhatsApp, email or by visiting our Jaipur office. We respond within one business hour, every working day.
            </p>

            {/* 4 contact tiles */}
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginTop:36}}>
              <a href={`tel:${PHONE_TEL}`} style={tileStyle}>
                <span style={tileIconStyle}><Icon name="phone" size={15} stroke={2}/></span>
                <div style={tileLabelStyle}>Phone</div>
                <div className="serif" style={tileValueStyle}>{PHONE_DISPLAY}</div>
                <div style={tileMetaStyle}>Mon–Sat · 10:00–19:00 IST</div>
              </a>
              <a href={`https://wa.me/${WHATSAPP_NUM}`} target="_blank" rel="noopener noreferrer" style={tileStyle}>
                <span style={{...tileIconStyle, background:'rgba(34,197,94,.12)', color:'#16a34a'}}><Icon name="msg" size={15} stroke={2}/></span>
                <div style={tileLabelStyle}>WhatsApp</div>
                <div className="serif" style={tileValueStyle}>{PHONE_DISPLAY}</div>
                <div style={tileMetaStyle}>Quick replies · screenshots welcome</div>
              </a>
              <a href={`mailto:${EMAIL_DISPLAY}`} style={tileStyle}>
                <span style={tileIconStyle}><Icon name="grid" size={15} stroke={2}/></span>
                <div style={tileLabelStyle}>Email</div>
                <div className="serif" style={{...tileValueStyle, fontSize:13.5, wordBreak:'break-all'}}>{EMAIL_DISPLAY}</div>
                <div style={tileMetaStyle}>Replies within 1 business hour</div>
              </a>
              <div style={tileStyle}>
                <span style={tileIconStyle}><Icon name="grid" size={15} stroke={2}/></span>
                <div style={tileLabelStyle}>Visit</div>
                <div className="serif" style={{...tileValueStyle, fontSize:14}}>
                  {ADDRESS_LINES[0]}
                </div>
                <div style={tileMetaStyle}>{ADDRESS_LINES[2]} · {ADDRESS_LINES[3]}</div>
              </div>
            </div>
          </div>

          {/* RIGHT — form card */}
          <div style={{
            background:'#fff', border:'1px solid var(--line)', borderRadius:20,
            padding:'32px 32px 28px', boxShadow:'0 30px 60px -30px rgba(14,27,44,.20)',
          }}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:8, marginBottom:20}}>
              <div>
                <h2 className="serif" style={{fontSize:24, fontWeight:600, margin:0, letterSpacing:'-0.015em'}}>
                  Send us a message
                </h2>
                <p style={{fontSize:13.5, color:'var(--ink-soft)', marginTop:4}}>
                  We'll reply on WhatsApp within one business hour.
                </p>
              </div>
              <span style={{
                display:'inline-flex', alignItems:'center', gap:6,
                fontSize:11, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase',
                padding:'5px 10px', borderRadius:999,
                background:'var(--teal-soft)', color:'var(--teal)',
              }}>
                <span style={{width:6, height:6, borderRadius:'50%', background:'var(--teal)'}}/>
                1 hr SLA
              </span>
            </div>

            <form onSubmit={onSubmit} noValidate>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:14}}>
                <div>
                  <label style={labelStyle}>Your name <span style={{color:'var(--orange)'}}>*</span></label>
                  <input
                    type="text" value={name}
                    onChange={(e) => { setName(e.target.value); if (errors.name) setErrors({...errors, name:undefined}); }}
                    placeholder="Rakesh Goyal"
                    style={inputStyle(errors.name)}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Company</label>
                  <input
                    type="text" value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Goyal Textiles"
                    style={inputStyle(false)}
                  />
                </div>
              </div>

              <div style={{marginBottom:14}}>
                <label style={labelStyle}>What do you need help with? <span style={{color:'var(--ink-soft)', fontWeight:500, textTransform:'none', letterSpacing:0}}>(select all that apply)</span></label>
                <div style={{display:'flex', flexWrap:'wrap', gap:8, marginTop:4}}>
                  {HELP_OPTIONS.map(opt => {
                    const isActive = helpWith.includes(opt);
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => {
                          setHelpWith(prev =>
                            prev.includes(opt)
                              ? prev.filter(x => x !== opt)
                              : [...prev, opt]
                          );
                        }}
                        style={{
                          padding:'8px 14px', borderRadius:999,
                          fontSize:12.5, fontWeight:600, cursor:'pointer',
                          background: isActive ? 'var(--ink)' : '#fff',
                          color: isActive ? '#fff' : 'var(--ink)',
                          border: isActive ? '1px solid var(--ink)' : '1px solid var(--line)',
                          fontFamily:'inherit',
                          transition:'background-color .2s ease, color .2s ease, border-color .2s ease',
                        }}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div style={{marginBottom:18}}>
                <label style={labelStyle}>Tell us a bit more</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="e.g. We run a flour mill in Bhilwara and want to switch from manual books to TallyPrime…"
                  rows={3}
                  style={{...inputStyle(false), resize:'vertical', minHeight:78, fontFamily:'inherit'}}
                />
              </div>

              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12}}>
                <span style={{display:'inline-flex', alignItems:'center', gap:6, fontSize:11.5, color:'var(--ink-soft)'}}>
                  <Icon name="check" size={11} stroke={2}/>
                  Your details stay private
                </span>
                <button type="submit" className="btn btn-primary" style={{padding:'13px 22px'}}>
                  Send via WhatsApp <Icon name="arrow" size={15} stroke={2.2} className="arrow"/>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

// shared inline styles for the contact tiles
const tileStyle = {
  display:'block', padding:'18px 18px 16px',
  background:'#fff', border:'1px solid var(--line)', borderRadius:14,
  textDecoration:'none', color:'var(--ink)',
  transition:'border-color .2s ease, transform .15s ease',
};
const tileIconStyle = {
  width:32, height:32, borderRadius:10,
  background:'var(--teal-soft)', color:'var(--teal)',
  display:'inline-flex', alignItems:'center', justifyContent:'center',
};
const tileLabelStyle = {
  fontSize:10.5, fontWeight:700, letterSpacing:'.14em',
  textTransform:'uppercase', color:'var(--muted)', marginTop:12,
};
const tileValueStyle = {
  fontSize:15, fontWeight:600, marginTop:4, letterSpacing:'-0.005em',
  color:'var(--ink)', lineHeight:1.3,
};
const tileMetaStyle = {
  fontSize:11.5, color:'var(--ink-soft)', marginTop:6,
};
const labelStyle = {
  display:'block', fontSize:11.5, fontWeight:600,
  letterSpacing:'.06em', textTransform:'uppercase',
  color:'var(--muted)', marginBottom:6,
};

// ============================================================
// VisitSection — 2-column: map embed on left, address card on right
// ============================================================
function VisitSection() {
  const mapEmbedSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.0!2d75.7789042!3d26.9641541!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db24aba093b1f%3A0x22e232bac2df7b3f!2sUnique%20Info%20Systems%20(Tally%20Certified%20Partner)!5e0!3m2!1sen!2sin!4v1715000000000`;
  const directionsUrl = `https://maps.app.goo.gl/yHoMuU4oe1N5WgR96`;

  return (
    <section style={{padding:'100px 0', background:'#FBF8F1', borderBottom:'1px solid var(--line)'}}>
      <div className="container" style={{padding:'0 32px'}}>
        <div style={{textAlign:'center', maxWidth:640, margin:'0 auto 56px'}}>
          <div style={{fontSize:11, fontWeight:700, letterSpacing:'.20em', color:'var(--orange)', textTransform:'uppercase'}}>
            Visit us
          </div>
          <h2 className="serif" style={{fontSize:'clamp(34px,4.4vw,52px)', fontWeight:600, lineHeight:1.05, marginTop:14, letterSpacing:'-0.02em'}}>
            Drop by our Jaipur office.
          </h2>
          <p style={{fontSize:15.5, color:'var(--ink-soft)', marginTop:18, lineHeight:1.6}}>
            Walk in for a TallyPrime demo, software pickup, or a chai with the team.
          </p>
        </div>

        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:24, alignItems:'stretch'}}>
          {/* MAP */}
          <div style={{
            position:'relative', minHeight:360,
            borderRadius:18, overflow:'hidden',
            border:'1px solid var(--line)',
            boxShadow:'0 24px 50px -30px rgba(14,27,44,.20)',
          }}>
            <iframe
              title="Unique Info Systems · Jaipur office"
              src={mapEmbedSrc}
              style={{ border: 0, width:'100%', height:'100%', minHeight:360, display:'block' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          {/* ADDRESS CARD */}
          <div style={{display:'flex', flexDirection:'column', gap:18}}>
            <div style={{
              background:'#fff', border:'1px solid var(--line)', borderRadius:18,
              padding:32, flexGrow:1,
            }}>
              <div style={{fontSize:11, fontWeight:700, letterSpacing:'.16em', textTransform:'uppercase', color:'var(--muted)'}}>
                Head office · Jaipur
              </div>
              <div className="serif" style={{fontSize:22, fontWeight:600, marginTop:14, lineHeight:1.35, letterSpacing:'-0.005em'}}>
                {ADDRESS_LINES[0]},<br/>
                {ADDRESS_LINES[1]},<br/>
                {ADDRESS_LINES[2]}
              </div>

              <div style={{marginTop:22, paddingTop:22, borderTop:'1px dashed var(--line-2)', display:'flex', flexDirection:'column', gap:12}}>
                <div style={{display:'flex', alignItems:'center', gap:10, fontSize:14}}>
                  <Icon name="phone" size={14} stroke={2} className="" />
                  <a href={`tel:${PHONE_TEL}`} style={{color:'var(--ink)', textDecoration:'none', fontWeight:500}}>{PHONE_DISPLAY}</a>
                </div>
                <div style={{display:'flex', alignItems:'center', gap:10, fontSize:14}}>
                  <Icon name="grid" size={14} stroke={2}/>
                  <a href={`mailto:${EMAIL_DISPLAY}`} style={{color:'var(--ink)', textDecoration:'none', fontWeight:500, wordBreak:'break-all'}}>{EMAIL_DISPLAY}</a>
                </div>
                <div style={{display:'flex', alignItems:'center', gap:10, fontSize:14, color:'var(--ink-soft)'}}>
                  <Icon name="grid" size={14} stroke={2}/>
                  {siteConfig.hours}
                </div>
              </div>

              <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-dark" style={{
                marginTop:24, width:'100%', justifyContent:'center',
              }}>
                Get directions <Icon name="arrow" size={14} stroke={2.2} className="arrow"/>
              </a>
            </div>

            {/* coverage strip */}
            <div style={{
              background:'var(--ink)', color:'#fff', borderRadius:14,
              padding:'20px 24px',
            }}>
              <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.16em', textTransform:'uppercase', color:'rgba(255,255,255,.55)'}}>
                Field coverage
              </div>
              <div style={{fontSize:14.5, fontWeight:500, marginTop:6, lineHeight:1.5}}>
                Same-day on-site in Jaipur. Next-day in Bhilwara, Kishangarh, Jodhpur, Udaipur, Sri Ganganagar.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// DepartmentsSection — 4 cards routing different inquiry types
// ============================================================
function DepartmentsSection() {
  return (
    <section style={{padding:'100px 0', background:'#F1EADB'}}>
      <div className="container" style={{padding:'0 32px'}}>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:48, alignItems:'flex-end', marginBottom:48}}>
          <div>
            <div style={{fontSize:11, fontWeight:700, letterSpacing:'.20em', color:'var(--orange)', textTransform:'uppercase'}}>
              How we work
            </div>
            <h2 className="serif" style={{fontSize:'clamp(30px,4vw,46px)', fontWeight:600, lineHeight:1.05, marginTop:14, letterSpacing:'-0.02em'}}>
              Pick the right desk.
            </h2>
          </div>
          <p style={{fontSize:15, color:'var(--ink-soft)', lineHeight:1.6}}>
            Whichever team you reach, your message lands on WhatsApp within an hour. The categories below help us route faster.
          </p>
        </div>

        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(240px, 1fr))', gap:16}}>
          {DEPARTMENTS.map((d, i) => (
            <div key={i} style={{
              background:'#fff', border:'1px solid var(--line)', borderRadius:16,
              padding:'26px 24px', display:'flex', flexDirection:'column', gap:14,
            }}>
              <span style={{
                width:42, height:42, borderRadius:11,
                background:'var(--teal-soft)', color:'var(--teal)',
                display:'inline-flex', alignItems:'center', justifyContent:'center',
              }}>
                <Icon name={d.ic} size={18} stroke={2}/>
              </span>
              <div>
                <h3 className="serif" style={{fontSize:18, fontWeight:600, margin:0, lineHeight:1.25}}>
                  {d.label}
                </h3>
                <p style={{fontSize:13.5, color:'var(--ink-soft)', lineHeight:1.55, marginTop:8}}>
                  {d.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* one-line shared contact strip */}
        <div style={{
          marginTop:28, padding:'18px 24px',
          background:'#fff', border:'1px solid var(--line)', borderRadius:14,
          display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12,
        }}>
          <div style={{fontSize:13.5, color:'var(--ink-soft)'}}>
            All categories route to <strong style={{color:'var(--ink)'}}>{PHONE_DISPLAY}</strong> · same email, same WhatsApp.
          </div>
          <a href={`https://wa.me/${WHATSAPP_NUM}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            Open WhatsApp <Icon name="arrow" size={14} stroke={2.2} className="arrow"/>
          </a>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// ContactPage — page composition
// ============================================================
export default function ContactPage() {
  return (
    <div className="design-page">
      <Hero/>
      <VisitSection/>
      <DepartmentsSection/>
    </div>
  );
}
