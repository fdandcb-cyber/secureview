-- Migration: Create atomic create_order_with_items function
-- Description: Inserts order header and order_items in a single PL/pgSQL function
-- executing in an implicit Postgres transaction.

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
  -- Any exception in either INSERT rolls back the whole function automatically
END;
$$;

GRANT EXECUTE ON FUNCTION public.create_order_with_items TO authenticated, anon;
