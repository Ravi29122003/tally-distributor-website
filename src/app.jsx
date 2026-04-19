import { useState, useRef, useEffect } from 'react';
import {
  ArrowLeft, ArrowRight, Award, BadgeCheck, Building2, Check,
  ChevronDown, Clock, Code2, Construction, CreditCard, Crown,
  Facebook, FileCheck, Gem, GraduationCap, Headphones, Infinity,
  Instagram, LifeBuoy, Linkedin, Mail, MapPin, Menu, Phone,
  Quote, Receipt, Send, Server, Settings, ShieldCheck, Sparkles,
  Star, Tag, Target, User, Users, X, Youtube, Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteConfig } from './config/site';

// ------ Validation helpers ------
const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
const isValidPhone = (v) => v.replace(/\D/g, '').length >= 10;

// ------ Context-aware WhatsApp ------
export function waLink(ctx) {
  const msg = `Hi ${siteConfig.brand}, ${ctx}`;
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(msg)}`;
}

// ------ Reveal on scroll (with stagger) ------
export function Reveal({ as = 'div', delay = 0, className = '', children, ...rest }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setSeen(true); return;
    }
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    if (r.top < vh && r.bottom > 0) {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { setSeen(true); io.disconnect(); }
      }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const Tag = as;
  return (
    <Tag
      ref={ref}
      className={`reveal ${seen ? 'is-in' : ''} ${className}`}
      style={{ transitionDelay: seen ? `${delay}ms` : '0ms' }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// ------ Lucide icon helper ------
const ICON_MAP = {
  'arrow-left': ArrowLeft,
  'arrow-right': ArrowRight,
  'award': Award,
  'badge-check': BadgeCheck,
  'building-2': Building2,
  'check': Check,
  'chevron-down': ChevronDown,
  'clock': Clock,
  'code-2': Code2,
  'construction': Construction,
  'credit-card': CreditCard,
  'crown': Crown,
  'facebook': Facebook,
  'file-check': FileCheck,
  'gem': Gem,
  'graduation-cap': GraduationCap,
  'headphones': Headphones,
  'infinity': Infinity,
  'instagram': Instagram,
  'life-buoy': LifeBuoy,
  'linkedin': Linkedin,
  'mail': Mail,
  'map-pin': MapPin,
  'menu': Menu,
  'phone': Phone,
  'quote': Quote,
  'receipt': Receipt,
  'send': Send,
  'server': Server,
  'settings': Settings,
  'shield-check': ShieldCheck,
  'sparkles': Sparkles,
  'star': Star,
  'tag': Tag,
  'target': Target,
  'user': User,
  'users': Users,
  'x': X,
  'youtube': Youtube,
  'zap': Zap,
};

export function Icon({ name, size = 18, strokeWidth = 2, className = '', ...rest }) {
  const LucideIcon = ICON_MAP[name];
  if (!LucideIcon) {
    if (import.meta.env.DEV) {
      console.warn(`[Icon] Unknown icon name: "${name}"`);
    }
    return null;
  }
  return <LucideIcon size={size} strokeWidth={strokeWidth} className={className} aria-hidden {...rest} />;
}

// ------ Brand mark ------
export function Logo({ className = '' }) {
  return (
    <a href="#" className={`flex items-center gap-2.5 ${className}`}>
      <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg bg-navy-900 text-white shadow-card">
        <span className="font-display text-[18px] font-bold leading-none">T</span>
        <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-teal-500 ring-2 ring-white"></span>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[20px] font-bold text-navy-900">{siteConfig.brand}</span>
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-navy-900/55">{siteConfig.tagline}</span>
      </span>
    </a>
  );
}

// ------ Animated counter ------
function useCountUp(target, duration = 1400) {
  const [val, setVal] = useState(0);
  const started = useRef(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (now) => {
              const p = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - p, 3);
              setVal(target * eased);
              if (p < 1) requestAnimationFrame(tick);
              else setVal(target);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration]);

  return [val, ref];
}

function Stat({ value, suffix, decimals = 0, label, sub }) {
  const [v, ref] = useCountUp(value);
  const display =
    decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString('en-IN');
  return (
    <div ref={ref} className="flex flex-col">
      <div className="flex items-baseline gap-1">
        <span className="font-display text-[34px] font-bold leading-none text-navy-900 sm:text-[40px]">
          {display}
        </span>
        {suffix && (
          <span className="font-display text-[22px] font-semibold text-teal-600 sm:text-[26px]">
            {suffix}
          </span>
        )}
      </div>
      <span className="mt-2 text-[13px] font-medium text-navy-900/70">{label}</span>
      {sub && <span className="mt-0.5 text-[11.5px] text-navy-900/45">{sub}</span>}
    </div>
  );
}

// ------ Floating shapes ------
function FloatingShapes() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="float-a absolute -right-24 -top-16 h-[360px] w-[360px] rounded-full opacity-60 blur-3xl"
        style={{
          background:
            'radial-gradient(circle at 30% 30%, rgba(20,184,166,0.35), rgba(20,184,166,0) 70%)',
        }}
      />
      <div
        className="float-b absolute -left-24 top-1/3 h-[280px] w-[280px] rounded-full opacity-70 blur-3xl"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(245,158,11,0.22), rgba(245,158,11,0) 70%)',
        }}
      />
      <svg
        className="float-c absolute left-[6%] top-[22%] h-12 w-12 text-teal-500/40"
        style={{ '--r': '12deg' }}
        viewBox="0 0 48 48" fill="none"
      >
        <rect x="4" y="4" width="40" height="40" rx="10" stroke="currentColor" strokeWidth="1.5" />
        <rect x="12" y="12" width="24" height="24" rx="5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <svg
        className="float-a absolute right-[44%] top-[14%] h-10 w-10 text-amber-500/60"
        style={{ '--r': '-18deg' }}
        viewBox="0 0 40 40" fill="none"
      >
        <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="20" cy="20" r="6" fill="currentColor" opacity="0.5" />
      </svg>
      <svg
        className="float-b absolute left-[38%] bottom-[14%] h-8 w-8 text-navy-900/30"
        style={{ '--r': '24deg' }}
        viewBox="0 0 32 32" fill="none"
      >
        <polygon points="16,3 29,26 3,26" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <svg
        className="float-c absolute right-[8%] bottom-[18%] h-14 w-14 text-teal-600/30"
        style={{ '--r': '-8deg' }}
        viewBox="0 0 56 56" fill="none"
      >
        <path d="M8 28 L28 8 L48 28 L28 48 Z" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <svg className="absolute right-[18%] top-[40%] h-24 w-24 text-navy-900/15" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 6" />
      </svg>
    </div>
  );
}

// ------ Callback form card ------
function CallbackCard() {
  const [form, setForm] = useState({ name: '', phone: '', interest: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const interests = [
    'New TallyPrime licence',
    'Renewal / TSS',
    'Upgrade from older version',
    'Multi-user / Server edition',
    'Customisation & integration',
    'Training & support',
  ];

  const clearError = (field) => setErrors((prev) => ({ ...prev, [field]: undefined }));

  const onSubmit = (e) => {
    e.preventDefault();
    if (loading) return;
    const errs = {};
    if (!form.name.trim()) errs.name = 'Please enter your name';
    if (!isValidPhone(form.phone)) errs.phone = 'Please enter a valid 10-digit phone number';
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 900);
  };

  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-4 -z-10 rounded-[28px] opacity-70 blur-2xl"
        style={{
          background:
            'radial-gradient(60% 60% at 30% 20%, rgba(20,184,166,0.18), transparent 70%), radial-gradient(50% 50% at 80% 90%, rgba(245,158,11,0.14), transparent 70%)',
        }}
      />
      <div className="relative overflow-hidden rounded-2xl border border-navy-900/8 bg-white shadow-card-lg">
        <div className="flex items-center justify-between border-b border-navy-900/8 bg-gradient-to-r from-navy-50/60 to-white px-6 py-4">
          <div className="flex items-center gap-2.5">
            <span className="relative inline-flex h-2.5 w-2.5">
              <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-teal-500"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-teal-500"></span>
            </span>
            <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-navy-900/70">
              Request a Callback
            </span>
          </div>
          <span className="hidden items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-1 text-[11px] font-semibold text-amber-600 sm:inline-flex">
            <Icon name="clock" size={12} strokeWidth={2.5} />
            15 min response
          </span>
        </div>

        {submitted ? (
          <div className="px-6 py-10 text-center">
            <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-teal-50 text-teal-600">
              <Icon name="check" size={28} strokeWidth={2.5} />
            </div>
            <h4 className="font-display text-[22px] font-bold text-navy-900">
              Thank you, {form.name.split(' ')[0] || 'friend'}!
            </h4>
            <p className="mt-1.5 text-[14px] text-navy-900/65">
              Our specialist will call you at <span className="font-semibold text-navy-900">{form.phone}</span> within 15 minutes.
            </p>
            <button
              onClick={() => { setSubmitted(false); setForm({ name:'', phone:'', interest:'' }); }}
              className="mt-5 text-[13px] font-semibold text-teal-700 hover:text-teal-600"
            >
              Submit another request →
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="px-6 py-6">
            <h3 className="font-display text-[22px] font-bold leading-tight text-navy-900 sm:text-[24px]">
              Talk to a Tally expert
            </h3>
            <p className="mt-1.5 text-[13.5px] text-navy-900/60">
              Share a few details — we'll call back in <span className="font-semibold text-navy-900">15 minutes</span> with a tailored recommendation.
            </p>

            <div className="mt-5 space-y-3.5">
              <Field
                label="Your name"
                icon="user"
                placeholder="e.g. Priya Sharma"
                autoComplete="name"
                required
                value={form.name}
                onChange={(v) => { clearError('name'); setForm((f) => ({ ...f, name: v })); }}
                error={errors.name}
              />
              <Field
                label="Phone number"
                icon="phone"
                type="tel"
                autoComplete="tel"
                required
                prefix="+91"
                placeholder="90000 00000"
                inputMode="numeric"
                value={form.phone}
                onChange={(v) => { clearError('phone'); setForm((f) => ({ ...f, phone: v.replace(/[^0-9\s]/g, '') })); }}
                error={errors.phone}
              />
              <SelectField
                label="I'm interested in"
                icon="target"
                placeholder="Tell us what you're exploring"
                value={form.interest}
                onChange={(v) => setForm((f) => ({ ...f, interest: v }))}
                options={interests}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary btn-lift mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-navy-900 px-5 py-3.5 text-[15px] font-semibold text-white hover:bg-navy-800 hover:shadow-card-lg disabled:cursor-wait disabled:opacity-80"
            >
              {loading ? (
                <>
                  <span className="spinner" aria-hidden />
                  Submitting…
                </>
              ) : (
                <>
                  Request callback
                  <Icon name="arrow-right" size={16} strokeWidth={2.5} />
                </>
              )}
            </button>

            <div className="mt-4 flex items-center gap-3 text-[11.5px] text-navy-900/55">
              <span className="inline-flex items-center gap-1.5">
                <Icon name="shield-check" size={13} className="text-teal-600" />
                100% confidential
              </span>
              <span className="h-1 w-1 rounded-full bg-navy-900/20"></span>
              <span className="inline-flex items-center gap-1.5">
                <Icon name="badge-check" size={13} className="text-teal-600" />
                No spam, ever
              </span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({ label, icon, prefix, value, onChange, placeholder, inputMode, type = 'text', autoComplete, required = false, error }) {
  return (
    <div>
      <label className="block">
        <span className="mb-1.5 block text-[12px] font-semibold text-navy-900/70">
          {label}
          {required && <span className="ml-0.5 text-red-600">*</span>}
        </span>
        <div className={`group flex items-center gap-2 rounded-xl border bg-navy-50/30 px-3.5 py-3 transition-colors focus-within:border-teal-500 focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(20,184,166,0.14)] ${error ? 'border-red-400' : 'border-navy-900/12'}`}>
          {icon && <Icon name={icon} size={15} className="text-navy-900/50" />}
          {prefix && <span className="text-[14px] font-semibold text-navy-900/80">{prefix}</span>}
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            inputMode={inputMode}
            autoComplete={autoComplete}
            required={required}
            className="w-full bg-transparent text-[14.5px] text-navy-900 placeholder:text-navy-900/35 focus:outline-none"
          />
        </div>
      </label>
      {error && <p className="text-[12px] text-red-600 mt-1">{error}</p>}
    </div>
  );
}

let selectIdCounter = 0;

function SelectField({ label, icon, value, onChange, options, placeholder = 'Choose an option', required = false, error }) {
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(-1);
  const wrapperRef = useRef(null);
  const listboxRef = useRef(null);
  const [listboxId] = useState(() => `select-listbox-${++selectIdCounter}`);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  // Scroll highlighted option into view
  useEffect(() => {
    if (!open || highlight < 0 || !listboxRef.current) return;
    const el = listboxRef.current.children[highlight];
    if (el) el.scrollIntoView({ block: 'nearest' });
  }, [highlight, open]);

  const toggle = () => {
    setOpen((o) => !o);
    if (!open) setHighlight(value ? options.indexOf(value) : -1);
  };

  const select = (opt) => {
    onChange(opt);
    setOpen(false);
  };

  const onKeyDown = (e) => {
    if (!open) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setOpen(true);
        setHighlight(value ? options.indexOf(value) : 0);
      }
      return;
    }

    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        setOpen(false);
        break;
      case 'ArrowDown':
        e.preventDefault();
        setHighlight((h) => (h < options.length - 1 ? h + 1 : 0));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlight((h) => (h > 0 ? h - 1 : options.length - 1));
        break;
      case 'Enter':
        e.preventDefault();
        if (highlight >= 0 && highlight < options.length) select(options[highlight]);
        break;
    }
  };

  return (
    <div ref={wrapperRef} className="relative">
      <span className="mb-1.5 block text-[12px] font-semibold text-navy-900/70">
        {label}
        {required && <span className="ml-0.5 text-red-600">*</span>}
      </span>
      <button
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        onClick={toggle}
        onKeyDown={onKeyDown}
        className={`flex w-full items-center gap-2 rounded-xl border bg-navy-50/30 px-3.5 py-3 text-left transition-colors ${
          open
            ? 'border-teal-500 bg-white shadow-[0_0_0_3px_rgba(20,184,166,0.14)]'
            : error ? 'border-red-400' : 'border-navy-900/12'
        } focus:border-teal-500 focus:bg-white focus:shadow-[0_0_0_3px_rgba(20,184,166,0.14)] focus:outline-none`}
      >
        {icon && <Icon name={icon} size={15} className="text-navy-900/50" />}
        <span className={`flex-1 text-[14.5px] ${value ? 'text-navy-900' : 'text-navy-900/35'}`}>
          {value || placeholder}
        </span>
        <Icon
          name="chevron-down"
          size={16}
          className={`text-navy-900/45 transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown menu */}
      <ul
        ref={listboxRef}
        id={listboxId}
        role="listbox"
        className={`absolute left-0 right-0 z-50 mt-1.5 max-h-60 overflow-y-auto rounded-xl border border-navy-900/10 bg-white py-1 shadow-card-lg transition-all duration-150 origin-top ${
          open
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 -translate-y-1 scale-[0.98] pointer-events-none'
        }`}
      >
        {options.map((opt, i) => {
          const isSelected = opt === value;
          const isHighlighted = i === highlight;
          return (
            <li
              key={opt}
              role="option"
              aria-selected={isSelected}
              onMouseEnter={() => setHighlight(i)}
              onClick={() => select(opt)}
              className={`flex cursor-pointer items-center justify-between gap-2 px-3.5 py-2.5 text-[14px] transition-colors ${
                isHighlighted ? 'bg-teal-50 text-navy-900' : 'text-navy-900/80'
              }`}
            >
              <span>{opt}</span>
              {isSelected && <Icon name="check" size={14} strokeWidth={2.5} className="text-teal-600" />}
            </li>
          );
        })}
      </ul>

      {error && <p className="text-[12px] text-red-600 mt-1">{error}</p>}
    </div>
  );
}

