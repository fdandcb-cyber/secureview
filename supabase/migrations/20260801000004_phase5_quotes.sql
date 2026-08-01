-- Migration: Phase 5 Quote Engine
-- Description: Creates quotes and quote_items tables with RLS policies for users & guests.

CREATE TYPE quote_status_enum AS ENUM ('draft', 'sent', 'accepted', 'expired');

-- 1. Quotes Table
CREATE TABLE IF NOT EXISTS public.quotes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    session_token TEXT,
    status quote_status_enum NOT NULL DEFAULT 'draft',
    notes TEXT,
    expires_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '7 days'),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Quote Items Table
CREATE TABLE IF NOT EXISTS public.quote_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quote_id UUID NOT NULL REFERENCES public.quotes(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE RESTRICT,
    quantity INT NOT NULL DEFAULT 1,
    unit_price_inr NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_quote_product UNIQUE (quote_id, product_id)
);

-- Enable RLS
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_items ENABLE ROW LEVEL SECURITY;

-- Select/Insert/Update RLS Policies (User Session & Guest Token)
CREATE POLICY "Public & User quote select" ON public.quotes FOR SELECT USING (
    auth.uid() = user_id OR session_token IS NOT NULL OR public.is_admin()
);

CREATE POLICY "Public & User quote insert" ON public.quotes FOR INSERT WITH CHECK (
    auth.uid() = user_id OR session_token IS NOT NULL OR public.is_admin()
);

CREATE POLICY "Public & User quote update" ON public.quotes FOR UPDATE USING (
    auth.uid() = user_id OR session_token IS NOT NULL OR public.is_admin()
);

CREATE POLICY "Public quote_items select" ON public.quote_items FOR SELECT USING (true);
CREATE POLICY "Public quote_items insert" ON public.quote_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Public quote_items update" ON public.quote_items FOR UPDATE USING (true);
CREATE POLICY "Public quote_items delete" ON public.quote_items FOR DELETE USING (true);

-- Admin Write Policies
CREATE POLICY "Admin quotes write" ON public.quotes FOR ALL USING (public.is_admin());
CREATE POLICY "Admin quote_items write" ON public.quote_items FOR ALL USING (public.is_admin());
