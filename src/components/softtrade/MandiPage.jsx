// src/components/softtrade/MandiPage.jsx
//
// SoftTrade Mandi product page.
//
// Page composition:
//   1. Hero          — pill, H1, subhead, CTAs (Request Demo / Download Brochure),
//                      product box visual.
//   2. FeatureTicker — dark scrolling marquee, copper diamond separators.
//   3. Features      — heading + responsive FeatureCategoryGrid.
//   4. FinalCTA      — dark band with copper "Book a Demo" + green "Chat on WhatsApp".
//
// Reusable parts (FeatureTicker, FeatureCategoryGrid) live under
// src/components/products/ so Brokwin and ColdWin can mount them with
// their own data without copy-pasting markup.
//
// The whole tree is wrapped in <div className="design-page"> so the
// Wave 3 design tokens (--ink, --paper, --orange, --teal, etc.) and
// scoped utility classes (.serif, .btn, .btn-primary, .eyebrow, .dot,
// .container, .pad-section) defined in src/index.css apply.

import { Link } from 'react-router-dom';
import { Icon } from '../design/Icon';
import FeatureTicker from '../products/FeatureTicker';
import FeatureCategoryGrid from '../products/FeatureCategoryGrid';
import { siteConfig } from '../../config/site';

// ----- Page data (page-specific text lives here, not inside the
// reusable components) -----

const tickerItems = [
  { label: 'Mahajani / Adat system' },
  { label: 'Kachi-Pakki Adat' },
  { label: 'Mandi tax register' },
  { label: 'Multi-godown stock' },
  { label: 'Lot-wise tracking' },
  { label: 'Bilty management' },
  { label: 'Interest calculation' },
  { label: 'Dalal khata' },
  { label: 'Daily stock report' },
  { label: 'Production reports' },
  { label: 'GST-ready' },
  { label: 'e-Way Bill' },
  { label: 'e-TDS forms' },
  { label: 'Hindi bill printing' },
  { label: 'SMS / Email for transactions' },
];

const categories = [
  {
    title: 'Core Accounting',
    subtitle: 'The fundamentals, done right',
    items: [
      'Chittha (ledger)',
      'Talpat (trial balance)',
      'Business account',
      'Profit & loss account',
      'Bank & cash account',
      'Bank reconciliation',
      'Purchase & sales accounts',
      'Goods account',
      'Duplicate copies (nakal)',
    ],
  },
  {
    title: 'Mandi & Adat',
    subtitle: 'What sets Mandi apart',
    items: [
      'Mandi tax calculation & register',
      'Adat khata',
      'Adat purchase',
      'Sending goods on adat',
      'Kachi-Pakki Adat',
      'Mahajani double-side cash account',
      'Sales slip (vikray parchi)',
      'Interest calculation',
      'Interest at time of cash receipt',
    ],
  },
  {
    title: 'Broker / Dalal Management',
    items: [
      'Dalal khata',
      'Dalali khata',
      'Dalal pete ugahi',
      'Station pete ugahi',
    ],
  },
  {
    title: 'Stock & Lot Tracking',
    items: [
      'Goods valuation (maal mulyankan)',
      'Lot-wise goods',
      'Lot purchase-sale report',
      'Daily stock report',
      'Multi-godown management',
      'Godown-to-godown transfer',
      'Pending bilty report',
      'Trade account per item',
      'Sales detail with expenses',
    ],
  },
  {
    title: 'Production',
    items: [
      'Production system with reports',
      'Voucher for goods increase / decrease',
    ],
  },
  {
    title: 'Compliance',
    items: [
      'GST-ready',
      'Sales tax form & register',
      'e-Way Bill',
      'e-TDS form & return',
      'Purchase-sale tax form reports',
      'Price with tax',
    ],
  },
  {
    title: 'Communication',
    items: [
      'Hindi bill printing',
      'Direct SMS for transactions',
      'Direct email for invoices & reports',
    ],
  },
];

const waLink = (msg) =>
  `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    `Hi ${siteConfig.brand}, ${msg}`
  )}`;

// ----- Sections -----

