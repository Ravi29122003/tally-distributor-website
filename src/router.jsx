import { useState, useRef, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter, Routes, Route, Outlet, Link, NavLink, useLocation, useNavigate,
} from 'react-router-dom';
import {
  HomeSections, Icon, FloatingWhatsApp, WhatsAppGlyph, Eyebrow, Reveal, waLink,
} from './app';
import { siteConfig } from './config/site';
import ProductPricingPage from './components/ProductPricingPage';
import MandiPage from './components/softtrade/MandiPage';
import BrokwinPage from './components/softtrade/BrokwinPage';
import ColdwinPage from './components/softtrade/ColdwinPage';
import SoftCloudERPPage from './components/softtrade/SoftCloudERPPage';
import SilverPage from './components/tally/SilverPage';
import GoldPage from './components/tally/GoldPage';
import ServerPage from './components/tally/ServerPage';
import BizAnalystPage from './components/tally/BizAnalystPage';
import CustomizationPage from './components/services/CustomizationPage';
import SupportPage from './components/services/SupportPage';
import AboutPage from './components/AboutPage';
import OffersPage from './components/OffersPage';
import ContactPage from './components/ContactPage';
import DownloadsPage from './components/DownloadsPage';
import { productsData } from './data/products';
import { Banknote, MessageCircle, RefreshCw, IndianRupee, BarChart3, ShieldCheck, ArrowRight, FileText, Cloud, Wallet, Globe, Download } from 'lucide-react';
import './index.css';

const telHref = `tel:${siteConfig.phones.sales.replace(/\s/g, '')}`;

// ---------- Route maps ----------
const TALLY_PRODUCTS = [
  { label: 'TallyPrime Silver',     to: '/products/silver',         desc: 'Single user · Small business' },
  { label: 'TallyPrime Gold',       to: '/products/gold',           desc: 'Unlimited users on LAN' },
  { label: 'TallyPrime Server',     to: '/products/server',         desc: 'Enterprise, multi-branch' },
  { label: 'Auditors Edition',      to: '/products/auditors',       desc: 'For CA firms & auditors' },
  { label: 'Tally Virtual User',    to: '/products/virtual-user',   desc: 'Remote access add-on' },
  { label: 'Tally Mobile App',      to: '/products/mobile-app',     desc: 'Reports & approvals on the go' },
  { label: 'Upgrade Options',       to: '/products/upgrade',        desc: 'From older Tally versions' },
];

const TALLY_SERVICES = [
  { label: 'Tally Customization',   to: '/services/customization',  desc: 'TDL, custom reports & modules' },
  { label: 'Corporate Training',    to: '/services/training',       desc: '1-on-1 and group sessions' },
  { label: 'Tally Integration',     to: '/services/integration',    desc: 'Connect Tally to any system' },
  { label: 'Support Services',      to: '/services/support',        desc: 'AMC & priority support' },
  { label: 'Tally on Cloud',        to: '/services/cloud',          desc: 'Access Tally from anywhere' },
  { label: 'TSS Renewal',           to: '/services/tss-renewal',    desc: 'Keep your Tally up-to-date' },
  { label: 'Zoho Integration',      to: '/services/zoho',           desc: 'Zoho Books ↔ Tally sync' },
];

const PRODUCTS_NON_TALLY = [
  { label: 'SoftTrade-Mandi',   to: '/products/softtrade-mandi',   desc: 'Mahajani accounting for mandis, mills & traders' },
  { label: 'SoftTrade-Brokwin', to: '/products/softtrade-brokwin', desc: 'For commodity and textile brokers' },
  { label: 'SoftTrade-Coldwin', to: '/products/softtrade-coldwin', desc: 'Cold storage & warehouse management' },
  { label: 'SoftCloud-ERP',     to: '/products/softcloud-erp',     desc: 'Smart business control system for mandis, mills & processors' },
];

const SIMPLE_NAV = [
  { label: 'Home',       to: '/' },
  { label: 'About',      to: '/about' },
  { label: 'Offers',     to: '/offers' },
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
    <Link to="/" className={`flex items-center ${className}`} aria-label={`${siteConfig.brand} home`}>
      <img
        src="/Logo.png"
        alt={siteConfig.brand}
        className="h-20 w-auto sm:h-24"
      />
    </Link>
  );
}