// ------ Hero ------
export function Hero() {
  return (
    <section className="hero-bg hero-grid relative overflow-hidden pt-[112px] pb-20 sm:pt-[132px] sm:pb-24" aria-labelledby="hero-heading">
      <FloatingShapes />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <div className="max-w-2xl">
          <Reveal className="inline-flex items-center gap-2 rounded-full border border-amber-500/25 bg-amber-500/10 px-3 py-1.5 text-[12.5px] font-semibold text-amber-700">
            <span className="flex items-center gap-0.5 text-amber-500" aria-hidden>
              {[...Array(5)].map((_, i) => (
                <Icon key={i} name="star" size={12} strokeWidth={2} className="fill-current" />
              ))}
            </span>
            Certified 5-Star TallyPrime Partner
          </Reveal>

          <Reveal as="h1" id="hero-heading" delay={80} className="hero-head mt-5 font-display text-[44px] font-bold leading-[1.05] text-navy-900 sm:text-[56px] lg:text-[64px]">
            Your Trusted{' '}
            <span className="relative inline-block">
              <span className="relative z-10">TallyPrime</span>
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-1 -z-0 h-3 rounded-sm bg-teal-500/25 sm:h-4"
              />
            </span>
            <br />
            Partner in <span className="italic text-navy-800">{siteConfig.location}</span>
          </Reveal>

          <Reveal as="p" delay={160} className="mt-5 max-w-xl text-[16.5px] leading-[1.6] text-navy-900/65 sm:text-[17.5px]">
            From licensing and implementation to training and round-the-clock
            support — we help Indian businesses run their books with confidence.
            <span className="text-navy-900/85"> 500+ businesses already trust us.</span>
          </Reveal>

          <Reveal delay={240} className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href="#pricing"
              className="btn-primary btn-lift inline-flex items-center gap-2 rounded-full bg-navy-900 px-6 py-3.5 text-[15px] font-semibold text-white shadow-card hover:bg-navy-800 hover:shadow-card-lg"
            >
              View Pricing
              <Icon name="arrow-right" size={16} strokeWidth={2.5} />
            </a>
            <a
              href={waLink("I'd like to know more about TallyPrime editions and get a quote.")}
              target="_blank"
              rel="noreferrer"
              className="btn-lift inline-flex items-center gap-2 rounded-full border border-navy-900/12 bg-white px-6 py-3.5 text-[15px] font-semibold text-navy-900 shadow-card hover:border-teal-500/40"
            >
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-teal-500 text-white">
                <WhatsAppGlyph />
              </span>
              WhatsApp Us
            </a>
            <div className="flex items-center gap-2 pl-1 text-[12.5px] text-navy-900/55">
              <Icon name="zap" size={13} className="text-amber-500" />
              Same-day activation
            </div>
          </Reveal>

          <Reveal delay={320} className="mt-10 grid grid-cols-3 gap-4 rounded-2xl border border-navy-900/8 bg-white/60 p-5 backdrop-blur sm:gap-6 sm:p-6">
            <Stat value={500} suffix="+" label="Happy clients" sub="Across India" />
            <div className="border-l border-navy-900/10 pl-4 sm:pl-6">
              <Stat value={15} suffix="+" label="Years experience" sub="Since 2010" />
            </div>
            <div className="border-l border-navy-900/10 pl-4 sm:pl-6">
              <Stat value={4.8} decimals={1} suffix="★" label="Average rating" sub="420+ reviews" />
            </div>
          </Reveal>
        </div>

        <Reveal delay={200} className="relative lg:pt-4">
          <CallbackCard />
        </Reveal>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-4 hidden justify-center md:flex">
        <a href="#trust" className="pointer-events-auto group flex flex-col items-center gap-1.5 text-navy-900/55 hover:text-navy-900" aria-label="Scroll to next section">
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em]">Scroll</span>
          <span className="relative mt-1 block h-7 w-[18px] rounded-full border border-navy-900/25">
            <span className="scroll-dot absolute left-1/2 top-1 block h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-teal-500" />
          </span>
        </a>
      </div>
    </section>
  );
}

