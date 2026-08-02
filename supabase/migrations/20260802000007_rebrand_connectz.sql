-- Ensure description column exists on site_settings
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS description TEXT;

-- Rebrand site_settings configuration to Connectz Learning Center
INSERT INTO public.site_settings (key, value, description) VALUES
  ('site_name', to_jsonb('Connectz Learning Center'::text), 'Public-facing site/brand name'),
  ('support_email', to_jsonb('support@connectzss.shop'::text), 'Support contact email'),
  ('domain', to_jsonb('connectzss.store'::text), 'Primary domain'),
  ('contact_phone', to_jsonb('+91 78094 65102'::text), 'Primary contact phone number shown site-wide'),
  ('contact_whatsapp', to_jsonb('+91 78094 65102'::text), 'WhatsApp number for quick inquiries'),
  ('service_area_note', to_jsonb('Currently serving Cuttack, Bhubaneswar, and Puri districts'::text), 'Shown on the Service Directory page')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, description = EXCLUDED.description;
