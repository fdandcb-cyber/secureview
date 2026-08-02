-- Seed primary super-admin user in admin_users table upon Supabase Auth sign up
insert into public.admin_users (user_id, role, created_at)
select id, 'admin', now()
from auth.users
where email = 'connectzsalesandservices@gmail.com'
on conflict (user_id) do update set role = 'admin';
