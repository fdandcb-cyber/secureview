# Production Hardening — Round 3 (Narrow Scope)

The critical problems (webhook fail-open, checkout price manipulation,
admin auth bypass, IDOR on orders, missing INSERT policy) are already
fixed and verified. **Do not redo or re-touch any of that work.** This
prompt covers exactly four remaining items, confirmed still open by
independent code review. Nothing else.

**Verify after each numbered section. Run the full suite
(`npm ci` → `npm run lint` → `npm run typecheck` → `npm test` →
`npm run build`) at the end and report the actual results — not that the
scripts exist, that they were run and what happened.**

---

## 1. Atomic order + order_items creation via Postgres RPC

**Current state:** `createOrderServerSide()` does two separate inserts
(`orders`, then `order_items`) with a compensating `DELETE` on the order
if the items insert fails. This works but isn't atomic — if the
compensating delete itself fails, an incomplete order can remain.

**Fix:**

1. Add a new migration creating a Postgres function:

```sql
CREATE OR REPLACE FUNCTION public.create_order_with_items(
  p_user_id UUID,
  p_subtotal_inr NUMERIC,
  p_shipping_inr NUMERIC,
  p_total_inr NUMERIC,
  p_shipping_address JSONB,
  p_razorpay_order_id TEXT,
  p_items JSONB -- array of {product_id, quantity, unit_price_inr, line_total_inr}
)
RETURNS public.orders
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_order public.orders;
BEGIN
  INSERT INTO public.orders (
    user_id, status, subtotal_inr, shipping_inr, total_inr,
    shipping_address, razorpay_order_id
  ) VALUES (
    p_user_id, 'pending_payment', p_subtotal_inr, p_shipping_inr, p_total_inr,
    p_shipping_address, p_razorpay_order_id
  )
  RETURNING * INTO v_order;

  INSERT INTO public.order_items (order_id, product_id, quantity, unit_price_inr, line_total_inr)
  SELECT
    v_order.id,
    (item->>'product_id')::UUID,
    (item->>'quantity')::INT,
    (item->>'unit_price_inr')::NUMERIC,
    (item->>'line_total_inr')::NUMERIC
  FROM jsonb_array_elements(p_items) AS item;

  RETURN v_order;
  -- Any exception in either INSERT rolls back the whole function
  -- automatically — Postgres functions execute in an implicit transaction.
END;
$$;
```

2. `SECURITY DEFINER` means this function runs with the privileges of
   whoever created it (the migration owner), not the caller — this is
   intentional and matches how the privileged webhook path already works,
   but means this function must ONLY be callable in ways that don't let an
   arbitrary caller forge `p_user_id`. Grant `EXECUTE` on this function to
   `authenticated` and `anon` roles, but the **application code must
   always derive `p_user_id` server-side from the authenticated session**,
   never from client input — same rule as everywhere else in this
   codebase.
3. Update `createOrderServerSide()` in `order-repository.ts` to call this
   via `supabase.rpc("create_order_with_items", { ... })` instead of the
   current two-insert-plus-compensating-delete pattern. Remove the
   compensating delete logic once the RPC is in place — it's no longer
   needed.
4. Keep the existing production-vs-non-production fallback behavior
   (throw in production on failure, fall through to `memoryOrders` in
   dev) — just move it to wrap the RPC call instead of the two inserts.
5. **Verify**: write a test (see Section 4) that forces the `order_items`
   insert to fail (e.g., an invalid `product_id`) and confirms zero rows
   exist in `orders` afterward — not just that the function throws.

---

## 2. Shared, production-safe rate limiter

**Current state:** `src/lib/rate-limit.ts` uses an in-memory `Map`, which
doesn't share state across serverless instances or survive cold starts.

