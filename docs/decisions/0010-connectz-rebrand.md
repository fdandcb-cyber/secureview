# 10. Platform Rebrand (Connectz Learning Center), Auth Bypass Removal, and Page Wiring

* **Status:** Accepted
* **Deciders:** Connectz Learning Center Engineering Team
* **Date:** 2026-08-02

---

## Context & Problem Statement

Prior audit of the platform identified four remaining engineering requirements:
1. **Unresolved Dev Auth Bypass:** `requireAdmin()` in `src/lib/auth/require-admin.ts` retained a `process.env.NODE_ENV === "development"` fallback that granted automatic admin access on error.
2. **Hardcoded Brand Strings:** Brand strings and business contact details were scattered across header, footer, layout metadata, and legal terms rather than being single-source configured.
3. **Unwired Domain Pages:** Client mock pages (`/compare`, `/service`, `/learn`, `/plan/quote`, `/plan/calculators`, `/contact`, `/admin/settings/admins`, and `/`) required wiring to their respective domain repositories.

---

## Decision Drivers

* **Single Source of Truth:** Centralize all brand, domain, support email, and contact metadata in `src/config/brand.ts` and `site_settings` migration `20260802000007_rebrand_connectz.sql`.
* **Zero-Trust Administrative Auth:** Require strict Supabase Auth + `admin_users` table verification for all `/admin/**` entrypoints regardless of environment.
* **Repository Architecture Integrity:** Connect all client views to server component data loaders backed by domain repositories without modifying underlying database schemas.

---

## Key Technical Decisions

### 1. Brand Configuration (`src/config/brand.ts`)
- Created `BRAND` constant containing:
  - Site Name: **Connectz Learning Center**
  - Support Email: **support@connectzss.shop**
  - Domain: **connectzss.store** (`https://connectzss.store`)
  - Primary Mobile: **+91 78094 65102** (`tel:+917809465102`)
  - Office Location: **Cuttack, Odisha**
  - Primary Admin Email: **connectzsalesandservices@gmail.com**
- Added migration `20260802000007_rebrand_connectz.sql` updating `site_settings` key-value pairs via `ON CONFLICT (key) DO UPDATE`.
- Added migration `20260802000008_seed_primary_admin.sql` seeding `role = 'admin'` for `connectzsalesandservices@gmail.com`.

### 2. Elimination of Development Auth Guard Bypass
- Deleted `if (process.env.NODE_ENV === "development")` fallback from `requireAdmin()`.
- Unauthenticated access to `/admin` pages strictly redirects to `/login`.
- Offline local development path requires explicit `DEV_BYPASS_ADMIN_AUTH="true"` environment variable with console warning logging.

### 3. Page Wiring
- **`/compare`**: Wired to `compareProductsBySlugs` in `comparison-repository.ts`.
- **`/service`**: Wired to `listVerifiedServiceCenters` in `service-repository.ts`.
- **`/learn`**: Wired to `listPublishedArticles` and `getArticleBySlug` in `knowledge-repository.ts`.
- **`/plan/quote` & `/plan/quote/[id]/print`**: Wired to `getQuote` in `quote-repository.ts`.
- **`/plan/calculators`**: Wired to `calculateStorageRetention` engine in `calculator-engine.ts`.
- **`/contact`**: Wired to `POST /api/inquiries` route handler with `BRAND` contact details.
- **`/admin/settings/admins`**: Wired to `admin_users` database query using `createSupabasePrivilegedClient()`.

---

## Verification Results

1. **Automated Verification Tests:**
   - `scripts/test-auth-guard.ts`: **PASSED** (Strict redirect to `/login` verified in `NODE_ENV=development`).
   - `scripts/test-checkout-price-validation.ts`: **PASSED** (Price tampering rejected).
   - `scripts/test-webhook.ts`: **PASSED** (Fail-closed signature & event ID checks enforced).
2. **Type Checking & Linting:**
   - `npx tsc --noEmit`: 0 errors.
   - `npx eslint src --max-warnings=0`: 0 warnings, 0 errors.
3. **User-Facing String Audit:**
   - Workspace search for `SecureView` in `src/`: 0 matches found.
