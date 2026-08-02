-- Migration: Fix missing orders/order_items INSERT policies
-- Description: Orders and order_items had SELECT (own-row) and admin-only
-- ALL policies, but no INSERT policy for a real customer placing an order.
-- Postgres RLS defaults to deny when no policy grants the operation, so
-- every non-admin checkout attempt was being rejected at the database layer.
-- This became a hard, visible failure (rather than a silent one) once
-- order-repository.ts was fixed to throw instead of faking success on a
-- persistence failure in production — that fix was correct; this was the
-- pre-existing bug it surfaced.

-- A row can be inserted if it's attributed to the inserting user, or if
-- it's a guest checkout (user_id is null) — matching the application's
-- `user_id: user?.id ?? null` behavior in createOrderServerSide().
CREATE POLICY "Customers can create their own orders" ON public.orders
  FOR INSERT
  WITH CHECK (
    auth.uid() = user_id OR user_id IS NULL
  );

-- order_items can be inserted only for an order that was just created by
-- the same rule above — checked by re-verifying ownership/guest status on
-- the parent order row, not by trusting order_id alone.
CREATE POLICY "Customers can add items to their own orders" ON public.order_items
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.orders o
      WHERE o.id = order_items.order_id
      AND (o.user_id = auth.uid() OR o.user_id IS NULL)
    )
  );
