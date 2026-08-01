# 0001. Initial Technology Stack & Architecture

## Context
The CCTV Platform requires an education-first, modular architecture that can function as a high-performance web app today while remaining architecturally ready to become a SaaS platform in the future without a full rewrite.

## Decision
We selected Next.js (App Router), TypeScript, Tailwind CSS v4, and Supabase (Postgres + Auth + RLS).
Data access follows a strict repository pattern (`src/features/<domain>/repositories/`), isolating components from database drivers.

## Consequences
- **Positive:** Type safety from DB to UI via Zod schemas, zero direct DB coupling in React components, clean server-side rendering for SEO.
- **Negative:** Requires repository wrappers for every domain entity instead of inline Supabase calls.
