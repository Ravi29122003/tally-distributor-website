import { useState, useRef, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter, Routes, Route, Outlet, Link, NavLink, useLocation, useNavigate,
} from 'react-router-dom';
import {
  HomeSections, Icon, FloatingWhatsApp, WhatsAppGlyph, Eyebrow, Reveal, waLink,
} from './app';
import { siteConfig } from './config/site';
import './index.css';

const telHref = `tel:${siteConfig.phones.sales.replace(/\s/g, '')}`;

// ---------- Route maps ----------
const PRODUCTS = [
  { label: 'TallyPrime Silver & Gold', to: '/products/tallyprime', desc: 'Single & multi-user editions' },
  { label: 'TallyPrime Server',         to: '/products/server',     desc: 'Concurrent users, high performance' },
  { label: 'TSS Renewal',               to: '/products/tss',        desc: 'Tally Software Services' },
  { label: 'Tally on Cloud',            to: '/products/cloud',      desc: 'Access Tally from anywhere' },
];

const SOLUTIONS = [
  { label: 'Centralized Branch Accounting', to: '/solutions/branch-accounting', desc: 'Consolidate multi-branch books' },
  { label: 'Smart Dynamic Integration',     to: '/solutions/sdis',              desc: 'Connect Tally to any system' },
  { label: 'Smart Voucher Approval',        to: '/solutions/voucher-approval',  desc: 'Workflow-based approvals' },
  { label: 'Tally Mobile App',              to: '/solutions/mobile-app',        desc: 'Reports & approvals on the go' },
  { label: 'Builders Module',               to: '/solutions/builders',          desc: 'Real-estate / construction' },
];

const SIMPLE_NAV = [
  { label: 'Home',       to: '/' },
  { label: 'Services',   to: '/services' },
  { label: 'Industries', to: '/industries' },
  { label: 'About',      to: '/about' },
  { label: 'Contact',    to: '/contact' },
];

// ---------- Scroll restore on route change ----------
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { requestAnimationFrame(() => window.scrollTo(0, 0)); }, [pathname]);
  return null;
}

// ---------- Logo as Link ----------
function BrandMark({ className = '' }) {
  return (
    <Link to="/" className={`flex items-center gap-2.5 ${className}`} aria-label={`${siteConfig.brand} home`}>
      <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg bg-navy-900 text-white">
        <span className="font-display text-[18px] font-bold leading-none">{siteConfig.brand[0]}</span>
        <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-teal-400 ring-2 ring-white"></span>
      </span>
      <div className="leading-none">
        <div className="font-display text-[20px] font-bold text-navy-900">{siteConfig.brand}</div>
        <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-navy-900/55">{siteConfig.tagline}</div>
      </div>
    </Link>
  );
}

