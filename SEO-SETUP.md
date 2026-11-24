# SEO setup / Настройка SEO

## Canonical site URL

- Local development: keep `NEXT_PUBLIC_SITE_URL=http://localhost:3000` in `.env.local`.
- Vercel: set `NEXT_PUBLIC_SITE_URL=https://your-production-domain` in Project Settings -> Environment Variables -> Production.
- If the variable is not set on Vercel, `src/shared/config/site.ts` falls back to the Vercel system variable `VERCEL_PROJECT_PRODUCTION_URL`, then `VERCEL_URL`.
- The full URL must include `https://` and must not include a path.

Preview deployments get `noindex,nofollow` metadata and a disallow-all `robots.txt`; their canonical URLs continue to point to the production origin.

## What is included

- Root title template, description, canonical origin, Open Graph and Twitter Card metadata.
- A 1200x630 Open Graph image at `public/images/brand/og-lavka.jpg`.
- A 512x512 brand mark used as the Organization logo in JSON-LD.
- `Organization` and `WebSite` structured data on all pages.
- Product-specific title, description, canonical URL, Open Graph/Twitter image metadata and `Product` JSON-LD.
- `BreadcrumbList` JSON-LD on product pages.
- `robots.ts` and a sitemap containing the homepage, catalog and product pages only.
- Cart, checkout, favorites and order-success routes are marked `noindex` in their page metadata.

## Before public launch

1. Set the real production origin in Vercel as described above, especially when using a custom domain.
2. Replace the demo contact email and phone shown in the footer in `src/shared/config/site.ts` with real customer-support contacts.
3. Verify the deployed page source and social preview using Google Rich Results Test, Schema Markup Validator and Facebook Sharing Debugger. Search engines and social platforms may cache previews, so a changed image can take time to appear.
4. Submit `https://your-production-domain/sitemap.xml` in Google Search Console and Bing Webmaster Tools after the production domain is live.

Product `AggregateRating` is intentionally not emitted in JSON-LD because the current product ratings and review counts are static demo data. Add rating markup only when those values represent genuine, visible customer reviews.
