// src/components/products/FeatureTicker.jsx
//
// Reusable horizontal feature ticker for product pages.
// Visual language matches the Wave 3 SoftTrade product marquees:
// deep ink background, copper ✦ diamond separators, paused on hover.
// All content arrives via props — no page-specific text inside.
//
// Props:
//   items: { label: string }[]
//
// Usage: render inside a page wrapped in <div className="design-page">,
// where --ink, --orange, --line and --line-2 CSS variables resolve.
// Hardcoded fallbacks are provided so the component still renders
// reasonably outside that scope.

import { Fragment } from 'react';

export default function FeatureTicker({ items, ariaLabel = 'Feature ticker' }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="ft-ticker" role="region" aria-label={ariaLabel}>
      <div className="ft-ticker__fade ft-ticker__fade--left" aria-hidden />
      <div className="ft-ticker__track">
        {[0, 1].map((dup) => (
          <Fragment key={dup}>
            {items.map((it, i) => (
              <span key={`${dup}-${i}`} className="ft-ticker__item">
                <span className="ft-ticker__label">{it.label}</span>
                <span className="ft-ticker__sep" aria-hidden>✦</span>
              </span>
            ))}
          </Fragment>
        ))}
      </div>
      <div className="ft-ticker__fade ft-ticker__fade--right" aria-hidden />

      <style>{`
        .ft-ticker {
          position: relative;
          background: var(--ink, #0E1B2C);
          color: rgba(255, 255, 255, .75);
          overflow: hidden;
          padding: 18px 0;
          border-top: 1px solid rgba(255, 255, 255, .05);
          border-bottom: 1px solid rgba(255, 255, 255, .05);
        }
        .ft-ticker__track {
          display: flex;
          align-items: center;
          gap: 48px;
          white-space: nowrap;
          width: max-content;
          animation: ft-ticker-scroll 30s linear infinite;
          will-change: transform;
        }
        .ft-ticker:hover .ft-ticker__track,
        .ft-ticker:focus-within .ft-ticker__track {
          animation-play-state: paused;
        }
        .ft-ticker__item {
          display: inline-flex;
          align-items: center;
          gap: 0;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: .005em;
          color: rgba(255, 255, 255, .78);
          transition: color .25s ease, transform .25s ease;
          transform-origin: center;
        }
        .ft-ticker__item:hover,
        .ft-ticker__item:focus-visible {
          color: var(--orange, #E1530B);
          transform: scale(1.08);
        }
        .ft-ticker__sep {
          color: var(--orange, #E1530B);
          margin-left: 48px;
          font-size: 12px;
          opacity: .8;
        }
        .ft-ticker__fade {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 64px;
          pointer-events: none;
          z-index: 1;
        }
        .ft-ticker__fade--left {
          left: 0;
          background: linear-gradient(to right, var(--ink, #0E1B2C), rgba(14, 27, 44, 0));
        }
        .ft-ticker__fade--right {
          right: 0;
          background: linear-gradient(to left, var(--ink, #0E1B2C), rgba(14, 27, 44, 0));
        }
        @keyframes ft-ticker-scroll {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-50%, 0, 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ft-ticker__track { animation-duration: 120s; }
        }
      `}</style>
    </div>
  );
}