export function WhatsAppGlyph() {
  return (
    <svg viewBox="0 0 32 32" width="13" height="13" fill="currentColor" aria-hidden>
      <path d="M16.04 2.003C8.36 2.003 2.12 8.2 2.12 15.84c0 2.44.64 4.82 1.86 6.92L2 30l7.44-1.95a13.86 13.86 0 0 0 6.6 1.68c7.68 0 13.92-6.2 13.92-13.84S23.72 2.003 16.04 2.003Zm0 25.36c-2.18 0-4.32-.58-6.18-1.7l-.44-.26-4.58 1.2 1.24-4.5-.3-.46a11.42 11.42 0 0 1-1.78-6.12c0-6.34 5.2-11.5 11.6-11.5s11.6 5.16 11.6 11.5c0 6.34-5.24 11.54-11.16 11.54v-.7.7Zm6.36-8.62c-.34-.18-2.06-1.02-2.38-1.14-.32-.12-.56-.18-.8.18-.22.36-.88 1.1-1.08 1.34-.2.22-.4.26-.74.08-.34-.18-1.46-.54-2.78-1.72-1.02-.92-1.72-2.06-1.92-2.4-.2-.36-.02-.54.16-.72.16-.16.34-.4.52-.6.18-.2.22-.36.34-.58.12-.24.06-.44-.02-.62-.1-.18-.8-1.94-1.1-2.66-.3-.7-.58-.6-.8-.62h-.68c-.22 0-.6.08-.92.4-.32.34-1.22 1.18-1.22 2.88s1.24 3.34 1.42 3.58c.18.22 2.44 3.74 5.94 5.24.84.36 1.48.58 1.98.74.84.26 1.6.22 2.2.14.68-.1 2.06-.84 2.36-1.66.28-.8.28-1.5.2-1.64-.1-.16-.34-.26-.7-.42Z" />
    </svg>
  );
}

