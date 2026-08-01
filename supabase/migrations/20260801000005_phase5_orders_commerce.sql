-- Migration: Phase 5 Commerce & Orders Engine
-- Description: Creates orders, order_items, processed_webhook_events tables with RLS and webhook idempotency guards.

CREATE TYPE order_status_enum AS ENUM (
    'pending_payment',
    'paid',
    'failed',
    'fulfilled',
    'cancelled',
    'refunded'
);

-- 1. Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    status order_status_enum NOT NULL DEFAULT 'pending_payment',
    subtotal_inr NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    shipping_inr NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    total_inr NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    shipping_address JSONB NOT NULL DEFAULT '{}'::jsonb,
    razorpay_order_id TEXT UNIQUE,
    razorpay_payment_id TEXT,
    shipment_tracking_id TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Order Items Table
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE RESTRICT,
    quantity INT NOT NULL DEFAULT 1,
    unit_price_inr NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    line_total_inr NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Webhook Idempotency Table
CREATE TABLE IF NOT EXISTS public.processed_webhook_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    provider TEXT NOT NULL DEFAULT 'razorpay',
    event_id TEXT NOT NULL UNIQUE,
    processed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.processed_webhook_events ENABLE ROW LEVEL SECURITY;

-- Select RLS Policies (Users can only read their own orders)
CREATE POLICY "User orders select" ON public.orders FOR SELECT USING (
    auth.uid() = user_id OR public.is_admin()
);

CREATE POLICY "User order_items select" ON public.order_items FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM public.orders o
        WHERE o.id = order_items.order_id AND (o.user_id = auth.uid() OR public.is_admin())
    )
);

-- Admin Write Policies
CREATE POLICY "Admin orders write" ON public.orders FOR ALL USING (public.is_admin());
CREATE POLICY "Admin order_items write" ON public.order_items FOR ALL USING (public.is_admin());
CREATE POLICY "Admin webhooks write" ON public.processed_webhook_events FOR ALL USING (public.is_admin());

-- Comment: Admin user registration instruction
-- Email: connectzsalesandservices@gmail.com
-- Password: SecureView@Admin2026!
-- To register in local DB: insert user_id into public.admin_users table.
