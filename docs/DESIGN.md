# Store Design & UX Specification

## Visual Direction

- **Primary Visual Reference:** [Vasco](https://vasco.eu/) — clean Scandinavian minimalism, light neutral background, generous whitespace, crisp typography, and interior lifestyle photography paired with technical dimension drawings.
- **E-Commerce UX Layer:** Because Vasco is a manufacturer showcase rather than a transactional store, we combine its visual aesthetic with technical e-commerce usability: faceted filters, comparison tables, a heat-output calculator, a shopping cart, and role-based B2C/B2B customer accounts.

## Buyer Pain Points to UX & SEO Mapping

| Buyer Pain Point | UX Solution | SEO Impact |
| --- | --- | --- |
| "What radiator do I need?" (home type, material, heat output) | Interactive heat-output calculator, concise Steel vs. Aluminum vs. Bimetallic guide, faceted technical filters | Indexable category/filter landing pages and high-intent calculator traffic |
| "Why does this model cost more?" | Clear measurable advantages (output in W, working pressure in bar, steel thickness, warranty) and side-by-side comparison | Structured HTML specification tables improve search relevance |
| "How will it look in my room?" | Vasco-inspired clean interior photography alongside exact dimension drawings | Optimized images (`NgOptimizedImage`) with descriptive `alt` text |
| "Can I trust this store and product?" | Visible warranty, service, and delivery terms; downloadable PDF manuals/passports; verified customer reviews | Schema.org JSON-LD (`Product`, `Offer`, `AggregateRating`, `Review`) rich snippets |

## Core Screens & Routes

1. **Home (`/`)** — Minimalist interior hero, top 3 radiator categories (steel panel, aluminum sectional, bimetallic), prominent entry point to the heat-output calculator, trust indicators (warranty, delivery, service, documentation), and wholesale B2B partner callout.
2. **Catalog & SEO Categories (`/radiators/:category`)** — Faceted technical filters (radiator type, height, length, center distance, connection type, heat output, working pressure, price), sorting, standard pagination (for SEO crawlability), and "Add to Compare" action.
3. **Product Detail Page (`/radiators/:category/:slug`)** — Gallery (interior photo + technical drawing), dynamic B2C/B2B pricing, size/section selector, measurable advantages summary, full specification table, tabbed sections (**Documentation & Manuals PDF**, **Delivery & Warranty**, **Customer Reviews**), and compatible accessories cross-sell.
4. **Heat-Output Calculator (`/calculator`)** — Step-by-step room sizing tool (heating system type, room area, ceiling height, windows/insulation) outputting required wattage and matching radiators directly from the catalog.
5. **Product Comparison (`/compare`)** — Side-by-side comparison highlighting measurable differences between models.
6. **Cart & Checkout (`/cart`, `/checkout`)** — Retail and wholesale checkout flow supporting carrier selection and company details for shipping/expense documents.
7. **Customer Account (`/account`)** — Role-based dashboard:
   - **Retail (`RETAIL`):** Order history, delivery tracking, saved calculations, and downloaded manuals.
   - **Construction Firms (`CONSTRUCTION_FIRM`):** Personal B2B pricing/terms, arbitrary quantities, live stock visibility, and business documents.
   - **Wholesale (`WHOLESALE`):** Personal wholesale pricing/terms, pack-multiple bulk ordering, live warehouse stock visibility, and downloadable expense/shipping documents.
8. **Admin Panel (`/admin`)** — Role-restricted management interface where an administrator assigns buyer emails to customer roles (`RETAIL`, `CONSTRUCTION_FIRM`, `WHOLESALE`) and manages catalog/pricing rules.

## SEO & Performance Design Guardrails

- Render every public storefront route via **Angular SSR** with dynamic `<title>`, `<meta name="description">`, canonical URLs, and breadcrumbs (`BreadcrumbList`).
- Keep one `<h1>` per page with strict semantic HTML landmarks (`<header>`, `<nav>`, `<main>`, `<article>`, `<footer>`).
- Avoid heavy hero sliders or layout-shifting banners to protect Core Web Vitals (**LCP**, **CLS**, **INP**).
- Keep `/cart`, `/checkout`, `/account`, and `/admin` non-indexed (`noindex`) while indexing `/`, `/radiators/...`, and `/calculator`.
