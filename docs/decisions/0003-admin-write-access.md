# 0003. Admin Write Access & RLS Policies

## Context
Row Level Security (RLS) must protect database mutations while allowing public reads for published catalog items, articles, and verified service centers.

## Decision
We implemented a security definer function `public.is_admin()` linked to an `admin_users` table. Public users can `SELECT` published rows; write actions (`INSERT`, `UPDATE`, `DELETE`) are strictly gated by `is_admin()`.

## Consequences
- **Positive:** Guarantees anonymous clients cannot mutate catalog or service listings even if they bypass the UI.
- **Negative:** First admin user must be registered in `admin_users` table via service-role key or SQL script.