// ------ Trust bar ------
export function TrustBar() {
  const items = [
    { label: 'Tally Certified', sub: '5-Star Partner', icon: 'award' },
    { label: 'ISO 9001:2015', sub: 'Quality Certified', icon: 'badge-check' },
    { label: 'GSTN Suvidha', sub: 'Provider', icon: 'file-check' },
    { label: 'MSME Registered', sub: 'Udyam Verified', icon: 'building-2' },
    { label: 'ICAI Approved', sub: 'Training Partner', icon: 'graduation-cap' },
  ];

  return (
    <section id="trust" aria-label="Certifications" className="relative border-y border-navy-900/8 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-12">
        <div className="mb-7 flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-navy-900/15"></span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-navy-900/55">
            Certified &amp; Accredited by
          </span>
          <span className="h-px w-10 bg-navy-900/15"></span>
        </div>

        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-5">
          {items.map((it, i) => (
            <Reveal
              as="li"
              delay={i * 90}
              key={it.label}
              className="group flex items-center gap-3 rounded-2xl border border-navy-900/8 bg-white px-4 py-4 btn-lift hover:border-teal-500/30 hover:shadow-card"
            >
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-navy-900 text-white transition-colors group-hover:bg-navy-800">
                <Icon name={it.icon} size={20} strokeWidth={1.8} />
              </span>
              <div className="min-w-0">
                <div className="truncate font-display text-[14.5px] font-bold leading-tight text-navy-900">
                  {it.label}
                </div>
                <div className="mt-0.5 truncate text-[11.5px] font-medium text-navy-900/55">
                  {it.sub}
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ------ Section eyebrow ------
export function Eyebrow({ children }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-navy-900/10 bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-navy-900/70 shadow-card">
      <span className="h-1.5 w-1.5 rounded-full bg-teal-500"></span>
      {children}
    </div>
  );
}

// ------ Pricing ------
const PRICING = [
  {
    id: 'silver',
    name: 'Silver',
    tagline: 'Single user · Small business',
    blurb: 'Everything a growing business needs to manage accounts, inventory and GST on a single computer.',
    price: 22500,
    licence: 'Perpetual licence',
    features: [
      'Single user · Single location',
      'Accounting, Inventory & GST',
      'e-Invoicing & e-Way Bill ready',
      'Bank reconciliation & MIS reports',
      '1 year TSS updates included',
      'Free on-site installation in city',
    ],
    popular: false,
    buyUrl: 'https://tallysolutions.com/buy-tally/',
    ctaLabel: 'Buy Now',
  },
  {
    id: 'gold',
    name: 'Gold',
    tagline: 'Unlimited users · Single location',
    blurb: 'For teams that work together. Unlimited users on one site, with multi-company and payroll built in.',
    price: 67500,
    licence: 'Perpetual licence',
    features: [
      'Unlimited users · One site',
      'Everything in Silver',
      'Multi-company & payroll',
      'Advanced security & audit trail',
      'Priority remote support',
      '1 year TSS + free migration',
    ],
    popular: true,
    buyUrl: 'https://tallysolutions.com/buy-tally/',
    ctaLabel: 'Buy Now',
  },
  {
    id: 'server',
    name: 'Server',
    tagline: 'Enterprise · Multi-branch',
    blurb: 'Run TallyPrime across branches and warehouses with centralised control and enterprise-grade uptime.',
    price: 270000,
    licence: 'Perpetual licence',
    features: [
      'Unlimited users · Multi-branch',
      'Centralised server deployment',
      'Remote & split-company sync',
      'Dedicated account manager',
      '24×7 SLA-backed support',
      'On-site training (2 sessions)',
    ],
    popular: false,
    buyUrl: '/contact',
    ctaLabel: 'Contact Us',
    ctaInternal: true,
  },
];

function formatINR(n) {
  return n.toLocaleString('en-IN');
}

function PriceCard({ plan }) {
  return (
    <div
      className={`group relative flex flex-col rounded-2xl border bg-white p-7 transition-all duration-300 sm:p-8
        ${plan.popular
          ? 'border-teal-500/50 shadow-card-lg lg:-mt-4 lg:mb-0 lg:scale-[1.03]'
          : 'border-navy-900/10 shadow-card hover:-translate-y-1 hover:border-teal-500/30 hover:shadow-card-lg'
        }`}
    >
      {plan.popular && (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-px -z-10 rounded-2xl opacity-70 blur-xl"
            style={{
              background:
                'radial-gradient(60% 60% at 50% 0%, rgba(20,184,166,0.28), transparent 70%)',
            }}
          />
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-navy-900 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white shadow-card">
              <Icon name="sparkles" size={12} className="text-amber-500" />
              Most Popular
            </span>
          </div>
        </>
      )}

      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex h-9 w-9 items-center justify-center rounded-lg ${
                plan.popular ? 'bg-navy-900 text-white' : 'bg-navy-50 text-navy-900'
              }`}
            >
              <Icon
                name={plan.id === 'silver' ? 'gem' : plan.id === 'gold' ? 'crown' : 'server'}
                size={17}
                strokeWidth={1.8}
              />
            </span>
            <h3 className="font-display text-[24px] font-bold text-navy-900">{plan.name}</h3>
          </div>
          <p className="mt-2 text-[12.5px] font-medium uppercase tracking-[0.12em] text-navy-900/55">
            {plan.tagline}
          </p>
        </div>
      </div>

      <p className="mt-4 text-[14px] leading-[1.55] text-navy-900/65">{plan.blurb}</p>

      <div className="mt-6 flex items-end gap-1.5">
        <span className="font-display text-[22px] font-semibold text-navy-900/70">₹</span>
        <span className="font-display text-[44px] font-bold leading-none tracking-tight text-navy-900 sm:text-[48px]">
          {formatINR(plan.price)}
        </span>
        <span className="mb-1 text-[13px] font-medium text-navy-900/55">+ GST</span>
      </div>
      <div className="mt-1 flex items-center gap-2 text-[12px] text-navy-900/55">
        <Icon name="infinity" size={13} className="text-teal-600" />
        {plan.licence}
        <span className="h-1 w-1 rounded-full bg-navy-900/20"></span>
        <span className="inline-flex items-center gap-1">
          <Icon name="credit-card" size={12} />
          EMI available
        </span>
      </div>

      <div className="my-6 h-px w-full bg-gradient-to-r from-transparent via-navy-900/10 to-transparent"></div>

      <ul className="flex flex-col gap-3">
        {plan.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2.5 text-[14px] text-navy-900/80">
            <span
              className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                plan.popular ? 'bg-teal-500 text-white' : 'bg-teal-50 text-teal-600'
              }`}
            >
              <Icon name="check" size={12} strokeWidth={3} />
            </span>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-col gap-2.5">
        {(() => {
          const cls = `btn-primary inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-[14.5px] font-semibold transition-all ${
            plan.popular
              ? 'bg-navy-900 text-white hover:bg-navy-800 hover:shadow-card-lg'
              : 'border border-navy-900/12 bg-white text-navy-900 hover:border-teal-500/40 hover:shadow-card'
          }`;
          const children = <>{plan.ctaLabel} <Icon name="arrow-right" size={15} strokeWidth={2.5} className="opacity-70 transition-transform group-hover:translate-x-0.5" /></>;
          return plan.ctaInternal
            ? <Link to={plan.buyUrl} className={cls}>{children}</Link>
            : <a href={plan.buyUrl} target="_blank" rel="noopener noreferrer" className={cls}>{children}</a>;
        })()}
        <a
          href="#contact"
          className="text-center text-[12.5px] font-medium text-navy-900/55 hover:text-navy-900"
        >
          or request a formal quote →
        </a>
      </div>
    </div>
  );
}

export function Pricing() {
  const waHelp = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    `Hi ${siteConfig.brand}, I'm not sure which TallyPrime edition suits my business. Can you help?`
  )}`;

  return (
    <section id="pricing" className="relative overflow-hidden bg-[#fafbfd] py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(700px 380px at 85% 0%, rgba(20,184,166,0.06), transparent 60%), radial-gradient(600px 320px at 10% 100%, rgba(245,158,11,0.05), transparent 60%)',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>Products &amp; Pricing</Eyebrow>
          <h2 className="mt-5 font-display text-[36px] font-bold leading-[1.1] text-navy-900 sm:text-[46px]">
            TallyPrime —{' '}
            <span className="relative inline-block">
              <span className="relative z-10 italic text-navy-800">choose</span>
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-1 -z-0 h-3 rounded-sm bg-amber-500/30 sm:h-3.5"
              />
            </span>{' '}
            your edition
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15.5px] leading-[1.6] text-navy-900/60 sm:text-[16.5px]">
            Transparent pricing with no hidden charges. GST included on invoice.
            <span className="text-navy-900/85"> EMI available</span> on all major cards.
          </p>

          <div className="mx-auto mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[12.5px] font-medium text-navy-900/65">
            <span className="inline-flex items-center gap-1.5">
              <Icon name="shield-check" size={14} className="text-teal-600" />
              Genuine Tally licence
            </span>
            <span className="h-1 w-1 rounded-full bg-navy-900/20"></span>
            <span className="inline-flex items-center gap-1.5">
              <Icon name="receipt" size={14} className="text-teal-600" />
              GST invoice &amp; input credit
            </span>
            <span className="h-1 w-1 rounded-full bg-navy-900/20"></span>
            <span className="inline-flex items-center gap-1.5">
              <Icon name="life-buoy" size={14} className="text-teal-600" />
              Lifetime installation support
            </span>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start lg:gap-7">
          {PRICING.map((p, i) => (
            <Reveal key={p.id} delay={i * 120}>
              <PriceCard plan={p} />
            </Reveal>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <a
            href={waHelp}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3 rounded-full border border-navy-900/10 bg-white px-5 py-3 text-[14px] font-medium text-navy-900/80 shadow-card transition-all hover:-translate-y-0.5 hover:border-teal-500/40 hover:text-navy-900 hover:shadow-card-lg"
          >
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-teal-500 text-white">
              <WhatsAppGlyph />
            </span>
            <span>
              Not sure which edition?{' '}
              <span className="font-semibold text-navy-900">Ask us on WhatsApp</span>
            </span>
            <Icon
              name="arrow-right"
              size={15}
              strokeWidth={2.5}
              className="text-navy-900/60 transition-transform group-hover:translate-x-0.5"
            />
          </a>
        </div>

        <p className="mt-5 text-center text-[11.5px] text-navy-900/45">
          Prices in INR. Taxes as applicable. Licences are issued directly by Tally Solutions Pvt. Ltd. under partner channel.
        </p>
      </div>
    </section>
  );
}

// ------ Services ------
const SERVICES = [
  { icon: 'settings', title: 'Implementation & Setup', desc: 'Company creation, chart of accounts, GST, opening balances — configured on-site and ready to use the same day.' },
  { icon: 'graduation-cap', title: 'Training', desc: 'Hands-on sessions for owners, accountants and staff — from basics to advanced reporting and GST workflows.' },
  { icon: 'code-2', title: 'Customization (TDL)', desc: 'Bespoke TDL add-ons for invoice formats, reports and integrations that fit the way your business actually runs.' },
  { icon: 'headphones', title: 'AMC & Support', desc: 'Annual maintenance plans with priority remote support, scheduled health checks and unlimited query resolution.' },
];

export function Services() {
  return (
    <section id="services" className="relative border-y border-navy-900/8 bg-navy-50/40 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-xl">
            <Eyebrow>Services</Eyebrow>
            <h2 className="mt-5 font-display text-[36px] font-bold leading-[1.1] text-navy-900 sm:text-[44px]">
              End-to-end{' '}
              <span className="relative inline-block">
                <span className="relative z-10 italic text-navy-800">Tally</span>
                <span aria-hidden className="absolute inset-x-0 bottom-1 -z-0 h-3 rounded-sm bg-teal-500/25 sm:h-3.5" />
              </span>{' '}
              solutions
            </h2>
          </div>
          <p className="max-w-sm text-[15px] leading-[1.6] text-navy-900/60">
            One team for licensing, deployment, customisation and everything after go-live — so you never have to chase multiple vendors.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => (
            <Reveal
              key={s.title}
              delay={i * 100}
              className="group relative flex flex-col rounded-2xl border border-navy-900/8 bg-white p-6 shadow-card btn-lift hover:border-teal-500/40 hover:shadow-card-lg"
            >
              <span className="absolute right-5 top-5 font-display text-[13px] font-semibold text-navy-900/25">
                0{i + 1}
              </span>
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-navy-900 text-white transition-colors group-hover:bg-teal-600">
                <Icon name={s.icon} size={22} strokeWidth={1.8} />
              </span>
              <h3 className="mt-5 font-display text-[20px] font-bold leading-tight text-navy-900">{s.title}</h3>
              <p className="mt-2 text-[14px] leading-[1.55] text-navy-900/65">{s.desc}</p>
              <div className="mt-5 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-teal-700 opacity-0 transition-opacity group-hover:opacity-100">
                Learn more
                <Icon name="arrow-right" size={13} strokeWidth={2.5} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ------ About ------
const ABOUT_BADGES = [
  { label: 'Tally 5-Star Partner', icon: 'award' },
  { label: 'ISO 9001:2015', icon: 'badge-check' },
  { label: 'GSTN Suvidha', icon: 'file-check' },
  { label: 'MSME · Udyam', icon: 'building-2' },
];

export function About() {
  const numbers = [
    { v: '500+', k: 'Businesses served' },
    { v: '15+',  k: 'Years in business' },
    { v: '120+', k: 'TDL customisations' },
    { v: '4.8★', k: 'Avg. client rating' },
  ];

  return (
    <section id="about" className="relative bg-white py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <Reveal as="div">
          <Eyebrow>About us</Eyebrow>
          <h2 className="mt-5 font-display text-[36px] font-bold leading-[1.1] text-navy-900 sm:text-[46px]">
            <span className="text-teal-600">15+ years</span> of empowering{' '}
            <span className="italic text-navy-800">businesses</span>
          </h2>

          <div className="mt-6 space-y-4 text-[15.5px] leading-[1.7] text-navy-900/70" id="about-body">
            <p>
              TallyHub began in 2010 as a two-person consultancy with one goal:
              make enterprise-grade accounting software feel friendly to every
              Indian business — from single-shop traders to multi-branch
              manufacturers. Fifteen years on, that goal hasn't changed.
            </p>
            <p>
              Today we're a team of certified implementers, TDL developers and
              chartered accountants serving 500+ clients across retail,
              manufacturing, trading, logistics and services. We sell genuine
              licences, but what we really deliver is the confidence of knowing
              your books, compliance and reports are always in order.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {ABOUT_BADGES.map((b, i) => (
              <Reveal
                as="div"
                delay={i * 90}
                key={b.label}
                className="flex flex-col items-start gap-2 rounded-2xl border border-navy-900/8 bg-navy-50/50 p-3.5"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white text-teal-600 shadow-card">
                  <Icon name={b.icon} size={16} strokeWidth={2} />
                </span>
                <span className="text-[12px] font-semibold leading-tight text-navy-900">{b.label}</span>
              </Reveal>
            ))}
          </div>
        </Reveal>

        <Reveal as="div" delay={120} className="relative">
          <div
            aria-hidden
            className="absolute -inset-6 -z-10 rounded-[32px] opacity-60 blur-2xl"
            style={{
              background:
                'radial-gradient(50% 50% at 30% 20%, rgba(20,184,166,0.25), transparent 70%), radial-gradient(50% 50% at 80% 90%, rgba(245,158,11,0.18), transparent 70%)',
            }}
          />

          <div
            className="relative overflow-hidden rounded-3xl p-8 text-white shadow-card-lg sm:p-10"
            style={{
              background:
                'linear-gradient(135deg, #0B1D3A 0%, #122a52 55%, #0f3b55 100%)',
            }}
          >
            <svg
              className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 text-white/10"
              viewBox="0 0 200 200" fill="none" aria-hidden
            >
              <circle cx="100" cy="100" r="90" stroke="currentColor" />
              <circle cx="100" cy="100" r="64" stroke="currentColor" />
              <circle cx="100" cy="100" r="38" stroke="currentColor" />
            </svg>
            <svg
              className="pointer-events-none absolute -bottom-12 -left-8 h-56 w-56 text-teal-500/15"
              viewBox="0 0 200 200" fill="none" aria-hidden
            >
              <rect x="10" y="10" width="180" height="180" rx="32" stroke="currentColor" />
              <rect x="40" y="40" width="120" height="120" rx="22" stroke="currentColor" />
            </svg>

            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                By the numbers
              </div>
              <h3 className="mt-4 font-display text-[26px] font-semibold leading-tight sm:text-[30px]">
                Numbers that our clients <span className="italic text-teal-300">keep adding to.</span>
              </h3>

              <div className="mt-7 grid grid-cols-2 gap-6">
                {numbers.map((n) => (
                  <div key={n.k} className="border-t border-white/15 pt-4">
                    <div className="font-display text-[40px] font-bold leading-none tracking-tight sm:text-[46px]">
                      {n.v}
                    </div>
                    <div className="mt-2 text-[13px] font-medium text-white/70">{n.k}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex items-center gap-3 border-t border-white/15 pt-5 text-[12.5px] text-white/70">
                <Icon name="quote" size={16} className="text-teal-300" />
                Trusted by retailers, CAs, factories and enterprises across India.
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ------ Testimonials ------
const TESTIMONIALS = [
  { name: 'Rajesh Agarwal', role: 'Owner · Agarwal Steel Trading', quote: 'TallyHub migrated our 12-year data from an old version without losing a single voucher. Their TDL tweaks cut our monthly GST reconciliation from 2 days to 3 hours.', tone: 'teal' },
  { name: 'Priya Iyer', role: 'Chartered Accountant · Iyer & Associates', quote: 'As a CA firm, we recommend TallyHub to every client who needs a real partner — not a reseller. The support team actually picks up the phone, even at month-end.', tone: 'amber' },
  { name: 'Vikram Mehta', role: 'Director · Mehta Textiles Pvt. Ltd.', quote: 'Running four branches on a single server used to be chaos. TallyHub deployed Server edition in a weekend and trained our staff. Month-end closing is finally painless.', tone: 'teal' },
];

function initials(name) {
  return name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase();
}

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative overflow-hidden py-20 text-white sm:py-28"
      style={{
        background:
          'radial-gradient(1000px 500px at 85% 0%, rgba(20,184,166,0.14), transparent 60%), radial-gradient(800px 400px at 10% 100%, rgba(245,158,11,0.10), transparent 60%), linear-gradient(180deg, #0B1D3A 0%, #060f22 100%)',
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse at 50% 30%, black 20%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 30%, black 20%, transparent 75%)',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-400"></span>
            Testimonials
          </div>
          <h2 className="mt-5 font-display text-[36px] font-bold leading-[1.1] sm:text-[46px]">
            Words from{' '}
            <span className="italic text-teal-300">the businesses</span>
            <br className="hidden sm:block" /> we serve every day
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15.5px] leading-[1.6] text-white/65">
            From a shopfront in Karol Bagh to a four-branch mill in Coimbatore — real teams, real results.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal
              as="figure"
              delay={i * 120}
              key={t.name}
              className="group relative flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm btn-lift hover:border-teal-400/40 hover:bg-white/[0.06] hover:shadow-[0_0_0_1px_rgba(20,184,166,0.25),0_24px_48px_-12px_rgba(20,184,166,0.25)]"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    'radial-gradient(60% 60% at 50% 0%, rgba(20,184,166,0.12), transparent 70%)',
                }}
              />
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-0.5 text-amber-400">
                  {[...Array(5)].map((_, k) => (
                    <Icon key={k} name="star" size={14} strokeWidth={2} className="fill-current" />
                  ))}
                </div>
                <Icon name="quote" size={22} className="text-teal-300/60" />
              </div>
              <blockquote className="relative mt-5 font-display text-[18px] italic leading-[1.55] text-white/90 sm:text-[19px]">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="relative mt-7 flex items-center gap-3 border-t border-white/10 pt-5">
                <span
                  role="img"
                  aria-label={`Avatar for ${t.name}`}
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-full font-display text-[15px] font-bold text-white ring-2 ring-white/10 ${
                    t.tone === 'amber'
                      ? 'bg-gradient-to-br from-amber-500 to-amber-600'
                      : 'bg-gradient-to-br from-teal-500 to-teal-700'
                  }`}
                >
                  {initials(t.name)}
                </span>
                <div className="min-w-0">
                  <div className="truncate text-[14.5px] font-semibold text-white">{t.name}</div>
                  <div className="truncate text-[12.5px] text-white/60">{t.role}</div>
                </div>
              </figcaption>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12.5px] text-white/60">
          <span className="inline-flex items-center gap-1.5">
            <Icon name="star" size={13} className="fill-current text-amber-400" />
            4.8 average on 420+ verified reviews
          </span>
          <span className="h-1 w-1 rounded-full bg-white/25"></span>
          <span className="inline-flex items-center gap-1.5">
            <Icon name="users" size={13} className="text-teal-300" />
            500+ active clients across India
          </span>
        </div>
      </div>
    </section>
  );
}

