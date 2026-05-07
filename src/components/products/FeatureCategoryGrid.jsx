// src/components/products/FeatureCategoryGrid.jsx
//
// Reusable responsive feature-category grid for product pages.
// Warm cream cards (--paper) with a subtle dark border, copper dot
// title prefix, italic muted DM Sans subtitle, copper checkmarks
// before each item (no disc bullets). Cards fade and rise into view
// with a stagger as they enter the viewport.
//
// Props:
//   categories: { title: string; subtitle?: string; items: string[] }[]
//
// All content via props — no page-specific text inside.
//
// Designed to live inside <div className="design-page"> so the
// --paper, --ink, --orange, --line-2, --muted CSS variables resolve.
// Hardcoded fallbacks are supplied so it still renders elsewhere.

import { useEffect, useRef, useState } from 'react';

export default function FeatureCategoryGrid({ categories }) {
  if (!categories || categories.length === 0) return null;

  return (
    <div className="fcg-grid">
      {categories.map((cat, i) => (
        <CategoryCard key={cat.title || i} category={cat} index={i} />
      ))}

      <style>{`
        .fcg-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        @media (min-width: 720px) {
          .fcg-grid { grid-template-columns: 1fr 1fr; gap: 22px; }
        }
        @media (min-width: 1024px) {
          .fcg-grid { grid-template-columns: 1fr 1fr 1fr; gap: 24px; }
        }

        .fcg-card {
          position: relative;
          background: var(--paper, #F6F1E6);
          border: 1px solid var(--line-2, #D9D3C3);
          border-radius: 18px;
          padding: 28px;
          display: flex;
          flex-direction: column;
          opacity: 0;
          transform: translateY(16px);
          transition:
            opacity .55s ease,
            transform .55s ease,
            border-color .25s ease,
            box-shadow .25s ease;
          box-shadow: 0 1px 0 rgba(14, 27, 44, .02);
        }
        .fcg-card.is-in {
          opacity: 1;
          transform: translateY(0);
        }
        .fcg-card:hover {
          border-color: rgba(14, 27, 44, .35);
          box-shadow: 0 22px 44px -26px rgba(14, 27, 44, .28);
        }

        .fcg-card__title-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .fcg-card__dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: var(--orange, #E1530B);
          flex: none;
          box-shadow: 0 0 0 4px rgba(225, 83, 11, .12);
        }
        .fcg-card__title {
          font-family: 'Fraunces', 'Source Serif Pro', Georgia, serif;
          font-size: 24px;
          font-weight: 600;
          letter-spacing: -0.015em;
          color: var(--ink, #0E1B2C);
          margin: 0;
          line-height: 1.15;
        }
        .fcg-card__subtitle {
          font-size: 13.5px;
          font-style: italic;
          color: var(--muted, #6B7A90);
          margin: 8px 0 0 19px;
          line-height: 1.5;
        }

        .fcg-card__list {
          list-style: none;
          padding: 0;
          margin: 20px 0 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .fcg-card__item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 14.5px;
          line-height: 1.55;
          color: var(--ink, #0E1B2C);
        }
        .fcg-card__check {
          flex: none;
          width: 16px;
          height: 16px;
          margin-top: 4px;
          color: var(--orange, #E1530B);
        }

        @media (prefers-reduced-motion: reduce) {
          .fcg-card { opacity: 1; transform: none; transition: none; }
        }
      `}</style>
    </div>
  );
}

function CategoryCard({ category, index }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      className={`fcg-card${shown ? ' is-in' : ''}`}
      style={{ transitionDelay: shown ? `${Math.min(index, 5) * 70}ms` : '0ms' }}
    >
      <div className="fcg-card__title-row">
        <span className="fcg-card__dot" aria-hidden />
        <h3 className="fcg-card__title">{category.title}</h3>
      </div>
      {category.subtitle && (
        <p className="fcg-card__subtitle">{category.subtitle}</p>
      )}
      <ul className="fcg-card__list">
        {category.items.map((item, i) => (
          <li key={i} className="fcg-card__item">
            <svg
              className="fcg-card__check"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
