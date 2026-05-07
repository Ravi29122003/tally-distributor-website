// src/components/products/FeatureTicker.jsx
//
// Reusable horizontal feature ticker for product pages (SoftTrade
// Mandi, Brokwin, ColdWin, etc).
//
// Visual language matches the dark marquee strip already present at
// the bottom of MandiPage's Hero (deep --ink background, white/75
// foreground, 14px DM Sans weight 500, 48px gap, copper ✦ diamond
// separators in --orange, 18px vertical padding).
//
// Behaviour:
//   - continuous infinite horizontal scroll (~30s loop)
//   - pause on hover or keyboard focus inside the strip
//   - per-item hover: copper accent + slight scale-up
//   - mobile keeps scrolling (no static fallback)
//   - prefers-reduced-motion: scroll slows substantially
//
// Props:
//   items:     { label: string }[]   — required, all content via props
//   ariaLabel: string                  — optional region label
//
// Designed to live inside <div className="design-page"> so the
// --ink, --orange CSS variables resolve. Hardcoded fallbacks are
// supplied so the component still renders if dropped elsewhere.

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
              <span
                key={`${dup}-${i}`}
                className="ft-ticker__item"
                tabIndex={dup === 0 ? 0 : -1}
                aria-hidden={dup === 1 ? true : undefined}
              >
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
          animation: ft-ticker-scroll 55s linear infinite;
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
          outline: none;
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
          width: 56px;
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