// ------ FAQ ------
const FAQS = [
  { q: 'What\u2019s the real difference between Silver and Gold editions?', a: "Silver is a single-user licence \u2014 one person can use TallyPrime on one computer at a time. Gold is a multi-user licence \u2014 unlimited users on the same local network can use it simultaneously. If more than one person will post entries or view reports at the same time, you need Gold." },
  { q: 'What does TallyPrime cost in 2026?', a: 'Our current list prices (plus GST) are \u20b922,500 for Silver (single user), \u20b967,500 for Gold (unlimited users, single site) and \u20b92,70,000 for Server edition. All are perpetual licences \u2014 you own them forever. The first year of TSS (updates + online features) is included.' },
  { q: 'What is TSS and do I need to renew it?', a: 'TSS (Tally Software Services) is the annual subscription that keeps your software eligible for product updates, statutory changes (GST, TDS, e-invoicing), remote access, WhatsApp sharing and online support. Renewal isn\u2019t compulsory, but without an active TSS your TallyPrime won\u2019t receive the latest compliance changes released by Tally Solutions.' },
  { q: 'I\u2019m on an old Tally.ERP 9 licence. How do I upgrade to TallyPrime?', a: 'If your TSS is active, the upgrade is free \u2014 we install TallyPrime, migrate your data and verify every master and report. If TSS has lapsed, you pay a small reactivation fee based on how long it\u2019s been expired. Our team handles the full migration on-site or remotely, usually within the same day.' },
  { q: 'Are EMI or instalment options available?', a: 'Yes. You can convert the purchase into no-cost EMI on most major credit cards (HDFC, ICICI, Axis, SBI, Kotak) for 3, 6, 9 or 12 months. For larger deployments like Server edition, we also offer partner-financed instalment plans \u2014 ask us for details on WhatsApp.' },
  { q: 'Can I install the same licence on two computers?', a: 'A Silver licence works on only one computer at a time. If you need TallyPrime on a second machine for the same person (say, a laptop at home), you can activate it there \u2014 just not simultaneously. For genuine multi-user access (team members working together) you\u2019ll want Gold or Server edition.' },
  { q: 'Do you provide on-site support in my city?', a: 'We provide on-site support across our service regions and remote support everywhere in India. Most day-to-day queries are resolved within 30 minutes over phone, AnyDesk or WhatsApp. Critical issues (month-end, statutory deadlines) are prioritised and a specialist is despatched on-site the same working day where available.' },
  { q: 'Is my data safe? Who has access to it?', a: "Your Tally data lives on your own computer or server \u2014 never on ours. When we connect remotely for support, it\u2019s only with your consent via a one-time AnyDesk / TeamViewer ID that you share. We sign an NDA on request, and our team follows the ISO 9001 process for any data handling during migrations or backups." },
];

