# 9. Admin Authorization Guard, Server Price Enforcement, and Webhook Fail-Closed Security

* **Status:** Accepted
* **Deciders:** SecureView Engineering Team
* **Date:** 2026-08-02

---

## Context & Problem Statement

Prior audit of the SecureView CCTV Platform identified three critical security vulnerabilities before production deployment:

1. **Unprotected Admin Routes:** All routes under `src/app/admin/**` were accessible to unauthenticated callers with zero authorization checks, and displayed hardcoded fake user identities in the layout.
2. **Client-Side Checkout Price Tampering:** `POST /api/checkout/create-order` trusted `unitPriceInr` values submitted in the client request body, allowing arbitrary price modification before payment order creation.
3. **Fail-Open Webhook Verification & Timing Vulnerabilities:** `POST /api/checkout/webhook` bypassed signature checks when `RAZORPAY_WEBHOOK_SECRET` was unconfigured (failing open), used standard non-constant-time string comparison (`!==`), and auto-generated fake event IDs when missing.

---

## Decision Drivers

* **Zero-Trust Security:** Prevent administrative access or privileged actions by unauthenticated users.
* **Financial Data Integrity:** Ensure product pricing and order calculations are derived strictly from database records (`products.base_price_inr`).
* **Cryptographic Rigor:** Enforce constant-time signature validation (`crypto.timingSafeEqual`) and fail-closed state (HTTP 500) if payment webhook secrets are missing.
* **Audit Compliance:** Maintain clear role-based access control (`admin` vs `editor`) across all administrative modules.

---

## Technical Design & Architecture

### 1. Server Authorization Guard (`src/lib/auth/require-admin.ts`)
- Implemented `requireAdmin()` server guard using `@supabase/ssr` cookies and `admin_users` database verification.
- Completely removed `process.env.NODE_ENV === "development"` fallback in favor of strict redirection to `/login`. Local offline dev bypass requires explicit opt-in via `DEV_BYPASS_ADMIN_AUTH="true"` with console warning logging.
- Added strict `requireSuperAdmin()` requiring `role = 'admin'` for privileged management routes (`/admin/settings/admins`).
- Wired `requireAdmin()` into `src/app/admin/layout.tsx` and all top-level `/admin/**/page.tsx` server component entrypoints.
- Built `/login/page.tsx` with email/password authentication.

### 2. Server-Side Price Verification (`POST /api/checkout/create-order`)
- Modified input schema to accept only `productId` and `quantity`, completely discarding client-submitted pricing fields.
- Queries authoritative database prices via `getPublishedProductById(productId)` in `product-repository.ts`.
- Recomputes subtotal, 18% GST, and total INR strictly on the server before calling Razorpay SDK `orders.create`.

### 3. Fail-Closed Webhook Enforcement (`POST /api/checkout/webhook`)
- Returns HTTP 500 (`"Razorpay webhook secret not configured"`) if `RAZORPAY_WEBHOOK_SECRET` is unset.
- Performs constant-time comparison via `crypto.timingSafeEqual(expectedBuffer, actualBuffer)` with buffer length validation.
- Rejects requests lacking valid `event_id` or payment entity IDs with HTTP 400.

---

## Verification & Compliance

1. **Automated Test Runners:**
   - `scripts/test-checkout-price-validation.ts`: Verified rejection of client price tampering (server enforced ₹7,552 instead of tampered ₹2) and rejection of fake product IDs (HTTP 400).
   - `scripts/test-webhook.ts`: Verified fail-closed unconfigured secret guard (HTTP 500), missing signature rejection (HTTP 400), invalid signature rejection (HTTP 400), and missing event ID rejection (HTTP 400).
2. **Compilation & Linting:**
   - `npx tsc --noEmit`: 0 errors.
   - `npx eslint src --max-warnings=0`: 0 errors, 0 warnings.
3. **Production Build:**
   - `npm run build`: Compiled static & dynamic routes cleanly.

---

## Consequences

* **Positive:** Complete elimination of admin access bypass, price tampering vulnerabilities, and webhook signature spoofing.
* **Trade-offs:** Server components under `/admin` must await session validation on every route transition.
