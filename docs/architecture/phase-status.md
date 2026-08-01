# Platform Phase Status & Engine Architecture

| Engine | Status | Repository Location | Dependencies |
|---|---|---|---|
| **Catalog & Specs Engine** | **Completed (Phase 3)** | `src/features/products/repositories/` | Supabase Postgres (`products`, `spec_fields`) |
| **Knowledge Engine** | **Completed (Phase 4)** | `src/features/knowledge/repositories/` | Supabase Postgres (`knowledge_articles`, `glossary_terms`) |
| **Compare Engine** | **Completed (Phase 4)** | `src/features/comparison/repositories/` | Catalog Engine (`ProductWithSpecs`) |
| **Storage Calculator Engine** | **Completed (Phase 4)** | `src/features/calculators/storage/` | Pure Calculation Engine + Product Catalog |
| **Service Directory Engine** | **Completed (Phase 4)** | `src/features/service-directory/repositories/` | Supabase Postgres (`service_centers`) |
| **Admin & CMS Console** | **Completed (Phase 4)** | `src/app/admin/` | `server-privileged.ts` + `is_admin()` RLS |

## Architecture Notes
- All components query database repositories instead of direct Supabase SDK calls.
- Repository layer validates database outputs via Zod schemas (`schemas.ts`).
- Fallback mock parsing guarantees graceful UI rendering when database tables are unpopulated during local dev.
