# MPB-003 — AI Development Rules

Any AI coding agent (Claude Code, MonkeyCode, or otherwise) working in this
repository must follow these rules:

1. Do not build the entire platform in one pass. Work phase by phase.
2. Audit existing code before changing architecture.
3. Preserve working functionality unless a migration plan explicitly replaces it.
4. Do not hardcode catalog/content data that belongs in the database.
5. Do not create a database table merely because a UI page exists.
6. Separate presentation, business rules, and data access
   (`components/` vs `services/` vs `repositories/`).
7. Reuse components and utilities; do not create near-duplicates.
8. Use strict TypeScript and Zod schema validation at every external boundary.
9. Handle loading, empty, error, permission, and offline/degraded states —
   not just the happy path.
10. Check mobile, accessibility, SEO, security, and performance for every
    public feature before calling it done.
11. Create migrations and rollback/recovery notes for schema changes.
12. Document architectural decisions in `docs/decisions/`.
13. Add tests for important business rules and calculators — especially the
    inverter/UPS and PoE calculators, which must never estimate from a single
    naive number.
14. Do not mark a task complete until acceptance criteria are verified.
15. Flag conflicts with the blueprint instead of silently inventing a new
    pattern.
16. Never import `src/lib/supabase/server-privileged.ts` outside a route
    handler or server action that performs an explicit authorization check.
17. Never let a `sponsored` or paid-placement flag touch the recommendation,
    comparison, or "best-for" logic. That separation must be structural.

See `docs/00-foundation/MPB-001-Vision.md` and the master blueprint for
product context.