function Hero() {
  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #F1EADB 0%, #FBF8F1 100%)',
        borderBottom: '1px solid var(--line)',
      }}
    >
      <div
        className="paper-grid"
        style={{
          position: 'absolute', inset: 0, opacity: 0.45, pointerEvents: 'none',
          maskImage: 'radial-gradient(ellipse at top right, black, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at top right, black, transparent 70%)',
        }}
      />
      <div
        style={{
          position: 'absolute', right: '-200px', top: '-200px',
          width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(225,83,11,.10), transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      <div
        className="container wave-hero"
        style={{ position: 'relative', padding: '152px 32px 100px' }}
      >
        <div
          className="wave-hero-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.05fr 1fr',
            gap: 64,
            alignItems: 'center',
          }}
        >
          {/* LEFT — copy + CTAs */}
          <div>
            <span className="eyebrow">
              <span className="dot" style={{ background: 'var(--orange)' }} />
              Built on the Mahajani (Adat) system
            </span>

            <h1
              className="serif"
              style={{
                fontSize: 'clamp(44px, 6vw, 76px)',
                lineHeight: 0.98,
                fontWeight: 600,
                letterSpacing: '-0.025em',
                margin: '24px 0 0',
                color: 'var(--ink)',
              }}
            >
              SoftTrade <span style={{ color: 'var(--orange)' }}>Mandi</span>
            </h1>

            <p
              style={{
                fontSize: 18,
                lineHeight: 1.6,
                color: 'var(--ink-soft)',
                maxWidth: 580,
                marginTop: 22,
              }}
            >
              Complete accounting software for mandi traders — oil, ghee, dal,
              mills, kirana, and sabji mandi vyapar.
            </p>

            <div
              style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}
            >
              <Link to="/contact" className="btn btn-primary">
                Request Demo{' '}
                <Icon name="arrow" size={16} stroke={2.2} className="arrow" />
              </Link>
              <a
                href="/contact"
                className="btn btn-ghost"
                style={{ background: '#fff' }}
              >
                <Icon name="download" size={15} stroke={2.2} />
                Download Brochure
              </a>
            </div>
          </div>

          {/* RIGHT — product box */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: 520,
                aspectRatio: '1.05 / 1',
                borderRadius: 20,
                overflow: 'hidden',
                background: '#fff',
                border: '1px solid var(--line-2)',
                boxShadow:
                  '0 30px 60px -25px rgba(14,27,44,.28), 0 1px 0 rgba(255,255,255,.6) inset',
              }}
            >
              {/* TODO: replace with /images/softtrade-mandi-box.jpeg once the
                  asset is added under public/images/. Until then this falls
                  back to /images/placeholder.png on error. */}
              <img
                src="/images/softtrade-mandi-box.jpeg"
                alt="SoftTrade Mandi product box"
                onError={(e) => {
                  if (!e.currentTarget.dataset.fellBack) {
                    e.currentTarget.dataset.fellBack = '1';
                    e.currentTarget.src = '/images/placeholder.png';
                  }
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section className="pad-section" style={{ background: 'var(--bg)' }}>
      <div className="container">
        <div style={{ maxWidth: 720, margin: '0 auto 48px', textAlign: 'center' }}>
          <div className="section-kicker">What you get</div>
          <h2
            className="section-title serif"
            style={{ marginTop: 12 }}
          >
            Everything <em>SoftTrade Mandi</em> can do
          </h2>
          <p
            className="section-lede"
            style={{ marginTop: 16, marginLeft: 'auto', marginRight: 'auto' }}
          >
            Built specifically for the mahajani trade — every feature your munim
            already uses, now digital.
          </p>
        </div>

        <FeatureCategoryGrid categories={categories} />
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="pad-section">
      <div className="container">
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            background: 'var(--ink)',
            borderRadius: 24,
            padding: '72px 48px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              position: 'absolute', right: -100, top: -100,
              width: 400, height: 400, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(225,83,11,.25), transparent 60%)',
              pointerEvents: 'none',
            }}
          />
          <div
            className="paper-grid"
            style={{
              position: 'absolute', inset: 0, opacity: 0.04,
              backgroundImage:
                'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />

          <div style={{ position: 'relative' }}>
            <h2
              className="serif"
              style={{
                fontSize: 'clamp(34px, 4vw, 52px)',
                lineHeight: 1.05,
                fontWeight: 600,
                letterSpacing: '-0.02em',
                color: '#fff',
                margin: '0 0 16px',
              }}
            >
              Ready to modernize your mandi accounting?
            </h2>
            <p
              style={{
                fontSize: 17,
                lineHeight: 1.6,
                color: 'rgba(255,255,255,.72)',
                maxWidth: 560,
                margin: '0 auto',
              }}
            >
              Book a free demo and see SoftTrade Mandi handle your daily adat,
              bilty, and mahajani entries in real time.
            </p>

            <div
              style={{
                display: 'flex',
                gap: 12,
                marginTop: 32,
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              <Link to="/contact" className="btn btn-primary">
                Book a Demo{' '}
                <Icon name="arrow" size={16} stroke={2.2} className="arrow" />
              </Link>
              <a
                href={waLink(
                  "I'd like to book a demo of SoftTrade Mandi."
                )}
                target="_blank"
                rel="noreferrer"
                className="btn"
                style={{
                  background: '#25D366',
                  color: '#fff',
                  border: '1px solid #25D366',
                }}
              >
                <Icon name="wa" size={16} stroke={2} />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ----- Page composition -----

export default function MandiPage() {
  return (
    <div className="design-page">
      <Hero />
      <FeatureTicker items={tickerItems} ariaLabel="SoftTrade Mandi feature highlights" />
      <Features />
      <FinalCTA />
    </div>
  );
}
