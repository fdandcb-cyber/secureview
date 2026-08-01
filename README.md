# CCTV & Security Knowledge Platform

Phase 0 (Audit & Foundation) + start of Phase 1/2 (Design System & Layout Shell)
per the Master Blueprint.

## What's in this scaffold

- Next.js App Router + TypeScript + Tailwind CSS, builds and typechecks clean.
- Design tokens wired as Tailwind theme variables (`src/app/globals.css`) —
  matches the blueprint's color/spacing/radius spec exactly.
- Inter + JetBrains Mono fonts per the typography spec.
- Global header/footer shell with the blueprint's IA (Learn / Products /
  Compare / Plan / Service / Buy / Account).
- Real homepage reflecting the "consultant, not store" positioning.
- Three-tier Supabase client boundary (browser / server / privileged-server)
  so the service-role key can never leak to the browser — see
  `docs/decisions/0001-initial-stack.md`.
- Validated environment config (`src/config/env.ts`) — nothing else in the
  app should read `process.env` directly.
- Full `src/features/*` folder structure from the blueprint's repo
  architecture, ready for each Engine to be built into its own bounded module.
- Foundation docs: vision, AI development rules, first architecture decision
  record.

## Run it locally

```bash
npm install
cp .env.example .env.local   # fill in your Supabase project keys when ready
npm run dev
```

Then open http://localhost:3000.

## Next steps (Phase 3 onward)

1. Create a Supabase project, run the first migration for the Catalog +
   Specification domains (see Master Blueprint §12).
2. Seed 15-30 real products with full specs — the MVP slice, not the full
   catalog.
3. Build the Knowledge Engine's article/glossary pages.
4. Build one Calculator (recommend: storage duration, it's the simplest to
   validate) with exposed formula + tested boundary cases.
5. Build the Service Directory for 2-3 Odisha districts, founder-verified.

Everything above should land in `src/features/<engine-name>/` following the
pattern already established, with data access through `repositories/` and
business rules in `services/` — never directly in components.
