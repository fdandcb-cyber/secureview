-- Migration: Phase 3 Catalog & Specifications
-- Description: Creates brands, categories, spec_fields, products, product_spec_values, admin_users + RLS and seed data.

-- 1. Brands
CREATE TABLE IF NOT EXISTS public.brands (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    logo_url TEXT,
    description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Categories
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    parent_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    description TEXT,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Spec Fields
CREATE TYPE field_type_enum AS ENUM ('text', 'number', 'boolean', 'enum', 'range');

CREATE TABLE IF NOT EXISTS public.spec_fields (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
    key TEXT NOT NULL,
    label TEXT NOT NULL,
    plain_language_explainer TEXT NOT NULL,
    field_type field_type_enum NOT NULL DEFAULT 'text',
    unit TEXT,
    enum_options TEXT[],
    is_comparison_default BOOLEAN NOT NULL DEFAULT false,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_category_key UNIQUE (category_id, key)
);

-- 4. Products
CREATE TYPE product_status_enum AS ENUM ('draft', 'published', 'discontinued');

CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    brand_id UUID NOT NULL REFERENCES public.brands(id) ON DELETE RESTRICT,
    category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE RESTRICT,
    name TEXT NOT NULL,
    model_number TEXT NOT NULL,
    short_description TEXT NOT NULL,
    long_description TEXT,
    status product_status_enum NOT NULL DEFAULT 'draft',
    base_price_inr NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    warranty_months INT NOT NULL DEFAULT 12,
    warranty_terms TEXT,
    is_verified_spec BOOLEAN NOT NULL DEFAULT true,
    primary_image_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Product Spec Values
CREATE TYPE spec_source_enum AS ENUM ('manufacturer', 'verified_test', 'editorial');

CREATE TABLE IF NOT EXISTS public.product_spec_values (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    spec_field_id UUID NOT NULL REFERENCES public.spec_fields(id) ON DELETE CASCADE,
    value_text TEXT,
    value_number NUMERIC(10, 2),
    value_boolean BOOLEAN,
    source spec_source_enum NOT NULL DEFAULT 'manufacturer',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_product_spec UNIQUE (product_id, spec_field_id)
);

-- 6. Admin Users
CREATE TABLE IF NOT EXISTS public.admin_users (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL DEFAULT 'editor',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Helper Security Definer Function to check admin status
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE user_id = auth.uid()
  );
$$;

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_brands_updated_at
BEFORE UPDATE ON public.brands
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Enable RLS on all 6 tables
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.spec_fields ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_spec_values ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- RLS Select Policies
CREATE POLICY "Public brands select" ON public.brands FOR SELECT USING (is_active = true);
CREATE POLICY "Public categories select" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Public spec_fields select" ON public.spec_fields FOR SELECT USING (true);
CREATE POLICY "Public products select" ON public.products FOR SELECT USING (status = 'published');

CREATE POLICY "Public product_spec_values select" ON public.product_spec_values FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.products p
    WHERE p.id = product_spec_values.product_id AND p.status = 'published'
  )
);

-- RLS Admin All Policies
CREATE POLICY "Admin brands write" ON public.brands FOR ALL USING (public.is_admin());
CREATE POLICY "Admin categories write" ON public.categories FOR ALL USING (public.is_admin());
CREATE POLICY "Admin spec_fields write" ON public.spec_fields FOR ALL USING (public.is_admin());
CREATE POLICY "Admin products write" ON public.products FOR ALL USING (public.is_admin());
CREATE POLICY "Admin product_spec_values write" ON public.product_spec_values FOR ALL USING (public.is_admin());
CREATE POLICY "Admin admin_users select" ON public.admin_users FOR SELECT USING (public.is_admin());

-- Seed Data (Brands & Categories)
INSERT INTO public.brands (slug, name, description) VALUES
('hikvision', 'Hikvision', 'Global security camera and surveillance hardware brand.'),
('dahua', 'Dahua Technology', 'Leading video-centric AIoT solution provider.'),
('cp-plus', 'CP Plus', 'Popular surveillance brand widely deployed across India.'),
('tp-link', 'TP-Link Tapo', 'Smart home security and PoE networking hardware.'),
('western-digital', 'Western Digital', 'Surveillance hard drive manufacturer (WD Purple).'),
('seagate', 'Seagate', 'Surveillance storage hard drive manufacturer (SkyHawk).'),
('generic', 'Generic / Other', 'Unbranded accessories, cabling, and power supplies.')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.categories (slug, name, description, sort_order) VALUES
('cameras', 'Cameras', 'Security cameras including IP, Analog, Dome, and Bullet types', 1),
('recorders', 'Recorders (NVR / DVR)', 'Network Video Recorders and Digital Video Recorders', 2),
('storage', 'Surveillance Storage', '24/7 surveillance-rated hard drives', 3),
('cabling', 'Accessories & Cabling', 'Cat6 cables, BNC connectors, PoE switches, and junction boxes', 4)
ON CONFLICT (slug) DO NOTHING;
