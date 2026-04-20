// src/data/products.js
// Single source of truth for all product sub-page content.
// Updated from research doc (TallyPrime 7.0, released Dec 2025).

const TALLY_BUY_URL = 'https://tallysolutions.com/buy-tally/';

export const productsData = {
  silver: {
    slug: 'silver',
    eyebrow: 'Products · Silver',
    title: 'TallyPrime Silver',
    tagline: 'For businesses that need TallyPrime on a single PC',
    description: 'The single-user edition of TallyPrime — perfect for proprietors, freelancers, and small offices where only one person runs Tally at a time. Ships with Release 7.0 including SmartFind, Auto Backup, and PrimeBanking Payments.',
    pricingTiers: [
      {
        label: '1 Month',
        price: 750,
        highlights: ['Affordable plan', 'Free expert assistance', 'Includes TSS', 'Switch to lifetime anytime'],
        ctaUrl: TALLY_BUY_URL,
      },
      {
        label: '3 Month',
        price: 2138,
        originalPrice: 2250,
        discount: 'Get 5% off',
        effectiveMonthly: 'Effective ₹712.5/month',
        highlights: ['Budget friendly · Flat 5% off', 'Free expert assistance', 'Includes TSS', 'Switch to lifetime anytime'],
        ctaUrl: TALLY_BUY_URL,
      },
      {
        label: '12 Month',
        price: 8100,
        originalPrice: 9000,
        discount: 'Get 10% off',
        effectiveMonthly: 'Effective ₹675/month',
        highlights: ['Popular plan · Flat 10% off', 'Free expert assistance', 'Includes TSS', 'Switch to lifetime anytime'],
        ctaUrl: TALLY_BUY_URL,
      },
      {
        label: 'Lifetime',
        price: 22500,
        highlights: ['Best ROI plan', 'Free expert assistance', 'Includes 1-year TSS', 'Lifetime license', 'Zero-cost EMI available'],
        ctaUrl: TALLY_BUY_URL,
      },
    ],
    features: [
      'All TallyPrime features — no capability gating by plan',
      'Single user, single-PC concurrent access',
      'Connected GST — GSTR-1/3B filing, 2A/2B auto-reconciliation',
      'Connected Banking — Axis, SBI, Kotak (ICICI reconciliation only)',
      'e-Invoice and e-Way Bill generation inside Tally',
      'TallyDrive cloud backup — 1 GB free with active TSS',
      'SmartFind — fuzzy search across all loaded companies (new in 7.0)',
      'PrimeBanking Payments — online payments with real-time status',
      'IMS (Invoice Management System) with ITC reduction support',
      '1 free TVU pack for secure virtual access',
    ],
    notes: [
      'All prices exclude 18% GST.',
      'Rental plans include TSS for the rental duration.',
      'Lifetime plan includes 1-year TSS; renew annually to keep connected features active.',
    ],
  },
  gold: {},
  server: {},
  auditors: {},
  'virtual-user': {},
  'mobile-app': {},
  upgrade: {},
};
