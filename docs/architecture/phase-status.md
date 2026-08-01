# Platform Phase Status & Engine Architecture

| Engine / Phase | Status | Repository Location | Dependencies |
|---|---|---|---|
| **Catalog & Specs Engine** | **Completed (Phase 3)** | `src/features/products/repositories/` | Supabase Postgres (`products`, `spec_fields`) |
| **Knowledge Engine** | **Completed (Phase 4)** | `src/features/knowledge/repositories/` | Supabase Postgres (`knowledge_articles`, `glossary_terms`) |
| **Compare Engine** | **Completed (Phase 4)** | `src/features/comparison/repositories/` | Catalog Engine (`ProductWithSpecs`) |
| **Storage Calculator Engine** | **Completed (Phase 4)** | `src/features/calculators/storage/` | Pure Calculation Engine + Product Catalog |
| **Service Directory Engine** | **Completed (Phase 4)** | `src/features/service-directory/repositories/` | Supabase Postgres (`service_centers`) |
| **Quote Engine** | **Completed (Phase 5)** | `src/features/quotes/repositories/` | Supabase Postgres (`quotes`, `quote_items`) |
| **Commerce & Checkout Engine** | **Completed (Phase 5)** | `src/features/commerce/repositories/` | Razorpay API + `orders` + `order_items` |
| **Shiprocket Fulfillment** | **Completed (Phase 5)** | `src/features/commerce/services/` | Shiprocket API Client Wrapper |
| **Admin Console & CRUD** | **Completed (Phase 6)** | `src/app/admin/` | `server-privileged.ts` + `is_admin()` RLS |

## Admin Credentials Configuration
- **Admin Email**: `connectzsalesandservices@gmail.com`
- **Default Admin Password**: `SecureView@Admin2026!`
- **Security Definer Function**: `public.is_admin()` linked to `admin_users` table.

## Architecture Notes
- All components query database repositories instead of direct Supabase SDK calls.
- Checkout pricing is strictly calculated server-side to prevent price tampering.
- Webhook endpoints verify signatures and check `processed_webhook_events` for idempotency.
