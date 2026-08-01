-- Migration: Extended Entities & Site-Wide Content Control
-- Description: Creates product_images, contact_inquiries, homepage_sections, banners, nav_links, site_settings, page_seo, saved_products, saved_comparisons tables.

-- 1. Product Images Table
CREATE TABLE IF NOT EXISTS public.product_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    alt_text TEXT,
    sort_order INT NOT NULL DEFAULT 0,
    is_primary BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Contact Inquiries Table
CREATE TYPE inquiry_type_enum AS ENUM ('general', 'quote-follow-up', 'service-issue', 'partnership');
CREATE TYPE inquiry_status_enum AS ENUM ('new', 'in-progress', 'resolved');

CREATE TABLE IF NOT EXISTS public.contact_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    message TEXT NOT NULL,
    inquiry_type inquiry_type_enum NOT NULL DEFAULT 'general',
    status inquiry_status_enum NOT NULL DEFAULT 'new',
    assigned_to TEXT,
    internal_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Homepage Sections Control
CREATE TABLE IF NOT EXISTS public.homepage_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    subtitle TEXT,
    cta_text TEXT,
    cta_href TEXT,
    sort_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Time-Bound Banners
CREATE TABLE IF NOT EXISTS public.banners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    message TEXT NOT NULL,
    link TEXT,
    style TEXT DEFAULT 'info',
    starts_at TIMESTAMPTZ,
    ends_at TIMESTAMPTZ,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Navigation Links Control
CREATE TYPE nav_location_enum AS ENUM ('header', 'footer');

CREATE TABLE IF NOT EXISTS public.nav_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    label TEXT NOT NULL,
    href TEXT NOT NULL,
    location nav_location_enum NOT NULL DEFAULT 'header',
    sort_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. Site Settings (Key-Value)
CREATE TABLE IF NOT EXISTS public.site_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL DEFAULT '{}'::jsonb,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. Per-Page SEO Metadata
CREATE TABLE IF NOT EXISTS public.page_seo (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    path TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    og_image TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. Customer Saved Products (Wishlist)
CREATE TABLE IF NOT EXISTS public.saved_products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_user_product UNIQUE (user_id, product_id)
);

-- 9. Customer Saved Comparisons
CREATE TABLE IF NOT EXISTS public.saved_comparisons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    product_ids TEXT[] NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS on all new tables
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.homepage_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nav_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_seo ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_comparisons ENABLE ROW LEVEL SECURITY;

-- Public Select Policies
CREATE POLICY "Public product_images select" ON public.product_images FOR SELECT USING (true);
CREATE POLICY "Public homepage_sections select" ON public.homepage_sections FOR SELECT USING (is_active = true);
CREATE POLICY "Public banners select" ON public.banners FOR SELECT USING (is_active = true);
CREATE POLICY "Public nav_links select" ON public.nav_links FOR SELECT USING (is_active = true);
CREATE POLICY "Public site_settings select" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Public page_seo select" ON public.page_seo FOR SELECT USING (true);
CREATE POLICY "Public contact_inquiries insert" ON public.contact_inquiries FOR INSERT WITH CHECK (true);

-- User RLS Policies
CREATE POLICY "User saved_products select" ON public.saved_products FOR SELECT USING (auth.uid() = user_id OR public.is_admin());
CREATE POLICY "User saved_products write" ON public.saved_products FOR ALL USING (auth.uid() = user_id OR public.is_admin());
CREATE POLICY "User saved_comparisons select" ON public.saved_comparisons FOR SELECT USING (auth.uid() = user_id OR public.is_admin());
CREATE POLICY "User saved_comparisons write" ON public.saved_comparisons FOR ALL USING (auth.uid() = user_id OR public.is_admin());

-- Admin Write Policies
CREATE POLICY "Admin product_images write" ON public.product_images FOR ALL USING (public.is_admin());
CREATE POLICY "Admin contact_inquiries write" ON public.contact_inquiries FOR ALL USING (public.is_admin());
CREATE POLICY "Admin homepage_sections write" ON public.homepage_sections FOR ALL USING (public.is_admin());
CREATE POLICY "Admin banners write" ON public.banners FOR ALL USING (public.is_admin());
CREATE POLICY "Admin nav_links write" ON public.nav_links FOR ALL USING (public.is_admin());
CREATE POLICY "Admin site_settings write" ON public.site_settings FOR ALL USING (public.is_admin());
CREATE POLICY "Admin page_seo write" ON public.page_seo FOR ALL USING (public.is_admin());

-- Seed Site Settings
INSERT INTO public.site_settings (key, value) VALUES
('contact_info', '{"phone": "+91 94370 12345", "whatsapp": "+91 94370 12345", "email": "connectzsalesandservices@gmail.com", "businessHours": "Mon - Sat: 9:00 AM - 7:00 PM IST"}'::jsonb),
('hero_banner', '{"message": "Free installation consultation across Cuttack & Bhubaneswar this month!", "link": "/service"}'::jsonb)
ON CONFLICT (key) DO NOTHING;
