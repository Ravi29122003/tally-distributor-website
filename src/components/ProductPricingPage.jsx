import { Link } from 'react-router-dom';
import { Icon, Reveal } from '../app';

/**
 * Product data shape (populated in Wave 2B):
 * {
 *   slug: string,
 *   eyebrow: string,              // e.g. "Products · Silver"
 *   title: string,                // e.g. "TallyPrime Silver"
 *   tagline: string,              // e.g. "For businesses that need TallyPrime on a single PC"
 *   description: string,          // 2-3 sentence positioning
 *   pricingTiers: [               // 1-4 pricing cards (Server has 1, others have up to 4)
 *     {
 *       label: string,            // e.g. "1 Month", "Lifetime", "Enterprise"
 *       price?: number,           // e.g. 750, 22500 — ignored if priceLabel or contactForPricing is set
 *       priceLabel?: string,      // overrides ₹-formatted price, e.g. "Included", "Custom"
 *       contactForPricing?: bool, // if true, shows "Contact for pricing" and CTA becomes "Get a Quote" → /contact
 *       originalPrice?: number,   // strikethrough price if discounted
 *       discount?: string,        // e.g. "Get 5% off"
 *       effectiveMonthly?: string,// e.g. "Effective price 712.5/Month"
 *       highlights: string[],     // e.g. ["Affordable Plan", "Free expert assistance"]
 *       ctaUrl: string,           // external buy link
 *       ctaLabel?: string,        // default "Buy Now"
 *     }
 *   ],
 *   features: string[],           // shared "What you get" list
 *   notes?: string[],             // optional fine-print (e.g. "+18% GST")
 *   finalCta?: {                  // optional — override the "Ready to get started?" bottom strip
 *     heading?: string,
 *     body?: string,
 *     primaryLabel?: string,
 *     primaryUrl?: string,        // / for internal Link, https:// for external
 *     secondaryLabel?: string,
 *     secondaryUrl?: string,
 *     showSecondary?: boolean,    // default: true when the first pricing tier has an external ctaUrl
 *   },
 * }
 */

function formatPrice(n) {
  return new Intl.NumberFormat('en-IN').format(n);
}