**Fix — use Postgres as the shared store, not a new infrastructure
dependency** (no Redis/Upstash — this app already has Supabase Postgres
available server-side, and the audit's own guidance was "don't introduce
unnecessary infrastructure if a lightweight implementation is
sufficient"):

1. Add a migration creating a simple rate-limit tracking table:

```sql
CREATE TABLE IF NOT EXISTS public.rate_limit_buckets (
  bucket_key TEXT PRIMARY KEY,
  request_count INT NOT NULL DEFAULT 1,
  window_start TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
-- No RLS needed for public access — this table is only ever touched via
-- the privileged server-only client, never client-reachable directly.
```

2. Rewrite `checkRateLimit()` to use an atomic upsert against this table
   (e.g. a single SQL statement or RPC that increments the count if
   within the window, or resets it if the window expired, and returns
   whether the request is allowed) — do this as one atomic DB operation,
   not a read-then-write from the application layer, to avoid a race
   condition under concurrent requests.
3. Keep the exact same function signature
   (`checkRateLimit(key, { windowMs, maxRequests })`) so
   `checkout/create-order` and `inquiries` don't need to change at all —
   this should be a drop-in replacement.
4. Add a periodic cleanup consideration (old rows with expired windows) —
   a simple `DELETE WHERE window_start < NOW() - INTERVAL '1 hour'` run
   opportunistically inside the same function call is sufficient; don't
   build a separate cron job for this.
5. **Verify**: a test that fires more than `maxRequests` requests with the
   same key in quick succession and confirms the later ones are rejected;
   run it and confirm the table actually accumulates rows during the test.

---

## 3. Environment centralization and production validation

**Current state:** `order-repository.ts` and `require-admin.ts` read
`process.env.NODE_ENV` directly, bypassing the stated single-boundary
rule in `env.ts`. Critical production variables
(`SUPABASE_SERVICE_ROLE_KEY`, `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`,
`RAZORPAY_WEBHOOK_SECRET`, `SHIPROCKET_EMAIL`, `SHIPROCKET_PASSWORD`) are
all `.optional()` with no production-specific enforcement.

**Fix:**

1. Add to `src/config/env.ts`:
```ts
export function isProduction() {
  return process.env.NODE_ENV === "production";
}
```
   Replace every direct `process.env.NODE_ENV` check in
   `order-repository.ts` and `require-admin.ts` with `isProduction()`
   from this module.

2. Add a `validateProductionEnv()` function to `env.ts` that, when called
   in production, throws a clear startup error if
   `SUPABASE_SERVICE_ROLE_KEY`, `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`,
   and `RAZORPAY_WEBHOOK_SECRET` are missing (these are load-bearing for
   checkout/webhook to function at all). `SHIPROCKET_EMAIL`/
   `SHIPROCKET_PASSWORD` can remain genuinely optional since Shiprocket
   isn't wired into the critical path yet — don't invent a stricter
   requirement than the app currently needs.
3. Call `validateProductionEnv()` once, early, in a place that runs at
   server startup rather than per-request — check whether this project
   has an `instrumentation.ts` (Next.js's supported startup hook) already;
   if not, add one. Do not scatter this check across multiple route
   handlers.
4. **Verify**: confirm the app still builds and runs correctly with all
   variables set (normal case), and that `validateProductionEnv()`
   actually throws when a required variable is missing and
   `NODE_ENV=production` — write this as an explicit test, not just a
   manual check.

---

## 4. Real automated tests

**Current state:** `npm test` only runs the storage calculator test. Add
real coverage for the checkout/auth/webhook work from the last two fix
passes. Use the same lightweight `tsx` + `console.assert()` pattern
already established in `calculator-engine.test.ts` — do not introduce a
new test framework (jest/vitest) for this; consistency with the existing
pattern matters more than framework features here, and the audit
document's own "don't over-engineer" guidance applies.

Add test files (one per area, following the existing naming convention)
covering:

- Razorpay webhook: invalid signature → rejected
- Razorpay webhook: malformed/schema-invalid payload → rejected
- Razorpay webhook: duplicate event ID → second call returns
  `already_processed`, does not re-update the order
- Razorpay webhook: simulated Supabase failure during the idempotency
  check → fails closed (500), does not silently proceed
- Razorpay webhook: `payment.captured` with an `order_id` matching no
  local order → fails loudly (500), not a silent no-op
- Razorpay webhook: valid `payment.captured` → order status actually
  updates to `paid`
- `getOrderById`: anonymous caller → returns `null` in production
- `getOrderById`: authenticated user requesting another user's order →
  returns `null`/denied, not the other user's data
- `getOrderById`: admin caller → can retrieve any order
- `createOrderServerSide`: forced `order_items` failure (e.g. invalid
  `product_id`) → zero orphaned rows in `orders` afterward (this is the
  test that validates Section 1's RPC fix actually works)
- Production fallback prevention: with `NODE_ENV=production` and no
  bypass var, confirm `memoryOrders`/dev-fallback paths are never reached
  on a forced DB failure
- Checkout price manipulation: submit a request with a deliberately wrong
  client-side price for a real product, confirm the resulting order uses
  the real database price (this test may already partially exist per
  `scripts/test-checkout-price-validation.ts` — check first, extend
  rather than duplicate if so)

Update `package.json`'s `test` script to run all test files, not just the
calculator one (e.g. a small script that globs `**/*.test.ts` and runs
each through `tsx`, or an explicit list if globbing adds too much
complexity for this stage — prefer the simpler explicit list).

**Verify**: run `npm test` and confirm every test actually executes and
passes — paste the real output in the final report, not a summary claim.

---

## Final Report Requirements

After all four sections:

1. Run `npm ci`, `npm run lint`, `npm run typecheck`, `npm test`,
   `npm run build` — in that order — and report the actual terminal
   output/exit status of each, not a paraphrase.
2. Confirm via `git diff` that nothing outside the files relevant to
   these four sections changed — no UI/visual/branding files touched.
3. List every new/modified file with a one-line reason, same format as
   previous fix passes.
4. Explicitly state whether Sections 1-4 are each fully complete or
   partially complete — do not round up "mostly done" to "done."
