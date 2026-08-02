# 0008. Homepage Sections Fallback Behavior

## Context
Phase 6 introduces Site Content Control (§9.7), allowing administrators to dynamically configure homepage entry-point cards, banners, and navigation links via database tables (`homepage_sections`, `banners`, `nav_links`). If the database tables are empty, unpopulated, or temporarily unreachable during initial deployment or database migrations, the homepage must not break or render blank sections.

## Decision
We implement a fail-safe fallback mechanism in `src/app/page.tsx`. When querying dynamic content from `homepage_sections` or `site_settings`:
1. If database rows exist and `is_active = true`, render the dynamic content configured by admins.
2. If database rows are empty or database query fails, gracefully fallback to the original structured static content.

## Consequences
- **Positive:** Zero risk of homepage downtime or blank renders during database migrations, fresh deployments, or initial setup.
- **Negative:** Dual maintenance of fallback static content and dynamic schema properties.
