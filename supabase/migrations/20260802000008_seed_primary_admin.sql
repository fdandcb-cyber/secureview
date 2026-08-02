-- Seed primary super-admin user in admin_users table upon Supabase Auth sign up
insert into admin_users (user_id, role, permissions, created_at, updated_at)
select id, 'admin', '{"full_access": true}'::jsonb, now(), now()
from auth.users
where email = 'connectzsalesandservices@gmail.com'
on conflict (user_id) do update set role = 'admin', updated_at = now();
