# Project Roadmap & Progress Tracker

> **Session Handoff Note:** Update the **Current Status** section at the end of each completed step so any new AI session immediately knows where we left off.

## Current Status

- **Active Phase:** Phase 1 — Backend Stage 1 (Express Modular Monolith)
- **Completed:** Phase 0 complete (`AGENTS.md`, `README.md`, `docs/DESIGN.md`, `docs/DOMAIN.md`, local env verified, Git initialized on `main`)
- **Git Workflow:** `main` (stable) <- `develop` (integration) <- `feature/*` (task branches merged into `develop`)
- **Current Step:** Create `develop` branch, then start Phase 1 (`feature/backend-init`: Node.js + TypeScript + Express + ESLint/Prettier)
- **Next Up:** Scaffold Express backend, configure TypeScript strict mode + ESLint/Prettier, connect GitHub remote, and set up GitHub Actions CI

## Phase 0 — Discovery, Design & Foundation

- [x] Define mentorship rules and context engineering setup (`AGENTS.md`)
- [x] Create `README.md` and session progress tracker (`docs/ROADMAP.md`)
- [x] Choose visual and UX design reference (Vasco minimalist aesthetic + full B2C/B2B e-commerce UX)
- [x] Document top radiator buyer pain points and key store screens (`docs/DESIGN.md`)
- [x] Design radiator domain model, barcodes, RBAC roles, and SEO URL structure (`docs/DOMAIN.md`)
- [x] Verify local environment (Node.js, npm, Git) and initialize Git repository (`.gitignore`, initial commit)

## Phase 1 — Backend Stage 1 (Express Modular Monolith)

- [ ] Initialize Node.js + TypeScript + Express project with ESLint and Prettier
- [ ] Set up GitHub repository and first GitHub Actions CI pipeline (lint + build)
- [ ] Structure modular boundaries (`catalog`, `calculator`, `orders`, `accounts`, `integrations`)
- [ ] Connect database and implement radiator catalog REST API (filters, pagination, slugs)
- [ ] Implement heat-output calculator logic, role-based B2C/B2B pricing, and order submission endpoints
- [ ] Define business process and API integration contracts (warehouse stock/orders, carrier booking, shipping/expense documents)

## Phase 2 — Frontend (Angular SSR & SEO)

- [ ] Initialize Angular project with SSR enabled (`ng new --ssr`)
- [ ] Build SEO-ready layout (semantic HTML, breadcrumbs, dynamic meta tags)
- [ ] Build catalog page with technical filters synced to URL query parameters
- [ ] Build radiator product page (specs table, Schema.org JSON-LD, section/size selector)
- [ ] Build interactive heat-output radiator calculator (Reactive Forms + Signals)
- [ ] Implement shopping cart state, checkout flow, and B2C / B2B customer accounts

## Phase 3 — Quality, Testing & Hardening

- [ ] Add unit and integration tests for critical backend and frontend logic
- [ ] Integrate SonarQube / SonarCloud quality checks into CI
- [ ] Audit SEO, accessibility, and Core Web Vitals (LCP, CLS, INP)

## Phase 4 — Backend Stage 2 (NestJS, Microservices & Google Cloud)

- [ ] Migrate Express modular monolith to NestJS
- [ ] Extract independent microservices (catalog/warehouse sync, orders, B2C/B2B accounts, carrier booking, document generation)
- [ ] Containerize services with Docker and deploy to Google Cloud (Cloud Run)
- [ ] Add `CHANGELOG.md` and tag initial release (`v1.0.0`)