// ---------- Desktop dropdown menu ----------
function NavDropdown({ label, items, groups, basePath }) {
  const [open, setOpen] = useState(false);
  const closeT = useRef(null);
  const { pathname } = useLocation();
  const isActive = pathname === basePath || pathname.startsWith(basePath + '/');

  const onEnter = () => { clearTimeout(closeT.current); setOpen(true); };
  const onLeave = () => { closeT.current = setTimeout(() => setOpen(false), 120); };

  const isGrouped = Array.isArray(groups) && groups.length > 0;
  const hasFlat = Array.isArray(items) && items.length > 0;
  if (!isGrouped && !hasFlat) return null;

  const panelWidthClass = isGrouped ? 'w-[640px] max-w-[calc(100vw-2rem)]' : 'w-[340px]';

  const renderItem = (it) => (
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
  );

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
        className={`absolute left-1/2 top-full z-[60] mt-2 ${panelWidthClass} -translate-x-1/2 transition-all duration-200 ${
          open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-1 pointer-events-none'
        }`}
        role="menu"
      >
        <div className="overflow-hidden rounded-2xl border border-navy-900/10 bg-white shadow-card-lg">
          {isGrouped ? (
            <div className="grid grid-cols-2 divide-x divide-navy-900/8">
              {groups.map((group) => (
                <div key={group.heading} className="p-2">
                  <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-navy-900/55">
                    {group.heading}
                  </div>
                  {group.items.map(renderItem)}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-2">
              {items.map(renderItem)}
            </div>
          )}
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
          ? 'backdrop-blur-xl bg-white/95 border-b border-navy-900/10 shadow-[0_4px_20px_-12px_rgba(11,29,58,0.15)]'
          : 'bg-white/85 backdrop-blur-lg border-b border-navy-900/8 shadow-[0_2px_12px_-8px_rgba(11,29,58,0.08)]'
      }`}
      role="banner"
    >
      <div className="mx-auto flex h-[88px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <BrandMark />

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          <NavLink to="/" end className={({isActive}) =>
            `nav-link rounded-md px-3 py-2 text-[14.5px] font-medium transition-colors ${isActive ? 'text-navy-900' : 'text-navy-900/70 hover:text-navy-900'}`}>
            Home
          </NavLink>
          <NavDropdown
            label="Products"
            items={PRODUCTS_NON_TALLY}
            basePath="/products"
          />
          <NavDropdown
            label="Tally"
            groups={[
              { heading: 'Tally Products', items: TALLY_PRODUCTS },
              { heading: 'Tally Services', items: TALLY_SERVICES },
            ]}
            basePath="/tally"
          />
          {SIMPLE_NAV.filter(i => i.to !== '/').map((it) => {
            const isOffers = it.label === 'Offers';
            return (
              <NavLink
                key={it.to}
                to={it.to}
                className={({isActive}) =>
                  `nav-link rounded-md px-3 py-2 text-[14.5px] font-medium transition-colors ${
                    isOffers
                      ? (isActive ? 'text-orange-700' : 'text-orange-600 hover:text-orange-700')
                      : (isActive ? 'text-navy-900' : 'text-navy-900/70 hover:text-navy-900')
                  }`
                }
              >
                {it.label}
              </NavLink>
            );
          })}
          <Link
            to="/downloads"
            className="ml-2 inline-flex items-center gap-1.5 rounded-full border border-orange-500/40 bg-orange-500/5 px-3.5 py-1.5 text-[13px] font-semibold text-orange-600 transition-colors hover:border-orange-500 hover:bg-orange-500 hover:text-white"
          >
            <Download className="h-3.5 w-3.5" strokeWidth={2.4}/>
            Downloads
          </Link>
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
        <div className="flex h-[88px] flex-none items-center justify-between border-b border-navy-900/10 px-5">
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
            label="Products"
            items={PRODUCTS_NON_TALLY}
            basePath="/products"
            isOpen={mobileExpanded === 'products'}
            onToggle={() => setMobileExpanded(m => m === 'products' ? null : 'products')}
            onLink={() => setOpen(false)}
          />
          <MobileExpandable
            label="Tally Products"
            items={TALLY_PRODUCTS}
            basePath="/products"
            isOpen={mobileExpanded === 'tally-products'}
            onToggle={() => setMobileExpanded(m => m === 'tally-products' ? null : 'tally-products')}
            onLink={() => setOpen(false)}
          />
          <MobileExpandable
            label="Tally Services"
            items={TALLY_SERVICES}
            basePath="/services"
            isOpen={mobileExpanded === 'tally-services'}
            onToggle={() => setMobileExpanded(m => m === 'tally-services' ? null : 'tally-services')}
            onLink={() => setOpen(false)}
          />

          {SIMPLE_NAV.filter(i => i.to !== '/').map((it) => {
            const isOffers = it.label === 'Offers';
            return (
              <Link
                key={it.to}
                to={it.to}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-[16px] font-semibold hover:bg-navy-50/60 ${
                  isOffers ? 'text-orange-600 hover:text-orange-700' : 'text-navy-900/80'
                }`}
              >
                {it.label} <Icon name="arrow-right" size={16} className={isOffers ? 'text-orange-600/50' : 'text-navy-900/40'} />
              </Link>
            );
          })}
          <Link to="/downloads" onClick={() => setOpen(false)} className="flex items-center gap-3 px-5 py-3.5 text-[16px] font-medium text-navy-900">
            <Download className="h-4 w-4 text-orange-600" strokeWidth={2.2}/>
            Downloads
          </Link>
        </nav>
        <div className="flex-none border-t border-navy-900/10 p-5">
          <a href={telHref} className="btn-lift mb-2.5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-navy-900 px-4 py-3.5 text-[15px] font-semibold text-white">
            <Icon name="phone" size={15} /> Call {siteConfig.phones.sales}
          </a>
          <a href={waLink("I'd like to know more about your software products and get a quote.")} target="_blank" rel="noreferrer"
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
    {
      title: 'Our Products',
      links: PRODUCTS_NON_TALLY.map(p => ({ label: p.label, to: p.to })),
    },
    {
      title: 'Tally Products',
      links: TALLY_PRODUCTS.map(p => ({ label: p.label, to: p.to })),
    },
    {
      title: 'Tally Services',
      links: TALLY_SERVICES.map(s => ({ label: s.label, to: s.to })),
    },
    {
      title: 'Company',
      links: [
        { label: 'About us',   to: '/about' },
        { label: 'Offers',     to: '/offers' },
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

      <div className="relative mx-auto max-w-7xl px-5 pt-12 pb-8 sm:px-8 sm:pt-14">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-5 lg:gap-8">
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link to="/" className="inline-flex items-center" aria-label={`${siteConfig.brand} home`}>
              <span className="inline-flex items-center justify-center rounded-xl bg-white px-3 py-2 shadow-card-lg ring-1 ring-white/20">
                <img
                  src="/Logo.png"
                  alt={siteConfig.brand}
                  className="h-10 w-auto sm:h-12"
                />
              </span>
            </Link>

            <p className="mt-5 max-w-xs text-[13.5px] leading-[1.6] text-white/60">
              Helping Indian businesses run their books with confidence since 2010. Genuine licences. Honest service. No surprises.
            </p>

            {/* Contact strip */}
            <div className="mt-5 flex flex-col gap-2 text-[13px]">
              <a href={`tel:${siteConfig.phones.sales.replace(/\s|\+/g, '').replace(/^/, '+')}`}
                 className="inline-flex items-center gap-2 text-white/70 transition-colors hover:text-white">
                <Icon name="phone" size={13} className="text-teal-400" />
                {siteConfig.phones.sales}
              </a>
              <a href={`mailto:${siteConfig.emails.sales}`}
                 className="inline-flex items-center gap-2 text-white/70 transition-colors hover:text-white">
                <Icon name="mail" size={13} className="text-teal-400" />
                {siteConfig.emails.sales}
              </a>
            </div>

            {/* Socials */}
            <div className="mt-6 flex flex-wrap items-center gap-2">
              {socials.filter(s => s.href).map((s) => (
                <a key={s.name} href={s.href} target="_blank" rel="noreferrer" aria-label={s.name}
                  className="btn-lift inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white/70 hover:border-teal-400/50 hover:bg-white/10 hover:text-white">
                  {s.icon ? <Icon name={s.icon} size={15} /> : <WhatsAppGlyph />}
                </a>
              ))}
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="font-display text-[12px] font-bold uppercase tracking-[0.18em] text-orange-400">{c.title}</h4>
              <ul className="mt-5 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-[13.5px] text-white/60 transition-colors hover:text-white">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start gap-4 border-t border-white/10 pt-6 text-[12.5px] text-white/55 lg:flex-row lg:items-center lg:justify-between">
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
            <span>Tally Certified 3-Star Partner</span>
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
    <section className="hero-bg hero-grid relative overflow-hidden pt-[144px] pb-16 sm:pt-[164px] sm:pb-20" aria-labelledby="page-heading">
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
  const products = [
    {
      eyebrow: 'Mandi accounting',
      name: 'SoftTrade-Mandi',
      tagline: 'Mahajani accounting, the way mandis actually keep books.',
      desc: 'Windows-based accounting and inventory suite that runs the traditional Mahajani (Adat) bookkeeping North Indian grain, kirana, oil-mill and commission traders actually use — Chittha, Talpat, Aaita, Dalali — while layering modern GST, e-invoice and e-Way Bill generation on top.',
      features: ['Chittha · Talpat · Aaita', 'Mahajani / Adat system', 'GST + e-Way Bill', 'Multi-godown stock'],
      image: '/softtrade-mandi-box.png',
      to: '/products/softtrade-mandi',
    },
    {
      eyebrow: 'Broker-only suite',
      name: 'SoftTrade-Brokwin',
      tagline: 'Broker-only Mahajani accounting, built around the sauda.',
      desc: 'A purpose-built product for pure commission agents — grain, kirana, cattle-feed, oil-cake, bilty-cut and textile brokers who never take ownership of goods. The primary document is the sauda (contract), with confirmation slips, covering letters, brokerage bills and dual-party Mahajani ledgers all flowing from it.',
      features: ['Sauda contracts', 'Confirmation slips', 'Brokerage bills', 'Dual-party Mahajani'],
      image: '/brokwin-removebg-preview.png',
      to: '/products/softtrade-brokwin',
    },
    {
      eyebrow: 'Cold-chain billing',
      name: 'SoftTrade-Coldwin',
      tagline: 'Cold storage billing & stock register, built for the Indian cold chain.',
      desc: 'An offline Windows-based accounting and billing product for Indian cold storage operators and warehouses. Covers inward / outward, per-bag and per-bilty billing, GST invoicing and return filing. Part of the same trusted product family as SoftTrade-Mandi.',
      features: ['Inward / outward', 'Per-bag · per-bilty billing', 'Chamber allotment', 'GST + e-way bills'],
      image: '/Coldwin-removebg-preview.png',
      to: '/products/softtrade-coldwin',
    },
    {
      eyebrow: 'Cloud ERP',
      name: 'SoftCloud-ERP',
      tagline: 'Smart business control for mandis, mills & processing units.',
      desc: 'A cloud-based ERP built for grain, dal, spice, kirana and dry-fruit traders, plus flour mills, dal mills, oil mills and processing units. Real-time profit, item-wise margin, lot-wise stock, branch-wise control and a mobile dashboard for the owner — all from one system.',
      features: ['Real-time profit', 'Lot-wise stock', 'Branch-wise control', 'Mobile dashboard for owner'],
      image: '/Cloud ERP.png',
      to: '/products/softcloud-erp',
    },
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F1EADB] to-[#FBF8F1] pt-[152px] pb-20 sm:pt-[168px] sm:pb-28 border-b border-navy-900/8">
        <div className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:'linear-gradient(rgba(11,29,58,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(11,29,58,.04) 1px, transparent 1px)',
            backgroundSize:'48px 48px',
            maskImage:'radial-gradient(ellipse at top, black, transparent 75%)',
            WebkitMaskImage:'radial-gradient(ellipse at top, black, transparent 75%)',
          }}
        />
        <div className="pointer-events-none absolute -right-48 -top-48 h-[600px] w-[600px] rounded-full"
          style={{background:'radial-gradient(circle, rgba(225,83,11,.10), transparent 60%)'}}
        />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
            <div>
          {/* breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-[12.5px] font-medium text-navy-900/55">
            <Link to="/" className="hover:text-navy-900 transition-colors">Home</Link>
            <span aria-hidden>›</span>
            <span className="text-navy-900">Products</span>
          </nav>

          {/* eyebrow chip */}
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-navy-900/10 bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-navy-900/70 shadow-card">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
              Our software
            </div>
          </Reveal>

          {/* big title */}
          <Reveal delay={80}>
            <h1 className="font-display mt-6 max-w-5xl text-[44px] font-semibold leading-[1.02] tracking-[-0.025em] text-navy-900 sm:text-[68px]">
              SoftTrade — software <span className="italic text-orange-600">built for</span> Indian trade.
            </h1>
          </Reveal>

          {/* body copy */}
          <Reveal delay={140}>
            <p className="mt-6 max-w-2xl text-[16.5px] leading-[1.65] text-navy-900/70 sm:text-[17px]">
              Four products, one philosophy: build software the way Indian traders, brokers, mills and cold-storage operators actually keep books — Mahajani-first, GST-ready, supported end-to-end by our Jaipur team.
            </p>
          </Reveal>

          {/* dual CTAs */}
          <Reveal delay={200}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#products"
                className="btn-lift inline-flex items-center gap-2 rounded-full bg-orange-600 px-6 py-3 text-[14.5px] font-semibold text-white shadow-card hover:bg-orange-700">
                View software <ArrowRight size={15} strokeWidth={2.2} />
              </a>
              <a href={telHref}
                className="btn-lift inline-flex items-center gap-2 rounded-full bg-navy-900 px-5 py-3 text-[14.5px] font-semibold text-white shadow-card hover:bg-navy-800">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
                  <Icon name="phone" size={12} />
                </span>
                {siteConfig.phones.sales}
              </a>
            </div>
          </Reveal>
            </div>
            <div className="hidden justify-center lg:flex">
              <div className="relative w-full max-w-[420px]">
                <img
                  src="/Soft-Trade.png"
                  alt="SoftTrade"
                  className="w-full h-auto"
                  style={{ filter: 'drop-shadow(0 20px 40px rgba(11, 27, 44, 0.12))' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION INTRO */}
      <section id="products" className="border-t border-navy-900/8 bg-white pt-20 sm:pt-24 scroll-mt-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 pb-12">
          <Reveal>
            <div className="max-w-3xl">
              <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-teal-700">Our software</div>
              <h2 className="font-display mt-3 text-[34px] font-semibold leading-[1.1] tracking-[-0.02em] text-navy-900 sm:text-[44px]">
                Built for the way <span className="italic text-orange-600">Indian trade</span> actually works
              </h2>
              <p className="mt-4 text-[15.5px] leading-[1.65] text-navy-900/65 sm:text-[16px]">
                Four products that solve specific Indian trade problems — Mahajani accounting, broker workflows, cold storage operations, and cloud ERP. Each one is sold, deployed, and supported by our team directly.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PRODUCT ROWS */}
      {products.map((p, i) => (
        <section key={p.to}
          className={`border-t border-navy-900/8 ${i % 2 === 0 ? 'bg-white' : 'bg-[#FBF8F1]'} py-16 sm:py-20`}
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              {/* IMAGE COLUMN */}
              <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                <Reveal>
                  <div className="flex items-center justify-center">
                    <img src={p.image} alt={`${p.name} product box`}
                      className="w-full max-w-[440px] h-auto"
                      style={{ filter: 'drop-shadow(0 30px 50px rgba(11,27,44,0.18))' }}
                    />
                  </div>
                </Reveal>
              </div>

              {/* CONTENT COLUMN */}
              <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                <Reveal delay={80}>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-teal-700">{p.eyebrow}</div>
                    <h2 className="font-display mt-3 text-[32px] font-semibold leading-[1.1] tracking-[-0.02em] text-navy-900 sm:text-[42px]">
                      {p.name}
                    </h2>
                    <p className="mt-4 font-display text-[18px] italic font-medium text-navy-900/85 sm:text-[20px]">
                      {p.tagline}
                    </p>
                    <p className="mt-5 text-[15px] leading-[1.7] text-navy-900/70 sm:text-[15.5px]">
                      {p.desc}
                    </p>

                    {/* Feature chips */}
                    <div className="mt-6 flex flex-wrap gap-2">
                      {p.features.map((f, j) => (
                        <span key={j}
                          className="inline-flex items-center gap-1.5 rounded-full border border-navy-900/10 bg-white px-3 py-1.5 text-[12.5px] font-semibold text-navy-900/80 shadow-card">
                          <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                          {f}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="mt-8">
                      <Link to={p.to}
                        className="btn-lift inline-flex items-center gap-2 rounded-full bg-navy-900 px-5 py-3 text-[14px] font-semibold text-white shadow-card hover:bg-navy-800">
                        Learn more about {p.name} <ArrowRight size={14} strokeWidth={2.2} />
                      </Link>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* FINAL CTA STRIP — Tally cross-link */}
      <section className="border-t border-navy-900/8 bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <div className="rounded-2xl border border-navy-900/10 bg-gradient-to-br from-[#F1EADB] to-[#FBF8F1] p-8 sm:p-10">
              <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-teal-700">Looking for Tally?</div>
                  <h3 className="font-display mt-2 text-[24px] font-semibold leading-[1.2] text-navy-900 sm:text-[28px]">
                    We're a Tally Certified 3-Star Partner since 2010.
                  </h3>
                  <p className="mt-2 max-w-xl text-[14.5px] leading-[1.6] text-navy-900/65">
                    Need TallyPrime licensing, implementation, customisation or migration from Tally.ERP 9? View our Tally services.
                  </p>
                </div>
                <Link to="/tally"
                  className="btn-lift inline-flex shrink-0 items-center gap-2 rounded-full bg-orange-600 px-5 py-3 text-[14px] font-semibold text-white shadow-card hover:bg-orange-700">
                  View Tally services <ArrowRight size={14} strokeWidth={2.2} />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
function PowerOfSimplicity() {
  // Wheel geometry — 6 donut slices around a center hole
  const cx = 240, cy = 240, ri = 95, ro = 220;

  const slices = [
    { startA: 210, endA: 270, midA: 240, color: '#7CBA9F', label: 'BUSINESS\nTRANSACTION', Icon: Banknote },
    { startA: 270, endA: 330, midA: 300, color: '#F4BD96', label: 'COMMUNICATION',         Icon: MessageCircle },
    { startA: 330, endA: 390, midA: 360, color: '#EBD27D', label: 'DATA\nACCESSIBILITY',   Icon: RefreshCw },
    { startA:  30, endA:  90, midA:  60, color: '#A0D5BB', label: 'FINANCIAL NEEDS',       Icon: IndianRupee },
    { startA:  90, endA: 150, midA: 120, color: '#E8AAB2', label: 'REPORTING\nACCESSIBILITY', Icon: BarChart3 },
    { startA: 150, endA: 210, midA: 180, color: '#9FBED8', label: 'COMPLIANCE',            Icon: ShieldCheck },
  ];

  const toRad = (d) => d * Math.PI / 180;
  const donutSlice = (a1, a2) => {
    const a1r = toRad(a1), a2r = toRad(a2);
    const x1o = cx + ro * Math.cos(a1r), y1o = cy + ro * Math.sin(a1r);
    const x2o = cx + ro * Math.cos(a2r), y2o = cy + ro * Math.sin(a2r);
    const x1i = cx + ri * Math.cos(a1r), y1i = cy + ri * Math.sin(a1r);
    const x2i = cx + ri * Math.cos(a2r), y2i = cy + ri * Math.sin(a2r);
    return `M ${x1i},${y1i} L ${x1o},${y1o} A ${ro},${ro} 0 0 1 ${x2o},${y2o} L ${x2i},${y2i} A ${ri},${ri} 0 0 0 ${x1i},${y1i} Z`;
  };

  const labelPos = (midA, r) => {
    const rad = toRad(midA);
    return {
      left: ((cx + r * Math.cos(rad)) / 480 * 100) + '%',
      top:  ((cy + r * Math.sin(rad)) / 480 * 100) + '%',
    };
  };

  return (
    <section className="relative overflow-hidden border-t border-navy-900/8 bg-gradient-to-b from-[#FBF8F1] to-[#F1EADB] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">

        {/* Eyebrow + heading row */}
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-end">
          <Reveal>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-teal-700">TallyPrime · Power of Simplicity</div>
              <h2 className="font-display mt-3 text-[34px] font-semibold leading-[1.05] tracking-[-0.02em] text-navy-900 sm:text-[48px]">
                Everything in your business — <span className="italic text-orange-600">connected</span>.
              </h2>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-[15.5px] leading-[1.7] text-navy-900/70 sm:text-[16.5px]">
              Six pillars sit around a single TallyPrime. Banking, GST, reports, cloud, communication and compliance — all native, all in one place.
            </p>
          </Reveal>
        </div>

        {/* Three-column layout: left info | wheel | right info */}
        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_auto_1fr] lg:gap-12 items-start">

          {/* LEFT INFO COLUMN */}
          <div className="flex flex-col gap-8">
            <div>
              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
                  <Wallet size={18} strokeWidth={2} />
                </span>
                <h3 className="font-display text-[19px] font-semibold text-navy-900">Banking & payments</h3>
              </div>
              <ul className="mt-4 space-y-2.5 text-[14px] leading-[1.55] text-navy-900/70">
                <li className="flex gap-2"><span className="mt-1.5 h-1 w-1 flex-none rounded-full bg-orange-500"/>Check bank balance & get statements (Axis, SBI & Kotak)</li>
                <li className="flex gap-2"><span className="mt-1.5 h-1 w-1 flex-none rounded-full bg-orange-500"/>Direct vendor payments (Axis, SBI & Kotak)</li>
                <li className="flex gap-2"><span className="mt-1.5 h-1 w-1 flex-none rounded-full bg-orange-500"/>Payment Link & QR Code</li>
                <li className="flex gap-2"><span className="mt-1.5 h-1 w-1 flex-none rounded-full bg-orange-500"/>UPI and online payment integrations</li>
              </ul>
            </div>
            <div>
              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                  <FileText size={18} strokeWidth={2} />
                </span>
                <h3 className="font-display text-[19px] font-semibold text-navy-900">GST & e-Invoicing built in</h3>
              </div>
              <ul className="mt-4 space-y-2.5 text-[14px] leading-[1.55] text-navy-900/70">
                <li className="flex gap-2"><span className="mt-1.5 h-1 w-1 flex-none rounded-full bg-teal-500"/>File GSTR-1 & auto reconciliation</li>
                <li className="flex gap-2"><span className="mt-1.5 h-1 w-1 flex-none rounded-full bg-teal-500"/>Create party from GSTIN</li>
                <li className="flex gap-2"><span className="mt-1.5 h-1 w-1 flex-none rounded-full bg-teal-500"/>E-invoice</li>
                <li className="flex gap-2"><span className="mt-1.5 h-1 w-1 flex-none rounded-full bg-teal-500"/>E-way bill</li>
              </ul>
            </div>
          </div>

          {/* CENTER WHEEL */}
          <div className="mx-auto flex flex-col items-center justify-self-center">
            <div className="relative aspect-square w-[320px] sm:w-[400px] lg:w-[440px]">
              <svg viewBox="0 0 480 480" className="absolute inset-0 h-full w-full" aria-hidden>
                {slices.map((s, i) => (
                  <path key={i} d={donutSlice(s.startA, s.endA)} fill={s.color} stroke="#FBF8F1" strokeWidth="3" />
                ))}
                {/* Center circle */}
                <circle cx={cx} cy={cy} r={ri - 5} fill="#ffffff" stroke="rgba(11,29,58,0.10)" strokeWidth="1.5" />
              </svg>

              {/* Slice icons + labels */}
              {slices.map((s, i) => {
                const SliceIcon = s.Icon;
                return (
                  <div key={i}
                    className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
                    style={labelPos(s.midA, 160)}>
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-navy-900 shadow-card">
                      <SliceIcon size={16} strokeWidth={2} />
                    </span>
                    <span className="whitespace-pre-line text-center text-[9px] font-bold uppercase tracking-[0.08em] leading-tight text-navy-900/85">
                      {s.label}
                    </span>
                  </div>
                );
              })}

              {/* Center label */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="font-display text-[18px] font-semibold leading-none text-navy-900">
                  Tally<span className="text-orange-600">·</span>Prime
                </div>
                <div className="mt-1 text-[9px] font-medium uppercase tracking-[0.14em] text-navy-900/55">
                  Everything is<br/>Connected
                </div>
              </div>
            </div>

            {/* WhatsApp chip below wheel */}
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-navy-900/10 bg-white px-3 py-1.5 text-[12px] font-semibold text-navy-900 shadow-card">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-teal-500 text-white">
                <MessageCircle size={11} strokeWidth={2.5} />
              </span>
              TallyPrime with WhatsApp
            </div>
          </div>

          {/* RIGHT INFO COLUMN */}
          <div className="flex flex-col gap-8">
            <div>
              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-sky-50 text-sky-700">
                  <Cloud size={18} strokeWidth={2} />
                </span>
                <h3 className="font-display text-[19px] font-semibold text-navy-900">Cloud Access</h3>
              </div>
              <ul className="mt-4 space-y-2.5 text-[14px] leading-[1.55] text-navy-900/70">
                <li className="flex gap-2"><span className="mt-1.5 h-1 w-1 flex-none rounded-full bg-sky-500"/>TallyPrime Cloud Access</li>
                <li className="flex gap-2"><span className="mt-1.5 h-1 w-1 flex-none rounded-full bg-sky-500"/>Automatic backups to the cloud</li>
              </ul>
            </div>
            <div>
              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 text-violet-700">
                  <Globe size={18} strokeWidth={2} />
                </span>
                <h3 className="font-display text-[19px] font-semibold text-navy-900">Reports in any browser</h3>
              </div>
              <p className="mt-4 text-[14px] leading-[1.6] text-navy-900/70">
                View any Tally report on any device, in any browser.
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer + CTA strip */}
        <Reveal>
          <div className="mt-16 flex flex-col items-start justify-between gap-4 rounded-2xl border border-navy-900/10 bg-white p-5 shadow-card sm:flex-row sm:items-center sm:p-6">
            <div className="flex items-center gap-3 text-[13px] text-navy-900/65">
              <span className="inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-amber-50 text-amber-600">
                <ShieldCheck size={13} strokeWidth={2} />
              </span>
              Tally Solutions Pvt. Ltd. · For informational purposes only
            </div>
            <Link to="/contact"
              className="btn-lift inline-flex items-center gap-2 rounded-full bg-orange-600 px-5 py-2.5 text-[13.5px] font-semibold text-white shadow-card hover:bg-orange-700">
              Talk to a Tally specialist <ArrowRight size={14} strokeWidth={2.2} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function TallyIndex() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F1EADB] to-[#FBF8F1] pt-[152px] pb-20 sm:pt-[168px] sm:pb-28 border-b border-navy-900/8">
        {/* paper grid backdrop */}
        <div className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:'linear-gradient(rgba(11,29,58,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(11,29,58,.04) 1px, transparent 1px)',
            backgroundSize:'48px 48px',
            maskImage:'radial-gradient(ellipse at top, black, transparent 75%)',
            WebkitMaskImage:'radial-gradient(ellipse at top, black, transparent 75%)',
          }}
        />
        {/* warm halo */}
        <div className="pointer-events-none absolute -right-48 -top-48 h-[600px] w-[600px] rounded-full"
          style={{background:'radial-gradient(circle, rgba(225,83,11,.10), transparent 60%)'}}
        />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
            <div>
          {/* breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-[12.5px] font-medium text-navy-900/55">
            <Link to="/" className="hover:text-navy-900 transition-colors">Home</Link>
            <span aria-hidden className="text-navy-900/40">›</span>
            <span className="text-navy-900">Tally</span>
          </nav>

          {/* eyebrow chip */}
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-navy-900/10 bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-navy-900/70 shadow-card">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
              All Tally
            </div>
          </Reveal>

          {/* big serif title with orange italic accent */}
          <Reveal delay={80}>
            <h1 className="font-display mt-6 max-w-5xl text-[44px] font-semibold leading-[1.02] tracking-[-0.025em] text-navy-900 sm:text-[68px]">
              TallyPrime — <span className="italic text-orange-600">licensing</span>, implementation, support.
            </h1>
          </Reveal>

          {/* body copy */}
          <Reveal delay={140}>
            <p className="mt-6 max-w-2xl text-[16.5px] leading-[1.65] text-navy-900/70 sm:text-[17px]">
              Tally Certified 3-Star Partner since 2010. Everything from buying your first licence to customising TDL, deploying Server edition, and migrating from Tally.ERP 9.
            </p>
          </Reveal>

          {/* dual CTAs */}
          <Reveal delay={200}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#tally-products"
                className="btn-lift inline-flex items-center gap-2 rounded-full bg-orange-600 px-6 py-3 text-[14.5px] font-semibold text-white shadow-card hover:bg-orange-700">
                Compare editions <Icon name="arrow-right" size={15} />
              </a>
              <a href={telHref}
                className="btn-lift inline-flex items-center gap-2 rounded-full bg-navy-900 px-5 py-3 text-[14.5px] font-semibold text-white shadow-card hover:bg-navy-800">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
                  <Icon name="phone" size={12} />
                </span>
                {siteConfig.phones.sales}
              </a>
            </div>
          </Reveal>
            </div>
            <div className="hidden justify-center lg:flex">
              <div className="relative w-full max-w-[420px]">
                <img
                  src="/3 Star Partner.png"
                  alt="Tally Certified 3 Star Sales & Implementation Partner"
                  className="w-full h-auto"
                  style={{ filter: 'drop-shadow(0 20px 40px rgba(11, 27, 44, 0.12))' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 01 — TALLY PRODUCTS */}
      <section id="tally-products" className="border-t border-navy-900/8 bg-white py-20 sm:py-24 scroll-mt-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <div className="max-w-3xl">
              <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-teal-700">Section 01</div>
              <h2 className="font-display mt-3 text-[34px] font-semibold leading-[1.1] tracking-[-0.02em] text-navy-900 sm:text-[44px]">
                Tally Products
              </h2>
              <p className="mt-4 text-[15.5px] leading-[1.65] text-navy-900/65 sm:text-[16px]">
                Every TallyPrime edition at partner-channel rates — Silver, Gold, Server, Auditors, Virtual User, Mobile App, and upgrade options.
              </p>
            </div>
          </Reveal>
          <CardGrid items={TALLY_PRODUCTS} />
        </div>
      </section>

      <PowerOfSimplicity />

      {/* SECTION 02 — TALLY SERVICES */}
      <section className="border-t border-navy-900/8 bg-navy-50/30 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <div className="max-w-3xl">
              <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-teal-700">Section 02</div>
              <h2 className="font-display mt-3 text-[34px] font-semibold leading-[1.1] tracking-[-0.02em] text-navy-900 sm:text-[44px]">
                Tally Services
              </h2>
              <p className="mt-4 text-[15.5px] leading-[1.65] text-navy-900/65 sm:text-[16px]">
                Beyond licensing: implementation, training, customisation, AMC, cloud hosting, TSS renewal, and Zoho integration — delivered end-to-end by our Jaipur team.
              </p>
            </div>
          </Reveal>
          <CardGrid items={TALLY_SERVICES} />
        </div>
      </section>
    </>
  );
}

function ServicesIndex() {
  return (
    <Placeholder eyebrow="Services" title="Everything we do " accent="beyond licensing" sub="Implementation, training, customisation, AMC, cloud, TSS renewal and Zoho integration — delivered by a team that has done this 500+ times.">
      <SubPageGrid items={TALLY_SERVICES} eyebrow="Services" />
    </Placeholder>
  );
}

function CardGrid({ items }) {
  return (
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
  );
}

function SubPageGrid({ items, eyebrow }) {
  return (
    <section className="border-t border-navy-900/8 bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Eyebrow>{eyebrow}</Eyebrow>
        <CardGrid items={items} />
      </div>
    </section>
  );
}

// Sub-pages — placeholders
function makeSub(eyebrow, title, sub, accent) {
  return () => <Placeholder eyebrow={eyebrow} title={title} accent={accent} sub={sub} />;
}

// Service sub-pages

// Top-level pages
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
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />

          {/* Products */}
          <Route path="products"               element={<ProductsIndex />} />
          <Route path="tally"                  element={<TallyIndex />} />
          <Route path="products/silver"        element={<SilverPage />} />
          <Route path="products/gold"          element={<GoldPage />} />
          <Route path="products/server"        element={<ServerPage />} />
          <Route path="products/auditors"      element={<ProductPricingPage product={productsData.auditors} />} />
          <Route path="products/virtual-user"  element={<ProductPricingPage product={productsData['virtual-user']} />} />
          <Route path="products/mobile-app"    element={<BizAnalystPage />} />
          <Route path="products/upgrade"       element={<ProductPricingPage product={productsData.upgrade} />} />

          {/* SoftTrade and other non-Tally products — placeholders until Wave C */}
          <Route path="products/softtrade-mandi"   element={<MandiPage />} />
          <Route path="products/softtrade-brokwin" element={<BrokwinPage />} />
          <Route path="products/softtrade-coldwin" element={<ColdwinPage />} />
          <Route path="products/softcloud-erp"     element={<SoftCloudERPPage />} />

          {/* Services */}
          <Route path="services"               element={<ServicesIndex />} />
          <Route path="services/customization" element={<CustomizationPage />} />
          <Route path="services/training"      element={<ProductPricingPage product={productsData.training} />} />
          <Route path="services/integration"   element={<ProductPricingPage product={productsData.integration} />} />
          <Route path="services/support"       element={<SupportPage />} />
          <Route path="services/cloud"         element={<ProductPricingPage product={productsData.cloud} />} />
          <Route path="services/tss-renewal"   element={<ProductPricingPage product={productsData['tss-renewal']} />} />
          <Route path="services/zoho"          element={<ProductPricingPage product={productsData.zoho} />} />

          {/* Top-level pages */}
          <Route path="about"                  element={<AboutPage />} />
          <Route path="offers"                 element={<OffersPage />} />
          <Route path="contact"                element={<ContactPage />} />
          <Route path="downloads"              element={<DownloadsPage />} />
          <Route path="policies"               element={<PoliciesPage />} />

          <Route path="*"                      element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(<RouterApp />);
