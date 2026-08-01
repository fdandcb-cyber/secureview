# ADR 0001 — Initial Stack & Architecture

**Status:** Accepted
**Date:** Phase 0

## Decision

- Next.js (App Router) + TypeScript + Tailwind CSS as the frontend.
- Supabase (Postgres + Auth + Row Level Security) as the backend.
- Modular monolith: feature folders under `src/features/*`, each owning its
  own components/services/repositories, rather than a premature microservice
  or multi-tenant split.
- No ERP module at launch. No multi-tenancy at launch. Both are deferred
  until real inventory/service volume or real licensing demand exists
  (see Master Blueprint §1 and §11).
- Three-tier Supabase client boundary:
  `lib/supabase/client.ts` (browser, anon key),
  `lib/supabase/server.ts` (server, anon key + user session, RLS still applies),
  `lib/supabase/server-privileged.ts` (server, service role key — bypasses RLS,
  restricted to route handlers/server actions with explicit authorization).

## Why

- Keeps the codebase SaaS-ready (bounded modules) without paying SaaS's
  upfront multi-tenancy cost before there is a single user.
- RLS-first data access means most user-data bugs fail closed, not open.
- Explicit separation of the privileged Supabase client is the single
  highest-leverage guard against accidentally shipping the service-role key
  to the browser.

## Consequences

- Adding a `tenant_id` layer later (for SaaS licensing) will touch the
  database schema and RLS policies but not require a frontend rewrite.
- Any future ERP-style modules (stock, purchase orders, service-job
  tracking) should be added as new feature folders, not as a structural
  change to the core platform.