// ---------- Desktop dropdown menu ----------
function NavDropdown({ label, items, basePath }) {
  const [open, setOpen] = useState(false);
  const closeT = useRef(null);
  const { pathname } = useLocation();
  const isActive = pathname === basePath || pathname.startsWith(basePath + '/');

  const onEnter = () => { clearTimeout(closeT.current); setOpen(true); };
  const onLeave = () => { closeT.current = setTimeout(() => setOpen(false), 120); };

  return (
    <div className="relative" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <Link
        to={basePath}
        className={`nav-link inline-flex items-center gap-1 rounded-md px-3 py-2 text-[14.5px] font-medium transition-colors ${
          isActive ? 'text-navy-900' : 'text-navy-900/70 hover:text-navy-900'
        }`}
        aria-haspopup="menu"
        aria-expanded={open}
        onFocus={onEnter}
        onClick={() => setOpen(false)}
      >
        {label}
        <Icon name="chevron-down" size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
        {isActive && <span aria-hidden className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded-sm bg-teal-500" />}
      </Link>

      <div
        className={`absolute left-1/2 top-full z-[60] mt-2 w-[340px] -translate-x-1/2 transition-all duration-200 ${
          open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-1 pointer-events-none'
        }`}
        role="menu"
      >
        <div className="overflow-hidden rounded-2xl border border-navy-900/10 bg-white shadow-card-lg">
          <div className="p-2">
            {items.map((it) => (
              <Link
                key={it.to}
                to={it.to}
                role="menuitem"
                onClick={() => setOpen(false)}
                className="group flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-navy-50"
              >
                <span className="mt-0.5 inline-flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-teal-50 text-teal-600 group-hover:bg-teal-500 group-hover:text-white transition-colors">
                  <Icon name="arrow-right" size={14} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[14px] font-semibold text-navy-900">{it.label}</span>
                  <span className="block text-[12.5px] text-navy-900/60">{it.desc}</span>
                </span>
              </Link>
            ))}
          </div>
          <div className="border-t border-navy-900/8 bg-navy-50/50 px-4 py-2.5">
            <Link to={basePath} onClick={() => setOpen(false)} className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-navy-900 hover:text-teal-700">
              View all {label.toLowerCase()} <Icon name="arrow-right" size={13} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- Top Nav ----------
function RouterNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); setMobileExpanded(null); }, [pathname]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
      window.addEventListener('keydown', onKey);
      return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
    }
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-xl bg-white/85 border-b border-navy-900/10 shadow-[0_1px_0_rgba(11,29,58,0.04)]'
          : 'bg-white/60 backdrop-blur-md border-b border-transparent'
      }`}
      role="banner"
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <BrandMark />

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          <NavLink to="/" end className={({isActive}) =>
            `nav-link rounded-md px-3 py-2 text-[14.5px] font-medium transition-colors ${isActive ? 'text-navy-900' : 'text-navy-900/70 hover:text-navy-900'}`}>
            Home
          </NavLink>
          <NavDropdown label="Products" items={PRODUCTS} basePath="/products" />
          <NavDropdown label="Solutions" items={SOLUTIONS} basePath="/solutions" />
          {SIMPLE_NAV.filter(i => i.to !== '/').map((it) => (
            <NavLink key={it.to} to={it.to} className={({isActive}) =>
              `nav-link rounded-md px-3 py-2 text-[14.5px] font-medium transition-colors ${isActive ? 'text-navy-900' : 'text-navy-900/70 hover:text-navy-900'}`}>
              {it.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <a
            href={telHref}
            aria-label={`Call ${siteConfig.brand} at ${siteConfig.phones.sales}`}
            className="btn-lift hidden items-center gap-2 rounded-full border border-navy-900/10 bg-white px-4 py-2.5 text-[14px] font-semibold text-navy-900 shadow-card hover:border-teal-500/40 hover:shadow-card-lg md:inline-flex"
          >
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-teal-50 text-teal-600">
              <Icon name="phone" size={13} />
            </span>
            <span className="tabular-nums">{siteConfig.phones.sales}</span>
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="btn-lift inline-flex h-11 w-11 items-center justify-center rounded-xl border border-navy-900/10 bg-white text-navy-900 shadow-card lg:hidden"
            aria-label="Open menu" aria-expanded={open} aria-controls="mobile-nav"
          >
            <Icon name="menu" size={20} />
          </button>
        </div>
      </div>

      {open && (
        <div className="nav-overlay fixed inset-0 z-[60] bg-navy-900/40 backdrop-blur-sm lg:hidden"
             onClick={() => setOpen(false)} aria-hidden />
      )}

      <aside
        id="mobile-nav" role="dialog" aria-modal="true" aria-label="Mobile menu"
        className={`nav-drawer fixed right-0 top-0 z-[70] flex h-[100dvh] w-[88%] max-w-[400px] flex-col bg-white shadow-card-lg lg:hidden ${open ? 'is-open' : ''}`}
      >
        <div className="flex h-[72px] flex-none items-center justify-between border-b border-navy-900/10 px-5">
          <BrandMark />
          <button type="button" onClick={() => setOpen(false)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-navy-900/10 bg-white text-navy-900"
            aria-label="Close menu">
            <Icon name="x" size={20} />
          </button>
        </div>
        <nav aria-label="Mobile primary" className="flex-1 overflow-y-auto px-5 py-5">
          <Link to="/" onClick={() => setOpen(false)}
            className="flex items-center justify-between rounded-xl px-4 py-3.5 text-[16px] font-semibold text-navy-900/80 hover:bg-navy-50/60">
            Home <Icon name="arrow-right" size={16} className="text-navy-900/40" />
          </Link>

          <MobileExpandable
            label="Products" items={PRODUCTS} basePath="/products"
            isOpen={mobileExpanded === 'products'}
            onToggle={() => setMobileExpanded(m => m === 'products' ? null : 'products')}
            onLink={() => setOpen(false)}
          />
          <MobileExpandable
            label="Solutions" items={SOLUTIONS} basePath="/solutions"
            isOpen={mobileExpanded === 'solutions'}
            onToggle={() => setMobileExpanded(m => m === 'solutions' ? null : 'solutions')}
            onLink={() => setOpen(false)}
          />

          {SIMPLE_NAV.filter(i => i.to !== '/').map((it) => (
            <Link key={it.to} to={it.to} onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-xl px-4 py-3.5 text-[16px] font-semibold text-navy-900/80 hover:bg-navy-50/60">
              {it.label} <Icon name="arrow-right" size={16} className="text-navy-900/40" />
            </Link>
          ))}
        </nav>
        <div className="flex-none border-t border-navy-900/10 p-5">
          <a href={telHref} className="btn-lift mb-2.5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-navy-900 px-4 py-3.5 text-[15px] font-semibold text-white">
            <Icon name="phone" size={15} /> Call {siteConfig.phones.sales}
          </a>
          <a href={waLink("I'd like to know more about TallyPrime editions.")} target="_blank" rel="noreferrer"
            className="btn-lift inline-flex w-full items-center justify-center gap-2 rounded-xl border border-navy-900/10 bg-white px-4 py-3.5 text-[15px] font-semibold text-navy-900">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-teal-500 text-white">
              <WhatsAppGlyph />
            </span>
            WhatsApp us
          </a>
        </div>
      </aside>
    </header>
  );
}

function MobileExpandable({ label, items, basePath, isOpen, onToggle, onLink }) {
  return (
    <div className="mb-1">
      <button
        type="button" onClick={onToggle} aria-expanded={isOpen}
        className="flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-[16px] font-semibold text-navy-900/80 hover:bg-navy-50/60"
      >
        {label}
        <Icon name="chevron-down" size={16} className={`text-navy-900/50 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <div className="ml-3 mt-1 mb-2 border-l-2 border-teal-500/30 pl-3">
            <Link to={basePath} onClick={onLink}
              className="block rounded-lg px-3 py-2 text-[14px] font-semibold text-teal-700 hover:bg-teal-50">
              All {label}
            </Link>
            {items.map((it) => (
              <Link key={it.to} to={it.to} onClick={onLink}
                className="block rounded-lg px-3 py-2 text-[14px] font-medium text-navy-900/75 hover:bg-navy-50">
                {it.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- Footer ----------
function RouterFooter() {
  const cols = [
    { title: 'Products', links: PRODUCTS.map(p => ({ label: p.label, to: p.to })) },
    { title: 'Solutions', links: SOLUTIONS.map(p => ({ label: p.label, to: p.to })) },
    {
      title: 'Services',
      links: [
        { label: 'Implementation', to: '/services#implementation' },
        { label: 'Training',       to: '/services#training' },
        { label: 'TDL Customisation', to: '/services#tdl' },
        { label: 'AMC & Support',  to: '/services#amc' },
        { label: 'Data Migration', to: '/services#migration' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About us',   to: '/about' },
        { label: 'Industries', to: '/industries' },
        { label: 'Contact',    to: '/contact' },
        { label: 'Privacy',    to: '/policies' },
      ],
    },
  ];

  const socials = [
    { name: 'Facebook',  icon: 'facebook',  href: siteConfig.socials.facebook },
    { name: 'Instagram', icon: 'instagram', href: siteConfig.socials.instagram },
    { name: 'LinkedIn',  icon: 'linkedin',  href: siteConfig.socials.linkedin },
    { name: 'YouTube',   icon: 'youtube',   href: siteConfig.socials.youtube },
    { name: 'WhatsApp',  icon: null,        href: waLink(`Hi ${siteConfig.brand}, I'd like to chat.`) },
  ];

  return (
    <footer className="relative overflow-hidden bg-navy-900 text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse at 50% 0%, black 10%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 0%, black 10%, transparent 70%)',
        }} />

      <div className="relative mx-auto max-w-7xl px-5 pt-16 pb-10 sm:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-5 lg:gap-10">
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white text-navy-900">
                <span className="font-display text-[18px] font-bold leading-none">{siteConfig.brand[0]}</span>
                <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-teal-400 ring-2 ring-navy-900"></span>
              </span>
              <div className="leading-none">
                <div className="font-display text-[20px] font-bold">{siteConfig.brand}</div>
                <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">{siteConfig.tagline}</div>
              </div>
            </Link>
            <p className="mt-4 max-w-xs text-[13.5px] leading-[1.6] text-white/60">
              Helping Indian businesses run their books with confidence since 2010. Genuine licences. Honest service. No surprises.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {socials.map((s) => (
                <a key={s.name} href={s.href} target="_blank" rel="noreferrer" aria-label={s.name}
                  className="btn-lift inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white/80 hover:border-teal-400/50 hover:bg-white/10 hover:text-white">
                  {s.icon ? <Icon name={s.icon} size={15} /> : <WhatsAppGlyph />}
                </a>
              ))}
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="font-display text-[13px] font-bold uppercase tracking-[0.16em] text-white/90">{c.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-[13.5px] text-white/60 transition-colors hover:text-white">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start gap-4 border-t border-white/10 pt-6 text-[12.5px] text-white/55 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>© {new Date().getFullYear()} {siteConfig.brand}</span>
            <span className="text-white/25">·</span>
            <Link to="/policies" className="hover:text-white">Privacy</Link>
            <span className="text-white/25">·</span>
            <Link to="/policies" className="hover:text-white">Refund</Link>
            <span className="text-white/25">·</span>
            <Link to="/policies" className="hover:text-white">Terms</Link>
          </div>
          <div className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-medium text-white/65">
            <Icon name="award" size={13} className="text-amber-400" />
            <span>Certified 5-Star TallyPrime Partner</span>
            <span className="h-1 w-1 rounded-full bg-white/25" />
            <span>Licences issued by Tally Solutions Pvt. Ltd.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ---------- Layout ----------
function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <RouterNav />
      <main className="flex-1">
        <Outlet />
      </main>
      <RouterFooter />
      <FloatingWhatsApp />
    </div>
  );
}

// ---------- Generic placeholder page ----------
function PageHero({ eyebrow, title, sub, accent }) {
  return (
    <section className="hero-bg hero-grid relative overflow-hidden pt-[128px] pb-16 sm:pt-[148px] sm:pb-20" aria-labelledby="page-heading">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="inline-flex items-center gap-2 rounded-full border border-navy-900/10 bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-navy-900/70 shadow-card">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
            {eyebrow}
          </div>
        </Reveal>
        <Reveal delay={80}>
          <h1 id="page-heading" className="font-display mt-5 max-w-3xl text-[44px] font-bold leading-[1.05] text-navy-900 sm:text-[60px]">
            {title}
            {accent && <span className="text-teal-600">{accent}</span>}
          </h1>
        </Reveal>
        {sub && (
          <Reveal delay={140}>
            <p className="mt-5 max-w-2xl text-[16px] leading-[1.65] text-navy-900/65 sm:text-[17px]">{sub}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}

function Placeholder({ eyebrow, title, sub, accent, children }) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} sub={sub} accent={accent} />
      {children || (
        <section className="border-t border-navy-900/8 bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-teal-600">
              <Icon name="construction" size={26} />
            </div>
            <h2 className="font-display mt-6 text-[28px] font-bold text-navy-900 sm:text-[34px]">Detailed content coming soon</h2>
            <p className="mt-3 text-[15.5px] leading-[1.65] text-navy-900/65">
              We're putting the finishing touches on this page. In the meantime, our team would be happy to walk you through everything in person — give us a call or drop a WhatsApp.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Link to="/contact" className="btn-lift btn-primary inline-flex items-center gap-2 rounded-full bg-navy-900 px-5 py-3 text-[14.5px] font-semibold text-white shadow-card">
                Talk to us <Icon name="arrow-right" size={15} />
              </Link>
              <a href={waLink('I would like more information.')} target="_blank" rel="noreferrer"
                className="btn-lift inline-flex items-center gap-2 rounded-full border border-navy-900/10 bg-white px-5 py-3 text-[14.5px] font-semibold text-navy-900 shadow-card">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-teal-500 text-white"><WhatsAppGlyph /></span>
                WhatsApp
              </a>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

// ---------- Pages ----------
function HomePage() { return <HomeSections />; }

function ProductsIndex() {
  return (
    <Placeholder eyebrow="Products" title="The complete TallyPrime " accent="line-up" sub="Everything you need to license, scale and run TallyPrime — from single-user editions to enterprise server deployments and cloud access.">
      <SubPageGrid items={PRODUCTS} eyebrow="Products" />
    </Placeholder>
  );
}
function SolutionsIndex() {
  return (
    <Placeholder eyebrow="Solutions" title="Solutions built " accent="on Tally" sub="Custom add-ons and integrations our team has built over fifteen years — battle-tested in real businesses across India.">
      <SubPageGrid items={SOLUTIONS} eyebrow="Solutions" />
    </Placeholder>
  );
}

function SubPageGrid({ items, eyebrow }) {
  return (
    <section className="border-t border-navy-900/8 bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Eyebrow>{eyebrow}</Eyebrow>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={it.to} delay={i * 60}>
              <Link to={it.to}
                className="btn-lift group flex h-full flex-col gap-3 rounded-2xl border border-navy-900/8 bg-white p-6 shadow-card hover:border-teal-500/30 hover:shadow-card-lg">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-600 group-hover:bg-teal-500 group-hover:text-white transition-colors">
                  <Icon name="arrow-right" size={18} />
                </span>
                <h3 className="font-display text-[20px] font-bold text-navy-900">{it.label}</h3>
                <p className="text-[14px] leading-[1.6] text-navy-900/65">{it.desc}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-[13px] font-semibold text-teal-700">
                  Learn more <Icon name="arrow-right" size={13} />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// Sub-pages — placeholders
function makeSub(eyebrow, title, sub, accent) {
  return () => <Placeholder eyebrow={eyebrow} title={title} accent={accent} sub={sub} />;
}

const TallyPrimePage   = makeSub('Products · TallyPrime',  'TallyPrime Silver ',     'The flagship business-management software — Silver for single-user, Gold for unlimited users on a LAN.', '& Gold');
const ServerPage       = makeSub('Products · Server',      'TallyPrime ',            'Run hundreds of concurrent users on a single, high-performance Tally deployment with bulletproof data integrity.', 'Server');
const TSSPage          = makeSub('Products · TSS',         'TSS ',                   'Tally Software Services — keeps your Tally up-to-date with statutory changes, online features and remote access.', 'Renewal');
const CloudPage        = makeSub('Products · Cloud',       'Tally on ',              'Access your Tally instance from anywhere — laptop, tablet, phone — hosted on enterprise-grade infrastructure.', 'Cloud');

const CBAPage          = makeSub('Solutions · CBA',        'Centralized Branch ',    'Consolidate books across multiple branches in real time, with automated inter-branch reconciliation.', 'Accounting');
const SDISPage         = makeSub('Solutions · SDIS',       'Smart Dynamic ',         'Connect Tally to your e-commerce, ERP or in-house systems with our integration framework.', 'Integration Suite');
const VoucherPage      = makeSub('Solutions · Approvals',  'Smart Voucher ',         'Multi-level approval workflows for purchase, sales and journal vouchers — directly inside Tally.', 'Approval');
const MobileAppPage    = makeSub('Solutions · Mobile',     'Tally ',                 'Reports, voucher approvals and outstanding tracking — on iOS and Android.', 'Mobile App');
const BuildersPage     = makeSub('Solutions · Builders',   'Builders ',              'Project-wise costing, RERA-aligned reporting and milestone billing for real-estate and construction firms.', 'Module');

const ServicesPage     = makeSub('Services',    'Services that go beyond ',  'Implementation, training, customisation, AMC and data migration — delivered by a team that has done this 500+ times.', 'a licence');
const IndustriesPage   = makeSub('Industries',  'Industries we ',            'Manufacturing, retail, distribution, services, real-estate, healthcare, education and more.', 'know inside out');
const AboutPage        = makeSub('About',       'A team that takes ',        'Fifteen years, five-star certification and hundreds of businesses still on our books — that\'s the only resume that matters.', 'Tally seriously');
const ContactPage      = makeSub('Contact',     'Let\'s ',                   'Reach out by phone, WhatsApp, email or by visiting our office. We respond within one business hour, every working day.', 'talk');
const PoliciesPage     = makeSub('Policies',    'Privacy, Refund & ',        'The fine print — privacy policy, refund terms, terms of service and licence agreements.', 'Terms');

function NotFound() {
  return (
    <Placeholder eyebrow="404" title="Page " accent="not found" sub="The page you're looking for doesn't exist or has been moved.">
      <section className="border-t border-navy-900/8 bg-white py-20">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <Link to="/" className="btn-lift btn-primary inline-flex items-center gap-2 rounded-full bg-navy-900 px-5 py-3 text-[14.5px] font-semibold text-white shadow-card">
            <Icon name="arrow-left" size={15} /> Back to home
          </Link>
        </div>
      </section>
    </Placeholder>
  );
}

// ---------- Mount ----------
function RouterApp() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />

          <Route path="products" element={<ProductsIndex />} />
          <Route path="products/tallyprime" element={<TallyPrimePage />} />
          <Route path="products/server" element={<ServerPage />} />
          <Route path="products/tss" element={<TSSPage />} />
          <Route path="products/cloud" element={<CloudPage />} />

          <Route path="solutions" element={<SolutionsIndex />} />
          <Route path="solutions/branch-accounting" element={<CBAPage />} />
          <Route path="solutions/sdis" element={<SDISPage />} />
          <Route path="solutions/voucher-approval" element={<VoucherPage />} />
          <Route path="solutions/mobile-app" element={<MobileAppPage />} />
          <Route path="solutions/builders" element={<BuildersPage />} />

          <Route path="services"   element={<ServicesPage />} />
          <Route path="industries" element={<IndustriesPage />} />
          <Route path="about"      element={<AboutPage />} />
          <Route path="contact"    element={<ContactPage />} />
          <Route path="policies"   element={<PoliciesPage />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(<RouterApp />);
