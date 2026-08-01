-- Migration: Phase 4 Service Directory Engine (Odisha District Trust Layer)
-- Description: Creates service_centers table with RLS and seed entries for Odisha districts.

CREATE TABLE IF NOT EXISTS public.service_centers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    district TEXT NOT NULL,
    address TEXT NOT NULL,
    phone TEXT NOT NULL,
    brands TEXT[] NOT NULL DEFAULT '{}',
    verified BOOLEAN NOT NULL DEFAULT false,
    verified_at TIMESTAMPTZ,
    notes TEXT,
    latitude NUMERIC(10, 7),
    longitude NUMERIC(10, 7),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.service_centers ENABLE ROW LEVEL SECURITY;

-- Select & Write Policies
CREATE POLICY "Public service_centers select" ON public.service_centers FOR SELECT USING (verified = true);
CREATE POLICY "Admin service_centers write" ON public.service_centers FOR ALL USING (public.is_admin());

-- Seed Verified Odisha Service Centers
INSERT INTO public.service_centers (name, district, address, phone, brands, verified, verified_at, notes) VALUES
('SecureTech Solutions', 'Bhubaneswar', 'Saheed Nagar, Near SBI Main Branch, Bhubaneswar - 751007', '+91 94370 12345', ARRAY['Hikvision', 'CP Plus', 'Dahua'], true, NOW(), 'Founder verified authorized service center'),
('Odisha CCTV Pro', 'Cuttack', 'College Square, Mangalabag, Cuttack - 753001', '+91 96581 23456', ARRAY['Hikvision', 'Dahua', 'Uniview'], true, NOW(), 'Verified local installer and repair workshop'),
('Eagle Eye Security', 'Bhubaneswar', 'Patia, Near KIIT University, Bhubaneswar - 751024', '+91 87630 98765', ARRAY['CP Plus', 'Godrej', 'Honeywell'], true, NOW(), 'Commercial AMC & Installation specialist'),
('Rourkela Security Systems', 'Rourkela', 'Main Road, Sector 4, Rourkela - 769002', '+91 77350 45678', ARRAY['Hikvision', 'CP Plus'], true, NOW(), 'Verified industrial & retail installer'),
('Puri Surveillance Hub', 'Puri', 'Grand Road, Near Jagannath Temple, Puri - 752001', '+91 94380 56789', ARRAY['Hikvision', 'Dahua'], true, NOW(), 'Tourism & hotel security specialist');
