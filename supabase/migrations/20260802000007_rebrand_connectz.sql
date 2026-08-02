-- Rebrand site_settings configuration to Connectz Learning Center
insert into site_settings (key, value, description) values
  ('site_name', 'Connectz Learning Center', 'Public-facing site/brand name'),
  ('support_email', 'support@connectzss.shop', 'Support contact email'),
  ('domain', 'connectzss.store', 'Primary domain'),
  ('contact_phone', '+91 78094 65102', 'Primary contact phone number shown site-wide'),
  ('contact_whatsapp', '+91 78094 65102', 'WhatsApp number for quick inquiries'),
  ('service_area_note', 'Currently serving Cuttack, Bhubaneswar, and Puri districts', 'Shown on the Service Directory page')
on conflict (key) do update set value = excluded.value, description = excluded.description;
