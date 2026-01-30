# Tech Blog

A fast, SEO-friendly tech blog built with Next.js (App Router), TypeScript and Tailwind CSS.

## Run locally

Install and start:

```bash
npm install
npm run dev
```

Open http://localhost:3000

## What I implemented
- Home page with Header, Hero, Article grid (fetches 10 posts), and Footer
- Client-side fetching with loading & error states
- Search across `title`, `description`, and `content_text` and category filter (combined)
- Article modal displaying `content_html` with ESC, outside-click and X close
- SEO: meta tags, Open Graph, Twitter Card, JSON-LD (WebSite + Article), `robots.txt`, `sitemap.xml`
- Images use Next.js `Image` with descriptive alt text and lazy-loading (unoptimized used for external images)
- Accessibility improvements: focus management in modal, keyboard Enter handling on cards

## SEO Strategy

- Meta tags: `title`, `description` set in `app/layout.tsx` using Next.js `metadata` API (keeps title <= 60 chars and description <=160 chars). These drive search snippets and social previews.
- Open Graph & Twitter Card: `og:title`, `og:description`, `og:image`, and `twitter:card` configured in `app/layout.tsx` so social previews display correctly.
- JSON-LD Structured Data:
  - `WebSite` schema added to `app/page.tsx` to help site discovery and search actions.
  - `Article` schema injected into `ArticleModal` for each opened article (includes headline, image, datePublished, dateModified, and description).
- Semantic HTML: header (`Header`), nav, main, article (`ArticleCard`), section, time (`<time>`), and footer used across pages, and heading hierarchy kept (single `h1` in header).
- Image optimization: Next.js `Image` used with descriptive alt text and `sizes`; `unoptimized` is used for remote images to avoid host config during development — for production add allowed domains in `next.config.ts`.

## Search and Filter

- Implemented in `components/ArticleGrid.tsx` (client-side):
  - Fetches 10 posts on mount.
  - `search` input filters by `title`, `description`, and `content_text` (case-insensitive).
  - `category` select shows unique categories extracted from fetched posts and filters results.
  - Both filters combine: results must match search AND selected category.
  - Displays result count and a "No results found" message.

## Files added/updated
- `lib/api.ts` — typed API helper with graceful error handling
- `app/layout.tsx` — enriched metadata (Open Graph, Twitter)
- `app/page.tsx` — hero, homepage JSON-LD
- `components/ArticleGrid.tsx` — client fetching, loading, error, search & filter
- `components/ArticleCard.tsx` — Next.js `Image` with alt text
- `components/ArticleModal.tsx` — accessibility improvements and Article JSON-LD
- `public/robots.txt` and `public/sitemap.xml`

## Accessibility & Performance notes
- Keyboard navigation: cards are focusable and open on Enter, modal closes with ESC and focuses the close button on open.
- Contrast: Tailwind defaults used; consider customizing colors in `tailwind.config.js` to further improve WCAG contrast if needed.
- Lighthouse: I recommend running Lighthouse locally and adding the three screenshots to `/screenshots` before final submission.

## Known TODOs / Next steps
- Add allowed `images.domains` in `next.config.ts` and remove `unoptimized` where appropriate for full image optimization.
- Add lightweight focus trap inside modal for stronger keyboard accessibility.
- Run Lighthouse audits and place screenshots in `/screenshots` (see deliverable requirements).
- Deploy to Vercel and update `public/robots.txt` and `public/sitemap.xml` with the production URL.

## Technologies
- Next.js (App Router), TypeScript, React, Tailwind CSS

## Notes on assumptions
- API provides `photo_url` for images; because external hosts vary, `Image` is used with `unoptimized` for development. For production add domains or use a custom loader.
- Article pages are displayed in a modal (no dedicated article routes) as requested. If separate article pages are preferred, we can add dynamic routes.

If you'd like, I can now:
- run Lighthouse and capture screenshots (will need a browser environment), or
- update `next.config.ts` to whitelist image domains and improve image optimization, or
- create dedicated article pages and canonical URLs.