function PricingCard({ tier }) {
  const ctaClassName =
    'btn-lift inline-flex w-full items-center justify-center gap-2 rounded-xl bg-orange-600 px-4 py-3 text-[14.5px] font-semibold text-white shadow-card hover:bg-orange-700';
  const isContactForPricing = tier.contactForPricing === true;
  const ctaLabel = isContactForPricing ? (tier.ctaLabel || 'Get a Quote') : (tier.ctaLabel || 'Buy Now');
  const effectiveCtaUrl = isContactForPricing ? (tier.ctaUrl || '/contact') : tier.ctaUrl;
  const isInternal = effectiveCtaUrl?.startsWith('/');

  return (
    <div className="relative flex h-full flex-col rounded-2xl border border-navy-900/8 bg-white p-5 shadow-card sm:p-6">
      {tier.discount && (
        <span className="absolute -top-2 right-4 inline-flex items-center rounded-full bg-teal-500 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white shadow-card">
          {tier.discount}
        </span>
      )}

      <div className="text-[13px] font-semibold uppercase tracking-[0.16em] text-navy-900/60">
        {tier.label}
      </div>

      <div className="mt-4 flex items-baseline gap-2">
        <span className={`font-display font-bold text-navy-900 ${isContactForPricing ? 'text-[26px] leading-snug sm:text-[28px]' : 'text-[40px] leading-none sm:text-[42px]'}`}>
          {isContactForPricing
            ? 'Contact for pricing'
            : tier.priceLabel
              ? tier.priceLabel
              : `₹${formatPrice(tier.price)}`}
        </span>
      </div>
      {!tier.priceLabel && !isContactForPricing && (
        <div className="mt-1 text-[12.5px] text-navy-900/55">+18% GST</div>
      )}

      {tier.originalPrice && (
        <div className="mt-2 text-[13px] text-navy-900/50 line-through">
          ₹{formatPrice(tier.originalPrice)}
        </div>
      )}

      {tier.effectiveMonthly && (
        <div className="mt-2 text-[13px] font-semibold text-navy-900">
          {tier.effectiveMonthly}
        </div>
      )}

      {tier.highlights?.length > 0 && (
        <ul className="mt-5 space-y-2.5">
          {tier.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2.5 text-[14px] leading-[1.55] text-navy-900/75">
              <span className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-teal-50 text-teal-600">
                <Icon name="check" size={13} strokeWidth={2.5} />
              </span>
              <span>{h}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-auto pt-6">
        {isInternal ? (
          <Link to={effectiveCtaUrl} className={ctaClassName}>
            {ctaLabel}
            <Icon name="arrow-right" size={15} />
          </Link>
        ) : (
          <a
            href={effectiveCtaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={ctaClassName}
          >
            {ctaLabel}
            <Icon name="arrow-right" size={15} />
          </a>
        )}
      </div>
    </div>
  );
}

const getGridClass = (count) => {
  if (count === 1) return 'mx-auto mt-10 max-w-md';
  if (count === 2) return 'mt-10 grid gap-6 sm:grid-cols-2 mx-auto max-w-3xl';
  if (count === 3) return 'mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3';
  return 'mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4';
};

export default function ProductPricingPage({ product }) {
  if (!product || !product.title) return null;

  const tiers = product.pricingTiers || [];
  const primaryCtaUrl = tiers[0]?.ctaUrl;

  const defaultFinal = {
    heading: 'Ready to get started?',
    body: 'Talk to us about the right edition for your business, or head straight to Tally.com to buy.',
    primaryLabel: 'Contact us',
    primaryUrl: '/contact',
    secondaryLabel: 'Buy on Tally.com',
    secondaryUrl: primaryCtaUrl,
    showSecondary: !!primaryCtaUrl,
  };
  const finalCta = { ...defaultFinal, ...(product.finalCta || {}) };
  const primaryIsInternal = finalCta.primaryUrl?.startsWith('/');
  const secondaryIsInternal = finalCta.secondaryUrl?.startsWith('/');

  return (
    <>
      {/* Hero */}
      <section className="hero-bg hero-grid relative overflow-hidden pt-[128px] pb-16 sm:pt-[148px] sm:pb-20">
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-navy-900/10 bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-navy-900/70 shadow-card">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
              {product.eyebrow}
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="font-display mt-5 max-w-3xl text-[44px] font-bold leading-[1.05] text-navy-900 sm:text-[60px]">
              {product.title}
            </h1>
          </Reveal>
          {product.tagline && (
            <Reveal delay={120}>
              <p className="mt-4 max-w-2xl text-[17px] font-semibold leading-[1.5] text-teal-700 sm:text-[19px]">
                {product.tagline}
              </p>
            </Reveal>
          )}
          {product.description && (
            <Reveal delay={160}>
              <p className="mt-5 max-w-2xl text-[16px] leading-[1.65] text-navy-900/65 sm:text-[17px]">
                {product.description}
              </p>
            </Reveal>
          )}
        </div>
      </section>

      {/* Pricing */}
      {tiers.length > 0 && (
        <section className="border-t border-navy-900/8 bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <Reveal>
              <h2 className="font-display max-w-3xl text-[28px] font-bold leading-[1.2] text-navy-900 sm:text-[36px]">
                {product.tagline}
              </h2>
            </Reveal>

            <div className={getGridClass(tiers.length)}>
              {tiers.map((tier, i) => (
                <Reveal key={`${tier.label}-${i}`} delay={i * 60} className="h-full">
                  <PricingCard tier={tier} />
                </Reveal>
              ))}
            </div>

            {product.notes?.length > 0 && (
              <div className="mt-8 space-y-1.5 text-[13px] text-navy-900/55">
                {product.notes.map((n) => (
                  <p key={n}>{n}</p>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* What you get */}
      {product.features?.length > 0 && (
        <section className="border-t border-navy-900/8 bg-navy-50/40 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <Reveal>
              <h2 className="font-display max-w-3xl text-[28px] font-bold leading-[1.2] text-navy-900 sm:text-[36px]">
                What you get with {product.title}
              </h2>
            </Reveal>

            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {product.features.map((f, i) => (
                <Reveal key={f} delay={i * 40}>
                  <li className="flex items-start gap-3 rounded-2xl border border-navy-900/8 bg-white p-4 shadow-card">
                    <span className="mt-0.5 inline-flex h-7 w-7 flex-none items-center justify-center rounded-lg bg-green-50 text-green-600">
                      <Icon name="check" size={15} strokeWidth={2.5} />
                    </span>
                    <span className="text-[14.5px] leading-[1.55] text-navy-900/80">{f}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Final CTA strip */}
      <section className="border-t border-navy-900/8 bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="rounded-3xl border border-navy-900/10 bg-navy-50/60 p-8 text-center shadow-card sm:p-12">
            <h2 className="font-display text-[28px] font-bold leading-[1.2] text-navy-900 sm:text-[34px]">
              {finalCta.heading}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-[15.5px] leading-[1.6] text-navy-900/65">
              {finalCta.body}
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              {primaryIsInternal ? (
                <Link
                  to={finalCta.primaryUrl}
                  className="btn-lift btn-primary inline-flex items-center gap-2 rounded-full bg-navy-900 px-5 py-3 text-[14.5px] font-semibold text-white shadow-card"
                >
                  {finalCta.primaryLabel} <Icon name="arrow-right" size={15} />
                </Link>
              ) : (
                <a
                  href={finalCta.primaryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-lift btn-primary inline-flex items-center gap-2 rounded-full bg-navy-900 px-5 py-3 text-[14.5px] font-semibold text-white shadow-card"
                >
                  {finalCta.primaryLabel} <Icon name="arrow-right" size={15} />
                </a>
              )}
              {finalCta.showSecondary && finalCta.secondaryUrl && (
                secondaryIsInternal ? (
                  <Link
                    to={finalCta.secondaryUrl}
                    className="btn-lift inline-flex items-center gap-2 rounded-full bg-orange-600 px-5 py-3 text-[14.5px] font-semibold text-white shadow-card hover:bg-orange-700"
                  >
                    {finalCta.secondaryLabel} <Icon name="arrow-right" size={15} />
                  </Link>
                ) : (
                  <a
                    href={finalCta.secondaryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-lift inline-flex items-center gap-2 rounded-full bg-orange-600 px-5 py-3 text-[14.5px] font-semibold text-white shadow-card hover:bg-orange-700"
                  >
                    {finalCta.secondaryLabel} <Icon name="arrow-right" size={15} />
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
