-- Migration: Phase 4 Knowledge Engine
-- Description: Creates knowledge_articles and glossary_terms tables with RLS and initial seed data.

CREATE TYPE article_category_enum AS ENUM ('guide', 'glossary', 'faq', 'troubleshooting');
CREATE TYPE article_status_enum AS ENUM ('draft', 'published', 'archived');

-- 1. Knowledge Articles
CREATE TABLE IF NOT EXISTS public.knowledge_articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    category article_category_enum NOT NULL DEFAULT 'guide',
    body_markdown TEXT NOT NULL,
    related_product_category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    status article_status_enum NOT NULL DEFAULT 'draft',
    read_time_minutes INT NOT NULL DEFAULT 5,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Glossary Terms
CREATE TABLE IF NOT EXISTS public.glossary_terms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    term TEXT NOT NULL,
    plain_language_definition TEXT NOT NULL,
    related_spec_field_id UUID REFERENCES public.spec_fields(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.knowledge_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.glossary_terms ENABLE ROW LEVEL SECURITY;

-- Select RLS Policies
CREATE POLICY "Public knowledge_articles select" ON public.knowledge_articles FOR SELECT USING (status = 'published');
CREATE POLICY "Public glossary_terms select" ON public.glossary_terms FOR SELECT USING (true);

-- Admin Write Policies
CREATE POLICY "Admin knowledge_articles write" ON public.knowledge_articles FOR ALL USING (public.is_admin());
CREATE POLICY "Admin glossary_terms write" ON public.glossary_terms FOR ALL USING (public.is_admin());

-- Seed Articles
INSERT INTO public.knowledge_articles (slug, title, category, body_markdown, status, read_time_minutes) VALUES
('online-marketplace-risks', 'Online Marketplace Risks: What to Check Before You Buy', 'guide', 'Seller authenticity, warranty eligibility, cable/HDD quality, and after-sales gaps — an honest, non-alarmist guide to buying CCTV equipment online.', 'published', 8),
('ip-vs-analog-guide', 'IP Cameras vs Analog: Which Is Right for You?', 'guide', 'Resolution, cabling, cost, and future-proofing compared side by side.', 'published', 7),
('dvr-vs-nvr-guide', 'DVR vs NVR: Understanding the Core Difference', 'guide', 'One processes video at the camera, the other at the recorder. Here is why that matters.', 'published', 5)
ON CONFLICT (slug) DO NOTHING;

-- Seed Glossary Terms
INSERT INTO public.glossary_terms (slug, term, plain_language_definition) VALUES
('onvif', 'ONVIF', 'An open industry standard allowing cameras and recorders from different manufacturers to work together.'),
('poe', 'PoE (Power over Ethernet)', 'Delivers both power and data to an IP camera through a single Ethernet cable.'),
('wdr', 'WDR (Wide Dynamic Range)', 'Balances exposure between very bright and very dark areas in the same camera frame.'),
('ip67', 'IP67 Rating', 'Environmental weatherproofing rating certifying dust-tight protection and survival during heavy monsoons.')
ON CONFLICT (slug) DO NOTHING;
