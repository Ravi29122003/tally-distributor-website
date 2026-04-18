# TallyHub Website

A TallyPrime partner marketing site built for an Indian audience -- showcasing products, pricing, services, and contact information.

## Tech Stack

- **Vite 8** -- fast dev server and optimized production builds
- **React 18** -- component-based UI
- **Tailwind CSS v4** -- utility-first styling with custom theme
- **React Router v6** -- client-side routing with `BrowserRouter`
- **lucide-react** -- icon library

## Getting Started

### Prerequisites

- Node.js 18+

### Install and run

```bash
npm install        # install dependencies
npm run dev        # start dev server (http://localhost:5173)
npm run build      # production build into dist/
npm run preview    # preview the production build locally
```

## Project Structure

```
src/
  app.jsx            # All home-page sections and shared components
                     # (Hero, Pricing, Services, About, FAQ, Contact, etc.)
  router.jsx         # Routing, nav, footer, layout, app entry point
  config/
    site.js          # Brand config (name, phones, socials, address, etc.)
  index.css          # Tailwind theme extensions + custom animations
public/
  favicon.svg        # Brand favicon
index.html           # Vite entry point with SEO meta tags
```

## Configuration

All brand info, contact details, and social links live in `src/config/site.js`. Update values there to change them site-wide:

- Brand name and tagline
- Phone numbers (sales and support)
- WhatsApp number
- Email addresses
- Office address
- Business hours
- Social media URLs

## Deployment Notes

This app uses `BrowserRouter`, so the hosting provider must rewrite all unknown paths to `/index.html` for client-side routing to work.

**Netlify** -- create a `public/_redirects` file:
```
/*    /index.html   200
```

**Vercel** -- create a `vercel.json` at the repo root:
```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

**Nginx** -- add to the server block:
```nginx
location / {
    try_files $uri /index.html;
}
```

## TODO

- Replace placeholder contact info in `src/config/site.js` with real values
- Wire both forms to a real backend (Formspree, EmailJS, or custom API) -- currently they fake-submit with a timeout
- Fill in the placeholder sub-pages under `/products/*` and `/solutions/*`
