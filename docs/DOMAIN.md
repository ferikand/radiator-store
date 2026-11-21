# Domain Model & SEO URL Structure

> **Data Hygiene Rule:** Never commit real wholesale buy prices, supplier contracts, accounting reports, or company bank details to this repository. Keep only public technical specifications, domain structures, and synthetic/public pricing in development data.

## Product Categories

| Category Slug | Display Scope | Primary Brand | Base Selling Unit |
| --- | --- | --- | --- |
| `steel-panel` | Steel panel radiators (fixed dimensions) | Rhein | `piece` |
| `aluminum` | Aluminum sectional radiators | Evro-Termo | `section` |
| `bimetallic` | Bimetallic sectional radiators | Evro-Termo | `section` |
| `accessories` | Mounting kits and installation accessories | Evro-Termo | `kit` |

## Core Product Model (`Product`)

### Common Attributes

- `id` — Unique internal identifier.
- `sku` — Internal / factory product code (e.g., `C22500x100`, `HD-500D22`, `HD-A001`).
- `barcode` — Product barcode (EAN-13 / GTIN), used for warehouse scanning/API sync and Schema.org `gtin13`.
- `slug` — Human-readable, SEO-friendly URL identifier.
- `brand` — Manufacturer brand (`Rhein`, `Evro-Termo`).
- `category` — One of `steel-panel`, `aluminum`, `bimetallic`, `accessories`.
- `name` — Public product title.
- `retailPrice` — Base B2C retail price (currency: UAH).
- `stockQty` — Available warehouse stock count (in base units, synced via future Warehouse API).
- `warrantyYears` — Official warranty period (e.g., `10` for Rhein tightness, `2` for Evro-Termo radiators, `15` for Evro-Termo mounting kits).
- `serviceLifeYears` — Expected service life (e.g., `15` for Evro-Termo).
- `certifications` — Standards and approvals (e.g., `EN 442-1:2014`, `TÜV SÜD ISO 9001`, `CE`).
- `documents` — Downloadable public files (installation manuals, technical passports, CE declarations).
- `images` — Ordered media list (`interior` lifestyle photos + `technical-drawing` schematics with SEO `alt` text).

### Selling & Packaging Rules (`sellingRules`)

Stored on a single base-unit record (**Single Source of Truth**) to avoid duplicating sectional models across every section count:

- `unitType` — `'piece' | 'section' | 'kit'`.
- `packSize` — Standard wholesale carton quantity (`1` for steel panel radiators, `10` for sectional radiators, `20` for mounting kits).
- Quantity rules by buyer role:
  - `RETAIL` and `CONSTRUCTION_FIRM`: arbitrary quantity (`step = 1`, e.g., 6, 8, or 12 sections assembled on demand).
  - `WHOLESALE`: strictly multiples of `packSize` (`qty % packSize === 0`, e.g., 10, 20, 30 sections).
- Domain UX rule: when ordering 12 or more sections of a sectional radiator, warn the buyer that 4 mounting brackets are required.

### Logistics Attributes (`logistics`, per base unit)

Used to calculate total shipment weight and volume for carrier API integrations:

- `netWeightKg` — Net weight per piece/section/kit.
- `grossWeightKg` — Gross packaged weight per piece/section/kit.
- `volumeCbm` — Volume in cubic meters per piece/section/kit.

### Technical Specifications (`specs`)

- **Steel Panel Radiators (`Rhein`, e.g., `Compact 22C`):**
  - `panelType` (`22C`, future `V22`/`CV22`), `connectionType` (`side` | `bottom`).
  - `heightMm` (e.g., `500`), `lengthMm` (`400`–`1600`).
  - `heatOutputW`: multi-delta map (`dt70`, `dt60`, `dt50`) plus EN 442 parameters (`km`, `n`) for accurate heat calculator recommendations.
  - `workingPressureBar` (`10`), `maxTempC` (`95`), `includesMountingKit` (`true`).
- **Sectional Radiators (`Evro-Termo` Aluminum & Bimetallic):**
  - `centerDistanceMm` (`200`, `350`, `500`), `heightMm`, `depthMm` (`96`, `100`), `widthMm` (`80`).
  - `heatOutputPerSectionW` (`dt70`, e.g., `125`–`190` W), `waterVolumePerSectionL`.
  - `workingPressureBar` (`16` aluminum / `32` bimetallic), `testPressureBar` (`24` / `50`), `maxTempC` (`95`).
  - `includesMountingKit` (`false`) — triggers cross-sell of compatible `accessories` (`HD-A001`, `HD-A002`).
- **Accessories (`Evro-Termo` Mounting Kits):**
  - `threadSize` (e.g., `1"x1/2"`), `piecesCount` (`11`), `maxPressureBar` (`32`), `compatibleCategories` (`['aluminum', 'bimetallic']`).

## Customer Roles & Access Control (RBAC)

Customer categories are managed by an application administrator in `/admin` by assigning an email address to a role (pre-provisioned or updated for existing accounts):

| Role | Buyer Type | Quantity Rule | Pricing & Features |
| --- | --- | --- | --- |
| `RETAIL` | B2C retail customer (default) | Arbitrary (`step = 1`) | Public retail prices, standard checkout |
| `CONSTRUCTION_FIRM` | B2B construction / contractor firm | Arbitrary (`step = 1`) | Assigned B2B pricing/terms, live stock visibility, business documents |
| `WHOLESALE` | B2B wholesale dealer / store | Multiples of `packSize` | Assigned wholesale pricing/terms, live stock visibility, bulk checkout, expense documents |
| `ADMIN` | Store administrator | Full catalog access | Manages customer email-to-role assignments, pricing tiers, catalog, and orders |

## Supporting Entities (High-Level)

- **`Customer`** — `id`, `email`, `role`, optional `companyProfile` (legal name, tax ID, delivery details), optional `pricingTier` / personal terms.
- **`Order`** — `id`, `customerId`, `customerRole`, `items[]`, calculated `totalGrossWeightKg` & `totalVolumeCbm`, `warehouseSyncStatus`, `carrierBooking`, and generated `expenseDocuments[]`. (Detailed workflow to be documented in `docs/BUSINESS_PROCESS.md` before Phase 1 integrations.)
- **`Review`** — `id`, `productId`, `authorName`, `rating` (`1`–`5`), `comment`, `verifiedPurchase`, `createdAt` (feeds Schema.org `AggregateRating` and `Review`).

## SEO URL Structure

- **Category pages:**
  - `/radiators/steel-panel`
  - `/radiators/aluminum`
  - `/radiators/bimetallic`
  - `/radiators/accessories`
- **Product detail pages:**
  - `/radiators/steel-panel/rhein-compact-22c-500x1000`
  - `/radiators/aluminum/evro-termo-hd-500c2`
  - `/radiators/bimetallic/evro-termo-hd-500d22`
  - `/radiators/accessories/evro-termo-hd-a001`
- **Utility & account pages:**
  - Indexable: `/`, `/calculator`
  - Non-indexable (`noindex`): `/compare`, `/cart`, `/checkout`, `/account`, `/admin`