function FaqItem({ item, isOpen, onToggle, index }) {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    if (contentRef.current) setHeight(contentRef.current.scrollHeight);
  }, [isOpen]);

  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-button-${index}`;

  return (
    <div
      className={`rounded-2xl border bg-white transition-colors ${
        isOpen ? 'border-teal-500/40 shadow-card' : 'border-navy-900/10'
      }`}
    >
      <button
        id={buttonId}
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="flex w-full items-center gap-4 rounded-2xl px-5 py-5 text-left sm:px-6"
      >
        <span
          className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-display text-[12px] font-bold ${
            isOpen ? 'bg-navy-900 text-white' : 'bg-navy-50 text-navy-900/70'
          }`}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="flex-1 font-display text-[16.5px] font-semibold leading-snug text-navy-900 sm:text-[17.5px]">
          {item.q}
        </span>
        <span
          className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all ${
            isOpen
              ? 'rotate-180 border-teal-500 bg-teal-500 text-white'
              : 'border-navy-900/15 bg-white text-navy-900/70'
          }`}
          aria-hidden
        >
          <Icon name="chevron-down" size={15} strokeWidth={2.5} />
        </span>
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        style={{ maxHeight: isOpen ? height + 32 : 0 }}
        className="overflow-hidden transition-[max-height] duration-400 ease-out"
      >
        <div ref={contentRef} className="px-5 pb-6 pl-[68px] pr-6 text-[14.5px] leading-[1.65] text-navy-900/70 sm:px-6 sm:pl-[76px]">
          {item.a}
        </div>
      </div>
    </div>
  );
}

export function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="relative bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <Reveal className="text-center">
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="mt-5 font-display text-[34px] font-bold leading-[1.1] text-navy-900 sm:text-[44px]">
            Frequently asked{' '}
            <span className="relative inline-block">
              <span className="relative z-10 italic text-navy-800">questions</span>
              <span aria-hidden className="absolute inset-x-0 bottom-1 -z-0 h-3 rounded-sm bg-teal-500/25" />
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-[1.6] text-navy-900/60">
            Short, honest answers. If your question isn't here, just WhatsApp us &mdash; we reply within minutes.
          </p>
        </Reveal>

        <div className="mt-12 flex flex-col gap-3">
          {FAQS.map((f, i) => (
            <Reveal key={i} delay={i * 60}>
              <FaqItem
                index={i}
                item={f}
                isOpen={open === i}
                onToggle={() => setOpen(open === i ? -1 : i)}
              />
            </Reveal>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href={waLink("I have a question that isn't in your FAQ \u2014 can you help?")}
            target="_blank"
            rel="noreferrer"
            className="btn-lift inline-flex items-center gap-2 rounded-full border border-navy-900/10 bg-white px-5 py-3 text-[14px] font-medium text-navy-900/80 shadow-card hover:border-teal-500/40 hover:text-navy-900"
          >
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-teal-500 text-white">
              <WhatsAppGlyph />
            </span>
            Still have questions? <span className="font-semibold text-navy-900">Ask on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}

// ------ Contact ------
export function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const clearError = (field) => setErrors((prev) => ({ ...prev, [field]: undefined }));

  const onSubmit = (e) => {
    e.preventDefault();
    if (loading) return;
    const errs = {};
    if (!form.name.trim()) errs.name = 'Please enter your name';
    if (!isValidPhone(form.phone)) errs.phone = 'Please enter a valid 10-digit phone number';
    if (!isValidEmail(form.email)) errs.email = 'Please enter a valid email address';
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1000);
  };

  const info = [
    { icon: 'map-pin', title: 'Office Address', lines: [siteConfig.address.line1, siteConfig.address.line2, siteConfig.address.region] },
    { icon: 'phone', title: 'Talk to Us', lines: [`Sales · ${siteConfig.phones.sales}`, `Support · ${siteConfig.phones.support}`] },
    { icon: 'mail', title: 'Email', lines: [siteConfig.emails.sales, siteConfig.emails.support] },
    { icon: 'clock', title: 'Business Hours', lines: [siteConfig.hours, 'Sunday · closed (emergency support on call)'] },
  ];

  return (
    <section id="contact" className="relative bg-navy-50/50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>Contact</Eyebrow>
          <h2 className="mt-5 font-display text-[34px] font-bold leading-[1.1] text-navy-900 sm:text-[44px]">
            Let's{' '}
            <span className="relative inline-block">
              <span className="relative z-10 italic text-navy-800">talk</span>
              <span aria-hidden className="absolute inset-x-0 bottom-1 -z-0 h-3 rounded-sm bg-amber-500/30" />
            </span>{' '}
            about your business
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-[1.6] text-navy-900/60">
            Walk into our office, send us a message, or request a callback. We respond within one business hour.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
          <Reveal as="div">
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {info.map((it) => (
                <li key={it.title} className="rounded-2xl border border-navy-900/8 bg-white p-5 shadow-card">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-navy-900 text-white">
                    <Icon name={it.icon} size={17} strokeWidth={1.8} />
                  </span>
                  <h3 className="mt-4 font-display text-[16px] font-bold text-navy-900">{it.title}</h3>
                  <div className="mt-1.5 space-y-0.5 text-[13.5px] leading-[1.55] text-navy-900/65">
                    {it.lines.map((ln, i) => <div key={i}>{ln}</div>)}
                  </div>
                </li>
              ))}
            </ul>

            <div
              role="img"
              aria-label="Map location placeholder"
              className="relative mt-4 h-56 overflow-hidden rounded-2xl border border-navy-900/8 shadow-card"
              style={{
                background: 'linear-gradient(135deg, #e7edf6 0%, #dbe4f0 50%, #cdd9ea 100%)',
              }}
            >
              <svg className="absolute inset-0 h-full w-full text-navy-900/12" viewBox="0 0 400 224" fill="none" aria-hidden>
                <path d="M-10 60 L180 110 L260 40 L420 90" stroke="currentColor" strokeWidth="2" />
                <path d="M-10 140 L120 170 L230 130 L330 180 L420 150" stroke="currentColor" strokeWidth="2" />
                <path d="M60 -10 L80 80 L130 130 L100 234" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
                <path d="M300 -10 L270 70 L310 160 L260 234" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
              </svg>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-teal-600 shadow-card-lg">
                  <Icon name="map-pin" size={22} strokeWidth={2} />
                </span>
                <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/85 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-900/60 backdrop-blur">
                  Google Maps embed
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal as="div" delay={120}>
            <div className="rounded-2xl border border-navy-900/8 bg-white p-6 shadow-card-lg sm:p-8">
              {sent ? (
                <div className="py-6 text-center">
                  <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-teal-50 text-teal-600">
                    <Icon name="check" size={28} strokeWidth={2.5} />
                  </div>
                  <h4 className="font-display text-[22px] font-bold text-navy-900">Message received</h4>
                  <p className="mt-1.5 text-[14px] text-navy-900/65">
                    Thanks, {form.name.split(' ')[0]}. We'll reply to <span className="font-semibold text-navy-900">{form.email}</span> within one business hour.
                  </p>
                  <button
                    onClick={() => { setSent(false); setForm({ name:'', phone:'', email:'', subject:'', message:'' }); }}
                    className="mt-5 text-[13px] font-semibold text-teal-700 hover:text-teal-600"
                  >
                    Send another message →
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit}>
                  <h3 className="font-display text-[22px] font-bold text-navy-900">Send us a message</h3>
                  <p className="mt-1 text-[13.5px] text-navy-900/60">
                    We respond within one business hour, Mon&ndash;Sat.
                  </p>

                  <div className="mt-5 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                    <Field label="Your name" icon="user" placeholder="e.g. Priya Sharma"
                      autoComplete="name" required
                      value={form.name} onChange={(v) => { clearError('name'); setForm((f) => ({ ...f, name: v })); }}
                      error={errors.name} />
                    <Field label="Phone" icon="phone" type="tel" autoComplete="tel" required
                      prefix="+91" placeholder="90000 00000" inputMode="numeric"
                      value={form.phone} onChange={(v) => { clearError('phone'); setForm((f) => ({ ...f, phone: v.replace(/[^0-9\s]/g, '') })); }}
                      error={errors.phone} />
                  </div>
                  <div className="mt-3.5">
                    <Field label="Email" icon="mail" type="email" autoComplete="email" required
                      placeholder="you@company.com"
                      value={form.email} onChange={(v) => { clearError('email'); setForm((f) => ({ ...f, email: v })); }}
                      error={errors.email} />
                  </div>
                  <div className="mt-3.5">
                    <SelectField
                      label="Subject" icon="tag"
                      placeholder="Choose a subject"
                      value={form.subject}
                      onChange={(v) => setForm((f) => ({ ...f, subject: v }))}
                      options={['General enquiry','Buy TallyPrime licence','TSS renewal','Customisation / TDL','AMC & support','Training','Partnership']}
                    />
                  </div>
                  <div className="mt-3.5">
                    <label className="block">
                      <span className="mb-1.5 block text-[12px] font-semibold text-navy-900/70">Message</span>
                      <div className="rounded-xl border border-navy-900/12 bg-navy-50/30 px-3.5 py-3 transition-colors focus-within:border-teal-500 focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(20,184,166,0.14)]">
                        <textarea
                          rows={4}
                          value={form.message}
                          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                          placeholder="Tell us a bit about your business and what you're looking for…"
                          className="w-full resize-none bg-transparent text-[14.5px] text-navy-900 placeholder:text-navy-900/35 focus:outline-none"
                        />
                      </div>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary btn-lift mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-navy-900 px-5 py-3.5 text-[15px] font-semibold text-white hover:bg-navy-800 hover:shadow-card-lg disabled:cursor-wait disabled:opacity-80"
                  >
                    {loading ? (<><span className="spinner" aria-hidden />Sending…</>) : (<>Send message <Icon name="send" size={16} strokeWidth={2.5} /></>)}
                  </button>

                  <p className="mt-3 text-center text-[11.5px] text-navy-900/50">
                    By submitting, you agree to our privacy policy. We never share your details.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ------ Floating WhatsApp ------
export function FloatingWhatsApp() {
  const [showTip, setShowTip] = useState(false);
  useEffect(() => {
    const t1 = setTimeout(() => setShowTip(true), 1800);
    const t2 = setTimeout(() => setShowTip(false), 6800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-[80] flex items-end gap-3 sm:bottom-7 sm:right-7">
      <div
        className={`relative pointer-events-none mb-2 origin-bottom-right rounded-2xl bg-white px-4 py-3 text-[13px] font-medium text-navy-900 shadow-card-lg transition-all duration-300 ${
          showTip ? 'opacity-100 translate-y-0' : 'translate-y-2 opacity-0'
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-teal-500 text-white">
            <WhatsAppGlyph />
          </span>
          Chat with us on WhatsApp!
        </div>
        <div className="absolute -bottom-1.5 right-6 h-3 w-3 rotate-45 bg-white"></div>
      </div>

      <a
        href={waLink("Hi! I'd like to chat about TallyPrime.")}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        onMouseEnter={() => setShowTip(true)}
        onFocus={() => setShowTip(true)}
        className="relative inline-flex h-14 w-14 items-center justify-center rounded-full text-white shadow-card-lg transition-transform hover:scale-105"
        style={{ background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)' }}
      >
        <span className="pointer-events-none absolute inset-0 rounded-full" style={{ boxShadow: '0 0 0 0 rgba(37,211,102,0.6)', animation: 'waPulse 2s ease-out infinite' }} aria-hidden />
        <svg viewBox="0 0 32 32" width="26" height="26" fill="currentColor" aria-hidden>
          <path d="M16.04 2.003C8.36 2.003 2.12 8.2 2.12 15.84c0 2.44.64 4.82 1.86 6.92L2 30l7.44-1.95a13.86 13.86 0 0 0 6.6 1.68c7.68 0 13.92-6.2 13.92-13.84S23.72 2.003 16.04 2.003Zm0 25.36c-2.18 0-4.32-.58-6.18-1.7l-.44-.26-4.58 1.2 1.24-4.5-.3-.46a11.42 11.42 0 0 1-1.78-6.12c0-6.34 5.2-11.5 11.6-11.5s11.6 5.16 11.6 11.5c0 6.34-5.24 11.54-11.16 11.54v-.7.7Zm6.36-8.62c-.34-.18-2.06-1.02-2.38-1.14-.32-.12-.56-.18-.8.18-.22.36-.88 1.1-1.08 1.34-.2.22-.4.26-.74.08-.34-.18-1.46-.54-2.78-1.72-1.02-.92-1.72-2.06-1.92-2.4-.2-.36-.02-.54.16-.72.16-.16.34-.4.52-.6.18-.2.22-.36.34-.58.12-.24.06-.44-.02-.62-.1-.18-.8-1.94-1.1-2.66-.3-.7-.58-.6-.8-.62h-.68c-.22 0-.6.08-.92.4-.32.34-1.22 1.18-1.22 2.88s1.24 3.34 1.42 3.58c.18.22 2.44 3.74 5.94 5.24.84.36 1.48.58 1.98.74.84.26 1.6.22 2.2.14.68-.1 2.06-.84 2.36-1.66.28-.8.28-1.5.2-1.64-.1-.16-.34-.26-.7-.42Z" />
        </svg>
      </a>
    </div>
  );
}

// ------ HomeSections ------
export function HomeSections() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Pricing />
      <Services />
      <About />
      <Testimonials />
      <FAQ />
      <Contact />
    </>
  );
}
